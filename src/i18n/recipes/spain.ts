import { SupportedLanguage } from '../translations';
import { LocalizedRecipeContent } from '../recipeTranslations';

export const SPAIN_RECIPE_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedRecipeContent>> = {
  'rec-paella-valenciana': {
    en: {
      title: 'Traditional Valencian Seafood & Chicken Paella',
      description: 'The world-famous Spanish rice specialty with tender chicken pieces, succulent king prawns, sweet bell peppers, saffron broth, and crispy golden socarrat.',
      instructions: [
        'In a wide, shallow paella pan, heat 3 tbsp extra virgin olive oil over medium-high heat. Brown chicken chunks until golden (6 mins).',
        'Add diced onions, red bell pepper, and minced garlic; sauté for 4 minutes. Stir in crushed tomatoes, sweet smoked paprika, and saffron threads.',
        'Scatter Bomba rice evenly across the pan; toast for 1-2 minutes without stirring.',
        'Pour in warm chicken broth and bring to a lively boil for 10 minutes. Reduce heat to medium-low, arrange peeled shrimp across the top, and simmer undisturbed for 10 more minutes.',
        'Cook on high heat for final 2 minutes without stirring to develop the prized crunchy bottom rice crust (socarrat). Rest 5 minutes, garnish with lemon wedges.'
      ],
      tags: ['Spanish', 'Spain', 'Paella', 'Rice', 'Seafood', 'Chicken', 'Classic']
    },
    fr: {
      title: 'Paella Valencienne Traditionnelle Poulet et Gambas',
      description: 'Le chef-d’œuvre de la cuisine espagnole : riz Bomba parfumé au safran pur, morceaux de poulet dorés, crevettes royales, poivrons et socarrat croustillant.',
      instructions: [
        'Dans une grande poêle à paella, faites chauffer l’huile d’olive à feu vif. Faites dorer les morceaux de poulet (6 min).',
        'Ajoutez les oignons, les poivrons rouges et l’ail haché ; faites revenir 4 minutes. Incorporez le coulis de tomates, le paprika fumé et les filaments de safran.',
        'Versez le riz Bomba en pluie et nacrez-le 2 minutes sans remuer excessivement.',
        'Mouillez avec le bouillon de volaille chaud et laissez bouillir vivement 10 minutes. Baissez le feu, disposez les crevettes sur le dessus et laissez cuire sans remuer 10 minutes supplémentaires.',
        'Augmentez le feu les 2 dernières minutes pour former la fameuse croûte dorée croustillante au fond du plat (le socarrat). Laissez reposer 5 minutes avant de servir avec des quartiers de citron.'
      ],
      tags: ['Espagnol', 'Espagne', 'Paella', 'Riz', 'Fruits de mer', 'Poulet', 'Classique']
    },
    de: {
      title: 'Traditionelle Valencianische Paella mit Meeresfrüchten',
      description: 'Das weltberühmte spanische Reisgericht mit Safran, gebratenen Hähnchenstücken, Garnelen, Paprika und der typisch knusprigen Reiskruste (Socarrat).',
      instructions: [
        'Olivenöl in einer Paella-Pfanne erhitzen und Hähnchenfleisch 6 Minuten goldbraun anbraten.',
        'Zwiebeln, Paprika und Knoblauch zugeben und 4 Minuten anbraten. Tomaten, geräuchertes Paprikapulver und Safranfäden einrühren.',
        'Bomba-Reis gleichmäßig einstreuen und 2 Minuten anrösten.',
        'Mit heißer Hühnerbrühe aufgießen und 10 Minuten kräftig kochen lassen. Hitze reduzieren, Garnelen auflegen und ohne Umrühren 10 Minuten sanft garen.',
        'Die letzten 2 Minuten auf hoher Hitze die knusprige Kruste am Boden (Socarrat) entstehen lassen. 5 Minuten ruhen lassen und mit Zitrone servieren.'
      ],
      tags: ['Spanisch', 'Spanien', 'Paella', 'Reis', 'Meeresfrüchte', 'Klassiker']
    },
    es: {
      title: 'Paella Valenciana Tradicional con Pollo y Gambas',
      description: 'El plato más representativo de la gastronomía española: arroz Bomba al azafrán con trozos de pollo dorado, gambas, pimiento y su auténtico socarrat.',
      instructions: [
        'En una paellera con aceite de oliva virgen extra, dore los trozos de pollo a fuego vivo durante 6 minutos.',
        'Añada la cebolla, el pimiento rojo y el ajo picado; sofría 4 minutos. Incorpore el tomate triturado, el pimentón dulce y las hebras de azafrán.',
        'Distribuya el arroz Bomba por toda la paellera y nacárelo durante 2 minutos.',
        'Vierta el caldo de pollo caliente y cocine a fuego vivo 10 minutos. Baje el fuego, coloque las gambas por encima y cocine sin remover 10 minutos más.',
        'Suba el fuego los últimos 2 minutos para conseguir un socarrat perfecto en el fondo. Deje reposar 5 minutos con gajos de limón.'
      ],
      tags: ['Español', 'España', 'Paella', 'Arroz', 'Marisco', 'Pollo', 'Clásico']
    },
    pt: {
      title: 'Paella Valenciana Tradicional de Frango e Camarão',
      description: 'A mundialmente famosa especialidade espanhola com arroz Bomba, açafrão puro, frango dourado, camarões suculentos, pimentos e socarrat estaladiço.',
      instructions: [
        'Numa paelheira, aqueça o azeite virgem extra e doure os pedaços de frango durante 6 minutos.',
        'Junte a cebola, o pimento vermelho e o alho picado; refogue 4 minutos. Adicione a polpa de tomate, o pimentão doce e os fios de açafrão.',
        'Espalhe o arroz Bomba e toste durante 2 minutos sem mexer.',
        'Regue com o caldo de galinha quente e ferva em lume forte durante 10 minutos. Reduza o lume, disponha os camarões por cima e cozinhe mais 10 minutos.',
        'Aumente o lume nos últimos 2 minutos para formar a crocante crosta de arroz no fundo (socarrat). Deixe repousar 5 minutos com gomos de limão.'
      ],
      tags: ['Espanhol', 'Espanha', 'Paella', 'Arroz', 'Marisco', 'Frango', 'Clássico']
    }
  },

  'rec-tortilla-espanola': {
    en: {
      title: 'Authentic Spanish Potato Omelette (Tortilla de Patatas)',
      description: 'The golden crown of Spanish tapas: tender olive-oil-poached sliced potatoes and sweet caramelized onions bound in creamy beaten eggs.',
      instructions: [
        'Peel potatoes and cut into 3mm thin slices. Thinly slice yellow onion.',
        'Heat 4 tbsp extra virgin olive oil in a non-stick skillet. Poach potatoes and onions gently over medium-low heat until completely soft and tender without browning (15 mins).',
        'Beat large eggs in a bowl with sea salt. Drain excess oil from potatoes and fold warm potatoes and onions directly into beaten eggs; let sit 5 mins.',
        'Return 1 tbsp oil to the pan over medium heat. Pour in egg-potato mixture; cook for 4-5 minutes while smoothing the edges with a spatula.',
        'Place a flat plate over the pan, confidently flip the tortilla over, and slide back into the pan to cook the second side for 3 minutes for a juicy center (jugosa).'
      ],
      tags: ['Spanish', 'Tapas', 'Eggs', 'Potatoes', 'Vegetarian', 'Classic', 'Gluten-Free']
    },
    fr: {
      title: 'Véritable Tortilla de Patatas Espagnole',
      description: 'L’incontournable omelette espagnole : pommes de terre fondantes confites à l’huile d’olive et oignons doux, liées par des œufs frais battus.',
      instructions: [
        'Épluchez les pommes de terre et taillez-les en fines lamelles de 3 mm. Émincez l’oignon jaune.',
        'Faites confire doucement les pommes de terre et les oignons dans l’huile d’olive à feu moyen-doux pendant 15 minutes sans les faire dorer.',
        'Battez les œufs dans un grand saladier avec le sel. Égouttez les pommes de terre et versez-les chaudes dans les œufs battus ; laissez reposer 5 minutes.',
        'Chauffez une poêle antiadhésive avec un filet d’huile. Versez le mélange et faites cuire 4 à 5 minutes en arrondissant les bords à la spatule.',
        'Posez une grande assiette plate sur la poêle, retournez d’un coup sec la tortilla et faites cuire l’autre face pendant 3 minutes pour la garder fondante à cœur (jugosa).'
      ],
      tags: ['Espagnol', 'Tapas', 'Œufs', 'Pommes de terre', 'Végétarien', 'Classique']
    },
    de: {
      title: 'Spanische Tortilla de Patatas (Kartoffel-Omelett)',
      description: 'Der spanische Tapas-Klassiker: In bestem Olivenöl sanft gegarte Kartoffelscheiben und Zwiebeln, saftig mit frischen Eiern gebraten.',
      instructions: [
        'Kartoffeln schälen und in 3 mm dünne Scheiben schneiden. Zwiebel in feine Streifen schneiden.',
        'Kartoffeln und Zwiebeln in reichlich Olivenöl bei mittlerer Hitze 15 Minuten sanft weich garen (nicht bräunen).',
        'Eier mit Salz in einer Schüssel verquirlen. Warme Kartoffeln und Zwiebeln abtropfen lassen und 5 Minuten in den Eiern ziehen lassen.',
        'Etwas Öl in einer Pfanne erhitzen, die Masse hineingeben und 4-5 Minuten stocken lassen, dabei die Ränder abrunden.',
        'Mit einem flachen Teller wenden und von der zweiten Seite 3 Minuten sanft fertig backen, sodass der Kern herrlich saftig bleibt.'
      ],
      tags: ['Spanisch', 'Tapas', 'Eier', 'Kartoffeln', 'Vegetarisch', 'Klassiker']
    },
    es: {
      title: 'Tortilla de Patatas Tradicional Española con Cebolla',
      description: 'El emblema indiscutible de las tapas: patatas pochadas lentamente en aceite de oliva virgen extra y cebolla caramelizada, cuajadas al punto jugoso.',
      instructions: [
        'Pele las patatas y córtelas en láminas finas (3 mm). Pique la cebolla en juliana fina.',
        'Poche las patatas y la cebolla en abundante aceite de oliva a fuego suave durante 15 minutos hasta que estén tiernas.',
        'Bata los huevos en un bol grande con sal marina. Escurra las patatas y mézclelas calientes con el huevo; deje reposar 5 minutos.',
        'Caliente una sartén antiadherente con unas gotas de aceite. Vierta la mezcla y cocine 4-5 minutos redondeando los bordes con una espátula.',
        'Coloque un plato llano sobre la sartén, dele la vuelta con decisión y deslice la tortilla para dorar el otro lado durante 3 minutos dejando el centro jugoso.'
      ],
      tags: ['Español', 'Tapas', 'Huevos', 'Patatas', 'Vegetariano', 'Clásico', 'Jugosa']
    },
    pt: {
      title: 'Tortilla de Batatas Tradicional Espanhola',
      description: 'A rainha das tapas espanholas: fatias de batata e cebola confitadas suavemente em azeite virgem extra, envolvidas em ovos frescos e cremosos.',
      instructions: [
        'Descasque as batatas e corte em lâminas finas (3 mm). Corte a cebola em meias-luas.',
        'Confite as batatas e a cebola em azeite abundante em lume brando durante 15 minutos até ficarem bem macias.',
        'Bata os ovos numa taça com sal marinho. Escorra as batatas e junte-as quentes aos ovos; deixe repousar 5 minutos.',
        'Aqueça uma frigideira antiaderente com um fio de azeite. Verta o preparado e cozinhe 4 a 5 minutos moldando os bordos com uma espátula.',
        'Coloque um prato raso por cima da frigideira, vire a tortilla com firmeza e deslize-a de volta para cozinhar o outro lado por 3 minutos mantendo o interior suculento.'
      ],
      tags: ['Espanhol', 'Tapas', 'Ovos', 'Batatas', 'Vegetariano', 'Clássico']
    }
  },

  'rec-gazpacho-andaluz': {
    en: {
      title: 'Chilled Andalusian Gazpacho Soup',
      description: 'Refreshing cold Spanish soup blended from vine-ripened tomatoes, sweet peppers, cucumber, garlic, artisan bread, and sherry vinegar.',
      instructions: [
        'Chop ripe vine tomatoes, peeled cucumber, and green bell pepper into large chunks.',
        'Tear crustless white bread and soak in 2 tbsp water and 2 tbsp red wine or sherry vinegar.',
        'Place chopped vegetables, soaked bread, and peeled garlic cloves in a blender. Blend on high speed until completely smooth.',
        'With the blender running on low, slowly stream in extra virgin olive oil to emulsify into a silky, pale-orange soup. Season with sea salt.',
        'Chill in the refrigerator for at least 2 hours. Serve icy cold in bowls topped with diced cucumber, tomatoes, and a swirl of olive oil.'
      ],
      tags: ['Spanish', 'Soup', 'Cold', 'Summer', 'Vegetarian', 'Vegan', 'Healthy']
    },
    fr: {
      title: 'Gaspacho Andalou Traditionnel Glacé',
      description: 'Soupe froide rafraîchissante du sud de l’Espagne : tomates mûres gorgées de soleil, concombre, poivron doux, ail, huile d’olive et vinaigre de Xérès.',
      instructions: [
        'Coupez en gros morceaux les tomates bien mûres, le concombre pelé et le poivron vert.',
        'Faites tremper le pain de mie dans un peu d’eau et le vinaigre de vin ou Xérès.',
        'Placez tous les légumes, le pain imbibé et la gousse d’ail dans le bol d’un blender. Mixez à puissance maximale jusqu’à texture très fine.',
        'Versez l’huile d’olive vierge extra en filet tout en continuant de mixer pour créer une émulsion soyeuse et veloutée. Salez.',
        'Placez au réfrigérateur pendant au moins 2 heures. Servez bien glacé avec une brunoise de concombre et un filet d’huile d’olive.'
      ],
      tags: ['Espagnol', 'Soupe Froide', 'Été', 'Végétarien', 'Rafraîchissant', 'Léger']
    },
    de: {
      title: 'Eiskalte Andalusische Gazpacho',
      description: 'Erfrischende spanische kalte Gemüsesuppe aus sonnengereiften Tomaten, Gurke, Paprika, Knoblauch, Weißbrot und feinstem Olivenöl.',
      instructions: [
        'Reife Tomaten, geschälte Gurke und grüne Paprika grob schneiden.',
        'Weißbrot in etwas Wasser und Rotweinessig oder Sherryessig einweichen.',
        'Gemüse, eingeweichtes Brot und Knoblauch in einen Standmixer geben und fein pürieren.',
        'Bei laufendem Mixer das Olivenöl langsam einfließen lassen, bis eine samtige Emulsion entsteht. Mit Salz abschmecken.',
        'Mindestens 2 Stunden eiskalt kühlen. Mit feinen Gurken- und Tomatenwürfeln garniert servieren.'
      ],
      tags: ['Spanisch', 'Suppe', 'Kalt', 'Sommer', 'Vegetarisch', 'Vegan']
    },
    es: {
      title: 'Gazpacho Andaluz Tradicional Fresco',
      description: 'La sopa fría más refrescante del verano andaluz: tomates maduros, pepino, pimiento verde, ajo, pan, aceite de oliva virgen extra y vinagre de Jerez.',
      instructions: [
        'Trocee los tomates maduros, el pepino pelado y el pimiento verde.',
        'Remoje el pan en agua y vinagre de Jerez o vino tinto.',
        'Coloque las verduras, el pan remojado y el ajo en la batidora o robot de cocina. Triture a máxima potencia hasta que quede muy fino.',
        'Añada el aceite de oliva virgen extra en hilo continuo mientras bate para emulsionar la sopa y sazone con sal.',
        'Refrigere durante al menos 2 horas. Sirva muy frío acompañado de tropezones de pepino y tomate con un hilo de aceite.'
      ],
      tags: ['Español', 'Sopa Fría', 'Andalucía', 'Verano', 'Vegetariano', 'Saludable']
    },
    pt: {
      title: 'Gaspacho Andaluz Tradicional Fresco',
      description: 'A mais refrescante sopa fria ibérica: tomates maduros, pepino fresco, pimento verde, alho, azeite virgem extra e vinagre de Xerez.',
      instructions: [
        'Corte os tomates maduros, o pepino descascado e o pimento verde em pedaços.',
        'Demolhe o pão em água e vinagre de vinho tinto ou Xerez.',
        'Coloque os legumes, o pão e o dente de alho no liquidificador. Triture até obter uma textura bem aveludada.',
        'Com o liquidificador a funcionar, deite o azeite em fio para emulsionar e tempere com sal.',
        'Leve ao frigorífico durante pelo menos 2 horas. Sirva bem fresco com cubinhos de pepino e tomate.'
      ],
      tags: ['Espanhol', 'Sopa Fria', 'Verão', 'Vegetariano', 'Saudável']
    }
  },

  'rec-patatas-bravas': {
    en: {
      title: 'Crispy Spanish Patatas Bravas with Spicy Sauce',
      description: 'Crisp, golden fried potato cubes drizzled with fiery smoked paprika bravas sauce and creamy garlic mayonnaise (alioli).',
      instructions: [
        'Peel potatoes and cut into 2.5cm bite-sized irregular chunks. Parboil in salted water for 5 minutes, then drain and let steam-dry.',
        'Make Bravas sauce: heat 2 tbsp olive oil in a small saucepan, stir in flour, hot smoked paprika, tomato paste, chicken or vegetable broth, and a splash of vinegar. Simmer 5 mins until thick.',
        'Heat sunflower oil in a deep pan to 180°C (350°F). Fry potato cubes in batches for 8 minutes until crisp and golden brown.',
        'Drain crispy potatoes on paper towels and toss with flaky sea salt.',
        'Pile hot potatoes on a platter, drizzle generously with warm spicy bravas sauce and cool garlic alioli mayonnaise.'
      ],
      tags: ['Spanish', 'Tapas', 'Potatoes', 'Spicy', 'Vegetarian', 'Quick']
    },
    fr: {
      title: 'Patatas Bravas Espagnoles Sauce Épicée et Aïoli',
      description: 'Dés de pommes de terre dorés et ultra croustillants nappés de sauce piquante au paprika fumé et de mayonnaise aillée crémeuse (aïoli).',
      instructions: [
        'Épluchez et coupez les pommes de terre en gros cubes de 2,5 cm. Précuisez-les 5 minutes dans l’eau bouillante salée puis égouttez.',
        'Préparez la sauce bravas : faites chauffer l’huile, ajoutez la farine, le paprika fumé piquant, le concentré de tomate, le bouillon et un trait de vinaigre. Laissez épaissir 5 minutes.',
        'Faites frire les cubes de pommes de terre dans l’huile chaude pendant 8 minutes jusqu’à ce qu’ils soient bien dorés et croustillants.',
        'Égouttez les pommes de terre sur du papier absorbant et salez généreusement.',
        'Dressez les pommes de terre bien chaudes, nappez de sauce bravas piquante et de mayonnaise aillée.'
      ],
      tags: ['Espagnol', 'Tapas', 'Pommes de terre', 'Épicé', 'Végétarien', 'Apéro']
    },
    de: {
      title: 'Spanische Patatas Bravas mit pikanter Sauce & Aioli',
      description: 'Knusprig frittierte Kartoffelwürfel mit feuriger geräucherter Paprikasauce (Salsa Brava) und cremiger Knoblauch-Mayonnaise (Aioli).',
      instructions: [
        'Kartoffeln schälen und in mundgerechte Stücke schneiden. 5 Minuten vorkochen und gut ausdampfen lassen.',
        'Bravas-Sauce: In einem Topf Olivenöl erhitzen, Mehl, scharfes geräuchertes Paprikapulver, Tomatenmark, Brühe und etwas Essig zu einer sämigen Sauce 5 Minuten einkochen.',
        'Kartoffelwürfel in heißem Öl 8 Minuten goldbraun und knusprig frittieren.',
        'Auf Küchenpapier abtropfen lassen und mit Meersalz bestreuen.',
        'Auf Tellern anrichten, mit der feurigen Bravas-Sauce und cremigem Aioli beträufeln.'
      ],
      tags: ['Spanisch', 'Tapas', 'Kartoffeln', 'Scharf', 'Vegetarisch']
    },
    es: {
      title: 'Patatas Bravas Crujientes con Salsa Brava y Alioli',
      description: 'La tapa española más popular: dados de patata fritos extra crujientes salseados con picante salsa brava al pimentón de la Vera y suave alioli.',
      instructions: [
        'Pele las patatas y córtelas en dados irregulares de 2,5 cm. Cuézalas 5 minutos en agua con sal y séquelas bien.',
        'Prepare la salsa brava dorando harina en aceite con pimentón picante ahumado de la Vera, concentrado de tomate, caldo y un toque de vinagre durante 5 minutos.',
        'Fría los dados de patata en abundante aceite caliente durante 8 minutos hasta que estén dorados y crujientes.',
        'Escurra sobre papel de cocina y añada sal marina.',
        'Sirva en una fuente y bañe con la salsa brava caliente y el alioli cremoso.'
      ],
      tags: ['Español', 'Tapas', 'Patatas', 'Picante', 'Vegetariano', 'Clásico']
    },
    pt: {
      title: 'Patatas Bravas Espanholas com Molho Picante e Alioli',
      description: 'Cubos de batata fritos crocantes servidos com molho picante de pimentão doce fumado e maionese cremosa de alho (alioli).',
      instructions: [
        'Descasque as batatas e corte em cubos de 2,5 cm. Coza 5 minutos em água com sal e deixe secar.',
        'Faça o molho bravo refogando farinha em azeite com pimentão doce picante, concentrado de tomate, caldo e vinagre durante 5 minutos.',
        'Frite os cubos de batata em óleo bem quente durante 8 minutos até dourarem e ficarem estaladiços.',
        'Escorra em papel absorvente e tempere com sal marinho.',
        'Disponha numa travessa e regue com o molho bravo picante e maionese de alho.'
      ],
      tags: ['Espanhol', 'Tapas', 'Batatas', 'Picante', 'Vegetariano']
    }
  },

  'rec-gambas-al-ajillo': {
    en: {
      title: 'Sizzling Garlic Shrimp (Gambas al Ajillo)',
      description: 'Sizzling Spanish tapas of tender shrimp flash-fried in bubbling garlic-infused extra virgin olive oil, dried red chilies, and fresh parsley.',
      instructions: [
        'Peel and devein king prawns or large shrimp; pat dry thoroughly with paper towels.',
        'Thinly slice garlic cloves and finely chop fresh red chili pepper.',
        'In a heavy skillet or clay cazuela, heat 4 tbsp extra virgin olive oil over medium heat. Sauté sliced garlic and chili for 2 minutes until garlic turns golden (do not burn).',
        'Add shrimp in a single layer; cook for 1.5 minutes per side until pink and curled.',
        'Remove immediately from heat, season with sea salt and chopped fresh flat-leaf parsley. Serve sizzling hot with crusty baguette for dipping.'
      ],
      tags: ['Spanish', 'Tapas', 'Seafood', 'Shrimp', 'Garlic', 'Quick', 'Gluten-Free']
    },
    fr: {
      title: 'Gambas al Ajillo (Crevettes Sautées à l’Ail et Piment)',
      description: 'Tapas espagnol express incontournable : crevettes nacrées sautées à l’huile d’olive vierge extra parfumée à l’ail doré et piment doux.',
      instructions: [
        'Décortiquez les crevettes ou gambas et séchez-les bien dans du papier absorbant.',
        'Émincez finement les gousses d’ail et ciselez le petit piment rouge.',
        'Dans une poêle en fonte ou un plat en terre cuite, faites chauffer l’huile d’olive à feu moyen. Faites dorer l’ail et le piment pendant 2 minutes sans les brûler.',
        'Ajoutez les crevettes en une seule couche ; faites-les sauter 1 minute 30 par face jusqu’à ce qu’elles deviennent roses et fermes.',
        'Retirez du feu, salez et parsemez de persil plat frais haché. Servez fumant avec du pain croustillant pour saucer l’huile parfumée.'
      ],
      tags: ['Espagnol', 'Tapas', 'Fruits de mer', 'Crevettes', 'Ail', 'Rapide', 'Frais']
    },
    de: {
      title: 'Feurige Knoblauchgarnelen (Gambas al Ajillo)',
      description: 'Brutzelnde spanische Tapas mit saftigen Garnelen in aromatischem Knoblauch-Chili-Olivenöl, verfeinert mit frischer Petersilie.',
      instructions: [
        'Garnelen schälen, entdarmen und trocken tupfen.',
        'Knoblauch in feine Scheiben und Chilischote in Ringe schneiden.',
        'Olivenöl in einer Pfanne oder Tonschale erhitzen, Knoblauch und Chili 2 Minuten sanft anbraten, bis der Knoblauch goldgelb wird.',
        'Garnelen zugeben und von jeder Seite ca. 1,5 Minuten braten, bis sie rosa und gar sind.',
        'Sofort von der Hitze nehmen, mit Meersalz und Petersilie bestreuen und zischend heiß mit frischem Baguette servieren.'
      ],
      tags: ['Spanisch', 'Tapas', 'Garnelen', 'Knoblauch', 'Schnell']
    },
    es: {
      title: 'Gambas al Ajillo Tradicionales en Cazuela',
      description: 'Una de las tapas estrella de España: gambas jugosas cocinadas en aceite de oliva virgen extra chisporroteante con láminas de ajo, guindilla y perejil.',
      instructions: [
        'Pele las gambas o langostinos y séquelos bien con papel de cocina.',
        'Corte los dientes de ajo en láminas finas y la guindilla en aros.',
        'Caliente el aceite de oliva virgen extra en una cazuela de barro o sartén. Dore el ajo y la guindilla 2 minutos sin quemar.',
        'Añada las gambas y cocínelas 1,5 minutos por lado hasta que cambien de color.',
        'Retire del fuego al momento, añada sal marina y perejil fresco picado. Sirva hirviendo con pan crujiente para mojar.'
      ],
      tags: ['Español', 'Tapas', 'Marisco', 'Gambas', 'Ajo', 'Rápido', 'Clásico']
    },
    pt: {
      title: 'Gambas al Ajillo (Camarão com Alho e Malagueta)',
      description: 'Famosa tapa espanhola de camarões suculentos salteados em azeite virgem extra a ferver com lâminas de alho, malagueta e salsa fresca.',
      instructions: [
        'Descasque os camarões e seque-os bem com papel absorvente.',
        'Corte os dentes de alho em lâminas finas e a malagueta em rodelas.',
        'Aqueça o azeite numa frigideira ou caçarola de barro em lume médio. Doure o alho e a malagueta durante 2 minutos.',
        'Junte os camarões e salteie 1,5 minutos de cada lado até ficarem rosados.',
        'Retire de imediato do lume, tempere com sal marinho e salsa picada. Sirva a borbulhar com pão crocante para molhar no azeite.'
      ],
      tags: ['Espanhol', 'Tapas', 'Marisco', 'Camarão', 'Alho', 'Rápido']
    }
  },

  'rec-pulpo-a-la-gallega': {
    en: {
      title: 'Galician Octopus & Potatoes (Pulpo a la Gallega)',
      description: 'Classic Northern Spanish delicacy of tender sliced octopus served warm over boiled potato rounds, finished with olive oil and smoked paprika.',
      instructions: [
        'Boil potatoes in salted water until fork-tender (20 mins); peel and slice into 1cm thick rounds.',
        'Warm pre-cooked octopus tentacles gently in a steamer or hot broth for 5 minutes; slice into bite-sized medallions using kitchen shears.',
        'Arrange warm potato slices in a single layer over a traditional wooden platter or serving plate.',
        'Lay sliced octopus medallions generously across the potato base.',
        'Drizzle liberally with premium extra virgin olive oil, sprinkle with coarse sea salt crystals and sweet smoked paprika de la Vera.'
      ],
      tags: ['Spanish', 'Galician', 'Seafood', 'Octopus', 'Tapas', 'Gluten-Free']
    },
    fr: {
      title: 'Poulpe à la Galicienne (Pulpo a la Gallega)',
      description: 'Merveille de la gastronomie galicienne : rondelles de poulpe fondant sur lit de pommes de terre tièdes, relevées d’huile d’olive et pimentón fumé.',
      instructions: [
        'Faites cuire les pommes de terre à l’eau salée (20 min) ; épluchez-les et coupez-les en rondelles de 1 cm.',
        'Réchauffez les tentacules de poulpe 5 minutes dans un bouillon chaud et découpez-les en rondelles aux ciseaux.',
        'Disposez les rondelles de pommes de terre tièdes sur une assiette ou une planche en bois traditionnelle.',
        'Recouvrez avec les morceaux de poulpe tièdes.',
        'Arrosez généreusement d’huile d’olive vierge extra, saupoudrez de fleur de sel et de paprika fumé (Pimentón de la Vera).'
      ],
      tags: ['Espagnol', 'Galice', 'Fruits de mer', 'Poulpe', 'Tapas', 'Sans Gluten']
    },
    de: {
      title: 'Galicischer Oktopus mit Kartoffeln (Pulpo a la Gallega)',
      description: 'Nordspanische Spezialität mit butterzarten Oktopusscheiben auf warmen Kartoffeln, veredelt mit Olivenöl, grobem Meersalz und geräuchertem Paprika.',
      instructions: [
        'Kartoffeln kochen (20 Min.), pellen und in 1 cm dicke Scheiben schneiden.',
        'Gegarten Oktopus 5 Minuten erwärmen und mit einer Küchenschere in mundgerechte Scheiben schneiden.',
        'Kartoffelscheiben auf einem Holzteller auslegen.',
        'Die Oktopusscheiben darauf anrichten.',
        'Großzügig mit feinstem Olivenöl beträufeln und mit grobem Meersalz sowie geräuchertem Paprikapulver bestreuen.'
      ],
      tags: ['Spanisch', 'Galicien', 'Meeresfrüchte', 'Tapas', 'Klassiker']
    },
    es: {
      title: 'Pulpo a la Gallega Tradicional (Polbo á Feira)',
      description: 'La gran joya gastronómica gallega: rodajas de pulpo tierno sobre base de patatas cocidas, regado con aceite de oliva virgen extra, sal gruesa y pimentón.',
      instructions: [
        'Cueza las patatas durante 20 minutos; pélelas y córtelas en rodajas de 1 cm.',
        'Caliente el pulpo cocido 5 minutos al vapor o en agua caliente y córtelo en rodajas con tijeras.',
        'Coloque las rodajas de patata en un plato de madera tradicional.',
        'Disponga las rodajas de pulpo sobre las patatas.',
        'Riegue abundantemente con aceite de oliva virgen extra, espolvoree sal gruesa marina y pimentón dulce y picante de la Vera.'
      ],
      tags: ['Español', 'Galicia', 'Marisco', 'Pulpo', 'Tapas', 'Clásico']
    },
    pt: {
      title: 'Polvo à Galega Tradicional com Batatas',
      description: 'Especialidade clássica do norte de Espanha com rodelas de polvo macio sobre batatas cozidas, azeite virgem extra, flor de sal e pimentão fumado.',
      instructions: [
        'Coza as batatas durante 20 minutos; descasque e corte em rodelas de 1 cm.',
        'Aqueça o polvo cozido durante 5 minutos e corte em rodelas com uma tesoura.',
        'Disponha as rodelas de batata num prato de madeira tradicional.',
        'Coloque os pedaços de polvo sobre as batatas.',
        'Regue generosamente com azeite virgem extra, tempere com sal grosso e polvilhe com pimentão doce fumado.'
      ],
      tags: ['Espanhol', 'Galiza', 'Marisco', 'Polvo', 'Tapas']
    }
  },

  'rec-churros-con-chocolate': {
    en: {
      title: 'Crispy Spanish Churros with Thick Hot Chocolate',
      description: 'Golden fried choux dough sticks coated in cinnamon sugar, served piping hot alongside rich, glossy Spanish dipping chocolate.',
      instructions: [
        'In a saucepan, bring water, butter, 1 tbsp sugar, and a pinch of salt to a rolling boil. Stir in flour vigorously until a smooth dough pulls away from pan.',
        'Let dough cool 5 minutes, then beat in eggs one by one until glossy and thick.',
        'Transfer dough to a piping bag fitted with a closed star tip. Heat frying oil to 180°C (350°F).',
        'Pipe 10cm strips directly into hot oil, snipping with kitchen scissors. Fry for 3-4 minutes until deep golden and crisp; drain and roll in sugar and cinnamon.',
        'Make dipping chocolate: gently melt dark chocolate into warm milk and heavy cream in a saucepan until thick and glossy. Serve together hot.'
      ],
      tags: ['Spanish', 'Dessert', 'Churros', 'Chocolate', 'Sweet', 'Fried']
    },
    fr: {
      title: 'Churros Espagnols et Chocolat Chaud Épais',
      description: 'Bâtonnets croustillants dorés roulés dans le sucre et la cannelle, accompagnés d’un chocolat chaud épais et onctueux à l’espagnole pour tremper.',
      instructions: [
        'Dans une casserole, portez à ébullition l’eau, le beurre, 1 c. à soupe de sucre et le sel. Hors du feu, ajoutez la farine d’un coup et mélangez vivement pour dessécher la pâte.',
        'Laissez tiédir 5 minutes puis incorporez les œufs un à un en mélangeant vigoureusement.',
        'Mettez la pâte dans une poche munie d’une douille cannelée. Chauffez l’huile de friture à 180°C.',
        'Pochez des bandes de 10 cm directement dans l’huile chaude en coupant aux ciseaux. Faites frire 3 à 4 minutes jusqu’à dorure ; égouttez et roulez dans le sucre et la cannelle.',
        'Faites fondre le chocolat noir dans le lait chaud avec la crème pour obtenir un chocolat chaud bien épais. Dégustez chaud en trempant les churros.'
      ],
      tags: ['Espagnol', 'Dessert', 'Churros', 'Chocolat', 'Sucré', 'Gourmand']
    },
    de: {
      title: 'Spanische Churros mit dicker Schokoladensauce',
      description: 'Frittiertes spanisches Brandteiggebäck in Zimt-Zucker gewälzt, serviert mit dickflüssiger, heißer Zartbitter-Trinkschokolade zum Eintauchen.',
      instructions: [
        'Wasser, Butter, 1 EL Zucker und Salz aufkochen. Mehl auf einmal zugeben und rühren, bis sich der Teig als Kloß vom Topfboden löst.',
        '5 Minuten abkühlen lassen, dann Eier einzeln unterrühren.',
        'Teig in einen Spritzbeutel mit Sterntülle füllen. Frittieröl auf 180°C erhitzen.',
        'Teigstreifen ins heiße Öl spritzen und 3-4 Minuten goldbraun ausbacken. Auf Küchenpapier abtropfen lassen und in Zimt-Zucker wälzen.',
        'Schokolade in warmer Milch und Sahne schmelzen lassen, bis eine dickflüssige Schokoladensauce entsteht. Heiß servieren.'
      ],
      tags: ['Spanisch', 'Dessert', 'Churros', 'Schokolade', 'Süß', 'Gebäck']
    },
    es: {
      title: 'Churros Caseros con Chocolate a la Taza',
      description: 'Crujientes lazos y bastones de masa frita dorada espolvoreados con azúcar y canela, acompañados de espeso chocolate caliente a la taza.',
      instructions: [
        'Hierva el agua con la mantequilla, 1 cucharada de azúcar y sal. Añada la harina de golpe y remueva con fuerza hasta que la masa se despegue de las paredes.',
        'Deje templar 5 minutos e integre los huevos uno a uno batiendo bien.',
        'Introduzca la masa en una churrera o manga pastelera con boquilla estrellada. Caliente el aceite a 180°C.',
        'Forme tiras de 10 cm sobre el aceite caliente y fría 3-4 minutos hasta que estén bien doradas; escurra y reboce en azúcar y canela.',
        'Funda el chocolate negro en leche caliente con nata hasta que quede un chocolate a la taza espeso y brillante. Sirva muy caliente.'
      ],
      tags: ['Español', 'Postre', 'Churros', 'Chocolate', 'Dulce', 'Desayuno']
    },
    pt: {
      title: 'Churros Espanhóis Estaladiços com Chocolate Quente',
      description: 'Bastões de massa frita dourada e estaladiça passados por açúcar e canela, servidos com chocolate quente cremoso e espesso para mergulhar.',
      instructions: [
        'Ferva a água com a manteiga, 1 colher de açúcar e sal. Junte a farinha de uma vez e mexa vigorosamente até a massa descolar do tacho.',
        'Deixe amornar 5 minutos e incorpore os ovos um a um batendo bem.',
        'Coloque a massa num saco de pasteleiro com bico estrelado. Aqueça o óleo a 180°C.',
        'Frite tiras de 10 cm em óleo quente durante 3 a 4 minutos até dourarem; escorra e passe por açúcar e canela.',
        'Derreta o chocolate preto no leite quente com natas até obter um chocolate espesso e aveludado. Sirva quente.'
      ],
      tags: ['Espanhol', 'Sobremesa', 'Churros', 'Chocolate', 'Doce']
    }
  }
};
