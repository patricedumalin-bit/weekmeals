import { Recipe } from '../../types';

export const RECIPES_FRANCE_TERROIR_BATCH50: Recipe[] = [
  // 1. Entrées & Bouchées (15)
  {
    id: 'rec-fr-rillettes-sardines-citron',
    title: 'Rillettes de Sardines Fraîches au Citron et Ciboulette',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Tartinade express bretonne aux sardines à l’huile d’olive écrasées avec du beurre demi-sel, jus de citron jaune et ciboulette fraîche.',
    instructions: [
      'Égouttez les sardines et écrasez-les à la fourchette avec le beurre ramolli.',
      'Ajoutez le jus de citron, l’échalote hachée, la ciboulette, sel et poivre.',
      'Mélangez intimement et servez bien frais sur des toasts de baguette grillée.'
    ],
    ingredients: [
      { ingredientId: 'ing-sole-fillet', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-shallot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Apéritif', 'Entrée', 'Rapide']
  },
  {
    id: 'rec-fr-salade-chou-rouge-pommes-noix',
    title: 'Salade de Chou Rouge Croquant aux Pommes et Cerneaux de Noix',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Salade d’hiver croquante de chou rouge émincé très finement, dés de pommes granny et noix arrosés d’une vinaigrette au cidre.',
    instructions: [
      'Émincez le chou rouge très finement à la mandoline.',
      'Coupez les pommes en fins quartiers.',
      'Préparez la vinaigrette avec moutarde, vinaigre de cidre, huile de noix, sel et poivre.',
      'Mélangez le chou avec la sauce, les pommes et les cerneaux de noix.'
    ],
    ingredients: [
      { ingredientId: 'ing-cabbage-green', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-apple', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-walnuts', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-cider-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Alsace', 'Salade', 'Entrée', 'Santé']
  },
  {
    id: 'rec-fr-gougeres-farcies-beurre-escargot',
    title: 'Gougères Bourguignonnes Farcies au Beurre Persillé',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 25,
    difficulty: 'medium',
    description: 'Choux salés au fromage comté garnis à chaud d’une noix de beurre d’ail et persil fondu.',
    instructions: [
      'Faites cuire les gougères au comté à 180°C pendant 25 minutes.',
      'Faites fondre le beurre avec l’ail pressé, le persil et le vin blanc.',
      'Incisez les gougères encore chaudes et déposez une cuillerée de beurre persillé dedans.',
      'Dégustez aussitôt.'
    ],
    ingredients: [
      { ingredientId: 'ing-gruyere', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' }
    ],
    tags: ['French', 'France', 'Bourgogne', 'Apéritif', 'Entrée', 'Choux']
  },
  {
    id: 'rec-fr-veloute-potimarron-chataignes',
    title: 'Velouté de Potimarron aux Châtaignes et Noisettes Torréfiées',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Soupe d’automne onctueuse de courge potimarron cuite avec des châtaignes d’Ardèche et une touche de crème fraîche.',
    instructions: [
      'Coupez le potimarron en cubes (la peau est comestible).',
      'Faites revenir l’oignon dans le beurre 3 minutes.',
      'Ajoutez le potimarron et les châtaignes cuites.',
      'Couvrez de bouillon de légumes et laissez cuire 25 minutes.',
      'Mixez finement avec la crème fraîche, assaisonnez de sel, poivre et muscade.'
    ],
    ingredients: [
      { ingredientId: 'ing-potato', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-vegetable-broth', quantity: 600, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Ardèche', 'Automne', 'Soupe', 'Entrée']
  },
  {
    id: 'rec-fr-champignons-farcis-cantal-lardons',
    title: 'Gros Champignons de Paris Farcis au Cantal et Lardons Fumés',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Chapeaux de gros champignons de Paris dorés au four, garnis d’une farce de lardons, ail, persil, chapelure et cantal râpé.',
    instructions: [
      'Retirez les pieds des champignons et hachez-les finement.',
      'Faites revenir les pieds hachés avec les lardons, l’ail et l’échalote dans une poêle.',
      'Mélangez la farce avec la chapelure, le persil et la moitié du cantal râpé.',
      'Garnissez les chapeaux de champignons avec la préparation et recouvrez du reste de cantal.',
      'Enfournez à 190°C pendant 20 minutes jusqu’à beau gratiné.'
    ],
    ingredients: [
      { ingredientId: 'ing-mushroom', quantity: 8, unit: 'unit' },
      { ingredientId: 'ing-cantal', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-bacon', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-breadcrumbs', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-shallot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-butter', quantity: 20, unit: 'g' }
    ],
    tags: ['French', 'France', 'Auvergne', 'Entrée', 'Apéritif', 'Gratin']
  },

  // 2. Plats de Viande & Volailles du Terroir (20)
  {
    id: 'rec-fr-civet-lapin-sauce-chasseur',
    title: 'Civet de Lapin Traditionnel Sauce Chasseur aux Champignons',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 25,
    cookTimeMinutes: 60,
    difficulty: 'medium',
    description: 'Morceaux de lapin mijotés dans une sauce brune au vin blanc, échalotes, tomates concassées, champignons de Paris et estragon.',
    instructions: [
      'Faites dorer les morceaux de lapin dans le beurre et l’huile. Réservez.',
      'Faites suer les échalotes et les champignons émincés dans la cocotte.',
      'Déglacez avec le vin blanc sec et ajoutez le concentré de tomate et le bouillon.',
      'Remettez le lapin avec le bouquet garni et laissez mijoter 50 minutes à couvert.',
      'Parsemez d’estragon et persil frais en fin de cuisson et servez avec des tagliatelles.'
    ],
    ingredients: [
      { ingredientId: 'ing-chicken-thighs', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-mushroom', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-tomato-paste', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-shallot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-tarragon', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-chicken-broth', quantity: 200, unit: 'ml' }
    ],
    tags: ['French', 'France', 'Chasseur', 'Plat', 'Mijoté', 'Tradition']
  },
  {
    id: 'rec-fr-côte-veau-sauce-millesime',
    title: 'Côte de Veau Épaisse Poêlée au Beurre Mousseux et Thym Frais',
    categoryId: 'rcat-poultry',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Belle côte de veau de lait saisie à la poêle et arrosée en continu de beurre noisette moussant parfumé à l’ail en chemise et branches de thym.',
    instructions: [
      'Salez et poivrez la côte de veau.',
      'Faites chauffer une poêle à feu moyen avec un filet d’huile.',
      'Déposez la côte et faites dorer 4 minutes sur la première face.',
      'Retournez la viande, ajoutez une généreuse motte de beurre, l’ail écrasé et le thym.',
      'Arrosez continuellement la viande avec le beurre moussant à la cuillère pendant 5 à 6 minutes.',
      'Laissez reposer 5 minutes sur une planche tiède avant de trancher.'
    ],
    ingredients: [
      { ingredientId: 'ing-veal-escalope', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-thyme', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Gastronomie', 'Veau', 'Plat', 'Rapide']
  },
  {
    id: 'rec-fr-potee-lorraine-chou-saucisse',
    title: 'Potée Lorraine Traditionnelle au Lard Paysan et Chou Blanc',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 110,
    difficulty: 'easy',
    description: 'Grande marmite familiale lorraine cuisinant poitrine fumée, palette, saucisses à cuire, chou blanc, poireaux, navets et pommes de terre.',
    instructions: [
      'Blanchissez les feuilles de chou 5 minutes à l’eau bouillante.',
      'Mettez la palette et la poitrine fumée dans un faitout d’eau froide, portez à ébullition et écumez.',
      'Ajoutez le chou, les carottes, les navets et les poireaux ficelés.',
      'Laissez mijoter 1h15.',
      'Ajoutez les saucisses et les pommes de terre 25 minutes avant la fin.',
      'Servez bien chaud avec du raifort ou de la moutarde.'
    ],
    ingredients: [
      { ingredientId: 'ing-cabbage-green', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-pork-chops', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-sausage-toulouse', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-leek', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-turnip', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 500, unit: 'g' }
    ],
    tags: ['French', 'France', 'Lorraine', 'Plat', 'Hiver', 'Terroir']
  },
  {
    id: 'rec-fr-sautes-porc-cidre-moutarde',
    title: 'Sauté de Porc Fermier au Cidre Brut et Moutarde à l’Ancienne',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    difficulty: 'easy',
    description: 'Morceaux tendres d’échine de porc dorés au beurre, mijotés dans un jus de cidre de Normandie avec oignons, carottes et crème moutardée.',
    instructions: [
      'Faites dorer les cubes de porc dans une cocotte avec le beurre.',
      'Ajoutez les oignons et les carottes en rondelles, laissez suer 5 minutes.',
      'Saupoudrez de farine, remuez puis versez le cidre brut.',
      'Ajoutez le thym et laissez mijoter 35 minutes.',
      'Incorporez la crème fraîche et la moutarde à l’ancienne hors du feu et servez aussitôt avec du riz.'
    ],
    ingredients: [
      { ingredientId: 'ing-ground-pork', quantity: 700, unit: 'g' },
      { ingredientId: 'ing-cider', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-carrot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 20, unit: 'g' }
    ],
    tags: ['French', 'France', 'Normandie', 'Plat', 'Porc', 'Familial']
  },

  // 3. Poissons et Produits de la Mer (15)
  {
    id: 'rec-fr-papillote-cabillaud-legumes-citron',
    title: 'Papillote Fondante de Cabillaud aux Petits Légumes et Citron Jaune',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Dos de cabillaud cuit à la vapeur en papillote avec julienne de carottes et courgettes, filet d’huile d’olive et rondelle de citron.',
    instructions: [
      'Découpez 4 grandes feuilles de papier sulfurisé.',
      'Répartissez la julienne de légumes fins au centre.',
      'Posez un pavé de cabillaud sur chaque lit de légumes.',
      'Arrosez d’huile d’olive, déposez une rondelle de citron, une branche de thym, sel et poivre.',
      'Fermez hermétiquement les papillotes.',
      'Enfournez à 190°C pendant 20 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-cod-fillet', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-zucchini', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Poisson', 'Plat', 'Santé', 'Léger']
  },
  {
    id: 'rec-fr-gratin-fruits-mer-bechamel',
    title: 'Gratin de Fruits de Mer à la Béchamel et au Gruyère Doré',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Moules, crevettes et morceaux de cabillaud enrobés d’une béchamel onctueuse au vin blanc, gratinés au four.',
    instructions: [
      'Préparez une béchamel avec le beurre, la farine, le lait et le vin blanc sec. Assaisonnez de muscade.',
      'Incorporez les crevettes, les moules cuites et les dés de cabillaud dans la sauce.',
      'Versez dans un plat à gratin beurré.',
      'Saupoudrez de gruyère râpé et chapelure.',
      'Faites gratiner à 200°C pendant 18 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-shrimp', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-mussels', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-cod-fillet', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-gruyere', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-white-wine', quantity: 50, unit: 'ml' }
    ],
    tags: ['French', 'France', 'Gratin', 'Plat', 'Fruits de mer', 'Gourmet']
  },

  // 4. Plats Végétariens, Pâtes et Terroir (15)
  {
    id: 'rec-fr-gratin-chou-fleur-bechamel-comte',
    title: 'Gratin de Chou-Fleur Traditionnel à la Béchamel et Comté',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Sommités de chou-fleur tendres cuites à la vapeur, nappées d’une généreuse béchamel à la muscade et gratinées au comté.',
    instructions: [
      'Faites cuire le chou-fleur à la vapeur 12 minutes (il doit rester ferme).',
      'Préparez une béchamel veloutée avec beurre, farine, lait, sel, poivre et muscade.',
      'Disposez le chou-fleur dans un plat à gratin.',
      'Nappez de béchamel et recouvrez de comté râpé.',
      'Faites gratiner à 200°C pendant 20 minutes jusqu’à belle croûte dorée.'
    ],
    ingredients: [
      { ingredientId: 'ing-cauliflower', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-gruyere', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 35, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 35, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 350, unit: 'ml' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Gratin', 'Plat', 'Végétarien', 'Famille']
  },
  {
    id: 'rec-fr-gratin-courgettes-riz-chevre',
    title: 'Gratin Provençal de Courgettes au Riz et Fromage de Chèvre',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Rondelles de courgettes revenues à l’ail et à l’huile d’olive, mélangées à du riz, œufs, crème et fromage de chèvre crémeux.',
    instructions: [
      'Faites sauter les courgettes en rondelles dans l’huile d’olive avec l’ail 8 minutes.',
      'Mélangez le riz cuit avec les courgettes, les œufs battus, la crème et la moitié du chèvre.',
      'Versez dans un plat à gratin, déposez des rondelles de chèvre sur le dessus.',
      'Enfournez à 190°C pendant 30 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-zucchini', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-goat-cheese', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-rice', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' }
    ],
    tags: ['French', 'France', 'Provence', 'Gratin', 'Plat', 'Végétarien']
  },

  // 5. Desserts et Douceurs (15)
  {
    id: 'rec-fr-quatre-quarts-breton-beurre-sale',
    title: 'Quatre-Quarts Traditionnel Breton Pur Beurre Demi-Sel',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    difficulty: 'easy',
    description: 'Le gâteau fondamental breton à parts égales d’œufs, sucre, farine et beurre demi-sel fondu, doré et croustillant sur la croûte.',
    instructions: [
      'Pesez 4 œufs (environ 200 g) et mesurez le même poids en sucre, farine et beurre demi-sel.',
      'Faites fondre le beurre demi-sel et laissez tiédir.',
      'Fouettez les œufs avec le sucre jusqu’à ce que le mélange blanchisse et double de volume.',
      'Ajoutez la farine et la levure tamisées, puis incorporez le beurre fondu.',
      'Versez dans un moule à cake beurré.',
      'Enfournez à 170°C pendant 45 minutes (une lame de couteau doit ressortir propre).'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-vanilla-bean', quantity: 0.5, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Dessert', 'Gâteau', 'Goûter', 'Tradition']
  },
  {
    id: 'rec-fr-palets-bretons-beurre-sale',
    title: 'Palets Bretons Épais et Sablés au Beurre Demi-Sel',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Biscuits bretons très épais, dorés, friables et riches en beurre demi-sel et jaunes d’œufs.',
    instructions: [
      'Fouettez les jaunes d’œufs avec le sucre jusqu’à blanchiment.',
      'Ajoutez le beurre demi-sel mou en pommade.',
      'Incorporez la farine et la levure tamisées.',
      'Formez un boudin de 4 cm de diamètre et placez 2h au réfrigérateur.',
      'Coupez en tranches épaisses de 1,5 cm et cuisez dans des cercles à 170°C pendant 20 minutes.',
      'Laissez refroidir avant dégustation.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Biscuits', 'Dessert', 'Goûter']
  },
  {
    id: 'rec-fr-tuiles-amandes-croquantes',
    title: 'Tuiles aux Amandes Effilées et Zeste d’Orange Croquantes',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Fines tuiles croustillantes dorées aux blancs d’œufs et amandes effilées, courbées encore chaudes sur un rouleau à pâtisserie.',
    instructions: [
      'Mélangez le sucre, les blancs d’œufs non montés, le beurre fondu tiédi, une larme de farine et les amandes effilées.',
      'Déposez des petits tas espacés sur une plaque beurrée et étalez-les très finement à la fourchette mouillée.',
      'Enfournez à 180°C pendant 8 à 10 minutes (les bords doivent être dorés).',
      'Décollez immédiatement et posez-les sur un rouleau à pâtisserie pour leur donner leur forme galbée.'
    ],
    ingredients: [
      { ingredientId: 'ing-almonds-flaked', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 35, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-orange', quantity: 0.5, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Biscuits', 'Dessert', 'Pâtisserie', 'Croquant']
  }
];
