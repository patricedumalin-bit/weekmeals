import React, { useState, useMemo } from 'react';
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
  CheckCircle2,
  Refrigerator
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
import { calculateShoppingList, formatQuantity, getUnitFamily, getIngredientCost } from '../utils/calculator';
import { CategoryIcon } from './CategoryIcon';
import { BudgetDonutChart } from './BudgetDonutChart';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppStore } from '../stores/useAppStore';

interface ShoppingListViewProps {
  weeklyPlan: WeeklyPlan;
  recipes: Recipe[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  checkedMap: Record<string, boolean>;
  customItems: CustomShoppingItem[];
  pantryMap?: Record<string, boolean>;
  onToggleItem: (key: string) => void;
  onAddCustomItem: (item: CustomShoppingItem) => void;
  onRemoveCustomItem: (id: string) => void;
  onResetChecked: () => void;
  onPrint: () => void;
  onOpenPantry?: () => void;
}

const UNIT_OPTIONS: UnitType[] = [
  'unit', 'g', 'kg', 'ml', 'cl', 'l', 'tbsp', 'tsp', 'clove', 'pinch', 'can', 'pack', 'bunch', 'slice'
];

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({
  weeklyPlan,
  recipes = [],
  ingredients = [],
  ingredientCategories = [],
  checkedMap = {},
  customItems = [],
  pantryMap = {},
  onToggleItem,
  onAddCustomItem,
  onRemoveCustomItem,
  onResetChecked,
  onPrint,
  onOpenPantry
}) => {
  const { t, translateUnit, translateIngredientCategory, translateMealLabel, translateIngredient, translateRecipe } = useLanguage();
  if (!weeklyPlan) return null;
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [filterHideChecked, setFilterHideChecked] = useState(false);
  const [filterHidePantry, setFilterHidePantry] = useState(false);

  const { isAddCustomShoppingModalOpen, setIsAddCustomShoppingModalOpen } = useAppStore();

  // Swipe gesture state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Custom Item Form State
  const [customName, setCustomName] = useState('');
  const [customCatId, setCustomCatId] = useState(ingredientCategories[0]?.id || 'cat-produce');
  const [customQty, setCustomQty] = useState(1);
  const [customUnit, setCustomUnit] = useState<UnitType>('unit');

  // Compute calculated shopping list
  const shoppingListData = useMemo(() => {
    return calculateShoppingList(
      weeklyPlan,
      recipes,
      ingredients,
      ingredientCategories,
      checkedMap,
      customItems,
      pantryMap,
      filterHidePantry
    );
  }, [weeklyPlan, recipes, ingredients, ingredientCategories, checkedMap, customItems, pantryMap, filterHidePantry]);

  const { groupedByCategory, totalItemsCount, checkedItemsCount, pantryItemsCount } = shoppingListData;

  // Calculer le budget total estimé de la liste de courses et par catégorie
  const budgetData = useMemo(() => {
    let estimatedTotalBudget = 0;
    const budgetByCategory: Record<string, { name: string; amount: number; color: string }> = {};

    groupedByCategory.forEach(group => {
      const catName = translateIngredientCategory(group.category.id, group.category.name);
      const catColor = group.category.color || 'var(--primary)';

      let categoryTotal = 0;
      group.items.forEach(item => {
        const cost = getIngredientCost(item.ingredientId, item.totalQuantity, item.unit);
        categoryTotal += cost;
      });

      if (categoryTotal > 0) {
        budgetByCategory[group.category.id] = {
          name: catName,
          amount: categoryTotal,
          color: catColor
        };
        estimatedTotalBudget += categoryTotal;
      }
    });

    return { estimatedTotalBudget, budgetByCategory };
  }, [groupedByCategory, translateIngredientCategory]);

  const { estimatedTotalBudget, budgetByCategory } = budgetData;

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent, itemKey: string, currentlyChecked: boolean) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    const threshold = 60; // swipe length in pixels

    if (Math.abs(diff) > threshold) {
      // Right swipe (diff > 0) or Left swipe (diff < 0)
      // For ergonomics, swipe right usually means check
      handleItemCheck(itemKey, currentlyChecked);
    }
    setTouchStartX(null);
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
    setIsAddCustomShoppingModalOpen(false);
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
      <div className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-5 sm:p-6 shadow-lg shadow-slate-900/5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[var(--accent)]/10 text-[var(--primary)] dark:text-[var(--accent)] border border-[var(--accent)]/20 mb-1.5">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{t('shoppingTag')}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {t('shoppingTitle')}
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
                {t('shoppingSubtitle')}
              </p>
            )}
          </div>

          {!isHeaderCollapsed && (
            <div className="flex items-center gap-2 flex-wrap animate-in fade-in slide-in-from-top-2 duration-300">
              <button
                onClick={() => setIsAddCustomShoppingModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md bg-[var(--accent)]/10 dark:bg-[var(--accent)]/20 text-[var(--primary)] dark:text-[var(--accent)] hover:bg-[var(--accent)]/20 border border-[var(--accent)]/25 transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>{t('addCustomItem')}</span>
              </button>

              <button
                onClick={handleCopyList}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold backdrop-blur-md bg-[var(--cell-bg)] hover:bg-[var(--cell-bg-hover)] border border-[var(--border-color)] text-slate-800 dark:text-slate-200 transition-colors shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[var(--primary)]" />
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>{t('printList')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar & Status */}
        {!isHeaderCollapsed && (
          <div className="mt-5 pt-4 border-t border-white/40 dark:border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>{t('shoppingProgress')}</span>
                <span className="text-[var(--primary)] dark:text-[var(--accent)] font-bold">
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
                <span className="text-[var(--primary)] dark:text-[var(--accent)] font-extrabold font-mono">
                  {progressPercentage}%
                </span>
              </div>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-200/60 dark:bg-slate-800/80 overflow-hidden p-0.5 border border-white/40 dark:border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] transition-all duration-300 rounded-full shadow-xs"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Budget Récapitulatif Estimé */}
            <div className="mt-3.5 space-y-3">
              <div className="flex flex-col md:flex-row gap-5 items-center bg-white/30 dark:bg-slate-800/30 rounded-2xl p-4 border border-white/20 dark:border-white/5">
                 {estimatedTotalBudget > 0 && (
                    <div className="shrink-0 animate-spring-in">
                      <BudgetDonutChart
                        total={estimatedTotalBudget}
                        categories={Object.values(budgetByCategory)}
                        size={100}
                      />
                    </div>
                 )}

                 <div className="flex-1 space-y-3 w-full">
                    <div className="px-4 py-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between text-xs w-full">
                      <span className="font-semibold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                        💰 Budget Restant Estimé en Rayon :
                      </span>
                      <span className="font-extrabold text-sky-600 dark:text-sky-400 font-mono text-sm">
                        {estimatedTotalBudget === 0 ? '0.00 € (Panier Plein)' : `${estimatedTotalBudget.toFixed(2)} €`}
                      </span>
                    </div>

                    {/* Répartition par Rayon (Amélioration Esthétique) */}
                    {estimatedTotalBudget > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
                        {Object.entries(budgetByCategory)
                          .sort((a, b) => b[1].amount - a[1].amount)
                          .slice(0, 6) // Show top 6 categories
                          .map(([id, cat]) => (
                            <div key={id} className="p-2 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-0.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-slate-500 truncate mr-1 uppercase">{cat.name}</span>
                                <span className="text-[9px] font-mono font-bold text-slate-700 dark:text-slate-300">{cat.amount.toFixed(2)}€</span>
                              </div>
                              <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                                <div
                                  className="h-full opacity-70"
                                  style={{
                                    width: `${(cat.amount / estimatedTotalBudget) * 100}%`,
                                    backgroundColor: `var(--${cat.color}, #94a3b8)`
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                 </div>
              </div>
            </div>
          </div>
        )}
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
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-[var(--accent)] transition-all"
            />
          </div>

          {onOpenPantry && (
            <button
              onClick={onOpenPantry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all self-start sm:self-auto"
            >
              <Refrigerator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Frigo & Placard</span>
              {pantryItemsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-600 text-white font-bold">
                  {pantryItemsCount}
                </span>
              )}
            </button>
          )}

          {pantryItemsCount > 0 && (
            <button
              onClick={() => setFilterHidePantry(!filterHidePantry)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all self-start sm:self-auto ${
                filterHidePantry
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
              }`}
            >
              <Refrigerator className="w-3.5 h-3.5" />
              <span>{filterHidePantry ? 'Stock masqué' : `Masquer en stock (${pantryItemsCount})`}</span>
            </button>
          )}

          <button
            onClick={() => setFilterHideChecked(!filterHideChecked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all self-start sm:self-auto ${
              filterHideChecked
                ? 'bg-[var(--primary)] text-white shadow-xs'
                : 'bg-[var(--cell-bg)] border border-[var(--border-color)] text-slate-700 dark:text-slate-300 hover:bg-[var(--cell-bg-hover)]'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>{filterHideChecked ? t('showingPendingOnly') : t('hideChecked')}</span>
          </button>
        </div>

      {/* Categorized Lists */}
      {groupedByCategory.length === 0 ? (
        <div className="text-center py-16 px-4 backdrop-blur-xl bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] shadow-lg shadow-slate-900/5 transition-all duration-300">
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
                className="backdrop-blur-xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-md shadow-slate-900/5 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="px-4 py-3 backdrop-blur-md bg-[var(--cell-bg)] border-b border-[var(--border-color)] flex items-center justify-between transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg backdrop-blur-md bg-[var(--cell-bg-hover)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary)] dark:text-[var(--accent)] shadow-2xs transition-all">
                      <CategoryIcon name={group.category.icon} className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {catDisplayName}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-md bg-[var(--cell-bg-hover)] text-slate-700 dark:text-slate-300 border border-[var(--border-color)]">
                    {group.checkedCount}/{group.totalCount}
                  </span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-white/40 dark:divide-white/5">
                  {filteredItems.map((item) => {
                    const itemKey = item.sources[0]?.recipeId === 'manual'
                      ? `custom_${item.ingredientId}`
                      : `${item.ingredientId}_${getUnitFamily(item.unit)}`;
                    const isExpanded = !!expandedSources[itemKey];
                    const isCustom = item.sources[0]?.recipeId === 'manual';
                    const unitDisplayName = translateUnit(item.unit);
                    const ingredientDisplayName = translateIngredient(item.ingredientId, item.ingredientName);

                    return (
                      <div
                        key={itemKey}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={(e) => handleTouchEnd(e, itemKey, item.checked)}
                        className={`p-3 sm:px-4 transition-colors select-none ${
                          item.checked
                            ? 'bg-[var(--cell-bg)]/20 text-slate-400 opacity-60'
                            : 'hover:bg-[var(--cell-bg-hover)]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          {/* Checkbox + Name */}
                          <label className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => handleItemCheck(itemKey, item.checked)}
                              className="w-5 h-5 rounded-md text-[var(--primary)] focus:ring-[var(--primary)] border-[var(--border-color)] bg-[var(--cell-bg-hover)] cursor-pointer shrink-0"
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
                            {item.inPantry && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                                En stock
                              </span>
                            )}
                          </label>

                          {/* Summed Quantity Badge & Provenance toggle */}
                          <div className="flex items-center gap-2 shrink-0">
                            {(() => {
                              const itemObj = ingredients.find(i => i.id === item.ingredientId);
                              const lineCost = getIngredientCost(
                                item.ingredientId,
                                item.totalQuantity,
                                item.unit,
                                item.categoryId,
                                itemObj?.name || item.ingredientName
                              );
                              return lineCost > 0 ? (
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.checked ? 'bg-slate-100 text-slate-400' : 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300'}`}>
                                  ~{lineCost.toFixed(2)}€
                                </span>
                              ) : null;
                            })()}

                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-lg border font-mono backdrop-blur-md ${
                                item.checked
                                  ? 'bg-[var(--cell-bg)]/40 text-slate-400 border-[var(--border-color)]'
                                  : 'bg-[var(--accent)]/10 text-[var(--primary)] dark:text-[var(--primary)] border-[var(--accent)]/20'
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
                                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-[var(--cell-bg-hover)] backdrop-blur-md"
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
                          <div className="mt-2.5 ml-8 p-2.5 rounded-xl backdrop-blur-md bg-[var(--cell-bg)] border border-[var(--border-color)] text-xs space-y-1 transition-all duration-300">
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
                                  <span className="font-mono text-[var(--primary)] dark:text-[var(--accent)] font-semibold">
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
      {isAddCustomShoppingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/40 dark:border-white/10 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {t('addCustomItem')}
              </h3>
              <button
                onClick={() => setIsAddCustomShoppingModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggestions rapides</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Lait', cat: 'cat-produits-laitiers', unit: 'l', qty: 1 },
                  { name: 'Œufs', cat: 'cat-oeufs', unit: 'unit', qty: 6 },
                  { name: 'Pain', cat: 'cat-cereales', unit: 'unit', qty: 1 },
                  { name: 'Beurre', cat: 'cat-matieres-grasses', unit: 'g', qty: 250 },
                  { name: 'Pommes', cat: 'cat-fruits', unit: 'unit', qty: 4 },
                  { name: 'Pâtes', cat: 'cat-cereales', unit: 'g', qty: 500 },
                  { name: 'Riz', cat: 'cat-cereales', unit: 'g', qty: 500 },
                  { name: 'Eau', cat: 'cat-produits-laitiers', unit: 'l', qty: 6 },
                ].map((sug) => (
                  <button
                    key={sug.name}
                    type="button"
                    onClick={() => {
                      setCustomName(sug.name);
                      setCustomCatId(sug.cat);
                      setCustomUnit(sug.unit as UnitType);
                      setCustomQty(sug.qty);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] border border-transparent hover:border-[var(--primary)]/20 transition-all"
                  >
                    + {sug.name}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateCustom} className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
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
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
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
                  onClick={() => setIsAddCustomShoppingModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
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
