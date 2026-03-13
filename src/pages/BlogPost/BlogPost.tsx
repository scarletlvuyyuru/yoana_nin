import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './BlogPost.module.css';
import SEO from '../../components/SEO/SEO';
import { getBlogPostBySlug } from '../../content/blogLoader';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!slug || !post) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Blog Post Not Found</h1>
          <p>Sorry, we couldn't find the blog post you're looking for.</p>
          <a href="/blog" className="btn btn-primary">Back to Blog</a>
        </div>
      </div>
    );
  }

  const seoDescription = post.meta_description || post.excerpt;

  return (
    <article className={styles.blogPost} data-category={post.category}>
      <SEO
        title={`${post.title} | Yoana Nin Coaching`}
        description={seoDescription}
        url={`https://yoananincoaching.com/blog/${slug}`}
        schema={JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: seoDescription,
          image: post.featured_image
            ? `https://yoananincoaching.com${post.featured_image}`
            : 'https://yoananincoaching.com/metaOG.png',
          author: {
            '@type': 'Person',
            name: post.author,
          },
          datePublished: post.date,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://yoananincoaching.com/blog/${slug}`,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Yoana Nin Coaching',
            logo: {
              '@type': 'ImageObject',
              url: 'https://yoananincoaching.com/metaOG.png',
            },
          },
        })}
      />
      <div className={styles.container}>
        <header className={styles.postHeader}>
          <div className={styles.postMeta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <div className={styles.postInfo}>
            <span>By {post.author}</span>
            <div className={styles.tags}>
              {post.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </header>

        {post.featured_image && (
          <div className={styles.featuredImageWrap}>
            <img
              src={post.featured_image}
              alt={post.image_alt || post.title}
              className={styles.featuredImage}
              loading="lazy"
            />
          </div>
        )}

        <div className={styles.postContent}>
          {post.content?.trim() ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div>
              <p>Blog post content coming soon...</p>
            </div>
          )}
        </div>

        <footer className={styles.postFooter}>
          <div className={styles.backToBlog}>
            <a href="/blog" className={styles.backLink}>← Back to Insights & Inspiration</a>
          </div>

          <div className={styles.callToAction}>
            <h3>Ready to Begin Your Journey?</h3>
            <p>If this resonates with you, I'd love to support you in creating the life your heart is calling for.</p>
            <a href="/contact" className="btn btn-primary">Let's Connect</a>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
