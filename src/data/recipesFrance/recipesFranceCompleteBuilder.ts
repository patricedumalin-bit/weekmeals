import { Recipe, UnitType } from '../../types';
import { RECIPES_FRANCE_STARTERS } from './recipesFranceStarters';
import { RECIPES_FRANCE_STARTERS_PART2 } from './recipesFranceStarters2';
import { RECIPES_FRANCE_STARTERS_BATCH3 } from './recipesFranceStartersBatch3';
import { RECIPES_FRANCE_MAINS_MEAT } from './recipesFranceMainsMeat';
import { RECIPES_FRANCE_MAINS_MEAT_BATCH2 } from './recipesFranceMainsMeatBatch2';
import { RECIPES_FRANCE_MAINS_SEAFOOD } from './recipesFranceMainsSeafood';
import { RECIPES_FRANCE_MAINS_REGIONAL } from './recipesFranceMainsRegional';
import { RECIPES_FRANCE_DESSERTS } from './recipesFranceDesserts';
import { RECIPES_FRANCE_DESSERTS_BATCH2 } from './recipesFranceDessertsBatch2';
import { RECIPES_FRANCE_MEGA_COLLECTION } from './recipesFranceMegaCollection';
import { RECIPES_FRANCE_CATALOG_ADDITIONAL } from './recipesFranceCatalogAdditional';
import { RECIPES_FRANCE_EXTRA_80 } from './recipesFranceExtra80';

// List of regional French specialties programmatic definitions to ensure 200+ distinct, rich recipes
const REGIONAL_TERROIR_DATABASE: Array<{
  id: string;
  title: string;
  category: 'rcat-starters' | 'rcat-poultry' | 'rcat-seafood' | 'rcat-veggie' | 'rcat-pasta' | 'rcat-desserts' | 'rcat-quick';
  prep: number;
  cook: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  region: string;
  desc: string;
  steps: string[];
  ing: Array<{ id: string; qty: number; unit: UnitType }>;
  tags: string[];
}> = [
  // 1. Entrées & Soupes régionales supplémentaires
  {
    id: 'rec-fr-salade-gesiers-canard-confits',
    title: 'Salade Périgourdine aux Gésiers de Canard Confits et Noix',
    category: 'rcat-starters',
    prep: 15, cook: 10, servings: 4, difficulty: 'easy', region: 'Périgord',
    desc: 'Salade gourmande du Périgord mêlant jeunes pousses, gésiers de canard tiédis dans leur graisse, cerneaux de noix et copeaux de fromage de brebis.',
    steps: [
      'Faites réchauffer les gésiers de canard confits dans une poêle à feu doux pendant 8 minutes.',
      'Disposez la salade verte dans de grandes assiettes avec les cerneaux de noix et les tomates cerises.',
      'Déglacez la poêle des gésiers avec 2 cuillères de vinaigre de framboise ou balsamique.',
      'Dressez les gésiers chauds sur la salade et arrosez du jus de déglaçage et d’un filet d’huile de noix.',
      'Servez avec des toasts de pain de campagne.'
    ],
    ing: [
      { id: 'ing-duck-leg', qty: 200, unit: 'g' },
      { id: 'ing-walnuts', qty: 50, unit: 'g' },
      { id: 'ing-cherry-tomatoes', qty: 100, unit: 'g' },
      { id: 'ing-balsamic-vinegar', qty: 2, unit: 'tbsp' },
      { id: 'ing-olive-oil', qty: 2, unit: 'tbsp' },
      { id: 'ing-baguette', qty: 1, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Périgord', 'Entrée', 'Salade', 'Canard']
  },
  {
    id: 'rec-fr-panisse-marseillaise-croustillante',
    title: 'Panisses Marseillaises Croustillantes à la Farine de Pois Chiche',
    category: 'rcat-starters',
    prep: 20, cook: 20, servings: 4, difficulty: 'easy', region: 'Marseille',
    desc: 'La spécialité de l’Estaque à Marseille : bâtonnets dorés à base de pâte de pois chiche cuite, frits à l’huile d’olive et saupoudrés de fleur de sel.',
    steps: [
      'Portez 750 ml d’eau à ébullition avec 2 cuillères d’huile d’olive et 1 c. à café de sel.',
      'Versez la farine de pois chiche en pluie en fouettant vivement pour éviter les grumeaux.',
      'Faites cuire 15 minutes à feu doux en remuant constamment à la cuillère en bois jusqu’à épaississement.',
      'Versez la pâte dans un moule huilé et laissez refroidir 2 heures au frais.',
      'Démoulez et découpez en frites épaisses.',
      'Faites dorer les panisses dans une poêle d’huile bien chaude 4 minutes par face.',
      'Égouttez, salez à la fleur de sel et dégustez brûlant avec un aïoli.'
    ],
    ing: [
      { id: 'ing-flour', qty: 200, unit: 'g' },
      { id: 'ing-olive-oil', qty: 50, unit: 'ml' },
      { id: 'ing-garlic', qty: 2, unit: 'clove' },
      { id: 'ing-fleur-de-sel', qty: 1, unit: 'pinch' },
      { id: 'ing-black-pepper', qty: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Provence', 'Marseille', 'Apéritif', 'Entrée', 'Végétarien']
  },
  {
    id: 'rec-fr-tarte-chaource-pommes',
    title: 'Tarte Salée au Chaource et Pommes Caramelisées Champenoise',
    category: 'rcat-starters',
    prep: 20, cook: 35, servings: 6, difficulty: 'easy', region: 'Champagne',
    desc: 'Alliance savoureuse de fromage Chaource AOP fondant et de lamelles de pommes fruits dorées sur pâte feuilletée croustillante.',
    steps: [
      'Faites revenir les lamelles de pommes au beurre demi-sel pendant 5 minutes.',
      'Foncez un moule avec la pâte brisée ou feuilletée.',
      'Disposez les pommes précuites et les tranches épaisses de Chaource.',
      'Battez les œufs avec la crème fraîche, du poivre et de la muscade.',
      'Versez l’appareil sur la garniture et enfournez à 190°C pendant 35 minutes.',
      'Servez tiède avec une coupe de champagne ou un vin blanc sec.'
    ],
    ing: [
      { id: 'ing-puff-pastry', qty: 1, unit: 'pack' },
      { id: 'ing-brie', qty: 250, unit: 'g' },
      { id: 'ing-apple', qty: 2, unit: 'unit' },
      { id: 'ing-egg', qty: 3, unit: 'unit' },
      { id: 'ing-creme-fraiche', qty: 150, unit: 'ml' },
      { id: 'ing-butter', qty: 20, unit: 'g' },
      { id: 'ing-nutmeg', qty: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Champagne', 'Entrée', 'Fromage', 'Tarte']
  },
  {
    id: 'rec-fr-ficelle-picarde-jambon-champignons',
    title: 'Ficelle Picarde Traditionnelle Gratinée au Fromage et Champignons',
    category: 'rcat-quick',
    prep: 20, cook: 20, servings: 4, difficulty: 'easy', region: 'Picardie',
    desc: 'Crêpe salée garnie d’une tranche de jambon blanc et d’une duxelles de champignons de Paris au beurre et échalotes, nappée de crème et gratinée à l’emmental.',
    steps: [
      'Préparez la duxelles : hachez finement les champignons et faites-les suer au beurre avec les échalotes jusqu’à évaporation complète de l’eau.',
      'Incorporez 2 cuillères de crème fraîche à la duxelles.',
      'Sur chaque crêpe, déposez une tranche de jambon blanc et 2 cuillères de duxelles de champignons.',
      'Roulez les crêpes bien serrées en forme de « ficelle ».',
      'Disposez les ficelles dans un plat à gratin beurré.',
      'Nappez de crème fraîche épaisse et recouvrez d’emmental râpé.',
      'Faites gratiner au four à 200°C pendant 15 minutes.'
    ],
    ing: [
      { id: 'ing-flour', qty: 120, unit: 'g' },
      { id: 'ing-milk', qty: 250, unit: 'ml' },
      { id: 'ing-egg', qty: 2, unit: 'unit' },
      { id: 'ing-ham-paris', qty: 4, unit: 'slice' },
      { id: 'ing-mushroom', qty: 300, unit: 'g' },
      { id: 'ing-shallot', qty: 2, unit: 'unit' },
      { id: 'ing-creme-fraiche', qty: 150, unit: 'ml' },
      { id: 'ing-emmental', qty: 80, unit: 'g' },
      { id: 'ing-butter', qty: 30, unit: 'g' }
    ],
    tags: ['French', 'France', 'Picardie', 'Amiens', 'Plat', 'Crêpe', 'Gratin']
  },
  {
    id: 'rec-fr-pounti-auvergnat-pruneaux',
    title: 'Pounti Traditionnel Auvergnat aux Pruneaux et Blettes',
    category: 'rcat-starters',
    prep: 25, cook: 50, servings: 6, difficulty: 'medium', region: 'Auvergne',
    desc: 'Gâteau salé-sucré rustique du Cantal associant feuilles de blettes ou épinards, chair à saucisse persillée, œufs et pruneaux moelleux fondants.',
    steps: [
      'Hachez finement les feuilles d’épinards/blettes et le persil.',
      'Dans un saladier, fouettez les 4 œufs avec la farine, puis délayez avec le lait.',
      'Ajoutez la chair à saucisse de porc et les herbes hachées. Assaisonnez de sel et poivre.',
      'Versez la moitié de la préparation dans un moule à cake beurré.',
      'Répartissez les pruneaux d’Agen entiers au centre.',
      'Recouvrez avec le reste de pâte.',
      'Enfournez à 180°C pendant 50 minutes.',
      'Dégustez tiède ou froid en tranches dorées à la poêle.'
    ],
    ing: [
      { id: 'ing-ground-pork', qty: 250, unit: 'g' },
      { id: 'ing-spinach', qty: 200, unit: 'g' },
      { id: 'ing-prunes', qty: 150, unit: 'g' },
      { id: 'ing-flour', qty: 120, unit: 'g' },
      { id: 'ing-egg', qty: 4, unit: 'unit' },
      { id: 'ing-milk', qty: 150, unit: 'ml' },
      { id: 'ing-parsley', qty: 1, unit: 'bunch' },
      { id: 'ing-butter', qty: 20, unit: 'g' },
      { id: 'ing-salt', qty: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Auvergne', 'Cantal', 'Entrée', 'Terroir', 'Tradition']
  },

  // 2. Plats mijotés et Viandes du Terroir
  {
    id: 'rec-fr-daube-avignonnaise-agneau',
    title: 'Daube Avignonnaise Traditionnelle à l’Agneau et Vin Blanc',
    category: 'rcat-poultry',
    prep: 25, cook: 180, servings: 6, difficulty: 'medium', region: 'Provence',
    desc: 'Variante provençale parfumée de la daube réalisée avec de l’épaule d’agneau marinée au vin blanc sec des Côtes du Rhône, herbes de Provence et zestes d’orange.',
    steps: [
      'Faites mariner les morceaux d’agneau 12h dans le vin blanc avec carottes, oignon, ail, herbes et un ruban de zeste d’orange.',
      'Faites dorer les lardons et oignons dans une cocotte en fonte avec l’huile d’olive.',
      'Saisissez les morceaux d’agneau égouttés.',
      'Versez la marinade avec ses légumes et le bouillon.',
      'Laissez mijoter à feu très doux pendant 3 heures.',
      'Dégustez avec des macaronis ou des pommes de terre vapeur.'
    ],
    ing: [
      { id: 'ing-lamb-shank', qty: 1000, unit: 'g' },
      { id: 'ing-white-wine', qty: 500, unit: 'ml' },
      { id: 'ing-bacon', qty: 150, unit: 'g' },
      { id: 'ing-carrot', qty: 4, unit: 'unit' },
      { id: 'ing-onion', qty: 2, unit: 'unit' },
      { id: 'ing-garlic', qty: 3, unit: 'clove' },
      { id: 'ing-orange', qty: 1, unit: 'unit' },
      { id: 'ing-herbes-provence', qty: 1, unit: 'tsp' },
      { id: 'ing-olive-oil', qty: 3, unit: 'tbsp' },
      { id: 'ing-salt', qty: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Avignon', 'Provence', 'Plat', 'Agneau', 'Mijoté']
  },
  {
    id: 'rec-fr-poulet-basquaise-traditionnel',
    title: 'Poulet Basquaise Traditionnel Mijoté à la Pipérade et Vin Blanc',
    category: 'rcat-poultry',
    prep: 20, cook: 45, servings: 4, difficulty: 'easy', region: 'Pays Basque',
    desc: 'Cuisseaux de poulet fermier dorés dans l’huile d’olive, mijotés dans une sauce savoureuse de tomates fraîches, poivrons rouges et verts, oignons et piment d’Espelette.',
    steps: [
      'Dans une cocotte, faites dorer les cuisses de poulet dans l’huile d’olive pendant 10 minutes. Réservez.',
      'Dans la même cocotte, faites fondre les poivrons émincés et les oignons pendant 8 minutes.',
      'Ajoutez les tomates concassées, l’ail écrasé, le thym, le laurier et le piment d’Espelette.',
      'Déglacez avec le vin blanc sec.',
      'Remettez les morceaux de poulet dans la sauce, couvrez et laissez mijoter 35 minutes.',
      'Servez avec du riz blanc de Camargue.'
    ],
    ing: [
      { id: 'ing-chicken-thighs', qty: 800, unit: 'g' },
      { id: 'ing-bell-pepper-red', qty: 2, unit: 'unit' },
      { id: 'ing-bell-pepper-green', qty: 1, unit: 'unit' },
      { id: 'ing-tomato', qty: 4, unit: 'unit' },
      { id: 'ing-onion', qty: 2, unit: 'unit' },
      { id: 'ing-garlic', qty: 3, unit: 'clove' },
      { id: 'ing-white-wine', qty: 100, unit: 'ml' },
      { id: 'ing-espelette-pepper', qty: 1, unit: 'tsp' },
      { id: 'ing-olive-oil', qty: 3, unit: 'tbsp' },
      { id: 'ing-salt', qty: 1, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Pays Basque', 'Plat', 'Poulet', 'Classique']
  },
  {
    id: 'rec-fr-petit-sale-lentilles-puy',
    title: 'Petit Salé aux Lentilles Vertes du Puy Traditionnel',
    category: 'rcat-poultry',
    prep: 20, cook: 90, servings: 6, difficulty: 'easy', region: 'Auvergne',
    desc: 'Palette et poitrine de porc demi-sel mijotées avec des carottes, des oignons et les réputées lentilles vertes du Puy AOP qui s’imprègnent des sucs de la viande.',
    steps: [
      'Faites dessaler la palette et la poitrine demi-sel 2h dans l’eau froide.',
      'Mettez la viande dans une marmite d’eau froide avec carottes, oignon piqué de girofle et bouquet garni. Faites cuire 1h à frémissement.',
      'Dans une autre cocotte, déposez les lentilles vertes rincées avec les saucisses.',
      'Prélevez du bouillon de cuisson de la viande pour couvrir les lentilles.',
      'Ajoutez la viande tranchée dans les lentilles et laissez mijoter 30 minutes supplémentaires.',
      'Servez chaud avec de la moutarde de Dijon.'
    ],
    ing: [
      { id: 'ing-lentils-green', qty: 400, unit: 'g' },
      { id: 'ing-pork-chops', qty: 600, unit: 'g' },
      { id: 'ing-sausage-toulouse', qty: 4, unit: 'unit' },
      { id: 'ing-bacon', qty: 200, unit: 'g' },
      { id: 'ing-carrot', qty: 3, unit: 'unit' },
      { id: 'ing-onion', qty: 2, unit: 'unit' },
      { id: 'ing-thyme', qty: 0.5, unit: 'bunch' },
      { id: 'ing-dijon-mustard', qty: 2, unit: 'tbsp' }
    ],
    tags: ['French', 'France', 'Auvergne', 'Le Puy', 'Plat', 'Tradition', 'Hiver']
  },
  {
    id: 'rec-fr-bistrot-steak-tartare-frites',
    title: 'Steak Tartare de Bœuf Préparé à la Minute et Frites Croustillantes',
    category: 'rcat-poultry',
    prep: 15, cook: 0, servings: 2, difficulty: 'easy', region: 'Paris',
    desc: 'Le grand classique de brasserie parisienne : bœuf de première qualité taillé au couteau, assaisonné de câpres, cornichons, échalotes, jaune d’œuf, tabasco et Worcestershire.',
    steps: [
      'Hachez le filet ou rumsteck de bœuf très finement au couteau.',
      'Dans un saladier sur un lit de glaçons, émulsionnez le jaune d’œuf avec la moutarde de Dijon et l’huile d’olive.',
      'Ajoutez les échalotes très finement ciselées, les câpres, les cornichons hachés et le persil.',
      'Assaisonnez de sel, poivre et quelques gouttes de jus de citron.',
      'Incorporez le bœuf taillé au couteau et mélangez délicatement.',
      'Moulez en cercle sur une assiette et servez immédiatement avec des frites chaudes.'
    ],
    ing: [
      { id: 'ing-beef-chuck', qty: 350, unit: 'g' },
      { id: 'ing-egg', qty: 2, unit: 'unit' },
      { id: 'ing-shallot', qty: 2, unit: 'unit' },
      { id: 'ing-dijon-mustard', qty: 1, unit: 'tbsp' },
      { id: 'ing-capers', qty: 2, unit: 'tbsp' },
      { id: 'ing-parsley', qty: 0.5, unit: 'bunch' },
      { id: 'ing-olive-oil', qty: 2, unit: 'tbsp' },
      { id: 'ing-lemon', qty: 0.5, unit: 'unit' },
      { id: 'ing-salt', qty: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Paris', 'Brasserie', 'Bœuf', 'Plat', 'Classique']
  },
  {
    id: 'rec-fr-magret-canard-miel-balsamique',
    title: 'Magret de Canard Rôti au Miel de Fleurs et Vinaigre Balsamique',
    category: 'rcat-poultry',
    prep: 10, cook: 15, servings: 2, difficulty: 'easy', region: 'Sud-Ouest',
    desc: 'Magret de canard du Sud-Ouest quadrillé côté peau, saisi et rosé à cœur, nappé d’un déglaçage aigre-doux au miel et vinaigre balsamique.',
    steps: [
      'Quadrillez la peau du magret en croisillons avec un couteau sans entamer la chair.',
      'Déposez le magret côté peau dans une poêle froide et montez le feu moyen pendant 8 minutes en évacuant la graisse fondue.',
      'Retournez le magret et cuisez 3 à 4 minutes côté chair pour une cuisson rosée.',
      'Enveloppez la viande dans du papier aluminium pour reposer 5 minutes.',
      'Jetez le gras restant de la poêle, versez le miel et le vinaigre balsamique et laissez caraméliser 2 minutes.',
      'Tranchez le magret en biais, dressez sur assiette et nappez de sauce brillante à la fleur de sel.'
    ],
    ing: [
      { id: 'ing-duck-breast', qty: 1, unit: 'unit' },
      { id: 'ing-honey', qty: 2, unit: 'tbsp' },
      { id: 'ing-balsamic-vinegar', qty: 3, unit: 'tbsp' },
      { id: 'ing-butter', qty: 15, unit: 'g' },
      { id: 'ing-fleur-de-sel', qty: 1, unit: 'pinch' },
      { id: 'ing-black-pepper', qty: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Sud-Ouest', 'Plat', 'Canard', 'Rapide', 'Gastronomie']
  },

  // 3. Poissons et Produits de la Mer du Terroir
  {
    id: 'rec-fr-nage-poissons-legumes-safran',
    title: 'Nage de Poissons Côtiers et Légumes Croquants au Safran',
    category: 'rcat-seafood',
    prep: 25, cook: 20, servings: 4, difficulty: 'medium', region: 'Méditerranée',
    desc: 'Pavés de poissons nobles pochés délicatement dans un bouillon corsé au vin blanc, filaments de safran et julienne de légumes fondants.',
    steps: [
      'Taillez les carottes, poireaux et courgettes en fine julienne.',
      'Faites frémir le fumet de poisson avec le vin blanc, les échalotes et le safran pendant 10 minutes.',
      'Ajoutez la julienne de légumes et laissez cuire 5 minutes.',
      'Déposez les filets de bar et cabillaud dans le bouillon frémissant.',
      'Pochez 6 à 8 minutes.',
      'Dressez le poisson dans des assiettes creuses avec les légumes et louchez le bouillon safrané bien chaud.'
    ],
    ing: [
      { id: 'ing-sea-bass', qty: 400, unit: 'g' },
      { id: 'ing-cod-fillet', qty: 400, unit: 'g' },
      { id: 'ing-carrot', qty: 2, unit: 'unit' },
      { id: 'ing-leek', qty: 1, unit: 'unit' },
      { id: 'ing-zucchini', qty: 1, unit: 'unit' },
      { id: 'ing-white-wine', qty: 150, unit: 'ml' },
      { id: 'ing-fish-stock', qty: 500, unit: 'ml' },
      { id: 'ing-shallot', qty: 2, unit: 'unit' },
      { id: 'ing-salt', qty: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Gastronomie', 'Poisson', 'Plat', 'Léger']
  },
  {
    id: 'rec-fr-crevettes-flambees-pastis-ail',
    title: 'Grosses Crevettes Poêlées Flambées au Pastis et Persillade',
    category: 'rcat-seafood',
    prep: 10, cook: 8, servings: 4, difficulty: 'easy', region: 'Provence',
    desc: 'Crevettes royales saisies vivement à l’huile d’olive avec ail pressé et persil, flambées au pastis de Marseille.',
    steps: [
      'Faites chauffer l’huile d’olive dans une poêle à feu très vif.',
      'Jetez les crevettes et saisissez-les 2 minutes par face jusqu’à ce qu’elles deviennent bien roses.',
      'Ajoutez l’ail finement haché et le persil plat.',
      'Versez le pastis, approchez une flamme et faites flamber.',
      'Dès extinction des flammes, assaisonnez de fleur de sel et jus de citron et servez aussitôt.'
    ],
    ing: [
      { id: 'ing-shrimp', qty: 500, unit: 'g' },
      { id: 'ing-garlic', qty: 4, unit: 'clove' },
      { id: 'ing-parsley', qty: 1, unit: 'bunch' },
      { id: 'ing-olive-oil', qty: 3, unit: 'tbsp' },
      { id: 'ing-lemon', qty: 1, unit: 'unit' },
      { id: 'ing-fleur-de-sel', qty: 1, unit: 'pinch' }
    ],
    tags: ['French', 'France', 'Provence', 'Plat', 'Fruits de mer', 'Rapide', 'Flambé']
  },

  // 4. Plats Végétariens & Terroir
  {
    id: 'rec-fr-truffade-cantal-pommes-terre',
    title: 'Truffade Traditionnelle Cantalienne à la Tome Fraîche et Ail',
    category: 'rcat-veggie',
    prep: 20, cook: 30, servings: 4, difficulty: 'easy', region: 'Auvergne',
    desc: 'Pommes de terre tranchées revenues à la poêle avec ail et lardons, enrobées de lamelles de tome fraîche du Cantal filante.',
    steps: [
      'Coupez les pommes de terre épluchées en rondelles de 3 mm.',
      'Faites rissoler les lardons et les pommes de terre dans une poêle en fonte avec l’ail haché pendant 20 minutes jusqu’à tendreté.',
      'Écrasez légèrement les pommes de terre à la fourchette.',
      'Ajoutez la tome fraîche ou Cantal jeune coupé en lamelles.',
      'Remuez sur feu doux jusqu’à ce que le fromage soit complètement fondu et forme des fils dorés.',
      'Servez immédiatement avec une salade verte.'
    ],
    ing: [
      { id: 'ing-potato', qty: 800, unit: 'g' },
      { id: 'ing-cantal', qty: 350, unit: 'g' },
      { id: 'ing-bacon', qty: 150, unit: 'g' },
      { id: 'ing-garlic', qty: 3, unit: 'clove' },
      { id: 'ing-butter', qty: 25, unit: 'g' },
      { id: 'ing-parsley', qty: 0.5, unit: 'bunch' },
      { id: 'ing-salt', qty: 0.5, unit: 'tsp' }
    ],
    tags: ['French', 'France', 'Auvergne', 'Cantal', 'Plat', 'Fromage', 'Tradition']
  },
  {
    id: 'rec-fr-fondue-savoyarde-trois-fromages',
    title: 'Fondue Savoyarde Traditionnelle aux 3 Fromages et Vin de Savoie',
    category: 'rcat-veggie',
    prep: 15, cook: 15, servings: 4, difficulty: 'easy', region: 'Savoie',
    desc: 'Le repas convivial des Alpes : Beaufort, Comté et Emmental de Savoie fondus dans du vin blanc sec avec ail et kirsch, dégustés avec des dés de pain.',
    steps: [
      'Frottez l’intérieur du caquelon avec la gousse d’ail coupée en deux.',
      'Versez le vin blanc sec de Savoie et portez à frémissement.',
      'Ajoutez progressivement les fromages râpés en remuant sans arrêt en 8 à la cuillère en bois sur feu doux.',
      'Délayez la fécule de maïs avec le kirsch et incorporez à la fondue.',
      'Assaisonnez de muscade et poivre.',
      'Posez le caquelon sur le réchaud de table et dégustez en trempant des morceaux de baguette rassie.'
    ],
    ing: [
      { id: 'ing-gruyere', qty: 300, unit: 'g' },
      { id: 'ing-emmental', qty: 300, unit: 'g' },
      { id: 'ing-white-wine', qty: 250, unit: 'ml' },
      { id: 'ing-garlic', qty: 2, unit: 'clove' },
      { id: 'ing-cornstarch', qty: 1, unit: 'tsp' },
      { id: 'ing-nutmeg', qty: 1, unit: 'pinch' },
      { id: 'ing-baguette', qty: 2, unit: 'unit' }
    ],
    tags: ['French', 'France', 'Savoie', 'Plat', 'Fromage', 'Convivial', 'Hiver']
  },

  // 5. Desserts et Douceurs Régionales
  {
    id: 'rec-fr-mille-feuille-vanille-glacage',
    title: 'Mille-Feuille Traditionnel à la Crème Mousseline Vanille et Fondant',
    category: 'rcat-desserts',
    prep: 45, cook: 30, servings: 6, difficulty: 'hard', region: 'Paris',
    desc: 'Trois couches de pâte feuilletée caramélisée croustillante alternées avec une onctueuse crème mousseline à la vanille Bourbon et décor marbré.',
    steps: [
      'Cuisez les 3 rectangles de pâte feuilletée saupoudrés de sucre entre deux plaques à 190°C pendant 25 minutes.',
      'Préparez une crème diplomate vanillée bien ferme.',
      'Garnissez à la poche à douille les deux premiers étages de feuilletage.',
      'Superposez les couches.',
      'Nappez le dessus de glaçage blanc et tracez des lignes de chocolat fondu au cure-dent.',
      'Placez 2 heures au frais avant de découper au couteau scie.'
    ],
    ing: [
      { id: 'ing-puff-pastry', qty: 2, unit: 'pack' },
      { id: 'ing-milk', qty: 400, unit: 'ml' },
      { id: 'ing-egg', qty: 3, unit: 'unit' },
      { id: 'ing-sugar', qty: 100, unit: 'g' },
      { id: 'ing-butter', qty: 80, unit: 'g' },
      { id: 'ing-cornstarch', qty: 30, unit: 'g' },
      { id: 'ing-vanilla-bean', qty: 1, unit: 'unit' },
      { id: 'ing-powdered-sugar', qty: 80, unit: 'g' },
      { id: 'ing-dark-chocolate', qty: 20, unit: 'g' }
    ],
    tags: ['French', 'France', 'Paris', 'Dessert', 'Pâtisserie', 'Gastronomie']
  },
  {
    id: 'rec-fr-profiteroles-chocolat-chaud',
    title: 'Profiteroles Maison Glace Vanille et Chocolat Chaud Coulant',
    category: 'rcat-desserts',
    prep: 30, cook: 25, servings: 4, difficulty: 'medium', region: 'Paris',
    desc: 'Choux croustillants garnis de glace à la vanille, généreusement arrosés d’une sauce au chocolat noir fumante et amandes effilées toastées.',
    steps: [
      'Pochez 12 petits choux et faites-les cuire à 180°C pendant 25 minutes. Laissez refroidir.',
      'Faites fondre le chocolat noir avec la crème liquide et une noisette de beurre pour obtenir une sauce fluide.',
      'Ouvrez les choux en deux et garnissez chaque chou d’une belle boule de glace vanille.',
      'Disposez 3 choux par assiette.',
      'Nappez immédiatement de sauce chocolat noir chaud devant les convives.',
      'Parsemez d’amandes effilées grillées.'
    ],
    ing: [
      { id: 'ing-flour', qty: 100, unit: 'g' },
      { id: 'ing-butter', qty: 50, unit: 'g' },
      { id: 'ing-egg', qty: 3, unit: 'unit' },
      { id: 'ing-dark-chocolate', qty: 150, unit: 'g' },
      { id: 'ing-heavy-cream', qty: 100, unit: 'ml' },
      { id: 'ing-almonds-flaked', qty: 30, unit: 'g' },
      { id: 'ing-sugar', qty: 20, unit: 'g' }
    ],
    tags: ['French', 'France', 'Paris', 'Bistrot', 'Dessert', 'Chocolat', 'Classique']
  },
  {
    id: 'rec-fr-tarte-bourdaloue-poires-amandes',
    title: 'Tarte Bourdaloue Traditionnelle Parisienne aux Poires et Crème d’Amandes',
    category: 'rcat-desserts',
    prep: 25, cook: 35, servings: 8, difficulty: 'medium', region: 'Paris',
    desc: 'Création de la rue Bourdaloue à Paris : pâte sablée croustillante garnie d’une frangipane moelleuse et de demi-poires pochées fondantes.',
    steps: [
      'Foncez un moule avec la pâte sablée.',
      'Préparez la crème d’amandes : fouettez 100 g de beurre mou avec 100 g de sucre, 100 g de poudre d’amandes, 2 œufs et 1 c. à soupe de rhum.',
      'Étalez la crème d’amandes sur le fond de tarte.',
      'Égouttez les demi-poires pochées, tranchez-les délicatement en éventail et disposez-les harmonieusement sur la crème.',
      'Parsemez d’amandes effilées.',
      'Enfournez à 180°C pendant 35 minutes.',
      'Nappez d’un voile de gelée tiède pour faire briller.'
    ],
    ing: [
      { id: 'ing-sweet-pastry', qty: 1, unit: 'pack' },
      { id: 'ing-pear', qty: 4, unit: 'unit' },
      { id: 'ing-almond-flour', qty: 100, unit: 'g' },
      { id: 'ing-butter', qty: 100, unit: 'g' },
      { id: 'ing-sugar', qty: 100, unit: 'g' },
      { id: 'ing-egg', qty: 2, unit: 'unit' },
      { id: 'ing-rum', qty: 1, unit: 'tbsp' },
      { id: 'ing-almonds-flaked', qty: 30, unit: 'g' }
    ],
    tags: ['French', 'France', 'Paris', 'Dessert', 'Tarte', 'Poires', 'Amandes']
  }
];

// Convert database items to typed Recipe items
const CONVERTED_REGIONAL_RECIPES: Recipe[] = REGIONAL_TERROIR_DATABASE.map(item => ({
  id: item.id,
  title: item.title,
  categoryId: item.category,
  servings: item.servings,
  prepTimeMinutes: item.prep,
  cookTimeMinutes: item.cook,
  difficulty: item.difficulty,
  description: item.desc,
  instructions: item.steps,
  ingredients: item.ing.map(i => ({ ingredientId: i.id, quantity: i.qty, unit: i.unit })),
  tags: item.tags
}));

// Aggregate all unique French recipes from all modular files
const ALL_COMBINED: Recipe[] = [
  ...RECIPES_FRANCE_STARTERS,
  ...RECIPES_FRANCE_STARTERS_PART2,
  ...RECIPES_FRANCE_STARTERS_BATCH3,
  ...RECIPES_FRANCE_MAINS_MEAT,
  ...RECIPES_FRANCE_MAINS_MEAT_BATCH2,
  ...RECIPES_FRANCE_MAINS_SEAFOOD,
  ...RECIPES_FRANCE_MAINS_REGIONAL,
  ...RECIPES_FRANCE_DESSERTS,
  ...RECIPES_FRANCE_DESSERTS_BATCH2,
  ...RECIPES_FRANCE_MEGA_COLLECTION,
  ...RECIPES_FRANCE_CATALOG_ADDITIONAL,
  ...RECIPES_FRANCE_EXTRA_80,
  ...CONVERTED_REGIONAL_RECIPES
];

// Deduplicate by ID
const seenIds = new Set<string>();
export const RECIPES_FRANCE_ALL: Recipe[] = ALL_COMBINED.filter(r => {
  if (seenIds.has(r.id)) return false;
  seenIds.add(r.id);
  return true;
});
