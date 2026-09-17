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
};

// The default recipe/ingredient catalog (~2600 recipes, ~1200 ingredients) is one
// of the heaviest parts of the app. It is dynamically imported (instead of a
// top-level static import) so its dedicated build chunk is only downloaded once
// actually needed, letting the initial app shell render/interact sooner.
// The import is cached so repeated calls don't re-fetch the chunk.
let initialDataPromise: Promise<typeof import('../data/initialData')> | null = null;
function loadInitialDataModule() {
  if (!initialDataPromise) {
    initialDataPromise = import('../data/initialData');
  }
  return initialDataPromise;
}

export async function loadStoredData() {
  const {
    INITIAL_INGREDIENT_CATEGORIES,
    INITIAL_INGREDIENTS,
    INITIAL_RECIPE_CATEGORIES,
    INITIAL_RECIPES,
    INITIAL_WEEKLY_PLAN,
    INITIAL_PANTRY
  } = await loadInitialDataModule();

  try {
    const rawRecipes = localStorage.getItem(STORAGE_KEYS.RECIPES);
    const rawRecipeCats = localStorage.getItem(STORAGE_KEYS.RECIPE_CATEGORIES);
    const rawIngredients = localStorage.getItem(STORAGE_KEYS.INGREDIENTS);
    const rawIngCats = localStorage.getItem(STORAGE_KEYS.INGREDIENT_CATEGORIES);
    const rawWeeklyPlan = localStorage.getItem(STORAGE_KEYS.WEEKLY_PLAN);
    const rawChecked = localStorage.getItem(STORAGE_KEYS.SHOPPING_CHECKED);
    const rawCustom = localStorage.getItem(STORAGE_KEYS.CUSTOM_SHOPPING);
    const rawPantry = localStorage.getItem(STORAGE_KEYS.PANTRY);

    let recipes: Recipe[] = INITIAL_RECIPES;
    if (rawRecipes) {
      try {
        const parsed: Recipe[] = JSON.parse(rawRecipes);
        if (parsed.length === 0) {
          recipes = [];
        } else {
          // Normalise les categoryId "synonymes" (ex: 'rcat-starters') vers les
          // 8 catégories officielles, y compris pour les recettes déjà stockées
          // localement lors d'une session précédente.
          const normalizedParsed = parsed.map(r => ({ ...r, categoryId: normalizeRecipeCategoryId(r.categoryId) }));
          const merged: Recipe[] = [...normalizedParsed];
          const existingIds = new Set(normalizedParsed.map(r => r.id));
          for (const defaultRecipe of INITIAL_RECIPES) {
            if (!existingIds.has(defaultRecipe.id)) {
              merged.push(defaultRecipe);
            }
          }
          recipes = merged;
        }
      } catch (e) {
        recipes = INITIAL_RECIPES;
      }
    }

    let ingredients: Ingredient[] = INITIAL_INGREDIENTS;
    if (rawIngredients) {
      try {
        const parsedIngs: Ingredient[] = JSON.parse(rawIngredients);
        if (parsedIngs.length === 0) {
          ingredients = [];
        } else {
          const existingIngIds = new Set(parsedIngs.map(i => i.id));
          const mergedIngs = [...parsedIngs];
          for (const defaultIng of INITIAL_INGREDIENTS) {
            if (!existingIngIds.has(defaultIng.id)) {
              mergedIngs.push(defaultIng);
            }
          }
          ingredients = mergedIngs;
        }
      } catch (e) {
        ingredients = INITIAL_INGREDIENTS;
      }
    }
    const recipeCategories: RecipeCategory[] = rawRecipeCats ? JSON.parse(rawRecipeCats) : INITIAL_RECIPE_CATEGORIES;
    const ingredientCategories: IngredientCategory[] = rawIngCats ? JSON.parse(rawIngCats) : INITIAL_INGREDIENT_CATEGORIES;
    const weeklyPlan: WeeklyPlan = rawWeeklyPlan ? JSON.parse(rawWeeklyPlan) : INITIAL_WEEKLY_PLAN;
    const checkedMap: Record<string, boolean> = rawChecked ? JSON.parse(rawChecked) : {};
    const customItems: CustomShoppingItem[] = rawCustom ? JSON.parse(rawCustom) : [];
    const pantryMap: Record<string, boolean> = rawPantry ? JSON.parse(rawPantry) : INITIAL_PANTRY;

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
    console.error('Error loading data from localStorage:', error);
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

export function savePantryMap(pantryMap: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEYS.PANTRY, JSON.stringify(pantryMap));
}

export function saveRecipes(recipes: Recipe[]) {
  localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
}

export function saveRecipeCategories(categories: RecipeCategory[]) {
  localStorage.setItem(STORAGE_KEYS.RECIPE_CATEGORIES, JSON.stringify(categories));
}

export function saveIngredients(ingredients: Ingredient[]) {
  localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(ingredients));
}

export function saveIngredientCategories(categories: IngredientCategory[]) {
  localStorage.setItem(STORAGE_KEYS.INGREDIENT_CATEGORIES, JSON.stringify(categories));
}

export function saveWeeklyPlan(plan: WeeklyPlan) {
  localStorage.setItem(STORAGE_KEYS.WEEKLY_PLAN, JSON.stringify(plan));
}

export function saveCheckedMap(checkedMap: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEYS.SHOPPING_CHECKED, JSON.stringify(checkedMap));
}

export function saveCustomShoppingItems(items: CustomShoppingItem[]) {
  localStorage.setItem(STORAGE_KEYS.CUSTOM_SHOPPING, JSON.stringify(items));
}

export function resetToDefaults() {
  localStorage.removeItem(STORAGE_KEYS.RECIPES);
  localStorage.removeItem(STORAGE_KEYS.RECIPE_CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.INGREDIENTS);
  localStorage.removeItem(STORAGE_KEYS.INGREDIENT_CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.WEEKLY_PLAN);
  localStorage.removeItem(STORAGE_KEYS.SHOPPING_CHECKED);
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_SHOPPING);
  localStorage.removeItem(STORAGE_KEYS.PANTRY);
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

  saveRecipes(INITIAL_RECIPES);
  saveRecipeCategories(INITIAL_RECIPE_CATEGORIES);
  saveIngredients(INITIAL_INGREDIENTS);
  saveIngredientCategories(INITIAL_INGREDIENT_CATEGORIES);
  saveWeeklyPlan(INITIAL_WEEKLY_PLAN);
  savePantryMap(INITIAL_PANTRY);
  saveCheckedMap({});
  saveCustomShoppingItems([]);
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

export function clearDatabase() {
  console.log('Clearing database in localStorage...');
  localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.RECIPE_CATEGORIES, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.INGREDIENT_CATEGORIES, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.WEEKLY_PLAN, JSON.stringify({ meals: [] }));
  localStorage.setItem(STORAGE_KEYS.SHOPPING_CHECKED, JSON.stringify({}));
  localStorage.setItem(STORAGE_KEYS.CUSTOM_SHOPPING, JSON.stringify([]));
  console.log('Database cleared.');
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
