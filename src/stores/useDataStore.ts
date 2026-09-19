import { create } from 'zustand';
import {
  Recipe,
  RecipeCategory,
  Ingredient,
  IngredientCategory,
  WeeklyPlan,
  CustomShoppingItem
} from '../types';
import {
  saveRecipes,
  saveRecipeCategories,
  saveIngredients,
  saveIngredientCategories,
  saveWeeklyPlan,
  saveCheckedMap,
  saveCustomShoppingItems,
  savePantryMap
} from '../utils/storage';

interface DataState {
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  weeklyPlan: WeeklyPlan | null;
  checkedMap: Record<string, boolean>;
  customItems: CustomShoppingItem[];
  pantryMap: Record<string, boolean>;
  pantryAddedDates: Record<string, string>;
  totalSavingsEur: number;
  weeklyHistory: WeeklyHistoryItem[];
  isLoaded: boolean;

  // Actions
  setRecipes: (recipes: Recipe[]) => void;
  setRecipeCategories: (categories: RecipeCategory[]) => void;
  setIngredients: (ingredients: Ingredient[]) => void;
  setIngredientCategories: (categories: IngredientCategory[]) => void;
  setWeeklyPlan: (plan: WeeklyPlan | null) => void;
  setCheckedMap: (map: Record<string, boolean>) => void;
  setCustomItems: (items: CustomShoppingItem[]) => void;
  setPantryMap: (map: Record<string, boolean>) => void;
  setPantryAddedDates: (map: Record<string, string>) => void;
  addSavings: (amount: number) => void;
  archiveWeeklyPlan: (summary: WeeklyHistoryItem) => void;
  setIsLoaded: (isLoaded: boolean) => void;

  // Business Logic Actions (from App.tsx)
  updateWeeklyPlan: (plan: WeeklyPlan) => void;
  saveRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: string) => void;
  saveRecipeCategory: (cat: RecipeCategory) => void;
  deleteRecipeCategory: (catId: string) => void;
  saveIngredient: (ing: Ingredient) => void;
  deleteIngredient: (ingId: string) => void;
  saveIngredientCategory: (cat: IngredientCategory) => void;
  deleteIngredientCategory: (catId: string) => void;
  toggleShoppingItem: (key: string) => void;
  resetChecked: () => void;
  addCustomShoppingItem: (item: CustomShoppingItem) => void;
  removeCustomShoppingItem: (id: string) => void;
  togglePantryItem: (ingredientId: string) => void;
  batchSetPantry: (updates: Record<string, boolean>) => void;
  clearPantry: () => void;
  toggleMealCooked: (mealIndex: number) => void;
  lockWeeklyPlan: (isLocked: boolean) => void;
  resetWeeklyPlan: () => void;
  importDatabase: (data: any) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  // ... (previous states)
  recipes: [],
  recipeCategories: [],
  ingredients: [],
  ingredientCategories: [],
  weeklyPlan: null,
  checkedMap: {},
  customItems: [],
  pantryMap: {},
  pantryAddedDates: {},
  totalSavingsEur: Number(localStorage.getItem('meal_total_savings') || 0),
  weeklyHistory: JSON.parse(localStorage.getItem('meal_weekly_history') || '[]'),
  isLoaded: false,

  setRecipes: (recipes) => set({ recipes }),
  setRecipeCategories: (recipeCategories) => set({ recipeCategories }),
  setIngredients: (ingredients) => set({ ingredients }),
  setIngredientCategories: (ingredientCategories) => set({ ingredientCategories }),
  setWeeklyPlan: (weeklyPlan) => set({ weeklyPlan }),
  setCheckedMap: (checkedMap) => set({ checkedMap }),
  setCustomItems: (customItems) => set({ customItems }),
  setPantryMap: (pantryMap) => set({ pantryMap }),
  setPantryAddedDates: (pantryAddedDates) => set({ pantryAddedDates }),
  addSavings: (amount) => {
    const newVal = get().totalSavingsEur + amount;
    set({ totalSavingsEur: newVal });
    localStorage.setItem('meal_total_savings', newVal.toString());
  },
  archiveWeeklyPlan: (summary) => {
    const history = [summary, ...get().weeklyHistory].slice(0, 52); // Keep 1 year
    set({ weeklyHistory: history });
    localStorage.setItem('meal_weekly_history', JSON.stringify(history));
  },
  clearHistory: () => {
    set({ weeklyHistory: [] });
    localStorage.removeItem('meal_weekly_history');
  },
  setIsLoaded: (isLoaded) => set({ isLoaded }),

  updateWeeklyPlan: (newPlan) => {
    set({ weeklyPlan: newPlan });
    saveWeeklyPlan(newPlan);
  },

  saveRecipe: (recipe) => {
    const { recipes } = get();
    const updated = recipes.some(r => r.id === recipe.id)
      ? recipes.map(r => (r.id === recipe.id ? recipe : r))
      : [recipe, ...recipes];
    set({ recipes: updated });
    saveRecipes(updated);
  },

  deleteRecipe: (recipeId) => {
    const { recipes, weeklyPlan } = get();
    const updated = recipes.filter(r => r.id !== recipeId);
    set({ recipes: updated });
    saveRecipes(updated);

    if (weeklyPlan) {
      const cleanedMeals = weeklyPlan.meals.map(m => ({
        ...m,
        recipeIds: (m.recipeIds || []).filter(id => id !== recipeId)
      }));
      const newPlan = { ...weeklyPlan, meals: cleanedMeals };
      set({ weeklyPlan: newPlan });
      saveWeeklyPlan(newPlan);
    }
  },

  saveRecipeCategory: (cat) => {
    const { recipeCategories } = get();
    const updated = recipeCategories.some(c => c.id === cat.id)
      ? recipeCategories.map(c => (c.id === cat.id ? cat : c))
      : [...recipeCategories, cat];
    set({ recipeCategories: updated });
    saveRecipeCategories(updated);
  },

  deleteRecipeCategory: (catId) => {
    const updated = get().recipeCategories.filter(c => c.id !== catId);
    set({ recipeCategories: updated });
    saveRecipeCategories(updated);
  },

  saveIngredient: (ing) => {
    const { ingredients } = get();
    const updated = ingredients.some(i => i.id === ing.id)
      ? ingredients.map(i => (i.id === ing.id ? ing : i))
      : [ing, ...ingredients];
    set({ ingredients: updated });
    saveIngredients(updated);
  },

  deleteIngredient: (ingId) => {
    const updated = get().ingredients.filter(i => i.id !== ingId);
    set({ ingredients: updated });
    saveIngredients(updated);
  },

  saveIngredientCategory: (cat) => {
    const { ingredientCategories } = get();
    const updated = ingredientCategories.some(c => c.id === cat.id)
      ? ingredientCategories.map(c => (c.id === cat.id ? cat : c))
      : [...ingredientCategories, cat];
    set({ ingredientCategories: updated });
    saveIngredientCategories(updated);
  },

  deleteIngredientCategory: (catId) => {
    const updated = get().ingredientCategories.filter(c => c.id !== catId);
    set({ ingredientCategories: updated });
    saveIngredientCategories(updated);
  },

  toggleShoppingItem: (key) => {
    const updated = { ...get().checkedMap, [key]: !get().checkedMap[key] };
    set({ checkedMap: updated });
    saveCheckedMap(updated);
  },

  resetChecked: () => {
    set({ checkedMap: {} });
    saveCheckedMap({});
  },

  addCustomShoppingItem: (item) => {
    const updated = [item, ...get().customItems];
    set({ customItems: updated });
    saveCustomShoppingItems(updated);
  },

  removeCustomShoppingItem: (id) => {
    const updated = get().customItems.filter(i => i.id !== id);
    set({ customItems: updated });
    saveCustomShoppingItems(updated);
  },

  togglePantryItem: (ingredientId) => {
    const isNowInStock = !get().pantryMap[ingredientId];
    const updatedPantry = { ...get().pantryMap, [ingredientId]: isNowInStock };
    const updatedDates = { ...get().pantryAddedDates };

    if (isNowInStock) {
      updatedDates[ingredientId] = new Date().toISOString();
    } else {
      delete updatedDates[ingredientId];
    }

    set({ pantryMap: updatedPantry, pantryAddedDates: updatedDates });
    savePantryMap(updatedPantry);
    localStorage.setItem('meal_pantry_dates', JSON.stringify(updatedDates));
  },

  batchSetPantry: (updates) => {
    const currentDates = { ...get().pantryAddedDates };
    const newDates: Record<string, string> = {};

    Object.entries(updates).forEach(([id, inStock]) => {
      if (inStock) {
        newDates[id] = currentDates[id] || new Date().toISOString();
      }
    });

    set({ pantryMap: updates, pantryAddedDates: newDates });
    savePantryMap(updates);
    localStorage.setItem('meal_pantry_dates', JSON.stringify(newDates));
  },

  clearPantry: () => {
    set({ pantryMap: {}, pantryAddedDates: {} });
    savePantryMap({});
    localStorage.removeItem('meal_pantry_dates');
  },

  toggleMealCooked: (mealIndex) => {
    const { weeklyPlan } = get();
    if (!weeklyPlan) return;
    const updatedMeals = [...weeklyPlan.meals];
    updatedMeals[mealIndex] = { ...updatedMeals[mealIndex], isCooked: !updatedMeals[mealIndex].isCooked };
    const newPlan = { ...weeklyPlan, meals: updatedMeals };
    set({ weeklyPlan: newPlan });
    saveWeeklyPlan(newPlan);
  },

  lockWeeklyPlan: (isLocked) => {
    const { weeklyPlan } = get();
    if (!weeklyPlan) return;
    const newPlan = { ...weeklyPlan, isLocked };
    set({ weeklyPlan: newPlan });
    saveWeeklyPlan(newPlan);
  },

  resetWeeklyPlan: () => {
    const { weeklyPlan } = get();
    if (!weeklyPlan) return;
    const resetMeals = weeklyPlan.meals.map(m => ({ ...m, recipeIds: [], customMeals: [], isCooked: false }));
    const newPlan = { ...weeklyPlan, meals: resetMeals, isLocked: false, lastUpdated: new Date().toISOString() };
    set({ weeklyPlan: newPlan, checkedMap: {} });
    saveWeeklyPlan(newPlan);
    saveCheckedMap({});
  },

  importDatabase: (data) => {
    if (data.recipes) { set({ recipes: data.recipes }); saveRecipes(data.recipes); }
    if (data.recipeCategories) { set({ recipeCategories: data.recipeCategories }); saveRecipeCategories(data.recipeCategories); }
    if (data.ingredients) { set({ ingredients: data.ingredients }); saveIngredients(data.ingredients); }
    if (data.ingredientCategories) { set({ ingredientCategories: data.ingredientCategories }); saveIngredientCategories(data.ingredientCategories); }
    if (data.weeklyPlan) { set({ weeklyPlan: data.weeklyPlan }); saveWeeklyPlan(data.weeklyPlan); }
  }
}));
