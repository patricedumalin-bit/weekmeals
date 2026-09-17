import { Recipe } from '../../types';

export const RECIPES_FRANCE_GRAND_TOUR: Recipe[] = [
  {
    id: 'rec-fr-fondue-cremeuse-poireaux-vin-blanc',
    title: 'Fondue Onctueuse de Poireaux au Beurre Demi-Sel et Vin Blanc',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Blancs de poireaux émincés compotés tout doucement dans du beurre demi-sel breton, déglacés au vin blanc sec et liés à la crème fraîche.',
    instructions: [
      'Émincez finement 4 blancs de poireaux.',
      'Faites fondre le beurre demi-sel dans une sauteuse.',
      'Ajoutez les poireaux, couvrez et laissez suer à feu très doux pendant 15 minutes en remuant de temps en temps.',
      'Déglacez avec le vin blanc et laissez évaporer 3 minutes.',
      'Incorporez la crème fraîche, assaisonnez de sel, poivre et muscade.',
      'Poursuivez la cuisson 5 minutes sans couvrir.',
      'Servez en accompagnement de poissons ou volailles.'
    ],
    ingredients: [
      { ingredientId: 'ing-leek', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-salted-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 50, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Garniture', 'Végétarien', 'Classique']
  },
  {
    id: 'rec-fr-soupe-courgettes-vache-qui-rit',
    title: 'Velouté Doux de Courgettes à la Vache qui rit et Cerfeuil',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'La soupe familiale préférée des enfants et grands en France : courgettes fraîches cuites au bouillon et mixées avec des portions de fromage fondu.',
    instructions: [
      'Lavez les courgettes et coupez-les en rondelles (gardez la peau).',
      'Déposez-les dans une casserole avec l’oignon émincé et couvrez de bouillon à hauteur.',
      'Faites cuire 20 minutes à frémissement.',
      'Ajoutez 4 portions de fromage fondu dans la casserole.',
      'Mixez longuement au mixeur plongeant pour obtenir une texture mousseuse et veloutée.',
      'Dégustez avec des croûtons dorés.'
    ],
    ingredients: [
      { ingredientId: 'ing-zucchini', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-vegetable-broth', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-butter', quantity: 15, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Soupe', 'Famille', 'Enfants', 'Facile', 'Entrée']
  },
  {
    id: 'rec-fr-tartelette-citron-meringuee',
    title: 'Tartelettes Individuelles au Citron Jaune et Meringue Italienne Flambée',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    difficulty: 'medium',
    description: 'Fonds de tartelettes sablés croustillants garnis d’un crémeux intense au jus de citron frais et surmontés de pointes de meringue italienne dorées au chalumeau.',
    instructions: [
      'Cuisez 4 fonds de tartelettes sablées à blanc à 180°C pendant 15 minutes. Laissez refroidir.',
      'Préparez le lemon curd : faites épaissir au bain-marie le jus et zeste de 3 citrons avec 3 œufs, 100g de sucre et 80g de beurre en dés.',
      'Garnissez les fonds de tarte avec la crème au citron et placez 1h au frais.',
      'Montez les blancs en neige avec un sirop de sucre chaud à 118°C pour faire la meringue italienne.',
      'Pochez la meringue en jolies pointes sur les tartelettes.',
      'Dorez la meringue au chalumeau de cuisine.'
    ],
    ingredients: [
      { ingredientId: 'ing-sweet-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-lemon', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 80, unit: 'g' }
    ],
    tags: ['French', 'France', 'Paris', 'Dessert', 'Pâtisserie', 'Citron', 'Classique']
  },
  {
    id: 'rec-fr-madeleines-miel-citron-coque-chocolat',
    title: 'Madeleines Pur Beurre au Miel de Fleurs et Coque Craquante au Chocolat',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Véritables madeleines lorraines à la belle bosse gonflée au four grâce au choc thermique, trempées dans une coque de chocolat noir craquante.',
    instructions: [
      'Fouettez les œufs avec le sucre et 2 cuillères de miel jusqu’à ce que le mélange blanchisse.',
      'Incorporez la farine et la levure tamisées, puis le beurre fondu refroidi et le zeste de citron.',
      'Placez la pâte au réfrigérateur pendant au moins 2 heures (indispensable pour créer la bosse).',
      'Remplissez les alvéoles du moule à madeleines beurré.',
      'Enfournez à 220°C pendant 4 minutes, puis baissez à 180°C pendant 6 minutes.',
      'Démoulez immédiatement sur une grille.',
      'Faites fondre du chocolat noir dans les empreintes du moule et reposez les madeleines cuites dedans jusqu’à durcissement.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 90, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-honey', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-dark-chocolate', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-lemon', quantity: 0.5, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Commercy', 'Lorraine', 'Goûter', 'Madeleine', 'Biscuits']
  },
  {
    id: 'rec-fr-tarte-aux-pommes-normande-fine',
    title: 'Tarte Fine aux Pommes Caramélisées et Gelée de Coings',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Pâte feuilletée étalée très finement, recouverte de fines lamelles de pommes disposées en rosace serrée, saupoudrées de sucre et noisettes de beurre.',
    instructions: [
      'Étalez la pâte feuilletée en grand disque sur une plaque de cuisson.',
      'Saupoudrez d’une cuillerée de sucre en poudre.',
      'Disposez les fines lamelles de pommes en cercles concentriques très serrés.',
      'Parsemez de petits dés de beurre et saupoudrez de sucre vanillé.',
      'Enfournez à 200°C pendant 25 minutes jusqu’à ce que la pâte soit bien dorée et croustillante et les pommes légèrement caramélisées.',
      'Nappez au pinceau d’une cuillerée de confiture ou gelée tiède pour lustrer.'
    ],
    ingredients: [
      { ingredientId: 'ing-puff-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-apple', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 40, unit: 'g' }
    ],
    tags: ['French', 'France', 'Normandie', 'Dessert', 'Tarte', 'Pommes', 'Boulangerie']
  }
];
