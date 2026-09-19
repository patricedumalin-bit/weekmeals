import React, { useState, useMemo } from 'react';
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
  ChevronDown,
  ChevronUp,
  Utensils,
  Clock,
  Shuffle,
  ChefHat,
  Layers,
  ArrowRight,
  Heart,
  TrendingUp,
  Refrigerator,
  ShieldCheck,
  X
} from 'lucide-react';
import { WeeklyPlan, MealSlot, Recipe, RecipeCategory, Ingredient, IngredientCategory, CookingModeType, CustomMealIngredient } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { useLanguage } from '../i18n/LanguageContext';
import { calculateRecipeTotalBudget } from '../utils/calculator';
import { FREE_LIMITS } from '../constants/subscription';

interface WeeklyPlannerProps {
  weeklyPlan: WeeklyPlan;
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  pantryMap?: Record<string, boolean>;
  onUpdatePlan: (newPlan: WeeklyPlan) => void;
  onToggleMealCooked?: (mealIndex: number) => void;
  onLockPlan?: (isLocked: boolean) => void;
  onResetPlan?: () => void;
  onOpenRecipePicker: (mealIndex: number, slotIndex: number) => void;
  onPreviewRecipe: (recipe: Recipe, servings?: number, mealIndex?: number, recipeIndex?: number) => void;
  onGoToShopping: () => void;
  isPremium: boolean;
  onOpenAutoPlan?: () => void;
  onOpenNutrition?: () => void;
  onOpenPantry?: () => void;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  weeklyPlan,
  recipes = [],
  recipeCategories = [],
  ingredients = [],
  ingredientCategories = [],
  pantryMap = {},
  onUpdatePlan,
  onToggleMealCooked,
  onLockPlan,
  onResetPlan,
  onOpenRecipePicker,
  onPreviewRecipe,
  onGoToShopping,
  isPremium,
  onOpenAutoPlan,
  onOpenNutrition,
  onOpenPantry
}) => {
  const { t, translateMealLabel, translateRecipeCategory, translateRecipe } = useLanguage();
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const safeRecipes = useMemo(() => Array.isArray(recipes) ? recipes : [], [recipes]);
  const safeRecipeCategories = useMemo(() => Array.isArray(recipeCategories) ? recipeCategories : [], [recipeCategories]);

  const recipeMap = useMemo(() => new Map<string, Recipe>(safeRecipes.map(r => [r.id, r])), [safeRecipes]);
  const catMap = useMemo(() => new Map<string, RecipeCategory>(safeRecipeCategories.map(c => [c.id, c])), [safeRecipeCategories]);

  const RecipePlannerItem: React.FC<{
    recipe: Recipe;
    mealIdx: number;
    rIdx: number;
    meal: MealSlot;
    onRemove: (mIdx: number, rIdx: number) => void;
    onPreview: (recipe: Recipe, servings?: number, mealIndex?: number, recipeIndex?: number) => void;
  }> = ({ recipe, mealIdx, rIdx, meal, onRemove, onPreview }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const localized = translateRecipe(recipe);
    const category = catMap.get(recipe.categoryId);
    const catDisplayName = category ? translateRecipeCategory(category.id, category.name) : '';

    const mealServings = meal.servings || weeklyPlan.defaultServings || 4;
    const scaleFactor = mealServings / (recipe.servings || 4);
    const excludedIds = meal.excludedIngredients?.[rIdx] || [];
    const { total: recipePrice } = calculateRecipeTotalBudget(recipe, ingredients, excludedIds, pantryMap, scaleFactor);

    const isCooked = meal.isCooked;

    return (
      <div
        className={`p-3 rounded-xl border flex flex-col justify-between gap-2 relative group shadow-2xs animate-spring-in hover:shadow-md transition-all tap-bounce ${
          isCooked ? 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60' : 'border-[var(--accent)]/20 backdrop-blur-md bg-[var(--accent)]/5 dark:bg-[var(--accent)]/20'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0" onClick={() => setIsCollapsed(!isCollapsed)}>
            <h4 className={`text-xs font-bold line-clamp-2 pr-12 ${isCooked ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-slate-100'}`}>
              {localized.title}
            </h4>
          </div>

          <div className="flex items-center gap-1 absolute top-2 right-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-lg hover:bg-white/40 dark:hover:bg-slate-800/40 text-slate-400 transition-colors"
            >
              {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
            {!weeklyPlan.isLocked && !isCooked && (
              <button
                onClick={() => onRemove(mealIdx, rIdx)}
                className="p-1 rounded-lg bg-white/40 dark:bg-slate-800/40 text-slate-400 hover:text-rose-600 transition-colors backdrop-blur-sm shadow-xs shrink-0"
                title={t('removeRecipe')}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {!isCollapsed && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200 space-y-2">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {category && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold backdrop-blur-md bg-[var(--cell-bg-hover)] text-slate-700 dark:text-slate-300 border border-[var(--border-color)] transition-all duration-300">
                    <CategoryIcon name={category.icon} className="w-2.5 h-2.5 text-[var(--primary)]" />
                    {catDisplayName}
                  </span>
                )}
                <span className="text-[10px] text-slate-400 font-mono">
                  {t('slotIndicator', { slot: rIdx + 1 })}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
                </span>
                <span>•</span>
                <span>{t('ingredientsCountShort', { count: recipe.ingredients.length })}</span>
                <span>•</span>
                <span className="font-semibold text-sky-600 dark:text-sky-400">{recipePrice === 0 ? 'Gratuit' : `${recipePrice.toFixed(2)}€`}</span>
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
                onClick={() => onPreview(recipe, meal.servings, mealIdx, rIdx)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] dark:text-[var(--accent)] hover:underline"
              >
                <Eye className="w-3 h-3" />
                {t('viewScaled')}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };


  const MEAL_PRESETS = useMemo(() => [
    { label: t('presetMeals', { count: 5 }), count: 5 },
    { label: t('presetMeals', { count: 7 }), count: 7 },
    { label: t('presetMeals', { count: 10 }), count: 10 },
    { label: t('presetMeals', { count: 14 }), count: 14 },
  ], [t]);

  // Change total number of meals without specifying days
  const handleSetMealCount = (newCount: number) => {
    let limit = 21;
    if (!isPremium) limit = FREE_LIMITS.MAX_MEALS;
    
    const clamped = Math.max(1, Math.min(limit, newCount));
    
    if (!isPremium && newCount > FREE_LIMITS.MAX_MEALS) {
      alert(`La version gratuite est limitée à ${FREE_LIMITS.MAX_MEALS} repas. Passez en premium pour ajouter plus de repas.`);
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

  // Auto-fill balanced random recipes across empty slots: 1 Starter + 1 Main + 1 Dessert
  const handleAutoSuggestMeals = () => {
    if (recipes.length === 0) return;

    // Filter recipes into groups based on normalized category IDs
    const starters = recipes.filter(r => r.categoryId === 'rcat-entree');
    const mains = recipes.filter(r => ['rcat-viande', 'rcat-volaille', 'rcat-poisson', 'rcat-legume', 'rcat-pates', 'rcat-autre'].includes(r.categoryId));
    const desserts = recipes.filter(r => r.categoryId === 'rcat-dessert');

    const updatedMeals = weeklyPlan.meals.map((meal) => {
      // If the slot is not empty, keep it as is
      if (meal.recipeIds && meal.recipeIds.length > 0) return meal;

      const chosen: string[] = [];

      // 1. Pick 1 random Starter
      if (starters.length > 0) {
        const randomStarter = starters[Math.floor(Math.random() * starters.length)];
        chosen.push(randomStarter.id);
      }

      // 2. Pick 1 random Main
      if (mains.length > 0) {
        const randomMain = mains[Math.floor(Math.random() * mains.length)];
        chosen.push(randomMain.id);
      }

      // 3. Pick 1 random Dessert
      if (desserts.length > 0) {
        const randomDessert = desserts[Math.floor(Math.random() * desserts.length)];
        chosen.push(randomDessert.id);
      }

      return {
        ...meal,
        recipeIds: chosen
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
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          {/* Left: Number of Meals & Default Servings */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[var(--accent)]/10 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/20 mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('plannerConfigTag')}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {t('plannerTitle')}
                </h2>
              </div>
              <button
                onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-all sm:hidden"
              >
                {isHeaderCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 rotate-90" />}
              </button>
            </div>

            {!isHeaderCollapsed && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {t('plannerSubtitle')}
                </p>

                {/* Controls Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
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
        )}
      </div>

        {!isHeaderCollapsed && (
            <div className="backdrop-blur-md bg-[var(--accent)]/10 dark:bg-[var(--accent)]/30 border border-[var(--accent)]/20 dark:border-[var(--accent)]/20 rounded-2xl p-4 lg:w-72 flex flex-col justify-between gap-3 shrink-0 shadow-2xs animate-in fade-in slide-in-from-top-2 duration-300">
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
                <div className="flex gap-2">
                   {weeklyPlan.isLocked ? (
                     <button
                       onClick={() => onLockPlan && onLockPlan(false)}
                       className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white shadow-md transition-all"
                     >
                       <X className="w-3.5 h-3.5" />
                       <span>Modifier Planning</span>
                     </button>
                   ) : (
                     <button
                       disabled={totalAssignedRecipes === 0}
                       onClick={() => onLockPlan && onLockPlan(true)}
                       className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-md disabled:opacity-50 transition-all"
                     >
                       <CheckCircle2 className="w-3.5 h-3.5" />
                       <span>Valider la Semaine</span>
                     </button>
                   )}
                   <button
                     onClick={() => {
                       if (confirm('Voulez-vous archiver cette semaine et vider le planning pour la suivante ?')) {
                         onResetPlan && onResetPlan();
                       }
                     }}
                     className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-rose-500 hover:text-white transition-all"
                     title="Fin de Semaine (Archivage + Reset)"
                   >
                     <RotateCcw className="w-3.5 h-3.5" />
                   </button>
                </div>

                {onOpenAutoPlan && !weeklyPlan.isLocked && (
                  <button
                    type="button"
                    onClick={() => isPremium ? onOpenAutoPlan() : alert("L'IA d'auto-planification est réservée à la version Full 🔒\nComposez votre semaine en 1 clic pour 9,99€/an !")}
                    className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
                      isPremium
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                        : 'bg-slate-200 text-slate-400 grayscale cursor-not-allowed shadow-none'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Composer ma semaine en 1 clic {!isPremium && '🔒'}</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-1.5">
                  {onOpenNutrition && (
                    <button
                      type="button"
                      onClick={onOpenNutrition}
                      className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold backdrop-blur-md bg-[var(--cell-bg-hover)] text-rose-600 dark:text-rose-400 border border-[var(--border-color)] hover:bg-[var(--cell-bg)] transition-all"
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Rapports & Budget</span>
                    </button>
                  )}

                  {onOpenPantry && (
                    <button
                      type="button"
                      onClick={onOpenPantry}
                      className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold backdrop-blur-md bg-[var(--cell-bg-hover)] text-emerald-600 dark:text-emerald-400 border border-[var(--border-color)] hover:bg-[var(--cell-bg)] transition-all"
                    >
                      <Refrigerator className="w-3.5 h-3.5" />
                      <span>Mon Frigo</span>
                    </button>
                  )}
                </div>

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
          )}
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
            const customMealsCount = meal.customMeals?.length || 0;
            const emptySlotsCount = Math.max(0, maxSlots - assignedRecipes.length - customMealsCount);
            const displayLabel = translateMealLabel(meal.mealNumber, meal.label);

            return (
              <div
                key={meal.id || mealIdx}
                className={`backdrop-blur-xl border rounded-2xl p-4 sm:p-5 shadow-md transition-all duration-300 ${
                  meal.isCooked
                    ? 'bg-slate-100/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 grayscale-[0.5]'
                    : 'bg-[var(--card-bg)] border-[var(--border-color)] shadow-slate-900/5 hover:border-[var(--accent)]/30'
                }`}
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
                    <button
                      onClick={() => onToggleMealCooked && onToggleMealCooked(mealIdx)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                        meal.isCooked
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-500'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{meal.isCooked ? 'Cuisiné' : 'À cuisiner'}</span>
                    </button>

                    <div className="flex items-center gap-2 backdrop-blur-md bg-[var(--cell-bg)] px-2.5 py-1 rounded-xl border border-[var(--border-color)] shadow-2xs">
                      <Users className="w-3.5 h-3.5 text-[var(--primary)] dark:text-[var(--accent)]" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {t('persons')}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          disabled={meal.servings <= 1 || weeklyPlan.isLocked}
                          onClick={() => handleUpdateMealServings(mealIdx, meal.servings - 1)}
                          className="w-5 h-5 rounded-md backdrop-blur-md bg-[var(--cell-bg-hover)] hover:scale-105 flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 text-xs font-bold shadow-2xs transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 min-w-5 text-center font-mono">
                          {meal.servings}
                        </span>
                        <button
                          disabled={meal.servings >= 30 || weeklyPlan.isLocked}
                          onClick={() => handleUpdateMealServings(mealIdx, meal.servings + 1)}
                          className="w-5 h-5 rounded-md backdrop-blur-md bg-[var(--cell-bg-hover)] hover:scale-105 flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 text-xs font-bold shadow-2xs transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {assignedRecipes.length > 0 && !weeklyPlan.isLocked && (
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
                  {assignedRecipes.map((recipe, rIdx) => (
                    <RecipePlannerItem
                      key={recipe.id}
                      recipe={recipe}
                      mealIdx={mealIdx}
                      rIdx={rIdx}
                      meal={meal}
                      onRemove={handleRemoveRecipeFromMeal}
                      onPreview={onPreviewRecipe}
                    />
                  ))}

                  {/* Render Empty Slots up to 3 */}
                  {Array.from({ length: emptySlotsCount }).map((_, emptyIdx) => {
                    const slotNum = assignedRecipes.length + customMealsCount + emptyIdx + 1;
                    const isDisabled = (!isPremium && slotNum > 1) || weeklyPlan.isLocked;

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
                          {weeklyPlan.isLocked ? <ShieldCheck className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                        <span className={`text-xs font-bold ${isDisabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300 group-hover:text-[var(--primary)] dark:group-hover:text-[var(--accent)]'}`}>
                          {weeklyPlan.isLocked ? 'Planning Verrouillé' : isDisabled ? t('premiumOnly') : t('addRecipeSlot', { slot: slotNum })}
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
