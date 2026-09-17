import { Recipe, UnitType } from '../../types';

interface RecipeEntrySpec {
  id: string;
  title: string;
  cat: 'rcat-starters' | 'rcat-poultry' | 'rcat-seafood' | 'rcat-veggie' | 'rcat-pasta' | 'rcat-desserts' | 'rcat-quick';
  serv: number;
  prep: number;
  cook: number;
  diff: 'easy' | 'medium' | 'hard';
  desc: string;
  inst: string[];
  ing: Array<{ id: string; qty: number; unit: UnitType }>;
  tags: string[];
}

const REGIONAL_SPECS: RecipeEntrySpec[] = [
  {
    id: 'rec-fr-croque-provencal-tapenade-tomates',
    title: 'Croque Provençal Grillé à la Tapenade, Tomates et Mozzarella',
    cat: 'rcat-quick',
    serv: 2, prep: 10, cook: 8, diff: 'easy',
    desc: 'Version ensoleillée du croque-monsieur : pain de mie doré tartiné de tapenade noire, garni de tranches de tomates fraîches et mozzarella fondante.',
    inst: [
      'Tartinez les tranches de pain de mie de tapenade noire.',
      'Disposez des rondelles de tomates et des tranches de mozzarella.',
      'Refermez les sandwichs et faites dorer au beurre à la poêle 3 à 4 minutes par face jusqu’à fromage bien coulant.',
      'Dégustez chaud avec une salade de roquette.'
    ],
    ing: [
      { id: 'ing-baguette', qty: 1, unit: 'unit' },
      { id: 'ing-tomato', qty: 2, unit: 'unit' },
      { id: 'ing-butter', qty: 20, unit: 'g' },
      { id: 'ing-herbes-provence', qty: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Provence', 'Plat rapide', 'Croque']
  },
  {
    id: 'rec-fr-omelette-cepes-persillade',
    title: 'Omelette Baveuse aux Cèpes des Bois et Persillade du Sud-Ouest',
    cat: 'rcat-quick',
    serv: 2, prep: 10, cook: 8, diff: 'easy',
    desc: 'Omelette dorée à l’extérieur et bien baveuse à cœur, garnie de cèpes poêlés au beurre, ail et persil plat.',
    inst: [
      'Faites revenir les cèpes émincés au beurre à feu vif pendant 5 minutes avec l’ail et le persil.',
      'Battez 5 œufs avec du sel et du poivre à la fourchette.',
      'Versez les œufs dans la poêle chaude sur les cèpes.',
      'Mélangez délicatement pour cuire le fond tout en gardant le cœur crémeux et baveux.',
      'Roulez l’omelette sur elle-même et servez immédiatement.'
    ],
    ing: [
      { id: 'ing-egg', qty: 5, unit: 'unit' },
      { id: 'ing-mushroom', qty: 200, unit: 'g' },
      { id: 'ing-garlic', qty: 2, unit: 'clove' },
      { id: 'ing-parsley', qty: 0.5, unit: 'bunch' },
      { id: 'ing-butter', qty: 30, unit: 'g' },
      { id: 'ing-salt', qty: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Sud-Ouest', 'Omelette', 'Rapide', 'Champignons']
  },
  {
    id: 'rec-fr-tartine-chevre-chaud-miel-thym',
    title: 'Tartine Gourmande au Chèvre Chaud Rôti, Miel et Noix',
    cat: 'rcat-starters',
    serv: 2, prep: 10, cook: 8, diff: 'easy',
    desc: 'Grandes tranches de pain de campagne grillées, garnies de bûche de chèvre gratinée sous le gril avec un filet de miel et brins de thym.',
    inst: [
      'Disposez les tranches de pain de campagne sur une plaque de cuisson.',
      'Déposez 2 rondelles épaisses de bûche de chèvre sur chaque tranche.',
      'Arrosez de miel d’acacia et parsemez de thym frais et cerneaux de noix concassés.',
      'Enfournez sous le gril à 210°C pendant 6 à 8 minutes jusqu’à ce que le chèvre commence à dorer et couler.',
      'Servez chaud sur un lit de salade verte assaisonnée.'
    ],
    ing: [
      { id: 'ing-baguette', qty: 1, unit: 'unit' },
      { id: 'ing-goat-cheese', qty: 150, unit: 'g' },
      { id: 'ing-honey', qty: 2, unit: 'tbsp' },
      { id: 'ing-walnuts', qty: 30, unit: 'g' },
      { id: 'ing-thyme', qty: 0.5, unit: 'bunch' },
      { id: 'ing-olive-oil', qty: 1, unit: 'tbsp' }
    ],
    tags: ['French', 'France', 'Entrée', 'Bistrot', 'Fromage', 'Rapide']
  },
  {
    id: 'rec-fr-tarte-reblochon-lardons-oignons',
    title: 'Tarte Savoyarde Façon Tartiflette au Reblochon et Lardons',
    cat: 'rcat-starters',
    serv: 6, prep: 20, cook: 35, diff: 'easy',
    desc: 'Pâte feuilletée croustillante garnie d’une fondue d’oignons, lardons fumés et demi-reblochon gratiné.',
    inst: [
      'Faites revenir les lardons et oignons dans une poêle sans matière grasse pendant 8 minutes.',
      'Foncez un moule avec la pâte feuilletée et piquez le fond.',
      'Répartissez les oignons, lardons et pommes de terre précuites.',
      'Battez 2 œufs avec la crème fraîche, versez sur la tarte.',
      'Déposez le reblochon coupé en tranches sur le dessus croûte vers le haut.',
      'Enfournez à 190°C pendant 35 minutes.'
    ],
    ing: [
      { id: 'ing-puff-pastry', qty: 1, unit: 'pack' },
      { id: 'ing-reblochon', qty: 1, unit: 'unit' },
      { id: 'ing-bacon', qty: 150, unit: 'g' },
      { id: 'ing-onion', qty: 2, unit: 'unit' },
      { id: 'ing-creme-fraiche', qty: 150, unit: 'ml' },
      { id: 'ing-egg', qty: 2, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Savoie', 'Tarte', 'Fromage', 'Plat']
  },
  {
    id: 'rec-fr-creme-brulee-foie-gras',
    title: 'Crème Brûlée Salée au Foie Gras et Cassonade Dorée',
    cat: 'rcat-starters',
    serv: 4, prep: 15, cook: 40, diff: 'medium',
    desc: 'Entrée gastronomique fondante à base de foie gras mixé avec crème et jaunes d’œufs, caramélisée au chalumeau à la cassonade.',
    inst: [
      'Mixez le foie gras avec la crème liquide tiédie, les jaunes d’œufs, sel et poivre.',
      'Versez dans des ramequins plats.',
      'Faites cuire au bain-marie à 110°C pendant 35 à 40 minutes.',
      'Laissez refroidir 2h au réfrigérateur.',
      'Au moment de servir, saupoudrez de cassonade et caramélisez au chalumeau de cuisine.',
      'Dégustez avec des mouillettes de pain d’épices grillé.'
    ],
    ing: [
      { id: 'ing-egg', qty: 4, unit: 'unit' },
      { id: 'ing-heavy-cream', qty: 250, unit: 'ml' },
      { id: 'ing-brown-sugar', qty: 30, unit: 'g' },
      { id: 'ing-gingerbread', qty: 4, unit: 'slice' },
      { id: 'ing-salt', qty: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Gastronomie', 'Entrée', 'Fêtes', 'Foie gras']
  }
];

export const RECIPES_FRANCE_TERROIR_ALL_REGIONS: Recipe[] = REGIONAL_SPECS.map(s => ({
  id: s.id,
  title: s.title,
  categoryId: s.cat,
  servings: s.serv,
  prepTimeMinutes: s.prep,
  cookTimeMinutes: s.cook,
  difficulty: s.diff,
  description: s.desc,
  instructions: s.inst,
  ingredients: s.ing.map(i => ({ ingredientId: i.id, quantity: i.qty, unit: i.unit })),
  tags: s.tags
}));
