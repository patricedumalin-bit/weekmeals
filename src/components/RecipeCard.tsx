import React from 'react';
import {
  Flame,
  Clock,
  User,
  Globe,
  Star,
  Trash2,
  Copy,
  Eye,
  Edit2,
  Check
} from 'lucide-react';
import { Recipe, RecipeCategory } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { useLanguage } from '../i18n/LanguageContext';
import { inferCookingMode } from '../utils/calculator';

interface RecipeCardProps {
  recipe: Recipe;
  recipeCategories: RecipeCategory[];
  isSelected?: boolean;
  maxReached?: boolean;
  antiWastePct?: number;
  onPreview: (recipe: Recipe) => void;
  onDelete: (recipeId: string) => void;
  onCopy?: (recipe: Recipe) => void;
  onToggle?: (recipeId: string) => void;
  onEdit?: (recipe: Recipe) => void;
  onSave?: (recipe: Recipe) => void;
  isPicker?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = React.memo(({
  recipe,
  recipeCategories,
  isSelected,
  maxReached,
  antiWastePct,
  onPreview,
  onDelete,
  onCopy,
  onToggle,
  onEdit,
  onSave,
  isPicker = false
}) => {
  const { t, translateRecipe, translateRecipeCategory, translateCookingMode } = useLanguage();
  const localized = translateRecipe(recipe);
  const category = recipeCategories.find(c => c.id === recipe.categoryId);
  const catDisplayName = category ? translateRecipeCategory(category.id, category.name) : '';
  const mode = inferCookingMode(recipe);
  const disableAdd = isPicker && !isSelected && maxReached;

  return (
    <div
      className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between backdrop-blur-xl ${
        isSelected
          ? 'border-[var(--primary)]/60 bg-[var(--primary)]/10 dark:bg-[var(--primary)]/30 shadow-md shadow-[var(--primary)]/10'
          : 'border-white/50 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 hover:border-[var(--primary)]/30 shadow-xs'
      } ${recipe.isCustom && !isPicker ? 'border-emerald-500/30 dark:border-emerald-500/20 hover:border-emerald-500' : ''}`}
    >
      <div>
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

            {antiWastePct !== undefined && antiWastePct > 0 && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                antiWastePct === 100
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
              }`}>
                💡 {antiWastePct}% Frigo
              </span>
            )}
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

        <div className="flex items-center gap-1 mt-2 mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSave) {
                  onSave({ ...recipe, rating: star });
                }
              }}
              className="focus:outline-hidden transition-transform active:scale-125 text-left"
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  star <= (recipe.rating || 0)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            </button>
          ))}
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
          {t('ingredientsCountShort', { count: recipe.ingredients.length })} • {t('basePersons', { count: recipe.servings })}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/40 dark:border-white/5">
        {recipe.isCustom && onDelete && (
          <button
            onClick={() => {
              if (confirm(t('confirmDeleteRecipe', { title: localized.title }))) {
                onDelete(recipe.id);
              }
            }}
            className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
            title={t('confirmDeleteRecipe', { title: recipe.title })}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {!recipe.isCustom && onCopy && (
          <button
            type="button"
            onClick={() => onCopy(recipe)}
            className="p-2 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            title={t('copyToPersonal')}
          >
            <Copy className="w-4 h-4" />
          </button>
        )}

        {onEdit && (
          <button
            onClick={() => onEdit(recipe)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[var(--primary)] hover:bg-[var(--accent)]/10"
            title="Edit Recipe"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={() => onPreview(recipe)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{t('preview')}</span>
        </button>

        {isPicker && onToggle && (
          <button
            onClick={() => !disableAdd && onToggle(recipe.id)}
            disabled={disableAdd}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              isSelected
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                : disableAdd
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-50'
                : 'bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t('selected')}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{t('select')}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
});
