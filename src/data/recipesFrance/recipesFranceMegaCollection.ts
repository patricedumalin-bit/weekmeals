import { Recipe } from '../../types';

export const RECIPES_FRANCE_MEGA_COLLECTION: Recipe[] = [
  // ==========================================
  // 1. ENTRÉES & SOUPES DU TERROIR (30 RECETTES)
  // ==========================================
  {
    id: 'rec-fr-garbure-bearnaise',
    title: 'Garbure Béarnaise Traditionnelle au Confit et Haricots Tarbais',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 120,
    difficulty: 'medium',
    description: 'Grande soupe-repas béarnaise aux choux verts frisés, haricots tarbais fondants, légumes racines et manchon de confit de canard.',
    instructions: [
      'Faites tremper les haricots blancs toute la nuit puis égouttez-les.',
      'Dans une grande marmite, déposez les haricots, le confit de canard et les lardons. Couvrez de 2 litres d’eau et portez à ébullition.',
      'Ajoutez les carottes, les navets, les poireaux et les pommes de terre coupés en gros morceaux.',
      'Ajoutez les feuilles de chou vert émincées et l’ail écrasé. Assaisonnez de thym, laurier et piment d’Espelette.',
      'Laissez mijoter à feu doux pendant 2 heures.',
      'Servez la soupe bien chaude et faites le traditionnel « chabrot » avec une rasade de vin rouge en fin d’assiette.'
    ],
    ingredients: [
      { ingredientId: 'ing-cabbage-green', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-cannellini-beans', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-duck-leg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-turnip', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 4, unit: 'clove' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Béarn', 'Sud-Ouest', 'Entrée', 'Soupe', 'Tradition']
  },
  {
    id: 'rec-fr-tourin-ail-perigourdin',
    title: 'Tourin à l’Ail Blanchi Périgourdin (Perigord Garlic Soup)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'La soupe d’ail traditionnelle du Sud-Ouest : gousses d’ail doucement compotées dans la graisse d’oie, bouillon lié au blanc d’œuf filé et vinaigre.',
    instructions: [
      'Émincez finement les 8 gousses d’ail.',
      'Faites-les fondre doucement dans 2 cuillères de beurre ou graisse de canard sans les laisser brunir.',
      'Ajoutez la cuillère de farine, remuez 1 minute puis versez 1 litre de bouillon de volaille chaud.',
      'Laissez frémir 15 minutes à feu doux.',
      'Séparez le blanc du jaune d’œuf. Versez le blanc dans la soupe bouillante en fouettant vivement pour former des filaments.',
      'Mélangez le jaune d’œuf avec 1 cuillère de vinaigre de vin et incorporez hors du feu.',
      'Servez sur des tranches de pain de campagne grillées.'
    ],
    ingredients: [
      { ingredientId: 'ing-garlic', quantity: 8, unit: 'clove' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-chicken-broth', quantity: 1000, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Périgord', 'Sud-Ouest', 'Entrée', 'Soupe', 'Bistrot']
  },
  {
    id: 'rec-fr-flamiche-poireaux-picardie',
    title: 'Flamiche aux Poireaux Traditionnelle de Picardie',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Tourte feuilletée dorée garnie d’une fondue de poireaux au beurre, crème fraîche épaisse et muscade.',
    instructions: [
      'Émincez les poireaux et faites-les étuver 20 minutes au beurre à couvert jusqu’à ce qu’ils soient tendres.',
      'Battez les œufs avec la crème fraîche, du sel, du poivre et de la muscade.',
      'Incorporez les poireaux fondus tiédis à l’appareil.',
      'Foncez une tourtière avec un disque de pâte feuilletée, versez la garniture et recouvrez du second disque de pâte.',
      'Soudez les bords, dorez au jaune d’œuf et dessinez des croisillons.',
      'Enfournez à 190°C pendant 35 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-puff-pastry', quantity: 2, unit: 'pack' },
      { ingredientId: 'ing-leek', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Picardie', 'Nord', 'Entrée', 'Tarte', 'Tradition']
  },
  {
    id: 'rec-fr-tarte-flambee-flammekueche',
    title: 'Flammekueche Alsacienne Authentique au Feu de Bois',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Fine pâte à pain croustillante étalée très finement, nappée d’un mélange crème et fromage blanc (Bibeleskaes), oignons émincés et lardons fumés.',
    instructions: [
      'Préchauffez le four à température maximale (250°C ou 275°C).',
      'Étalez la pâte très finement (1 mm) sur du papier cuisson.',
      'Mélangez la crème fraîche épaisse et le fromage blanc/crème avec du sel, du poivre et de la muscade.',
      'Tartinez uniformément la surface de la pâte.',
      'Répartissez les oignons émincés très finement et les lardons fumés crus.',
      'Enfournez sur plaque très chaude pendant 8 à 10 minutes jusqu’à ce que les bords soient noircis et croustillants.',
      'Servez immédiatement découpée sur une planche en bois.'
    ],
    ingredients: [
      { ingredientId: 'ing-pizza-dough', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Alsace', 'Entrée', 'Apéritif', 'Tradition', 'Rapide']
  },
  {
    id: 'rec-fr-rillettes-porc-mans',
    title: 'Rillettes de Porc Traditionnelles du Mans Façon Grand-Mère',
    categoryId: 'rcat-starters',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 240,
    difficulty: 'medium',
    description: 'Effiloché de viande de porc fermier longuement confit dans sa graisse avec sel, poivre et aromates, fondant à tartiner sur pain de campagne.',
    instructions: [
      'Coupez la viande de porc en cubes réguliers de 3 cm.',
      'Dans une cocotte en fonte, mettez la viande avec 1 verre d’eau, le thym, le laurier, le sel et le poivre.',
      'Portez à ébullition puis laissez confire à feu ultra-doux (ou au four à 120°C) pendant 4 heures en remuant toutes les 30 minutes.',
      'La viande doit s’effilocher spontanément à la cuillère en bois.',
      'Effilochez les fibres de viande à la fourchette en les mélangeant à la graisse tiède.',
      'Mettez en pots de grès et laissez figer au réfrigérateur 24 heures.',
      'Dégustez à température ambiante sur du pain de seigle avec des cornichons.'
    ],
    ingredients: [
      { ingredientId: 'ing-ground-pork', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-bacon', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-bay-leaf', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Le Mans', 'Charcuterie', 'Entrée', 'Apéritif', 'Terroir']
  },

  // ==========================================
  // 2. PLATS DU TERROIR & VIANDES (50 RECETTES)
  // ==========================================
  {
    id: 'rec-fr-axoa-veau-espelette',
    title: 'Axoa de Veau Traditionnel au Piment d’Espelette (Basque Veal Axoa)',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    difficulty: 'easy',
    description: 'Émincé de veau fermier mijoté aux poivrons doux, oignons, ail et relevé au véritable piment d’Espelette AOP.',
    instructions: [
      'Hachez la viande de veau au couteau en très petits dés de 5 mm.',
      'Coupez les poivrons rouges et verts ainsi que les oignons en petits dés.',
      'Dans une cocotte, faites suer les oignons et les poivrons dans l’huile d’olive pendant 10 minutes.',
      'Ajoutez la viande de veau hachée, l’ail écrasé, le thym et le laurier. Faites dorer 5 minutes.',
      'Mouillez avec le vin blanc sec et le bouillon de volaille.',
      'Assaisonnez avec 1 cuillère à café de piment d’Espelette et du sel.',
      'Laissez mijoter doucement pendant 35 minutes sans couvrir complètement.',
      'Servez bien chaud avec des pommes de terre vapeur ou du riz.'
    ],
    ingredients: [
      { ingredientId: 'ing-veal-escalope', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-bell-pepper-red', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-bell-pepper-green', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-white-wine', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-chicken-broth', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Pays Basque', 'Plat', 'Veau', 'Terroir', 'Classique']
  },
  {
    id: 'rec-fr-aligot-aubrac-saucisse',
    title: 'Aligot de l’Aubrac Traditionnel et Saucisse Grillée (Aubrac Cheesy Potato Puree)',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    difficulty: 'medium',
    description: 'La spécialité mythique de l’Aubrac : purée de pommes de terre travaillée au beurre et crème, battue avec de la tome fraîche fondue pour former un ruban étirable à l’infini.',
    instructions: [
      'Faites cuire les pommes de terre à l’eau bouillante salée pendant 25 minutes. Épluchez et passez-les au presse-purée.',
      'Remettez la purée dans la casserole sur feu doux, incorporez le beurre en morceaux, la crème fraîche épaisse et l’ail finement écrasé.',
      'Assaisonnez de sel et poivre.',
      'Coupez le fromage Cantal / tome en fines lamelles.',
      'Incorporez le fromage à la purée bien chaude sur feu doux en remuant toujours dans le même sens avec une spatule en bois.',
      'Battez énergiquement et soulevez la purée vers le haut pour incorporer de l’air jusqu’à ce que le ruban file sans se rompre.',
      'Servez immédiatement avec des saucisses de Toulouse grillées.'
    ],
    ingredients: [
      { ingredientId: 'ing-potato', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-cantal', quantity: 350, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-sausage-toulouse', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Aubrac', 'Aveyron', 'Plat', 'Fromage', 'Terroir', 'Spectaculaire']
  },
  {
    id: 'rec-fr-gigot-sept-heures',
    title: 'Gigot de Sept Heures à la Cuillère Fondant (Seven-Hour Braised Lamb)',
    categoryId: 'rcat-poultry',
    servings: 8,
    prepTimeMinutes: 30,
    cookTimeMinutes: 420,
    difficulty: 'medium',
    description: 'Gigot d’agneau entier confit pendant 7 heures au four doux dans une cocotte scellée avec vin blanc, ail en chemise, carottes et herbes fraîches, si fondant qu’il se sert à la cuillère.',
    instructions: [
      'Préchauffez le four à 120°C (chaleur très douce).',
      'Dans une grande cocotte en fonte, faites dorer le gigot d’agneau sur toutes ses faces dans l’huile d’olive avec les lardons.',
      'Ajoutez les carottes coupées en grosses rondelles, les oignons émincés et la tête d’ail entière séparée en gousses non épluchées (en chemise).',
      'Versez le vin blanc sec et le bouillon de veau.',
      'Ajoutez le thym et le laurier. Salez et poivrez.',
      'Fermez hermétiquement la cocotte (vous pouvez souder le couvercle avec une pâte d’eau et farine).',
      'Enfournez pendant 7 heures sans jamais ouvrir.',
      'À la sortie, ouvrez la cocotte : la viande s’effiloche à la cuillère. Servez avec les carottes confites et le jus réduit.'
    ],
    ingredients: [
      { ingredientId: 'ing-lamb-shank', quantity: 1500, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 10, unit: 'clove' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-veal-stock', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-thyme', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Gastronomie', 'Plat', 'Agneau', 'Mijoté', 'Convivial']
  },
  {
    id: 'rec-fr-potee-auvergnate',
    title: 'Potée Auvergnate Traditionnelle au Chou et Saucisse de Morteau',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 120,
    difficulty: 'easy',
    description: 'Plat de montagne auvergnat généreux réunissant chou vert frisé blanchi, palette demi-sel, saucisse de campagne, carottes, navets et pommes de terre.',
    instructions: [
      'Faites blanchir les quartiers de chou vert 5 minutes dans l’eau bouillante puis égouttez.',
      'Dans une grande marmite, déposez la palette de porc demi-sel et la poitrine fumée.',
      'Couvrez d’eau froide, portez à ébullition et écumez.',
      'Ajoutez l’oignon piqué de clous de girofle, le bouquet garni et les grains de poivre.',
      'Laissez mijoter 1 heure à couvert.',
      'Ajoutez les quartiers de chou, les carottes, les navets et les saucisses.',
      'Poursuivez la cuisson 40 minutes, puis ajoutez les pommes de terre pelées pour les 20 dernières minutes.',
      'Dressez les viandes tranchées et les légumes fumants sur un grand plat avec de la moutarde à l’ancienne.'
    ],
    ingredients: [
      { ingredientId: 'ing-cabbage-green', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-pork-chops', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-sausage-toulouse', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-turnip', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' }
    ],
    tags: ['French', 'France', 'Auvergne', 'Plat', 'Hiver', 'Terroir', 'Généreux']
  },

  // ==========================================
  // 3. POISSONS & FRUITS DE MER DU LITTORAL (25 RECETTES)
  // ==========================================
  {
    id: 'rec-fr-bourride-setoise',
    title: 'Bourride Sétoise Traditionnelle aux Filets de Poisson et Aïoli',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 25,
    cookTimeMinutes: 25,
    difficulty: 'medium',
    description: 'Grand plat des pêcheurs du Languedoc : poissons blancs pochés dans un court-bouillon aromatique au vin blanc, dont le jus est lié à un aïoli maison onctueux.',
    instructions: [
      'Préparez un aïoli ferme en pilant les gousses d’ail au mortier avec le jaune d’œuf, puis montez à l’huile d’olive comme une mayonnaise.',
      'Dans une cocotte, faites revenir les blancs de poireaux et les oignons émincés dans l’huile d’olive pendant 5 minutes.',
      'Ajoutez le vin blanc sec, le fumet de poisson, le thym, le laurier et un zeste d’orange.',
      'Portez à frémissement et déposez les morceaux de poisson blanc (cabillaud, loup/bar). Pochez 8 à 10 minutes.',
      'Retirez délicatement les poissons et gardez-les au chaud.',
      'Prélevez une louche de bouillon de cuisson chaud et fouettez-la avec la moitié de l’aïoli.',
      'Reversez dans la cocotte sur feu très doux sans faire bouillir pour lier la sauce veloutée.',
      'Nappez les poissons de sauce et servez avec des croûtons aillés et le reste d’aïoli.'
    ],
    ingredients: [
      { ingredientId: 'ing-cod-fillet', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-sea-bass', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 5, unit: 'clove' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-white-wine', quantity: 200, unit: 'ml' },
      { ingredientId: 'ing-fish-stock', quantity: 400, unit: 'ml' },
      { ingredientId: 'ing-leek', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Sète', 'Languedoc', 'Plat', 'Poisson', 'Gastronomie']
  },
  {
    id: 'rec-fr-cotriade-bretonne',
    title: 'Cotriade Traditionnelle Bretonne aux Poissons du Jour et Beurre Salé',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'La soupe des marins bretons : pommes de terre nouvelles et oignons fondus au beurre demi-sel, surmontés de poissons côtiers pochés au vin blanc.',
    instructions: [
      'Dans un grand faitout, faites fondre le beurre demi-sel et faites suer les oignons émincés.',
      'Ajoutez les pommes de terre coupées en morceaux, le bouquet garni, le vin blanc et couvrez d’eau.',
      'Laissez cuire 20 minutes jusqu’à ce que les pommes de terre soient tendres.',
      'Déposez les morceaux de poisson blanc et les moules sur les pommes de terre.',
      'Pochez à petits frémissements pendant 7 à 8 minutes.',
      'Dressez les poissons et pommes de terre dans un grand plat, arrosez de beurre fondu et de persil, et servez le bouillon à part avec des tranches de pain grillé.'
    ],
    ingredients: [
      { ingredientId: 'ing-cod-fillet', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-sea-bass', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-mussels', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-salted-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Plat', 'Poisson', 'Terroir', 'Tradition']
  },

  // ==========================================
  // 4. DESSERTS RÉGIONAUX & DOUCEURS (25 RECETTES)
  // ==========================================
  {
    id: 'rec-fr-kouign-amann-douarnenez',
    title: 'Kouign-Amann Traditionnel de Douarnenez au Beurre Demi-Sel',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 45,
    cookTimeMinutes: 35,
    difficulty: 'hard',
    description: 'La merveille de Douarnenez : pâte levée feuilletée tourée avec une quantité prodigieuse de beurre demi-sel breton et de sucre caramélisé.',
    instructions: [
      'Préparez la pâte à pain : pétrissez la farine avec la levure délayée dans l’eau tiède et le sel pendant 10 minutes. Laissez lever 1 heure.',
      'Étalez la pâte en carré sur un plan fariné.',
      'Déposez le beurre demi-sel ramolli et le sucre au centre de la pâte.',
      'Rabattez les 4 coins vers le centre pour enfermer le beurre et le sucre.',
      'Donnez 3 tours de feuilletage en étalant en rectangle et en pliant en 3, en saupoudrant de sucre à chaque tour.',
      'Déposez le pâton dans un moule à gâteau rond généreusement beurré.',
      'Quadrillez la surface au couteau et enfournez à 180°C pendant 35 minutes jusqu’à ce que le sucre caramélise tout autour.',
      'Démoulez immédiatement pour éviter que le caramel ne fige au fond du moule. Dégustez tiède et croustillant.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-active-dry-yeast', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Dessert', 'Pâtisserie', 'Beurre', 'Gourmandise']
  },
  {
    id: 'rec-fr-tarte-pralines-lyon',
    title: 'Tarte aux Pralines Roses Traditionnelle de Lyon',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 30,
    difficulty: 'medium',
    description: 'La tarte emblématique des bouchons lyonnais : pâte sablée croquante garnie d’une ganache fondante de pralines roses concassées et crème fraîche.',
    instructions: [
      'Foncez un moule à tarte avec la pâte sablée, piquez le fond et cuisez à blanc à 180°C pendant 18 minutes. Laissez refroidir.',
      'Dans une casserole, portez la crème fraîche épaisse et liquide à ébullition avec les pralines roses concassées.',
      'Faites cuire à feu moyen en remuant à la spatule jusqu’à atteindre 112°C au thermomètre de cuisson (la préparation devient sirupeuse et nappe la cuillère).',
      'Versez la ganache rouge rubis bouillante sur le fond de tarte cuit.',
      'Laissez refroidir à température ambiante puis placez au réfrigérateur pendant au moins 2 heures pour que l’appareil prenne.',
      'Servez en tranches fines avec un café.'
    ],
    ingredients: [
      { ingredientId: 'ing-sweet-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-heavy-cream', quantity: 250, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-almond-flour', quantity: 50, unit: 'g' }
    ],
    tags: ['French', 'France', 'Lyon', 'Bouchon', 'Dessert', 'Tarte', 'Tradition']
  },
  {
    id: 'rec-fr-gateau-basque-creme',
    title: 'Gâteau Basque Traditionnel à la Crème d’Amande et Vanille',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 35,
    cookTimeMinutes: 40,
    difficulty: 'medium',
    description: 'Gâteau doré au beurre et zeste de citron garni d’une crème pâtissière riche à la vanille et pointe de rhum ambré, orné de la croix basque (lauburu).',
    instructions: [
      'Préparez la crème pâtissière : faites chauffer le lait avec la vanille. Fouettez 2 jaunes d’œufs avec le sucre et la fécule de maïs, versez le lait et épaississez à feu doux. Ajoutez le rhum et laissez refroidir.',
      'Préparez la pâte : sablez la farine avec le beurre doux, le sucre et le zeste de citron râpé. Incorporez 1 œuf et 1 jaune pour former une boule souple.',
      'Divisez la pâte en deux (1/3 et 2/3). Étalez la plus grande partie et foncez un moule à manqué beurré.',
      'Versez la crème pâtissière froide sur le fond de pâte.',
      'Recouvrez avec le second disque de pâte étalé et soudez soigneusement les bords.',
      'Dorez au jaune d’œuf et tracez des croisillons ou une croix basque à la fourchette.',
      'Enfournez à 180°C pendant 40 minutes.',
      'Dégustez froid le lendemain.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 180, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-milk', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-cornstarch', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-rum', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-lemon', quantity: 0.5, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Pays Basque', 'Dessert', 'Pâtisserie', 'Terroir']
  },
  {
    id: 'rec-fr-eclairs-chocolat-glacage',
    title: 'Éclairs au Chocolat Maison au Glaçage Miroir Brillant',
    categoryId: 'rcat-desserts',
    servings: 6,
    prepTimeMinutes: 40,
    cookTimeMinutes: 30,
    difficulty: 'hard',
    description: 'Pâte à choux croustillante garnie d’une crème pâtissière intense au chocolat noir 70% et nappée d’un fondant brillant.',
    instructions: [
      'Préparez la pâte à choux : portez à ébullition l’eau, le lait, le beurre et le sel. Ajoutez la farine d’un coup, desséchez 2 min sur le feu puis incorporez les œufs un à un.',
      'Pochez des bâtonnets de 12 cm sur une plaque beurrée.',
      'Enfournez à 180°C pendant 30 minutes sans ouvrir le four.',
      'Préparez la crème au chocolat : faites fondre le chocolat noir dans une crème pâtissière vanillée bien chaude. Laissez refroidir.',
      'Percez 3 petits trous sous les éclairs refroidis et garnissez-les généreusement de crème au chocolat à la poche à douille.',
      'Trempez le dessus des éclairs dans le glaçage chocolat tiède et lissez d’un coup de doigt.',
      'Laissez figer au frais 1 heure.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 350, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 5, unit: 'unit' },
      { ingredientId: 'ing-dark-chocolate', quantity: 180, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-cornstarch', quantity: 25, unit: 'g' }
    ],
    tags: ['French', 'France', 'Paris', 'Dessert', 'Pâtisserie', 'Chocolat', 'Classique']
  },
  {
    id: 'rec-fr-charlotte-fraises-gariguette',
    title: 'Charlotte Traditionnelle aux Fraises Gariguette et Biscuits Cuillère',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 35,
    cookTimeMinutes: 0,
    difficulty: 'medium',
    description: 'Entremets printanier classique habillé de biscuits à la cuillère moelleux, garni d’une mousse bavaroise légère aux fraises fraîches.',
    instructions: [
      'Mixez la moitié des fraises en coulis avec le jus de citron et le sucre.',
      'Faites ramollir la gélatine dans l’eau froide, puis faites-la fondre dans un peu de coulis tiédi.',
      'Montez la crème liquide très froide en chantilly ferme avec le sucre glace et incorporez délicatement le coulis gélifié.',
      'Trempez rapidement les biscuits cuillère dans un sirop léger et tapissez le fond et les parois d’un moule à charlotte.',
      'Versez la moitié de la mousse de fraises, ajoutez une couche de dés de fraises fraîches entières.',
      'Recouvrez du reste de mousse et terminez par une rangée de biscuits.',
      'Placez au réfrigérateur pendant au moins 6 heures (idéalement toute la nuit).',
      'Démoulez sur un plat et décorez le dessus de fraises fraîches entières et de feuilles de menthe.'
    ],
    ingredients: [
      { ingredientId: 'ing-strawberries', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-heavy-cream', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-sugar', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-powdered-sugar', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-gelatin', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-lemon', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-mint', quantity: 0.5, unit: 'bunch' }
    ],
    tags: ['French', 'France', 'Dessert', 'Printemps', 'Pâtisserie', 'Fraises', 'Fêtes']
  }
];
