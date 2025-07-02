import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add aliases for node modules that don't work in the browser
      pg: '/src/lib/db-mock.ts'
    }
  },
  optimizeDeps: {
    exclude: ['pg']
  },
  build: {
    rollupOptions: {
      external: ['pg']
    }
  }
});
