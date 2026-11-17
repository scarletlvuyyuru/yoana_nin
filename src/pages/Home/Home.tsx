import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './Home.module.css';
import SEO from '../../components/SEO/SEO';
import heroImage from '../../assets/images/YoanaExpo.webp';
import adhdBadge from '../../assets/images/Adhd_certification_badge-72.webp';
import lookingThroughFingersImage from '/YoanaIseeYou.webp';
import CredibilityStrip from '../../components/CredibilityStrip/CredibilityStrip';
import Testimonials from '../../components/Testimonials/Testimonials';
import LeadMagnetForm from '../../components/LeadMagnet/LeadMagnetForm';
import { HelpCarousel, StickyCallBar, useReveal } from '../../components/MobileInteractions/MobileInteractions';

const Home: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showLeadPopup, setShowLeadPopup] = useState(false);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const pageRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);
  const hideCallBarRefs = useRef([finalCtaRef]).current;
  useReveal(pageRef);

  interface FaqItem {
    question: string;
    answer: string;
    hasButton?: boolean;
  }

  const faqData: FaqItem[] = [
    {
      question: "What makes your coaching approach different?",
      answer: "My approach combines holistic, purpose-driven business strategies, practical mindset tools, and lived experience as an entrepreneur. I specialize in supporting women entrepreneurs and real estate agents with ADHD, helping them build meaningful businesses with systems that match how their brains work."
    },
    {
      question: "Do you work with real estate agents?",
      answer: "Yes. I built my own real estate business in Cary, NC, so I know the pace firsthand — the lead follow-up, the showings, the contract deadlines, the feast-or-famine income. We build systems for all of it, so your business runs on structure instead of adrenaline."
    },
    {
      question: "Do you work with clients virtually or in-person?",
      answer: "I offer both! Virtual sessions are available for clients worldwide, while in-person sessions are available for Triangle area residents looking for private coaching."
    },
    {
      question: "What can I expect from the free 30-minute call?",
      answer: "This is your safe space to share what's really going on. We'll explore your current challenges, discuss your goals, and see if we're a good fit to work together. There's no pressure—just an honest conversation about your next steps."
    },
    {
      question: "How long do coaching programs typically last?",
      answer: "Programs are customized to your needs. Most clients see significant shifts in 3-6 months, though some prefer longer-term support. We'll design a timeline that feels right for your goals and circumstances."
    },
    {
      question: "Can you help with both business and personal challenges?",
      answer: "Absolutely! I take a holistic approach because your business and personal life are interconnected. Whether you're scaling your business, navigating a major life transition, or both, we address the whole picture."
    },
    {
      question: "Have a different question?",
      answer: "Submit a question here and I'll get back to you personally.",
      hasButton: true
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasDismissed = window.sessionStorage.getItem('leadMagnetDismissed') === '1';
    const hasSubmitted = window.sessionStorage.getItem('leadMagnetSubmitted') === '1';
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isLikelyBot =
      /bot|crawler|spider|lighthouse|pagespeed|headless|preview/.test(userAgent) ||
      window.navigator.webdriver;

    if (hasDismissed || hasSubmitted || isLikelyBot) {
      return;
    }

    let hasInteracted = false;
    let delayPassed = false;

    const maybeOpenPopup = () => {
      if (!hasInteracted || !delayPassed || document.visibilityState !== 'visible') {
        return;
      }

      setShowLeadPopup(true);
      removeListeners();
    };

    const onHumanSignal = () => {
      hasInteracted = true;
      maybeOpenPopup();
    };

    const removeListeners = () => {
      window.removeEventListener('pointerdown', onHumanSignal);
      window.removeEventListener('keydown', onHumanSignal);
      window.removeEventListener('scroll', onHumanSignal);
    };

    const timerId = window.setTimeout(() => {
      delayPassed = true;
      maybeOpenPopup();
    }, 18000);

    window.addEventListener('pointerdown', onHumanSignal, { once: true });
    window.addEventListener('keydown', onHumanSignal, { once: true });
    window.addEventListener('scroll', onHumanSignal, { once: true, passive: true });

    return () => {
      window.clearTimeout(timerId);
      removeListeners();
    };
  }, []);

  const dismissLeadPopup = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('leadMagnetDismissed', '1');
    }

    setShowLeadPopup(false);
  };

  const problems = [
    'You start strong... then lose momentum halfway through',
    'Your to-do list is a mile long but nothing gets done',
    'Leads slip through the cracks because follow-up never became a habit',
    'Contracts, deadlines, and paperwork pile up until something almost falls apart',
    "Your income swings from feast to famine because your pipeline only gets attention when it's empty",
    'You\'ve been told to "just focus" — as if it were that simple',
    "You're brilliant with people but scattered with everything behind the scenes",
    "You wonder if everyone else has a secret you don't",
  ];

  const solutions = [
    {
      title: 'CLARITY',
      text: "We cut through the noise and identify exactly what's holding you back — and what to do first.",
    },
    {
      title: 'SYSTEMS',
      text: 'We build simple, repeatable systems for your ADHD brain — for your leads, your follow-up, your calendar, and your cash flow. Not a neurotypical template.',
    },
    {
      title: 'MOMENTUM',
      text: 'You stop spinning and start moving. Consistently. Confidently. On your terms.',
    },
  ];

  const steps = [
    {
      label: 'Step 1',
      title: 'Book Your Free Discovery Call',
      text: 'No pressure. No pitch. Just a real conversation about where you are and where you want to go.',
    },
    {
      label: 'Step 2',
      title: 'Get Your Custom Roadmap',
      text: 'We build a coaching plan designed specifically for your brain, your business, and your goals.',
    },
    {
      label: 'Step 3',
      title: 'Start Moving Forward',
      text: 'Weekly sessions. Real accountability. Measurable results. No more spinning your wheels.',
    },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div ref={pageRef}>
      <SEO
        title="ADHD Coach for Women Entrepreneurs & Real Estate Agents | Yoana Nin"
        description="ADHD coaching for women entrepreneurs and real estate agents who are done playing small. Systems that work with your brain. Virtual across the U.S. + Cary NC."
        schema={[
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        ]}
      />
      <Helmet>
        <link rel="preload" as="image" href={heroImage} />
      </Helmet>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroPill}>ADHD Powerhouse Coaching</p>
            <h1 className={styles.heroTitle}>
              Your Brain Isn't Broken. <span className={styles.titleAccent}>Your System Is.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              ADHD Coaching for Women Entrepreneurs &amp; Real Estate Agents Who Are Done Playing Small.
            </p>
            <ul className={styles.valueList}>
              <li>
                <span className={styles.valueIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
                  </svg>
                </span>
                <span>You have the drive. The vision. The people who need what you offer.</span>
              </li>
              <li>
                <span className={styles.valueIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19.44 7.85c-.05.32.06.65.29.88l1.57 1.57c.47.47.7 1.09.7 1.7s-.23 1.23-.7 1.7l-1.61 1.61a.98.98 0 0 1-.84.28c-.47-.07-.8-.48-.97-.93a2.5 2.5 0 1 0-3.21 3.21c.45.17.86.5.93.97a.98.98 0 0 1-.28.84l-1.61 1.61a2.4 2.4 0 0 1-1.7.7 2.4 2.4 0 0 1-1.7-.7l-1.57-1.57a1.03 1.03 0 0 0-.88-.29c-.49.07-.84.5-1.02.97a2.5 2.5 0 1 1-3.24-3.24c.46-.18.9-.53.97-1.02a1.03 1.03 0 0 0-.29-.88l-1.57-1.57A2.4 2.4 0 0 1 2 12c0-.62.24-1.23.7-1.7l1.53-1.53c.24-.24.58-.35.92-.3.51.08.88.53 1.07 1.01a2.5 2.5 0 1 0 3.26-3.26c-.48-.2-.93-.56-1.01-1.07-.05-.34.06-.68.3-.92L10.3 2.7A2.4 2.4 0 0 1 12 2c.62 0 1.23.24 1.7.7l1.57 1.57c.23.23.56.34.88.29.49-.07.84-.5 1.02-.97a2.5 2.5 0 1 1 3.24 3.24c-.46.18-.9.53-.97 1.02z" />
                  </svg>
                </span>
                <span>What you need is a system that works with your brain — not against it.</span>
              </li>
              <li>
                <span className={styles.valueIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8.5" cy="12" r="6" />
                    <circle cx="15.5" cy="12" r="6" />
                  </svg>
                </span>
                <span>That's exactly what we build together.</span>
              </li>
            </ul>
            <div className={styles.heroCtas} ref={heroCtaRef}>
              <Link to="/resources" className={styles.primaryCta} onClick={scrollTop}>
                YES, I'M READY — BOOK MY FREE CALL
              </Link>
              <Link to="/assessment" className={styles.ghostCta} onClick={scrollTop}>
                TAKE THE FREE ADHD QUIZ FIRST
              </Link>
            </div>
            <ul className={styles.trustRow}>
              <li>
                <span className={styles.trustIcon} aria-hidden="true">
                  <img src={adhdBadge} alt="" width={36} height={36} className={styles.trustBadge} />
                </span>
                <span>Certified ADHD Coach</span>
              </li>
              <li>
                <span className={styles.trustIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span>Free 30-minute call</span>
              </li>
              <li>
                <span className={styles.trustIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <div className={styles.heroFrame}>
              <img
                src={heroImage}
                alt="Yoana Nin - ADHD coach for women entrepreneurs and real estate agents"
                className={styles.heroImage}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={515}
                height={687}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <CredibilityStrip />

      {/* Problem */}
      <section className={`${styles.section} ${styles.problemSection} geo-pattern`}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>Sound familiar?</p>
            <h2 className={styles.sectionTitle}>Does This Sound Like You?</h2>
          </div>
          <ul className={styles.problemList}>
            {problems.map((problem) => (
              <li key={problem} className={styles.problemItem}>
                <span className={styles.problemIcon} aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none">
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{problem}</span>
              </li>
            ))}
          </ul>
          <p className={styles.problemClose} data-reveal>
            You're not lazy. You're not broken. You're wired differently — and that's your edge.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>The transformation</p>
            <h2 className={styles.sectionTitle}>Here's What Changes When You Work With Me</h2>
          </div>
          <div className={styles.solutionGrid}>
            {solutions.map((solution, index) => (
              <article
                key={solution.title}
                className={styles.solutionCard}
                style={{ '--i': index } as React.CSSProperties}
              >
                <span className={styles.bigNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.solutionCardTitle}>{solution.title}</h3>
                <p className={styles.solutionCardText}>{solution.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section id="section-3-proof" className={`${styles.section} ${styles.altSection} geo-pattern geo-pattern--flip`}>
        <div className={styles.container}>
          <div className={styles.proofGrid} data-reveal>
            <div className={styles.proofStory}>
              <p className={styles.sectionKicker}>Real results</p>
              <h2 className={styles.proofTitle}>I Know This Works — Because My Clients Prove It Every Day</h2>
              <p className={styles.proofLead}>
                <strong>I'm not a coach who learned ADHD from a textbook.</strong>
              </p>
              <p className={styles.proofText}>
                I've sat across from brilliant women entrepreneurs and real estate agents who felt exhausted from fighting their own brains.
              </p>
              <HelpCarousel as="ul" className={styles.proofList} count={3}>
                <li><strong>Every tool, still stuck:</strong> They had planners, strategies, and advice, but no real momentum.</li>
                <li><strong>The real gap:</strong> It was not motivation. It was a system built for how their brain actually works.</li>
                <li><strong>What I specialize in:</strong> Turning chaos into clarity, structure, and consistent execution.</li>
              </HelpCarousel>
            </div>
            <aside className={styles.proofPanel}>
              <p className={styles.proofTextStrong}>And the results speak for themselves.</p>
              <blockquote className={styles.proofQuote}>
                "I don't just teach strategies. I build the exact system your brain needs — and my clients' results are the proof." — Yoana Nin
              </blockquote>
              <Link to="/resources" className={`${styles.primaryCta} ${styles.lightCta}`} onClick={scrollTop}>
                YES, I'M READY — BOOK MY FREE CALL
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Fit */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>Who I work with</p>
            <h2 className={styles.sectionTitle}>This Is For You If...</h2>
          </div>

          <div className={styles.fitHeaderRow} aria-hidden="true">
            <p className={styles.fitHeaderCell}>YOU ARE</p>
            <p className={styles.fitHeaderCell}>YOU'RE STRUGGLING WITH</p>
          </div>

          <HelpCarousel className={styles.fitGrid} count={5} label="profile">
            <article className={styles.fitRow}>
              <p className={styles.fitWho}><strong>A woman entrepreneur with ADHD</strong></p>
              <p className={styles.fitPain}><strong>Staying consistent</strong> and finishing what you start</p>
            </article>

            <article className={styles.fitRow}>
              <p className={styles.fitWho}><strong>A real estate agent with ADHD</strong></p>
              <p className={styles.fitPain}><strong>Consistent lead follow-up, time blocking,</strong> and hitting every contract deadline</p>
            </article>

            <article className={styles.fitRow}>
              <p className={styles.fitWho}><strong>A business owner or agent who suspects ADHD</strong></p>
              <p className={styles.fitPain}><strong>Overwhelm, procrastination, and decision fatigue</strong></p>
            </article>

            <article className={styles.fitRow}>
              <p className={styles.fitWho}><strong>Someone newly diagnosed</strong></p>
              <p className={styles.fitPain}><strong>Understanding how to use your diagnosis as a tool</strong></p>
            </article>

            <article className={styles.fitRow}>
              <p className={styles.fitWho}><strong>A high achiever who feels stuck</strong></p>
              <p className={styles.fitPain}><strong>Turning big ideas into real, measurable results</strong></p>
            </article>
          </HelpCarousel>

          <p className={styles.fitClose} data-reveal>
            If you are ready to <strong>stop surviving and start thriving</strong> — you are in the right place.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section className={`${styles.section} ${styles.altSection} geo-pattern`}>
        <div className={styles.container}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>How It Works</p>
            <h2 className={styles.sectionTitle}>Getting Started Is Simple</h2>
          </div>

          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.label} className={styles.step}>
                <span className={styles.stepCircle} aria-hidden="true">{index + 1}</span>
                <p className={styles.stepLabel}>{step.label}</p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>

          <div className={styles.centerCta}>
            <Link to="/resources" className={styles.primaryCta} onClick={scrollTop}>
              BOOK YOUR FREE CALL NOW ✨
            </Link>
          </div>
        </div>
      </section>

      {/* I See You */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.iSeeYouGrid} data-reveal>
            <div className={styles.iSeeYouVisual}>
              <div className={styles.iSeeYouBlob} aria-hidden="true" />
              <img
                src={lookingThroughFingersImage}
                alt="Yoana looking through her fingers in a playful manner"
                className={styles.iSeeYouImage}
                loading="lazy"
                decoding="async"
                width={1002}
                height={752}
              />
            </div>
            <div className={styles.iSeeYouText}>
              <p className={styles.sectionKicker}>Meet Yoana</p>
              <h2 className={styles.iSeeYouTitle}>I See You</h2>
              <p>
               I See You and I’ve walked alongside so many agents in your shoes. I know the reality of building a real estate business and how much harder it is with an ADHD brain, feeling both brilliant and overloaded, and needing a system tailored to how you actually operate. That's why I created a framework that works with your unique strengths and challenges.
              </p>
              <p className={styles.iSeeYouTransition}>
                Today, I use these tools to help you build your next chapter:
              </p>
              <Link to="/my-story" className={styles.ghostCta} onClick={() => window.scrollTo(0, 0)}>
                → Discover My Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <Testimonials />
        </div>
      </section>

      {/* Quiz CTA */}
      <section className={styles.quizSection} ref={finalCtaRef}>
        <div className={styles.containerNarrow} data-reveal>
          <p className={styles.quizKicker}>Not Sure Where to Start?</p>
          <h2 className={styles.quizTitle}>Take the free 2-minute ADHD Quiz.</h2>
          <p className={styles.quizText}>
            Find out exactly how ADHD is showing up in your business - and what to do about it.
          </p>
          <Link to="/assessment" className={`${styles.primaryCta} ${styles.lightCta}`} onClick={scrollTop}>
            TAKE THE FREE QUIZ - IT TAKES 2 MINUTES
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.altSection} geo-pattern geo-pattern--flip`}>
        <div className={styles.containerNarrow}>
          <div className={styles.sectionHead} data-reveal>
            <p className={styles.sectionKicker}>Questions</p>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {faqData.map((faq, index) => (
              <div key={index} className={`${styles.faqItem} ${expandedFaq === index ? styles.faqItemOpen : ''}`}>
                <h3 className={styles.faqQuestionHeading}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={expandedFaq === index}
                  >
                    <span>{faq.question}</span>
                    <span className={styles.faqIcon} aria-hidden="true">+</span>
                  </button>
                </h3>
                <div className={`${styles.faqAnswer} ${expandedFaq === index ? styles.faqAnswerExpanded : ''}`}>
                  <div className={styles.faqAnswerInner}>
                    <p>{faq.answer}</p>
                    {faq.hasButton && (
                      <Link to="/contact" className={styles.ghostCta}>
                        Submit Your Question
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showLeadPopup && (
        <LeadMagnetForm
          variant="modal"
          source="home-popup"
          showCloseButton={true}
          onClose={dismissLeadPopup}
        />
      )}

      <StickyCallBar to="/resources" showAfter={heroCtaRef} hideWhen={hideCallBarRefs} />
    </div>
  );
};

export default Home;
