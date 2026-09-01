import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Users, 
  ChefHat, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Flame,
  Minus,
  Plus
} from 'lucide-react';
import { Recipe, RecipeCategory, Ingredient, IngredientCategory } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { formatQuantity } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  initialServings?: number;
  mealIndex?: number;
  recipeIndex?: number;
  excludedIngredientIds?: string[];
  onToggleExcludeIngredient?: (mealIndex: number, recipeIndex: number, ingredientId: string) => void;
  onClose: () => void;
  onSelectForMeal?: (recipeId: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  recipeCategories,
  ingredients,
  ingredientCategories,
  initialServings,
  mealIndex,
  recipeIndex,
  excludedIngredientIds = [],
  onToggleExcludeIngredient,
  onClose,
  onSelectForMeal
}) => {
  const { t, translateUnit, translateRecipeCategory, translateDifficulty, translateRecipe, translateIngredient } = useLanguage();
  if (!recipe) return null;

  const [currentServings, setCurrentServings] = useState<number>(
    initialServings || recipe.servings || 4
  );

  const localized = translateRecipe(recipe);
  const category = recipeCategories.find(c => c.id === recipe.categoryId);
  const ingredientMap = new Map<string, Ingredient>(ingredients.map(i => [i.id, i]));
  const catMap = new Map<string, IngredientCategory>(ingredientCategories.map(c => [c.id, c]));

  const scaleFactor = currentServings / (recipe.servings || 4);
  const categoryDisplayName = category ? translateRecipeCategory(category.id, category.name) : '';
  const difficultyDisplayName = translateDifficulty(recipe.difficulty);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/40 dark:border-white/5 flex items-start justify-between gap-3 bg-white/40 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              {category && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <CategoryIcon name={category.icon} className="w-3.5 h-3.5" />
                  {categoryDisplayName}
                </span>
              )}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/5 text-slate-600 dark:text-slate-300 capitalize">
                {difficultyDisplayName}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {localized.title}
            </h2>
            {localized.description && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {localized.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipe Meta Banner & Servings Scaler */}
        <div className="px-5 py-3 backdrop-blur-md bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t('prepTime', { mins: recipe.prepTimeMinutes })}
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              {t('cookTime', { mins: recipe.cookTimeMinutes })}
            </span>
            <span className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-slate-500" />
              {t('totalTime', { mins: recipe.prepTimeMinutes + recipe.cookTimeMinutes })}
            </span>
          </div>

          {/* Interactive Servings Slider / Controls */}
          <div className="flex items-center gap-2 backdrop-blur-md bg-white/70 dark:bg-slate-800/70 px-3 py-1 rounded-xl shadow-2xs border border-white/50 dark:border-white/10">
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {t('peopleCount', { count: currentServings })}
            </span>
            <div className="flex items-center gap-1 ml-1">
              <button
                disabled={currentServings <= 1}
                onClick={() => setCurrentServings(Math.max(1, currentServings - 1))}
                className="w-5 h-5 rounded-md bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 border border-white/40 dark:border-white/5"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                disabled={currentServings >= 24}
                onClick={() => setCurrentServings(currentServings + 1)}
                className="w-5 h-5 rounded-md bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 disabled:opacity-30 border border-white/40 dark:border-white/5"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content: Ingredients + Instructions */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1">
          {/* Ingredients Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                {t('ingredientsHeader', { count: recipe.ingredients.length })}
              </h3>
              {scaleFactor !== 1 && (
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {t('scaledNote', { base: recipe.servings, current: currentServings })}
                </span>
              )}
            </div>

            {mealIndex !== undefined && recipeIndex !== undefined && onToggleExcludeIngredient && (
              <div className="mb-3 p-3 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p>{t('plannerExclusionNote')}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map((item, idx) => {
                const ing = ingredientMap.get(item.ingredientId);
                const scaledQty = item.quantity * scaleFactor;
                const unitDisplayName = translateUnit(item.unit);
                const ingredientDisplayName = translateIngredient(item.ingredientId, ing?.name);
                const isExcluded = excludedIngredientIds.includes(item.ingredientId);

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-xl backdrop-blur-md border transition-all ${
                      isExcluded
                        ? 'bg-rose-500/10 dark:bg-rose-950/20 border-rose-500/30 opacity-60'
                        : 'bg-white/60 dark:bg-slate-800/50 border-white/50 dark:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 shadow-2xs ${isExcluded ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                      <span className={`text-sm font-medium truncate ${isExcluded ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {ingredientDisplayName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${isExcluded ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30 line-through' : 'bg-white/80 dark:bg-slate-900/80 text-emerald-700 dark:text-emerald-300 border-white/50 dark:border-white/10'}`}>
                        {formatQuantity(scaledQty)} {unitDisplayName}
                      </span>
                      {mealIndex !== undefined && recipeIndex !== undefined && onToggleExcludeIngredient && (
                        <button
                          onClick={() => onToggleExcludeIngredient(mealIndex, recipeIndex, item.ingredientId)}
                          title={isExcluded ? t('restoreIngredient') : t('excludeIngredient')}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                            isExcluded
                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 hover:bg-rose-500/20 border border-rose-500/20'
                          }`}
                        >
                          {isExcluded ? t('restoreIngredient') : t('excludeIngredient')}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cooking Instructions */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 mb-3">
              <ChefHat className="w-4 h-4 text-emerald-600" />
              {t('prepStepsHeader', { count: localized.instructions.length })}
            </h3>
            <div className="space-y-3">
              {localized.instructions.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/40 border border-white/50 dark:border-white/10"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {localized.tags && localized.tags.length > 0 && (
            <div className="pt-2 border-t border-white/40 dark:border-white/5 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400">{t('tagsLabel')}</span>
              {localized.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/5 text-slate-600 dark:text-slate-300 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/40 dark:border-white/5 bg-white/40 dark:bg-slate-900/50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
          >
            {t('close')}
          </button>

          {onSelectForMeal && (
            <button
              onClick={() => {
                onSelectForMeal(recipe.id);
                onClose();
              }}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t('chooseForThisMeal')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
