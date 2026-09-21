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
import { normalizeExternalIngredient } from '../utils/datasetCorrelator';

import { useLanguage } from '../i18n/LanguageContext';
import { useAppStore } from '../stores/useAppStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useSubscription } from '../hooks/useSubscription';
import { FREE_LIMITS } from '../constants/subscription';

interface RecipeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  recipes: Recipe[];
  onSaveImportedRecipe: (recipe: Recipe) => void;
  onSaveNewIngredient?: (ingredient: Ingredient) => void;
}

import { parseRecipeWithAI, parseRecipeImageWithAI, AIProvider } from '../lib/aiService';

export const RecipeImportModal: React.FC<RecipeImportModalProps> = ({
  isOpen,
  onClose,
  recipeCategories,
  ingredients,
  ingredientCategories,
  recipes,
  onSaveImportedRecipe,
  onSaveNewIngredient
}) => {
  const { language } = useLanguage();
  const { systemConfig } = useAppStore();
  const { incrementAIUsage } = useAuthStore();
  const { aiLimit } = useSubscription();

  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'photo' | 'themealdb'>('text');
  const [aiProvider, setAIProvider] = useState<AIProvider>('groq');

  // Inputs
  const [pastedText, setPastedText] = useState('');
  const [recipeUrl, setRecipeUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mealDbQuery, setMealDbQuery] = useState('');
  const [mealDbResults, setMealDbResults] = useState<any[]>([]);
  const [isSearchingMealDb, setIsSearchingMealDb] = useState(false);

  // Parsing & Loading State
  const [isParsing, setIsParsing] = useState(false);
  const [parsedRecipe, setParsedRecipe] = useState<Partial<Recipe> | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleParse = async () => {
    if (aiLimit.reached) {
      if (isPremium) {
        setParseError("Activité inhabituelle détectée. Par mesure de sécurité, vos imports IA sont temporairement suspendus.");
      } else {
        setParseError(`Limite de scans IA atteinte (${FREE_LIMITS.AI_SCANS_PER_MONTH}/mois). Passez en version Full pour une utilisation illimitée !`);
      }
      return;
    }

    setIsParsing(true);
    setParseError(null);

    const groqKey = localStorage.getItem('groq_api_key') || '';
    const geminiKey = localStorage.getItem('gemini_api_key') || '';
    const activeKey = aiProvider === 'groq' ? groqKey : geminiKey;

    if (!activeKey) {
      alert(`Veuillez renseigner votre Clé d'API ${aiProvider === 'groq' ? 'Groq' : 'Gemini'} dans votre Profil.`);
      return;
    }

    try {
      let aiResult;
      if (activeTab === 'text' || activeTab === 'url') {
        let contentToParse = activeTab === 'text' ? pastedText : recipeUrl;

        if (activeTab === 'url') {
          try {
            const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(recipeUrl)}`);
            const proxyData = await proxyRes.json();
            const parser = new DOMParser();
            const doc = parser.parseFromString(proxyData.contents, 'text/html');
            contentToParse = `URL: ${recipeUrl}\n\nContenu: ${doc.body.innerText.slice(0, 10000)}`;
          } catch (e) {
            console.warn("Proxy failed, sending URL directly to AI");
          }
        }

        const model = aiProvider === 'gemini' ? systemConfig.geminiModel : systemConfig.groqModel;
        aiResult = await parseRecipeWithAI(contentToParse, { provider: aiProvider, apiKey: activeKey, model });
        incrementAIUsage();
      } else if (activeTab === 'photo') {
        if (!selectedImage) throw new Error('Veuillez sélectionner une photo.');
        const model = aiProvider === 'gemini' ? systemConfig.geminiModel : systemConfig.groqModel;
        aiResult = await parseRecipeImageWithAI(selectedImage, { provider: aiProvider, apiKey: activeKey, model });
        incrementAIUsage();
      }

      if (aiResult) {
        const mappedIngredients = aiResult.ingredients.map((i: any) => {
          const norm = normalizeExternalIngredient(i.name);
          const matchedExisting = ingredients.find(ex =>
            ex.id === norm.ingredientId || ex.name.toLowerCase().trim() === i.name.toLowerCase().trim()
          );

          const finalId = matchedExisting ? matchedExisting.id : norm.ingredientId;

          if (!matchedExisting && onSaveNewIngredient) {
            onSaveNewIngredient({
              id: finalId,
              name: i.name,
              categoryId: 'cat-produce',
              defaultUnit: i.unit as UnitType,
              notes: 'Importé par IA',
              localizations: i.localizations
            });
          }

          return {
            ingredientId: finalId,
            quantity: i.quantity,
            unit: i.unit as UnitType,
            notes: i.name
          };
        });

        setParsedRecipe({
          title: aiResult.title,
          servings: aiResult.servings,
          prepTimeMinutes: aiResult.prepTimeMinutes,
          cookTimeMinutes: aiResult.cookTimeMinutes,
          categoryId: recipeCategories.find(c => c.id === 'rcat-autre')?.id || recipeCategories[0]?.id,
          difficulty: aiResult.difficulty as any,
          description: aiResult.description,
          ingredients: mappedIngredients,
          instructions: aiResult.instructions,
          tags: ['AI-Import'],
          rating: 1,
          isCustom: true,
          localizations: aiResult.localizations
        });
      }
    } catch (err: any) {
      setParseError(err.message || "Une erreur est survenue lors de l'analyse.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleConfirmSave = () => {
    if (!parsedRecipe || !parsedRecipe.title) return;

    // Check for duplicates by name
    const existingRecipe = recipes.find(r =>
      r.title.toLowerCase().trim() === parsedRecipe.title?.toLowerCase().trim()
    );

    if (existingRecipe) {
      const confirmMsg = language === 'fr'
        ? `Une recette nommée "${existingRecipe.title}" existe déjà. Voulez-vous quand même l'importer ?`
        : `A recipe named "${existingRecipe.title}" already exists. Do you still want to import it?`;

      if (!window.confirm(confirmMsg)) {
        return;
      }
    }

    const newRecipe: Recipe = {
      id: `imported-${Date.now()}`,
      title: parsedRecipe.title,
      categoryId: parsedRecipe.categoryId || recipeCategories.find(c => c.id === 'rcat-autre')?.id || recipeCategories[0]?.id || 'rcat-autre',
      servings: parsedRecipe.servings || 4,
      prepTimeMinutes: parsedRecipe.prepTimeMinutes || 15,
      cookTimeMinutes: parsedRecipe.cookTimeMinutes || 20,
      difficulty: parsedRecipe.difficulty || 'easy',
      description: parsedRecipe.description || '',
      instructions: parsedRecipe.instructions || [],
      ingredients: parsedRecipe.ingredients || [],
      tags: parsedRecipe.tags || ['Importé'],
      rating: parsedRecipe.rating || 1,
      isCustom: true,
      localizations: parsedRecipe.localizations
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

  const searchMealDb = async (query: string) => {
    if (!query.trim()) return;
    setIsSearchingMealDb(true);
    setParseError(null);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      const data = await res.json();
      setMealDbResults(data.meals || []);
      if (!data.meals) {
        setParseError("Aucune recette trouvée sur TheMealDB pour cette recherche.");
      }
    } catch (err: any) {
      setParseError("Erreur réseau lors de la recherche sur TheMealDB.");
    } finally {
      setIsSearchingMealDb(false);
    }
  };

  const fetchRandomMealDb = async () => {
    setIsSearchingMealDb(true);
    setParseError(null);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
      const data = await res.json();
      if (data.meals && data.meals[0]) {
        handleSelectMealDbRecipe(data.meals[0]);
      } else {
        setParseError("Impossible de récupérer une recette aléatoire.");
      }
    } catch (err: any) {
      setParseError("Erreur réseau lors de la récupération de la recette aléatoire.");
    } finally {
      setIsSearchingMealDb(false);
    }
  };

  const handleSelectMealDbRecipe = (meal: any) => {
    try {
      const title = meal.strMeal;

      const instructions: string[] = meal.strInstructions
        ? meal.strInstructions
            .split(/\r?\n/)
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0 && !s.match(/^\d+\.?$/))
        : [];

      const extractedIngredients: RecipeIngredient[] = [];

      for (let i = 1; i <= 20; i++) {
        const ingName = meal[`strIngredient${i}`]?.trim();
        const measure = meal[`strMeasure${i}`]?.trim();

        if (ingName) {
          let qty = 1;
          let unit: UnitType = 'unit';

          if (measure) {
            const qtyMatch = measure.match(/^(\d+(?:[.,]\d+)?|\d+\/\d+)?\s*(.*)$/);
            if (qtyMatch) {
              if (qtyMatch[1]) {
                if (qtyMatch[1].includes('/')) {
                  const [num, den] = qtyMatch[1].split('/');
                  qty = parseFloat(num) / parseFloat(den);
                } else {
                  qty = parseFloat(qtyMatch[1].replace(',', '.'));
                }
              }
              const rawUnit = qtyMatch[2].toLowerCase();
              if (rawUnit.includes('g') && !rawUnit.includes('gousse') && !rawUnit.includes('clove')) unit = rawUnit.includes('kg') ? 'kg' : 'g';
              else if (rawUnit.includes('ml')) unit = 'ml';
              else if (rawUnit.includes('cl')) unit = 'cl';
              else if (rawUnit.includes('l') && rawUnit.length === 1) unit = 'l';
              else if (rawUnit.includes('tbsp') || rawUnit.includes('tablespoon') || rawUnit.includes('soup')) unit = 'tbsp';
              else if (rawUnit.includes('tsp') || rawUnit.includes('teaspoon') || rawUnit.includes('caf')) unit = 'tsp';
              else if (rawUnit.includes('clove') || rawUnit.includes('gousse')) unit = 'clove';
              else if (rawUnit.includes('pinch') || rawUnit.includes('pinc')) unit = 'pinch';
              else if (rawUnit.includes('slice') || rawUnit.includes('tranch')) unit = 'slice';
              else if (rawUnit.includes('can') || rawUnit.includes('boite') || rawUnit.includes('boîte')) unit = 'can';
              else if (rawUnit.includes('pack') || rawUnit.includes('paquet')) unit = 'pack';
            }
          }

          const { ingredientId } = normalizeExternalIngredient(ingName);

          extractedIngredients.push({
            ingredientId,
            quantity: qty || 1,
            unit,
            notes: (ingredientId.startsWith('imported-') || ingredientId.includes('ing-')) && !ingredients.find(i => i.id === ingredientId)
              ? `${ingName} (${measure || ''})`
              : (measure ? `(${measure})` : undefined)
          });
        }
      }

      let categoryId = recipeCategories.find(c => c.id === 'rcat-autre')?.id || recipeCategories[0]?.id || 'rcat-autre';
      if (meal.strCategory) {
        const catLower = meal.strCategory.toLowerCase();
        const matchedCat = recipeCategories.find(c => c.name.toLowerCase().includes(catLower) || catLower.includes(c.name.toLowerCase()));
        if (matchedCat) categoryId = matchedCat.id;
      }

      setParsedRecipe({
        title,
        servings: 4,
        prepTimeMinutes: 15,
        cookTimeMinutes: 25,
        categoryId,
        difficulty: 'medium',
        description: `Importé de TheMealDB. Catégorie : ${meal.strCategory || 'Inconnue'}. Région : ${meal.strArea || 'Inconnue'}`,
        ingredients: extractedIngredients.length > 0 ? extractedIngredients : [
          { ingredientId: ingredients[0]?.id || 'ing-1', quantity: 1, unit: 'unit', notes: 'Vérifier la recette' }
        ],
        instructions: instructions.length > 0 ? instructions : ['Suivre les étapes d\'instructions de TheMealDB.'],
        tags: ['TheMealDB', meal.strCategory, meal.strArea].filter(Boolean),
        rating: 1,
        isCustom: true
      });
    } catch (err: any) {
      setParseError("Erreur lors de la conversion de la recette de TheMealDB");
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
          <div className="px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('text')}
                className={`px-3 py-2 rounded-t-xl text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'text'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Texte</span>
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`px-3 py-2 rounded-t-xl text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'url'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Lien Web</span>
              </button>
              <button
                onClick={() => setActiveTab('photo')}
                className={`px-3 py-2 rounded-t-xl text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'photo'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Photo</span>
              </button>
              <button
                onClick={() => setActiveTab('themealdb')}
                className={`px-3 py-2 rounded-t-xl text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'themealdb'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>TheMealDB</span>
              </button>
            </div>

            {/* Provider Selector */}
            {activeTab !== 'themealdb' && (
              <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-2 sm:mb-0">
                <button
                  onClick={() => setAIProvider('groq')}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${aiProvider === 'groq' ? 'bg-white dark:bg-slate-700 shadow-xs text-blue-600' : 'text-slate-500'}`}
                >
                  Groq
                </button>
                <button
                  onClick={() => setAIProvider('gemini')}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${aiProvider === 'gemini' ? 'bg-white dark:bg-slate-700 shadow-xs text-blue-600' : 'text-slate-500'}`}
                >
                  Gemini
                </button>
              </div>
            )}
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
              {isParsing ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-center p-6 my-4">
                  <div className="relative flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-blue-600" />
                    <Sparkles className="w-4 h-4 text-blue-500 absolute animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Analyse de la recette en cours...</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      L'intelligence artificielle extrait et structure automatiquement les ingrédients, les quantités et les étapes de préparation. Veuillez patienter quelques secondes.
                    </p>
                  </div>
                </div>
              ) : (
                <>
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

                  {activeTab === 'themealdb' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Recherchez parmi des milliers de recettes du dataset ouvert de TheMealDB (en anglais, ex: "chicken", "salmon", "cake"), ou découvrez une recette au hasard.
                      </p>

                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Sparkles className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={mealDbQuery}
                            onChange={(e) => setMealDbQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchMealDb(mealDbQuery)}
                            placeholder="Ex: Chicken, Beef, Lasagne, Chocolate..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => searchMealDb(mealDbQuery)}
                          disabled={isSearchingMealDb}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                        >
                          {isSearchingMealDb ? 'Recherche...' : 'Chercher'}
                        </button>

                        <button
                          type="button"
                          onClick={fetchRandomMealDb}
                          disabled={isSearchingMealDb}
                          title="Recette aléatoire"
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-bold flex items-center gap-1.5"
                        >
                          <span>🎲 Aléatoire</span>
                        </button>
                      </div>

                      {mealDbResults.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                            Résultats de recherche ({mealDbResults.length}) :
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                            {mealDbResults.map((meal) => (
                              <button
                                key={meal.idMeal}
                                type="button"
                                onClick={() => handleSelectMealDbRecipe(meal)}
                                className="p-3 text-left bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all flex items-center gap-3 group"
                              >
                                {meal.strMealThumb && (
                                  <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                                  />
                                )}
                                <div className="overflow-hidden">
                                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    {meal.strMeal}
                                  </h4>
                                  <p className="text-[10px] text-slate-400 truncate">
                                    {meal.strCategory} • {meal.strArea}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab !== 'themealdb' && (
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
                  )}
                </>
              )}
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
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          {parsedRecipe ? (
            <>
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
            </>
          ) : (
            <>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                Choisissez une source ci-dessus
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all shadow-lg"
              >
                Fermer
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
