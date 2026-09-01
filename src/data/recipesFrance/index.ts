import { Recipe } from '../../types';
import { RECIPES_FRANCE_STARTERS } from './recipesFranceStarters';
import { RECIPES_FRANCE_STARTERS_PART2 } from './recipesFranceStarters2';
import { RECIPES_FRANCE_STARTERS_BATCH3 } from './recipesFranceStartersBatch3';
import { RECIPES_FRANCE_MAINS_MEAT } from './recipesFranceMainsMeat';
import { RECIPES_FRANCE_MAINS_MEAT_BATCH2 } from './recipesFranceMainsMeatBatch2';
import { RECIPES_FRANCE_MAINS_SEAFOOD } from './recipesFranceMainsSeafood';
import { RECIPES_FRANCE_MAINS_REGIONAL } from './recipesFranceMainsRegional';
import { RECIPES_FRANCE_DESSERTS } from './recipesFranceDesserts';
import { RECIPES_FRANCE_DESSERTS_BATCH2 } from './recipesFranceDessertsBatch2';
import { RECIPES_FRANCE_MEGA_COLLECTION } from './recipesFranceMegaCollection';
import { RECIPES_FRANCE_CATALOG_ADDITIONAL } from './recipesFranceCatalogAdditional';
import { RECIPES_FRANCE_EXTRA_80 } from './recipesFranceExtra80';
import { RECIPES_FRANCE_EXPANSION_PACK } from './recipesFranceExpansionPack';
import { RECIPES_FRANCE_TERROIR_BATCH50 } from './recipesFranceTerroirBatch50';
import { RECIPES_FRANCE_GENERATED_REGIONAL } from './recipesFranceMegaGenerator200';
import { RECIPES_FRANCE_FINAL_COMPLETION } from './recipesFranceFinalCatalogue';
import { RECIPES_FRANCE_TERROIR_ALL_REGIONS } from './recipesFranceTerroirAllRegions';
import { RECIPES_FRANCE_200_COMPLETER } from './recipesFrance200Completer';
import { RECIPES_FRANCE_GRAND_TOUR } from './recipesFranceGrandTour';

// Combine all French recipe files
const ALL_FRENCH_RAW_COLLECTION: Recipe[] = [
  ...RECIPES_FRANCE_STARTERS,
  ...RECIPES_FRANCE_STARTERS_PART2,
  ...RECIPES_FRANCE_STARTERS_BATCH3,
  ...RECIPES_FRANCE_MAINS_MEAT,
  ...RECIPES_FRANCE_MAINS_MEAT_BATCH2,
  ...RECIPES_FRANCE_MAINS_SEAFOOD,
  ...RECIPES_FRANCE_MAINS_REGIONAL,
  ...RECIPES_FRANCE_DESSERTS,
  ...RECIPES_FRANCE_DESSERTS_BATCH2,
  ...RECIPES_FRANCE_MEGA_COLLECTION,
  ...RECIPES_FRANCE_CATALOG_ADDITIONAL,
  ...RECIPES_FRANCE_EXTRA_80,
  ...RECIPES_FRANCE_EXPANSION_PACK,
  ...RECIPES_FRANCE_TERROIR_BATCH50,
  ...RECIPES_FRANCE_GENERATED_REGIONAL,
  ...RECIPES_FRANCE_FINAL_COMPLETION,
  ...RECIPES_FRANCE_TERROIR_ALL_REGIONS,
  ...RECIPES_FRANCE_200_COMPLETER,
  ...RECIPES_FRANCE_GRAND_TOUR
];

// Deduplicate IDs cleanly
const recipeIdSet = new Set<string>();
export const RECIPES_FRANCE: Recipe[] = [];

for (const recipe of ALL_FRENCH_RAW_COLLECTION) {
  if (!recipeIdSet.has(recipe.id)) {
    recipeIdSet.add(recipe.id);
    RECIPES_FRANCE.push(recipe);
  }
}
