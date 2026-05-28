import React from 'react';
import styles from './Events.module.css';
import SEO from '../../components/SEO/SEO';

const Events: React.FC = () => {
  return (
    <>
      <SEO
        title="Events | Yoana Nin"
        description="Explore Yoana Nin's recent media features, community highlights, event moments, and upcoming in-person events."
        url="https://yoananincoaching.com/events"
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Events</p>
          <h1 className={styles.title}>Recent achievements, local impact, and live events</h1>
          <p className={styles.subtitle}>
            This page will showcase articles, community work, event imagery, and ways to join upcoming in-person experiences.
          </p>
        </div>
      </section>

      <section id="media-features" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Media Features</h2>
          <p className={styles.sectionText}>
            Placeholder for recently published articles, interviews, and media mentions featuring Yoana.
          </p>
          <div className={styles.placeholderGrid}>
            <article className={styles.card}>Article spotlight card</article>
            <article className={styles.card}>Podcast or interview highlight</article>
            <article className={styles.card}>Press quote or feature snippet</article>
          </div>
        </div>
      </section>

      <section id="community-highlights" className={`${styles.section} ${styles.altSection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Community Highlights</h2>
          <p className={styles.sectionText}>
            Placeholder for local activities, service moments, and event photo highlights from the community.
          </p>
          <div className={styles.placeholderGrid}>
            <article className={styles.card}>Local activity recap</article>
            <article className={styles.card}>Community event gallery teaser</article>
            <article className={styles.card}>Volunteer or partnership highlight</article>
          </div>
        </div>
      </section>

      <section id="upcoming-events" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Upcoming In-Person Events</h2>
          <p className={styles.sectionText}>
            Placeholder for upcoming events people can attend, including date, location, and registration details.
          </p>
          <div className={styles.placeholderGrid}>
            <article className={styles.card}>Event listing template</article>
            <article className={styles.card}>Featured upcoming workshop</article>
            <article className={styles.card}>Join waitlist or RSVP callout</article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
