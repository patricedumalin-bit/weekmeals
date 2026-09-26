import { Recipe, WeeklyPlan } from '../types';
import { INITIAL_INGREDIENT_CATEGORIES, INITIAL_RECIPE_CATEGORIES, normalizeRecipeCategoryId } from './categoriesData';
import { INITIAL_INGREDIENTS } from './ingredientsData';
import { CURATED_100_RECIPES } from './cloudRecipesMock';

export { INITIAL_INGREDIENT_CATEGORIES, INITIAL_RECIPE_CATEGORIES, INITIAL_INGREDIENTS };

export const INITIAL_RECIPES: Recipe[] = CURATED_100_RECIPES.map((recipe) => ({
  ...recipe,
  categoryId: normalizeRecipeCategoryId(recipe.categoryId),
}));

export const INITIAL_PANTRY: Record<string, boolean> = {
  'ing-sel': true,
  'ing-poivre': true,
  'ing-huile-olive': true,
  'ing-beurre': true,
  'ing-ail': true,
  'ing-farine': true,
};

export const INITIAL_WEEKLY_PLAN: WeeklyPlan = {
  id: 'plan-default',
  numberOfMeals: 7,
  defaultServings: 4,
  lastUpdated: new Date().toISOString(),
  meals: [
    {
      id: 'meal-slot-1',
      mealNumber: 1,
      label: 'Lundi',
      servings: 4,
      recipeIds: ['rec-main-1'] // Poulet Basquaise
    },
    {
      id: 'meal-slot-2',
      mealNumber: 2,
      label: 'Mardi',
      servings: 4,
      recipeIds: ['rec-main-5'] // Spaghetti Carbonara
    },
    {
      id: 'meal-slot-3',
      mealNumber: 3,
      label: 'Mercredi',
      servings: 4,
      recipeIds: ['rec-main-7'] // Saumon Grillé
    },
    {
      id: 'meal-slot-4',
      mealNumber: 4,
      label: 'Jeudi',
      servings: 4,
      recipeIds: ['rec-main-10'] // Risotto aux Champignons
    },
    {
      id: 'meal-slot-5',
      mealNumber: 5,
      label: 'Vendredi',
      servings: 4,
      recipeIds: ['rec-main-8'] // Pizza Margherita
    },
    {
      id: 'meal-slot-6',
      mealNumber: 6,
      label: 'Samedi',
      servings: 4,
      recipeIds: ['rec-main-2'] // Bœuf Bourguignon
    },
    {
      id: 'meal-slot-7',
      mealNumber: 7,
      label: 'Dimanche',
      servings: 4,
      recipeIds: ['rec-main-3'] // Hachis Parmentier
    }
  ]
};
