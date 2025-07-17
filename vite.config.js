import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  root: 'src', // NEU: Root auf src setzen für saubere Struktur
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
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
        index: resolve(__dirname, 'src/pages/index.html'),
        pitch: resolve(__dirname, 'src/pages/pitch.html'),
        'leichte-sprache': resolve(__dirname, 'src/pages/leichte-sprache.html'),
        impressum: resolve(__dirname, 'src/pages/impressum.html'),
        datenschutz: resolve(__dirname, 'src/pages/datenschutz.html'),
        spenden: resolve(__dirname, 'src/pages/spenden.html'),
        newsletter: resolve(__dirname, 'src/pages/newsletter.html')
      },
      output: {
        manualChunks: undefined,
        entryFileNames: `assets/[name]-[hash].js`,
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