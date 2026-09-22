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

IMPORTANT : Retourne UNIQUEMENT un objet JSON valide (SANS blocs markdown, SANS texte autour).
Structure JSON attendue :
{
  "title": "Nom de la recette en français",
  "servings": 4,
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 20,
  "difficulty": "easy" | "medium" | "hard",
  "description": "Brève description en français",
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

/**
 * Utility to clean model ID and strip common corruption prefixes
 */
function getCleanModelId(provider: AIProvider, model?: string): string {
  const rawId = (model || "").toString();
  // Strip common field-name prefixes that might get concatenated by mistake
  let cleanId = rawId.replace("geminiModel", "").replace("groqModel", "").trim();

  if (!cleanId || cleanId === 'undefined') {
    return provider === 'gemini' ? 'gemini-2.0-flash' : 'qwen/qwen3.8-27b';
  }
  return cleanId;
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
    const cleanJson = (text || "").replace(/```json|```/g, "").trim();
    if (!cleanJson) throw new Error("Réponse vide de l'IA (Gemini).");
    return RecipeSchema.parse(JSON.parse(cleanJson));
  } else {
    // For text-only parsing on Groq, we can use Qwen if preferred, or Llama
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq AI (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API Groq."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || "";
    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    if (!cleanJson) throw new Error("Réponse vide de l'IA (Groq).");
    return RecipeSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseRecipeBookWithAI(content: string, options: AIServiceOptions): Promise<AIRecipeResponse[]> {
  const prompt = `Tu es un assistant culinaire expert.
Analyse le contenu suivant qui provient d'un livre de recettes.
Extrais TOUTES les recettes complètes que tu trouves dans ce texte.
Pour CHAQUE recette, génère un objet JSON suivant la structure demandée précédemment (title, servings, prepTimeMinutes, cookTimeMinutes, difficulty, description, ingredients, instructions, localizations).

IMPORTANT : Retourne UNIQUEMENT un tableau JSON d'objets (SANS blocs markdown, SANS texte autour).
Exemple de retour : [ { "title": "Recette 1", ... }, { "title": "Recette 2", ... } ]

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
    const cleanJson = (text || "").replace(/```json|```/g, "").trim();
    if (!cleanJson) throw new Error("Réponse vide de l'IA (Gemini).");
    const parsed = JSON.parse(cleanJson);
    return Array.isArray(parsed) ? parsed.map(r => RecipeSchema.parse(r)) : [RecipeSchema.parse(parsed)];
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur Groq AI (${response.status})`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || "";
    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    // Groq json_object mode might return { "recipes": [...] } or just [...] if supported by model,
    // but usually it expects a root object.
    const recipesArray = Array.isArray(parsed) ? parsed : (parsed.recipes || [parsed]);
    return recipesArray.map((r: any) => RecipeSchema.parse(r));
  }
}

export async function parseRecipeImageWithAI(imageAsBase64: string, options: AIServiceOptions): Promise<AIRecipeResponse> {
  if (USE_SERVER_PROXY) {
    return callServerProxy('parse-recipe-image', { imageAsBase64, options });
  }

  const prompt = RECIPE_PROMPT_TEMPLATE("Analyse cette photo de recette.");
  // Force a vision model for images
  let modelId = getCleanModelId(options.provider, options.model);
  if (options.provider === 'groq' && !modelId.includes('vision')) {
     modelId = 'qwen/qwen3.8-27b';
  }

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: modelId,
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
    const text = response.text();
    const cleanJson = (text || "").replace(/```json|```/g, "").trim();
    if (!cleanJson) throw new Error("Réponse vide de l'IA Vision (Gemini).");
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
      throw new Error(`Erreur Groq Vision (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || "";
    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    if (!cleanJson) throw new Error("Réponse vide de l'IA Vision (Groq).");
    return RecipeSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseReceiptWithAI(fileBase64: string, options: AIServiceOptions, fileType: string = 'image/jpeg'): Promise<AIReceiptResponse> {
  if (USE_SERVER_PROXY) {
    return callServerProxy('parse-receipt', { fileBase64, options, fileType });
  }

  const isPdf = fileType === 'application/pdf';
  const prompt = `Tu es un expert en lecture de tickets de caisse. Extrais les produits alimentaires achetés au format JSON : { "items": [{ "name": "nom simple", "quantity": 1, "unit": "unité", "price": 0.00, "brand": "marque" }] }`;
  let modelId = getCleanModelId(options.provider, options.model);
  if (options.provider === 'groq' && !modelId.includes('vision')) {
     modelId = 'qwen/qwen3.8-27b';
  }

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: modelId,
      generationConfig: { responseMimeType: "application/json" }
    });

    const base64Data = fileBase64.split(',')[1] || fileBase64;
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Data, mimeType: fileType } }
    ]);
    const response = await result.response;
    const text = response.text();
    const cleanJson = (text || "").replace(/```json|```/g, "").trim();
    if (!cleanJson) throw new Error("Réponse vide du ticket (Gemini).");
    return ReceiptSchema.parse(JSON.parse(cleanJson));
  } else {
    if (isPdf) throw new Error("Groq ne supporte pas encore les PDF. Utilisez Gemini.");
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${options.apiKey}` },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: fileBase64 } }] }],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
       const errData = await response.json().catch(() => ({}));
       throw new Error(`Erreur Groq Ticket (${response.status}) : ${errData.error?.message || "Erreur réseau."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content || "";
    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    if (!cleanJson) throw new Error("Réponse vide du ticket (Groq).");
    return ReceiptSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseBarcodeWithAI(imageAsBase64: string, options: AIServiceOptions, fileType: string = 'image/jpeg'): Promise<string | null> {
  if (USE_SERVER_PROXY) {
    const result = await callServerProxy('parse-barcode', { imageAsBase64, options, fileType });
    return result.code || null;
  }

  const prompt = "Extrait UNIQUEMENT le numéro de code-barres EAN-13 de cette image. Retourne seulement les chiffres.";
  const modelId = getCleanModelId(options.provider, options.model);

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({ model: modelId });
    const base64Data = imageAsBase64.split(',')[1] || imageAsBase64;
    const result = await model.generateContent([prompt, { inlineData: { data: base64Data, mimeType: fileType } }]);
    const response = await result.response;
    const text = response.text() || "";
    return text.replace(/\D/g, '').trim();
  } else {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${options.apiKey}` },
      body: JSON.stringify({
        model: modelId.includes('vision') ? modelId : 'qwen/qwen3.8-27b',
        messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: imageAsBase64 } }] }]
      })
    });
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    return text.replace(/\D/g, '').trim();
  }
}

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
