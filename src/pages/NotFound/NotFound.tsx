import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
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