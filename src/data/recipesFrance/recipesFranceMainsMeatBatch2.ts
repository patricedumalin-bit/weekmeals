import { Recipe } from '../../types';

export const RECIPES_FRANCE_MAINS_MEAT_BATCH2: Recipe[] = [
  {
    id: 'rec-fr-poulet-vallee-dauge',
    title: 'Poulet Vallée d’Auge au Cidre et Calvados Flambé (Normandy Chicken Vallée d’Auge)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    difficulty: 'medium',
    description: 'Morceaux de poulet fermier dorés au beurre normand, flambés au calvados, mijotés au cidre brut avec champignons de Paris, pommes fruits et crème d’Isigny.',
    instructions: [
      'Dans une cocotte, faites dorer les morceaux de poulet dans le beurre demi-sel pendant 10 minutes.',
      'Flambez avec le calvados ou cognac.',
      'Ajoutez les échalotes émincées, les champignons coupés en quatre et les quartiers de pommes.',
      'Versez le cidre brut de Normandie et le bouillon de volaille. Ajoutez le thym et le laurier.',
      'Laissez mijoter à couvert pendant 35 minutes.',
      'Retirez le poulet et les pommes, faites réduire la sauce de tiers, puis incorporez la crème fraîche épaisse.',
      'Nappez le poulet de cette sauce onctueuse et servez avec des tagliatelles.'
    ],
    ingredients: [
      { ingredientId: 'ing-chicken-thighs', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-cider', quantity: 300, unit: 'ml' },
      { ingredientId: 'ing-cognac', quantity: 40, unit: 'ml' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-apple', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-mushroom', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-salted-butter', quantity: 35, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Normandie', 'Plat', 'Poulet', 'Pommes', 'Tradition']
  },
  {
    id: 'rec-fr-gigot-agneau-pleureur',
    title: 'Gigot d’Agneau Rôti à l’Ail et Romarin (Roast Leg of Lamb with Garlic)',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 50,
    difficulty: 'medium',
    description: 'Gigot d’agneau piqué de gousses d’ail et de romarin frais, rôti sur un lit de pommes de terre boulangères qui s’imprègnent des sucs de cuisson.',
    instructions: [
      'Préchauffez le four à 200°C.',
      'Piquez le gigot d’agneau de lamelles d’ail en pratiquant de petites incisions au couteau.',
      'Massez la viande avec de l’huile d’olive, du romarin haché, du gros sel et du poivre noir.',
      'Dans un grand plat à rôtir, disposez des rondelles de pommes de terre et d’oignons avec un peu de bouillon.',
      'Posez le gigot directement sur la grille au-dessus des pommes de terre pour que les sucs tombent dessus.',
      'Enfournez 45 à 50 minutes pour une viande rosée et juteuse (comptez 15 min par 500 g).',
      'Laissez reposer 15 minutes sous une feuille d’aluminium avant de trancher.'
    ],
    ingredients: [
      { ingredientId: 'ing-lamb-shank', quantity: 1200, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 6, unit: 'clove' },
      { ingredientId: 'ing-rosemary', quantity: 1, unit: 'bunch' },
      { ingredientId: 'ing-potato', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-beef-broth', quantity: 200, unit: 'ml' },
      { ingredientId: 'ing-salt', quantity: 1.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Plat', 'Agneau', 'Pâques', 'Famille', 'Rôti']
  },
  {
    id: 'rec-fr-paupiettes-veau-sauce-tomate',
    title: 'Paupiettes de Veau Braisées à la Tomate et aux Champignons (Braised Veal Paupiettes)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Paupiettes de veau farcies enveloppées d’une barde fine, dorées au beurre et mijotées dans un coulis de tomates au vin blanc et champignons.',
    instructions: [
      'Dans une cocotte, faites dorer les paupiettes de veau sur toutes leurs faces dans le beurre et l’huile pendant 8 minutes. Réservez.',
      'Faites suer les échalotes émincées et l’ail haché dans la même cocotte.',
      'Déglacez avec le vin blanc sec.',
      'Ajoutez les tomates concassées, le concentré de tomate, les champignons de Paris émincés, le thym et le laurier.',
      'Remettez les paupiettes dans la sauce, couvrez et laissez mijoter à feu doux pendant 35 minutes.',
      'Servez avec des coquillettes ou un riz blanc.'
    ],
    ingredients: [
      { ingredientId: 'ing-veal-escalope', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-tomato', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-tomato-paste', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-mushroom', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Veau', 'Plat', 'Bistrot', 'Familial']
  },
  {
    id: 'rec-fr-supreme-poulet-champignons-creme',
    title: 'Suprêmes de Poulet Fermier à la Crème et aux Champignons (Chicken Breasts in Cream & Mushrooms)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Blancs de poulet moelleux saisis au beurre, nappés d’une sauce onctueuse aux champignons de Paris, échalotes, vin blanc et crème fraîche épaisse.',
    instructions: [
      'Assaisonnez les blancs de poulet de sel et poivre.',
      'Faites fondre le beurre avec un filet d’huile dans une poêle et saisissez les suprêmes de poulet 5 minutes par face jusqu’à ce qu’ils soient dorés et cuits à cœur. Réservez au chaud.',
      'Dans la même poêle, ajoutez les échalotes émincées et les champignons émincés. Faites sauter 5 minutes.',
      'Déglacez au vin blanc sec et laissez réduire de moitié.',
      'Versez la crème fraîche épaisse et laissez épaissir la sauce 3 minutes à feu doux.',
      'Remettez les blancs de poulet dans la poêle pour les réchauffer dans la sauce et parsemez de persil plat ciselé.'
    ],
    ingredients: [
      { ingredientId: 'ing-chicken-breast', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-mushroom', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-creme-fraiche', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-white-wine', quantity: 60, unit: 'ml' },
      { ingredientId: 'ing-shallot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Poulet', 'Plat', 'Rapide', 'Classique']
  },
  {
    id: 'rec-fr-choucroute-garnie-royale',
    title: 'Choucroute Garnie Royale Traditionnelle Alsacienne (Alsatian Choucroute Garnie)',
    categoryId: 'rcat-poultry',
    servings: 6,
    prepTimeMinutes: 25,
    cookTimeMinutes: 110,
    difficulty: 'easy',
    description: 'Le grand plat d’Alsace : choucroute crue cuisinée au riesling, baies de genièvre et lardons, accompagnée de saucisses de Francfort, saucisses fumées, palette et pommes de terre.',
    instructions: [
      'Rincez abondamment le chou à choucroute à l’eau froide et pressez-le bien pour enlever l’excès d’acidité.',
      'Dans une grande cocotte, faites revenir les oignons et les lardons dans du beurre ou de la graisse d’oie.',
      'Ajoutez la moitié de la choucroute, déposez la palette de porc et la poitrine fumée, les grains de genièvre et le laurier.',
      'Recouvrez avec le reste de choucroute et arrosez avec la bouteille de vin blanc sec d’Alsace (Riesling ou Sylvaner) et le bouillon.',
      'Laissez mijoter à couvert à feu très doux pendant 1h30.',
      'Ajoutez les saucisses et les pommes de terre pelées entières 25 minutes avant la fin de la cuisson.',
      'Dressez le chou fumant sur un grand plat de service entouré de toutes les viandes et saucisses tranchées, servi avec de la moutarde forte d’Alsace.'
    ],
    ingredients: [
      { ingredientId: 'ing-cabbage-green', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-pork-chops', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-sausage-toulouse', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-white-wine', quantity: 400, unit: 'ml' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-bay-leaf', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-dijon-mustard', quantity: 2, unit: 'tbsp' }
    ],
    tags: ['French', 'France', 'Alsace', 'Plat', 'Terroir', 'Tradition', 'Généreux']
  }
];
