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
  const postUrl = `https://yoananincoaching.com/blog/${slug}`;
  const postImageUrl = post.featured_image
    ? `https://yoananincoaching.com${post.featured_image}`
    : 'https://yoananincoaching.com/metaOG.png';

  const blogSchemas: string[] = [
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': postUrl,
      headline: post.title,
      description: seoDescription,
      image: { '@type': 'ImageObject', url: postImageUrl },
      author: {
        '@type': 'Person',
        '@id': 'https://yoananincoaching.com/#person',
        name: post.author,
        url: 'https://yoananincoaching.com/my-story',
      },
      datePublished: post.date,
      dateModified: post.date,
      keywords: post.tags.join(', '),
      inLanguage: 'en-US',
      mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      isPartOf: {
        '@type': 'Blog',
        '@id': 'https://yoananincoaching.com/blog',
        name: 'Journal & Insights | Yoana Nin Coaching',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://yoananincoaching.com/#organization',
        name: 'Yoana Nin Coaching',
        logo: { '@type': 'ImageObject', url: 'https://yoananincoaching.com/metaOG.png', width: 1200, height: 630 },
      },
    }),
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yoananincoaching.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://yoananincoaching.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
      ],
    }),
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postFaq = (post as any).faq;
  if (Array.isArray(postFaq) && postFaq.length > 0) {
    blogSchemas.push(JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: postFaq.map((item: { question: string; answer: string }) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    }));
  }

  return (
    <article className={styles.blogPost} data-category={post.category}>
      <SEO
        title={`${post.title} | Yoana Nin Coaching`}
        description={seoDescription}
        url={postUrl}
        canonical={postUrl}
        schema={blogSchemas}
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
