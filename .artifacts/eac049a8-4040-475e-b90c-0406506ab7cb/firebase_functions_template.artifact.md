# Template de Fonctions Firebase pour l'IA Serveur

Ce document contient le code nécessaire pour migrer vos appels d'IA du téléphone vers votre serveur Firebase sécurisé.

## 📁 Structure recommandée
Dans votre dossier `functions/`, installez les dépendances nécessaires :
`npm install firebase-admin firebase-functions @google/generative-ai express cors`

## 📄 Fichier `functions/index.js` (ou `.ts`)

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// Vos clés API Maîtres (à configurer dans les variables d'environnement Firebase)
// firebase functions:config:set keys.gemini="VOTRE_CLE" keys.groq="VOTRE_CLE"
const GEMINI_API_KEY = functions.config().keys.gemini;
const GROQ_API_KEY = functions.config().keys.groq;

/**
 * Sécurité : Vérifie que l'utilisateur est bien connecté à votre App
 */
const validateFirebaseIdToken = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
  } catch (error) {
    res.status(403).send('Unauthorized');
  }
};

// Activer la validation pour toutes les routes IA
app.use(validateFirebaseIdToken);

/**
 * Route : Parser une Recette
 */
app.post('/parse-recipe', async (req, res) => {
  const { content, options } = req.body;
  const uid = req.user.uid;

  try {
    // 1. Vérification du Quota dans Firestore
    const userRef = admin.firestore().doc(`users/${uid}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data() || {};

    const isPremium = userData.subscriptionStatus === 'premium';
    const currentUsage = userData.aiUsage || 0;
    const limit = isPremium ? 100 : 3; // Exemple de limites

    if (currentUsage >= limit) {
      return res.status(429).json({ message: 'Limite de quota IA atteinte pour ce mois.' });
    }

    // 2. Appel à l'IA (Logique identique à aiService.ts)
    // ...
    const result = { /* ... */ };

    // 3. Incrémenter l'usage après succès
    await userRef.set({ aiUsage: admin.firestore.FieldValue.increment(1) }, { merge: true });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Route : Scanner un Ticket (Vision)
 */
app.post('/parse-receipt', async (req, res) => {
    // Logique identique à aiService.ts
});

exports.api = functions.https.onRequest(app);
```

## 🔒 Pourquoi faire cela lors de la mise sur le marché ?

1. **Masquage des clés** : Vos clés API Groq/Gemini ne sont plus jamais visibles.
2. **Contrôle des coûts** : Vous pouvez limiter le nombre d'appels par utilisateur (ex: 50 par mois pour les Premium, 3 pour les gratuits).
3. **Mise à jour instantanée** : Si vous voulez changer de modèle d'IA, vous le faites sur le serveur sans demander à l'utilisateur de mettre à jour son application Android.
4. **Sécurité contre le vol** : Personne ne pourra utiliser votre quota pour son propre projet.
