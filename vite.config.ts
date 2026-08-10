import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: resolve(process.cwd(), 'src/prerender.tsx'),
      additionalPrerenderRoutes: [
        '/',
        '/coaching',
        '/resources',
        '/blog',
        '/contact',
        '/events',
        '/my-story',
        '/assessment',
        '/privacy',
        '/terms'
      ]
    })
  ],
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