import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecipeSchema, AIRecipeResponse } from "./schemas";

export type AIProvider = 'groq' | 'gemini';

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
    // Clean JSON text if markdown blocks are present
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return RecipeSchema.parse(JSON.parse(cleanJson));
  } else {
    // Groq implementation
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'qwen/qwen3.8-27b',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq AI (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API Groq dans votre Profil."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content;
    if (!jsonText) throw new Error("L'IA n'a pas pu générer de contenu.");

    // Clean JSON text if markdown blocks are present
    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    return RecipeSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseRecipeImageWithAI(imageAsBase64: string, options: AIServiceOptions): Promise<AIRecipeResponse> {
  const prompt = RECIPE_PROMPT_TEMPLATE("Analyse cette photo de recette.");

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: options.model || "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    // Convert base64 data URL to raw base64 if needed
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
    // Groq Vision (qwen/qwen3.8-27b supports vision)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'qwen/qwen3.8-27b',
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
      throw new Error(`Erreur Groq Vision (${response.status}) : ${errData.error?.message || "Vérifiez votre clé API Groq dans votre Profil."}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content;
    if (!jsonText) throw new Error("L'IA n'a pas pu générer de contenu.");

    // Clean JSON text if markdown blocks are present
    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    return RecipeSchema.parse(JSON.parse(cleanJson));
  }
}

export async function parseReceiptWithAI(fileBase64: string, options: AIServiceOptions, fileType: string = 'image/jpeg'): Promise<AIReceiptResponse> {
  const isPdf = fileType === 'application/pdf';
  const prompt = `Tu es un expert en lecture de tickets de caisse et factures de drive (PDF ou Image).
Analyse ce document et extrais la liste des produits alimentaires achetés.
Pour chaque produit, identifie son nom simple et générique (ex: "Yaourt Velouté x8" devient "Yaourt"), sa quantité et son unité (si précisée, sinon "unit").

IMPORTANT : Retourne UNIQUEMENT un objet JSON valide (SANS blocs markdown, SANS texte autour).
Structure JSON attendue :
{
  "items": [
    { "name": "Nom du produit", "quantity": 1, "unit": "g" | "kg" | "ml" | "cl" | "l" | "tbsp" | "tsp" | "unit" | "clove" | "pinch" | "can" | "pack" | "bunch" | "slice" }
  ]
}`;

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({
      model: options.model || "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const base64Data = fileBase64.split(',')[1] || fileBase64;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: fileType
        }
      }
    ]);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    return ReceiptSchema.parse(JSON.parse(text));
  } else {
    // Groq Vision (Uniquement pour les images)
    if (isPdf) {
      throw new Error("Le fournisseur Groq ne supporte pas encore l'analyse directe des fichiers PDF. Veuillez utiliser Gemini ou une image du ticket.");
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'qwen/qwen3.8-27b',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: fileBase64 } }
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
    if (!jsonText) throw new Error("L'IA n'a pas pu lire le document.");

    const cleanJson = jsonText.replace(/```json|```/g, "").trim();
    return ReceiptSchema.parse(JSON.parse(cleanJson));
  }
}
