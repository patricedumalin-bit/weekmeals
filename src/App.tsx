import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAppStore } from './stores/useAppStore';
import { useDataStore } from './stores/useDataStore';
import { useAuthStore } from './stores/useAuthStore';
import { useInitialization } from './hooks/useInitialization';
import { useCloudSync } from './hooks/useCloudSync';
import { useSyncQueue } from './hooks/useSyncQueue';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { PlannedMealsList } from './components/PlannedMealsList';
import { ShoppingListView } from './components/ShoppingListView';
import { DatabaseManager } from './components/DatabaseManager';
import { ModalManager } from './components/ModalManager';
import { Sparkles, Plus } from 'lucide-react';
import { PrintableSheet } from './components/PrintableSheet';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Auth from './components/Auth';
import { calculateShoppingList, getWeeklyPlanSummary } from './utils/calculator';
import { generateFullGenericDatabase, resetToDefaults, clearDatabase } from './utils/storage';
import { handlePdfPrint } from './utils/pdfGenerator';

/**
 * Main Application Shell (Content visible after login)
 */
function AppContent({
  onSignOut,
  onSwitchToAuth 
}: { 
  onSignOut?: () => void;
  onSwitchToAuth?: () => void;
}) {
  // 1. Hooks for logic
  useInitialization();
  const { handleManualSync } = useCloudSync();
  useSyncQueue();

  // 2. Global Stores
  const {
    activeTab, setActiveTab,
    theme, setTheme,
    previewRecipeState, setPreviewRecipeState,
    setRecipePickerTarget,
    setRecipeEditorState,
    setIsProfileModalOpen,
    setIsPantryModalOpen,
    setIsAutoPlanModalOpen,
    setIsNutritionDashboardOpen,
    setIsBatchCookingModalOpen,
    setIsRecipeImportModalOpen,
    databaseSource, setDatabaseSource,
    isSeedingGeneric, setIsSeedingGeneric
  } = useAppStore();

  const {
    recipes, recipeCategories, ingredients, ingredientCategories, weeklyPlan,
    checkedMap, customItems, pantryMap, isLoaded,
    updateWeeklyPlan, saveRecipe, deleteRecipe, toggleShoppingItem,
    addCustomShoppingItem, removeCustomShoppingItem, resetChecked,
    setRecipes, setRecipeCategories, setIngredients, setIngredientCategories, setWeeklyPlan, setPantryMap,
    saveRecipeCategory, deleteRecipeCategory, saveIngredient, deleteIngredient,
    saveIngredientCategory, deleteIngredientCategory, importDatabase,
    toggleMealCooked, lockWeeklyPlan, resetWeeklyPlan, archiveWeeklyPlan
  } = useDataStore();

  const { user, userData, syncStatus } = useAuthStore();

  // 3. UI Helpers
  const handleResetAndArchive = () => {
    if (!weeklyPlan) return;
    const stats = getWeeklyPlanSummary(weeklyPlan, recipes, ingredients, pantryMap);
    if (stats.mealsCount > 0) {
      archiveWeeklyPlan({
        id: `week-${Date.now()}`,
        weekNumber: 1,
        year: new Date().getFullYear(),
        ...stats,
        date: new Date().toISOString()
      });
    }
    resetWeeklyPlan();
  };

  const handleCopyGenericToPersonal = async (recipe: any) => {
    const { createPersonalCopyOfRecipe } = await import('./utils/cloudSync');
    const personal = createPersonalCopyOfRecipe(recipe);
    saveRecipe(personal);
  };

  const handleSeedGenericCloud = async () => {
    setIsSeedingGeneric(true);
    try {
      const { seedGenericCatalogIfEmpty } = await import('./utils/cloudSync');
      await seedGenericCatalogIfEmpty(recipes.filter(r => !r.isCustom));
    } finally {
      setIsSeedingGeneric(false);
    }
  };

  const handleGenerateGenericDatabase = async () => {
    const fresh = await generateFullGenericDatabase();
    setRecipes(fresh.recipes);
    setRecipeCategories(fresh.recipeCategories);
    setIngredients(fresh.ingredients);
    setIngredientCategories(fresh.ingredientCategories);
    setWeeklyPlan(fresh.weeklyPlan);
    setPantryMap(fresh.pantryMap);
    resetChecked();
  };

  const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateClasses = () => {
      const darkMatch = mediaQuery.matches;
      setIsDark(darkMatch);

      [html, body].forEach(el => {
        if (!el) return;
        el.classList.toggle('dark', darkMatch);
        const themeClasses = Array.from(el.classList).filter(c => c.startsWith('theme-'));
        themeClasses.forEach(c => el.classList.remove(c));
        el.classList.add(`theme-${theme}`);
      });
    };

    updateClasses();
    mediaQuery.addEventListener('change', updateClasses);
    return () => mediaQuery.removeEventListener('change', updateClasses);
  }, [theme]);

  if (!isLoaded || !weeklyPlan || !weeklyPlan.meals) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        <p className="text-xs text-slate-400">Chargement...</p>
      </div>
    );
  }

  const { totalItemsCount, checkedItemsCount } = calculateShoppingList(
    weeklyPlan, recipes || [], ingredients || [], ingredientCategories || [], checkedMap || {}, customItems || []
  );

  const totalAssignedRecipes = (weeklyPlan?.meals || []).reduce((sum, m) => sum + (m?.recipeIds?.length || 0), 0);
  const { t, language, translateMealLabel, translateRecipe, translateIngredientCategory, translateIngredient, translateUnit } = useLanguage();

  const handlePrint = (type: 'planning' | 'shopping' | 'both' = 'both') => {
      handlePdfPrint(type, weeklyPlan, recipes, ingredients, ingredientCategories, customItems, language, t, translateMealLabel, translateRecipe, translateIngredientCategory, translateIngredient, translateUnit);
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
    resetChecked();
  };

  return (
    <div
      className={`min-h-screen ${isDark ? 'dark' : ''} theme-${theme} bg-[var(--bg)] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-[var(--accent)]/30 relative overflow-x-hidden`}
    >
      <Header
        activeTab={activeTab} setActiveTab={setActiveTab}
        weeklyPlan={weeklyPlan}
        totalShoppingItems={totalItemsCount} checkedShoppingItems={checkedItemsCount}
        onPrint={handlePrint} onReset={handleResetDatabase}
        isPremium={userData?.subscriptionStatus === 'premium'}
        user={user} currentTheme={theme} onUpdateTheme={setTheme}
        onSignOut={onSignOut} onOpenProfile={() => setIsProfileModalOpen(true)}
        syncStatus={syncStatus}
      />

      <main className="no-print flex-1 max-w-6xl w-full mx-auto px-4 py-6 relative z-10">
        {activeTab === 'planner' && (
          <WeeklyPlanner
            weeklyPlan={weeklyPlan} recipes={recipes} recipeCategories={recipeCategories}
            ingredients={ingredients} ingredientCategories={ingredientCategories} pantryMap={pantryMap}
            onUpdatePlan={updateWeeklyPlan} isPremium={userData?.subscriptionStatus === 'premium'}
            onToggleMealCooked={toggleMealCooked}
            onLockPlan={lockWeeklyPlan}
            onResetPlan={handleResetAndArchive}
            onOpenRecipePicker={(m, s) => setRecipePickerTarget({ mealIndex: m, slotIndex: s })}
            onPreviewRecipe={(r, s, mi, ri) => setPreviewRecipeState({ recipe: r, servings: s, mealIndex: mi, recipeIndex: ri })}
            onGoToShopping={() => setActiveTab('shopping')}
            onOpenAutoPlan={() => setIsAutoPlanModalOpen(true)}
            onOpenNutrition={() => setIsNutritionDashboardOpen(true)}
            onOpenPantry={() => setIsPantryModalOpen(true)}
            onOpenBatchCooking={() => setIsBatchCookingModalOpen(true)}
          />
        )}

        {activeTab === 'shopping' && (
          <ShoppingListView
            weeklyPlan={weeklyPlan} recipes={recipes} ingredients={ingredients}
            ingredientCategories={ingredientCategories} checkedMap={checkedMap}
            customItems={customItems} pantryMap={pantryMap}
            onOpenPantry={() => setIsPantryModalOpen(true)}
            onToggleItem={toggleShoppingItem}
            onAddCustomItem={addCustomShoppingItem}
            onRemoveCustomItem={removeCustomShoppingItem}
            onResetChecked={resetChecked}
            onPrint={() => handlePrint('shopping')}
          />
        )}
        {activeTab === 'database' && (
          <DatabaseManager
            recipes={recipes} recipeCategories={recipeCategories}
            ingredients={ingredients} ingredientCategories={ingredientCategories}
            weeklyPlan={weeklyPlan} databaseSource={databaseSource}
            onChangeDatabaseSource={setDatabaseSource}
            onCopyGenericToPersonal={handleCopyGenericToPersonal}
            onSeedGenericCloud={handleSeedGenericCloud}
            isSeedingGeneric={isSeedingGeneric}
            onSaveRecipe={saveRecipe} onDeleteRecipe={deleteRecipe}
            onSaveRecipeCategory={saveRecipeCategory} onDeleteRecipeCategory={deleteRecipeCategory}
            onSaveIngredient={saveIngredient} onDeleteIngredient={deleteIngredient}
            onSaveIngredientCategory={saveIngredientCategory} onDeleteIngredientCategory={deleteIngredientCategory}
            onImportDatabase={importDatabase} onResetDatabase={handleResetDatabase}
            onClearDatabase={clearDatabase}
            onGenerateGenericDatabase={handleGenerateGenericDatabase}
            onOpenRecipeEditor={(r) => setRecipeEditorState({ isOpen: true, recipeToEdit: r || null })}
            onPreviewRecipe={(r) => setPreviewRecipeState({ recipe: r })}
            onOpenRecipeImport={() => setIsRecipeImportModalOpen(true)}
          />
        )}
      </main>

      <PrintableSheet
        weeklyPlan={weeklyPlan} recipes={recipes} recipeCategories={recipeCategories}
        ingredients={ingredients} ingredientCategories={ingredientCategories} customItems={customItems}
      />

      <BottomNav
        activeTab={activeTab} setActiveTab={setActiveTab}
        plannedRecipesCount={totalAssignedRecipes}
        shoppingItemsCount={totalItemsCount} checkedShoppingCount={checkedItemsCount}
      />

      <ModalManager
        onSignOut={onSignOut}
        onSwitchToAuth={onSwitchToAuth}
        onSaveIngredient={saveIngredient}
      />
    </div>
  );
}

/**
 * Entry point Component with Auth handling
 */
export default function App() {
  const { user, setUser } = useAuthStore();
  const [guestMode, setGuestMode] = useState<boolean>(() => localStorage.getItem('guest_mode') === 'true');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setGuestMode(false);
        localStorage.removeItem('guest_mode');
      } else if (guestMode) {
        setUser({ uid: 'local-guest', displayName: 'Invité', email: 'guest@weekmeals.app', isAnonymous: true });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, [guestMode, setUser]);

  const handleContinueAsGuest = () => {
    localStorage.setItem('guest_mode', 'true');
    setGuestMode(true);
    setUser({ uid: 'local-guest', displayName: 'Invité', email: 'guest@weekmeals.app', isAnonymous: true });
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('guest_mode');
      setGuestMode(false);
      setUser(null);
      await signOut(auth);
    } catch (e) { console.error("Failed to sign out", e); }
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
      <AppContent onSignOut={handleSignOut} onSwitchToAuth={() => { setGuestMode(false); setUser(null); }} />
    </LanguageProvider>
  );
}
