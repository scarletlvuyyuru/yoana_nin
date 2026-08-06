import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';

const notFoundSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://yoananincoaching.com/404#webpage',
    url: 'https://yoananincoaching.com/404',
    name: 'Page Not Found | Yoana Nin Coaching',
    description: '404 page for Yoana Nin Coaching.',
    isPartOf: { '@id': 'https://yoananincoaching.com/#website' },
    inLanguage: 'en-US',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://yoananincoaching.com/404#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://yoananincoaching.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '404',
        item: 'https://yoananincoaching.com/404',
      },
    ],
  },
];

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <Helmet>
        <title>Page Not Found | Yoana Nin Coaching</title>
        <meta name="description" content="The page you requested could not be found." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://yoananincoaching.com/404" />
        {notFoundSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Page Not Found</h2>
          <p className={styles.message}>
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className={styles.actions}>
            <a href="https://yoananincoaching.com" className={`btn btn-primary ${styles.homeButton}`}>
              Go Home
            </a>
            <Link to="/contact" className={`btn btn-secondary ${styles.contactButton}`}>
              Contact Us
            </Link>
          </div>
          <div className={styles.suggestions}>
            <h3>You might be looking for:</h3>
            <ul>
              <li><Link to="/coaching">ADHD Coaching</Link></li>
              <li><Link to="/my-story">My Story</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;