import { describe, it, expect } from 'vitest';
import { formatQuantity, inferCookingMode, getUnitFamily } from './calculator';
import { Recipe } from '../types';

describe('calculator utils', () => {
  describe('formatQuantity', () => {
    it('should format integers correctly', () => {
      expect(formatQuantity(5)).toBe('5');
      expect(formatQuantity(100)).toBe('100');
    });

    it('should format common fractions', () => {
      expect(formatQuantity(0.5)).toBe('½');
      expect(formatQuantity(1.5)).toBe('1 ½');
      expect(formatQuantity(0.25)).toBe('¼');
      expect(formatQuantity(0.75)).toBe('¾');
      expect(formatQuantity(0.33)).toBe('⅓');
    });

    it('should format decimals if no common fraction matched', () => {
      expect(formatQuantity(0.123)).toBe('0.1');
      expect(formatQuantity(1.1)).toBe('1.1');
    });
  });

  describe('inferCookingMode', () => {
    it('should return explicit cooking mode if present', () => {
      const recipe: any = { cookingMode: 'vapeur', title: 'Test', instructions: [] };
      expect(inferCookingMode(recipe)).toBe('vapeur');
    });

    it('should infer "four" from title or instructions', () => {
      const recipe: any = { title: 'Gratin de pâtes', instructions: ['Préchauffer le four'] };
      expect(inferCookingMode(recipe)).toBe('four');
    });

    it('should infer "poele" from title or instructions', () => {
      const recipe: any = { title: 'Saumon sauté', instructions: ['Faire cuire à la poêle'] };
      expect(inferCookingMode(recipe)).toBe('poele');
    });
  });

  describe('getUnitFamily', () => {
    it('should identify mass units', () => {
      expect(getUnitFamily('g')).toBe('mass');
      expect(getUnitFamily('kg')).toBe('mass');
    });

    it('should identify volume units', () => {
      expect(getUnitFamily('ml')).toBe('volume');
      expect(getUnitFamily('l')).toBe('volume');
      expect(getUnitFamily('tbsp')).toBe('volume');
    });

    it('should default to count', () => {
      expect(getUnitFamily('unit')).toBe('count');
      expect(getUnitFamily('pinch')).toBe('count');
    });
  });
});
