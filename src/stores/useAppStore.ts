import { create } from 'zustand';
import { ActiveTab, Theme, Recipe, CookingModeType } from '../types';

interface AppState {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  theme: string;
  setTheme: (theme: string) => void;

  // Modal States
  previewRecipeState: {
    recipe: Recipe;
    servings?: number;
    mealIndex?: number;
    recipeIndex?: number;
  } | null;
  setPreviewRecipeState: (state: AppState['previewRecipeState']) => void;

  recipePickerTarget: {
    mealIndex: number;
    slotIndex: number;
  } | null;
  setRecipePickerTarget: (target: AppState['recipePickerTarget']) => void;

  recipeEditorState: {
    isOpen: boolean;
    recipeToEdit: Recipe | null;
  };
  setRecipeEditorState: (state: AppState['recipeEditorState']) => void;

  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (isOpen: boolean) => void;

  isPantryModalOpen: boolean;
  setIsPantryModalOpen: (isOpen: boolean) => void;

  isAutoPlanModalOpen: boolean;
  setIsAutoPlanModalOpen: (isOpen: boolean) => void;

  cookingModeState: {
    isOpen: boolean;
    recipe: Recipe | null;
    servings: number;
  };
  setCookingModeState: (state: AppState['cookingModeState']) => void;

  isRecipeImportModalOpen: boolean;
  setIsRecipeImportModalOpen: (isOpen: boolean) => void;

  isNutritionDashboardOpen: boolean;
  setIsNutritionDashboardOpen: (isOpen: boolean) => void;

  databaseSource: 'all' | 'personal' | 'generic';
  setDatabaseSource: (source: 'all' | 'personal' | 'generic') => void;

  isSeedingGeneric: boolean;
  setIsSeedingGeneric: (isSeeding: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'planner',
  setActiveTab: (tab) => set({ activeTab: tab }),

  theme: localStorage.getItem('theme') || 'default',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },

  previewRecipeState: null,
  setPreviewRecipeState: (state) => set({ previewRecipeState: state }),

  recipePickerTarget: null,
  setRecipePickerTarget: (target) => set({ recipePickerTarget: target }),

  recipeEditorState: { isOpen: false, recipeToEdit: null },
  setRecipeEditorState: (state) => set({ recipeEditorState: state }),

  isProfileModalOpen: false,
  setIsProfileModalOpen: (isOpen) => set({ isProfileModalOpen: isOpen }),

  isPantryModalOpen: false,
  setIsPantryModalOpen: (isOpen) => set({ isPantryModalOpen: isOpen }),

  isAutoPlanModalOpen: false,
  setIsAutoPlanModalOpen: (isOpen) => set({ isAutoPlanModalOpen: isOpen }),

  cookingModeState: { isOpen: false, recipe: null, servings: 4 },
  setCookingModeState: (state) => set({ cookingModeState: state }),

  isRecipeImportModalOpen: false,
  setIsRecipeImportModalOpen: (isOpen) => set({ isRecipeImportModalOpen: isOpen }),

  isNutritionDashboardOpen: false,
  setIsNutritionDashboardOpen: (isOpen) => set({ isNutritionDashboardOpen: isOpen }),

  databaseSource: 'all',
  setDatabaseSource: (source) => set({ databaseSource: source }),

  isSeedingGeneric: false,
  setIsSeedingGeneric: (isSeeding) => set({ isSeedingGeneric: isSeeding }),
}));
