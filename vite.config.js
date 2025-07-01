import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import { renameSync } from 'fs';
import { join } from 'path';

// Custom Plugin zum Verschieben der HTML-Dateien nach dem Build
const flattenHtmlOutput = () => {
  return {
    name: 'flatten-html-output',
    closeBundle() {
      // Nach dem Build: Verschiebe HTML-Dateien von dist/pages/ nach dist/
      const distDir = resolve(__dirname, 'dist');
      const pagesDir = join(distDir, 'pages');
      
      try {
        // Verschiebe index.html
        renameSync(join(pagesDir, 'index.html'), join(distDir, 'index.html'));
        // Verschiebe pitch.html
        renameSync(join(pagesDir, 'pitch.html'), join(distDir, 'pitch.html'));
        // Verschiebe leichte-sprache.html
        renameSync(join(pagesDir, 'leichte-sprache.html'), join(distDir, 'leichte-sprache.html'));
        
        // Entferne den leeren pages Ordner
        const fs = require('fs');
        fs.rmdirSync(pagesDir);
      } catch (error) {
        console.error('Fehler beim Verschieben der HTML-Dateien:', error);
      }
    }
  };
};

export default defineConfig({
  root: 'src', // NEU: Root auf src setzen für saubere Struktur
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    flattenHtmlOutput() // Plugin zum Verschieben der HTML-Dateien
  ],
  build: {
    outDir: '../dist', // NEU: Ein Level höher, da root jetzt src ist
    emptyOutDir: true, // NEU: Dist-Ordner vor Build leeren
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        pitch: resolve(__dirname, 'src/pages/pitch.html'),
        leichteSprache: resolve(__dirname, 'src/pages/leichte-sprache.html')
      },
      output: {
        manualChunks: undefined,
        // Entferne pages/ Präfix aus dem Output
        entryFileNames: (chunkInfo) => {
          return `assets/[name]-[hash].js`;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: '/pages/index.html' // NEU: Öffne direkt die Hauptseite
  },
  resolve: {
    alias: {
      '@': '/src',
      '@pages': '/src/pages',
      '@assets': '/src/assets'
    }
  }
});