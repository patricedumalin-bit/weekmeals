import { Recipe } from '../types';

/**
 * Single generic mechanism used everywhere multiple recipe collections need to
 * be combined into one catalog (per-country sub-files, per-source imports like
 * Wikibooks/cloud mock, and the top-level catalog in initialData.ts).
 *
 * It concatenates every collection in order and keeps only the first
 * occurrence of each recipe id, silently dropping later duplicates. This
 * replaces the previously ad-hoc merge+dedup logic that only existed for the
 * France sub-files (src/data/recipesFrance/index.ts), while every other
 * source was combined with a plain spread and no duplicate protection at all.
 */
export function mergeRecipeCollections(...collections: Recipe[][]): Recipe[] {
  const seenIds = new Set<string>();
  const merged: Recipe[] = [];
  for (const collection of collections) {
    for (const recipe of collection) {
      if (!seenIds.has(recipe.id)) {
        seenIds.add(recipe.id);
        merged.push(recipe);
      }
    }
  }
  return merged;
}
