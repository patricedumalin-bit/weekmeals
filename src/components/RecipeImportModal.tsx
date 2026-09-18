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

interface RecipeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeCategories: RecipeCategory[];
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  onSaveImportedRecipe: (recipe: Recipe) => void;
  onSaveNewIngredient?: (ingredient: Ingredient) => void;
}

export const RecipeImportModal: React.FC<RecipeImportModalProps> = ({
  isOpen,
  onClose,
  recipeCategories,
  ingredients,
  ingredientCategories,
  onSaveImportedRecipe,
  onSaveNewIngredient
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'url' | 'photo' | 'themealdb'>('text');
  
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

  const handleParse = async () => {
    setIsParsing(true);
    setParseError(null);

    const userApiKey = (localStorage.getItem('groq_api_key') || '').trim();

    try {
      if (activeTab === 'text') {
        if (!pastedText.trim()) throw new Error('Veuillez coller le texte de votre recette.');
        const parsed = parseRecipeText(pastedText);
        setParsedRecipe(parsed);
        return;
      }

      // Check if API key is present for advanced features (URL / Photo)
      if (!userApiKey) {
        throw new Error("Pour analyser un Lien Web ou une Photo, veuillez d'abord renseigner votre Clé d'API Groq gratuite dans les paramètres de votre Profil (icône en haut à droite).");
      }

      if (activeTab === 'url') {
        if (!recipeUrl.trim()) throw new Error('Veuillez entrer une URL valide.');

        // Simple call to a public free CORS proxy + Groq to read web content
        const cleanUrl = recipeUrl.trim();
        let webText = "";
        try {
          const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`);
          const proxyData = await proxyRes.json();
          const parser = new DOMParser();
          const doc = parser.parseFromString(proxyData.contents, 'text/html');
          // Extract main texts to give to Groq
          webText = doc.body.innerText.slice(0, 12000);
        } catch {
          webText = `Analyser directement l'URL suivante si possible : ${cleanUrl}`;
        }

        const prompt = `Tu es un assistant culinaire expert et traducteur multilingue professionnel. Analyse le contenu web suivant extrait d'un site de cuisine ou l'URL pour en extraire la recette.
Tu dois obligatoirement générer les traductions de cette recette pour les langues suivantes de l'application : fr, en, de, es, pt.
Retourne UNIQUEMENT un objet JSON valide (SANS blocs markdown de code, SANS texte autour, JUSTE le JSON) respectant scrupuleusement cette structure TypeScript :
{
  "title": "Nom de la recette dans la langue d'origine ou français",
  "servings": 4,
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 20,
  "difficulty": "easy" ou "medium" ou "hard",
  "description": "Brève description ou provenance",
  "ingredients": [
    {
      "name": "nom de l'ingrédient en français",
      "quantity": 250,
      "unit": "g" ou "unit" ou "tbsp" ou "ml",
      "localizations": {
        "fr": "Nom en français",
        "en": "Name in English",
        "de": "Name auf Deutsch",
        "es": "Nombre en español",
        "pt": "Nome em português"
      }
    }
  ],
  "instructions": [
    "Étape 1...", "Étape 2..."
  ],
  "localizations": {
    "fr": { "title": "Titre en français", "description": "Description en français", "instructions": ["Étape 1...", "Étape 2..."] },
    "en": { "title": "Title in English", "description": "Description in English", "instructions": ["Step 1...", "Step 2..."] },
    "de": { "title": "Titel auf Deutsch", "description": "Beschreibung auf Deutsch", "instructions": ["Schritt 1...", "Schritt 2..."] },
    "es": { "title": "Título en español", "description": "Descripción en español", "instructions": ["Paso 1...", "Paso 2..."] },
    "pt": { "title": "Título em português", "description": "Descrição em português", "instructions": ["Passo 1...", "Passo 2..."] }
  }
}

Contenu Web :
${webText}`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userApiKey}`
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(`Erreur Groq AI (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API dans votre Profil."}`);
        }

        const data = await response.json();
        const jsonText = data.choices?.[0]?.message?.content;
        if (!jsonText) throw new Error("L'IA n'a pas pu déchiffrer la recette depuis la page web.");

        const aiRecipe = JSON.parse(jsonText);

        // Map extracted names to system ingredients and save them if new
        const mappedIngredients = (aiRecipe.ingredients || []).map((i: any) => {
          const norm = normalizeExternalIngredient(i.name || '');

          // Check if there is an existing ingredient with either the exact ID OR the exact same name to prevent duplicates
          const matchedExisting = ingredients.find(existing =>
            existing.id === norm.ingredientId ||
            existing.name.toLowerCase().trim() === (i.name || norm.cleanName).toLowerCase().trim()
          );

          const finalIngredientId = matchedExisting ? matchedExisting.id : norm.ingredientId;

          if (!matchedExisting && onSaveNewIngredient) {
            onSaveNewIngredient({
              id: finalIngredientId,
              name: i.name || norm.cleanName,
              categoryId: 'cat-produce', // Fallback default category
              defaultUnit: (i.unit || 'unit') as UnitType,
              notes: 'Ingrédient importé par IA',
              localizations: i.localizations || { fr: i.name }
            });
          }

          return {
            ingredientId: finalIngredientId,
            quantity: Number(i.quantity) || 1,
            unit: (i.unit || 'unit') as UnitType,
            notes: i.name || norm.cleanName
          };
        });

        setParsedRecipe({
          title: aiRecipe.title || 'Recette Web Importée',
          servings: Number(aiRecipe.servings) || 4,
          prepTimeMinutes: Number(aiRecipe.prepTimeMinutes) || 15,
          cookTimeMinutes: Number(aiRecipe.cookTimeMinutes) || 20,
          categoryId: recipeCategories[0]?.id || 'cat-meat',
          difficulty: aiRecipe.difficulty || 'easy',
          description: aiRecipe.description || `Importé depuis : ${cleanUrl}`,
          ingredients: mappedIngredients,
          instructions: aiRecipe.instructions || ['Suivre la recette originale.'],
          tags: ['Web', 'Groq'],
          isCustom: true,
          localizations: aiRecipe.localizations
        });

      } else if (activeTab === 'photo') {
        if (!selectedImage) throw new Error('Veuillez sélectionner ou glisser une photo.');

        const prompt = `Analyse cette photo de recette de cuisine. Extrais toutes les informations requises et traduis la recette pour toutes les langues de l'application (fr, en, de, es, pt).
Retourne UNIQUEMENT un objet JSON valide respectant scrupuleusement cette structure :
{
  "title": "Nom de la recette",
  "servings": 4,
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 20,
  "difficulty": "easy" ou "medium" ou "hard",
  "description": "Extrait d'un livre de cuisine ou d'une photo",
  "ingredients": [
    {
      "name": "nom de l'ingrédient",
      "quantity": 100,
      "unit": "g" ou "unit" ou "ml",
      "localizations": { "fr": "Nom", "en": "Name", "de": "Name", "es": "Nombre", "pt": "Nome" }
    }
  ],
  "instructions": ["Étape 1...", "Étape 2..."],
  "localizations": {
    "fr": { "title": "Titre", "description": "Description", "instructions": ["Paso..."] },
    "en": { "title": "Title", "description": "Description", "instructions": ["Step..."] },
    "de": { "title": "Titel", "description": "Description", "instructions": ["Schritt..."] },
    "es": { "title": "Título", "description": "Description", "instructions": ["Paso..."] },
    "pt": { "title": "Título", "description": "Description", "instructions": ["Passo..."] }
  }
}`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userApiKey}`
          },
          body: JSON.stringify({
            model: 'qwen/qwen3.8-27b',
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: prompt },
                  { type: 'image_url', image_url: { url: selectedImage } }
                ]
              }
            ],
            response_format: { type: 'json_object' }
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(`Erreur Groq Vision (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API Groq."}`);
        }

        const data = await response.json();
        const jsonText = data.choices?.[0]?.message?.content;
        if (!jsonText) throw new Error("L'IA n'a pas pu déchiffrer l'image ou structurer les données.");

        const aiRecipe = JSON.parse(jsonText);

        const mappedIngredients = (aiRecipe.ingredients || []).map((i: any) => {
          const norm = normalizeExternalIngredient(i.name || '');

          const matchedExisting = ingredients.find(existing =>
            existing.id === norm.ingredientId ||
            existing.name.toLowerCase().trim() === (i.name || norm.cleanName).toLowerCase().trim()
          );

          const finalIngredientId = matchedExisting ? matchedExisting.id : norm.ingredientId;

          if (!matchedExisting && onSaveNewIngredient) {
            const rawName = i.name || norm.cleanName;
            const normalizedName = rawName.replace(/œ/g, 'oe').replace(/Œ/g, 'Oe');
            onSaveNewIngredient({
              id: finalIngredientId,
              name: normalizedName,
              categoryId: 'cat-produce',
              defaultUnit: (i.unit || 'unit') as UnitType,
              notes: 'Ingrédient photo importé par IA',
              localizations: i.localizations || { fr: normalizedName }
            });
          }

          return {
            ingredientId: finalIngredientId,
            quantity: Number(i.quantity) || 1,
            unit: (i.unit || 'unit') as UnitType,
            notes: i.name || norm.cleanName
          };
        });

        setParsedRecipe({
          title: aiRecipe.title || 'Recette Photo Importée',
          servings: Number(aiRecipe.servings) || 4,
          prepTimeMinutes: Number(aiRecipe.prepTimeMinutes) || 15,
          cookTimeMinutes: Number(aiRecipe.cookTimeMinutes) || 20,
          categoryId: recipeCategories[0]?.id || 'cat-meat',
          difficulty: aiRecipe.difficulty || 'easy',
          description: aiRecipe.description || 'Numérisé avec succès par Groq Vision',
          ingredients: mappedIngredients,
          instructions: aiRecipe.instructions || ['Suivre les étapes extraites.'],
          tags: ['Photo', 'Groq'],
          isCustom: true,
          localizations: aiRecipe.localizations
        });
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

      let categoryId = recipeCategories[0]?.id || 'cat-meat';
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
            <button
              onClick={() => setActiveTab('themealdb')}
              className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'themealdb'
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50/40 dark:bg-blue-950/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>TheMealDB</span>
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
                      <div className="p-3 text-[11px] rounded-xl bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10 dark:border-orange-500/20 text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>Pour faire fonctionner l'import par lien, assurez-vous d'avoir renseigné votre clé API Mistral AI gratuite dans votre <strong>Profil</strong> (icône en haut à droite).</span>
                      </div>
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
                      <div className="p-3 text-[11px] rounded-xl bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10 dark:border-orange-500/20 text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>Pour faire fonctionner l'import par photo, assurez-vous d'avoir renseigné votre clé API Mistral AI gratuite dans votre <strong>Profil</strong> (icône en haut à droite).</span>
                      </div>
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
