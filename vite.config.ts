import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    strictPort: true,
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
});
