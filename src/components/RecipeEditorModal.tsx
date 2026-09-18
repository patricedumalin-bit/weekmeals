import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  ChefHat, 
  Clock, 
  Users, 
  Layers,
  AlertCircle
} from 'lucide-react';
import { 
  Recipe, 
  RecipeCategory, 
  Ingredient, 
  IngredientCategory, 
  RecipeIngredient, 
  UnitType 
} from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface RecipeEditorModalProps {
  isOpen: boolean;
  recipeToEdit: Recipe | null;
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
  onQuickAddIngredient?: (name: string, categoryId: string, defaultUnit: UnitType) => Ingredient;
}

const UNIT_OPTIONS: UnitType[] = [
  'g', 'kg', 'ml', 'cl', 'l', 'tbsp', 'tsp', 'unit', 'clove', 'pinch', 'can', 'pack', 'bunch', 'slice'
];

export const RecipeEditorModal: React.FC<RecipeEditorModalProps> = ({
  isOpen,
  recipeToEdit,
  recipeCategories,
  ingredients,
  ingredientCategories,
  onClose,
  onSave,
  onQuickAddIngredient
}) => {
  const { t, translateUnit, translateRecipeCategory, translateDifficulty, translateIngredient } = useLanguage();
  if (!isOpen) return null;

  const [title, setTitle] = useState(recipeToEdit?.title || '');
  const [categoryId, setCategoryId] = useState(
    recipeToEdit?.categoryId || recipeCategories[0]?.id || 'rcat-main'
  );
  const [servings, setServings] = useState(recipeToEdit?.servings || 4);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(recipeToEdit?.prepTimeMinutes || 15);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(recipeToEdit?.cookTimeMinutes || 20);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    recipeToEdit?.difficulty || 'easy'
  );
  const [description, setDescription] = useState(recipeToEdit?.description || '');
  const [tagsInput, setTagsInput] = useState(recipeToEdit?.tags.join(', ') || '');
  
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>(
    recipeToEdit?.ingredients && recipeToEdit.ingredients.length > 0
      ? [...recipeToEdit.ingredients]
      : [{ ingredientId: ingredients[0]?.id || '', quantity: 1, unit: 'unit' }]
  );

  const [instructions, setInstructions] = useState<string[]>(
    recipeToEdit?.instructions && recipeToEdit.instructions.length > 0
      ? [...recipeToEdit.instructions]
      : ['']
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Ingredient Row Operations
  const handleAddIngredientRow = () => {
    const firstIng = ingredients[0];
    setRecipeIngredients([
      ...recipeIngredients,
      {
        ingredientId: firstIng?.id || '',
        quantity: 100,
        unit: firstIng?.defaultUnit || 'g'
      }
    ]);
  };

  const handleUpdateIngredientRow = (
    index: number,
    field: keyof RecipeIngredient,
    value: any
  ) => {
    const updated = [...recipeIngredients];
    if (field === 'ingredientId') {
      const selectedIng = ingredients.find(i => i.id === value);
      updated[index] = {
        ...updated[index],
        ingredientId: value,
        unit: selectedIng?.defaultUnit || updated[index].unit
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value
      };
    }
    setRecipeIngredients(updated);
  };

  const handleRemoveIngredientRow = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  // Instruction Step Operations
  const handleAddInstructionStep = () => {
    setInstructions([...instructions, '']);
  };

  const handleUpdateInstructionStep = (index: number, text: string) => {
    const updated = [...instructions];
    updated[index] = text;
    setInstructions(updated);
  };

  const handleRemoveInstructionStep = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage(t('errorTitleRequired'));
      return;
    }

    const validIngredients = recipeIngredients.filter(
      i => i.ingredientId && i.quantity > 0
    );
    if (validIngredients.length === 0) {
      setErrorMessage(t('errorIngredientsRequired'));
      return;
    }

    const validInstructions = instructions.filter(s => s.trim().length > 0);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newRecipe: Recipe = {
      id: recipeToEdit?.id || `rec-custom-${Date.now()}`,
      title: title.trim(),
      categoryId,
      servings: Number(servings) || 4,
      prepTimeMinutes: Number(prepTimeMinutes) || 10,
      cookTimeMinutes: Number(cookTimeMinutes) || 15,
      difficulty,
      description: description.trim() || 'A delicious homemade recipe.',
      instructions: validInstructions.length > 0 ? validInstructions : ['Prepare and serve warm.'],
      ingredients: validIngredients,
      tags,
      rating: recipeToEdit?.rating || 1,
      isCustom: true
    };

    onSave(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/40 dark:border-white/5 flex items-center justify-between gap-3 bg-white/40 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl backdrop-blur-md bg-[var(--primary)]/15 text-[var(--primary)] dark:text-[var(--primary)] border border-[var(--primary)]/20 flex items-center justify-center shadow-2xs">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {recipeToEdit ? t('editRecipeTitle') : t('createRecipeTitle')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('recipeEditorSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {errorMessage && (
            <div className="p-3 rounded-xl backdrop-blur-md bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('recipeTitleLabel')}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder={t('recipeTitlePlaceholder')}
                className="w-full px-3.5 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('recipeCategoryLabel')}
                </label>
                <select
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                >
                  {recipeCategories.map(c => (
                    <option key={c.id} value={c.id}>
                      {translateRecipeCategory(c.id, c.name)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('baseServingsLabel')}
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={servings}
                    onChange={e => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('prepMinsLabel')}
                </label>
                <input
                  type="number"
                  min={0}
                  value={prepTimeMinutes}
                  onChange={e => setPrepTimeMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('cookMinsLabel')}
                </label>
                <input
                  type="number"
                  min={0}
                  value={cookTimeMinutes}
                  onChange={e => setCookTimeMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('difficultyLabel')}
                </label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 capitalize"
                >
                  <option value="easy">{translateDifficulty('easy')}</option>
                  <option value="medium">{translateDifficulty('medium')}</option>
                  <option value="hard">{translateDifficulty('hard')}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('shortDescLabel')}
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={t('shortDescEditorPlaceholder')}
                className="w-full px-3.5 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('tagsCommaSeparated')}
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder={t('tagsPlaceholder')}
                className="w-full px-3.5 py-2 text-sm rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="pt-4 border-t border-white/40 dark:border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[var(--primary)]" />
                  {t('recipeIngredientsHeader', { count: recipeIngredients.length })}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('recipeIngredientsSub', { servings })}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddIngredientRow}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md bg-[var(--primary)]/10 text-[var(--primary)] dark:text-[var(--primary)] hover:bg-[var(--primary)]/20 border border-[var(--primary)]/20"
              >
                <Plus className="w-3.5 h-3.5" />
                {t('addIngredientBtn')}
              </button>
            </div>

            <div className="space-y-2">
              {recipeIngredients.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/50 border border-white/50 dark:border-white/10"
                >
                  {/* Select Ingredient from DB */}
                  <select
                    value={item.ingredientId}
                    onChange={e => handleUpdateIngredientRow(idx, 'ingredientId', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-lg backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                  >
                    {ingredients.map(ing => (
                      <option key={ing.id} value={ing.id}>
                        {translateIngredient(ing.id, ing.name)}
                      </option>
                    ))}
                  </select>

                  {/* Quantity input */}
                  <input
                    type="number"
                    min={0.1}
                    step="any"
                    value={item.quantity}
                    onChange={e => handleUpdateIngredientRow(idx, 'quantity', parseFloat(e.target.value) || 0)}
                    placeholder="Qty"
                    className="w-20 px-2.5 py-1.5 text-xs rounded-lg backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100 font-mono"
                  />

                  {/* Unit select */}
                  <select
                    value={item.unit}
                    onChange={e => handleUpdateIngredientRow(idx, 'unit', e.target.value as UnitType)}
                    className="w-20 px-2 py-1.5 text-xs rounded-lg backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                  >
                    {UNIT_OPTIONS.map(u => (
                      <option key={u} value={u}>
                        {translateUnit(u)} ({u})
                      </option>
                    ))}
                  </select>

                  {/* Delete row */}
                  <button
                    type="button"
                    disabled={recipeIngredients.length <= 1}
                    onClick={() => handleRemoveIngredientRow(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Steps */}
          <div className="pt-4 border-t border-white/40 dark:border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-[var(--primary)]" />
                  {t('cookingInstructionsHeader')}
                </h3>
                <p className="text-xs text-slate-500">{t('cookingInstructionsSub')}</p>
              </div>
              <button
                type="button"
                onClick={handleAddInstructionStep}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md bg-[var(--primary)]/10 text-[var(--primary)] dark:text-[var(--primary)] hover:bg-[var(--primary)]/20 border border-[var(--primary)]/20"
              >
                <Plus className="w-3.5 h-3.5" />
                {t('addStepBtn')}
              </button>
            </div>

            <div className="space-y-2">
              {instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={step}
                    onChange={e => handleUpdateInstructionStep(idx, e.target.value)}
                    placeholder={t('stepPlaceholder', { step: idx + 1 })}
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 text-slate-900 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    disabled={instructions.length <= 1}
                    onClick={() => handleRemoveInstructionStep(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 disabled:opacity-30 mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-white/40 dark:border-white/5 bg-white/40 dark:bg-slate-900/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] hover:from-[var(--accent)] hover:to-[var(--accent)] text-white shadow-md shadow-[var(--primary)]/20 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            {t('saveRecipeBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};
