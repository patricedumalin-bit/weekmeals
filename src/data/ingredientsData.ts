import { Ingredient, Recipe } from '../types';

// Local list of pre-translated core ingredients names for fallback display
const CORE_NAMES: Record<string, string> = {
  'ing-carrot': 'Carotte',
  'ing-navet': 'Navet',
  'ing-betterave': 'Betterave',
  'ing-celeri-rave': 'Céleri-rave',
  'ing-epinard': 'Épinard',
  'ing-chou-vert': 'Chou vert',
  'ing-artichaut': 'Artichaut',
  'ing-brocoli': 'Brocoli',
  'ing-chou-fleur': 'Chou-fleur',
  'ing-tomato': 'Tomate',
  'ing-poivron': 'Poivron',
  'ing-aubergine': 'Aubergine',
  'ing-zucchini': 'Courgette',
  'ing-concombre': 'Concombre',
  'ing-potiron': 'Potiron',
  'ing-butternut': 'Courge butternut',
  'ing-asperge': 'Asperge',
  'ing-leek': 'Poireau',
  'ing-onion': 'Oignon',
  'ing-shiitake': 'Shiitaké',
  'ing-pomme': 'Pomme',
  'ing-poire': 'Poire',
  'ing-peche': 'Pêche',
  'ing-abricot': 'Abricot',
  'ing-prune': 'Prune',
  'ing-cerise': 'Cerise',
  'ing-avocat': 'Avocat',
  'ing-citron': 'Citron',
  'ing-orange': 'Orange',
  'ing-fraise': 'Fraise',
  'ing-banane': 'Banane',
  'ing-melon': 'Melon',
  'ing-pasteque': 'Pastèque',
  'ing-potato': 'Pomme de terre',
  'ing-riz': 'Riz',
  'ing-pates': 'Pâtes',
  'ing-pain': 'Pain',
  'ing-poulet': 'Poulet',
  'ing-boeuf': 'Bœuf',
  'ing-porc': 'Porc',
  'ing-agneau': 'Agneau',
  'ing-saumon': 'Saumon',
  'ing-cabillaud': 'Cabillaud',
  'ing-crevette': 'Crevette',
  'ing-lait': 'Lait',
  'ing-yaourt': 'Yaourt',
  'ing-fromage': 'Fromage',
  'ing-beurre': 'Beurre',
  'ing-creme': 'Crème',
  'ing-huile-olive': 'Huile d\'olive',
  'ing-sel': 'Sel',
  'ing-poivre': 'Poivre',
  'ing-garlic': 'Ail'
};

/**
 * Dynamically builds a list of unique ingredients from a collection of recipes.
 */
export function buildDynamicIngredientsList(allRecipes: Recipe[]): Ingredient[] {
  const ingredientMap = new Map<string, Ingredient>();

  for (const recipe of allRecipes) {
    if (!recipe || !recipe.ingredients || !Array.isArray(recipe.ingredients)) continue;

    for (const recipeIng of recipe.ingredients) {
      if (!recipeIng) continue;
      const id = recipeIng.ingredientId;
      if (!id || ingredientMap.has(id)) continue;

      let displayName = CORE_NAMES[id];
      if (!displayName) {
        const cleanSlug = id.replace('ing-', '').replace(/-/g, ' ');
        displayName = cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1);
      }

      let categoryId = 'cat-pantry';
      const idL = id.toLowerCase();
      if (idL.includes('chicken') || idL.includes('poulet') || idL.includes('beef') || idL.includes('boeuf') || idL.includes('meat') || idL.includes('porc') || idL.includes('lamb') || idL.includes('agneau')) {
        categoryId = 'cat-meat';
      } else if (idL.includes('milk') || idL.includes('lait') || idL.includes('cheese') || idL.includes('fromage') || idL.includes('butter') || idL.includes('beurre') || idL.includes('cream') || idL.includes('creme') || idL.includes('dairy') || idL.includes('egg') || idL.includes('yaourt')) {
        categoryId = 'cat-dairy';
      } else if (idL.includes('oil') || idL.includes('huile')) {
        categoryId = 'cat-oils';
      } else if (idL.includes('pasta') || idL.includes('pates') || idL.includes('rice') || idL.includes('riz') || idL.includes('bread') || idL.includes('pain') || idL.includes('grains')) {
        categoryId = 'cat-grains';
      } else if (idL.includes('tomato') || idL.includes('onion') || idL.includes('potato') || idL.includes('garlic') || idL.includes('carrot') || idL.includes('zucchini') || idL.includes('leek') || idL.includes('produce') || idL.includes('legume') || idL.includes('fruit') || idL.includes('saumon') || idL.includes('cabillaud') || idL.includes('crevette')) {
        categoryId = 'cat-produce';
      }

      ingredientMap.set(id, {
        id,
        name: displayName,
        categoryId,
        defaultUnit: recipeIng.unit || 'unit'
      });
    }
  }

  return Array.from(ingredientMap.values());
}
