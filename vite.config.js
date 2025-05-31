// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Required for GitHub Pages
  root: 'public', // Set the root to the public directory where index.html is
  build: {
    outDir: '../dist', // Output to dist in the project root
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html')
    }
  }
});
