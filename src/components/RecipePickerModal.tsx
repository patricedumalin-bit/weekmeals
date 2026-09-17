import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Clock, 
  Users, 
  Check, 
  Plus, 
  Sparkles, 
  ChefHat,
  Filter,
  Eye,
  Trash2,
  SlidersHorizontal,
  Flame,
  Globe,
  User,
  Copy
} from 'lucide-react';
import { Recipe, RecipeCategory, Ingredient, IngredientCategory, CustomMealIngredient, UnitType, CookingModeType, CustomMeal, DatabaseViewSource } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { useLanguage } from '../i18n/LanguageContext';
import { inferCookingMode } from '../utils/calculator';
import { SaveCustomMealModal } from './SaveCustomMealModal';
import { Save } from 'lucide-react';
import { DatabaseSwitcher } from './DatabaseSwitcher';

interface RecipePickerModalProps {
  isOpen: boolean;
  mealLabel: string;
  mealIndex: number;
  currentRecipeIds: string[];
  currentCustomMeals: CustomMeal[];
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  databaseSource?: DatabaseViewSource;
  onChangeDatabaseSource?: (source: DatabaseViewSource) => void;
  onCopyGenericToPersonal?: (recipe: Recipe) => void;
  onClose: () => void;
  onToggleRecipe: (recipeId: string) => void;
  onSaveCustomMeals: (mealIndex: number, customMeals: CustomMeal[]) => void;
  onSaveAsRecipe: (name: string, categoryId: string, cookingMode: CookingModeType, ingredients: CustomMealIngredient[]) => void;
  onPreviewRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipeId: string) => void;
  onCreateNewRecipe?: () => void;
}

const UNIT_OPTIONS: UnitType[] = [
  'unit', 'g', 'kg', 'ml', 'cl', 'l', 'tbsp', 'tsp', 'clove', 'pinch', 'can', 'pack', 'bunch', 'slice'
];

export const RecipePickerModal: React.FC<RecipePickerModalProps> = ({
  isOpen,
  mealLabel,
  mealIndex,
  currentRecipeIds = [],
  currentCustomMeals = [],
  recipes = [],
  recipeCategories = [],
  ingredients = [],
  ingredientCategories = [],
  databaseSource = 'all',
  onChangeDatabaseSource,
  onCopyGenericToPersonal,
  onClose,
  onToggleRecipe,
  onSaveCustomMeals,
  onSaveAsRecipe,
  onPreviewRecipe,
  onDeleteRecipe,
  onCreateNewRecipe
}) => {
  const { language, t, translateRecipeCategory, translateMealLabel, translateRecipe, translateCookingMode, translateUnit, translateDifficulty } = useLanguage();
  if (!isOpen) return null;

  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const safeRecipeCategories = Array.isArray(recipeCategories) ? recipeCategories : [];
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  const safeIngredientCategories = Array.isArray(ingredientCategories) ? ingredientCategories : [];

  const [activeTab, setActiveTab] = useState<'library' | 'custom'>(
    (currentCustomMeals || []).length > 0 ? 'custom' : 'library'
  );

  // Library filters & database source
  const [localDbSource, setLocalDbSource] = useState<DatabaseViewSource>(databaseSource);
  const activeSource = onChangeDatabaseSource ? databaseSource : localDbSource;
  const handleSourceChange = onChangeDatabaseSource || setLocalDbSource;

  const personalRecipesCount = safeRecipes.filter(r => r.isCustom).length;
  const genericRecipesCount = safeRecipes.filter(r => !r.isCustom).length;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCookingMode, setSelectedCookingMode] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Custom meal state (simplified: just take the first one for now)
  const [customName, setCustomName] = useState(currentCustomMeals[0]?.name || '');
  const [customIngs, setCustomIngs] = useState<CustomMealIngredient[]>(
    currentCustomMeals[0]?.ingredients || []
  );
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [showSaveAsRecipe, setShowSaveAsRecipe] = useState(false);

  const COOKING_MODES = [
    { id: 'all', labelKey: 'cookingMode_all' },
    { id: 'four', labelKey: 'cookingMode_four' },
    { id: 'poele', labelKey: 'cookingMode_poele' },
    { id: 'cookeo', labelKey: 'cookingMode_cookeo' },
    { id: 'robot', labelKey: 'cookingMode_robot' },
    { id: 'cocotte', labelKey: 'cookingMode_cocotte' },
    { id: 'vapeur', labelKey: 'cookingMode_vapeur' },
    { id: 'grill', labelKey: 'cookingMode_grill' },
    { id: 'sans-cuisson', labelKey: 'cookingMode_sansCuisson' },
  ];

  const COUNTRIES = [
    { id: 'all', label: 'All Cuisines', flag: '🌍' },
    { id: 'France', label: 'France', flag: '🇫🇷' },
    { id: 'Italy', label: 'Italy', flag: '🇮🇹' },
    { id: 'England', label: 'England / UK', flag: '🇬🇧' },
    { id: 'Germany', label: 'Germany', flag: '🇩🇪' },
    { id: 'Spain', label: 'Spain', flag: '🇪🇸' },
    { id: 'Portugal', label: 'Portugal', flag: '🇵🇹' },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSource =
      activeSource === 'all'
        ? true
        : activeSource === 'personal'
        ? Boolean(recipe.isCustom)
        : !recipe.isCustom;
    if (!matchesSource) return false;

    const localized = translateRecipe(recipe);
    const mode = recipe.cookingMode || inferCookingMode(recipe);
    const matchesCategory = selectedCategory === 'all' || recipe.categoryId === selectedCategory;
    const matchesMode = selectedCookingMode === 'all' || mode === selectedCookingMode;
    const matchesCountry = selectedCountry === 'all' || 
      (recipe.tags || []).some(t => t.toLowerCase() === selectedCountry.toLowerCase() || (selectedCountry === 'England' && t.toLowerCase() === 'british')) ||
      (localized.tags || []).some(t => t.toLowerCase() === selectedCountry.toLowerCase() || (selectedCountry === 'England' && t.toLowerCase() === 'british'));
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      recipe.title.toLowerCase().includes(query) ||
      (recipe.description || '').toLowerCase().includes(query) ||
      (localized.title || '').toLowerCase().includes(query) ||
      (localized.description || '').toLowerCase().includes(query) ||
      (recipe.tags || []).some(t => t.toLowerCase().includes(query)) ||
      (localized.tags || []).some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesMode && matchesCountry && matchesDifficulty && matchesSearch;
  });

  const selectedCount = currentRecipeIds.length;
  const maxReached = selectedCount >= 3;
  const displayMealLabel = mealLabel;

  const handleAddCustomIng = (ingId: string) => {
    if (customIngs.length >= 10) return;
    const defaultIng = ingredients.find(i => i.id === ingId);
    setCustomIngs([
      ...customIngs,
      {
        ingredientId: ingId,
        quantity: 1,
        unit: defaultIng?.defaultUnit || 'unit'
      }
    ]);
  };

  const handleUpdateCustomIng = (idx: number, field: keyof CustomMealIngredient, val: any) => {
    const updated = [...customIngs];
    updated[idx] = { ...updated[idx], [field]: val };
    setCustomIngs(updated);
  };

  const handleRemoveCustomIng = (idx: number) => {
    setCustomIngs(customIngs.filter((_, i) => i !== idx));
  };

  const handleSaveCustomMealAction = () => {
    // For now, we only support one custom meal until the UI is fully updated to handle the list
    const newCustomMeal: CustomMeal = {
      id: currentCustomMeals[0]?.id || `custom-${Date.now()}`,
      name: customName.trim() || displayMealLabel,
      ingredients: customIngs
    };
    onSaveCustomMeals(mealIndex, [newCustomMeal]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/40 dark:border-white/5 flex items-start justify-between gap-3 bg-white/40 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[var(--primary)]/10 text-[var(--primary)] dark:text-[var(--primary)] border border-[var(--primary)]/20">
                {displayMealLabel}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {selectedCount > 0 ? t('selectedBadge', { count: selectedCount }) : (customIngs.length > 0 ? `${customIngs.length} ingr. custom` : '')}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              {t('chooseRecipesForMeal', { meal: displayMealLabel })}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Library vs Custom Meal */}
        <div className="flex border-b border-white/40 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'library'
                ? 'bg-white dark:bg-slate-800 text-[var(--primary)] dark:text-[var(--primary)] border-[var(--primary)] shadow-sm'
                : 'text-slate-500 hover:text-slate-800 border-transparent'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>{t('tabRecipeLibrary')} ({recipes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'custom'
                ? 'bg-white dark:bg-slate-800 text-[var(--primary)] dark:text-[var(--primary)] border-[var(--primary)] shadow-sm'
                : 'text-slate-500 hover:text-slate-800 border-transparent'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('tabCustomMeal')} ({customIngs.length}/10)</span>
          </button>
        </div>

        {activeTab === 'library' ? (
          <>
            {/* Search & Filters */}
            <div className="p-3 sm:p-4 border-b border-white/40 dark:border-white/5 space-y-2.5 bg-white/50 dark:bg-slate-900/50">
              {/* Dual Database Switcher */}
              <DatabaseSwitcher
                currentSource={activeSource}
                onChangeSource={handleSourceChange}
                personalCount={personalRecipesCount}
                genericCount={genericRecipesCount}
                totalCount={recipes.length}
              />

              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchRecipesPickerPlaceholder')}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
                />
              </div>

              {/* Advanced Filters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl text-[11px] font-semibold bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:border-[var(--accent)] cursor-pointer"
                >
                  <option value="all">{language === 'fr' ? 'Toutes catégories' : 'All categories'}</option>
                  {recipeCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {translateRecipeCategory(cat.id, cat.name)}
                    </option>
                  ))}
                </select>

                {/* Country Dropdown */}
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-3 py-2 rounded-xl text-[11px] font-semibold bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:border-[var(--accent)] cursor-pointer"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.label}
                    </option>
                  ))}
                </select>

                {/* Cooking Mode Dropdown */}
                <select
                  value={selectedCookingMode}
                  onChange={(e) => setSelectedCookingMode(e.target.value)}
                  className="px-3 py-2 rounded-xl text-[11px] font-semibold bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:border-[var(--accent)] cursor-pointer"
                >
                  <option value="all">{language === 'fr' ? 'Tous les modes' : 'All cooking modes'}</option>
                  {COOKING_MODES.slice(1).map(mode => (
                    <option key={mode.id} value={mode.id}>
                      {translateCookingMode(mode.id)}
                    </option>
                  ))}
                </select>

                {/* Difficulty Dropdown */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 rounded-xl text-[11px] font-semibold bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:border-[var(--accent)] cursor-pointer"
                >
                  <option value="all">{language === 'fr' ? 'Toutes difficultés' : 'All difficulties'}</option>
                  <option value="easy">{language === 'fr' ? 'Facile' : 'Easy'}</option>
                  <option value="medium">{language === 'fr' ? 'Moyen' : 'Medium'}</option>
                  <option value="hard">{language === 'fr' ? 'Difficile' : 'Hard'}</option>
                </select>
              </div>
            </div>

            {/* Recipe Cards List */}
            <div className="overflow-y-auto p-4 sm:p-5 flex-1">
              {filteredRecipes.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <ChefHat className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t('noMatchingRecipes')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    {t('noMatchingRecipesSub')}
                  </p>
                  {onCreateNewRecipe && (
                    <button
                      onClick={onCreateNewRecipe}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white shadow-md shadow-[var(--primary)]/20 hover:from-[var(--accent)] hover:to-[var(--accent)]"
                    >
                      <Plus className="w-4 h-4" />
                      {t('createNewRecipe')}
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredRecipes.map((recipe) => {
                    const isSelected = currentRecipeIds.includes(recipe.id);
                    const localized = translateRecipe(recipe);
                    const category = recipeCategories.find(c => c.id === recipe.categoryId);
                    const catDisplayName = category ? translateRecipeCategory(category.id, category.name) : '';
                    const mode = inferCookingMode(recipe);
                    const disableAdd = !isSelected && maxReached;

                    return (
                      <div
                        key={recipe.id}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between backdrop-blur-xl ${
                          isSelected
                            ? 'border-[var(--primary)]/60 bg-[var(--primary)]/10 dark:bg-[var(--primary)]/30 shadow-md shadow-[var(--primary)]/10'
                            : 'border-white/50 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 hover:border-[var(--primary)]/30 shadow-xs'
                        }`}
                      >
                        <div>
                          {/* Category & Cooking mode & Times */}
                          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {category && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-md bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-white/40 dark:border-white/5">
                                  <CategoryIcon name={category.icon} className="w-3 h-3 text-[var(--primary)] dark:text-[var(--primary)]" />
                                  {catDisplayName}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-md bg-[var(--accent)]/10 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/20">
                                <Flame className="w-3 h-3" />
                                {translateCookingMode(mode)}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {recipe.isCustom ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                                  <User className="w-2.5 h-2.5" />
                                  <span>{t('dbPersonalBadge')}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                                  <Globe className="w-2.5 h-2.5" />
                                  <span>{t('dbGenericBadge')}</span>
                                </span>
                              )}
                              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {recipe.prepTimeMinutes + recipe.cookTimeMinutes}m
                              </span>
                            </div>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                            {localized.title}
                          </h3>
                          {localized.description && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                              {localized.description}
                            </p>
                          )}
                          
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                            {t('ingredientsCountShort', { count: recipe.ingredients.length })} • {t('basePersons', { count: recipe.servings })}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/40 dark:border-white/5">
                          {recipe.isCustom && (
                            <button
                              onClick={() => onDeleteRecipe(recipe.id)}
                              className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                              title={t('confirmDeleteRecipe', { title: recipe.title })}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                          {!recipe.isCustom && onCopyGenericToPersonal && (
                            <button
                              type="button"
                              onClick={() => onCopyGenericToPersonal(recipe)}
                              className="p-2 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                              title={t('copyToPersonal')}
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            onClick={() => onPreviewRecipe(recipe)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{t('preview')}</span>
                          </button>

                          <button
                            disabled={disableAdd}
                            onClick={() => onToggleRecipe(recipe.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--primary)]/20'
                                : disableAdd
                                ? 'backdrop-blur-md bg-white/40 dark:bg-slate-800/40 text-slate-400 cursor-not-allowed border border-white/30 dark:border-white/5'
                                : 'backdrop-blur-md bg-[var(--primary)]/10 dark:bg-[var(--primary)]/60 text-[var(--primary)] dark:text-[var(--primary)] hover:bg-[var(--primary)]/20 border border-[var(--primary)]/30'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>{t('selected')}</span>
                              </>
                            ) : disableAdd ? (
                              <span>{t('max3Reached')}</span>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>{t('select')}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Custom Meal Ingrédients Libres Tab */
          <div className="overflow-y-auto p-4 sm:p-5 flex-1 space-y-4">
            <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-2xl border border-white/50 dark:border-white/10 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('customMealNameLabel')}
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={t('customMealNamePlaceholder')}
                  className="w-full px-3.5 py-2 text-sm rounded-xl backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Ingrédients (Jusqu'à 10) : {customIngs.length}/10
                  </span>
                  {customIngs.length >= 10 && (
                    <span className="text-[11px] text-[var(--primary)] font-semibold">
                      {t('maxCustomIngredientsReached')}
                    </span>
                  )}
                </div>

                {/* Ingredient Quick Selector */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={ingredientSearch}
                      onChange={(e) => setIngredientSearch(e.target.value)}
                      placeholder={t('searchIngredientsPlaceholder')}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white/80 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    />
                  </div>

                  {ingredientSearch.trim() && (
                    <div className="max-h-40 overflow-y-auto rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 space-y-1 shadow-lg z-20">
                      {ingredients
                        .filter(i => i.name.toLowerCase().includes(ingredientSearch.toLowerCase()))
                        .slice(0, 8)
                        .map(ing => (
                          <button
                            key={ing.id}
                            disabled={customIngs.length >= 10}
                            onClick={() => {
                              handleAddCustomIng(ing.id);
                              setIngredientSearch('');
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-50 dark:hover:bg-[var(--primary)]/40 text-slate-800 dark:text-slate-200 flex items-center justify-between"
                          >
                            <span>{ing.name}</span>
                            <span className="text-[10px] text-[var(--primary)] font-bold">+ Ajouter</span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* Selected Custom Ingredients List */}
                <div className="space-y-2 mt-3">
                  {customIngs.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-6">
                      Aucun ingrédient ajouté. Recherchez et ajoutez des ingrédients ci-dessus.
                    </p>
                  ) : (
                    customIngs.map((item, idx) => {
                      const ingObj = ingredients.find(i => i.id === item.ingredientId);
                      return (
                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex-1 truncate">
                            {ingObj?.name || 'Ingrédient'}
                          </span>
                          <input
                            type="number"
                            min="0.1"
                            step="0.5"
                            value={item.quantity}
                            onChange={(e) => handleUpdateCustomIng(idx, 'quantity', parseFloat(e.target.value) || 1)}
                            className="w-16 px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 border text-center font-mono"
                          />
                          <select
                            value={item.unit}
                            onChange={(e) => handleUpdateCustomIng(idx, 'unit', e.target.value as UnitType)}
                            className="px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 border"
                          >
                            {UNIT_OPTIONS.map(u => (
                              <option key={u} value={u}>{translateUnit(u)}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleRemoveCustomIng(idx)}
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 gap-2">
              <button
                onClick={() => setShowSaveAsRecipe(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[var(--accent)] text-white shadow-md hover:bg-[var(--accent)] flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {t('saveAsRecipe')}
              </button>
              <button
                onClick={handleSaveCustomMealAction}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--primary)]/20"
              >
                {t('saveCustomMeal')} ({customIngs.length} ingr.)
              </button>
            </div>
          </div>
        )}

        <SaveCustomMealModal
          isOpen={showSaveAsRecipe}
          onClose={() => setShowSaveAsRecipe(false)}
          onSave={(name, cat, mode) => {
            onSaveAsRecipe(name, cat, mode, customIngs);
            setShowSaveAsRecipe(false);
          }}
          recipeCategories={recipeCategories}
          defaultName={customName || displayMealLabel}
        />

        {/* Footer */}
        <div className="p-4 border-t border-white/40 dark:border-white/5 bg-white/40 dark:bg-slate-900/50 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            {activeTab === 'library' ? t('slotsFilledFooter', { count: selectedCount }) : `Repas personnalisé (${customIngs.length} ingr.)`}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 shadow-md shadow-slate-900/10 transition-colors"
          >
            {t('done')}
          </button>
        </div>
      </div>
    </div>
  );
};
