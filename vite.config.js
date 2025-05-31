// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dino-runner-3d/', // GitHub Pages repository name
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: true
  }
});
