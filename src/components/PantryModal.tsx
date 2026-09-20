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
  Barcode
} from 'lucide-react';
import { Ingredient, IngredientCategory, Recipe, UnitType } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { matchRecipesWithPantry, getIngredientCost } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppStore } from '../stores/useAppStore';
import { useDataStore } from '../stores/useDataStore';
import { parseReceiptWithAI, parseBarcodeWithAI } from '../lib/aiService';
import { useAuthStore } from '../stores/useAuthStore';
import { useSubscription } from '../hooks/useSubscription';

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

  const { userData, incrementAIUsage } = useAuthStore();
  const { isPremium, aiLimit } = useSubscription();
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

    if (aiLimit.reached) {
      if (isPremium) {
        alert("Activité inhabituelle détectée. Par mesure de sécurité, vos scans IA sont temporairement suspendus. Veuillez contacter le support si vous pensez qu'il s'agit d'une erreur.");
      } else {
        alert(`Limite de scans IA atteinte (${FREE_LIMITS.AI_SCANS_PER_MONTH}/mois). Passez en version Full pour une utilisation illimitée !`);
      }
      return;
    }

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
      const prompt = `Voici les ingrédients que j'ai dans mon frigo : ${inStockNames.join(', ')}. Suggère-moi 3 idées de plats simples à réaliser avec ces éléments.`;
      const response = await fetch(provider === 'gemini'
        ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
        : 'https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(provider === 'groq' && { 'Authorization': `Bearer ${apiKey}` }) },
        body: JSON.stringify(provider === 'gemini' ? {
          contents: [{ parts: [{ text: prompt }] }]
        } : {
          model: systemConfig.groqModel,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();
      const text = provider === 'gemini' ? data.candidates[0].content.parts[0].text : data.choices[0].message.content;
      alert(`👨‍🍳 Idées du Chef :\n\n${text}`);
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
      categoryId: 'cat-produits-laitiers',
      defaultUnit: item.unit || 'unit'
    };
    onSaveIngredient(newIng);
    handleLinkIngredient(index, newIng.id);
  };

  const handleSearchByBarcode = async () => {
    const code = prompt("Saisissez le code-barres (EAN-13) :");
    if (code) await processBarcode(code);
  };

  const handleScanBarcodeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (aiLimit.reached) {
      if (isPremium) {
        alert("Activité inhabituelle détectée. Votre accès est limité par sécurité.");
      } else {
        alert(`Limite de scans IA atteinte (${FREE_LIMITS.AI_SCANS_PER_MONTH}/mois). Passez en version Full pour une utilisation illimitée !`);
      }
      return;
    }

    const apiKey = localStorage.getItem('groq_api_key') || localStorage.getItem('gemini_api_key');
    const provider = localStorage.getItem('ai_provider') as any || 'gemini';

    if (!apiKey) {
      alert("Clé API requise pour le scan visuel.");
      return;
    }

    setIsScanning(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string;
          const model = provider === 'gemini' ? systemConfig.geminiModel : systemConfig.groqModel;
          const code = await parseBarcodeWithAI(base64, { provider, apiKey, model }, file.type);
          if (code) {
            incrementAIUsage();
            await processBarcode(code);
          } else alert("Code-barres non détecté.");
        } catch (e: any) {
          alert(e.message || "Erreur lors de l'analyse.");
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

  const getExpiryInfo = (ingredientId: string, categoryId: string) => {
    const addedAt = pantryAddedDates[ingredientId];
    if (!addedAt) return null;
    const daysSince = Math.floor((new Date().getTime() - new Date(addedAt).getTime()) / (1000 * 60 * 60 * 24));
    const shelfLife: Record<string, number> = { 'cat-viandes': 3, 'cat-poissons': 2, 'cat-legumes': 7, 'cat-fruits': 10 };
    const remaining = (shelfLife[categoryId] || 14) - daysSince;
    if (remaining <= 0) return { label: 'Périmé ?', color: 'text-rose-600 bg-rose-50' };
    if (remaining <= 2) return { label: 'À vérifier', color: 'text-amber-600 bg-amber-50' };
    return null;
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent, id: string) => {
    if (touchStartX === null) return;
    if (Math.abs(e.changedTouches[0].clientX - touchStartX) > 60) onTogglePantryItem(id);
    setTouchStartX(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/50 dark:border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20"><Refrigerator className="w-5 h-5" /></div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Mon Frigo & Placard</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">{inStockCount} en stock</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${isScanning ? 'bg-slate-200 text-slate-400' : 'bg-amber-500 text-slate-900 shadow-md'}`}>
              {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              <span>Scanner Ticket</span>
              <input type="file" accept="image/*,application/pdf" onChange={handleScanReceipt} className="hidden" disabled={isScanning} />
            </label>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 transition-colors"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {scanResults && (
          <div className="mx-4 sm:mx-6 mt-4 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-blue-700 font-bold"><FileText className="w-5 h-5" /><span>Scan ({scanResults.length})</span></div>
              <div className="flex gap-2">
                <button onClick={() => setScanResults(null)} className="px-3 py-1.5 rounded-lg text-xs bg-slate-200">Annuler</button>
                <button onClick={handleConfirmScan} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white">Valider</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
              {scanResults.map((res, i) => (
                <div key={i} className={`p-1.5 rounded-xl text-[11px] font-medium border flex items-center gap-2 ${res.matchedIngredientId ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-50 border-rose-200'}`}>
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

        <div className="px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900">
          <button onClick={() => setActiveTab('stock')} className={`px-4 py-2 text-sm font-semibold border-b-2 ${activeTab === 'stock' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}>Stocks</button>
          <button onClick={() => setActiveTab('antiwaste')} className={`px-4 py-2 text-sm font-semibold border-b-2 ${activeTab === 'antiwaste' ? 'border-amber-600 text-amber-600' : 'border-transparent text-slate-500'}`}>Anti-Gaspillage</button>
          <button onClick={handleAskChefAI} className={`px-4 py-2 text-sm font-bold ${isPremium ? 'text-blue-600' : 'text-slate-400'}`}>Chef IA {!isPremium && '🔒'}</button>
        </div>

        <div className="px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
           <label className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold cursor-pointer hover:bg-slate-700">
             <Barcode className="w-4 h-4" />
             <span>Scanner Code-Barres</span>
             <input type="file" accept="image/*" capture="environment" onChange={handleScanBarcodeImage} className="hidden" disabled={isScanning} />
           </label>
           <button onClick={handleSearchByBarcode} className="text-[10px] text-slate-500 underline">Saisir manuellement</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'stock' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Chercher..." className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm" />
                </div>
                <div className="flex gap-1.5 overflow-x-auto">
                  <button onClick={() => setSelectedCategory('all')} className={`px-3 py-1.5 rounded-xl text-xs ${selectedCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>Tous</button>
                  {ingredientCategories.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 ${selectedCategory === cat.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <span>{translateIngredientCategory(cat.id, cat.name)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredIngredients.map(ing => {
                  const isInStock = !!pantryMap[ing.id];
                  const expiry = getExpiryInfo(ing.id, ing.categoryId);
                  return (
                    <button key={ing.id} onClick={() => onTogglePantryItem(ing.id)} onTouchStart={handleTouchStart} onTouchEnd={(e) => handleTouchEnd(e, ing.id)} className={`text-left p-3 rounded-2xl border transition-all flex flex-col gap-1 ${isInStock ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between font-bold text-sm">
                        <span className="truncate">{translateIngredient(ing.id, ing.name)}</span>
                        <div className={`w-4 h-4 rounded-md border ${isInStock ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300'}`}>{isInStock && <Check className="w-3 h-3 text-white" />}</div>
                      </div>
                      {expiry && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${expiry.color}`}>{expiry.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {antiWasteMatches.map(({ recipe, matchPercentage, missingIngredients }) => (
                <div key={recipe.id} className="p-4 rounded-2xl border bg-white dark:bg-slate-800 shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">{translateRecipe(recipe).title}</h3>
                    <span className="text-[10px] font-bold bg-amber-100 px-2 py-0.5 rounded-full">{matchPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${matchPercentage}%` }} /></div>
                  <div className="flex gap-2 mt-2">
                    {onPreviewRecipe && <button onClick={() => onPreviewRecipe(recipe)} className="px-3 py-1 bg-slate-100 text-[10px] rounded-lg">Voir</button>}
                    {onSelectRecipeForMeal && <button onClick={() => { onSelectRecipeForMeal(recipe); onClose(); }} className="flex-1 py-1 bg-emerald-600 text-white text-[10px] rounded-lg">Ajouter</button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <p className="text-xs text-slate-500">{inStockCount} ingrédients en stock.</p>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold">Fermer</button>
        </div>
      </div>
    </div>
  );
};
