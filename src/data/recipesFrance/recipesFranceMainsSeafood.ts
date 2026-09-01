import { Recipe } from '../../types';

export const RECIPES_FRANCE_MAINS_SEAFOOD: Recipe[] = [
  {
    id: 'rec-fr-sole-meuniere',
    title: 'Sole Meunière Traditionnelle au Beurre Noisette (Classic Sole Meunière)',
    categoryId: 'rcat-seafood',
    servings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    difficulty: 'medium',
    description: 'La quintessence de la cuisine bourgeoise : sole entière farinée, dorée à la perfection au beurre mousseux, arrosée de beurre noisette citronné et persil plat.',
    instructions: [
      'Passez les soles dans une assiette de farine pour les enrober d’un voile fin, puis tapotez pour retirer l’excédent.',
      'Dans une grande poêle à poisson, faites fondre 30 g de beurre avec un filet d’huile à feu moyen-vif.',
      'Déposez les soles et faites-les cuire 4 à 5 minutes du premier côté jusqu’à belle coloration blonde.',
      'Retournez délicatement et faites cuire 3 à 4 minutes sur l’autre face. Déposez-les sur un plat chaud.',
      'Jetez le gras de cuisson, essuyez la poêle et faites mousser 40 g de beurre frais jusqu’à ce qu’il prenne une couleur noisette et dégage une odeur de noisette grillée.',
      'Ajoutez le jus de citron (ça crépite !), salez, poivrez et versez immédiatement ce beurre noisette fumant sur les soles.',
      'Parsemez généreusement de persil plat haché et servez avec des pommes de terre vapeur.'
    ],
    ingredients: [
      { ingredientId: 'ing-sole-fillet', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 70, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-potato', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Poisson', 'Plat', 'Gastronomie', 'Classique']
  },
  {
    id: 'rec-fr-moules-mariniere',
    title: 'Moules Marinières au Vin Blanc et Échalotes (French Mussels Marinière)',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Moules de bouchot fraîches ouvertes à feu vif dans un jus savoureux de vin blanc sec, beurre doux, échalotes ciselées et persil frais.',
    instructions: [
      'Grattez et rincez soigneusement les moules à l’eau froide. Jetez celles qui sont cassées ou restent ouvertes.',
      'Dans une grande marmite ou cocotte, faites fondre le beurre et faites suer les échalotes émincées et l’ail haché pendant 3 minutes sans coloration.',
      'Versez le vin blanc sec, ajoutez le thym, le laurier et du poivre noir.',
      'Portez à vive ébullition, puis jetez toutes les moules d’un coup dans la marmite.',
      'Couvrez immédiatement et laissez cuire 5 à 6 minutes à feu vif en secouant la cocotte 2 ou 3 fois pour répartir la chaleur.',
      'Dès que toutes les moules sont bien ouvertes, retirez du feu.',
      'Ajoutez le persil plat frais haché et servez immédiatement dans de grands bols avec leur jus parfumé et des frites maison.'
    ],
    ingredients: [
      { ingredientId: 'ing-mussels', quantity: 1500, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 250, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-bay-leaf', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Normandie', 'Plat', 'Fruits de mer', 'Rapide']
  },
  {
    id: 'rec-fr-moules-creme-normande',
    title: 'Moules à la Normande à la Crème et au Cidre (Normandy Cream & Cider Mussels)',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 12,
    difficulty: 'easy',
    description: 'Moules de bouchot cuisinées au cidre brut de Normandie, liées d’une onctueuse crème fraîche épaisse d’Isigny et de persil.',
    instructions: [
      'Nettoyez et ébarbez les moules fraîches.',
      'Dans une grande marmite, faites suer les échalotes émincées dans le beurre demi-sel.',
      'Mouillez avec le cidre brut de Normandie et portez à ébullition.',
      'Versez les moules, couvrez et cuisez à feu vif pendant 5 minutes en remuant.',
      'Retirez les moules à l’écumoire et gardez-les au chaud.',
      'Faites réduire le jus de cuisson de moitié (3 minutes), puis incorporez la crème fraîche épaisse.',
      'Laissez bouillonner 2 minutes, rectifiez l’assaisonnement, remettez les moules et parsemez de persil.',
      'Dégustez avec du pain de campagne au levain.'
    ],
    ingredients: [
      { ingredientId: 'ing-mussels', quantity: 1500, unit: 'g' },
      { ingredientId: 'ing-cider', quantity: 250, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 5, unit: 'tbsp' },
      { ingredientId: 'ing-shallot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-salted-butter', quantity: 35, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Normandie', 'Plat', 'Fruits de mer', 'Gourmet']
  },
  {
    id: 'rec-fr-saint-jacques-beurre-blanc',
    title: 'Noix de Saint-Jacques Poêlées au Beurre Blanc Nantais (Scallops with Beurre Blanc)',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    difficulty: 'medium',
    description: 'Noix de Saint-Jacques fraîches snackées 1 minute à feu vif, nappées du mythique beurre blanc nantais émulsionné au vin blanc et échalotes.',
    instructions: [
      'Préparez le beurre blanc : dans une petite casserole à fond épais, faites réduire à sec les échalotes très finement ciselées avec le vin blanc sec et le vinaigre de vin blanc (il doit rester 1 cuillère de liquide).',
      'Baissez le feu au minimum (ou au bain-marie) et incorporez le beurre froid coupé en dés parcelle par parcelle en fouettant sans arrêt pour créer une émulsion veloutée.',
      'Assaisonnez de sel fin et d’une pointe de poivre blanc. Maintenez au chaud sans faire bouillir.',
      'Épongez soigneusement les noix de Saint-Jacques avec du papier absorbant.',
      'Faites chauffer une poêle à feu très vif avec un filet d’huile neutre et une noisette de beurre.',
      'Snackez les Saint-Jacques 1 minute par face jusqu’à belle coloration dorée tout en conservant un cœur nacré et fondant.',
      'Dressez les noix sur assiettes chaudes, nappez de beurre blanc et parsemez de fleur de sel et de ciboulette.'
    ],
    ingredients: [
      { ingredientId: 'ing-scallops', quantity: 16, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-white-wine', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-cider-vinegar', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Nantes', 'Plat', 'Fruits de mer', 'Gastronomie']
  },
  {
    id: 'rec-fr-saumon-oseille-troisgros',
    title: 'Pavé de Saumon à l’Unilatérale et Sauce Crémée à l’Oseille (Salmon with Sorrel Sauce)',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    difficulty: 'medium',
    description: 'Inspiré du célèbre chef-d’œuvre des Frères Troisgros : pavés de saumon fondants servis sur une sauce onctueuse au vin blanc, crème fraîche et tombée d’oseille acidulée.',
    instructions: [
      'Préparez la sauce : faites réduire les échalotes émincées avec le vin blanc sec et le fumet de poisson jusqu’à quasi-évaporation.',
      'Ajoutez la crème fraîche épaisse et laissez bouillonner 3 minutes pour lier.',
      'Ajoutez les feuilles d’oseille ou d’épinards équeutées et lavées. Laissez-les fondre 20 secondes hors du feu. Salez et poivrez.',
      'Dans une poêle huilée, faites cuire les pavés de saumon côté peau à feu moyen sans les retourner pendant 7 à 8 minutes (cuisson à l’unilatérale pour garder le dessus mi-cuit).',
      'Nappez le fond des assiettes chaudes de sauce crémée à l’oseille et déposez le pavé de saumon croustillant dessus.'
    ],
    ingredients: [
      { ingredientId: 'ing-salmon-fillet', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-spinach', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-white-wine', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-fish-stock', quantity: 50, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Gastronomie', 'Plat', 'Poisson', 'Classique']
  },
  {
    id: 'rec-fr-cabillaud-croute-herbes',
    title: 'Dos de Cabillaud en Croûte d’Herbes et Purée Maison (Herb-Crusted Cod Loin)',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Épais dos de cabillaud fondant surmonté d’une croûte dorée au beurre, chapelure, parmesan et persil frais, servi avec une purée au beurre demi-sel.',
    instructions: [
      'Préparez la croûte d’herbes : mixez la chapelure avec le beurre mou, le parmesan râpé, le persil frais et l’ail haché jusqu’à consistance de pâte homogène.',
      'Étalez la pâte entre deux feuilles de papier cuisson sur 3 mm d’épaisseur et placez au frais 10 minutes.',
      'Déposez les dos de cabillaud dans un plat à four légèrement huilé. Salez et poivrez.',
      'Découpez des rectangles de croûte d’herbes de la taille des pavés de poisson et posez-les sur le dessus.',
      'Enfournez à 200°C pendant 14 minutes jusqu’à ce que le poisson soit nacré et la croûte joliment gratinée.',
      'Servez avec une belle purée de pommes de terre maison au beurre demi-sel.'
    ],
    ingredients: [
      { ingredientId: 'ing-cod-fillet', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-breadcrumbs', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-parmesan', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-garlic', quantity: 1, unit: 'clove' },
      { ingredientId: 'ing-potato', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Poisson', 'Plat', 'Bistrot', 'Familial']
  },
  {
    id: 'rec-fr-bar-roti-fenouil-thym',
    title: 'Filet de Bar Rôti au Four sur Lit de Fenouil et Thym (Roasted Sea Bass with Fennel)',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Filets de bar (loup de mer) dorés au four sur une compotée de fenouil fondant à l’huile d’olive, citron confit et branches de thym.',
    instructions: [
      'Émincez finement les bulbes d’oignon et de fenouil.',
      'Faites-les revenir à la poêle dans 2 cuillères d’huile d’olive avec le thym pendant 10 minutes jusqu’à tendreté.',
      'Étalez ce lit de légumes dans un plat à four.',
      'Déposez les filets de bar assaisonnés de sel fin et poivre sur le dessus.',
      'Arrosez de vin blanc sec, d’un filet d’huile d’olive et disposez des rondelles de citron.',
      'Enfournez à 190°C pendant 15 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-sea-bass', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-white-wine', quantity: 60, unit: 'ml' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Méditerranée', 'Plat', 'Poisson', 'Léger']
  },
  {
    id: 'rec-fr-brandade-morue-gratin',
    title: 'Brandade de Morue Nîmoise Traditionnelle Gratinée (Gratinéed Nîmes Salt Cod Brandade)',
    categoryId: 'rcat-seafood',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    difficulty: 'medium',
    description: 'Spécialité occitane de cabillaud/morue effeuillée, émulsionnée à l’huile d’olive, ail et purée de pommes de terre, passée sous le gril.',
    instructions: [
      'Faites pocher le cabillaud dans du lait frémissant avec le laurier et l’ail pendant 8 minutes. Égouttez en réservant un peu de lait.',
      'Faites cuire les pommes de terre à l’eau bouillante puis écrasez-les à la fourchette.',
      'Effeuillez le poisson en retirant toute arête.',
      'Dans une casserole à feu doux, travaillez le poisson avec l’ail écrasé en versant l’huile d’olive en filet comme pour une mayonnaise.',
      'Incorporez la purée de pommes de terre, 2 cuillères de crème et un peu de lait tiède pour obtenir une texture mousseuse.',
      'Versez dans un plat à gratin, saupoudrez d’un peu de chapelure et faites gratiner 15 minutes à 210°C.',
      'Servez avec des triangles de pain de mie frits ou une salade verte.'
    ],
    ingredients: [
      { ingredientId: 'ing-cod-fillet', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 4, unit: 'clove' },
      { ingredientId: 'ing-olive-oil', quantity: 80, unit: 'ml' },
      { ingredientId: 'ing-milk', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-breadcrumbs', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Nîmes', 'Occitanie', 'Plat', 'Poisson', 'Gratin']
  },
  {
    id: 'rec-fr-truite-meuniere-amandes',
    title: 'Truite Meunière aux Amandes Effilées et Citron (Trout with Toasted Almonds)',
    categoryId: 'rcat-seafood',
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    difficulty: 'easy',
    description: 'Truite entière ou filets dorés au beurre meunière, recouverts d’une pluie d’amandes effilées toastées croustillantes et de jus de citron frais.',
    instructions: [
      'Passez les truites dans la farine et tapotez pour enlever l’excédent.',
      'Faites fondre le beurre dans une poêle et faites dorer les truites 5 minutes par face à feu moyen.',
      'Dans une petite poêle séparée, faites dorer les amandes effilées à sec jusqu’à belle teinte dorée.',
      'Dressez les truites sur un plat chaud.',
      'Ajoutez le beurre restant dans la poêle avec le jus de citron et le persil ciselé.',
      'Versez la sauce au beurre et citron sur le poisson et parsemez des amandes effilées croustillantes.'
    ],
    ingredients: [
      { ingredientId: 'ing-sole-fillet', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-almonds-flaked', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Plat', 'Poisson', 'Tradition', 'Rapide']
  }
];
