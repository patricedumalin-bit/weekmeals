import { SupportedLanguage } from '../translations';
import { LocalizedRecipeContent } from '../recipeTranslations';

export const GERMANY_RECIPE_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedRecipeContent>> = {
  'rec-wiener-schnitzel': {
    en: {
      title: 'Crispy German / Viennese Schnitzel with Lemon',
      description: 'Tender veal or pork cutlets pounded thin, golden-pan-fried in breadcrumb crust, served with fresh lemon wedges and warm parsley potatoes.',
      instructions: [
        'Place cutlets between plastic wrap and gently pound with a meat mallet to 5mm thickness. Season both sides with salt and pepper.',
        'Set up standard 3-bowl breading station: (1) all-purpose flour, (2) beaten eggs, (3) fine breadcrumbs.',
        'Dredge cutlets in flour shaking off excess, dip in beaten egg, then coat gently in breadcrumbs without pressing down.',
        'Heat sunflower oil and butter in a large skillet over medium-high heat. Fry schnitzels for 2-3 minutes per side, gently swirling pan so hot fat washes over top for wavy souffle crust.',
        'Drain on paper towels and serve immediately with fresh lemon slices and parsley potatoes.'
      ],
      tags: ['German', 'Germany', 'Schnitzel', 'Pork', 'Classic', 'Quick']
    },
    fr: {
      title: 'Véritable Schnitzel Viennois Croustillant au Citron',
      description: 'Fines escalopes de veau ou porc panées à la chapelure dorée et croustillante, servies avec des quartiers de citron et pommes de terre persillées.',
      instructions: [
        'Aplatissez finement les escalopes entre deux films alimentaires à l’aide d’un rouleau (5 mm). Salez et poivrez des deux côtés.',
        'Préparez 3 assiettes : (1) farine, (2) œufs battus, (3) chapelure fine.',
        'Passez les escalopes dans la farine, puis dans les œufs battus, et enfin dans la chapelure sans trop tasser.',
        'Faites chauffer l’huile et une noisette de beurre dans une grande poêle. Faites dorer 2 à 3 minutes par face en arrosant le dessus pour faire souffler la panure.',
        'Égouttez sur du papier absorbant et servez immédiatement avec des rondelles de citron frais.'
      ],
      tags: ['Allemand', 'Allemagne', 'Escalope', 'Porc', 'Classique', 'Rapide']
    },
    de: {
      title: 'Original Wiener Schnitzel mit Zitrone',
      description: 'Zarte, dünn geklopfte Kalbs- oder Schweineschnitzel in goldbrauner, welliger Panade mit frischen Zitronenspalten und Petersilienkartoffeln.',
      instructions: [
        'Schnitzel zwischen Folie vorsichtig ca. 5 mm dünn plattieren. Beidseitig mit Salz und Pfeffer würzen.',
        'Panierstraße aufbauen: (1) Mehl, (2) verquirlte Eier, (3) feine Semmelbrösel.',
        'Schnitzel erst in Mehl wenden, durch das Ei ziehen und locker in den Semmelbröseln wenden (nicht festdrücken).',
        'In reichlich Sonnenblumenöl und Butter schwimmend von jeder Seite 2-3 Minuten goldbraun ausbacken, dabei die Pfanne leicht schwenken (soufflieren).',
        'Auf Küchenpapier abtropfen lassen und sofort mit frischen Zitronenspalten servieren.'
      ],
      tags: ['Deutsch', 'Deutschland', 'Schnitzel', 'Klassiker', 'Schnell']
    },
    es: {
      title: 'Auténtico Schnitzel Alemán con Limón',
      description: 'Finos escalopes empanados crujientes y dorados en mantequilla, servidos con gajos de limón fresco y patatas al perejil.',
      instructions: [
        'Espalme los filetes entre film transparente hasta dejarlos finos (5 mm). Salpimiente.',
        'Prepare 3 platos: (1) harina, (2) huevo batido, (3) pan rallado fino.',
        'Pase los filetes por harina, luego por huevo y finalmente por pan rallado sin presionar.',
        'Fría en abundante aceite y mantequilla 2-3 minutos por lado bañando la superficie para lograr un empanado inflado y crujiente.',
        'Escurra sobre papel absorbente y sirva al momento con limón.'
      ],
      tags: ['Alemán', 'Alemania', 'Escalope', 'Cerdo', 'Clásico']
    },
    pt: {
      title: 'Autêntico Schnitzel Alemão com Limão',
      description: 'Finos escalopes panados com crosta dourada e crocante, servidos com gomos de limão fresco e batatas com salsa.',
      instructions: [
        'Bata os escalopes entre película aderente até ficarem bem finos (5 mm). Tempere com sal e pimenta.',
        'Prepare 3 pratos: (1) farinha, (2) ovos batidos, (3) pão ralado fino.',
        'Passe os escalopes por farinha, depois pelos ovos e por fim pelo pão ralado sem pressionar.',
        'Frite em óleo abundante com manteiga durante 2 a 3 minutos de cada lado até ficarem dourados e estaladiços.',
        'Escorra em papel absorvente e sirva de imediato com gomos de limão.'
      ],
      tags: ['Alemão', 'Alemanha', 'Escalope', 'Porco', 'Clássico']
    }
  },

  'rec-sauerbraten': {
    en: {
      title: 'Traditional German Sauerbraten (Marinated Pot Roast)',
      description: 'Tender beef pot roast marinated in red wine vinegar and spices, slow-braised to perfection with sweet-tangy gingerbread-scented gravy.',
      instructions: [
        'Marinate beef chuck with red wine vinegar, water, onions, carrots, bay leaves, and black pepper for several hours (or overnight).',
        'Remove beef from marinade and pat dry. Sear in 2 tbsp oil in a heavy Dutch oven until browned on all sides (8 mins).',
        'Strain marinade vegetables and sauté with tomato paste in the pot.',
        'Pour strained marinade liquid and beef broth over meat; bring to a simmer, cover, and braise gently on low heat for 50 minutes until fork-tender.',
        'Stir in a spoonful of sugar/honey to balance the acidity and thicken the velvety sauce. Slice meat and spoon sauce over.'
      ],
      tags: ['German', 'Beef', 'Pot Roast', 'Traditional', 'Stew']
    },
    fr: {
      title: 'Sauerbraten Traditionnel Allemand (Rôti Mariné)',
      description: 'Rôti de bœuf fondant mariné au vinaigre de vin et aromates, braisé lentement dans une sauce aigre-douce parfumée et onctueuse.',
      instructions: [
        'Faites mariner la pièce de bœuf avec le vinaigre de vin rouge, un peu d’eau, les oignons, les carottes, le laurier et le poivre pendant quelques heures.',
        'Égouttez la viande et séchez-la. Faites-la dorer dans une cocotte avec de l’huile sur toutes ses faces (8 min).',
        'Ajoutez les légumes de la marinade égouttés et faites-les suer avec le concentré de tomate.',
        'Versez la marinade filtrée et le bouillon de bœuf chaud. Couvrez et laissez mijoter à feu doux pendant 50 minutes jusqu’à ce que la viande soit ultra fondante.',
        'Liez la sauce avec une touche de miel ou sucre pour adoucir l’acidité. Tranchez le bœuf et nappez généreusement de sauce.'
      ],
      tags: ['Allemand', 'Bœuf', 'Mijoté', 'Traditionnel', 'Aigre-doux']
    },
    de: {
      title: 'Rheinischer Sauerbraten mit feiner Sauce',
      description: 'Klassischer deutscher Rinderbraten, in Essigsud und Gewürzen mariniert und butterzart in samtig süß-säuerlicher Sauce geschmort.',
      instructions: [
        'Rindfleisch mit Rotweinessig, Wasser, Zwiebeln, Karotten, Lorbeer und Pfeffer mehrere Stunden einlegen.',
        'Fleisch trocken tupfen und in einem Schmortopf von allen Seiten scharf anbraten (8 Min.).',
        'Abgetropftes Mariniergemüse und Tomatenmark kurz mitrösten.',
        'Mit der abgesiebten Marinade und Rinderbrühe aufgießen. Zugedeckt bei schwacher Hitze ca. 50 Minuten butterzart schmoren.',
        'Die Sauce mit etwas Honig oder Zucker süß-säuerlich abschmecken und sämig einköcheln lassen. Braten in Scheiben schneiden und anrichten.'
      ],
      tags: ['Deutsch', 'Rindfleisch', 'Schmorbraten', 'Traditionell']
    },
    es: {
      title: 'Sauerbraten Tradicional Alemán (Asado Marinado)',
      description: 'Carne de ternera tierna marinada en vinagre de vino y especias, estofada lentamente en una deliciosa salsa agridulce.',
      instructions: [
        'Marine la ternera con vinagre de vino tinto, agua, cebolla, zanahoria, laurel y pimienta durante unas horas.',
        'Seque la carne y dórela en una cazuela con aceite por todos lados (8 min).',
        'Añada las verduras de la marinada y el concentrado de tomate.',
        'Vierta la marinada colada y el caldo de ternera. Tape y estofe a fuego lento durante 50 minutos hasta que esté muy tierna.',
        'Añada un toque de miel o azúcar para equilibrar la salsa agridulce. Sirva la carne en rodajas bañada con su salsa.'
      ],
      tags: ['Alemán', 'Ternera', 'Estofado', 'Tradicional']
    },
    pt: {
      title: 'Sauerbraten Tradicional Alemão (Assado Marinado)',
      description: 'Carne de vaca marinada em vinagre de vinho e especiarias, estufada lentamente num molho aveludado agridoce irresistível.',
      instructions: [
        'Marine a carne em vinagre de vinho tinto, água, cebola, cenoura, louro e pimenta durante algumas horas.',
        'Seque a carne e doure num tacho com azeite de todos os lados (8 min).',
        'Adicione os legumes da marinada e o concentrado de tomate.',
        'Regue com a marinada coada e o caldo de carne. Tape e deixe estufar em lume brando durante 50 minutos até ficar tenra.',
        'Retifique o molho com um toque de mel ou açúcar para equilibrar a acidez. Fatie a carne e cubra com o molho.'
      ],
      tags: ['Alemão', 'Carne de Vaca', 'Estufado', 'Tradicional']
    }
  },

  'rec-kassler-sauerkraut': {
    en: {
      title: 'German Smoked Pork (Kassler) with Sauerkraut & Potatoes',
      description: 'Succulent smoked pork chops simmered over braised sauerkraut with crispy bacon lardons, sweet apples, and boiled potatoes.',
      instructions: [
        'Peel and boil potatoes in salted water until tender (20 mins).',
        'In a heavy pot, render smoked bacon lardons with diced onion in butter (5 mins).',
        'Add sauerkraut, grated apple, bay leaf, and beef or vegetable broth. Simmer for 15 minutes.',
        'Nestle smoked pork cuts (Kassler) on top of the sauerkraut, cover, and heat through for 15 minutes.',
        'Serve hot with a dollop of mustard and boiled parsley potatoes.'
      ],
      tags: ['German', 'Pork', 'Sauerkraut', 'Comfort Food', 'Winter']
    },
    fr: {
      title: 'Kassler Allemand et Choucroute aux Pommes de Terre',
      description: 'Côtes de porc fumé (Kassler) mijotées sur un lit de choucroute braisée aux lardons et pommes, servies avec pommes de terre vapeur.',
      instructions: [
        'Faites cuire les pommes de terre à l’eau salée (20 min).',
        'Dans une cocotte, faites dorer les lardons fumés avec les oignons dans un peu de beurre (5 min).',
        'Ajoutez la choucroute, la pomme râpée, la feuille de laurier et le bouillon. Laissez mijoter 15 minutes.',
        'Déposez le porc fumé Kassler sur le lit de choucroute, couvrez et laissez réchauffer 15 minutes.',
        'Servez bien chaud avec une bonne moutarde et les pommes de terre vapeur.'
      ],
      tags: ['Allemand', 'Porc Fumé', 'Choucroute', 'Hivernal', 'Traditionnel']
    },
    de: {
      title: 'Kassler mit Sauerkraut und Salzkartoffeln',
      description: 'Zartes geräuchertes Kassler auf geschmortem Weinsauerkraut mit Speckwürfeln, Apfelstückchen und Salzkartoffeln.',
      instructions: [
        'Kartoffeln schälen und in Salzwasser 20 Minuten gar kochen.',
        'Speckwürfel und Zwiebeln in einem Topf in etwas Butter 5 Minuten anbraten.',
        'Sauerkraut, geriebenen Apfel, Lorbeerblatt und Brühe zugeben und 15 Minuten sanft schmoren.',
        'Kassler auf das Sauerkraut legen, abdecken und 15 Minuten gar ziehen lassen.',
        'Heiß mit mittelscharfem Senf und Salzkartoffeln servieren.'
      ],
      tags: ['Deutsch', 'Kassler', 'Sauerkraut', 'Klassiker', 'Winter']
    },
    es: {
      title: 'Kassler Alemán con Chucrut y Patatas',
      description: 'Carne de cerdo ahumada (Kassler) cocinada sobre chucrut estofado con bacon, manzana dulce y patatas cocidas.',
      instructions: [
        'Cueza las patatas durante 20 minutos en agua con sal.',
        'Dore el bacon con la cebolla en mantequilla durante 5 minutos en una cazuela.',
        'Incorpore el chucrut, la manzana rallada, el laurel y el caldo. Cocine 15 minutos.',
        'Coloque el cerdo ahumado sobre el chucrut, tape y caliente 15 minutos.',
        'Sirva caliente acompañado de mostaza y patatas cocidas.'
      ],
      tags: ['Alemán', 'Cerdo Ahumado', 'Chucrut', 'Tradicional']
    },
    pt: {
      title: 'Kassler Alemão com Chucrute e Batatas',
      description: 'Carne de porco fumada suculenta cozinhada sobre chucrute estufado com bacon, maçã ralada e batatas cozidas.',
      instructions: [
        'Coza as batatas em água com sal durante 20 minutos.',
        'Salteie o bacon com a cebola em manteiga durante 5 minutos num tacho.',
        'Junte o chucrute, a maçã ralada, o louro e o caldo. Deixe estufar 15 minutos.',
        'Disponha a carne de porco fumada sobre o chucrute, tape e deixe aquecer 15 minutos.',
        'Sirva bem quente com mostarda e batatas cozidas.'
      ],
      tags: ['Alemão', 'Porco Fumado', 'Chucrute', 'Tradicional']
    }
  },

  'rec-kaesespaetzle': {
    en: {
      title: 'Swabian Cheese Spätzle (Käsespätzle) with Fried Onions',
      description: 'Traditional German egg noodles tossed in melted Emmental and mountain cheese with cream, topped with sweet crispy fried onions.',
      instructions: [
        'Thinly slice yellow onions. Fry in 2 tbsp butter over medium heat until dark golden and crispy (12 mins). Set aside for topping.',
        'Boil Spätzle egg noodles in salted boiling water until tender (5 mins); drain well.',
        'In a heavy warm pan, toss hot Spätzle with heavy cream, shredded Emmental cheese, and a pinch of ground nutmeg until cheese pulls in long gooey strings.',
        'Season to taste with sea salt and freshly ground black pepper.',
        'Transfer to serving plates and crown with a generous heap of crispy fried onions and chopped fresh parsley.'
      ],
      tags: ['German', 'Pasta', 'Cheese', 'Vegetarian', 'Comfort Food', 'Swabian']
    },
    fr: {
      title: 'Käsespätzle Souabes au Fromage Fondu et Oignons Frits',
      description: 'Pâtes fraîches aux œufs souabes enrobées d’un mélange onctueux d’Emmental fondu et de crème, surmontées d’oignons dorés croustillants.',
      instructions: [
        'Émincez les oignons jaunes. Faites-les dorer dans 2 c. à soupe de beurre à feu moyen pendant 12 minutes jusqu’à ce qu’ils soient croustillants. Réservez.',
        'Faites cuire les spätzle dans de l’eau bouillante salée pendant 5 minutes ; égouttez-les.',
        'Dans la poêle chaude, mélangez les spätzle encore fumants avec la crème, l’Emmental râpé et une pincée de muscade jusqu’à ce que le fromage file généreusement.',
        'Assaisonnez de sel et de poivre du moulin.',
        'Dressez dans les assiettes et recouvrez d’une montagne d’oignons croustillants et de persil frais haché.'
      ],
      tags: ['Allemand', 'Spätzle', 'Fromage', 'Végétarien', 'Convivial', 'Gourmand']
    },
    de: {
      title: 'Schwäbische Allgäuer Käsespätzle mit Röstzwiebeln',
      description: 'Echte schwäbische Eierspätzle mit würzigem Emmentaler/Bergkäse und Sahne, gekrönt von knusprig goldbraunen Röstzwiebeln.',
      instructions: [
        'Zwiebeln in Ringe schneiden und in Butter bei mittlerer Hitze 12 Minuten goldbraun und knusprig braten (Röstzwiebeln). Beiseitestellen.',
        'Spätzle in kochendem Salzwasser ca. 5 Minuten gar kochen und abgießen.',
        'Heiße Spätzle mit Sahne, geriebenem Emmentaler/Bergkäse und Muskat in einer warmen Pfanne schwenken, bis der Käse Fäden zieht.',
        'Mit Salz und frisch gemahlenem Pfeffer abschmecken.',
        'Auf Tellern anrichten und mit reichlich Röstzwiebeln und Schnittlauch/Petersilie garnieren.'
      ],
      tags: ['Deutsch', 'Schwäbisch', 'Käse', 'Vegetarisch', 'Klassiker']
    },
    es: {
      title: 'Käsespätzle Alemán con Queso y Cebolla Crujiente',
      description: 'Pasta tradicional al huevo con queso Emmental fundido cremoso y una generosa cobertura de cebollas fritas doradas.',
      instructions: [
        'Corte las cebollas en aros y fríalas en mantequilla durante 12 minutos hasta que estén doradas y crujientes. Reserve.',
        'Cueza los spätzle en agua con sal durante 5 minutos; escúrralos.',
        'Mezcle la pasta caliente con la nata, el queso Emmental rallado y nuez moscada hasta que el queso se funda en hilos.',
        'Sazone con sal y pimienta negra molida.',
        'Sirva en los platos y corone con la cebolla frita crujiente y perejil picado.'
      ],
      tags: ['Alemán', 'Pasta', 'Queso', 'Vegetariano', 'Fácil']
    },
    pt: {
      title: 'Käsespätzle Alemão com Queijo e Cebola Frita',
      description: 'Massa de ovo alemã envolvida em queijo Emmental derretido com natas e coberta com cebola dourada e crocante.',
      instructions: [
        'Corte as cebolas em rodelas finas e frite em manteiga durante 12 minutos até ficarem bem crocantes. Reserve.',
        'Coza os spätzle em água com sal durante 5 minutos; escorra.',
        'Envolva a massa quente com as natas, o queijo Emmental ralado e a noz-moscada até o queijo estalar em fios elásticos.',
        'Tempere com sal e pimenta moída na hora.',
        'Distribua pelos pratos e cubra com a cebola frita estaladiça e salsa picada.'
      ],
      tags: ['Alemão', 'Massa', 'Queijo', 'Vegetariano', 'Fácil']
    }
  },

  'rec-currywurst-mit-pommes': {
    en: {
      title: 'Berlin Currywurst with Crispy French Fries',
      description: 'Iconic German street food: seared pork sausages sliced and drenched in warm spiced curry ketchup, dusted with Madras curry powder alongside golden fries.',
      instructions: [
        'Cut potatoes into French fries and bake at 220°C (425°F) for 25 minutes or fry in hot oil until golden and crisp.',
        'In a small saucepan, combine curry ketchup, tomato paste, Worcestershire sauce, and 1 tsp curry powder. Warm gently over low heat for 5 minutes.',
        'In a skillet with 1 tbsp oil, fry bratwurst sausages until browned and crispy on the outside (8 mins).',
        'Slice sausages into thick bite-sized rounds.',
        'Place sliced sausages on a plate, smother in warm curry sauce, dust generously with curry powder, and serve alongside salted hot fries.'
      ],
      tags: ['German', 'Berlin', 'Street Food', 'Sausage', 'Quick', 'Fries']
    },
    fr: {
      title: 'Currywurst Berlinoise et Frites Croustillantes',
      description: 'L’incontournable street food de Berlin : saucisses dorées nappées d’une sauce ketchup au curry épicée et saupoudrées de poudre de curry avec frites dorées.',
      instructions: [
        'Coupez les pommes de terre en frites et faites-les cuire au four à 220°C pendant 25 minutes jusqu’à ce qu’elles soient croustillantes.',
        'Dans une casserole, faites chauffer le ketchup, le concentré de tomate, la sauce Worcestershire et 1 c. à café de curry pendant 5 minutes.',
        'Dans une poêle, faites dorer les saucisses Bratwurst avec un peu d’huile pendant 8 minutes.',
        'Coupez les saucisses en rondelles épaisses.',
        'Disposez les rondelles sur une assiette, nappez de sauce curry chaude, saupoudrez généreusement de poudre de curry et servez avec les frites bien chaudes.'
      ],
      tags: ['Allemand', 'Berlin', 'Street Food', 'Saucisse', 'Rapide', 'Frites']
    },
    de: {
      title: 'Berliner Currywurst mit Pommes Frites',
      description: 'Der deutsche Kult-Klassiker: Gebratene Rostbratwurst in Scheiben, serviert mit würziger Currysauce, Currypulver und knusprigen Pommes.',
      instructions: [
        'Kartoffeln zu Pommes schneiden und im Ofen bei 220°C 25 Minuten knusprig backen.',
        'Curryketchup mit Tomatenmark, etwas Worcestershire-Sauce und Currypulver in einem Topf 5 Minuten erwärmen.',
        'Bratwürste in einer Pfanne mit Öl rundherum 8 Minuten goldbraun braten.',
        'Die Würste in mundgerechte Scheiben schneiden.',
        'Auf Tellern anrichten, mit warmer Currysauce übergießen, reichlich Currypulver darüberstäuben und mit heißen Pommes servieren.'
      ],
      tags: ['Deutsch', 'Berlin', 'Streetfood', 'Wurst', 'Schnell']
    },
    es: {
      title: 'Currywurst de Berlín con Patatas Fritas',
      description: 'El clásico de la comida callejera alemana: salchichas troceadas bañadas en salsa especiada de curry y kétchup con patatas fritas crujientes.',
      instructions: [
        'Corte las patatas en bastones y hornee a 220°C durante 25 minutos hasta que estén doradas.',
        'Caliente el kétchup con el concentrado de tomate, la salsa Worcestershire y el curry en polvo durante 5 minutos.',
        'Dore las salchichas en una sartén con aceite durante 8 minutos.',
        'Corte las salchichas en rodajas gruesas.',
        'Sirva las rodajas en el plato, cubra con salsa caliente, espolvoree con curry y acompañe de las patatas fritas.'
      ],
      tags: ['Alemán', 'Berlín', 'Street Food', 'Salchicha', 'Rápido']
    },
    pt: {
      title: 'Currywurst de Berlim com Batatas Fritas',
      description: 'O famoso petisco de rua alemão: salsichas fatiadas regadas com molho quente de ketchup e caril, polvilhadas com caril em pó e batatas fritas.',
      instructions: [
        'Corte as batatas em palitos e asse no forno a 220°C por 25 minutos até dourarem.',
        'Aqueça o ketchup com o concentrado de tomate, molho inglês e o caril em pó durante 5 minutos.',
        'Frite as salsichas numa frigideira com óleo durante 8 minutos até dourarem.',
        'Corte as salsichas em rodelas grossas.',
        'Coloque as rodelas no prato, cubra com o molho de caril, polvilhe com caril em pó e sirva com as batatas fritas estaladiças.'
      ],
      tags: ['Alemão', 'Berlim', 'Street Food', 'Salsicha', 'Rápido']
    }
  },

  'rec-schwarzwaelder-kirschtorte': {
    en: {
      title: 'Black Forest Cherry Cake (Schwarzwälder Kirschtorte)',
      description: 'Renowned German chocolate sponge cake layered with whipped cream, tangy sour cherries, and rich dark chocolate shavings.',
      instructions: [
        'Preheat oven to 180°C (350°F). Whisk eggs and sugar until thick. Sift in flour, cocoa powder, and baking powder; fold gently. Bake in a round cake tin for 25 mins.',
        'Drain sour cherries, reserving a little juice. Heat cherries with 1 tbsp sugar and a pinch of cinnamon for 3 mins; let cool.',
        'Whip cold heavy cream with 2 tbsp sugar and vanilla extract until stiff peaks form.',
        'Slice cooled chocolate sponge horizontally into layers. Layer sponge, sour cherries, and fluffy whipped cream.',
        'Frost outside with cream and decorate top with dark chocolate shavings and reserved cherries. Chill before serving.'
      ],
      tags: ['German', 'Cake', 'Dessert', 'Chocolate', 'Cherries', 'Baking']
    },
    fr: {
      title: 'Forêt-Noire Allemande (Schwarzwälder Kirschtorte)',
      description: 'Le grand classique de la pâtisserie allemande : génoise légère au cacao, crème chantilly onctueuse, griottes acidulées et copeaux de chocolat noir.',
      instructions: [
        'Préchauffez le four à 180°C. Fouettez les œufs et le sucre jusqu’à blanchiment. Incorporez la farine, le cacao et la levure. Enfournez 25 minutes dans un moule rond.',
        'Égouttez les griottes. Faites-les tiédir 3 minutes avec 1 c. à soupe de sucre et une pointe de cannelle ; laissez refroidir.',
        'Montez la crème fraîche liquide entière bien froide en chantilly ferme avec le sucre et la vanille.',
        'Coupez le biscuit refroidi en disques horizontaux. Garnissez de chantilly et de griottes.',
        'Recouvrez le gâteau de chantilly et décorez le dessus avec des copeaux de chocolat noir et quelques cerises. Réfrigérez avant de déguster.'
      ],
      tags: ['Allemand', 'Gâteau', 'Dessert', 'Chocolat', 'Cerises', 'Pâtisserie']
    },
    de: {
      title: 'Original Schwarzwälder Kirschtorte',
      description: 'Berühmte deutsche Schichttorte mit saftigem Schoko-Biskuitboden, lockerer Sahnecreme, Sauerkirschen und dunklen Schokoraspeln.',
      instructions: [
        'Backofen auf 180°C vorheizen. Eier und Zucker cremig schlagen. Mehl, Kakaopulver und Backpulver vorsichtig unterheben. 25 Minuten backen.',
        'Sauerkirschen abgießen, kurz mit 1 EL Zucker und etwas Zimt erwärmen und abkühlen lassen.',
        'Schlagsahne mit Zucker und Vanilleextrakt steif schlagen.',
        'Biskuitboden waagerecht teilen. Mit Kirschen und Sahne schichten.',
        'Torte mit Sahne einstreichen und mit geraspelter Zartbitterschokolade sowie Kirschen verzieren. Vor dem Anschneiden kühlen.'
      ],
      tags: ['Deutsch', 'Torte', 'Dessert', 'Schokolade', 'Kirschen', 'Klassiker']
    },
    es: {
      title: 'Tarta Selva Negra Alemana (Schwarzwälder Kirschtorte)',
      description: 'Famosa tarta alemana con bizcocho de chocolate esponjoso, nata montada suave, cerezas ácidas y virutas de chocolate negro.',
      instructions: [
        'Precaliente el horno a 180°C. Bata los huevos con el azúcar. Añada la harina, el cacao y la levadura. Hornee 25 minutos.',
        'Escurra las guindas o cerezas y caliéntelas 3 minutos con una cucharada de azúcar y canela; deje enfriar.',
        'Monte la nata líquida bien fría con el azúcar y la vainilla hasta obtener picos firmes.',
        'Corte el bizcocho frío en capas. Rellene con nata y cerezas.',
        'Cubra con nata montada y decore con virutas de chocolate negro y cerezas. Enfríe antes de servir.'
      ],
      tags: ['Alemán', 'Tarta', 'Postre', 'Chocolate', 'Cerezas']
    },
    pt: {
      title: 'Bolo Floresta Negra Alemão (Schwarzwälder Kirschtorte)',
      description: 'Famoso bolo alemão com pão de ló de chocolate fofo, natas batidas firmes, ginjas ácidas e raspas de chocolate preto.',
      instructions: [
        'Pré-aqueça o forno a 180°C. Bata os ovos com o açúcar. Envolva a farinha, o cacau e o fermento. Asse durante 25 minutos.',
        'Escorra as ginjas e aqueça 3 minutos com 1 colher de açúcar e canela; deixe arrefecer.',
        'Bata as natas bem frias com açúcar e baunilha até ficarem em chantilly firme.',
        'Corte o bolo em camadas horizontais. Recheie com chantilly e ginjas.',
        'Cubra o bolo com chantilly e decore com raspas de chocolate preto e ginjas inteiras. Leve ao frigorífico antes de servir.'
      ],
      tags: ['Alemão', 'Bolo', 'Sobremesa', 'Chocolate', 'Ginjas']
    }
  },

  'rec-kartoffelsalat-speck': {
    en: {
      title: 'Warm German Potato Salad with Bacon & Mustard',
      description: 'Southern German potato salad with sliced warm potatoes dressed in tangy warm broth, crispy smoked bacon lardons, onions, and Dijon mustard.',
      instructions: [
        'Boil potatoes with skins on in salted water until fork-tender (20 mins). Peel while warm and slice into 5mm rounds.',
        'In a skillet, fry diced smoked bacon lardons and finely chopped onions in 1 tbsp oil until golden and fragrant (6 mins).',
        'Pour warm beef or vegetable broth, red wine vinegar, and Dijon mustard into the skillet with the bacon; stir to create warm dressing.',
        'Pour hot dressing over warm sliced potatoes; season with salt and freshly cracked black pepper. Toss gently to avoid breaking potatoes.',
        'Let absorb for 15 minutes. Serve warm or room temperature, garnished with fresh flat-leaf parsley.'
      ],
      tags: ['German', 'Salad', 'Potatoes', 'Bacon', 'Side Dish', 'Traditional']
    },
    fr: {
      title: 'Salade de Pommes de Terre Allemande aux Lardons',
      description: 'Salade tiède traditionnelle du sud de l’Allemagne : rondelles de pommes de terre nappées d’un bouillon chaud au vinaigre, moutarde et lardons dorés.',
      instructions: [
        'Faites cuire les pommes de terre avec leur peau dans l’eau salée (20 min). Épluchez-les tièdes et coupez-les en rondelles de 5 mm.',
        'Dans une poêle, faites dorer les lardons fumés et les oignons émincés dans un filet d’huile (6 min).',
        'Versez le bouillon chaud, le vinaigre et la moutarde de Dijon dans la poêle avec les lardons pour créer la vinaigrette chaude.',
        'Versez la sauce chaude sur les pommes de terre tièdes ; salez et poivrez. Mélangez délicatement pour ne pas écraser les rondelles.',
        'Laissez tiédir 15 minutes pour que les pommes de terre s’imprègnent des saveurs. Parsemez de persil plat frais.'
      ],
      tags: ['Allemand', 'Salade', 'Pommes de terre', 'Lardons', 'Traditionnel']
    },
    de: {
      title: 'Schwäbischer Kartoffelsalat mit Speck & Brühe',
      description: 'Klassischer süddeutscher Kartoffelsalat: Laumann-Kartoffelscheiben in warmer Rinderbrühe-Essig-Vinaigrette mit knusprigem Speck und Petersilie.',
      instructions: [
        'Kartoffeln als Pellkartoffeln kochen (20 Min.). Noch warm pellen und in Scheiben schneiden.',
        'Speckwürfel und fein gehackte Zwiebeln in einer Pfanne 6 Minuten anbraten.',
        'Heiße Brühe, Rotweinessig und Senf zum Speck in die Pfanne geben und kurz aufkochen.',
        'Die heiße Marinade über die warmen Kartoffeln gießen, mit Salz und Pfeffer würzen und vorsichtig vermengen („schlotzig“ rühren).',
        '15 Minuten ziehen lassen und mit viel frischer Petersilie lauwarm servieren.'
      ],
      tags: ['Deutsch', 'Salat', 'Kartoffeln', 'Speck', 'Klassiker']
    },
    es: {
      title: 'Ensalada de Patata Alemana con Bacon y Mostaza',
      description: 'Clásica ensalada templada alemana con patatas cocidas bañadas en caldo caliente con vinagre, mostaza y dados de bacon crujiente.',
      instructions: [
        'Cueza las patatas con piel durante 20 minutos. Pélelas templadas y córtelas en rodajas.',
        'Dore el bacon con la cebolla picada en una sartén durante 6 minutos.',
        'Vierta el caldo caliente, el vinagre y la mostaza de Dijon en la sartén para formar el aliño caliente.',
        'Vierta el aliño sobre las patatas; sazone con sal y pimienta. Mezcle suavemente.',
        'Deje reposar 15 minutos para que absorba el sabor. Decore con perejil fresco.'
      ],
      tags: ['Alemán', 'Ensalada', 'Patatas', 'Bacon', 'Tradicional']
    },
    pt: {
      title: 'Salada de Batata Alemã com Bacon e Mostarda',
      description: 'Tradicional salada morna alemã com rodelas de batata envolvidas em caldo quente com vinagre, mostarda de Dijon e bacon estaladiço.',
      instructions: [
        'Coza as batatas com casca durante 20 minutos. Descasque mornas e corte em rodelas.',
        'Frite o bacon com a cebola picada numa frigideira durante 6 minutos.',
        'Junte o caldo quente, o vinagre e a mostarda à frigideira para fazer o molho quente.',
        'Verta o molho quente sobre as batatas; tempere com sal e pimenta. Envolva suavemente.',
        'Deixe repousar 15 minutos para absorver os aromas. Sirva morna polvilhada com salsa fresca.'
      ],
      tags: ['Alemão', 'Salada', 'Batatas', 'Bacon', 'Tradicional']
    }
  }
};
