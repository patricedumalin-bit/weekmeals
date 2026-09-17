import { Recipe } from '../types';

/**
 * Master dictionary of cuisines/countries that can appear across the recipe
 * database. Each entry lists every lowercase tag variant used in the data
 * (e.g. both the country name and the nationality adjective) so recipes are
 * matched no matter which form was used when the recipe was authored.
 */
export interface CuisineDefinition {
  id: string;
  label: string;
  flag: string;
  tagMatches: string[];
}

export const CUISINES: CuisineDefinition[] = [
  { id: 'France', label: 'France', flag: '🇫🇷', tagMatches: ['france', 'french'] },
  { id: 'Italy', label: 'Italy', flag: '🇮🇹', tagMatches: ['italy', 'italian', 'tuscan', 'roman'] },
  { id: 'England', label: 'England / UK', flag: '🇬🇧', tagMatches: ['england', 'british', 'english'] },
  { id: 'Germany', label: 'Germany', flag: '🇩🇪', tagMatches: ['germany', 'german', 'swabian', 'black forest'] },
  { id: 'Spain', label: 'Spain', flag: '🇪🇸', tagMatches: ['spain', 'spanish'] },
  { id: 'Portugal', label: 'Portugal', flag: '🇵🇹', tagMatches: ['portugal', 'portuguese', 'alentejo'] },
  { id: 'UnitedStates', label: 'United States', flag: '🇺🇸', tagMatches: ['united states', 'texas', 'southwestern', 'louisiana', 'southern u.s.', 'midwestern u.s.', 'californian', 'cajun'] },
  { id: 'Canada', label: 'Canada', flag: '🇨🇦', tagMatches: ['canadian'] },
  { id: 'Mexico', label: 'Mexico', flag: '🇲🇽', tagMatches: ['mexican'] },
  { id: 'India', label: 'India', flag: '🇮🇳', tagMatches: ['indian', 'punjabi', 'sindhi', 'bengali'] },
  { id: 'Vietnam', label: 'Vietnam', flag: '🇻🇳', tagMatches: ['vietnam', 'vietnamese'] },
  { id: 'China', label: 'China', flag: '🇨🇳', tagMatches: ['china', 'chinese'] },
  { id: 'Japan', label: 'Japan', flag: '🇯🇵', tagMatches: ['japan', 'japanese'] },
  { id: 'Thailand', label: 'Thailand', flag: '🇹🇭', tagMatches: ['thailand', 'thai'] },
  { id: 'Korea', label: 'Korea', flag: '🇰🇷', tagMatches: ['korea', 'korean'] },
  { id: 'Indonesia', label: 'Indonesia', flag: '🇮🇩', tagMatches: ['indonesia', 'indonesian'] },
  { id: 'Malaysia', label: 'Malaysia', flag: '🇲🇾', tagMatches: ['malaysia', 'malaysian'] },
  { id: 'Philippines', label: 'Philippines', flag: '🇵🇭', tagMatches: ['philippines', 'filipino'] },
  { id: 'Nepal', label: 'Nepal', flag: '🇳🇵', tagMatches: ['nepal', 'nepali'] },
  { id: 'Pakistan', label: 'Pakistan', flag: '🇵🇰', tagMatches: ['pakistan', 'pakistani'] },
  { id: 'Bangladesh', label: 'Bangladesh', flag: '🇧🇩', tagMatches: ['bangladesh', 'sylheti'] },
  { id: 'Tibet', label: 'Tibet', flag: '🏔️', tagMatches: ['tibet', 'tibetan'] },
  { id: 'Greece', label: 'Greece', flag: '🇬🇷', tagMatches: ['greece', 'greek'] },
  { id: 'Israel', label: 'Israel', flag: '🇮🇱', tagMatches: ['israel', 'israeli', 'jewish'] },
  { id: 'Iran', label: 'Iran', flag: '🇮🇷', tagMatches: ['iran', 'iranian'] },
  { id: 'Russia', label: 'Russia', flag: '🇷🇺', tagMatches: ['russia', 'russian'] },
  { id: 'Ukraine', label: 'Ukraine', flag: '🇺🇦', tagMatches: ['ukraine', 'ukrainian'] },
  { id: 'Poland', label: 'Poland', flag: '🇵🇱', tagMatches: ['poland', 'polish'] },
  { id: 'Romania', label: 'Romania', flag: '🇷🇴', tagMatches: ['romania', 'romanian'] },
  { id: 'Croatia', label: 'Croatia', flag: '🇭🇷', tagMatches: ['croatia', 'croatian'] },
  { id: 'Austria', label: 'Austria', flag: '🇦🇹', tagMatches: ['austria', 'austrian'] },
  { id: 'Sweden', label: 'Sweden', flag: '🇸🇪', tagMatches: ['sweden', 'swedish'] },
  { id: 'Netherlands', label: 'Netherlands', flag: '🇳🇱', tagMatches: ['netherlands', 'dutch'] },
  { id: 'Egypt', label: 'Egypt', flag: '🇪🇬', tagMatches: ['egypt', 'egyptian'] },
  { id: 'Ethiopia', label: 'Ethiopia', flag: '🇪🇹', tagMatches: ['ethiopia', 'ethiopian'] },
  { id: 'Libya', label: 'Libya', flag: '🇱🇾', tagMatches: ['libya', 'libyan'] },
  { id: 'Algeria', label: 'Algeria', flag: '🇩🇿', tagMatches: ['algeria', 'algerian'] },
  { id: 'Gambia', label: 'Gambia', flag: '🇬🇲', tagMatches: ['gambia', 'gambian'] },
  { id: 'Senegal', label: 'Senegal', flag: '🇸🇳', tagMatches: ['senegal', 'senegalese'] },
  { id: 'Nigeria', label: 'Nigeria', flag: '🇳🇬', tagMatches: ['nigeria', 'nigerian', 'yoruba', 'igbo', 'hausa', 'efik', 'national nigerian'] },
  { id: 'Uganda', label: 'Uganda', flag: '🇺🇬', tagMatches: ['uganda', 'ugandan'] },
  { id: 'Togo', label: 'Togo', flag: '🇹🇬', tagMatches: ['togo', 'togolese'] },
  { id: 'Liberia', label: 'Liberia', flag: '🇱🇷', tagMatches: ['liberia', 'liberian'] },
  { id: 'Rwanda', label: 'Rwanda', flag: '🇷🇼', tagMatches: ['rwanda', 'rwandan'] },
  { id: 'Zambia', label: 'Zambia', flag: '🇿🇲', tagMatches: ['zambia', 'zambian'] },
  { id: 'Tanzania', label: 'Tanzania', flag: '🇹🇿', tagMatches: ['tanzania', 'tanzanian'] },
  { id: 'Cameroon', label: 'Cameroon', flag: '🇨🇲', tagMatches: ['cameroon', 'cameroonian'] },
  { id: 'Chad', label: 'Chad', flag: '🇹🇩', tagMatches: ['chad', 'chadian'] },
  { id: 'SouthAfrica', label: 'South Africa', flag: '🇿🇦', tagMatches: ['south africa', 'south african'] },
  { id: 'CapeVerde', label: 'Cape Verde', flag: '🇨🇻', tagMatches: ['cape verde', 'cape verdean'] },
  { id: 'Argentina', label: 'Argentina', flag: '🇦🇷', tagMatches: ['argentina', 'argentine'] },
  { id: 'Colombia', label: 'Colombia', flag: '🇨🇴', tagMatches: ['colombia', 'colombian'] },
  { id: 'Venezuela', label: 'Venezuela', flag: '🇻🇪', tagMatches: ['venezuela', 'venezuelan'] },
  { id: 'Cuba', label: 'Cuba', flag: '🇨🇺', tagMatches: ['cuba', 'cuban'] },
  { id: 'Jamaica', label: 'Jamaica', flag: '🇯🇲', tagMatches: ['jamaica', 'jamaican'] },
  { id: 'PuertoRico', label: 'Puerto Rico', flag: '🇵🇷', tagMatches: ['puerto rico', 'puerto rican'] },
  { id: 'Suriname', label: 'Suriname', flag: '🇸🇷', tagMatches: ['suriname', 'surinamese'] },
  { id: 'Gibraltar', label: 'Gibraltar', flag: '🇬🇮', tagMatches: ['gibraltar', 'gibraltarian'] },
  { id: 'Africa', label: 'Africa (other)', flag: '🌍', tagMatches: ['african', 'african cuisines'] },
  { id: 'Asia', label: 'Asia (other)', flag: '🌏', tagMatches: ['asian', 'east asian', 'south asian'] },
  { id: 'Caribbean', label: 'Caribbean', flag: '🏝️', tagMatches: ['caribbean'] },
  { id: 'Mediterranean', label: 'Mediterranean', flag: '🌊', tagMatches: ['mediterranean'] },
  { id: 'MiddleEast', label: 'Middle East', flag: '🕌', tagMatches: ['middle eastern'] },
  { id: 'SouthAmerica', label: 'South America (other)', flag: '🌎', tagMatches: ['south american'] },
];

/**
 * Returns true if the given recipe's tags match the provided cuisine id.
 * `cuisineId === 'all'` always matches.
 */
export function recipeMatchesCuisine(recipe: Recipe, cuisineId: string): boolean {
  if (cuisineId === 'all') return true;
  const cuisine = CUISINES.find(c => c.id === cuisineId);
  if (!cuisine) return false;
  const lowerTags = recipe.tags.map(t => t.toLowerCase());
  return cuisine.tagMatches.some(match => lowerTags.includes(match));
}

/**
 * Computes the list of cuisines actually present in the given recipes,
 * sorted by number of matching recipes (descending), so the dropdown only
 * ever shows options that return results.
 */
export function getAvailableCuisines(recipes: Recipe[]): (CuisineDefinition & { count: number })[] {
  const withCounts = CUISINES.map(c => ({
    ...c,
    count: recipes.reduce((acc, r) => {
      const lowerTags = r.tags.map(t => t.toLowerCase());
      return acc + (c.tagMatches.some(match => lowerTags.includes(match)) ? 1 : 0);
    }, 0),
  }));
  return withCounts.filter(c => c.count > 0).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
