# Plan d'implémentation - Alignement strict des catégories d'ingrédients et de recettes

Ce plan corrige le décalage de clés de catégories entre les définitions système de l'interface et le générateur automatisé des 2000 recettes Cloud, assurant que chaque recette s'associe et se filtre sous la bonne catégorie.

## Proposed Changes

### Recalibrage des Liens de Catégories Cloud

#### [MODIFY] [cloudRecipesMock.ts](file:///C:/Users/diane/StudioProjects/weekmeals/src/data/cloudRecipesMock.ts)
- Modifier les liaisons `cat` dans le tableau `bases` pour utiliser les identifiants de catégories de recettes officiels de l'application :
  - `cat-cereales` -> `rcat-pates`
  - `cat-viandes` -> `rcat-viande`
  - `cat-poissons` -> `rcat-poisson`
  - `cat-legumes` -> `rcat-legume`
  - `cat-fruits` -> `rcat-dessert`

## Verification Plan

### Automated Verification
- Re-vérifier la conformité de type globale pour s'assurer que le catalogue Cloud s'affiche dans les onglets appropriés de l'application.
