/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
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
  CookingModeType
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
  resetToDefaults,
  clearDatabase
} from './utils/storage';
import { calculateShoppingList } from './utils/calculator';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { PlannedMealsList } from './components/PlannedMealsList';
import { ShoppingListView } from './components/ShoppingListView';
import { DatabaseManager } from './components/DatabaseManager';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { RecipePickerModal } from './components/RecipePickerModal';
import { RecipeEditorModal } from './components/RecipeEditorModal';
import { PrintableSheet } from './components/PrintableSheet';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent({ user, onSignOut }: { user: any; onSignOut?: () => void }) {
  const { translateMealLabel } = useLanguage();
  const [userData, setUserData] = useState<any>(null);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'default');

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      if (user.uid === 'local-guest') {
        setUserData({
          theme: 'default',
          subscriptionStatus: 'premium',
          recipeCount: 0,
          mealCount: 0
        });
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          if (data.theme) {
            setTheme(data.theme);
            localStorage.setItem('theme', data.theme);
          }
        } else {
          const initialData = {
            theme: 'default',
            subscriptionStatus: 'free',
            recipeCount: 0,
            mealCount: 0
          };
          await setDoc(doc(db, 'users', user.uid), initialData);
          setUserData(initialData);
          setTheme('default');
          localStorage.setItem('theme', 'default');
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore", error);
        // Fallback to offline data if network/rules fail
        setUserData({
          theme: 'default',
          subscriptionStatus: 'free',
          recipeCount: 0,
          mealCount: 0
        });
      }
    };
    fetchUserData();
  }, [user]);

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
      setUserData(prev => ({ ...prev, subscriptionStatus: newStatus }));
      return;
    }
    await setDoc(doc(db, 'users', user.uid), {
        subscriptionStatus: newStatus
    }, { merge: true });
    setUserData(prev => ({ ...prev, subscriptionStatus: newStatus }));
  };

  const handleUpdateTheme = async (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (!user) return;
    if (user.uid === 'local-guest') {
      setUserData(prev => prev ? { ...prev, theme: newTheme } : { theme: newTheme });
      return;
    }
    try {
      await setDoc(doc(db, 'users', user.uid), {
          theme: newTheme
      }, { merge: true });
      setUserData(prev => prev ? { ...prev, theme: newTheme } : { theme: newTheme });
    } catch (e) {
      console.error("Failed to update theme", e);
    }
  };

  // Main Data States
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeCategories, setRecipeCategories] = useState<RecipeCategory[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientCategories, setIngredientCategories] = useState<IngredientCategory[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [customItems, setCustomItems] = useState<CustomShoppingItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('planner');

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

  // Load data on initial mount
  useEffect(() => {
    const loaded = loadStoredData();
    setRecipes(loaded.recipes);
    setRecipeCategories(loaded.recipeCategories);
    setIngredients(loaded.ingredients);
    setIngredientCategories(loaded.ingredientCategories);
    setWeeklyPlan(loaded.weeklyPlan);
    setCheckedMap(loaded.checkedMap);
    setCustomItems(loaded.customItems);
    setIsLoaded(true);
  }, []);

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

    if (!exists && userData?.subscriptionStatus !== 'premium') {
      if (user.uid === 'local-guest') {
        setUserData(prev => ({ ...prev, recipeCount: (prev.recipeCount || 0) + 1 }));
        return;
      }
      await setDoc(doc(db, 'users', user.uid), {
        recipeCount: (userData?.recipeCount || 0) + 1
      }, { merge: true });
      setUserData(prev => ({ ...prev, recipeCount: (prev.recipeCount || 0) + 1 }));
    }
  };

  const handleDeleteRecipe = (recipeId: string) => {
    const updated = recipes.filter(r => r.id !== recipeId);
    setRecipes(updated);
    saveRecipes(updated);

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
  };

  const handleResetChecked = () => {
    setCheckedMap({});
    saveCheckedMap({});
  };

  const handleAddCustomShoppingItem = (item: CustomShoppingItem) => {
    const updated = [item, ...customItems];
    setCustomItems(updated);
    saveCustomShoppingItems(updated);
  };

  const handleRemoveCustomShoppingItem = (id: string) => {
    const updated = customItems.filter(i => i.id !== id);
    setCustomItems(updated);
    saveCustomShoppingItems(updated);
  };

  const handleResetDatabase = () => {
    resetToDefaults();
    const fresh = loadStoredData();
    setRecipes(fresh.recipes);
    setRecipeCategories(fresh.recipeCategories);
    setIngredients(fresh.ingredients);
    setIngredientCategories(fresh.ingredientCategories);
    setWeeklyPlan(fresh.weeklyPlan);
    setCheckedMap({});
    setCustomItems([]);
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

  const handleSaveCustomMeals = (mealIndex: number, customMeals: CustomMeal[]) => {
    if (!weeklyPlan) return;
    const meal = weeklyPlan.meals[mealIndex];
    if (!meal) return;

    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = {
      ...meal,
      customMeals
    };

    handleUpdateWeeklyPlan({
      ...weeklyPlan,
      meals: updatedMeals
    });
  };

  const handleConvertCustomToRecipe = (
    name: string,
    categoryId: string,
    cookingMode: CookingModeType,
    customIngredients: CustomMealIngredient[]
  ) => {
    const newRecipe: Recipe = {
      id: `recipe-${Date.now()}`,
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
    handleSaveRecipe(newRecipe);
    alert('Recette enregistrée avec succès !');
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
            onOpenRecipeEditor={(recipe) => {
              setRecipeEditorState({ isOpen: true, recipeToEdit: recipe || null });
            }}
            onPreviewRecipe={(rec) => {
              setPreviewRecipeState({ recipe: rec });
            }}
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
      <AppContent user={user} onSignOut={handleSignOut} />
    </LanguageProvider>
  );
}
