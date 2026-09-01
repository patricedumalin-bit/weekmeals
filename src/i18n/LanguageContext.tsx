import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  translations, 
  TranslationKey, 
  LanguageInfo 
} from './translations';
import { getLocalizedIngredientName } from './ingredientTranslations';
import { getLocalizedRecipeContent, LocalizedRecipeContent } from './recipeTranslations';
import { Recipe } from '../types';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: LanguageInfo[];
  currentLanguageInfo: LanguageInfo;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  translateMealLabel: (arg1?: number | string, arg2?: string | number) => string;
  translateUnit: (unit: string) => string;
  translateIngredientCategory: (catId: string, fallbackName?: string) => string;
  translateRecipeCategory: (catId: string, fallbackName?: string) => string;
  translateCookingMode: (mode?: string) => string;
  translateDifficulty: (difficulty: string) => string;
  translateIngredient: (ingredientId: string, fallbackName?: string) => string;
  translateRecipe: (recipe: Recipe | { id: string; title: string; description?: string; instructions?: string[]; tags?: string[] }) => LocalizedRecipeContent;
}

const LANGUAGE_STORAGE_KEY = 'meal_app_language_v1';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && ['en', 'de', 'fr', 'es', 'pt'].includes(saved)) {
        return saved as SupportedLanguage;
      }
      // Browser language check
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (['en', 'de', 'fr', 'es', 'pt'].includes(browserLang)) {
        return browserLang as SupportedLanguage;
      }
    } catch {
      // Fallback
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Could not save language preference', e);
    }
  };

  const currentLanguageInfo = 
    SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const langDict = translations[language] || translations.en;
    let text = (langDict as any)[key] || (translations.en as any)[key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
      });
    }

    return text;
  };

  // Generic helper for meal slot labels like "Meal 1", "Mahlzeit 1", "Repas 1"
  const translateMealLabel = (arg1?: number | string, arg2?: string | number): string => {
    let mealNumber = 1;
    let customLabel: string | undefined;

    if (typeof arg1 === 'number') {
      mealNumber = arg1;
      if (typeof arg2 === 'string') customLabel = arg2;
    } else if (typeof arg1 === 'string') {
      customLabel = arg1;
      if (typeof arg2 === 'number') mealNumber = arg2;
    } else if (typeof arg2 === 'number') {
      mealNumber = arg2;
    }

    if (!customLabel || customLabel.trim() === '') {
      return t('mealDefaultName', { number: mealNumber });
    }

    // If label is a generic default format from any language like "Meal X", "Repas X", "Mahlzeit X", "Comida X", "Refeição X"
    const genericPattern = /^(Meal|Repas|Mahlzeit|Comida|Refeição)\s*#?\s*(\d+)$/i;
    const match = customLabel.match(genericPattern);
    if (match) {
      const num = parseInt(match[2], 10) || mealNumber;
      return t('mealDefaultName', { number: num });
    }

    // Also check if day-based labels like "Monday Lunch" or "Jour 1" exist from previous versions and replace them cleanly
    const dayPattern = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Lunes|Martes|Miércoles|Miercoles|Jueves|Viernes|Sábado|Sabado|Domingo|Segunda|Terça|Terca|Quarta|Quinta|Sexta|Sábado|Domingo)\s*(Dinner|Lunch|Breakfast|Dejeuner|Dîner|Abendessen|Mittagessen|Almuerzo|Cena|Jantar|Almoço)?/i;
    if (dayPattern.test(customLabel)) {
      return t('mealDefaultName', { number: mealNumber });
    }

    return customLabel;
  };

  const translateUnit = (unit: string): string => {
    const unitKey = `unit_${unit.toLowerCase()}` as TranslationKey;
    const langDict = translations[language] || translations.en;
    if (unitKey in langDict) {
      return (langDict as any)[unitKey];
    }
    return unit;
  };

  const translateIngredientCategory = (catId: string, fallbackName?: string): string => {
    const mapping: Record<string, TranslationKey> = {
      'cat-produce': 'cat_produce',
      'cat-meat': 'cat_meat',
      'cat-dairy': 'cat_dairy',
      'cat-bakery': 'cat_bakery',
      'cat-pantry': 'cat_pantry',
      'cat-grains': 'cat_grains',
      'cat-canned': 'cat_canned',
      'cat-oils': 'cat_oils',
      'cat-frozen': 'cat_frozen',
      'cat-baking': 'cat_baking',
    };

    const key = mapping[catId];
    if (key) {
      return t(key);
    }
    return fallbackName || catId;
  };

  const translateRecipeCategory = (catId: string, fallbackName?: string): string => {
    const mapping: Record<string, TranslationKey> = {
      'rcat-entree': 'rcat_entree',
      'rcat-viande': 'rcat_viande',
      'rcat-volaille': 'rcat_volaille',
      'rcat-poisson': 'rcat_poisson',
      'rcat-legume': 'rcat_legume',
      'rcat-pates': 'rcat_pates',
      'rcat-dessert': 'rcat_dessert',
      'rcat-autre': 'rcat_autre',
      // Legacy mapping
      'rcat-starters': 'rcat_entree',
      'rcat-poultry': 'rcat_viande',
      'rcat-seafood': 'rcat_poisson',
      'rcat-pasta': 'rcat_pates',
      'rcat-veggie': 'rcat_legume',
      'rcat-quick': 'rcat_autre',
      'rcat-sides': 'rcat_legume',
      'rcat-desserts': 'rcat_dessert',
    };

    const key = mapping[catId];
    if (key) {
      return t(key);
    }
    return fallbackName || catId;
  };

  const translateCookingMode = (mode?: string): string => {
    if (!mode || mode === 'all') return t('cookingMode_all');
    const mapping: Record<string, TranslationKey> = {
      'four': 'cookingMode_four',
      'poele': 'cookingMode_poele',
      'cookeo': 'cookingMode_cookeo',
      'robot': 'cookingMode_robot',
      'cocotte': 'cookingMode_cocotte',
      'vapeur': 'cookingMode_vapeur',
      'grill': 'cookingMode_grill',
      'sans-cuisson': 'cookingMode_sansCuisson',
    };
    const key = mapping[mode];
    return key ? t(key) : mode;
  };

  const translateDifficulty = (difficulty: string): string => {
    if (difficulty === 'easy') return t('diffEasy');
    if (difficulty === 'medium') return t('diffMedium');
    if (difficulty === 'hard') return t('diffHard');
    return difficulty;
  };

  const translateIngredient = (ingredientId: string, fallbackName?: string): string => {
    return getLocalizedIngredientName(ingredientId, fallbackName || ingredientId, language);
  };

  const translateRecipe = (
    recipe: Recipe | { id: string; title: string; description?: string; instructions?: string[]; tags?: string[] }
  ): LocalizedRecipeContent => {
    return getLocalizedRecipeContent(recipe, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageInfo,
        t,
        translateMealLabel,
        translateUnit,
        translateIngredientCategory,
        translateRecipeCategory,
        translateCookingMode,
        translateDifficulty,
        translateIngredient,
        translateRecipe,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
