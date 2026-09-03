export type Theme = 'pro' | 'nature' | 'minimalist' | 'creative';

export interface ThemeColors {
  primary: string;
  accent: string;
  bg: string;
  hover: string;
}

export const themes: Record<Theme, ThemeColors> = {
  pro: { primary: '#1E293B', accent: '#2563EB', bg: '#F8F9FA', hover: '#93C5FD' },
  nature: { primary: '#1C3A27', accent: '#C85A32', bg: '#FBF8F3', hover: '#A3B18A' },
  minimalist: { primary: '#18181B', accent: '#D4AF37', bg: '#FFFFFF', hover: '#A1A1AA' },
  creative: { primary: '#2E1065', accent: '#7C3AED', bg: '#F5F3FF', hover: '#F97316' },
};

export type UnitType = 
  | 'g' 
  | 'kg' 
  | 'ml' 
  | 'cl' 
  | 'l' 
  | 'tbsp' 
  | 'tsp' 
  | 'unit' 
  | 'clove' 
  | 'pinch' 
  | 'can' 
  | 'pack' 
  | 'bunch' 
  | 'slice';

export interface IngredientCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  order: number;
}

export interface Ingredient {
  id: string;
  name: string;
  categoryId: string;
  defaultUnit: UnitType;
  notes?: string;
}

export type CookingModeType = 'four' | 'poele' | 'cookeo' | 'robot' | 'cocotte' | 'vapeur' | 'grill' | 'sans-cuisson';

export interface CustomMealIngredient {
  ingredientId: string;
  quantity: number;
  unit: UnitType;
}

export interface RecipeCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number; // Base quantity for recipe.servings
  unit: UnitType;
  notes?: string;
}

export interface Recipe {
  id: string;
  title: string;
  categoryId: string;
  servings: number; // Default 4
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  instructions: string[];
  ingredients: RecipeIngredient[];
  tags: string[];
  isCustom?: boolean;
  cookingMode?: CookingModeType;
}

export interface CustomMeal {
  id: string;
  name: string;
  ingredients: CustomMealIngredient[];
}

export interface MealSlot {
  id: string;
  mealNumber: number;
  label: string; // e.g. "Meal 1", "Monday Dinner", etc.
  servings: number; // Defaults to 4, can be customized per meal
  recipeIds: string[]; // Up to 3 recipes per meal
  excludedIngredients?: Record<number, string[]>; // slotIndex -> array of excluded ingredientIds
  customMeals?: CustomMeal[];
}

export interface WeeklyPlan {
  id: string;
  numberOfMeals: number; // e.g. 7
  defaultServings: number; // 4 by default
  meals: MealSlot[];
  lastUpdated: string;
}

export interface ShoppingSource {
  mealNumber: number;
  mealLabel: string;
  recipeTitle: string;
  recipeId: string;
  rawQuantity: number;
  scaledQuantity: number;
  unit: UnitType;
  servings: number;
}

export interface AggregatedShoppingItem {
  ingredientId: string;
  ingredientName: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  totalQuantity: number;
  unit: UnitType;
  checked: boolean;
  sources: ShoppingSource[];
}

export interface CustomShoppingItem {
  id: string;
  name: string;
  categoryId: string;
  quantity: number;
  unit: UnitType;
  checked: boolean;
}

export type ActiveTab = 'planner' | 'meals' | 'shopping' | 'database';
