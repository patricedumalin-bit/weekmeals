import { Recipe } from '../../types';

export const RECIPES_FRANCE_FINAL_COMPLETION: Recipe[] = [
  {
    id: 'rec-fr-bavette-echalotes-vin-rouge',
    title: 'Bavette d’Aloyau Poêlée à la Fondue d’Échalotes au Vin Rouge',
    categoryId: 'rcat-poultry',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Bavette de bœuf saisie saignante, nappée d’une compotée d’échalotes déglacées au vin rouge et beurre froid.',
    instructions: [
      'Faites suer 4 échalotes émincées dans 20 g de beurre pendant 10 minutes.',
      'Mouillez avec 100 ml de vin rouge et laissez réduire presque à sec.',
      'Montez la sauce avec 20 g de beurre froid hors du feu.',
      'Saisissez les bavettes dans une poêle très chaude avec du beurre 2 min par face.',
      'Nappez la viande de la fondue d’échalotes au vin rouge et servez avec des frites maison.'
    ],
    ingredients: [
      { ingredientId: 'ing-beef-chuck', quantity: 360, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-red-wine', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bistrot', 'Bœuf', 'Plat', 'Classique']
  },
  {
    id: 'rec-fr-pave-saumon-sauce-oseille',
    title: 'Pavé de Saumon Frais à la Crème et Sauce à l’Oseille',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    difficulty: 'easy',
    description: 'La recette mythique des Frères Troisgros : pavés de saumon juste saisis nappés d’une crème acidulée à l’oseille fraîche fondu.',
    instructions: [
      'Lavez et équeutez les feuilles d’oseille.',
      'Faites réduire le vin blanc et l’échalote ciselée dans une casserole.',
      'Ajoutez la crème fraîche épaisse et laissez frémir 3 minutes.',
      'Jetez les feuilles d’oseille dans la crème hors du feu (elles fondent instantanément).',
      'Poêlez les pavés de saumon 3 minutes de chaque côté.',
      'Nappez le fond des assiettes chaudes de sauce oseille et déposez le saumon dessus.'
    ],
    ingredients: [
      { ingredientId: 'ing-salmon-fillet', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 200, unit: 'ml' },
      { ingredientId: 'ing-white-wine', quantity: 60, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Roanne', 'Troisgros', 'Gastronomie', 'Poisson']
  },
  {
    id: 'rec-fr-clafoutis-abricots-romarin',
    title: 'Clafoutis Moelleux aux Abricots Rôtis et Romarin du Sud',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Appareil crémeux et moelleux garni d’oreillons d’abricots caramélisés au miel et pointe de romarin.',
    instructions: [
      'Coupez les abricots en deux et disposez-les face bombée vers le haut dans un plat beurré.',
      'Fouettez les œufs avec le sucre, la poudre d’amandes, la farine et le lait.',
      'Versez la pâte sur les fruits.',
      'Parsemez de brins de romarin.',
      'Enfournez à 180°C pendant 35 minutes.',
      'Dégustez tiède saupoudré de sucre glace.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 250, unit: 'ml' },
      { ingredientId: 'ing-almond-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-rosemary', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-butter', quantity: 20, unit: 'g' }
    ],
    tags: ['French', 'France', 'Provence', 'Dessert', 'Clafoutis', 'Fruits']
  },
  {
    id: 'rec-fr-gateau-crepes-chocolat-noisettes',
    title: 'Gâteau de Crêpes au Chocolat Noir et Praliné Noisettes',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 40,
    cookTimeMinutes: 20,
    difficulty: 'medium',
    description: 'Superposition gourmande de 20 crêpes légères au beurre avec une ganache fondante au chocolat noir et éclats de noisettes.',
    instructions: [
      'Réalisez 20 crêpes fines au froment et laissez-les refroidir.',
      'Préparez une ganache au chocolat noir et crème liquide.',
      'Montez le gâteau en alternant une crêpe, une fine couche de chocolat et un voile de praliné.',
      'Recouvrez le sommet de chocolat brillant et laissez prendre 2h au frais avant de découper comme un gâteau.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-dark-chocolate', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-heavy-cream', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 50, unit: 'g' }
    ],
    tags: ['French', 'France', 'Dessert', 'Crêpe', 'Chocolat', 'Fêtes']
  },
  {
    id: 'rec-fr-sable-breton-fraises-chantilly',
    title: 'Sablé Breton Croustillant aux Fraises Gariguette et Chantilly Vanille',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Épais sablé breton pur beurre demi-sel garni d’une crème chantilly mascarpone et de belles fraises fraîches parfumées.',
    instructions: [
      'Préparez la pâte à sablé breton : battez les jaunes avec le sucre, ajoutez le beurre demi-sel pommade et la farine levurée.',
      'Étalez dans un cercle à pâtisserie et cuisez 20 minutes à 170°C. Laissez refroidir.',
      'Montez la crème liquide et le mascarpone en chantilly ferme avec le sucre vanillé.',
      'Pochez la chantilly sur le sablé froid.',
      'Disposez harmonieusement les fraises Gariguette coupées en deux et décorez de feuilles de menthe.'
    ],
    ingredients: [
      { ingredientId: 'ing-strawberries', quantity: 350, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 140, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 90, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-heavy-cream', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-vanilla-bean', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-mint', quantity: 0.25, unit: 'bunch' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Dessert', 'Pâtisserie', 'Printemps']
  }
];
