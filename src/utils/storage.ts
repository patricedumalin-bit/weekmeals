import {
  get,
  set,
  del,
  clear,
  update
} from 'idb-keyval';
import {
  IngredientCategory, 
  Ingredient, 
  RecipeCategory, 
  Recipe, 
  WeeklyPlan,
  CustomShoppingItem
} from '../types';
import { normalizeRecipeCategoryId } from '../data/categoriesData';

const STORAGE_KEYS = {
  RECIPES: 'meal_app_recipes_v2',
  RECIPE_CATEGORIES: 'meal_app_recipe_cats_v2',
  INGREDIENTS: 'meal_app_ingredients_v2',
  INGREDIENT_CATEGORIES: 'meal_app_ing_cats_v2',
  WEEKLY_PLAN: 'meal_app_weekly_plan_v2',
  SHOPPING_CHECKED: 'meal_app_shopping_checked_v2',
  CUSTOM_SHOPPING: 'meal_app_custom_shopping_v2',
  PANTRY: 'meal_app_pantry_v1',
  MIGRATED: 'meal_app_migrated_to_idb'
};

let initialDataPromise: Promise<typeof import('../data/initialData')> | null = null;
function loadInitialDataModule() {
  if (!initialDataPromise) {
    initialDataPromise = import('../data/initialData');
  }
  return initialDataPromise;
}

/**
 * Migrates data from localStorage to IndexedDB if not already done.
 */
async function migrateFromLocalStorage() {
  const isMigrated = localStorage.getItem(STORAGE_KEYS.MIGRATED);
  if (isMigrated === 'true') return;

  console.log('Migrating data from localStorage to IndexedDB...');

  for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
    if (storageKey === STORAGE_KEYS.MIGRATED) continue;

    const localData = localStorage.getItem(storageKey);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        await set(storageKey, parsed);
        console.log(`Migrated ${key} successfully.`);
      } catch (e) {
        console.warn(`Failed to migrate ${key}:`, e);
      }
    }
  }

  localStorage.setItem(STORAGE_KEYS.MIGRATED, 'true');
  console.log('Migration complete.');
}

export async function loadStoredData() {
  await migrateFromLocalStorage();

  const {
    INITIAL_INGREDIENT_CATEGORIES,
    INITIAL_INGREDIENTS,
    INITIAL_RECIPE_CATEGORIES,
    INITIAL_RECIPES,
    INITIAL_WEEKLY_PLAN,
    INITIAL_PANTRY
  } = await loadInitialDataModule();

  try {
    const recipesData = await get<Recipe[]>(STORAGE_KEYS.RECIPES);
    const recipeCatsData = await get<RecipeCategory[]>(STORAGE_KEYS.RECIPE_CATEGORIES);
    const ingredientsData = await get<Ingredient[]>(STORAGE_KEYS.INGREDIENTS);
    const ingCatsData = await get<IngredientCategory[]>(STORAGE_KEYS.INGREDIENT_CATEGORIES);
    const weeklyPlanData = await get<WeeklyPlan>(STORAGE_KEYS.WEEKLY_PLAN);
    const checkedMapData = await get<Record<string, boolean>>(STORAGE_KEYS.SHOPPING_CHECKED);
    const customItemsData = await get<CustomShoppingItem[]>(STORAGE_KEYS.CUSTOM_SHOPPING);
    const pantryMapData = await get<Record<string, boolean>>(STORAGE_KEYS.PANTRY);

    let recipes: Recipe[] = INITIAL_RECIPES;
    if (recipesData) {
      // Filter out only legacy mock items with placeholder titles or bulk datasets.
      // ALWAYS keep user's personal & imported recipes (isCustom / imported- / rec-custom-).
      const cleanStored = recipesData.filter(r => {
        if (r.isCustom || r.id.startsWith('imported-') || r.id.startsWith('rec-custom-')) {
          return true; // Conservé à 100%
        }
        if (/familial|familiale|family main|family starter|dessert maison \d+|cloud-recipe-\d+/i.test(r.title || '')) {
          return false; // Anciennes recettes de test supprimées
        }
        if (r.id.startsWith('rec-fr-') || r.id.startsWith('wb-')) {
          return false; // Anciens gros catalogues obsolètes supprimés
        }
        return true;
      });

      const normalizedParsed = cleanStored.map(r => ({ ...r, categoryId: normalizeRecipeCategoryId(r.categoryId) }));
      const merged: Recipe[] = [...normalizedParsed];
      const existingIds = new Set(normalizedParsed.map(r => r.id));
      for (const defaultRecipe of INITIAL_RECIPES) {
        if (!existingIds.has(defaultRecipe.id)) {
          merged.push(defaultRecipe);
        }
      }
      recipes = merged;
      await saveRecipes(recipes);
    }

    let ingredients: Ingredient[] = INITIAL_INGREDIENTS;
    if (ingredientsData && ingredientsData.length <= 100) {
      const existingIngIds = new Set(ingredientsData.map(i => i.id));
      const mergedIngs = [...ingredientsData];
      for (const defaultIng of INITIAL_INGREDIENTS) {
        if (!existingIngIds.has(defaultIng.id)) {
          mergedIngs.push(defaultIng);
        }
      }
      ingredients = mergedIngs;
    } else {
      // Purge old bulk ingredient catalog and save clean new initial ingredients
      ingredients = INITIAL_INGREDIENTS;
      await saveIngredients(INITIAL_INGREDIENTS);
    }

    const recipeCategories = recipeCatsData || INITIAL_RECIPE_CATEGORIES;
    const ingredientCategories = ingCatsData || INITIAL_INGREDIENT_CATEGORIES;
    const weeklyPlan = weeklyPlanData || INITIAL_WEEKLY_PLAN;
    const checkedMap = checkedMapData || {};
    const customItems = customItemsData || [];
    const pantryMap = pantryMapData || INITIAL_PANTRY;

    return {
      recipes,
      recipeCategories,
      ingredients,
      ingredientCategories,
      weeklyPlan,
      checkedMap,
      customItems,
      pantryMap
    };
  } catch (error) {
    console.error('Error loading data from IndexedDB:', error);
    return {
      recipes: INITIAL_RECIPES,
      recipeCategories: INITIAL_RECIPE_CATEGORIES,
      ingredients: INITIAL_INGREDIENTS,
      ingredientCategories: INITIAL_INGREDIENT_CATEGORIES,
      weeklyPlan: INITIAL_WEEKLY_PLAN,
      checkedMap: {},
      customItems: [],
      pantryMap: INITIAL_PANTRY
    };
  }
}

export async function savePantryMap(pantryMap: Record<string, boolean>) {
  await set(STORAGE_KEYS.PANTRY, pantryMap);
}

export async function saveRecipes(recipes: Recipe[]) {
  await set(STORAGE_KEYS.RECIPES, recipes);
}

export async function saveRecipeCategories(categories: RecipeCategory[]) {
  await set(STORAGE_KEYS.RECIPE_CATEGORIES, categories);
}

export async function saveIngredients(ingredients: Ingredient[]) {
  await set(STORAGE_KEYS.INGREDIENTS, ingredients);
}

export async function saveIngredientCategories(categories: IngredientCategory[]) {
  await set(STORAGE_KEYS.INGREDIENT_CATEGORIES, categories);
}

export async function saveWeeklyPlan(plan: WeeklyPlan) {
  await set(STORAGE_KEYS.WEEKLY_PLAN, plan);
}

export async function saveCheckedMap(checkedMap: Record<string, boolean>) {
  await set(STORAGE_KEYS.SHOPPING_CHECKED, checkedMap);
}

export async function saveCustomShoppingItems(items: CustomShoppingItem[]) {
  await set(STORAGE_KEYS.CUSTOM_SHOPPING, items);
}

export async function resetToDefaults() {
  await del(STORAGE_KEYS.RECIPES);
  await del(STORAGE_KEYS.RECIPE_CATEGORIES);
  await del(STORAGE_KEYS.INGREDIENTS);
  await del(STORAGE_KEYS.INGREDIENT_CATEGORIES);
  await del(STORAGE_KEYS.WEEKLY_PLAN);
  await del(STORAGE_KEYS.SHOPPING_CHECKED);
  await del(STORAGE_KEYS.CUSTOM_SHOPPING);
  await del(STORAGE_KEYS.PANTRY);
}

export async function generateFullGenericDatabase() {
  const {
    INITIAL_INGREDIENT_CATEGORIES,
    INITIAL_INGREDIENTS,
    INITIAL_RECIPE_CATEGORIES,
    INITIAL_RECIPES,
    INITIAL_WEEKLY_PLAN,
    INITIAL_PANTRY
  } = await loadInitialDataModule();

  await Promise.all([
    saveRecipes(INITIAL_RECIPES),
    saveRecipeCategories(INITIAL_RECIPE_CATEGORIES),
    saveIngredients(INITIAL_INGREDIENTS),
    saveIngredientCategories(INITIAL_INGREDIENT_CATEGORIES),
    saveWeeklyPlan(INITIAL_WEEKLY_PLAN),
    savePantryMap(INITIAL_PANTRY),
    saveCheckedMap({}),
    saveCustomShoppingItems([])
  ]);

  return {
    recipes: INITIAL_RECIPES,
    recipeCategories: INITIAL_RECIPE_CATEGORIES,
    ingredients: INITIAL_INGREDIENTS,
    ingredientCategories: INITIAL_INGREDIENT_CATEGORIES,
    weeklyPlan: INITIAL_WEEKLY_PLAN,
    pantryMap: INITIAL_PANTRY,
    checkedMap: {},
    customItems: []
  };
}

export async function clearDatabase() {
  await Promise.all([
    set(STORAGE_KEYS.RECIPES, []),
    set(STORAGE_KEYS.RECIPE_CATEGORIES, []),
    set(STORAGE_KEYS.INGREDIENTS, []),
    set(STORAGE_KEYS.INGREDIENT_CATEGORIES, []),
    set(STORAGE_KEYS.WEEKLY_PLAN, { meals: [] }),
    set(STORAGE_KEYS.SHOPPING_CHECKED, {}),
    set(STORAGE_KEYS.CUSTOM_SHOPPING, [])
  ]);
}

export function exportDatabaseJson(data: {
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  weeklyPlan: WeeklyPlan;
}): string {
  return JSON.stringify(
    {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      ...data
    },
    null,
    2
  );
}
