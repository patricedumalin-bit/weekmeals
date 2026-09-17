export type Theme = 'default' | 'pro' | 'nature' | 'minimalist' | 'creative' | 'girly';

export interface ThemeColors {
  primary: string;
  accent: string;
  bg: string;
  hover: string;
}

export const themes: Record<Theme, ThemeColors> = {
  default: { primary: '#1E293B', accent: '#2563EB', bg: '#F8F9FA', hover: '#93C5FD' },
  pro: { primary: '#1E293B', accent: '#2563EB', bg: '#F8F9FA', hover: '#93C5FD' },
  nature: { primary: '#1C3A27', accent: '#C85A32', bg: '#FBF8F3', hover: '#A3B18A' },
  minimalist: { primary: '#18181B', accent: '#D4AF37', bg: '#FFFFFF', hover: '#A1A1AA' },
  creative: { primary: '#2E1065', accent: '#7C3AED', bg: '#F5F3FF', hover: '#F97316' },
  girly: { primary: '#4D1D47', accent: '#EC4899', bg: '#FFF1F2', hover: '#FBCFE8' },
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
  isGenericCloud?: boolean;
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
  inPantry?: boolean;
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

export interface UserProfileData {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  theme?: string;
  subscriptionStatus?: 'free' | 'premium';
  recipeCount?: number;
  mealCount?: number;
  lastSyncedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'offline';

export type ActiveTab = 'planner' | 'meals' | 'shopping' | 'database';

export type DatabaseViewSource = 'all' | 'personal' | 'generic';

export interface GenericCatalogInfo {
  version: string;
  recipesCount: number;
  lastUpdated: string;
  source: 'cloud' | 'local_fallback';
}

export interface NutritionInfo {
  calories: number; // kcal per serving
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
}

export interface DietaryBadge {
  id: string;
  label: string;
  color: string;
  icon?: string;
}

export interface AutoPlanOptions {
  mealCount: number;
  maxPrepTime?: number | null; // minutes (e.g. 20, 35, or null)
  preferredCookingMode?: CookingModeType | 'all';
  dietaryStyle?: 'all' | 'protein' | 'balanced' | 'vegetarian' | 'quick';
  noDuplicates?: boolean;
}

export interface PantryItem {
  ingredientId: string;
  inStock: boolean;
  quantity?: number;
  unit?: UnitType;
  updatedAt?: string;
}

export interface RecipeMatchResult {
  recipe: Recipe;
  totalIngredients: number;
  availableCount: number;
  missingIngredients: Ingredient[];
  matchPercentage: number;
}

