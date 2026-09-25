import React, { useState } from 'react';
import { X, Sparkles, ChefHat, Clock, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { Recipe, WeeklyPlan } from '../types';
import { generateBatchCookingPlan, generateBatchCookingSessionGuide, BatchCookingStep } from '../utils/batchCookingCalculator';

interface BatchCookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  currentWeeklyPlan?: WeeklyPlan | null;
  onApplyPlan: (newPlan: WeeklyPlan) => void;
}

export const BatchCookingModal: React.FC<BatchCookingModalProps> = ({
  isOpen,
  onClose,
  recipes = [],
  currentWeeklyPlan,
  onApplyPlan
}) => {
  const [mealCount, setMealCount] = useState<number>(7);
  const [generatedPlan, setGeneratedPlan] = useState<WeeklyPlan | null>(null);
  const [sessionSteps, setSessionSteps] = useState<BatchCookingStep[]>([]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    const plan = generateBatchCookingPlan(recipes, mealCount);
    setGeneratedPlan(plan);

    // Get recipes for this plan
    const planRecipes = plan.meals.map(m => recipes.find(r => r.id === m.recipeIds[0])).filter(Boolean) as Recipe[];
    setSessionSteps(generateBatchCookingSessionGuide(planRecipes));
  };

  const handleApply = () => {
    if (generatedPlan) {
      onApplyPlan(generatedPlan);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-slate-100">

        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Assistant Batch-Cooking</h2>
              <p className="text-xs text-slate-400">Mutualisation maximale des ingrédients et guide de préparation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!generatedPlan ? (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed flex items-start gap-3">
                <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                <p>
                  Notre algorithme intelligent sélectionne vos recettes en privilégiant la <strong>mutualisation des ingrédients</strong> (légumes, féculents et bases communs). Vous réduisez ainsi votre temps de course, votre budget et votre charge mentale en cuisine !
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Nombre de repas à planifier : {mealCount}</label>
                <input
                  type="range"
                  min="3"
                  max="14"
                  value={mealCount}
                  onChange={(e) => setMealCount(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>3 repas</span>
                  <span>7 repas (1 semaine)</span>
                  <span>14 repas</span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Générer le plan Batch-Cooking intelligent
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Session Planifiée ({generatedPlan.meals.length} repas)
                </h3>
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Modifier les options
                </button>
              </div>

              {/* Guide de préparation chronologique */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Guide de session chronologique</h4>
                {sessionSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm">{step.title}</span>
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> ~{step.estimatedMinutes} min
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleApply}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Appliquer ce plan Batch-Cooking à ma semaine
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
