import { 
  WeeklyPlan, 
  Recipe, 
  Ingredient, 
  IngredientCategory, 
  AggregatedShoppingItem, 
  ShoppingSource, 
  UnitType, 
  CustomShoppingItem, 
  CookingModeType,
  NutritionInfo,
  DietaryBadge,
  AutoPlanOptions,
  RecipeMatchResult
} from '../types';

export function inferCookingMode(recipe: Recipe): CookingModeType {
  if (recipe.cookingMode) return recipe.cookingMode;
  const text = `${recipe.title} ${recipe.description} ${recipe.instructions?.join(' ') || ''}`.toLowerCase();
  if (text.includes('cookeo') || text.includes('multicuiseur')) return 'cookeo';
  if (text.includes('thermomix') || text.includes('robot cuisseur') || text.includes('monsieur cuisine') || text.includes('robot')) return 'robot';
  if (text.includes('four') || text.includes('gratin') || text.includes('roast') || text.includes('cuire au four') || text.includes('thermostat') || text.includes('boulangerie') || text.includes('tarte') || text.includes('gâteau')) return 'four';
  if (text.includes('poêle') || text.includes('poele') || text.includes('sauté') || text.includes('sauter') || text.includes('poêler')) return 'poele';
  if (text.includes('cocotte') || text.includes('mijoter') || text.includes('braiser') || text.includes('casserole') || text.includes('bouillon') || text.includes('soupe')) return 'cocotte';
  if (text.includes('vapeur') || text.includes('cuisson vapeur')) return 'vapeur';
  if (text.includes('grill') || text.includes('plancha') || text.includes('barbecue') || text.includes('griller')) return 'grill';
  if (text.includes('salade') || text.includes('cru') || text.includes('frais') || text.includes('tartare') || text.includes('sans cuisson') || text.includes('carpaccio')) return 'sans-cuisson';
  return 'four';
}

const ALL_COOKING_MODES: { id: CookingModeType; labelKey: string }[] = [
  { id: 'four', labelKey: 'cookingMode_four' },
  { id: 'poele', labelKey: 'cookingMode_poele' },
  { id: 'cookeo', labelKey: 'cookingMode_cookeo' },
  { id: 'robot', labelKey: 'cookingMode_robot' },
  { id: 'cocotte', labelKey: 'cookingMode_cocotte' },
  { id: 'vapeur', labelKey: 'cookingMode_vapeur' },
  { id: 'grill', labelKey: 'cookingMode_grill' },
  { id: 'sans-cuisson', labelKey: 'cookingMode_sansCuisson' },
];

/**
 * Computes the list of cooking modes that actually occur among the given
 * recipes (via inferCookingMode), sorted by number of matching recipes
 * (descending), so the filter dropdown only ever shows options that return
 * results.
 */
export function getAvailableCookingModes(recipes: Recipe[]): { id: CookingModeType; labelKey: string; count: number }[] {
  const withCounts = ALL_COOKING_MODES.map(m => ({
    ...m,
    count: recipes.reduce((acc, r) => acc + (inferCookingMode(r) === m.id ? 1 : 0), 0),
  }));
  return withCounts.filter(m => m.count > 0).sort((a, b) => b.count - a.count);
}

export function formatQuantity(num: number): string {
  if (num === 0) return '0';
  const rounded = Math.round(num * 100) / 100;
  if (Math.abs(rounded - Math.round(rounded)) < 0.001) {
    return Math.round(rounded).toString();
  }
  const intPart = Math.floor(rounded);
  const frac = rounded - intPart;
  if (Math.abs(frac - 0.5) < 0.05) return intPart > 0 ? `${intPart} ½` : '½';
  if (Math.abs(frac - 0.25) < 0.05) return intPart > 0 ? `${intPart} ¼` : '¼';
  if (Math.abs(frac - 0.75) < 0.05) return intPart > 0 ? `${intPart} ¾` : '¾';
  if (Math.abs(frac - 0.33) < 0.05) return intPart > 0 ? `${intPart} ⅓` : '⅓';
  if (Math.abs(frac - 0.67) < 0.05) return intPart > 0 ? `${intPart} ⅔` : '⅔';
  
  return rounded.toFixed(1).replace(/\.0$/, '');
}

// -------------------------------------------------------------
// UNIT CONVERSION HELPERS (used to merge shopping list lines
// for the same ingredient expressed in different but compatible units)
// -------------------------------------------------------------
type UnitFamily = 'mass' | 'volume' | 'count';

const MASS_TO_GRAMS: Partial<Record<UnitType, number>> = { g: 1, kg: 1000 };
const VOLUME_TO_ML: Partial<Record<UnitType, number>> = { ml: 1, cl: 10, l: 1000, tbsp: 15, tsp: 5 };

export function getUnitFamily(unit: UnitType): UnitFamily {
  if (unit in MASS_TO_GRAMS) return 'mass';
  if (unit in VOLUME_TO_ML) return 'volume';
  return 'count';
}

/** Converts a quantity to the family's base unit (grams for mass, ml for volume, unchanged for count). */
function toBaseUnit(quantity: number, unit: UnitType): number {
  const family = getUnitFamily(unit);
  if (family === 'mass') return quantity * (MASS_TO_GRAMS[unit] || 1);
  if (family === 'volume') return quantity * (VOLUME_TO_ML[unit] || 1);
  return quantity;
}

/** Converts a base-unit quantity back to the most readable unit for display. */
function fromBaseUnit(baseQuantity: number, family: UnitFamily, fallbackUnit: UnitType): { quantity: number; unit: UnitType } {
  if (family === 'mass') {
    return baseQuantity >= 1000 ? { quantity: baseQuantity / 1000, unit: 'kg' } : { quantity: baseQuantity, unit: 'g' };
  }
  if (family === 'volume') {
    return baseQuantity >= 1000 ? { quantity: baseQuantity / 1000, unit: 'l' } : { quantity: baseQuantity, unit: 'ml' };
  }
  return { quantity: baseQuantity, unit: fallbackUnit };
}

export function calculateShoppingList(
  plan: WeeklyPlan,
  recipes: Recipe[] = [],
  ingredients: Ingredient[] = [],
  categories: IngredientCategory[] = [],
  checkedMap: Record<string, boolean> = {},
  customItems: CustomShoppingItem[] = [],
  pantryMap: Record<string, boolean> = {},
  hideInPantry: boolean = false
): {
  groupedByCategory: {
    category: IngredientCategory;
    items: AggregatedShoppingItem[];
    checkedCount: number;
    totalCount: number;
  }[];
  totalItemsCount: number;
  checkedItemsCount: number;
  pantryItemsCount: number;
} {
  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  const recipeMap = new Map<string, Recipe>(safeRecipes.map(r => [r.id, r]));
  const ingredientMap = new Map<string, Ingredient>(safeIngredients.map(i => [i.id, i]));
  const categoryMap = new Map<string, IngredientCategory>(safeCategories.map(c => [c.id, c]));

  const aggregatedMap = new Map<string, AggregatedShoppingItem>();

  for (const meal of plan.meals) {
    const mealServings = meal.servings || plan.defaultServings || 4;

    if (meal.customMeals && meal.customMeals.length > 0) {
      for (const customMeal of meal.customMeals) {
        for (const customIng of customMeal.ingredients) {
          const ingredient = ingredientMap.get(customIng.ingredientId);
          if (!ingredient) continue;

          const category = categoryMap.get(ingredient.categoryId) || {
            id: 'cat-other',
            name: 'Other',
            icon: 'ShoppingBag',
            color: 'gray',
            order: 99
          };

          const family = getUnitFamily(customIng.unit);
          const key = `${ingredient.id}_${family}`;
          const scaledQty = customIng.quantity * (mealServings / 4);
          const baseQty = toBaseUnit(scaledQty, customIng.unit);

          const source: ShoppingSource = {
            mealNumber: meal.mealNumber,
            mealLabel: meal.label || `Meal ${meal.mealNumber}`,
            recipeTitle: customMeal.name || 'Repas sur mesure',
            recipeId: `custom-meal-${customMeal.id}`,
            rawQuantity: customIng.quantity,
            scaledQuantity: scaledQty,
            unit: customIng.unit,
            servings: mealServings
          };

          if (aggregatedMap.has(key)) {
            const existing = aggregatedMap.get(key)!;
            existing.totalQuantity += baseQty;
            existing.sources.push(source);
          } else {
            aggregatedMap.set(key, {
              ingredientId: ingredient.id,
              ingredientName: ingredient.name,
              categoryId: category.id,
              categoryName: category.name,
              categoryIcon: category.icon,
              categoryColor: category.color,
              totalQuantity: baseQty,
              unit: customIng.unit,
              checked: !!checkedMap[key],
              inPantry: !!pantryMap[ingredient.id],
              sources: [source]
            });
          }
        }
      }
    }

    if (!meal.recipeIds || meal.recipeIds.length === 0) continue;
    const excludedMap = meal.excludedIngredients || {};

    for (let rIdx = 0; rIdx < meal.recipeIds.length; rIdx++) {
      const recipeId = meal.recipeIds[rIdx];
      const recipe = recipeMap.get(recipeId);
      if (!recipe) continue;

      const excludedForThisRecipe = new Set<string>([
        ...(excludedMap[rIdx] || []),
        ...(excludedMap[recipeId as any] || [])
      ]);

      const recipeServings = recipe.servings || 4;
      const scaleFactor = mealServings / recipeServings;

      for (const recipeIng of recipe.ingredients) {
        if (excludedForThisRecipe.has(recipeIng.ingredientId)) continue;

        const ingredient = ingredientMap.get(recipeIng.ingredientId);
        if (!ingredient) continue;

        const category = categoryMap.get(ingredient.categoryId) || {
          id: 'cat-other',
          name: 'Other',
          icon: 'ShoppingBag',
          color: 'gray',
          order: 99
        };

        const family = getUnitFamily(recipeIng.unit);
        const key = `${ingredient.id}_${family}`;
        const scaledQty = recipeIng.quantity * scaleFactor;
        const baseQty = toBaseUnit(scaledQty, recipeIng.unit);

        const source: ShoppingSource = {
          mealNumber: meal.mealNumber,
          mealLabel: meal.label || `Meal ${meal.mealNumber}`,
          recipeTitle: recipe.title,
          recipeId: recipe.id,
          rawQuantity: recipeIng.quantity,
          scaledQuantity: scaledQty,
          unit: recipeIng.unit,
          servings: mealServings
        };

        if (aggregatedMap.has(key)) {
          const existing = aggregatedMap.get(key)!;
          existing.totalQuantity += baseQty;
          existing.sources.push(source);
        } else {
          aggregatedMap.set(key, {
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            categoryId: category.id,
            categoryName: category.name,
            categoryIcon: category.icon,
            categoryColor: category.color,
            totalQuantity: baseQty,
            unit: recipeIng.unit,
            checked: !!checkedMap[key],
            inPantry: !!pantryMap[ingredient.id],
            sources: [source]
          });
        }
      }
    }
  }

  for (const custom of customItems) {
    const category = categoryMap.get(custom.categoryId) || {
      id: custom.categoryId,
      name: 'Custom Items',
      icon: 'Tag',
      color: 'indigo',
      order: 90
    };

    const key = `custom_${custom.id}`;
    aggregatedMap.set(key, {
      ingredientId: custom.id,
      ingredientName: custom.name,
      categoryId: category.id,
      categoryName: category.name,
      categoryIcon: category.icon,
      categoryColor: category.color,
      totalQuantity: toBaseUnit(custom.quantity, custom.unit),
      unit: custom.unit,
      checked: custom.checked || !!checkedMap[key],
      inPantry: false,
      sources: [{
        mealNumber: 0,
        mealLabel: 'Manual Item',
        recipeTitle: 'Added to Shopping List',
        recipeId: 'manual',
        rawQuantity: custom.quantity,
        scaledQuantity: custom.quantity,
        unit: custom.unit,
        servings: 0
      }]
    });
  }

  // Convert accumulated base-unit quantities (grams/ml) back to the most
  // readable unit (g/kg, ml/l) now that all sources have been summed per ingredient.
  for (const item of aggregatedMap.values()) {
    const family = getUnitFamily(item.unit);
    const display = fromBaseUnit(item.totalQuantity, family, item.unit);
    item.totalQuantity = display.quantity;
    item.unit = display.unit;
  }

  let allItems = Array.from(aggregatedMap.values());
  const pantryItemsCount = allItems.filter(i => i.inPantry).length;

  if (hideInPantry) {
    allItems = allItems.filter(i => !i.inPantry);
  }

  const grouped = new Map<string, AggregatedShoppingItem[]>();
  for (const item of allItems) {
    const list = grouped.get(item.categoryId) || [];
    list.push(item);
    grouped.set(item.categoryId, list);
  }

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  for (const catId of grouped.keys()) {
    if (!sortedCategories.some(c => c.id === catId)) {
      const extraCat = categoryMap.get(catId) || {
        id: catId,
        name: 'Other',
        icon: 'ShoppingBag',
        color: 'gray',
        order: 999
      };
      sortedCategories.push(extraCat);
    }
  }

  const result = [];
  let totalItems = 0;
  let checkedItems = 0;

  for (const cat of sortedCategories) {
    const items = grouped.get(cat.id);
    if (items && items.length > 0) {
      items.sort((a, b) => a.ingredientName.localeCompare(b.ingredientName));
      const checkedInCat = items.filter(i => i.checked).length;
      totalItems += items.length;
      checkedItems += checkedInCat;

      result.push({
        category: cat,
        items,
        checkedCount: checkedInCat,
        totalCount: items.length
      });
    }
  }

  return {
    groupedByCategory: result,
    totalItemsCount: totalItems,
    checkedItemsCount: checkedItems,
    pantryItemsCount
  };
}

// -------------------------------------------------------------
// NUTRITION ESTIMATION
// -------------------------------------------------------------
export function estimateRecipeNutrition(recipe: Recipe, ingredients: Ingredient[]): NutritionInfo {
  const ingredientMap = new Map<string, Ingredient>(ingredients.map(i => [i.id, i]));
  const servings = recipe.servings || 4;

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  for (const item of recipe.ingredients) {
    const ing = ingredientMap.get(item.ingredientId);
    const name = (ing?.name || '').toLowerCase();
    const qty = item.quantity || 1;
    const unit = item.unit;

    let weightGrams = 0;
    if (unit === 'g' || unit === 'ml') weightGrams = qty;
    else if (unit === 'kg' || unit === 'l') weightGrams = qty * 1000;
    else if (unit === 'cl') weightGrams = qty * 10;
    else if (unit === 'tbsp') weightGrams = qty * 15;
    else if (unit === 'tsp') weightGrams = qty * 5;
    else if (unit === 'unit') weightGrams = qty * 70;
    else if (unit === 'clove') weightGrams = qty * 5;
    else if (unit === 'slice') weightGrams = qty * 30;
    else if (unit === 'can') weightGrams = qty * 400;
    else if (unit === 'pack') weightGrams = qty * 250;
    else weightGrams = qty * 50;

    let c100 = 80;
    let p100 = 3;
    let cb100 = 10;
    let f100 = 2;

    if (name.includes('poulet') || name.includes('chicken') || name.includes('dinde') || name.includes('veau')) {
      c100 = 165; p100 = 31; cb100 = 0; f100 = 3.6;
    } else if (name.includes('saumon') || name.includes('salmon') || name.includes('thon') || name.includes('fish') || name.includes('poisson') || name.includes('crevette') || name.includes('shrimp')) {
      c100 = 180; p100 = 22; cb100 = 0; f100 = 10;
    } else if (name.includes('boeuf') || name.includes('beef') || name.includes('steak') || name.includes('haché') || name.includes('viande') || name.includes('porc') || name.includes('lardons')) {
      c100 = 250; p100 = 26; cb100 = 0; f100 = 16;
    } else if (name.includes('oeuf') || name.includes('egg')) {
      c100 = 145; p100 = 13; cb100 = 1; f100 = 10;
    } else if (name.includes('pâtes') || name.includes('pasta') || name.includes('riz') || name.includes('rice') || name.includes('quinoa') || name.includes('nouilles') || name.includes('semoule')) {
      c100 = 350; p100 = 12; cb100 = 72; f100 = 1.5;
    } else if (name.includes('fromage') || name.includes('cheese') || name.includes('parmesan') || name.includes('mozzarella') || name.includes('gruyère') || name.includes('cheddar') || name.includes('feta')) {
      c100 = 360; p100 = 24; cb100 = 2; f100 = 28;
    } else if (name.includes('huile') || name.includes('oil') || name.includes('beurre') || name.includes('butter')) {
      c100 = 880; p100 = 0; cb100 = 0; f100 = 99;
    } else if (name.includes('crème') || name.includes('cream') || name.includes('lait') || name.includes('milk')) {
      c100 = 190; p100 = 3; cb100 = 4; f100 = 18;
    } else if (name.includes('lentille') || name.includes('lentil') || name.includes('pois') || name.includes('haricot') || name.includes('bean') || name.includes('chickpea')) {
      c100 = 120; p100 = 9; cb100 = 20; f100 = 1;
    } else if (name.includes('avocat') || name.includes('avocado')) {
      c100 = 160; p100 = 2; cb100 = 9; f100 = 15;
    } else if (name.includes('pomme de terre') || name.includes('potato') || name.includes('patate')) {
      c100 = 85; p100 = 2; cb100 = 19; f100 = 0.1;
    } else if (name.includes('pain') || name.includes('bread') || name.includes('farine') || name.includes('flour')) {
      c100 = 270; p100 = 9; cb100 = 50; f100 = 2.5;
    } else if (name.includes('sucre') || name.includes('sugar') || name.includes('miel') || name.includes('honey')) {
      c100 = 390; p100 = 0; cb100 = 99; f100 = 0;
    } else if (name.includes('salade') || name.includes('tomate') || name.includes('courgette') || name.includes('épinard') || name.includes('oignon') || name.includes('ail') || name.includes('carotte') || name.includes('poivron') || name.includes('champignon') || name.includes('brocoli')) {
      c100 = 28; p100 = 1.8; cb100 = 5; f100 = 0.3;
    }

    const ratio = weightGrams / 100;
    totalCalories += c100 * ratio;
    totalProtein += p100 * ratio;
    totalCarbs += cb100 * ratio;
    totalFat += f100 * ratio;
  }

  if (totalCalories < 50) {
    totalCalories = 480 * servings;
    totalProtein = 22 * servings;
    totalCarbs = 50 * servings;
    totalFat = 18 * servings;
  }

  return {
    calories: Math.max(100, Math.round(totalCalories / servings)),
    protein: Math.max(2, Math.round((totalProtein / servings) * 10) / 10),
    carbs: Math.max(5, Math.round((totalCarbs / servings) * 10) / 10),
    fat: Math.max(2, Math.round((totalFat / servings) * 10) / 10)
  };
}

export function getDietaryBadges(recipe: Recipe, nutrition: NutritionInfo): DietaryBadge[] {
  const badges: DietaryBadge[] = [];

  if (nutrition.protein >= 25) {
    badges.push({
      id: 'protein',
      label: 'Riche en protéines',
      color: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
      icon: 'Flame'
    });
  }

  if (nutrition.calories <= 450) {
    badges.push({
      id: 'light',
      label: 'Léger & Sain',
      color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      icon: 'Sparkles'
    });
  }

  const prepCookTotal = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  if (prepCookTotal <= 25 && prepCookTotal > 0) {
    badges.push({
      id: 'express',
      label: 'Express ≤25m',
      color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
      icon: 'Zap'
    });
  }

  const tags = (recipe.tags || []).map(t => t.toLowerCase());
  const isVeg = tags.includes('végétarien') || tags.includes('vegetarian') || tags.includes('veggie');
  if (isVeg) {
    badges.push({
      id: 'veggie',
      label: 'Végétarien',
      color: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30',
      icon: 'Leaf'
    });
  }

  return badges;
}

// -------------------------------------------------------------
// ANTI-GASPILLAGE / PANTRY MATCHING
// -------------------------------------------------------------
export function matchRecipesWithPantry(
  recipes: Recipe[] = [],
  pantryMap: Record<string, boolean> = {},
  ingredients: Ingredient[] = []
): RecipeMatchResult[] {
  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  const ingMap = new Map<string, Ingredient>(safeIngredients.map(i => [i.id, i]));
  const results: RecipeMatchResult[] = [];

  for (const recipe of safeRecipes) {
    if (!recipe.ingredients || recipe.ingredients.length === 0) continue;

    let availableCount = 0;
    const missing: Ingredient[] = [];

    for (const ri of recipe.ingredients) {
      if (pantryMap[ri.ingredientId]) {
        availableCount++;
      } else {
        const ing = ingMap.get(ri.ingredientId);
        if (ing) missing.push(ing);
      }
    }

    const total = recipe.ingredients.length;
    const matchPercentage = total > 0 ? Math.round((availableCount / total) * 100) : 0;

    results.push({
      recipe,
      totalIngredients: total,
      availableCount,
      missingIngredients: missing,
      matchPercentage
    });
  }

  results.sort((a, b) => {
    // 1. Trier par le plus grand nombre d'ingrédients du frigo utilisés
    if (b.availableCount !== a.availableCount) {
      return b.availableCount - a.availableCount;
    }
    // 2. En cas d'égalité, trier par le minimum d'ingrédients manquants
    if (a.missingIngredients.length !== b.missingIngredients.length) {
      return a.missingIngredients.length - b.missingIngredients.length;
    }
    // 3. Enfin, trier par pourcentage de correspondance
    return b.matchPercentage - a.matchPercentage;
  });

  // Limiter le résultat aux 20 meilleures recettes
  return results.slice(0, 20);
}

// -------------------------------------------------------------
// AUTO-PLAN SMART GENERATOR
// -------------------------------------------------------------
export function generateSmartWeeklyPlan(
  recipes: Recipe[] = [],
  options: AutoPlanOptions
): Recipe[] {
  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  let pool = [...safeRecipes];

  if (options.maxPrepTime) {
    pool = pool.filter(r => (r.prepTimeMinutes || 0) <= options.maxPrepTime!);
  }

  if (options.preferredCookingMode && options.preferredCookingMode !== 'all') {
    const modeMatches = pool.filter(r => inferCookingMode(r) === options.preferredCookingMode);
    if (modeMatches.length >= Math.min(3, options.mealCount)) {
      pool = modeMatches;
    }
  }

  if (options.dietaryStyle === 'vegetarian') {
    const veg = pool.filter(r => (r.tags || []).some(t => t.toLowerCase().includes('végé') || t.toLowerCase().includes('veggie')));
    if (veg.length > 0) pool = veg;
  } else if (options.dietaryStyle === 'quick') {
    pool.sort((a, b) => (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes));
  }

  if (pool.length === 0) {
    pool = [...safeRecipes];
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const selected: Recipe[] = [];

  for (let i = 0; i < options.mealCount; i++) {
    if (shuffled.length > 0) {
      const pick = shuffled.shift()!;
      selected.push(pick);
      if (!options.noDuplicates) {
        shuffled.push(pick);
      }
    } else if (safeRecipes.length > 0) {
      selected.push(safeRecipes[Math.floor(Math.random() * safeRecipes.length)]);
    }
  }

  return selected;
}
