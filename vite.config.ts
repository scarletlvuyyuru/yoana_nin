import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Generates smaller CSS files
    cssCodeSplit: true,
    // Ensures modern browser support which uses less polyfill "bloat"
    target: 'esnext',
    rollupOptions: {
      output: {
        // Splits vendor libraries (like React) into separate files for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})