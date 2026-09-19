import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Check, 
  Plus, 
  Minus, 
  Maximize, 
  Minimize, 
  Sun, 
  Volume2, 
  CheckCircle2,
  Clock,
  ChefHat,
  ListFilter,
  Mic,
  MicOff
} from 'lucide-react';
import { Recipe, Ingredient, IngredientCategory, UnitType } from '../types';
import { formatQuantity } from '../utils/calculator';
import { useLanguage } from '../i18n/LanguageContext';
import { useDataStore } from '../stores/useDataStore';

interface CookingModeModalProps {
  recipe: Recipe | null;
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  initialServings?: number;
  onClose: () => void;
}

// Pleasant chime sound using Web Audio API
function playAlarmSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + index * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.15 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + index * 0.15);
      osc.stop(ctx.currentTime + index * 0.15 + 0.6);
    });
  } catch (e) {
    console.warn('Audio alarm could not play:', e);
  }
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  ingredients,
  ingredientCategories,
  initialServings,
  onClose
}) => {
  const { translateRecipe, translateIngredient, translateUnit } = useLanguage();
  const { pantryMap, batchSetPantry, addSavings } = useDataStore();

  if (!recipe) return null;

  const localized = translateRecipe(recipe);
  const steps = localized.instructions && localized.instructions.length > 0 
    ? localized.instructions 
    : [localized.description || 'Suivez les instructions de préparation standard pour ce plat.'];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [servings, setServings] = useState<number>(initialServings || recipe.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState<boolean>(false);
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceSupported, setVoiceListeningSupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Timer state
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [timerTotalSeconds, setTimerTotalSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<any>(null);

  // Wake Lock to prevent screen sleep while cooking
  useEffect(() => {
    let wakeLockSentinel: any = null;
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
        } catch (err) {
          console.log('Wake Lock not granted or supported:', err);
        }
      }
    };
    requestWakeLock();

    return () => {
      if (wakeLockSentinel) {
        wakeLockSentinel.release().catch(() => {});
      }
    };
  }, []);

  // Voice Commands Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceListeningSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'fr-FR';

      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log('Voice Command:', command);

        if (command.includes('suivant') || command.includes('suivante')) {
          setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
        } else if (command.includes('précédent') || command.includes('précédente')) {
          setCurrentStepIndex(prev => Math.max(0, prev - 1));
        } else if (command.includes('ingrédient') || command.includes('liste')) {
          setShowIngredientsDrawer(true);
        } else if (command.includes('fermer') || command.includes('masquer')) {
          setShowIngredientsDrawer(false);
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => { if (isListening) recognition.start(); };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      if (isListening) {
        try { recognitionRef.current.start(); } catch (e) {}
      } else {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    }
  }, [isListening]);

  // Timer Tick
  useEffect(() => {
    if (isTimerRunning && timerSecondsLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            playAlarmSound();
            if ('vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 400]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  // Extract duration from instruction text
  const currentStepText = steps[currentStepIndex] || '';
  const detectedMinutes = (() => {
    const match = currentStepText.match(/(\d+)\s*(?:min|minutes|minute)/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    const hourMatch = currentStepText.match(/(\d+)\s*(?:h|heure|heures)/i);
    if (hourMatch && hourMatch[1]) {
      return parseInt(hourMatch[1], 10) * 60;
    }
    return null;
  })();

  const startQuickTimer = (minutes: number) => {
    const totalSec = minutes * 60;
    setTimerTotalSeconds(totalSec);
    setTimerSecondsLeft(totalSec);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    if (timerSecondsLeft === 0) {
      startQuickTimer(5);
    } else {
      setIsTimerRunning(!isTimerRunning);
    }
  };

  const addTimerTime = (minutes: number) => {
    setTimerSecondsLeft(prev => prev + minutes * 60);
    setTimerTotalSeconds(prev => Math.max(prev, timerSecondsLeft + minutes * 60));
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSecondsLeft(0);
    setTimerTotalSeconds(0);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const scaleFactor = servings / (recipe.servings || 4);
  const ingredientMap = new Map<string, Ingredient>(ingredients.map(i => [i.id, i]));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Bar */}
      <div className="px-4 sm:px-8 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-100 truncate max-w-[200px] sm:max-w-md">
                {localized.title}
              </h1>
              {wakeLockActive && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                  <Sun className="w-3 h-3" />
                  Écran actif
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Étape {currentStepIndex + 1} sur {steps.length}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Servings scaler */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-xl text-xs font-semibold">
            <span className="text-slate-400 mr-1 hidden sm:inline">Portions :</span>
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="p-1 hover:text-amber-400 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-5 text-center font-bold text-amber-300">{servings}</span>
            <button
              onClick={() => setServings(Math.min(20, servings + 1))}
              className="p-1 hover:text-amber-400 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle ingredients button */}
          <button
            onClick={() => setShowIngredientsDrawer(!showIngredientsDrawer)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showIngredientsDrawer
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ingrédients</span>
            <span className="text-[10px] bg-slate-700/50 px-1.5 py-0.2 rounded-full">
              {recipe.ingredients.length}
            </span>
          </button>

          {/* Voice Command Toggle */}
          {voiceSupported && (
            <button
              onClick={() => isPremium ? setIsListening(!isListening) : alert("La commande vocale est réservée à la version Full 🔒\nCuisinez sans les mains pour seulement 9,99€/an !")}
              className={`p-2 rounded-xl transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/20'
                  : isPremium
                  ? 'bg-slate-800 text-slate-400 hover:text-white'
                  : 'bg-slate-800/50 text-slate-600 cursor-not-allowed opacity-50'
              }`}
              title={isPremium ? (isListening ? "Désactiver la voix" : "Activer la commande vocale") : "Commande vocale (Premium 🔒)"}
            >
              {isListening ? <Mic className="w-5 h-5" /> : (
                <div className="relative">
                  <MicOff className="w-5 h-5" />
                  {!isPremium && <span className="absolute -top-1 -right-1 text-[10px]">🔒</span>}
                </div>
              )}
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors hidden sm:block"
            title="Plein écran"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Close Cooking Mode */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-800 h-1.5">
        <div 
          className="bg-amber-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Main Cooking Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Step Area */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 max-w-4xl mx-auto w-full overflow-y-auto">
          
          <div className="space-y-6 my-auto">
            {/* Step badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Étape {currentStepIndex + 1} / {steps.length}
            </div>

            {/* Step Instruction with High Legibility */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-50 leading-relaxed sm:leading-relaxed">
              {currentStepText}
            </h2>

            {/* Auto-detected timer prompt if minutes mentioned */}
            {detectedMinutes && (
              <div className="pt-2">
                <button
                  onClick={() => startQuickTimer(detectedMinutes)}
                  className="px-4 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-sm font-semibold flex items-center gap-2.5 transition-all shadow-lg shadow-amber-500/10"
                >
                  <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Lancer le minuteur de cette étape ({detectedMinutes} min)</span>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Controls Bar */}
          <div className="pt-8 pb-4 flex items-center justify-between gap-4 border-t border-slate-800/80">
            <button
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all ${
                currentStepIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-slate-500 bg-slate-900'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Précédent</span>
            </button>

            {/* Quick Step Indicators */}
            <div className="hidden sm:flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'bg-amber-500 scale-125'
                      : idx < currentStepIndex
                      ? 'bg-amber-500/50'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>

            {currentStepIndex < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                className="px-6 py-3 rounded-2xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <span>Étape Suivante</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  playAlarmSound();

                  // Sortie de placard automatique
                  const recipeIngredientIds = recipe.ingredients.map(i => i.ingredientId);
                  const inPantryUsed = recipeIngredientIds.filter(id => pantryMap[id]);

                  if (inPantryUsed.length > 0) {
                    if (confirm(`Bravo ! Voulez-vous retirer les ${inPantryUsed.length} ingrédients utilisés de votre stock (placard/frigo) ?`)) {
                      const newPantry = { ...pantryMap };
                      inPantryUsed.forEach(id => {
                        newPantry[id] = false;
                      });
                      batchSetPantry(newPantry);

                      // Calcul des économies (estimation : 1.5€ par ingrédient sauvé)
                      addSavings(inPantryUsed.length * 1.5);
                    }
                  } else {
                    alert('Félicitations ! Votre plat est prêt à être dégusté ! 🍽️ Bon appétit !');
                  }

                  onClose();
                }}
                className="px-6 py-3 rounded-2xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Check className="w-5 h-5" />
                <span>Terminer la Recette</span>
              </button>
            )}
          </div>
        </div>

        {/* Side Drawer: Scaled Ingredients Checklist */}
        {showIngredientsDrawer && (
          <div className="w-full sm:w-80 md:w-96 bg-slate-900 border-l border-slate-800 flex flex-col p-4 sm:p-5 overflow-hidden z-20 absolute sm:relative inset-y-0 right-0 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-sm text-slate-100">Ingrédients ({servings} pers.)</h3>
                <p className="text-xs text-slate-400">Cochez au fur et à mesure que vous préparez</p>
              </div>
              <button
                onClick={() => setShowIngredientsDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2">
              {recipe.ingredients.map((item, idx) => {
                const ing = ingredientMap.get(item.ingredientId);
                const isChecked = !!checkedIngredients[item.ingredientId || idx.toString()];
                const scaledQty = item.quantity * scaleFactor;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCheckedIngredients(prev => ({
                      ...prev,
                      [item.ingredientId || idx.toString()]: !isChecked
                    }))}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isChecked
                        ? 'bg-slate-950/60 border-slate-800 text-slate-500 line-through'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-200 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">
                        {translateIngredient(item.ingredientId, ing?.name || 'Ingrédient')}
                      </p>
                      {item.notes && <p className="text-[10px] text-slate-400 truncate">{item.notes}</p>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-amber-300">
                        {formatQuantity(scaledQty)} {translateUnit(item.unit)}
                      </span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-600 bg-slate-900'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Kitchen Timer Bar */}
      <div className="px-4 sm:px-8 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
            isTimerRunning
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            <Timer className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400 tracking-wider">
                {formatTimer(timerSecondsLeft)}
              </span>
              {timerTotalSeconds > 0 && isTimerRunning && (
                <span className="text-xs text-slate-500">
                  / {formatTimer(timerTotalSeconds)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              {timerSecondsLeft === 0 ? 'Minuteur inactif' : isTimerRunning ? 'En cours...' : 'En pause'}
            </p>
          </div>
        </div>

        {/* Timer Action Buttons */}
        <div className="flex items-center gap-2">
          {timerSecondsLeft > 0 ? (
            <>
              <button
                onClick={toggleTimer}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-all font-bold"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTimerRunning ? 'Pause' : 'Reprendre'}</span>
              </button>

              <button
                onClick={() => addTimerTime(1)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                +1 min
              </button>
              <button
                onClick={() => addTimerTime(5)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                +5 min
              </button>

              <button
                onClick={resetTimer}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700"
                title="Réinitialiser"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => startQuickTimer(3)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                3 min
              </button>
              <button
                onClick={() => startQuickTimer(5)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                5 min
              </button>
              <button
                onClick={() => startQuickTimer(10)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                10 min
              </button>
              <button
                onClick={() => startQuickTimer(15)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                15 min
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
