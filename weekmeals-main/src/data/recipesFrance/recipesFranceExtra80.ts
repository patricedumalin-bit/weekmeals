import { Recipe } from '../../types';

export const RECIPES_FRANCE_EXTRA_80: Recipe[] = [
  // --- NOUVELLES ENTRÉES DU TERROIR ---
  {
    id: 'rec-fr-feuilletes-escargots-persillade',
    title: 'Feuilletés Croustillants aux Escargots de Bourgogne et Beurre Persillé',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 18,
    difficulty: 'medium',
    description: 'Bouchées de pâte feuilletée garnies d’escargots de Bourgogne étuvés au vin blanc et généreusement nappés de beurre d’ail et persil.',
    instructions: [
      'Découpez 8 disques de pâte feuilletée et dorez-les au jaune d’œuf.',
      'Faites-les cuire à 190°C pendant 15 minutes jusqu’à ce qu’ils soient gonflés et dorés.',
      'Dans une poêle, faites revenir les escargots dans du beurre d’ail et persil avec 2 cuillères de vin blanc.',
      'Ouvrez les chapeaux des feuilletés et déposez 3 escargots persillés chauds à l’intérieur de chacun.',
      'Servez immédiatement à la sortie du four.'
    ],
    ingredients: [
      { ingredientId: 'ing-puff-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-butter', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-shallot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-white-wine', quantity: 40, unit: 'ml' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bourgogne', 'Entrée', 'Feuilleté', 'Gastronomie']
  },
  {
    id: 'rec-fr-veloute-dubarry-chou-fleur',
    title: 'Velouté Dubarry Traditionnel au Chou-Fleur et Crème Fouettée',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Le potage historique de la Comtesse du Barry : chou-fleur cuit dans un bouillon de volaille au blanc de poireau, mixé avec crème et jaune d’œuf.',
    instructions: [
      'Détaillez le chou-fleur en fleurettes en réservant quelques petites sommités pour le décor.',
      'Faites suer le blanc de poireau émincé dans le beurre 3 minutes.',
      'Ajoutez le chou-fleur et la pomme de terre coupée en dés.',
      'Mouillez avec le bouillon de volaille et le lait. Laissez cuire 20 minutes.',
      'Mixez longuement pour obtenir un velouté très fin et blanc.',
      'Liez avec la crème fraîche et assaisonnez de sel et muscade.'
    ],
    ingredients: [
      { ingredientId: 'ing-cauliflower', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-leek', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-chicken-broth', quantity: 600, unit: 'ml' },
      { ingredientId: 'ing-milk', quantity: 200, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Versailles', 'Entrée', 'Soupe', 'Gastronomie', 'Classique']
  },
  {
    id: 'rec-fr-salade-lentilles-saucisse-morteau',
    title: 'Salade Tiède de Lentilles Vertes du Puy à la Saucisse de Morteau',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Lentilles vertes AOP mijotées au bouquet garni, servies tièdes avec des rondelles de saucisse fumée de Morteau et vinaigrette échalote-moutarde.',
    instructions: [
      'Rincez les lentilles du Puy et déposez-les dans une casserole d’eau froide avec carotte, oignon piqué, thym et laurier. Cuisez 25 minutes.',
      'Faites pocher la saucisse fumée dans l’eau frémissante 25 minutes, puis coupez-la en rondelles.',
      'Égouttez les lentilles encore chaudes.',
      'Préparez la vinaigrette tiède avec moutarde à l’ancienne, vinaigre de vin, huile de tournesol, échalotes ciselées et persil.',
      'Mélangez les lentilles avec la sauce et dressez avec les rondelles de saucisse fumante.'
    ],
    ingredients: [
      { ingredientId: 'ing-lentils-green', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-sausage-toulouse', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-carrot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' }
    ],
    tags: ['French', 'France', 'Auvergne', 'Franche-Comté', 'Entrée', 'Bistrot', 'Terroir']
  },
  {
    id: 'rec-fr-terrine-courgettes-chevre',
    title: 'Terrine Fraîche de Courgettes au Chèvre Frais et Menthe',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Terrine estivale fondante et légère de lamelles de courgettes poêlées à l’huile d’olive, chèvre frais, œufs et herbes fraîches.',
    instructions: [
      'Râpez ou coupez les courgettes en rondelles et faites-les sauter 8 minutes à l’huile d’olive avec l’ail.',
      'Dans un bol, écrasez le fromage de chèvre avec les œufs, la crème, la menthe ciselée, sel et poivre.',
      'Incorporez les courgettes tiédies.',
      'Versez dans un moule à cake tapissé de papier sulfurisé.',
      'Enfournez à 180°C pendant 40 minutes.',
      'Laissez refroidir complètement au réfrigérateur pendant 4 heures avant de trancher.',
      'Servez avec un coulis de tomates fraîches.'
    ],
    ingredients: [
      { ingredientId: 'ing-zucchini', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-goat-cheese', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-mint', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-garlic', quantity: 1, unit: 'clove' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Provence', 'Entrée', 'Été', 'Végétarien', 'Frais']
  },

  // --- NOUVEAUX PLATS DU TERROIR & VIANDES ---
  {
    id: 'rec-fr-navarin-agneau-printanier',
    title: 'Navarin d’Agneau Traditionnel aux Petits Légumes Printaniers',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 75,
    difficulty: 'medium',
    description: 'Ragoût printanier d’épaule d’agneau dorée au beurre, mijotée avec navets nouveaux caramélisés, carottes fanes, petits pois et pommes de terre nouvelles.',
    instructions: [
      'Faites dorer les morceaux d’agneau dans l’huile et le beurre dans une cocotte.',
      'Saupoudrez de sucre pour caraméliser légèrement la viande, puis singez avec la farine.',
      'Ajoutez l’ail écrasé, le concentré de tomate et mouillez avec le bouillon et vin blanc.',
      'Ajoutez le bouquet garni et laissez mijoter 45 minutes.',
      'Ajoutez les navets, carottes, oignons nouveaux et pommes de terre.',
      'Poursuivez la cuisson 25 minutes.',
      'Ajoutez les petits pois frais 5 minutes avant la fin.',
      'Servez bien chaud avec du persil frais.'
    ],
    ingredients: [
      { ingredientId: 'ing-lamb-shank', quantity: 1000, unit: 'g' },
      { ingredientId: 'ing-turnip', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-carrot', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-green-peas', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-tomato-paste', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-flour', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-chicken-broth', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-white-wine', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Printemps', 'Plat', 'Agneau', 'Tradition', 'Mijoté']
  },
  {
    id: 'rec-fr-tripes-mode-caen',
    title: 'Tripes à la Mode de Caen Traditionnelles au Calvados et Cidre',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 300,
    difficulty: 'hard',
    description: 'Spécialité séculaire normande cuite longuement dans une cocotte scellée avec pied de bœuf, carottes, oignons, cidre fermier et calvados.',
    instructions: [
      'Coupez les tripes en carrés de 4 cm.',
      'Dans une grande marmite ou cocotte en terre, disposez des lits alternés de carottes, oignons émincés, poireaux, tripes et pied de veau/bœuf.',
      'Ajoutez l’ail, le bouquet garni, les clous de girofle.',
      'Versez le cidre brut de Normandie et le calvados.',
      'Lutez le couvercle avec une pâte de farine et eau pour rendre hermétique.',
      'Faites cuire au four à 130°C pendant 5 heures.',
      'Servez bouillant dans des écuelles chaudes avec des pommes de terre vapeur.'
    ],
    ingredients: [
      { ingredientId: 'ing-beef-chuck', quantity: 1000, unit: 'g' },
      { ingredientId: 'ing-cider', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-cognac', quantity: 50, unit: 'ml' },
      { ingredientId: 'ing-carrot', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-leek', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 4, unit: 'clove' },
      { ingredientId: 'ing-thyme', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-bay-leaf', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Normandie', 'Caen', 'Plat', 'Terroir', 'Tradition']
  },
  {
    id: 'rec-fr-boudin-blanc-truffes-pommes',
    title: 'Boudin Blanc Poêlé aux Pommes Caramélisées et Échalotes',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Boudin blanc délicat doré au beurre mousseux, accompagné de pommes compotées au cidre et réduction d’échalotes.',
    instructions: [
      'Retirez délicatement la peau du boudin blanc si nécessaire.',
      'Coupez les pommes en quartiers.',
      'Faites fondre le beurre dans une poêle et faites dorer le boudin blanc 10 minutes à feu doux en le retournant souvent.',
      'Dans une autre poêle, faites caraméliser les quartiers de pommes au beurre et cassonade pendant 12 minutes.',
      'Dressez le boudin tranché en biseau sur un lit de pommes caramélisées fondantes.'
    ],
    ingredients: [
      { ingredientId: 'ing-veal-escalope', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-apple', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-brown-sugar', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-cider', quantity: 50, unit: 'ml' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Rethel', 'Ardennes', 'Plat', 'Fêtes', 'Rapide']
  },
  {
    id: 'rec-fr-civets-canard-cahors',
    title: 'Civet de Canard au Vin Noir de Cahors et Champignons des Bois',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 120,
    difficulty: 'medium',
    description: 'Cuisses de canard fermier marinées au vin rouge de Cahors, mijotées avec lardons, oignons grelots, carottes et champignons de forêt.',
    instructions: [
      'Faites mariner le canard toute une nuit dans le vin rouge de Cahors avec carottes, oignons, ail et bouquet garni.',
      'Égouttez et séchez la viande.',
      'Faites dorer le canard dans une cocotte avec les lardons.',
      'Singez avec la farine, versez la marinade filtrée et le bouillon.',
      'Laissez mijoter à feu doux pendant 2 heures.',
      'Faites sauter les champignons et oignons à part et ajoutez-les 20 minutes avant la fin.',
      'Servez avec des tagliatelles ou une écrasée de pommes de terre.'
    ],
    ingredients: [
      { ingredientId: 'ing-duck-leg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-red-wine', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-mushroom', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-flour', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Sud-Ouest', 'Cahors', 'Plat', 'Canard', 'Mijoté']
  },

  // --- NOUVEAUX POISSONS & FRUITS DE MER ---
  {
    id: 'rec-fr-mouclade-charentaise',
    title: 'Mouclade Charentaise Traditionnelle au Vin Blanc, Curry Doux et Crème',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Moules de bouchot ouvertes au vin blanc sec et échalotes, nappées d’une sauce onctueuse au beurre, pointe de curry doux et crème fraîche.',
    instructions: [
      'Ouvrez les moules dans une marmite avec le vin blanc sec et l’échalote à feu vif pendant 5 minutes. Égouttez en filtrant le jus.',
      'Retirez la demi-coquille supérieure de chaque moule et disposez-les sur un grand plat chaud.',
      'Dans une casserole, faites réduire le jus de cuisson des moules de moitié.',
      'Incorporez le curry doux, le beurre en dés et la crème fraîche en fouettant.',
      'Liez avec un jaune d’œuf hors du feu sans faire bouillir.',
      'Nappez généreusement chaque moule avec cette sauce chaude et parsemez de persil.'
    ],
    ingredients: [
      { ingredientId: 'ing-mussels', quantity: 1500, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 200, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-curry-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' }
    ],
    tags: ['French', 'France', 'Charente', 'La Rochelle', 'Plat', 'Fruits de mer', 'Tradition']
  },
  {
    id: 'rec-fr-tielle-setoise-poulpe',
    title: 'Tielle Sétoise Traditionnelle au Poulpe Épicé et Sauce Tomate',
    categoryId: 'rcat-seafood',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 35,
    difficulty: 'medium',
    description: 'La célèbre tourte orangée de Sète : pâte à pain dorée renfermant une garniture savoureuse de poulpe/calamar mijoté aux tomates, ail et piment doux.',
    instructions: [
      'Faites cuire le calamar/poulpe à l’eau bouillante 20 minutes puis coupez-le en petits morceaux.',
      'Dans une sauteuse, faites revenir l’oignon et l’ail dans l’huile d’olive.',
      'Ajoutez les tomates concassées, le concentré de tomate, le vin blanc, le thym et le piment.',
      'Ajoutez les morceaux de calamar et laissez mijoter 20 minutes jusqu’à sauce très épaisse.',
      'Foncez un moule à tarte avec la moitié de la pâte à pizza/pain étalée.',
      'Versez la garniture tiédie et recouvrez avec le second disque de pâte.',
      'Badigeonnez le dessus d’huile d’olive mélangée à du concentré de tomate (pour la couleur rougeoyante).',
      'Enfournez à 200°C pendant 30 minutes. Dégustez tiède.'
    ],
    ingredients: [
      { ingredientId: 'ing-pizza-dough', quantity: 2, unit: 'pack' },
      { ingredientId: 'ing-tomato', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-tomato-paste', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-white-wine', quantity: 60, unit: 'ml' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Sète', 'Méditerranée', 'Plat', 'Fruits de mer', 'Tourte']
  },

  // --- NOUVEAUX DESSERTS & GÂTEAUX DU TERROIR ---
  {
    id: 'rec-fr-gateau-nantais-rhum',
    title: 'Gâteau Nantais Traditionnel aux Amandes et Glaçage au Rhum des Antilles',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Gâteau moelleux des marins de Nantes à la poudre d’amandes et beurre demi-sel, imbibé de rhum ambré et nappé d’un glaçage blanc brillant.',
    instructions: [
      'Fouettez le beurre demi-sel pommade avec le sucre jusqu’à texture crémeuse.',
      'Ajoutez la poudre d’amandes, puis les 3 œufs un à un.',
      'Incorporez la farine tamisée et 3 cuillères de rhum ambré.',
      'Versez dans un moule à manqué beurré.',
      'Enfournez à 170°C pendant 40 minutes.',
      'Démoulez tiède et imbibez la surface de 2 cuillères de rhum.',
      'Préparez le glaçage en mélangeant le sucre glace avec 1 cuillère de rhum et un filet d’eau.',
      'Nappez le gâteau froid et laissez figer.'
    ],
    ingredients: [
      { ingredientId: 'ing-almond-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 130, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-rum', quantity: 60, unit: 'ml' },
      { ingredientId: 'ing-powdered-sugar', quantity: 80, unit: 'g' }
    ],
    tags: ['French', 'France', 'Nantes', 'Bretagne', 'Dessert', 'Gâteau', 'Rhum', 'Amandes']
  },
  {
    id: 'rec-fr-tarte-myrtilles-vosges',
    title: 'Tarte aux Myrtilles Sauvages Traditionnelle des Vosges',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'La tarte des fermes-auberges vosgiennes : pâte sablée croquante recouverte d’un lit de poudre d’amandes et de myrtilles sauvages juteuses.',
    instructions: [
      'Foncez un moule à tarte avec la pâte sablée.',
      'Saupoudrez le fond de poudre d’amandes (pour absorber le jus des baies).',
      'Disposez généreusement les myrtilles sauvages.',
      'Saupoudrez de sucre en poudre.',
      'Enfournez à 190°C pendant 30 minutes jusqu’à ce que le jus bouillonne et la pâte soit dorée.',
      'Laissez tiédir et saupoudrez d’un voile de sucre glace.'
    ],
    ingredients: [
      { ingredientId: 'ing-sweet-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-blueberries', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 70, unit: 'g' },
      { ingredientId: 'ing-almond-flour', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-powdered-sugar', quantity: 10, unit: 'g' }
    ],
    tags: ['French', 'France', 'Vosges', 'Alsace', 'Dessert', 'Tarte', 'Fruits', 'Montagne']
  },
  {
    id: 'rec-fr-pain-epices-alsacien-miel',
    title: 'Pain d’Épices Alsacien Traditionnel Pur Miel et Épices Douces',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 50,
    difficulty: 'easy',
    description: 'Pain d’épices moelleux cuit au miel de fleurs chaud, cannelle de Ceylan, muscade, gingembre et zeste d’orange confit.',
    instructions: [
      'Faites tiédir le miel dans une casserole à feu doux.',
      'Dans un saladier, mélangez les farines de seigle et de blé, la levure chimique et le mélange d’épices.',
      'Versez le miel tiède sur les farines en remuant à la spatule.',
      'Ajoutez le lait tiède et l’œuf battu pour obtenir une pâte lisse et souple.',
      'Incorporez les écorces d’orange confites coupées en petits dés.',
      'Versez dans un moule à cake beurré.',
      'Enfournez à 160°C pendant 50 minutes.',
      'Enveloppez dans du papier aluminium à la sortie du four : il deviendra encore plus moelleux au bout de 24h.'
    ],
    ingredients: [
      { ingredientId: 'ing-honey', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-cinnamon', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-nutmeg', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-butter', quantity: 20, unit: 'g' }
    ],
    tags: ['French', 'France', 'Alsace', 'Dessert', 'Noël', 'Miel', 'Tradition']
  }
];
