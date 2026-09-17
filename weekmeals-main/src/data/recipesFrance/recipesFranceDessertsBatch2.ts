import { Recipe } from '../../types';

export const RECIPES_FRANCE_DESSERTS_BATCH2: Recipe[] = [
  {
    id: 'rec-fr-galette-rois-frangipane',
    title: 'Galette des Rois Traditionnelle à la Frangipane (French Epiphany Frangipane Cake)',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 30,
    cookTimeMinutes: 35,
    difficulty: 'medium',
    description: 'Pâte feuilletée pur beurre dorée et croustillante renfermant une crème frangipane onctueuse aux amandes et rhum ambré.',
    instructions: [
      'Préparez la crème d’amandes : travaillez le beurre pommade avec le sucre en poudre jusqu’à mélange crémeux.',
      'Ajoutez la poudre d’amandes, 2 œufs un à un et le rhum ambré. Mélangez pour obtenir une texture bien homogène.',
      'Déroulez un premier disque de pâte feuilletée sur une plaque tapissée de papier cuisson.',
      'Étalez la frangipane en laissant une bordure de 2 cm tout autour. Insérez la fève.',
      'Humidifiez la bordure avec un peu d’eau, puis recouvrez avec le second disque de pâte feuilletée. Soudez les bords en appuyant délicatement.',
      'Dorez la surface avec un jaune d’œuf battu avec une larme de lait.',
      'Réalisez un joli décor en rosace ou croisillons avec la pointe d’un couteau et percez un petit trou au centre (cheminée).',
      'Placez 30 minutes au réfrigérateur.',
      'Enfournez à 180°C pendant 35 minutes jusqu’à magnifique teinte dorée.',
      'Dégustez tiède.'
    ],
    ingredients: [
      { ingredientId: 'ing-puff-pastry', quantity: 2, unit: 'pack' },
      { ingredientId: 'ing-almond-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-rum', quantity: 2, unit: 'tbsp' }
    ],
    tags: ['French', 'France', 'Dessert', 'Épiphanie', 'Pâtisserie', 'Tradition', 'Fêtes']
  },
  {
    id: 'rec-fr-far-breton-pruneaux',
    title: 'Far Breton Authentique aux Pruneaux d’Agen et Beurre Demi-Sel (Breton Custard Flan with Prunes)',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 15,
    cookTimeMinutes: 50,
    difficulty: 'easy',
    description: 'Flan pâtissier breton ultra-fondant et dense, garni de pruneaux d’Agen moelleux marinés au rhum et enrichi au beurre demi-sel.',
    instructions: [
      'Préchauffez le four à 180°C. Beurrez généreusement un plat à gratin avec du beurre demi-sel.',
      'Faites tiédir les pruneaux dans un bol avec 2 cuillères de rhum ambré.',
      'Dans un saladier, fouettez les 4 œufs avec le sucre et le sucre vanillé.',
      'Ajoutez la farine et une pincée de sel, puis délayez petit à petit avec le lait entier tiédi.',
      'Incorporez le beurre demi-sel fondu et le rhum.',
      'Disposez les pruneaux égouttés au fond du plat et versez la pâte liquide par-dessus.',
      'Enfournez pour 50 minutes jusqu’à ce que le far soit bien pris et joliment bruni sur le dessus.',
      'Laissez refroidir complètement avant de découper en gros carrés fondants.'
    ],
    ingredients: [
      { ingredientId: 'ing-prunes', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 130, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 750, unit: 'ml' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-salted-butter', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-rum', quantity: 3, unit: 'tbsp' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Dessert', 'Flan', 'Terroir', 'Classique']
  },
  {
    id: 'rec-fr-pain-perdu-brioche-vanille',
    title: 'Pain Perdu à la Brioche Pur Beurre, Vanille et Sucre Roux (Caramelized Brioche French Toast)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 8,
    difficulty: 'easy',
    description: 'Épaisses tranches de brioche pur beurre moelleuse imbibées d’un appareil au lait vanillé et œufs, caramélisées au beurre mousseux et cassonade.',
    instructions: [
      'Coupez la brioche en tranches épaisses de 2,5 cm.',
      'Dans un plat creux, fouettez les œufs avec le lait, la crème, le sucre et les graines de vanille.',
      'Trempez les tranches de brioche quelques secondes de chaque côté pour bien les imbiber.',
      'Faites fondre une belle noix de beurre dans une grande poêle avec une cuillère de cassonade.',
      'Déposez les tranches de brioche et faites-les dorer 3 minutes par face jusqu’à belle caramélisation croustillante.',
      'Servez immédiatement avec des fruits frais ou une boule de glace.'
    ],
    ingredients: [
      { ingredientId: 'ing-brioche', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-milk', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-heavy-cream', quantity: 50, unit: 'ml' },
      { ingredientId: 'ing-brown-sugar', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Dessert', 'Brunch', 'Goûter', 'Gourmand', 'Rapide']
  },
  {
    id: 'rec-fr-sables-bretons-pur-beurre',
    title: 'Sablés Bretons Traditionnels au Beurre Demi-Sel (Breton Butter Shortbread)',
    categoryId: 'rcat-desserts',
    servings: 8,
    prepTimeMinutes: 20,
    cookTimeMinutes: 18,
    difficulty: 'easy',
    description: 'Biscuits épais, friables et fondants au goût incomparable de beurre demi-sel breton et fleur de sel.',
    instructions: [
      'Dans un saladier, fouettez les jaunes d’œufs avec le sucre jusqu’à ce que le mélange blanchisse.',
      'Incorporez le beurre demi-sel pommade en morceaux pour obtenir une crème lisse.',
      'Ajoutez la farine et la levure chimique tamisées avec la fleur de sel.',
      'Mélangez sans trop pétrir pour former une boule de pâte.',
      'Enveloppez dans du film alimentaire et laissez reposer au réfrigérateur pendant 1 heure.',
      'Étalez la pâte sur 1 cm d’épaisseur et découpez des disques à l’aide d’un emporte-pièce de 5 cm.',
      'Placez les disques de pâte à l’intérieur de cercles de cuisson (pour éviter qu’ils ne s’étalent).',
      'Enfournez à 170°C pendant 18 minutes jusqu’à couleur dorée ambrée.',
      'Laissez refroidir complètement avant de retirer les cercles.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-salted-butter', quantity: 140, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-fleur-de-sel', quantity: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Bretagne', 'Dessert', 'Biscuits', 'Goûter', 'Tradition']
  },
  {
    id: 'rec-fr-poire-belle-helene',
    title: 'Poires Belle-Hélène au Chocolat Chaud Fondu et Glace Vanille (Poached Pears Belle-Hélène)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Poires Williams entières pochées dans un sirop vanillé, servies tièdes sur un lit de glace à la vanille et nappées d’une sauce au chocolat noir veloutée.',
    instructions: [
      'Dans une casserole, portez à ébullition 750 ml d’eau avec 150 g de sucre et la gousse de vanille fendue.',
      'Épluchez les poires en conservant la queue et évidez délicatement le cœur par la base.',
      'Plongez les poires dans le sirop frémissant et laissez pocher 20 minutes jusqu’à ce qu’elles soient très tendres. Laissez tiédir dans le sirop.',
      'Faites fondre le chocolat noir avec la crème liquide et une noisette de beurre pour obtenir une sauce onctueuse et brillante.',
      'Dans de jolies coupes, déposez une boule de glace vanille, installez une poire égouttée au centre.',
      'Nappez généreusement de sauce chocolat chaud et parsemez d’amandes effilées toastées.'
    ],
    ingredients: [
      { ingredientId: 'ing-pear', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-dark-chocolate', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-heavy-cream', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-sugar', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-vanilla-bean', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-almonds-flaked', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 15, unit: 'g' }
    ],
    tags: ['French', 'France', 'Dessert', 'Chocolat', 'Poires', 'Bistrot', 'Classique']
  }
];
