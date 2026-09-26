import { Ingredient } from '../types';

/**
 * Clean, Curated Ingredients Catalog corresponding to the 100 authentic recipes.
 */
export const INITIAL_INGREDIENTS: Ingredient[] = [
  // --- Légumes & Fruits ---
  { id: 'ing-oignon', name: 'Oignon', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Oignon', en: 'Onion' } },
  { id: 'ing-ail', name: 'Ail', categoryId: 'cat-legumes', defaultUnit: 'clove', localizations: { fr: 'Ail', en: 'Garlic' } },
  { id: 'ing-tomate', name: 'Tomate', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Tomate', en: 'Tomato' } },
  { id: 'ing-poivron', name: 'Poivron', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Poivron', en: 'Bell Pepper' } },
  { id: 'ing-courgette', name: 'Courgette', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Courgette', en: 'Zucchini' } },
  { id: 'ing-aubergine', name: 'Aubergine', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Aubergine', en: 'Eggplant' } },
  { id: 'ing-carotte', name: 'Carotte', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Carotte', en: 'Carrot' } },
  { id: 'ing-champignons', name: 'Champignons de Paris', categoryId: 'cat-legumes', defaultUnit: 'g', localizations: { fr: 'Champignons de Paris', en: 'Button Mushrooms' } },
  { id: 'ing-potato', name: 'Pommes de terre', categoryId: 'cat-legumes', defaultUnit: 'g', localizations: { fr: 'Pommes de terre', en: 'Potatoes' } },
  { id: 'ing-salade', name: 'Salade / Romaine', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Salade / Romaine', en: 'Lettuce / Romaine' } },
  { ingredientId: 'ing-concombre', id: 'ing-concombre', name: 'Concombre', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Concombre', en: 'Cucumber' } },
  { id: 'ing-avocat', name: 'Avocat', categoryId: 'cat-legumes', defaultUnit: 'unit', localizations: { fr: 'Avocat', en: 'Avocado' } },
  { id: 'ing-citron', name: 'Citron', categoryId: 'cat-fruits', defaultUnit: 'unit', localizations: { fr: 'Citron', en: 'Lemon' } },
  { id: 'ing-pomme', name: 'Pomme', categoryId: 'cat-fruits', defaultUnit: 'unit', localizations: { fr: 'Pomme', en: 'Apple' } },
  { id: 'ing-olive', name: 'Olives noires', categoryId: 'cat-epicerie', defaultUnit: 'g', localizations: { fr: 'Olives noires', en: 'Black Olives' } },

  // --- Viandes & Volailles ---
  { id: 'ing-poulet', name: 'Poulet', categoryId: 'cat-volailles', defaultUnit: 'g', localizations: { fr: 'Poulet', en: 'Chicken' } },
  { id: 'ing-boeuf', name: 'Bœuf haché / morceau', categoryId: 'cat-viandes', defaultUnit: 'g', localizations: { fr: 'Bœuf', en: 'Beef' } },
  { id: 'ing-lardons', name: 'Lardons fumés', categoryId: 'cat-viandes', defaultUnit: 'g', localizations: { fr: 'Lardons fumés', en: 'Bacon Lardons' } },

  // --- Poissons & Fruits de mer ---
  { id: 'ing-saumon', name: 'Pavé de Saumon', categoryId: 'cat-poissons', defaultUnit: 'g', localizations: { fr: 'Saumon', en: 'Salmon' } },
  { id: 'ing-poisson', name: 'Filet de Cabillaud / Poisson', categoryId: 'cat-poissons', defaultUnit: 'g', localizations: { fr: 'Cabillaud / Poisson', en: 'Cod / Fish Fillet' } },
  { id: 'ing-thon', name: 'Thon en boîte', categoryId: 'cat-poissons', defaultUnit: 'g', localizations: { fr: 'Thon', en: 'Canned Tuna' } },
  { id: 'ing-crevettes', name: 'Crevettes roses', categoryId: 'cat-poissons', defaultUnit: 'g', localizations: { fr: 'Crevettes', en: 'Shrimp' } },

  // --- Produits Laitiers & Œufs ---
  { id: 'ing-beurre', name: 'Beurre', categoryId: 'cat-frais', defaultUnit: 'g', localizations: { fr: 'Beurre', en: 'Butter' } },
  { id: 'ing-lait', name: 'Lait', categoryId: 'cat-frais', defaultUnit: 'ml', localizations: { fr: 'Lait', en: 'Milk' } },
  { id: 'ing-creme', name: 'Crème fraîche', categoryId: 'cat-frais', defaultUnit: 'ml', localizations: { fr: 'Crème fraîche', en: 'Heavy Cream' } },
  { id: 'ing-oeuf', name: 'Œuf', categoryId: 'cat-frais', defaultUnit: 'unit', localizations: { fr: 'Œuf', en: 'Egg' } },
  { id: 'ing-fromage', name: 'Mozzarella / Emmental / Fromage', categoryId: 'cat-frais', defaultUnit: 'g', localizations: { fr: 'Mozzarella / Fromage', en: 'Cheese' } },
  { id: 'ing-parmesan', name: 'Parmesan râpé', categoryId: 'cat-frais', defaultUnit: 'g', localizations: { fr: 'Parmesan', en: 'Parmesan Cheese' } },
  { id: 'ing-mascarpone', name: 'Mascarpone', categoryId: 'cat-frais', defaultUnit: 'g', localizations: { fr: 'Mascarpone', en: 'Mascarpone' } },

  // --- Épicerie & Céréales ---
  { ingredientId: 'ing-pates', id: 'ing-pates', name: 'Pâtes / Spaghetti / Lasagnes / Riz', categoryId: 'cat-cereales', defaultUnit: 'g', localizations: { fr: 'Pâtes / Riz', en: 'Pasta / Rice' } },
  { id: 'ing-farine', name: 'Farine / Pâte', categoryId: 'cat-epicerie', defaultUnit: 'pack', localizations: { fr: 'Farine', en: 'Flour / Dough' } },
  { id: 'ing-pain', name: 'Baguette / Pain / Bun', categoryId: 'cat-boulangerie', defaultUnit: 'unit', localizations: { fr: 'Pain', en: 'Bread' } },
  { id: 'ing-huile-olive', name: 'Huile d\'olive', categoryId: 'cat-epicerie', defaultUnit: 'tbsp', localizations: { fr: 'Huile d\'olive', en: 'Olive Oil' } },
  { id: 'ing-bouillon', name: 'Bouillon de bœuf / volaille', categoryId: 'cat-epicerie', defaultUnit: 'l', localizations: { fr: 'Bouillon', en: 'Broth' } },
  { id: 'ing-chocolat', name: 'Chocolat noir pâtissier', categoryId: 'cat-epicerie', defaultUnit: 'g', localizations: { fr: 'Chocolat noir', en: 'Dark Chocolate' } },
  { id: 'ing-sucre', name: 'Sucre', categoryId: 'cat-epicerie', defaultUnit: 'g', localizations: { fr: 'Sucre', en: 'Sugar' } },
  { id: 'ing-cafe', name: 'Café fort espresso', categoryId: 'cat-boissons', defaultUnit: 'ml', localizations: { fr: 'Café', en: 'Coffee' } },
  { id: 'ing-sel', name: 'Sel', categoryId: 'cat-epicerie', defaultUnit: 'pinch', localizations: { fr: 'Sel', en: 'Salt' } },
  { id: 'ing-poivre', name: 'Poivre', categoryId: 'cat-epicerie', defaultUnit: 'pinch', localizations: { fr: 'Poivre', en: 'Pepper' } }
];
