# Amélioration 5 : Mise en place d'une Suite de Tests

L'objectif est d'assurer la stabilité de l'application sur le long terme. Nous allons installer un framework de tests moderne (Vitest) et écrire des tests unitaires pour les calculs critiques (liste de courses, budget) qui sont le cœur métier de WeekMeals.

## User Review Required

> [!NOTE]
> Nous utilisons **Vitest** car il est extrêmement rapide et s'intègre parfaitement avec Vite, ton outil de build actuel.

## Proposed Changes

### 1. Installation de l'Infrastructure de Test
Ajout des outils nécessaires au développement.

#### [MODIFY] [package.json](file:///C:/Users/Patrice/AndroidStudioProjects/weekmeals/package.json)
- Ajout de `vitest`, `@testing-library/react`, `jsdom`.
- Ajout d'un script `"test": "vitest"`.

#### [MODIFY] [vite.config.ts](file:///C:/Users/Patrice/AndroidStudioProjects/weekmeals/vite.config.ts)
- Configuration de l'environnement de test `jsdom`.

---

### 2. Tests Unitaires du Cœur Métier
Sécurisation des fonctions de calcul.

#### [NEW] [calculator.test.ts](file:///C:/Users/Patrice/AndroidStudioProjects/weekmeals/src/utils/calculator.test.ts)
- Test de `calculateShoppingList` : vérifier que les quantités s'additionnent correctement.
- Test de `getIngredientCost` : vérifier que le budget calculé est cohérent.
- Test de `formatQuantity` : vérifier l'affichage des unités (g, kg, etc.).

---

### 3. Tests de Validation de Schéma (Zod)
Vérification de la robustesse de l'IA.

#### [NEW] [schemas.test.ts](file:///C:/Users/Patrice/AndroidStudioProjects/weekmeals/src/lib/schemas.test.ts)
- Vérifier que les recettes malformées sont bien rejetées.
- Vérifier que les valeurs par défaut sont correctement appliquées.

---

### 4. (Optionnel) Observabilité
Préparation à la mise en production.

#### [NEW] [logger.ts](file:///C:/Users/Patrice/AndroidStudioProjects/weekmeals/src/utils/logger.ts)
- Centralisation des logs d'erreurs (utile pour une future intégration Sentry).

## Verification Plan

### Automated Tests
- Exécuter `npm run test` et vérifier que tous les tests passent (vert).

### Manual Verification
1. Modifier volontairement une fonction dans `calculator.ts` (ex: changer un taux de conversion).
2. Vérifier que le test correspondant échoue (rouge).
3. Revenir en arrière et vérifier que tout redevient vert.
