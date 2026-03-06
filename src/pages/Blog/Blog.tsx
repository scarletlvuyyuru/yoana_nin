import React from 'react';
import styles from './Blog.module.css';
import SEO from '../../components/SEO/SEO';
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
      <SEO 
        title="Journal & Insights | Yoana Nin Coaching"
        description="Explore insights on ADHD entrepreneurship, holistic life coaching, and relocating to the Raleigh Triangle area."
        url="https://yoananincoaching.com/blog"
      />
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