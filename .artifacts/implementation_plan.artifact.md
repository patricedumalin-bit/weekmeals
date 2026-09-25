# Implementation Plan - Batch-Cooking Feature (with Smart Ingredient Mutualization)

Design and implementation of the **Batch-Cooking** feature in `weekmeals`, featuring smart recipe selection focused on maximizing ingredient mutualization across weekly meals, plus step-by-step prep session scheduling.

## User Review Required

> [!IMPORTANT]
> The Batch-Cooking auto-planner will select and group recipes that share common base ingredients (e.g. onions, carrots, rice, chicken) to minimize shopping variety, prep time, and food waste, followed by a chronological batch-prep session guide.

## Proposed Changes

### Core Logic & Calculator
- **[NEW] [batchCookingCalculator.ts](file:///C:/Users/diane/StudioProjects/weekmeals/src/utils/batchCookingCalculator.ts)**:
  - Smart recipe selection algorithm prioritizing ingredient overlap/mutualization.
  - Session schedule generator (grouping prep, cooking methods, and storage).
- **[MODIFY] [AutoPlanModal.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/components/AutoPlanModal.tsx)**:
  - Add Batch-Cooking mode toggle ("Mutualisation maximale des ingrédients").
- **[NEW] [BatchCookingModal.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/components/BatchCookingModal.tsx)**:
  - UI modal displaying the batch-cooking prep session guide and ingredient sharing insights.

## Verification Plan

### Automated Tests
- Run unit tests (`npm test`).
- Run TypeScript linting (`npm run lint`).

### Manual Verification
- Test generating a batch-cooking plan in the app and verify ingredient overlap across selected recipes and chronological prep guide.
