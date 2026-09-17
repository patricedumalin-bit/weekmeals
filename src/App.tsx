/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import Auth from './components/Auth';
import { 
  ActiveTab, 
  Recipe, 
  RecipeCategory, 
  Ingredient, 
  IngredientCategory, 
  WeeklyPlan, 
  CustomShoppingItem,
  CustomMealIngredient,
  CustomMeal,
  CookingModeType,
  SyncStatus,
  DatabaseViewSource
} from './types';
import { 
  loadStoredData, 
  saveRecipes, 
  saveRecipeCategories, 
  saveIngredients, 
  saveIngredientCategories, 
  saveWeeklyPlan, 
  saveCheckedMap, 
  saveCustomShoppingItems,
  savePantryMap,
  resetToDefaults,
  clearDatabase,
  generateFullGenericDatabase
} from './utils/storage';
import { calculateShoppingList } from './utils/calculator';
import { 
  fetchUserCloudData, 
  saveUserCloudData, 
  subscribeToUserCloudData, 
  testFirestoreConnection,
  seedGenericCatalogIfEmpty,
  subscribeToGenericCatalog,
  createPersonalCopyOfRecipe
} from './utils/cloudSync';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { PlannedMealsList } from './components/PlannedMealsList';
import { ShoppingListView } from './components/ShoppingListView';
import { DatabaseManager } from './components/DatabaseManager';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { RecipePickerModal } from './components/RecipePickerModal';
import { RecipeEditorModal } from './components/RecipeEditorModal';
import { UserProfileModal } from './components/UserProfileModal';
import { PrintableSheet } from './components/PrintableSheet';
import { PantryModal } from './components/PantryModal';
import { AutoPlanModal } from './components/AutoPlanModal';
import { CookingModeModal } from './components/CookingModeModal';
import { RecipeImportModal } from './components/RecipeImportModal';
import { NutritionDashboard } from './components/NutritionDashboard';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent({ 
  user, 
  onSignOut, 
  onSwitchToAuth 
}: { 
  user: any; 
  onSignOut?: () => void; 
  onSwitchToAuth?: () => void;
}) {
  const { translateMealLabel } = useLanguage();
  const [userData, setUserData] = useState<any>(null);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'default');

  // Cloud Synchronization States
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => 
    user?.uid === 'local-guest' ? 'offline' : 'synced'
  );
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const syncTimeoutRef = useRef<any>(null);
  const isSyncingFromCloudRef = useRef(false);

  // Main Data States
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeCategories, setRecipeCategories] = useState<RecipeCategory[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientCategories, setIngredientCategories] = useState<IngredientCategory[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [customItems, setCustomItems] = useState<CustomShoppingItem[]>([]);
  const [pantryMap, setPantryMap] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('planner');

  // Dual Database Source Selection (Shared between DatabaseManager and RecipePickerModal)
  const [databaseSource, setDatabaseSource] = useState<DatabaseViewSource>('all');
  const [isSeedingGeneric, setIsSeedingGeneric] = useState<boolean>(false);

  // Load local data on initial mount. The default recipe/ingredient catalog is
  // fetched via a dynamic import (see utils/storage.ts) so it downloads as a
  // separate chunk after the initial app shell has already been requested,
  // instead of blocking/enlarging the main bundle.
  useEffect(() => {
    let cancelled = false;
    loadStoredData().then(loaded => {
      if (cancelled) return;
      setRecipes(loaded.recipes);
      setRecipeCategories(loaded.recipeCategories);
      setIngredients(loaded.ingredients);
      setIngredientCategories(loaded.ingredientCategories);
      setWeeklyPlan(loaded.weeklyPlan);
      setCheckedMap(loaded.checkedMap);
      setCustomItems(loaded.customItems);
      setPantryMap(loaded.pantryMap || {});
      setIsLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Generic Cloud Catalog: Auto-seed if empty and subscribe to app-wide generic catalog
  useEffect(() => {
    if (!isLoaded) return;
    let unsubGeneric: (() => void) | undefined;

    const initGeneric = async () => {
      try {
        const starter = recipes.filter(r => !r.isCustom);
        if (starter.length > 0) {
          await seedGenericCatalogIfEmpty(starter);
        }

        unsubGeneric = subscribeToGenericCatalog((catalog) => {
          if (catalog && Array.isArray(catalog.recipes) && catalog.recipes.length > 0) {
            setRecipes(prev => {
              const personal = prev.filter(r => r.isCustom);
              const map = new Map<string, Recipe>();
              catalog.recipes.forEach(r => map.set(r.id, r));
              personal.forEach(r => map.set(r.id, r));
              const merged = Array.from(map.values());
              saveRecipes(merged);
              return merged;
            });
          }
        });
      } catch (err) {
        console.warn('Error connecting to generic cloud catalog:', err);
      }
    };

    initGeneric();

    return () => {
      if (unsubGeneric) unsubGeneric();
    };
  }, [isLoaded]);

  // Cloud Synchronization: Listen & Hydrate
  useEffect(() => {
    if (!user) return;

    if (user.uid === 'local-guest') {
      setSyncStatus('offline');
      setUserData({
        theme: 'default',
        subscriptionStatus: 'premium',
        recipeCount: 0,
        mealCount: 0,
        displayName: 'Invité'
      });
      return;
    }

    testFirestoreConnection();

    // Initial Hydration & Real-time subscription
    let isSubscribed = true;
    const initAndSubscribe = async () => {
      setSyncStatus('syncing');
      try {
        const cloudData = await fetchUserCloudData(user.uid);
        if (cloudData && isSubscribed) {
          setUserData(cloudData);
          if (cloudData.lastSyncedAt) setLastSyncedAt(cloudData.lastSyncedAt);
          if (cloudData.theme) {
            setTheme(cloudData.theme);
            localStorage.setItem('theme', cloudData.theme);
          }

          // Hydrate recipes from cloud
          if (Array.isArray(cloudData.customRecipes) && cloudData.customRecipes.length > 0) {
            setRecipes(prev => {
              const map = new Map<string, Recipe>(prev.map(r => [r.id, r]));
              cloudData.customRecipes.forEach((cr: Recipe) => map.set(cr.id, cr));
              const merged = Array.from(map.values());
              saveRecipes(merged);
              return merged;
            });
          }

          // Hydrate weekly plan
          if (cloudData.weeklyPlan && cloudData.weeklyPlan.meals && cloudData.weeklyPlan.meals.length > 0) {
            setWeeklyPlan(cloudData.weeklyPlan);
            saveWeeklyPlan(cloudData.weeklyPlan);
          }

          // Hydrate checked shopping list
          if (cloudData.checkedMap) {
            setCheckedMap(cloudData.checkedMap);
            saveCheckedMap(cloudData.checkedMap);
          }

          // Hydrate custom shopping items
          if (Array.isArray(cloudData.customItems)) {
            setCustomItems(cloudData.customItems);
            saveCustomShoppingItems(cloudData.customItems);
          }

          setSyncStatus('synced');
        } else if (isSubscribed) {
          // Document doesn't exist yet: bootstrap it with current local data
          const currentCustomRecipes = recipes.filter(r => r.isCustom);
          const initialData = {
            userId: user.uid,
            displayName: user.displayName || '',
            email: user.email || '',
            theme: 'default',
            subscriptionStatus: 'free' as const,
            recipeCount: currentCustomRecipes.length,
            mealCount: 0,
            weeklyPlan: weeklyPlan,
            checkedMap: checkedMap,
            customItems: customItems,
            customRecipes: currentCustomRecipes,
            lastSyncedAt: new Date().toISOString()
          };
          await saveUserCloudData(user.uid, initialData);
          setUserData(initialData);
          setLastSyncedAt(initialData.lastSyncedAt);
          setSyncStatus('synced');
        }
      } catch (err) {
        console.error('Error hydrating cloud data:', err);
        setSyncStatus('error');
      }

      // Realtime listener for cross-device updates
      const unsubscribe = subscribeToUserCloudData(
        user.uid,
        (data) => {
          if (!data || !isSubscribed) return;
          if (isSyncingFromCloudRef.current) return;

          setUserData(data);
          if (data.lastSyncedAt) setLastSyncedAt(data.lastSyncedAt);
          if (data.theme && data.theme !== theme) {
            setTheme(data.theme);
            localStorage.setItem('theme', data.theme);
          }

          // Sync remote custom recipes
          if (Array.isArray(data.customRecipes)) {
            setRecipes(prev => {
              const map = new Map<string, Recipe>(prev.map(r => [r.id, r]));
              data.customRecipes.forEach((cr: Recipe) => map.set(cr.id, cr));
              const merged = Array.from(map.values());
              saveRecipes(merged);
              return merged;
            });
          }

          // Sync remote weekly plan
          if (data.weeklyPlan) {
            setWeeklyPlan(data.weeklyPlan);
            saveWeeklyPlan(data.weeklyPlan);
          }

          // Sync remote shopping list
          if (data.checkedMap) {
            setCheckedMap(data.checkedMap);
            saveCheckedMap(data.checkedMap);
          }

          if (Array.isArray(data.customItems)) {
            setCustomItems(data.customItems);
            saveCustomShoppingItems(data.customItems);
          }

          setSyncStatus('synced');
        },
        () => {
          setSyncStatus('error');
        }
      );

      return unsubscribe;
    };

    let cleanupPromise = initAndSubscribe();
    return () => {
      isSubscribed = false;
      cleanupPromise.then(unsub => {
        if (typeof unsub === 'function') unsub();
      });
    };
  }, [user]);

  // Debounced cloud push function
  const pushCloudChanges = useCallback(async (
    planToSync?: WeeklyPlan | null, 
    checkedToSync?: Record<string, boolean>, 
    customItemsToSync?: CustomShoppingItem[], 
    recipesToSync?: Recipe[]
  ) => {
    if (!user || user.uid === 'local-guest') {
      setSyncStatus('offline');
      return;
    }
    try {
      setSyncStatus('syncing');
      isSyncingFromCloudRef.current = true;
      const targetRecipes = recipesToSync || recipes;
      const customRecipes = targetRecipes.filter(r => r.isCustom);
      const syncedTimestamp = await saveUserCloudData(user.uid, {
        weeklyPlan: planToSync !== undefined ? planToSync : weeklyPlan,
        checkedMap: checkedToSync !== undefined ? checkedToSync : checkedMap,
        customItems: customItemsToSync !== undefined ? customItemsToSync : customItems,
        customRecipes,
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
  }, [user, recipes, weeklyPlan, checkedMap, customItems, theme, userData]);

  const scheduleCloudSync = useCallback((
    plan?: WeeklyPlan | null,
    checked?: Record<string, boolean>,
    items?: CustomShoppingItem[],
    recs?: Recipe[]
  ) => {
    if (!user || user.uid === 'local-guest') return;
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      pushCloudChanges(plan, checked, items, recs);
    }, 1000);
  }, [user, pushCloudChanges]);

  // Manual Cloud Synchronization
  const handleManualSync = async () => {
    if (!user || user.uid === 'local-guest') return;
    setSyncStatus('syncing');
    try {
      // 1. Fetch latest cloud data
      const cloudData = await fetchUserCloudData(user.uid);
      if (cloudData) {
        if (Array.isArray(cloudData.customRecipes)) {
          setRecipes(prev => {
            const map = new Map<string, Recipe>(prev.map(r => [r.id, r]));
            cloudData.customRecipes.forEach((cr: Recipe) => map.set(cr.id, cr));
            const merged = Array.from(map.values());
            saveRecipes(merged);
            return merged;
          });
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
        if (cloudData.theme) {
          setTheme(cloudData.theme);
        }
        setUserData(cloudData);
      }

      // 2. Upload consolidated state
      const customRecipes = recipes.filter(r => r.isCustom);
      const syncedTimestamp = await saveUserCloudData(user.uid, {
        weeklyPlan,
        checkedMap,
        customItems,
        customRecipes,
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

  // Profile display name updating
  const handleUpdateDisplayName = async (newName: string) => {
    if (!user || user.uid === 'local-guest') {
      user.displayName = newName;
      setUserData((prev: any) => ({ ...prev, displayName: newName }));
      return;
    }
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: newName });
    }
    await saveUserCloudData(user.uid, { displayName: newName });
    setUserData((prev: any) => ({ ...prev, displayName: newName }));
  };

  const isPremium = userData?.subscriptionStatus === 'premium';
  
  const themeBg = {
    pro: 'bg-[#F8F9FA]',
    nature: 'bg-[#FBF8F3]',
    minimalist: 'bg-[#FFFFFF]',
    creative: 'bg-[#F5F3FF]',
    default: 'bg-[#F8F9FA]'
  };
  
  const canAddRecipe = () => {
    if (isPremium) return true;
    return (userData?.recipeCount || 0) < 20;
  };

  const canAddMeal = () => {
    if (userData?.subscriptionStatus === 'premium') return true;
    return (userData?.mealCount || 0) < 3;
  };

  const handleTogglePremium = async () => {
    if (!user) return;
    const newStatus = userData?.subscriptionStatus === 'premium' ? 'free' : 'premium';
    if (user.uid === 'local-guest') {
      setUserData((prev: any) => ({ ...prev, subscriptionStatus: newStatus }));
      return;
    }
    await setDoc(doc(db, 'users', user.uid), {
        subscriptionStatus: newStatus
    }, { merge: true });
    setUserData((prev: any) => ({ ...prev, subscriptionStatus: newStatus }));
  };

  const handleUpdateTheme = async (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (!user) return;
    if (user.uid === 'local-guest') {
      setUserData((prev: any) => prev ? { ...prev, theme: newTheme } : { theme: newTheme });
      return;
    }
    try {
      await setDoc(doc(db, 'users', user.uid), {
          theme: newTheme
      }, { merge: true });
      setUserData((prev: any) => prev ? { ...prev, theme: newTheme } : { theme: newTheme });
    } catch (e) {
      console.error("Failed to update theme", e);
    }
  };

  // Modal States
  const [previewRecipeState, setPreviewRecipeState] = useState<{
    recipe: Recipe;
    servings?: number;
    mealIndex?: number;
    recipeIndex?: number;
  } | null>(null);

  const [recipePickerTarget, setRecipePickerTarget] = useState<{
    mealIndex: number;
    slotIndex: number;
  } | null>(null);

  const [recipeEditorState, setRecipeEditorState] = useState<{
    isOpen: boolean;
    recipeToEdit: Recipe | null;
  }>({
    isOpen: false,
    recipeToEdit: null
  });

  // New Feature Modals
  const [isPantryModalOpen, setIsPantryModalOpen] = useState(false);
  const [isAutoPlanModalOpen, setIsAutoPlanModalOpen] = useState(false);
  const [cookingModeState, setCookingModeState] = useState<{
    isOpen: boolean;
    recipe: Recipe | null;
    servings: number;
  }>({
    isOpen: false,
    recipe: null,
    servings: 4
  });
  const [isRecipeImportModalOpen, setIsRecipeImportModalOpen] = useState(false);
  const [isNutritionDashboardOpen, setIsNutritionDashboardOpen] = useState(false);

  // Sync dark mode class from system settings
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const html = document.documentElement;
      const body = document.body;
      if (e.matches) {
        html.classList.add('dark');
        if (body) body.classList.add('dark');
      } else {
        html.classList.remove('dark');
        if (body) body.classList.remove('dark');
      }
    };
    
    handleThemeChange(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleThemeChange);
      return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }
  }, [theme]);

  // Synchronize document theme class
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Manage class names on html
    const htmlClasses = Array.from(html.classList).filter(c => c.startsWith('theme-'));
    htmlClasses.forEach(c => html.classList.remove(c));
    html.classList.add(`theme-${theme}`);

    // Manage class names on body
    if (body) {
      const bodyClasses = Array.from(body.classList).filter(c => c.startsWith('theme-'));
      bodyClasses.forEach(c => body.classList.remove(c));
      body.classList.add(`theme-${theme}`);
    }

    // Direct color configurations to bypass any stylesheet priority issue
    const isDark = html.classList.contains('dark') || (body && body.classList.contains('dark'));
    const themeColors = isDark ? {
      default: { bg: '#0F172A', primary: '#F1F5F9', accent: '#3B82F6' },
      pro: { bg: '#111827', primary: '#F3F4F6', accent: '#60A5FA' },
      nature: { bg: '#141E17', primary: '#E8F5E9', accent: '#FF8A65' },
      minimalist: { bg: '#18181B', primary: '#FAF5FF', accent: '#F59E0B' },
      creative: { bg: '#1E1B4B', primary: '#EEF2FF', accent: '#A78BFA' }
    } : {
      default: { bg: '#E2E8F0', primary: '#1E293B', accent: '#2563EB' },
      pro: { bg: '#CBD5E1', primary: '#1E293B', accent: '#2563EB' },
      nature: { bg: '#E5DCC6', primary: '#1C3A27', accent: '#C85A32' },
      minimalist: { bg: '#E4E4E7', primary: '#18181B', accent: '#D4AF37' },
      creative: { bg: '#DDD6FE', primary: '#2E1065', accent: '#7C3AED' }
    };

    const colors = themeColors[theme as keyof typeof themeColors] || themeColors.default;

    // Apply inline styling on top of CSS variables
    html.style.setProperty('--bg', colors.bg);
    html.style.setProperty('--primary', colors.primary);
    html.style.setProperty('--accent', colors.accent);
    html.style.backgroundColor = colors.bg;

    if (body) {
      body.style.setProperty('--bg', colors.bg);
      body.style.setProperty('--primary', colors.primary);
      body.style.setProperty('--accent', colors.accent);
      body.style.backgroundColor = colors.bg;
    }
  }, [theme]);

  // Save changes
  const handleUpdateWeeklyPlan = (newPlan: WeeklyPlan) => {
    setWeeklyPlan(newPlan);
    saveWeeklyPlan(newPlan);
    scheduleCloudSync(newPlan, undefined, undefined, undefined);
  };

  const handleToggleExcludeIngredient = (mealIndex: number, recipeIndex: number, ingredientId: string) => {
    if (!weeklyPlan) return;
    const updatedMeals = [...weeklyPlan.meals];
    const meal = updatedMeals[mealIndex];
    if (!meal) return;

    const excludedMap = { ...(meal.excludedIngredients || {}) };
    const currentList = [...(excludedMap[recipeIndex] || [])];

    let newList: string[];
    if (currentList.includes(ingredientId)) {
      newList = currentList.filter(id => id !== ingredientId);
    } else {
      newList = [...currentList, ingredientId];
    }

    if (newList.length > 0) {
      excludedMap[recipeIndex] = newList;
    } else {
      delete excludedMap[recipeIndex];
    }

    updatedMeals[mealIndex] = {
      ...meal,
      excludedIngredients: excludedMap
    };

    handleUpdateWeeklyPlan({
      ...weeklyPlan,
      meals: updatedMeals
    });
  };

  const handleSaveRecipe = async (recipe: Recipe) => {
    const exists = recipes.some(r => r.id === recipe.id);
    if (!exists && !(await canAddRecipe())) {
      alert("Limite de 20 recettes atteinte. Passez en premium pour ajouter plus de recettes.");
      return;
    }
    
    const updated = exists
      ? recipes.map(r => (r.id === recipe.id ? recipe : r))
      : [recipe, ...recipes];
    setRecipes(updated);
    saveRecipes(updated);
    scheduleCloudSync(undefined, undefined, undefined, updated);

    if (!exists && userData?.subscriptionStatus !== 'premium') {
      if (user.uid === 'local-guest') {
        setUserData((prev: any) => ({ ...prev, recipeCount: (prev.recipeCount || 0) + 1 }));
        return;
      }
      await setDoc(doc(db, 'users', user.uid), {
        recipeCount: (userData?.recipeCount || 0) + 1
      }, { merge: true });
      setUserData((prev: any) => ({ ...prev, recipeCount: (prev.recipeCount || 0) + 1 }));
    }
  };

  const handleDeleteRecipe = (recipeId: string) => {
    const updated = recipes.filter(r => r.id !== recipeId);
    setRecipes(updated);
    saveRecipes(updated);
    scheduleCloudSync(undefined, undefined, undefined, updated);

    // Also remove from weekly plan
    if (weeklyPlan) {
      const cleanedMeals = weeklyPlan.meals.map(m => ({
        ...m,
        recipeIds: (m.recipeIds || []).filter(id => id !== recipeId)
      }));
      handleUpdateWeeklyPlan({
        ...weeklyPlan,
        meals: cleanedMeals
      });
    }
  };

  const handleSaveRecipeCategory = (cat: RecipeCategory) => {
    const exists = recipeCategories.some(c => c.id === cat.id);
    const updated = exists
      ? recipeCategories.map(c => (c.id === cat.id ? cat : c))
      : [...recipeCategories, cat];
    setRecipeCategories(updated);
    saveRecipeCategories(updated);
  };

  const handleDeleteRecipeCategory = (catId: string) => {
    const updated = recipeCategories.filter(c => c.id !== catId);
    setRecipeCategories(updated);
    saveRecipeCategories(updated);
  };

  const handleSaveIngredient = (ing: Ingredient) => {
    const exists = ingredients.some(i => i.id === ing.id);
    const updated = exists
      ? ingredients.map(i => (i.id === ing.id ? ing : i))
      : [ing, ...ingredients];
    setIngredients(updated);
    saveIngredients(updated);
  };

  const handleDeleteIngredient = (ingId: string) => {
    const updated = ingredients.filter(i => i.id !== ingId);
    setIngredients(updated);
    saveIngredients(updated);
  };

  const handleSaveIngredientCategory = (cat: IngredientCategory) => {
    const exists = ingredientCategories.some(c => c.id === cat.id);
    const updated = exists
      ? ingredientCategories.map(c => (c.id === cat.id ? cat : c))
      : [...ingredientCategories, cat];
    setIngredientCategories(updated);
    saveIngredientCategories(updated);
  };

  const handleDeleteIngredientCategory = (catId: string) => {
    const updated = ingredientCategories.filter(c => c.id !== catId);
    setIngredientCategories(updated);
    saveIngredientCategories(updated);
  };

  const handleToggleShoppingItem = (key: string) => {
    const updated = {
      ...checkedMap,
      [key]: !checkedMap[key]
    };
    setCheckedMap(updated);
    saveCheckedMap(updated);
    scheduleCloudSync(undefined, updated, undefined, undefined);
  };

  const handleResetChecked = () => {
    setCheckedMap({});
    saveCheckedMap({});
    scheduleCloudSync(undefined, {}, undefined, undefined);
  };

  const handleAddCustomShoppingItem = (item: CustomShoppingItem) => {
    const updated = [item, ...customItems];
    setCustomItems(updated);
    saveCustomShoppingItems(updated);
    scheduleCloudSync(undefined, undefined, updated, undefined);
  };

  const handleRemoveCustomShoppingItem = (id: string) => {
    const updated = customItems.filter(i => i.id !== id);
    setCustomItems(updated);
    saveCustomShoppingItems(updated);
    scheduleCloudSync(undefined, undefined, updated, undefined);
  };

  const handleTogglePantryItem = (ingredientId: string) => {
    const updated = {
      ...pantryMap,
      [ingredientId]: !pantryMap[ingredientId]
    };
    setPantryMap(updated);
    savePantryMap(updated);
  };

  const handleBatchSetPantry = (updates: Record<string, boolean>) => {
    setPantryMap(updates);
    savePantryMap(updates);
  };

  const handleClearPantry = () => {
    setPantryMap({});
    savePantryMap({});
  };

  const handleResetDatabase = async () => {
    resetToDefaults();
    const fresh = await generateFullGenericDatabase();
    setRecipes(fresh.recipes);
    setRecipeCategories(fresh.recipeCategories);
    setIngredients(fresh.ingredients);
    setIngredientCategories(fresh.ingredientCategories);
    setWeeklyPlan(fresh.weeklyPlan);
    setPantryMap(fresh.pantryMap);
    setCheckedMap({});
    setCustomItems([]);
  };

  const handleGenerateGenericDatabase = async () => {
    const data = await generateFullGenericDatabase();
    setRecipes(data.recipes);
    setRecipeCategories(data.recipeCategories);
    setIngredients(data.ingredients);
    setIngredientCategories(data.ingredientCategories);
    setWeeklyPlan(data.weeklyPlan);
    setPantryMap(data.pantryMap);
    setCheckedMap({});
    setCustomItems([]);
    if (user && user.uid !== 'local-guest') {
      scheduleCloudSync(data.weeklyPlan, {}, [], data.recipes.filter(r => r.isCustom));
    }
    alert('Base de données générique générée avec succès ! 250+ recettes, planning de 7 repas équilibrés, ingrédients et placard immédiatement prêts à l\'emploi.');
  };

  const handleClearDatabase = () => {
    console.log('Handle clear database called');
    alert('Vider la base appelé');
    clearDatabase();
    setRecipes([]);
    setRecipeCategories([]);
    setIngredients([]);
    setIngredientCategories([]);
    setWeeklyPlan({ meals: [] });
    setCheckedMap({});
    setCustomItems([]);
    window.location.reload();
  };

  const handleImportDatabase = (data: any) => {
    if (data.recipes && Array.isArray(data.recipes)) {
      setRecipes(data.recipes);
      saveRecipes(data.recipes);
    }
    if (data.recipeCategories && Array.isArray(data.recipeCategories)) {
      setRecipeCategories(data.recipeCategories);
      saveRecipeCategories(data.recipeCategories);
    }
    if (data.ingredients && Array.isArray(data.ingredients)) {
      setIngredients(data.ingredients);
      saveIngredients(data.ingredients);
    }
    if (data.ingredientCategories && Array.isArray(data.ingredientCategories)) {
      setIngredientCategories(data.ingredientCategories);
      saveIngredientCategories(data.ingredientCategories);
    }
    if (data.weeklyPlan && data.weeklyPlan.meals) {
      setWeeklyPlan(data.weeklyPlan);
      saveWeeklyPlan(data.weeklyPlan);
    }
    alert('Database backup restored successfully!');
  };

  // Recipe Picker selection toggle
  const handleTogglePickerRecipe = async (recipeId: string) => {
    if (!recipePickerTarget || !weeklyPlan) return;
    const { mealIndex } = recipePickerTarget;
    const meal = weeklyPlan.meals[mealIndex];
    if (!meal) return;

    const currentIds = meal.recipeIds || [];
    let updatedIds: string[];

    if (currentIds.includes(recipeId)) {
      // Remove
      updatedIds = currentIds.filter(id => id !== recipeId);
    } else {
      // Add up to 3
      if (currentIds.length >= 3) return;
      if (!(await canAddMeal())) {
        alert("Limite de 3 repas atteinte. Passez en premium pour ajouter plus de repas.");
        return;
      }
      updatedIds = [...currentIds, recipeId];
    }

    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = {
      ...meal,
      recipeIds: updatedIds
    };

    handleUpdateWeeklyPlan({
      ...weeklyPlan,
      meals: updatedMeals
    });

    if (userData?.subscriptionStatus !== 'premium') {
      if (user.uid === 'local-guest') {
        setUserData(prev => ({ ...prev, mealCount: (prev.mealCount || 0) + 1 }));
        return;
      }
      await setDoc(doc(db, 'users', user.uid), {
        mealCount: (userData?.mealCount || 0) + 1
      }, { merge: true });
      setUserData(prev => ({ ...prev, mealCount: (prev.mealCount || 0) + 1 }));
    }
  };

  const handleSaveCustomMeals = async (mealIndex: number, customMeals: CustomMeal[]) => {
    if (!weeklyPlan) return;
    const meal = weeklyPlan.meals[mealIndex];
    if (!meal) return;

    const wasCustom = (meal.customMeals && meal.customMeals.length > 0);
    const isNowCustom = (customMeals && customMeals.length > 0);

    if (isNowCustom && !wasCustom) {
      if (!isPremium && (userData?.recipeCount || 0) >= 20) {
        alert("Limite de 20 recettes atteinte. Passez en premium pour ajouter plus de recettes.");
        return;
      }
    }

    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = {
      ...meal,
      customMeals
    };

    handleUpdateWeeklyPlan({
      ...weeklyPlan,
      meals: updatedMeals
    });

    if (isNowCustom && !wasCustom) {
      if (userData?.subscriptionStatus !== 'premium') {
        if (user.uid === 'local-guest') {
          setUserData(prev => ({ ...prev, recipeCount: (prev.recipeCount || 0) + 1 }));
          return;
        }
        await setDoc(doc(db, 'users', user.uid), {
          recipeCount: (userData?.recipeCount || 0) + 1
        }, { merge: true });
        setUserData(prev => ({ ...prev, recipeCount: (prev.recipeCount || 0) + 1 }));
      }
    }
  };

  const handleConvertCustomToRecipe = async (
    name: string,
    categoryId: string,
    cookingMode: CookingModeType,
    customIngredients: CustomMealIngredient[]
  ) => {
    if (!isPremium && (userData?.recipeCount || 0) >= 20) {
      alert("Limite de 20 recettes atteinte. Passez en premium pour ajouter plus de recettes.");
      return;
    }

    const newRecipeId = `recipe-${Date.now()}`;
    const newRecipe: Recipe = {
      id: newRecipeId,
      title: name,
      categoryId,
      servings: 4,
      prepTimeMinutes: 10,
      cookTimeMinutes: 10,
      difficulty: 'easy',
      description: 'Recette générée depuis un repas personnalisé.',
      instructions: [],
      ingredients: customIngredients.map(ci => ({
        ingredientId: ci.ingredientId,
        quantity: ci.quantity,
        unit: ci.unit
      })),
      tags: ['custom'],
      isCustom: true,
      cookingMode
    };

    await handleSaveRecipe(newRecipe);

    // Automatically select the recipe in the active meal slot if the picker is open
    if (recipePickerTarget && weeklyPlan) {
      const { mealIndex } = recipePickerTarget;
      const targetMeal = weeklyPlan.meals[mealIndex];
      if (targetMeal) {
        const currentIds = targetMeal.recipeIds || [];
        if (!currentIds.includes(newRecipeId) && currentIds.length < 3) {
          const updatedMeals = [...weeklyPlan.meals];
          updatedMeals[mealIndex] = {
            ...targetMeal,
            recipeIds: [...currentIds, newRecipeId],
            customMeals: [] // Clear custom meals so it transitions perfectly into a library recipe
          };
          handleUpdateWeeklyPlan({
            ...weeklyPlan,
            meals: updatedMeals
          });
        }
      }
    }

    alert('Recette enregistrée et ajoutée au repas avec succès !');
  };

  // Sync / Seed Generic Cloud Catalog
  const handleSeedGenericCloud = async () => {
    setIsSeedingGeneric(true);
    try {
      const starter = recipes.filter(r => !r.isCustom);
      const seeded = await seedGenericCatalogIfEmpty(starter);
      if (seeded) {
        alert('Catalogue générique Cloud initialisé et synchronisé avec succès !');
      } else {
        alert('Le catalogue générique Cloud est opérationnel et synchronisé.');
      }
    } catch (err) {
      console.error('Erreur catalogue Cloud:', err);
      alert('Erreur lors de la synchronisation du catalogue Cloud.');
    } finally {
      setIsSeedingGeneric(false);
    }
  };

  // Copy generic recipe to user's personal cloud database
  const handleCopyGenericToPersonal = async (recipe: Recipe) => {
    try {
      const personalRecipe = createPersonalCopyOfRecipe(recipe);
      await handleSaveRecipe(personalRecipe);
      alert(`"${personalRecipe.title}" a été copiée dans votre base personnelle Cloud !`);
    } catch (err) {
      console.error('Erreur copie recette:', err);
      alert('Impossible de copier la recette.');
    }
  };

  // Trigger Print
  const handlePrint = () => {
    window.print();
  };

  if (!isLoaded || !weeklyPlan) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  // Calculate live grocery totals
  const { totalItemsCount, checkedItemsCount } = calculateShoppingList(
    weeklyPlan,
    recipes,
    ingredients,
    ingredientCategories,
    checkedMap,
    customItems
  );

  const totalAssignedRecipes = weeklyPlan.meals.reduce(
    (sum, m) => sum + (m.recipeIds?.length || 0),
    0
  );

  return (
    <div 
      className={`min-h-screen theme-${theme} text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-[var(--accent)]/30 relative overflow-x-hidden`}
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Frosted Glass Background Lighting Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 no-print">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--primary)]/20 dark:bg-[var(--primary)]/15 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[var(--accent)]/20 dark:bg-[var(--accent)]/15 blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-amber-400/15 dark:bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-[var(--primary)]/20 dark:bg-[var(--primary)]/15 blur-3xl" />
      </div>

      {/* Top App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        weeklyPlan={weeklyPlan}
        totalShoppingItems={totalItemsCount}
        checkedShoppingItems={checkedItemsCount}
        onPrint={handlePrint}
        onReset={handleResetDatabase}
        isPremium={userData?.subscriptionStatus === 'premium'}
        user={user}
        onTogglePremium={handleTogglePremium}
        currentTheme={userData?.theme || 'default'}
        onUpdateTheme={handleUpdateTheme}
        onSignOut={onSignOut}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        syncStatus={syncStatus}
      />

      {/* Main Container */}
      <main className="no-print flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 relative z-10">
        {activeTab === 'planner' && (
          <WeeklyPlanner
            weeklyPlan={weeklyPlan}
            recipes={recipes}
            recipeCategories={recipeCategories}
            ingredients={ingredients}
            ingredientCategories={ingredientCategories}
            onUpdatePlan={handleUpdateWeeklyPlan}
            isPremium={userData?.subscriptionStatus === 'premium'}
            onOpenRecipePicker={(mealIdx, slotIdx) => {
              setRecipePickerTarget({ mealIndex: mealIdx, slotIndex: slotIdx });
            }}
            onPreviewRecipe={(rec, servings, mealIdx, rIdx) => {
              setPreviewRecipeState({ recipe: rec, servings, mealIndex: mealIdx, recipeIndex: rIdx });
            }}
            onGoToShopping={() => setActiveTab('shopping')}
            onOpenAutoPlan={() => setIsAutoPlanModalOpen(true)}
            onOpenNutrition={() => setIsNutritionDashboardOpen(true)}
            onOpenPantry={() => setIsPantryModalOpen(true)}
          />
        )}

        {activeTab === 'meals' && (
          <PlannedMealsList
            weeklyPlan={weeklyPlan}
            recipes={recipes}
            recipeCategories={recipeCategories}
            ingredients={ingredients}
            ingredientCategories={ingredientCategories}
            onPreviewRecipe={(rec, servings) => {
              setPreviewRecipeState({ recipe: rec, servings });
            }}
            onGoToPlanner={() => setActiveTab('planner')}
            onGoToShopping={() => setActiveTab('shopping')}
            onPrint={handlePrint}
          />
        )}

        {activeTab === 'shopping' && (
          <ShoppingListView
            weeklyPlan={weeklyPlan}
            recipes={recipes}
            ingredients={ingredients}
            ingredientCategories={ingredientCategories}
            checkedMap={checkedMap}
            customItems={customItems}
            pantryMap={pantryMap}
            onOpenPantry={() => setIsPantryModalOpen(true)}
            onToggleItem={handleToggleShoppingItem}
            onAddCustomItem={handleAddCustomShoppingItem}
            onRemoveCustomItem={handleRemoveCustomShoppingItem}
            onResetChecked={handleResetChecked}
            onPrint={handlePrint}
          />
        )}

        {activeTab === 'database' && (
          <DatabaseManager
            recipes={recipes}
            recipeCategories={recipeCategories}
            ingredients={ingredients}
            ingredientCategories={ingredientCategories}
            weeklyPlan={weeklyPlan}
            databaseSource={databaseSource}
            onChangeDatabaseSource={setDatabaseSource}
            onCopyGenericToPersonal={handleCopyGenericToPersonal}
            onSeedGenericCloud={handleSeedGenericCloud}
            isSeedingGeneric={isSeedingGeneric}
            onSaveRecipe={handleSaveRecipe}
            onDeleteRecipe={handleDeleteRecipe}
            onSaveRecipeCategory={handleSaveRecipeCategory}
            onDeleteRecipeCategory={handleDeleteRecipeCategory}
            onSaveIngredient={handleSaveIngredient}
            onDeleteIngredient={handleDeleteIngredient}
            onSaveIngredientCategory={handleSaveIngredientCategory}
            onDeleteIngredientCategory={handleDeleteIngredientCategory}
            onImportDatabase={handleImportDatabase}
            onResetDatabase={handleResetDatabase}
            onClearDatabase={handleClearDatabase}
            onGenerateGenericDatabase={handleGenerateGenericDatabase}
            onOpenRecipeEditor={(recipe) => {
              setRecipeEditorState({ isOpen: true, recipeToEdit: recipe || null });
            }}
            onPreviewRecipe={(rec) => {
              setPreviewRecipeState({ recipe: rec });
            }}
            onOpenRecipeImport={() => setIsRecipeImportModalOpen(true)}
          />
        )}
      </main>

      {/* Printable Sheet (hidden on screen, active on print) */}
      <PrintableSheet
        weeklyPlan={weeklyPlan}
        recipes={recipes}
        recipeCategories={recipeCategories}
        ingredients={ingredients}
        ingredientCategories={ingredientCategories}
        customItems={customItems}
      />

      {/* Android Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        plannedRecipesCount={totalAssignedRecipes}
        shoppingItemsCount={totalItemsCount}
        checkedShoppingCount={checkedItemsCount}
      />

      {/* Modal 1: Recipe Preview / Details */}
      {previewRecipeState && weeklyPlan && (
        <RecipeDetailModal
          recipe={previewRecipeState.recipe}
          recipeCategories={recipeCategories}
          ingredients={ingredients}
          ingredientCategories={ingredientCategories}
          initialServings={previewRecipeState.servings}
          mealIndex={previewRecipeState.mealIndex}
          recipeIndex={previewRecipeState.recipeIndex}
          excludedIngredientIds={
            previewRecipeState.mealIndex !== undefined && previewRecipeState.recipeIndex !== undefined
              ? weeklyPlan.meals[previewRecipeState.mealIndex]?.excludedIngredients?.[previewRecipeState.recipeIndex] || []
              : undefined
          }
          onToggleExcludeIngredient={handleToggleExcludeIngredient}
          onClose={() => setPreviewRecipeState(null)}
          onStartCookingMode={(recipe, servings) => {
            setCookingModeState({ isOpen: true, recipe, servings });
          }}
        />
      )}

      {/* Modal 2: Recipe Picker Bottom Sheet */}
      {recipePickerTarget && weeklyPlan && (
        <RecipePickerModal
          isOpen={Boolean(recipePickerTarget)}
          mealLabel={
            translateMealLabel(
              weeklyPlan.meals[recipePickerTarget.mealIndex]?.mealNumber ?? (recipePickerTarget.mealIndex + 1),
              weeklyPlan.meals[recipePickerTarget.mealIndex]?.label
            )
          }
          mealIndex={recipePickerTarget.mealIndex}
          currentRecipeIds={
            weeklyPlan.meals[recipePickerTarget.mealIndex]?.recipeIds || []
          }
          currentCustomMeals={weeklyPlan.meals[recipePickerTarget.mealIndex]?.customMeals || []}
          recipes={recipes}
          recipeCategories={recipeCategories}
          ingredients={ingredients}
          ingredientCategories={ingredientCategories}
          databaseSource={databaseSource}
          onChangeDatabaseSource={setDatabaseSource}
          onCopyGenericToPersonal={handleCopyGenericToPersonal}
          onClose={() => setRecipePickerTarget(null)}
          onToggleRecipe={handleTogglePickerRecipe}
          onSaveCustomMeals={handleSaveCustomMeals}
          onSaveAsRecipe={handleConvertCustomToRecipe}
          onPreviewRecipe={(rec) => {
            setPreviewRecipeState({ recipe: rec });
          }}
          onDeleteRecipe={handleDeleteRecipe}
          onCreateNewRecipe={() => {
            setRecipePickerTarget(null);
            setRecipeEditorState({ isOpen: true, recipeToEdit: null });
          }}
        />
      )}

      {/* Modal 3: Recipe Editor / Creator */}
      {recipeEditorState.isOpen && (
        <RecipeEditorModal
          isOpen={recipeEditorState.isOpen}
          recipeToEdit={recipeEditorState.recipeToEdit}
          recipeCategories={recipeCategories}
          ingredients={ingredients}
          ingredientCategories={ingredientCategories}
          onClose={() => setRecipeEditorState({ isOpen: false, recipeToEdit: null })}
          onSave={handleSaveRecipe}
        />
      )}

      {/* Modal 4: User Profile & Cloud Synchronization */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        userData={userData}
        syncStatus={syncStatus}
        lastSyncedAt={lastSyncedAt}
        onManualSync={handleManualSync}
        customRecipesCount={recipes.filter(r => r.isCustom).length}
        plannedMealsCount={weeklyPlan?.meals.reduce((sum, m) => sum + (m.recipeIds?.length || 0) + (m.customMeals?.length || 0), 0) || 0}
        shoppingItemsCount={totalItemsCount}
        currentTheme={userData?.theme || theme}
        onUpdateTheme={handleUpdateTheme}
        isPremium={userData?.subscriptionStatus === 'premium'}
        onTogglePremium={handleTogglePremium}
        onSignOut={onSignOut || (() => {})}
        onUpdateDisplayName={handleUpdateDisplayName}
        onSwitchToAuth={onSwitchToAuth}
      />

      {/* Modal 5: Pantry / Inventory Management */}
      <PantryModal
        isOpen={isPantryModalOpen}
        onClose={() => setIsPantryModalOpen(false)}
        ingredients={ingredients}
        ingredientCategories={ingredientCategories}
        pantryMap={pantryMap}
        onTogglePantryItem={handleTogglePantryItem}
        onBatchSetPantry={handleBatchSetPantry}
        recipes={recipes}
      />

      {/* Modal 6: Smart Auto-Planning */}
      <AutoPlanModal
        isOpen={isAutoPlanModalOpen}
        onClose={() => setIsAutoPlanModalOpen(false)}
        weeklyPlan={weeklyPlan}
        recipes={recipes}
        recipeCategories={recipeCategories}
        ingredients={ingredients}
        pantryMap={pantryMap}
        onApplyPlan={handleUpdateWeeklyPlan}
      />

      {/* Modal 7: Step-by-Step Cooking Mode */}
      {cookingModeState.isOpen && cookingModeState.recipe && (
        <CookingModeModal
          isOpen={cookingModeState.isOpen}
          onClose={() => setCookingModeState({ isOpen: false, recipe: null, servings: 4 })}
          recipe={cookingModeState.recipe}
          servings={cookingModeState.servings}
          ingredients={ingredients}
        />
      )}

      {/* Modal 8: Web / AI Recipe Importer */}
      <RecipeImportModal
        isOpen={isRecipeImportModalOpen}
        onClose={() => setIsRecipeImportModalOpen(false)}
        recipeCategories={recipeCategories}
        ingredients={ingredients}
        ingredientCategories={ingredientCategories}
        onSaveImportedRecipe={(recipe) => {
          handleSaveRecipe(recipe);
          setPreviewRecipeState({ recipe });
        }}
      />

      {/* Modal 9: Nutrition Dashboard */}
      <NutritionDashboard
        isOpen={isNutritionDashboardOpen}
        onClose={() => setIsNutritionDashboardOpen(false)}
        weeklyPlan={weeklyPlan}
        recipes={recipes}
        ingredients={ingredients}
      />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [guestMode, setGuestMode] = useState<boolean>(() => {
    return localStorage.getItem('guest_mode') === 'true';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setGuestMode(false);
        localStorage.removeItem('guest_mode');
      } else if (guestMode) {
        setUser({
          uid: 'local-guest',
          displayName: 'Invité',
          email: 'guest@weekmeals.app',
          isAnonymous: true
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [guestMode]);

  const handleContinueAsGuest = () => {
    localStorage.setItem('guest_mode', 'true');
    setGuestMode(true);
    setUser({
      uid: 'local-guest',
      displayName: 'Invité',
      email: 'guest@weekmeals.app',
      isAnonymous: true
    });
  };

  const handleSwitchToAuth = () => {
    localStorage.removeItem('guest_mode');
    setGuestMode(false);
    setUser(null);
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('guest_mode');
      setGuestMode(false);
      setUser(null);
      await signOut(auth);
    } catch (e) {
      console.error("Failed to sign out", e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!user) {
    return <Auth onContinueAsGuest={handleContinueAsGuest} />;
  }

  return (
    <LanguageProvider>
      <AppContent user={user} onSignOut={handleSignOut} onSwitchToAuth={handleSwitchToAuth} />
    </LanguageProvider>
  );
}
