import { Recipe } from '../types';

export const RECIPES_SPAIN: Recipe[] = [
  {
    id: 'rec-paella-valenciana',
    title: 'Paella Valenciana Tradicional (Authentic Spanish Paella)',
    categoryId: 'rcat-pasta',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'medium',
    description: 'Iconic Spanish saffron rice cooked with chicken thighs, green beans, sweet smoked paprika, garlic, rosemary sprig, and lemon wedges.',
    instructions: [
      'In a wide paella pan or large skillet, heat 3 tbsp olive oil over medium-high heat. Season chicken thighs with salt and sweet paprika; brown well for 8 mins.',
      'Push chicken to the edges, add chopped green beans and minced garlic to center; sauté for 3 mins.',
      'Stir in crushed tomatoes and sweet smoked paprika, cooking down for 2 mins to form the sofrito base.',
      'Add Spanish Bomba rice, stirring to coat every grain in the sofrito (1 min).',
      'Pour in hot chicken broth infused with saffron threads and add a fresh rosemary sprig. Bring to a boil, then reduce heat to medium-low.',
      'Simmer undisturbed for 18-20 minutes without stirring so a delectable crispy bottom crust (socarrat) develops. Rest 5 mins, garnish with lemon wedges.'
    ],
    ingredients: [
      { ingredientId: 'ing-bomba-rice', quantity: 350, unit: 'g' },
      { ingredientId: 'ing-chicken-thigh', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-green-beans', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-crushed-tomatoes', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-chicken-broth', quantity: 800, unit: 'ml' },
      { ingredientId: 'ing-saffron', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-smoked-paprika', quantity: 1.5, unit: 'tsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-rosemary', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
    ],
    tags: ['Spanish', 'Spain', 'Paella', 'Rice', 'Iconic', 'Gluten-Free']
  },

  {
    id: 'rec-tortilla-espanola',
    title: 'Tortilla Española de Patatas (Classic Spanish Potato Omelette)',
    categoryId: 'rcat-quick',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    difficulty: 'easy',
    description: 'The beloved Spanish national classic: tender olive oil confit potatoes and sweet onions bound in velvety soft eggs, served warm or room temperature.',
    instructions: [
      'Peel potatoes and slice into thin 3mm rounds. Thinly slice the yellow onion.',
      'Heat 4 tbsp olive oil in a non-stick skillet over medium-low heat. Add potatoes and onion with 1 tsp salt.',
      'Cook slowly for 15 minutes, turning gently, until potatoes are tender and translucent (not browned). Drain excess oil into a bowl (save for cooking).',
      'In a large bowl, beat 6 eggs with a pinch of salt. Gently fold in the warm potatoes and onions, letting them sit for 5 minutes so eggs absorb flavors.',
      'Add 1 tbsp of reserved oil to skillet over medium heat. Pour in egg mixture and cook for 3-4 minutes, loosening edges with a spatula.',
      'Place a flat plate over skillet, invert the tortilla confidently, and slide back into skillet. Cook 2 more minutes for a juicy, melt-in-mouth center.'
    ],
    ingredients: [
      { ingredientId: 'ing-potato', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1.5, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 1.5, unit: 'tsp' },
    ],
    tags: ['Spanish', 'Spain', 'Tapas', 'Vegetarian', 'Gluten-Free', 'Classic']
  },

  {
    id: 'rec-gambas-al-ajillo',
    title: 'Gambas al Ajillo (Sizzling Spanish Garlic & Chili Shrimp)',
    categoryId: 'rcat-seafood',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 8,
    difficulty: 'easy',
    description: 'Succulent shrimp sizzling in extra virgin olive oil infused with lots of thinly sliced garlic, red chili, smoked paprika, and crusty bread.',
    instructions: [
      'Peel and devein shrimp; pat dry thoroughly with paper towels. Season with salt.',
      'Thinly slice garlic cloves and finely slice the fresh red chili.',
      'In a wide skillet or clay cazuela, heat olive oil over medium heat. Add sliced garlic and chili; cook for 1.5 minutes until garlic turns golden (do not burn).',
      'Add smoked paprika and immediately toss in the shrimp.',
      'Cook shrimp for 2-3 minutes, tossing continuously until pink and curled.',
      'Squeeze fresh lemon juice over, scatter chopped fresh parsley, and serve immediately sizzling hot with slices of crusty baguette for dipping.'
    ],
    ingredients: [
      { ingredientId: 'ing-shrimp', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 6, unit: 'clove' },
      { ingredientId: 'ing-red-chili', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-olive-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-smoked-paprika', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-lemon', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-baguette', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['Spanish', 'Spain', 'Tapas', 'Seafood', 'Quick Dinner', '10-Min Meal']
  },

  {
    id: 'rec-gazpacho-andaluz',
    title: 'Gazpacho Andaluz Tradicional (Chilled Andalusian Tomato Soup)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'Refreshing no-cook chilled soup made of ripe vine tomatoes, crisp cucumber, bell pepper, garlic, premium olive oil, and sherry vinegar.',
    instructions: [
      'Roughly chop ripe vine tomatoes, peeled cucumber, red bell pepper, and garlic clove.',
      'Place vegetables into a high-powered blender. Add 1 slice of crusty bread soaked in a splash of water (gives classic creamy texture).',
      'Add extra virgin olive oil, red wine / sherry vinegar, and fine sea salt.',
      'Blend on high speed for 2 minutes until completely silky, creamy, and emulsion forms.',
      'Strain through a fine-mesh sieve if desired, then chill in refrigerator for at least 1 hour.',
      'Serve cold in bowls or glasses garnished with diced cucumber, a drizzle of olive oil, and crusty bread.'
    ],
    ingredients: [
      { ingredientId: 'ing-tomato', quantity: 6, unit: 'unit' },
      { ingredientId: 'ing-cucumber', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-bell-pepper-red', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 1, unit: 'clove' },
      { ingredientId: 'ing-sliced-bread', quantity: 1, unit: 'slice' },
      { ingredientId: 'ing-olive-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
    ],
    tags: ['Spanish', 'Spain', 'Cold Soup', 'Summer', 'Vegan', 'Healthy']
  },

  {
    id: 'rec-albondigas-salsa',
    title: 'Albóndigas en Salsa de Tomate Española (Spanish Tapas Meatballs)',
    categoryId: 'rcat-poultry',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Juicy seasoned beef and pork meatballs simmered in a rich garlic-paprika tomato sauce with fresh parsley and crusty bread.',
    instructions: [
      'In a bowl, combine ground beef, ground pork, breadcrumbs, 1 beaten egg, minced garlic, chopped parsley, salt, and black pepper.',
      'Roll into bite-sized balls (about 16-20 meatballs).',
      'Heat 2 tbsp olive oil in a skillet; brown meatballs on all sides (6 mins), then remove to a plate.',
      'In the same skillet, sauté chopped onion and garlic for 3 mins. Add smoked paprika, crushed canned tomatoes, and a pinch of sugar/salt.',
      'Return meatballs to the sauce, cover and simmer gently on low heat for 15 minutes until sauce is thick and meatballs are tender.',
      'Garnish with fresh parsley and serve with baguette or roasted potatoes.'
    ],
    ingredients: [
      { ingredientId: 'ing-ground-beef', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-ground-pork', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-breadcrumbs', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-crushed-tomatoes', quantity: 450, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-smoked-paprika', quantity: 1.5, unit: 'tsp' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['Spanish', 'Spain', 'Tapas', 'Meatballs', 'Comfort Food', 'Family Favorite']
  },

  {
    id: 'rec-patatas-bravas',
    title: 'Patatas Bravas con Salsa Picante y Alioli (Crispy Spicy Potatoes)',
    categoryId: 'rcat-sides',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    difficulty: 'easy',
    description: 'Golden crispy cubed potatoes topped with authentic spicy smoked paprika tomato salsa and rich homemade garlic mayonnaise (alioli).',
    instructions: [
      'Preheat oven to 210°C (410°F). Cut potatoes into 1-inch irregular chunks. Toss with 2 tbsp olive oil, salt, and sweet paprika. Roast for 25 mins until crispy outside and fluffy inside.',
      'For the salsa brava: Sauté minced garlic in 1 tbsp olive oil for 1 min. Stir in tomato paste, crushed tomatoes, smoked paprika, red chili/cayenne, red wine vinegar, and salt. Simmer 5 mins.',
      'For the alioli: Mix mayonnaise with 1 grated garlic clove, a squeeze of lemon juice, and a pinch of salt.',
      'Heap the hot crispy potatoes onto a serving dish.',
      'Drizzle generously with warm salsa brava and creamy garlic alioli. Finish with chopped fresh parsley.'
    ],
    ingredients: [
      { ingredientId: 'ing-potato', quantity: 700, unit: 'g' },
      { ingredientId: 'ing-crushed-tomatoes', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-tomato-paste', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-smoked-paprika', quantity: 1.5, unit: 'tsp' },
      { ingredientId: 'ing-mayonnaise', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-red-wine-vinegar', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-lemon', quantity: 0.5, unit: 'unit' },
      { ingredientId: 'ing-parsley', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
    ],
    tags: ['Spanish', 'Spain', 'Tapas', 'Side Dish', 'Vegetarian', 'Crispy']
  },

  {
    id: 'rec-churros-chocolate',
    title: 'Churros Tradicionales con Chocolate a la Taza (Spanish Churros)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Golden crispy fried dough pastry sticks rolled in cinnamon sugar, served with thick, velvety melted dark dipping chocolate.',
    instructions: [
      'In a saucepan, bring 250ml water, 30g butter, 1 tbsp sugar, and a pinch of salt to a rolling boil.',
      'Remove from heat, add all 150g flour at once, and stir vigorously with a wooden spoon until a smooth dough ball pulls away from the sides.',
      'Transfer dough to a piping bag fitted with a star tip.',
      'Heat 3 tbsp sunflower oil in a skillet over medium-high heat. Pipe 4-inch strips directly into hot oil, cutting ends with scissors. Fry 2-3 mins until golden.',
      'Roll hot churros immediately in a plate of granulated sugar mixed with ground cinnamon.',
      'In a small pot, melt dark chocolate with whole milk and 1 tbsp sugar until rich, glossy, and thick. Serve alongside warm churros for dipping.'
    ],
    ingredients: [
      { ingredientId: 'ing-flour', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-butter', quantity: 30, unit: 'g' },
      { ingredientId: 'ing-sugar', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-cinnamon', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-dark-chocolate', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 120, unit: 'ml' },
      { ingredientId: 'ing-sunflower-oil', quantity: 4, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' },
    ],
    tags: ['Spanish', 'Spain', 'Dessert', 'Street Food', 'Sweet', 'Chocolate']
  }
];
