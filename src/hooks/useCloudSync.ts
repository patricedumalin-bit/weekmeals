import { useCallback, useRef } from 'react';
import { get, set } from 'idb-keyval';
import { useAuthStore } from '../stores/useAuthStore';
import { useDataStore } from '../stores/useDataStore';
import { useAppStore } from '../stores/useAppStore';
import {
  fetchUserCloudData,
  saveUserCloudData,
  OperationType,
  handleFirestoreError
} from '../utils/cloudSync';
import {
  saveRecipes,
  saveIngredients,
  saveWeeklyPlan,
  saveCheckedMap,
  saveCustomShoppingItems
} from '../utils/storage';
import { Recipe, Ingredient, WeeklyPlan, CustomShoppingItem } from '../types';

const QUEUE_KEY = 'meal_app_sync_queue';

export function useCloudSync() {
  const { user, userData, setUserData, setSyncStatus, setLastSyncedAt, isOnline } = useAuthStore();
  const { recipes, ingredients, weeklyPlan, checkedMap, customItems, setRecipes, setIngredients, setWeeklyPlan, setCheckedMap, setCustomItems } = useDataStore();
  const { theme } = useAppStore();

  const syncTimeoutRef = useRef<any>(null);
  const isSyncingFromCloudRef = useRef(false);

  const pushCloudChanges = useCallback(async (
    planToSync?: WeeklyPlan | null,
    checkedToSync?: Record<string, boolean>,
    customItemsToSync?: CustomShoppingItem[],
    recipesToSync?: Recipe[],
    ingredientsToSync?: Ingredient[]
  ) => {
    if (!user || user.uid === 'local-guest') {
      setSyncStatus('offline');
      return;
    }

    if (!isOnline) {
      console.log('Offline: Adding sync task to queue.');
      const currentQueue = await get<any[]>(QUEUE_KEY) || [];
      if (!currentQueue.some(t => t.type === 'SYNC_ALL')) {
        await set(QUEUE_KEY, [...currentQueue, { id: `sync-${Date.now()}`, type: 'SYNC_ALL', timestamp: Date.now() }]);
      }
      setSyncStatus('offline');
      return;
    }

    try {
      setSyncStatus('syncing');
      isSyncingFromCloudRef.current = true;
      const targetRecipes = recipesToSync || recipes;
      const customRecipes = targetRecipes.filter(r => r.isCustom);

      const targetIngredients = ingredientsToSync || ingredients;
      const customIngredients = targetIngredients.filter(i => i.notes?.includes('importé') || i.id.startsWith('ing-'));

      const syncedTimestamp = await saveUserCloudData(user.uid, {
        weeklyPlan: planToSync !== undefined ? planToSync : weeklyPlan,
        checkedMap: checkedToSync !== undefined ? checkedToSync : checkedMap,
        customItems: customItemsToSync !== undefined ? customItemsToSync : customItems,
        customRecipes,
        customIngredients,
        recipeCount: customRecipes.length,
        theme: userData?.theme || theme,
        subscriptionStatus: userData?.subscriptionStatus || 'free',
        displayName: user.displayName,
        email: user.email,
      });

      if (syncedTimestamp) {
        setLastSyncedAt(syncedTimestamp);
        setSyncStatus('synced');
      }
    } catch (error) {
      console.error('Failed to sync changes to cloud:', error);
      setSyncStatus('error');
    } finally {
      setTimeout(() => {
        isSyncingFromCloudRef.current = false;
      }, 500);
    }
  }, [user, recipes, ingredients, weeklyPlan, checkedMap, customItems, theme, userData, setSyncStatus, setLastSyncedAt, isOnline]);

  const scheduleCloudSync = useCallback((
    plan?: WeeklyPlan | null,
    checked?: Record<string, boolean>,
    items?: CustomShoppingItem[],
    recs?: Recipe[],
    ings?: Ingredient[]
  ) => {
    if (!user || user.uid === 'local-guest') return;
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      pushCloudChanges(plan, checked, items, recs, ings);
    }, 1000);
  }, [user, pushCloudChanges]);

  const handleManualSync = async () => {
    if (!user || user.uid === 'local-guest') return;
    setSyncStatus('syncing');
    try {
      const cloudData = await fetchUserCloudData(user.uid);
      if (cloudData) {
        if (Array.isArray(cloudData.customRecipes)) {
          const map = new Map<string, Recipe>(recipes.map(r => [r.id, r]));
          cloudData.customRecipes.forEach((cr: Recipe) => map.set(cr.id, cr));
          const merged = Array.from(map.values());
          setRecipes(merged);
          saveRecipes(merged);
        }
        if (cloudData.customIngredients) {
          const map = new Map<string, Ingredient>(ingredients.map(i => [i.id, i]));
          cloudData.customIngredients.forEach((ci: Ingredient) => map.set(ci.id, ci));
          const merged = Array.from(map.values());
          setIngredients(merged);
          saveIngredients(merged);
        }
        if (cloudData.weeklyPlan) {
          setWeeklyPlan(cloudData.weeklyPlan);
          saveWeeklyPlan(cloudData.weeklyPlan);
        }
        if (cloudData.checkedMap) {
          setCheckedMap(cloudData.checkedMap);
          saveCheckedMap(cloudData.checkedMap);
        }
        if (cloudData.customItems) {
          setCustomItems(cloudData.customItems);
          saveCustomShoppingItems(cloudData.customItems);
        }
        setUserData(cloudData);
      }

      const customRecipes = recipes.filter(r => r.isCustom);
      const customIngredients = ingredients.filter(i => i.notes?.includes('importé') || i.id.startsWith('ing-'));
      const syncedTimestamp = await saveUserCloudData(user.uid, {
        weeklyPlan,
        checkedMap,
        customItems,
        customRecipes,
        customIngredients,
        recipeCount: customRecipes.length,
        theme,
        subscriptionStatus: userData?.subscriptionStatus || 'free',
        displayName: user.displayName,
        email: user.email,
      });

      if (syncedTimestamp) {
        setLastSyncedAt(syncedTimestamp);
        setSyncStatus('synced');
      }
    } catch (e) {
      console.error('Manual sync failed:', e);
      setSyncStatus('error');
      throw e;
    }
  };

  return {
    pushCloudChanges,
    scheduleCloudSync,
    handleManualSync,
    isSyncingFromCloud: isSyncingFromCloudRef.current
  };
}
