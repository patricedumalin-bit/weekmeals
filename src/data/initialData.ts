import { Recipe, WeeklyPlan } from '../types';
import { INITIAL_INGREDIENT_CATEGORIES, INITIAL_RECIPE_CATEGORIES } from './categoriesData';
import { INITIAL_INGREDIENTS } from './ingredientsData';
import { RECIPES_FRANCE } from './recipesFrance';
import { RECIPES_ITALY } from './recipesItaly';
import { RECIPES_UK } from './recipesUK';
import { RECIPES_GERMANY } from './recipesGermany';
import { RECIPES_SPAIN } from './recipesSpain';
import { RECIPES_PORTUGAL } from './recipesPortugal';

export { INITIAL_INGREDIENT_CATEGORIES, INITIAL_RECIPE_CATEGORIES, INITIAL_INGREDIENTS };

export const INITIAL_RECIPES: Recipe[] = [
  ...RECIPES_FRANCE,
  ...RECIPES_ITALY,
  ...RECIPES_UK,
  ...RECIPES_GERMANY,
  ...RECIPES_SPAIN,
  ...RECIPES_PORTUGAL,
];

export const INITIAL_PANTRY: Record<string, boolean> = {
  'ing-sel': true,
  'ing-poivre': true,
  'ing-huile-olive': true,
  'ing-olive-oil': true,
  'ing-butter': true,
  'ing-beurre': true,
  'ing-garlic': true,
  'ing-flour': true,
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
      recipeIds: ['rec-fr-poulet-basquaise']
    },
    {
      id: 'meal-slot-2',
      mealNumber: 2,
      label: 'Mardi',
      servings: 4,
      recipeIds: ['rec-spaghetti-carbonara']
    },
    {
      id: 'meal-slot-3',
      mealNumber: 3,
      label: 'Mercredi',
      servings: 4,
      recipeIds: ['rec-fr-cabillaud-croute-herbes']
    },
    {
      id: 'meal-slot-4',
      mealNumber: 4,
      label: 'Jeudi',
      servings: 4,
      recipeIds: ['rec-risotto-funghi']
    },
    {
      id: 'meal-slot-5',
      mealNumber: 5,
      label: 'Vendredi',
      servings: 4,
      recipeIds: ['rec-paella-valenciana']
    },
    {
      id: 'meal-slot-6',
      mealNumber: 6,
      label: 'Samedi',
      servings: 4,
      recipeIds: ['rec-fr-boeuf-bourguignon']
    },
    {
      id: 'meal-slot-7',
      mealNumber: 7,
      label: 'Dimanche',
      servings: 4,
      recipeIds: ['rec-fr-hachis-parmentier']
    }
  ]
};
