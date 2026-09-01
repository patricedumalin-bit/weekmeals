import { Recipe, UnitType } from '../../types';

interface SpecialtyDef {
  code: string;
  name: string;
  category: 'rcat-starters' | 'rcat-poultry' | 'rcat-seafood' | 'rcat-veggie' | 'rcat-pasta' | 'rcat-desserts' | 'rcat-quick';
  region: string;
  prep: number;
  cook: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  desc: string;
  steps: string[];
  ingredients: Array<{ id: string; qty: number; unit: UnitType }>;
  tags: string[];
}

const REGIONAL_DEFINITIONS: SpecialtyDef[] = [
  // Provence & Sud
  {
    code: 'soupe-ail-provence',
    name: 'Aïgo Boulido Traditionnelle à la Sauge et Ail de Provence',
    category: 'rcat-starters',
    region: 'Provence', prep: 10, cook: 15, servings: 4, difficulty: 'easy',
    desc: 'L’eau bouillie médicinale et digestive provençale : bouillon d’ail doux, feuilles de sauge fraîche et huile d’olive.',
    steps: ['Faites bouillir 1 litre d’eau avec 6 gousses d’ail écrasées, les feuilles de sauge, le laurier et l’huile d’olive pendant 15 minutes.', 'Salez et poivrez.', 'Versez sur des tranches de pain rassis frottées d’ail dans chaque bol.'],
    ingredients: [{ id: 'ing-garlic', qty: 6, unit: 'clove' }, { id: 'ing-olive-oil', qty: 4, unit: 'tbsp' }, { id: 'ing-bay-leaf', qty: 2, unit: 'unit' }, { id: 'ing-baguette', qty: 1, unit: 'unit' }],
    tags: ['French', 'France', 'Provence', 'Soupe', 'Santé']
  },
  {
    code: 'tapenade-noire-olives-capres',
    name: 'Tapenade Noire Traditionnelle aux Câpres et Anchois',
    category: 'rcat-starters',
    region: 'Provence', prep: 10, cook: 0, servings: 6, difficulty: 'easy',
    desc: 'Pâte d’olives noires de Nyons pilées au mortier avec câpres, ail et huile d’olive fruitée mûre.',
    steps: ['Dénoyautez les olives noires.', 'Mixez avec l’ail pressé, les câpres et l’huile d’olive jusqu’à pâte fine.', 'Assaisonnez de jus de citron et poivre noir.', 'Servez sur des croûtons grillés.'],
    ingredients: [{ id: 'ing-capers', qty: 2, unit: 'tbsp' }, { id: 'ing-garlic', qty: 2, unit: 'clove' }, { id: 'ing-olive-oil', qty: 4, unit: 'tbsp' }, { id: 'ing-lemon', qty: 0.5, unit: 'unit' }],
    tags: ['French', 'France', 'Provence', 'Apéritif', 'Tartinade']
  },
  {
    code: 'tapenade-verte-amandes',
    name: 'Tapenade Verte aux Amandes et Huile d’Olive AOP',
    category: 'rcat-starters',
    region: 'Provence', prep: 10, cook: 0, servings: 6, difficulty: 'easy',
    desc: 'Purée d’olives vertes picholines concassées aux amandes en poudre, câpres et huile d’olive.',
    steps: ['Mixez les olives vertes avec la poudre d’amandes, l’ail et les câpres.', 'Montez à l’huile d’olive en filet.', 'Dégustez frais avec des gressins.'],
    ingredients: [{ id: 'ing-capers', qty: 2, unit: 'tbsp' }, { id: 'ing-almond-flour', qty: 30, unit: 'g' }, { id: 'ing-garlic', qty: 1, unit: 'clove' }, { id: 'ing-olive-oil', qty: 3, unit: 'tbsp' }],
    tags: ['French', 'France', 'Provence', 'Apéritif']
  },
  {
    code: 'fougasse-lardons-romarin',
    name: 'Fougasse Provençale Moelleuse aux Lardons et Romarin',
    category: 'rcat-quick',
    region: 'Provence', prep: 20, cook: 20, servings: 4, difficulty: 'easy',
    desc: 'Pain plat traditionnel de Provence incisé en forme de feuille d’arbre, garni de lardons et romarin frais.',
    steps: ['Étalez la pâte à pain en forme ovale.', 'Incorporez les lardons et le romarin haché.', 'Pratiquez 6 incisions en biais et écartez les trous.', 'Badigeonnez d’huile d’olive et enfournez à 220°C pendant 20 minutes.'],
    ingredients: [{ id: 'ing-pizza-dough', qty: 1, unit: 'pack' }, { id: 'ing-bacon', qty: 120, unit: 'g' }, { id: 'ing-rosemary', qty: 1, unit: 'bunch' }, { id: 'ing-olive-oil', qty: 3, unit: 'tbsp' }],
    tags: ['French', 'France', 'Provence', 'Boulangerie', 'Apéritif']
  },
  {
    code: 'fougasse-chevre-herbes',
    name: 'Fougasse au Fromage de Chèvre Frais et Herbes de Provence',
    category: 'rcat-quick',
    region: 'Provence', prep: 20, cook: 20, servings: 4, difficulty: 'easy',
    desc: 'Fougasse parfumée aux morceaux de chèvre fondant, huile d’olive et thym frais.',
    steps: ['Étalez la pâte et garnissez de morceaux de chèvre et d’herbes.', 'Incisez la pâte et étirez-la.', 'Arrosez d’huile d’olive et cuisez à 220°C pendant 18 minutes.'],
    ingredients: [{ id: 'ing-pizza-dough', qty: 1, unit: 'pack' }, { id: 'ing-goat-cheese', qty: 150, unit: 'g' }, { id: 'ing-herbes-provence', qty: 1, unit: 'tbsp' }, { id: 'ing-olive-oil', qty: 3, unit: 'tbsp' }],
    tags: ['French', 'France', 'Provence', 'Boulangerie', 'Végétarien']
  },
  {
    code: 'daube-sanglier-marinade',
    name: 'Daube de Sanglier Marinée au Vin Rouge et Genièvre',
    category: 'rcat-poultry',
    region: 'Provence', prep: 30, cook: 240, servings: 8, difficulty: 'hard',
    desc: 'Grand gibier mariné 24 heures au vin rouge corsé et cuit très lentement en cocotte.',
    steps: ['Faites mariner la viande coupée en cubes 24h avec vin rouge, carottes, oignons et baies de genièvre.', 'Faites dorer lardons et viande dans la cocotte.', 'Versez la marinade filtrée et cuisez 4 heures à feu très doux.'],
    ingredients: [{ id: 'ing-beef-chuck', qty: 1200, unit: 'g' }, { id: 'ing-red-wine', qty: 750, unit: 'ml' }, { id: 'ing-bacon', qty: 200, unit: 'g' }, { id: 'ing-carrot', qty: 4, unit: 'unit' }, { id: 'ing-onion', qty: 2, unit: 'unit' }],
    tags: ['French', 'France', 'Chasse', 'Plat', 'Mijoté']
  },
  {
    code: 'tian-legumes-courgettes-tomates',
    name: 'Tian de Légumes d’Été : Courgettes, Tomates et Ail Confit',
    category: 'rcat-veggie',
    region: 'Provence', prep: 20, cook: 45, servings: 4, difficulty: 'easy',
    desc: 'Rondelles alternées de courgettes et tomates serrées dans un plat en terre cuite, arrosées d’huile d’olive et thym.',
    steps: ['Tranchez les légumes en rondelles fines.', 'Rangez-les verticalement en alternant les couleurs dans un plat huilé.', 'Parsemez d’ail écrasé, thym, sel, poivre et filet d’huile d’olive.', 'Enfournez à 180°C pendant 45 minutes.'],
    ingredients: [{ id: 'ing-zucchini', qty: 2, unit: 'unit' }, { id: 'ing-tomato', qty: 4, unit: 'unit' }, { id: 'ing-garlic', qty: 3, unit: 'clove' }, { id: 'ing-olive-oil', qty: 4, unit: 'tbsp' }, { id: 'ing-thyme', qty: 0.5, unit: 'bunch' }],
    tags: ['French', 'France', 'Provence', 'Plat', 'Végétarien', 'Été']
  },
  {
    code: 'pissaladiere-provencale-oignons',
    name: 'Pissaladière Traditionnelle Niçoise aux Oignons Confits',
    category: 'rcat-quick',
    region: 'Nice', prep: 25, cook: 40, servings: 6, difficulty: 'easy',
    desc: 'Tarte fine garnie d’une compotée fondante d’oignons au thym, décorée de croisillons d’anchois et d’olives caillettes.',
    steps: ['Faites confire 1 kg d’oignons émincés dans l’huile d’olive pendant 40 minutes sans coloration.', 'Étalez la pâte à pain.', 'Répartissez la compotée d’oignons.', 'Enfournez à 210°C pendant 20 minutes.'],
    ingredients: [{ id: 'ing-pizza-dough', qty: 1, unit: 'pack' }, { id: 'ing-onion', qty: 4, unit: 'unit' }, { id: 'ing-olive-oil', qty: 4, unit: 'tbsp' }, { id: 'ing-thyme', qty: 1, unit: 'bunch' }],
    tags: ['French', 'France', 'Nice', 'Provence', 'Plat', 'Classique']
  },
  {
    code: 'daube-boeuf-provencale-olives',
    name: 'Daube de Bœuf Provençale aux Olives Noires et Zeste d’Orange',
    category: 'rcat-poultry',
    region: 'Provence', prep: 25, cook: 180, servings: 6, difficulty: 'medium',
    desc: 'Bœuf mijoté au vin rouge corsé avec olives noires, carottes, oignons et zeste d’orange.',
    steps: ['Faites dorer les cubes de bœuf avec les lardons.', 'Ajoutez carottes, oignons, vin rouge, bouillon et le zeste d’orange.', 'Laissez mijoter à feu doux 3 heures.', 'Ajoutez les olives noires 15 minutes avant la fin.'],
    ingredients: [{ id: 'ing-beef-chuck', qty: 1000, unit: 'g' }, { id: 'ing-red-wine', qty: 500, unit: 'ml' }, { id: 'ing-bacon', qty: 150, unit: 'g' }, { id: 'ing-carrot', qty: 3, unit: 'unit' }, { id: 'ing-orange', qty: 1, unit: 'unit' }],
    tags: ['French', 'France', 'Provence', 'Plat', 'Bœuf', 'Mijoté']
  },

  // Sud-Ouest & Aquitaine
  {
    code: 'tournedos-rossini-foie-gras',
    name: 'Tournedos Rossini Traditionnel au Foie Gras et Jus Réduit',
    category: 'rcat-poultry',
    region: 'Sud-Ouest', prep: 15, cook: 10, servings: 2, difficulty: 'hard',
    desc: 'Filet de bœuf poêlé sur canapé de pain de mie doré, surmonté d’une tranche de foie gras poêlée et sauce au cognac.',
    steps: ['Faites dorer les rondelles de pain de mie dans le beurre.', 'Saisissez les tournedos de bœuf 2 min par face. Réservez sur le pain.', 'Snackez le foie gras 30 secondes par face.', 'Déglacez au cognac et arrosez la viande.'],
    ingredients: [{ id: 'ing-beef-chuck', qty: 350, unit: 'g' }, { id: 'ing-butter', qty: 30, unit: 'g' }, { id: 'ing-cognac', qty: 40, unit: 'ml' }, { id: 'ing-baguette', qty: 1, unit: 'unit' }],
    tags: ['French', 'France', 'Gastronomie', 'Bœuf', 'Fêtes']
  },
  {
    code: 'civet-canard-cepes',
    name: 'Civet de Canard Périgourdin aux Cèpes et Vin de Bergerac',
    category: 'rcat-poultry',
    region: 'Périgord', prep: 20, cook: 90, servings: 4, difficulty: 'medium',
    desc: 'Canard mijoté au vin rouge de Bergerac et champignons des bois parfumés.',
    steps: ['Dorez les morceaux de canard en cocotte.', 'Ajoutez échalotes, ail, vin rouge et bouquet garni.', 'Cuisez 1h15.', 'Ajoutez les champignons poêlés et laissez lier la sauce.'],
    ingredients: [{ id: 'ing-duck-leg', qty: 4, unit: 'unit' }, { id: 'ing-mushroom', qty: 250, unit: 'g' }, { id: 'ing-red-wine', qty: 400, unit: 'ml' }, { id: 'ing-shallot', qty: 2, unit: 'unit' }],
    tags: ['French', 'France', 'Périgord', 'Canard', 'Plat']
  },
  {
    code: 'piperade-jambon-bayonne',
    name: 'Pipérade Basque aux Tranches de Jambon de Bayonne Poêlées',
    category: 'rcat-quick',
    region: 'Pays Basque', prep: 15, cook: 20, servings: 4, difficulty: 'easy',
    desc: 'Poivrons et tomates confits au piment d’Espelette servis avec de fines tranches de jambon de Bayonne chaudes.',
    steps: ['Faites compoter poivrons, tomates et oignons dans l’huile d’olive avec piment d’Espelette.', 'Faites dorer les tranches de jambon 1 min à la poêle.', 'Servez le jambon sur la pipérade chaude.'],
    ingredients: [{ id: 'ing-bell-pepper-red', qty: 2, unit: 'unit' }, { id: 'ing-tomato', qty: 3, unit: 'unit' }, { id: 'ing-ham-paris', qty: 4, unit: 'slice' }, { id: 'ing-espelette-pepper', qty: 1, unit: 'tsp' }, { id: 'ing-olive-oil', qty: 2, unit: 'tbsp' }],
    tags: ['French', 'France', 'Pays Basque', 'Plat', 'Rapide']
  },

  // Bourgogne & Franche-Comté
  {
    code: 'fondue-comtoise-vin-jaune',
    name: 'Fondue Comtoise au Comté 24 Mois et Morilles',
    category: 'rcat-veggie',
    region: 'Franche-Comté', prep: 15, cook: 15, servings: 4, difficulty: 'easy',
    desc: 'Comté affiné fondu dans un vin blanc du Jura parfumé aux morilles séchées réhydratées.',
    steps: ['Faites revenir les morilles au beurre.', 'Faites fondre le comté râpé dans le vin blanc avec l’ail.', 'Ajoutez les morilles et dégustez avec du pain de campagne.'],
    ingredients: [{ id: 'ing-gruyere', qty: 500, unit: 'g' }, { id: 'ing-white-wine', qty: 250, unit: 'ml' }, { id: 'ing-mushroom', qty: 150, unit: 'g' }, { id: 'ing-garlic', qty: 2, unit: 'clove' }, { id: 'ing-baguette', qty: 2, unit: 'unit' }],
    tags: ['French', 'France', 'Jura', 'Fromage', 'Plat']
  },
  {
    code: 'escalope-veau-comtoise',
    name: 'Escalope de Veau Comtoise Gratinée au Comté et Jambon de Montagne',
    category: 'rcat-poultry',
    region: 'Franche-Comté', prep: 15, cook: 15, servings: 4, difficulty: 'easy',
    desc: 'Escalope de veau poêlée recouverte d’une tranche de jambon de pays et de comté fondu au four.',
    steps: ['Dorez les escalopes 2 min par face.', 'Déposez une tranche de jambon et du comté râpé sur chaque escalope.', 'Faites gratiner 5 min sous le gril.'],
    ingredients: [{ id: 'ing-veal-escalope', qty: 4, unit: 'unit' }, { id: 'ing-ham-paris', qty: 4, unit: 'slice' }, { id: 'ing-gruyere', qty: 120, unit: 'g' }, { id: 'ing-butter', qty: 25, unit: 'g' }],
    tags: ['French', 'France', 'Franche-Comté', 'Veau', 'Plat']
  },
  {
    code: 'pain-epices-moutarde-canard',
    name: 'Aiguillettes de Canard en Croûte de Pain d’Épices et Moutarde',
    category: 'rcat-poultry',
    region: 'Bourgogne', prep: 15, cook: 10, servings: 4, difficulty: 'easy',
    desc: 'Aiguillettes de canard enrobées de chapelure de pain d’épices et moutarde de Dijon poêlées au beurre.',
    steps: ['Badigeonnez les aiguillettes de moutarde.', 'Passez-les dans la chapelure de pain d’épices.', 'Poêlez au beurre 2 min par face.'],
    ingredients: [{ id: 'ing-duck-breast', qty: 1, unit: 'unit' }, { id: 'ing-gingerbread', qty: 3, unit: 'slice' }, { id: 'ing-dijon-mustard', qty: 2, unit: 'tbsp' }, { id: 'ing-butter', qty: 30, unit: 'g' }],
    tags: ['French', 'France', 'Bourgogne', 'Canard', 'Rapide']
  },

  // Normandie & Bretagne
  {
    code: 'tarte-camembert-pommes-normande',
    name: 'Tarte Normande au Camembert Rôti et Pommes Caramélisées',
    category: 'rcat-starters',
    region: 'Normandie', prep: 20, cook: 30, servings: 6, difficulty: 'easy',
    desc: 'Camembert au lait cru fondant et tranches de pommes acidulées sur pâte feuilletée dorée.',
    steps: ['Faites dorer les pommes au beurre.', 'Foncez un moule avec la pâte.', 'Disposez pommes et tranches de camembert.', 'Enfournez 30 min à 190°C.'],
    ingredients: [{ id: 'ing-puff-pastry', qty: 1, unit: 'pack' }, { id: 'ing-camembert', qty: 1, unit: 'unit' }, { id: 'ing-apple', qty: 2, unit: 'unit' }, { id: 'ing-butter', qty: 20, unit: 'g' }],
    tags: ['French', 'France', 'Normandie', 'Tarte', 'Fromage']
  },
  {
    code: 'galette-andouille-guemene',
    name: 'Galette de Blé Noir à l’Andouille de Guémené et Emmental',
    category: 'rcat-quick',
    region: 'Bretagne', prep: 10, cook: 10, servings: 2, difficulty: 'easy',
    desc: 'Galette bretonne croustillante garnie de rondelles d’andouille fumée de Guémené et fromage fondu.',
    steps: ['Poêlez la galette au beurre demi-sel.', 'Disposez les rondelles d’andouille et l’emmental.', 'Pliez et servez croustillant.'],
    ingredients: [{ id: 'ing-buckwheat-flour', qty: 100, unit: 'g' }, { id: 'ing-sausage-toulouse', qty: 2, unit: 'unit' }, { id: 'ing-emmental', qty: 80, unit: 'g' }, { id: 'ing-salted-butter', qty: 20, unit: 'g' }],
    tags: ['French', 'France', 'Bretagne', 'Crêpe', 'Plat']
  },
  {
    code: 'crepes-chocolat-caramel-beurre-sale',
    name: 'Crêpes Bretonnes au Chocolat Noir Fondu et Caramel Beurre Salé',
    category: 'rcat-desserts',
    region: 'Bretagne', prep: 15, cook: 15, servings: 4, difficulty: 'easy',
    desc: 'Crêpes de froment fines au beurre demi-sel, nappées de sauce chocolat noir et coulis de caramel.',
    steps: ['Faites cuire les crêpes au beurre.', 'Faites fondre le chocolat.', 'Nappez les crêpes chaudes de chocolat et caramel salé.'],
    ingredients: [{ id: 'ing-flour', qty: 150, unit: 'g' }, { id: 'ing-milk', qty: 300, unit: 'ml' }, { id: 'ing-egg', qty: 2, unit: 'unit' }, { id: 'ing-dark-chocolate', qty: 100, unit: 'g' }, { id: 'ing-salted-butter', qty: 30, unit: 'g' }],
    tags: ['French', 'France', 'Bretagne', 'Dessert', 'Crêpe', 'Chocolat']
  },

  // Alsace & Nord
  {
    code: 'baeckoffe-agneau-porc-legumes',
    name: 'Baeckeoffe Traditionnel Alsacien aux 3 Viandes et Pommes de Terre',
    category: 'rcat-poultry',
    region: 'Alsace', prep: 30, cook: 210, servings: 8, difficulty: 'medium',
    desc: 'Plat de fête alsacien mariné au riesling, cuit en terrine de Soufflenheim scellée.',
    steps: ['Marinez viandes 24h au vin blanc d’Alsace.', 'Montez les couches de pommes de terre, oignons et viandes en terrine.', 'Cuisez 3h30 à 160°C.'],
    ingredients: [{ id: 'ing-beef-chuck', qty: 500, unit: 'g' }, { id: 'ing-ground-pork', qty: 500, unit: 'g' }, { id: 'ing-potato', qty: 1000, unit: 'g' }, { id: 'ing-white-wine', qty: 500, unit: 'ml' }, { id: 'ing-onion', qty: 3, unit: 'unit' }],
    tags: ['French', 'France', 'Alsace', 'Plat', 'Mijoté']
  },
  {
    code: 'kougelhopf-sale-lardons-noix',
    name: 'Kougelhopf Salé Alsacien aux Lardons Fumés et Noix',
    category: 'rcat-starters',
    region: 'Alsace', prep: 30, cook: 40, servings: 8, difficulty: 'medium',
    desc: 'Brioche cannelée salée garnie de lardons et noix, idéale pour l’apéritif alsacien.',
    steps: ['Pétrissez la pâte levée.', 'Incorporez les lardons dorés et les cerneaux de noix.', 'Laissez lever dans le moule et cuisez 40 min à 180°C.'],
    ingredients: [{ id: 'ing-flour', qty: 300, unit: 'g' }, { id: 'ing-bacon', qty: 150, unit: 'g' }, { id: 'ing-walnuts', qty: 60, unit: 'g' }, { id: 'ing-butter', qty: 80, unit: 'g' }, { id: 'ing-egg', qty: 2, unit: 'unit' }],
    tags: ['French', 'France', 'Alsace', 'Brioche', 'Apéritif']
  },
  {
    code: 'tarte-maroilles-chti-flamiche',
    name: 'Flamiche au Maroilles Ch’ti Traditionnelle',
    category: 'rcat-starters',
    region: 'Nord', prep: 20, cook: 30, servings: 6, difficulty: 'easy',
    desc: 'Pâte levée moelleuse recouverte d’épaisses tranches de Maroilles AOP et crème.',
    steps: ['Étalez la pâte dans un moule.', 'Recouvrez de tranches de Maroilles et nappez de crème.', 'Enfournez 30 min à 200°C jusqu’à gratiné.'],
    ingredients: [{ id: 'ing-maroilles', qty: 1, unit: 'unit' }, { id: 'ing-puff-pastry', qty: 1, unit: 'pack' }, { id: 'ing-creme-fraiche', qty: 4, unit: 'tbsp' }, { id: 'ing-egg', qty: 1, unit: 'unit' }],
    tags: ['French', 'France', 'Nord', 'Maroilles', 'Fromage', 'Plat']
  },

  // Desserts & Pâtisseries Régionales
  {
    code: 'croustade-pommes-armagnac',
    name: 'Croustade Gasconne aux Pommes et Armagnac',
    category: 'rcat-desserts',
    region: 'Sud-Ouest', prep: 30, cook: 30, servings: 6, difficulty: 'medium',
    desc: 'Feuilles de pâte étirée ultra-fine croustillantes garnies de pommes au beurre et parfumées à l’Armagnac.',
    steps: ['Badigeonnez les feuilles de pâte de beurre et sucre.', 'Garnissez de pommes poêlées à l’Armagnac.', 'Froissez la pâte et cuisez 30 min à 190°C.'],
    ingredients: [{ id: 'ing-apple', qty: 4, unit: 'unit' }, { id: 'ing-puff-pastry', qty: 1, unit: 'pack' }, { id: 'ing-butter', qty: 60, unit: 'g' }, { id: 'ing-sugar', qty: 80, unit: 'g' }, { id: 'ing-cognac', qty: 3, unit: 'tbsp' }],
    tags: ['French', 'France', 'Gascogne', 'Dessert', 'Pommes']
  },
  {
    code: 'tarte-abricots-romarin-amandes',
    name: 'Tarte Provençale aux Abricots, Miel et Romarin',
    category: 'rcat-desserts',
    region: 'Provence', prep: 20, cook: 35, servings: 6, difficulty: 'easy',
    desc: 'Oreillons d’abricots rôtis sur fond d’amandes, arrosés de miel de lavande et brins de romarin.',
    steps: ['Foncez un moule avec la pâte.', 'Saupoudrez d’amandes en poudre.', 'Disposez les abricots, arrosez de miel et romarin.', 'Cuisez 35 min à 190°C.'],
    ingredients: [{ id: 'ing-sweet-pastry', qty: 1, unit: 'pack' }, { id: 'ing-almond-flour', qty: 50, unit: 'g' }, { id: 'ing-honey', qty: 3, unit: 'tbsp' }, { id: 'ing-rosemary', qty: 0.5, unit: 'bunch' }, { id: 'ing-sugar', qty: 40, unit: 'g' }],
    tags: ['French', 'France', 'Provence', 'Dessert', 'Tarte', 'Été']
  },
  {
    code: 'creme-marron-vanille-verrine',
    name: 'Verrines Gourmandes de Crème de Marrons et Chantilly Maison',
    category: 'rcat-desserts',
    region: 'Ardèche', prep: 15, cook: 0, servings: 4, difficulty: 'easy',
    desc: 'Dessert réconfortant d’Ardèche alternant crème de marrons vanillée et chantilly aérienne.',
    steps: ['Montez la crème liquide en chantilly ferme avec le sucre vanillé.', 'Dans des verrines, alternez crème de marrons et chantilly.', 'Servez bien frais.'],
    ingredients: [{ id: 'ing-heavy-cream', qty: 250, unit: 'ml' }, { id: 'ing-sugar', qty: 30, unit: 'g' }, { id: 'ing-vanilla-bean', qty: 1, unit: 'unit' }],
    tags: ['French', 'France', 'Ardèche', 'Dessert', 'Verrine', 'Rapide']
  }
];

export const RECIPES_FRANCE_GENERATED_REGIONAL: Recipe[] = REGIONAL_DEFINITIONS.map(def => ({
  id: `rec-fr-${def.code}`,
  title: def.name,
  categoryId: def.category,
  servings: def.servings,
  prepTimeMinutes: def.prep,
  cookTimeMinutes: def.cook,
  difficulty: def.difficulty,
  description: def.desc,
  instructions: def.steps,
  ingredients: def.ingredients.map(i => ({ ingredientId: i.id, quantity: i.qty, unit: i.unit })),
  tags: def.tags
}));
