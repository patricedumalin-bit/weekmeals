import { IngredientCategory, RecipeCategory } from '../types';

export const INITIAL_INGREDIENT_CATEGORIES: IngredientCategory[] = [
  { id: 'cat-produce', name: 'Fruits & Légumes', icon: 'Carrot', color: 'emerald', order: 1 },
  { id: 'cat-grains', name: 'Céréales & Épicerie', icon: 'Wheat', color: 'yellow', order: 2 },
  { id: 'cat-meat', name: 'Viandes & Volailles', icon: 'Beef', color: 'rose', order: 3 },
  { id: 'cat-dairy', name: 'Produits laitiers & Œufs', icon: 'Milk', color: 'amber', order: 4 },
  { id: 'cat-oils', name: 'Huiles & Matières grasses', icon: 'Droplets', color: 'lime', order: 5 },
  { id: 'cat-pantry', name: 'Condiments & Épices', icon: 'Flame', color: 'orange', order: 6 }
];

export const INITIAL_RECIPE_CATEGORIES: RecipeCategory[] = [
  { id: 'rcat-entree', name: 'Entrée', icon: 'Soup', description: 'Entrées, soupes, salades et mises en bouche' },
  { id: 'rcat-viande', name: 'Viande', icon: 'Beef', description: 'Bœuf, porc, agneau et plats de viande' },
  { id: 'rcat-volaille', name: 'Volaille', icon: 'Drumstick', description: 'Poulet, dinde, canard et volailles' },
  { id: 'rcat-poisson', name: 'Poisson', icon: 'Fish', description: 'Poissons frais et fruits de mer' },
  { id: 'rcat-legume', name: 'Légume', icon: 'Carrot', description: 'Légumes de saison, gratins et poêlées' },
  { id: 'rcat-pates', name: 'Pâtes & Rice', icon: 'Wheat', description: 'Pâtes, risottos, paellas et céréales' },
  { id: 'rcat-dessert', name: 'Dessert', icon: 'Cake', description: 'Pâtisseries, entremets, tartes et douceurs' },
  { id: 'rcat-autre', name: 'Autre / Rapide', icon: 'Zap', description: 'Plats rapides, snacks et divers' },
];
