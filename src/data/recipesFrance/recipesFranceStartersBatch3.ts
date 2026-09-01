import { Recipe } from '../../types';

export const RECIPES_FRANCE_STARTERS_BATCH3: Recipe[] = [
  {
    id: 'rec-fr-veloute-carottes-cumin',
    title: 'Velouté Doux de Carottes au Cumin et Crème d’Isigny (Carrot & Cumin Velouté)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Soupe orangée soyeuse de carottes nouvelles mijotées au bouillon, relevée d’une pincée de cumin et enrichie de crème.',
    instructions: [
      'Épluchez et coupez les carottes et pommes de terre en rondelles.',
      'Faites revenir l’oignon émincé dans le beurre avec 1 c. à café de cumin en poudre pendant 3 minutes.',
      'Ajoutez les carottes, les pommes de terre et mouillez avec le bouillon de légumes.',
      'Laissez cuire 25 minutes à feu moyen.',
      'Mixez finement avec la crème fraîche jusqu’à consistance veloutée.',
      'Salez, poivrez et servez avec un brin de coriandre ou persil.'
    ],
    ingredients: [
      { ingredientId: 'ing-carrot', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-cumin', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-vegetable-broth', quantity: 700, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Soupe', 'Légumes', 'Végétarien']
  },
  {
    id: 'rec-fr-gaspacho-courgettes-menthe',
    title: 'Gaspacho Frais de Courgettes à la Menthe et Chèvre Frais (Chilled Zucchini & Mint Soup)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Soupe glacée estivale de courgettes tendres cuites puis mixées froides avec de la menthe fraîche et du fromage de chèvre crémeux.',
    instructions: [
      'Lavez les courgettes et coupez-les en rondelles.',
      'Faites-les cuire 10 minutes dans de l’eau bouillante salée. Égouttez-les et plongez-les dans l’eau glacée pour fixer la couleur verte.',
      'Mixez les courgettes avec les feuilles de menthe fraîche, le fromage de chèvre, l’huile d’olive, sel et poivre.',
      'Placez au réfrigérateur au moins 2 heures.',
      'Servez très frais avec un filet d’huile d’olive et des pignons grillés.'
    ],
    ingredients: [
      { ingredientId: 'ing-zucchini', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-goat-cheese', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-mint', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Été', 'Soupe froide', 'Frais']
  },
  {
    id: 'rec-fr-tarte-tatin-echalotes',
    title: 'Tarte Tatin Salée aux Échalotes Caramélisées au Balsamique (Caramelized Shallot Tatin)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    difficulty: 'medium',
    description: 'Échalotes françaises confites et fondantes au caramel balsamique et thym, sous une pâte feuilletée croustillante.',
    instructions: [
      'Épluchez 500 g d’échalotes et coupez-les en deux dans la longueur.',
      'Dans une poêle allant au four, faites fondre le beurre avec le sucre et le vinaigre balsamique.',
      'Disposez les demi-échalotes face coupée contre le fond.',
      'Laissez confire à feu doux pendant 15 minutes avec le thym effeuillé.',
      'Recouvrez avec la pâte feuilletée en repliant les bords.',
      'Enfournez à 190°C pendant 25 minutes.',
      'Démoulez tiède et servez avec une salade de roquette.'
    ],
    ingredients: [
      { ingredientId: 'ing-shallot', quantity: 12, unit: 'unit' },
      { ingredientId: 'ing-puff-pastry', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-balsamic-vinegar', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-brown-sugar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Tarte', 'Bistrot', 'Végétarien']
  },
  {
    id: 'rec-fr-salade-betteraves-chevre',
    title: 'Salade de Betteraves Rôties au Chèvre et Vinaigrette Échalote (Roasted Beet & Goat Cheese Salad)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Dés de betteraves tendres marinés à l’échalote et vinaigre de vin, surmontés de morceaux de chèvre affiné et cerneaux de noix.',
    instructions: [
      'Coupez les betteraves cuites en dés réguliers.',
      'Hachez finement l’échalote et la ciboulette.',
      'Préparez la vinaigrette en mélangeant la moutarde, le vinaigre, l’huile d’olive, l’échalote, sel et poivre.',
      'Mélangez les betteraves avec la sauce.',
      'Disposez sur les assiettes, émiettez le chèvre par-dessus et parsemez de noix concassées et de ciboulette.'
    ],
    ingredients: [
      { ingredientId: 'ing-goat-cheese', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-walnuts', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-chives', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Salade', 'Bistrot', 'Facile']
  },
  {
    id: 'rec-fr-poelee-champignons-ail-persil',
    title: 'Poêlée Forestière de Champignons à l’Ail et Persil Plat (Garlic & Herb Sautéed Mushrooms)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    difficulty: 'easy',
    description: 'Champignons dorés au beurre et huile d’olive à feu vif, assaisonnés d’une persillade généreuse et servis sur toast.',
    instructions: [
      'Brossez les champignons et émincez-les en gros morceaux.',
      'Faites chauffer le beurre et l’huile dans une grande poêle à feu vif.',
      'Jetez les champignons et saisissez-les 6 à 8 minutes sans remuer constamment pour qu’ils dorent.',
      'Ajoutez l’ail haché et le persil plat ciselé en fin de cuisson pendant 1 minute.',
      'Salez à la fleur de sel, donnez un tour de poivre noir et servez sur des tranches de baguette toastées.'
    ],
    ingredients: [
      { ingredientId: 'ing-mushroom', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-parsley', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-olive-oil', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Entrée', 'Bistrot', 'Champignons', 'Rapide']
  },
  {
    id: 'rec-fr-clafoutis-sale-tomates-chevre',
    title: 'Clafoutis Salé aux Tomates Cerises, Chèvre et Basilic (Savory Cherry Tomato Clafoutis)',
    categoryId: 'rcat-starters',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Clafoutis salé doré aux petites tomates cerises juteuses éclatées au four avec des rondelles de chèvre et parfum de basilic.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez un plat à gratin.',
      'Lavez les tomates cerises et disposez-les entières au fond du plat avec des morceaux de chèvre.',
      'Dans un saladier, fouettez les 4 œufs avec la crème liquide, le lait et la farine.',
      'Assaisonnez de sel, poivre et muscade.',
      'Versez la pâte sur les tomates et le fromage.',
      'Enfournez 30 minutes jusqu’à texture ferme et dorée. Décorez de basilic frais.'
    ],
    ingredients: [
      { ingredientId: 'ing-cherry-tomatoes', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-goat-cheese', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-flour', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 200, unit: 'ml' },
      { ingredientId: 'ing-heavy-cream', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-basil', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Été', 'Végétarien', 'Facile']
  },
  {
    id: 'rec-fr-pain-perdu-sale-comte-jambon',
    title: 'Pain Perdu Salé au Comté Affiné et Jambon Blanc (Savory French Toast with Comté)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 8,
    difficulty: 'easy',
    description: 'Tranches épaisses de baguette rassie imbibées d’œufs et de lait, garnies de jambon et comté puis dorées à la poêle.',
    instructions: [
      'Battez les œufs avec le lait, sel, poivre et une pincée de muscade.',
      'Trempez les tranches de pain dans le mélange pour bien les imbiber.',
      'Faites fondre le beurre dans une grande poêle.',
      'Déposez les tranches de pain, recouvrez de jambon et d’une poignée de comté râpé.',
      'Faites dorer 3 à 4 minutes par face à feu moyen jusqu’à ce que le fromage soit fondu et le pain croustillant.',
      'Servez aussitôt avec une salade verte.'
    ],
    ingredients: [
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-milk', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-ham-paris', quantity: 2, unit: 'slice' },
      { ingredientId: 'ing-gruyere', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Anti-Gaspillage', 'Entrée', 'Brunch', 'Rapide']
  },
  {
    id: 'rec-fr-veloute-petits-pois-menthe',
    title: 'Velouté de Petits Pois Nouveaux à la Menthe Fraîche (Sweet Pea & Fresh Mint Velouté)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Soupe printanière éclatante de petits pois doux mijotés au bouillon blanc avec échalotes et feuilles de menthe fraîche.',
    instructions: [
      'Faites revenir les échalotes émincées dans le beurre 3 minutes.',
      'Ajoutez les petits pois et le bouillon de volaille ou légumes. Portez à ébullition et cuisez 10 minutes.',
      'Ajoutez les feuilles de menthe fraîche et la crème fraîche.',
      'Mixez immédiatement pour conserver la magnifique couleur vert vif.',
      'Passez au chinois si désiré, assaisonnez et servez chaud ou froid.'
    ],
    ingredients: [
      { ingredientId: 'ing-green-peas', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-chicken-broth', quantity: 600, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-mint', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Printemps', 'Entrée', 'Soupe', 'Frais']
  }
];
