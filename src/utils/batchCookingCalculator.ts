import { Recipe, WeeklyPlan, MealSlot } from '../types';

/**
 * Calculates ingredient overlap score between a candidate recipe and already selected recipes.
 * Higher score means more shared ingredients (ideal for batch cooking mutualization).
 */
function calculateIngredientOverlap(candidate: Recipe, selectedRecipes: Recipe[]): number {
  if (selectedRecipes.length === 0) return 0;

  const candidateIngredients = new Set(
    (candidate.ingredients || []).map(i => i.ingredientId)
  );

  let sharedCount = 0;
  selectedRecipes.forEach(sel => {
    (sel.ingredients || []).forEach(i => {
      if (candidateIngredients.has(i.ingredientId)) {
        sharedCount++;
      }
    });
  });

  return sharedCount;
}

/**
 * Generates a weekly meal plan prioritizing recipe selection with maximum ingredient mutualization (Batch Cooking mode).
 */
export function generateBatchCookingPlan(
  allRecipes: Recipe[],
  targetMealCount: number = 7,
  defaultServings: number = 4
): WeeklyPlan {
  if (!allRecipes || allRecipes.length === 0) {
    return {
      id: `batch-plan-${Date.now()}`,
      numberOfMeals: targetMealCount,
      defaultServings,
      meals: [],
      lastUpdated: new Date().toISOString()
    };
  }

  const selected: Recipe[] = [];
  const available = [...allRecipes];

  // Pick first recipe randomly or starting with a core main dish
  if (available.length > 0) {
    const firstIdx = Math.floor(Math.random() * available.length);
    selected.push(available.splice(firstIdx, 1)[0]);
  }

  // Pick remaining recipes prioritizing maximum ingredient overlap
  while (selected.length < targetMealCount && available.length > 0) {
    let bestIdx = 0;
    let bestScore = -1;

    available.forEach((recipe, idx) => {
      const score = calculateIngredientOverlap(recipe, selected);
      if (score > bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    });

    selected.push(available.splice(bestIdx, 1)[0]);
  }

  // Build meal slots
  const meals: MealSlot[] = selected.map((recipe, index) => ({
    id: `meal-batch-${Date.now()}-${index + 1}`,
    mealNumber: index + 1,
    label: `Repas ${index + 1} (Batch)`,
    servings: defaultServings,
    recipeIds: [recipe.id],
    excludedIngredients: {},
    customMeals: []
  }));

  return {
    id: `batch-plan-${Date.now()}`,
    numberOfMeals: meals.length,
    defaultServings,
    meals,
    lastUpdated: new Date().toISOString()
  };
}

export interface BatchCookingStep {
  phase: 'prep' | 'cooking' | 'storage';
  title: string;
  description: string;
  estimatedMinutes: number;
}

/**
 * Generates a chronological batch-cooking session schedule from selected recipes.
 */
export function generateBatchCookingSessionGuide(recipes: Recipe[]): BatchCookingStep[] {
  const steps: BatchCookingStep[] = [];

  if (!recipes || recipes.length === 0) return steps;

  // Phase 1: Wash & Cut
  steps.push({
    phase: 'prep',
    title: 'Lavage et découpe groupée',
    description: 'Lavez tous les légumes et préparez les découpes communes (oignons, carottes, aromates) pour l\'ensemble des recettes.',
    estimatedMinutes: 20
  });

  // Phase 2: Simultaneous Cooking
  steps.push({
    phase: 'cooking',
    title: 'Cuissons simultanées (Four & Plaques)',
    description: 'Lancez les cuissons longues en premier (plats au four, bouillons/mijotés), puis enchaînez avec les poêlées et féculents.',
    estimatedMinutes: 45
  });

  // Phase 3: Packaging & Storage
  steps.push({
    phase: 'storage',
    title: 'Conditionnement et étiquetage',
    description: 'Répartissez les préparations dans des boîtes hermétiques propres. Étiquetez avec le nom du plat et la date limite de consommation conseillée.',
    estimatedMinutes: 15
  });

  return steps;
}
