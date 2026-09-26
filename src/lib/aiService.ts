import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecipeSchema, AIRecipeResponse, AIReceiptResponse, ReceiptSchema } from "./schemas";

export type AIProvider = 'groq' | 'gemini';

// TOGGLE THIS TO TRUE WHEN READY TO SWITCH TO SERVER-SIDE IA
const USE_SERVER_PROXY = false;
const SERVER_API_URL = 'https://your-firebase-region-project.cloudfunctions.net/api';

export interface AIServiceOptions {
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

const RECIPE_PROMPT_TEMPLATE = (content: string) => `Tu es un assistant culinaire expert et traducteur multilingue professionnel.
Analyse le contenu suivant pour en extraire une recette structurée.
Tu dois OBLIGATOIREMENT générer les traductions de cette recette pour TOUTES les langues suivantes : fr, en, de, es, pt.

IMPORTANT : Tu dois répondre UNIQUEMENT sous la forme d'un objet JSON valide (SANS aucun texte avant ou après).

Structure JSON attendue :
{
  "title": "Nom de la recette en français",
  "servings": 4,
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 20,
  "difficulty": "easy",
  "description": "Brève description en français",
  "ingredients": [
    {
      "name": "nom de l'ingrédient en français",
      "quantity": 250,
      "unit": "g",
      "localizations": { "fr": "...", "en": "...", "de": "...", "es": "...", "pt": "..." }
    }
  ],
  "instructions": ["Étape 1...", "Étape 2..."],
  "localizations": {
    "fr": { "title": "...", "description": "...", "instructions": ["..."] },
    "en": { "title": "...", "description": "...", "instructions": ["..."] },
    "de": { "title": "...", "description": "...", "instructions": ["..."] },
    "es": { "title": "...", "description": "...", "instructions": ["..."] },
    "pt": { "title": "...", "description": "...", "instructions": ["..."] }
  }
}

CONTENU À ANALYSER :
${content}`;

/**
 * Utility to clean model ID and strip common corruption prefixes
 */
function getCleanModelId(provider: AIProvider, model?: string): string {
  const rawId = (model || "").toString();
  let cleanId = rawId.replace("geminiModel", "").replace("groqModel", "").trim();

  if (!cleanId || cleanId === 'undefined') {
    return provider === 'gemini' ? 'gemini-2.0-flash' : 'llama-3.3-70b-versatile';
  }
  return cleanId;
}

/**
 * Helper to extract JSON from AI response string
 */
function extractJsonFromText(text: string): string {
  const cleaned = (text || "").trim();
  const matchObj = cleaned.match(/\{[\s\S]*\}/);
  if (matchObj) return matchObj[0];
  const matchArr = cleaned.match(/\[[\s\S]*\]/);
  if (matchArr) return matchArr[0];
  return cleaned.replace(/```json|```/g, "").trim();
}

export async function parseRecipeWithAI(content: string, options: AIServiceOptions): Promise<AIRecipeResponse> {
  if (USE_SERVER_PROXY) {
    return callServerProxy('parse-recipe', { content, options });
  }

  const prompt = RECIPE_PROMPT_TEMPLATE(content);
  const modelId = getCleanModelId(options.provider, options.model);

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: modelId,
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = extractJsonFromText(text);
    if (!cleanJson) throw new Error("Réponse vide de l'IA (Gemini).");
    return RecipeSchema.parse(JSON.parse(cleanJson));
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { role: 'system', content: 'Tu es un assistant culinaire. Tu réponds UNIQUEMENT au format JSON.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq AI (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API Groq."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || "";
    const cleanJson = extractJsonFromText(jsonText);
    if (!cleanJson) throw new Error("Réponse vide de l'IA (Groq).");
    return RecipeSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseRecipeImageWithAI(base64Image: string, options: AIServiceOptions, mimeType: string = 'image/jpeg'): Promise<AIRecipeResponse> {
  const modelId = getCleanModelId(options.provider, options.model);
  const prompt = RECIPE_PROMPT_TEMPLATE("Analyse cette photo de recette de cuisine et extrais la recette au format JSON.");

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: modelId,
      generationConfig: { responseMimeType: "application/json" }
    });

    const imageParts = [{
      inlineData: {
        data: base64Image.split(',')[1] || base64Image,
        mimeType: mimeType
      }
    }];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    const cleanJson = extractJsonFromText(text);
    return RecipeSchema.parse(JSON.parse(cleanJson));
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: modelId.includes('vision') ? modelId : 'llama-3.2-11b-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: base64Image.startsWith('data:') ? base64Image : `data:${mimeType};base64,${base64Image}` } }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq Vision (${response.status}) : ${errData.error?.message || "Vérifiez votre modèle vision."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || "";
    const cleanJson = extractJsonFromText(jsonText);
    return RecipeSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseRecipeBookWithAI(content: string, options: AIServiceOptions): Promise<AIRecipeResponse[]> {
  const prompt = `Tu es un assistant culinaire expert.
Analyse le contenu suivant qui provient d'un livre de recettes.
Extrais TOUTES les recettes que tu trouves dans ce texte.

Pour CHAQUE recette, génère un objet JSON au sein d'un tableau JSON :
[
  {
    "title": "Nom de la recette",
    "servings": 4,
    "prepTimeMinutes": 15,
    "cookTimeMinutes": 20,
    "difficulty": "easy",
    "description": "...",
    "ingredients": [
      { "name": "nom ingrédient", "quantity": 1, "unit": "unit" }
    ],
    "instructions": ["Étape 1...", "Étape 2..."]
  }
]

CONTENU À ANALYSER :
${content}`;

  const modelId = getCleanModelId(options.provider, options.model);

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: modelId,
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = extractJsonFromText(text);
    if (!cleanJson) throw new Error("Réponse vide de l'IA (Gemini).");
    const parsed = JSON.parse(cleanJson);
    const recipesArr = Array.isArray(parsed) ? parsed : (parsed.recipes || [parsed]);
    return recipesArr.map((r: any) => RecipeSchema.parse(r));
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { role: 'system', content: 'Tu es un assistant culinaire. Tu réponds UNIQUEMENT au format JSON.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq AI (${response.status}) : ${errData.error?.message || "Erreur réseau ou clé API."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || "";
    const cleanJson = extractJsonFromText(jsonText);
    if (!cleanJson) throw new Error("Réponse vide de l'IA (Groq).");
    const parsed = JSON.parse(cleanJson);
    const recipesArr = Array.isArray(parsed) ? parsed : (parsed.recipes || [parsed]);
    return recipesArr.map((r: any) => RecipeSchema.parse(r));
  }
}

export async function parseReceiptWithAI(base64Image: string, options: AIServiceOptions, mimeType: string = 'image/jpeg'): Promise<AIReceiptResponse> {
  const modelId = getCleanModelId(options.provider, options.model);

  const prompt = `Analyse ce ticket de caisse et extrais la liste des ingrédients achetés sous forme de tableau JSON.
Chaque élément doit contenir "name", "quantity" (nombre), et "unit" ("g", "kg", "ml", "l", "unit", "pack").
Format JSON : { "items": [ { "name": "Tomate", "quantity": 5, "unit": "unit" } ] }`;

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: modelId,
      generationConfig: { responseMimeType: "application/json" }
    });

    const imageParts = [{
      inlineData: {
        data: base64Image.split(',')[1] || base64Image,
        mimeType: mimeType
      }
    }];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    const cleanJson = extractJsonFromText(text);
    return ReceiptSchema.parse(JSON.parse(cleanJson));
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: modelId.includes('vision') ? modelId : 'llama-3.2-11b-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: base64Image.startsWith('data:') ? base64Image : `data:${mimeType};base64,${base64Image}` } }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq Vision (${response.status}) : ${errData.error?.message || "Vérifiez votre modèle vision."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || "";
    const cleanJson = extractJsonFromText(jsonText);
    return ReceiptSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseBarcodeWithAI(base64Image: string, options: AIServiceOptions, mimeType: string = 'image/jpeg'): Promise<string | null> {
  const modelId = getCleanModelId(options.provider, options.model);
  const prompt = `Lit le code-barres sur cette image et renvoie UNIQUEMENT le numéro de code-barres (EAN-13, EAN-8 ou UPC) sous forme de texte brut. S'il n'y a pas de code-barres lisible, réponds "null".`;

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({ model: modelId });
    const imageParts = [{
      inlineData: {
        data: base64Image.split(',')[1] || base64Image,
        mimeType: mimeType
      }
    }];
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = (response.text() || "").trim();
    if (text.includes("null")) return null;
    return text.replace(/\D/g, "");
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.2-11b-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: base64Image.startsWith('data:') ? base64Image : `data:${mimeType};base64,${base64Image}` } }
            ]
          }
        ]
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    const text = (data.choices?.[0]?.message?.content || "").trim();
    if (text.includes("null")) return null;
    return text.replace(/\D/g, "");
  }
}

async function callServerProxy(endpoint: string, payload: any) {
  const res = await fetch(`${SERVER_API_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Erreur serveur Proxy (${res.status})`);
  }
  return res.json();
}
