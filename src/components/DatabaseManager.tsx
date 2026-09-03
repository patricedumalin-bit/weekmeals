import React, { useState } from 'react';
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
  Tag
} from 'lucide-react';
import { 
  Recipe, 
  RecipeCategory, 
  Ingredient, 
  IngredientCategory, 
  UnitType, 
  WeeklyPlan 
} from '../types';
import { CategoryIcon } from './CategoryIcon';
import { exportDatabaseJson } from '../utils/storage';
import { useLanguage } from '../i18n/LanguageContext';

interface DatabaseManagerProps {
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  weeklyPlan: WeeklyPlan;
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
  onOpenRecipeEditor: (recipeToEdit?: Recipe | null) => void;
  onPreviewRecipe: (recipe: Recipe) => void;
}

type SubTab = 'recipes' | 'ingredients' | 'recipeCats' | 'ingredientCats' | 'backup';

const UNIT_OPTIONS: UnitType[] = [
  'unit', 'g', 'kg', 'ml', 'cl', 'l', 'tbsp', 'tsp', 'clove', 'pinch', 'can', 'pack', 'bunch', 'slice'
];

export const DatabaseManager: React.FC<DatabaseManagerProps> = ({
  recipes,
  recipeCategories,
  ingredients,
  ingredientCategories,
  weeklyPlan,
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
  onOpenRecipeEditor,
  onPreviewRecipe
}) => {
  const { t, translateUnit, translateRecipeCategory, translateIngredientCategory, translateRecipe, translateIngredient } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCat, setSelectedFilterCat] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const COUNTRIES = [
    { id: 'all', label: 'All Cuisines', flag: '🌍' },
    { id: 'France', label: 'France', flag: '🇫🇷' },
    { id: 'Italy', label: 'Italy', flag: '🇮🇹' },
    { id: 'England', label: 'England / UK', flag: '🇬🇧' },
    { id: 'Germany', label: 'Germany', flag: '🇩🇪' },
    { id: 'Spain', label: 'Spain', flag: '🇪🇸' },
    { id: 'Portugal', label: 'Portugal', flag: '🇵🇹' },
  ];

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
      <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>{t('dbEngineTag')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {t('dbManagementTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t('dbManagementSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {activeSubTab === 'recipes' && (
              <button
                onClick={() => onOpenRecipeEditor(null)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{t('newRecipe')}</span>
              </button>
            )}

            {activeSubTab === 'ingredients' && (
              <button
                onClick={() => {
                  setIngToEdit(null);
                  setIngName('');
                  setShowAddIngModal(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 transition-all"
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{t('newCategory')}</span>
              </button>
            )}
          </div>
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
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/80'
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
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('subtabIngredients', { count: ingredients.length })}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('recipeCats')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'recipeCats'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/80'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>{t('subtabRecipeCats', { count: recipeCategories.length })}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ingredientCats')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'ingredientCats'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/80'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>{t('subtabIngredientCats', { count: ingredientCategories.length })}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('backup')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeSubTab === 'backup'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/80'
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
          {/* Search and Category/Country Filters */}
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('searchRecipePlaceholder')}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Country filter chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCountry(c.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                      selectedCountry === c.id
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white/90 border border-white/40 dark:border-white/5'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter row */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedFilterCat('all')}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedFilterCat === 'all'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-xs'
                    : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300'
                }`}
              >
                {t('allCategoriesFilter', { count: recipes.length })}
              </button>
              {recipeCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilterCat(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedFilterCat === cat.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-xs'
                      : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {translateRecipeCategory(cat.id, cat.name)}
                </button>
              ))}
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes
              .filter(r => {
                const localized = translateRecipe(r);
                const matchesCat = selectedFilterCat === 'all' || r.categoryId === selectedFilterCat;
                const matchesCountry = selectedCountry === 'all' || r.tags.some(t => t.toLowerCase() === selectedCountry.toLowerCase() || (selectedCountry === 'England' && t.toLowerCase() === 'british'));
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                  r.title.toLowerCase().includes(query) ||
                  localized.title.toLowerCase().includes(query) ||
                  r.description.toLowerCase().includes(query) ||
                  localized.description.toLowerCase().includes(query) ||
                  r.tags.some(t => t.toLowerCase().includes(query)) ||
                  localized.tags.some(t => t.toLowerCase().includes(query));
                return matchesCat && matchesCountry && matchesSearch;
              })
              .map(recipe => {
                const localized = translateRecipe(recipe);
                const cat = recipeCategories.find(c => c.id === recipe.categoryId);
                return (
                  <div
                    key={recipe.id}
                    className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-md shadow-slate-900/5 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {cat && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold backdrop-blur-md bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-white/50 dark:border-white/10">
                            <CategoryIcon name={cat.icon} className="w-3 h-3 text-emerald-600" />
                            {translateRecipeCategory(cat.id, cat.name)}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {recipe.ingredients.length} ings
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {localized.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {localized.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/40 dark:border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => onPreviewRecipe(recipe)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('preview')}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onOpenRecipeEditor(recipe)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-500/10"
                          title="Edit Recipe"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(t('confirmDeleteRecipe', { title: localized.title }))) {
                              onDeleteRecipe(recipe.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10"
                          title="Delete Recipe"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedFilterCat('all')}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedFilterCat === 'all'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                    : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300'
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
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                      : 'backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {translateIngredientCategory(cat.id, cat.name)}
                </button>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-md shadow-slate-900/5">
            <div className="divide-y divide-white/40 dark:divide-white/5">
              {ingredients
                .filter(i => {
                  const localizedName = translateIngredient(i.id, i.name);
                  const matchesCat = selectedFilterCat === 'all' || i.categoryId === selectedFilterCat;
                  const query = searchQuery.toLowerCase();
                  const matchesSearch = i.name.toLowerCase().includes(query) || localizedName.toLowerCase().includes(query);
                  return matchesCat && matchesSearch;
                })
                .map(ing => {
                  const localizedName = translateIngredient(ing.id, ing.name);
                  const cat = ingredientCategories.find(c => c.id === ing.categoryId);
                  return (
                    <div
                      key={ing.id}
                      className="p-3 sm:px-4 flex items-center justify-between hover:bg-white/40 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-2xs" />
                        <div>
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {localizedName}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            {cat && (
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                {translateIngredientCategory(cat.id, cat.name)}
                              </span>
                            )}
                            <span className="text-[10px] px-1.5 py-0.2 rounded backdrop-blur-md bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-white/40 dark:border-white/5 font-mono">
                              {t('defaultUnitLabel', { unit: translateUnit(ing.defaultUnit) })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditIng(ing)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-500/10"
                          title="Edit Ingredient"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(t('confirmDeleteIngredient', { name: localizedName }))) {
                              onDeleteIngredient(ing.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10"
                          title="Delete Ingredient"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-2xl p-4 flex items-start justify-between shadow-md shadow-slate-900/5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                    <CategoryIcon name={cat.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {translateRecipeCategory(cat.id, cat.name)}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cat.description}</p>
                    <span className="inline-block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
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
                className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-2xl p-4 flex items-start justify-between shadow-md shadow-slate-900/5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl backdrop-blur-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs">
                    <CategoryIcon name={cat.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {translateIngredientCategory(cat.id, cat.name)}
                    </h3>
                    <span className="inline-block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
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
              <Download className="w-4 h-4 text-emerald-600" />
              <span>{t('exportDbTitle')}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('exportDbDesc')}
            </p>
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t('downloadJsonBtn')}</span>
            </button>
          </div>

          <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-2xl p-5 shadow-md shadow-slate-900/5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>{t('importDbTitle')}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('importDbDesc')}
            </p>
            <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold backdrop-blur-md bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-white/50 dark:border-white/10 text-slate-800 dark:text-slate-200 cursor-pointer shadow-2xs transition-colors">
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
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20"
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
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20"
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
