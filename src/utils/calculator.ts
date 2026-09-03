import { 
  WeeklyPlan, 
  Recipe, 
  Ingredient, 
  IngredientCategory, 
  AggregatedShoppingItem, 
  ShoppingSource,
  UnitType,
  CustomShoppingItem,
  CookingModeType
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

export function formatQuantity(num: number): string {
  if (num === 0) return '0';
  // Check if it's close to an integer
  const rounded = Math.round(num * 100) / 100;
  if (Math.abs(rounded - Math.round(rounded)) < 0.001) {
    return Math.round(rounded).toString();
  }
  // Check common fractions
  const intPart = Math.floor(rounded);
  const frac = rounded - intPart;
  if (Math.abs(frac - 0.5) < 0.05) return intPart > 0 ? `${intPart} ½` : '½';
  if (Math.abs(frac - 0.25) < 0.05) return intPart > 0 ? `${intPart} ¼` : '¼';
  if (Math.abs(frac - 0.75) < 0.05) return intPart > 0 ? `${intPart} ¾` : '¾';
  if (Math.abs(frac - 0.33) < 0.05) return intPart > 0 ? `${intPart} ⅓` : '⅓';
  if (Math.abs(frac - 0.67) < 0.05) return intPart > 0 ? `${intPart} ⅔` : '⅔';
  
  return rounded.toFixed(1).replace(/\.0$/, '');
}

export function calculateShoppingList(
  plan: WeeklyPlan,
  recipes: Recipe[],
  ingredients: Ingredient[],
  categories: IngredientCategory[],
  checkedMap: Record<string, boolean> = {},
  customItems: CustomShoppingItem[] = []
): {
  groupedByCategory: {
    category: IngredientCategory;
    items: AggregatedShoppingItem[];
    checkedCount: number;
    totalCount: number;
  }[];
  totalItemsCount: number;
  checkedItemsCount: number;
} {
  const recipeMap = new Map<string, Recipe>(recipes.map(r => [r.id, r]));
  const ingredientMap = new Map<string, Ingredient>(ingredients.map(i => [i.id, i]));
  const categoryMap = new Map<string, IngredientCategory>(categories.map(c => [c.id, c]));

  // Map of ingredientId + unit -> AggregatedShoppingItem
  const aggregatedMap = new Map<string, AggregatedShoppingItem>();

  for (const meal of plan.meals) {
    const mealServings = meal.servings || plan.defaultServings || 4;

    // Process custom meal ingredients if any
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

          const key = `${ingredient.id}_${customIng.unit}`;
          const scaledQty = customIng.quantity * (mealServings / 4);

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
            existing.totalQuantity += scaledQty;
            existing.sources.push(source);
          } else {
            aggregatedMap.set(key, {
              ingredientId: ingredient.id,
              ingredientName: ingredient.name,
              categoryId: category.id,
              categoryName: category.name,
              categoryIcon: category.icon,
              categoryColor: category.color,
              totalQuantity: scaledQty,
              unit: customIng.unit,
              checked: !!checkedMap[key],
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

        const key = `${ingredient.id}_${recipeIng.unit}`;
        const scaledQty = recipeIng.quantity * scaleFactor;

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
          existing.totalQuantity += scaledQty;
          existing.sources.push(source);
        } else {
          aggregatedMap.set(key, {
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            categoryId: category.id,
            categoryName: category.name,
            categoryIcon: category.icon,
            categoryColor: category.color,
            totalQuantity: scaledQty,
            unit: recipeIng.unit,
            checked: !!checkedMap[key],
            sources: [source]
          });
        }
      }
    }
  }

  // Include custom items
  for (const custom of customItems) {
    const category = categoryMap.get(custom.categoryId) || {
      id: 'cat-other',
      name: 'Other',
      icon: 'ShoppingBag',
      color: 'gray',
      order: 99
    };
    const key = `custom_${custom.id}`;
    aggregatedMap.set(key, {
      ingredientId: custom.id,
      ingredientName: custom.name,
      categoryId: category.id,
      categoryName: category.name,
      categoryIcon: category.icon,
      categoryColor: category.color,
      totalQuantity: custom.quantity,
      unit: custom.unit,
      checked: custom.checked || !!checkedMap[key],
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

  const allItems = Array.from(aggregatedMap.values());

  // Group by category
  const grouped = new Map<string, AggregatedShoppingItem[]>();
  for (const item of allItems) {
    const list = grouped.get(item.categoryId) || [];
    list.push(item);
    grouped.set(item.categoryId, list);
  }

  // Sort categories by predefined order
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  // Add any extra categories if present
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
      // Sort items alphabetically
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
    checkedItemsCount: checkedItems
  };
}
