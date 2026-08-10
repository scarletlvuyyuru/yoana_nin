import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Coaching.module.css';
import SEO from '../../components/SEO/SEO';
import womenEntrepreneurGroupImage from '../../assets/images/womenentrepreneurgroup.webp';
import yoanaOneOnOneImage from '../../assets/images/yoana1on1.webp';

type OfferId = 'group' | 'private';

type ExpandedState = Record<OfferId, boolean>;

const coachingSchemas = [
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://yoananincoaching.com/coaching#webpage',
    url: 'https://yoananincoaching.com/coaching',
    name: 'Work With Me | Yoana Nin',
    description: 'Explore group and private ADHD coaching offers for women entrepreneurs.',
    isPartOf: { '@id': 'https://yoananincoaching.com/#website' },
    about: [
      { '@id': 'https://yoananincoaching.com/#person' },
      { '@id': 'https://yoananincoaching.com/#organization' },
      { '@id': 'https://yoananincoaching.com/coaching#offer-catalog' },
    ],
    breadcrumb: { '@id': 'https://yoananincoaching.com/coaching#breadcrumb' },
    inLanguage: 'en-US',
  }),
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://yoananincoaching.com/coaching#breadcrumb',
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
        name: 'Coaching',
        item: 'https://yoananincoaching.com/coaching',
      },
    ],
  }),
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://yoananincoaching.com/#person',
    name: 'Yoana Nin',
    jobTitle: 'ADHD Entrepreneur Coach',
    worksFor: { '@id': 'https://yoananincoaching.com/#organization' },
    url: 'https://yoananincoaching.com/',
    sameAs: [
      'https://www.youtube.com/@ElevatewithYoanaNin',
      'https://www.facebook.com/Nin.Yoana/',
      'https://www.instagram.com/yoananincoaching/',
      'https://www.linkedin.com/in/yoananin',
      'https://www.tiktok.com/@adhdcoachyoana?is_from_webapp=1&sender_device=pc',
    ],
    knowsAbout: [
      'ADHD coaching',
      'Executive function coaching',
      'Task initiation',
      'Emotional regulation',
      'Women entrepreneur coaching',
      'Business execution coaching',
      'Productivity systems for ADHD',
      'Body doubling',
      'Accountability coaching',
      'Mindset coaching',
      'Expat coaching',
    ],
  }),
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://yoananincoaching.com/coaching#group-service',
    name: 'A Daily Healing Diary Circle',
    alternateName: 'Group Coaching Program',
    serviceType: 'Group ADHD Coaching',
    provider: { '@id': 'https://yoananincoaching.com/#person' },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'City', name: 'Raleigh' },
      { '@type': 'City', name: 'Cary' },
      { '@type': 'City', name: 'Durham' },
      { '@type': 'City', name: 'Chapel Hill' },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Women entrepreneurs over 35 with ADHD diagnosis',
    },
    description:
      'Small-group ADHD coaching for women entrepreneurs focused on task initiation, emotional regulation, and consistent business execution.',
    offers: {
      '@type': 'Offer',
      url: 'https://yoananincoaching.com/coaching#group-offer',
      price: '177',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      category: 'Monthly coaching membership',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'A Daily Healing Diary Circle Inclusions',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '2 live 60-minute group coaching calls on Zoom' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '1 monthly body doubling / co-working session (45 minutes)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Private accountability community access' } },
      ],
    },
    termsOfService: 'https://yoananincoaching.com/terms',
  }),
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://yoananincoaching.com/coaching#private-service',
    name: '6-Month Private Coaching',
    alternateName: '6-Month 1:1 ADHD Coaching Program',
    serviceType: 'Private ADHD Business Coaching',
    provider: { '@id': 'https://yoananincoaching.com/#person' },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'City', name: 'Raleigh' },
      { '@type': 'City', name: 'Cary' },
      { '@type': 'City', name: 'Durham' },
      { '@type': 'City', name: 'Chapel Hill' },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Women entrepreneurs over 35 with ADHD, diagnosed or self-identified',
    },
    description:
      'Deep personalised ADHD coaching focused on task initiation, emotional regulation, and business execution with weekly private sessions.',
    offers: {
      '@type': 'Offer',
      url: 'https://yoananincoaching.com/coaching#private-offer',
      price: '4777',
      priceCurrency: 'USD',
      availability: 'https://schema.org/LimitedAvailability',
      category: '6-month private coaching engagement',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '6-Month Private Coaching Inclusions',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Weekly 60-minute private Zoom sessions' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Personalised ADHD strategy and implementation support' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Between-session voice message / email support' } },
      ],
    },
    termsOfService: 'https://yoananincoaching.com/terms',
  }),
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': 'https://yoananincoaching.com/coaching#offer-catalog',
    name: 'Yoana Nin Coaching Offers',
    url: 'https://yoananincoaching.com/coaching',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 2,
    itemListElement: [
      {
        '@type': 'Offer',
        position: 1,
        itemOffered: { '@id': 'https://yoananincoaching.com/coaching#group-service' },
      },
      {
        '@type': 'Offer',
        position: 2,
        itemOffered: { '@id': 'https://yoananincoaching.com/coaching#private-service' },
      },
    ],
  }),
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://yoananincoaching.com/coaching#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is included every month in A Daily Healing Diary Circle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            '2 live 60-minute group coaching calls on Zoom (hot seat format), 1 monthly body doubling / co-working session (45 minutes), private community space for accountability between calls, monthly focus theme with one short resource (PDF or audio), access to all call replays within 24 hours, and max 10 women per group — intentionally small, always intimate.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do the group coaching calls work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Each group call follows a simple structure. You bring one real business challenge — something you are stuck on, avoiding, or struggling to move through — and it is worked on live, together. You are coached directly and also learn from watching others coached. The monthly co-working session focuses on one avoided task completed together in silence with accountability.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the 6-Month Private Coaching program?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Weekly 60-minute private Zoom sessions (approximately 24 sessions over 6 months), personalised ADHD strategy built around your specific business and brain, session notes and action points sent within 24 hours of every call, voice message / email support between sessions for quick questions, access to all session recordings, and ongoing adjustments as your business and life evolve.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I get started with 1:1 coaching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Every 1:1 engagement begins with a free 30-minute discovery call to understand where you are, what is getting in the way, and whether private coaching is the right fit right now. There is no obligation and no pitch.',
        },
      },
    ],
  }),
];

const Coaching: React.FC = () => {
  const [expandedOffers, setExpandedOffers] = useState<ExpandedState>(() => {
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      return {
        group: false,
        private: false,
      };
    }

    return {
      group: true,
      private: true,
    };
  });

  const toggleOffer = (offer: OfferId) => {
    setExpandedOffers((current) => ({
      ...current,
      [offer]: !current[offer],
    }));
  };

  return (
    <div className="main-content">
      <SEO
        title="Work With Me | Yoana Nin"
        description="Explore group and private ADHD coaching offers for women entrepreneurs."
        url="https://yoananincoaching.com/coaching"
        schema={coachingSchemas}
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}>WORK WITH ME</p>
          <h1 className={styles.title}>GROUP + 1:1 COACHING</h1>
        </div>
      </section>

      <section id="coaching-offers" className={styles.offersSection}>
        <div className={styles.container}>
          <div className={styles.offersGrid}>
            <article id="group-offer" className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <img
                  src={womenEntrepreneurGroupImage}
                  alt="Women entrepreneurs in a supportive group coaching environment"
                  className={styles.offerImage}
                  width={2560}
                  height={1440}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <h2 className={styles.offerTitle}>A Daily Healing Diary Circle</h2>
                <p className={styles.offerTagline}>
                  A small-group coaching experience for women entrepreneurs with ADHD who are done letting their brain get in the way of their business.
                </p>
              
                <div className={styles.includedSummary}>
                  <h3>What is included every month:</h3>
                  <ul className={styles.checklist}>
                    <li>✓ 2 live 60-minute group coaching calls on Zoom (hot seat format)</li>
                    <li>✓ 1 monthly body doubling / co-working session (45 minutes)</li>
                    <li>✓ Private community space for accountability between calls</li>
                    <li>✓ Monthly focus theme with one short resource (PDF or audio)</li>
                    <li>✓ Access to all call replays within 24 hours</li>
                    <li>✓ Max 10 women per group — intentionally small, always intimate</li>
                  </ul>
                </div>
                <p className={styles.offerPrice}>$177 / month</p>
                <a
                  href="https://link.fastpaydirect.com/payment-link/6a73adcc7b99151a5404288d"
                  className={styles.primaryCta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Circle — $177/month
                </a>
              </div>

              <button
                type="button"
                className={styles.expandButton}
                onClick={() => toggleOffer('group')}
                aria-expanded={expandedOffers.group}
                aria-controls="group-details"
              >
                <span>Full Details</span>
                <span className={`${styles.caret} ${expandedOffers.group ? styles.caretOpen : ''}`} aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id="group-details"
                className={`${styles.expandPanel} ${expandedOffers.group ? styles.panelOpen : ''}`}
              >
                <div className={styles.panelInner}>
                  <p className={styles.leadParagraph}>
                    You know what to do. You just cannot make yourself do it.
                  </p>
                  <p>
                    You have the business. You have the ideas. You have the drive — in bursts, at least. But the follow-through is inconsistent, the emotional spirals are real, and some days the gap between where you are and where you know you could be feels impossible to close.
                  </p>
                  <p>
                    That gap has a name. It is called task initiation. And the spiral that comes after a hard day has a name too — emotional dysregulation. Both are executive function challenges. Both are directly linked to ADHD. And both are trainable.
                  </p>
                  <p>
                    A Daily Healing Diary Circle is where you learn to work with your brain — not against it — alongside a small group of women who understand exactly what that means.
                  </p>

                  <h3>This is for you if:</h3>
                  <ul>
                    <li>You are a woman entrepreneur over 35 with an ADHD diagnosis</li>
                    <li>You are tired of starting strong and losing momentum before anything finishes</li>
                    <li>Difficult emotions — frustration, shame, overwhelm — regularly derail your workday</li>
                    <li>You have tried every productivity system and none of them stick</li>
                    <li>You want structured support without the commitment of 1:1 coaching right now</li>
                  </ul>

                  <h3>What is included every month:</h3>
                  <ul className={styles.checklist}>
                    <li>✓ 2 live 60-minute group coaching calls on Zoom (hot seat format)</li>
                    <li>✓ 1 monthly body doubling / co-working session (45 minutes)</li>
                    <li>✓ Private community space for accountability between calls</li>
                    <li>Monthly focus theme with one short resource (PDF or audio)</li>
                    <li>✓ Access to all call replays within 24 hours</li>
                    <li>✓ Max 10 women per group — intentionally small, always intimate</li>
                  </ul>

                  <h3>How the calls work:</h3>
                  <p>
                    Each group call follows a simple structure. You bring one real business challenge — something you are stuck on, avoiding, or struggling to move through. We work on it live, together. You will be coached directly and you will learn from watching others coached. Both are powerful. Both are intentional.
                  </p>
                  <p>
                    The monthly co-working session is something different. We show up, name the one thing we have been most avoiding, and we do it — together, in silence, with the accountability of ten women who understand exactly why that silence matters.
                  </p>

                  <h3>Investment:</h3>
                  <p>$177 / month</p>
                  <p>Cancel anytime after the first 30 days · Max 10 women · Currently enrolling</p>
                  <p>
                    Spots are limited to 10 women per group. When the group is full, the next available opening goes to the waitlist first.
                  </p>

                  <div className={styles.secondaryCtas}>
                    <a
                      href="https://link.fastpaydirect.com/payment-link/6a73adcc7b99151a5404288d"
                      className={`${styles.secondaryCta} ${styles.secondaryCtaStrong}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join the Circle — $177/month
                    </a>
                    <a href="#" className={`${styles.secondaryCta} ${styles.secondaryCtaStrong}`}>Join the Waitlist</a>
                  </div>

                  <div className={styles.discoveryCallBlock}>
                    <p className={styles.discoveryCallCopy}>
                      Not sure yet? The free discovery call is 30 minutes. No pitch, no pressure — just a conversation about where you are and whether this is the right fit.
                    </p>

                    <div className={styles.secondaryCtas}>
                      <Link to="/resources/" className={`${styles.secondaryCta} ${styles.discoveryCallCta}`}>Book a Free Discovery Call</Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article id="private-offer" className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <img
                  src={yoanaOneOnOneImage}
                  alt="Yoana in a focused 1-on-1 private coaching session"
                  className={styles.offerImage}
                  width={2752}
                  height={1536}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
                <h2 className={styles.offerTitle}>6-Month Private Coaching</h2>
                <p className={styles.offerTagline}>
                  Deep, personalised ADHD coaching for women entrepreneurs who are ready to build a business that works with their brain — for good.
                </p>
                
                <div className={styles.includedSummary}>
                  <h3>What is included:</h3>
                  <ul className={styles.checklist}>
                    <li>✓ Weekly 60-minute private Zoom sessions (approximately 24 sessions over 6 months)</li>
                    <li>✓ Personalised ADHD strategy built around your specific business and brain</li>
                    <li>✓ Session notes and action points sent within 24 hours of every call</li>
                    <li>✓ Voice message / email support between sessions for quick questions</li>
                    <li>✓ Access to all session recordings</li>
                    <li>✓ Ongoing adjustments as your business and life evolve</li>
                  </ul>
                </div>
                <p className={styles.offerPrice}>$4,777</p>
                <Link to="/resources/" className={styles.primaryCta}>
                  Book Your Free Discovery Call
                </Link>
              </div>

              <button
                type="button"
                className={styles.expandButton}
                onClick={() => toggleOffer('private')}
                aria-expanded={expandedOffers.private}
                aria-controls="private-details"
              >
                <span>Full Details</span>
                <span className={`${styles.caret} ${expandedOffers.private ? styles.caretOpen : ''}`} aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                id="private-details"
                className={`${styles.expandPanel} ${expandedOffers.private ? styles.panelOpen : ''}`}
              >
                <div className={styles.panelInner}>
                  <p className={styles.leadParagraph}>
                    This is for the woman who is done experimenting.
                  </p>
                  <p>
                    You have read the books. You have tried the apps. You have hired the business coach who gave you a 90-day plan your brain refused to follow. You are not a beginner. You know more about your ADHD than most doctors who treat it.
                  </p>
                  <p>
                    What you have not had yet is someone who works with you — consistently, weekly, over enough time to actually change patterns — on the two things that determine whether your business grows or stalls: task initiation and emotional regulation.
                  </p>
                  <p>
                    That is what six months of private coaching with me looks like.
                  </p>

                  <h3>This is for you if:</h3>
                  <ul>
                    <li>You are a woman entrepreneur over 35 with ADHD — diagnosed or self-identified</li>
                    <li>Your business has potential but your executive function keeps getting in the way</li>
                    <li>You need more than a group — you need someone in your corner, every single week</li>
                    <li>You are ready to invest in a real solution, not another workaround</li>
                    <li>You want strategies built specifically for how your brain works — not adapted from neurotypical systems</li>
                  </ul>

                  <h3>What we work on:</h3>
                  <h4>Task Initiation</h4>
                  <p>
                    The gap between knowing what to do and actually starting it. We build the brain-based systems, rituals, and structures that close that gap — specific to your business, your schedule, and your ADHD profile.
                  </p>

                  <h4>Emotional Regulation</h4>
                  <p>
                    The hard days that collapse your productivity. The shame spiral after a missed deadline. The overwhelm that shuts everything down by noon. We work on what is actually happening neurologically — and what to do about it in real time.
                  </p>

                  <h4>Business Execution</h4>
                  <p>
                    Strategy is easy for the ADHD brain. Execution is where things fall apart. We apply everything we build directly to your business — your offers, your clients, your revenue goals — so this is never abstract.
                  </p>

                  <h3>What is included:</h3>
                  <ul className={styles.checklist}>
                    <li>✓ Weekly 60-minute private Zoom sessions (approximately 24 sessions over 6 months)</li>
                    <li>✓ Personalised ADHD strategy built around your specific business and brain</li>
                    <li>✓ Session notes and action points sent within 24 hours of every call</li>
                    <li>✓ Voice message / email support between sessions for quick questions</li>
                    <li>✓ Access to all session recordings</li>
                    <li>✓ Ongoing adjustments as your business and life evolve</li>
                  </ul>

                  <h3>Investment:</h3>
                  <p>$4,777</p>
                  <p>Paid in full · 6-month commitment · Weekly Zoom sessions · Limited availability</p>

                  <h3>How to get started:</h3>
                  <p>
                    Every 1:1 engagement begins with a free 30-minute discovery call. We use that time to understand where you are, what is getting in the way, and whether private coaching is the right fit right now. There is no obligation and no pitch. Just a real conversation.
                  </p>

                  <p>
                    I take on a small number of 1:1 clients at a time. If you are ready to move, book the call before the next opening fills.
                  </p>

                  <div className={styles.secondaryCtas}>
                    <Link to="/resources/" className={`${styles.secondaryCta} ${styles.secondaryCtaStrong}`}>Book Your Free Discovery Call</Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coaching;