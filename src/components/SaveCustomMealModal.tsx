import React, { useState } from 'react';
import { CookingModeType, CustomMealIngredient, RecipeCategory } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface SaveCustomMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, categoryId: string, cookingMode: CookingModeType) => void;
  recipeCategories: RecipeCategory[];
  defaultName: string;
}

export const SaveCustomMealModal: React.FC<SaveCustomMealModalProps> = ({
  isOpen,
  onClose,
  onSave,
  recipeCategories,
  defaultName
}) => {
  const { t, translateRecipeCategory } = useLanguage();
  const [name, setName] = useState(defaultName);
  const [categoryId, setCategoryId] = useState(recipeCategories[0]?.id || '');
  const [cookingMode, setCookingMode] = useState<CookingModeType>('sans-cuisson');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Enregistrer comme recette</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nom</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Catégorie</label>
            <select 
              value={categoryId} 
              onChange={e => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              {recipeCategories.map(c => (
                <option key={c.id} value={c.id}>{translateRecipeCategory(c.id, c.name)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mode de cuisson</label>
            <select 
              value={cookingMode} 
              onChange={e => setCookingMode(e.target.value as CookingModeType)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            >
              <option value="four">Four</option>
              <option value="poele">Poêle</option>
              <option value="cookeo">Cookeo</option>
              <option value="robot">Robot</option>
              <option value="cocotte">Cocotte</option>
              <option value="vapeur">Vapeur</option>
              <option value="grill">Grill</option>
              <option value="sans-cuisson">Sans cuisson</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200">Annuler</button>
          <button onClick={() => onSave(name, categoryId, cookingMode)} className="flex-1 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700">Enregistrer</button>
        </div>
      </div>
    </div>
  );
};
