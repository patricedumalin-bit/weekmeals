import { Recipe } from '../../types';

export const RECIPES_FRANCE_MAINS_REGIONAL: Recipe[] = [
  {
    id: 'rec-fr-gratin-dauphinois',
    title: 'Gratin Dauphinois Traditionnel sans Fromage (Authentic Dauphinois Gratin)',
    categoryId: 'rcat-veggie',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 60,
    difficulty: 'easy',
    description: 'Le véritable gratin dauphinois du Dauphiné : fines rondelles de pommes de terre fondantes cuites longuement dans du lait entier et de la crème, parfumées à l’ail et à la muscade.',
    instructions: [
      'Épluchez les pommes de terre et coupez-les en très fines rondelles (2-3 mm) à la mandoline. Surtout ne les lavez pas après découpe afin de préserver l’amidon qui lie le gratin.',
      'Frottez généreusement l’intérieur d’un grand plat à gratin avec la gousse d’ail coupée en deux, puis beurrez-le.',
      'Dans une grande casserole, portez à frémissement le lait, la crème liquide, 1 gousse d’ail écrasée, 1 belle cuillère à café de sel, du poivre et de la muscade fraîchement râpée.',
      'Ajoutez les rondelles de pommes de terre dans la casserole et laissez précuire à feu très doux pendant 8 à 10 minutes en remuant délicatement.',
      'Versez le tout dans le plat à gratin et égalisez bien la surface.',
      'Répartissez quelques noisettes de beurre sur le dessus.',
      'Enfournez à 160°C (chaleur douce) pendant 50 à 60 minutes jusqu’à ce que le dessus soit naturellement doré et croustillant et que la pointe d’un couteau s’enfonce sans résistance.'
    ],
    ingredients: [
      { ingredientId: 'ing-potato', quantity: 1200, unit: 'g' },
      { ingredientId: 'ing-heavy-cream', quantity: 400, unit: 'ml' },
      { ingredientId: 'ing-milk', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 1.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Dauphiné', 'Plat', 'Gratin', 'Végétarien', 'Classique']
  },
  {
    id: 'rec-fr-tartiflette-savoyarde',
    title: 'Tartiflette Savoyarde Traditionnelle au Reblochon AOP (Savoyard Tartiflette)',
    categoryId: 'rcat-veggie',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Le chef-d’œuvre des Alpes : pommes de terre fondantes et oignons caramélisés aux lardons fumés, recouverts d’un Reblochon de Savoie entier coulant et gratiné.',
    instructions: [
      'Faites cuire les pommes de terre entières avec leur peau dans l’eau bouillante salée pendant 20 minutes (elles doivent rester fermes). Épluchez-les et coupez-les en rondelles épaisses.',
      'Émincez finement les oignons.',
      'Dans une grande poêle, faites revenir les lardons fumés sans matière grasse, puis ajoutez les oignons et laissez-les dorer et fondre pendant 10 minutes.',
      'Déglacez la poêle avec le vin blanc sec de Savoie en grattant bien les sucs.',
      'Mélangez délicatement les rondelles de pommes de terre avec les oignons et les lardons dans la poêle. Ajoutez la crème fraîche, poivrez.',
      'Versez la préparation dans un plat à gratin.',
      'Grattez la croûte du Reblochon avec la lame d’un couteau, puis coupez-le en deux dans l’épaisseur pour obtenir deux disques.',
      'Déposez les deux moitiés de Reblochon sur les pommes de terre, croûte vers le haut.',
      'Enfournez à 200°C pendant 25 minutes jusqu’à ce que le fromage soit totalement fondu, bouillonnant et bien doré.',
      'Dégustez avec une salade verte et un vin blanc sec de Savoie.'
    ],
    ingredients: [
      { ingredientId: 'ing-reblochon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 1000, unit: 'g' },
      { ingredientId: 'ing-bacon', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-white-wine', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-garlic', quantity: 1, unit: 'clove' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Savoie', 'Plat', 'Fromage', 'Hiver', 'Convivial']
  },
  {
    id: 'rec-fr-croziflette-savoie',
    title: 'Croziflette Savoyarde aux Crozets et Reblochon (Savoyard Crozets Gratin)',
    categoryId: 'rcat-pasta',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Variante savoyarde ultra-gourmande aux petites pâtes carrées au sarrasin (crozets), lardons, oignons et reblochon fermier gratiné.',
    instructions: [
      'Plongez les crozets de Savoie dans un grand volume d’eau bouillante salée et faites-les cuire 15 minutes. Égouttez-les bien.',
      'Dans une poêle, faites dorer les lardons fumés et les oignons émincés pendant 8 minutes.',
      'Mélangez dans un plat à gratin les crozets cuits, les lardons, les oignons et la crème fraîche. Poivrez généreusement.',
      'Coupez le Reblochon en deux dans l’épaisseur et déposez-le par-dessus.',
      'Faites gratiner à 200°C pendant 20 minutes.',
      'Servez brûlant avec du jambon cru de montagne.'
    ],
    ingredients: [
      { ingredientId: 'ing-crozets', quantity: 350, unit: 'g' },
      { ingredientId: 'ing-reblochon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Savoie', 'Pâtes', 'Plat', 'Fromage', 'Hiver']
  },
  {
    id: 'rec-fr-ratatouille-provencale',
    title: 'Ratatouille Traditionnelle Mijotée à l’Huile d’Olive (Classic Provencal Ratatouille)',
    categoryId: 'rcat-veggie',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 45,
    difficulty: 'easy',
    description: 'Le grand plat d’été de Provence : aubergines, courgettes, poivrons multicolores et tomates mûres fondus séparément à l’huile d’olive puis mijotés ensemble avec ail et thym.',
    instructions: [
      'Coupez en dés de 2 cm les aubergines, les courgettes, les poivrons et les tomates. Émincez les oignons.',
      'Dans une grande sauteuse, faites dorer successivement chaque légume dans l’huile d’olive : d’abord les poivrons (5 min), puis les aubergines (8 min), puis les courgettes (6 min). Réservez chaque légume après cuisson.',
      'Faites revenir les oignons et les gousses d’ail écrasées dans la sauteuse.',
      'Ajoutez les tomates concassées, le thym frais, le laurier et une pincée d’herbes de Provence.',
      'Réunissez tous les légumes dans la cocotte, salez à la fleur de sel et poivrez.',
      'Couvrez et laissez confire à feu très doux pendant 35 minutes en remuant délicatement pour ne pas écraser les légumes.',
      'Servez chaud, tiède ou froid le lendemain avec du pain frais.'
    ],
    ingredients: [
      { ingredientId: 'ing-eggplant', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-zucchini', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-bell-pepper-red', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-bell-pepper-green', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-tomato', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 4, unit: 'clove' },
      { ingredientId: 'ing-olive-oil', quantity: 5, unit: 'tbsp' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-bay-leaf', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-herbes-provence', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Provence', 'Plat', 'Légumes', 'Été', 'Végétarien', 'Classique']
  },
  {
    id: 'rec-fr-croque-monsieur-bistrot',
    title: 'Croque-Monsieur Traditionnel au Comté et Sauce Béchamel (Classic Parisian Croque-Monsieur)',
    categoryId: 'rcat-quick',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    difficulty: 'easy',
    description: 'Le croque-monsieur parisien authentique : tranches de pain de mie beurrées, jambon blanc supérieur, béchamel onctueuse à la muscade et comté gratiné sous le gril.',
    instructions: [
      'Préparez la béchamel : faites fondre 30 g de beurre, ajoutez 30 g de farine et cuisez 1 minute. Versez 250 ml de lait en fouettant jusqu’à épaississement. Assaisonnez de muscade, sel, poivre et incorporez 40 g de comté râpé.',
      'Beurrez légèrement les tranches de pain de mie sur une face.',
      'Tartinez une couche de béchamel sur 4 tranches de pain (face non beurrée).',
      'Déposez une belle tranche de jambon blanc de Paris pliée et parsemez d’un peu de fromage.',
      'Refermez avec les 4 autres tranches de pain.',
      'Nappez le dessus de chaque croque-monsieur avec le reste de béchamel et recouvrez généreusement de comté râpé.',
      'Enfournez sous le gril à 210°C pendant 10 à 12 minutes jusqu’à belle coloration dorée et croustillante.'
    ],
    ingredients: [
      { ingredientId: 'ing-ham-paris', quantity: 4, unit: 'slice' },
      { ingredientId: 'ing-gruyere', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 250, unit: 'ml' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Paris', 'Bistrot', 'Plat', 'Rapide', 'Classique']
  },
  {
    id: 'rec-fr-croque-madame',
    title: 'Croque-Madame au Comté et son Œuf au Plat Doré (Classic Croque-Madame)',
    categoryId: 'rcat-quick',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Le croque-monsieur gratiné au comté surmonté d’un magnifique œuf au plat au jaune coulant et ciboulette.',
    instructions: [
      'Réalisez les croque-monsieur avec béchamel, jambon blanc et comté râpé.',
      'Faites-les gratiner au four à 210°C pendant 10 minutes.',
      'Pendant ce temps, faites cuire 4 œufs au plat dans une poêle avec du beurre sans casser les jaunes.',
      'À la sortie du four, déposez délicatement un œuf au plat sur chaque croque-monsieur.',
      'Salez le jaune d’œuf d’une pincée de fleur de sel, poivrez et parsemez de ciboulette.'
    ],
    ingredients: [
      { ingredientId: 'ing-ham-paris', quantity: 4, unit: 'slice' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-gruyere', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 250, unit: 'ml' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Paris', 'Bistrot', 'Plat', 'Brunch', 'Rapide']
  },
  {
    id: 'rec-fr-galette-bretonne-complete',
    title: 'Galette de Sarrasin Bretonne Complète : Œuf, Jambon, Emmental (Breton Buckwheat Galette)',
    categoryId: 'rcat-quick',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'La reine des crêperies bretonnes : galette de blé noir croustillante (kraz) cuite au beurre demi-sel, garnie d’un œuf miroir, de jambon blanc et de fromage fondant.',
    instructions: [
      'Faites chauffer une poêle à crêpe (ou bilig) à feu vif avec une noisette de beurre demi-sel breton.',
      'Déposez une galette de sarrasin dans la poêle.',
      'Cassez un œuf au centre de la galette et étalez légèrement le blanc avec le dos d’une cuillère.',
      'Disposez une tranche de jambon de Paris autour du jaune et parsemez généreusement d’emmental ou comté râpé.',
      'Laissez cuire 2 à 3 minutes jusqu’à ce que le fromage fonde et le blanc soit pris.',
      'Ajoutez une noisette de beurre demi-sel sur les bords de la galette pour les rendre bien croustillants.',
      'Repliez les 4 bords en carré en laissant le jaune d’œuf visible au centre.',
      'Servez immédiatement avec une bolée de cidre brut.'
    ],
    ingredients: [
      { ingredientId: 'ing-buckwheat-flour', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-ham-paris', quantity: 4, unit: 'slice' },
      { ingredientId: 'ing-emmental', quantity: 140, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Plat', 'Crêpe', 'Terroir', 'Rapide']
  },
  {
    id: 'rec-fr-endives-au-jambon-gratin',
    title: 'Endives au Jambon Gratinées à la Béchamel et Emmental (Braised Endives with Ham)',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Chicons fondants cuits à la vapeur, enroulés dans des tranches de jambon blanc supérieur, nappés d’une béchamel parfumée et gratinés à souhait.',
    instructions: [
      'Retirez la base conique des endives pour éliminer l’amertume.',
      'Faites-les cuire à la vapeur pendant 20 minutes jusqu’à ce qu’elles soient très tendres. Pressez-les bien pour extraire toute l’eau.',
      'Préparez une béchamel avec le beurre, la farine, le lait, du sel, du poivre et de la muscade.',
      'Enroulez chaque endive égouttée dans une tranche de jambon de Paris.',
      'Disposez les rouleaux dans un plat à gratin beurré.',
      'Nappez généreusement de béchamel et recouvrez d’emmental râpé.',
      'Faites gratiner au four à 200°C pendant 20 minutes jusqu’à belle croûte dorée.'
    ],
    ingredients: [
      { ingredientId: 'ing-endive', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-ham-paris', quantity: 4, unit: 'slice' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 35, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 350, unit: 'ml' },
      { ingredientId: 'ing-emmental', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Nord', 'Plat', 'Gratin', 'Famille', 'Tradition']
  },
  {
    id: 'rec-fr-tomates-farcies-grand-mere',
    title: 'Tomates Farcies à la Chair à Saucisse et Riz Camarguais (Stuffed Baked Tomatoes)',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    difficulty: 'easy',
    description: 'Belles grosses tomates à farcir généreusement garnies de farce de porc persillée et aillée, cuites sur un lit de riz qui absorbe le délicieux jus.',
    instructions: [
      'Lavez les tomates et découpez un chapeau à 1/4 de la hauteur. Évidez délicatement l’intérieur à la petite cuillère en conservant la chair.',
      'Salez légèrement l’intérieur des tomates et retournez-les sur du papier absorbant pour dégorger.',
      'Dans un saladier, mélangez la chair à saucisse/porc haché avec l’oignon émincé, l’ail haché, le persil ciselé, l’œuf, la chapelure et la moitié de la pulpe de tomate récupérée.',
      'Assaisonnez la farce avec sel, poivre et herbes de Provence.',
      'Dans un plat à gratin, étalez une fine couche de riz cru au fond avec le reste du jus de tomate.',
      'Remplissez généreusement les tomates de farce, replacez les chapeaux et disposez-les sur le riz.',
      'Arrosez d’un filet d’huile d’olive.',
      'Enfournez à 180°C pendant 45 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-tomato', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-ground-pork', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-breadcrumbs', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-rice', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-herbes-provence', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Plat', 'Légumes farcis', 'Famille', 'Été']
  },
  {
    id: 'rec-fr-coquillettes-jambon-comte',
    title: 'Coquillettes au Jambon Blanc Supérieur et Comté Fondant (French Comfort Macaroni)',
    categoryId: 'rcat-pasta',
    servings: 4,
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Le plat doudou absolu de l’enfance française : coquillettes al dente enrobées d’une généreuse noix de beurre, de dés de jambon de Paris et de comté râpé.',
    instructions: [
      'Plongez les coquillettes dans une grande casserole d’eau bouillante salée et faites cuire 8 minutes pour une cuisson parfaite.',
      'Égouttez les coquillettes en conservant une cuillère d’eau de cuisson.',
      'Remettez les coquillettes dans la casserole encore chaude, ajoutez le beurre doux ou demi-sel en parcelles et laissez fondre.',
      'Ajoutez les dés de jambon de Paris supérieur et la crème fraîche.',
      'Incorporez une pluie de comté fraîchement râpé et mélangez vigoureusement pour faire filer le fromage.',
      'Servez immédiatement bien chaud avec un tour de moulin à poivre.'
    ],
    ingredients: [
      { ingredientId: 'ing-coquillettes', quantity: 350, unit: 'g' },
      { ingredientId: 'ing-ham-paris', quantity: 180, unit: 'g' },
      { ingredientId: 'ing-gruyere', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 35, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Pâtes', 'Plat', 'Enfants', 'Rapide', 'Réconfort']
  }
];
