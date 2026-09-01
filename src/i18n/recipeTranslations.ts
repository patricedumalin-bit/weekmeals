import { SupportedLanguage } from './translations';
import { Recipe } from '../types';
import { FRANCE_RECIPE_TRANSLATIONS } from './recipes/france';
import { ITALY_RECIPE_TRANSLATIONS } from './recipes/italy';
import { ENGLAND_RECIPE_TRANSLATIONS } from './recipes/england';
import { GERMANY_RECIPE_TRANSLATIONS } from './recipes/germany';
import { SPAIN_RECIPE_TRANSLATIONS } from './recipes/spain';
import { PORTUGAL_RECIPE_TRANSLATIONS } from './recipes/portugal';

export interface LocalizedRecipeContent {
  title: string;
  description: string;
  instructions: string[];
  tags: string[];
}

export const RECIPE_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedRecipeContent>> = {
  ...FRANCE_RECIPE_TRANSLATIONS,
  ...ITALY_RECIPE_TRANSLATIONS,
  ...ENGLAND_RECIPE_TRANSLATIONS,
  ...GERMANY_RECIPE_TRANSLATIONS,
  ...SPAIN_RECIPE_TRANSLATIONS,
  ...PORTUGAL_RECIPE_TRANSLATIONS,
};

/**
 * Returns localized recipe title, description, instructions, and tags.
 * Falls back to recipe's original content if translation is missing.
 */
export function getLocalizedRecipeContent(
  recipe: Recipe | { id: string; title: string; description?: string; instructions?: string[]; tags?: string[] },
  language: SupportedLanguage
): LocalizedRecipeContent {
  const translations = RECIPE_TRANSLATIONS[recipe.id];
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
