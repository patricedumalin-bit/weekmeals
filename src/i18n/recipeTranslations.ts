import { SupportedLanguage } from './translations';
import { Recipe } from '../types';

export interface LocalizedRecipeContent {
  title: string;
  description: string;
  instructions: string[];
  tags: string[];
}

type RecipeTranslationsMap = Record<string, Record<SupportedLanguage, LocalizedRecipeContent>>;

// Recipe-specific translations (~2600 recipes x 5 languages) are the single
// heaviest chunk of the app. They are loaded lazily via dynamic import instead
// of a top-level static import, so the initial bundle stays small and this
// data only downloads in the background after first paint. Until it resolves,
// getLocalizedRecipeContent() gracefully falls back to the recipe's own
// (untranslated) fields, exactly as it already does for any recipe/language
// combination missing a translation entry.
let cache: RecipeTranslationsMap = {};
let loadPromise: Promise<void> | null = null;

export function loadRecipeTranslations(): Promise<void> {
  if (!loadPromise) {
    loadPromise = Promise.all([
      import('./recipes/france'),
      import('./recipes/italy'),
      import('./recipes/england'),
      import('./recipes/germany'),
      import('./recipes/spain'),
      import('./recipes/portugal'),
      import('./recipes/franceExtra1'),
      import('./recipes/franceExtra2'),
      import('./recipes/franceExtra3'),
      import('./recipes/franceExtra4'),
      import('./recipes/franceExtra5'),
      import('./recipes/franceExtra6'),
      import('./recipes/miscExtra'),
    ]).then(([
      france,
      italy,
      england,
      germany,
      spain,
      portugal,
      franceExtra1,
      franceExtra2,
      franceExtra3,
      franceExtra4,
      franceExtra5,
      franceExtra6,
      miscExtra
    ]) => {
      cache = {
        ...france.FRANCE_RECIPE_TRANSLATIONS,
        ...italy.ITALY_RECIPE_TRANSLATIONS,
        ...england.ENGLAND_RECIPE_TRANSLATIONS,
        ...germany.GERMANY_RECIPE_TRANSLATIONS,
        ...spain.SPAIN_RECIPE_TRANSLATIONS,
        ...portugal.PORTUGAL_RECIPE_TRANSLATIONS,
        ...franceExtra1.FRANCE_RECIPE_TRANSLATIONS_EXTRA1,
        ...franceExtra2.FRANCE_RECIPE_TRANSLATIONS_EXTRA2,
        ...franceExtra3.FRANCE_RECIPE_TRANSLATIONS_EXTRA3,
        ...franceExtra4.FRANCE_RECIPE_TRANSLATIONS_EXTRA4,
        ...franceExtra5.FRANCE_RECIPE_TRANSLATIONS_EXTRA5,
        ...franceExtra6.FRANCE_RECIPE_TRANSLATIONS_EXTRA6,
        ...miscExtra.MISC_RECIPE_TRANSLATIONS_EXTRA,
      };
    });
  }
  return loadPromise;
}

/**
 * Returns localized recipe title, description, instructions, and tags.
 * Falls back to recipe's original content if translation is missing, or if
 * the translation data hasn't finished loading yet (see loadRecipeTranslations).
 */
export function getLocalizedRecipeContent(
  recipe: any,
  language: SupportedLanguage
): LocalizedRecipeContent {
  // If the recipe contains custom runtime localizations embedded directly (e.g. AI-imported multilingual recipes)
  if (recipe && recipe.localizations && recipe.localizations[language]) {
    return {
      title: recipe.localizations[language].title || recipe.title,
      description: recipe.localizations[language].description || recipe.description || '',
      instructions: recipe.localizations[language].instructions || recipe.instructions || [],
      tags: recipe.tags || []
    };
  }

  const translations = cache[recipe.id];
  if (translations && translations[language]) {
    return translations[language];
  }
  if (translations && translations['en']) {
    return translations['en'];
  }
  return {
    title: recipe.title,
    description: recipe.description || '',
    instructions: recipe.instructions || [],
    tags: recipe.tags || []
  };
}
