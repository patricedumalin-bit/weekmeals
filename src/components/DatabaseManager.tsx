import React, { useState, useMemo, useRef } from 'react';
import { 
  Database, 
  ChefHat, 
  Layers, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  Check, 
  FolderPlus,
  Apple,
  Clock,
  Eye,
  Copy,
  Tag,
  Globe,
  User,
  Cloud,
  Star,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Recipe, 
  RecipeCategory, 
  Ingredient, 
  IngredientCategory, 
  UnitType, 
  WeeklyPlan,
  DatabaseViewSource
} from '../types';
import { CategoryIcon } from './CategoryIcon';
import { exportDatabaseJson } from '../utils/storage';
import { useLanguage } from '../i18n/LanguageContext';
import { DatabaseSwitcher } from './DatabaseSwitcher';
import { inferCookingMode, getAvailableCookingModes } from '../utils/calculator';
import { getAvailableCuisines, recipeMatchesCuisine } from '../data/cuisineData';
import { RecipeCard } from './RecipeCard';
import { IngredientListItem } from './IngredientListItem';
import { IngredientEditorModal } from './IngredientEditorModal';

interface DatabaseManagerProps {
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  weeklyPlan: WeeklyPlan;
  databaseSource?: DatabaseViewSource;
  onChangeDatabaseSource?: (source: DatabaseViewSource) => void;
  onCopyGenericToPersonal?: (recipe: Recipe) => void;
  onSeedGenericCloud?: () => void;
  isSeedingGeneric?: boolean;
  onSaveRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipeId: string) => void;
  onSaveRecipeCategory: (cat: RecipeCategory) => void;
  onDeleteRecipeCategory: (catId: string) => void;
  onSaveIngredient: (ing: Ingredient) => void;
  onDeleteIngredient: (ingId: string) => void;
  onSaveIngredientCategory: (cat: IngredientCategory) => void;
  onDeleteIngredientCategory: (catId: string) => void;
  onImportDatabase: (data: any) => void;
  onResetDatabase: () => void;
  onClearDatabase: () => void;
  onGenerateGenericDatabase?: () => void;
  onOpenRecipeEditor: (recipeToEdit?: Recipe | null) => void;
  onPreviewRecipe: (recipe: Recipe) => void;
  onOpenRecipeImport?: () => void;
}

type SubTab = 'recipes' | 'ingredients' | 'recipeCats' | 'ingredientCats' | 'backup';

const UNIT_OPTIONS: UnitType[] = [
  'unit', 'g', 'kg', 'ml', 'cl', 'l', 'tbsp', 'tsp', 'clove', 'pinch', 'can', 'pack', 'bunch', 'slice'
];

export const DatabaseManager: React.FC<DatabaseManagerProps> = ({
  recipes = [],
  recipeCategories = [],
  ingredients = [],
  ingredientCategories = [],
  weeklyPlan,
  databaseSource = 'all',
  onChangeDatabaseSource,
  onCopyGenericToPersonal,
  onSeedGenericCloud,
  isSeedingGeneric = false,
  onSaveRecipe,
  onDeleteRecipe,
  onSaveRecipeCategory,
  onDeleteRecipeCategory,
  onSaveIngredient,
  onDeleteIngredient,
  onSaveIngredientCategory,
  onDeleteIngredientCategory,
  onImportDatabase,
  onResetDatabase,
  onClearDatabase,
  onGenerateGenericDatabase,
  onOpenRecipeEditor,
  onPreviewRecipe,
  onOpenRecipeImport
}) => {
  const { t, translateUnit, translateRecipeCategory, translateIngredientCategory, translateRecipe, translateIngredient } = useLanguage();
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const safeRecipeCategories = Array.isArray(recipeCategories) ? recipeCategories : [];
  const safeIngredients = Array.isArray(ingredients) ? ingredients : [];
  const safeIngredientCategories = Array.isArray(ingredientCategories) ? ingredientCategories : [];

  const [activeSubTab, setActiveSubTab] = useState<SubTab>('recipes');
  const [localDbSource, setLocalDbSource] = useState<DatabaseViewSource>(databaseSource);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCat, setSelectedFilterCat] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCookingMode, setSelectedCookingMode] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(true);

  const activeSource = onChangeDatabaseSource ? databaseSource : localDbSource;
  const handleSourceChange = onChangeDatabaseSource || setLocalDbSource;

  const personalRecipesCount = safeRecipes.filter(r => r.isCustom).length;
  const genericRecipesCount = safeRecipes.filter(r => !r.isCustom).length;

  const availableCuisines = getAvailableCuisines(safeRecipes);
  const availableCookingModes = getAvailableCookingModes(safeRecipes);

  const categoriesWithCounts = useMemo(() => {
    return safeRecipeCategories
      .map(cat => ({
        ...cat,
        count: safeRecipes.filter(r => r.categoryId === cat.id).length
      }))
      .filter(cat => cat.count > 0);
  }, [safeRecipeCategories, safeRecipes]);

  // Virtualization Refs
  const recipesParentRef = useRef<HTMLDivElement>(null);
  const ingredientsParentRef = useRef<HTMLDivElement>(null);

  const filteredAndSortedRecipes = useMemo(() => {
    return recipes
      .filter(r => {
        const matchesSource =
          activeSource === 'all'
            ? true
            : activeSource === 'personal'
            ? Boolean(r.isCustom)
            : !r.isCustom;
        if (!matchesSource) return false;

        const localized = translateRecipe(r);
        const matchesCat = selectedFilterCat === 'all' || r.categoryId === selectedFilterCat;
        const matchesCountry = recipeMatchesCuisine(r, selectedCountry);
        const matchesCookingMode = selectedCookingMode === 'all' || inferCookingMode(r) === selectedCookingMode;
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          r.title.toLowerCase().includes(query) ||
          localized.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          localized.description.toLowerCase().includes(query) ||
          r.tags.some(t => t.toLowerCase().includes(query)) ||
          localized.tags.some(t => t.toLowerCase().includes(query));
        return matchesCat && matchesCountry && matchesCookingMode && matchesSearch;
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [recipes, activeSource, selectedFilterCat, selectedCountry, selectedCookingMode, searchQuery, translateRecipe]);

  const recipeRows = useMemo(() => {
    const result = [];
    for (let i = 0; i < filteredAndSortedRecipes.length; i += 3) {
      result.push(filteredAndSortedRecipes.slice(i, i + 3));
    }
    return result;
  }, [filteredAndSortedRecipes]);

  const recipeVirtualizer = useVirtualizer({
    count: recipeRows.length,
    getScrollElement: () => recipesParentRef.current,
    estimateSize: () => 250,
    overscan: 5,
  });

  const filteredIngredients = useMemo(() => {
    return ingredients
      .filter(i => {
        const localizedName = translateIngredient(i.id, i.name);
        const matchesCat = selectedFilterCat === 'all' || i.categoryId === selectedFilterCat;
        const query = searchQuery.toLowerCase();
        const matchesSearch = i.name.toLowerCase().includes(query) || localizedName.toLowerCase().includes(query);
        return matchesCat && matchesSearch;
      });
  }, [ingredients, selectedFilterCat, searchQuery, translateIngredient]);

  const ingredientVirtualizer = useVirtualizer({
    count: filteredIngredients.length,
    getScrollElement: () => ingredientsParentRef.current,
    estimateSize: () => 64,
    overscan: 10,
  });

  // Ingredient Form State
  const [showAddIngModal, setShowAddIngModal] = useState(false);
  const [ingToEdit, setIngToEdit] = useState<Ingredient | null>(null);
  const [ingName, setIngName] = useState('');
  const [ingCatId, setIngCatId] = useState(ingredientCategories[0]?.id || 'cat-produce');
  const [ingUnit, setIngUnit] = useState<UnitType>('unit');

  // Category Form State
  const [showAddCatModal, setShowAddCatModal] = useState<'recipe' | 'ingredient' | null>(null);
  const [catName, setCatName] = useState('');
  const [catIcon, setCatIcon] = useState('Apple');
  const [catDesc, setCatDesc] = useState('');

  // Export JSON
  const handleExport = () => {
    const jsonStr = exportDatabaseJson({
      recipes,
      recipeCategories,
      ingredients,
      ingredientCategories,
      weeklyPlan
    });
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meal_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onImportDatabase(parsed);
      } catch (err) {
        alert('Invalid JSON database backup file format.');
      }
    };
    reader.readAsText(file);
  };

  // Submit Ingredient
  const handleSaveIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingName.trim()) return;

    onSaveIngredient({
      id: ingToEdit ? ingToEdit.id : `ing-${Date.now()}`,
      name: ingName.trim(),
      categoryId: ingCatId,
      defaultUnit: ingUnit
    });

    setIngName('');
    setIngToEdit(null);
    setShowAddIngModal(false);
  };

  // Open Edit Ingredient
  const handleOpenEditIng = (ing: Ingredient) => {
    setIngToEdit(ing);
    setIngName(ing.name);
    setIngCatId(ing.categoryId);
    setIngUnit(ing.defaultUnit);
    setShowAddIngModal(true);
  };

  // Submit Category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    if (showAddCatModal === 'recipe') {
      onSaveRecipeCategory({
        id: `rcat-${Date.now()}`,
        name: catName.trim(),
        icon: catIcon || 'Utensils',
        description: catDesc.trim() || 'Custom recipe category'
      });
    } else if (showAddCatModal === 'ingredient') {
      onSaveIngredientCategory({
        id: `cat-${Date.now()}`,
        name: catName.trim(),
        icon: catIcon || 'ShoppingBag',
        color: 'emerald',
        order: ingredientCategories.length + 1
      });
    }

    setCatName('');
    setCatDesc('');
    setShowAddCatModal(null);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-5 sm:p-6 shadow-lg shadow-slate-900/5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[var(--accent)]/10 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/20 mb-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>{t('dbEngineTag')}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {t('dbManagementTitle')}
                </h2>
              </div>
              <button
                onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-all sm:hidden"
              >
                {isHeaderCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
              </button>
            </div>
            {!isHeaderCollapsed && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 animate-in fade-in slide-in-from-top-2 duration-300">
                {t('dbManagementSubtitle')}
              </p>
            )}
          </div>

          {!isHeaderCollapsed && (
            <div className="flex items-center gap-2 flex-wrap animate-in fade-in slide-in-from-top-2 duration-300">
              {activeSubTab === 'recipes' && (
                <>
                  {onOpenRecipeImport && (
                    <button
                      type="button"
                      onClick={onOpenRecipeImport}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Importer</span>
                    </button>
                  )}

                  <button
                    onClick={() => onOpenRecipeEditor(null)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('newRecipe')}</span>
                  </button>
                </>
              )}

              {activeSubTab === 'ingredients' && (
                <button
                  onClick={() => {
                    setIngToEdit(null);
                    setIngName('');
                    setShowAddIngModal(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('newIngredient')}</span>
                </button>
              )}

              {(activeSubTab === 'recipeCats' || activeSubTab === 'ingredientCats') && (
                <button
                  onClick={() => {
                    setCatName('');
                    setCatDesc('');
                    setShowAddCatModal(activeSubTab === 'recipeCats' ? 'recipe' : 'ingredient');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('newCategory')}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-5 border-t border-white/40 dark:border-white/5 pt-4 text-xs">
          <button
            onClick={() => {
              setActiveSubTab('recipes');
              setSelectedFilterCat('all');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'recipes'
                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                : 'backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>{t('subtabRecipes', { count: recipes.length })}</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab('ingredients');
              setSelectedFilterCat('all');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'ingredients'
                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                : 'backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('subtabIngredients', { count: ingredients.length })}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('recipeCats')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'recipeCats'
                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                : 'backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>{t('subtabRecipeCats', { count: recipeCategories.length })}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ingredientCats')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'ingredientCats'
                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                : 'backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>{t('subtabIngredientCats', { count: ingredientCategories.length })}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('backup')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'backup'
                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                : 'backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{t('subtabBackup')}</span>
          </button>
        </div>
      </div>

      {/* Sub-view 1: Recipes Browser */}
      {activeSubTab === 'recipes' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Dual Database Switcher */}
              <DatabaseSwitcher
                currentSource={activeSource}
                onChangeSource={handleSourceChange}
                personalCount={personalRecipesCount}
                genericCount={genericRecipesCount}
                totalCount={recipes.length}
              />
            </div>
            <div className="flex justify-end pb-1 sm:pb-1.5">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[var(--border-color)] bg-[var(--cell-bg)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)] transition-all select-none shadow-xs shrink-0 whitespace-nowrap"
              >
                <span>{showFilters ? 'Masquer Filtres' : 'Afficher Filtres'}</span>
              </button>
            </div>
          </div>

          {/* Search and Category/Country/Cooking Mode Filters */}
          {showFilters && (
            <div className="space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('searchRecipePlaceholder')}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-[var(--accent)] transition-all"
                />
              </div>

              {/* Category / Country / Cooking Mode dropdown filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="relative">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedFilterCat}
                    onChange={e => setSelectedFilterCat(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-200 focus:outline-hidden focus:border-[var(--accent)] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">{t('allCategoriesFilter', { count: safeRecipes.length })}</option>
                    {categoriesWithCounts.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {translateRecipeCategory(cat.id, cat.name)} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-200 focus:outline-hidden focus:border-[var(--accent)] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">🌍 {t('allCuisinesFilter')}</option>
                    {availableCuisines.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.flag} {c.label} ({c.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedCookingMode}
                    onChange={e => setSelectedCookingMode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-200 focus:outline-hidden focus:border-[var(--accent)] transition-all appearance-none cursor-pointer"
                  >
                    <option value="all">{t('cookingMode_all')}</option>
                    {availableCookingModes.map(mode => (
                      <option key={mode.id} value={mode.id}>
                        {t(mode.labelKey as any)} ({mode.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Recipes Grid */}
          <div
            ref={recipesParentRef}
            className="flex-1 overflow-y-auto h-[600px] pr-2"
          >
            <div
              style={{
                height: `${recipeVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {recipeVirtualizer.getVirtualItems().map((virtualRow) => {
                const rowItems = recipeRows[virtualRow.index];
                return (
                  <div
                    key={virtualRow.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
                  >
                    {rowItems.map(recipe => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        recipeCategories={recipeCategories}
                        onPreview={onPreviewRecipe}
                        onDelete={onDeleteRecipe}
                        onCopy={onCopyGenericToPersonal}
                        onEdit={onOpenRecipeEditor}
                        onSave={onSaveRecipe}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sub-view 2: Ingredients Browser */}
      {activeSubTab === 'ingredients' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('searchIngredientsPlaceholder')}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-[var(--accent)] transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedFilterCat('all')}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedFilterCat === 'all'
                    ? 'bg-[var(--primary)] text-white shadow-xs font-bold'
                    : 'backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-600 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
                }`}
              >
                {t('allCategories', { count: ingredients.length })}
              </button>
              {ingredientCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilterCat(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedFilterCat === cat.id
                      ? 'bg-[var(--primary)] text-white shadow-xs font-bold'
                      : 'backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-600 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
                  }`}
                >
                  {translateIngredientCategory(cat.id, cat.name)}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={ingredientsParentRef}
            className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl overflow-y-auto h-[600px] shadow-md shadow-slate-900/5 transition-all duration-300"
          >
            <div
              style={{
                height: `${ingredientVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {ingredientVirtualizer.getVirtualItems().map((virtualRow) => {
                const ing = filteredIngredients[virtualRow.index];
                const cat = ingredientCategories.find(c => c.id === ing.categoryId);
                return (
                  <div
                    key={virtualRow.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className="border-b border-white/40 dark:divide-white/5"
                  >
                    <IngredientListItem
                      ingredient={ing}
                      category={cat}
                      onEdit={handleOpenEditIng}
                      onDelete={(item) => onDeleteIngredient(item.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sub-view 3: Recipe Categories */}
      {activeSubTab === 'recipeCats' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipeCategories.map(cat => {
            const count = recipes.filter(r => r.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-4 flex items-start justify-between shadow-md shadow-slate-900/5 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-[var(--accent)]/15 text-[var(--primary)] dark:text-[var(--primary)] border border-[var(--accent)]/20 flex items-center justify-center shrink-0 shadow-2xs">
                    <CategoryIcon name={cat.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {translateRecipeCategory(cat.id, cat.name)}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cat.description}</p>
                    <span className="inline-block text-[11px] font-semibold text-[var(--primary)] dark:text-[var(--accent)] mt-2">
                      {count} {count === 1 ? 'recipe' : 'recipes'}
                    </span>
                  </div>
                </div>

                <button
                  disabled={recipeCategories.length <= 1}
                  onClick={() => {
                    if (confirm(t('confirmDeleteCategory', { name: cat.name }))) {
                      onDeleteRecipeCategory(cat.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 disabled:opacity-20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Sub-view 4: Ingredient Categories */}
      {activeSubTab === 'ingredientCats' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredientCategories.map(cat => {
            const count = ingredients.filter(i => i.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-4 flex items-start justify-between shadow-md shadow-slate-900/5 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-[var(--accent)]/15 text-[var(--primary)] dark:text-[var(--primary)] border border-[var(--accent)]/20 flex items-center justify-center shrink-0 shadow-2xs">
                    <CategoryIcon name={cat.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {translateIngredientCategory(cat.id, cat.name)}
                    </h3>
                    <span className="inline-block text-[11px] font-semibold text-[var(--primary)] dark:text-[var(--accent)] mt-1">
                      {t('itemsCount', { count })}
                    </span>
                  </div>
                </div>

                <button
                  disabled={ingredientCategories.length <= 1}
                  onClick={() => {
                    if (confirm(t('confirmDeleteCategory', { name: cat.name }))) {
                      onDeleteIngredientCategory(cat.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 disabled:opacity-20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Sub-view 5: Backup & Reset */}
      {activeSubTab === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-2xl p-5 shadow-md shadow-slate-900/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Download className="w-4 h-4 text-[var(--primary)]" />
              <span>{t('exportDbTitle')}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('exportDbDesc')}
            </p>
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t('downloadJsonBtn')}</span>
            </button>
          </div>

          <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-2xl p-5 shadow-md shadow-slate-900/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[var(--primary)]" />
              <span>{t('importDbTitle')}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('importDbDesc')}
            </p>
            <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold backdrop-blur-md bg-[var(--cell-bg)] hover:bg-[var(--cell-bg-hover)] border border-[var(--border-color)] text-slate-800 dark:text-slate-200 cursor-pointer shadow-2xs transition-colors">
              <Upload className="w-4 h-4" />
              <span>{t('selectBackupFile')}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Dual Database Cloud Status Card */}
          <div className="md:col-span-2 backdrop-blur-xl bg-gradient-to-r from-blue-50/50 to-emerald-50/50 dark:from-blue-950/20 dark:to-emerald-950/20 border border-blue-200/60 dark:border-blue-800/40 rounded-2xl p-5 shadow-md shadow-slate-900/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>Architecture Double Base de Données Cloud</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Synchronisation séparée entre votre profil utilisateur personnel et le catalogue générique de l'application.
                  </p>
                </div>
              </div>

              {onSeedGenericCloud && (
                <button
                  type="button"
                  disabled={isSeedingGeneric}
                  onClick={onSeedGenericCloud}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md shadow-blue-600/20 transition-all shrink-0"
                >
                  <Globe className="w-4 h-4" />
                  <span>{isSeedingGeneric ? 'Synchronisation Cloud...' : 'Mettre à jour le catalogue générique Cloud'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Personal Cloud Box */}
              <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-emerald-500/30 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{t('dbSourcePersonal')}</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {personalRecipesCount} recette(s) personnalisée(s) stockée(s) dans votre espace Firestore privé.
                  </p>
                </div>
              </div>

              {/* Generic Cloud Box */}
              <div className="p-3.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-blue-500/30 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{t('dbSourceGeneric')}</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {genericRecipesCount} recette(s) dans le catalogue général cloud partagé (/app_catalog/generic).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Ready-to-use Generic Database Deployment */}
          <div className="md:col-span-2 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl p-5 shadow-md shadow-emerald-900/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Générer la base générique complète (Prête à l'emploi)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
                Charge instantanément les 250+ recettes européennes, l'ensemble des 50+ ingrédients catégorisés, un planning hebdomadaire de 7 repas équilibrés et les basiques du placard. L'application devient immédiatement 100% exploitable.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onGenerateGenericDatabase) {
                  onGenerateGenericDatabase();
                } else {
                  onResetDatabase();
                }
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Générer la base générique</span>
            </button>
          </div>

          <div className="md:col-span-2 bg-rose-500/10 dark:bg-rose-950/30 border border-rose-500/20 rounded-2xl p-5 shadow-md shadow-slate-900/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>{t('resetDefaultsTitle')}</span>
              </h3>
              <p className="text-xs text-rose-700 dark:text-rose-400 mt-1">
                {t('resetDefaultsDesc')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  console.log('Vider la base clicked');
                  onClearDatabase();
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition-all shrink-0 border-2 border-red-500"
              >
                Vider la base
              </button>
              <button
                onClick={() => {
                  if (confirm(t('confirmReset'))) {
                    onResetDatabase();
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600/50 hover:bg-rose-700/50 text-white shadow-md shadow-rose-600/10 transition-all shrink-0"
              >
                {t('resetDefaultsBtn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Ingredient Modal */}
      {showAddIngModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/40 dark:border-white/10 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {ingToEdit ? t('editIngredient') : t('newIngredient')}
            </h3>

            <form onSubmit={handleSaveIngredient} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('ingredientNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={ingName}
                  onChange={e => setIngName(e.target.value)}
                  placeholder="e.g. Baby Spinach, Garlic, Chicken Breast..."
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('category')}
                </label>
                <select
                  value={ingCatId}
                  onChange={e => setIngCatId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                >
                  {ingredientCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {translateIngredientCategory(cat.id, cat.name)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('unit')}
                </label>
                <select
                  value={ingUnit}
                  onChange={e => setIngUnit(e.target.value as UnitType)}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                >
                  {UNIT_OPTIONS.map(u => (
                    <option key={u} value={u}>
                      {translateUnit(u)} ({u})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddIngModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
                >
                  {t('saveIngredient')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/40 dark:border-white/10 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {showAddCatModal === 'recipe' ? t('newRecipeCat') : t('newIngredientCat')}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('categoryNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={e => setCatName(e.target.value)}
                  placeholder="e.g. Mexican Fiesta, Italian Classic, Bakery..."
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('icon')}
                </label>
                <select
                  value={catIcon}
                  onChange={e => setCatIcon(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                >
                  <option value="Utensils">Utensils</option>
                  <option value="Soup">Soup</option>
                  <option value="Drumstick">Drumstick</option>
                  <option value="Fish">Fish</option>
                  <option value="Salad">Salad</option>
                  <option value="Carrot">Carrot</option>
                  <option value="Cake">Cake</option>
                  <option value="Apple">Apple</option>
                  <option value="Milk">Milk</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="ShoppingBag">ShoppingBag</option>
                </select>
              </div>

              {showAddCatModal === 'recipe' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('description')}
                  </label>
                  <input
                    type="text"
                    value={catDesc}
                    onChange={e => setCatDesc(e.target.value)}
                    placeholder={t('shortDescPlaceholder')}
                    className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCatModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
                >
                  {t('createCategory')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
