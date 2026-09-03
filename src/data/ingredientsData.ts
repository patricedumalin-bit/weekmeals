import { Ingredient } from '../types';

export const INITIAL_INGREDIENTS: Ingredient[] = [
  // --- Légumes ---
  { id: 'ing-carotte', name: 'Carotte', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-navet', name: 'Navet', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-betterave', name: 'Betterave', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-celeri-rave', name: 'Céleri-rave', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-epinard', name: 'Épinard', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-chou-vert', name: 'Chou vert', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-artichaut', name: 'Artichaut', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-brocoli', name: 'Brocoli', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-chou-fleur', name: 'Chou-fleur', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-tomate', name: 'Tomate', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-poivron', name: 'Poivron', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-aubergine', name: 'Aubergine', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-courgette', name: 'Courgette', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-concombre', name: 'Concombre', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-potiron', name: 'Potiron', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-butternut', name: 'Courge butternut', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-asperge', name: 'Asperge', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-poireau', name: 'Poireau', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-champignon-paris', name: 'Champignon de Paris', categoryId: 'cat-legumes', defaultUnit: 'unit' },
  { id: 'ing-shiitake', name: 'Shiitaké', categoryId: 'cat-legumes', defaultUnit: 'unit' },

  // --- Fruits ---
  { id: 'ing-pomme', name: 'Pomme', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-poire', name: 'Poire', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-peche', name: 'Pêche', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-abricot', name: 'Abricot', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-prune', name: 'Prune', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-cerise', name: 'Cerise', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-avocat', name: 'Avocat', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-citron', name: 'Citron', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-orange', name: 'Orange', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-fraise', name: 'Fraise', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-banane', name: 'Banane', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-melon', name: 'Melon', categoryId: 'cat-fruits', defaultUnit: 'unit' },
  { id: 'ing-pasteque', name: 'Pastèque', categoryId: 'cat-fruits', defaultUnit: 'unit' },

  // --- Céréales ---
  { id: 'ing-riz', name: 'Riz', categoryId: 'cat-cereales', defaultUnit: 'unit' },
  { id: 'ing-pates', name: 'Pâtes', categoryId: 'cat-cereales', defaultUnit: 'unit' },
  { id: 'ing-pain', name: 'Pain', categoryId: 'cat-cereales', defaultUnit: 'unit' },

  // --- Viandes ---
  { id: 'ing-poulet', name: 'Poulet', categoryId: 'cat-viandes', defaultUnit: 'unit' },
  { id: 'ing-boeuf', name: 'Bœuf', categoryId: 'cat-viandes', defaultUnit: 'unit' },
  { id: 'ing-porc', name: 'Porc', categoryId: 'cat-viandes', defaultUnit: 'unit' },
  { id: 'ing-agneau', name: 'Agneau', categoryId: 'cat-viandes', defaultUnit: 'unit' },

  // --- Poissons et Crustacés ---
  { id: 'ing-saumon', name: 'Saumon', categoryId: 'cat-poissons', defaultUnit: 'unit' },
  { id: 'ing-cabillaud', name: 'Cabillaud', categoryId: 'cat-poissons', defaultUnit: 'unit' },
  { id: 'ing-crevette', name: 'Crevette', categoryId: 'cat-crustaces', defaultUnit: 'unit' },

  // --- Produits laitiers ---
  { id: 'ing-lait', name: 'Lait', categoryId: 'cat-produits-laitiers', defaultUnit: 'unit' },
  { id: 'ing-yaourt', name: 'Yaourt', categoryId: 'cat-produits-laitiers', defaultUnit: 'unit' },
  { id: 'ing-fromage', name: 'Fromage', categoryId: 'cat-produits-laitiers', defaultUnit: 'unit' },
  { id: 'ing-beurre', name: 'Beurre', categoryId: 'cat-produits-laitiers', defaultUnit: 'unit' },
  { id: 'ing-creme', name: 'Crème', categoryId: 'cat-produits-laitiers', defaultUnit: 'unit' },

  // --- Matières grasses ---
  { id: 'ing-huile-olive', name: 'Huile d\'olive', categoryId: 'cat-matieres-grasses', defaultUnit: 'unit' },

  // --- Épices et condiments ---
  { id: 'ing-sel', name: 'Sel', categoryId: 'cat-epices', defaultUnit: 'unit' },
  { id: 'ing-poivre', name: 'Poivre', categoryId: 'cat-epices', defaultUnit: 'unit' },
];
