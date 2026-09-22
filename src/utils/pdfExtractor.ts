import * as pdfjs from 'pdfjs-dist';

// Configurer le worker pour pdf.js de manière robuste pour Vite et Capacitor.
// On utilise l'URL du fichier local présent dans node_modules.
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Extracts all text from a PDF file.
 * Returns an array of strings, one for each page.
 */
export async function extractTextFromPDF(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const pageTexts: string[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    pageTexts.push(strings.join(' '));
  }

  return pageTexts;
}

/**
 * Heuristic to group pages that likely belong to the same recipe.
 */
export function groupPagesByRecipe(pageTexts: string[]): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  for (const page of pageTexts) {
    // On regroupe par blocs de ~4000 caractères pour ne pas saturer l'IA
    if ((currentChunk.length + page.length) > 4000) {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = page;
    } else {
      currentChunk += "\n\n" + page;
    }
  }

  if (currentChunk) chunks.push(currentChunk);
  return chunks;
}
