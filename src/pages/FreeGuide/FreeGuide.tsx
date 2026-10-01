import React from 'react';
import SEO from '../../components/SEO/SEO';
import LeadMagnetForm from '../../components/LeadMagnet/LeadMagnetForm';
import styles from './FreeGuide.module.css';

const FreeGuide: React.FC = () => {
  return (
    <>
      <SEO
        title="Free ADHD SOS Guide | Yoana Nin Coaching"
        description="Download Yoana Nin's free ADHD SOS Guide for women entrepreneurs. Enter your name and email and we will send it straight to your inbox."
        url="https://yoananincoaching.com/free-adhd-guide"
      />

      <section className={styles.pageSection}>
        <div className={styles.container}>
          <p className={styles.kicker}>FREE RESOURCE</p>
          <h1 className={styles.title}>Get The ADHD SOS Guide</h1>
          <p className={styles.subtitle}>
            A practical, no-fluff guide to help you calm the chaos, pick the right priorities, and move your business forward.
          </p>

          <LeadMagnetForm
            variant="page"
            source="free-guide-page"
            title="Download Your Free Guide"
            subtitle="Enter your details below and we'll email the guide straight to your inbox."
          />
        </div>
      </section>
    </>
  );
};

export default FreeGuide;
