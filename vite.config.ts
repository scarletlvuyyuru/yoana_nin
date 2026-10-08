import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// index.html ships generic homepage meta tags (description, robots, og:*,
// twitter:*) as a fallback. When a prerendered page sets its own via Helmet
// (marked data-rh), drop the template's copy so each page has exactly one.
function dedupeHeadMeta(html: string): string {
  const metaKey = (tag: string) => tag.match(/\s(?:name|property)="([^"]+)"/)?.[1];
  const helmetKeys = new Set(
    (html.match(/<meta\b[^>]*data-rh[^>]*>/g) ?? []).map(metaKey).filter(Boolean)
  );
  return html.replace(/<meta\b[^>]*>\s*/g, (tag) => {
    const key = metaKey(tag);
    return key && helmetKeys.has(key) && !/data-rh/.test(tag) ? '' : tag;
  });
}

// https://vite.dev/config/
export default defineConfig({
  define: {
    // reCAPTCHA site key (public). Netlify uses the same SITE_RECAPTCHA_KEY plus
    // SITE_RECAPTCHA_SECRET to verify form submissions.
    'import.meta.env.VITE_RECAPTCHA_SITE_KEY': JSON.stringify(
      process.env.VITE_RECAPTCHA_SITE_KEY || process.env.SITE_RECAPTCHA_KEY || ''
    ),
  },
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
            '/terms',
            '/404'
          ]
        }),
        // The prerender plugin writes every route as `route/index.html`, and
        // Netlify answers `/route` for those with a 301 to `/route/`. Our
        // canonicals, sitemap and links all use the no-slash form, so Google
        // saw every canonical URL redirecting away and refused to index them.
        // Emitting `route.html` instead lets Netlify serve `/route` directly
        // with a 200. `/404` becomes `404.html`, which Netlify serves with a
        // real 404 status for any unknown URL (e.g. deleted blog posts).
        {
          name: 'flatten-prerendered-html',
          apply: 'build',
          enforce: 'post',
          generateBundle: {
            order: 'post',
            handler(_opts, bundle) {
              for (const [key, asset] of Object.entries(bundle)) {
                if (asset.type !== 'asset' || !key.endsWith('.html')) continue;
                const source = dedupeHeadMeta(String(asset.source));
                const match = key.replace(/\\/g, '/').match(/^(.+)\/index\.html$/);
                if (key === 'index.html' || !match) {
                  asset.source = source;
                  continue;
                }
                delete bundle[key];
                this.emitFile({
                  type: 'asset',
                  fileName: `${match[1]}.html`,
                  source,
                });
              }
            },
          },
        } as Plugin,
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