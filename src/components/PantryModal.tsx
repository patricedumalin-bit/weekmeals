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
  Barcode,
  AlertTriangle,
  Crown
} from 'lucide-react';
import { Ingredient, IngredientCategory, Recipe, UnitType } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { matchRecipesWithPantry, getIngredientCost } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppStore } from '../stores/useAppStore';
import { useDataStore } from '../stores/useDataStore';
import { parseReceiptWithAI, parseBarcodeWithAI, parseRecipeWithAI } from '../lib/aiService';
import { searchFoodImages } from '../services/imageSearchService';
import { useAuthStore } from '../stores/useAuthStore';
import { useSubscription } from '../hooks/useSubscription';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { PremiumBadge } from './PremiumBadge';

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
  ingredients = [],
  ingredientCategories = [],
  pantryMap = {},
  onTogglePantryItem,
  onBatchSetPantry,
  onSaveIngredient,
  recipes = [],
  onSelectRecipeForMeal,
  onPreviewRecipe
}) => {
  const { t, translateIngredientCategory, translateIngredient } = useLanguage();
  const systemConfig = useAppStore(state => state.systemConfig);
  const saveRecipe = useDataStore(state => state.saveRecipe);

  const { isPremium, aiLimit, incrementAIUsage } = useSubscription();

  const [activeTab, setActiveTab] = useState<'stock' | 'antiwaste'>('stock');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<{ name: string; quantity: number; unit?: string; matchedIngredientId?: string }[] | null>(null);
  const [chefAiProposal, setChefAiProposal] = useState<Recipe | null>(null);

  // Expiry tracking state
  const [pantryAddedDates, setPantryAddedDates] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem('pantry_added_dates') || '{}');
    } catch {
      return {};
    }
  });

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (!isOpen) return null;

  const inStockCount = Object.values(pantryMap).filter(Boolean).length;

  const filteredIngredients = ingredients.filter(ing => {
    const matchesSearch = translateIngredient(ing.id, ing.name).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || ing.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const matchedRecipes = matchRecipesWithPantry(recipes, pantryMap, ingredients);

  const handleScanReceipt = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (aiLimit.reached) {
      if (confirm("Limite d'analyses IA atteinte. Souhaitez-vous passer à la version Premium ?")) {
        alert(`Limite de scans IA atteinte. Passez en version Full !`);
      }
      return;
    }

    const provider = localStorage.getItem('ai_provider') as any || 'groq';
    const apiKey = provider === 'gemini' ? localStorage.getItem('gemini_api_key') : localStorage.getItem('groq_api_key');

    if (!apiKey) {
      alert(`Veuillez configurer votre clé API pour ${provider === 'gemini' ? 'Gemini' : 'Groq'} dans votre Profil.`);
      return;
    }

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string;
          const rawModel = provider === 'gemini' ? systemConfig.geminiModel : systemConfig.groqModel;
          const activeModel = (rawModel || '').replace('geminiModel', '').replace('groqModel', '').trim() || (provider === 'gemini' ? 'gemini-2.0-flash' : 'qwen/qwen3.8-27b');

          const result = await parseReceiptWithAI(base64, { provider, apiKey, model: activeModel }, file.type);
          incrementAIUsage();

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
          alert(parseErr.message || "Erreur d'analyse IA.");
        } finally {
          setIsScanning(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
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
    alert(`${scanResults.filter(r => r.matchedIngredientId).length} ingrédients ajoutés !`);
  };

  const handleAskChefAI = async () => {
    if (aiLimit.reached) {
      alert("Limite de scans IA atteinte.");
      return;
    }
    const provider = localStorage.getItem('ai_provider') as any || 'groq';
    const apiKey = provider === 'gemini' ? localStorage.getItem('gemini_api_key') : localStorage.getItem('groq_api_key');

    if (!apiKey) {
      alert(`Veuillez configurer votre clé API pour ${provider === 'gemini' ? 'Gemini' : 'Groq'} dans votre Profil.`);
      return;
    }

    const inStockNames = ingredients
      .filter(i => pantryMap[i.id])
      .map(i => translateIngredient(i.id, i.name));

    if (inStockNames.length < 3) {
      alert("Cochez au moins 3 ingrédients dans votre frigo pour que le Chef IA vous propose une recette !");
      return;
    }

    setIsScanning(true);
    setChefAiProposal(null);

    try {
      const prompt = `Voici les ingrédients que j'ai dans mon frigo/placard : ${inStockNames.join(', ')}. Crée une seule excellente recette originale et savoureuse basée principalement sur ces ingrédients.`;
      const rawModel = provider === 'gemini' ? systemConfig.geminiModel : systemConfig.groqModel;
      const activeModel = (rawModel || '').replace('geminiModel', '').replace('groqModel', '').trim() || (provider === 'gemini' ? 'gemini-2.0-flash' : 'qwen/qwen3.8-27b');

      const aiRecipe = await parseRecipeWithAI(prompt, { provider, apiKey, model: activeModel });
      incrementAIUsage();

      const foodPhotos = await searchFoodImages(aiRecipe.title, 1);

      const mappedIngredients = aiRecipe.ingredients.map(i => {
        const match = ingredients.find(ing => ing.name.toLowerCase().trim() === i.name.toLowerCase().trim());
        return {
          ingredientId: match ? match.id : `ing-custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          quantity: i.quantity,
          unit: i.unit as any,
          notes: i.name
        };
      });

      const fullRecipe: Recipe = {
        id: `chef-ai-${Date.now()}`,
        title: aiRecipe.title,
        categoryId: 'rcat-plat',
        servings: aiRecipe.servings || 4,
        prepTimeMinutes: aiRecipe.prepTimeMinutes || 15,
        cookTimeMinutes: aiRecipe.cookTimeMinutes || 20,
        difficulty: (aiRecipe.difficulty as any) || 'easy',
        description: aiRecipe.description || 'Recette créée par le Chef IA à partir de vos ingrédients.',
        instructions: aiRecipe.instructions || [],
        ingredients: mappedIngredients,
        tags: ['Chef IA', 'Frigo'],
        imageUrl: foodPhotos[0],
        rating: 1,
        isCustom: true,
        localizations: aiRecipe.localizations
      };

      setChefAiProposal(fullRecipe);
    } catch (err: any) {
      alert(`Erreur Chef IA : ${err.message || "Erreur réseau ou configuration."}`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleScanBarcodeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const provider = localStorage.getItem('ai_provider') as any || 'groq';
    const apiKey = provider === 'gemini' ? localStorage.getItem('gemini_api_key') : localStorage.getItem('groq_api_key');

    if (!apiKey) {
      alert(`Veuillez configurer votre clé API pour ${provider === 'gemini' ? 'Gemini' : 'Groq'} dans votre Profil.`);
      return;
    }

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string;
          const rawModel = provider === 'gemini' ? systemConfig.geminiModel : systemConfig.groqModel;
          const activeModel = (rawModel || '').replace('geminiModel', '').replace('groqModel', '').trim() || (provider === 'gemini' ? 'gemini-2.0-flash' : 'qwen/qwen3.8-27b');

          const code = await parseBarcodeWithAI(base64, { provider, apiKey, model: activeModel }, file.type);
          if (code) {
            incrementAIUsage();
            await processBarcode(code);
          } else alert("Code-barres non détecté.");
        } catch (e: any) {
          alert(e.message || "Erreur analyse.");
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
    setIsScanning(true);
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code.replace(/\s/g, '')}.json`);
      const data = await response.json();
      if (data.status === 1) {
        const productName = data.product.product_name_fr || data.product.product_name || "Produit Inconnu";
        if (confirm(`Produit trouvé : ${productName}\nVoulez-vous l'ajouter ?`)) {
          const newIng: Ingredient = { id: `ing-ean-${code}`, name: productName, categoryId: 'cat-produits-laitiers', defaultUnit: 'unit' };
          if (onSaveIngredient) onSaveIngredient(newIng);
          onTogglePantryItem(newIng.id);
        }
      } else {
        alert("Produit non trouvé.");
      }
    } catch (err) {
      alert("Erreur réseau.");
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
      categoryId: 'cat-produits-laitiers',
      defaultUnit: (item.unit as any) || 'unit'
    };
    onSaveIngredient(newIng);
    handleLinkIngredient(index, newIng.id);
  };

  const handleSearchByBarcode = async () => {
    const code = prompt("Saisissez le code-barres (EAN-13) :");
    if (code) await processBarcode(code);
  };

  const handleNativeBarcodeScan = async () => {
    try {
      const status = await BarcodeScanner.checkPermissions();
      if (status.camera !== 'granted') {
        const req = await BarcodeScanner.requestPermissions();
        if (req.camera !== 'granted') {
          throw new Error("Permission caméra refusée.");
        }
      }

      const { barcodes } = await BarcodeScanner.scan();
      if (barcodes && barcodes.length > 0) {
        const scannedCode = barcodes[0].rawValue;
        if (scannedCode) await processBarcode(scannedCode);
      }
    } catch (e: any) {
      const barcodeInput = document.getElementById('hidden-barcode-input') as HTMLInputElement;
      if (barcodeInput) barcodeInput.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="backdrop-blur-2xl bg-white dark:bg-slate-900 border border-white/20 dark:border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
              <Refrigerator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Mon Frigo & Placard</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">{inStockCount} en stock</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${isScanning ? 'bg-slate-200 text-slate-400' : 'bg-amber-500 text-slate-900 shadow-md active:scale-95'}`}>
              {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              <span>Scanner Ticket</span>
              <input type="file" accept="image/*,application/pdf" onChange={handleScanReceipt} className="hidden" disabled={isScanning} />
            </label>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 transition-colors"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Scan Results Bar */}
        {scanResults && (
          <div className="mx-4 sm:mx-6 mt-4 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-blue-700 font-bold"><FileText className="w-5 h-5" /><span>Scan ({scanResults.length})</span></div>
              <div className="flex gap-2">
                <button onClick={() => setScanResults(null)} className="px-3 py-1.5 rounded-lg text-xs bg-slate-200 text-slate-700 font-bold">Annuler</button>
                <button onClick={handleConfirmScan} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm">Valider</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
              {scanResults.map((res, i) => (
                <div key={i} className={`p-1.5 rounded-xl text-[11px] font-bold border flex items-center gap-2 ${res.matchedIngredientId ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                  <span>{res.name} x{res.quantity}</span>
                  {!res.matchedIngredientId && (
                    <button onClick={() => handleQuickCreateIngredient(i)} className="p-1 rounded-md bg-emerald-500 text-white"><Plus className="w-3 h-3" /></button>
                  )}
                  {res.matchedIngredientId && <button onClick={() => handleLinkIngredient(i, undefined as any)} className="p-1"><X className="w-3 h-3" /></button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chef AI Proposal Card */}
        {chefAiProposal && (
          <div className="mx-4 sm:mx-6 mt-4 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-blue-500/30 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-3">
              <div className="flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-amber-400" />
                <h3 className="font-bold text-lg text-amber-300">Recette proposée par le Chef IA</h3>
              </div>
              <button
                onClick={() => setChefAiProposal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {chefAiProposal.imageUrl && (
                <img
                  src={chefAiProposal.imageUrl}
                  alt={chefAiProposal.title}
                  className="w-full sm:w-44 h-32 object-cover rounded-xl border border-white/20 shadow-md shrink-0"
                />
              )}
              <div className="flex-1">
                <h4 className="font-extrabold text-xl text-white mb-1">
                  {chefAiProposal.title}
                </h4>
                <p className="text-xs text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                  {chefAiProposal.description}
                </p>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300 flex-wrap">
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/10">⏱️ Prép : {chefAiProposal.prepTimeMinutes} min</span>
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/10">🔥 Cuisson : {chefAiProposal.cookTimeMinutes} min</span>
                  <span className="px-2.5 py-1 bg-white/10 rounded-lg border border-white/10">👥 {chefAiProposal.servings} pers.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/20 flex-wrap">
              <button
                onClick={() => setChefAiProposal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors"
              >
                Ignorer
              </button>
              <button
                onClick={handleAskChefAI}
                disabled={isScanning}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 border border-white/20 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Proposer autre chose
              </button>
              <button
                onClick={() => {
                  saveRecipe(chefAiProposal);
                  alert(`La recette "${chefAiProposal.title}" a été ajoutée à vos recettes avec succès !`);
                  setChefAiProposal(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg flex items-center gap-2 transition-colors"
              >
                <Check className="w-4 h-4" />
                Enregistrer dans mes recettes
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab('stock')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'stock' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Stocks</button>
            <button onClick={() => setActiveTab('antiwaste')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'antiwaste' ? 'border-amber-600 text-amber-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Anti-Gaspillage</button>
          </div>
          <button
            onClick={handleAskChefAI}
            disabled={isScanning}
            className={`px-4 py-2 text-sm font-bold transition-all flex items-center gap-1.5 rounded-xl ${isScanning ? 'opacity-50' : 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30'}`}
          >
            {isScanning ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : <Sparkles className="w-4 h-4 text-blue-600" />}
            <span>Chef IA (Suggérer Recette)</span>
            {!isPremium && <PremiumBadge size="xs" />}
          </button>
        </div>

        {/* Barcode Scanner Strip */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/30 dark:bg-slate-900/40">
           <button
             onClick={handleNativeBarcodeScan}
             className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold cursor-pointer hover:bg-slate-700 active:scale-95 transition-all shadow-sm"
           >
             <Barcode className="w-4 h-4" />
             <span>Scanner Code-Barres</span>
           </button>
           <input
             id="hidden-barcode-input"
             type="file"
             accept="image/*"
             capture="environment"
             onChange={handleScanBarcodeImage}
             className="hidden"
             disabled={isScanning}
           />
           <button onClick={handleSearchByBarcode} className="text-[10px] text-slate-500 underline font-medium">Saisir manuellement</button>
        </div>

        {/* Stock Tab / Ingredient List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'stock' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Chercher..." className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button onClick={() => setSelectedCategory('all')} className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap ${selectedCategory === 'all' ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>Tous</button>
                  {ingredientCategories.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ${selectedCategory === cat.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                      <span>{translateIngredientCategory(cat.id, cat.name)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {filteredIngredients.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Aucun ingrédient trouvé</p>
                  <p className="text-xs text-slate-500 mt-1">Essayez de modifier votre recherche ou de changer de catégorie.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {filteredIngredients.map(ing => {
                    const isInStock = !!pantryMap[ing.id];
                    return (
                      <div
                        key={ing.id}
                        onClick={() => onTogglePantryItem(ing.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                          isInStock
                            ? 'bg-emerald-500/10 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isInStock ? 'bg-emerald-600 text-white' : 'border border-slate-300 dark:border-slate-600'}`}>
                            {isInStock && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs font-bold truncate">
                            {translateIngredient(ing.id, ing.name)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Anti-Waste Tab */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">Recettes réalisables avec votre stock</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">Recettes contenant la majorité de vos ingrédients en stock.</p>
                </div>
              </div>

              {matchedRecipes.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Cochez d'avantage d'ingrédients dans votre stock pour voir les recettes réalisables.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedRecipes.map(({ recipe, matchedCount, totalCount, percentage }) => (
                    <div
                      key={recipe.id}
                      onClick={() => onPreviewRecipe && onPreviewRecipe(recipe)}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{recipe.title}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                            {percentage}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{recipe.description}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{matchedCount}/{totalCount} ingrédients en stock</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">Voir <ArrowRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
