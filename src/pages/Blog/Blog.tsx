import React, { useState, useEffect } from 'react';
import styles from './Blog.module.css';
import masterMindsetImage from '../../assets/images/masterMindset.webp';

declare global {
  interface Window {
    tiktok?: {
      load: () => void;
    };
  }
}

// Blog post data structure (will be replaced with CMS data)
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  slug: string;
}

// New, reliable TikTok Embed Component
const TikTokEmbed: React.FC<{ url: string }> = ({ url }) => {
  const videoId = url.substring(url.lastIndexOf('/') + 1);

  return (
    <blockquote
      className="tiktok-embed"
      cite={url}
      data-video-id={videoId}
      style={{ maxWidth: '100%', minWidth: 'auto' }}
    >
      <section>
        <a target="_blank" rel="noopener noreferrer" href={url}>
          Loading TikTok video...
        </a>
      </section>
    </blockquote>
  );
};

// TikTok Feed Component
const TikTokFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load the TikTok embed script once and trigger load
  useEffect(() => {
    const scriptId = 'tiktok-embed-script';
    if (document.getElementById(scriptId)) {
      if (window.tiktok) {
        window.tiktok.load();
      }
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.tiktok) {
        window.tiktok.load();
      }
    };
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        // In a single-page app, you might want to remove it on final unmount
        // but for this component, we'll leave it.
      }
    };
  }, []);

  const tiktokUrls = [
    "https://www.tiktok.com/@yoanathecoach/video/7606489409122258189",
    "https://www.tiktok.com/@yoanathecoach/video/7610093975864691982",
    "https://www.tiktok.com/@yoanathecoach/video/7609391564971838734",
    "https://www.tiktok.com/@yoanathecoach/video/7609006324688391437",
    "https://www.tiktok.com/@yoanathecoach/video/7608758618502024461",
    "https://www.tiktok.com/@yoanathecoach/video/7606769413743758605"
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tiktokUrls.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tiktokUrls.length) % tiktokUrls.length);
  };

  return (
    <div className={styles.tiktokCarousel}>
      <div className={styles.carouselContainer}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous TikTok video"
        >
          ←
        </button>
        
        <div className={styles.carouselTrackContainer}>
          <div 
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {tiktokUrls.map((url, index) => (
              <div key={index} className={styles.carouselSlide}>
                <TikTokEmbed url={url} />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next TikTok video"
        >
          →
        </button>
      </div>
      
      <div className={styles.carouselDots}>
        {tiktokUrls.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  // Sample blog posts - these will be replaced with CMS content
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Finding Your Perfect Life Coach as an ADHD Entrepreneur in Raleigh',
      excerpt: 'Discover what makes a life coach truly effective for ADHD entrepreneurs and how to find the right support in the Triangle area.',
      content: '', // Will be filled with full content
      author: 'Yoana Nin',
      date: '2026-01-27',
      category: 'Coaching',
      tags: ['ADHD', 'Entrepreneurs', 'Raleigh', 'Life Coaching'],
      featured: true,
      slug: 'adhd-entrepreneur-life-coach-raleigh'
    },
    {
      id: '2',
      title: 'What to Expect from Holistic Life Coaching: Your Journey to Wholeness',
      excerpt: 'Curious about holistic life coaching? Let\'s explore what this transformative approach looks like and how it can support your entire being.',
      content: '',
      author: 'Yoana Nin',
      date: '2026-01-25',
      category: 'Coaching',
      tags: ['Holistic Coaching', 'Personal Growth', 'Wellness', 'Transformation'],
      featured: true,
      slug: 'holistic-life-coaching-guide'
    },
    {
      id: '3',
      title: 'Finding a Real Estate Professional Who Truly Understands Relocating Families',
      excerpt: 'Moving with your family is about more than finding a house—it\'s about finding home. Here\'s what to look for in a real estate professional who gets it.',
      content: '',
      author: 'Yoana Nin',
      date: '2026-01-24',
      category: 'Real Estate',
      tags: ['Family Relocation', 'Triangle Area', 'Home Buying', 'Real Estate'],
      featured: true,
      slug: 'real-estate-agent-relocating-families'
    }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  
  return (
    <div className={styles.blogPage}>
      {/* Hero Section */}
      <section className={styles.hero} style={{backgroundImage: `url(${masterMindsetImage})`}}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Inspiration and Resources</h1>
            <h2 className={styles.heroSubtitle}>
              Inspiration and Insights for ADHD Entrepreneurs
            </h2>
         
          </div>
        </div>
      </section>

      {/* Quick Insights Section */}
      <section className={styles.inspirationSection}>
        <div className={styles.container}>
          <div id="inspiration" style={{ position: 'relative', top: '-100px' }}></div>
          <h2 className={styles.sectionTitle}>Quick Insights</h2>
          <p className={styles.sectionDescription}>
            Bite-sized learning moments and insights to inspire your journey forward
          </p>
          <TikTokFeed />
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className={styles.blogSection}>
        <div className={styles.container}>
          <div id="featured-stories" style={{ position: 'relative', top: '-100px' }}></div>
          <h2 className={styles.sectionTitle}>Featured Stories</h2>
          <div className={styles.blogGrid}>
            {featuredPosts.map((post) => (
              <article key={post.id} className={styles.blogCard} data-category={post.category}>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.date}>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className={styles.cardTitle}>
                    <a href={`/blog/${post.slug}`} className={styles.titleLink}>
                      {post.title}
                    </a>
                  </h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardTags}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;