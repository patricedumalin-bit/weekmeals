import React from 'react';
import { WeeklyPlan, Recipe, RecipeCategory, Ingredient, IngredientCategory, CustomShoppingItem } from '../types';
import { calculateShoppingList, formatQuantity } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';

interface PrintableSheetProps {
  weeklyPlan: WeeklyPlan;
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
    <div className="print-only hidden p-8 max-w-4xl mx-auto text-black font-sans">
      {/* Title */}
      <div className="border-b-2 border-black pb-4 mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            {t('printTitle')}
          </h1>
          <p className="text-sm text-gray-700 mt-1">
            {t('generatedOn', {
              date: new Date().toLocaleDateString(locale, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            })}
          </p>
        </div>
        <div className="text-right text-xs text-gray-700">
          <p className="font-bold">{weeklyPlan.numberOfMeals} {t('tabPlannedMeals')}</p>
          <p>{t('defaultPersons', { count: weeklyPlan.defaultServings })}</p>
        </div>
      </div>

      {/* Section 1: Weekly Meals Schedule */}
      <div className="mb-8">
        <h2 className="text-base font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
          {t('printMealScheduleHeader')}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {weeklyPlan.meals.map((meal) => {
            const assigned = (meal.recipeIds || [])
              .map(id => recipeMap.get(id))
              .filter((r): r is Recipe => Boolean(r));

            const displayLabel = translateMealLabel(meal.mealNumber, meal.label);

            return (
              <div key={meal.id} className="border border-gray-300 rounded p-2.5 text-xs">
                <div className="flex justify-between font-bold border-b border-gray-200 pb-1 mb-1.5">
                  <span>{displayLabel}</span>
                  <span className="text-gray-600">{meal.servings} pers.</span>
                </div>
                {assigned.length === 0 ? (
                  <p className="text-gray-400 italic">{t('noRecipeAssignedPrint')}</p>
                ) : (
                  <ul className="space-y-0.5">
                    {assigned.map((r, i) => {
                      const localized = translateRecipe(r);
                      return (
                        <li key={i} className="flex justify-between">
                          <span>• {localized.title}</span>
                          <span className="text-gray-500 font-mono text-[10px]">
                            {r.prepTimeMinutes + r.cookTimeMinutes}m
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

      {/* Section 2: Categorized Shopping List */}
      <div>
        <div className="flex items-center justify-between border-b border-black pb-1 mb-3">
          <h2 className="text-base font-bold uppercase tracking-wider">
            {t('printShoppingHeader')}
          </h2>
          <span className="text-xs text-gray-600 font-medium">
            {t('totalItemsPrint', { count: totalItemsCount })}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {groupedByCategory.map((group) => {
            const catName = translateIngredientCategory(group.category.id, group.category.name);
            return (
              <div key={group.category.id} className="break-inside-avoid">
                <h3 className="text-xs font-black uppercase text-gray-900 border-b border-gray-400 pb-1 mb-2">
                  {catName} ({group.totalCount})
                </h3>
                <ul className="space-y-1.5 text-xs">
                  {group.items.map((item, idx) => {
                    const ingName = translateIngredient(item.ingredientId, item.ingredientName);
                    return (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border border-black rounded-xs shrink-0" />
                        <span className="font-mono font-bold text-gray-900 min-w-16">
                          {formatQuantity(item.totalQuantity)} {translateUnit(item.unit)}
                        </span>
                        <span className="text-gray-800">{ingName}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
