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
  saveUserCloudData
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
    setIsLoaded,
    isLoaded
  } = useDataStore();
  const { setTheme, theme } = useAppStore();

  const isSyncingFromCloudRef = useRef(false);

  // 1. Initial Local Load
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
    return () => { cancelled = true; };
  }, [setRecipes, setRecipeCategories, setIngredients, setIngredientCategories, setWeeklyPlan, setCheckedMap, setCustomItems, setPantryMap, setIsLoaded]);

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
    return () => { if (unsubGeneric) unsubGeneric(); };
  }, [isLoaded, recipes, setRecipes]);

  // 3. User Cloud Hydration & Real-time Subscription
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

          if (Array.isArray(cloudData.customRecipes) && cloudData.customRecipes.length > 0) {
            setRecipes(prev => {
              const map = new Map<string, Recipe>(prev.map(r => [r.id, r]));
              cloudData.customRecipes.forEach((cr: Recipe) => map.set(cr.id, cr));
              const merged = Array.from(map.values());
              saveRecipes(merged);
              return merged;
            });
          }

          if (cloudData.weeklyPlan && cloudData.weeklyPlan.meals && cloudData.weeklyPlan.meals.length > 0) {
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
        } else if (isSubscribed) {
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

          if (Array.isArray(data.customRecipes)) {
            setRecipes(prev => {
              const map = new Map<string, Recipe>(prev.map(r => [r.id, r]));
              data.customRecipes.forEach((cr: Recipe) => map.set(cr.id, cr));
              const merged = Array.from(map.values());
              saveRecipes(merged);
              return merged;
            });
          }

          if (data.weeklyPlan) {
            setWeeklyPlan(data.weeklyPlan);
            saveWeeklyPlan(data.weeklyPlan);
          }

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
  }, [user, setTheme, theme, recipes, weeklyPlan, checkedMap, customItems, setRecipes, setWeeklyPlan, setCheckedMap, setCustomItems, setSyncStatus, setUserData, setLastSyncedAt]);
}
