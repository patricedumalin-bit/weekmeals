import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Users, 
  Calendar, 
  Sparkles, 
  Trash2, 
  Eye, 
  RotateCcw, 
  ChevronRight,
  Utensils,
  Clock,
  Shuffle,
  ChefHat,
  Layers,
  ArrowRight
} from 'lucide-react';
import { WeeklyPlan, MealSlot, Recipe, RecipeCategory, Ingredient, IngredientCategory, CookingModeType, CustomMealIngredient } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { useLanguage } from '../i18n/LanguageContext';

interface WeeklyPlannerProps {
  weeklyPlan: WeeklyPlan;
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  onUpdatePlan: (newPlan: WeeklyPlan) => void;
  onOpenRecipePicker: (mealIndex: number, slotIndex: number) => void;
  onPreviewRecipe: (recipe: Recipe, servings?: number, mealIndex?: number, recipeIndex?: number) => void;
  onGoToShopping: () => void;
  isPremium: boolean;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  weeklyPlan,
  recipes,
  recipeCategories,
  ingredients,
  ingredientCategories,
  onUpdatePlan,
  onOpenRecipePicker,
  onPreviewRecipe,
  onGoToShopping,
  isPremium
}) => {
  const { t, translateMealLabel, translateRecipeCategory, translateRecipe } = useLanguage();
  const recipeMap = new Map<string, Recipe>(recipes.map(r => [r.id, r]));
  const catMap = new Map<string, RecipeCategory>(recipeCategories.map(c => [c.id, c]));

  const MEAL_PRESETS = [
    { label: t('presetMeals', { count: 5 }), count: 5 },
    { label: t('presetMeals', { count: 7 }), count: 7 },
    { label: t('presetMeals', { count: 10 }), count: 10 },
    { label: t('presetMeals', { count: 14 }), count: 14 },
  ];

  // Change total number of meals without specifying days
  const handleSetMealCount = (newCount: number) => {
    let limit = 21;
    if (!isPremium) limit = 3;
    
    const clamped = Math.max(1, Math.min(limit, newCount));
    
    if (!isPremium && newCount > 3) {
      alert("La version gratuite est limitée à 3 repas. Passez en premium pour ajouter plus de repas.");
      return;
    }

    let updatedMeals: MealSlot[] = [...weeklyPlan.meals];

    if (clamped > updatedMeals.length) {
      // Add more generic meals (Meal 1, Meal 2, etc.)
      const currentLen = updatedMeals.length;
      for (let i = currentLen + 1; i <= clamped; i++) {
        updatedMeals.push({
          id: `meal-${Date.now()}-${i}`,
          mealNumber: i,
          label: `Meal ${i}`,
          servings: weeklyPlan.defaultServings || 4,
          recipeIds: []
        });
      }
    } else if (clamped < updatedMeals.length) {
      updatedMeals = updatedMeals.slice(0, clamped);
    }

    onUpdatePlan({
      ...weeklyPlan,
      numberOfMeals: clamped,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    });
  };

  // Modify default servings for all meals or global
  const handleSetDefaultServings = (newServings: number) => {
    const s = Math.max(1, Math.min(20, newServings));
    onUpdatePlan({
      ...weeklyPlan,
      defaultServings: s,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleApplyDefaultServingsToAll = () => {
    const updatedMeals = weeklyPlan.meals.map(m => ({
      ...m,
      servings: weeklyPlan.defaultServings
    }));
    onUpdatePlan({
      ...weeklyPlan,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    });
  };

  // Modify servings for a specific meal
  const handleUpdateMealServings = (mealIndex: number, newServings: number) => {
    const s = Math.max(1, Math.min(30, newServings));
    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = {
      ...updatedMeals[mealIndex],
      servings: s
    };
    onUpdatePlan({
      ...weeklyPlan,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    });
  };

  // Modify meal label / name
  const handleUpdateMealLabel = (mealIndex: number, newLabel: string) => {
    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = {
      ...updatedMeals[mealIndex],
      label: newLabel
    };
    onUpdatePlan({
      ...weeklyPlan,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    });
  };

  // Remove a recipe from a meal
  const handleRemoveRecipeFromMeal = (mealIndex: number, recipeIndex: number) => {
    const updatedMeals = [...weeklyPlan.meals];
    const currentRecipeIds = [...(updatedMeals[mealIndex].recipeIds || [])];
    currentRecipeIds.splice(recipeIndex, 1);
    updatedMeals[mealIndex] = {
      ...updatedMeals[mealIndex],
      recipeIds: currentRecipeIds
    };
    onUpdatePlan({
      ...weeklyPlan,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    });
  };

  // Clear all recipes in a meal
  const handleClearMeal = (mealIndex: number) => {
    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = {
      ...updatedMeals[mealIndex],
      recipeIds: []
    };
    onUpdatePlan({
      ...weeklyPlan,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleClearCustomMeal = (mealIndex: number, customMealId: string) => {
    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = {
      ...updatedMeals[mealIndex],
      customMeals: (updatedMeals[mealIndex].customMeals || []).filter(cm => cm.id !== customMealId)
    };
    onUpdatePlan({
      ...weeklyPlan,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    });
  };

  // Auto-fill balanced random recipes across empty slots
  const handleAutoSuggestMeals = () => {
    if (recipes.length === 0) return;
    const mains = recipes.filter(r => r.categoryId.includes('poultry') || r.categoryId.includes('seafood') || r.categoryId.includes('pasta') || r.categoryId.includes('veggie') || r.categoryId.includes('quick'));
    const sides = recipes.filter(r => r.categoryId.includes('starters') || r.categoryId.includes('sides'));
    const desserts = recipes.filter(r => r.categoryId.includes('desserts'));

    const updatedMeals = weeklyPlan.meals.map((meal) => {
      if (meal.recipeIds && meal.recipeIds.length > 0) return meal; // Keep already chosen recipes

      const chosen: string[] = [];
      // Pick 1 main
      if (mains.length > 0) {
        const randomMain = mains[Math.floor(Math.random() * mains.length)];
        chosen.push(randomMain.id);
      }
      // 50% chance pick side/starter
      if (sides.length > 0 && Math.random() > 0.4) {
        const randomSide = sides[Math.floor(Math.random() * sides.length)];
        if (!chosen.includes(randomSide.id)) chosen.push(randomSide.id);
      }
      // 30% chance pick dessert
      if (desserts.length > 0 && Math.random() > 0.6 && chosen.length < 3) {
        const randomDessert = desserts[Math.floor(Math.random() * desserts.length)];
        if (!chosen.includes(randomDessert.id)) chosen.push(randomDessert.id);
      }

      return {
        ...meal,
        recipeIds: chosen.slice(0, 3)
      };
    });

    onUpdatePlan({
      ...weeklyPlan,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    });
  };

  const totalAssignedRecipes = weeklyPlan.meals.reduce(
    (sum, m) => sum + (m.recipeIds?.length || 0),
    0
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner / Week Controls */}
      <div className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-5 sm:p-6 shadow-lg shadow-slate-900/5 transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left: Number of Meals & Default Servings */}
          <div className="space-y-4 flex-1">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[var(--accent)]/10 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/20 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('plannerConfigTag')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {t('plannerTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t('plannerSubtitle')}
              </p>
            </div>

            {/* Controls Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Number of Meals Stepper */}
              <div className="p-3 rounded-2xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] shadow-2xs transition-all duration-300">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {t('numMealsInPlan')}
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={weeklyPlan.numberOfMeals <= 1}
                      onClick={() => handleSetMealCount(weeklyPlan.numberOfMeals - 1)}
                      className="w-8 h-8 rounded-xl backdrop-blur-md bg-[var(--cell-bg-hover)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary)] disabled:opacity-30 shadow-2xs hover:scale-105 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-extrabold text-[var(--primary)] dark:text-[var(--accent)] min-w-8 text-center font-mono">
                      {weeklyPlan.numberOfMeals}
                    </span>
                    <button
                      disabled={weeklyPlan.numberOfMeals >= 21}
                      onClick={() => handleSetMealCount(weeklyPlan.numberOfMeals + 1)}
                      className="w-8 h-8 rounded-xl backdrop-blur-md bg-[var(--cell-bg-hover)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary)] disabled:opacity-30 shadow-2xs hover:scale-105 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {t('mealSlotsCount', { count: weeklyPlan.numberOfMeals })}
                  </span>
                </div>
              </div>

              {/* Default Servings Stepper */}
              <div className="p-3 rounded-2xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] shadow-2xs transition-all duration-300">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('defaultPersonsLabel')}
                  </span>
                  <button
                    onClick={handleApplyDefaultServingsToAll}
                    title="Apply this number to all meals in the list"
                    className="text-[11px] font-semibold text-[var(--primary)] dark:text-[var(--accent)] hover:underline"
                  >
                    {t('applyToAll')}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={weeklyPlan.defaultServings <= 1}
                      onClick={() => handleSetDefaultServings(weeklyPlan.defaultServings - 1)}
                      className="w-8 h-8 rounded-xl backdrop-blur-md bg-[var(--cell-bg-hover)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary)] disabled:opacity-30 shadow-2xs hover:scale-105 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100 min-w-8 text-center font-mono">
                      {weeklyPlan.defaultServings}
                    </span>
                    <button
                      disabled={weeklyPlan.defaultServings >= 20}
                      onClick={() => handleSetDefaultServings(weeklyPlan.defaultServings + 1)}
                      className="w-8 h-8 rounded-xl backdrop-blur-md bg-[var(--cell-bg-hover)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary)] disabled:opacity-30 shadow-2xs hover:scale-105 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {t('perMealBase')}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1">{t('presets')}</span>
              {MEAL_PRESETS.map(preset => (
                <button
                  key={preset.count}
                  onClick={() => handleSetMealCount(preset.count)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold backdrop-blur-md transition-all ${
                    weeklyPlan.numberOfMeals === preset.count
                      ? 'bg-[var(--primary)] text-white shadow-xs'
                      : 'bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Action Box */}
          <div className="backdrop-blur-md bg-[var(--accent)]/10 dark:bg-[var(--accent)]/30 border border-[var(--accent)]/20 dark:border-[var(--accent)]/20 rounded-2xl p-4 lg:w-72 flex flex-col justify-between gap-3 shrink-0 shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--primary)] dark:text-[var(--accent)] mb-1">
                <span>{t('plannerStatus')}</span>
                <span className="font-bold">{t('recipesPlannedStatus', { count: totalAssignedRecipes })}</span>
              </div>
              <p className="text-xs text-[var(--primary)] dark:text-[var(--accent)]/90 leading-relaxed">
                {t('groceryCalcNote')}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleAutoSuggestMeals}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold backdrop-blur-md bg-[var(--cell-bg-hover)] text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--cell-bg)] shadow-2xs transition-all"
              >
                <Shuffle className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>{t('autoFillEmptySlots')}</span>
              </button>

              <button
                onClick={onGoToShopping}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] hover:from-[var(--accent)] hover:to-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20 transition-all"
              >
                <span>{t('viewShoppingList')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List of Meal Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-[var(--primary)]" />
            <span>{t('plannedMealSlotsTitle', { count: weeklyPlan.meals.length })}</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t('upTo3RecipesSubtitle')}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {weeklyPlan.meals.map((meal, mealIdx) => {
            const assignedRecipes = (meal.recipeIds || [])
              .map(id => recipeMap.get(id))
              .filter((r): r is Recipe => Boolean(r));

            const maxSlots = 3;
            const emptySlotsCount = Math.max(0, maxSlots - assignedRecipes.length);
            const displayLabel = translateMealLabel(meal.mealNumber, meal.label);

            return (
              <div
                key={meal.id || mealIdx}
                className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 shadow-md shadow-slate-900/5 hover:border-[var(--accent)]/30 transition-all duration-300"
              >
                {/* Meal Header: Title, Servings, Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/40 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl backdrop-blur-md bg-[var(--accent)]/15 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/20 text-xs font-bold flex items-center justify-center shrink-0">
                      #{meal.mealNumber}
                    </span>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={displayLabel}
                        onChange={e => handleUpdateMealLabel(mealIdx, e.target.value)}
                        className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-[var(--accent)] focus:outline-hidden py-0.5"
                      />
                    </div>
                  </div>

                  {/* Servings for this specific meal (Customizable per meal!) */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 backdrop-blur-md bg-[var(--cell-bg)] px-2.5 py-1 rounded-xl border border-[var(--border-color)] shadow-2xs">
                      <Users className="w-3.5 h-3.5 text-[var(--primary)] dark:text-[var(--accent)]" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {t('persons')}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          disabled={meal.servings <= 1}
                          onClick={() => handleUpdateMealServings(mealIdx, meal.servings - 1)}
                          className="w-5 h-5 rounded-md backdrop-blur-md bg-[var(--cell-bg-hover)] hover:scale-105 flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 text-xs font-bold shadow-2xs transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 min-w-5 text-center font-mono">
                          {meal.servings}
                        </span>
                        <button
                          disabled={meal.servings >= 30}
                          onClick={() => handleUpdateMealServings(mealIdx, meal.servings + 1)}
                          className="w-5 h-5 rounded-md backdrop-blur-md bg-[var(--cell-bg-hover)] hover:scale-105 flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 text-xs font-bold shadow-2xs transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {assignedRecipes.length > 0 && (
                      <button
                        onClick={() => handleClearMeal(mealIdx)}
                        title={t('clearMealRecipes')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Custom Meals */}
                {meal.customMeals && meal.customMeals.map((customMeal) => (
                  <div key={customMeal.id} className="mt-3 p-3.5 rounded-xl border border-[var(--accent)]/30 backdrop-blur-md bg-[var(--accent)]/10 dark:bg-[var(--accent)]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[var(--primary)] dark:text-[var(--accent)]" />
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {customMeal.name || 'Repas sur mesure (Ingrédients libres)'}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenRecipePicker(mealIdx, 0)}
                          className="px-2 py-1 rounded-lg text-xs font-bold bg-[var(--accent)] text-white shadow-xs hover:bg-[var(--accent)]"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleClearCustomMeal(mealIdx, customMeal.id)}
                          className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {customMeal.ingredients.map((ci, cIdx) => {
                        const ingObj = ingredients.find(i => i.id === ci.ingredientId);
                        return (
                          <span key={cIdx} className="px-2 py-0.5 rounded-md text-[11px] bg-[var(--cell-bg-hover)] text-slate-800 dark:text-slate-200 border border-[var(--border-color)] font-medium transition-all duration-300">
                            {ci.quantity} {ci.unit} {ingObj?.name || 'ingrédient'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* 3 Recipe Slots for this meal */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  {/* Render Assigned Recipes */}
                  {assignedRecipes.map((recipe, rIdx) => {
                    const localized = translateRecipe(recipe);
                    const category = catMap.get(recipe.categoryId);
                    const catDisplayName = category ? translateRecipeCategory(category.id, category.name) : '';
                    return (
                      <div
                        key={recipe.id}
                        className="p-3 rounded-xl border border-[var(--accent)]/20 backdrop-blur-md bg-[var(--accent)]/5 dark:bg-[var(--accent)]/20 flex flex-col justify-between gap-2 relative group shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            {category && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold backdrop-blur-md bg-[var(--cell-bg-hover)] text-slate-700 dark:text-slate-300 border border-[var(--border-color)] transition-all duration-300">
                                <CategoryIcon name={category.icon} className="w-2.5 h-2.5 text-[var(--primary)]" />
                                {catDisplayName}
                              </span>
                            )}
                            <button
                              onClick={() => handleRemoveRecipeFromMeal(mealIdx, rIdx)}
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-500/10"
                              title={t('removeRecipe')}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                            {localized.title}
                          </h4>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
                            </span>
                            <span>•</span>
                            <span>{t('ingredientsCountShort', { count: recipe.ingredients.length })}</span>
                          </p>

                          {(() => {
                            const excludedCount = meal.excludedIngredients?.[rIdx]?.length || 0;
                            if (excludedCount > 0) {
                              return (
                                <div className="mt-1.5">
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/25">
                                    🗑️ {t('excludedIngredientsBadge', { count: excludedCount })}
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>

                        <div className="pt-2 border-t border-[var(--accent)]/15 flex items-center justify-between">
                          <button
                            onClick={() => onPreviewRecipe(recipe, meal.servings, mealIdx, rIdx)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] dark:text-[var(--accent)] hover:underline"
                          >
                            <Eye className="w-3 h-3" />
                            {t('viewScaled')}
                          </button>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {t('slotIndicator', { slot: rIdx + 1 })}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Render Empty Slots up to 3 */}
                  {Array.from({ length: emptySlotsCount }).map((_, emptyIdx) => {
                    const slotNum = assignedRecipes.length + emptyIdx + 1;
                    const isDisabled = !isPremium && slotNum > 1;

                    return (
                      <button
                        key={`empty-${emptyIdx}`}
                        disabled={isDisabled}
                        onClick={() => onOpenRecipePicker(mealIdx, slotNum - 1)}
                        className={`p-4 rounded-xl border-2 border-dashed ${
                          isDisabled 
                            ? 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 opacity-50 cursor-not-allowed'
                            : 'border-[var(--border-color)] hover:border-[var(--accent)] dark:hover:border-[var(--accent)] backdrop-blur-md bg-[var(--cell-bg)] hover:bg-[var(--accent)]/10 dark:hover:bg-[var(--accent)]/20'
                        } flex flex-col items-center justify-center text-center transition-all group min-h-[100px]`}
                      >
                        <div className={`w-7 h-7 rounded-full ${isDisabled ? 'bg-slate-300 dark:bg-slate-700' : 'bg-slate-200/80 dark:bg-slate-700/80 group-hover:bg-[var(--primary)] group-hover:text-white'} flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors mb-1`}>
                          <Plus className="w-4 h-4" />
                        </div>
                        <span className={`text-xs font-bold ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300 group-hover:text-[var(--primary)] dark:group-hover:text-[var(--accent)]'}`}>
                          {isDisabled ? t('premiumOnly') : t('addRecipeSlot', { slot: slotNum })}
                        </span>
                        {!isDisabled && (
                          <span className="text-[10px] text-slate-400">
                            {t('recipeSlotHint')}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
