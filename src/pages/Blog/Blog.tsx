import React, { useState } from 'react';
import styles from './Blog.module.css';
import SEO from '../../components/SEO/SEO';
import SocialReels from '../../components/SocialReels/SocialReels';
import masterMindsetImage from '../../assets/images/masterMindset.webp';
import { getAllBlogPosts, getFeaturedBlogPosts } from '../../content/blogLoader';

const CATEGORY_FILTERS = ['All', 'Coaching', 'Community'];

const POSTS_PER_PAGE = 9;

const Blog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const featuredPosts = getFeaturedBlogPosts().slice(0, 3);
  const allPosts = getAllBlogPosts();

  const filteredPosts =
    activeFilter === 'All'
      ? allPosts
      : allPosts.filter((p) => p.category === activeFilter);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className={styles.blogPage}>
      <SEO
        title="Journal & Insights | Yoana Nin Coaching"
        description="Explore insights on ADHD entrepreneurship, executive function, and practical coaching strategies for women entrepreneurs across the U.S. and Raleigh Triangle area."
        url="https://yoananincoaching.com/blog"
        schema={JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': 'https://yoananincoaching.com/blog',
          'name': 'Journal & Insights | Yoana Nin Coaching',
          'description': 'Explore insights on ADHD entrepreneurship, executive function, and practical coaching strategies for women entrepreneurs across the U.S. and Raleigh Triangle area.',
          'url': 'https://yoananincoaching.com/blog',
          'author': {
            '@type': 'Person',
            '@id': 'https://yoananincoaching.com/#person',
            'name': 'Yoana Nin',
          },
          'publisher': {
            '@type': 'Organization',
            '@id': 'https://yoananincoaching.com/#organization',
            'name': 'Yoana Nin Coaching',
          },
          'inLanguage': 'en-US',
        })}
      />

      {/* Hero Section */}
      <section className={styles.hero} style={{ backgroundImage: `url(${masterMindsetImage})` }}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Inspiration and Resources</h1>
            <h2 className={styles.heroSubtitle}>
              Inspiration and Insights for ADHD Entrepreneurs
            </h2>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {featuredPosts.length > 0 && (
        <section className={styles.blogSection}>
          <div className={styles.container}>
            <div id="featured-stories" style={{ position: 'relative', top: '-100px' }}></div>
            <h2 className={styles.sectionTitle}>Featured Stories</h2>
            <div className={styles.blogGrid}>
              {featuredPosts.map((post) => (
                <article key={post.id} className={`${styles.blogCard} ${styles.featuredCard}`} data-category={post.category}>
                  {post.thumbnail_image && (
                    <a href={`/blog/${post.slug}`} className={styles.imageLink}>
                      <img
                        src={post.thumbnail_image}
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
      )}

      {/* Social Reel Cards — between featured and all articles */}
      <div id="social-highlights" style={{ position: 'relative', top: '-100px' }}></div>
      <SocialReels />

      {/* All Articles with Category Filter */}
      <section className={styles.allPostsSection}>
        <div className={styles.container}>
          <div id="all-articles" style={{ position: 'relative', top: '-100px' }}></div>
          <h2 className={styles.sectionTitle}>All Articles</h2>

          <div className={styles.filterBar} role="group" aria-label="Filter articles by category">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
                onClick={() => { setActiveFilter(cat); setVisibleCount(POSTS_PER_PAGE); }}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredPosts.length > 0 ? (
            <div className={styles.blogGrid}>
              {visiblePosts.map((post) => (
                <article key={post.id} className={styles.blogCard} data-category={post.category}>
                  {post.thumbnail_image && (
                    <a href={`/blog/${post.slug}`} className={styles.imageLink}>
                      <img
                        src={post.thumbnail_image}
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
          ) : (
            <p className={styles.noResults}>No articles in this category yet. Check back soon!</p>
          )}

          {visibleCount < filteredPosts.length && (
            <div className={styles.loadMoreWrapper}>
              <button
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
              >
                Load More Articles
              </button>
              <p className={styles.loadMoreCount}>
                Showing {visibleCount} of {filteredPosts.length} articles
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;