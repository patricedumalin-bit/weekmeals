import { useEffect, useRef } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useDataStore } from '../stores/useDataStore';
import { useAppStore } from '../stores/useAppStore';
import {
  loadStoredData,
  saveRecipes,
  saveWeeklyPlan,
  saveCheckedMap,
  saveCustomShoppingItems
} from '../utils/storage';
import {
  seedGenericCatalogIfEmpty,
  subscribeToGenericCatalog,
  testFirestoreConnection,
  fetchUserCloudData,
  subscribeToUserCloudData,
  saveUserCloudData,
  fetchSystemConfig
} from '../utils/cloudSync';
import { Recipe } from '../types';

export function useInitialization() {
  const { user, setUserData, setSyncStatus, setLastSyncedAt } = useAuthStore();

  const {
    recipes,
    weeklyPlan,
    checkedMap,
    customItems,
    setRecipes,
    setRecipeCategories,
    setIngredients,
    setIngredientCategories,
    setWeeklyPlan,
    setCheckedMap,
    setCustomItems,
    setPantryMap,
    setPantryAddedDates,
    setIsLoaded,
    isLoaded
  } = useDataStore();

  const { setTheme, theme, setSystemConfig } = useAppStore();

  const isSyncingFromCloudRef = useRef(false);

  // 1. System Config Load (AI Models etc)
  useEffect(() => {
    fetchSystemConfig().then(config => {
      if (config) {
        setSystemConfig({
          geminiModel: config.geminiModel,
          groqModel: config.groqModel,
          isLoaded: true
        });
      }
    });
  }, [setSystemConfig]);

  // 2. Initial Local Load
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
      const storedDates = localStorage.getItem('meal_pantry_dates');
      if (storedDates) {
        try { setPantryAddedDates(JSON.parse(storedDates)); } catch (e) {}
      }
      setIsLoaded(true);
    });
    return () => { cancelled = true; };
  }, [setRecipes, setRecipeCategories, setIngredients, setIngredientCategories, setWeeklyPlan, setCheckedMap, setCustomItems, setPantryMap, setPantryAddedDates, setIsLoaded]);

  // 2. Generic Catalog Sync
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
            const currentRecipes = useDataStore.getState().recipes;
            const personal = currentRecipes.filter(r => r.isCustom);
            const map = new Map<string, Recipe>();
            catalog.recipes.forEach(r => map.set(r.id, r));
            personal.forEach(r => map.set(r.id, r));
            const merged = Array.from(map.values());
            saveRecipes(merged);
            setRecipes(merged);
          }
        });
      } catch (err) {
        console.warn('Error connecting to generic cloud catalog:', err);
      }
    };

    initGeneric();
    return () => { if (unsubGeneric) unsubGeneric(); };
  }, [isLoaded]);

  // 3. User Cloud Hydration
  useEffect(() => {
    if (!user) return;

    if (user.uid === 'local-guest') {
      setSyncStatus('offline');
      setUserData({
        theme: 'default',
        subscriptionStatus: 'premium',
        recipeCount: 0,
        mealCount: 0,
        displayName: 'Invité',
        aiUsage: Number(localStorage.getItem('meal_guest_ai_usage') || 0)
      });
      return;
    }

    testFirestoreConnection();

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

          if (Array.isArray(cloudData.customRecipes)) {
            const currentRecipes = useDataStore.getState().recipes;
            const map = new Map<string, Recipe>(currentRecipes.map(r => [r.id, r]));
            cloudData.customRecipes.forEach((cr: Recipe) => map.set(cr.id, cr));
            const merged = Array.from(map.values());
            saveRecipes(merged);
            setRecipes(merged);
          }

          if (cloudData.weeklyPlan) {
            setWeeklyPlan(cloudData.weeklyPlan);
            saveWeeklyPlan(cloudData.weeklyPlan);
          }

          if (cloudData.checkedMap) {
            setCheckedMap(cloudData.checkedMap);
            saveCheckedMap(cloudData.checkedMap);
          }

          if (Array.isArray(cloudData.customItems)) {
            setCustomItems(cloudData.customItems);
            saveCustomShoppingItems(cloudData.customItems);
          }

          setSyncStatus('synced');
        }
      } catch (err) {
        console.error('Error hydrating cloud data:', err);
        setSyncStatus('error');
      }

      const unsubscribe = subscribeToUserCloudData(
        user.uid,
        (data) => {
          if (!data || !isSubscribed) return;
          setUserData(data);
          setSyncStatus('synced');
        },
        () => setSyncStatus('error')
      );

      return unsubscribe;
    };

    let cleanupPromise = initAndSubscribe();
    return () => {
      isSubscribed = false;
      cleanupPromise.then(unsub => { if (typeof unsub === 'function') unsub(); });
    };
  }, [user]);
}
