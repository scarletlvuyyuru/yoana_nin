import React, { useEffect, useState } from 'react';
import styles from './Blog.module.css';
import masterMindsetImage from '../../assets/images/masterMindset.webp';

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

// Instagram post data structure
interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

// Instagram Feed Component
const InstagramFeed: React.FC = () => {
  // 🚩 CLIENT APPROVAL NEEDED: Instagram integration pending client approval
  const INSTAGRAM_ENABLED = false; // Set to true after client approves Instagram integration
  
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(false); // Start as false since we're showing demo
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (INSTAGRAM_ENABLED) {
      fetchInstagramPosts();
    } else {
      // Show demo data for client preview
      setDemoContent();
    }
  }, []);

  // Handle screen resize to reset carousel position if needed
  useEffect(() => {
    const handleResize = () => {
      // Reset to first slide when screen size changes to prevent out-of-bounds positioning
      const maxIndex = Math.max(0, posts.length - getVisiblePosts());
      if (currentIndex > maxIndex) {
        setCurrentIndex(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, posts.length]);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      // Call Netlify function to get Instagram posts
      const response = await fetch('/.netlify/functions/instagram-feed');
      const data = await response.json();
      setPosts(data.slice(0, 6)); // Limit to 6 most recent posts
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      setLoading(false);
    }
  };

  const setDemoContent = () => {
    // Demo content to show client what Instagram integration would look like
    const demoVideos: InstagramPost[] = [
      {
        id: 'demo1',
        media_type: 'VIDEO',
        media_url: 'https://picsum.photos/400/400?random=1',
        thumbnail_url: 'https://picsum.photos/400/400?random=1',
        permalink: '#',
        caption: 'Quick insights on building confidence as an entrepreneur...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'demo2',
        media_type: 'VIDEO',
        media_url: 'https://picsum.photos/400/400?random=2',
        thumbnail_url: 'https://picsum.photos/400/400?random=2',
        permalink: '#',
        caption: 'Daily motivation: 3 steps to overcome ADHD overwhelm...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'demo3',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=3',
        permalink: '#',
        caption: 'Weekly wisdom for holistic life balance...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'demo4',
        media_type: 'VIDEO',
        media_url: 'https://picsum.photos/400/400?random=4',
        thumbnail_url: 'https://picsum.photos/400/400?random=4',
        permalink: '#',
        caption: 'Behind the scenes: My morning routine for productivity...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'demo5',
        media_type: 'VIDEO',
        media_url: 'https://picsum.photos/400/400?random=5',
        thumbnail_url: 'https://picsum.photos/400/400?random=5',
        permalink: '#',
        caption: 'Client success story: From chaos to clarity in 30 days...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'demo6',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=6',
        permalink: '#',
        caption: 'Affirmation Monday: You are capable of amazing things...',
        timestamp: new Date().toISOString(),
      },
    ];
    setPosts(demoVideos);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, posts.length - getVisiblePosts());
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, posts.length - getVisiblePosts());
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  // Helper function to determine how many posts are visible based on screen size
  const getVisiblePosts = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 480) return 1; // Small mobile: 1 post
      if (window.innerWidth <= 768) return 2; // Mobile: 2 posts  
      return 3; // Desktop: 3 posts (or adjust as needed)
    }
    return 3; // Default for server-side rendering
  };

  // Calculate the correct transform percentage
  const getTransformPercentage = () => {
    const visiblePosts = getVisiblePosts();
    const movePercentage = 100 / visiblePosts;
    return currentIndex * movePercentage;
  };

  if (loading) {
    return (
      <div className={styles.instagramFeed}>
        <div className={styles.loadingSpinner}>Loading insights...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.instagramFeed}>
        <p>No insights available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={styles.instagramFeed}>
      <div className={styles.feedContainer}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="Previous insight"
        >
          ←
        </button>
        
        <div className={styles.feedScroll}>
          <div 
            className={styles.feedTrack}
            style={{ 
              transform: `translateX(-${getTransformPercentage()}%)` 
            }}
          >
            {posts.map((post) => (
              <div key={post.id} className={styles.instagramPost}>
                <a 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.postLink}
                >
                  {post.media_type === 'VIDEO' ? (
                    <video 
                      className={styles.postMedia}
                      poster={post.thumbnail_url}
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => {
                        const video = e.currentTarget;
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                          playPromise.catch(() => {
                            // Autoplay was prevented, ignore the error
                          });
                        }
                      }}
                      onMouseOut={(e) => {
                        try {
                          e.currentTarget.pause();
                        } catch (error) {
                          // Ignore pause errors
                        }
                      }}
                    >
                      <source src={post.media_url} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={post.media_url} 
                      alt="Instagram insight"
                      className={styles.postMedia}
                    />
                  )}
                  <div className={styles.postOverlay}>
                    <p className={styles.postCaption}>
                      {post.caption ? post.caption.substring(0, 100) + '...' : 'View on Instagram'}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          disabled={currentIndex >= Math.max(0, posts.length - getVisiblePosts())}
          aria-label="Next insight"
        >
          →
        </button>
      </div>
      
      <div className={styles.feedDots}>
        {Array.from({ length: Math.max(1, posts.length - getVisiblePosts() + 1) }).map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to insight ${index + 1}`}
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
          <InstagramFeed />
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