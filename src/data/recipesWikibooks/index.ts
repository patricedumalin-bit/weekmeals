import { Recipe } from '../../types';
import { mergeRecipeCollections } from '../recipeUtils';
import { RECIPES_WIKIBOOKS_MEAT } from './recipesWikibooksMeat';
import { RECIPES_WIKIBOOKS_POULTRY } from './recipesWikibooksPoultry';
import { RECIPES_WIKIBOOKS_DESSERTS } from './recipesWikibooksDesserts';
import { RECIPES_WIKIBOOKS_SEAFOOD } from './recipesWikibooksSeafood';
import { RECIPES_WIKIBOOKS_VEGETABLES } from './recipesWikibooksVegetables';
import { RECIPES_WIKIBOOKS_OTHER } from './recipesWikibooksOther';
import { RECIPES_WIKIBOOKS_PASTA_RICE } from './recipesWikibooksPastaRice';
import { RECIPES_WIKIBOOKS_STARTERS } from './recipesWikibooksStarters';

// Combine all Wikibooks recipe sub-files (split by recipe category, mirroring
// the src/data/recipesFrance/ convention) into a single deduplicated catalog
// using the shared generic merge mechanism (see src/data/recipeUtils.ts).
export const RECIPES_WIKIBOOKS: Recipe[] = mergeRecipeCollections(
  RECIPES_WIKIBOOKS_MEAT,
  RECIPES_WIKIBOOKS_POULTRY,
  RECIPES_WIKIBOOKS_DESSERTS,
  RECIPES_WIKIBOOKS_SEAFOOD,
  RECIPES_WIKIBOOKS_VEGETABLES,
  RECIPES_WIKIBOOKS_OTHER,
  RECIPES_WIKIBOOKS_PASTA_RICE,
  RECIPES_WIKIBOOKS_STARTERS
);
