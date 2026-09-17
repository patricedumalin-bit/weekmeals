import { Recipe } from '../../types';

export const RECIPES_FRANCE_STARTERS_PART2: Recipe[] = [
  {
    id: 'rec-fr-salade-lentilles-lardons',
    title: 'Salade Tiède de Lentilles Vertes du Puy aux Lardons (Warm Puy Lentil Salad)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Lentilles vertes AOP du Puy cuites au bouillon aromatique, servies tièdes avec lardons fumés dorés, échalotes et vinaigrette moutardée.',
    instructions: [
      'Rincez les lentilles du Puy et déposez-les dans une casserole avec 3 fois leur volume d’eau froide, le thym et le laurier. Portez à ébullition et cuisez 25 minutes.',
      'Faites dorer les lardons à la poêle pendant 5 minutes. Égouttez.',
      'Préparez la vinaigrette : mélangez la moutarde à l’ancienne, le vinaigre de vin rouge, l’huile de tournesol, sel et poivre.',
      'Égouttez les lentilles encore tièdes, mélangez avec la vinaigrette, les échalotes émincées et les lardons croustillants.',
      'Parsemez de persil plat ciselé avant de servir.'
    ],
    ingredients: [
      { ingredientId: 'ing-brown-lentils', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-grainy-mustard', quantity: 2, unit: 'tsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-sunflower-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-bay-leaf', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Auvergne', 'Entrée', 'Bistrot', 'Salade']
  },
  {
    id: 'rec-fr-salade-nicoise-authentique',
    title: 'Salade Niçoise Traditionnelle (Authentic Nice Salad)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'La vraie salade niçoise : tomates en quartiers, poivron vert croquant, radis, œufs durs, thon au naturel, olives noires de Nice et basilic frais.',
    instructions: [
      'Faites cuire les œufs 9 minutes à l’eau bouillante, rafraîchissez-les et coupez-les en quartiers.',
      'Lavez et coupez les tomates en quartiers. Émincez le poivron vert et l’oignon rouge très finement.',
      'Dans un grand plat, disposez les tomates, les lanières de poivron, l’oignon rouge, le thon égoutté et les olives noires.',
      'Disposez les quartiers d’œufs durs par-dessus.',
      'Arrosez généreusement d’une excellente huile d’olive vierge extra, salez à la fleur de sel, poivrez et parsemez de basilic frais ciselé.'
    ],
    ingredients: [
      { ingredientId: 'ing-tomato', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-bell-pepper-green', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-red-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-canned-tuna', quantity: 2, unit: 'can' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-black-olives', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-olive-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-basil', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Nice', 'Provence', 'Entrée', 'Salade', 'Été']
  },
  {
    id: 'rec-fr-oeufs-cocotte-creme-ciboulette',
    title: 'Œufs Cocotte à la Crème d’Isigny et Ciboulette (Creamy Baked Cocotte Eggs)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    difficulty: 'easy',
    description: 'Petits ramequins individuels d’œufs cuits au bain-marie dans une crème fraîche onctueuse parfumée à la ciboulette et muscade.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez 4 ramequins individuels.',
      'Déposez 1 cuillère à soupe généreuse de crème fraîche épaisse au fond de chaque ramequin.',
      'Cassez délicatement 1 œuf entier dans chaque ramequin sans percer le jaune.',
      'Ajoutez une deuxième cuillère de crème sur le blanc, salez, poivrez et ajoutez une pincée de noix de muscade.',
      'Placez les ramequins dans un grand plat à four rempli d’eau chaude à mi-hauteur (bain-marie).',
      'Faites cuire 12 minutes au four jusqu’à ce que le blanc soit pris et le jaune encore coulant.',
      'Parsemez de ciboulette fraîche et servez avec des mouillettes de baguette beurrée.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 8, unit: 'tbsp' },
      { ingredientId: 'ing-butter', quantity: 15, unit: 'g' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Bistrot', 'Brunch', 'Facile']
  },
  {
    id: 'rec-fr-oeufs-cocotte-roquefort-noix',
    title: 'Œufs Cocotte au Roquefort et Noix Croquantes (Roquefort & Walnut Cocotte Eggs)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    difficulty: 'easy',
    description: 'Ramequins d’œufs au four nappés de crème fraîche, dés de roquefort crémeux et cerneaux de noix torréfiés.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez 4 ramequins.',
      'Émiettez le roquefort au fond des ramequins avec la crème fraîche.',
      'Cassez 1 œuf dans chaque ramequin.',
      'Ajoutez les cerneaux de noix concassés et un tour de moulin à poivre.',
      'Enfournez au bain-marie pendant 12 minutes.',
      'Servez brûlant avec des tranches de pain de campagne.'
    ],
    ingredients: [
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-roquefort', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 6, unit: 'tbsp' },
      { ingredientId: 'ing-walnuts', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Fromage', 'Bistrot']
  },
  {
    id: 'rec-fr-salade-endives-roquefort',
    title: 'Salade d’Endives aux Noix et Roquefort (Endive, Walnut & Roquefort Salad)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Fraîcheur et croquant des endives de saison associées à la puissance du roquefort, au croustillant des noix et à une vinaigrette à l’huile de noix.',
    instructions: [
      'Émincez les endives en tronçons de 2 cm en retirant le cône amer à la base.',
      'Coupez le roquefort en petits dés.',
      'Dans un saladier, fouettez la moutarde de Dijon avec le vinaigre de cidre, l’huile d’olive, sel et poivre.',
      'Ajoutez les endives, le roquefort émietté et les cerneaux de noix concassés.',
      'Mélangez délicatement et servez immédiatement.'
    ],
    ingredients: [
      { ingredientId: 'ing-endive', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-roquefort', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-walnuts', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-cider-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Hiver', 'Entrée', 'Salade', 'Classique']
  },
  {
    id: 'rec-fr-tarte-fine-tomates-moutarde',
    title: 'Tarte Fine aux Tomates, Moutarde de Dijon et Herbes (Dijon Tomato Tart)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Pâte feuilletée croustillante badigeonnée de moutarde forte, recouverte de rondelles de tomates mûres et parsemée d’herbes de Provence.',
    instructions: [
      'Déroulez la pâte feuilletée sur une plaque de cuisson et piquez-la avec une fourchette.',
      'Étalez 2 cuillères à soupe de moutarde de Dijon sur tout le fond de tarte en laissant un bord de 1 cm.',
      'Parsemez la moitié du comté ou emmental râpé pour absorber le jus des tomates.',
      'Disposez les rondelles de tomates en rosace serrée.',
      'Salez, poivrez, parsemez d’herbes de Provence et arrosez d’un filet d’huile d’olive.',
      'Enfournez à 200°C pendant 30 minutes jusqu’à ce que la pâte soit bien dorée et croustillante.'
    ],
    ingredients: [
      { ingredientId: 'ing-puff-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-tomato', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-emmental', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-herbes-provence', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Tarte', 'Été', 'Végétarien']
  },
  {
    id: 'rec-fr-tarte-oignons-alsacienne',
    title: 'Tarte aux Oignons Alsacienne Traditionnelle (Alsatian Onion Tart)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Tarte salée alsacienne généreusement garnie d’oignons fondus au beurre, d’œufs frais, de crème épaisse et de lardons fumés.',
    instructions: [
      'Émincez finement 5 oignons jaunes.',
      'Faites-les fondre doucement avec le beurre dans une sauteuse pendant 20 minutes sans coloration avec les lardons.',
      'Foncez un moule avec la pâte brisée.',
      'Battez les œufs avec la crème fraîche, muscade, sel et poivre.',
      'Mélangez les oignons et les lardons à la préparation liquide et versez sur le fond de tarte.',
      'Faites cuire à 190°C pendant 35 à 40 minutes.'
    ],
    ingredients: [
      { ingredientId: 'ing-shortcrust-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-onion', quantity: 5, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-creme-fraiche', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Alsace', 'Entrée', 'Tarte', 'Tradition']
  },
  {
    id: 'rec-fr-camembert-roti-miel-thym',
    title: 'Camembert de Normandie Rôti au Four au Miel et Thym (Baked Camembert with Honey & Thyme)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 5,
    cookTimeMinutes: 18,
    difficulty: 'easy',
    description: 'Camembert entier coulant cuit dans sa boîte en bois, entaillé en croisillons, arrosé de miel de fleurs, vin blanc et thym frais.',
    instructions: [
      'Retirez le papier entourant le camembert et replacez le fromage dans sa boîte en bois sans le couvercle.',
      'Incisez la croûte supérieure en croisillons avec la pointe d’un couteau.',
      'Arrosez de 2 cuillères de vin blanc sec et d’une belle cuillère de miel liquide.',
      'Insérez des brins de thym frais dans les entailles et donnez un tour de moulin à poivre.',
      'Enfournez à 190°C pendant 18 minutes jusqu’à ce que le cœur soit complètement fondu et bouillonnant.',
      'Servez immédiatement en trempant des morceaux de baguette croustillante.'
    ],
    ingredients: [
      { ingredientId: 'ing-camembert', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-honey', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-white-wine', quantity: 30, unit: 'ml' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Normandie', 'Entrée', 'Apéritif', 'Fromage', 'Rapide']
  },
  {
    id: 'rec-fr-cake-sale-olives-jambon',
    title: 'Cake Salé aux Olives Vertes, Jambon de Paris et Emmental (Ham & Olive Savory Loaf)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 45,
    difficulty: 'easy',
    description: 'Le cake salé incontournable des pique-niques et apéritifs français : dés de jambon supérieur, olives dénoyautées et emmental fondant.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez un moule à cake.',
      'Dans un saladier, fouettez les 3 œufs avec la farine et la levure chimique.',
      'Incorporez petit à petit l’huile de tournesol et le lait tiédi.',
      'Ajoutez l’emmental râpé, les dés de jambon de Paris et les olives vertes égouttées et coupées en rondelles.',
      'Poivrez bien (inutile de trop saler car les olives et le jambon apportent du sel).',
      'Versez dans le moule et faites cuire 45 minutes à 180°C.',
      'Laissez refroidir avant de découper en tranches épaisses.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-milk', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-sunflower-oil', quantity: 80, unit: 'ml' },
      { ingredientId: 'ing-ham-paris', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-green-olives', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-emmental', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Apéritif', 'Pique-Nique', 'Classique']
  },
  {
    id: 'rec-fr-veloute-champignons-paris',
    title: 'Velouté Onctueux de Champignons de Paris à la Crème (Creamy Mushroom Velouté)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Soupe crémeuse et réconfortante aux champignons de Paris dorés au beurre doux, échalotes, ail et bouillon de volaille.',
    instructions: [
      'Émincez les champignons et les échalotes.',
      'Dans une casserole, faites fondre le beurre et faites revenir les échalotes et les champignons pendant 7 minutes.',
      'Ajoutez la gousse d’ail écrasée, puis versez le bouillon de volaille chaud.',
      'Laissez mijoter 15 minutes à feu moyen.',
      'Ajoutez la crème fraîche, mixez au mixeur plongeant jusqu’à consistance veloutée.',
      'Assaisonnez de sel et poivre, servez avec du persil frais ciselé et quelques lamelles de champignons dorés poêlés.'
    ],
    ingredients: [
      { ingredientId: 'ing-mushroom', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 1, unit: 'clove' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-chicken-broth', quantity: 600, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Soupe', 'Automne', 'Bistrot']
  },
  {
    id: 'rec-fr-veloute-poireaux-pommes-de-terre',
    title: 'Potage Poireaux-Pommes de Terre de Grand-Mère (Grandma’s Leek & Potato Soup)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Le potage familial du soir par excellence : poireaux fondants et pommes de terre fondantes mijotés ensemble et enrichis d’une noix de beurre frais.',
    instructions: [
      'Lavez et émincez 3 gros poireaux. Épluchez et coupez en cubes 400 g de pommes de terre.',
      'Dans un faitout, faites suer les poireaux dans le beurre pendant 5 minutes.',
      'Ajoutez les pommes de terre et couvrez d’eau (environ 1 litre). Salez avec 1 cuillère à café de gros sel.',
      'Laissez cuire à feu moyen pendant 25 minutes à couvert.',
      'Mixez au moulin à légumes ou mixeur plongeant selon la texture désirée (moulinée ou veloutée).',
      'Ajoutez une cuillerée de crème fraîche épaisse et servez bien chaud avec des croûtons.'
    ],
    ingredients: [
      { ingredientId: 'ing-leek', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-baguette', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Soupe', 'Famille', 'Tradition']
  },
  {
    id: 'rec-fr-tartare-boeuf-bistrot',
    title: 'Tartare de Bœuf Traditionnel au Couteau (Classic French Beef Tartare)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 0,
    difficulty: 'medium',
    description: 'Bœuf ultra-frais taillé au couteau, assaisonné de câpres, cornichons, échalotes, moutarde de Dijon, sauce Worcestershire, tabasco et jaune d’œuf.',
    instructions: [
      'Taillez la viande de bœuf très fraîche au couteau en très petits dés réguliers (ne pas utiliser de hachoir).',
      'Ciselez très finement les échalotes et le persil plat.',
      'Dans un bol, mélangez le jaune d’œuf avec la moutarde de Dijon, la sauce Worcestershire, l’huile d’olive, une pointe de piment, sel et poivre.',
      'Incorporez la viande et les échalotes à l’assaisonnement, mélangez délicatement.',
      'Dressez à l’emporte-pièce sur les assiettes avec un jaune d’œuf sur le dessus et servez avec des frites maison ou du pain toasté.'
    ],
    ingredients: [
      { ingredientId: 'ing-ground-beef', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 2, unit: 'tsp' },
      { ingredientId: 'ing-worcestershire', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Bistrot', 'Entrée', 'Viande', 'Classique']
  }
];
