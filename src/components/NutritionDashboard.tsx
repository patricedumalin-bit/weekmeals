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
  History,
  Crown
} from 'lucide-react';
import { WeeklyPlan, Recipe, Ingredient, NutritionInfo, WeeklyHistoryItem } from '../types';
import { estimateRecipeNutrition, calculateRecipeTotalBudget } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';
import { useDataStore } from '../stores/useDataStore';
import { useAuthStore } from '../stores/useAuthStore';

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
  const { translateRecipe, t, language } = useLanguage();
  const { weeklyHistory, archiveWeeklyPlan, clearHistory } = useDataStore();
  const { userData } = useAuthStore();
  const isPremium = userData?.subscriptionStatus === 'premium';
  const [activeTab, setActiveTab] = React.useState<'nutrition' | 'budget' | 'evolution'>('nutrition');

  const dietaryGoal = userData?.dietaryGoal || 'balanced';

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

  const getNutritionAdvice = () => {
    const advice = [];
    const proteinCals = avgProtein * 4;
    const carbsCals = avgCarbs * 4;
    const fatCals = avgFat * 9;
    const totalCals = proteinCals + carbsCals + fatCals || 1;
    const pPct = (proteinCals / totalCals) * 100;
    const gPct = (carbsCals / totalCals) * 100;
    const fPct = (fatCals / totalCals) * 100;

    if (dietaryGoal === 'weight-loss') {
      if (avgCalories > 600) advice.push({ type: 'warning', icon: '🏃', text: language === 'fr' ? "Réduisez les calories" : "Reduce calories" });
    } else if (dietaryGoal === 'muscle-gain') {
      if (pPct < 25) advice.push({ type: 'warning', icon: '💪', text: language === 'fr' ? "Plus de protéines" : "More protein" });
    }

    if (advice.length === 0) advice.push({ type: 'success', icon: '✅', text: language === 'fr' ? "Bon équilibre !" : "Good balance!" });
    return advice;
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

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
        <div className="px-4 sm:px-6 pt-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-transparent">
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
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                      <div className="flex items-center justify-between mb-1 text-amber-600">
                        <span className="text-[10px] font-bold uppercase">Calories</span>
                        <Flame className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100">{avgCalories}</div>
                      <div className="text-[9px] text-slate-400">kcal / plat</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                      <div className="flex items-center justify-between mb-1 text-rose-600">
                        <span className="text-[10px] font-bold uppercase">Protéines</span>
                        <Dna className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100">{avgProtein}g</div>
                      <div className="text-[9px] text-slate-400">moyenne / pers.</div>
                    </div>
                  </div>

                  {/* Recommendations & Advice - PREMIUM 🔒 */}
                  <div className={`p-5 rounded-3xl space-y-4 relative overflow-hidden transition-all ${
                    isPremium
                      ? 'bg-gradient-to-br from-rose-500/5 to-amber-500/5 border border-rose-500/10'
                      : 'bg-slate-100/50 border border-slate-200 grayscale-[0.8] opacity-80'
                  }`}>
                    {!isPremium && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/5 backdrop-blur-[2px] z-10 p-4 text-center">
                        <Crown className="w-8 h-8 text-amber-500 mb-2" />
                        <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter">Conseils IA réservés à la version Full 🔒</p>
                      </div>
                    )}
                    <h3 className="text-sm font-bold flex items-center gap-2 text-rose-700 dark:text-rose-400">
                      <Sparkles className="w-4 h-4" />
                      Conseils Nutritionnels Personnalisés
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {getNutritionAdvice().map((adv, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 flex items-start gap-3 shadow-sm">
                          <span className="text-xl shrink-0">{adv.icon}</span>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{adv.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'budget' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                   <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 rounded-3xl bg-sky-500/10 border border-sky-500/20 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-sky-700 uppercase">Budget Estimé Semaine</span>
                        <Euro className="w-5 h-5 text-sky-600" />
                      </div>
                      <div className="text-3xl font-black text-sky-700 dark:text-sky-400">{accumulatedWeeklyCost.toFixed(2)} €</div>
                    </div>
                  </div>

                  <button
                    onClick={() => isPremium ? handleArchiveWeek() : alert("L'archivage est réservé à la version Full 🔒")}
                    className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all ${
                      isPremium
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-slate-200 text-slate-400 grayscale cursor-not-allowed shadow-none'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Valider et Archiver cette Semaine {!isPremium && '🔒'}
                  </button>
                </div>
              )}

              {activeTab === 'evolution' && (
                <div className="space-y-6 animate-in fade-in duration-300 relative min-h-[300px]">
                  {!isPremium && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 text-center">
                      <Crown className="w-10 h-10 text-amber-500 mb-4" />
                      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter italic">Historique Premium 🔒</h3>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Historique & Projection</h3>
                    <History className="w-4 h-4 text-slate-400" />
                  </div>

                  {weeklyHistory.length === 0 ? (
                    <div className="py-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 text-xs">Aucun historique.</div>
                  ) : (
                    <div className="space-y-2">
                      {weeklyHistory.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-[var(--cell-bg)] border border-[var(--border-color)]">
                           <div className="text-xs font-bold">{new Date(item.date).toLocaleDateString()}</div>
                           <div className="text-sm font-bold text-sky-600">{item.totalCost.toFixed(2)} €</div>
                        </div>
                      ))}
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
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
