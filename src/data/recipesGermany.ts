import { Recipe } from '../types';

export const RECIPES_GERMANY: Recipe[] = [
  {
    id: 'rec-wiener-schnitzel',
    title: 'Wiener Schnitzel mit Deutschem Kartoffelsalat (Crispy Schnitzel)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    difficulty: 'medium',
    description: 'Golden crispy breaded cutlets served with traditional warm German vinegar-mustard potato salad, fresh parsley, and lemon wedges.',
    instructions: [
      'For the potato salad: Boil potatoes in their skins until tender (20 mins). Peel warm, slice into rounds, and mix with finely chopped red onion, warm vegetable broth, 2 tbsp sunflower oil, white wine vinegar, Dijon mustard, salt, and pepper. Let steep.',
      'Place cutlets between plastic wrap and gently pound with a mallet until 4mm thin. Season both sides with salt and black pepper.',
      'Set up 3 shallow bowls: flour in the first, beaten eggs in the second, and crispy breadcrumbs in the third.',
      'Dredge cutlets in flour, dip into egg, then coat thoroughly in breadcrumbs without pressing too hard.',
      'Heat 4 tbsp sunflower oil in a large skillet over medium-high heat. Fry cutlets for 2-3 mins per side until golden brown and wavy.',
      'Serve immediately with warm potato salad, fresh parsley, and fresh lemon wedges.'
    ],
    ingredients: [
      { ingredientId: 'ing-schnitzel-cutlet', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 700, unit: 'g' },
      { ingredientId: 'ing-breadcrumbs', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-red-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-vegetable-broth', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-sunflower-oil', quantity: 5, unit: 'tbsp' },
      { ingredientId: 'ing-dijon-mustard', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['German', 'Germany', 'Classic', 'Schnitzel', 'Crispy', 'Family Favorite']
  },

  {
    id: 'rec-kaesespaetzle',
    title: 'Käsespätzle mit Röstzwiebeln (Swabian Cheese Spätzle Noodles)',
    categoryId: 'rcat-pasta',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'Tender German egg spätzle noodles layered with melted Emmental and Bergkäse cheese, topped with sweet, crispy golden caramelized onions.',
    instructions: [
      'Slice yellow onions into thin rings. Melt 25g butter with 1 tbsp oil in a skillet; slowly fry onions over medium heat for 15 minutes until deeply golden brown and sweet.',
      'Cook spätzle egg noodles in boiling salted water according to package directions (about 8-10 mins). Drain well.',
      'In a wide warm pan or casserole dish, layer hot drained spätzle noodles with grated Emmental / Gruyère cheese and heavy cream or a splash of pasta water.',
      'Toss gently over low heat until the cheese melts into strings of gooey, savory goodness.',
      'Season with freshly grated nutmeg, fine sea salt, and cracked black pepper.',
      'Top generously with the golden caramelized onions and chopped fresh chives/parsley.'
    ],
    ingredients: [
      { ingredientId: 'ing-spaetzle', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-emmental', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-gruyere', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-butter', quantity: 35, unit: 'g' },
      { ingredientId: 'ing-heavy-cream', quantity: 60, unit: 'ml' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['German', 'Germany', 'Vegetarian', 'Comfort Food', 'Swabian', 'Pasta']
  },

  {
    id: 'rec-currywurst',
    title: 'Berlin Currywurst mit Knusprigen Bratkartoffeln (Curry Sausage)',
    categoryId: 'rcat-quick',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Berlin’s iconic street food: seared German bratwurst sausages smothered in tangy spiced curry-tomato sauce with crispy skillet potatoes.',
    instructions: [
      'Dice potatoes into small cubes. Heat 2 tbsp sunflower oil in a skillet and fry potatoes over medium-high heat with salt and pepper for 12 mins until crispy and golden.',
      'In a separate pan, sear bratwurst sausages until browned and sizzling on all sides (8 mins).',
      'In a small saucepan, combine curry ketchup, tomato paste, 1 tbsp water, sweet paprika, and yellow curry powder. Warm gently.',
      'Slice the hot bratwurst sausages into bite-sized bite coins.',
      'Plate the sliced sausages alongside crispy skillet potatoes, drown sausages generously with warm spiced curry sauce, and dust with extra yellow curry powder.'
    ],
    ingredients: [
      { ingredientId: 'ing-bratwurst', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-curry-ketchup', quantity: 6, unit: 'tbsp' },
      { ingredientId: 'ing-tomato-paste', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-curry-powder', quantity: 1.5, unit: 'tbsp' },
      { ingredientId: 'ing-paprika', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-sunflower-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['German', 'Germany', 'Street Food', 'Quick', 'Berlin', '15-Min Meal']
  },

  {
    id: 'rec-linseneintopf',
    title: 'Deutscher Linseneintopf mit Würstchen (German Lentil Stew)',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Hearty German brown lentil stew simmered with carrots, potatoes, celery, bacon, and sliced Frankfurter sausages with a touch of vinegar.',
    instructions: [
      'In a large soup pot, fry diced bacon in 1 tbsp oil until crisp (4 mins).',
      'Add chopped onions, carrots, celery stalks, and minced garlic; sauté 4 minutes until fragrant.',
      'Add brown lentils, diced potatoes, vegetable broth, and dried bay leaf. Bring to a boil.',
      'Reduce heat to medium-low, cover, and simmer for 25 minutes until lentils and vegetables are tender.',
      'Slice Frankfurter sausages into coins and add to the stew for the last 5 minutes to heat through.',
      'Stir in red wine vinegar (adds authentic German tang), fresh parsley, salt, and black pepper.'
    ],
    ingredients: [
      { ingredientId: 'ing-brown-lentils', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-frankfurters', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-celery', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-vegetable-broth', quantity: 900, unit: 'ml' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-bay-leaf', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['German', 'Germany', 'Stew', 'Hearty', 'Winter Warmth', 'Comfort Food']
  },

  {
    id: 'rec-flammkuchen',
    title: 'Elsässer Flammkuchen / German Tarte Flambée (Crispy Flatbread)',
    categoryId: 'rcat-quick',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Thin crispy crust spread with velvety sour cream / crème fraîche, thinly sliced sweet onions, smoked bacon lardons, and ground nutmeg.',
    instructions: [
      'Preheat oven to 230°C (450°F) with a baking tray inside.',
      'Roll out pizza dough thinly onto a sheet of parchment paper.',
      'In a bowl, mix sour cream (or crème fraîche) with fine sea salt, black pepper, and a pinch of ground nutmeg.',
      'Spread the seasoned cream evenly across the dough right to the edges.',
      'Top with thinly sliced yellow onions and smoked bacon lardons.',
      'Bake for 12-14 minutes until crust is crispy and browned around the edges and bacon is sizzling. Slice into squares and serve immediately.'
    ],
    ingredients: [
      { ingredientId: 'ing-pizza-dough', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-sour-cream', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-bacon', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1.5, unit: 'unit' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['German', 'Germany', 'Quick Dinner', 'Crispy', 'Comfort Food', '15-Min Meal']
  },

  {
    id: 'rec-schwarzwaelder-dessert',
    title: 'Schwarzwälder Kirsch Schichtdessert (Black Forest Dessert Glass)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 5,
    difficulty: 'easy',
    description: 'Decadent Black Forest dessert glasses with layers of crumbled biscuits, rich dark chocolate, sweet sour cherries, and vanilla whipped cream.',
    instructions: [
      'In a small saucepan, warm sour cherries with 1 tbsp sugar and a pinch of cinnamon for 3 minutes. Allow to cool.',
      'Melt 100g dark chocolate with 30ml milk in a heatproof bowl until glossy and smooth.',
      'In a mixing bowl, whip heavy cream with granulated sugar and vanilla extract until stiff peaks form.',
      'Crush savoiardi ladyfinger biscuits coarsely into dessert glasses.',
      'Layer with dark chocolate ganache, warm sour cherries, and clouds of vanilla whipped cream.',
      'Top with shaved dark chocolate and chill in refrigerator until ready to serve.'
    ],
    ingredients: [
      { ingredientId: 'ing-dark-chocolate', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-sour-cherries', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-heavy-cream', quantity: 200, unit: 'ml' },
      { ingredientId: 'ing-ladyfingers', quantity: 0.5, unit: 'pack' },
      { ingredientId: 'ing-sugar', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-vanilla-extract', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-milk', quantity: 30, unit: 'ml' },
    ],
    tags: ['German', 'Germany', 'Dessert', 'Chocolate', 'Black Forest', 'Sweet']
  }
];
