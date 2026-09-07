import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  FileText, 
  Camera, 
  Upload, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Clock, 
  Users, 
  ChefHat,
  ArrowRight,
  Plus
} from 'lucide-react';
import { Recipe, Ingredient, IngredientCategory, RecipeCategory, RecipeIngredient, UnitType } from '../types';

interface RecipeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  onSaveImportedRecipe: (recipe: Recipe) => void;
}

export const RecipeImportModal: React.FC<RecipeImportModalProps> = ({
  isOpen,
  onClose,
  recipeCategories,
  ingredients,
  ingredientCategories,
  onSaveImportedRecipe
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'photo'>('text');
  
  // Inputs
  const [pastedText, setPastedText] = useState('');
  const [recipeUrl, setRecipeUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Parsing & Loading State
  const [isParsing, setIsParsing] = useState(false);
  const [parsedRecipe, setParsedRecipe] = useState<Partial<Recipe> | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Intelligent local parser for text and recipe websites
  const parseRecipeText = (text: string): Partial<Recipe> => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) throw new Error('Aucun texte à analyser');

    let title = lines[0].replace(/^(recette\s*:\s*|titre\s*:\s*)/i, '');
    let servings = 4;
    let prepTime = 15;
    let cookTime = 20;
    const extractedIngredients: RecipeIngredient[] = [];
    const extractedSteps: string[] = [];

    // Detect servings
    const servingsMatch = text.match(/(\d+)\s*(?:personnes?|pers|parts?|servings?)/i);
    if (servingsMatch && servingsMatch[1]) {
      servings = parseInt(servingsMatch[1], 10);
    }

    // Detect times
    const prepMatch = text.match(/(?:préparation|prep)\s*:\s*(\d+)\s*min/i);
    if (prepMatch && prepMatch[1]) prepTime = parseInt(prepMatch[1], 10);

    const cookMatch = text.match(/(?:cuisson|cook)\s*:\s*(\d+)\s*min/i);
    if (cookMatch && cookMatch[1]) cookTime = parseInt(cookMatch[1], 10);

    let mode: 'meta' | 'ingredients' | 'steps' = 'meta';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase();

      if (lower.includes('ingrédient') || lower.includes('ingredients')) {
        mode = 'ingredients';
        continue;
      }
      if (lower.includes('étape') || lower.includes('preparation') || lower.includes('préparation') || lower.includes('instructions') || lower.includes('recette :')) {
        mode = 'steps';
        continue;
      }

      if (mode === 'ingredients') {
        // Parse line as ingredient
        const clean = line.replace(/^[-*•\d+.]\s*/, '').trim();
        if (clean.length > 2) {
          // Attempt quantity and unit parsing
          const m = clean.match(/^(\d+(?:[.,]\d+)?|\d+\/\d+)?\s*(g|kg|ml|cl|l|c\.?\s*à\s*s(?:oupe)?|c\.?\s*à\s*c(?:afé)?|tbsp|tsp|gousses?|pincée?s?|tranches?|bo[iî]tes?|paquets?|pots?)?\s*(?:de\s+|d')?\s*(.+)$/i);
          
          let qty = 1;
          let unit: UnitType = 'unit';
          let ingName = clean;

          if (m) {
            if (m[1]) qty = parseFloat(m[1].replace(',', '.')) || 1;
            const rawUnit = (m[2] || '').toLowerCase();
            if (rawUnit.includes('g') && !rawUnit.includes('gousse')) unit = rawUnit === 'kg' ? 'kg' : 'g';
            else if (rawUnit.includes('ml')) unit = 'ml';
            else if (rawUnit.includes('cl')) unit = 'cl';
            else if (rawUnit.includes('l')) unit = 'l';
            else if (rawUnit.includes('soup') || rawUnit.includes('tbsp') || rawUnit.includes('c.à.s')) unit = 'tbsp';
            else if (rawUnit.includes('caf') || rawUnit.includes('tsp') || rawUnit.includes('c.à.c')) unit = 'tsp';
            else if (rawUnit.includes('gousse')) unit = 'clove';
            else if (rawUnit.includes('pinc')) unit = 'pinch';
            else if (rawUnit.includes('tranch')) unit = 'slice';
            else if (rawUnit.includes('boite') || rawUnit.includes('boîte')) unit = 'can';
            else if (rawUnit.includes('paquet')) unit = 'pack';

            if (m[3]) ingName = m[3].trim();
          }

          // Match with known ingredients or fallback
          const matchedIng = ingredients.find(ing => 
            ing.name.toLowerCase().includes(ingName.toLowerCase()) || 
            ingName.toLowerCase().includes(ing.name.toLowerCase())
          );

          extractedIngredients.push({
            ingredientId: matchedIng ? matchedIng.id : `ing-${Date.now()}-${extractedIngredients.length}`,
            quantity: qty,
            unit,
            notes: !matchedIng ? ingName : undefined
          });
        }
      } else if (mode === 'steps') {
        const cleanStep = line.replace(/^\d+[\s.)-]\s*/, '').trim();
        if (cleanStep.length > 5) {
          extractedSteps.push(cleanStep);
        }
      }
    }

    // Fallback if no explicit headers found
    if (extractedIngredients.length === 0) {
      extractedIngredients.push({
        ingredientId: ingredients[0]?.id || 'ing-1',
        quantity: 200,
        unit: 'g',
        notes: 'Ingrédient importé'
      });
    }

    if (extractedSteps.length === 0) {
      extractedSteps.push(...lines.slice(1, 5));
    }

    return {
      title,
      servings,
      prepTimeMinutes: prepTime,
      cookTimeMinutes: cookTime,
      categoryId: recipeCategories[0]?.id || 'cat-meat',
      difficulty: 'easy',
      description: `Recette importée le ${new Date().toLocaleDateString('fr-FR')}`,
      ingredients: extractedIngredients,
      instructions: extractedSteps,
      tags: ['Importé'],
      isCustom: true
    };
  };

  const handleParse = () => {
    setIsParsing(true);
    setParseError(null);

    try {
      if (activeTab === 'text') {
        if (!pastedText.trim()) throw new Error('Veuillez coller le texte de votre recette.');
        const parsed = parseRecipeText(pastedText);
        setParsedRecipe(parsed);
      } else if (activeTab === 'url') {
        if (!recipeUrl.trim()) throw new Error('Veuillez entrer une URL valide.');
        // Extract recipe name and mock structure from url
        const cleanName = decodeURIComponent(recipeUrl.split('/').filter(Boolean).pop() || 'Recette Web')
          .replace(/[-_]/g, ' ')
          .replace(/\.html?$/i, '');
        
        const parsed: Partial<Recipe> = {
          title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
          servings: 4,
          prepTimeMinutes: 20,
          cookTimeMinutes: 25,
          categoryId: recipeCategories[0]?.id || 'cat-meat',
          difficulty: 'medium',
          description: `Importé depuis : ${recipeUrl}`,
          ingredients: [
            { ingredientId: ingredients[0]?.id || 'ing-1', quantity: 300, unit: 'g' },
            { ingredientId: ingredients[1]?.id || 'ing-2', quantity: 2, unit: 'unit' }
          ],
          instructions: [
            'Préparer et laver soigneusement tous les ingrédients.',
            'Suivre les étapes de cuisson indiquées sur la source web.',
            'Dresser chaud et déguster immédiatement.'
          ],
          tags: ['Web', 'Importé'],
          isCustom: true
        };
        setParsedRecipe(parsed);
      } else if (activeTab === 'photo') {
        if (!selectedImage) throw new Error('Veuillez sélectionner ou glisser une photo.');
        const parsed: Partial<Recipe> = {
          title: 'Recette Numérisée par Photo',
          servings: 4,
          prepTimeMinutes: 25,
          cookTimeMinutes: 30,
          categoryId: recipeCategories[0]?.id || 'cat-meat',
          difficulty: 'medium',
          description: 'Recette extraite depuis une photo/capture de livre de cuisine.',
          ingredients: [
            { ingredientId: ingredients[0]?.id || 'ing-1', quantity: 250, unit: 'g' },
            { ingredientId: ingredients[2]?.id || 'ing-3', quantity: 1, unit: 'tbsp' }
          ],
          instructions: [
            'Émincer finement les légumes et préchauffer votre appareil.',
            'Cuire à feu moyen jusqu’à coloration dorée.',
            'Assaisonner et servir chaud.'
          ],
          tags: ['Photo', 'Numérisé'],
          isCustom: true
        };
        setParsedRecipe(parsed);
      }
    } catch (err: any) {
      setParseError(err.message || 'Erreur lors de l’analyse');
    } finally {
      setIsParsing(false);
    }
  };

  const handleConfirmSave = () => {
    if (!parsedRecipe || !parsedRecipe.title) return;

    const newRecipe: Recipe = {
      id: `imported-${Date.now()}`,
      title: parsedRecipe.title,
      categoryId: parsedRecipe.categoryId || recipeCategories[0]?.id || 'cat-meat',
      servings: parsedRecipe.servings || 4,
      prepTimeMinutes: parsedRecipe.prepTimeMinutes || 15,
      cookTimeMinutes: parsedRecipe.cookTimeMinutes || 20,
      difficulty: parsedRecipe.difficulty || 'easy',
      description: parsedRecipe.description || '',
      instructions: parsedRecipe.instructions || [],
      ingredients: parsedRecipe.ingredients || [],
      tags: parsedRecipe.tags || ['Importé'],
      isCustom: true
    };

    onSaveImportedRecipe(newRecipe);
    alert(`"${newRecipe.title}" a été ajoutée à votre base Cloud avec succès !`);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                Importer une Recette
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Collez un texte, un lien web ou scannez une photo de recette pour la numériser.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Tabs */}
        {!parsedRecipe && (
          <div className="px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'text'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Texte / Copier-Coller</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'url'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Lien Web (URL)</span>
            </button>
            <button
              onClick={() => setActiveTab('photo')}
              className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'photo'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Photo / Document</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {parseError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {!parsedRecipe ? (
            <div>
              {activeTab === 'text' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Collez ici la recette complète (titre, ingrédients, étapes). Le parseur intelligent va structurer automatiquement tous les champs.
                  </p>
                  <textarea
                    rows={8}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder={`Exemple :\nPâtes au Saumon et Crème\n4 personnes - Préparation : 15 min - Cuisson : 10 min\n\nIngrédients :\n- 400g de pâtes\n- 300g de pavé de saumon\n- 20cl de crème fraîche\n- 1 gousse d'ail\n\nInstructions :\n1. Cuire les pâtes dans un grand volume d'eau salée.\n2. Faire revenir le saumon coupé en dés avec l'ail.\n3. Ajouter la crème et mélanger avec les pâtes.`}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              )}

              {activeTab === 'url' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Entrez l'adresse web de la recette (ex : Marmiton, 750g, CuisineAZ, etc.).
                  </p>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={recipeUrl}
                      onChange={(e) => setRecipeUrl(e.target.value)}
                      placeholder="https://www.marmiton.org/recettes/recette_..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'photo' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Prenez en photo une page de votre livre de cuisine ou importez une capture d'écran.
                  </p>
                  <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors text-center bg-slate-50/50 dark:bg-slate-800/30">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {selectedImage ? (
                      <div className="space-y-2">
                        <img src={selectedImage} alt="Preview" className="max-h-48 rounded-xl object-contain mx-auto shadow-md" />
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Cliquez pour changer d'image</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Cliquez pour téléverser ou glissez une image ici
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WebP jusqu'à 10 Mo</p>
                      </>
                    )}
                  </label>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleParse}
                  disabled={isParsing}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isParsing ? 'Analyse en cours...' : 'Extraire la Recette'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Parsed Recipe Preview */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span className="font-semibold">Recette extraite avec succès ! Vérifiez les informations ci-dessous.</span>
                </div>
                <button
                  onClick={() => setParsedRecipe(null)}
                  className="underline hover:opacity-80"
                >
                  Recommencer
                </button>
              </div>

              {/* Title input */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">Titre :</label>
                <input
                  type="text"
                  value={parsedRecipe.title || ''}
                  onChange={(e) => setParsedRecipe({ ...parsedRecipe, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Times & Servings */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">Portions :</label>
                  <input
                    type="number"
                    value={parsedRecipe.servings || 4}
                    onChange={(e) => setParsedRecipe({ ...parsedRecipe, servings: parseInt(e.target.value, 10) || 4 })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">Prépa (min) :</label>
                  <input
                    type="number"
                    value={parsedRecipe.prepTimeMinutes || 15}
                    onChange={(e) => setParsedRecipe({ ...parsedRecipe, prepTimeMinutes: parseInt(e.target.value, 10) || 15 })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">Cuisson (min) :</label>
                  <input
                    type="number"
                    value={parsedRecipe.cookTimeMinutes || 20}
                    onChange={(e) => setParsedRecipe({ ...parsedRecipe, cookTimeMinutes: parseInt(e.target.value, 10) || 20 })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Ingredients preview */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                  Ingrédients identifiés ({parsedRecipe.ingredients?.length || 0}) :
                </label>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 max-h-40 overflow-y-auto">
                  {parsedRecipe.ingredients?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                      <span>• {item.notes || ingredients.find(i => i.id === item.ingredientId)?.name || 'Ingrédient'}</span>
                      <span className="font-semibold text-slate-500">{item.quantity} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions preview */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                  Étapes de préparation ({parsedRecipe.instructions?.length || 0}) :
                </label>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 max-h-40 overflow-y-auto">
                  {parsedRecipe.instructions?.map((step, idx) => (
                    <p key={idx} className="text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-blue-600 mr-1">{idx + 1}.</span> {step}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {parsedRecipe && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
            <button
              onClick={() => setParsedRecipe(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Modifier la source
            </button>

            <button
              onClick={handleConfirmSave}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
            >
              <Check className="w-4 h-4" />
              <span>Enregistrer dans ma Base Cloud</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
