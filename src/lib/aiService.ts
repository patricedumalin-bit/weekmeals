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
    return RecipeSchema.parse(JSON.parse(text));
  } else {
    // Groq implementation
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Erreur Groq AI (${response.status}) : ${errData.error?.message || "Erreur inconnue"}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content;
    if (!jsonText) throw new Error("L'IA n'a pas pu générer de contenu.");

    return RecipeSchema.parse(JSON.parse(jsonText));
  }
}

export async function parseRecipeImageWithAI(imageAsBase64: string, options: AIServiceOptions): Promise<AIRecipeResponse> {
  const prompt = RECIPE_PROMPT_TEMPLATE("Analyse cette photo de recette.");

  if (options.provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(options.apiKey);
    const model = genAI.getGenerativeModel({ model: options.model || "gemini-1.5-flash" });

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
    // Groq Vision (llama-3.2-11b-vision-preview or similar)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'llama-3.2-11b-vision-preview',
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
      throw new Error(`Erreur Groq Vision (${response.status}) : ${errData.error?.message || "Erreur inconnue"}`);
    }

    const data = await response.json();
    const jsonText = data.choices?.[0]?.message?.content;
    return RecipeSchema.parse(JSON.parse(jsonText));
  }
}
