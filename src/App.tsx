/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

function AppContent({ user }: { user: any }) {
  const { translateMealLabel } = useLanguage();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };
    fetchUserData();
  }, [user]);

  const isPremium = userData?.subscriptionStatus === 'premium';
  
  const canAddRecipe = () => {
    if (isPremium) return true;
    return (userData?.recipeCount || 0) < 20;
  };

  const canAddMeal = () => {
    if (userData?.subscriptionStatus === 'premium') return true;
    return (userData?.mealCount || 0) < 3;
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
      await updateDoc(doc(db, 'users', user.uid), {
        recipeCount: (userData?.recipeCount || 0) + 1
      });
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
      await updateDoc(doc(db, 'users', user.uid), {
        mealCount: (userData?.mealCount || 0) + 1
      });
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
    <div className="min-h-screen bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 relative overflow-x-hidden">
      {/* Frosted Glass Background Lighting Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 no-print">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-400/20 dark:bg-emerald-500/15 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-teal-400/20 dark:bg-teal-500/15 blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-amber-400/15 dark:bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-emerald-500/20 dark:bg-emerald-600/15 blur-3xl" />
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <LanguageProvider>
      <AppContent user={user} />
    </LanguageProvider>
  );
}
