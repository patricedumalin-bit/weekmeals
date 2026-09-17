# Plan d'implémentation - Unification des unités et agrégation intelligente de la liste de courses

Ce plan résout le problème des doublons d'ingrédients dans la liste de courses causés par des unités de mesure différentes (ex: ml vs cuillère à soupe pour la crème). Nous introduisons un moteur de conversion d'unités pour fusionner intelligemment les quantités.

## Proposed Changes

### Moteur de Conversion d'Unités

#### [MODIFY] [calculator.ts](file:///C:/Users/diane/StudioProjects/weekmeals/src/utils/calculator.ts)
- Ajouter une fonction utilitaire `convertUnit(quantity: number, fromUnit: UnitType, toUnit: UnitType): number`.
- Gérer les conversions de volume (ml, cl, l, tbsp, tsp, pinch) et de masse (g, kg).
- Mettre à jour `calculateShoppingList` pour :
  - Utiliser l'identifiant de l'ingrédient (`ingredientId`) comme unique clé d'agrégation (au lieu de `ID_Unité`).
  - Convertir systématiquement les quantités entrantes vers l'unité par défaut (`defaultUnit`) de l'ingrédient de référence.
  - Fusionner les sources de provenance dans une seule ligne consolidée.

## Verification Plan

### Manual Verification
- Créer un plan avec deux recettes utilisant la crème : l'une avec "200ml" et l'autre avec "2 tbsp".
- Vérifier que la liste de courses affiche une seule ligne "Crème" avec le total converti (ex: "230 ml").
- Vérifier que les ingrédients solides (ex: Farine en g et kg) fusionnent également correctement.
