import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Check, 
  Refrigerator, 
  Sparkles, 
  ChefHat, 
  Plus, 
  AlertCircle,
  Clock,
  ArrowRight,
  Filter,
  Camera,
  Loader2,
  FileText,
  FileDown,
  Barcode
} from 'lucide-react';
import { Ingredient, IngredientCategory, Recipe, UnitType } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { matchRecipesWithPantry, getIngredientCost } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppStore } from '../stores/useAppStore';
import { useDataStore } from '../stores/useDataStore';
import { parseReceiptWithAI } from '../lib/aiService';
import { useAuthStore } from '../stores/useAuthStore';

interface PantryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  pantryMap: Record<string, boolean>;
  onTogglePantryItem: (ingredientId: string) => void;
  onBatchSetPantry: (updates: Record<string, boolean>) => void;
  onSaveIngredient?: (ing: Ingredient) => void;
  recipes: Recipe[];
  onSelectRecipeForMeal?: (recipe: Recipe) => void;
  onPreviewRecipe?: (recipe: Recipe) => void;
}

export const PantryModal: React.FC<PantryModalProps> = ({
  isOpen,
  onClose,
  ingredients,
  ingredientCategories,
  pantryMap,
  onTogglePantryItem,
  onBatchSetPantry,
  onSaveIngredient,
  recipes,
  onSelectRecipeForMeal,
  onPreviewRecipe
}) => {
  const { translateIngredient, translateIngredientCategory, translateRecipe, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stock' | 'antiwaste'>('stock');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<{ name: string; quantity: number; unit: UnitType; matchedIngredientId?: string }[] | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const { user, userData } = useAuthStore();
  const isPremium = userData?.subscriptionStatus === 'premium';
  const { theme, systemConfig } = useAppStore();
  const { pantryAddedDates } = useDataStore();

  if (!isOpen) return null;

  const inStockCount = Object.values(pantryMap).filter(Boolean).length;
  const antiWasteMatches = matchRecipesWithPantry(recipes, pantryMap, ingredients);

  const filteredIngredients = ingredients.filter(ing => {
    const matchesSearch = translateIngredient(ing.id, ing.name).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || ing.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleClearAll = () => {
    if (confirm('Voulez-vous réinitialiser tous les ingrédients de votre stock ?')) {
      const cleared: Record<string, boolean> = {};
      Object.keys(pantryMap).forEach(k => { cleared[k] = false; });
      onBatchSetPantry(cleared);
    }
  };

  const handleScanReceipt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const apiKey = localStorage.getItem('groq_api_key') || localStorage.getItem('gemini_api_key');
    const provider = localStorage.getItem('ai_provider') as any || 'gemini';

    if (!apiKey) {
      alert("Veuillez configurer votre clé API (Groq ou Gemini) dans votre Profil pour scanner des tickets.");
      return;
    }

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string;
          const model = provider === 'gemini' ? systemConfig.geminiModel : systemConfig.groqModel;
          const result = await parseReceiptWithAI(base64, { provider, apiKey, model }, file.type);

          // Match with existing ingredients
          const matched = result.items.map(item => {
            const lowerName = item.name.toLowerCase();
            const match = ingredients.find(ing =>
              ing.name.toLowerCase() === lowerName ||
              translateIngredient(ing.id, ing.name).toLowerCase() === lowerName
            );
            return { ...item, matchedIngredientId: match?.id };
          });

          setScanResults(matched as any);
        } catch (parseErr: any) {
          alert(parseErr.message || "L'IA n'a pas pu analyser ce document.");
        } finally {
          setIsScanning(false);
        }
      };
      reader.onerror = () => {
        alert("Erreur lors de la lecture du fichier.");
        setIsScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      alert(err.message || "Erreur lors de l'analyse du ticket.");
      setIsScanning(false);
    }
  };

  const handleConfirmScan = () => {
    if (!scanResults) return;
    const newPantry = { ...pantryMap };
    scanResults.forEach(res => {
      if (res.matchedIngredientId) {
        newPantry[res.matchedIngredientId] = true;
      }
    });
    onBatchSetPantry(newPantry);
    setScanResults(null);
    alert(`${scanResults.filter(r => r.matchedIngredientId).length} ingrédients ajoutés à votre stock !`);
  };

  const handleAskChefAI = async () => {
    const apiKey = localStorage.getItem('groq_api_key') || localStorage.getItem('gemini_api_key');
    const provider = localStorage.getItem('ai_provider') as any || 'gemini';

    if (!apiKey) {
      alert("Configurez votre clé AI dans le Profil pour utiliser le Chef Magique.");
      return;
    }

    const inStockNames = ingredients
      .filter(i => pantryMap[i.id])
      .map(i => translateIngredient(i.id, i.name));

    if (inStockNames.length < 3) {
      alert("Cochez au moins 3 ingrédients que vous avez pour que le Chef puisse vous aider !");
      return;
    }

    setIsScanning(true);
    try {
      const prompt = `Voici les ingrédients que j'ai dans mon frigo : ${inStockNames.join(', ')}.
      Suggère-moi 3 idées de plats simples à réaliser avec ces éléments.
      Pour chaque plat, donne un titre court et une phrase d'explication.
      Retourne UNIQUEMENT un objet JSON : { "suggestions": [{ "title": "...", "desc": "..." }] }`;

      // Simplified call using the parseRecipe mechanism logic but for suggestions
      const response = await fetch(provider === 'gemini'
        ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
        : 'https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(provider === 'groq' && { 'Authorization': `Bearer ${apiKey}` }) },
        body: JSON.stringify(provider === 'gemini' ? {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        } : {
          model: 'openai/gpt-oss-120b',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        })
      });

      const data = await response.json();
      const text = provider === 'gemini' ? data.candidates[0].content.parts[0].text : data.choices[0].message.content;
      const result = JSON.parse(text.replace(/```json|```/g, "").trim());

      alert(`👨‍🍳 Idées du Chef :\n\n${result.suggestions.map((s: any) => `• ${s.title}: ${s.desc}`).join('\n\n')}`);
    } catch (err) {
      alert("Le Chef est un peu occupé, réessayez dans un instant.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleLinkIngredient = (index: number, ingredientId: string) => {
    if (!scanResults) return;
    const updated = [...scanResults];
    updated[index] = { ...updated[index], matchedIngredientId: ingredientId };
    setScanResults(updated);
  };

  const handleQuickCreateIngredient = (index: number) => {
    if (!scanResults || !onSaveIngredient) return;
    const item = scanResults[index];

    const newIng: Ingredient = {
      id: `ing-custom-${Date.now()}`,
      name: item.name,
      categoryId: 'cat-produits-laitiers', // Default category, user can change later
      defaultUnit: item.unit || 'unit'
    };

    onSaveIngredient(newIng);
    handleLinkIngredient(index, newIng.id);
  };

  const handleSearchByBarcode = async () => {
    const code = prompt("Saisissez ou scannez le code-barres (EAN-13) :");
    if (!code) return;
    await processBarcode(code);
  };

  const handleScanBarcodeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const apiKey = localStorage.getItem('groq_api_key') || localStorage.getItem('gemini_api_key');
    const provider = localStorage.getItem('ai_provider') as any || 'gemini';

    if (!apiKey) {
      alert("Clé API requise pour l'analyse visuelle du code-barres.");
      return;
    }

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string;
          const prompt = "Extrait UNIQUEMENT le numéro de code-barres EAN-13 de cette image. Retourne seulement les chiffres, rien d'autre.";

          // Using a simple fetch for quick extraction via Gemini or Groq
          const url = provider === 'gemini'
            ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
            : 'https://api.groq.com/openai/v1/chat/completions';

          const body = provider === 'gemini' ? {
            contents: [{ parts: [{ text: prompt }, { inlineData: { data: base64.split(',')[1], mimeType: file.type } }] }]
          } : {
            model: systemConfig.groqModel,
            messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: base64 } }] }]
          };

          const res = await fetch(url, { method: 'POST', body: JSON.stringify(body) });
          const data = await res.json();
          const code = provider === 'gemini' ? data.candidates[0].content.parts[0].text : data.choices[0].message.content;
          const cleanedCode = code.replace(/\D/g, '').trim();

          if (cleanedCode && cleanedCode.length >= 8) {
            await processBarcode(cleanedCode);
          } else {
            alert("Code-barres non détecté. Assurez-vous qu'il est bien visible.");
          }
        } catch (e) {
          alert("Erreur lors de l'analyse visuelle.");
        } finally {
          setIsScanning(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setIsScanning(false);
    }
  };

  const processBarcode = async (code: string) => {

  const getExpiryInfo = (ingredientId: string, categoryId: string) => {
    const addedAt = pantryAddedDates[ingredientId];
    if (!addedAt) return null;

    const addedDate = new Date(addedAt);
    const now = new Date();
    const daysSinceAdded = Math.floor((now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));

    // Durée de conservation estimée par catégorie
    const shelfLife: Record<string, number> = {
      'cat-viandes': 3,
      'cat-poissons': 2,
      'cat-volailles': 3,
      'cat-legumes': 7,
      'cat-fruits': 10,
      'cat-produits-laitiers': 12,
      'cat-oeufs': 21,
      'cat-crustaces': 2,
      'cat-fruits-de-mer': 2,
      'cat-matieres-grasses': 60,
      'cat-epicerie': 180,
      'cat-feculents': 180,
      'cat-cereales': 180,
      'cat-condiments': 180,
      'cat-herbes': 5,
    };

    const limit = shelfLife[categoryId] || 14;
    const remaining = limit - daysSinceAdded;

    if (remaining <= 0) return { label: 'Périmé ?', color: 'text-rose-600 bg-rose-50 border-rose-200', icon: 'AlertTriangle' };
    if (remaining <= 2) return { label: 'À vérifier', color: 'text-amber-600 bg-amber-50 border-amber-200', icon: 'Clock' };
    return null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent, ingredientId: string) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    const threshold = 60;

    if (Math.abs(diff) > threshold) {
      // Horizontal swipe to toggle stock (natural gesture)
      onTogglePantryItem(ingredientId);
    }
    setTouchStartX(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Refrigerator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Mon Frigo & Placard
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {inStockCount} en stock
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Cochez ce que vous avez déjà à la maison pour l'exclure de vos courses et trouver des idées anti-gaspi.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isScanning ? 'bg-slate-200 text-slate-400' : 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-md shadow-amber-500/20'
            }`}>
              {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              <span>{isScanning ? 'Analyse...' : 'Scanner Ticket/Facture'}</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleScanReceipt}
                className="hidden"
                disabled={isScanning}
              />
            </label>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scan Results Banner */}
        {scanResults && (
          <div className="mx-4 sm:mx-6 mt-4 p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <FileText className="w-5 h-5" />
                <h3 className="font-bold">Résultats du scan ({scanResults.length} produits)</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScanResults(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmScan}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                >
                  Valider l'inventaire
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
              {scanResults.map((res, i) => (
                <div
                  key={i}
                  className={`p-1.5 rounded-xl text-[11px] font-medium border flex items-center gap-2 transition-all ${
                    res.matchedIngredientId
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-50/50 text-rose-600 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${res.matchedIngredientId ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {res.matchedIngredientId ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold">{res.name} <span className="opacity-60">x{res.quantity}</span></span>
                    {!res.matchedIngredientId && (
                      <div className="flex items-center gap-1 mt-1">
                        <select
                          className="bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900 rounded-md text-[9px] px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-rose-500 flex-1"
                          onChange={(e) => handleLinkIngredient(i, e.target.value)}
                          value=""
                        >
                          <option value="">Lier à...</option>
                          {ingredients
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(ing => (
                              <option key={ing.id} value={ing.id}>{translateIngredient(ing.id, ing.name)}</option>
                            ))
                          }
                        </select>
                        <button
                          onClick={() => handleQuickCreateIngredient(i)}
                          className="p-1 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                          title="Créer cet ingrédient"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    {res.matchedIngredientId && (
                      <span className="text-[9px] opacity-70">Lier à : {translateIngredient(res.matchedIngredientId, ingredients.find(ig => ig.id === res.matchedIngredientId)?.name)}</span>
                    )}
                  </div>

                  {res.matchedIngredientId && (
                    <button
                      onClick={() => handleLinkIngredient(i, undefined as any)}
                      className="p-1 hover:bg-black/5 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {!scanResults.some(r => r.matchedIngredientId) && (
              <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-2 font-medium italic">
                ⚠️ Aucun ingrédient n'a été reconnu dans votre base. Vous devrez peut-être les cocher manuellement.
              </p>
            )}
          </div>
        )}

        {/* Tab switcher */}
        <div className="px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('stock')}
              className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'stock'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              Inventaire des Stocks ({inStockCount})
            </button>
            <button
              onClick={() => setActiveTab('antiwaste')}
              className={`px-4 py-2 rounded-t-xl text-sm font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'antiwaste'
                  ? 'border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Anti-Gaspillage ({antiWasteMatches.filter(m => m.matchPercentage > 0).length})</span>
            </button>
            <button
              onClick={handleAskChefAI}
              className={`px-4 py-2 rounded-t-xl text-sm font-bold flex items-center gap-1.5 transition-all ${
                isPremium
                  ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                  : 'text-slate-400 grayscale cursor-help'
              }`}
              title={!isPremium ? "Fonctionnalité réservée à la version Full 🔒" : "Demander au Chef IA"}
            >
              <ChefHat className="w-4 h-4" />
              <span>Chef Magique IA {!isPremium && '🔒'}</span>
            </button>
          </div>

          {activeTab === 'stock' && inStockCount > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 pb-2 transition-colors font-medium"
            >
              Tout désélectionner
            </button>
          )}
        </div>

        {/* Search & Category Filter */}
        <div className="px-4 sm:px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
           <button
             onClick={handleSearchByBarcode}
             className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-all shadow-sm"
           >
             <Barcode className="w-4 h-4" />
             <span>Scanner Code-Barres</span>
           </button>
           <p className="text-[10px] text-slate-400 italic flex-1 text-right">Utilise OpenFoodFacts pour identifier vos produits</p>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'stock' ? (
            <div className="space-y-4">
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Chercher un ingrédient..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Effacer
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Toutes ({ingredients.length})
                  </button>
                  {ingredientCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
                      <span>{translateIngredientCategory(cat.id, cat.name)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Ingredients */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {filteredIngredients.map(ing => {
                  const isInStock = !!pantryMap[ing.id];
                  const category = ingredientCategories.find(c => c.id === ing.categoryId);

                  // Calculer le prix indicatif pour 100g ou 1 unité
                  const defaultQty = ing.defaultUnit === 'g' || ing.defaultUnit === 'ml' ? 100 : 1;
                  const unitCost = getIngredientCost(ing.id, defaultQty, ing.defaultUnit, ing.categoryId, ing.name);
                  const isCondiment = unitCost === 0;

                  return (
                    <button
                      key={ing.id}
                      type="button"
                      onClick={() => onTogglePantryItem(ing.id)}
                      onTouchStart={handleTouchStart}
                      onTouchEnd={(e) => handleTouchEnd(e, ing.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 select-none ${
                        isInStock
                          ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-sm'
                          : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 w-full">
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-bold truncate ${
                            isInStock ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'
                          }`}>
                            {translateIngredient(ing.id, ing.name)}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
                              {category ? translateIngredientCategory(category.id, category.name) : ''}
                            </p>
                            {isInStock && (() => {
                              const expiry = getExpiryInfo(ing.id, ing.categoryId);
                              return expiry ? (
                                <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-bold border ${expiry.color}`}>
                                  {expiry.label}
                                </span>
                              ) : null;
                            })()}
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                          isInStock
                            ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                        }`}>
                          {isInStock && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </div>
                      </div>

                      {/* Fiche d'informations produit enrichie (Prix & Unité) */}
                      <div className="flex items-center justify-between w-full pt-1.5 border-t border-slate-200/60 dark:border-slate-700/50 text-[11px]">
                        <span className="text-slate-400 dark:text-slate-500">
                          Unité : <span className="font-semibold text-slate-600 dark:text-slate-300">{ing.defaultUnit}</span>
                        </span>

                        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                          isInStock
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : isCondiment
                            ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
                            : 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-400'
                        }`}>
                          {isCondiment ? 'Gratuit / Épice' : `${unitCost.toFixed(2)}€ / ${defaultQty}${ing.defaultUnit}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredIngredients.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm">Aucun ingrédient ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          ) : (
            /* Anti-Waste Tab */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold">Assistant Anti-Gaspillage</p>
                  <p className="text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                    Voici les recettes que vous pouvez préparer en priorité avec ce que vous avez déjà en stock. Les ingrédients manquants sont indiqués pour chaque recette.
                  </p>
                </div>
              </div>

              {inStockCount === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Refrigerator className="w-12 h-12 mx-auto mb-3 opacity-30 text-emerald-500" />
                  <p className="text-base font-semibold text-slate-800 dark:text-slate-200">Votre stock est vide pour le moment</p>
                  <p className="text-xs sm:text-sm mt-1 max-w-md mx-auto">
                    Retournez sur l'onglet « Inventaire des Stocks » et cochez les ingrédients que vous avez dans vos placards pour voir les suggestions.
                  </p>
                  <button
                    onClick={() => setActiveTab('stock')}
                    className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Remplir mon frigo
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {antiWasteMatches.map(({ recipe, totalIngredients, availableCount, missingIngredients, matchPercentage }) => {
                    const localized = translateRecipe(recipe);

                    return (
                      <div
                        key={recipe.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                                {localized.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)} min
                                </span>
                                <span>•</span>
                                <span>{recipe.servings || 4} pers.</span>
                              </div>
                            </div>

                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                              matchPercentage === 100
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                : matchPercentage >= 60
                                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}>
                              {matchPercentage}% disponible
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-3">
                            <div
                              className={`h-full transition-all duration-300 ${
                                matchPercentage === 100 ? 'bg-emerald-500' : matchPercentage >= 60 ? 'bg-amber-500' : 'bg-slate-400'
                              }`}
                              style={{ width: `${matchPercentage}%` }}
                            />
                          </div>

                          {/* Missing ingredients tag preview */}
                          {missingIngredients.length > 0 ? (
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                              <span className="font-medium text-slate-700 dark:text-slate-300">À acheter ({missingIngredients.length}) : </span>
                              {missingIngredients.map(mi => translateIngredient(mi.id, mi.name)).join(', ')}
                            </div>
                          ) : (
                            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              Tous les ingrédients sont déjà dans votre cuisine !
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          {onPreviewRecipe && (
                            <button
                              type="button"
                              onClick={() => onPreviewRecipe(recipe)}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                            >
                              Voir la recette
                            </button>
                          )}
                          {onSelectRecipeForMeal && (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectRecipeForMeal(recipe);
                                onClose();
                              }}
                              className="flex-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Ajouter au planning</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {inStockCount} ingrédient{inStockCount > 1 ? 's' : ''} en stock actuellement.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
