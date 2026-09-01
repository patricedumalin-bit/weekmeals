import { IngredientCategory, RecipeCategory } from '../types';

export const INITIAL_INGREDIENT_CATEGORIES: IngredientCategory[] = [
  { id: 'cat-produce', name: 'Fresh Produce', icon: 'Apple', color: 'emerald', order: 1 },
  { id: 'cat-meat', name: 'Meat & Seafood', icon: 'Fish', color: 'rose', order: 2 },
  { id: 'cat-dairy', name: 'Dairy & Eggs', icon: 'Milk', color: 'amber', order: 3 },
  { id: 'cat-bakery', name: 'Bakery & Bread', icon: 'Croissant', color: 'orange', order: 4 },
  { id: 'cat-pantry', name: 'Pantry & Spices', icon: 'Sparkles', color: 'purple', order: 5 },
  { id: 'cat-grains', name: 'Pasta, Rice & Grains', icon: 'Wheat', color: 'yellow', order: 6 },
  { id: 'cat-canned', name: 'Canned & Jarred', icon: 'Archive', color: 'sky', order: 7 },
  { id: 'cat-oils', name: 'Oils, Vinegars & Sauces', icon: 'Droplets', color: 'lime', order: 8 },
  { id: 'cat-frozen', name: 'Frozen Foods', icon: 'Snowflake', color: 'cyan', order: 9 },
  { id: 'cat-baking', name: 'Baking & Sweets', icon: 'Cookie', color: 'pink', order: 10 },
];

export const INITIAL_RECIPE_CATEGORIES: RecipeCategory[] = [
  { id: 'rcat-entree', name: 'Entrée', icon: 'Soup', description: 'Entrées, soupes, salades et mises en bouche' },
  { id: 'rcat-viande', name: 'Viande', icon: 'Beef', description: 'Bœuf, porc, agneau et plats de viande' },
  { id: 'rcat-volaille', name: 'Volaille', icon: 'Drumstick', description: 'Poulet, dinde, canard et volailles' },
  { id: 'rcat-poisson', name: 'Poisson', icon: 'Fish', description: 'Poissons frais et fruits de mer' },
  { id: 'rcat-legume', name: 'Légume', icon: 'Carrot', description: 'Légumes de saison, gratins et poêlées' },
  { id: 'rcat-pates', name: 'Pâtes & Riz', icon: 'Wheat', description: 'Pâtes, risottos, paellas et céréales' },
  { id: 'rcat-dessert', name: 'Dessert', icon: 'Cake', description: 'Pâtisseries, entremets, tartes et douceurs' },
  { id: 'rcat-autre', name: 'Autre / Rapide', icon: 'Zap', description: 'Plats rapides, snacks et divers' },
];
