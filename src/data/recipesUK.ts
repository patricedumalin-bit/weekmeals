import { Recipe } from '../types';

export const RECIPES_UK: Recipe[] = [
  {
    id: 'rec-cottage-pie',
    title: 'Traditional British Cottage Pie (Savory Minced Beef Pie)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    difficulty: 'easy',
    description: 'Savory minced beef simmered with carrots, sweet peas, Worcestershire sauce, and thyme, crowned with creamy golden-crusted mashed potatoes.',
    instructions: [
      'Peel and boil potatoes in salted water until fork-tender (15 mins). Drain, mash with butter, warm milk, salt, and pepper until smooth.',
      'Preheat oven to 200°C (400°F).',
      'In a large skillet, brown ground beef over medium-high heat. Add diced onion, carrots, and minced garlic; cook 5 mins.',
      'Stir in tomato paste, flour, Worcestershire sauce, and dried thyme for 1 minute.',
      'Pour in beef broth and frozen green peas. Simmer for 15 minutes until sauce is thick and glossy.',
      'Transfer beef filling to a baking dish. Spoon mashed potatoes over the top, roughing the surface with a fork for crispy ridges. Bake 25 mins until bubbling and golden.'
    ],
    ingredients: [
      { ingredientId: 'ing-ground-beef', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-carrot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-frozen-peas', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-beef-broth', quantity: 350, unit: 'ml' },
      { ingredientId: 'ing-tomato-paste', quantity: 1.5, unit: 'tbsp' },
      { ingredientId: 'ing-flour', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 80, unit: 'ml' },
      { ingredientId: 'ing-worcestershire', quantity: 2, unit: 'tsp' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['British', 'England', 'Comfort Food', 'Family Favorite', 'Pie', 'Beef']
  },

  {
    id: 'rec-fish-and-chips',
    title: 'Classic British Fish & Chips with Sweet Green Peas',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'medium',
    description: 'Crispy golden batter-fried white cod fillets served with hand-cut roasted chunky potato chips, buttery sweet peas, and fresh lemon wedges.',
    instructions: [
      'Preheat oven to 210°C (410°F). Cut potatoes into thick chunky chips, toss with 2 tbsp sunflower oil, salt, and black pepper. Roast on a baking sheet for 25-30 mins until crispy and golden.',
      'In a bowl, whisk all-purpose flour, baking powder, and a pinch of salt. Whisk in cold sparkling water or milk until a smooth, thick batter forms.',
      'Pat cod fillets dry and dust lightly with flour. Dip each fillet into the batter to coat thoroughly.',
      'Heat 3 tbsp oil in a heavy skillet over medium-high heat. Fry battered fish for 4-5 mins per side until deeply golden and flaky.',
      'Simmer frozen peas in a little water with butter and salt for 3 minutes.',
      'Serve the crispy fish alongside hot chunky chips, sweet peas, and fresh lemon wedges.'
    ],
    ingredients: [
      { ingredientId: 'ing-cod-fillet', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-potato', quantity: 800, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 120, unit: 'g' },
      { ingredientId: 'ing-baking-powder', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-frozen-peas', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-sunflower-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['British', 'England', 'Seafood', 'Pub Classic', 'Crispy', 'Comfort Food']
  },

  {
    id: 'rec-full-english',
    title: 'Full English Breakfast Skillet (Traditional Fry-Up)',
    categoryId: 'rcat-quick',
    servings: 4,
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'The legendary British breakfast: juicy Cumberland sausages, crispy smoked bacon, sunny fried eggs, grilled tomatoes, button mushrooms, and baked beans with warm toast.',
    instructions: [
      'Heat 1 tbsp butter and olive oil in a large skillet. Add pork sausages and cook for 8-10 mins, turning until browned on all sides and cooked through.',
      'Add bacon rashers/lardons, halved vine tomatoes, and sliced button mushrooms to the pan. Sauté 4-5 mins until mushrooms are golden and bacon is crisp.',
      'Warm the canned British baked beans gently in a small saucepan.',
      'Crack eggs directly into the skillet gaps and fry sunny-side up for 3 mins until whites are set and yolks are runny.',
      'Toast sliced bread and butter generously. Serve the skillet feast immediately with warm baked beans.'
    ],
    ingredients: [
      { ingredientId: 'ing-cumberland-sausages', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-bacon', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-baked-beans', quantity: 1, unit: 'can' },
      { ingredientId: 'ing-tomato', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-mushroom', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-sliced-bread', quantity: 4, unit: 'slice' },
      { ingredientId: 'ing-butter', quantity: 25, unit: 'g' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['British', 'England', 'Breakfast', 'Brunch', 'High Protein', '15-Min Meal']
  },

  {
    id: 'rec-chicken-tikka-masala',
    title: 'Chicken Tikka Masala with Basmati Rice (British-Indian Classic)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'medium',
    description: 'Tender spiced chicken pieces simmered in a velvety, rich tomato cream sauce infused with ginger, garlic, garam/curry spices, and cilantro over basmati rice.',
    instructions: [
      'Cook basmati rice with water and a pinch of salt until fluffy (15 mins).',
      'Cut chicken breasts into bite-sized pieces. Toss with 1 tbsp curry powder, paprika, cumin, and salt.',
      'Heat 1.5 tbsp olive oil in a skillet over high heat. Sear chicken pieces for 5 mins until lightly charred; transfer to a plate.',
      'In the same skillet, sauté diced onion, minced garlic, and grated ginger for 4 mins. Stir in remaining curry powder and tomato paste for 1 min.',
      'Pour in crushed tomatoes and chicken broth; simmer 10 mins. Stir in heavy cream and return chicken to sauce for 5 mins until sauce is thick and creamy.',
      'Garnish with fresh chopped cilantro and serve hot over steaming basmati rice.'
    ],
    ingredients: [
      { ingredientId: 'ing-chicken-breast', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-basmati-rice', quantity: 320, unit: 'g' },
      { ingredientId: 'ing-crushed-tomatoes', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-heavy-cream', quantity: 150, unit: 'ml' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-ginger', quantity: 20, unit: 'g' },
      { ingredientId: 'ing-curry-powder', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-paprika', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-cumin', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-cilantro', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
    ],
    tags: ['British', 'England', 'Curry', 'Spiced', 'Dinner Favorite', 'Chicken']
  },

  {
    id: 'rec-leek-potato-soup',
    title: 'Creamy Leek & Potato Soup with English Cheddar',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Velvety smooth British comfort soup made of sweet sautéed leeks, tender potatoes, vegetable broth, and double cream, served with sharp English cheddar.',
    instructions: [
      'Wash leeks thoroughly and slice thinly. Peel and dice potatoes.',
      'Melt butter in a soup pot over medium heat. Sauté leeks, diced onion, and garlic with a pinch of salt for 6 mins until soft and sweet.',
      'Add diced potatoes, vegetable broth, and dried thyme. Bring to a boil, then simmer for 15-18 mins until potatoes are tender.',
      'Blend soup until completely smooth and velvety using an immersion blender.',
      'Stir in heavy cream and season with salt and cracked black pepper to taste.',
      'Ladle into warm bowls and top generously with grated sharp English cheddar and fresh parsley.'
    ],
    ingredients: [
      { ingredientId: 'ing-leek', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-potato', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-vegetable-broth', quantity: 800, unit: 'ml' },
      { ingredientId: 'ing-heavy-cream', quantity: 100, unit: 'ml' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-cheddar', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-thyme', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['British', 'England', 'Soup', 'Vegetarian', 'Starter', 'Comfort Food']
  },

  {
    id: 'rec-apple-crumble',
    title: 'Classic English Apple & Berry Crumble with Custard',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Sweet, spiced baked apples and forest berries topped with a golden, crunchy rolled oat and butter crumble crust.',
    instructions: [
      'Preheat oven to 190°C (375°F).',
      'Peel, core, and chop apples into bite-sized chunks. Toss in a baking dish with frozen mixed berries, 2 tbsp brown sugar, cinnamon, and vanilla extract.',
      'In a mixing bowl, combine all-purpose flour, rolled oats, remaining brown sugar, and a pinch of salt.',
      'Rub in chilled cubed butter with your fingertips until the mixture resembles coarse, golden breadcrumbs with clumps.',
      'Scatter the oat crumble topping evenly over the fruit.',
      'Bake for 30 minutes until the fruit is bubbling and the crumble topping is deeply golden and crunchy. Serve warm with cream or milk.'
    ],
    ingredients: [
      { ingredientId: 'ing-apple', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-frozen-berries', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-rolled-oats', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-brown-sugar', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-cinnamon', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-vanilla-extract', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' },
    ],
    tags: ['British', 'England', 'Dessert', 'Baking', 'Fruit Crumble', 'Sweet']
  }
];
