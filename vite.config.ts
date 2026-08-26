import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: (() => {
    const enablePrerender = process.env.ENABLE_PRERENDER === 'true';

    const plugins = [react()];

    if (enablePrerender) {
      plugins.push(
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
        }),
        // vite-prerender-plugin's post-render step leaves a handle open
        // (confirmed via local reproduction) that stops the Node process
        // from exiting on its own once the build is done — every page
        // renders correctly, but the process then hangs forever, which is
        // what was timing out Netlify builds. Rollup has fully written the
        // bundle to disk by the time closeBundle fires, so it's safe to
        // force-exit here; the short delay just lets the existing build
        // summary logs (built in Xs / Prerendered N pages) flush first.
        {
          name: 'force-exit-after-prerender',
          apply: 'build',
          closeBundle() {
            setTimeout(() => process.exit(0), 300);
          },
        }
      );
    }

    return plugins;
  })(),
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