import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Coaching.module.css';
import SEO from '../../components/SEO/SEO';
import LeadMagnetForm from '../../components/LeadMagnet/LeadMagnetForm';
import Testimonials from '../../components/Testimonials/Testimonials';
import yoanaOneOnOneImage from '../../assets/images/yoana1on1.webp';
import yoanaPortrait from '../../assets/images/yoana-nin-blue-shirt-pose.webp';
import adhdBadge from '../../assets/images/Adhd_certification_badge-72.webp';
import { HelpCarousel, SelfCheckDeck, StickyCallBar, useReveal } from '../../components/MobileInteractions/MobileInteractions';

// The discovery call is requested through the contact form.
const CALL_PATH = '/contact';
const SHOW_MATCH_AT = 3;

const relatableStatements = [
  'I start strong, then lose momentum before anything gets finished.',
  'I know exactly what to do. I just cannot make myself start.',
  'One missed deadline turns into a whole day of shame and frustration.',
  'By noon, the overwhelm has already shut my day down.',
  'I have tried every planner, app and productivity system. None of them stick.',
  'My business has real potential, but my follow-through does not match it.',
  'I am exhausted from pushing myself with willpower alone.',
  'I hold it together for everyone else, and my own priorities slip.',
];

const helpAreas = [
  {
    title: 'Task Initiation',
    text: 'Closing the gap between knowing what to do and actually starting it. We build rituals, structures and routines that fit your business, your schedule and the way you work best.',
  },
  {
    title: 'Emotional Regulation',
    text: 'The hard days that collapse your productivity, the spiral after a missed deadline, the frustration that takes over. You learn practical tools to notice it, reset and keep going.',
  },
  {
    title: 'Business Execution',
    text: 'Ideas are rarely the problem. Follow-through is. Everything we build is applied directly to your offers, your clients and your revenue goals, so it never stays abstract.',
  },
  {
    title: 'Overwhelm & Time',
    text: 'Prioritising when everything feels urgent, planning around your energy instead of against it, and building weeks that leave room for your life, not just your to-do list.',
  },
];

const steps = [
  {
    title: 'Request your free call',
    text: 'Send a quick message through the contact form. Yoana reaches out personally to set up a 30-minute conversation.',
  },
  {
    title: 'Talk it through',
    text: 'We look at where you are, what is getting in the way and what you want to change. If coaching is the right fit, you will get a clear picture of the plan and the investment.',
  },
  {
    title: 'Start coaching',
    text: 'Weekly private sessions with a plan built around your brain, your business and your goals.',
  },
];

const faqs = [
  {
    question: 'Why is pricing not listed?',
    answer:
      'Every coaching plan is tailored to the person in front of me, so a number on a page would not tell you much. On your free discovery call, once we know what you need, you will get a clear, specific answer about the investment, with no pressure to decide on the spot.',
  },
  {
    question: 'Do I need an ADHD diagnosis to work with you?',
    answer:
      'No. I work with women who are diagnosed, waiting for an assessment or self-identified. I am a coach, so I do not diagnose ADHD. If you are exploring a diagnosis, a qualified medical or mental health professional is the right place for that, and coaching can work alongside it.',
  },
  {
    question: 'Is coaching the same as therapy or medical treatment?',
    answer:
      'No. Coaching is forward-focused and practical: building systems, habits and strategies for your work and life. It does not replace therapy, medication or medical care, and it works well alongside them. If something comes up that needs clinical support, I will tell you and encourage you to reach out to a professional.',
  },
  {
    question: 'What happens on the discovery call?',
    answer:
      'It is a 30-minute conversation about where you are, what is getting in the way and what you want to change. We will see whether private coaching is the right fit right now. There is no obligation and no hard sell.',
  },
  {
    question: 'Who is this coaching for?',
    answer:
      'Women entrepreneurs, especially over 35, who live with ADHD (diagnosed or self-identified) and are ready for consistent, personalised support in their business.',
  },
];

const coachingSchemas = [
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://yoananincoaching.com/coaching#webpage',
    url: 'https://yoananincoaching.com/coaching',
    name: 'ADHD Coaching for Women Entrepreneurs | Yoana Nin',
    description:
      'Private ADHD coaching for women entrepreneurs: task initiation, emotional regulation and business execution. Book a free 30-minute discovery call.',
    isPartOf: { '@id': 'https://yoananincoaching.com/#website' },
    about: [
      { '@id': 'https://yoananincoaching.com/#person' },
      { '@id': 'https://yoananincoaching.com/#organization' },
      { '@id': 'https://yoananincoaching.com/coaching#private-service' },
    ],
    breadcrumb: { '@id': 'https://yoananincoaching.com/coaching#breadcrumb' },
    inLanguage: 'en-US',
  }),
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://yoananincoaching.com/coaching#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yoananincoaching.com/' },
      { '@type': 'ListItem', position: 2, name: 'Coaching', item: 'https://yoananincoaching.com/coaching' },
    ],
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
      'Personalised ADHD coaching focused on task initiation, emotional regulation and business execution, with weekly private sessions. Coaching does not diagnose or treat ADHD.',
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
    '@type': 'FAQPage',
    '@id': 'https://yoananincoaching.com/coaching#faq',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }),
];

const CallButton: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className, children }) => (
  <Link to={CALL_PATH} className={className ?? styles.primaryCta} onClick={() => window.scrollTo(0, 0)}>
    {children ?? 'Book Your Free Discovery Call'}
  </Link>
);

const Coaching: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>(() => relatableStatements.map(() => false));
  const checkedCount = checked.filter(Boolean).length;

  const toggleStatement = (index: number) => {
    setChecked((current) => current.map((value, i) => (i === index ? !value : value)));
  };

  const setStatement = (index: number, value: boolean) => {
    setChecked((current) => current.map((v, i) => (i === index ? value : v)));
  };

  const pageRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const finalRef = useRef<HTMLElement>(null);
  const hideCallBarRefs = useRef([offerRef, finalRef]).current;
  useReveal(pageRef);

  const matchCard = (
    <div className={styles.matchCard}>
      <p className={styles.matchTitle}>You ticked {checkedCount}. You are exactly who I work with.</p>
      <p>None of this means you are lazy or broken. It means you need support built for how you work.</p>
      <CallButton>Let's Talk: Book Your Free Call</CallButton>
    </div>
  );

  return (
    <div className="main-content" ref={pageRef}>
      <SEO
        title="ADHD Coaching for Women Entrepreneurs | Yoana Nin"
        description="Private ADHD coaching for women entrepreneurs: task initiation, emotional regulation and business execution. Book a free 30-minute discovery call."
        url="https://yoananincoaching.com/coaching"
        schema={coachingSchemas}
      />

      {/* 1. Hero */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroPill}>Private ADHD Coaching</p>
            <h1 className={styles.title}>
              You know what to do. <span className={styles.titleAccent}>So why can't you make yourself start?</span>
            </h1>
            <p className={styles.subtitle}>
              Weekly 1:1 coaching for women entrepreneurs who are done fighting their brain to run their business.
            </p>
            <div className={styles.heroCtas} ref={heroCtaRef}>
              <CallButton className={`${styles.primaryCta} ${styles.heroCta}`} />
              <a href="#is-this-you" className={styles.ghostCta}>
                Does this sound like you? ↓
              </a>
            </div>
            <ul className={styles.trustRow}>
              <li>
                <span className={styles.trustIcon} aria-hidden="true">
                  <img src={adhdBadge} alt="" width={44} height={44} className={styles.trustBadge} />
                </span>
                <span>Certified ADHD Coach</span>
              </li>
              <li>
                <span className={styles.trustIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span>Free 30-minute call</span>
              </li>
              <li>
                <span className={styles.trustIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="12" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </span>
                <span>Virtual across the U.S.</span>
              </li>
            </ul>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroBlob} aria-hidden="true" />
            <img
              src={yoanaPortrait}
              alt="Yoana Nin, certified ADHD coach for women entrepreneurs"
              className={styles.heroPortrait}
              width={390}
              height={520}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className={styles.heroQuote}>
              <p>"You are not lazy. You need a system built for how you work."</p>
              <span>Yoana Nin</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Relatable self-check */}
      <section id="is-this-you" className={`${styles.section} ${styles.checkSection} geo-pattern`}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>Does this sound like you?</p>
            <h2 className={styles.sectionTitle}>
              <span className={styles.desktopOnly}>Tap everything that feels familiar.</span>
              <span className={styles.mobileOnly}>Swipe right if it sounds like you.</span>
            </h2>
          </div>
          <div className={styles.mobileOnly}>
            <SelfCheckDeck
              statements={relatableStatements}
              checked={checked}
              onAnswer={setStatement}
              onReset={() => setChecked(relatableStatements.map(() => false))}
              renderResult={() =>
                checkedCount >= SHOW_MATCH_AT ? (
                  matchCard
                ) : (
                  <div className={styles.softResult}>
                    <p className={styles.softResultTitle}>
                      {checkedCount === 0 ? 'None of these fit right now.' : `${checkedCount} of these sound like you.`}
                    </p>
                    <p>Even one or two can make a workday harder. A free call is a no-pressure way to talk it through.</p>
                    <CallButton />
                  </div>
                )
              }
            />
          </div>
          <div className={styles.desktopOnly}>
          <div className={styles.progressRow} aria-hidden="true">
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${(checkedCount / relatableStatements.length) * 100}%` }}
              />
            </div>
            <span className={styles.progressLabel}>
              {checkedCount} / {relatableStatements.length}
            </span>
          </div>
          <ul className={styles.checkList}>
            {relatableStatements.map((statement, index) => (
              <li key={statement}>
                <button
                  type="button"
                  className={`${styles.checkItem} ${checked[index] ? styles.checkItemOn : ''}`}
                  aria-pressed={checked[index]}
                  onClick={() => toggleStatement(index)}
                >
                  <span className={styles.checkMark} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className={styles.checkText}>{statement}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.matchArea} aria-live="polite">
            {checkedCount >= SHOW_MATCH_AT ? (
              matchCard
            ) : (
              <p className={styles.matchHint}>
                {checkedCount === 0
                  ? 'Tap as many as apply. Nobody sees this but you.'
                  : `${checkedCount} so far. Keep going, be honest with yourself.`}
              </p>
            )}
          </div>
          </div>
        </div>
      </section>

      {/* 3. Reframe */}
      <section className={`${styles.section} ${styles.reframeSection}`}>
        <div className={styles.containerNarrow}>
          <h2 className={styles.reframeTitle} data-reveal>It is not a willpower problem.</h2>
          <p>
            Getting started, staying with a task and recovering after a hard day all depend on executive function, the
            skills that help you plan, focus and manage your emotions. With ADHD, these skills often take more effort.
          </p>
          <p>
            The good news: they can be strengthened with the right structure, strategies and support. That is what coaching
            is for.
          </p>
        </div>
      </section>

      {/* 4. What I help with */}
      <section id="how-i-help" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>How I can help</p>
            <h2 className={styles.sectionTitle}>What we work on together</h2>
          </div>
          <HelpCarousel className={styles.helpGrid} count={helpAreas.length}>
            {helpAreas.map((area, index) => (
              <article key={area.title} className={styles.helpCard}>
                <span className={styles.helpNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            ))}
          </HelpCarousel>
        </div>
      </section>

      {/* 5. What coaching is, and is not */}
      <section className={`${styles.section} ${styles.altSection} geo-pattern geo-pattern--flip`}>
        <div className={styles.containerNarrow}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>Clear expectations</p>
            <h2 className={styles.sectionTitle}>What coaching is, and what it is not</h2>
          </div>
          <div className={styles.isIsNotGrid} data-reveal>
            <div className={styles.isCard}>
              <h3>Coaching is</h3>
              <ul>
                <li>Practical, forward-focused support from a certified coach who specialises in ADHD</li>
                <li>Building systems, habits and strategies that fit how you work</li>
                <li>Consistent accountability, applied directly to your business</li>
                <li>A great complement to the care you already have</li>
              </ul>
            </div>
            <div className={styles.isNotCard}>
              <h3>Coaching is not</h3>
              <ul>
                <li>An ADHD diagnosis or assessment</li>
                <li>Therapy, counselling or medical treatment</li>
                <li>Advice about medication</li>
                <li>A replacement for your doctor or therapist</li>
              </ul>
            </div>
          </div>
          <p className={styles.note}>
            You do not need a diagnosis to start. If you are exploring one, a qualified medical or mental health professional
            can help with that, and coaching can work alongside it.
          </p>
        </div>
      </section>

      {/* 6. How it works */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>How it works</p>
            <h2 className={styles.sectionTitle}>Three simple steps</h2>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.step} style={{ '--i': index } as React.CSSProperties}>
                <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className={styles.centerCta}>
            <CallButton className={`${styles.primaryCta} ${styles.inlineCta}`} />
          </div>
        </div>
      </section>

      {/* 7. The offer */}
      <section id="private-offer" className={`${styles.offersSection} geo-pattern`} ref={offerRef}>
        <div className={styles.container}>
          <article className={styles.offerCard} data-reveal>
            <div className={styles.offerLayout}>
              <div className={styles.offerMedia}>
              <img
                src={yoanaOneOnOneImage}
                alt="Yoana in a focused 1-on-1 private coaching session"
                className={styles.offerImage}
                width={2752}
                height={1536}
                loading="lazy"
                decoding="async"
              />
              </div>
              <div className={styles.offerBody}>
                <p className={styles.sectionKicker}>Work with me</p>
                <h2 className={styles.offerTitle}>6-Month Private Coaching</h2>
                <p className={styles.offerTagline}>
                  Weekly, personalised coaching for women entrepreneurs who are ready to build a business that works with
                  their brain, for good.
                </p>
                <div className={styles.offerColumns}>
                <div className={styles.includedSummary}>
                  <h3>What is included</h3>
                  <ul className={styles.checklist}>
                    <li>Weekly 60-minute private Zoom sessions (about 24 over 6 months)</li>
                    <li>A personalised strategy built around your business and how you work</li>
                    <li>Session notes and action points within 24 hours of every call</li>
                    <li>Voice message / email support between sessions</li>
                    <li>Access to all session recordings</li>
                    <li>Ongoing adjustments as your business and life change</li>
                  </ul>
                </div>
                <div className={styles.offerAside}>
                <div className={styles.investment}>
                  <h3>Investment</h3>
                  <p>
                    Tailored to you and shared on your free discovery call, once we know what you need. No surprises and no
                    pressure.
                  </p>
                  <p className={styles.investmentMeta}>6-month commitment · Weekly Zoom sessions · Limited availability</p>
                </div>
                <CallButton />
                </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <Testimonials />
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="coaching-faq" className={`${styles.section} ${styles.altSection} geo-pattern geo-pattern--flip`}>
        <div className={styles.containerNarrow}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>Questions</p>
            <h2 className={styles.sectionTitle}>Before you book</h2>
          </div>
          <div className={styles.faqList} data-reveal>
            {faqs.map((faq) => (
              <details key={faq.question} className={styles.faqItem}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA + soft fallback */}
      <section className={styles.finalSection} ref={finalRef}>
        <div className={styles.containerNarrow}>
          <h2 className={styles.finalTitle} data-reveal>Ready to stop doing this alone?</h2>
          <p className={styles.finalText}>
            The first step is a free 30-minute conversation. No obligation, just an honest look at what would help.
          </p>
          <CallButton className={`${styles.primaryCta} ${styles.inlineCta} ${styles.finalCta}`} />
          <p className={styles.softLead}>
            Not ready for a call yet? <Link to="/assessment">Take the free ADHD assessment</Link> or grab the free guide
            below.
          </p>
        </div>
        <div className={styles.container}>
          <LeadMagnetForm
            variant="banner"
            source="coaching-page-footer"
            title="Free ADHD SOS Guide"
            subtitle="Get the practical guide for women entrepreneurs with ADHD."
          />
        </div>
      </section>

      <StickyCallBar to={CALL_PATH} showAfter={heroCtaRef} hideWhen={hideCallBarRefs} />
    </div>
  );
};

export default Coaching;
