import { Recipe } from '../../types';

export const RECIPES_FRANCE_EXPANSION_PACK: Recipe[] = [
  {
    id: 'rec-fr-salade-lyonnaise-lardons-poche',
    title: 'Salade Lyonnaise Authentique aux Foies de Volaille et Œuf Poché',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Salade frisée croquante, foies de volaille sautés au vinaigre, lardons fumés dorés, croûtons aillés et œuf poché au jaune coulant.',
    instructions: [
      'Lavez et essorez la salade frisée.',
      'Faites dorer les lardons fumés et les cubes de pain de mie dans du beurre.',
      'Faites sauter les foies de volaille 4 minutes et déglacez au vinaigre de vin rouge.',
      'Pochez 4 œufs frais dans une eau frémissante vinaigrée pendant 3 minutes.',
      'Dressez la frisée avec les lardons chauds, les foies et posez un œuf poché au centre.',
      'Arrosez de vinaigrette tiède à l’échalote.'
    ],
    ingredients: [
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-baguette', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' }
    ],
    tags: ['French', 'France', 'Lyon', 'Bouchon', 'Entrée', 'Salade']
  },
  {
    id: 'rec-fr-cassolette-st-jacques-poireaux',
    title: 'Cassolette de Saint-Jacques et Fondue de Poireaux au Vin Blanc',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Noix de Saint-Jacques et crevettes dorées au beurre sur une fondue de poireaux crémée, gratinées à la chapelure et au parmesan.',
    instructions: [
      'Émincez les poireaux et faites-les fondre au beurre 15 minutes avec un peu de vin blanc.',
      'Ajoutez la crème fraîche, assaisonnez de sel, poivre et muscade.',
      'Snackez les Saint-Jacques 1 minute par face au beurre.',
      'Répartissez la fondue de poireaux dans 4 cassolettes individuelles et déposez les Saint-Jacques dessus.',
      'Saupoudrez de chapelure et parmesan.',
      'Passez sous le gril à 210°C pendant 5 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-scallops', quantity: 12, unit: 'unit' },
      { ingredientId: 'ing-leek', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-white-wine', quantity: 50, unit: 'ml' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-parmesan', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-breadcrumbs', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Entrée', 'Fruits de mer', 'Gratin']
  },
  {
    id: 'rec-fr-blanquette-saumon-legumes-verts',
    title: 'Blanquette de Saumon et Poissons Blancs aux Légumes Nouveaux',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    difficulty: 'medium',
    description: 'Morceaux de saumon et cabillaud fondants pochés dans un fumet crémé au citron, accompagnés de poireaux, carottes fanes et champignons de Paris.',
    instructions: [
      'Faites cuire les carottes et blancs de poireaux émincés dans le fumet de poisson pendant 10 minutes.',
      'Ajoutez les champignons de Paris émincés et les cubes de saumon et cabillaud. Pochez 6 minutes.',
      'Égouttez les poissons et légumes délicatement.',
      'Faites un roux blanc avec beurre et farine, mouillez avec le bouillon de cuisson chaud.',
      'Liez avec la crème fraîche et le jus de citron.',
      'Nappez le poisson et les légumes de cette sauce veloutée et servez avec un riz basmati.'
    ],
    ingredients: [
      { ingredientId: 'ing-salmon-fillet', quantity: 350, unit: 'g' },
      { ingredientId: 'ing-cod-fillet', quantity: 350, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-leek', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-mushroom', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-fish-stock', quantity: 400, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-lemon', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 25, unit: 'g' }
    ],
    tags: ['French', 'France', 'Poisson', 'Plat', 'Gastronomie', 'Léger']
  },
  {
    id: 'rec-fr-flan-patissier-vanille-boulangerie',
    title: 'Flan Pâtissier Traditionnel Parisien Épais à la Vanille Bourbon',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    difficulty: 'medium',
    description: 'Le flan des boulangeries parisiennes : tranche haute et crémeuse infusée à la vanille naturelle, peau dorée et fond de pâte brisée croquant.',
    instructions: [
      'Foncez un moule à charnière haut avec la pâte brisée et placez au congélateur 20 minutes.',
      'Faites bouillir 1 litre de lait entier avec la gousse de vanille fendue et grattée.',
      'Dans un saladier, fouettez 4 œufs et 1 jaune avec 160 g de sucre et 100 g de fécule de maïs.',
      'Versez le lait chaud filtré sur les œufs en fouettant.',
      'Reversez dans la casserole et faites épaissir à feu moyen pendant 2 minutes sans cesser de fouetter vivement.',
      'Versez la crème chaude dans le fond de pâte.',
      'Enfournez à 180°C pendant 45 à 50 minutes (le dessus doit être bien bruni par endroits).',
      'Laissez refroidir complètement puis placez 4 heures au réfrigérateur pour que le flan fige parfaitement avant découpe.'
    ],
    ingredients: [
      { ingredientId: 'ing-shortcrust-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-milk', quantity: 1000, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 5, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 160, unit: 'g' },
      { ingredientId: 'ing-cornstarch', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Paris', 'Dessert', 'Pâtisserie', 'Flan', 'Boulangerie']
  },
  {
    id: 'rec-fr-beignets-pommes-calvados',
    title: 'Beignets de Pommes Moelleux Parfumés au Calvados et Cannelle',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Rondelles de pommes fraîches marinées au calvados et sucre vanillé, trempées dans une pâte à beignet légère à la bière et frites bien dorées.',
    instructions: [
      'Évidez les pommes et coupez-les en rondelles de 1 cm.',
      'Faites-les mariner 15 minutes avec le calvados et 2 cuillères de sucre.',
      'Préparez la pâte à beignet : mélangez la farine, la levure, 1 pincée de sel, l’œuf, le lait et un filet de bière pour aérer.',
      'Trempez les rondelles de pommes dans la pâte.',
      'Plongez-les dans l’huile de friture chaude à 175°C pendant 2 minutes par face jusqu’à couleur dorée et gonflée.',
      'Égouttez sur papier absorbant et roulez dans le sucre à la cannelle.'
    ],
    ingredients: [
      { ingredientId: 'ing-apple', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-cognac', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-sugar', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-cinnamon', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Normandie', 'Dessert', 'Goûter', 'Pommes', 'Tradition']
  },
  {
    id: 'rec-fr-tarte-sucre-ardennaise',
    title: 'Tarte au Sucre et Beurre Traditionnelle des Ardennes et du Nord',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 30,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Galette briochée moelleuse et levée, généreusement garnie de noisettes de beurre fondu, de cassonade brune et d’un filet de crème.',
    instructions: [
      'Préparez une pâte levée briochée : pétrissez la farine avec la levure, le lait tiède, le beurre mou et les œufs. Laissez lever 1h.',
      'Étalez la pâte dans une tourtière beurrée et laissez regonfler 30 minutes.',
      'Formez des cavités à la surface avec les doigts.',
      'Déposez des dés de beurre demi-sel dans chaque cavité.',
      'Recouvrez abondamment de cassonade brune et arrosez de crème liquide.',
      'Enfournez à 190°C pendant 20 minutes (le sucre et le beurre fondent pour former une garniture onctueuse et croustillante).',
      'Dégustez tiède.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-brown-sugar', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-heavy-cream', quantity: 40, unit: 'ml' },
      { ingredientId: 'ing-active-dry-yeast', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Nord', 'Ardennes', 'Dessert', 'Goûter', 'Brioche']
  },
  {
    id: 'rec-fr-fondue-bourguignonne-sauces',
    title: 'Fondue Bourguignonne Traditionnelle au Bœuf et Sauces Maison (Béarnaise, Tartare, Diable)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 25,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Cubes de filet et faux-filet de bœuf cuits à table dans un poêlon d’huile chaude parfumée au laurier, accompagnés de sauces froides maison de bistrot.',
    instructions: [
      'Coupez la viande de bœuf en cubes réguliers de 2,5 cm et dressez-les sur un plat.',
      'Préparez les sauces maison : sauce tartare aux câpres et herbes, sauce moutarde béarnaise à l’estragon.',
      'Faites chauffer l’huile de pépins de raisin avec une branche de thym et une feuille de laurier dans le caquelon à fondue sur la cuisinière.',
      'Transférez sur le réchaud de table sécurisé.',
      'Chaque convive pique un cube de viande et le cuit 1 à 2 minutes dans l’huile selon la cuisson désirée (saignant ou à point).',
      'Salez à la fleur de sel et trempez dans les sauces avec des frites ou pommes au four.'
    ],
    ingredients: [
      { ingredientId: 'ing-beef-chuck', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-olive-oil', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-dijon-mustard', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-capers', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-tarragon', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-potato', quantity: 600, unit: 'g' }
    ],
    tags: ['French', 'France', 'Bourgogne', 'Plat', 'Bœuf', 'Convivial', 'Tradition']
  },
  {
    id: 'rec-fr-quenelles-brochet-sauce-nantua',
    title: 'Quenelles Soufflées de Brochet à la Sauce Nantua et Écrevisses',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 30,
    cookTimeMinutes: 25,
    difficulty: 'hard',
    description: 'La gloire de la gastronomie lyonnaise : quenelles de poisson soufflées légères comme des nuages, nappées d’une sauce veloutée aux écrevisses et gratinées.',
    instructions: [
      'Pochez les quenelles dans de l’eau frémissante salée 10 minutes jusqu’à ce qu’elles remontent à la surface.',
      'Préparez la sauce Nantua : faites un roux avec le beurre et la farine, mouillez avec le fumet de poisson et le vin blanc sec. Incorporez la crème fraîche, le concentré de tomate et le beurre d’écrevisses.',
      'Disposez les quenelles égouttées dans un plat à gratin beurré.',
      'Nappez généreusement de sauce Nantua bien chaude.',
      'Faites gratiner au four à 200°C pendant 20 minutes (les quenelles vont doubler de volume).',
      'Servez immédiatement avec du riz pilaf.'
    ],
    ingredients: [
      { ingredientId: 'ing-cod-fillet', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-fish-stock', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-white-wine', quantity: 50, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-tomato-paste', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Lyon', 'Gastronomie', 'Poisson', 'Plat', 'Classique']
  }
];
