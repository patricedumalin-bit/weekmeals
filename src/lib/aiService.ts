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
Analyse le contenu suivant (texte, URL ou description d'image) pour en extraire une recette structurée.
Tu dois obligatoirement générer les traductions de cette recette pour les langues suivantes : fr, en, de, es, pt.

IMPORTANT : Retourne UNIQUEMENT un objet JSON valide (SANS blocs markdown, SANS texte autour).
Structure JSON attendue :
{
  "title": "Nom de la recette",
  "servings": 4,
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 20,
  "difficulty": "easy" | "medium" | "hard",
  "description": "Brève description",
  "ingredients": [
    {
      "name": "nom de l'ingrédient en français",
      "quantity": 250,
      "unit": "g" | "kg" | "ml" | "cl" | "l" | "tbsp" | "tsp" | "unit" | "clove" | "pinch" | "can" | "pack" | "bunch" | "slice",
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

export async function parseRecipeWithAI(content: string, options: AIServiceOptions): Promise<AIRecipeResponse> {
  if (USE_SERVER_PROXY) {
    return callServerProxy('parse-recipe', { content, options });
  }

  const prompt = RECIPE_PROMPT_TEMPLATE(content);

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: options.model || "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return RecipeSchema.parse(JSON.parse(cleanJson));
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'qwen/qwen-2.5-vl-72b',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq AI (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API Groq."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content;
    if (!jsonText) throw new Error("L'IA n'a pas pu générer de contenu.");

    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    return RecipeSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseRecipeImageWithAI(imageAsBase64: string, options: AIServiceOptions): Promise<AIRecipeResponse> {
  if (USE_SERVER_PROXY) {
    return callServerProxy('parse-recipe-image', { imageAsBase64, options });
  }

  const prompt = RECIPE_PROMPT_TEMPLATE("Analyse cette photo de recette.");

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: options.model || "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const base64Data = imageAsBase64.split(',')[1] || imageAsBase64;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg"
        }
      }
    ]);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    return RecipeSchema.parse(JSON.parse(text));
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'qwen/qwen-2.5-vl-72b',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: imageAsBase64 } }
            ]
          }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq Vision (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API Groq."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content;
    if (!jsonText) throw new Error("L'IA n'a pas pu générer de contenu.");

    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    return RecipeSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseReceiptWithAI(fileBase64: string, options: AIServiceOptions, fileType: string = 'image/jpeg'): Promise<AIReceiptResponse> {
  if (USE_SERVER_PROXY) {
    return callServerProxy('parse-receipt', { fileBase64, options, fileType });
  }

  const isPdf = fileType === 'application/pdf';
  const prompt = `Tu es un expert en lecture de tickets de caisse et factures de drive. Analyse ce document et extrais UNIQUEMENT les produits alimentaires au format JSON : { "items": [{ "name": "...", "quantity": 1, "unit": "..." }] }`;

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: options.model || "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const base64Data = fileBase64.split(',')[1] || fileBase64;
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Data, mimeType: fileType } }
    ]);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    return ReceiptSchema.parse(JSON.parse(text));
  } else {
    if (isPdf) throw new Error("Groq ne supporte pas encore les PDF. Utilisez Gemini.");
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${options.apiKey}` },
      body: JSON.stringify({
        model: options.model || 'qwen/qwen-2.5-vl-72b',
        messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: fileBase64 } }] }],
        response_format: { type: 'json_object' }
      })
    });
    const data = await response.json();
    const cleanJson = data.choices[0].message.content.replace(/```json|```/g, "").trim();
    return ReceiptSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseBarcodeWithAI(imageAsBase64: string, options: AIServiceOptions, fileType: string = 'image/jpeg'): Promise<string | null> {
  if (USE_SERVER_PROXY) {
    const result = await callServerProxy('parse-barcode', { imageAsBase64, options, fileType });
    return result.code || null;
  }

  const prompt = "Extrait UNIQUEMENT le numéro de code-barres EAN-13 de cette image. Retourne seulement les chiffres.";

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({ model: options.model || "gemini-1.5-flash" });
    const base64Data = imageAsBase64.split(',')[1] || imageAsBase64;
    const result = await model.generateContent([prompt, { inlineData: { data: base64Data, mimeType: fileType } }]);
    const response = await result.response;
    return response.text().replace(/\D/g, '').trim();
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${options.apiKey}` },
      body: JSON.stringify({
        model: options.model || 'qwen/qwen-2.5-vl-72b',
        messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: imageAsBase64 } }] }]
      })
    });
    const data = await response.json();
    return data.choices[0].message.content.replace(/\D/g, '').trim();
  }
}

// Helper to call the secure Firebase Cloud Function proxy
async function callServerProxy(endpoint: string, payload: any): Promise<any> {
  try {
    const response = await fetch(`${SERVER_API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Server Proxy Error');
    }

    return response.json();
  } catch (err: any) {
    console.error(`[Server Proxy] Error on ${endpoint}:`, err);
    throw err;
  }
}
