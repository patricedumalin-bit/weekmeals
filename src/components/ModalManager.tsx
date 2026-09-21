import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { useDataStore } from '../stores/useDataStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useCloudSync } from '../hooks/useCloudSync';
import { RecipeDetailModal } from './RecipeDetailModal';
import { RecipePickerModal } from './RecipePickerModal';
import { RecipeEditorModal } from './RecipeEditorModal';
import { UserProfileModal } from './UserProfileModal';
import { PantryModal } from './PantryModal';
import { AutoPlanModal } from './AutoPlanModal';
import { CookingModeModal } from './CookingModeModal';
import { RecipeImportModal } from './RecipeImportModal';
import { NutritionDashboard } from './NutritionDashboard';
import { useLanguage } from '../i18n/LanguageContext';
import { auth, db } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { saveRecipes, saveWeeklyPlan } from '../utils/storage';
import { createPersonalCopyOfRecipe } from '../utils/cloudSync';
import { calculateShoppingList } from '../utils/calculator';
import { Ingredient, Recipe } from '../types';

export const ModalManager: React.FC<{
  onSignOut?: () => void;
  onSwitchToAuth?: () => void;
  onSaveIngredient?: (ing: Ingredient) => void;
}> = ({ onSignOut, onSwitchToAuth, onSaveIngredient }) => {
  const { t, translateMealLabel } = useLanguage();

  const appStore = useAppStore();
  const {
    previewRecipeState, setPreviewRecipeState,
    recipePickerTarget, setRecipePickerTarget,
    recipeEditorState, setRecipeEditorState,
    isProfileModalOpen, setIsProfileModalOpen,
    isPantryModalOpen, setIsPantryModalOpen,
    isAutoPlanModalOpen, setIsAutoPlanModalOpen,
    cookingModeState, setCookingModeState,
    isRecipeImportModalOpen, setIsRecipeImportModalOpen,
    isNutritionDashboardOpen, setIsNutritionDashboardOpen,
    databaseSource, setDatabaseSource,
    theme, setTheme,
    isSeedingGeneric, setIsSeedingGeneric
  } = appStore;

  const dataStore = useDataStore();
  const {
    recipes, recipeCategories, ingredients, ingredientCategories, weeklyPlan, pantryMap, customItems, checkedMap,
    saveRecipe, deleteRecipe, updateWeeklyPlan, togglePantryItem, batchSetPantry, toggleShoppingItem, addCustomShoppingItem, removeCustomShoppingItem,
    setRecipes, setRecipeCategories, setIngredients, setIngredientCategories, setWeeklyPlan, setCheckedMap, setCustomItems,
    saveIngredient
  } = dataStore;

  const authStore = useAuthStore();
  const { user, userData, syncStatus, lastSyncedAt, setUserData } = authStore;

  const { handleManualSync, scheduleCloudSync } = useCloudSync();

  const { totalItemsCount } = calculateShoppingList(
    weeklyPlan || { meals: [], numberOfMeals: 0, defaultServings: 4, id: '', lastUpdated: '' },
    recipes,
    ingredients,
    ingredientCategories,
    checkedMap,
    customItems
  );

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

    updatedMeals[mealIndex] = { ...meal, excludedIngredients: excludedMap };
    updateWeeklyPlan({ ...weeklyPlan, meals: updatedMeals });
  };

  const handleTogglePickerRecipe = async (recipeId: string) => {
    if (!recipePickerTarget || !weeklyPlan) return;
    const { mealIndex } = recipePickerTarget;
    const meal = weeklyPlan.meals[mealIndex];
    if (!meal) return;

    const currentIds = meal.recipeIds || [];
    let updatedIds: string[];

    if (currentIds.includes(recipeId)) {
      updatedIds = currentIds.filter(id => id !== recipeId);
    } else {
      if (currentIds.length >= 3) return;
      if (userData?.subscriptionStatus !== 'premium' && (userData?.mealCount || 0) >= 3) {
        alert("Limite de 3 repas atteinte. Passez en premium pour ajouter plus de repas.");
        return;
      }
      updatedIds = [...currentIds, recipeId];
    }

    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = { ...meal, recipeIds: updatedIds };
    updateWeeklyPlan({ ...weeklyPlan, meals: updatedMeals });

    if (userData?.subscriptionStatus !== 'premium') {
      const newCount = (userData?.mealCount || 0) + 1;
      if (user.uid !== 'local-guest') {
        await setDoc(doc(db, 'users', user.uid), { mealCount: newCount }, { merge: true });
      }
      setUserData({ ...userData, mealCount: newCount });
    }
  };

  const handleCopyGenericToPersonal = async (recipe: any) => {
    try {
      const personalRecipe = createPersonalCopyOfRecipe(recipe);
      saveRecipe(personalRecipe);
      alert(`"${personalRecipe.title}" a été copiée dans votre base personnelle Cloud !`);
    } catch (err) {
      console.error('Erreur copie recette:', err);
      alert('Impossible de copier la recette.');
    }
  };

  const handleUpdateDisplayName = async (newName: string) => {
    if (!user || user.uid === 'local-guest') {
      setUserData({ ...userData, displayName: newName });
      return;
    }
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: newName });
    }
    setUserData({ ...userData, displayName: newName });
  };

  const handleUpdateDietaryGoal = async (newGoal: string) => {
    if (!user || user.uid === 'local-guest') {
      setUserData({ ...userData, dietaryGoal: newGoal });
      return;
    }
    await setDoc(doc(db, 'users', user.uid), { dietaryGoal: newGoal }, { merge: true });
    setUserData({ ...userData, dietaryGoal: newGoal });
  };

  const handleUpdateTheme = async (newTheme: string) => {
    setTheme(newTheme);
    if (!user) return;
    if (user.uid !== 'local-guest') {
      try {
        await setDoc(doc(db, 'users', user.uid), { theme: newTheme }, { merge: true });
      } catch (e) { console.error("Failed to update theme", e); }
    }
    setUserData({ ...userData, theme: newTheme });
  };

  const handleTogglePremium = async () => {
    if (!user) return;
    const newStatus = userData?.subscriptionStatus === 'premium' ? 'free' : 'premium';
    if (user.uid !== 'local-guest') {
      await setDoc(doc(db, 'users', user.uid), { subscriptionStatus: newStatus }, { merge: true });
    }
    setUserData({ ...userData, subscriptionStatus: newStatus });
  };

  return (
    <>
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
          pantryMap={pantryMap}
          onToggleExcludeIngredient={handleToggleExcludeIngredient}
          onClose={() => setPreviewRecipeState(null)}
          onStartCookingMode={(recipe, servings) => setCookingModeState({ isOpen: true, recipe, servings })}
        />
      )}

      {recipePickerTarget && weeklyPlan && (
        <RecipePickerModal
          isOpen={Boolean(recipePickerTarget)}
          mealLabel={translateMealLabel(
            weeklyPlan.meals[recipePickerTarget.mealIndex]?.mealNumber ?? (recipePickerTarget.mealIndex + 1),
            weeklyPlan.meals[recipePickerTarget.mealIndex]?.label
          )}
          mealIndex={recipePickerTarget.mealIndex}
          currentRecipeIds={weeklyPlan.meals[recipePickerTarget.mealIndex]?.recipeIds || []}
          currentCustomMeals={weeklyPlan.meals[recipePickerTarget.mealIndex]?.customMeals || []}
          recipes={recipes}
          recipeCategories={recipeCategories}
          ingredients={ingredients}
          ingredientCategories={ingredientCategories}
          databaseSource={databaseSource}
          onChangeDatabaseSource={setDatabaseSource}
          onCopyGenericToPersonal={handleCopyGenericToPersonal}
          pantryMap={pantryMap}
          onClose={() => setRecipePickerTarget(null)}
          onToggleRecipe={handleTogglePickerRecipe}
          onSaveCustomMeals={(mealIndex, customMeals) => {
            const updatedMeals = [...weeklyPlan.meals];
            updatedMeals[mealIndex] = { ...updatedMeals[mealIndex], customMeals };
            updateWeeklyPlan({ ...weeklyPlan, meals: updatedMeals });
          }}
          onSaveAsRecipe={async (name, catId, mode, ings) => {
             const newRecipe: Recipe = {
               id: `recipe-${Date.now()}`,
               title: name,
               categoryId: catId,
               servings: 4,
               prepTimeMinutes: 10,
               cookTimeMinutes: 10,
               difficulty: 'easy',
               description: '',
               instructions: [],
               ingredients: ings.map(ci => ({ ingredientId: ci.ingredientId, quantity: ci.quantity, unit: ci.unit })),
               tags: ['custom'],
               isCustom: true,
               cookingMode: mode
             };
             saveRecipe(newRecipe);
          }}
          onPreviewRecipe={(rec) => setPreviewRecipeState({ recipe: rec })}
          onDeleteRecipe={deleteRecipe}
          onCreateNewRecipe={() => {
            setRecipePickerTarget(null);
            setRecipeEditorState({ isOpen: true, recipeToEdit: null });
          }}
          onSaveRecipe={saveRecipe}
        />
      )}

      {recipeEditorState.isOpen && (
        <RecipeEditorModal
          isOpen={recipeEditorState.isOpen}
          recipeToEdit={recipeEditorState.recipeToEdit}
          recipeCategories={recipeCategories}
          ingredients={ingredients}
          ingredientCategories={ingredientCategories}
          onClose={() => setRecipeEditorState({ isOpen: false, recipeToEdit: null })}
          onSave={saveRecipe}
        />
      )}

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
        onUpdateDietaryGoal={handleUpdateDietaryGoal}
        onSwitchToAuth={onSwitchToAuth}
      />

      <PantryModal
        isOpen={isPantryModalOpen}
        onClose={() => setIsPantryModalOpen(false)}
        ingredients={ingredients}
        ingredientCategories={ingredientCategories}
        pantryMap={pantryMap}
        onTogglePantryItem={togglePantryItem}
        onBatchSetPantry={batchSetPantry}
        onSaveIngredient={onSaveIngredient || saveIngredient}
        recipes={recipes}
      />

      <AutoPlanModal
        isOpen={isAutoPlanModalOpen}
        onClose={() => setIsAutoPlanModalOpen(false)}
        weeklyPlan={weeklyPlan}
        recipes={recipes}
        recipeCategories={recipeCategories}
        ingredients={ingredients}
        pantryMap={pantryMap}
        onApplyPlan={updateWeeklyPlan}
      />

      {cookingModeState.isOpen && cookingModeState.recipe && (
        <CookingModeModal
          isOpen={cookingModeState.isOpen}
          onClose={() => setCookingModeState({ isOpen: false, recipe: null, servings: 4 })}
          recipe={cookingModeState.recipe}
          servings={cookingModeState.servings}
          ingredients={ingredients}
          ingredientCategories={ingredientCategories}
        />
      )}

      <RecipeImportModal
        isOpen={isRecipeImportModalOpen}
        onClose={() => setIsRecipeImportModalOpen(false)}
        recipeCategories={recipeCategories}
        ingredients={ingredients}
        ingredientCategories={ingredientCategories}
        recipes={recipes}
        onSaveImportedRecipe={(recipe) => {
          saveRecipe(recipe);
          setPreviewRecipeState({ recipe });
        }}
        onSaveNewIngredient={saveIngredient}
      />

      <NutritionDashboard
        isOpen={isNutritionDashboardOpen}
        onClose={() => setIsNutritionDashboardOpen(false)}
        weeklyPlan={weeklyPlan}
        recipes={recipes}
        ingredients={ingredients}
        pantryMap={pantryMap}
      />
    </>
  );
};
