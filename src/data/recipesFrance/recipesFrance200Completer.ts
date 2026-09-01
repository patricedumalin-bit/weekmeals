import { Recipe } from '../../types';

export const RECIPES_FRANCE_200_COMPLETER: Recipe[] = [
  {
    id: 'rec-fr-magret-seche-maison-herbes',
    title: 'Magret de Canard Séché Maison au Gros Sel et Herbes de Provence',
    categoryId: 'rcat-starters',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Charcuterie artisanale du Sud-Ouest : magret cru enfoui dans le gros sel de Guérande, puis enrobé de poivre concassé et séché au frais 3 semaines.',
    instructions: [
      'Dans un plat, versez un lit de gros sel et déposez le magret.',
      'Recouvrez entièrement de gros sel et placez au réfrigérateur pendant 18 heures.',
      'Sortez le magret, rincez-le rapidement à l’eau froide et séchez-le parfaitement au torchon propre.',
      'Massez le magret avec le poivre concassé, le thym et le piment d’Espelette.',
      'Enveloppez dans un torchon propre et laissez sécher dans le bas du réfrigérateur pendant 3 semaines.',
      'Dégustez tranché très finement à l’apéritif.'
    ],
    ingredients: [
      { ingredientId: 'ing-duck-breast', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-black-pepper', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-thyme', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Sud-Ouest', 'Charcuterie', 'Apéritif', 'Fait maison']
  },
  {
    id: 'rec-fr-terrine-foie-gras-mi-cuit-armagnac',
    title: 'Terrine de Foie Gras de Canard Mi-Cuit Traditionnel à l’Armagnac',
    categoryId: 'rcat-starters',
    servings: 8,
    prepTimeMinutes: 25,
    cookTimeMinutes: 35,
    difficulty: 'hard',
    description: 'Le sommet festif du Sud-Ouest : lobe de foie gras éveiné, mariné à l’Armagnac et quatre-épices, cuit doucement au bain-marie en terrine.',
    instructions: [
      'Déveinez soigneusement le lobe de foie gras à température ambiante.',
      'Assaisonnez avec 7g de sel, 2g de poivre moulu, une pincée de quatre-épices et 2 cuillères d’Armagnac.',
      'Tassez le foie dans une terrine en porcelaine.',
      'Faites cuire au bain-marie dans un four préchauffé à 120°C pendant 35 minutes (température à cœur : 52°C).',
      'Laissez refroidir, posez une planchette avec un poids pour faire remonter le gras, puis placez 48h au réfrigérateur avant dégustation.'
    ],
    ingredients: [
      { ingredientId: 'ing-cognac', quantity: 30, unit: 'ml' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Sud-Ouest', 'Fêtes', 'Gastronomie', 'Entrée']
  },
  {
    id: 'rec-fr-croquettes-camembert-panure-noisettes',
    title: 'Croquettes Croustillantes de Camembert à la Panure de Noisettes',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 8,
    difficulty: 'easy',
    description: 'Portions de camembert de Normandie panées deux fois dans une chapelure dorée aux noisettes concassées et frites bien coulantes.',
    instructions: [
      'Coupez le camembert bien froid en 8 portions.',
      'Passez chaque morceau dans la farine, puis dans l’œuf battu, et enfin dans le mélange chapelure-noisettes en poudre.',
      'Répétez l’opération œuf + chapelure pour une panure bien hermétique.',
      'Faites frire 2 minutes dans l’huile bien chaude jusqu’à ce que la croûte soit bien dorée sans que le fromage ne fuie.',
      'Égouttez et servez immédiatement avec une confiture d’airelles ou salade verte.'
    ],
    ingredients: [
      { ingredientId: 'ing-camembert', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-breadcrumbs', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-olive-oil', quantity: 50, unit: 'ml' }
    ],
    tags: ['French', 'France', 'Normandie', 'Entrée', 'Fromage', 'Apéritif']
  },
  {
    id: 'rec-fr-moules-frites-sauce-mariniere',
    title: 'Moules-Frites Traditionnelles du Nord à la Sauce Marinière',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Le plat populaire des brasseries du Nord : grande cocotte de moules de bouchot ouvertes au vin blanc sec, échalotes et persil, servies avec frites.',
    instructions: [
      'Nettoyez et ébarbez les moules sous l’eau fraîche.',
      'Dans un grand faitout, faites fondre les échalotes émincées dans le beurre.',
      'Versez le vin blanc sec et portez à ébullition.',
      'Jetez les moules dans le faitout, couvrez et faites cuire 5 à 7 minutes à feu très vif en secouant la cocotte 2 fois.',
      'Dès que toutes les moules sont ouvertes, ajoutez le persil plat ciselé et poivrez.',
      'Servez brûlant dans les cocottes avec un cornet de frites fraîches bien croustillantes.'
    ],
    ingredients: [
      { ingredientId: 'ing-mussels', quantity: 2000, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 250, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-potato', quantity: 800, unit: 'g' }
    ],
    tags: ['French', 'France', 'Nord', 'Brasserie', 'Plat', 'Fruits de mer', 'Classique']
  },
  {
    id: 'rec-fr-parmentier-confit-canard-patates-douces',
    title: 'Hachis Parmentier de Canard Confit à l’Écrasée Gourmande',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Effiloché de cuisses de canard confites revenues aux échalotes et persil, surmonté d’une purée maison au beurre et gratiné au comté.',
    instructions: [
      'Faites cuire les pommes de terre à l’eau bouillante salée 25 minutes puis écrasez-les avec du beurre et un filet de lait.',
      'Effilochez la chair des cuisses de canard confites.',
      'Faites revenir l’effiloché de canard dans une poêle avec les échalotes ciselées et le persil haché.',
      'Dans un plat à gratin, déposez la couche de canard au fond.',
      'Recouvrez avec la purée de pommes de terre.',
      'Saupoudrez de chapelure et de comté râpé.',
      'Faites gratiner au four à 200°C pendant 25 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-duck-leg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-gruyere', quantity: 80, unit: 'g' }
    ],
    tags: ['French', 'France', 'Sud-Ouest', 'Plat', 'Canard', 'Gratin', 'Famille']
  },
  {
    id: 'rec-fr-oeufs-brouilles-truffe-noire',
    title: 'Œufs Brouillés Onctueux à la Truffe Noire et Beurre Fermier',
    categoryId: 'rcat-starters',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    difficulty: 'medium',
    description: 'Œufs frais battus cuits à feu très doux au bain-marie avec du beurre fermier jusqu’à texture veloutée et crémeuse, sublimés d’éclats de truffe.',
    instructions: [
      'Battez 6 œufs avec du sel fin dans un cul-de-poule posé sur un bain-marie d’eau frémissante.',
      'Incorporez 40 g de beurre froid en petits dés en remuant continuellement au fouet.',
      'Cuisez tout doucement sans cesser de fouetter jusqu’à obtention d’une crème onctueuse et liée.',
      'Stoppez la cuisson en ajoutant 2 cuillères de crème fraîche froide.',
      'Dressez dans de jolies coupelles chaudes et râpez des lamelles de truffe noire sur le dessus.',
      'Servez avec des mouillettes de baguette dorées au beurre.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Gastronomie', 'Entrée', 'Fêtes', 'Bistrot']
  },
  {
    id: 'rec-fr-souffle-glace-grand-marnier',
    title: 'Soufflé Glacé Traditionnel au Grand Marnier et Zestes d’Orange',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 0,
    difficulty: 'medium',
    description: 'Entremets glacé aérien et soyeux monté en ramequins avec collerette de papier, parfumé à la liqueur d’orange Grand Marnier.',
    instructions: [
      'Fixez une bande de papier sulfurisé autour de 6 ramequins pour dépasser de 3 cm du bord.',
      'Fouettez 4 jaunes d’œufs avec le sucre et 60 ml de Grand Marnier au bain-marie jusqu’à ce que le sabayon double de volume.',
      'Laissez refroidir le sabayon.',
      'Montez la crème liquide entière en chantilly ferme.',
      'Incorporez délicatement la chantilly au sabayon refroidi.',
      'Remplissez les ramequins jusqu’en haut du papier.',
      'Placez au congélateur pendant au moins 6 heures.',
      'Retirez délicatement le papier sulfurisé avant de servir et saupoudrez de cacao ou zeste d’orange.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-heavy-cream', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-orange', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-cognac', quantity: 60, unit: 'ml' }
    ],
    tags: ['French', 'France', 'Dessert', 'Gastronomie', 'Fêtes', 'Glacé']
  }
];
