import { Ingredient } from '../types';

export const INITIAL_INGREDIENTS: Ingredient[] = [
  // --- Produce / Fruits & Légumes ---
  { id: 'ing-carotte', name: 'Carotte', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-navet', name: 'Navet', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-betterave', name: 'Betterave', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-celeri-rave', name: 'Céleri-rave', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-epinard', name: 'Épinard', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-chou-vert', name: 'Chou vert', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-artichaut', name: 'Artichaut', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-brocoli', name: 'Brocoli', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-chou-fleur', name: 'Chou-fleur', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-tomate', name: 'Tomate', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-poivron', name: 'Poivron', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-aubergine', name: 'Aubergine', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-courgette', name: 'Courgette', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-concombre', name: 'Concombre', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-potiron', name: 'Potiron', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-butternut', name: 'Courge butternut', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-asperge', name: 'Asperge', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-poireau', name: 'Poireau', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-champignon-paris', name: 'Champignon de Paris', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-shiitake', name: 'Shiitaké', categoryId: 'cat-produce', defaultUnit: 'unit' },

  { id: 'ing-pomme', name: 'Pomme', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-poire', name: 'Poire', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-peche', name: 'Pêche', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-abricot', name: 'Abricot', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-prune', name: 'Prune', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-cerise', name: 'Cerise', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-avocat', name: 'Avocat', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-citron', name: 'Citron', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-orange', name: 'Orange', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-fraise', name: 'Fraise', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-banane', name: 'Banane', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-melon', name: 'Melon', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-pasteque', name: 'Pastèque', categoryId: 'cat-produce', defaultUnit: 'unit' },

  // --- Grains / Céréales ---
  { id: 'ing-riz', name: 'Riz', categoryId: 'cat-grains', defaultUnit: 'unit' },
  { id: 'ing-pates', name: 'Pâtes', categoryId: 'cat-grains', defaultUnit: 'unit' },
  { id: 'ing-pain', name: 'Pain', categoryId: 'cat-grains', defaultUnit: 'unit' },

  // --- Meat / Viandes ---
  { id: 'ing-poulet', name: 'Poulet', categoryId: 'cat-meat', defaultUnit: 'unit' },
  { id: 'ing-boeuf', name: 'Bœuf', categoryId: 'cat-meat', defaultUnit: 'unit' },
  { id: 'ing-porc', name: 'Porc', categoryId: 'cat-meat', defaultUnit: 'unit' },
  { id: 'ing-agneau', name: 'Agneau', categoryId: 'cat-meat', defaultUnit: 'unit' },

  // --- Seafood / Poissons ---
  { id: 'ing-saumon', name: 'Saumon', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-cabillaud', name: 'Cabillaud', categoryId: 'cat-produce', defaultUnit: 'unit' },
  { id: 'ing-crevette', name: 'Crevette', categoryId: 'cat-produce', defaultUnit: 'unit' },

  // --- Dairy / Produits laitiers ---
  { id: 'ing-lait', name: 'Lait', categoryId: 'cat-dairy', defaultUnit: 'unit' },
  { id: 'ing-yaourt', name: 'Yaourt', categoryId: 'cat-dairy', defaultUnit: 'unit' },
  { id: 'ing-fromage', name: 'Fromage', categoryId: 'cat-dairy', defaultUnit: 'unit' },
  { id: 'ing-beurre', name: 'Beurre', categoryId: 'cat-dairy', defaultUnit: 'unit' },
  { id: 'ing-creme', name: 'Crème', categoryId: 'cat-dairy', defaultUnit: 'unit' },

  // --- Oils / Matières grasses ---
  { id: 'ing-huile-olive', name: 'Huile d\'olive', categoryId: 'cat-oils', defaultUnit: 'unit' },

  // --- Pantry / Épices ---
  { id: 'ing-sel', name: 'Sel', categoryId: 'cat-pantry', defaultUnit: 'unit' },
  { id: 'ing-poivre', name: 'Poivre', categoryId: 'cat-pantry', defaultUnit: 'unit' },
];
