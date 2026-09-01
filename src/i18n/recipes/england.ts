import { SupportedLanguage } from '../translations';
import { LocalizedRecipeContent } from '../recipeTranslations';

export const ENGLAND_RECIPE_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedRecipeContent>> = {
  'rec-shepherds-pie': {
    en: {
      title: 'Traditional British Cottage / Shepherd’s Pie',
      description: 'Hearty minced beef simmered in rich gravy with sweet carrots, green peas, and Worcestershire sauce, topped with golden piped mashed potatoes and sharp cheddar.',
      instructions: [
        'Peel and boil potatoes until tender (20 mins). Mash with butter, milk, shredded cheddar, salt, and black pepper until creamy.',
        'In a deep skillet, brown ground beef over medium-high heat with diced onions and garlic (6 mins).',
        'Add diced carrots and green peas; stir in tomato paste, flour, Worcestershire sauce, beef broth, and fresh thyme. Simmer for 15 minutes until thick.',
        'Transfer savory meat filling to a baking dish. Spread or pipe the cheddar mashed potatoes evenly across the top, scoring with a fork for crisp edges.',
        'Bake at 200°C (400°F) for 25 minutes until the potato peaks are golden brown and bubbling.'
      ],
      tags: ['British', 'England', 'Pie', 'Comfort Food', 'Beef', 'Baking']
    },
    fr: {
      title: 'Cottage Pie / Hachis Parmentier Britannique',
      description: 'Plat réconfortant traditionnel de viande hachée mijotée aux carottes, petits pois et sauce Worcestershire, surmontée d’une purée dorée au cheddar.',
      instructions: [
        'Épluchez et faites cuire les pommes de terre à l’eau (20 min). Écrasez-les en purée avec le beurre, le lait, le cheddar râpé, le sel et le poivre.',
        'Dans une poêle, faites dorer le bœuf haché à feu moyen avec les oignons et l’ail hachés (6 min).',
        'Ajoutez les carottes en petits dés et les petits pois ; incorporez le concentré de tomate, la farine, la sauce Worcestershire, le bouillon de bœuf et le thym. Laissez épaissir 15 minutes.',
        'Versez la garniture de viande dans un plat à gratin. Étalez la purée au cheddar par-dessus et striez à la fourchette pour faire dorer.',
        'Enfournez à 200°C pendant 25 minutes jusqu’à ce que le dessus soit bien gratiné et doré.'
      ],
      tags: ['Britannique', 'Angleterre', 'Parmentier', 'Bœuf', 'Convivial', 'Four']
    },
    de: {
      title: 'Traditioneller Britischer Cottage Pie',
      description: 'Deftiges Rinderhackfleisch in kräftiger Bratensauce mit Karotten, Erbsen und Worcestershire-Sauce, überbacken mit cremigem Cheddar-Kartoffelpüree.',
      instructions: [
        'Kartoffeln weich kochen (20 Min.). Mit Butter, Milch, geriebenem Cheddar, Salz und Pfeffer zu einem cremigen Püree stampfen.',
        'Rinderhackfleisch mit Zwiebeln und Knoblauch in einer Pfanne 6 Minuten anbraten.',
        'Karotten und Erbsen zugeben; Tomatenmark, Mehl, Worcestershire-Sauce, Rinderbrühe und Thymian einrühren. 15 Minuten sämig einköcheln lassen.',
        'Die Fleischmasse in eine Auflaufform füllen und mit dem Kartoffelpüree bedecken. Mit einer Gabel Muster für knusprige Spitzen ziehen.',
        'Bei 200°C 25 Minuten goldbraun überbacken.'
      ],
      tags: ['Britisch', 'England', 'Auflauf', 'Rindfleisch', 'Herzhaft']
    },
    es: {
      title: 'Cottage Pie Tradicional Británico',
      description: 'Reconfortante pastel de carne picada estofada con zanahorias, guisantes y salsa Worcestershire, cubierto de puré de patatas dorado con queso cheddar.',
      instructions: [
        'Cueza las patatas durante 20 minutos. Macháquelas con mantequilla, leche, queso cheddar rallado, sal y pimienta hasta obtener un puré suave.',
        'Dore la carne picada con la cebolla y el ajo en una sartén durante 6 minutos.',
        'Añada las zanahorias y los guisantes; agregue el concentrado de tomate, la harina, la salsa Worcestershire, el caldo de ternera y el tomillo. Reduzca 15 minutos.',
        'Pase el relleno a una fuente para horno y cubra con el puré de patatas, marcando surcos con el tenedor.',
        'Hornee a 200°C durante 25 minutos hasta que la superficie esté dorada y crujiente.'
      ],
      tags: ['Británico', 'Inglaterra', 'Pastel de Carne', 'Ternera', 'Horno']
    },
    pt: {
      title: 'Cottage Pie Tradicional Britânico',
      description: 'Carne picada estufada com cenouras, ervilhas doces e molho inglês, coberta com puré de batata dourado no forno com queijo cheddar.',
      instructions: [
        'Coza as batatas durante 20 minutos. Reduza a puré com a manteiga, leite, queijo cheddar ralado, sal e pimenta.',
        'Doure a carne picada numa frigideira com a cebola e o alho durante 6 minutos.',
        'Junte as cenouras e as ervilhas; adicione o concentrado de tomate, a farinha, o molho inglês, o caldo de carne e o tomilho. Deixe apurar 15 minutos.',
        'Transfira a carne para uma assadeira e cubra com o puré de batata, fazendo ranhuras com um garfo.',
        'Leve ao forno a 200°C durante 25 minutos até ficar bem dourado e estaladiço.'
      ],
      tags: ['Britânico', 'Inglaterra', 'Empadão', 'Carne', 'Forno']
    }
  },

  'rec-fish-and-chips': {
    en: {
      title: 'Crispy British Beer-Battered Fish and Chips',
      description: 'Golden, crispy beer-battered fresh cod fillets served with hand-cut roasted potato chips, sweet mushy peas, and fresh lemon wedges.',
      instructions: [
        'Cut potatoes into thick chunky chips, rinse in cold water, toss with 2 tbsp oil, and roast in a hot oven at 220°C (425°F) for 30 minutes until crisp.',
        'Whisk flour, baking powder, a pinch of salt, and ice-cold sparkling water or beer until a smooth batter forms.',
        'Heat frying oil to 180°C (350°F). Pat cod fillets dry, dust lightly in flour, and dip into batter.',
        'Fry battered cod fillets for 6-8 minutes, turning once, until crisp and golden brown. Drain on paper towels.',
        'Simmer frozen green peas with a knob of butter and mash lightly with a fork. Serve hot with lemon wedges and tartar sauce.'
      ],
      tags: ['British', 'Fish', 'Classic', 'Chips', 'Fried']
    },
    fr: {
      title: 'Fish and Chips Britannique Croustillant',
      description: 'Dos de cabillaud pané à la pâte croustillante dorée, servi avec de véritables frites épaisses, purée de petits pois à la menthe et quartiers de citron.',
      instructions: [
        'Taillez les pommes de terre en frites épaisses, rincez-les, mélangez avec de l’huile et rôtissez au four à 220°C pendant 30 minutes jusqu’à ce qu’elles soient croustillantes.',
        'Préparez la pâte à beignet en fouettant la farine, la levure chimique, le sel et de l’eau gazeuse très fraîche.',
        'Faites chauffer l’huile de friture à 180°C. Séchez les dos de cabillaud, farinez-les légèrement et trempez-les dans la pâte.',
        'Faites frire les morceaux de poisson 6 à 8 minutes jusqu’à belle coloration dorée. Égouttez sur du papier absorbant.',
        'Faites chauffer les petits pois avec une noisette de beurre et écrasez-les grossièrement. Servez chaud avec des quartiers de citron.'
      ],
      tags: ['Britannique', 'Poisson', 'Friture', 'Classique', 'Gourmand']
    },
    de: {
      title: 'Knuspriges Britisches Fish and Chips',
      description: 'Goldbraun gebackene Kabeljaufilets im Bierteigmantel, serviert mit dicken Ofen-Pommes, Erbsenpüree und Zitronenspalten.',
      instructions: [
        'Kartoffeln in dicke Pommes schneiden, mit 2 EL Öl marinieren und bei 220°C 30 Minuten knusprig backen.',
        'Mehl, Backpulver, Salz und eiskaltes kohlensäurehaltiges Mineralwasser zu einem glatten Ausbackteig verrühren.',
        'Frittieröl auf 180°C erhitzen. Kabeljaufilets trocken tupfen, in Mehl wenden und durch den Teig ziehen.',
        'Fisch 6-8 Minuten goldbraun und knusprig ausbacken. Auf Küchenpapier abtropfen lassen.',
        'Erbsen mit Butter kurz erwärmen und mit einer Gabel grob zerdrücken. Heiß mit Zitronenspalten servieren.'
      ],
      tags: ['Britisch', 'Fisch', 'Frittiert', 'Klassiker']
    },
    es: {
      title: 'Fish and Chips Británico Crujiente',
      description: 'Lomos de bacalao fresco fritos en crujiente masa dorada, servidos con patatas fritas gruesas, puré de guisantes tiernos y limón.',
      instructions: [
        'Corte las patatas en bastones gruesos, sazone con aceite y ase a 220°C durante 30 minutos.',
        'Prepare el rebozado mezclando harina, levadura, sal y agua con gas muy fría hasta formar una crema homogénea.',
        'Caliente el aceite para freír a 180°C. Seque el pescado, páselo por harina y luego por el rebozado.',
        'Fría el pescado 6-8 minutos hasta que esté dorado y crujiente. Escurra sobre papel de cocina.',
        'Caliente los guisantes con mantequilla y machaque ligeramente. Sirva caliente con gajos de limón.'
      ],
      tags: ['Británico', 'Pescado', 'Frito', 'Clásico']
    },
    pt: {
      title: 'Fish and Chips Britânico Estaladiço',
      description: 'Lombos de bacalhau fresco fritos em polme dourado e crocante, servidos com batatas rústicas grossas, puré de ervilhas e limão.',
      instructions: [
        'Corte as batatas em palitos grossos, envolva em azeite e asse no forno a 220°C durante 30 minutos.',
        'Faça o polme misturando a farinha, o fermento, sal e água com gás bem fresca.',
        'Aqueça o óleo a 180°C. Seque o peixe, passe por farinha e mergulhe no polme.',
        'Frite o peixe durante 6 a 8 minutos até dourar e ficar estaladiço. Escorra em papel absorvente.',
        'Aqueça as ervilhas com manteiga e esmague grosseiramente com um garfo. Sirva de imediato com limão.'
      ],
      tags: ['Britânico', 'Peixe', 'Frito', 'Clássico']
    }
  },

  'rec-full-english-breakfast': {
    en: {
      title: 'Traditional Full English Breakfast',
      description: 'The legendary British morning fry-up featuring Cumberland pork sausages, crispy bacon, sunny-side fried eggs, baked beans, grilled tomatoes, and buttered toast.',
      instructions: [
        'In a large cast-iron skillet, cook sausages over medium heat for 10-12 minutes until browned and cooked through. Add bacon strips for the last 5 minutes until crispy.',
        'Slice vine tomatoes in half and sauté cut-side down in the hot pan juices alongside button mushrooms.',
        'Warm baked beans in a small saucepan over medium heat.',
        'Push meat to one side and fry fresh eggs sunny-side up in butter until whites are set and yolks remain runny.',
        'Toast sliced white bread and spread generously with butter. Serve everything together piping hot on a warm platter with brown sauce or tea.'
      ],
      tags: ['British', 'Breakfast', 'Brunch', 'Eggs', 'Bacon', 'Quick']
    },
    fr: {
      title: 'Full English Breakfast Traditionnel',
      description: 'Le grand petit-déjeuner britannique complet : saucisses de porc grillées, bacon croustillant, œufs sur le plat, baked beans, tomates et toasts beurrés.',
      instructions: [
        'Dans une grande poêle, faites cuire les saucisses à feu moyen pendant 10 à 12 minutes. Ajoutez les tranches de bacon les 5 dernières minutes pour les dorer.',
        'Coupez les tomates en deux et faites-les griller côté chair dans la poêle avec les champignons entiers.',
        'Faites réchauffer les baked beans à la sauce tomate dans une petite casserole.',
        'Faites cuire les œufs au plat dans une noisette de beurre en gardant le jaune bien coulant.',
        'Faites griller le pain de mie et beurrez-le généreusement. Servez le tout bien chaud sur une grande assiette.'
      ],
      tags: ['Britannique', 'Petit-Déjeuner', 'Brunch', 'Œufs', 'Bacon', 'Gourmand']
    },
    de: {
      title: 'Traditionelles Englisches Frühstück (Full English)',
      description: 'Das legendäre britische Frühstück mit gebratenen Würstchen, knusprigem Speck, Spiegeleiern, Baked Beans, gegrillten Tomaten und Toast.',
      instructions: [
        'In einer großen Pfanne Würstchen 10-12 Minuten braten. Speckstreifen für die letzten 5 Minuten knusprig mitbraten.',
        'Halbierte Tomaten und Champignons im Bratfett anbraten.',
        'Baked Beans in einem kleinen Topf sanft erwärmen.',
        'Spiegeleier in etwas Butter braten, sodass das Eigelb noch flüssig bleibt.',
        'Toastbrot rösten und mit Butter bestreichen. Alles heiß zusammen servieren.'
      ],
      tags: ['Britisch', 'Frühstück', 'Brunch', 'Eier', 'Speck']
    },
    es: {
      title: 'Desayuno Inglés Completo (Full English Breakfast)',
      description: 'El clásico desayuno británico con salchichas de cerdo, bacon crujiente, huevos fritos con yema tierna, alubias con tomate, champiñones y tostadas.',
      instructions: [
        'Cocine las salchichas en una sartén durante 10-12 minutos. Añada el bacon los últimos 5 minutos hasta que quede crujiente.',
        'Dore los medios tomates y los champiñones en los jugos de la sartén.',
        'Caliente las alubias con tomate en un cazo a fuego suave.',
        'Fría los huevos con mantequilla manteniendo la yema líquida.',
        'Tueste el pan de molde y úntelo con mantequilla. Sirva todo recién hecho en un plato grande.'
      ],
      tags: ['Británico', 'Desayuno', 'Brunch', 'Huevos', 'Bacon']
    },
    pt: {
      title: 'Pequeno-Almoço Inglês Completo (Full English)',
      description: 'O famoso pequeno-almoço britânico com salsichas de porco, bacon estaladiço, ovos estrelados, feijão com molho de tomate e torradas com manteiga.',
      instructions: [
        'Frite as salsichas numa frigideira durante 10 a 12 minutos. Junte as fatias de bacon nos últimos 5 minutos até dourarem.',
        'Grelhe as metades de tomate e os cogumelos na mesma frigideira.',
        'Aqueça o feijão com molho de tomate num tacho pequeno.',
        'Estrele os ovos em manteiga mantendo a gema cremosa.',
        'Torre o pão de forma e barre generosamente com manteiga. Sirva tudo bem quente numa travessa.'
      ],
      tags: ['Britânico', 'Pequeno-Almoço', 'Brunch', 'Ovos', 'Bacon']
    }
  },

  'rec-bangers-and-mash': {
    en: {
      title: 'Bangers and Mash with Rich Onion Gravy',
      description: 'Juicy browned British pork sausages served on a mountain of buttery mashed potatoes and smothered in sweet caramelized onion gravy.',
      instructions: [
        'Peel and boil potatoes in salted water until soft (20 mins). Mash with warm milk, butter, salt, and black pepper.',
        'In a heavy skillet, brown pork sausages over medium heat for 12 minutes until cooked through. Remove sausages.',
        'In the same skillet fat, add thinly sliced onions and a pinch of sugar; sauté slowly for 15 minutes until caramelized and sweet.',
        'Stir in flour, beef broth, Worcestershire sauce, and fresh thyme. Simmer for 5 minutes until a glossy, thick gravy forms.',
        'Plate hearty mounds of mashed potatoes, rest sausages on top, and pour generous amounts of hot onion gravy over everything.'
      ],
      tags: ['British', 'Comfort Food', 'Sausages', 'Potatoes', 'Quick']
    },
    fr: {
      title: 'Bangers and Mash et Sauce aux Oignons Caramélisés',
      description: 'Saucisses de porc dorées servies sur un lit de purée de pommes de terre fondante au beurre, nappées d’une généreuse sauce aux oignons doux.',
      instructions: [
        'Faites cuire les pommes de terre à l’eau salée (20 min). Écrasez-les en purée avec le lait tiède, le beurre, le sel et le poivre.',
        'Faites dorer les saucisses dans une poêle pendant 12 minutes. Réservez.',
        'Dans la même poêle, faites caraméliser les oignons émincés avec une pincée de sucre pendant 15 minutes à feu doux.',
        'Ajoutez la farine, le bouillon de bœuf, la sauce Worcestershire et le thym. Laissez épaissir 5 minutes pour obtenir une sauce onctueuse.',
        'Dressez la purée dans les assiettes, déposez les saucisses et nappez généreusement de sauce chaude aux oignons.'
      ],
      tags: ['Britannique', 'Saucisses', 'Purée', 'Convivial', 'Rapide']
    },
    de: {
      title: 'Bangers and Mash mit Zwiebel-Bratensauce',
      description: 'Gebratene britische Würstchen auf cremigem Kartoffelpüree, übergossen mit einer samtigen, süßlich karamellisierten Zwiebelsauce.',
      instructions: [
        'Kartoffeln weich kochen (20 Min.) und mit warmer Milch, Butter, Salz und Pfeffer zu Püree stampfen.',
        'Würstchen in einer Pfanne rundherum 12 Minuten braten. Herausnehmen.',
        'Im Bratfett Zwiebeln mit etwas Zucker 15 Minuten goldbraun karamellisieren.',
        'Mehl, Rinderbrühe, Worcestershire-Sauce und Thymian einrühren und 5 Minuten zu einer sämigen Sauce einkochen.',
        'Püree auf Tellern anrichten, Würstchen darauflegen und reichlich Zwiebelsauce darübergeben.'
      ],
      tags: ['Britisch', 'Würstchen', 'Kartoffeln', 'Herzhaft']
    },
    es: {
      title: 'Bangers and Mash con Salsa de Cebolla',
      description: 'Salchichas de cerdo doradas servidas sobre suave puré de patatas y cubiertas con una rica salsa de cebollas caramelizadas.',
      instructions: [
        'Cueza las patatas durante 20 minutos y macháquelas con leche tibia, mantequilla, sal y pimienta.',
        'Dore las salchichas en una sartén durante 12 minutos. Retírelas.',
        'Caramelice las cebollas en la misma sartén durante 15 minutos a fuego suave.',
        'Añada la harina, el caldo de carne, la salsa Worcestershire y el tomillo. Cocine 5 minutos hasta que espese.',
        'Sirva el puré, coloque las salchichas encima y bañe con abundante salsa de cebolla.'
      ],
      tags: ['Británico', 'Salchichas', 'Puré', 'Fácil']
    },
    pt: {
      title: 'Bangers and Mash com Molho de Cebola',
      description: 'Salsichas de porco douradas servidas sobre puré de batata aveludado e regadas com um molho rico de cebolas caramelizadas.',
      instructions: [
        'Coza as batatas e reduza a puré com leite morno, manteiga, sal e pimenta.',
        'Frite as salsichas durante 12 minutos até dourarem. Retire.',
        'Caramelize a cebola na mesma gordura em lume brando durante 15 minutos.',
        'Junte a farinha, o caldo de carne, o molho inglês e o tomilho. Deixe engrossar 5 minutos.',
        'Disponha o puré nos pratos, coloque as salsichas por cima e regue com bastante molho de cebola.'
      ],
      tags: ['Britânico', 'Salsichas', 'Puré', 'Fácil']
    }
  },

  'rec-chicken-tikka-masala': {
    en: {
      title: 'British Chicken Tikka Masala with Basmati Rice',
      description: 'The UK’s national curry dish: marinated grilled chicken pieces bathed in a creamy, spiced tomato sauce with garlic, ginger, and aromatic basmati rice.',
      instructions: [
        'Rinse Basmati rice and cook in water with a pinch of salt until fluffy (12 mins).',
        'Cut chicken breasts into bite-sized chunks; toss with 2 tbsp plain yogurt, minced garlic, ginger, curry powder, paprika, and salt. Marinate for 15 mins.',
        'Sear spiced chicken chunks in 1 tbsp olive oil in a wide skillet until lightly charred (6 mins). Remove to a plate.',
        'In the same pan, sauté diced onions with tomato paste, crushed tomatoes, cumin, and chicken broth. Simmer for 10 minutes.',
        'Stir in heavy cream and return chicken to the sauce. Simmer gently for 8 minutes until chicken is tender. Garnish with fresh cilantro.'
      ],
      tags: ['British', 'Curry', 'Chicken', 'Spicy', 'Rice', 'Comfort Food']
    },
    fr: {
      title: 'Chicken Tikka Masala Britannique et Riz Basmati',
      description: 'Le célèbre curry anglo-indien : morceaux de poulet marinés et dorés dans une sauce onctueuse à la tomate, crème, épices douces et riz parfumé.',
      instructions: [
        'Rincez le riz Basmati et faites-le cuire à l’eau bouillante salée jusqu’à ce qu’il soit tendre et égrainé (12 min).',
        'Coupez le poulet en cubes et faites-le mariner 15 minutes avec le yaourt, l’ail, le gingembre, le curry, le paprika et le sel.',
        'Faites dorer les morceaux de poulet dans une sauteuse avec un peu d’huile jusqu’à ce qu’ils soient bien colorés (6 min). Réservez.',
        'Dans la même poêle, faites revenir les oignons avec le concentré de tomate, la pulpe de tomates, le cumin et le bouillon. Laissez mijoter 10 minutes.',
        'Incorporez la crème liquide et remettez le poulet dans la sauce. Poursuivez la cuisson 8 minutes. Parsemez de coriandre fraîche.'
      ],
      tags: ['Britannique', 'Curry', 'Poulet', 'Riz', 'Épices', 'Gourmand']
    },
    de: {
      title: 'Britisches Chicken Tikka Masala mit Basmatireis',
      description: 'Das britische National-Curry: Zarte marinierte Hähnchenstücke in sämig gewürzter Tomaten-Sahne-Sauce mit aromatischem Basmatireis.',
      instructions: [
        'Basmatireis in kochendem Salzwasser 12 Minuten gar dämpfen.',
        'Hähnchenbrust würfeln und 15 Minuten mit Joghurt, Knoblauch, Ingwer, Currypulver, Paprika und Salz marinieren.',
        'Hähnchenstücke in einer Pfanne mit etwas Öl scharf anbraten (6 Min.). Herausnehmen.',
        'Zwiebeln, Tomatenmark, gehackte Tomaten, Kreuzkümmel und Brühe in die Pfanne geben und 10 Minuten einköcheln.',
        'Sahne einrühren, Fleisch zugeben und 8 Minuten sanft fertig garen. Mit frischem Koriander bestreuen.'
      ],
      tags: ['Britisch', 'Curry', 'Geflügel', 'Reis', 'Klassiker']
    },
    es: {
      title: 'Chicken Tikka Masala Británico con Arroz Basmati',
      description: 'El célebre curry británico: tiernos trozos de pollo marinados en salsa cremosa de tomate, nata y especias aromáticas, con arroz basmati.',
      instructions: [
        'Cueza el arroz basmati en agua con sal durante 12 minutos hasta que quede suelto.',
        'Corte el pollo en dados y marínelo 15 minutos con yogur, ajo, jengibre, curry, pimentón y sal.',
        'Dore el pollo en una sartén con aceite a fuego vivo (6 min). Reserve.',
        'En la misma sartén sofría la cebolla con concentrado de tomate, tomate triturado, comino y caldo durante 10 minutos.',
        'Incorpore la nata y devuelva el pollo a la salsa. Cocine a fuego lento 8 minutos y decore con cilantro fresco.'
      ],
      tags: ['Británico', 'Curry', 'Pollo', 'Arroz', 'Especias']
    },
    pt: {
      title: 'Chicken Tikka Masala Britânico com Arroz Basmati',
      description: 'O famoso caril britânico: pedaços de frango marinados em molho cremoso de tomate, natas, caril suave e arroz basmati solto.',
      instructions: [
        'Coza o arroz basmati em água com sal durante 12 minutos.',
        'Corte o frango em cubos e marine 15 minutos com o iogurte, alho, gengibre, caril, paprica e sal.',
        'Doure o frango numa frigideira com um fio de azeite em lume forte (6 min). Reserve.',
        'Refogue a cebola com concentrado de tomate, polpa de tomate, cominhos e caldo de galinha por 10 minutos.',
        'Junte as natas e adicione o frango ao molho. Deixe apurar 8 minutos e decore com coentros frescos.'
      ],
      tags: ['Britânico', 'Caril', 'Frango', 'Arroz', 'Especiarias']
    }
  },

  'rec-sticky-toffee-pudding': {
    en: {
      title: 'Classic English Sticky Toffee Pudding',
      description: 'Warm, moist sponge cake served drenched in luscious hot butterscotch toffee sauce and heavy cream.',
      instructions: [
        'Preheat oven to 180°C (350°F). Grease small ramekins or a baking dish.',
        'In a bowl, cream butter and brown sugar until fluffy. Beat in eggs one at a time, then fold in flour and baking powder.',
        'Divide batter into prepared baking dishes and bake for 25 minutes until springy to the touch.',
        'Make toffee sauce: in a saucepan, combine brown sugar, butter, and heavy cream; simmer gently for 4 minutes until thick and glossy.',
        'Poke warm cakes with a skewer and pour hot toffee sauce over the top. Serve immediately with extra cream.'
      ],
      tags: ['British', 'Dessert', 'Baking', 'Toffee', 'Sweet', 'Classic']
    },
    fr: {
      title: 'Sticky Toffee Pudding Anglais au Caramel Beurre',
      description: 'Moelleux gâteau tiède traditionnel britannique nappé d’une généreuse sauce caramel au beurre et à la crème onctueuse.',
      instructions: [
        'Préchauffez le four à 180°C. Beurrez des ramequins ou un plat à gratin.',
        'Fouettez le beurre mou et la cassonade jusqu’à consistance crémeuse. Incorporez les œufs un à un, puis ajoutez la farine et la levure.',
        'Répartissez la pâte dans les moules et enfournez 25 minutes jusqu’à ce que le gâteau soit cuit et moelleux.',
        'Préparez la sauce toffee : faites fondre le sucre roux, le beurre et la crème dans une casserole pendant 4 minutes jusqu’à épaississement nappant.',
        'Piquez le gâteau encore chaud et arrosez généreusement de sauce toffee tiède. Servez sans attendre.'
      ],
      tags: ['Britannique', 'Dessert', 'Caramel', 'Gâteau', 'Sucré', 'Gourmand']
    },
    de: {
      title: 'Englisches Sticky Toffee Pudding',
      description: 'Saftiger britischer Gewürzkuchen, serviert mit heißer hausgemachter Toffee-Karamellsauce und Sahne.',
      instructions: [
        'Backofen auf 180°C vorheizen. Förmchen oder Auflaufform einfetten.',
        'Butter und braunen Zucker cremig rühren. Eier einzeln unterrühren, dann Mehl und Backpulver unterheben.',
        'Teig in die Förmchen füllen und 25 Minuten backen.',
        'Toffeesauce zubereiten: Braunen Zucker, Butter und Sahne in einem Topf 4 Minuten sanft zu einer sämigen Karamellsauce einkochen.',
        'Den warmen Kuchen einstechen und reichlich mit der heißen Toffeesauce übergießen. Direkt warm servieren.'
      ],
      tags: ['Britisch', 'Dessert', 'Kuchen', 'Karamell', 'Süß']
    },
    es: {
      title: 'Sticky Toffee Pudding Británico',
      description: 'Bizcocho tierno y jugoso servido caliente y bañado en una deliciosa salsa casera de toffee, mantequilla y nata.',
      instructions: [
        'Precaliente el horno a 180°C. Engrase moldes individuales.',
        'Bata la mantequilla con el azúcar moreno. Incorpore los huevos uno a uno y añada la harina con la levadura.',
        'Reparta la masa en los moldes y hornee 25 minutos.',
        'Prepare la salsa toffee calentando azúcar moreno, mantequilla y nata en un cazo durante 4 minutos hasta que espese.',
        'Pinche el bizcocho caliente y bañe con abundante salsa de toffee. Sirva de inmediato.'
      ],
      tags: ['Británico', 'Postre', 'Caramelo', 'Bizcocho', 'Dulce']
    },
    pt: {
      title: 'Sticky Toffee Pudding Britânico',
      description: 'Bolo fofo e húmido servido quente e regado com um irresistível molho de caramelo toffee de manteiga e natas.',
      instructions: [
        'Pré-aqueça o forno a 180°C. Unte forminhas individuais.',
        'Bata a manteiga com o açúcar mascavado. Junte os ovos um a um e envolva a farinha com o fermento.',
        'Distribua a massa pelas formas e asse durante 25 minutos.',
        'Faça o molho toffee: ferva o açúcar mascavado, a manteiga e as natas num tacho durante 4 minutos até engrossar.',
        'Pique o bolo quente com um palito e regue com o molho toffee aveludado. Sirva de imediato.'
      ],
      tags: ['Britânico', 'Sobremesa', 'Caramelo', 'Bolo', 'Doce']
    }
  },

  'rec-sunday-roast-beef': {
    en: {
      title: 'Traditional British Sunday Roast Beef & Yorkshire Puddings',
      description: 'Prime roast beef chuck with crispy roasted potatoes, sweet glazed carrots, fresh rosemary gravy, and puffed Yorkshire puddings.',
      instructions: [
        'Preheat oven to 200°C (400°F). Season beef chuck generously with salt, crushed black pepper, and fresh rosemary.',
        'Sear beef on all sides in 1 tbsp olive oil in a roasting pan, then surround with parboiled halved potatoes and carrot chunks.',
        'Roast in the oven for 40 minutes for juicy medium doneness. Rest the meat for 10 minutes before carving.',
        'Make Yorkshire puddings: whisk 2 eggs, flour, milk, and salt into a smooth batter; pour into sizzling hot greased muffin pans and bake for 20 mins at 220°C until risen.',
        'Deglaze the pan juices with beef broth to make a savory rosemary gravy. Serve with carved roast beef and crisp potatoes.'
      ],
      tags: ['British', 'Roast', 'Beef', 'Sunday Dinner', 'Classic']
    },
    fr: {
      title: 'Rôti de Bœuf du Dimanche et Yorkshire Puddings',
      description: 'Le grand repas familial britannique : bœuf rôti juteux, pommes de terre croustillantes au four, carottes glacées et Yorkshire puddings dorés.',
      instructions: [
        'Préchauffez le four à 200°C. Assaisonnez la pièce de bœuf avec du sel, du poivre concassé et du romarin frais.',
        'Saisissez le bœuf sur toutes ses faces dans un plat avec un filet d’huile, puis disposez les pommes de terre précuites et les carottes autour.',
        'Enfournez 40 minutes pour une cuisson rosée et tendre. Laissez reposer la viande 10 minutes sous aluminium.',
        'Préparez les puddings : fouettez 2 œufs avec la farine, le lait et le sel ; versez dans des moules très chauds huilés et cuisez 20 min à 220°C sans ouvrir le four.',
        'Déglacez le jus de cuisson avec le bouillon de bœuf pour faire une sauce au romarin. Servez le rôti tranché avec sa garniture.'
      ],
      tags: ['Britannique', 'Rôti', 'Bœuf', 'Dimanche', 'Traditionnel']
    },
    de: {
      title: 'Traditioneller Britischer Sunday Roast Beef',
      description: 'Zarter Rinderbraten mit knusprigen Röstkartoffeln, Karotten, Rosmarin-Bratensauce und luftigen Yorkshire Puddings.',
      instructions: [
        'Backofen auf 200°C vorheizen. Rindfleisch mit Salz, Pfeffer und frischem Rosmarin würzen.',
        'Fleisch in einem Bräter rundherum anbraten, dann vorgekochte Kartoffeln und Karotten drumherum verteilen.',
        '40 Minuten im Ofen braten. Vor dem Aufschneiden 10 Minuten ruhen lassen.',
        'Yorkshire Puddings: 2 Eier mit Mehl, Milch und Salz zu einem glatten Teig schlagen; in heiße gefettete Muffinformen füllen und 20 Min. bei 220°C aufbacken.',
        'Bratensatz mit Rinderbrühe ablöschen und als Sauce zum aufgeschnittenen Roastbeef servieren.'
      ],
      tags: ['Britisch', 'Braten', 'Rindfleisch', 'Sonntag', 'Klassiker']
    },
    es: {
      title: 'Sunday Roast Tradicional de Ternera Asada',
      description: 'El gran asado dominical británico: carne de ternera jugosa, patatas asadas crujientes, zanahorias y Yorkshire puddings.',
      instructions: [
        'Precaliente el horno a 200°C. Sazone la carne con sal, pimienta y romero fresco.',
        'Selle la ternera por todos lados en una fuente y rodee con las patatas semicocidas y las zanahorias.',
        'Asé durante 40 minutos. Deje reposar la carne 10 minutos antes de trinchar.',
        'Para los Yorkshire puddings bata huevos, harina, leche y sal; vierta en moldes muy calientes con aceite y hornee 20 min a 220°C.',
        'Desglase los jugos con caldo de ternera para hacer la salsa y sirva con la carne laminada.'
      ],
      tags: ['Británico', 'Asado', 'Ternera', 'Domingo', 'Clásico']
    },
    pt: {
      title: 'Sunday Roast Tradicional de Carne Assada',
      description: 'O clássico assado de domingo britânico: carne de vaca suculenta, batatas assadas estaladiças, cenouras e Yorkshire puddings.',
      instructions: [
        'Pré-aqueça o forno a 200°C. Tempere a carne com sal, pimenta e alecrim fresco.',
        'Sele a carne de todos os lados numa assadeira e disponha as batatas e cenouras à volta.',
        'Asse durante 40 minutos no forno. Deixe repousar 10 minutos antes de fatiar.',
        'Faça os Yorkshire puddings batendo ovos, farinha, leite e sal; deite em formas bem quentes untadas e asse 20 min a 220°C.',
        'Deglaceie a assadeira com caldo de carne para fazer o molho e sirva com a carne fatiada.'
      ],
      tags: ['Britânico', 'Assado', 'Carne', 'Domingo', 'Clássico']
    }
  }
};
