# 🚀 Guide de Bascule : IA Serveur (Mode Production)

Ce fichier récapitule la procédure pour passer de l'utilisation des clés API "utilisateurs" à une solution centralisée et payée par l'administrateur lors de la mise sur le marché.

## 1. Pourquoi basculer ?
- **Sécurité** : Vos clés API Groq/Gemini sont cachées sur votre serveur.
- **Expérience Utilisateur** : L'acheteur n'a plus rien à configurer, l'IA fonctionne dès l'achat de l'app.
- **Contrôle des coûts** : Vous pouvez limiter le nombre de scans par utilisateur pour éviter les abus.

---

## 2. Procédure Technique (Côté Application)

Le code est déjà pré-équipé pour cette bascule dans le fichier :
`src/lib/aiService.ts`

### Étapes à suivre :
1. Ouvrez `src/lib/aiService.ts`.
2. Changez la constante `USE_SERVER_PROXY` de `false` à `true`.
3. Renseignez l'URL de votre fonction Firebase dans `SERVER_API_URL`.

---

## 3. Configuration du Serveur (Firebase Functions)

Vous devez créer un dossier `functions/` à la racine de votre projet via la commande `firebase init functions`.

### Dépendances requises :
```bash
npm install firebase-admin firebase-functions @google/generative-ai express cors
```

### Code du serveur (Template prêt à l'emploi) :
Retrouvez le code complet du serveur dans l'artifact généré :
`.artifacts/eac049a8-4040-475e-b90c-0406506ab7cb/firebase_functions_template.artifact.md`

### Sécurisation des clés sur le serveur :
Ne mettez jamais vos clés en dur dans le code du serveur. Utilisez les secrets Firebase :
```bash
firebase functions:secrets:set GEMINI_API_KEY
firebase functions:secrets:set GROQ_API_KEY
```

---

## 4. Quotas et Limites recommandés
Pour protéger votre compte bancaire, implémentez ces limites dans votre Cloud Function :
- **Utilisateurs Gratuits** : 1 scan de recette / jour.
- **Utilisateurs Premium** : 50 scans / mois.
- **Global** : Alerte de budget Google Cloud à 20€.

---

## 5. Rappel des endpoints à créer
Le proxy de l'application s'attend à trouver ces 4 routes sur votre serveur :
- `POST /parse-recipe` : Extraction de texte/URL.
- `POST /parse-recipe-image` : Analyse de photo de recette.
- `POST /parse-receipt` : Analyse de tickets de caisse.
- `POST /parse-barcode` : Extraction de numéro EAN-13.

---
*Document généré le 20/09/2026 pour la mise en production de WeekMeals.*
