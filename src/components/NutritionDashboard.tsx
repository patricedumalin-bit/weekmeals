import React from 'react';
import { 
  X, 
  Flame, 
  Dna, 
  Wheat, 
  Droplet, 
  Sparkles, 
  PieChart as PieIcon,
  CheckCircle2,
  TrendingUp,
  Heart
} from 'lucide-react';
import { WeeklyPlan, Recipe, Ingredient, NutritionInfo } from '../types';
import { estimateRecipeNutrition } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';

interface NutritionDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  weeklyPlan?: WeeklyPlan | null;
  recipes: Recipe[];
  ingredients: Ingredient[];
}

export const NutritionDashboard: React.FC<NutritionDashboardProps> = ({
  isOpen,
  onClose,
  weeklyPlan,
  recipes = [],
  ingredients = []
}) => {
  const { translateRecipe } = useLanguage();

  if (!isOpen) return null;

  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  const recipeMap = new Map<string, Recipe>(safeRecipes.map(r => [r.id, r]));

  // Calculate nutrition for each meal in the plan
  const mealNutritionList: { mealLabel: string; recipeTitle: string; nutrition: NutritionInfo }[] = [];

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let plannedMealsCount = 0;

  for (const meal of (weeklyPlan?.meals || [])) {
    if (meal.recipeIds && meal.recipeIds.length > 0) {
      for (const rId of meal.recipeIds) {
        const rec = recipeMap.get(rId);
        if (rec) {
          const nut = estimateRecipeNutrition(rec, safeIngredients);
          mealNutritionList.push({
            mealLabel: meal.label || `Repas ${meal.mealNumber}`,
            recipeTitle: translateRecipe(rec).title,
            nutrition: nut
          });
          totalCalories += nut.calories;
          totalProtein += nut.protein;
          totalCarbs += nut.carbs;
          totalFat += nut.fat;
          plannedMealsCount++;
        }
      }
    }
  }

  const avgCalories = plannedMealsCount > 0 ? Math.round(totalCalories / plannedMealsCount) : 0;
  const avgProtein = plannedMealsCount > 0 ? Math.round((totalProtein / plannedMealsCount) * 10) / 10 : 0;
  const avgCarbs = plannedMealsCount > 0 ? Math.round((totalCarbs / plannedMealsCount) * 10) / 10 : 0;
  const avgFat = plannedMealsCount > 0 ? Math.round((totalFat / plannedMealsCount) * 10) / 10 : 0;

  // Macro calorie contributions (approx: 4 kcal/g protein & carbs, 9 kcal/g fat)
  const proteinCals = avgProtein * 4;
  const carbsCals = avgCarbs * 4;
  const fatCals = avgFat * 9;
  const sumMacroCals = proteinCals + carbsCals + fatCals || 1;

  const pPercent = Math.round((proteinCals / sumMacroCals) * 100);
  const cPercent = Math.round((carbsCals / sumMacroCals) * 100);
  const fPercent = Math.max(0, 100 - pPercent - cPercent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Bilan Nutritionnel de la Semaine
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Moyennes calculées par portion sur vos repas planifiés.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {plannedMealsCount === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-30 text-rose-500" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Aucun repas planifié cette semaine</p>
              <p className="text-xs text-slate-400 mt-1">Ajoutez des recettes à votre planning pour afficher l'analyse nutritionnelle.</p>
            </div>
          ) : (
            <>
              {/* Macro Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                    <span className="text-xs font-semibold">Calories</span>
                    <Flame className="w-4 h-4" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{avgCalories}</span>
                    <span className="text-xs text-slate-500 ml-1">kcal / plat</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
                    <span className="text-xs font-semibold">Protéines</span>
                    <Dna className="w-4 h-4" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{avgProtein}g</span>
                    <span className="text-xs text-slate-500 ml-1">({pPercent}%)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                    <span className="text-xs font-semibold">Glucides</span>
                    <Wheat className="w-4 h-4" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{avgCarbs}g</span>
                    <span className="text-xs text-slate-500 ml-1">({cPercent}%)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span className="text-xs font-semibold">Lipides</span>
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{avgFat}g</span>
                    <span className="text-xs text-slate-500 ml-1">({fPercent}%)</span>
                  </div>
                </div>
              </div>

              {/* Macro Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Répartition des Macronutriments</span>
                  <span className="text-slate-400 font-normal">Recommandation : 15-25% P / 45-55% G / 25-35% L</span>
                </div>

                <div className="h-3 w-full rounded-full overflow-hidden flex">
                  <div style={{ width: `${pPercent}%` }} className="bg-rose-500 transition-all" title={`Protéines: ${pPercent}%`} />
                  <div style={{ width: `${cPercent}%` }} className="bg-blue-500 transition-all" title={`Glucides: ${cPercent}%`} />
                  <div style={{ width: `${fPercent}%` }} className="bg-emerald-500 transition-all" title={`Lipides: ${fPercent}%`} />
                </div>

                <div className="flex items-center justify-around text-[11px] pt-1 text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Protéines ({pPercent}%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Glucides ({cPercent}%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Lipides ({fPercent}%)</span>
                </div>
              </div>

              {/* Detailed meal list */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Détail par repas de la semaine :
                </h3>

                <div className="space-y-2">
                  {mealNutritionList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {item.recipeTitle}
                        </p>
                        <p className="text-[10px] text-slate-400">{item.mealLabel}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 text-slate-600 dark:text-slate-400 font-mono">
                        <span className="text-amber-600 dark:text-amber-400 font-bold">{item.nutrition.calories} kcal</span>
                        <span>{item.nutrition.protein}g P</span>
                        <span>{item.nutrition.carbs}g G</span>
                        <span>{item.nutrition.fat}g L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex justify-end bg-slate-50/50 dark:bg-slate-800/30">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
