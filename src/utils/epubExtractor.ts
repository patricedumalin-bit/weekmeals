import JSZip from 'jszip';

/**
 * Extracts all text content from an EPUB file.
 * Returns an array of strings, one for each internal HTML document.
 */
export async function extractTextFromEPUB(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const contentFiles: string[] = [];
  const parser = new DOMParser();

  // 1. Find all (x)html files in the zip
  const files = Object.keys(zip.files).filter(path =>
    path.endsWith('.xhtml') || path.endsWith('.html') || path.endsWith('.htm')
  );

  // 2. Extract text from each file
  for (const path of files) {
    const content = await zip.files[path].async('string');
    const doc = parser.parseFromString(content, 'text/html');

    // Remove script and style tags to get clean text
    const scripts = doc.querySelectorAll('script, style');
    scripts.forEach(s => s.remove());

    const text = doc.body.innerText || doc.documentElement.innerText || "";
    if (text.trim().length > 50) {
      contentFiles.push(text.trim());
    }
  }

  return contentFiles;
}
