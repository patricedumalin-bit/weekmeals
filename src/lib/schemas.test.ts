import { describe, it, expect } from 'vitest';
import { RecipeSchema } from './schemas';

describe('RecipeSchema validation', () => {
  it('should validate a correct recipe', () => {
    const validRecipe = {
      title: 'Pasta Carbonara',
      servings: 4,
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      difficulty: 'easy',
      ingredients: [
        { name: 'Pasta', quantity: 400, unit: 'g' },
        { name: 'Eggs', quantity: 4, unit: 'unit' }
      ],
      instructions: ['Boil water', 'Cook pasta']
    };

    const result = RecipeSchema.safeParse(validRecipe);
    expect(result.success).toBe(true);
  });

  it('should apply default values for missing optional fields', () => {
    const minimalRecipe = {
      title: 'Simple Salad',
      ingredients: [
        { name: 'Lettuce', quantity: 1, unit: 'unit' }
      ],
      instructions: ['Wash and mix']
    };

    const result = RecipeSchema.safeParse(minimalRecipe);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.servings).toBe(4);
      expect(result.data.difficulty).toBe('easy');
      expect(result.data.prepTimeMinutes).toBe(15);
    }
  });

  it('should fail if title is missing', () => {
    const invalidRecipe = {
      ingredients: [{ name: 'Test', quantity: 1, unit: 'unit' }],
      instructions: ['Test']
    };

    const result = RecipeSchema.safeParse(invalidRecipe);
    expect(result.success).toBe(false);
  });

  it('should coerce string quantities to numbers', () => {
    const recipeWithStringQty = {
      title: 'Test Coercion',
      ingredients: [
        { name: 'Salt', quantity: '2,5', unit: 'g' }
      ],
      instructions: ['Test']
    };

    const result = RecipeSchema.safeParse(recipeWithStringQty);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.ingredients[0].quantity).toBe(2.5);
    }
  });

  it('should fallback to default unit if invalid unit is provided', () => {
    const recipeWithInvalidUnit = {
      title: 'Test Unit Fallback',
      ingredients: [
        { name: 'Magic Dust', quantity: 1, unit: 'invalid-unit' as any }
      ],
      instructions: ['Test']
    };

    const result = RecipeSchema.safeParse(recipeWithInvalidUnit);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.ingredients[0].unit).toBe('unit');
    }
  });
});
