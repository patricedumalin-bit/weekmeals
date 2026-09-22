import { Recipe } from '../types';

/**
 * Generates an extensive collection of scalable recipes for the Generic Cloud catalog.
 */
export function generateCloudRecipes(): Recipe[] {
  const recipes: Recipe[] = [];

  const bases = [
    { en: 'Chicken Alfredo Pasta', fr: 'Pâtes Poulet Alfredo', cat: 'rcat-pates', ing: ['ing-pates', 'ing-poulet', 'ing-creme', 'ing-fromage'] },
    { en: 'Classic Beef Stew', fr: 'Bœuf Mijoté Classique', cat: 'rcat-viande', ing: ['ing-boeuf', 'ing-carotte', 'ing-potato', 'ing-onion'] },
    { en: 'Garlic Butter Salmon', fr: 'Saumon au Beurre d\'Ail', cat: 'rcat-poisson', ing: ['ing-saumon', 'ing-beurre', 'ing-garlic', 'ing-citron'] },
    { en: 'Zucchini Stir-Fry', fr: 'Poêlée de Courgettes', cat: 'rcat-legume', ing: ['ing-courgette', 'ing-poivron', 'ing-onion', 'ing-huile-olive'] },
    { en: 'Apple Crumble Delight', fr: 'Crumble aux Pommes', cat: 'rcat-dessert', ing: ['ing-pomme', 'ing-beurre', 'ing-sel'] },
    { en: 'Tuna Salad Sandwich', fr: 'Sandwich Salade de Thon', cat: 'rcat-autre', ing: ['ing-pain', 'ing-thon', 'ing-mayonnaise', 'ing-salade'] },
    { en: 'Margherita Pizza', fr: 'Pizza Margherita', cat: 'rcat-pates', ing: ['ing-farine', 'ing-tomate', 'ing-fromage', 'ing-basilic'] },
    { en: 'Roasted Chicken Legs', fr: 'Cuisses de Poulet Rôties', cat: 'rcat-volaille', ing: ['ing-poulet', 'ing-potato', 'ing-ail', 'ing-thym'] },
    { en: 'Lentil Soup', fr: 'Soupe de Lentilles', cat: 'rcat-legume', ing: ['ing-lentilles', 'ing-carotte', 'ing-onion', 'ing-bouillon'] },
    { en: 'Beef Tacos', fr: 'Tacos au Bœuf', cat: 'rcat-viande', ing: ['ing-boeuf', 'ing-tortilla', 'ing-salade', 'ing-fromage'] },
    { en: 'Shrimp Scampi', fr: 'Crevettes Scampi', cat: 'rcat-poisson', ing: ['ing-crevettes', 'ing-ail', 'ing-beurre', 'ing-citron', 'ing-persil'] },
    { en: 'Red Thai Curry', fr: 'Curry Rouge Thaï', cat: 'rcat-volaille', ing: ['ing-poulet', 'ing-lait-coco', 'ing-curry', 'ing-riz', 'ing-poivron'] },
    { en: 'Mushroom Risotto', fr: 'Risotto aux Champignons', cat: 'rcat-pates', ing: ['ing-riz', 'ing-champignons', 'ing-oignon', 'ing-parmesan', 'ing-bouillon'] },
    { en: 'Classic Cheeseburger', fr: 'Cheeseburger Classique', cat: 'rcat-viande', ing: ['ing-boeuf', 'ing-pain', 'ing-fromage', 'ing-salade', 'ing-tomate'] },
    { en: 'Greek Salad', fr: 'Salade Grecque', cat: 'rcat-autre', ing: ['ing-feta', 'ing-concombre', 'ing-tomate', 'ing-olive', 'ing-oignon'] },
    { en: 'Lemon Roast Chicken', fr: 'Poulet au Citron', cat: 'rcat-volaille', ing: ['ing-poulet', 'ing-citron', 'ing-ail', 'ing-romarin', 'ing-beurre'] },
    { en: 'Ratatouille Provencale', fr: 'Ratatouille Provençale', cat: 'rcat-legume', ing: ['ing-aubergine', 'ing-courgette', 'ing-poivron', 'ing-tomate', 'ing-ail'] },
    { en: 'Spaghetti Bolognese', fr: 'Spaghetti Bolognaise', cat: 'rcat-viande', ing: ['ing-pates', 'ing-boeuf', 'ing-tomate', 'ing-oignon', 'ing-ail'] },
    { en: 'Grilled Sea Bass', fr: 'Bar Grillé', cat: 'rcat-poisson', ing: ['ing-poisson', 'ing-citron', 'ing-huile-olive', 'ing-thym', 'ing-ail'] },
    { en: 'Chocolate Lava Cake', fr: 'Moelleux au Chocolat', cat: 'rcat-dessert', ing: ['ing-chocolat', 'ing-beurre', 'ing-sucre', 'ing-farine', 'ing-oeuf'] },
    { en: 'Beef Lasagna', fr: 'Lasagnes au Bœuf', cat: 'rcat-pates', ing: ['ing-pates', 'ing-boeuf', 'ing-tomate', 'ing-fromage', 'ing-lait'] },
    { en: 'Pad Thai', fr: 'Pad Thaï', cat: 'rcat-pates', ing: ['ing-riz', 'ing-crevettes', 'ing-oeuf', 'ing-cacahuete', 'ing-citron-vert'] },
    { en: 'Falafel Wrap', fr: 'Wrap Falafel', cat: 'rcat-legume', ing: ['ing-pois-chiche', 'ing-pain', 'ing-salade', 'ing-tomate', 'ing-ail'] },
    { en: 'Fish & Chips', fr: 'Fish & Chips', cat: 'rcat-poisson', ing: ['ing-poisson', 'ing-potato', 'ing-farine', 'ing-huile'] },
    { en: 'Poke Bowl Salmon', fr: 'Poke Bowl au Saumon', cat: 'rcat-poisson', ing: ['ing-riz', 'ing-saumon', 'ing-avocat', 'ing-concombre', 'ing-soja'] },
    { en: 'Chili con Carne', fr: 'Chili con Carne', cat: 'rcat-viande', ing: ['ing-boeuf', 'ing-haricots', 'ing-tomate', 'ing-piment', 'ing-oignon'] },
    { en: 'Coq au Vin', fr: 'Coq au Vin', cat: 'rcat-volaille', ing: ['ing-poulet', 'ing-vin-rouge', 'ing-lardons', 'ing-champignons', 'ing-oignon'] },
    { en: 'Caesar Salad', fr: 'Salade César', cat: 'rcat-autre', ing: ['ing-salade', 'ing-poulet', 'ing-pain', 'ing-parmesan', 'ing-oeuf'] },
    { en: 'Quiche Lorraine', fr: 'Quiche Lorraine', cat: 'rcat-autre', ing: ['ing-farine', 'ing-lardons', 'ing-oeuf', 'ing-creme', 'ing-fromage'] },
    { en: 'Tiramisu', fr: 'Tiramisu', cat: 'rcat-dessert', ing: ['ing-mascarpone', 'ing-oeuf', 'ing-sucre', 'ing-cafe', 'ing-biscuits'] },
  ];

  const variants = [
    { en: 'Traditional', fr: 'Traditionnel' },
    { en: 'Quick & Easy', fr: 'Rapide & Facile' },
    { en: 'Chef Special', fr: 'Spécial Chef' }
  ];

  let count = 1;
  bases.forEach((base) => {
    variants.forEach((variant) => {
      recipes.push({
        id: `cloud-recipe-${count}`,
        title: `${variant.en} ${base.en}`,
        categoryId: base.cat,
        servings: 4,
        prepTimeMinutes: 10 + (count % 15),
        cookTimeMinutes: 15 + (count % 25),
        difficulty: count % 3 === 0 ? 'easy' : count % 3 === 1 ? 'medium' : 'hard',
        description: `Premium Cloud Catalog item #${count}. Balanced recipe variant of ${base.en}.`,
        instructions: [
          'Prepare all fresh ingredients carefully.',
          'Cook thoroughly following best culinary practices.',
          'Season to taste and serve warm.'
        ],
        ingredients: base.ing.map((ingId, idx) => ({
          ingredientId: ingId,
          quantity: idx === 0 ? 300 : 2,
          unit: idx === 0 ? 'g' : 'unit'
        })),
        tags: ['Cloud', variant.en.split(' ')[0], base.cat.replace('rcat-', '')],
        isGenericCloud: true,
        localizations: {
          en: {
            title: `${variant.en} ${base.en}`,
            description: `A delicious ${variant.en.toLowerCase()} version of ${base.en}.`,
            instructions: [
              'Prepare all fresh ingredients carefully.',
              'Cook thoroughly following best culinary practices.',
              'Season to taste and serve warm.'
            ]
          },
          fr: {
            title: `${base.fr} ${variant.fr}`,
            description: `Une délicieuse version ${variant.fr.toLowerCase()} de la recette : ${base.fr}.`,
            instructions: [
              'Préparez soigneusement tous les ingrédients frais.',
              'Cuisinez le tout en respectant les meilleures pratiques culinaires.',
              'Assaisonnez à votre goût et servez chaud.'
            ]
          }
        }
      });
      count++;
    });
  });

  return recipes;
}

export const CLOUD_RECIPES: Recipe[] = generateCloudRecipes();
