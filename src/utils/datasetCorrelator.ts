/**
 * Dataset Correlator & Semantic Mapping Utility
 * Bridges millions of combinations from external datasets (TheMealDB, RecipeNGL, food.com)
 * into unified local ingredients data.
 */

const DICTIONARY_MAP: Record<string, string> = {
  // Meats & Poultry
  'chicken': 'ing-poulet',
  'chicken breast': 'ing-poulet',
  'chicken breasts': 'ing-poulet',
  'boneless chicken': 'ing-poulet',
  'chicken thighs': 'ing-poulet',
  'ground beef': 'ing-boeuf',
  'beef': 'ing-boeuf',
  'beef steak': 'ing-boeuf',
  'steak': 'ing-boeuf',
  'pork': 'ing-porc',
  'pork chops': 'ing-porc',
  'bacon': 'ing-porc',
  'lamb': 'ing-agneau',

  // Seafood
  'salmon': 'ing-saumon',
  'salmon fillets': 'ing-saumon',
  'cod': 'ing-cabillaud',
  'shrimp': 'ing-crevette',
  'shrimps': 'ing-crevette',
  'prawns': 'ing-crevette',

  // Produce
  'onion': 'ing-onion',
  'onions': 'ing-onion',
  'yellow onion': 'ing-onion',
  'red onion': 'ing-red-onion',
  'shallot': 'ing-shallot',
  'shallots': 'ing-shallot',
  'garlic': 'ing-garlic',
  'garlic clove': 'ing-garlic',
  'garlic cloves': 'ing-garlic',
  'leek': 'ing-leek',
  'leeks': 'ing-leek',
  'tomato': 'ing-tomate',
  'tomatoes': 'ing-tomate',
  'cherry tomatoes': 'ing-cherry-tomatoes',
  'potato': 'ing-potato',
  'potatoes': 'ing-potato',
  'carrot': 'ing-carrot',
  'carrots': 'ing-carrot',
  'celery': 'ing-celery',
  'zucchini': 'ing-zucchini',
  'courgette': 'ing-zucchini',

  // Pantry & Dairy
  'olive oil': 'ing-huile-olive',
  'extra virgin olive oil': 'ing-huile-olive',
  'butter': 'ing-beurre',
  'milk': 'ing-lait',
  'yogurt': 'ing-yaourt',
  'cream': 'ing-creme',
  'heavy cream': 'ing-creme',
  'cheese': 'ing-fromage',
  'cheddar': 'ing-fromage',
  'parmesan': 'ing-fromage',
  'rice': 'ing-riz',
  'pasta': 'ing-pates',
  'bread': 'ing-pain',
  'salt': 'ing-sel',
  'pepper': 'ing-poivre',
};

/**
 * Normalizes an external raw ingredient name to match a known system ID.
 */
export function normalizeExternalIngredient(rawName: string): { ingredientId: string; cleanName: string } {
  const clean = rawName.toLowerCase().trim();

  // 1. Direct exact or substring match in our dictionary
  for (const [key, id] of Object.entries(DICTIONARY_MAP)) {
    if (clean === key || clean.includes(key)) {
      return { ingredientId: id, cleanName: rawName };
    }
  }

  // 2. Fallback dynamic ID generator to ensure no recipe breakdown
  const fallbackId = `ing-${clean.replace(/[^a-z0-9]/g, '-')}`;
  return { ingredientId: fallbackId, cleanName: rawName };
}
