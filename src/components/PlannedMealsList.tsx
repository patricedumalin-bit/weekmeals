import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Users, 
  Clock, 
  ChefHat, 
  Printer, 
  Share2, 
  Check, 
  Calendar, 
  Eye,
  Sparkles,
  ArrowRight,
  ListOrdered
} from 'lucide-react';
import { WeeklyPlan, Recipe, RecipeCategory, Ingredient, IngredientCategory } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { useLanguage } from '../i18n/LanguageContext';

interface PlannedMealsListProps {
  weeklyPlan: WeeklyPlan;
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  onPreviewRecipe: (recipe: Recipe, servings?: number) => void;
  onGoToPlanner: () => void;
  onGoToShopping: () => void;
  onPrint: () => void;
}

export const PlannedMealsList: React.FC<PlannedMealsListProps> = ({
  weeklyPlan,
  recipes = [],
  recipeCategories = [],
  ingredients = [],
  ingredientCategories = [],
  onPreviewRecipe,
  onGoToPlanner,
  onGoToShopping,
  onPrint
}) => {
  const { t, translateMealLabel, translateRecipeCategory, translateRecipe } = useLanguage();
  const [copied, setCopied] = useState(false);
  if (!weeklyPlan) return null;

  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const safeRecipeCategories = Array.isArray(recipeCategories) ? recipeCategories : [];
  const recipeMap = new Map<string, Recipe>(safeRecipes.map(r => [r.id, r]));
  const catMap = new Map<string, RecipeCategory>(safeRecipeCategories.map(c => [c.id, c]));

  const totalServingsCount = weeklyPlan.meals.reduce((sum, m) => sum + (m.servings || 4), 0);
  const totalAssignedRecipes = weeklyPlan.meals.reduce((sum, m) => sum + (m.recipeIds?.length || 0), 0);

  // Copy schedule formatted text
  const handleCopySchedule = () => {
    let text = `📅 ${t('allPlannedMealsTitle').toUpperCase()} (${weeklyPlan.numberOfMeals} ${t('tabPlannedMeals')}):\n\n`;

    weeklyPlan.meals.forEach((meal) => {
      const assigned = (meal.recipeIds || [])
        .map(id => recipeMap.get(id))
        .filter((r): r is Recipe => Boolean(r));

      const mealDisplay = translateMealLabel(meal.mealNumber, meal.label);
      text += `🍽️ ${mealDisplay} (${meal.servings} ${t('peopleCount', { count: meal.servings })}):\n`;
      if (assigned.length === 0) {
        text += `   - (${t('noRecipesChosenYet')})\n`;
      } else {
        assigned.forEach((rec) => {
          const localized = translateRecipe(rec);
          const category = catMap.get(rec.categoryId);
          const cat = category ? translateRecipeCategory(category.id, category.name) : 'Dish';
          text += `   • ${localized.title} [${cat}] (${rec.prepTimeMinutes + rec.cookTimeMinutes}m)\n`;
        });
      }
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-5 sm:p-6 shadow-lg shadow-slate-900/5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[var(--accent)]/10 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/20 mb-1.5">
              <ListOrdered className="w-3.5 h-3.5" />
              <span>{t('scheduleTag')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {t('allPlannedMealsTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t('allPlannedMealsSubtitle')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopySchedule}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md bg-[var(--cell-bg)] hover:bg-[var(--cell-bg-hover)] border border-[var(--border-color)] text-slate-800 dark:text-slate-200 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[var(--primary)]" />
                  <span>{t('copied')}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>{t('sharePlan')}</span>
                </>
              )}
            </button>

            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--accent)] hover:bg-[var(--primary)] text-white shadow-md shadow-[var(--accent)]/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{t('printSchedule')}</span>
            </button>
          </div>
        </div>

        {/* Stats summary strip */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-5 pt-4 border-t border-[var(--border-color)]">
          <div className="p-3 rounded-2xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-center shadow-2xs transition-all duration-300">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">{t('totalMealsStat')}</span>
            <span className="text-lg sm:text-xl font-extrabold text-[var(--primary)] dark:text-[var(--accent)] font-mono">
              {weeklyPlan.numberOfMeals}
            </span>
          </div>
          <div className="p-3 rounded-2xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-center shadow-2xs transition-all duration-300">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">{t('dishesChosenStat')}</span>
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
              {totalAssignedRecipes}
            </span>
          </div>
          <div className="p-3 rounded-2xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-center shadow-2xs transition-all duration-300">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">{t('totalPortionsStat')}</span>
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
              {totalServingsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Meals Chronological Cards */}
      <div className="space-y-4">
        {weeklyPlan.meals.map((meal, idx) => {
          const assigned = (meal.recipeIds || [])
            .map(id => recipeMap.get(id))
            .filter((r): r is Recipe => Boolean(r));

          const displayLabel = translateMealLabel(meal.mealNumber, meal.label);

          return (
            <div
              key={meal.id || idx}
              className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 shadow-md shadow-slate-900/5 overflow-hidden transition-all duration-300"
            >
              {/* Meal Title & Person Count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/40 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl backdrop-blur-md bg-[var(--accent)]/15 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/20 font-bold text-xs flex items-center justify-center shrink-0">
                    #{meal.mealNumber}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {displayLabel}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t('recipesPlannedUnderMeal', { count: assigned.length })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 backdrop-blur-md bg-[var(--accent)]/15 text-[var(--primary)] dark:text-[var(--accent)] px-3 py-1 rounded-xl text-xs font-bold border border-[var(--accent)]/20 self-start sm:self-auto shadow-2xs">
                  <Users className="w-3.5 h-3.5" />
                  <span>{t('peopleCount', { count: meal.servings })}</span>
                </div>
              </div>

              {/* Recipes under this meal */}
              <div className="pt-3">
                {assigned.length === 0 ? (
                  <div className="py-6 text-center backdrop-blur-md bg-[var(--cell-bg)]/50 rounded-xl border border-dashed border-[var(--border-color)]">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('noRecipesChosenYet')}</p>
                    <button
                      onClick={onGoToPlanner}
                      className="mt-2 text-xs font-bold text-[var(--primary)] dark:text-[var(--accent)] hover:underline"
                    >
                      {t('assignRecipesInPlanner')}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {assigned.map((recipe, rIdx) => {
                      const localized = translateRecipe(recipe);
                      const category = catMap.get(recipe.categoryId);
                      const catDisplayName = category ? translateRecipeCategory(category.id, category.name) : '';
                      const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

                      return (
                        <div
                          key={recipe.id}
                          onClick={() => onPreviewRecipe(recipe, meal.servings)}
                          className="p-3 rounded-xl border border-[var(--border-color)] backdrop-blur-md bg-[var(--cell-bg)] hover:bg-[var(--cell-bg-hover)] hover:border-[var(--accent)]/50 dark:hover:border-[var(--accent)]/50 cursor-pointer transition-all flex flex-col justify-between group shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              {category && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold backdrop-blur-md bg-[var(--cell-bg-hover)] text-slate-700 dark:text-slate-300 border border-[var(--border-color)]">
                                  <CategoryIcon name={category.icon} className="w-2.5 h-2.5 text-[var(--primary)]" />
                                  {catDisplayName}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 font-mono">
                                {t('slotIndicator', { slot: rIdx + 1 })}
                              </span>
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[var(--primary)] dark:group-hover:text-[var(--accent)] transition-colors">
                              {localized.title}
                            </h4>

                            {localized.description && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                                {localized.description}
                              </p>
                            )}
                          </div>

                          <div className="pt-2 mt-2 border-t border-white/40 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {totalTime} mins
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-[var(--primary)] dark:text-[var(--accent)] font-bold group-hover:underline">
                              <span>{t('cook')}</span>
                              <Eye className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to grocery list */}
      <div className="p-5 rounded-2xl backdrop-blur-xl bg-slate-900/90 dark:bg-slate-900/80 border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="text-sm font-bold">{t('readyToShopHeading')}</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('readyToShopSubtitle')}
          </p>
        </div>
        <button
          onClick={onGoToShopping}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[var(--accent)] hover:bg-[var(--primary)] text-white shadow-md shadow-[var(--accent)]/20 flex items-center gap-2 transition-all shrink-0"
        >
          <span>{t('openShoppingList')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
