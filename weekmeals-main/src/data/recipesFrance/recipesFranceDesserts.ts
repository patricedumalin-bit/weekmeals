import { Recipe } from '../../types';

export const RECIPES_FRANCE_DESSERTS: Recipe[] = [
  {
    id: 'rec-fr-mousse-chocolat',
    title: 'Mousse au Chocolat Noir Traditionnelle Maison (Classic French Chocolate Mousse)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 5,
    difficulty: 'easy',
    description: 'La véritable mousse au chocolat à la française : aérienne, intense en cacao 70%, réalisée sans gélatine avec des blancs montés en neige très ferme et une pointe de fleur de sel.',
    instructions: [
      'Cassez le chocolat noir en morceaux et faites-le fondre au bain-marie (ou micro-ondes doux) avec le beurre doux en lissant à la spatule.',
      'Séparez les blancs des jaunes d’œufs.',
      'Incorporez les jaunes un à un dans le chocolat fondu tiédi en mélangeant vigoureusement.',
      'Dans un autre saladier propre, montez les 6 blancs d’œufs en neige ferme avec une pincée de sel.',
      'Incorporez un tiers des blancs énergiquement au fouet pour assouplir le chocolat.',
      'Incorporez délicatement le reste des blancs à la maryse en soulevant la masse de bas en haut pour ne pas les casser.',
      'Répartissez dans des verrines ou un grand compotier.',
      'Laissez reposer au réfrigérateur pendant au moins 4 heures (idéalement toute la nuit) avant de déguster.'
    ],
    ingredients: [
      { ingredientId: 'ing-dark-chocolate', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Dessert', 'Chocolat', 'Classique', 'Pâtisserie']
  },
  {
    id: 'rec-fr-creme-brulee-vanille',
    title: 'Crème Brûlée à la Vanille Bourbon (Bourbon Vanilla Crème Brûlée)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 50,
    difficulty: 'medium',
    description: 'Crème onctueuse et fondante infusée à la véritable gousse de vanille Bourbon, surmontée d’une fine croûte de cassonade caramélisée au chalumeau.',
    instructions: [
      'Préchauffez le four à 100°C (chaleur statique).',
      'Fendez la gousse de vanille en deux et grattez les graines.',
      'Dans une casserole, portez la crème liquide et le lait à frémissement avec la gousse et les graines de vanille. Couvrez et laissez infuser 15 minutes hors du feu.',
      'Dans un cul-de-poule, fouettez les jaunes d’œufs avec le sucre en poudre sans faire blanchir excessivement pour éviter les bulles d’air.',
      'Retirez la gousse de vanille et versez la crème tiède sur les jaunes en remuant doucement au fouet.',
      'Écumez la mousse en surface et versez la préparation dans 4 ramequins à crème brûlée plats.',
      'Enfournez pendant 50 minutes à 100°C (la crème doit être encore légèrement tremblotante au centre).',
      'Laissez refroidir à température ambiante puis placez au réfrigérateur pendant au moins 3 heures.',
      'Au moment de servir, saupoudrez une fine couche uniforme de cassonade sur chaque crème.',
      'Caramélisez au chalumeau de cuisine jusqu’à obtention d’une croûte dorée et cassante. Dégustez aussitôt.'
    ],
    ingredients: [
      { ingredientId: 'ing-heavy-cream', quantity: 400, unit: 'ml' },
      { ingredientId: 'ing-milk', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 5, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 70, unit: 'g' },
      { ingredientId: 'ing-brown-sugar', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Dessert', 'Gastronomie', 'Classique', 'Vanille']
  },
  {
    id: 'rec-fr-tarte-tatin-authentique',
    title: 'Tarte Tatin Authentique aux Pommes Caramélisées (Authentic Apple Tarte Tatin)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 45,
    difficulty: 'medium',
    description: 'La célèbre tarte renversée des sœurs Tatin : quartiers de pommes fondants et confits dans un caramel au beurre demi-sel, recouverts d’une pâte croustillante.',
    instructions: [
      'Épluchez 6 grosses pommes (variété Reine des Reinettes ou Golden), coupez-les en gros quartiers et évidez-les.',
      'Dans un moule à Tatin ou une poêle allant au four, faites fondre 100 g de sucre avec 60 g de beurre demi-sel à feu moyen pour réaliser un beau caramel ambré.',
      'Disposez les quartiers de pommes bien serrés verticalement dans le caramel chaud.',
      'Laissez cuire les pommes à feu doux pendant 15 minutes pour qu’elles s’imprègnent du caramel et commencent à confire.',
      'Retirez du feu et recouvrez les pommes avec le disque de pâte feuilletée ou brisée en rentrant les bords vers l’intérieur du moule.',
      'Piquez la pâte de quelques coups de couteau pour laisser la vapeur s’échapper.',
      'Enfournez à 190°C pendant 30 minutes jusqu’à ce que la pâte soit bien dorée et croustillante.',
      'Laissez tiédir 10 minutes, puis démoulez d’un geste vif et assuré en retournant la tarte sur un plat de service.',
      'Servez tiède avec une quenelle de crème fraîche épaisse d’Isigny ou une boule de glace vanille.'
    ],
    ingredients: [
      { ingredientId: 'ing-apple', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-puff-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-sugar', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 70, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' }
    ],
    tags: ['French', 'France', 'Sologne', 'Dessert', 'Tarte', 'Pommes', 'Tradition']
  },
  {
    id: 'rec-fr-crepes-suzette-grand-marnier',
    title: 'Crêpes Suzette Flambées au Grand Marnier et Beurre d’Orange (Crepes Suzette)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    difficulty: 'medium',
    description: 'Crêpes fines réchauffées dans un beurre Suzette parfumé au jus d’orange frais et zestes, flambées au Grand Marnier devant les convives.',
    instructions: [
      'Préparez des crêpes fines traditionnelles et pliez-les en quatre en éventail (triangles).',
      'Préparez le beurre Suzette : dans une grande poêle, faites fondre le beurre avec le sucre en poudre.',
      'Ajoutez les zestes râpés d’une orange bio et le jus pressé de 2 oranges.',
      'Laissez réduire à feu moyen 3 minutes jusqu’à obtention d’un sirop onctueux.',
      'Déposez les crêpes pliées dans la poêle pour les imprégner du beurre d’orange sur les deux faces.',
      'Versez le Grand Marnier ou Cognac tiédi, approchez une allumette et faites flamber délicatement en inclinant la poêle.',
      'Servez immédiatement dès l’extinction des flammes.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-orange', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-grand-marnier', quantity: 60, unit: 'ml' }
    ],
    tags: ['French', 'France', 'Dessert', 'Crêpe', 'Gastronomie', 'Flambé', 'Classique']
  },
  {
    id: 'rec-fr-ile-flottante-creme-anglaise',
    title: 'Île Flottante Traditionnelle, Crème Anglaise et Caramel Filé (Floating Island)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    difficulty: 'medium',
    description: 'Blancs en neige légers comme un nuage pochés au lait vanillé, flottant sur une crème anglaise onctueuse, couronnés de caramel croquant et d’amandes effilées grillées.',
    instructions: [
      'Préparez la crème anglaise : faites chauffer le lait avec la gousse de vanille fendue et grattée. Fouettez 4 jaunes d’œufs avec 60 g de sucre, puis versez le lait chaud dessus. Reversez dans la casserole et cuisez à la nappe à feu doux (83°C) sans jamais bouillir. Laissez refroidir au frais.',
      'Montez les 4 blancs d’œufs en neige très ferme avec une pincée de sel, puis incorporez 40 g de sucre en continuant de battre pour les serrer.',
      'Formez des grosses quenelles de blancs d’œufs à la cuillère et pochez-les 1 minute par face dans du lait frémissant (ou 30 secondes au micro-ondes). Égouttez sur du papier absorbant.',
      'Dans une petite casserole, réalisez un caramel doré avec 50 g de sucre et 1 cuillère d’eau.',
      'Dans des coupes individuelles, versez la crème anglaise bien froide, déposez une île de blancs pochés, nappez de filets de caramel filé et parsemez d’amandes effilées grillées.'
    ],
    ingredients: [
      { ingredientId: 'ing-milk', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-almonds-flaked', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Bistrot', 'Dessert', 'Gastronomie', 'Classique']
  },
  {
    id: 'rec-fr-fondant-chocolat-coeur-coulant',
    title: 'Moelleux au Chocolat Cœur Coulant (Molten Chocolate Lava Cake)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Petits gâteaux individuels au chocolat noir intense cuits à la minute avec une croûte délicate et un cœur riche délicieusement coulant.',
    instructions: [
      'Préchauffez le four à 200°C. Beurrez et farinez 4 ramequins individuels.',
      'Faites fondre le chocolat noir avec le beurre au bain-marie.',
      'Dans un saladier, fouettez les œufs entiers avec le sucre jusqu’à ce que le mélange blanchisse et mousse légèrement.',
      'Ajoutez la farine tamisée puis le chocolat fondu tiédi. Mélangez doucement.',
      'Répartissez la pâte dans les ramequins au 3/4 de la hauteur.',
      'Enfournez exactement 9 à 10 minutes (le pourtour doit être cuit et le centre encore tremblotant).',
      'Démoulez délicatement sur assiette et saupoudrez d’un voile de sucre glace. Servez aussitôt.'
    ],
    ingredients: [
      { ingredientId: 'ing-dark-chocolate', quantity: 160, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 70, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-powdered-sugar', quantity: 10, unit: 'g' }
    ],
    tags: ['French', 'France', 'Dessert', 'Chocolat', 'Rapide', 'Gourmand']
  },
  {
    id: 'rec-fr-clafoutis-cerises-traditionnel',
    title: 'Clafoutis Limousin Traditionnel aux Cerises Noires (Traditional Cherry Clafoutis)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Le véritable clafoutis du Limousin : cerises noires juteuses entières (avec noyaux pour préserver toute leur saveur amandée) enrobées d’une pâte à flan vanillée et beurrée.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez généreusement un plat à gratin en céramique et saupoudrez-le d’une cuillère de sucre.',
      'Lavez et équeutez les cerises (gardez les noyaux selon la tradition). Disposez-les au fond du plat.',
      'Dans un saladier, battez les 4 œufs avec le sucre et le sucre vanillé.',
      'Ajoutez la farine et une pincée de sel, puis délayez progressivement avec le lait entier et le beurre fondu pour obtenir une pâte lisse sans grumeaux.',
      'Versez la pâte sur les cerises.',
      'Enfournez pour 40 minutes jusqu’à ce que le clafoutis soit doré et ferme au toucher.',
      'Saupoudrez de sucre glace à la sortie du four et dégustez tiède ou froid.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-milk', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-powdered-sugar', quantity: 10, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Limousin', 'Dessert', 'Fruits', 'Tradition', 'Facile']
  },
  {
    id: 'rec-fr-caneles-bordeaux-rhum-vanille',
    title: 'Canelés Bordelais Traditionnels au Rhum et Vanille (Bordeaux Cannelés)',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 55,
    difficulty: 'medium',
    description: 'Petits gâteaux cannelés emblématiques de Bordeaux à la croûte caramélisée croustillante et au cœur moelleux et alvéolé infusé au rhum ambré et vanille Bourbon.',
    instructions: [
      'La veille : faites chauffer le lait avec le beurre et la gousse de vanille fendue et grattée.',
      'Dans un saladier, mélangez la farine et le sucre en poudre. Ajoutez les 2 œufs entiers et les 2 jaunes, puis incorporez le lait vanillé tiédi en fouettant doucement.',
      'Ajoutez le rhum ambré, mélangez bien, filmez et placez impérativement au réfrigérateur pendant 24 heures (étape clé).',
      'Le lendemain, préchauffez le four à 220°C. Beurrez généreusement des moules à canelés en cuivre ou silicone.',
      'Mélangez doucement la pâte froide et remplissez les moules aux 3/4.',
      'Enfournez 15 minutes à 220°C pour saisir la croûte, puis baissez la température à 180°C et poursuivez la cuisson 45 minutes.',
      'Démoulez les canelés encore chauds sur une grille et laissez refroidir pour que la croûte durcisse et devienne croustillante.'
    ],
    ingredients: [
      { ingredientId: 'ing-milk', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-sugar', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-rum', quantity: 50, unit: 'ml' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Bordeaux', 'Dessert', 'Pâtisserie', 'Terroir']
  },
  {
    id: 'rec-fr-madeleines-citron-bosse',
    title: 'Madeleines Pur Beurre Traditionnelles au Zeste de Citron (French Butter Madeleines)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Les véritables madeleines moelleuses et parfumées au zeste de citron avec leur célèbre bosse obtenue grâce au choc thermique.',
    instructions: [
      'Faites fondre le beurre et laissez-le tiédir.',
      'Dans un saladier, fouettez les œufs avec le sucre et le miel pendant 3 minutes jusqu’à ce que le mélange blanchisse.',
      'Ajoutez le zeste finement râpé d’un citron bio.',
      'Tamisez ensemble la farine et la levure chimique, puis incorporez-les au mélange.',
      'Versez le beurre fondu tiédi et mélangez délicatement jusqu’à pâte bien lisse.',
      'Placez la pâte au réfrigérateur pendant au moins 1 heure (ou toute la nuit) : c’est le choc thermique qui crée la belle bosse.',
      'Préchauffez le four à 210°C. Beurrez et farinez les alvéoles d’un moule à madeleines.',
      'Déposez une cuillerée de pâte froide dans chaque alvéole sans étaler.',
      'Enfournez 4 minutes à 210°C (la bosse commence à se former), puis baissez à 180°C et cuisez 5 à 6 minutes supplémentaires jusqu’à coloration dorée.',
      'Démoulez immédiatement et laissez refroidir sur une grille.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-honey', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Lorraine', 'Dessert', 'Goûter', 'Pâtisserie', 'Classique']
  },
  {
    id: 'rec-fr-financiers-amandes-beurre-noisette',
    title: 'Financiers aux Amandes et Beurre Noisette (Almond Financiers)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Petits lingots dorés moelleux à souhait, parfumés à la poudre d’amandes et au beurre noisette doré.',
    instructions: [
      'Préparez le beurre noisette : faites fondre le beurre dans une casserole à feu moyen jusqu’à ce qu’il mousse, prenne une jolie couleur ambrée et dégage un parfum de noisette grillée. Filtrez et laissez tiédir.',
      'Dans un saladier, mélangez la poudre d’amandes, le sucre glace et la farine tamisée.',
      'Ajoutez les blancs d’œufs non montés et fouettez doucement pour obtenir une pâte homogène.',
      'Incorporez le beurre noisette tiédi en filet en mélangeant.',
      'Versez dans des moules à financiers beurrés.',
      'Enfournez à 190°C pendant 12 à 15 minutes jusqu’à ce que les bords soient bien dorés.',
      'Laissez tiédir avant de démouler.'
    ],
    ingredients: [
      { ingredientId: 'ing-butter', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-almond-flour', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-powdered-sugar', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Dessert', 'Pâtisserie', 'Goûter', 'Amandes']
  },
  {
    id: 'rec-fr-tarte-citron-meringuee',
    title: 'Tarte au Citron Meringuée à la Française (French Lemon Meringue Tart)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 35,
    cookTimeMinutes: 25,
    difficulty: 'medium',
    description: 'Fond de tarte sablée croustillant garni d’un crémeux au citron jaune acidulé et surmonté d’une meringue italienne vaporeuse dorée au chalumeau.',
    instructions: [
      'Foncez un moule avec la pâte sablée, piquez le fond et cuisez à blanc à 180°C pendant 20 minutes.',
      'Préparez la crème de citron (lemon curd) : fouettez le jus de 3 citrons et leurs zestes avec le sucre, 3 œufs et la fécule de maïs. Faites épaissir à feu doux en fouettant sans arrêt. Hors du feu, incorporez 80 g de beurre coupé en dés.',
      'Versez le crémeux au citron sur le fond de tarte cuit et laissez refroidir au réfrigérateur.',
      'Montez les blancs d’œufs en neige avec le sucre glace pour obtenir une meringue brillante et ferme.',
      'Dressez la meringue à la poche à douille sur la tarte et dorez-la au chalumeau de cuisine.',
      'Réservez au frais jusqu’au service.'
    ],
    ingredients: [
      { ingredientId: 'ing-sweet-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-lemon', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-egg', quantity: 5, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-cornstarch', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-powdered-sugar', quantity: 50, unit: 'g' }
    ],
    tags: ['French', 'France', 'Dessert', 'Pâtisserie', 'Tarte', 'Citron', 'Classique']
  },
  {
    id: 'rec-fr-riz-au-lait-caramel-vanille',
    title: 'Riz au Lait Crémeux de Grand-Mère à la Vanille et Caramel Beurre Salé (Grandma’s Rice Pudding)',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 10,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Riz rond lentement compoté dans du lait entier infusé à la vanille Bourbon, fondant et onctueux, servi avec un coulis de caramel au beurre salé.',
    instructions: [
      'Rincez le riz rond et faites-le blanchir 3 minutes dans de l’eau bouillante. Égouttez.',
      'Dans une casserole, portez le lait entier à frémissement avec la gousse de vanille fendue et grattée.',
      'Versez le riz blanchi dans le lait chaud et baissez le feu au minimum.',
      'Laissez cuire tout doucement pendant 35 minutes en remuant très régulièrement à la cuillère en bois jusqu’à ce que le riz ait absorbé la quasi-totalité du lait et devienne crémeux.',
      'Ajoutez le sucre et une noisette de beurre demi-sel 5 minutes avant la fin de cuisson.',
      'Versez dans des ramequins et nappez d’un filet de caramel au beurre salé tiède.'
    ],
    ingredients: [
      { ingredientId: 'ing-rice', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 1000, unit: 'ml' },
      { ingredientId: 'ing-sugar', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salted-butter', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Dessert', 'Tradition', 'Enfance', 'Vanille']
  }
];
