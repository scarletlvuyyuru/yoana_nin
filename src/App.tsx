import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home/Home'));
const MyStory = React.lazy(() => import('./pages/MyStory/MyStory'));
const Coaching = React.lazy(() => import('./pages/Coaching/Coaching'));
const RealEstate = React.lazy(() => import('./pages/RealEstate/RealEstate'));
const Blog = React.lazy(() => import('./pages/Blog/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost/BlogPost'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms/Terms'));

function App() {
  const { theme } = useTheme();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className={`app ${theme}`} data-theme={theme}>
        <Navigation />
        <main id="main-content" className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-story" element={<MyStory />} />
              <Route path="/coaching" element={<Coaching />} />
              <Route path="/real-estate" element={<RealEstate />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;