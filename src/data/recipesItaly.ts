import { Recipe } from '../types';

export const RECIPES_ITALY: Recipe[] = [
  {
    id: 'rec-spaghetti-carbonara',
    title: 'Spaghetti alla Carbonara Autentica (Classic Roman Carbonara)',
    categoryId: 'rcat-pasta',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'The real Roman classic: al dente spaghetti tossed with crispy guanciale/pancetta in a rich emulsion of fresh egg yolks, Pecorino Romano, and coarse black pepper.',
    instructions: [
      'Bring a large pot of salted water to a rolling boil. Cook spaghetti until firm al dente. Reserve 1 cup of starchy pasta water before draining.',
      'In a large skillet, cook diced guanciale or smoked pancetta over medium heat until crispy and golden (6-7 mins). Remove from direct heat.',
      'In a bowl, vigorously whisk 4 egg yolks and 1 whole egg with freshly grated Pecorino Romano, Parmigiano, and lots of cracked black pepper.',
      'Add the hot drained spaghetti directly to the skillet with the rendered pork fat. Toss well to coat.',
      'Pour in the egg and cheese mixture along with 3-4 tbsp of reserved warm pasta water, tossing rapidly off the heat until a glossy, velvety sauce coats every strand.',
      'Serve immediately with extra Pecorino and cracked black pepper.'
    ],
    ingredients: [
      { ingredientId: 'ing-spaghetti', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-pancetta', quantity: 180, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 4, unit: 'unit' },
      { ingredientId: 'ing-pecorino', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-parmesan', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-black-pepper', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['Italian', 'Italy', 'Pasta', 'Roman', 'Quick Dinner', 'Authentic']
  },

  {
    id: 'rec-lasagna-bolognese',
    title: 'Lasagna alla Bolognese al Forno (Classic Baked Beef Lasagna)',
    categoryId: 'rcat-pasta',
    servings: 4,
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    difficulty: 'medium',
    description: 'Hearty layered lasagna with slow-simmered beef ragù, velvety white béchamel sauce, tender pasta sheets, and bubbling mozzarella and Parmigiano.',
    instructions: [
      'Preheat oven to 190°C (375°F).',
      'For the ragù: Sauté finely chopped onion, carrot, and garlic in 2 tbsp olive oil (5 mins). Add ground beef and brown thoroughly. Stir in tomato paste, crushed tomatoes, oregano, salt, and black pepper. Simmer 20 mins.',
      'For the béchamel: Melt 40g butter in a saucepan, whisk in 40g flour for 1 min, then gradually pour in 500ml warm milk whisking constantly until smooth and thick. Season with a pinch of nutmeg and salt.',
      'In a baking dish, spread a thin layer of ragù, then layer lasagna pasta sheets, meat sauce, béchamel, and grated mozzarella/parmesan. Repeat for 3-4 layers.',
      'Finish with béchamel, mozzarella, and Parmigiano on top. Bake for 35 mins until bubbling and golden crust forms. Rest 10 mins before slicing.'
    ],
    ingredients: [
      { ingredientId: 'ing-lasagna-sheets', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-ground-beef', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-carrot', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-crushed-tomatoes', quantity: 600, unit: 'g' },
      { ingredientId: 'ing-tomato-paste', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-flour', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-milk', quantity: 500, unit: 'ml' },
      { ingredientId: 'ing-mozzarella', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-parmesan', quantity: 60, unit: 'g' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-nutmeg', quantity: 1, unit: 'pinch' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
    ],
    tags: ['Italian', 'Italy', 'Baked Pasta', 'Comfort Food', 'Family Classic']
  },

  {
    id: 'rec-risotto-funghi',
    title: 'Risotto ai Funghi Porcini & Spinaci (Creamy Mushroom Risotto)',
    categoryId: 'rcat-pasta',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    difficulty: 'medium',
    description: 'Velvety Italian Arborio rice slowly simmered with sautéed button and porcini mushrooms, fresh baby spinach, aged Parmigiano, and butter.',
    instructions: [
      'Keep vegetable broth gently warming on low heat in a small pot.',
      'Melt 20g butter with 1 tbsp olive oil in a wide heavy pan. Sauté sliced mushrooms until golden (5 mins); set half aside for topping.',
      'Add minced onion and garlic to the pan; sauté until soft and translucent (3 mins).',
      'Add Arborio rice and toast grains for 2 minutes, stirring continuously until edges turn translucent.',
      'Add warm vegetable broth one ladle at a time, stirring steadily and letting each ladle absorb before adding the next (about 18-20 mins).',
      'Fold in baby spinach, remaining 20g butter, and grated Parmigiano Reggiano off the heat until creamy and glossy. Season with salt and pepper.'
    ],
    ingredients: [
      { ingredientId: 'ing-arborio-rice', quantity: 320, unit: 'g' },
      { ingredientId: 'ing-mushroom', quantity: 300, unit: 'g' },
      { ingredientId: 'ing-spinach', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-vegetable-broth', quantity: 900, unit: 'ml' },
      { ingredientId: 'ing-butter', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-parmesan', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-olive-oil', quantity: 1, unit: 'tbsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['Italian', 'Italy', 'Risotto', 'Vegetarian', 'Gourmet', 'Comfort Food']
  },

  {
    id: 'rec-pizza-margherita',
    title: 'Pizza Margherita Napoletana (Neapolitan Margherita Pizza)',
    categoryId: 'rcat-quick',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'easy',
    description: 'Crisp, airy crust spread with sweet crushed San Marzano tomatoes, melted fresh mozzarella pearls, aromatic basil, and extra virgin olive oil.',
    instructions: [
      'Preheat oven to maximum heat (230°C-250°C / 450°F-485°F) with a baking tray inside.',
      'Roll out the pizza dough base onto parchment paper.',
      'Season canned crushed tomatoes with fine sea salt, a pinch of oregano, and 1 tbsp olive oil. Spread evenly across the dough leaving a 1-inch border.',
      'Tear fresh mozzarella ball into pieces and distribute evenly over the tomato sauce.',
      'Slide pizza onto the hot baking tray. Bake for 12-15 minutes until crust is puffed, blistered, and cheese is bubbling.',
      'Drizzle with extra virgin olive oil and scatter fresh basil leaves over top before serving.'
    ],
    ingredients: [
      { ingredientId: 'ing-pizza-dough', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-crushed-tomatoes', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-mozzarella', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-basil', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-oregano', quantity: 0.5, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['Italian', 'Italy', 'Pizza', 'Vegetarian', 'Quick Dinner', 'Kids Favorite']
  },

  {
    id: 'rec-parmigiana-melanzane',
    title: 'Parmigiana di Melanzane (Baked Italian Eggplant Parmesan)',
    categoryId: 'rcat-veggie',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    difficulty: 'easy',
    description: 'Tender roasted eggplant slices layered with herb tomato sauce, fresh mozzarella fior di latte, fresh basil, and plenty of Parmigiano Reggiano.',
    instructions: [
      'Preheat oven to 200°C (400°F). Slice eggplants into 1/2-inch rounds, brush with olive oil and bake for 18 mins until tender and lightly golden.',
      'In a saucepan, sauté minced garlic in 1 tbsp olive oil for 1 min. Add crushed tomatoes, dried oregano, salt, and simmer for 10 mins.',
      'In a baking dish, spread a layer of tomato sauce, then a layer of roasted eggplant, sliced mozzarella, torn fresh basil, and grated Parmigiano.',
      'Repeat layers, finishing with tomato sauce, mozzarella, and Parmigiano on top.',
      'Bake for 25 minutes until the cheese is bubbling, browned, and fragrant. Allow to sit for 10 mins before serving.'
    ],
    ingredients: [
      { ingredientId: 'ing-eggplant', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-crushed-tomatoes', quantity: 500, unit: 'g' },
      { ingredientId: 'ing-mozzarella', quantity: 200, unit: 'g' },
      { ingredientId: 'ing-parmesan', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-garlic', quantity: 3, unit: 'clove' },
      { ingredientId: 'ing-basil', quantity: 0.5, unit: 'bunch' },
      { ingredientId: 'ing-olive-oil', quantity: 3, unit: 'tbsp' },
      { ingredientId: 'ing-oregano', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-black-pepper', quantity: 0.5, unit: 'tsp' },
    ],
    tags: ['Italian', 'Italy', 'Vegetarian', 'Baked', 'Comfort Food', 'Mediterranean']
  },

  {
    id: 'rec-minestrone-toscana',
    title: 'Minestrone alla Toscana con Cannellini (Tuscan Vegetable Soup)',
    categoryId: 'rcat-starters',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    difficulty: 'easy',
    description: 'Wholesome Tuscan vegetable and white bean soup with penne pasta, zucchini, carrots, spinach, crushed tomatoes, and extra virgin olive oil.',
    instructions: [
      'Heat 2 tbsp olive oil in a soup pot. Sauté diced onion, carrots, celery, and garlic for 5 minutes until tender.',
      'Add diced zucchini, crushed canned tomatoes, drained cannellini beans, dried oregano, and vegetable broth.',
      'Bring to a boil, then reduce heat and simmer for 15 minutes.',
      'Add penne pasta into the simmering soup and cook for 10 minutes until the pasta is al dente.',
      'Stir in fresh baby spinach leaves until wilted (2 mins). Season with salt and cracked black pepper.',
      'Ladle into bowls and finish with a drizzle of extra virgin olive oil and grated Parmigiano.'
    ],
    ingredients: [
      { ingredientId: 'ing-cannellini-beans', quantity: 1, unit: 'can' },
      { ingredientId: 'ing-penne', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-zucchini', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-carrot', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-celery', quantity: 2, unit: 'unit' },
      { ingredientId: 'ing-onion', quantity: 1, unit: 'unit' },
      { ingredientId: 'ing-garlic', quantity: 2, unit: 'clove' },
      { ingredientId: 'ing-crushed-tomatoes', quantity: 400, unit: 'g' },
      { ingredientId: 'ing-vegetable-broth', quantity: 900, unit: 'ml' },
      { ingredientId: 'ing-spinach', quantity: 100, unit: 'g' },
      { ingredientId: 'ing-parmesan', quantity: 40, unit: 'g' },
      { ingredientId: 'ing-olive-oil', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-oregano', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'tsp' },
    ],
    tags: ['Italian', 'Italy', 'Soup', 'Vegetarian', 'Healthy', 'Tuscan']
  },

  {
    id: 'rec-tiramisu',
    title: 'Tiramisù Tradizionale Italiano (Authentic Italian Tiramisu)',
    categoryId: 'rcat-desserts',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 0,
    difficulty: 'easy',
    description: 'The definitive Italian no-bake dessert: delicate ladyfinger biscuits dipped in espresso, layered with luscious mascarpone cream, and dusted with dark cocoa.',
    instructions: [
      'Separate 3 eggs. In a mixing bowl, whisk egg yolks with granulated sugar and vanilla extract until thick and pale yellow.',
      'Gently fold in mascarpone cheese with a spatula until completely smooth and velvety.',
      'In another clean bowl, whip egg whites with a pinch of salt until soft peaks form, then gently fold into the mascarpone cream.',
      'Dip ladyfinger biscuits briefly into cold brewed coffee/espresso (do not over-soak).',
      'Arrange a single layer of soaked ladyfingers in a serving dish, spread half the mascarpone cream over, and repeat with a second layer.',
      'Refrigerate for at least 2 hours. Dust generously with unsweetened dark cocoa powder right before serving.'
    ],
    ingredients: [
      { ingredientId: 'ing-ladyfingers', quantity: 1, unit: 'pack' },
      { ingredientId: 'ing-mascarpone', quantity: 250, unit: 'g' },
      { ingredientId: 'ing-egg', quantity: 3, unit: 'unit' },
      { ingredientId: 'ing-sugar', quantity: 70, unit: 'g' },
      { ingredientId: 'ing-cocoa-powder', quantity: 2, unit: 'tbsp' },
      { ingredientId: 'ing-vanilla-extract', quantity: 1, unit: 'tsp' },
      { ingredientId: 'ing-salt', quantity: 1, unit: 'pinch' },
    ],
    tags: ['Italian', 'Italy', 'Dessert', 'No-Bake', 'Coffee', 'Classic']
  }
];
