import { Recipe } from '../../types';

// Additional authentic French regional specialties to guarantee 200+ rich French recipes
export const RECIPES_FRANCE_CATALOG_ADDITIONAL: Recipe[] = [
  // --- ENTRÉES ET SALADES TRADITIONNELLES ---
  {
    id: 'rec-fr-caviar-aubergine-provence',
    title: 'Caviar d’Aubergines au Four à l’Ail et Huile d’Olive (Provencal Eggplant Caviar)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Aubergines entières rôties au four jusqu’à chair fondante et confite, écrasées à la fourchette avec ail pressé, jus de citron et huile d’olive de Provence.',
    instructions: [
      'Piquez les aubergines avec une fourchette et enfournez-les entières à 200°C pendant 40 minutes.',
      'Fendez les aubergines en deux et récupérez la chair fondante à la cuillère.',
      'Écrasez la chair à la fourchette avec l’ail pressé, le jus de citron et l’huile d’olive en émulsionnant.',
      'Assaisonnez de sel, poivre et coriandre ou persil.',
      'Servez frais sur des toasts de baguette grillée.'
    ],
    ingredients: [
      { ingredientId: 'ing-eggplant', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-olive-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-lemon', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Provence', 'Entrée', 'Apéritif', 'Végétarien']
  },
  {
    id: 'rec-fr-salade-carottes-rapees-bistrot',
    title: 'Carottes Râpées de Bistrot au Jus de Citron et Persil (French Grated Carrot Salad)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'L’incontournable salade de cantine et de bistrot : carottes fraîches finement râpées, assaisonnées d’une vinaigrette vive au citron, huile et persil frais.',
    instructions: [
      'Épluchez et râpez finement les carottes.',
      'Dans un bol, préparez la vinaigrette avec le jus de citron, la moutarde de Dijon, l’huile d’olive ou tournesol, une pincée de sucre, sel et poivre.',
      'Mélangez intimement les carottes et la sauce.',
      'Ajoutez le persil frais haché et laissez reposer 15 minutes au frais avant de déguster.'
    ],
    ingredients: [
      { ingredientId: 'ing-carrot', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bistrot', 'Entrée', 'Salade', 'Végétarien', 'Rapide']
  },
  {
    id: 'rec-fr-artichaut-vinaigrette-moutarde',
    title: 'Artichaut Entier Cuit Vapeur et Vinaigrette Moutardée (Steamed Whole Artichoke)',
    categoryId: 'rcat-starters',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Gros artichaut camus de Bretagne cuit à la vapeur, dégusté feuille par feuille trempée dans une vinaigrette bien relevée à la moutarde forte.',
    instructions: [
      'Coupez la queue de l’artichaut à ras et coupez le haut des feuilles au couteau.',
      'Faites cuire à la vapeur ou dans l’eau bouillante salée citronnée pendant 35 minutes (une feuille doit se détacher facilement).',
      'Égouttez tête en bas.',
      'Préparez une vinaigrette avec la moutarde de Dijon, le vinaigre de vin rouge, l’échalote ciselée, l’huile d’olive, sel et poivre.',
      'Dégustez tiède ou froid en trempant la base charnue des feuilles dans la sauce, puis dégustez le cœur fondant après avoir ôté le foin.'
    ],
    ingredients: [
      { ingredientId: 'ing-artichoke', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-olive-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-shallot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Entrée', 'Végétarien', 'Santé', 'Classique']
  },
  {
    id: 'rec-fr-oeufs-cocotte-creme-ciboulette',
    title: 'Œufs Cocotte à la Crème d’Isigny et Ciboulette (Baked Eggs with Cream & Chives)',
    categoryId: 'rcat-starters',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    difficulty: 'easy',
    description: 'Œufs frais cuits au bain-marie dans des ramequins avec une cuillère de crème fraîche épaisse, beurre, muscade et ciboulette ciselée.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez 2 ramequins individuels.',
      'Déposez une belle cuillerée de crème fraîche épaisse au fond de chaque ramequin avec du sel, du poivre et de la muscade.',
      'Cassez délicatement un œuf frais par-dessus sans percer le jaune.',
      'Ajoutez une autre petite cuillère de crème autour du blanc.',
      'Placez les ramequins dans un plat avec de l’eau chaude à mi-hauteur (bain-marie).',
      'Enfournez 10 à 12 minutes jusqu’à ce que le blanc soit pris et le jaune encore coulant.',
      'Parsemez de ciboulette fraîche et dégustez avec des mouillettes de pain grillé beurré.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-butter', quantity: 15, unit: 'g' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-baguette', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Bistrot', 'Entrée', 'Brunch', 'Œufs', 'Rapide']
  },
  {
    id: 'rec-fr-soupe-cresson-veloute',
    title: 'Velouté Traditionnel de Cresson et Pommes de Terre (Watercress Velouté)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Soupe vert émeraude poivrée et soyeuse de cresson frais de fontaine étuvé au beurre et lié aux pommes de terre fondantes et crème.',
    instructions: [
      'Lavez soigneusement le cresson et éliminez les grosses tiges.',
      'Faites fondre le beurre dans un faitout et faites suer l’échalote et les feuilles de cresson pendant 3 minutes.',
      'Ajoutez les pommes de terre coupées en morceaux et le bouillon de volaille.',
      'Laissez cuire 20 minutes à feu moyen.',
      'Mixez finement, incorporez la crème fraîche, assaisonnez de sel et muscade.',
      'Servez avec des croûtons dorés au beurre.'
    ],
    ingredients: [
      { ingredientId: 'ing-spinach', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-chicken-broth', quantity: 700, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Île-de-France', 'Entrée', 'Soupe', 'Tradition']
  },

  // --- PLATS DE VIANDE ET VOLAILLE SUPPLÉMENTAIRES ---
  {
    id: 'rec-fr-lapin-moutarde-estragon',
    title: 'Lapin à la Moutarde de Dijon et à l’Estragon (Rabbit with Dijon Mustard & Tarragon)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 50,
    difficulty: 'medium',
    description: 'Morceaux de lapin badigeonnés de moutarde forte et dorés au beurre, mijotés dans un jus au vin blanc sec, crème fraîche et estragon frais.',
    instructions: [
      'Badigeonnez généreusement les morceaux de lapin de moutarde de Dijon.',
      'Faites dorer les morceaux dans une cocotte avec le beurre et un filet d’huile pendant 10 minutes.',
      'Ajoutez les échalotes émincées et laissez suer 3 minutes.',
      'Mouillez avec le vin blanc sec et le bouillon.',
      'Ajoutez le thym et la moitié de l’estragon.',
      'Couvrez et laissez mijoter à feu doux pendant 40 minutes.',
      'Retirez le lapin, ajoutez la crème fraîche et le reste d’estragon ciselé dans la cocotte pour lier la sauce.',
      'Remettez le lapin 2 minutes et servez avec des tagliatelles fraîches.'
    ],
    ingredients: [
      { ingredientId: 'ing-chicken-thighs', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-dijon-mustard', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-white-wine', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-tarragon', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-chicken-broth', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bourgogne', 'Plat', 'Bistrot', 'Classique']
  },
  {
    id: 'rec-fr-confit-canard-pommes-sarladaises',
    title: 'Cuisses de Canard Confit et Pommes de Terre Sarladaises à l’Ail (Duck Confit & Sarladaise Potatoes)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Cuisses de canard confites à la peau croustillante dorées au four, servies avec des pommes de terre rissolées dans la graisse de canard, ail et persil de Sarlat.',
    instructions: [
      'Préchauffez le four à 200°C. Déposez les cuisses de canard confites côté peau vers le haut dans un plat et enfournez 25 minutes jusqu’à peau bien dorée et croustillante.',
      'Récupérez 3 cuillères de graisse de canard du bocal.',
      'Coupez les pommes de terre pelées en rondelles de 3 mm.',
      'Faites chauffer la graisse de canard dans une poêle et faites rissoler les pommes de terre à feu vif pendant 20 minutes en les faisant sauter régulièrement.',
      'En fin de cuisson, ajoutez l’ail haché et le persil plat ciselé.',
      'Salez à la fleur de sel, poivrez et servez avec les cuisses de canard bien chaudes.'
    ],
    ingredients: [
      { ingredientId: 'ing-duck-leg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 4, unit: 'clove' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Périgord', 'Sarlat', 'Sud-Ouest', 'Plat', 'Canard', 'Terroir']
  },
  {
    id: 'rec-fr-boudin-noir-pommes-poelees',
    title: 'Boudin Noir Traditionnel Poêlé aux Pommes Fruits Fondantes (Black Pudding with Apples)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Boudin noir croustillant et fondant poêlé au beurre, accompagné de quartiers de pommes fruits compotées et dorées.',
    instructions: [
      'Épluchez et coupez les pommes en gros quartiers.',
      'Dans une poêle, faites fondre 25 g de beurre et faites dorer les pommes à feu moyen pendant 12 minutes jusqu’à ce qu’elles soient tendres et caramélisées. Réservez au chaud.',
      'Piquez le boudin noir à la fourchette pour éviter qu’il n’éclate.',
      'Faites fondre 15 g de beurre dans une autre poêle et cuisez le boudin noir à feu doux pendant 10 minutes en le retournant délicatement.',
      'Servez le boudin bien chaud entouré des quartiers de pommes fondantes et d’une purée maison.'
    ],
    ingredients: [
      { ingredientId: 'ing-sausage-toulouse', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-apple', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-brown-sugar', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Normandie', 'Bistrot', 'Plat', 'Tradition', 'Rapide']
  },
  {
    id: 'rec-fr-carbonnade-flamande-pain-epices',
    title: 'Carbonnade Flamande Traditionnelle à la Bière Brune et Pain d’Épices (Flemish Beef Stew)',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 150,
    difficulty: 'easy',
    description: 'Bœuf fondant mijoté dans une bière brune du Nord avec oignons caramélisés et tranches de pain d’épices tartinées de moutarde forte.',
    instructions: [
      'Coupez le paleron de bœuf en gros cubes.',
      'Faites revenir les lardons et oignons émincés dans le beurre jusqu’à caramélisation.',
      'Saisissez les morceaux de bœuf dans la cocotte.',
      'Saupoudrez de farine, mélangez 1 minute puis versez la bière brune.',
      'Ajoutez le thym, le laurier et la cassonade.',
      'Tartinez les tranches de pain d’épices de moutarde de Dijon et déposez-les sur le ragoût (elles vont fondre et lier la sauce).',
      'Couvrez et laissez mijoter à feu très doux pendant 2h30.',
      'Servez avec des frites maison.'
    ],
    ingredients: [
      { ingredientId: 'ing-beef-chuck', quantity: 1000, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-beer', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-gingerbread', quantity: 3, unit: 'slice' },
      { ingredientId: 'ing-dijon-mustard', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-brown-sugar', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Nord', 'Flandres', 'Plat', 'Bœuf', 'Mijoté', 'Bière']
  },
  {
    id: 'rec-fr-escalope-veau-normande',
    title: 'Escalopes de Veau à la Normande, Crème et Champignons (Veal Escalopes in Normandy Cream)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Fines escalopes de veau saisies au beurre demi-sel, nappées d’une réduction de cidre, champignons émincés et crème d’Isigny.',
    instructions: [
      'Faites fondre le beurre dans une poêle et faites dorer les escalopes de veau 2 minutes par face. Réservez au chaud.',
      'Dans la même poêle, faites sauter les champignons émincés et les échalotes pendant 5 minutes.',
      'Déglacez avec le cidre ou vin blanc sec et laissez réduire de moitié.',
      'Incorporez la crème fraîche épaisse, salez, poivrez et laissez épaissir 2 minutes.',
      'Remettez les escalopes de veau dans la sauce pour les réchauffer sans faire bouillir.',
      'Servez avec des tagliatelles fraîches ou du riz.'
    ],
    ingredients: [
      { ingredientId: 'ing-veal-escalope', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-mushroom', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-cider', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-salted-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Normandie', 'Plat', 'Veau', 'Rapide', 'Classique']
  },

  // --- PLATS VÉGÉTARIENS ET DU TERROIR ---
  {
    id: 'rec-fr-piperade-basquaise-oeufs',
    title: 'Pipérade Basque aux Tomates, Poivrons Doux et Œufs Brouillés (Basque Piperade with Eggs)',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Compotée basque colorée de piments doux, poivrons rouges, tomates bien mûres et ail, liée d’œufs battus onctueux et piment d’Espelette.',
    instructions: [
      'Émincez les poivrons rouges et verts, l’oignon et hachez l’ail.',
      'Faites revenir les oignons et poivrons dans l’huile d’olive pendant 10 minutes jusqu’à tendreté.',
      'Ajoutez les tomates pelées et concassées, le thym et 1 c. à café de piment d’Espelette.',
      'Laissez compoter à feu doux pendant 15 minutes jusqu’à évaporation de l’eau.',
      'Battez les œufs en omelette et versez-les sur la poêlée de légumes chaude.',
      'Remuez doucement à la spatule sur feu très doux pour obtenir une consistance crémeuse et fondante.',
      'Servez avec des tranches de jambon de Bayonne poêlées ou du pain grillé.'
    ],
    ingredients: [
      { ingredientId: 'ing-bell-pepper-red', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-bell-pepper-green', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-tomato', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Pays Basque', 'Plat', 'Végétarien', 'Œufs', 'Tradition']
  },
  {
    id: 'rec-fr-souffle-fromage-comte',
    title: 'Soufflé Traditionnel au Comté Affiné et Noix de Muscade (Comté Cheese Soufflé)',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    difficulty: 'hard',
    description: 'Le grand classique aérien : soufflé gonflé et doré à la sortie du four, au goût riche de comté 18 mois et texture mousseuse.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez généreusement un moule à soufflé avec des mouvements verticaux et chemisez-le de comté râpé.',
      'Préparez une béchamel épaisse : faites fondre 40 g de beurre, ajoutez 40 g de farine puis 250 ml de lait en fouettant. Salez, poivrez et muscadez.',
      'Hors du feu, incorporez les 4 jaunes d’œufs un à un, puis 120 g de comté râpé.',
      'Montez les 4 blancs d’œufs en neige très ferme avec une pincée de sel.',
      'Incorporez 1/3 des blancs au fouet pour détendre, puis les 2/3 restants délicatement à la maryse.',
      'Versez dans le moule jusqu’aux 3/4. Passez la pointe d’un couteau sur le pourtour intérieur.',
      'Enfournez immédiatement pendant 28 à 30 minutes sans jamais ouvrir la porte du four.',
      'Servez instantanément dès la sortie du four.'
    ],
    ingredients: [
      { ingredientId: 'ing-gruyere', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 250, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Gastronomie', 'Plat', 'Fromage', 'Spectaculaire', 'Végétarien']
  },

  // --- DESSERTS ET PÂTISSERIES SUPPLÉMENTAIRES ---
  {
    id: 'rec-fr-fondant-baulois',
    title: 'Gâteau Fondant Baulois au Chocolat et Caramel au Beurre Salé (Baulois Chocolate Cake)',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'La spécialité mythique de La Baule : gâteau au chocolat noir intense et caramel au beurre salé avec une fine croûte craquante et une texture ultra-fondante.',
    instructions: [
      'Préchauffez le four à 160°C. Beurrez et sucrez un moule à gâteau rond.',
      'Faites fondre le chocolat noir avec le beurre demi-sel et 2 cuillères de caramel au beurre salé au bain-marie.',
      'Fouettez les œufs entiers avec le sucre et la cassonade jusqu’à mélange mousseux.',
      'Ajoutez le mélange chocolat-caramel fondu tiédi.',
      'Incorporez la farine tamisée avec la fleur de sel.',
      'Versez la pâte dans le moule.',
      'Enfournez 28 à 30 minutes (le centre doit rester tremblotant).',
      'Laissez refroidir complètement avant de démouler. Meilleur dégusté le lendemain.'
    ],
    ingredients: [
      { ingredientId: 'ing-dark-chocolate', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 180, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-brown-sugar', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'La Baule', 'Bretagne', 'Dessert', 'Chocolat', 'Gourmandise']
  },
  {
    id: 'rec-fr-meringues-francaises-croquantes',
    title: 'Meringues Françaises Traditionnelles Blanches et Croquantes (French Crisp Meringues)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 90,
    difficulty: 'easy',
    description: 'Meringues aériennes, d’une blancheur immaculée, craquantes à l’extérieur et légèrement fondantes au cœur.',
    instructions: [
      'Préchauffez le four à 90°C.',
      'Montez les blancs d’œufs en neige avec une pincée de sel au batteur.',
      'Dès qu’ils moussent, ajoutez la moitié du sucre en poudre cuillère par cuillère en continuant de battre.',
      'Incorporez le reste de sucre et le sucre glace tamisé jusqu’à obtenir une meringue brillante qui forme un bec d’oiseau.',
      'Dressez des dômes ou nids à la poche à douille sur une plaque couverte de papier cuisson.',
      'Enfournez pendant 1h30 à 2h à 90°C (laisser la porte entrouverte avec une cuillère en bois pour évacuer l’humidité).',
      'Laissez refroidir dans le four éteint.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-powdered-sugar', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Dessert', 'Pâtisserie', 'Goûter', 'Facile']
  },
  {
    id: 'rec-fr-creme-caramel-grand-mere',
    title: 'Crème Renversée au Caramel Traditionnelle de Grand-Mère (Grandma’s Creme Caramel)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    difficulty: 'easy',
    description: 'Flan vanillé doux et fondant nappé de son jus de caramel ambré liquide qui coule au démoulage.',
    instructions: [
      'Dans une casserole, préparez un caramel ambré avec 100 g de sucre et 2 cuillères d’eau. Versez immédiatement au fond d’un grand moule à charlotte ou de ramequins.',
      'Portez le lait entier à ébullition avec la gousse de vanille fendue et grattée. Laissez infuser 10 minutes.',
      'Fouettez 4 œufs entiers et 2 jaunes avec 80 g de sucre sans faire trop mousser.',
      'Versez le lait vanillé tiède sur les œufs en fouettant doucement.',
      'Versez l’appareil filtré sur le caramel dans le moule.',
      'Placez dans un bain-marie d’eau chaude et enfournez à 150°C pendant 45 minutes.',
      'Laissez refroidir et placez au réfrigérateur au moins 4 heures.',
      'Passez la lame d’un couteau sur les bords et démoulez sur un plat creux pour recueillir le coulis de caramel.'
    ],
    ingredients: [
      { ingredientId: 'ing-milk', quantity: 600, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 180, unit: 'g' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Dessert', 'Bistrot', 'Enfance', 'Tradition']
  },
  {
    id: 'rec-fr-bugnes-lyonnaises-moelleuses',
    title: 'Bugnes Lyonnaises Traditionnelles Moelleuses à la Fleur d’Oranger (Lyon Beignets)',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    difficulty: 'medium',
    description: 'Beignets lyonnais de mardi gras dorés, gonflés et moelleux, parfumés à l’eau de fleur d’oranger et saupoudrés d’un nuage de sucre glace.',
    instructions: [
      'Dans un saladier, mélangez la farine, la levure chimique, le sucre et une pincée de sel.',
      'Ajoutez les œufs battus, le beurre ramolli et l’eau de fleur d’oranger. Pétrissez pour former une pâte souple.',
      'Laissez reposer la pâte 1 heure à température ambiante.',
      'Étalez la pâte sur 3 mm d’épaisseur.',
      'Découpez des losanges à la roulette cannelée et entaillez le centre pour y glisser une pointe du losange (nœud).',
      'Faites frire les bugnes dans une huile chaude à 175°C pendant 1 à 2 minutes par face jusqu’à couleur dorée.',
      'Égouttez sur papier absorbant et saupoudrez abondamment de sucre glace.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-orange-blossom', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-powdered-sugar', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Lyon', 'Carnaval', 'Dessert', 'Beignets', 'Tradition']
  }
];
