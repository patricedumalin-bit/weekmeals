import React from 'react';
import { WeeklyPlan, Recipe, RecipeCategory, Ingredient, IngredientCategory, CustomShoppingItem } from '../types';
import { calculateShoppingList, formatQuantity } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';

interface PrintableSheetProps {
  weeklyPlan?: WeeklyPlan | null;
  recipes: Recipe[];
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  customItems: CustomShoppingItem[];
}

export const PrintableSheet: React.FC<PrintableSheetProps> = ({
  weeklyPlan,
  recipes,
  recipeCategories,
  ingredients,
  ingredientCategories,
  customItems
}) => {
  const { t, language, translateUnit, translateIngredientCategory, translateMealLabel, translateIngredient, translateRecipe } = useLanguage();
  if (!weeklyPlan) return null;

  const recipeMap = new Map<string, Recipe>(recipes.map(r => [r.id, r]));

  const { groupedByCategory, totalItemsCount } = calculateShoppingList(
    weeklyPlan,
    recipes,
    ingredients,
    ingredientCategories,
    {},
    customItems
  );

  const dateLocaleMap: Record<string, string> = {
    en: 'en-US',
    de: 'de-DE',
    fr: 'fr-FR',
    es: 'es-ES',
    pt: 'pt-BR'
  };

  const locale = dateLocaleMap[language] || 'en-US';

  return (
    <div id="printable-content" className="print-only p-4 max-w-full mx-auto text-black font-sans leading-tight bg-white">
      {/* Title & Stats Compact */}
      <div className="border-b-2 border-black pb-2 mb-4 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-black tracking-tight uppercase leading-none">
            {t('printTitle')}
          </h1>
          <p className="text-[10px] text-gray-700 mt-1">
            {t('generatedOn', {
              date: new Date().toLocaleDateString(locale, {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })
            })}
          </p>
        </div>
        <div className="text-right text-[10px] text-gray-700 font-bold uppercase">
          {weeklyPlan.numberOfMeals} Repas • {weeklyPlan.defaultServings} Pers. • {totalItemsCount} Ingr.
        </div>
      </div>

      {/* Section 1: Weekly Meals Schedule - More Compact Grid */}
      <div className="mb-6">
        <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-black pb-0.5 mb-2">
          {t('printMealScheduleHeader')}
        </h2>

        <div className="grid grid-cols-3 gap-2">
          {weeklyPlan.meals.map((meal) => {
            const assigned = (meal.recipeIds || [])
              .map(id => recipeMap.get(id))
              .filter((r): r is Recipe => Boolean(r));

            const displayLabel = translateMealLabel(meal.mealNumber, meal.label);

            return (
              <div key={meal.id} className="border border-gray-200 rounded p-1.5 text-[10px] break-inside-avoid">
                <div className="flex justify-between font-black border-b border-gray-100 pb-0.5 mb-1">
                  <span className="truncate">{displayLabel}</span>
                  <span className="text-gray-500">{meal.servings}p</span>
                </div>
                {assigned.length === 0 ? (
                  <p className="text-gray-400 italic text-[9px]">{t('noRecipeAssignedPrint')}</p>
                ) : (
                  <ul className="space-y-0.5">
                    {assigned.map((r, i) => {
                      const localized = translateRecipe(r);
                      return (
                        <li key={i} className="flex justify-between items-start gap-1">
                          <span className="line-clamp-1 flex-1">• {localized.title}</span>
                          <span className="text-gray-400 font-mono text-[8px] whitespace-nowrap mt-0.5">
                            {r.prepTimeMinutes + r.cookTimeMinutes}'
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Categorized Shopping List - Columns layout for extreme compactness */}
      <div>
        <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-black pb-0.5 mb-2">
          {t('printShoppingHeader')}
        </h2>

        <div className="columns-3 gap-4 space-y-3">
          {groupedByCategory.map((group) => {
            const catName = translateIngredientCategory(group.category.id, group.category.name);
            return (
              <div key={group.category.id} className="break-inside-avoid inline-block w-full">
                <h3 className="text-[9px] font-black uppercase text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
                  {catName}
                </h3>
                <ul className="space-y-0.5 text-[9px]">
                  {group.items.map((item, idx) => {
                    const ingName = translateIngredient(item.ingredientId, item.ingredientName);
                    return (
                      <li key={idx} className="flex items-start gap-1.5">
                        <div className="w-2.5 h-2.5 border border-black rounded-xs shrink-0 mt-0.5" />
                        <div className="flex-1 leading-tight">
                          <span className="font-bold text-gray-900 mr-1">
                            {formatQuantity(item.totalQuantity)} {translateUnit(item.unit)}
                          </span>
                          <span className="text-gray-800">{ingName}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Compact */}
      <div className="mt-6 pt-2 border-t border-gray-200 text-center">
        <p className="text-[8px] text-gray-400 italic">
          Planifié avec WeekMeals - Vos recettes, votre semaine, votre liste.
        </p>
      </div>
    </div>
  );
};
