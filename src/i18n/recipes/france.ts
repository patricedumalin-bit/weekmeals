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
  },
  'rec-fr-tarte-tatin-authentique': {
    en: {
      title: 'Authentic Apple Tarte Tatin with Caramelized Apples',
      description: 'The Tatin sisters’ famous upside-down tart: melting caramelized apple wedges in a salted butter caramel, topped with a crisp pastry crust.',
      instructions: [
        'Peel 6 large apples (Reine des Reinettes or Golden variety), cut into large wedges and core them.',
        'In a Tatin dish or an oven-proof skillet, melt 100 g sugar with 60 g salted butter over medium heat to make a beautiful amber caramel.',
        'Arrange the apple wedges tightly, standing upright, in the hot caramel.',
        'Cook the apples over low heat for 15 minutes so they soak up the caramel and begin to candy.',
        'Remove from the heat and cover the apples with the puff or shortcrust pastry disc, tucking the edges down inside the dish.',
        'Prick the pastry a few times with a knife to let steam escape.',
        'Bake at 190°C for 30 minutes until the pastry is golden and crisp.',
        'Let cool for 10 minutes, then unmould with a quick, confident flip onto a serving plate.',
        'Serve warm with a dollop of thick crème fraîche or a scoop of vanilla ice cream.'
      ],
      tags: ['French', 'France', 'Sologne', 'Dessert', 'Tart', 'Apples', 'Tradition']
    },
    fr: {
      title: 'Tarte Tatin Authentique aux Pommes Caramélisées',
      description: 'La célèbre tarte renversée des sœurs Tatin : quartiers de pommes fondants et confits dans un caramel au beurre demi-sel, recouverts d’une pâte croustillante.',
      instructions: [
        'Épluchez 6 grosses pommes (variété Reine des Reinettes ou Golden), coupez-les en gros quartiers et évidez-les.',
        'Dans un moule à Tatin ou une poêle allant au four, faites fondre 100 g de sucre avec 60 g de beurre demi-sel à feu moyen pour réaliser un beau caramel ambré.',
        'Disposez les quartiers de pommes bien serrés verticalement dans le caramel chaud.',
        'Laissez cuire les pommes à feu doux pendant 15 minutes pour qu’elles s’imprègnent du caramel et commencent à confire.',
        'Retirez du feu et recouvrez les pommes avec le disque de pâte feuilletée ou brisée en rentrant les bords vers l’intérieur du moule.',
        'Piquez la pâte de quelques coups de couteau pour laisser la vapeur s’échapper.',
        'Enfournez à 190°C pendant 30 minutes jusqu’à ce que la pâte soit bien dorée et croustillante.',
        'Laissez tiédir 10 minutes, puis démoulez d’un geste vif et assuré en retournant la tarte sur un plat de service.',
        'Servez tiède avec une quenelle de crème fraîche épaisse d’Isigny ou une boule de glace vanille.'
      ],
      tags: ['Français', 'France', 'Sologne', 'Dessert', 'Tarte', 'Pommes', 'Tradition']
    },
    de: {
      title: 'Original Tarte Tatin mit karamellisierten Äpfeln',
      description: 'Die berühmte umgestürzte Tarte der Schwestern Tatin: zergehende karamellisierte Apfelspalten in gesalzenem Butterkaramell, bedeckt mit knusprigem Blätterteig.',
      instructions: [
        '6 große Äpfel (Reinette oder Golden) schälen, in große Spalten schneiden und entkernen.',
        'In einer Tatin-Form oder einer ofenfesten Pfanne 100 g Zucker mit 60 g gesalzener Butter bei mittlerer Hitze zu einem schönen bernsteinfarbenen Karamell schmelzen.',
        'Die Apfelspalten dicht stehend im heißen Karamell anordnen.',
        'Die Äpfel 15 Minuten bei schwacher Hitze garen, damit sie sich mit dem Karamell vollsaugen und leicht kandieren.',
        'Vom Herd nehmen und die Äpfel mit dem Blätter- oder Mürbeteigkreis bedecken, die Ränder dabei nach innen einschlagen.',
        'Den Teig mehrmals mit einem Messer einstechen, damit Dampf entweichen kann.',
        'Bei 190°C 30 Minuten backen, bis der Teig goldbraun und knusprig ist.',
        '10 Minuten abkühlen lassen, dann mit einer schnellen, sicheren Bewegung auf eine Servierplatte stürzen.',
        'Warm servieren mit einem Klößchen dicker Crème fraîche oder einer Kugel Vanilleeis.'
      ],
      tags: ['Französisch', 'Frankreich', 'Sologne', 'Dessert', 'Tarte', 'Äpfel', 'Tradition']
    },
    es: {
      title: 'Tarta Tatin Auténtica de Manzanas Caramelizadas',
      description: 'La famosa tarta invertida de las hermanas Tatin: gajos de manzana fundentes y confitados en un caramelo de mantequilla salada, cubiertos con un hojaldre crujiente.',
      instructions: [
        'Pele 6 manzanas grandes (variedad Reineta o Golden), córtelas en gajos grandes y quíteles el corazón.',
        'En un molde Tatin o una sartén apta para horno, derrita 100 g de azúcar con 60 g de mantequilla salada a fuego medio para lograr un bonito caramelo ambarino.',
        'Coloque los gajos de manzana bien apretados, en posición vertical, en el caramelo caliente.',
        'Cueza las manzanas a fuego lento durante 15 minutos para que se impregnen del caramelo y empiecen a confitarse.',
        'Retire del fuego y cubra las manzanas con el disco de hojaldre o masa quebrada, remetiendo los bordes hacia el interior del molde.',
        'Pinche la masa con un cuchillo varias veces para dejar escapar el vapor.',
        'Hornee a 190°C durante 30 minutos hasta que la masa esté bien dorada y crujiente.',
        'Deje templar 10 minutos y desmolde con un gesto rápido y firme, volcando la tarta sobre un plato de servir.',
        'Sirva tibia con una cucharada de nata espesa o una bola de helado de vainilla.'
      ],
      tags: ['Francés', 'Francia', 'Sologne', 'Postre', 'Tarta', 'Manzanas', 'Tradición']
    },
    pt: {
      title: 'Tarte Tatin Autêntica de Maçãs Caramelizadas',
      description: 'A famosa tarte invertida das irmãs Tatin: gomos de maçã derretidos e cristalizados num caramelo de manteiga salgada, cobertos com uma massa folhada estaladiça.',
      instructions: [
        'Descasque 6 maçãs grandes (variedade Reineta ou Golden), corte em gomos grandes e retire o miolo.',
        'Numa forma Tatin ou frigideira própria para forno, derreta 100 g de açúcar com 60 g de manteiga salgada em lume médio para obter um belo caramelo âmbar.',
        'Disponha os gomos de maçã bem apertados, na vertical, no caramelo quente.',
        'Deixe cozinhar as maçãs em lume brando durante 15 minutos para que absorvam o caramelo e comecem a cristalizar.',
        'Retire do lume e cubra as maçãs com o disco de massa folhada ou quebrada, dobrando as pontas para dentro da forma.',
        'Pique a massa algumas vezes com uma faca para deixar sair o vapor.',
        'Leve ao forno a 190°C durante 30 minutos até a massa ficar dourada e estaladiça.',
        'Deixe amornar 10 minutos e desenforme com um gesto rápido e firme, virando a tarte sobre um prato de servir.',
        'Sirva morna com uma colherada de natas espessas ou uma bola de gelado de baunilha.'
      ],
      tags: ['Francês', 'França', 'Sologne', 'Sobremesa', 'Tarte', 'Maçãs', 'Tradição']
    }
  },
  'rec-fr-poulet-basquaise-traditionnel': {
    en: {
      title: 'Traditional Chicken Basquaise Simmered in Piperade and White Wine',
      description: 'Golden farmhouse chicken thighs simmered in a flavorful sauce of fresh tomatoes, red and green peppers, onions, and Espelette pepper.',
      instructions: [
        'In a Dutch oven, brown the chicken thighs in olive oil for 10 minutes. Set aside.',
        'In the same pot, soften the sliced peppers and onions for 8 minutes.',
        'Add the crushed tomatoes, crushed garlic, thyme, bay leaf, and Espelette pepper.',
        'Deglaze with the dry white wine.',
        'Return the chicken pieces to the sauce, cover and simmer for 35 minutes.',
        'Serve with white Camargue rice.'
      ],
      tags: ['French', 'France', 'Basque Country', 'Main', 'Chicken', 'Classic']
    },
    fr: {
      title: 'Poulet Basquaise Traditionnel Mijoté à la Pipérade et Vin Blanc',
      description: 'Cuisseaux de poulet fermier dorés dans l’huile d’olive, mijotés dans une sauce savoureuse de tomates fraîches, poivrons rouges et verts, oignons et piment d’Espelette.',
      instructions: [
        'Dans une cocotte, faites dorer les cuisses de poulet dans l’huile d’olive pendant 10 minutes. Réservez.',
        'Dans la même cocotte, faites fondre les poivrons émincés et les oignons pendant 8 minutes.',
        'Ajoutez les tomates concassées, l’ail écrasé, le thym, le laurier et le piment d’Espelette.',
        'Déglacez avec le vin blanc sec.',
        'Remettez les morceaux de poulet dans la sauce, couvrez et laissez mijoter 35 minutes.',
        'Servez avec du riz blanc de Camargue.'
      ],
      tags: ['Français', 'France', 'Pays Basque', 'Plat', 'Poulet', 'Classique']
    },
    de: {
      title: 'Traditionelles Poulet Basquaise mit Piperade und Weißwein geschmort',
      description: 'Goldbraun gebratene Hähnchenschenkel vom Bauernhof, geschmort in einer aromatischen Soße aus frischen Tomaten, roten und grünen Paprika, Zwiebeln und Espelette-Pfeffer.',
      instructions: [
        'In einem Schmortopf die Hähnchenschenkel 10 Minuten in Olivenöl braten. Beiseitestellen.',
        'Im selben Topf die geschnittenen Paprika und Zwiebeln 8 Minuten andünsten.',
        'Gehackte Tomaten, zerdrückten Knoblauch, Thymian, Lorbeer und Espelette-Pfeffer zugeben.',
        'Mit trockenem Weißwein ablöschen.',
        'Die Hähnchenstücke wieder in die Soße geben, abdecken und 35 Minuten schmoren lassen.',
        'Mit weißem Camargue-Reis servieren.'
      ],
      tags: ['Französisch', 'Frankreich', 'Baskenland', 'Hauptgericht', 'Hähnchen', 'Klassiker']
    },
    es: {
      title: 'Pollo Vasco Tradicional Guisado con Piperada y Vino Blanco',
      description: 'Muslos de pollo de granja dorados en aceite de oliva, guisados en una sabrosa salsa de tomates frescos, pimientos rojos y verdes, cebollas y pimiento de Espelette.',
      instructions: [
        'En una cazuela, dore los muslos de pollo en aceite de oliva durante 10 minutos. Reserve.',
        'En la misma cazuela, sofría los pimientos en tiras y las cebollas durante 8 minutos.',
        'Añada los tomates triturados, el ajo machacado, el tomillo, el laurel y el pimiento de Espelette.',
        'Desglase con el vino blanco seco.',
        'Vuelva a poner los trozos de pollo en la salsa, tape y cueza a fuego lento 35 minutos.',
        'Sirva con arroz blanco de Camarga.'
      ],
      tags: ['Francés', 'Francia', 'País Vasco', 'Plato principal', 'Pollo', 'Clásico']
    },
    pt: {
      title: 'Frango Basquaise Tradicional Estufado com Piperade e Vinho Branco',
      description: 'Coxas de frango caseiro douradas em azeite, estufadas num molho saboroso de tomates frescos, pimentos vermelhos e verdes, cebolas e pimenta de Espelette.',
      instructions: [
        'Numa panela, doure as coxas de frango em azeite durante 10 minutos. Reserve.',
        'Na mesma panela, refogue os pimentos às tiras e as cebolas durante 8 minutos.',
        'Junte os tomates triturados, o alho esmagado, o tomilho, o louro e a pimenta de Espelette.',
        'Deglaceie com o vinho branco seco.',
        'Volte a colocar os pedaços de frango no molho, tape e deixe cozinhar em lume brando 35 minutos.',
        'Sirva com arroz branco da Camarga.'
      ],
      tags: ['Francês', 'França', 'País Basco', 'Prato principal', 'Frango', 'Clássico']
    }
  },
  'rec-fr-soupe-cresson-veloute': {
    en: {
      title: 'Traditional Watercress and Potato Velouté',
      description: 'Silky emerald-green soup made from fresh spring watercress stewed in butter and blended with melting potatoes and cream.',
      instructions: [
        'Wash the watercress thoroughly and remove the thick stems.',
        'Melt the butter in a large pot and sweat the shallot and watercress leaves for 3 minutes.',
        'Add the diced potatoes and the chicken broth.',
        'Cook for 20 minutes over medium heat.',
        'Blend until smooth, stir in the crème fraîche, and season with salt and nutmeg.',
        'Serve with golden butter croutons.'
      ],
      tags: ['French', 'France', 'Île-de-France', 'Starter', 'Soup', 'Tradition']
    },
    fr: {
      title: 'Velouté Traditionnel de Cresson et Pommes de Terre',
      description: 'Soupe vert émeraude poivrée et soyeuse de cresson frais de fontaine étuvé au beurre et lié aux pommes de terre fondantes et crème.',
      instructions: [
        'Lavez soigneusement le cresson et éliminez les grosses tiges.',
        'Faites fondre le beurre dans un faitout et faites suer l’échalote et les feuilles de cresson pendant 3 minutes.',
        'Ajoutez les pommes de terre coupées en morceaux et le bouillon de volaille.',
        'Laissez cuire 20 minutes à feu moyen.',
        'Mixez finement, incorporez la crème fraîche, assaisonnez de sel et muscade.',
        'Servez avec des croûtons dorés au beurre.'
      ],
      tags: ['Français', 'France', 'Île-de-France', 'Entrée', 'Soupe', 'Tradition']
    },
    de: {
      title: 'Traditionelle Brunnenkresse-Kartoffel-Suppe',
      description: 'Seidig-smaragdgrüne Suppe aus frischer Brunnenkresse, in Butter gedünstet und mit zerfallenden Kartoffeln und Sahne verfeinert.',
      instructions: [
        'Die Brunnenkresse gründlich waschen und die dicken Stiele entfernen.',
        'Die Butter in einem großen Topf schmelzen und die Schalotte sowie die Kresseblätter 3 Minuten andünsten.',
        'Die gewürfelten Kartoffeln und die Hühnerbrühe zugeben.',
        '20 Minuten bei mittlerer Hitze kochen.',
        'Fein pürieren, die Crème fraîche einrühren und mit Salz und Muskat abschmecken.',
        'Mit goldenen Butter-Croûtons servieren.'
      ],
      tags: ['Französisch', 'Frankreich', 'Île-de-France', 'Vorspeise', 'Suppe', 'Tradition']
    },
    es: {
      title: 'Velouté Tradicional de Berros y Patatas',
      description: 'Sopa de un verde esmeralda sedoso, elaborada con berros frescos rehogados en mantequilla y ligada con patatas fundentes y nata.',
      instructions: [
        'Lave bien los berros y elimine los tallos gruesos.',
        'Derrita la mantequilla en una olla grande y sofría la chalota y las hojas de berro durante 3 minutos.',
        'Añada las patatas troceadas y el caldo de pollo.',
        'Cueza 20 minutos a fuego medio.',
        'Triture hasta obtener una textura fina, incorpore la nata y sazone con sal y nuez moscada.',
        'Sirva con picatostes dorados en mantequilla.'
      ],
      tags: ['Francés', 'Francia', 'Île-de-France', 'Entrante', 'Sopa', 'Tradición']
    },
    pt: {
      title: 'Velouté Tradicional de Agrião e Batata',
      description: 'Sopa verde-esmeralda sedosa feita com agrião fresco refogado em manteiga e ligada com batatas macias e natas.',
      instructions: [
        'Lave bem o agrião e retire os talos grossos.',
        'Derreta a manteiga numa panela grande e refogue a chalota e as folhas de agrião durante 3 minutos.',
        'Junte as batatas cortadas em pedaços e o caldo de galinha.',
        'Deixe cozinhar 20 minutos em lume médio.',
        'Triture bem, incorpore as natas e tempere com sal e noz-moscada.',
        'Sirva com croutons dourados na manteiga.'
      ],
      tags: ['Francês', 'França', 'Île-de-France', 'Entrada', 'Sopa', 'Tradição']
    }
  },
  'rec-fr-mousse-chocolat': {
    en: {
      title: 'Classic Homemade Dark Chocolate Mousse',
      description: 'The real French chocolate mousse: airy, intensely flavored with 70% cocoa, made without gelatin using very firmly whipped egg whites and a touch of fleur de sel.',
      instructions: [
        'Break the dark chocolate into pieces and melt it in a double boiler (or gently in the microwave) with the unsalted butter, smoothing with a spatula.',
        'Separate the egg whites from the yolks.',
        'Stir the yolks in one by one into the warm melted chocolate, mixing vigorously.',
        'In another clean bowl, whip the 6 egg whites into a firm foam with a pinch of salt.',
        'Whisk in a third of the whites vigorously to loosen the chocolate.',
        'Gently fold in the rest of the whites with a spatula, lifting the mixture from bottom to top so as not to knock the air out.',
        'Divide among small glasses or a large serving bowl.',
        'Chill in the refrigerator for at least 4 hours (ideally overnight) before serving.'
      ],
      tags: ['French', 'France', 'Dessert', 'Chocolate', 'Classic', 'Pastry']
    },
    fr: {
      title: 'Mousse au Chocolat Noir Traditionnelle Maison',
      description: 'La véritable mousse au chocolat à la française : aérienne, intense en cacao 70%, réalisée sans gélatine avec des blancs montés en neige très ferme et une pointe de fleur de sel.',
      instructions: [
        'Cassez le chocolat noir en morceaux et faites-le fondre au bain-marie (ou micro-ondes doux) avec le beurre doux en lissant à la spatule.',
        'Séparez les blancs des jaunes d’œufs.',
        'Incorporez les jaunes un à un dans le chocolat fondu tiédi en mélangeant vigoureusement.',
        'Dans un autre saladier propre, montez les 6 blancs d’œufs en neige ferme avec une pincée de sel.',
        'Incorporez un tiers des blancs énergiquement au fouet pour assouplir le chocolat.',
        'Incorporez délicatement le reste des blancs à la maryse en soulevant la masse de bas en haut pour ne pas les casser.',
        'Répartissez dans des verrines ou un grand compotier.',
        'Laissez reposer au réfrigérateur pendant au moins 4 heures (idéalement toute la nuit) avant de déguster.'
      ],
      tags: ['Français', 'France', 'Dessert', 'Chocolat', 'Classique', 'Pâtisserie']
    },
    de: {
      title: 'Klassische Hausgemachte Zartbitter-Schokoladenmousse',
      description: 'Die echte französische Schokoladenmousse: luftig, intensiv nach 70%iger Kakaoschokolade schmeckend, ohne Gelatine zubereitet mit sehr fest geschlagenem Eiweiß und einer Prise Fleur de Sel.',
      instructions: [
        'Die dunkle Schokolade in Stücke brechen und über einem Wasserbad (oder sanft in der Mikrowelle) mit der ungesalzenen Butter schmelzen, mit einem Spatel glatt rühren.',
        'Die Eiweiß vom Eigelb trennen.',
        'Das Eigelb nach und nach unter die warme geschmolzene Schokolade rühren, kraftvoll mischen.',
        'In einer anderen sauberen Schüssel die 6 Eiweiß mit einer Prise Salz steif schlagen.',
        'Ein Drittel des Eiweißes kraftvoll unterrühren, um die Schokolade zu lockern.',
        'Den Rest des Eiweißes vorsichtig mit einem Teigschaber unterheben, dabei von unten nach oben heben, um die Luft nicht herauszudrücken.',
        'In kleine Gläser oder eine große Schüssel füllen.',
        'Mindestens 4 Stunden (idealerweise über Nacht) im Kühlschrank ruhen lassen, bevor serviert wird.'
      ],
      tags: ['Französisch', 'Frankreich', 'Dessert', 'Schokolade', 'Klassiker', 'Konditorei']
    },
    es: {
      title: 'Mousse de Chocolate Negro Tradicional Casera',
      description: 'La verdadera mousse de chocolate a la francesa: aérea, de sabor intenso a cacao 70%, elaborada sin gelatina con claras montadas muy firmes y un toque de flor de sal.',
      instructions: [
        'Rompa el chocolate negro en trozos y derrítalo al baño maría (o suavemente en el microondas) con la mantequilla sin sal, alisando con una espátula.',
        'Separe las claras de las yemas.',
        'Incorpore las yemas una a una al chocolate fundido tibio, mezclando enérgicamente.',
        'En otro bol limpio, monte las 6 claras a punto de nieve firme con una pizca de sal.',
        'Incorpore un tercio de las claras enérgicamente para aligerar el chocolate.',
        'Incorpore con delicadeza el resto de las claras con una espátula, levantando la masa de abajo hacia arriba para no romperlas.',
        'Reparta en vasitos o en un cuenco grande.',
        'Deje reposar en el refrigerador al menos 4 horas (idealmente toda la noche) antes de degustar.'
      ],
      tags: ['Francés', 'Francia', 'Postre', 'Chocolate', 'Clásico', 'Pastelería']
    },
    pt: {
      title: 'Mousse de Chocolate Negro Tradicional Caseira',
      description: 'A verdadeira mousse de chocolate à francesa: leve, com sabor intenso a cacau 70%, feita sem gelatina com claras batidas bem firmes e um toque de flor de sal.',
      instructions: [
        'Parta o chocolate negro em pedaços e derreta em banho-maria (ou suavemente no micro-ondas) com a manteiga sem sal, alisando com uma espátula.',
        'Separe as claras das gemas.',
        'Incorpore as gemas uma a uma no chocolate derretido morno, misturando vigorosamente.',
        'Noutra tigela limpa, bata as 6 claras em castelo firme com uma pitada de sal.',
        'Incorpore um terço das claras energicamente para amaciar o chocolate.',
        'Incorpore delicadamente o resto das claras com uma espátula, levantando a massa de baixo para cima para não as quebrar.',
        'Distribua por copinhos ou uma taça grande.',
        'Deixe repousar no frigorífico pelo menos 4 horas (idealmente de um dia para o outro) antes de servir.'
      ],
      tags: ['Francês', 'França', 'Sobremesa', 'Chocolate', 'Clássico', 'Pastelaria']
    }
  },
  'rec-fr-moules-frites-sauce-mariniere': {
    en: {
      title: 'Traditional Northern French Moules-Frites in Mariniere Sauce',
      description: 'The popular dish of the brasseries of northern France: a large pot of bouchot mussels opened in dry white wine, shallots and parsley, served with fries.',
      instructions: [
        'Clean and debeard the mussels under fresh water.',
        'In a large pot, soften the sliced shallots in the butter.',
        'Pour in the dry white wine and bring to the boil.',
        'Add the mussels to the pot, cover and cook for 5 to 7 minutes over very high heat, shaking the pot twice.',
        'As soon as all the mussels have opened, add the chopped flat-leaf parsley and season with pepper.',
        'Serve piping hot in the pots with a paper cone of crispy fresh fries.'
      ],
      tags: ['French', 'France', 'Nord', 'Brasserie', 'Main', 'Seafood', 'Classic']
    },
    fr: {
      title: 'Moules-Frites Traditionnelles du Nord à la Sauce Marinière',
      description: 'Le plat populaire des brasseries du Nord : grande cocotte de moules de bouchot ouvertes au vin blanc sec, échalotes et persil, servies avec frites.',
      instructions: [
        'Nettoyez et ébarbez les moules sous l’eau fraîche.',
        'Dans un grand faitout, faites fondre les échalotes émincées dans le beurre.',
        'Versez le vin blanc sec et portez à ébullition.',
        'Jetez les moules dans le faitout, couvrez et faites cuire 5 à 7 minutes à feu très vif en secouant la cocotte 2 fois.',
        'Dès que toutes les moules sont ouvertes, ajoutez le persil plat ciselé et poivrez.',
        'Servez brûlant dans les cocottes avec un cornet de frites fraîches bien croustillantes.'
      ],
      tags: ['Français', 'France', 'Nord', 'Brasserie', 'Plat', 'Fruits de mer', 'Classique']
    },
    de: {
      title: 'Traditionelle Miesmuscheln mit Pommes aus Nordfrankreich in Weißweinsauce',
      description: 'Das beliebte Gericht der Brasserien Nordfrankreichs: ein großer Topf Bouchot-Miesmuscheln, geöffnet in trockenem Weißwein, mit Schalotten und Petersilie, serviert mit Pommes frites.',
      instructions: [
        'Die Miesmuscheln unter frischem Wasser putzen und die Bärte entfernen.',
        'In einem großen Topf die geschnittenen Schalotten in der Butter andünsten.',
        'Den trockenen Weißwein angießen und zum Kochen bringen.',
        'Die Muscheln in den Topf geben, abdecken und 5 bis 7 Minuten bei sehr starker Hitze garen, dabei den Topf zweimal schütteln.',
        'Sobald alle Muscheln geöffnet sind, die gehackte glatte Petersilie zugeben und pfeffern.',
        'Kochend heiß in den Töpfen servieren, mit einer Tüte knuspriger frischer Pommes frites.'
      ],
      tags: ['Französisch', 'Frankreich', 'Nord', 'Brasserie', 'Hauptgericht', 'Meeresfrucht', 'Klassiker']
    },
    es: {
      title: 'Mejillones con Patatas Fritas Tradicionales del Norte en Salsa Marinera',
      description: 'El plato popular de las brasseries del norte de Francia: una gran cazuela de mejillones de bouchot abiertos con vino blanco seco, chalotas y perejil, servidos con patatas fritas.',
      instructions: [
        'Limpie y quite las barbas a los mejillones bajo agua fresca.',
        'En una cazuela grande, sofría las chalotas en tiras con la mantequilla.',
        'Vierta el vino blanco seco y lleve a ebullición.',
        'Añada los mejillones a la cazuela, tape y cueza de 5 a 7 minutos a fuego muy fuerte, agitando la cazuela dos veces.',
        'En cuanto todos los mejillones estén abiertos, añada el perejil picado y sazone con pimienta.',
        'Sirva bien caliente en las cazuelas con un cucurucho de patatas fritas bien crujientes.'
      ],
      tags: ['Francés', 'Francia', 'Norte', 'Brasserie', 'Plato principal', 'Mariscos', 'Clásico']
    },
    pt: {
      title: 'Mexilhões com Batatas Fritas Tradicionais do Norte em Molho Marinês',
      description: 'O prato popular das brasseries do norte de França: uma grande panela de mexilhões de bouchot abertos em vinho branco seco, chalotas e salsa, servidos com batatas fritas.',
      instructions: [
        'Limpe e retire as barbas dos mexilhões em água fresca.',
        'Numa panela grande, refogue as chalotas às tiras na manteiga.',
        'Deite o vinho branco seco e leve à fervura.',
        'Junte os mexilhões à panela, tape e cozinhe de 5 a 7 minutos em lume muito forte, agitando a panela duas vezes.',
        'Assim que todos os mexilhões estiverem abertos, junte a salsa picada e tempere com pimenta.',
        'Sirva bem quente nas panelas com um cone de batatas fritas bem estaladiças.'
      ],
      tags: ['Francês', 'França', 'Norte', 'Brasserie', 'Prato principal', 'Marisco', 'Clássico']
    }
  }
};
