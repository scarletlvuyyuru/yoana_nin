import React from 'react';
import styles from './Blog.module.css';
import SEO from '../../components/SEO/SEO';
import masterMindsetImage from '../../assets/images/masterMindset.webp';
import { getFeaturedBlogPosts } from '../../content/blogLoader';

const Blog: React.FC = () => {
  const featuredPosts = getFeaturedBlogPosts();
  
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
                {post.featured_image && (
                  <a href={`/blog/${post.slug}`} className={styles.imageLink}>
                    <img
                      src={post.featured_image}
                      alt={post.image_alt || post.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  </a>
                )}
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