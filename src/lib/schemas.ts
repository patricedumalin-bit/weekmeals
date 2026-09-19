import { z } from 'zod';

export const UnitTypeSchema = z.enum([
  'g', 'kg', 'ml', 'cl', 'l', 'tbsp', 'tsp', 'unit', 'clove', 'pinch', 'can', 'pack', 'bunch', 'slice'
]).catch('unit');

export const DifficultySchema = z.enum(['easy', 'medium', 'hard']).catch('easy');

export const RecipeIngredientSchema = z.object({
  name: z.string(),
  quantity: z.preprocess((val) => {
    if (typeof val === 'string') return parseFloat(val.replace(',', '.')) || 1;
    if (typeof val === 'number') return val;
    return 1;
  }, z.number().default(1)),
  unit: UnitTypeSchema,
  localizations: z.record(z.string()).optional(),
});

export const RecipeSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  servings: z.coerce.number().default(4),
  prepTimeMinutes: z.coerce.number().default(15),
  cookTimeMinutes: z.coerce.number().default(20),
  difficulty: DifficultySchema,
  description: z.string().optional().default("Recette importée par IA"),
  ingredients: z.array(RecipeIngredientSchema).min(1, "Au moins un ingrédient est requis"),
  instructions: z.array(z.string()).min(1, "Au moins une étape est requise"),
  localizations: z.record(z.object({
    title: z.string(),
    description: z.string(),
    instructions: z.array(z.string())
  })).optional(),
});

export type AIRecipeResponse = z.infer<typeof RecipeSchema>;

export const ReceiptItemSchema = z.object({
  name: z.string(),
  quantity: z.preprocess((val) => {
    if (typeof val === 'string') return parseFloat(val.replace(',', '.')) || 1;
    if (typeof val === 'number') return val;
    return 1;
  }, z.number().default(1)),
  unit: UnitTypeSchema,
});

export const ReceiptSchema = z.object({
  items: z.array(ReceiptItemSchema),
});

export type AIReceiptResponse = z.infer<typeof ReceiptSchema>;
