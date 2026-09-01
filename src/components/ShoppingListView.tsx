import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Printer, 
  Check, 
  Share2, 
  Plus, 
  RotateCcw, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Sparkles, 
  Trash2,
  ListFilter,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  WeeklyPlan, 
  Recipe, 
  Ingredient, 
  IngredientCategory, 
  CustomShoppingItem, 
  UnitType,
  AggregatedShoppingItem
} from '../types';
import { calculateShoppingList, formatQuantity } from '../utils/calculator';
import { CategoryIcon } from './CategoryIcon';
import { useLanguage } from '../i18n/LanguageContext';

interface ShoppingListViewProps {
  weeklyPlan: WeeklyPlan;
  recipes: Recipe[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  checkedMap: Record<string, boolean>;
  customItems: CustomShoppingItem[];
  onToggleItem: (key: string) => void;
  onAddCustomItem: (item: CustomShoppingItem) => void;
  onRemoveCustomItem: (id: string) => void;
  onResetChecked: () => void;
  onPrint: () => void;
}

const UNIT_OPTIONS: UnitType[] = [
  'unit', 'g', 'kg', 'ml', 'cl', 'l', 'tbsp', 'tsp', 'clove', 'pinch', 'can', 'pack', 'bunch', 'slice'
];

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({
  weeklyPlan,
  recipes,
  ingredients,
  ingredientCategories,
  checkedMap,
  customItems,
  onToggleItem,
  onAddCustomItem,
  onRemoveCustomItem,
  onResetChecked,
  onPrint
}) => {
  const { t, translateUnit, translateIngredientCategory, translateMealLabel, translateIngredient, translateRecipe } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filterHideChecked, setFilterHideChecked] = useState(false);

  // Custom Item Form State
  const [customName, setCustomName] = useState('');
  const [customCatId, setCustomCatId] = useState(ingredientCategories[0]?.id || 'cat-produce');
  const [customQty, setCustomQty] = useState(1);
  const [customUnit, setCustomUnit] = useState<UnitType>('unit');

  // Compute calculated shopping list
  const { groupedByCategory, totalItemsCount, checkedItemsCount } = calculateShoppingList(
    weeklyPlan,
    recipes,
    ingredients,
    ingredientCategories,
    checkedMap,
    customItems
  );

  const progressPercentage = totalItemsCount > 0
    ? Math.round((checkedItemsCount / totalItemsCount) * 100)
    : 0;

  const toggleExpandSource = (key: string) => {
    setExpandedSources(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleItemCheck = (key: string, currentlyChecked: boolean) => {
    onToggleItem(key);
    // If checking the last unchecked item, celebrate with confetti!
    if (!currentlyChecked && checkedItemsCount + 1 === totalItemsCount && totalItemsCount > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    onAddCustomItem({
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      categoryId: customCatId,
      quantity: Number(customQty) || 1,
      unit: customUnit,
      checked: false
    });

    setCustomName('');
    setCustomQty(1);
    setShowAddCustomModal(false);
  };

  const handleCopyList = () => {
    let text = `🛒 ${t('appName').toUpperCase()} (${weeklyPlan.numberOfMeals} ${t('tabPlannedMeals')})\n\n`;

    groupedByCategory.forEach(group => {
      const catDisplayName = translateIngredientCategory(group.category.id, group.category.name);
      text += `📦 ${catDisplayName.toUpperCase()}:\n`;
      group.items.forEach(item => {
        const mark = item.checked ? '✓ [x]' : '[ ]';
        const displayName = translateIngredient(item.ingredientId, item.ingredientName);
        text += `${mark} ${formatQuantity(item.totalQuantity)} ${translateUnit(item.unit)} - ${displayName}\n`;
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner / Shopping Dashboard */}
      <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 mb-1.5">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{t('shoppingTag')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {t('shoppingTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t('shoppingSubtitle')}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddCustomModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/25 transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addCustomItem')}</span>
            </button>

            <button
              onClick={handleCopyList}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-white/50 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{t('copied')}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>{t('share')}</span>
                </>
              )}
            </button>

            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{t('printList')}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="mt-5 pt-4 border-t border-white/40 dark:border-white/5">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>{t('shoppingProgress')}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {t('itemsGathered', { checked: checkedItemsCount, total: totalItemsCount })}
              </span>
            </span>
            <div className="flex items-center gap-3">
              {checkedItemsCount > 0 && (
                <button
                  onClick={onResetChecked}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  {t('uncheckAll')}
                </button>
              )}
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold font-mono">
                {progressPercentage}%
              </span>
            </div>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-200/60 dark:bg-slate-800/80 overflow-hidden p-0.5 border border-white/40 dark:border-white/5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full shadow-xs"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Search & Filter within shopping list */}
        <div className="mt-4 pt-3 border-t border-white/40 dark:border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('searchShoppingPlaceholder')}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <button
            onClick={() => setFilterHideChecked(!filterHideChecked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all self-start sm:self-auto ${
              filterHideChecked
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/80'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>{filterHideChecked ? t('showingPendingOnly') : t('hideChecked')}</span>
          </button>
        </div>
      </div>

      {/* Categorized Lists */}
      {groupedByCategory.length === 0 ? (
        <div className="text-center py-16 px-4 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 rounded-3xl border border-white/50 dark:border-white/10 shadow-lg shadow-slate-900/5">
          <ShoppingCart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            {t('shoppingListEmpty')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {t('shoppingListEmptySub')}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {groupedByCategory.map((group) => {
            const catDisplayName = translateIngredientCategory(group.category.id, group.category.name);

            // Apply search and hide checked filters
            const filteredItems = group.items.filter(item => {
              const displayName = translateIngredient(item.ingredientId, item.ingredientName);
              const matchesSearch = 
                item.ingredientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                displayName.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesChecked = !filterHideChecked || !item.checked;
              return matchesSearch && matchesChecked;
            });

            if (filteredItems.length === 0) return null;

            return (
              <div
                key={group.category.id}
                className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-md shadow-slate-900/5"
              >
                {/* Category Header */}
                <div className="px-4 py-3 backdrop-blur-md bg-white/50 dark:bg-slate-800/50 border-b border-white/40 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg backdrop-blur-md bg-white/80 dark:bg-slate-700/80 border border-white/50 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-2xs">
                      <CategoryIcon name={group.category.icon} className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {catDisplayName}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-md bg-slate-200/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-white/40 dark:border-white/5">
                    {group.checkedCount}/{group.totalCount}
                  </span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-white/40 dark:divide-white/5">
                  {filteredItems.map((item) => {
                    const itemKey = item.sources[0]?.recipeId === 'manual'
                      ? `custom_${item.ingredientId}`
                      : `${item.ingredientId}_${item.unit}`;
                    const isExpanded = !!expandedSources[itemKey];
                    const isCustom = item.sources[0]?.recipeId === 'manual';
                    const unitDisplayName = translateUnit(item.unit);
                    const ingredientDisplayName = translateIngredient(item.ingredientId, item.ingredientName);

                    return (
                      <div
                        key={itemKey}
                        className={`p-3 sm:px-4 transition-colors ${
                          item.checked
                            ? 'bg-slate-100/30 dark:bg-slate-900/40 text-slate-400'
                            : 'hover:bg-white/40 dark:hover:bg-slate-800/30'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          {/* Checkbox + Name */}
                          <label className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => handleItemCheck(itemKey, item.checked)}
                              className="w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 cursor-pointer shrink-0"
                            />
                            <span
                              className={`text-sm font-medium transition-all truncate ${
                                item.checked
                                  ? 'line-through text-slate-400 dark:text-slate-500'
                                  : 'text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              {ingredientDisplayName}
                            </span>
                          </label>

                          {/* Summed Quantity Badge & Provenance toggle */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-lg border font-mono backdrop-blur-md ${
                                item.checked
                                  ? 'bg-slate-100/60 dark:bg-slate-800/60 text-slate-400 border-slate-200/60 dark:border-slate-700/60'
                                  : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20'
                              }`}
                            >
                              {formatQuantity(item.totalQuantity)} {unitDisplayName}
                            </span>

                            {isCustom ? (
                              <button
                                onClick={() => onRemoveCustomItem(item.ingredientId)}
                                title="Remove custom item"
                                className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-500/10"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleExpandSource(itemKey)}
                                title="Show why this ingredient is needed"
                                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 backdrop-blur-md"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <Info className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expandable Recipe Provenance Breakdown */}
                        {isExpanded && !isCustom && (
                          <div className="mt-2.5 ml-8 p-2.5 rounded-xl backdrop-blur-md bg-white/50 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-xs space-y-1">
                            <span className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                              {t('requestedByDishes', { count: item.sources.length })}
                            </span>
                            {item.sources.map((src, sIdx) => {
                              const mealDisplay = translateMealLabel(src.mealLabel);
                              const recipeTitleDisplay = src.recipeId === 'manual' 
                                ? src.recipeTitle 
                                : translateRecipe({ id: src.recipeId, title: src.recipeTitle }).title;
                              return (
                                <div
                                  key={sIdx}
                                  className="flex items-center justify-between text-slate-600 dark:text-slate-400"
                                >
                                  <span>
                                    • <strong className="text-slate-800 dark:text-slate-200">{recipeTitleDisplay}</strong> ({mealDisplay}, {src.servings} pers.)
                                  </span>
                                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                    {formatQuantity(src.scaledQuantity)} {translateUnit(src.unit)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Item Modal */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/40 dark:border-white/10 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {t('addCustomItem')}
              </h3>
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustom} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('itemName')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('itemNamePlaceholder')}
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('category')}
                </label>
                <select
                  value={customCatId}
                  onChange={e => setCustomCatId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                >
                  {ingredientCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {translateIngredientCategory(cat.id, cat.name)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quantity')}
                  </label>
                  <input
                    type="number"
                    min={0.1}
                    step="any"
                    value={customQty}
                    onChange={e => setCustomQty(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('unit')}
                  </label>
                  <select
                    value={customUnit}
                    onChange={e => setCustomUnit(e.target.value as UnitType)}
                    className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                  >
                    {UNIT_OPTIONS.map(u => (
                      <option key={u} value={u}>
                        {translateUnit(u)} ({u})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20"
                >
                  {t('addToList')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
