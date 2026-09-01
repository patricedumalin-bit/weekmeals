import { SupportedLanguage } from '../translations';
import { LocalizedRecipeContent } from '../recipeTranslations';

export const FRANCE_RECIPE_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedRecipeContent>> = {
  'rec-boeuf-bourguignon': {
    en: {
      title: 'Traditional Bœuf Bourguignon (French Beef Burgundy)',
      description: 'Iconic French slow-braised beef stew with smoked bacon lardons, sweet carrots, mushrooms, garlic, and fresh herbs in rich broth.',
      instructions: [
        'In a heavy Dutch oven, heat 1 tbsp olive oil over medium-high heat and crisp the smoked bacon lardons (5 mins). Remove lardons and set aside.',
        'Sear the cubed beef chuck in batches in the hot bacon fat until deeply browned on all sides. Season with salt and cracked black pepper.',
        'Add sliced onions, carrots, and minced garlic; cook for 4 minutes until fragrant. Stir in tomato paste and flour to coat the meat.',
        'Pour in rich beef broth, add fresh thyme sprigs and bay leaf. Bring to a simmer, cover tightly, and braise gently on low heat for 50 minutes.',
        'In a separate pan, sauté halved button mushrooms in butter until golden. Add them to the stew with the reserved bacon and simmer 15 minutes more.',
        'Serve steaming hot with crusty French baguette or boiled baby potatoes, garnished with fresh parsley.'
      ],
      tags: ['French', 'France', 'Classic', 'Stew', 'Comfort Food', 'Beef']
    },
    fr: {
      title: 'Bœuf Bourguignon Traditionnel',
      description: 'Plat emblématique français de bœuf mijoté fondant aux lardons fumés, carottes, champignons de Paris, ail et herbes aromatiques dans un riche bouillon.',
      instructions: [
        'Dans une cocotte en fonte, faites chauffer 1 c. à soupe d’huile d’olive et dorez les lardons fumés pendant 5 minutes. Réservez les lardons.',
        'Faites dorer les morceaux de bœuf dans la graisse chaude sur toutes les faces. Assaisonnez de sel et de poivre noir moulu.',
        'Ajoutez les oignons émincés, les carottes en rondelles et l’ail haché ; faites suer 4 minutes. Incorporez le concentré de tomate et la farine pour singer la viande.',
        'Mouillez avec le bouillon de bœuf chaud, ajoutez les brins de thym et les feuilles de laurier. Portez à frémissement, couvrez et laissez mijoter à feu doux pendant 50 minutes.',
        'Dans une poêle, faites sauter les champignons coupés en deux dans le beurre jusqu’à coloration dorée. Ajoutez-les au mijoté avec les lardons réservés et poursuivez la cuisson 15 minutes.',
        'Servez bien chaud parsemé de persil plat frais avec une baguette croustillante ou des pommes de terre vapeur.'
      ],
      tags: ['Français', 'France', 'Classique', 'Mijoté', 'Bœuf', 'Traditionnel']
    },
    de: {
      title: 'Traditionelles Bœuf Bourguignon',
      description: 'Klassischer französischer Rinderschmortopf mit knusprigem Speck, Karotten, Champignons, Knoblauch und frischen Kräutern in kräftiger Brühe.',
      instructions: [
        'In einem Schmortopf 1 EL Olivenöl erhitzen und den Speck knusprig anbraten (5 Min.). Herausnehmen und beiseitestellen.',
        'Die Rindfleischwürfel im heißen Fett portionsweise von allen Seiten scharf anbraten. Mit Salz und Pfeffer würzen.',
        'Zwiebeln, Karotten und gehackten Knoblauch zugeben und 4 Minuten andünsten. Tomatenmark und Mehl einrühren.',
        'Mit kräftiger Rinderbrühe aufgießen, Thymian und Lorbeerblätter zugeben. Abdecken und bei schwacher Hitze ca. 50 Minuten sanft schmoren.',
        'Champignons in Butter goldbraun anbraten. Zusammen mit dem Speck zum Ragout geben und weitere 15 Minuten köcheln lassen.',
        'Heiß mit frischer Petersilie garniert servieren, ideal mit Baguette oder Salzkartoffeln.'
      ],
      tags: ['Französisch', 'Frankreich', 'Klassiker', 'Schmortopf', 'Rindfleisch']
    },
    es: {
      title: 'Bœuf Bourguignon Tradicional',
      description: 'Emblemático estofado francés de ternera tierna con dados de bacon ahumado, zanahorias, champiñones, ajo y hierbas provenzales en caldo concentrado.',
      instructions: [
        'En una cazuela de hierro, caliente 1 cucharada de aceite de oliva y dore el bacon ahumado durante 5 minutos. Retírelo y resérvelo.',
        'Dore los trozos de ternera a fuego vivo por todos lados en la grasa del bacon. Sazone con sal y pimienta negra molida.',
        'Incorpore las cebollas laminadas, las zanahorias y el ajo picado; sofría 4 minutos. Añada el concentrado de tomate y la harina para ligar.',
        'Vierta el caldo de ternera caliente, agregue el tomillo y el laurel. Lleve a ebullición suave, tape y estofe a fuego lento durante 50 minutos.',
        'Saltee los champiñones en mantequilla hasta que estén dorados. Incorpórelos al guiso junto con el bacon y cocine 15 minutos más.',
        'Sirva muy caliente espolvoreado con perejil fresco acompañado de pan crujiente o patatas cocidas.'
      ],
      tags: ['Francés', 'Francia', 'Clásico', 'Guiso', 'Ternera', 'Tradicional']
    },
    pt: {
      title: 'Bœuf Bourguignon Tradicional',
      description: 'Prato clássico francês de carne de novilho estufada lentamente com bacon fumado, cenouras, cogumelos, alho e ervas aromáticas.',
      instructions: [
        'Num tacho de ferro fundido, aqueça 1 colher de azeite e doure os cubos de bacon fumado durante 5 minutos. Retire e reserve.',
        'Sele os cubos de carne na gordura quente até dourarem de todos os lados. Tempere com sal e pimenta preta moída.',
        'Junte a cebola fatiada, as cenouras e o alho picado; refogue 4 minutos. Envolva o concentrado de tomate e a farinha na carne.',
        'Regue com o caldo de carne quente, adicione o tomilho e as folhas de louro. Tape e deixe estufar em lume brando durante 50 minutos.',
        'Numa frigideira, salteie os cogumelos cortados em manteiga até dourarem. Junte-os ao estufado com o bacon reservado e cozinhe mais 15 minutos.',
        'Sirva bem quente polvilhado com salsa fresca picada e pão rústico ou batatas cozidas.'
      ],
      tags: ['Francês', 'França', 'Clássico', 'Estufado', 'Carne de Vaca']
    }
  },

  'rec-ratatouille': {
    en: {
      title: 'Oven-Baked Provencal Ratatouille',
      description: 'Vibrant Mediterranean stewed vegetables featuring thinly sliced zucchini, eggplant, sweet bell peppers, ripe tomatoes, garlic, and Herbes de Provence.',
      instructions: [
        'Preheat oven to 190°C (375°F).',
        'Finely dice 1 onion, 1 red bell pepper, and 2 garlic cloves. Sauté in 2 tbsp extra virgin olive oil in a skillet until soft (5 mins). Stir in tomato paste, crushed tomatoes, and salt to form the base sauce.',
        'Spread the tomato-pepper sauce evenly across the bottom of a shallow baking dish.',
        'Slice zucchini, eggplant, and vine tomatoes into thin, uniform rounds.',
        'Arrange vegetable slices in alternating rows standing up over the tomato base.',
        'Drizzle generously with olive oil, sprinkle with Herbes de Provence, salt, and black pepper. Cover with parchment paper and bake 35 mins until tender, removing paper for the last 10 mins.'
      ],
      tags: ['French', 'France', 'Vegetarian', 'Mediterranean', 'Healthy', 'Gluten-Free']
    },
    fr: {
      title: 'Ratatouille Provençale au Four',
      description: 'Méli-mélo ensoleillé de légumes méditerranéens finement tranchés : courgettes, aubergines, poivrons doux, tomates mûres, ail et herbes de Provence.',
      instructions: [
        'Préchauffez votre four à 190°C.',
        'Émincez finement 1 oignon, 1 poivron rouge et 2 gousses d’ail. Faites-les suer dans 2 c. à soupe d’huile d’olive pendant 5 minutes. Incorporez le coulis de tomates, le concentré de tomate et le sel.',
        'Étalez cette concassée de tomates et poivrons au fond d’un plat à gratin.',
        'Coupez les courgettes, l’aubergine et les tomates en fines rondelles régulières.',
        'Disposez les rondelles de légumes en alternant les couleurs sur le lit de sauce.',
        'Arrosez d’un généreux filet d’huile d’olive, parsemez d’herbes de Provence, de sel et de poivre. Couvrez de papier cuisson et enfournez 35 min, en retirant le papier les 10 dernières minutes.'
      ],
      tags: ['Français', 'France', 'Végétarien', 'Méditerranéen', 'Légumes', 'Léger']
    },
    de: {
      title: 'Provenzalische Ratatouille aus dem Ofen',
      description: 'Farbenfrohes mediterranes Ofengemüse aus feinen Zucchini-, Auberginen- und Tomatenscheiben mit Paprika, Knoblauch und Kräutern der Provence.',
      instructions: [
        'Backofen auf 190°C vorheizen.',
        '1 Zwiebel, 1 rote Paprika und 2 Knoblauchzehen fein würfeln und in 2 EL Olivenöl 5 Minuten andünsten. Tomatenmark und gehackte Tomaten einrühren.',
        'Die Tomatensauce als Basis in einer Auflaufform verstreichen.',
        'Zucchini, Aubergine und Tomaten in gleichmäßige, dünne Scheiben schneiden.',
        'Das Gemüse abwechselnd und fächerförmig auf der Sauce anordnen.',
        'Mit reichlich Olivenöl beträufeln, Kräuter der Provence, Salz und Pfeffer darübergeben. Mit Backpapier abdecken und 35 Minuten backen (die letzten 10 Min. ohne Papier).'
      ],
      tags: ['Französisch', 'Frankreich', 'Vegetarisch', 'Mediterran', 'Gemüse']
    },
    es: {
      title: 'Ratatouille Provenzal al Horno',
      description: 'Colorido plato mediterráneo de verduras laminadas: calabacín, berenjena, pimientos dulces, tomates maduros, ajo y hierbas provenzales.',
      instructions: [
        'Precaliente el horno a 190°C.',
        'Pique finamente 1 cebolla, 1 pimiento rojo y 2 dientes de ajo. Sofría en 2 cucharadas de aceite de oliva durante 5 minutos y añada el tomate triturado y el concentrado.',
        'Extienda la salsa de tomate y pimientos en el fondo de una fuente para horno.',
        'Corte el calabacín, la berenjena y los tomates en rodajas finas y uniformes.',
        'Coloque las rodajas de verdura alternando colores sobre la base de tomate.',
        'Riegue con aceite de oliva virgen extra, espolvoree con hierbas provenzales, sal y pimienta. Cubra con papel de horno y hornee 35 minutos (destapando los últimos 10 min).'
      ],
      tags: ['Francés', 'Francia', 'Vegetariano', 'Mediterráneo', 'Saludable']
    },
    pt: {
      title: 'Ratatouille Provençal no Forno',
      description: 'Elegante prato mediterrânico de legumes fatiados: curgete, beringela, pimentos doces, tomates maduros, alho e ervas de Provença.',
      instructions: [
        'Pré-aqueça o forno a 190°C.',
        'Pique 1 cebola, 1 pimento vermelho e 2 dentes de alho. Refogue em 2 colheres de azeite durante 5 minutos e junte a polpa de tomate e o concentrado.',
        'Espalhe o molho de tomate na base de uma assadeira.',
        'Corte a curgete, a beringela e os tomates em rodelas finas e regulares.',
        'Disponha os legumes alternando as cores em espiral sobre a base de molho.',
        'Regue com um fio generoso de azeite, polvilhe com ervas de Provença, sal e pimenta. Cubra com papel vegetal e asse por 35 minutos (retire o papel nos últimos 10 minutos).'
      ],
      tags: ['Francês', 'França', 'Vegetariano', 'Mediterrânico', 'Saudável']
    }
  },

  'rec-poulet-roti': {
    en: {
      title: 'Classic Herb-Roasted Chicken & Potatoes',
      description: 'Tender roast chicken thighs and baby potatoes baked in garlic butter, fresh rosemary, thyme, and lemon juice.',
      instructions: [
        'Preheat oven to 200°C (400°F).',
        'Halve new potatoes and place in a large roasting pan with halved shallots and unpeeled garlic cloves.',
        'Toss chicken thighs with melted butter, 1 tbsp olive oil, lemon juice, rosemary, thyme, salt, and pepper.',
        'Nestle chicken on top of the potatoes. Roast for 45 minutes until the skin is deep golden and crisp.',
        'Garnish with fresh parsley and serve with pan juices.'
      ],
      tags: ['French', 'Poultry', 'Roast', 'Dinner', 'Easy']
    },
    fr: {
      title: 'Poulet Rôti aux Herbes et Pommes de Terre',
      description: 'Cuisses de poulet fondantes et pommes de terre grenailles rôties au four au beurre aillé, romarin, thym et citron.',
      instructions: [
        'Préchauffez le four à 200°C.',
        'Coupez les pommes de terre nouvelles en deux et disposez-les dans un grand plat avec les échalotes coupées en deux et les gousses d’ail en chemise.',
        'Enrobez les cuisses de poulet de beurre fondu, d’huile d’olive, de jus de citron, de romarin, de thym, de sel et de poivre.',
        'Déposez le poulet sur les pommes de terre. Enfournez 45 minutes jusqu’à ce que la peau soit bien dorée et croustillante.',
        'Parsemez de persil frais et servez avec le jus de cuisson caramélisé.'
      ],
      tags: ['Français', 'Volaille', 'Rôti', 'Poulet', 'Facile']
    },
    de: {
      title: 'Klassisches Kräuter-Brathähnchen mit Kartoffeln',
      description: 'Zarte Hähnchenschenkel und kleine Frühkartoffeln, im Ofen mit Knoblauchbutter, Rosmarin, Thymian und Zitrone knusprig gebacken.',
      instructions: [
        'Backofen auf 200°C vorheizen.',
        'Kartoffeln halbieren und mit halbierten Schalotten und ungeschälten Knoblauchzehen in eine Auflaufform geben.',
        'Hähnchenschenkel mit flüssiger Butter, 1 EL Olivenöl, Zitronensaft, Rosmarin, Thymian, Salz und Pfeffer marinieren.',
        'Das Hähnchen auf die Kartoffeln setzen. 45 Minuten braten, bis die Haut goldbraun und knusprig ist.',
        'Mit frischer Petersilie bestreuen und mit dem Bratensaft servieren.'
      ],
      tags: ['Französisch', 'Geflügel', 'Braten', 'Klassiker']
    },
    es: {
      title: 'Pollo Asado a las Hierbas con Patatas',
      description: 'Jugosos muslos de pollo y patatas tiernas asados con mantequilla al ajo, romero, tomillo y zumo de limón fresco.',
      instructions: [
        'Precaliente el horno a 200°C.',
        'Corte las patatitas por la mitad y colóquelas en una fuente con las chalotas y los ajos enteros.',
        'Unte el pollo con mantequilla derretida, aceite de oliva, zumo de limón, romero, tomillo, sal y pimienta.',
        'Coloque el pollo sobre las patatas y hornee durante 45 minutos hasta que la piel esté dorada y crujiente.',
        'Decore con perejil picado y sirva con los jugos del asado.'
      ],
      tags: ['Francés', 'Aves', 'Asado', 'Pollo', 'Fácil']
    },
    pt: {
      title: 'Frango Assado com Ervas e Batatas',
      description: 'Coxas de frango suculentas e batatas novas assadas no forno com manteiga de alho, alecrim, tomilho e sumo de limão.',
      instructions: [
        'Pré-aqueça o forno a 200°C.',
        'Corte as batatinhas ao meio e coloque numa assadeira com as chalotas e dentes de alho inteiros.',
        'Tempere o frango com manteiga derretida, azeite, sumo de limão, alecrim, tomilho, sal e pimenta.',
        'Disponha o frango sobre as batatas e asse durante 45 minutos até a pele ficar dourada e estaladiça.',
        'Polvilhe com salsa picada e sirva com o molho do assado.'
      ],
      tags: ['Francês', 'Aves', 'Assado', 'Frango', 'Fácil']
    }
  },

  'rec-soupe-oignon': {
    en: {
      title: 'Classic French Onion Soup Gratinée',
      description: 'Slow-caramelized sweet yellow onions in rich beef broth, topped with toasted artisan baguette slices and melted Gruyère cheese.',
      instructions: [
        'Thinly slice yellow onions. Melt butter with 1 tbsp olive oil in a deep pot over medium-low heat.',
        'Caramelize onions slowly for 30 minutes, stirring occasionally until deep golden brown. Stir in sugar and flour for 2 minutes.',
        'Pour in beef broth and fresh thyme. Simmer gently for 20 minutes; season with salt and black pepper.',
        'Ladle hot soup into oven-safe bowls. Top each with a toasted baguette slice and generous shredded Gruyère.',
        'Broil in the oven for 4-5 minutes until the cheese is bubbling and golden brown.'
      ],
      tags: ['French', 'Starter', 'Soup', 'Cheese', 'Classic']
    },
    fr: {
      title: "Soupe à l'Oignon Gratinée au Gruyère",
      description: 'Oignons doux caramélisés lentement dans un bouillon de bœuf corsé, surmontés de tranches de baguette croustillante et de fromage Gruyère gratiné.',
      instructions: [
        'Émincez finement les oignons jaunes. Faites fondre le beurre avec 1 c. à soupe d’huile d’olive dans une cocotte à feu doux.',
        'Faites caraméliser les oignons lentement pendant 30 minutes en remuant jusqu’à une belle couleur ambrée. Ajoutez le sucre et la farine, mélangez 2 minutes.',
        'Versez le bouillon de bœuf chaud et ajoutez le thym. Laissez mijoter 20 minutes ; rectifiez l’assaisonnement en sel et poivre.',
        'Versez la soupe dans des bols allant au four. Déposez une tranche de baguette grillée et recouvrez généreusement de Gruyère râpé.',
        'Passez sous le gril du four pendant 4 à 5 minutes jusqu’à ce que le fromage soit fondu et doré.'
      ],
      tags: ['Français', 'Entrée', 'Soupe', 'Fromage', 'Classique']
    },
    de: {
      title: 'Französische Zwiebelsuppe Gratinée',
      description: 'Langsam karamellisierte Zwiebeln in kräftiger Rinderbrühe, mit geröstetem Baguette belegt und mit Gruyère-Käse überbacken.',
      instructions: [
        'Zwiebeln in feine Ringe schneiden. Butter und 1 EL Olivenöl in einem Topf bei mittlerer Hitze zerlassen.',
        'Zwiebeln ca. 30 Minuten langsam goldbraun karamellisieren. Zucker und Mehl 2 Minuten unterrühren.',
        'Mit heißer Rinderbrühe aufgießen, Thymian zugeben und 20 Minuten sanft köcheln lassen. Mit Salz und Pfeffer abschmecken.',
        'Suppe in ofenfeste Schalen füllen, mit einer Scheibe geröstetem Baguette belegen und reichlich Gruyère darauf verteilen.',
        'Unter dem Ofengrill 4-5 Minuten überbacken, bis der Käse blubbert und goldbraun ist.'
      ],
      tags: ['Französisch', 'Vorspeise', 'Suppe', 'Käse', 'Klassiker']
    },
    es: {
      title: 'Sopa de Cebolla Francesa Gratinada',
      description: 'Cebollas caramelizadas a fuego lento en sabroso caldo de ternera, cubiertas con rebanadas de pan tostado y queso Gruyère fundido.',
      instructions: [
        'Corte las cebollas en juliana fina. Derrita la mantequilla con 1 cucharada de aceite de oliva en una olla a fuego suave.',
        'Caramelice las cebollas lentamente durante 30 minutos hasta que tengan un tono dorado oscuro. Añada el azúcar y la harina, removiendo 2 minutos.',
        'Vierta el caldo de ternera caliente y el tomillo. Cocine a fuego lento 20 minutos; sazone con sal y pimienta.',
        'Reparta la sopa en cuencos refractarios. Coloque encima una rebanada de baguette tostada y abundante queso Gruyère rallado.',
        'Gratine en el horno durante 4-5 minutos hasta que el queso esté burbujeante y dorado.'
      ],
      tags: ['Francés', 'Entrante', 'Sopa', 'Queso', 'Tradicional']
    },
    pt: {
      title: 'Sopa de Cebola Francesa Gratinada',
      description: 'Cebolas caramelizadas lentamente em caldo rico de carne, servida com fatias de pão torrado e queijo Gruyère gratinado.',
      instructions: [
        'Corte as cebolas em meias-luas finas. Derreta a manteiga com 1 colher de azeite num tacho em lume brando.',
        'Caramelize as cebolas durante 30 minutos até ficarem bem douradas. Junte o açúcar e a farinha, mexendo por 2 minutos.',
        'Regue com o caldo de carne quente e adicione o tomilho. Deixe apurar 20 minutos; tempere com sal e pimenta.',
        'Distribua a sopa por tigelas de barro. Coloque uma fatia de pão torrado por cima e cubra com queijo Gruyère ralado.',
        'Leve a gratinar ao forno por 4 a 5 minutos até o queijo borbulhar e dourar.'
      ],
      tags: ['Francês', 'Entrada', 'Sopa', 'Queijo', 'Tradicional']
    }
  },

  'rec-salade-nicoise': {
    en: {
      title: 'Traditional French Salade Niçoise',
      description: 'Classic Côte d’Azur salad composed of tender tuna, soft-boiled eggs, crisp green beans, baby potatoes, black olives, and Dijon vinaigrette.',
      instructions: [
        'Boil baby potatoes until fork-tender (15 mins); blanch green beans in salted boiling water for 4 mins, then plunge into iced water.',
        'Soft-boil eggs for 6.5 minutes, peel and slice into halves.',
        'Whisk Dijon mustard, red wine vinegar, extra virgin olive oil, salt, and black pepper for the dressing.',
        'Arrange blanched green beans, halved potatoes, sliced vine tomatoes, and black olives on a large platter.',
        'Top with flaky chunk tuna and egg halves. Drizzle generously with Dijon vinaigrette.'
      ],
      tags: ['French', 'Salad', 'Healthy', 'Quick', 'Fish', 'Mediterranean']
    },
    fr: {
      title: 'Salade Niçoise Traditionnelle',
      description: 'Salade estivale emblématique de la Côte d’Azur composée de thon, œufs mollets, haricots verts croquants, pommes de terre, olives noires et vinaigrette à la moutarde de Dijon.',
      instructions: [
        'Faites cuire les pommes de terre nouvelles à l’eau bouillante (15 min) ; plongez les haricots verts 4 min dans l’eau bouillante salée puis dans l’eau glacée.',
        'Faites cuire les œufs mollets 6 min 30, écalez-les et coupez-les en deux.',
        'Préparez la vinaigrette en émulsionnant la moutarde de Dijon, le vinaigre, l’huile d’olive, le sel et le poivre.',
        'Dressez harmonieusement sur un grand plat les haricots verts, les pommes de terre tièdes, les quartiers de tomates et les olives noires.',
        'Déposez les morceaux de thon égoutté et les demi-œufs. Nappez de vinaigrette à la moutarde.'
      ],
      tags: ['Français', 'Salade', 'Méditerranéen', 'Poisson', 'Rapide', 'Frais']
    },
    de: {
      title: 'Traditioneller Nizza-Salat (Salade Niçoise)',
      description: 'Klassischer Sommersalat von der Côte d’Azur mit feinem Thunfisch, wachsweichen Eiern, grünen Bohnen, Kartoffeln, Oliven und Dijon-Dressing.',
      instructions: [
        'Kartoffeln gar kochen (15 Min.); grüne Bohnen 4 Minuten in Salzwasser blanchieren und in Eiswasser abschrecken.',
        'Eier 6,5 Minuten kochen, abschrecken, schälen und halbieren.',
        'Aus Dijon-Senf, Rotweinessig, Olivenöl, Salz und Pfeffer ein sämiges Dressing rühren.',
        'Bohnen, halbierte Kartoffeln, Tomatenspalten und schwarze Oliven auf einer Platte anrichten.',
        'Mit Thunfischstücken und Eierhälften belegen und mit dem Dressing beträufeln.'
      ],
      tags: ['Französisch', 'Salat', 'Mediterran', 'Fisch', 'Leicht']
    },
    es: {
      title: 'Ensalada Nizarda Tradicional (Salade Niçoise)',
      description: 'Refrescante ensalada de la Costa Azul con atún en aceite, huevos cocidos, judías verdes crujientes, patatitas, aceitunas negras y vinagreta de Dijon.',
      instructions: [
        'Cueza las patatas hasta que estén tiernas (15 min); escalde las judías verdes 4 minutos y enfríelas en agua con hielo.',
        'Cueza los huevos durante 6,5 minutos, pélelos y córtelos por la mitad.',
        'Emulsione la mostaza de Dijon con vinagre, aceite de oliva virgen extra, sal y pimienta.',
        'Disponga en una fuente las judías verdes, las patatas, los tomates y las aceitunas negras.',
        'Añada el atún desmigado y los medios huevos. Riegue con la vinagreta de Dijon.'
      ],
      tags: ['Francés', 'Ensalada', 'Mediterráneo', 'Pescado', 'Fresco']
    },
    pt: {
      title: 'Salada Niçoise Tradicional',
      description: 'Famosa salada mediterrânica da Riviera Francesa com atum, ovos cozidos, feijão-verde crocante, batatinhas, azeitonas e vinagrete de Dijon.',
      instructions: [
        'Coza as batatinhas (15 min); escalde o feijão-verde durante 4 minutos e passe por água fria com gelo.',
        'Coza os ovos durante 6,5 minutos, descasque e corte ao meio.',
        'Misture a mostarda de Dijon com vinagre de vinho, azeite virgem extra, sal e pimenta.',
        'Disponha numa travessa o feijão-verde, as batatinhas, os tomates em gomos e as azeitonas pretas.',
        'Coloque o atum em lascas e as metades de ovo. Regue com o vinagrete de Dijon.'
      ],
      tags: ['Francês', 'Salada', 'Mediterrânico', 'Peixe', 'Fresco']
    }
  },

  'rec-quiche-lorraine': {
    en: {
      title: 'Authentic Quiche Lorraine with Lardons',
      description: 'Classic French savory tart in buttery puff pastry with crisp smoked bacon lardons, Gruyère cheese, and rich egg custard.',
      instructions: [
        'Preheat oven to 190°C (375°F). Line a 24cm tart pan with rolled puff pastry and prick the base with a fork.',
        'Sauté bacon lardons in a skillet for 5 minutes until lightly golden; drain excess fat.',
        'In a bowl, whisk eggs, heavy cream, milk, ground nutmeg, salt, and black pepper until smooth.',
        'Scatter cooked lardons and shredded Gruyère cheese over the pastry base.',
        'Pour egg cream mixture evenly over the fillings. Bake for 35 minutes until puffed and golden.'
      ],
      tags: ['French', 'Pastry', 'Savory', 'Baking', 'Comfort Food']
    },
    fr: {
      title: 'Quiche Lorraine Traditionnelle aux Lardons',
      description: 'Tourte salée française incontournable à la pâte feuilletée pur beurre, garnie de lardons fumés dorés, fromage Gruyère et appareil crémeux.',
      instructions: [
        'Préchauffez le four à 190°C. Foncez un moule à tarte avec la pâte feuilletée et piquez le fond à la fourchette.',
        'Faites rissoler les lardons fumés à sec dans une poêle pendant 5 minutes ; égouttez l’excès de gras.',
        'Dans un saladier, battez les œufs avec la crème fraîche, le lait, la noix de muscade râpée, le sel et le poivre.',
        'Répartissez les lardons dorés et le Gruyère râpé sur le fond de tarte.',
        'Versez l’appareil à quiche et enfournez pendant 35 minutes jusqu’à ce que la quiche soit bien gonflée et dorée.'
      ],
      tags: ['Français', 'Tarte', 'Salé', 'Classique', 'Fromage']
    },
    de: {
      title: 'Traditionelle Quiche Lorraine mit Speck',
      description: 'Klassische französische Tarte mit knusprigem Blätterteigboden, gebratenen Speckwürfeln, Gruyère-Käse und feinem Eier-Sahne-Guss.',
      instructions: [
        'Backofen auf 190°C vorheizen. Eine Tarteform mit Blätterteig auskleiden und den Boden mit einer Gabel einstechen.',
        'Speckwürfel in einer Pfanne 5 Minuten anbraten; überschüssiges Fett abgießen.',
        'Eier, Sahne, Milch, geriebene Muskatnuss, Salz und Pfeffer gründlich verquirlen.',
        'Speck und geriebenen Gruyère-Käse gleichmäßig auf dem Teigboden verteilen.',
        'Den Eierguss darübergießen und 35 Minuten im Ofen goldbraun backen.'
      ],
      tags: ['Französisch', 'Klassiker', 'Herzhaft', 'Backen', 'Käse']
    },
    es: {
      title: 'Quiche Lorraine Tradicional con Bacon',
      description: 'Clásica tarta salada francesa con masa hojaldrada, tiras de bacon ahumado crujiente, queso Gruyère y suave crema de huevo.',
      instructions: [
        'Precaliente el horno a 190°C. Forre un molde con la masa de hojaldre y pinche el fondo con un tenedor.',
        'Dore el bacon ahumado en una sartén durante 5 minutos y escurra el exceso de grasa.',
        'En un bol, bata los huevos con la nata, la leche, una pizca de nuez moscada, sal y pimienta.',
        'Reparta el bacon y el queso Gruyère rallado sobre la base de masa.',
        'Vierta la mezcla líquida y hornee durante 35 minutos hasta que esté dorada y cuajada.'
      ],
      tags: ['Francés', 'Tarta Salada', 'Queso', 'Bacon', 'Horno']
    },
    pt: {
      title: 'Quiche Lorraine Tradicional com Bacon',
      description: 'Tarte salgada tradicional francesa em massa folhada crocante, recheada com bacon fumado, queijo Gruyère e creme de ovos e natas.',
      instructions: [
        'Pré-aqueça o forno a 190°C. Forre uma tarteira com a massa folhada e pique o fundo com um garfo.',
        'Salteie o bacon numa frigideira por 5 minutos até dourar e escorra a gordura.',
        'Numa taça, bata os ovos com as natas, o leite, a noz-moscada, sal e pimenta.',
        'Espalhe o bacon e o queijo Gruyère ralado sobre a base da tarte.',
        'Verta o preparado de ovos e leve ao forno durante 35 minutos até ficar dourada e fofa.'
      ],
      tags: ['Francês', 'Tarte Salgada', 'Queijo', 'Bacon', 'Forno']
    }
  },

  'rec-tarte-tatin': {
    en: {
      title: 'Caramelized Apple Tarte Tatin',
      description: 'Upside-down French tart of tender apples caramelized in butter and sugar, baked under golden flaky puff pastry.',
      instructions: [
        'Preheat oven to 190°C (375°F). Peel, core, and quarter baking apples.',
        'In an oven-safe skillet, melt butter with sugar over medium heat until a golden amber caramel forms (6 mins).',
        'Pack apple quarters tightly into the hot caramel in concentric circles. Cook on stovetop for 10 mins until slightly tender.',
        'Drape rolled puff pastry over apples, tucking the edges down inside the pan. Cut a small vent slit in the center.',
        'Bake for 30 minutes until pastry is crisp and deeply golden. Let cool 5 minutes, then invert carefully onto a serving platter.'
      ],
      tags: ['French', 'Dessert', 'Pastry', 'Baking', 'Apples', 'Sweet']
    },
    fr: {
      title: 'Tarte Tatin aux Pommes Caramélisées',
      description: 'La célèbre tarte renversée aux pommes fondantes caramélisées au beurre et au sucre, cuite sous une pâte feuilletée croustillante.',
      instructions: [
        'Préchauffez le four à 190°C. Épluchez, évidez et coupez les pommes en quartiers.',
        'Dans une poêle allant au four, faites fondre le beurre avec le sucre à feu moyen jusqu’à obtention d’un caramel ambré (6 min).',
        'Disposez les quartiers de pommes serrés en rosace dans le caramel chaud. Laissez cuire 10 min sur feu doux pour attendrir les pommes.',
        'Recouvrez avec la pâte feuilletée en rentrant les bords à l’intérieur du moule. Faites une petite incision au centre.',
        'Enfournez 30 minutes jusqu’à ce que la pâte soit bien dorée et croustillante. Laissez tiédir 5 minutes puis démoulez en retournant sur un plat.'
      ],
      tags: ['Français', 'Dessert', 'Pâtisserie', 'Pommes', 'Sucré', 'Classique']
    },
    de: {
      title: 'Karamellisierte Apfel-Tarte-Tatin',
      description: 'Berühmter gestürzter französischer Apfelkuchen mit in Butter und Zucker karamellisierten Äpfeln unter knusprigem Blätterteig.',
      instructions: [
        'Backofen auf 190°C vorheizen. Äpfel schälen, entkernen und vierteln.',
        'In einer ofenfesten Pfanne Butter und Zucker bei mittlerer Hitze zu einem bernsteinfarbenen Karamell schmelzen (6 Min.).',
        'Apfelviertel kreisförmig dicht in das heiße Karamell setzen und 10 Minuten auf dem Herd sanft weich dünsten.',
        'Blätterteig über die Äpfel legen und die Ränder nach innen einschlagen. In der Mitte einen kleinen Schlitz einschneiden.',
        '30 Minuten goldbraun backen. 5 Minuten ruhen lassen, dann vorsichtig auf eine Servierplatte stürzen.'
      ],
      tags: ['Französisch', 'Dessert', 'Apfelkuchen', 'Süß', 'Backen']
    },
    es: {
      title: 'Tarte Tatin de Manzanas Caramelizadas',
      description: 'Famosa tarta invertida francesa con manzanas caramelizadas en mantequilla y azúcar bajo un crujiente hojaldre dorado.',
      instructions: [
        'Precaliente el horno a 190°C. Pele, descorazone y corte las manzanas en cuartos.',
        'En una sartén apta para horno, funda la mantequilla con el azúcar hasta lograr un caramelo dorado.',
        'Coloque los cuartos de manzana apretados en círculos sobre el caramelo y cocine 10 minutos a fuego suave.',
        'Cubra con la lámina de hojaldre metiendo los bordes hacia dentro. Haga un pequeño corte en el centro.',
        'Hornee durante 30 minutos hasta que el hojaldre esté dorado. Deje reposar 5 minutos y desmolde con cuidado dándole la vuelta.'
      ],
      tags: ['Francés', 'Postre', 'Manzana', 'Dulce', 'Repostería']
    },
    pt: {
      title: 'Tarte Tatin de Maçãs Caramelizadas',
      description: 'Famosa tarte invertida francesa com maçãs caramelizadas em manteiga e açúcar sob uma capa de massa folhada estaladiça.',
      instructions: [
        'Pré-aqueça o forno a 190°C. Descasque, descaroce e corte as maçãs em quartos.',
        'Numa frigideira que possa ir ao forno, derreta a manteiga com o açúcar até formar um caramelo dourado.',
        'Disponha os quartos de maçã bem aconchegados sobre o caramelo e cozinhe 10 minutos em lume brando.',
        'Cubra com a massa folhada, aconchegando as bordas para dentro. Faça um pequeno corte no centro.',
        'Asse durante 30 minutos até a massa ficar bem dourada. Deixe amornar 5 minutos e desenforme virando sobre um prato.'
      ],
      tags: ['Francês', 'Sobremesa', 'Maçã', 'Doce', 'Pastelaria']
    }
  }
};
