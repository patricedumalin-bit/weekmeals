import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Ingredient, IngredientCategory } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface IngredientListItemProps {
  ingredient: Ingredient;
  category?: IngredientCategory;
  onEdit: (ing: Ingredient) => void;
  onDelete: (ing: Ingredient) => void;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = React.memo(({
  ingredient,
  category,
  onEdit,
  onDelete
}) => {
  const { t, translateIngredient, translateIngredientCategory, translateUnit } = useLanguage();
  const localizedName = translateIngredient(ingredient.id, ingredient.name);

  return (
    <div
      className="p-3 sm:px-4 flex items-center justify-between hover:bg-[var(--cell-bg-hover)]/50 transition-colors duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-2xs" />
        <div>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {localizedName}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            {category && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {translateIngredientCategory(category.id, category.name)}
              </span>
            )}
            <span className="text-[10px] px-1.5 py-0.2 rounded backdrop-blur-md bg-[var(--cell-bg-hover)] text-slate-600 dark:text-slate-400 border border-[var(--border-color)] font-mono">
              {t('defaultUnitLabel', { unit: translateUnit(ingredient.defaultUnit) })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onEdit(ingredient)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--primary)] hover:bg-[var(--accent)]/10"
          title="Edit Ingredient"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(ingredient)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10"
          title="Delete Ingredient"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});
