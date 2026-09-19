import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Check, 
  Refrigerator, 
  Sparkles, 
  ChefHat, 
  Plus, 
  AlertCircle,
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Ingredient, IngredientCategory, Recipe } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { matchRecipesWithPantry, getIngredientCost } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';

interface PantryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  pantryMap: Record<string, boolean>;
  onTogglePantryItem: (ingredientId: string) => void;
  onBatchSetPantry: (updates: Record<string, boolean>) => void;
  recipes: Recipe[];
  onSelectRecipeForMeal?: (recipe: Recipe) => void;
  onPreviewRecipe?: (recipe: Recipe) => void;
}

export const PantryModal: React.FC<PantryModalProps> = ({
  isOpen,
  onClose,
  ingredients,
  ingredientCategories,
  pantryMap,
  onTogglePantryItem,
  onBatchSetPantry,
  recipes,
  onSelectRecipeForMeal,
  onPreviewRecipe
}) => {
  const { translateIngredient, translateIngredientCategory, translateRecipe } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stock' | 'antiwaste'>('stock');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const inStockCount = Object.values(pantryMap).filter(Boolean).length;
  const antiWasteMatches = matchRecipesWithPantry(recipes, pantryMap, ingredients);

  const filteredIngredients = ingredients.filter(ing => {
    const matchesSearch = translateIngredient(ing.id, ing.name).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || ing.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleClearAll = () => {
    if (confirm('Voulez-vous réinitialiser tous les ingrédients de votre stock ?')) {
      const cleared: Record<string, boolean> = {};
      Object.keys(pantryMap).forEach(k => { cleared[k] = false; });
      onBatchSetPantry(cleared);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Refrigerator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Mon Frigo & Placard
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {inStockCount} en stock
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Cochez ce que vous avez déjà à la maison pour l'exclure de vos courses et trouver des idées anti-gaspi.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('stock')}
              className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'stock'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              Inventaire des Stocks ({inStockCount})
            </button>
            <button
              onClick={() => setActiveTab('antiwaste')}
              className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'antiwaste'
                  ? 'border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Anti-Gaspillage ({antiWasteMatches.filter(m => m.matchPercentage > 0).length})</span>
            </button>
          </div>

          {activeTab === 'stock' && inStockCount > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 pb-2 transition-colors font-medium"
            >
              Tout désélectionner
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'stock' ? (
            <div className="space-y-4">
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Chercher un ingrédient..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Effacer
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Toutes ({ingredients.length})
                  </button>
                  {ingredientCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
                      <span>{translateIngredientCategory(cat.id, cat.name)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Ingredients */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {filteredIngredients.map(ing => {
                  const isInStock = !!pantryMap[ing.id];
                  const category = ingredientCategories.find(c => c.id === ing.categoryId);

                  // Calculer le prix indicatif pour 100g ou 1 unité
                  const defaultQty = ing.defaultUnit === 'g' || ing.defaultUnit === 'ml' ? 100 : 1;
                  const unitCost = getIngredientCost(ing.id, defaultQty, ing.defaultUnit, ing.categoryId, ing.name);
                  const isCondiment = unitCost === 0;

                  return (
                    <button
                      key={ing.id}
                      type="button"
                      onClick={() => onTogglePantryItem(ing.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 select-none ${
                        isInStock
                          ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-sm'
                          : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 w-full">
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-bold truncate ${
                            isInStock ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'
                          }`}>
                            {translateIngredient(ing.id, ing.name)}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
                            {category ? translateIngredientCategory(category.id, category.name) : ''}
                          </p>
                        </div>

                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                          isInStock
                            ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}>
                          {isInStock && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </div>
                      </div>

                      {/* Fiche d'informations produit enrichie (Prix & Unité) */}
                      <div className="flex items-center justify-between w-full pt-1.5 border-t border-slate-200/60 dark:border-slate-700/50 text-[11px]">
                        <span className="text-slate-400 dark:text-slate-500">
                          Unité : <span className="font-semibold text-slate-600 dark:text-slate-300">{ing.defaultUnit}</span>
                        </span>

                        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                          isInStock
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : isCondiment
                            ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
                            : 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-400'
                        }`}>
                          {isCondiment ? 'Gratuit / Épice' : `${unitCost.toFixed(2)}€ / ${defaultQty}${ing.defaultUnit}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredIngredients.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm">Aucun ingrédient ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          ) : (
            /* Anti-Waste Tab */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold">Assistant Anti-Gaspillage</p>
                  <p className="text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                    Voici les recettes que vous pouvez préparer en priorité avec ce que vous avez déjà en stock. Les ingrédients manquants sont indiqués pour chaque recette.
                  </p>
                </div>
              </div>

              {inStockCount === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Refrigerator className="w-12 h-12 mx-auto mb-3 opacity-30 text-emerald-500" />
                  <p className="text-base font-semibold text-slate-800 dark:text-slate-200">Votre stock est vide pour le moment</p>
                  <p className="text-xs sm:text-sm mt-1 max-w-md mx-auto">
                    Retournez sur l'onglet « Inventaire des Stocks » et cochez les ingrédients que vous avez dans vos placards pour voir les suggestions.
                  </p>
                  <button
                    onClick={() => setActiveTab('stock')}
                    className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Remplir mon frigo
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {antiWasteMatches.map(({ recipe, totalIngredients, availableCount, missingIngredients, matchPercentage }) => {
                    const localized = translateRecipe(recipe);

                    return (
                      <div
                        key={recipe.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                                {localized.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)} min
                                </span>
                                <span>•</span>
                                <span>{recipe.servings || 4} pers.</span>
                              </div>
                            </div>

                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                              matchPercentage === 100
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                : matchPercentage >= 60
                                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}>
                              {matchPercentage}% disponible
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-3">
                            <div
                              className={`h-full transition-all duration-300 ${
                                matchPercentage === 100 ? 'bg-emerald-500' : matchPercentage >= 60 ? 'bg-amber-500' : 'bg-slate-400'
                              }`}
                              style={{ width: `${matchPercentage}%` }}
                            />
                          </div>

                          {/* Missing ingredients tag preview */}
                          {missingIngredients.length > 0 ? (
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                              <span className="font-medium text-slate-700 dark:text-slate-300">À acheter ({missingIngredients.length}) : </span>
                              {missingIngredients.map(mi => translateIngredient(mi.id, mi.name)).join(', ')}
                            </div>
                          ) : (
                            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              Tous les ingrédients sont déjà dans votre cuisine !
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          {onPreviewRecipe && (
                            <button
                              type="button"
                              onClick={() => onPreviewRecipe(recipe)}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                            >
                              Voir la recette
                            </button>
                          )}
                          {onSelectRecipeForMeal && (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectRecipeForMeal(recipe);
                                onClose();
                              }}
                              className="flex-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Ajouter au planning</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {inStockCount} ingrédient{inStockCount > 1 ? 's' : ''} en stock actuellement.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
