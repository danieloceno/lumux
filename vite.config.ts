import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The playground: every component in every state, for Playwright (not Storybook).
// `vite build` publishes the same page as the demo (GitHub Pages, .github/workflows/demo.yml).
export default defineConfig({
  root: 'playground',
  base: process.env.DEMO_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5179, strictPort: true },
  build: { outDir: '../dist-demo', emptyOutDir: true },
});
