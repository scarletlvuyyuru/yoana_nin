import React from 'react';
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
              Inspiration and Insights for Your Journey to Alignment
            </h2>
         
          </div>
        </div>
      </section>

      {/* Coffee & Coaching Section */}
      <section id="inspiration" className={styles.inspirationSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Coffee & Coaching</h2>
          <p className={styles.sectionDescription}>
            Join me for casual conversations about life, business, and finding your path forward
          </p>
          <div className={styles.inspirationGrid}>
            {/* Facebook embeds will be added here */}
            <div className={styles.embedPlaceholder}>
              <p>Facebook video embeds will be added here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className={styles.blogSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Stories & Insights</h2>
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