import { Recipe, WeeklyPlan } from '../types';
import { INITIAL_INGREDIENT_CATEGORIES, INITIAL_RECIPE_CATEGORIES, normalizeRecipeCategoryId } from './categoriesData';
import { INITIAL_INGREDIENTS } from './ingredientsData';
import { mergeRecipeCollections } from './recipeUtils';
import { RECIPES_FRANCE } from './recipesFrance';
import { RECIPES_ITALY } from './recipesItaly';
import { RECIPES_UK } from './recipesUK';
import { RECIPES_GERMANY } from './recipesGermany';
import { RECIPES_SPAIN } from './recipesSpain';
import { RECIPES_PORTUGAL } from './recipesPortugal';
import { CLOUD_RECIPES } from './cloudRecipesMock';
import { RECIPES_WIKIBOOKS } from './recipesWikibooks';

export { INITIAL_INGREDIENT_CATEGORIES, INITIAL_RECIPE_CATEGORIES, INITIAL_INGREDIENTS };

// Combine every country/source recipe collection into a single deduplicated
// catalog using the same generic merge mechanism as the France sub-files
// (see src/data/recipeUtils.ts) — previously this used a plain spread with no
// duplicate protection, inconsistent with how France's sub-files were merged.
const RAW_INITIAL_RECIPES: Recipe[] = mergeRecipeCollections(
  RECIPES_FRANCE,
  RECIPES_ITALY,
  RECIPES_UK,
  RECIPES_GERMANY,
  RECIPES_SPAIN,
  RECIPES_PORTUGAL,
  RECIPES_WIKIBOOKS,
  CLOUD_RECIPES
);

// Certaines sources de recettes utilisent des identifiants de catégorie "synonymes"
// (ex: 'rcat-starters' au lieu de 'rcat-entree'). On les normalise ici vers les 8
// catégories officielles pour qu'aucune recette ne soit exclue des filtres par catégorie.
export const INITIAL_RECIPES: Recipe[] = RAW_INITIAL_RECIPES.map((recipe) => ({
  ...recipe,
  categoryId: normalizeRecipeCategoryId(recipe.categoryId),
}));

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
