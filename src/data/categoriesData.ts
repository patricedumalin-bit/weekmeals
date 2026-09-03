import { IngredientCategory, RecipeCategory } from '../types';

export const INITIAL_INGREDIENT_CATEGORIES: IngredientCategory[] = [
  { id: 'cat-legumes', name: 'Légumes', icon: 'Carrot', color: 'emerald', order: 1 },
  { id: 'cat-fruits', name: 'Fruits', icon: 'Apple', color: 'lime', order: 2 },
  { id: 'cat-cereales', name: 'Céréales', icon: 'Wheat', color: 'yellow', order: 3 },
  { id: 'cat-feculents', name: 'Féculents', icon: 'Utensils', color: 'amber', order: 4 },
  { id: 'cat-legumineuses', name: 'Légumineuses', icon: 'Leaf', color: 'green', order: 5 },
  { id: 'cat-viandes', name: 'Viandes', icon: 'Beef', color: 'rose', order: 6 },
  { id: 'cat-volailles', name: 'Volailles', icon: 'Drumstick', color: 'rose', order: 7 },
  { id: 'cat-poissons', name: 'Poissons', icon: 'Fish', color: 'sky', order: 8 },
  { id: 'cat-crustaces', name: 'Crustacés', icon: 'Shell', color: 'sky', order: 9 },
  { id: 'cat-fruits-de-mer', name: 'Fruits de mer', icon: 'Shell', color: 'sky', order: 10 },
  { id: 'cat-oeufs', name: 'Œufs', icon: 'Egg', color: 'amber', order: 11 },
  { id: 'cat-produits-laitiers', name: 'Produits laitiers', icon: 'Milk', color: 'amber', order: 12 },
  { id: 'cat-matieres-grasses', name: 'Matières grasses', icon: 'Droplets', color: 'lime', order: 13 },
  { id: 'cat-epices', name: 'Épices', icon: 'Flame', color: 'orange', order: 14 },
  { id: 'cat-herbes', name: 'Herbes aromatiques', icon: 'Leaf', color: 'emerald', order: 15 },
  { id: 'cat-condiments', name: 'Condiments', icon: 'Zap', color: 'purple', order: 16 },
  { id: 'cat-produits-sucres', name: 'Produits sucrés', icon: 'Candy', color: 'pink', order: 17 },
  { id: 'cat-patisserie', name: 'Pâtisserie', icon: 'Cookie', color: 'pink', order: 18 },
  { id: 'cat-aides-patisserie', name: 'Aides à la pâtisserie', icon: 'Cookie', color: 'pink', order: 19 },
  { id: 'cat-graines', name: 'Graines', icon: 'Sunflower', color: 'yellow', order: 20 },
  { id: 'cat-oleagineux', name: 'Oléagineux', icon: 'Nut', color: 'yellow', order: 21 },
  { id: 'cat-alternatives', name: 'Alternatives végétales', icon: 'Leaf', color: 'green', order: 22 },
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
