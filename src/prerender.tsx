import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './pages/Home/Home';
import MyStory from './pages/MyStory/MyStory';
import Coaching from './pages/Coaching/Coaching';
import Blog from './pages/Blog/Blog';
import Events from './pages/Events/Events';
import Resources from './pages/Resources/Resources';
import BlogPost from './pages/BlogPost/BlogPost';
import Contact from './pages/Contact/Contact';
import Assessment from './pages/Assessment/Assessment';
import FreeGuide from './pages/FreeGuide/FreeGuide';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import NotFound from './pages/NotFound/NotFound';
import { getAllBlogPosts } from './content/blogLoader';

const staticRoutes = [
  '/',
  '/coaching',
  '/resources',
  '/blog',
  '/contact',
  '/events',
  '/my-story',
  '/assessment',
  '/free-adhd-guide',
  '/privacy',
  '/terms',
] as const;

function PrerenderApp() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="app light">
        <Navigation />
        <ErrorBoundary>
          <main id="main-content" className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-story" element={<MyStory />} />
              <Route path="/coaching" element={<Coaching />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/events" element={<Events />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/free-adhd-guide" element={<FreeGuide />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </ErrorBoundary>
        <Footer />
      </div>
    </>
  );
}

export async function prerender({ url }: { url: string }) {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <PrerenderApp />
      </StaticRouter>
    </HelmetProvider>
  );

  const blogLinks = getAllBlogPosts().map((post) => `/blog/${post.slug}`);

  // Put each page's own <title>, meta, canonical and JSON-LD into the static
  // HTML so crawlers don't see the homepage's head on every page. The
  // template's generic duplicates are stripped in vite.config.ts.
  const { helmet } = helmetContext;
  const titleText = (helmet?.title.toString() ?? '')
    .replace(/^<title[^>]*>|<\/title>$/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
  const headTags = helmet
    ? [helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()]
    : [];

  return {
    html,
    links: new Set([...staticRoutes, ...blogLinks]),
    head: {
      title: titleText,
      // The plugin serializes plain strings as-is.
      elements: new Set(headTags.filter(Boolean)) as unknown as Set<{ type: string; props: Record<string, string> }>,
    },
  };
}
