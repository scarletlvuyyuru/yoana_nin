import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from './components/UI/LoadingSpinner';
import SitewideSchema from './components/SEO/SitewideSchema';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home/Home'));
const MyStory = React.lazy(() => import('./pages/MyStory/MyStory'));
const Coaching = React.lazy(() => import('./pages/Coaching/Coaching'));
const Blog = React.lazy(() => import('./pages/Blog/Blog'));
const Events = React.lazy(() => import('./pages/Events/Events'));
const Resources = React.lazy(() => import('./pages/Resources/Resources'));
const BlogPost = React.lazy(() => import('./pages/BlogPost/BlogPost'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Assessment = React.lazy(() => import('./pages/Assessment/Assessment'));
const FreeGuide = React.lazy(() => import('./pages/FreeGuide/FreeGuide'));
const Privacy = React.lazy(() => import('./pages/Privacy/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms/Terms'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  const { actualTheme } = useTheme();

  return (
    <>
      <SitewideSchema />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className={`app ${actualTheme}`}>
        <Navigation />
        <ErrorBoundary>
          <main id="main-content" className="main-content">
            <Suspense fallback={<LoadingSpinner />}>
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
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </ErrorBoundary>
        <Footer />
      </div>
    </>
  );
}

export default App;