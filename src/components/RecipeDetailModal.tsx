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
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Recipe, RecipeCategory, Ingredient, IngredientCategory } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { formatQuantity, estimateRecipeNutrition, getDietaryBadges, calculateRecipeTotalBudget } from '../utils/calculator';
import { NutritionRings } from './NutritionRings';
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
  pantryMap?: Record<string, boolean>;
  onToggleExcludeIngredient?: (mealIndex: number, recipeIndex: number, ingredientId: string) => void;
  onClose: () => void;
  onSelectForMeal?: (recipeId: string) => void;
  onStartCookingMode?: (recipe: Recipe, servings: number) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  recipeCategories = [],
  ingredients = [],
  ingredientCategories = [],
  initialServings,
  mealIndex,
  recipeIndex,
  excludedIngredientIds = [],
  pantryMap = {},
  onToggleExcludeIngredient,
  onClose,
  onSelectForMeal,
  onStartCookingMode
}) => {
  const { t, translateUnit, translateRecipeCategory, translateDifficulty, translateRecipe, translateIngredient } = useLanguage();
  if (!recipe) return null;

  // Swipe gesture state for ingredient exclusion
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipingIngredientId, setSwipingIngredientId] = useState<string | null>(null);

  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  const safeRecipeCategories = Array.isArray(recipeCategories) ? recipeCategories : [];
  const safeIngredientCategories = Array.isArray(ingredientCategories) ? ingredientCategories : [];

  const [currentServings, setCurrentServings] = useState<number>(
    initialServings || recipe.servings || 4
  );
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  const localized = translateRecipe(recipe);
  const category = safeRecipeCategories.find(c => c.id === recipe.categoryId);
  const ingredientMap = new Map<string, Ingredient>(safeIngredients.map(i => [i.id, i]));
  const catMap = new Map<string, IngredientCategory>(safeIngredientCategories.map(c => [c.id, c]));

  const nutrition = estimateRecipeNutrition(recipe, safeIngredients);
  const badges = getDietaryBadges(recipe, nutrition);

  const scaleFactor = currentServings / (recipe.servings || 4);
  const { total: recipePrice, itemsCost } = calculateRecipeTotalBudget(recipe, safeIngredients, excludedIngredientIds, pantryMap, scaleFactor);
  const categoryDisplayName = category ? translateRecipeCategory(category.id, category.name) : '';
  const difficultyDisplayName = translateDifficulty(recipe.difficulty);

  const handleTouchStart = (e: React.TouchEvent, ingredientId: string) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setSwipingIngredientId(ingredientId);
  };

  const handleTouchEnd = (e: React.TouchEvent, ingredientId: string) => {
    if (touchStartX === null || swipingIngredientId !== ingredientId) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    const threshold = 50; // swipe length in pixels

    if (Math.abs(diff) > threshold) {
      // If we have the necessary props to toggle exclusion
      if (mealIndex !== undefined && recipeIndex !== undefined && onToggleExcludeIngredient) {
        onToggleExcludeIngredient(mealIndex, recipeIndex, ingredientId);
      }
    }

    setTouchStartX(null);
    setSwipingIngredientId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/40 dark:border-white/5 flex items-start justify-between gap-3 bg-white/40 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              {category && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[var(--primary)]/10 text-[var(--primary)] dark:text-[var(--primary)] border border-[var(--primary)]/20">
                  <CategoryIcon name={category.icon} className="w-3.5 h-3.5" />
                  {categoryDisplayName}
                </span>
              )}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/5 text-slate-600 dark:text-slate-300 capitalize">
                {difficultyDisplayName}
              </span>
              {badges.map(b => (
                <span key={b.id} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${b.color}`}>
                  <span>{b.label}</span>
                </span>
              ))}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {localized.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
            >
              {isHeaderCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isHeaderCollapsed && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            {localized.description && (
              <div className="px-5 py-2 bg-white/20 dark:bg-slate-800/20 border-b border-white/40 dark:border-white/5">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {localized.description}
                </p>
              </div>
            )}

            {/* Recipe Meta Banner & Servings Scaler */}
            <div className="px-5 py-3 backdrop-blur-md bg-[var(--primary)]/10 border-b border-[var(--primary)]/20 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--primary)] dark:text-[var(--primary)]" />
                  {t('prepTime', { mins: recipe.prepTimeMinutes })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[var(--accent)]" />
                  {t('cookTime', { mins: recipe.cookTimeMinutes })}
                </span>
                <span className="flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-slate-500" />
                  {t('totalTime', { mins: recipe.prepTimeMinutes + recipe.cookTimeMinutes })}
                </span>
              </div>

              {/* Interactive Servings Slider / Controls */}
              <div className="flex items-center gap-2 backdrop-blur-md bg-white/70 dark:bg-slate-800/70 px-3 py-1 rounded-xl shadow-2xs border border-white/50 dark:border-white/10">
                <Users className="w-4 h-4 text-[var(--primary)] dark:text-[var(--primary)]" />
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

              {/* Nutrition strip */}
              <div className="w-full pt-2 mt-1 border-t border-[var(--primary)]/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <NutritionRings
                      proteinPct={Math.min(100, (nutrition.protein / 50) * 100)}
                      carbsPct={Math.min(100, (nutrition.carbs / 100) * 100)}
                      fatPct={Math.min(100, (nutrition.fat / 30) * 100)}
                      size={40}
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-amber-600 dark:text-amber-400 block">🔥 {nutrition.calories} kcal / pers.</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md border border-sky-200 dark:border-sky-900/30 text-[10px]">
                      💰 Budget : {recipePrice === 0 ? 'Gratuit' : `${recipePrice.toFixed(2)} €`}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 flex items-center gap-2 font-mono">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" />{nutrition.protein}g</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />{nutrition.carbs}g</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{nutrition.fat}g</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content: Ingredients + Instructions */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1">
          {/* Ingredients Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--primary)]" />
                {t('ingredientsHeader', { count: recipe.ingredients.length })}
              </h3>
              {scaleFactor !== 1 && (
                <span className="text-xs font-medium text-[var(--primary)] dark:text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-md border border-[var(--primary)]/20">
                  {t('scaledNote', { base: recipe.servings, current: currentServings })}
                </span>
              )}
            </div>

            {mealIndex !== undefined && recipeIndex !== undefined && onToggleExcludeIngredient && (
              <div className="mb-3 p-3 rounded-xl bg-[var(--accent)]/10 dark:bg-[var(--accent)]/20 border border-[var(--accent)]/20 text-xs text-[var(--primary)] dark:text-[var(--accent)] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[var(--primary)] dark:text-[var(--accent)] shrink-0 mt-0.5" />
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
                const itemCost = itemsCost[item.ingredientId] ?? 0;

                return (
                  <div
                    key={idx}
                    onTouchStart={(e) => handleTouchStart(e, item.ingredientId)}
                    onTouchEnd={(e) => handleTouchEnd(e, item.ingredientId)}
                    className={`flex items-center justify-between p-2.5 rounded-xl backdrop-blur-md border transition-all select-none touch-pan-y ${
                      isExcluded
                        ? 'bg-rose-500/10 dark:bg-rose-950/20 border-rose-500/30 opacity-60'
                        : 'bg-white/60 dark:bg-slate-800/50 border-white/50 dark:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 shadow-2xs ${isExcluded ? 'bg-rose-500' : 'bg-[var(--primary)]'}`} />
                      <span className={`text-sm font-medium truncate ${isExcluded ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {ingredientDisplayName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${isExcluded ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30 line-through' : 'bg-white/80 dark:bg-slate-900/80 text-[var(--primary)] dark:text-[var(--primary)] border-white/50 dark:border-white/10'}`}>
                        {formatQuantity(scaledQty)} {unitDisplayName}
                        {itemCost > 0 ? ` • ${itemCost.toFixed(2)}€` : pantryMap[item.ingredientId] ? ' • Frigo' : ''}
                      </span>
                      {mealIndex !== undefined && recipeIndex !== undefined && onToggleExcludeIngredient && (
                        <button
                          onClick={() => onToggleExcludeIngredient(mealIndex, recipeIndex, item.ingredientId)}
                          title={isExcluded ? t('restoreIngredient') : t('excludeIngredient')}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                            isExcluded
                              ? 'bg-[var(--primary)]/20 text-[var(--primary)] dark:text-[var(--primary)] hover:bg-[var(--primary)]/30 border border-[var(--primary)]/30'
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
              <ChefHat className="w-4 h-4 text-[var(--primary)]" />
              {t('prepStepsHeader', { count: localized.instructions.length })}
            </h3>
            <div className="space-y-3">
              {localized.instructions.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/40 border border-white/50 dark:border-white/10"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
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

          {recipe.source && (
            <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 italic">
              {recipe.sourceUrl ? (
                <>
                  Source :{' '}
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[var(--accent)]"
                  >
                    {recipe.source}
                  </a>
                </>
              ) : (
                <>Source : {recipe.source}</>
              )}
            </p>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/40 dark:border-white/5 bg-white/40 dark:bg-slate-900/50 flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
            >
              {t('close')}
            </button>

            {onStartCookingMode && (
              <button
                type="button"
                onClick={() => {
                  onStartCookingMode(recipe, currentServings);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
              >
                <ChefHat className="w-4 h-4" />
                <span>Mode Cuisine (Pas à pas)</span>
              </button>
            )}
          </div>

          {onSelectForMeal && (
            <button
              onClick={() => {
                onSelectForMeal(recipe.id);
                onClose();
              }}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--primary)]/20 flex items-center gap-2 transition-all"
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
