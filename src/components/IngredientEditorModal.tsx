import React, { useState } from 'react';
import {
  X,
  Save,
  Trash2,
  Euro,
  Flame,
  Info,
  Tag,
  Barcode,
  Clock,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { Ingredient, IngredientCategory, UnitType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface IngredientEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredient: Ingredient | null;
  categories: IngredientCategory[];
  onSave: (ing: Ingredient) => void;
  onDelete?: (id: string) => void;
}

const UNIT_OPTIONS: UnitType[] = [
  'unit', 'g', 'kg', 'ml', 'cl', 'l', 'tbsp', 'tsp', 'clove', 'pinch', 'can', 'pack', 'bunch', 'slice'
];

export const IngredientEditorModal: React.FC<IngredientEditorModalProps> = ({
  isOpen,
  onClose,
  ingredient,
  categories,
  onSave,
  onDelete
}) => {
  const { t, translateUnit, translateIngredientCategory } = useLanguage();

  const [formData, setFormData] = useState<Ingredient>(() => ingredient || {
    id: `ing-${Date.now()}`,
    name: '',
    categoryId: categories[0]?.id || 'cat-produce',
    defaultUnit: 'unit',
    pricePer100g: 0,
    caloriesPer100g: 0,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatPer100g: 0,
    brand: '',
    shelfLifeDays: 14,
    barcode: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof Ingredient, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {ingredient ? "Fiche Produit Détaillée" : "Nouvel Ingrédient"}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">
                Informations Nutritionnelles & Prix
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Nom de l'ingrédient *</label>
              <div className="relative">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Ex: Saumon Frais, Riz Basmati..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Catégorie</label>
              <select
                value={formData.categoryId}
                onChange={e => handleChange('categoryId', e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{translateIngredientCategory(cat.id, cat.name)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Unité par défaut</label>
              <select
                value={formData.defaultUnit}
                onChange={e => handleChange('defaultUnit', e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
              >
                {UNIT_OPTIONS.map(u => (
                  <option key={u} value={u}>{translateUnit(u)}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Prix estimé (€/100g)</label>
              <div className="relative">
                <Euro className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricePer100g || ''}
                  onChange={e => handleChange('pricePer100g', parseFloat(e.target.value))}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Code-Barres (EAN)</label>
              <div className="relative">
                <Barcode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.barcode || ''}
                  onChange={e => handleChange('barcode', e.target.value)}
                  placeholder="301762..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Nutrition Section */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">Données Nutritionnelles (pour 100g)</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Calories (kcal)</label>
                <input
                  type="number"
                  value={formData.caloriesPer100g || ''}
                  onChange={e => handleChange('caloriesPer100g', parseInt(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Protéines (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.proteinPer100g || ''}
                  onChange={e => handleChange('proteinPer100g', parseFloat(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Glucides (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.carbsPer100g || ''}
                  onChange={e => handleChange('carbsPer100g', parseFloat(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Lipides (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fatPer100g || ''}
                  onChange={e => handleChange('fatPer100g', parseFloat(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Marque / Origine</label>
              <input
                type="text"
                value={formData.brand || ''}
                onChange={e => handleChange('brand', e.target.value)}
                placeholder="Ex: Danone, Local, Bio..."
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Conservation (jours)</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={formData.shelfLifeDays || ''}
                  onChange={e => handleChange('shelfLifeDays', parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Notes / Observations</label>
            <textarea
              rows={2}
              value={formData.notes || ''}
              onChange={e => handleChange('notes', e.target.value)}
              placeholder="Notes personnelles sur ce produit..."
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm"
            />
          </div>

        </form>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          {ingredient && onDelete ? (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Supprimer cet ingrédient de la base ?")) {
                  onDelete(ingredient.id);
                  onClose();
                }
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Supprimer</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer le Produit</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
