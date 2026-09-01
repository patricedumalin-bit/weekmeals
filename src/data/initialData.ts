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

export const INITIAL_WEEKLY_PLAN: WeeklyPlan = {
  id: 'plan-default',
  numberOfMeals: 7,
  defaultServings: 4,
  lastUpdated: new Date().toISOString(),
  meals: [
    {
      id: 'meal-slot-1',
      mealNumber: 1,
      label: 'Meal 1',
      servings: 4,
      recipeIds: []
    },
    {
      id: 'meal-slot-2',
      mealNumber: 2,
      label: 'Meal 2',
      servings: 4,
      recipeIds: []
    },
    {
      id: 'meal-slot-3',
      mealNumber: 3,
      label: 'Meal 3',
      servings: 4,
      recipeIds: []
    },
    {
      id: 'meal-slot-4',
      mealNumber: 4,
      label: 'Meal 4',
      servings: 4,
      recipeIds: []
    },
    {
      id: 'meal-slot-5',
      mealNumber: 5,
      label: 'Meal 5',
      servings: 4,
      recipeIds: []
    },
    {
      id: 'meal-slot-6',
      mealNumber: 6,
      label: 'Meal 6',
      servings: 4,
      recipeIds: []
    },
    {
      id: 'meal-slot-7',
      mealNumber: 7,
      label: 'Meal 7',
      servings: 4,
      recipeIds: []
    }
  ]
};
