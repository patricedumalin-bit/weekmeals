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

  // Recommendations & Advice Logic
  const getNutritionAdvice = () => {
    const advice = [];

    // Balanced distribution: P: 15-25%, G: 45-55%, F: 25-35%
    const proteinCals = avgProtein * 4;
    const carbsCals = avgCarbs * 4;
    const fatCals = avgFat * 9;
    const totalCals = proteinCals + carbsCals + fatCals || 1;

    const pPct = (proteinCals / totalCals) * 100;
    const gPct = (carbsCals / totalCals) * 100;
    const fPct = (fatCals / totalCals) * 100;

    // Custom advice based on Goal
    if (dietaryGoal === 'weight-loss') {
      if (avgCalories > 600) {
        advice.push({ type: 'warning', icon: '🏃', text: language === 'fr' ? "Pour perdre du poids, essayez de viser moins de 600 kcal par plat principal." : "To lose weight, try aiming for less than 600 kcal per main dish." });
      }
      if (gPct > 45) {
        advice.push({ type: 'info', icon: '🥗', text: language === 'fr' ? "Réduisez un peu les glucides au profit des légumes verts pour accélérer vos résultats." : "Reduce carbs a bit in favor of green vegetables to speed up your results." });
      }
    } else if (dietaryGoal === 'muscle-gain') {
      if (pPct < 25) {
        advice.push({ type: 'warning', icon: '💪', text: language === 'fr' ? "Apport en protéines insuffisant pour la prise de muscle. Visez au moins 25%." : "Insufficient protein intake for muscle gain. Aim for at least 25%." });
      }
    } else if (dietaryGoal === 'low-carb') {
      if (gPct > 30) {
        advice.push({ type: 'alert', icon: '🥑', text: language === 'fr' ? "Attention, votre apport en glucides est trop élevé pour un régime Low-Carb." : "Watch out, your carbohydrate intake is too high for a Low-Carb diet." });
      }
    } else if (dietaryGoal === 'heart-health') {
      if (fPct > 25) {
        advice.push({ type: 'warning', icon: '❤️', text: language === 'fr' ? "Réduisez les graisses pour protéger votre santé cardiaque (max 25% des calories)." : "Reduce fats to protect your heart health (max 25% of calories)." });
      }
    }

    if (pPct < 15 && dietaryGoal !== 'low-carb') {
      advice.push({
        type: 'warning',
        icon: '🥩',
        text: language === 'fr' ? "Apport en protéines un peu faible. Ajoutez des légumineuses ou des œufs." : "Protein intake is a bit low. Add legumes or eggs."
      });
    }

    if (fPct > 35) {
      advice.push({
        type: 'info',
        icon: '🥑',
        text: t(language === 'fr' ? "Vos lipides sont élevés. Privilégiez les graisses insaturées (huile d'olive, oléagineux) aux graisses animales." : "Your fats are high. Favor unsaturated fats (olive oil, nuts) over animal fats.")
      });
    }

    if (avgCalories > 800) {
      advice.push({
        type: 'alert',
        icon: '⚖️',
        text: t(language === 'fr' ? "Moyenne calorique élevée par plat. Pensez à augmenter la part de légumes verts dans vos accompagnements." : "High average calories per dish. Consider increasing the share of green vegetables in your sides.")
      });
    }

    // Default general advice if nothing specific
    if (advice.length < 2) {
      advice.push({
        type: 'success',
        icon: '💧',
        text: t(language === 'fr' ? "N'oubliez pas de boire 1.5L d'eau par jour pour accompagner la digestion de vos repas planifiés." : "Don't forget to drink 1.5L of water per day to support the digestion of your planned meals.")
      });
    }

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
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-xs">
                      <div className="flex items-center justify-between mb-1 text-amber-600">
                        <span className="text-[10px] font-bold uppercase">Calories</span>
                        <Flame className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100">{avgCalories}</div>
                      <div className="text-[9px] text-slate-400">kcal / plat</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 shadow-xs">
                      <div className="flex items-center justify-between mb-1 text-rose-600">
                        <span className="text-[10px] font-bold uppercase">Protéines</span>
                        <Dna className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100">{avgProtein}g</div>
                      <div className="text-[9px] text-slate-400">moyenne / pers.</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-xs">
                      <div className="flex items-center justify-between mb-1 text-blue-600">
                        <span className="text-[10px] font-bold uppercase">Glucides</span>
                        <Wheat className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100">{avgCarbs}g</div>
                      <div className="text-[9px] text-slate-400">énergie lente</div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-xs">
                      <div className="flex items-center justify-between mb-1 text-emerald-600">
                        <span className="text-[10px] font-bold uppercase">Lipides</span>
                        <Droplet className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100">{avgFat}g</div>
                      <div className="text-[9px] text-slate-400">bonnes graisses</div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {getNutritionAdvice().map((adv, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 flex items-start gap-3 shadow-sm">
                          <span className="text-xl shrink-0">{adv.icon}</span>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{adv.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Distribution Bar */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>Equilibre des Macronutriments</span>
                      <div className="flex gap-2">
                        <span className="text-rose-500">P</span>
                        <span className="text-blue-500">G</span>
                        <span className="text-emerald-500">L</span>
                      </div>
                    </div>

                    {(() => {
                      const pC = avgProtein * 4;
                      const cC = avgCarbs * 4;
                      const fC = avgFat * 9;
                      const total = pC + cC + fC || 1;
                      const pP = Math.round((pC/total)*100);
                      const cP = Math.round((cC/total)*100);
                      const fP = Math.max(0, 100 - pP - cP);

                      return (
                        <div className="space-y-3">
                          <div className="h-3 w-full rounded-full overflow-hidden flex shadow-inner bg-slate-200 dark:bg-slate-700">
                            <div style={{ width: `${pP}%` }} className="bg-rose-500 transition-all duration-500" />
                            <div style={{ width: `${cP}%` }} className="bg-blue-500 transition-all duration-500" />
                            <div style={{ width: `${fP}%` }} className="bg-emerald-500 transition-all duration-500" />
                          </div>
                          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"/> Protéines {pP}%</span>
                            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"/> Glucides {cP}%</span>
                            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Lipides {fP}%</span>
                          </div>
                        </div>
                      );
                    })()}
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

                  <div className={`p-5 rounded-3xl space-y-4 relative overflow-hidden transition-all ${
                    isPremium
                      ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl'
                      : 'bg-slate-100 border border-slate-200 text-slate-400 grayscale-[0.8]'
                  }`}>
                    {!isPremium && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/5 backdrop-blur-[2px] z-10 p-4 text-center">
                        <Crown className="w-8 h-8 text-amber-500 mb-2" />
                        <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter">Conseils Budget réservés à la version Full 🔒</p>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Lightbulb className="w-24 h-24" />
                    </div>
                    <h3 className={`text-sm font-bold flex items-center gap-2 ${isPremium ? 'text-white' : 'text-slate-500'}`}>
                      <Lightbulb className={`w-4 h-4 ${isPremium ? 'text-amber-400' : 'text-slate-400'}`} />
                      Conseils d'Amélioration du Budget
                    </h3>
                    <ul className="space-y-3">
                      {accumulatedWeeklyCost > 80 && (
                        <li className={`text-xs flex items-start gap-2 p-2.5 rounded-xl border ${isPremium ? 'bg-white/10 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                          <span className={isPremium ? "text-amber-400" : ""}>💡</span>
                          <span>Votre budget est élevé. Privilégiez 1 ou 2 repas végétariens de plus pour économiser environ 15€ cette semaine.</span>
                        </li>
                      )}
                      {accumulatedWeeklySavings < 10 && (
                        <li className={`text-xs flex items-start gap-2 p-2.5 rounded-xl border ${isPremium ? 'bg-white/10 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                          <span className={isPremium ? "text-emerald-400" : ""}>🌱</span>
                          <span>Vous utilisez peu votre stock. Essayez de vider vos placards avant de racheter des féculents ou conserves.</span>
                        </li>
                      )}
                      <li className={`text-xs flex items-start gap-2 p-2.5 rounded-xl border ${isPremium ? 'bg-white/10 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                        <span className={isPremium ? "text-blue-400" : ""}>🛒</span>
                        <span>Faire vos courses au Drive avec notre scan PDF évite les achats compulsifs en rayon (gain estimé : 12% sur le ticket).</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => isPremium ? handleArchiveWeek() : alert("L'archivage des semaines est réservé à la version Full 🔒\nSuivez votre progression annuelle pour 9,99€/an !")}
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
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-600 flex items-center justify-center text-white mb-4 shadow-xl shadow-orange-500/20">
                        <Crown className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter italic">Historique Premium 🔒</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xs">
                        Débloquez l'historique complet sur 1 an et les projections d'économies annuelles en passant à la version Full.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2 rounded-full bg-orange-600 text-white font-bold text-xs shadow-lg hover:bg-orange-500 transition-all"
                      >
                        Voir les offres dans mon profil
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Historique & Projection Annuelle</h3>
                    <div className="flex items-center gap-2">
                      {weeklyHistory.length > 0 && (
                        <button
                          onClick={() => { if(confirm('Voulez-vous effacer tout l\'historique ?')) clearHistory(); }}
                          className="text-[10px] text-rose-500 hover:underline font-bold"
                        >
                          Effacer l'historique
                        </button>
                      )}
                      <History className="w-4 h-4 text-slate-400" />
                    </div>
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
