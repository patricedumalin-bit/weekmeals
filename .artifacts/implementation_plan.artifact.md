# Refactoring and Code Cleanup Implementation Plan

Assining the `weekmeals` application code on the `refactor/nettoyage-code` branch by fixing TypeScript compilation errors, removing dead code, optimizing imports, and ensuring a clean build.

## Proposed Changes

### TypeScript & Bug Fixes
- **[MODIFY] [useBilling.ts](file:///C:/Users/diane/StudioProjects/weekmeals/src/hooks/useBilling.ts)**: Fix RevenueCat capacitor SDK imports and configuration property name (`appUserID`).
- **[MODIFY] [useInitialization.ts](file:///C:/Users/diane/StudioProjects/weekmeals/src/hooks/useInitialization.ts)**: Fix state setter usage for recipes.
- **[MODIFY] [schemas.ts](file:///C:/Users/diane/StudioProjects/weekmeals/src/lib/schemas.ts)**: Fix Zod v4 `z.record` syntax (adding valueType argument).
- **[MODIFY] [logger.ts](file:///C:/Users/diane/StudioProjects/weekmeals/src/utils/logger.ts)**: Fix `import.meta.env` typing for Vite.
- **[MODIFY] [main.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/main.tsx)**: Fix `ErrorBoundary` React component typing (`Component<{}, State>`).
- **[MODIFY] [AutoPlanModal.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/components/AutoPlanModal.tsx)**: Fix missing `t` translation function or import.
- **[MODIFY] [NutritionDashboard.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/components/NutritionDashboard.tsx)**: Remove or fix missing `clearHistory` from DataState.
- **[MODIFY] [RecipeCard.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/components/RecipeCard.tsx)**: Fix missing `Plus` icon import from `lucide-react`.
- **[MODIFY] [RecipeImportModal.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/components/RecipeImportModal.tsx)**: Fix missing `ingredientId` in extracted recipe items.
- **[MODIFY] [ShoppingListView.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/components/ShoppingListView.tsx)**: Fix `getIngredientCost` arguments and category sorting/mapping types.
- **[MODIFY] [UserProfileModal.tsx](file:///C:/Users/diane/StudioProjects/weekmeals/src/components/UserProfileModal.tsx)**: Fix missing `AlertCircle` icon import from `lucide-react`.
- **[MODIFY] [cloudSync.ts](file:///C:/Users/diane/StudioProjects/weekmeals/src/utils/cloudSync.ts)**: Fix missing `Ingredient` type import/reference.

## Verification Plan
- Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
- Run `npm run build` (`vite build`) to verify frontend bundle builds successfully.
