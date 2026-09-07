/**
 * Cloud Synchronization Service for Firebase Firestore
 * Handles real-time synchronization, offline fallbacks, and error tracking.
 */

import { doc, getDoc, setDoc, onSnapshot, getDocFromServer } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { WeeklyPlan, CustomShoppingItem, Recipe } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

/**
 * Validates connection to Firestore server
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore is currently offline.');
    }
    return false;
  }
}

export interface UserCloudSyncPayload {
  weeklyPlan?: WeeklyPlan | null;
  checkedMap?: Record<string, boolean>;
  customItems?: CustomShoppingItem[];
  customRecipes?: Recipe[];
  pantryMap?: Record<string, boolean>;
  theme?: string;
  subscriptionStatus?: 'free' | 'premium';
  recipeCount?: number;
  mealCount?: number;
  displayName?: string | null;
  email?: string | null;
}

/**
 * Fetches user profile and cloud-synced collections from Firestore
 */
export async function fetchUserCloudData(userId: string) {
  if (!userId || userId === 'local-guest') return null;
  const docPath = `users/${userId}`;
  try {
    const userDocRef = doc(db, 'users', userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, docPath);
    return null;
  }
}

/**
 * Pushes user data (custom recipes, weekly plan, shopping list) to Cloud Firestore
 */
export async function saveUserCloudData(userId: string, payload: UserCloudSyncPayload): Promise<string | null> {
  if (!userId || userId === 'local-guest') return null;
  const docPath = `users/${userId}`;
  const now = new Date().toISOString();

  try {
    const userDocRef = doc(db, 'users', userId);
    const cleanPayload: Record<string, any> = {
      lastSyncedAt: now,
      updatedAt: now,
    };

    if (payload.weeklyPlan !== undefined) cleanPayload.weeklyPlan = payload.weeklyPlan;
    if (payload.checkedMap !== undefined) cleanPayload.checkedMap = payload.checkedMap;
    if (payload.customItems !== undefined) cleanPayload.customItems = payload.customItems;
    if (payload.customRecipes !== undefined) cleanPayload.customRecipes = payload.customRecipes;
    if (payload.pantryMap !== undefined) cleanPayload.pantryMap = payload.pantryMap;
    if (payload.theme !== undefined) cleanPayload.theme = payload.theme;
    if (payload.subscriptionStatus !== undefined) cleanPayload.subscriptionStatus = payload.subscriptionStatus;
    if (payload.recipeCount !== undefined) cleanPayload.recipeCount = payload.recipeCount;
    if (payload.mealCount !== undefined) cleanPayload.mealCount = payload.mealCount;
    if (payload.displayName !== undefined) cleanPayload.displayName = payload.displayName;
    if (payload.email !== undefined) cleanPayload.email = payload.email;

    await setDoc(userDocRef, cleanPayload, { merge: true });
    return now;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, docPath);
    throw err;
  }
}

/**
 * Subscribes to real-time cloud changes on another device
 */
export function subscribeToUserCloudData(
  userId: string,
  onUpdate: (data: any) => void,
  onError?: (error: any) => void
) {
  if (!userId || userId === 'local-guest') {
    return () => {};
  }
  const docPath = `users/${userId}`;
  const userDocRef = doc(db, 'users', userId);

  return onSnapshot(
    userDocRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data());
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, docPath);
      if (onError) onError(err);
    }
  );
}

/**
 * Human readable timestamp for sync status
 */
export function formatSyncTime(isoString?: string | null, lang: string = 'fr'): string {
  if (!isoString) {
    return lang === 'fr' ? 'Jamais synchronisé' : 'Never synced';
  }
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 15) {
      return lang === 'fr' ? "À l'instant" : 'Just now';
    }
    if (diffSec < 60) {
      return lang === 'fr' ? `Il y a ${diffSec} sec` : `${diffSec}s ago`;
    }
    if (diffSec < 3600) {
      const min = Math.floor(diffSec / 60);
      return lang === 'fr' ? `Il y a ${min} min` : `${min}m ago`;
    }

    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return lang === 'fr' ? `Aujourd'hui à ${timeStr}` : `Today at ${timeStr}`;
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return isoString;
  }
}

/**
 * ============================================================================
 * GENERIC APP DATABASE (Dedicated Shared Cloud Database for the App)
 * ============================================================================
 */

export const GENERIC_CATALOG_DOC = 'app_catalog/generic';

/**
 * Fetches the official Generic Cloud Database catalog
 */
export async function fetchGenericCatalog(): Promise<{ recipes: Recipe[]; version: string; updatedAt: string } | null> {
  try {
    const catalogRef = doc(db, 'app_catalog', 'generic');
    const snap = await getDoc(catalogRef);
    if (snap.exists()) {
      const data = snap.data();
      if (Array.isArray(data?.recipes)) {
        // Tag them as isGenericCloud
        const taggedRecipes = data.recipes.map((r: Recipe) => ({
          ...r,
          isCustom: false,
          isGenericCloud: true
        }));
        return {
          recipes: taggedRecipes,
          version: data.version || '1.0.0',
          updatedAt: data.updatedAt || new Date().toISOString()
        };
      }
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch generic catalog from cloud:', err);
    return null;
  }
}

/**
 * Seeds or publishes the initial official recipes to the Generic Cloud Database
 */
export async function seedGenericCatalogIfEmpty(defaultRecipes: Recipe[]): Promise<boolean> {
  try {
    const catalogRef = doc(db, 'app_catalog', 'generic');
    const snap = await getDoc(catalogRef);
    if (!snap.exists() || !snap.data()?.recipes?.length) {
      const now = new Date().toISOString();
      const sanitized = defaultRecipes.map(r => ({
        ...r,
        isCustom: false,
        isGenericCloud: true
      }));
      await setDoc(catalogRef, {
        version: '1.0.0',
        recipes: sanitized,
        updatedAt: now,
        author: 'App System'
      }, { merge: true });
      return true;
    }
    return false;
  } catch (err) {
    console.warn('Failed to seed generic catalog in cloud:', err);
    return false;
  }
}

/**
 * Subscribes to real-time updates of the Generic Cloud Database
 */
export function subscribeToGenericCatalog(
  onUpdate: (catalog: { recipes: Recipe[]; version: string; updatedAt: string }) => void,
  onError?: (error: any) => void
) {
  const catalogRef = doc(db, 'app_catalog', 'generic');
  return onSnapshot(
    catalogRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data?.recipes)) {
          const taggedRecipes = data.recipes.map((r: Recipe) => ({
            ...r,
            isCustom: false,
            isGenericCloud: true
          }));
          onUpdate({
            recipes: taggedRecipes,
            version: data.version || '1.0.0',
            updatedAt: data.updatedAt || new Date().toISOString()
          });
        }
      }
    },
    (err) => {
      console.warn('Generic catalog listener error:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Creates a personal customizable copy of any generic recipe
 */
export function createPersonalCopyOfRecipe(genericRecipe: Recipe, suffixText: string = '(Ma version)'): Recipe {
  return {
    ...genericRecipe,
    id: `custom-recipe-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: `${genericRecipe.title} ${suffixText}`,
    isCustom: true,
    isGenericCloud: false,
    ingredients: genericRecipe.ingredients.map(ing => ({ ...ing })),
    instructions: [...genericRecipe.instructions],
    tags: [...(genericRecipe.tags || []), 'personnelle']
  };
}

