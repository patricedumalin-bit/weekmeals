import { SupportedLanguage } from '../translations';
import { LocalizedRecipeContent } from '../recipeTranslations';

export const ITALY_RECIPE_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedRecipeContent>> = {
  'rec-spaghetti-carbonara': {
    en: {
      title: 'Authentic Roman Spaghetti alla Carbonara',
      description: 'Traditional Roman pasta dish with crispy cured guanciale or pancetta, velvety egg yolk custard, freshly grated Pecorino Romano and Parmigiano, and coarse black pepper.',
      instructions: [
        'Bring a large pot of salted water to a rolling boil and cook spaghetti until al dente (around 9 mins).',
        'In a heavy skillet, cook diced guanciale or pancetta over medium heat until golden and crispy (6 mins). Turn off heat.',
        'In a bowl, whisk together whole eggs and egg yolk with freshly grated Pecorino Romano and Parmigiano Reggiano, and plenty of cracked black pepper.',
        'Transfer drained al dente pasta directly into the skillet with the crispy pork fat and toss off the heat.',
        'Pour in the egg and cheese mixture with 3 tbsp of starchy hot pasta cooking water. Toss vigorously off the heat until a silky, creamy sauce coats every strand.',
        'Serve immediately with extra Pecorino and freshly cracked black pepper.'
      ],
      tags: ['Italian', 'Italy', 'Pasta', 'Roman', 'Quick', 'Classic']
    },
    fr: {
      title: 'Spaghetti alla Carbonara Traditionnels de Rome',
      description: 'L’authentique recette romaine aux morceaux de guanciale ou pancetta croustillants, crème d’œufs onctueuse, Pecorino Romano et poivre noir concassé.',
      instructions: [
        'Portez une grande casserole d’eau salée à ébullition et faites cuire les spaghetti al dente (environ 9 min).',
        'Dans une poêle, faites dorer le guanciale ou la pancetta à feu moyen jusqu’à ce qu’il soit bien croustillant (6 min). Éteignez le feu.',
        'Dans un bol, battez les œufs et le jaune avec le Pecorino Romano et le Parmigiano râpés, ainsi qu’une bonne dose de poivre noir moulu.',
        'Égouttez les pâtes en gardant un peu d’eau de cuisson et versez-les directement dans la poêle avec le gras parfumé.',
        'Versez la crème d’œufs et fromage avec 3 c. à soupe d’eau de cuisson chaude hors du feu. Remuez vivement pour créer une émulsion soyeuse et nappante.',
        'Servez immédiatement avec un supplément de Pecorino et de poivre noir concassé.'
      ],
      tags: ['Italien', 'Italie', 'Pâtes', 'Romain', 'Rapide', 'Classique']
    },
    de: {
      title: 'Original Römische Spaghetti alla Carbonara',
      description: 'Authentischer römischer Pastaklassiker mit knusprigem Guanciale/Pancetta, samtiger Eigelb-Käse-Creme, Pecorino Romano und schwarzem Pfeffer.',
      instructions: [
        'Spaghetti in reichlich kochendem Salzwasser al dente kochen (ca. 9 Min.).',
        'Guanciale oder Pancetta in einer Pfanne bei mittlerer Hitze knusprig anbraten (6 Min.). Hitze ausschalten.',
        'In einer Schüssel Eier, Eigelb, frisch geriebenen Pecorino, Parmesan und reichlich groben Pfeffer cremig verquirlen.',
        'Die heißen Spaghetti direkt zum angebratenen Guanciale in die Pfanne geben und durchschwenken.',
        'Die Eier-Käse-Mischung mit etwas heißem Nudelwasser unter ständigem Rühren abseits der Hitze untermischen, bis eine samtige Sauce entsteht.',
        'Sofort mit zusätzlichem Pecorino und frisch gemahlenem Pfeffer servieren.'
      ],
      tags: ['Italienisch', 'Italien', 'Pasta', 'Klassiker', 'Schnell']
    },
    es: {
      title: 'Spaghetti alla Carbonara Tradicional de Roma',
      description: 'Auténtica pasta romana con guanciale o panceta crujiente, suave crema de yemas de huevo, queso Pecorino Romano y pimienta negra molida.',
      instructions: [
        'Cueza los espaguetis en abundante agua hirviendo con sal hasta que queden al dente (unos 9 min).',
        'Dore el guanciale o la panceta en una sartén a fuego medio hasta que esté crujiente (6 min). Apague el fuego.',
        'En un bol, bata los huevos y la yema con el Pecorino Romano, el Parmesano rallado y abundante pimienta negra.',
        'Pase la pasta escurrida a la sartén con la grasa caliente.',
        'Añada la mezcla de huevos y queso con un poco de agua caliente de la cocción, mezclando con energía fuera del fuego hasta obtener una textura cremosa.',
        'Sirva inmediatamente con más Pecorino y pimienta negra recién molida.'
      ],
      tags: ['Italiano', 'Italia', 'Pasta', 'Romano', 'Rápido', 'Clásico']
    },
    pt: {
      title: 'Spaghetti alla Carbonara Tradicional Romano',
      description: 'Autêntica receita romana com guanciale ou pancetta crocante, creme aveludado de gemas de ovos, queijo Pecorino Romano e pimenta preta moída.',
      instructions: [
        'Coza o esparguete em água a ferver com sal até ficar al dente (cerca de 9 min).',
        'Frite o guanciale ou pancetta numa frigideira em lume médio até ficar dourado e crocante (6 min). Desligue o lume.',
        'Numa taça, misture os ovos e a gema com o queijo Pecorino Romano, Parmesão ralado e bastante pimenta preta moída.',
        'Junte a massa escorrida diretamente na frigideira com a gordura saborosa.',
        'Adicione a mistura de ovos e queijo com 3 colheres de sopa de água quente da cozedura fora do lume, mexendo vigorosamente até criar um creme aveludado.',
        'Sirva de imediato com queijo Pecorino extra e pimenta moída na hora.'
      ],
      tags: ['Italiano', 'Itália', 'Massa', 'Romano', 'Rápido', 'Clássico']
    }
  },

  'rec-lasagna-bolognese': {
    en: {
      title: 'Classic Lasagna alla Bolognese',
      description: 'Layered oven-baked pasta with slow-simmered rich beef ragù, creamy béchamel sauce, mozzarella, and Parmigiano Reggiano.',
      instructions: [
        'Heat olive oil in a saucepan; sauté finely diced onion, carrot, celery, and garlic until softened (5 mins).',
        'Add ground beef and pork; brown thoroughly. Stir in tomato paste, crushed tomatoes, beef broth, oregano, salt, and pepper. Simmer gently for 30 minutes.',
        'Prepare béchamel sauce: melt butter in a pot, whisk in flour for 1 minute, then gradually add milk while whisking until smooth and thickened. Season with nutmeg and salt.',
        'Preheat oven to 190°C (375°F). Layer in a baking dish: ragù, pasta sheets, béchamel, mozzarella, and Parmesan. Repeat for 3-4 layers.',
        'Finish with a generous top layer of béchamel, mozzarella, and Parmigiano. Bake for 35 minutes until golden and bubbling.'
      ],
      tags: ['Italian', 'Pasta', 'Baking', 'Comfort Food', 'Beef', 'Classic']
    },
    fr: {
      title: 'Lasagnes Traditionnelles à la Bolognaise',
      description: 'Plat familial italien au four composé de couches de pâtes fraîches, riche ragù de bœuf mijoté, béchamel onctueuse, mozzarella et parmesan.',
      instructions: [
        'Faites chauffer l’huile d’olive dans une sauteuse ; faites suer l’oignon, la carotte, le céleri et l’ail hachés pendant 5 minutes.',
        'Ajoutez la viande de bœuf et de porc hachée ; faites dorer. Incorporez le concentré de tomate, le coulis de tomates, le bouillon, l’origan, le sel et le poivre. Laissez mijoter 30 minutes.',
        'Préparez la béchamel : faites fondre le beurre, ajoutez la farine pour faire un roux, puis versez le lait progressivement au fouet jusqu’à épaississement. Assaisonnez de muscade et sel.',
        'Préchauffez le four à 190°C. Dans un plat, alternez les couches : ragù, feuilles de lasagne, béchamel, mozzarella et parmesan. Répétez sur 3 à 4 niveaux.',
        'Terminez par de la béchamel, de la mozzarella et du parmesan. Enfournez 35 minutes jusqu’à belle coloration dorée.'
      ],
      tags: ['Italien', 'Pâtes', 'Four', 'Bœuf', 'Convivial', 'Gourmand']
    },
    de: {
      title: 'Klassische Lasagne alla Bolognese',
      description: 'Im Ofen überbackener italienischer Klassiker mit langsam geschmortem Rinderragù, cremiger Béchamelsauce, Mozzarella und Parmesan.',
      instructions: [
        'Zwiebel, Karotte, Sellerie und Knoblauch fein würfeln und in Olivenöl 5 Minuten andünsten.',
        'Hackfleisch zugeben und kräftig anbraten. Tomatenmark, gehackte Tomaten, Brühe, Oregano, Salz und Pfeffer einrühren. 30 Minuten sanft köcheln lassen.',
        'Béchamel zubereiten: Butter schmelzen, Mehl einrühren und unter ständigem Rühren nach und nach Milch zugeben, bis die Sauce eindickt. Mit Muskat und Salz würzen.',
        'Backofen auf 190°C vorheizen. In einer Auflaufform schichten: Ragù, Lasagneplatten, Béchamel, Mozzarella und Parmesan.',
        'Mit Béchamel und reichlich Parmesan abschließen. 35 Minuten backen, bis die Oberfläche goldbraun überbacken ist.'
      ],
      tags: ['Italienisch', 'Pasta', 'Auflauf', 'Klassiker', 'Rindfleisch']
    },
    es: {
      title: 'Lasaña Tradicional a la Boloñesa',
      description: 'Exquisito plato horneado con láminas de pasta, ragú de ternera cocinado a fuego lento, bechamel suave, mozzarella y queso parmesano.',
      instructions: [
        'Sofría la cebolla, zanahoria, apio y ajo picados en aceite de oliva durante 5 minutos.',
        'Añada la carne picada y dore bien. Incorpore el concentrado, el tomate triturado, el caldo, orégano, sal y pimienta. Deje cocer 30 minutos.',
        'Prepare la bechamel derritiendo mantequilla, añadiendo harina y vertiendo la leche poco a poco sin dejar de batir. Sazone con nuez moscada y sal.',
        'Precaliente el horno a 190°C. En una fuente monte capas: ragú, láminas de pasta, bechamel, mozzarella y parmesano.',
        'Cubra con bechamel y parmesano. Hornee 35 minutos hasta que esté dorada y burbujeante.'
      ],
      tags: ['Italiano', 'Pasta', 'Horno', 'Ternera', 'Clásico']
    },
    pt: {
      title: 'Lasanha Tradicional à Bolonhesa',
      description: 'Clássico prato italiano de forno em camadas de massa, ragù de carne lentamente apurado, molho bechamel cremoso, mozzarella e parmesão.',
      instructions: [
        'Refogue a cebola, cenoura, aipo e alho picados em azeite durante 5 minutos.',
        'Junte a carne picada e doure bem. Envolva o concentrado de tomate, a polpa, o caldo, orégãos, sal e pimenta. Deixe apurar 30 minutos.',
        'Faça o bechamel: derreta a manteiga, junte a farinha e adicione o leite gradualmente mexendo com batedor até engrossar. Tempere com noz-moscada e sal.',
        'Pré-aqueça o forno a 190°C. Numa assadeira monte camadas: carne, placas de lasanha, bechamel, mozzarella e parmesão.',
        'Finalize com bechamel e queijo ralado. Leve ao forno durante 35 minutos até ficar dourada e estaladiça.'
      ],
      tags: ['Italiano', 'Massa', 'Forno', 'Carne', 'Clássico']
    }
  },

  'rec-risotto-ai-funghi': {
    en: {
      title: 'Creamy Wild Mushroom & Parmesan Risotto',
      description: 'Luxurious Northern Italian arborio rice slow-stirred with sautéed mushrooms, shallots, garlic, rich broth, butter, and Parmigiano Reggiano.',
      instructions: [
        'Keep vegetable or beef broth warm over low heat in a small pot.',
        'Sauté sliced mushrooms in 1 tbsp olive oil and 1 tbsp butter until golden brown (5 mins). Season and set aside.',
        'In a wide saucepan, sauté minced shallots and garlic in butter until translucent. Add Arborio rice and toast for 2 minutes.',
        'Ladle in warm broth one scoop at a time, stirring continuously until absorbed before adding the next (takes about 18 mins).',
        'Stir in sautéed mushrooms, remaining butter, and freshly grated Parmigiano Reggiano off the heat (mantecatura) for a velvety finish. Garnish with fresh parsley.'
      ],
      tags: ['Italian', 'Risotto', 'Vegetarian', 'Gluten-Free', 'Classic']
    },
    fr: {
      title: 'Risotto Crémeux aux Champignons et Parmesan',
      description: 'Savoureux risotto au riz Arborio lié au beurre et Parmigiano Reggiano, parfumé aux champignons dorés, échalotes et persil frais.',
      instructions: [
        'Maintenez le bouillon de légumes ou bœuf bien chaud à feu doux dans une casserole.',
        'Faites sauter les champignons émincés dans 1 c. à soupe d’huile et de beurre jusqu’à belle coloration dorée (5 min). Réservez.',
        'Dans une sauteuse, faites suer les échalotes et l’ail dans le beurre. Ajoutez le riz Arborio et nacrez-le 2 minutes.',
        'Versez le bouillon louche après louche en remuant constamment jusqu’à absorption complète avant chaque ajout (environ 18 min).',
        'Incorporez hors du feu les champignons, une noix de beurre et le parmesan râpé (la mantecatura) pour obtenir une texture onctueuse. Parsemez de persil frais.'
      ],
      tags: ['Italien', 'Risotto', 'Végétarien', 'Sans Gluten', 'Raffiné']
    },
    de: {
      title: 'Cremiges Steinpilz- und Champignon-Risotto',
      description: 'Feinstes norditalienisches Risotto mit Arborio-Reis, gebratenen Pilzen, Schalotten, Butter und frisch geriebenem Parmesan.',
      instructions: [
        'Brühe in einem kleinen Topf heiß halten.',
        'Champignons in Olivenöl und etwas Butter goldbraun anbraten (5 Min.), würzen und beiseitestellen.',
        'Schalotten und Knoblauch in Butter glasig dünsten. Arborio-Reis zugeben und 2 Minuten glasig anrösten.',
        'Heiße Brühe kellenweise unter ständigem Rühren zugeben, bis die Flüssigkeit fast aufgesogen ist (ca. 18 Min.).',
        'Pilze, restliche Butter und Parmesan abseits der Hitze unterrühren (Mantecatura), bis das Risotto herrlich cremig ist. Mit Petersilie bestreuen.'
      ],
      tags: ['Italienisch', 'Risotto', 'Vegetarisch', 'Glutenfrei']
    },
    es: {
      title: 'Risotto Cremoso de Setas y Parmesano',
      description: 'Elegante arroz Arborio italiano cocinado a fuego lento con setas salteadas, chalotas, mantequilla y queso Parmigiano Reggiano.',
      instructions: [
        'Mantenga el caldo caliente en un cazo a fuego lento.',
        'Saltee los champiñones en aceite de oliva y mantequilla hasta que estén dorados (5 min). Reserve.',
        'Sofría las chalotas y el ajo picados en mantequilla. Añada el arroz Arborio y nacárelo durante 2 minutos.',
        'Vierta el caldo caliente poco a poco sin dejar de remover con una cuchara de madera (unos 18 min).',
        'Fuera del fuego añada los champiñones, mantequilla fría y el parmesano rallado (mantecatura) para conseguir una cremosidad sedosa. Decore con perejil.'
      ],
      tags: ['Italiano', 'Risotto', 'Vegetariano', 'Sin Gluten', 'Elegante']
    },
    pt: {
      title: 'Risotto Cremoso de Cogumelos e Parmesão',
      description: 'Aveludado arroz Arbóreo italiano cozinhado lentamente com cogumelos salteados, chalotas, manteiga e queijo Parmigiano Reggiano.',
      instructions: [
        'Mantenha o caldo quente num tacho em lume brando.',
        'Salteie os cogumelos em azeite e manteiga até dourarem (5 min). Reserve.',
        'Refogue as chalotas e o alho em manteiga. Junte o arroz Arbóreo e toste durante 2 minutos.',
        'Adicione o caldo quente concha a concha, mexendo sempre até ser absorvido (cerca de 18 min).',
        'Fora do lume envolva os cogumelos, uma noz de manteiga e o queijo parmesão ralado (mantecatura) para um acabamento sedoso. Decore com salsa fresca.'
      ],
      tags: ['Italiano', 'Risotto', 'Vegetariano', 'Sem Glúten', 'Elegante']
    }
  },

  'rec-pizza-margherita': {
    en: {
      title: 'Neapolitan Pizza Margherita',
      description: 'Artisan stone-baked Italian pizza with sweet San Marzano tomato sauce, fresh mozzarella fior di latte, extra virgin olive oil, and fresh fragrant basil leaves.',
      instructions: [
        'Preheat oven with a pizza stone or baking tray to highest setting (240°C-260°F).',
        'Blend or crush plum tomatoes with a pinch of salt, dried oregano, and 1 tbsp olive oil for the sauce.',
        'Stretch fresh pizza dough onto parchment paper into a 30cm circle with slightly raised crust edges.',
        'Spread tomato sauce evenly over dough, leaving a 1cm border. Top with torn fresh mozzarella chunks.',
        'Bake for 10-12 minutes until crust is charred and cheese is bubbling. Garnish immediately with fresh basil leaves and a drizzle of olive oil.'
      ],
      tags: ['Italian', 'Pizza', 'Vegetarian', 'Baking', 'Classic']
    },
    fr: {
      title: 'Pizza Margherita Napolitaine Traditionnelle',
      description: 'La reine des pizzas italiennes : pâte croustillante, sauce tomate San Marzano, mozzarella fraîche fondante, basilic et huile d’olive vierge extra.',
      instructions: [
        'Préchauffez votre four au maximum (240°C à 260°C) avec une plaque de cuisson à l’intérieur.',
        'Écrasez les tomates pelées avec une pincée de sel, d’origan et 1 c. à soupe d’huile d’olive pour faire la sauce.',
        'Étalez la pâte à pizza sur du papier cuisson en formant un disque de 30 cm avec des bords légèrement surélevés.',
        'Étalez la sauce tomate sur la pâte et répartissez des morceaux de mozzarella fraîche bien égouttée.',
        'Enfournez 10 à 12 minutes jusqu’à ce que la pâte soit bien dorée et le fromage gratiné. Déposez les feuilles de basilic frais et un filet d’huile d’olive à la sortie du four.'
      ],
      tags: ['Italien', 'Pizza', 'Végétarien', 'Four', 'Classique']
    },
    de: {
      title: 'Neapolitanische Pizza Margherita',
      description: 'Klassische italienische Pizza mit fruchtiger San-Marzano-Tomatensauce, frischem Fior-di-Latte-Mozzarella, Olivenöl und frischem Basilikum.',
      instructions: [
        'Backofen mit Backblech auf höchster Stufe (240°C-260°C) vorheizen.',
        'Tomaten mit einer Prise Salz, Oregano und 1 EL Olivenöl zu einer glatten Sauce pürieren.',
        'Pizzateig auf Backpapier zu einem runden Fladen mit leicht erhöhtem Rand formen.',
        'Mit Tomatensauce bestreichen und mit gezupftem frischem Mozzarella belegen.',
        '10-12 Minuten backen, bis der Rand knusprig gebräunt ist. Direkt mit frischem Basilikum und etwas Olivenöl vollenden.'
      ],
      tags: ['Italienisch', 'Pizza', 'Vegetarisch', 'Backen', 'Klassiker']
    },
    es: {
      title: 'Pizza Margarita Napolitana',
      description: 'Auténtica pizza italiana con salsa de tomate San Marzano, queso mozzarella fresco fundido, aceite de oliva virgen extra y albahaca fresca.',
      instructions: [
        'Precaliente el horno a máxima potencia (240°C-260°C) con la bandeja dentro.',
        'Triture los tomates con sal, orégano y una cucharada de aceite de oliva.',
        'Estire la masa de pizza sobre papel de hornear dejando el borde ligeramente más grueso.',
        'Extienda la salsa de tomate y reparta trozos de mozzarella fresca bien escurrida.',
        'Hornee durante 10-12 minutos hasta que la masa esté crujiente y el queso dorado. Añada hojas de albahaca fresca y un hilo de aceite de oliva.'
      ],
      tags: ['Italiano', 'Pizza', 'Vegetariano', 'Horno', 'Clásico']
    },
    pt: {
      title: 'Pizza Margherita Napolitana',
      description: 'Clássica pizza artesanal italiana com polpa de tomate San Marzano, mozzarella fresca derretida, azeite virgem extra e manjericão fresco.',
      instructions: [
        'Pré-aqueça o forno na temperatura máxima (240°C-260°C) com o tabuleiro lá dentro.',
        'Triture os tomates pelados com uma pitada de sal, orégãos e 1 colher de azeite.',
        'Estenda a massa de pizza sobre papel vegetal formando uma borda ligeiramente saliente.',
        'Espalhe o molho de tomate e distribua pedaços de mozzarella fresca escorrida.',
        'Asse durante 10 a 12 minutos até a massa ficar crocante e dourada. Decore de imediato com folhas de manjericão fresco e um fio de azeite.'
      ],
      tags: ['Italiano', 'Pizza', 'Vegetariano', 'Forno', 'Clássico']
    }
  },

  'rec-penne-arrabbiata': {
    en: {
      title: 'Spicy Roman Penne all’Arrabbiata',
      description: 'Fiery Roman pasta tossed in a rich garlic, crushed red chili, sweet tomato sauce, extra virgin olive oil, and fresh Italian parsley.',
      instructions: [
        'Boil penne rigate in salted water until al dente (10 mins).',
        'In a wide skillet, heat 3 tbsp olive oil over medium-low heat with sliced garlic and crushed chili flakes. Sauté gently until fragrant without burning.',
        'Add crushed tomatoes and salt. Simmer for 15 minutes to allow flavors to intensify.',
        'Toss hot drained penne directly in the spicy sauce with chopped flat-leaf parsley.',
        'Serve with freshly grated Pecorino Romano or Parmesan.'
      ],
      tags: ['Italian', 'Pasta', 'Spicy', 'Vegetarian', 'Quick']
    },
    fr: {
      title: 'Penne all’Arrabbiata Épicées à la Romaine',
      description: 'Plat de pâtes romaines relevé d’une sauce tomate mijotée à l’ail doré, piment rouge, huile d’olive et persil plat frais.',
      instructions: [
        'Faites cuire les penne dans une grande casserole d’eau bouillante salée jusqu’à ce qu’elles soient al dente (10 min).',
        'Dans une poêle, faites chauffer l’huile d’olive à feu doux avec l’ail émincé et le piment rouge. Faites suer sans faire brûler.',
        'Ajoutez la pulpe de tomates et le sel. Laissez mijoter 15 minutes pour concentrer les arômes.',
        'Versez les penne égouttées directement dans la sauce piquante avec le persil plat haché et mélangez bien.',
        'Servez chaud avec un peu de Pecorino Romano ou parmesan râpé.'
      ],
      tags: ['Italien', 'Pâtes', 'Épicé', 'Végétarien', 'Rapide']
    },
    de: {
      title: 'Pikante Penne all’Arrabbiata',
      description: 'Feurige römische Pasta in pikanter Sauce aus sonnengereiften Tomaten, geröstetem Knoblauch, Chilischoten und glatter Petersilie.',
      instructions: [
        'Penne in reichlich kochendem Salzwasser al dente kochen (10 Min.).',
        'Olivenöl in einer Pfanne sanft erhitzen, Knoblauch und gehackte Chilis darin 2 Minuten aromatisch anbraten.',
        'Gehackte Tomaten und Salz zugeben. 15 Minuten sanft einköcheln lassen.',
        'Abgetropfte Penne mit gehackter Petersilie direkt in die Sauce geben und 1 Minute durchschwenken.',
        'Mit geriebenem Pecorino oder Parmesan servieren.'
      ],
      tags: ['Italienisch', 'Pasta', 'Scharf', 'Vegetarisch', 'Schnell']
    },
    es: {
      title: 'Penne all’Arrabbiata Picante',
      description: 'Pasta romana con carácter en salsa de tomate cocinada con ajo dorado, guindilla roja picante, aceite de oliva virgen y perejil fresco.',
      instructions: [
        'Cueza los penne en agua hirviendo con sal hasta que queden al dente (10 min).',
        'Caliente el aceite de oliva en una sartén con el ajo laminado y la guindilla picada a fuego suave durante 2 minutos.',
        'Incorpore el tomate triturado y la sal. Deje reducir 15 minutos.',
        'Añada la pasta escurrida a la salsa junto con el perejil fresco picado y mezcle.',
        'Sirva con queso Pecorino o Parmesano rallado.'
      ],
      tags: ['Italiano', 'Pasta', 'Picante', 'Vegetariano', 'Rápido']
    },
    pt: {
      title: 'Penne all’Arrabbiata Picante',
      description: 'Receita tradicional romana de massa em molho de tomate aromático com alho dourado, malagueta picante e salsa fresca picada.',
      instructions: [
        'Coza o penne em água com sal até ficar al dente (10 min).',
        'Aqueça o azeite numa frigideira com o alho fatiado e a malagueta picada em lume brando durante 2 minutos.',
        'Junte a polpa de tomate e o sal. Deixe apurar em lume brando durante 15 minutos.',
        'Adicione a massa escorrida ao molho com a salsa picada e envolva bem.',
        'Sirva com queijo Pecorino ou Parmesão ralado na hora.'
      ],
      tags: ['Italiano', 'Massa', 'Picante', 'Vegetariano', 'Rápido']
    }
  },

  'rec-tiramisu-classico': {
    en: {
      title: 'Authentic Venetian Tiramisù Classico',
      description: 'Decadent no-bake Italian dessert with espresso-dipped Savoiardi ladyfingers, rich mascarpone cream, and dusted bitter cocoa.',
      instructions: [
        'Separate eggs. Whisk egg yolks with sugar until pale and fluffy (3 mins). Beat in mascarpone cheese until silky smooth.',
        'In a separate bowl, whip egg whites with a pinch of salt until stiff peaks form. Gently fold whites into the mascarpone mixture.',
        'Quickly dip ladyfingers into strong brewed espresso and arrange in a single layer in a serving dish.',
        'Spread half of the mascarpone cream over the biscuits. Repeat with a second layer of soaked ladyfingers and remaining cream.',
        'Refrigerate for at least 4 hours (or overnight). Dust generously with unsweetened cocoa powder before serving.'
      ],
      tags: ['Italian', 'Dessert', 'No-Bake', 'Coffee', 'Sweet', 'Classic']
    },
    fr: {
      title: 'Tiramisù Vénitien Traditionnel',
      description: 'L’incontournable dessert italien sans cuisson : biscuits Savoiardi imbibés de café serré, crème onctueuse au mascarpone et voile de cacao amer.',
      instructions: [
        'Séparez les blancs des jaunes d’œufs. Fouettez les jaunes avec le sucre jusqu’à ce que le mélange blanchisse (3 min). Incorporez le mascarpone jusqu’à consistance lisse.',
        'Montez les blancs en neige ferme avec une pincée de sel. Incorporez-les délicatement à la crème de mascarpone à la spatule.',
        'Trempez rapidement les biscuits à la cuillère dans le café expresso fort et tapissez le fond d’un plat.',
        'Étalez la moitié de la crème au mascarpone. Renouvelez avec une seconde couche de biscuits imbibés et le reste de crème.',
        'Placez au réfrigérateur pendant au moins 4 heures (idéalement toute la nuit). Saupoudrez généreusement de cacao amer avant de servir.'
      ],
      tags: ['Italien', 'Dessert', 'Sans Cuisson', 'Café', 'Gourmand', 'Classique']
    },
    de: {
      title: 'Klassisches Venezianisches Tiramisù',
      description: 'Italienisches Schichtdessert mit in Espresso getränkten Löffelbiskuits, samtiger Mascarponecreme und edlem ungesüßtem Kakaopulver.',
      instructions: [
        'Eier trennen. Eigelb mit Zucker cremig weiß aufschlagen (3 Min.). Mascarpone unterrühren, bis eine glatte Creme entsteht.',
        'Eiweiß mit einer Prise Salz steif schlagen und vorsichtig unter die Mascarponemasse heben.',
        'Löffelbiskuits kurz in Espresso tauchen und den Boden einer Form damit auslegen.',
        'Die Hälfte der Mascarponecreme darauf verstreichen. Eine zweite Schicht getränkte Biskuits und restliche Creme aufbringen.',
        'Mindestens 4 Stunden (am besten über Nacht) kühlen. Vor dem Servieren reichlich mit Kakaopulver bestäuben.'
      ],
      tags: ['Italienisch', 'Dessert', 'Kaffee', 'Süß', 'Klassiker']
    },
    es: {
      title: 'Tiramisú Clásico Italiano',
      description: 'El postre italiano por excelencia sin horno: bizcochos de soletilla empapados en café espresso, suave crema de mascarpone y cacao puro.',
      instructions: [
        'Separe las claras de las yemas. Bata las yemas con el azúcar hasta que blanqueen (3 min). Incorpore el queso mascarpone hasta obtener una crema lisa.',
        'Monte las claras a punto de nieve con una pizca de sal. Intégrelas suavemente en la crema de mascarpone con movimientos envolventes.',
        'Moje los bizcochos rápidamente en el café espresso y colóquelos en la base de una fuente.',
        'Cubra con la mitad de la crema de mascarpone. Repita con otra capa de bizcochos y termine con la crema restante.',
        'Refrigere al menos 4 horas (o toda la noche). Espolvoree con abundante cacao puro antes de servir.'
      ],
      tags: ['Italiano', 'Postre', 'Café', 'Sin Horno', 'Dulce', 'Clásico']
    },
    pt: {
      title: 'Tiramisù Clássico Italiano',
      description: 'A mais famosa sobremesa italiana sem forno: palitos La Reine embebidos em café expresso, creme aveludado de mascarpone e cacau amargo.',
      instructions: [
        'Separe as gemas das claras. Bata as gemas com o açúcar até obter um creme claro (3 min). Junte o queijo mascarpone e envolva bem.',
        'Bata as claras em castelo firme com uma pitada de sal. Envolva suavemente no creme de mascarpone.',
        'Passe os palitos La Reine rapidamente pelo café expresso forte e disponha no fundo de uma travessa.',
        'Cubra com metade do creme. Repita com outra camada de palitos embebidos e termine com o restante creme.',
        'Leve ao frigorífico durante pelo menos 4 horas (ou de um dia para o outro). Polvilhe com cacau em pó puro antes de servir.'
      ],
      tags: ['Italiano', 'Sobremesa', 'Café', 'Sem Forno', 'Doce', 'Clássico']
    }
  },

  'rec-panzanella-salad': {
    en: {
      title: 'Tuscan Summer Panzanella Bread Salad',
      description: 'Refreshing Tuscan rustic salad with toasted crusty bread cubes soaked in juicy ripe tomatoes, English cucumber, red onions, fresh basil, and red wine vinaigrette.',
      instructions: [
        'Tear or cube stale artisan bread. Toast in oven or skillet with 1 tbsp olive oil until crunchy.',
        'Chop ripe vine tomatoes and place in a large salad bowl with their juices. Season with salt to extract sweet juices.',
        'Add diced cucumber, thinly sliced red onion, and toasted bread cubes to the bowl.',
        'Whisk extra virgin olive oil, red wine vinegar, black pepper, and salt; pour over salad and toss well.',
        'Let sit for 15 minutes so the bread absorbs the juices. Fold in torn fresh basil leaves just before serving.'
      ],
      tags: ['Italian', 'Salad', 'Tuscan', 'Vegetarian', 'Quick', 'Summer']
    },
    fr: {
      title: 'Panzanella Salade Toscane au Pain Doré',
      description: 'Salade estivale toscane au pain croustillant imbibé du jus de tomates mûres, concombre frais, oignon rouge, basilic et vinaigre de vin.',
      instructions: [
        'Coupez le pain rassis en gros croûtons. Faites-les dorer à la poêle ou au four avec 1 c. à soupe d’huile d’olive.',
        'Coupez les tomates en morceaux au-dessus d’un saladier pour recueillir tout leur jus. Salez pour faire dégorger.',
        'Ajoutez le concombre en dés, l’oignon rouge émincé et les croûtons de pain dorés.',
        'Émulsionnez l’huile d’olive, le vinaigre de vin rouge, le sel et le poivre ; arrosez la salade et mélangez généreusement.',
        'Laissez reposer 15 minutes pour que le pain s’imprègne des saveurs. Incorporez les feuilles de basilic frais au moment de servir.'
      ],
      tags: ['Italien', 'Salade', 'Toscan', 'Végétarien', 'Frais', 'Été']
    },
    de: {
      title: 'Toskanischer Brotsalat (Panzanella)',
      description: 'Erfrischender toskanischer Sommersalat mit gerösteten Brotwürfeln, reifen Tomaten, Gurke, roten Zwiebeln, frischem Basilikum und Vinaigrette.',
      instructions: [
        'Brot in mundgerechte Stücke schneiden und mit 1 EL Olivenöl in einer Pfanne knusprig anrösten.',
        'Tomaten würfeln und den Saft in einer großen Schüssel auffangen. Mit etwas Salz bestreuen.',
        'Gurkenwürfel, fein geschnittene rote Zwiebeln und die Brotwürfel zugeben.',
        'Aus Olivenöl, Rotweinessig, Salz und Pfeffer ein Dressing rühren und über den Salat geben.',
        '15 Minuten ziehen lassen, damit das Brot die Aromen aufnimmt. Vor dem Servieren frisches Basilikum untermengen.'
      ],
      tags: ['Italienisch', 'Salat', 'Toskana', 'Vegetarisch', 'Sommer']
    },
    es: {
      title: 'Panzanella Ensalada Toscana de Pan',
      description: 'Refrescante ensalada rústica de la Toscana con dados de pan tostado empapados en jugo de tomates maduros, pepino, cebolla roja y albahaca fresca.',
      instructions: [
        'Corte el pan en dados y tuéstelos en una sartén con una cucharada de aceite de oliva.',
        'Trocee los tomates en un bol grande conservando todo su jugo. Añada sal.',
        'Incorpore el pepino troceado, la cebolla roja en juliana fina y el pan tostado.',
        'Aliñe con aceite de oliva virgen extra, vinagre de vino tinto, sal y pimienta negra.',
        'Deje reposar 15 minutos para que el pan absorba los jugos. Añada albahaca fresca antes de servir.'
      ],
      tags: ['Italiano', 'Ensalada', 'Toscano', 'Vegetariano', 'Fresco', 'Verano']
    },
    pt: {
      title: 'Panzanella Salada Toscana de Pão',
      description: 'Fresca e estival salada tradicional da Toscana com cubos de pão crocante embebidos no sumo de tomates maduros, pepino, cebola roxa e manjericão.',
      instructions: [
        'Corte o pão em cubos e toste numa frigideira com 1 colher de azeite até ficar crocante.',
        'Corte os tomates para uma taça grande aproveitando todo o sumo. Tempere com sal.',
        'Junte o pepino em cubos, a cebola roxa em fatias finas e os cubos de pão torrado.',
        'Tempere com azeite virgem extra, vinagre de vinho tinto, sal e pimenta.',
        'Deixe repousar 15 minutos para o pão absorver os sucos. Adicione folhas de manjericão fresco na hora de servir.'
      ],
      tags: ['Italiano', 'Salada', 'Toscano', 'Vegetariano', 'Fresco', 'Verão']
    }
  },
  'rec-tiramisu': {
    en: {
      title: 'Authentic Italian Tiramisu',
      description: 'The definitive Italian no-bake dessert: delicate ladyfinger biscuits dipped in espresso, layered with luscious mascarpone cream, and dusted with dark cocoa.',
      instructions: [
        'Separate 3 eggs. In a mixing bowl, whisk the egg yolks with granulated sugar and vanilla extract until thick and pale yellow.',
        'Gently fold in the mascarpone cheese with a spatula until completely smooth and velvety.',
        'In another clean bowl, whip the egg whites with a pinch of salt until soft peaks form, then gently fold into the mascarpone cream.',
        'Dip the ladyfinger biscuits briefly into cold brewed coffee/espresso (do not over-soak).',
        'Arrange a single layer of soaked ladyfingers in a serving dish, spread half the mascarpone cream over, and repeat with a second layer.',
        'Refrigerate for at least 2 hours. Dust generously with unsweetened dark cocoa powder right before serving.'
      ],
      tags: ['Italian', 'Italy', 'Dessert', 'No-Bake', 'Coffee', 'Classic']
    },
    fr: {
      title: 'Tiramisu Traditionnel Italien',
      description: 'Le grand classique italien sans cuisson : délicats biscuits à la cuillère trempés dans le café, superposés avec une onctueuse crème au mascarpone, saupoudrés de cacao noir.',
      instructions: [
        'Séparez 3 œufs. Dans un saladier, fouettez les jaunes avec le sucre et l’extrait de vanille jusqu’à obtenir un mélange épais et pâle.',
        'Incorporez délicatement le mascarpone à la spatule jusqu’à obtenir une texture lisse et veloutée.',
        'Dans un autre saladier propre, montez les blancs en neige souple avec une pincée de sel, puis incorporez-les délicatement à la crème de mascarpone.',
        'Trempez rapidement les biscuits à la cuillère dans le café froid (ne pas trop les imbiber).',
        'Disposez une couche de biscuits imbibés dans un plat, étalez la moitié de la crème par-dessus, puis répétez avec une seconde couche.',
        'Réfrigérez au moins 2 heures. Saupoudrez généreusement de cacao noir non sucré juste avant de servir.'
      ],
      tags: ['Italien', 'Italie', 'Dessert', 'Sans Cuisson', 'Café', 'Classique']
    },
    de: {
      title: 'Original Italienisches Tiramisu',
      description: 'Der italienische Klassiker ohne Backen: zarte Löffelbiskuits in Espresso getaucht, geschichtet mit cremiger Mascarpone-Creme und mit dunklem Kakao bestäubt.',
      instructions: [
        '3 Eier trennen. In einer Schüssel das Eigelb mit Zucker und Vanilleextrakt schaumig und hell aufschlagen.',
        'Den Mascarpone vorsichtig mit einem Spatel unterheben, bis eine glatte, samtige Masse entsteht.',
        'In einer anderen sauberen Schüssel das Eiweiß mit einer Prise Salz zu weichen Spitzen schlagen, dann vorsichtig unter die Mascarpone-Creme heben.',
        'Die Löffelbiskuits kurz in kalten Kaffee/Espresso tauchen (nicht zu stark tränken).',
        'Eine Schicht getränkter Löffelbiskuits in eine Servierschale legen, die Hälfte der Creme darauf verteilen und eine zweite Schicht wiederholen.',
        'Mindestens 2 Stunden kühlen. Kurz vor dem Servieren großzügig mit ungesüßtem dunklem Kakaopulver bestäuben.'
      ],
      tags: ['Italienisch', 'Italien', 'Dessert', 'Ohne Backen', 'Kaffee', 'Klassiker']
    },
    es: {
      title: 'Tiramisú Tradicional Italiano',
      description: 'El definitivo postre italiano sin horno: delicados bizcochos de soletilla remojados en café espresso, en capas con una deliciosa crema de mascarpone y espolvoreados con cacao negro.',
      instructions: [
        'Separe 3 huevos. En un bol, bata las yemas con el azúcar y el extracto de vainilla hasta obtener una mezcla espesa y pálida.',
        'Incorpore con delicadeza el queso mascarpone con una espátula hasta lograr una textura lisa y aterciopelada.',
        'En otro bol limpio, monte las claras con una pizca de sal a punto de nieve suave y luego incorpórelas con delicadeza a la crema de mascarpone.',
        'Sumerja brevemente los bizcochos de soletilla en café frío recién hecho (sin empaparlos demasiado).',
        'Coloque una capa de bizcochos remojados en una fuente, extienda la mitad de la crema de mascarpone encima y repita con una segunda capa.',
        'Refrigere al menos 2 horas. Espolvoree generosamente con cacao negro sin azúcar justo antes de servir.'
      ],
      tags: ['Italiano', 'Italia', 'Postre', 'Sin Horno', 'Café', 'Clásico']
    },
    pt: {
      title: 'Tiramisù Tradicional Italiano',
      description: 'A verdadeira sobremesa italiana sem forno: delicados biscoitos champanhe embebidos em café, dispostos em camadas com um creme suave de mascarpone e polvilhados com cacau escuro.',
      instructions: [
        'Separe 3 ovos. Numa tigela, bata as gemas com o açúcar e o extrato de baunilha até obter uma mistura espessa e clara.',
        'Incorpore delicadamente o mascarpone com uma espátula até obter uma textura lisa e aveludada.',
        'Noutra tigela limpa, bata as claras com uma pitada de sal em picos suaves e incorpore-as delicadamente ao creme de mascarpone.',
        'Mergulhe rapidamente os biscoitos champanhe em café frio (sem os encharcar demasiado).',
        'Disponha uma camada de biscoitos embebidos num recipiente, espalhe metade do creme por cima e repita com uma segunda camada.',
        'Leve ao frigorífico pelo menos 2 horas. Polvilhe generosamente com cacau escuro sem açúcar mesmo antes de servir.'
      ],
      tags: ['Italiano', 'Itália', 'Sobremesa', 'Sem Forno', 'Café', 'Clássico']
    }
  }
};
