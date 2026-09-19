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
  Heart,
  Euro,
  Scale,
  Calendar,
  ChevronRight,
  Lightbulb,
  History
} from 'lucide-react';
import { WeeklyPlan, Recipe, Ingredient, NutritionInfo, WeeklyHistoryItem } from '../types';
import { estimateRecipeNutrition, calculateRecipeTotalBudget } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';
import { useDataStore } from '../stores/useDataStore';

interface NutritionDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  weeklyPlan?: WeeklyPlan | null;
  recipes: Recipe[];
  ingredients: Ingredient[];
  pantryMap?: Record<string, boolean>;
}

export const NutritionDashboard: React.FC<NutritionDashboardProps> = ({
  isOpen,
  onClose,
  weeklyPlan,
  recipes = [],
  ingredients = [],
  pantryMap = {}
}) => {
  const { translateRecipe, t } = useLanguage();
  const { weeklyHistory, archiveWeeklyPlan } = useDataStore();
  const [activeTab, setActiveTab] = React.useState<'nutrition' | 'budget' | 'evolution'>('nutrition');

  if (!isOpen) return null;

  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  const recipeMap = new Map<string, Recipe>(safeRecipes.map(r => [r.id, r]));

  // Calculate nutrition for each meal in the plan
  const mealNutritionList: { mealLabel: string; recipeTitle: string; nutrition: NutritionInfo; price: number; savings: number }[] = [];

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let plannedMealsCount = 0;
  let accumulatedWeeklyCost = 0;
  let accumulatedWeeklySavings = 0;

  for (const meal of (weeklyPlan?.meals || [])) {
    const mealServings = meal.servings || weeklyPlan?.defaultServings || 4;
    if (meal.recipeIds && meal.recipeIds.length > 0) {
      for (let rIdx = 0; rIdx < meal.recipeIds.length; rIdx++) {
        const rId = meal.recipeIds[rIdx];
        const rec = recipeMap.get(rId);
        if (rec) {
          const nut = estimateRecipeNutrition(rec, safeIngredients);
          const excludedIds = meal.excludedIngredients?.[rIdx] || [];
          const scaleFactor = mealServings / (rec.servings || 4);
          const { total: recPrice, savings: recSavings } = calculateRecipeTotalBudget(rec, safeIngredients, excludedIds, pantryMap, scaleFactor);

          mealNutritionList.push({
            mealLabel: meal.label || `Repas ${meal.mealNumber}`,
            recipeTitle: translateRecipe(rec).title,
            nutrition: nut,
            price: recPrice,
            savings: recSavings
          });
          totalCalories += nut.calories;
          totalProtein += nut.protein;
          totalCarbs += nut.carbs;
          totalFat += nut.fat;
          accumulatedWeeklyCost += recPrice;
          accumulatedWeeklySavings += recSavings;
          plannedMealsCount++;
        }
      }
    }
  }

  const avgCalories = plannedMealsCount > 0 ? Math.round(totalCalories / plannedMealsCount) : 0;
  const avgProtein = plannedMealsCount > 0 ? Math.round((totalProtein / plannedMealsCount) * 10) / 10 : 0;
  const avgCarbs = plannedMealsCount > 0 ? Math.round((totalCarbs / plannedMealsCount) * 10) / 10 : 0;
  const avgFat = plannedMealsCount > 0 ? Math.round((totalFat / plannedMealsCount) * 10) / 10 : 0;

  const handleArchiveWeek = () => {
    if (plannedMealsCount === 0) return;
    const summary: WeeklyHistoryItem = {
      id: `week-${Date.now()}`,
      weekNumber: 1, // Simplified
      year: new Date().getFullYear(),
      totalCost: accumulatedWeeklyCost,
      totalSavings: accumulatedWeeklySavings,
      mealsCount: plannedMealsCount,
      nutritionAvg: { calories: avgCalories, protein: avgProtein, carbs: avgCarbs, fat: avgFat },
      date: new Date().toISOString()
    };
    archiveWeeklyPlan(summary);
    alert("Semaine archivée avec succès !");
  };


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
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Tableau de Bord & Analyses
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Suivez votre budget, votre nutrition et votre impact.
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

        {/* Tab switcher */}
        <div className="px-4 sm:px-6 pt-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 ${activeTab === 'nutrition' ? 'border-rose-500 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Nutrition
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 flex items-center gap-1.5 ${activeTab === 'budget' ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Budget & Impact
          </button>
          <button
            onClick={() => setActiveTab('evolution')}
            className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 flex items-center gap-1.5 ${activeTab === 'evolution' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Évolution Annuelle
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {plannedMealsCount === 0 && activeTab !== 'evolution' ? (
            <div className="text-center py-12 text-slate-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-500" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Aucune donnée pour cette semaine</p>
              <p className="text-xs text-slate-400 mt-1">Ajoutez des recettes à votre planning pour générer le rapport.</p>
            </div>
          ) : (
            <>
              {activeTab === 'nutrition' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                      <span className="text-[11px] font-semibold text-amber-600">Calories / plat</span>
                      <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{avgCalories}</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                      <span className="text-[11px] font-semibold text-rose-600">Protéines</span>
                      <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{avgProtein}g</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <span className="text-[11px] font-semibold text-blue-600">Glucides</span>
                      <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{avgCarbs}g</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[11px] font-semibold text-emerald-600">Lipides</span>
                      <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{avgFat}g</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Répartition Hebdomadaire</h3>
                    <div className="space-y-2">
                      {mealNutritionList.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-200 dark:border-slate-700 last:border-0">
                          <span className="truncate flex-1 font-medium">{item.recipeTitle}</span>
                          <span className="font-mono text-amber-600">{item.nutrition.calories} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'budget' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-sky-500/10 border border-sky-500/20 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-sky-700 uppercase">Budget Estimé Semaine</span>
                        <Euro className="w-5 h-5 text-sky-600" />
                      </div>
                      <div className="text-3xl font-black text-sky-700 dark:text-sky-400">{accumulatedWeeklyCost.toFixed(2)} €</div>
                      <p className="text-[10px] text-sky-600/70 mt-1">Coût des ingrédients à acheter</p>
                    </div>

                    <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-700 uppercase">Économies (Stock)</span>
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">+{accumulatedWeeklySavings.toFixed(2)} €</div>
                      <p className="text-[10px] text-emerald-600/70 mt-1">Valeur des produits déjà en votre possession</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Lightbulb className="w-24 h-24" />
                    </div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      Conseils d'Amélioration du Budget
                    </h3>
                    <ul className="space-y-3">
                      {accumulatedWeeklyCost > 80 && (
                        <li className="text-xs flex items-start gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                          <span className="text-amber-400">💡</span>
                          <span>Votre budget est élevé. Privilégiez 1 ou 2 repas végétariens de plus pour économiser environ 15€ cette semaine.</span>
                        </li>
                      )}
                      {accumulatedWeeklySavings < 10 && (
                        <li className="text-xs flex items-start gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                          <span className="text-emerald-400">🌱</span>
                          <span>Vous utilisez peu votre stock. Essayez de vider vos placards avant de racheter des féculents ou conserves.</span>
                        </li>
                      )}
                      <li className="text-xs flex items-start gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                        <span className="text-blue-400">🛒</span>
                        <span>Faire vos courses au Drive avec notre scan PDF évite les achats compulsifs en rayon (gain estimé : 12% sur le ticket).</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleArchiveWeek}
                    className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Valider et Archiver cette Semaine
                  </button>
                </div>
              )}

              {activeTab === 'evolution' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Historique & Projection Annuelle</h3>
                    <History className="w-4 h-4 text-slate-400" />
                  </div>

                  {weeklyHistory.length === 0 ? (
                    <div className="py-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                      <p className="text-xs text-slate-500">Aucun historique archivé. Validez votre première semaine dans l'onglet Budget !</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Projection Card */}
                      <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-center">
                         <span className="text-xs font-bold text-amber-700 uppercase">Économies Annuelles Projetées</span>
                         <div className="text-4xl font-black text-amber-600 mt-1">
                           {((weeklyHistory.reduce((s, h) => s + h.totalSavings, 0) / weeklyHistory.length) * 52).toFixed(0)} € / an
                         </div>
                         <p className="text-[10px] text-amber-700/60 mt-2 italic">Basé sur vos {weeklyHistory.length} dernières semaines archivées.</p>
                      </div>

                      <div className="space-y-2">
                        {weeklyHistory.map((item, idx) => (
                          <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs">
                             <div>
                               <div className="text-xs font-bold">Semaine du {new Date(item.date).toLocaleDateString()}</div>
                               <div className="text-[10px] text-slate-500">{item.mealsCount} repas planifiés</div>
                             </div>
                             <div className="text-right">
                               <div className="text-sm font-bold text-sky-600">{item.totalCost.toFixed(2)} €</div>
                               <div className="text-[10px] font-bold text-emerald-600">+{item.totalSavings.toFixed(2)} € éco.</div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
