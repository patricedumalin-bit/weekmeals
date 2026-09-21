import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Clock, 
  ChefHat, 
  RefreshCw, 
  Check, 
  Flame, 
  Leaf, 
  Zap, 
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Recipe, RecipeCategory, CookingModeType, AutoPlanOptions, WeeklyPlan, MealSlot, Ingredient } from '../types';
import { generateSmartWeeklyPlan, inferCookingMode } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';

interface AutoPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  weeklyPlan?: WeeklyPlan | null;
  currentWeeklyPlan?: WeeklyPlan | null;
  ingredients?: Ingredient[];
  pantryMap?: Record<string, boolean>;
  onApplyPlan: (newPlan: WeeklyPlan) => void;
}

export const AutoPlanModal: React.FC<AutoPlanModalProps> = ({
  isOpen,
  onClose,
  recipes = [],
  recipeCategories = [],
  weeklyPlan,
  currentWeeklyPlan,
  ingredients = [],
  pantryMap = {},
  onApplyPlan
}) => {
  const activePlan = weeklyPlan || currentWeeklyPlan;
  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const { translateRecipe, translateCookingMode } = useLanguage();

  const [mealCount, setMealCount] = useState<number>(activePlan?.numberOfMeals || 7);
  const [maxPrepTime, setMaxPrepTime] = useState<number | null>(null);
  const [preferredMode, setPreferredMode] = useState<CookingModeType | 'all'>('all');
  const [dietaryStyle, setDietaryStyle] = useState<'all' | 'protein' | 'balanced' | 'vegetarian' | 'quick'>('all');
  const [noDuplicates, setNoDuplicates] = useState<boolean>(true);
  const [includeStarters, setIncludeStarters] = useState<boolean>(false);
  const [includeDesserts, setIncludeDesserts] = useState<boolean>(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(false);

  const [previewRecipes, setPreviewRecipes] = useState<Recipe[][]>([]);

  const handleGenerate = () => {
    const options: AutoPlanOptions = {
      mealCount,
      maxPrepTime,
      preferredCookingMode: preferredMode,
      dietaryStyle,
      noDuplicates,
      includeStarters,
      includeDesserts
    };
    const generated = generateSmartWeeklyPlan(safeRecipes, options);
    setPreviewRecipes(generated);
    setIsFilterCollapsed(true);
  };

  // Generate on open
  useEffect(() => {
    if (isOpen) {
      setMealCount(activePlan?.numberOfMeals || 7);
      handleGenerate();
    }
  }, [isOpen, activePlan]);

  if (!isOpen) return null;

  const handleApply = () => {
    const updatedMeals: MealSlot[] = [];

    for (let i = 0; i < mealCount; i++) {
      const existingMeal = activePlan?.meals ? activePlan.meals[i] : undefined;
      const assignedRecipes = previewRecipes[i] || [];
      const recipeIds = assignedRecipes.map(r => r.id);

      updatedMeals.push({
        id: existingMeal?.id || `meal-${Date.now()}-${i + 1}`,
        mealNumber: i + 1,
        label: existingMeal?.label || `Repas ${i + 1}`,
        servings: existingMeal?.servings || activePlan?.defaultServings || 4,
        recipeIds,
        excludedIngredients: {},
        customMeals: []
      });
    }

    const newPlan: WeeklyPlan = {
      ...(activePlan || { id: 'weekly-plan-default', defaultServings: 4, meals: [] }),
      numberOfMeals: mealCount,
      meals: updatedMeals,
      lastUpdated: new Date().toISOString()
    };

    onApplyPlan(newPlan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Composer ma Semaine en 1 Clic
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Générez un planning intelligent équilibré et diversifié selon vos préférences.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Controls */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/40 transition-all duration-300">
          {!isFilterCollapsed ? (
            <div className="p-4 sm:p-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
              {/* Meal count */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 block">
                  Nombre de repas à planifier :
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[3, 5, 7, 10, 14].map(count => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => {
                        setMealCount(count);
                        setTimeout(handleGenerate, 10);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        mealCount === count
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {count} repas
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Filters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                {/* Max Prep Time */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Temps de prépa max :</span>
                  </label>
                  <select
                    value={maxPrepTime === null ? 'all' : maxPrepTime.toString()}
                    onChange={(e) => {
                      setMaxPrepTime(e.target.value === 'all' ? null : parseInt(e.target.value, 10));
                      setTimeout(handleGenerate, 10);
                    }}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">Indifférent (tout temps)</option>
                    <option value="15">≤ 15 min (Ultra-rapide)</option>
                    <option value="25">≤ 25 min (Express)</option>
                    <option value="35">≤ 35 min (Standard)</option>
                    <option value="45">≤ 45 min</option>
                  </select>
                </div>

                {/* Dietary Style */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5 text-slate-400" />
                    <span>Style diététique :</span>
                  </label>
                  <select
                    value={dietaryStyle}
                    onChange={(e) => {
                      setDietaryStyle(e.target.value as any);
                      setTimeout(handleGenerate, 10);
                    }}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">Tous styles (Varié)</option>
                    <option value="protein">Riche en protéines</option>
                    <option value="vegetarian">100% Végétarien</option>
                    <option value="quick">Le plus rapide d'abord</option>
                  </select>
                </div>

                {/* Cooking mode */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mode de cuisson :</span>
                  </label>
                  <select
                    value={preferredMode}
                    onChange={(e) => {
                      setPreferredMode(e.target.value as any);
                      setTimeout(handleGenerate, 10);
                    }}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="all">Tous les modes</option>
                    <option value="four">Four / Gratin</option>
                    <option value="poele">Poêle / Sauté</option>
                    <option value="sans-cuisson">Sans cuisson / Salade</option>
                    <option value="cookeo">Cookeo / Multicuiseur</option>
                    <option value="robot">Thermomix / Robot</option>
                    <option value="cocotte">Cocotte / Mijoté</option>
                  </select>
                </div>
              </div>

              {/* Duplicates checkbox & Regenerate button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={noDuplicates}
                      onChange={(e) => {
                        setNoDuplicates(e.target.checked);
                        setTimeout(handleGenerate, 10);
                      }}
                      className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
                    />
                    <span>Pas de doublons</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={includeStarters}
                      onChange={(e) => {
                        setIncludeStarters(e.target.checked);
                        setTimeout(handleGenerate, 10);
                      }}
                      className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
                    />
                    <span>Inclure Entrées</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={includeDesserts}
                      onChange={(e) => {
                        setIncludeDesserts(e.target.checked);
                        setTimeout(handleGenerate, 10);
                      }}
                      className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
                    />
                    <span>Inclure Desserts</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleGenerate}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Régénérer</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 flex items-center justify-between animate-in fade-in duration-300">
              <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 overflow-hidden">
                <span className="bg-amber-500/10 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-lg border border-amber-500/20 whitespace-nowrap">
                  {mealCount} repas
                </span>
                <span className="hidden sm:inline opacity-50">•</span>
                <span className="truncate hidden sm:inline">
                  {dietaryStyle === 'all' ? 'Varié' : dietaryStyle} • {preferredMode === 'all' ? 'Tous modes' : preferredMode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFilterCollapsed(false)}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 underline underline-offset-4 px-2 py-1"
                >
                  Modifier les filtres
                </button>
                <button
                  onClick={handleGenerate}
                  className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-colors"
                  title="Générer à nouveau"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Aperçu des repas générés ({previewRecipes.length}) :
          </h3>

          <div className="space-y-4">
            {previewRecipes.map((mealRecipes, idx) => (
              <div key={idx} className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Repas {idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {mealRecipes.map((recipe, rIdx) => {
                    const localized = translateRecipe(recipe);
                    const mode = inferCookingMode(recipe);
                    return (
                      <div key={rIdx} className="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 min-w-0">
                           <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                              {localized.title}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)} min
                              </span>
                              <span>•</span>
                              <span className="capitalize">{translateCookingMode(mode)}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                          {recipe.servings || 4} pers.
                        </span>
                      </div>
                    );
                  })}
                  {mealRecipes.length === 0 && (
                    <p className="text-xs italic text-slate-400 text-center py-2">Aucune recette trouvée</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800"
          >
            Annuler
          </button>

          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <Check className="w-4 h-4" />
            <span>Appliquer au Planning de la Semaine</span>
          </button>
        </div>

      </div>
    </div>
  );
};
