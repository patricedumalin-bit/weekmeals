import { Recipe } from '../../types';

export const RECIPES_FRANCE_STARTERS: Recipe[] = [
  // --- SOUPS & VELOUTÉS ---
  {
    id: 'rec-fr-soupe-oignon',
    title: 'Soupe à l’Oignon Gratinée Traditionnelle (French Onion Soup)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    difficulty: 'medium',
    description: 'Soupe réconfortante aux oignons lentement caramélisés, déglacés au vin blanc, surmontée de tranches de baguette croustillantes et de comté gratiné.',
    instructions: [
      'Émincez finement 4 gros oignons jaunes.',
      'Faites fondre le beurre avec un filet d’huile dans une cocotte et faites suer les oignons à feu doux pendant 25 minutes jusqu’à belle caramélisation dorée.',
      'Saupoudrez d’une cuillère de farine (singer) et remuez pendant 1 minute.',
      'Déglacez avec le vin blanc sec puis versez le bouillon de bœuf bien chaud. Ajoutez la feuille de laurier et le thym.',
      'Laissez mijoter à frémissement doux pendant 20 minutes. Rectifiez l’assaisonnement en sel et poivre.',
      'Répartissez dans des bols individuels allant au four, déposez des tranches de baguette grillées et couvrez généreusement de comté râpé.',
      'Faites gratiner sous le gril du four à 220°C pendant 6 à 8 minutes jusqu’à ce que le fromage soit doré et bouillonnant.'
    ],
    ingredients: [
      { ingredientId: 'ing-onion', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-olive-oil', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-flour', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-beef-broth', quantity: 900, unit: 'ml' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-gruyere', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-bay-leaf', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Soupe', 'Bistrot', 'Classique']
  },
  {
    id: 'rec-fr-veloute-potimarron',
    title: 'Velouté de Potimarron aux Châtaignes et Noisettes (Pumpkin & Chestnut Soup)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Onctueux velouté automnal de potimarron rôti au beurre doux, sublimé par des brisures de châtaignes et une touche de crème fraîche.',
    instructions: [
      'Lavez le potimarron, retirez les graines et coupez-le en cubes (inutile de l’éplucher). Émincez l’oignon.',
      'Faites revenir l’oignon dans une casserole avec le beurre pendant 3 minutes.',
      'Ajoutez les cubes de potimarron et couvrez avec le bouillon de légumes.',
      'Laissez cuire à couvert pendant 20 minutes jusqu’à ce que la chair soit très tendre.',
      'Ajoutez la crème fraîche, une pincée de noix de muscade, du sel et du poivre, puis mixez finement au mixeur plongeant jusqu’à texture veloutée.',
      'Servez bien chaud dans des bols avec des châtaignes concassées et un filet de crème.'
    ],
    ingredients: [
      { ingredientId: 'ing-butternut', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-vegetable-broth', quantity: 700, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-chestnut', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Soupe', 'Automne', 'Végétarien']
  },
  {
    id: 'rec-fr-veloute-dubarry',
    title: 'Crème Dubarry au Chou-Fleur (Classic Velouté Dubarry)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Raffiné potage royal à base de chou-fleur fondant, blanc de poireau, bouillon blanc et crème d’Isigny.',
    instructions: [
      'Détaillez le chou-fleur en petits bouquets. Émincez le blanc de poireau.',
      'Faites suer le poireau dans le beurre fondu sans coloration pendant 4 minutes.',
      'Ajoutez les fleurettes de chou-fleur et le bouillon de volaille. Portez à ébullition puis laissez cuire 20 minutes à petits bouillons.',
      'Mixez longuement avec la crème fraîche et la muscade jusqu’à consistance soyeuse.',
      'Assaisonnez de sel fin et de poivre blanc du moulin. Décorez de quelques brins de ciboulette.'
    ],
    ingredients: [
      { ingredientId: 'ing-cauliflower', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-leek', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-chicken-broth', quantity: 750, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Soupe', 'Gastronomie', 'Hiver']
  },
  {
    id: 'rec-fr-soupe-pistou',
    title: 'Soupe au Pistou Provençale (Provencal Vegetable & Basil Soup)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 40,
    difficulty: 'medium',
    description: 'Grande soupe estivale du midi aux haricots blancs, haricots verts, courgettes, tomates et sa pommade de basilic à l’ail.',
    instructions: [
      'Coupez en petits dés les courgettes, pommes de terre, carottes et tomates. Équeutez et coupez les haricots verts.',
      'Dans une grande marmite, mettez les légumes et les haricots blancs dans 1,5 litre d’eau salée avec 1 filet d’huile d’olive.',
      'Laissez mijoter 30 minutes. Ajoutez les coquillettes et poursuivez la cuisson 10 minutes.',
      'Pendant ce temps, préparez le pistou : pilez au mortier les gousses d’ail avec les feuilles de basilic frais, une pincée de gros sel et incorporez 4 cuillères d’huile d’olive en filet.',
      'Hors du feu, incorporez le pistou parfumé à la soupe fumante et servez avec du parmesan râpé.'
    ],
    ingredients: [
      { ingredientId: 'ing-zucchini', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-green-beans', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-tomato', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-cannellini-beans', quantity: 1, unit: 'can' },
      { ingredientId: 'ing-coquillettes', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-basil', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-garlic', quantity: 4, unit: 'clove' },
      { ingredientId: 'ing-olive-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-parmesan', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Provence', 'Entrée', 'Soupe', 'Été']
  },
  {
    id: 'rec-fr-soupe-poisson',
    title: 'Soupe de Poissons Marseillaise et sa Rouille (Marseille Fish Soup with Rouille)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    difficulty: 'medium',
    description: 'Soupe maritime relevée aux poissons de roche, tomate, fenouil et safran, servie avec croûtons aillés et rouille pimentée.',
    instructions: [
      'Faites revenir dans l’huile d’olive l’oignon émincé, l’ail écrasé et les tomates concassées.',
      'Ajoutez les morceaux de poisson blanc, le concentré de tomate, le thym, le laurier et une pincée de safran.',
      'Mouillez avec le fumet de poisson et 500 ml d’eau. Laissez bouillir à feu moyen pendant 25 minutes.',
      'Passez le tout au moulin à légumes grille fine pour obtenir une texture soyeuse et homogène.',
      'Préparez la rouille : émulsionnez le jaune d’œuf avec l’ail pilé, le piment d’Espelette et l’huile d’olive comme une mayonnaise.',
      'Servez la soupe brûlante accompagnée de tranches de baguette frottées à l’ail, tartinées de rouille et parsemées d’emmental râpé.'
    ],
    ingredients: [
      { ingredientId: 'ing-cod-fillet', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 4, unit: 'clove' },
      { ingredientId: 'ing-tomato', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-tomato-paste', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-fish-stock', quantity: 400, unit: 'ml' },
      { ingredientId: 'ing-saffron', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-emmental', quantity: 50, unit: 'g' }
    ],
    tags: ['French', 'France', 'Marseille', 'Poisson', 'Entrée', 'Soupe']
  },
  {
    id: 'rec-fr-veloute-chataignes',
    title: 'Velouté de Châtaignes de l’Ardèche au Foie Gras (Ardèche Chestnut Velouté)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Soupe festive et onctueuse aux châtaignes ardéchoises cuites au bouillon de volaille et adoucies au beurre demi-sel.',
    instructions: [
      'Émincez l’échalote et faites-la dorer dans le beurre dans une cocotte.',
      'Ajoutez les châtaignes cuites et mouillez avec le bouillon de volaille.',
      'Laissez frémir 15 minutes à feu doux.',
      'Ajoutez la crème liquide, mixez très finement jusqu’à texture mousseuse et aérienne.',
      'Rectifiez l’assaisonnement en sel et poivre noir et servez parsemé de persil plat.'
    ],
    ingredients: [
      { ingredientId: 'ing-chestnut', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-salted-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-chicken-broth', quantity: 600, unit: 'ml' },
      { ingredientId: 'ing-heavy-cream', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Ardèche', 'Entrée', 'Fêtes', 'Gourmet']
  },

  // --- TARTS, QUICHES & PASTRIES ---
  {
    id: 'rec-fr-quiche-lorraine',
    title: 'Quiche Lorraine Authentique (Authentic Quiche Lorraine)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'La véritable quiche lorraine sur pâte brisée croustillante avec sa migaine fondante aux œufs frais, crème épaisse et lardons dorés.',
    instructions: [
      'Préchauffez le four à 180°C (th. 6). Foncez un moule à tarte avec la pâte brisée et piquez le fond à la fourchette.',
      'Faites revenir les lardons fumés dans une poêle sans matière grasse pendant 5 minutes. Égouttez-les sur du papier absorbant.',
      'Dans un saladier, fouettez ensemble les 4 œufs, la crème fraîche épaisse et le lait entier.',
      'Assaisonnez avec une belle pincée de noix de muscade, du poivre du moulin et une pointe de sel (les lardons sont déjà salés).',
      'Répartissez les lardons sur le fond de tarte et versez délicatement l’appareil crémeux par-dessus.',
      'Enfournez pour 35 minutes jusqu’à ce que la quiche soit bien gonflée et joliment dorée.'
    ],
    ingredients: [
      { ingredientId: 'ing-shortcrust-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-bacon', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-milk', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Lorraine', 'Entrée', 'Tarte', 'Classique']
  },
  {
    id: 'rec-fr-gougeres-bourguignonnes',
    title: 'Gougères Bourguignonnes au Comté (Burgundy Cheese Puffs)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    difficulty: 'medium',
    description: 'Petits choux dorés et moelleux à la pâte à choux pur beurre généreusement parfumée au comté affiné et à la muscade.',
    instructions: [
      'Préchauffez le four à 190°C.',
      'Dans une casserole, portez à ébullition l’eau (150 ml), le lait (100 ml), le beurre en parcelles et 1/2 c. à café de sel.',
      'Hors du feu, jetez toute la farine d’un coup et mélangez vivement à la spatule.',
      'Remettez sur feu doux pendant 2 minutes pour dessécher la pâte jusqu’à ce qu’elle se détache des parois.',
      'Laissez tiédir 2 minutes, puis incorporez les œufs un par un en mélangeant vigoureusement.',
      'Ajoutez 100 g de comté râpé et une pincée de muscade.',
      'Formez des boules de pâte sur une plaque tapissée de papier cuisson à l’aide de deux cuillères.',
      'Parsemez du reste de comté et enfournez 25 minutes sans ouvrir le four pendant la cuisson.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-gruyere', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bourgogne', 'Entrée', 'Apéritif', 'Fromage']
  },
  {
    id: 'rec-fr-pissaladiere',
    title: 'Pissaladière Niçoise aux Oignons Confits (Nicoise Onion Tart)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Tarte provençale traditionnelle garnie d’une compotée d’oignons fondants au thym, d’anchois et d’olives noires de Nice.',
    instructions: [
      'Émincez finement les oignons.',
      'Faites-les compoter à feu très doux dans 3 cuillères d’huile d’olive avec le thym et le laurier pendant 35 minutes sans coloration excessive.',
      'Étalez la pâte à pain ou pâte brisée sur une plaque de cuisson.',
      'Étalez la compotée d’oignons tiède sur la pâte.',
      'Décorez en croisillons avec les olives noires et les herbes de Provence.',
      'Enfournez à 200°C pendant 25 minutes jusqu’à ce que les bords soient bien dorés et croustillants.'
    ],
    ingredients: [
      { ingredientId: 'ing-pizza-dough', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-onion', quantity: 5, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-black-olives', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-bay-leaf', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-herbes-provence', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Nice', 'Provence', 'Entrée', 'Bistrot']
  },
  {
    id: 'rec-fr-tarte-poireaux-chevre',
    title: 'Tarte Fondante aux Poireaux et Bûche de Chèvre (Leek & Goat Cheese Tart)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Alliance subtile d’une fondue de poireaux au beurre doux et de rondelles de fromage de chèvre gratinées sur pâte dorée.',
    instructions: [
      'Lavez et émincez les blancs et débuts de verts de poireaux.',
      'Faites-les fondre dans une sauteuse avec le beurre pendant 15 minutes à couvert jusqu’à tendreté.',
      'Foncez un moule avec la pâte feuilletée. Piquez le fond.',
      'Battez les œufs avec la crème liquide, du sel, du poivre et de la muscade.',
      'Déposez les poireaux fondus sur la pâte, versez l’appareil aux œufs et disposez les rondelles de bûche de chèvre sur le dessus.',
      'Enfournez à 190°C pendant 35 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-puff-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-leek', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-goat-cheese', quantity: 180, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-heavy-cream', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Tarte', 'Végétarien']
  },
  {
    id: 'rec-fr-souffle-fromage',
    title: 'Soufflé Traditionnel au Fromage Comté (Classic Comté Cheese Soufflé)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 25,
    cookTimeMinutes: 25,
    difficulty: 'hard',
    description: 'Légèreté spectaculaire et cœur aérien pour ce grand classique de la gastronomie française au fromage comté affiné.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez généreusement un moule à soufflé à bords hauts de bas en haut et poudrez l’intérieur d’un peu de farine.',
      'Préparez la béchamel : faites fondre 40 g de beurre, ajoutez 40 g de farine et cuisez 1 minute. Versez le lait petit à petit en fouettant jusqu’à épaississement.',
      'Hors du feu, assaisonnez avec la muscade, le sel et le poivre. Incorporez les 4 jaunes d’œufs un à un, puis les 120 g de comté râpé.',
      'Montez les 4 blancs d’œufs en neige très ferme avec une pincée de sel.',
      'Incorporez délicatement un tiers des blancs à la spatule pour détendre la préparation, puis le reste en soulevant doucement la masse.',
      'Versez dans le moule sans dépasser les 3/4. Enfournez immédiatement pour 25 minutes SANS ouvrir la porte du four.',
      'Servez dès la sortie du four.'
    ],
    ingredients: [
      { ingredientId: 'ing-gruyere', quantity: 140, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 45, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Gastronomie', 'Fromage']
  },
  {
    id: 'rec-fr-feuilletes-chevre-miel',
    title: 'Feuilletés Croustillants Chèvre et Miel de Lavande (Goat Cheese & Honey Puff Parcels)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 18,
    difficulty: 'easy',
    description: 'Petits coussins feuilletés dorés renfermant un cœur de chèvre chaud fondant, relevé de miel et de thym frais.',
    instructions: [
      'Découpez la pâte feuilletée en 4 carrés égaux.',
      'Déposez au centre de chaque carré 2 belles rondelles de bûche de chèvre.',
      'Nappez d’une cuillerée de miel liquide et parsemez de feuilles de thym frais et de poivre du moulin.',
      'Repliez les pointes vers le centre pour fermer le feuilleté et soudez les bords.',
      'Dorez la surface au jaune d’œuf battu.',
      'Enfournez à 200°C pendant 18 minutes jusqu’à coloration dorée et croustillante.'
    ],
    ingredients: [
      { ingredientId: 'ing-puff-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-goat-cheese', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-honey', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Feuilleté', 'Rapide']
  },

  // --- BISTRO STARTERS, SALADS & EGGS ---
  {
    id: 'rec-fr-oeufs-mayo',
    title: 'Œufs Durs Mayonnaise à la Moutarde de Dijon (Classic Eggs Mayo)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Le champion incontesté des bistrots parisiens : œufs mollets-durs nappés d’une mayonnaise maison onctueuse à la moutarde forte.',
    instructions: [
      'Plongez les œufs dans une casserole d’eau bouillante vinaigrée et cuisez exactement 9 minutes pour un jaune crémeux.',
      'Plongez-les immédiatement dans un saladier d’eau glacée pour stopper la cuisson, puis écalez-les délicatement.',
      'Préparez la mayonnaise maison : dans un bol, mélangez 1 jaune d’œuf avec 1 c. à café de moutarde de Dijon, sel et poivre.',
      'Montez en versant l’huile en mince filet continu tout en fouettant vivement jusqu’à obtention d’une texture bien ferme.',
      'Coupez les œufs en deux dans la longueur, dressez sur un lit de salade et recouvrez généreusement de mayonnaise.',
      'Décorez de ciboulette ciselée et d’une pincée de piment d’Espelette.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 5, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-sunflower-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-cider-vinegar', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-lettuce', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bistrot', 'Entrée', 'Classique', 'Rapide']
  },
  {
    id: 'rec-fr-oeufs-meurette',
    title: 'Œufs Pochés en Meurette Bourguignonne (Poached Eggs in Red Wine Sauce)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    difficulty: 'medium',
    description: 'Spécialité mythique de Bourgogne : œufs pochés délicats servis sur croûtons dorés dans une sauce onctueuse au vin rouge, lardons et champignons.',
    instructions: [
      'Dans une casserole, faites revenir les lardons, les échalotes émincées et les champignons de Paris émincés dans un peu de beurre.',
      'Ajoutez le vin rouge de Bourgogne, le laurier et le thym. Portez à ébullition et laissez réduire de moitié (15 mins).',
      'Liez la sauce avec 1 c. à soupe de fécule de maïs ou beurre manié, salez et poivrez.',
      'Pochez 4 œufs très frais dans une eau frémissante vinaigrée pendant 3 minutes chrono.',
      'Frottez les tranches de baguette grillées avec une gousse d’ail.',
      'Déposez les croûtons au fond des assiettes creuses, installez un œuf poché dessus et nappez généreusement de sauce meurette brûlante.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-red-wine', quantity: 350, unit: 'ml' },
      { ingredientId: 'ing-bacon', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-mushroom', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-butter', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-cornstarch', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bourgogne', 'Entrée', 'Tradition', 'Gourmet']
  },
  {
    id: 'rec-fr-poireaux-vinaigrette',
    title: 'Poireaux Fondants Vinaigrette à l’Ancienne (Leeks with Wholegrain Vinaigrette)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Poireaux cuits vapeur d’une tendreté absolue, relevés d’une vinaigrette moutardée à l’ancienne, d’œufs durs concassés et d’échalote.',
    instructions: [
      'Nettoyez soigneusement les poireaux en conservant les blancs et le début du vert.',
      'Faites-les cuire à la vapeur pendant 20 minutes jusqu’à ce qu’ils soient tendres comme du beurre.',
      'Égouttez-les longuement sur un linge propre.',
      'Préparez la vinaigrette : mélangez la moutarde à l’ancienne, le vinaigre de cidre, l’huile de tournesol et l’huile d’olive, l’échalote hachée, sel et poivre.',
      'Dressez les poireaux tièdes ou froids sur un plat, nappez de vinaigrette et parsemez d’œufs durs hachés et de persil frais.'
    ],
    ingredients: [
      { ingredientId: 'ing-leek', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-shallot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-grainy-mustard', quantity: 2, unit: 'tsp' },
      { ingredientId: 'ing-cider-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-sunflower-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Bistrot', 'Végétarien', 'Classique']
  },
  {
    id: 'rec-fr-salade-chevre-chaud',
    title: 'Salade de Chèvre Chaud aux Noix et Miel (Warm Goat Cheese Salad)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 8,
    difficulty: 'easy',
    description: 'Toast de chèvre doré fondant au four sur lit de jeunes pousses croquantes, tomates cerises, cerneaux de noix et vinaigrette au miel.',
    instructions: [
      'Tranchez 8 belles rondelles de baguette. Déposez sur chacune une tranche épaisse de bûche de chèvre.',
      'Nappez d’un filet de miel et d’une pincée d’herbes de Provence.',
      'Passez sous le gril du four à 210°C pendant 6 à 8 minutes jusqu’à ce que le chèvre soit gratiné et fondant.',
      'Dans un grand saladier, préparez la vinaigrette avec moutarde, vinaigre balsamique, huile d’olive, sel et poivre.',
      'Mélangez la salade verte, les tomates cerises coupées en deux et les cerneaux de noix.',
      'Dressez la salade dans les assiettes et disposez les toasts de chèvre brûlants par-dessus.'
    ],
    ingredients: [
      { ingredientId: 'ing-goat-cheese', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-lettuce', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-cherry-tomatoes', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-walnuts', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-honey', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-balsamic-vinegar', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Salade', 'Fromage', 'Classique']
  },
  {
    id: 'rec-fr-salade-lyonnaise',
    title: 'Salade Lyonnaise Traditionnelle aux Lardons et Œuf Poché (Bouchon Lyonnais Salad)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    difficulty: 'easy',
    description: 'Incontournable des bouchons lyonnais : salade frisée, lardons fumés dorés croustillants, croûtons aillés et œuf poché au jaune coulant.',
    instructions: [
      'Coupez le pain de campagne en dés et faites-les dorer à la poêle dans un peu de beurre avec une gousse d’ail écrasée.',
      'Faites rissoler les lardons dans une poêle sans matière grasse jusqu’à ce qu’ils soient bien croustillants.',
      'Déglacez la poêle des lardons avec le vinaigre de vin rouge pour créer un jus tiède parfumé.',
      'Pochez 4 œufs dans de l’eau frémissante vinaigrée pendant 3 minutes.',
      'Mélangez la salade avec la vinaigrette tiède à l’huile de tournesol et moutarde de Dijon.',
      'Répartissez dans les assiettes, parsemez de lardons chauds et de croûtons, puis déposez un œuf poché au centre.'
    ],
    ingredients: [
      { ingredientId: 'ing-lettuce', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-bacon', quantity: 180, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 1, unit: 'clove' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-sunflower-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Lyon', 'Bouchon', 'Entrée', 'Salade']
  },
  {
    id: 'rec-fr-salade-landaise',
    title: 'Salade Landaise Gourmande (Landes Salad with Smoked Duck & Pine Nuts)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Somptueuse salade du Sud-Ouest mêlant tranches de magret séché/fumé, gésiers ou effiloché de canard tiède, pignons et cerneaux de noix.',
    instructions: [
      'Lavez la salade et disposez-la dans de grandes assiettes creuses.',
      'Faites revenir les morceaux de canard ou lardons à la poêle pour les tiédir.',
      'Faites dorer les pignons de pin à sec 2 minutes.',
      'Préparez la vinaigrette avec huile de noix, vinaigre de cidre, sel et poivre.',
      'Disposez les tranches de magret en éventail autour de la salade, ajoutez les tomates cerises coupées en deux et les noix.',
      'Arrosez de vinaigrette et servez avec des tranches de pain de campagne grillées.'
    ],
    ingredients: [
      { ingredientId: 'ing-lettuce', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-duck-breast', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-cherry-tomatoes', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-walnuts', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-cider-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Sud-Ouest', 'Entrée', 'Salade', 'Gourmet']
  },
  {
    id: 'rec-fr-celeri-remoulade',
    title: 'Céleri Rémoulade Maison à la Moutarde Forte (Traditional Celeriac Remoulade)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Céleri-rave fraîchement râpé dans une sauce rémoulade onctueuse à la moutarde de Dijon, citron frais et mayonnaise maison.',
    instructions: [
      'Épluchez le céleri-rave et râpez-le finement. Arrosez immédiatement du jus d’un demi-citron pour éviter l’oxydation.',
      'Préparez la sauce rémoulade : fouettez la mayonnaise avec la moutarde de Dijon, 1 c. à soupe de crème fraîche, un filet de jus de citron, sel et poivre.',
      'Mélangez intimement le céleri râpé avec la sauce.',
      'Laissez reposer au réfrigérateur au moins 30 minutes avant de servir pour attendrir le céleri.',
      'Servez bien frais parsemé de persil plat haché.'
    ],
    ingredients: [
      { ingredientId: 'ing-celeriac', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-mayonnaise', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 2, unit: 'tsp' },
      { ingredientId: 'ing-creme-fraiche', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Bistrot', 'Crudités', 'Classique']
  },
  {
    id: 'rec-fr-carottes-rapees',
    title: 'Carottes Râpées à la Française Vinaigrette Citronnée (French Grated Carrot Salad)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'La salade quotidienne des familles françaises : carottes tendres fraîchement râpées, vinaigrette à l’huile d’olive, jus de citron et persil frais.',
    instructions: [
      'Épluchez et râpez finement les carottes.',
      'Dans un saladier, fouettez le jus de citron, l’huile d’olive, une pointe de moutarde de Dijon, une pincée de sucre, sel et poivre.',
      'Versez la vinaigrette sur les carottes râpées et mélangez bien.',
      'Ajoutez le persil plat fraîchement ciselé et laissez mariner 15 minutes avant dégustation.'
    ],
    ingredients: [
      { ingredientId: 'ing-carrot', quantity: 5, unit: 'unit' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-sugar', quantity: 5, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Crudités', 'Simple', 'Rapide']
  },
  {
    id: 'rec-fr-tartare-saumon-avocat',
    title: 'Tartare de Saumon Frais et Avocat à l’Aneth (Salmon & Avocado Tartare)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Dés de pavé de saumon frais marinés au citron vert, huile d’olive et échalote, dressés sur un lit d’avocat fondant.',
    instructions: [
      'Taillez les pavés de saumon très frais en petits dés réguliers de 5 mm.',
      'Hachez finement les échalotes et la ciboulette.',
      'Mélangez le saumon avec le jus de citron vert, 2 cuillères d’huile d’olive, les échalotes, la ciboulette, sel fin et piment d’Espelette.',
      'Coupez les avocats en petits dés et arrosez-les d’un filet de citron.',
      'À l’aide d’un emporte-pièce rond, dressez une couche d’avocat puis recouvrez du tartare de saumon mariné.',
      'Servez très frais avec des toasts de baguette.'
    ],
    ingredients: [
      { ingredientId: 'ing-salmon-fillet', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-avocado', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-lime', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Entrée', 'Poisson', 'Frais', 'Raffiné']
  },
  {
    id: 'rec-fr-escargots-beurre-persille',
    title: 'Escargots de Bourgogne au Beurre Persillé Aillé (Burgundy Snails with Garlic Butter)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Véritables escargots de Bourgogne nichés dans leur coquille sous un beurre maître d’hôtel persillé et aillé bien gratiné.',
    instructions: [
      'Préparez le beurre persillé : travaillez le beurre pommade avec les gousses d’ail finement hachées, les échalotes et le persil plat ciselé.',
      'Assaisonnez le beurre avec sel fin et poivre noir du moulin.',
      'Placez un escargot au fond de chaque coquille ou alvéole de plat à escargots.',
      'Remplissez généreusement chaque coquille avec le beurre persillé.',
      'Enfournez à 220°C pendant 8 à 10 minutes jusqu’à ce que le beurre bouillonne et commence à gratiner.',
      'Dégustez immédiatement avec une baguette bien croustillante pour saucer.'
    ],
    ingredients: [
      { ingredientId: 'ing-escargots', quantity: 24, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 4, unit: 'clove' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bourgogne', 'Entrée', 'Fêtes', 'Tradition']
  },
  {
    id: 'rec-fr-terrine-campagne',
    title: 'Pâté de Campagne Traditionnel aux Noisettes et Cognac (Country Pork Terrine)',
    categoryId: 'rcat-starters',
    servings: 8,
    prepTimeMinutes: 30,
    cookTimeMinutes: 80,
    difficulty: 'medium',
    description: 'Pâté rustique fait maison de porc fermier haché, mariné au cognac, échalotes, laurier, thym et noisettes croquantes.',
    instructions: [
      'Dans un grand récipient, mélangez la viande de porc hachée avec l’échalote et l’ail finement ciselés.',
      'Ajoutez l’œuf, le cognac, le thym effeuillé, les noisettes/noix, 1 cuillère à café de sel et du poivre.',
      'Malaxez soigneusement le tout avec les mains pour bien lier la chair.',
      'Tassez la préparation dans une terrine en terre cuite. Déposez une feuille de laurier et une branche de thym sur le dessus.',
      'Enfournez au bain-marie à 170°C pendant 1h20.',
      'Laissez refroidir complètement puis placez au réfrigérateur 24h avant de servir en tranches avec des cornichons et du pain de campagne.'
    ],
    ingredients: [
      { ingredientId: 'ing-ground-pork', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-cognac', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-walnuts', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-bay-leaf', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Charcuterie', 'Entrée', 'Campagne', 'Tradition']
  },
  {
    id: 'rec-fr-flan-courgettes',
    title: 'Flan Fondant de Courgettes à la Menthe et Parmesan (Zucchini & Herb Flan)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Entrée légère et parfumée de courgettes poêlées à l’huile d’olive prises dans un appareil aux œufs battus et parmesan.',
    instructions: [
      'Râpez les courgettes et faites-les sauter 8 minutes à la poêle dans 2 cuillères d’huile d’olive avec l’ail haché pour évacuer l’eau.',
      'Dans un saladier, battez les œufs avec la crème fraîche, le parmesan râpé, le sel, le poivre et la muscade.',
      'Incorporez les courgettes tiédies et le basilic ciselé.',
      'Versez dans un moule à cake beurré et enfournez à 180°C pendant 35 minutes.',
      'Laissez tiédir ou refroidir avant de découper en tranches.'
    ],
    ingredients: [
      { ingredientId: 'ing-zucchini', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-parmesan', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-basil', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Légumes', 'Été', 'Végétarien']
  },
  {
    id: 'rec-fr-avocat-crevettes',
    title: 'Avocat Cocktail aux Crevettes Sauce Marie-Rose (Avocado Shrimp Cocktail)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Grand classique rétro des tables françaises : demi-avocats mûrs garnis de crevettes roses fraîches et d’une sauce cocktail au cognac.',
    instructions: [
      'Décortiquez les crevettes roses.',
      'Préparez la sauce cocktail : mélangez la mayonnaise avec 1 c. à soupe de ketchup/sauce tomate, quelques gouttes de cognac, de jus de citron et une pointe de piment d’Espelette.',
      'Coupez les avocats en deux, ôtez les noyaux et arrosez-les d’un filet de jus de citron.',
      'Mélangez la moitié des crevettes avec la sauce cocktail et remplissez la cavité des avocats.',
      'Décorez avec les plus belles crevettes entières restantes et un brin de ciboulette fraîche.'
    ],
    ingredients: [
      { ingredientId: 'ing-avocado', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-shrimp', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-mayonnaise', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-tomato-paste', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-cognac', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Entrée', 'Fruits de mer', 'Rapide', 'Classique']
  },
  {
    id: 'rec-fr-tartines-campagnardes',
    title: 'Tartines Campagnardes au Jambon de Bayonne et Cantal Fondu (Toasted Bayonne & Cantal Tartines)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 8,
    difficulty: 'easy',
    description: 'Grandes tranches de pain de campagne grillées garnies de moutarde à l’ancienne, jambon de Bayonne et cantal gratiné.',
    instructions: [
      'Badigeonnez les tranches de pain de campagne avec une fine couche de moutarde à l’ancienne.',
      'Déposez sur chaque tartine une belle tranche de jambon de Bayonne.',
      'Recouvrez généreusement de tranches ou de copeaux de cantal.',
      'Passez sous le gril du four à 210°C pendant 7 à 8 minutes jusqu’à ce que le fromage soit gratiné.',
      'Poivrez et dégustez avec une salade verte.'
    ],
    ingredients: [
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-ham-bayonne', quantity: 4, unit: 'slice' },
      { ingredientId: 'ing-cantal', quantity: 160, unit: 'g' },
      { ingredientId: 'ing-grainy-mustard', quantity: 2, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Auvergne', 'Entrée', 'Bistrot', 'Rapide']
  },
  {
    id: 'rec-fr-champignons-farcis-ail-persil',
    title: 'Gros Champignons Farcis au Beurre d’Ail et Chapelure (Garlic-Stuffed Button Mushrooms)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 18,
    difficulty: 'easy',
    description: 'Chapeaux de champignons de Paris généreusement garnis d’un hachis de leurs pieds persillés, ail, beurre et chapelure croustillante.',
    instructions: [
      'Nettoyez les champignons et retirez délicatement les pieds.',
      'Hachez finement les pieds avec l’ail et le persil plat.',
      'Faites revenir ce hachis 5 minutes dans 20 g de beurre à la poêle.',
      'Mélangez avec la chapelure et 20 g de parmesan.',
      'Disposez les chapeaux de champignons dans un plat à four, remplissez-les de farce et déposez une noisette de beurre sur chacun.',
      'Enfournez à 190°C pendant 18 minutes jusqu’à belle croûte dorée.'
    ],
    ingredients: [
      { ingredientId: 'ing-mushroom', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-breadcrumbs', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-parmesan', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Végétarien', 'Bistrot']
  },
  {
    id: 'rec-fr-artichaut-vinaigrette',
    title: 'Artichauts Camus Vapeur Sauce Vinaigrette Moutardée (Steamed Artichokes with Vinaigrette)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'L’apéritif traditionnel breton : gros artichauts camus cuits à cœur dont on effeuille les feuilles trempées dans une savoureuse vinaigrette.',
    instructions: [
      'Cassez la queue des artichauts d’un coup sec pour retirer les fibres dures. Rincez-les abondamment.',
      'Plongez les artichauts dans une grande marmite d’eau bouillante salée citronnée et faites cuire 35 minutes (une feuille doit se détacher facilement).',
      'Égouttez-les tête en bas.',
      'Préparez la vinaigrette : mélangez la moutarde de Dijon, le vinaigre de vin rouge, l’échalote hachée, l’huile de tournesol, sel et poivre.',
      'Dégustez tiède ou froid en trempant chaque feuille puis terminez par le cœur fondant.'
    ],
    ingredients: [
      { ingredientId: 'ing-artichoke', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 2, unit: 'tsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-sunflower-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-shallot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Entrée', 'Végétarien', 'Tradition']
  },
  {
    id: 'rec-fr-asperges-sauce-mousseline',
    title: 'Asperges Blanches Fraîches Sauce Mousseline Aérienne (White Asparagus with Mousseline Sauce)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 15,
    difficulty: 'medium',
    description: 'Asperges fondantes de saison nappées d’une sauce mousseline onctueuse alliant une mayonnaise tiède au beurre et blancs d’œufs battus.',
    instructions: [
      'Épluchez les asperges de la pointe vers le talon et coupez l’extrémité dure.',
      'Faites-les cuire 15 minutes dans de l’eau bouillante salée jusqu’à tendreté.',
      'Préparez la sauce mousseline : montez une mayonnaise avec jaune d’œuf, moutarde et huile. Incorporez délicatement un blanc d’œuf monté en neige ferme avec un filet de jus de citron.',
      'Dressez les asperges tièdes sur un plat de service et nappez de sauce mousseline légère.'
    ],
    ingredients: [
      { ingredientId: 'ing-asparagus', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-sunflower-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-lemon', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Printemps', 'Gastronomie']
  },
  {
    id: 'rec-fr-rillettes-sardines',
    title: 'Rillettes Express de Sardines au Beurre Demi-Sel et Citron (Quick Sardine Rillettes)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Tartinade apéritive bretonne préparée en 5 minutes avec sardines à l’huile, beurre demi-sel pommade, jus de citron et ciboulette.',
    instructions: [
      'Égouttez les sardines et écrasez-les à la fourchette dans un bol.',
      'Ajoutez le beurre demi-sel ramolli et travaillez à la fourchette pour obtenir une texture onctueuse et liée.',
      'Incorporez le jus de citron, la ciboulette ciselée, l’échalote hachée et une pincée de piment d’Espelette.',
      'Réservez 20 minutes au frais.',
      'Servez avec des tartines de baguette grillée.'
    ],
    ingredients: [
      { ingredientId: 'ing-canned-tuna', quantity: 2, unit: 'can' },
      { ingredientId: 'ing-salted-butter', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-shallot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-espelette-pepper', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Entrée', 'Apéritif', 'Rapide']
  }
];
