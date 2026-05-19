import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './Home.module.css';
import SEO from '../../components/SEO/SEO';
import heroImage from '../../assets/images/YoanaExpo.webp';
import lookingThroughFingersImage from '/YoanaIseeYou.webp';
import CredibilityStrip from '../../components/CredibilityStrip/CredibilityStrip';
import Testimonials from '../../components/Testimonials/Testimonials';

const Home: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  interface FaqItem {
    question: string;
    answer: string;
    hasButton?: boolean;
  }

  const faqData: FaqItem[] = [
    {
      question: "What makes your coaching approach different?",
      answer: "My approach combines hollistic purpose-driven business strategies, practical mindset tools, and lived experience as an expat and entrepreneur. I specialize in working with ADHD entrepreneurs and expats, understanding the unique challenges of building meaningful businesses while navigating new cultures and neurodivergent traits."
    },
    {
      question: "Do you work with clients virtually or in-person?",
      answer: "I offer both! Virtual sessions allow me to work with expats and clients worldwide, while in-person sessions are available for Triangle area residents. Real estate services are focused on the North Carolina Triangle area."
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
      question: "What areas do you serve for real estate?",
      answer: "I serve the North Carolina Triangle area (Raleigh, Durham, Chapel Hill, and surrounding communities). I specialize in helping relocating families and individuals find not just a house, but a home that supports their lifestyle and long-term goals."
    },
    {
      question: "Have a different question?",
      answer: "Submit a question here and I'll get back to you personally.",
      hasButton: true
    }
  ];
  return (
    <>
      <SEO 
        title="Yoana Nin - ADHD Entrepreneur Coach & Real Estate Expert | Raleigh NC Area"
        description="ADHD Entrepreneur Coach & Raleigh Real Estate Expert | Transform Your ADHD Into Your Business Superpower | Fix the System, Not You | Raleigh NC Area"
        schema={[
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://yoananincoaching.com/#organization",
            "name": "Yoana Nin Coaching",
            "url": "https://yoananincoaching.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://yoananincoaching.com/metaOG.png",
              "width": 1200,
              "height": 630
            },
            "description": "ADHD Entrepreneur Coach & Real Estate Expert serving women entrepreneurs and change-makers in the Raleigh NC area",
            "founder": {
              "@type": "Person",
              "@id": "https://yoananincoaching.com/#person",
              "name": "Yoana Nin"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cary",
              "addressRegion": "NC",
              "addressCountry": "US"
            },
            "areaServed": [
              { "@type": "City", "name": "Raleigh" },
              { "@type": "City", "name": "Cary" },
              { "@type": "City", "name": "Apex" },
              { "@type": "City", "name": "Holly Springs" },
              { "@type": "City", "name": "Durham" },
              { "@type": "City", "name": "Chapel Hill" }
            ],
            "knowsAbout": [
              "ADHD Coaching",
              "Business Coaching",
              "Life Coaching",
              "Mindset Coaching",
              "Real Estate",
              "Expat Coaching"
            ],
            "sameAs": [
              "https://yoananincoaching.com",
              "https://www.youtube.com/@ElevatewithYoanaNin",
              "https://www.facebook.com/Nin.Yoana/",
              "https://www.instagram.com/yoananincoaching/",
              "https://www.linkedin.com/in/yoananin",
              "https://www.tiktok.com/@yoananincoaching"
            ]
          }),
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "ProfessionalService"],
            "@id": "https://yoananincoaching.com/#localbusiness",
            "name": "Yoana Nin Coaching",
            "url": "https://yoananincoaching.com",
            "image": "https://yoananincoaching.com/metaOG.png",
            "description": "ADHD Entrepreneur Coach & Real Estate Expert serving the Raleigh NC Triangle area",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cary",
              "addressRegion": "NC",
              "addressCountry": "US"
            },
            "areaServed": [
              { "@type": "City", "name": "Raleigh" },
              { "@type": "City", "name": "Cary" },
              { "@type": "City", "name": "Apex" },
              { "@type": "City", "name": "Holly Springs" },
              { "@type": "City", "name": "Durham" },
              { "@type": "City", "name": "Chapel Hill" }
            ],
            "priceRange": "$$",
            "sameAs": [
              "https://www.youtube.com/@ElevatewithYoanaNin",
              "https://www.facebook.com/Nin.Yoana/",
              "https://www.instagram.com/yoananincoaching/",
              "https://www.linkedin.com/in/yoananin",
              "https://www.tiktok.com/@yoananincoaching"
            ]
          }),
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
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroImageSection}>
            <img 
              src={heroImage}
              alt="Yoana Nin - ADHD Powerhouse Coach and Raleigh Real Estate Expert"
              className={styles.heroImage}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1200}
              height={1200}
            />
            <div className={styles.heroImageOverlay}></div>
          </div>
          <div className={styles.heroTextSection}>
            <div className={styles.serviceBadge}>
              ADHD Powerhouse Coaching
            </div>
            <h1 className={styles.heroTitle}>
              Your Brain Isn't Broken. Your System Is.
            </h1>
            <p className={styles.heroSubtitle}>
              ADHD Coaching for Women Entrepreneurs Who Are Done Playing Small.
            </p>
            <div className={styles.heroValueProps}>
              <div className={styles.valueItem}>
                <span className={styles.valueHighlight}>You have the ideas. The drive. The vision.</span>
              </div>
              <div className={styles.valueItem}>
                <span className={styles.valueHighlight}>What you need is a system that works with your brain — not against it.</span>
              </div>
              <div className={styles.valueItem}>
                <span className={styles.valueHighlight}>That's exactly what we build together.</span>
              </div>
            </div>
           
            <div className={styles.heroCtas}>
              <a
                href=""
                className={`btn btn-primary ${styles.primaryCta}`}
                onClick={(event) => event.preventDefault()}
              >
                YES, I'M READY — BOOK MY FREE CALL
              </a>
              <a
                href=""
                className={`btn btn-secondary ${styles.secondaryCta}`}
                onClick={(event) => event.preventDefault()}
              >
                TAKE THE FREE ADHD QUIZ FIRST
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className={styles.problemSection}>
        <div className={styles.container}>
          <div className={styles.problemContent}>
            <h2 className={styles.problemTitle}>Does This Sound Like You?</h2>
            <ul className={styles.problemList}>
              <li>You start strong... then lose momentum halfway through</li>
              <li>Your to-do list is a mile long but nothing gets done</li>
              <li>You feel like you're always "almost there" but never quite arriving</li>
              <li>You've been told to "just focus" — as if it were that simple</li>
              <li>You're brilliant in your head but scattered in execution</li>
              <li>You wonder if everyone else has a secret you don't</li>
            </ul>
            <p className={styles.problemClose}>
              You're not lazy. You're not broken. You're wired differently — and that's your edge.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={styles.solutionSection}>
        <div className={styles.container}>
          <div className={styles.solutionContent}>
            <h2 className={styles.solutionTitle}>Here's What Changes When You Work With Me</h2>
            <div className={styles.solutionGrid}>
              <article className={styles.solutionCard}>
                <h3 className={styles.solutionCardTitle}>CLARITY</h3>
                <p className={styles.solutionCardText}>
                  We cut through the noise and identify exactly what's holding you back — and what to do first.
                </p>
              </article>
              <article className={styles.solutionCard}>
                <h3 className={styles.solutionCardTitle}>SYSTEMS</h3>
                <p className={styles.solutionCardText}>
                  We build simple, repeatable systems designed for your ADHD brain — not a neurotypical template.
                </p>
              </article>
              <article className={styles.solutionCard}>
                <h3 className={styles.solutionCardTitle}>MOMENTUM</h3>
                <p className={styles.solutionCardText}>
                  You stop spinning and start moving. Consistently. Confidently. On your terms.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Proof */}
      <section id="section-3-proof" className={styles.proofSection}>
        <div className={styles.container}>
          <div className={styles.proofContent}>
            <h2 className={styles.proofTitle}>I Know This Works — Because My Clients Prove It Every Day</h2>
            <p className={styles.proofText}>
              <strong>I'm not a coach who learned ADHD from a textbook.</strong>
            </p>
            <p className={styles.proofText}>
              I've sat across from brilliant women entrepreneurs who felt exhausted from fighting their own brains.
            </p>
            <ul className={styles.proofList}>
              <li><strong>Every tool, still stuck:</strong> They had planners, strategies, and advice, but no real momentum.</li>
              <li><strong>The real gap:</strong> It was not motivation. It was a system built for how their brain actually works.</li>
              <li><strong>What I specialize in:</strong> Turning chaos into clarity, structure, and consistent execution.</li>
              <li><strong>Real-world proof:</strong> I built a thriving real estate business in Raleigh using the same systems I teach.</li>
            </ul>

            <p className={styles.proofTextStrong}>And the results speak for themselves.</p>

            <blockquote className={styles.proofQuote}>
              "I don't just teach strategies. I build the exact system your brain needs — and my clients' results are the proof." — Yoana Nin
            </blockquote>

            <div className={styles.proofCtaWrap}>
              <a
                href=""
                className={`btn btn-primary ${styles.proofCta}`}
                onClick={(event) => event.preventDefault()}
              >
                YES, I'M READY — BOOK MY FREE CALL
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <CredibilityStrip />

      {/* Fit Section */}
      <section className={styles.fitSection}>
        <div className={styles.container}>
          <div className={styles.fitContent}>
            <h2 className={styles.fitTitle}>This Is For You If...</h2>

            <div className={styles.fitHeaderRow}>
              <p className={styles.fitHeaderCell}>YOU ARE</p>
              <p className={styles.fitHeaderCell}>YOU'RE STRUGGLING WITH</p>
            </div>

            <div className={styles.fitGrid}>
              <article className={styles.fitRow}>
                <p className={styles.fitWho}><strong>A woman entrepreneur with ADHD</strong></p>
                <p className={styles.fitPain}><strong>Staying consistent</strong> and finishing what you start</p>
              </article>

              <article className={styles.fitRow}>
                <p className={styles.fitWho}><strong>A business owner who suspects ADHD</strong></p>
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
            </div>

            <p className={styles.fitClose}>
              If you are ready to <strong>stop surviving and start thriving</strong> — you are in the right place.
            </p>

          
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className={styles.sectionDivider}></div>

      {/* Getting Started Section */}
      <section className={styles.gettingStartedSection}>
        <div className={styles.container}>
          <div className={styles.gettingStartedContent}>
            <p className={styles.gettingStartedEyebrow}>How It Works</p>
            <h2 className={styles.gettingStartedTitle}>Getting Started Is Simple</h2>

            <div className={styles.gettingStartedSteps}>
              <article className={styles.gettingStartedStep}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>Step 1</span>
                  <h3 className={styles.stepTitle}>■■ Book Your Free Discovery Call</h3>
                </div>
                <p className={styles.stepText}>
                  No pressure. No pitch. Just a real conversation about where you are and where you want to go.
                </p>
              </article>

              <article className={styles.gettingStartedStep}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>Step 2</span>
                  <h3 className={styles.stepTitle}>■■ Get Your Custom Roadmap</h3>
                </div>
                <p className={styles.stepText}>
                  We build a coaching plan designed specifically for your brain, your business, and your goals.
                </p>
              </article>

              <article className={styles.gettingStartedStep}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>Step 3</span>
                  <h3 className={styles.stepTitle}>■ Start Moving Forward</h3>
                </div>
                <p className={styles.stepText}>
                  Weekly sessions. Real accountability. Measurable results. No more spinning your wheels.
                </p>
              </article>
            </div>

            <div className={styles.gettingStartedCtaWrap}>
              <a
                href=""
                className={`btn btn-primary ${styles.gettingStartedCta}`}
                onClick={(event) => event.preventDefault()}
              >
                → BOOK YOUR FREE CALL NOW
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
         
          <Testimonials />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className="tagline">
              Not Sure Where to Start?
            </h2>
            <p className={styles.ctaText}>
              <span className={styles.ctaGradientText}>Take the free 2-minute ADHD Entrepreneur Quiz.</span>
            </p>
            <p className={styles.ctaText}>
              Find out exactly how ADHD is showing up in your business - and what to do about it.
            </p>
            <Link 
              to="/assessment" 
              className="btn btn-primary" 
              style={{fontSize: 'var(--font-size-lg)', padding: '1rem 2.5rem'}}
            >
              ■ TAKE THE FREE QUIZ - IT TAKES 2 MINUTES
            </Link>
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className={styles.quoteSection}>
        <div className={styles.container}>
          <blockquote className={styles.quote}>
            <p className={styles.quoteText}>
              "And the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom"
            </p>
            <cite className={styles.quoteAuthor}>— Anaïs Nin</cite>
          </blockquote>
        </div>
      </section>

      {/* I See You Section */}
      <section className={styles.iSeeYouSection}>
        <div className={styles.container}>
          <div className={styles.iSeeYouContent}>
            <div className={styles.iSeeYouImageSection}>
              <img 
                src={lookingThroughFingersImage} 
                alt="Yoana looking through her fingers in a playful manner" 
                className={styles.iSeeYouImage}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
            </div>
            <div className={styles.iSeeYouTextSection}>
              <h2 className={styles.iSeeYouTitle}>I See You</h2>
              <p className={styles.iSeeYouText}>
                I've been where you are—overloaded, brilliant, and ready for a system that actually works.
              </p>
              <p className={styles.iSeeYouTransition}>
                Today, I use these tools to help you build your next chapter:
              </p>
              <Link 
                to="/my-story" 
                className={styles.iSeeYouLink}
                onClick={() => window.scrollTo(0, 0)}
              >
                → Discover My Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className={styles.sectionDivider}></div>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqContainer}>
            {faqData.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestionHeading}>
                  <button 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={expandedFaq === index}
                  >
                    <span>{faq.question}</span>
                    <span className={`${styles.faqIcon} ${expandedFaq === index ? styles.faqIconExpanded : ''}`}>
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
                </h3>
                <div className={`${styles.faqAnswer} ${expandedFaq === index ? styles.faqAnswerExpanded : ''}`}>
                  <div className={styles.faqAnswerContent}>
                    <p className={styles.faqAnswerHeading}>{faq.answer}</p>
                    {faq.hasButton && (
                      <Link to="/contact" className="btn btn-secondary" style={{marginTop: '1rem'}}>
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

    </>
  );
};

export default Home;