import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Split the app into separate cacheable chunks instead of one monolithic
      // bundle: vendor libraries (React, Firebase, icons) rarely change between
      // deploys, and static recipe/ingredient data + translations change far less
      // often than the UI code, so isolating them lets browsers reuse cached
      // chunks across app updates instead of re-downloading everything.
      //
      // data-recipes/data-i18n are also only ever referenced via dynamic
      // import() (see src/utils/storage.ts and src/i18n/recipeTranslations.ts),
      // so by default Vite would still add <link rel="modulepreload"> hints for
      // them in index.html (since they're reachable from the entry point),
      // causing the browser to fetch them immediately anyway. Excluding them
      // here means they are only requested once the app actually calls the
      // dynamic import after the initial UI has already rendered.
      modulePreload: {
        resolveDependencies: (_filename, deps) =>
          deps.filter(dep => !dep.includes('data-recipes') && !dep.includes('data-i18n')),
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase')) return 'vendor-firebase';
              if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) return 'vendor-react';
              if (id.includes('lucide-react')) return 'vendor-icons';
              return 'vendor';
            }
            if (id.includes('/src/i18n/')) return 'data-i18n';
            if (id.includes('/src/data/')) return 'data-recipes';
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
