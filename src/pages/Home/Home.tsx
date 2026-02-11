import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import heroImage from '../../assets/images/yoana_nin_leaning_in.webp';
import eyeIconforNotice from '../../assets/images/eyeIconforNotice.webp';
import compassIconforShift from '../../assets/images/compassIconforShift.webp';
import brainIconforRewire from '../../assets/images/brainIconforRewire.webp';
import fourCInfographic from '../../assets/images/4cInfographic.webp';
import coachingImage from '../../assets/images/masterMindset.webp';
import realEstateImage from '../../assets/images/Sanctuary.webp';
import blogImage from '../../assets/images/buildYourCommuntiy.webp';
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
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroImageSection}>
              <img 
                src={heroImage}
                alt="Yoana - Spiritual Coach and Real Estate Professional"
                className={styles.heroImage}
                loading="eager"
              />
            </div>
            <div className={styles.heroTextSection}>
              <h1 className={styles.heroTitle}>
                Build a Purpose-Driven Business That Creates Impact and Fulfillment
              </h1>
              <p className={styles.heroSubtitle}>
                Entrepreneur Success Coach, Author, and Founder of The Prosperous Agency
              </p>
              <p className={styles.heroDescription}>
                Your business isn't just about profit—it's about purpose, impact, and creating meaningful change in the world. 
                You deserve a business that brings fulfillment: profitable, sustainable, aligned with your values, 
                and unapologetically designed around the impact you were meant to make. Stop building a business you merely manage. <br /><em><strong>Let's build the one that changes everything.</strong></em>  
              </p>
              <Link to="/contact" className="btn btn-primary" style={{marginTop: '1rem', fontSize: 'var(--font-size-lg)', padding: '1rem 2rem'}}>
              Claim Your Safe Space (Free 30-Min Call)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <CredibilityStrip />

      {/* Problem Solution Section */}
      <section className={styles.problemSolution}>
        <div className={styles.container}>
          <h2 className={styles.healingTitle}>
            Success isn't an accident... <br /> It's a series of purposeful, values-driven decisions.
          </h2>
          <div className={styles.healingContent}>
            <div className={styles.stepsContainer}>
              <div className={`${styles.step} ${styles.stepNotice}`}>
                <div className={styles.stepIcon}>
                  <img 
                    src={eyeIconforNotice} 
                    alt="Notice - Awareness Icon of an Eye with eyelashes." 
                    className={styles.stepIconImage}
                  />
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Clarity (The Foundation)</h3>
                  <p className={styles.stepDescription}>
                    We begin by identifying your core values and vision for meaningful success that serves both you and others.
                  </p>
                </div>
              </div>

              <div className={styles.stepArrow}>
                <div className={styles.arrowDown}>↓</div>
              </div>

              <div className={`${styles.step} ${styles.stepShift}`}>
                <div className={styles.stepIcon}>
                  <img 
                    src={compassIconforShift} 
                    alt="Shift - Pivot Icon of a Compass" 
                    className={styles.stepIconImage}
                  />
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Purpose (The Direction)</h3>
                  <p className={styles.stepDescription}>
                    We align your business strategies with your deeper purpose and commitment to creating positive impact in the world.
                  </p>
                </div>
              </div>

              <div className={styles.stepArrow}>
                <div className={styles.arrowDown}>↓</div>
              </div>

              <div className={`${styles.step} ${styles.stepRewire}`}>
                <div className={styles.stepIcon}>
                  <img 
                    src={brainIconforRewire} 
                    alt="Rewire - Transformation Icon of a black brain with a pink arrow circling through the middle of it." 
                    className={styles.stepIconImage}
                  />
                  
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Impact (The Legacy)</h3>
                  <p className={styles.stepDescription}>
                    Through consistent, values-driven action, we build a business that creates lasting positive change and meaningful results.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.mapTechniqueSection}>
              <p className={styles.healingText}>
                Using the <em className={styles.mapTechnique}>SERVE methodology</em> (Strategic thinking, Execution with purpose, Relationships that matter, Values-driven decisions, and Exponential impact), we build businesses that don't just succeed—they serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Paths Section */}
      <section id="three-paths" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
           How We Can Begin Your Journey Together
          </h2>
          <h3 className={styles.sectionSubtitle}>
            Whether you are redefining your mindset, searching for your sanctuary, or rebuilding your business after setbacks, you are in the right place to unlock your entrepreneurial potential and create meaningful impact. < br /><em>Let me help guide the way...</em>
          </h3>
          <div className={styles.pathsGrid}>
            <div className={`${styles.pathCard} ${styles.coaching}`}>
              <div className={styles.cardHeader}>
                <img 
                  src={coachingImage} 
                  alt="Coaching - Master Your Mindset" 
                  className={styles.cardHeaderImage}
                />
                <div className={styles.cardHeaderOverlay}>
                  <h3 className={`${styles.cardTitle} ${styles.coaching}`}>
                    Master Your Mindset (Coaching)
                  </h3>
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardText}>
                  Rebuild your confidence, reclaim your time, and finally live with clarity. 
                  For ADHD entrepreneurs, expat high-achievers, and women tired of "holding it together" 
                  while life feels heavy.
                </p>
                <Link to="/coaching" className={`${styles.cardLink} ${styles.coaching}`}>
                  → Explore Coaching
                </Link>
              </div>
            </div>

            <div className={`${styles.pathCard} ${styles.realEstate}`}>
              <div className={styles.cardHeader}>
                <img 
                  src={realEstateImage} 
                  alt="Real Estate - Find Your Sanctuary" 
                  className={styles.cardHeaderImage}
                />
                <div className={styles.cardHeaderOverlay}>
                  <h3 className={`${styles.cardTitle} ${styles.realEstate}`}>
                    Find Your Sanctuary (Real Estate)
                  </h3>
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardText}>
                  Your home shapes your energy, your peace, and your future. 
                  I help families & relocators find more than just a house. Together we find a sacred sanctuary that feels 
                  deeply aligned and prosperous.
                </p>
                <Link to="/real-estate" className={`${styles.cardLink} ${styles.realEstate}`}>
                  → Explore Real Estate
                </Link>
              </div>
            </div>

            <div className={`${styles.pathCard} ${styles.blog}`}>
              <div className={styles.cardHeader}>
                <img 
                  src={blogImage} 
                  alt="Community - Build Your Village" 
                  className={styles.cardHeaderImage}
                />
                <div className={styles.cardHeaderOverlay}>
                  <h3 className={`${styles.cardTitle} ${styles.blog}`}>
                    Build Your Village (Community)
                  </h3>
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardText}>
                  From surviving alone to thriving together, rediscover the power of belonging. 
                  This is your invitation to step into a community of women where vulnerability 
                  is strength and you're never alone.
                </p>
                <Link 
                  to="/blog" 
                  className={`${styles.cardLink} ${styles.blog}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  → Join the Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    <h4 className={styles.faqAnswerHeading}>{faq.answer}</h4>
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

      {/* Testimonials Section */}
      <Testimonials />
     {/* Speaking Arrangements Section */}
      <section className={styles.speakingSection}>
        <div className={styles.container}>
          <h2 className={styles.speakingTitle}>Share Your Story, Amplify Your Voice</h2>
          <div className={styles.speakingContent}>
            <div className={styles.speakingText}>
              <h3 className={styles.speakingSubtitle}>Speaking Opportunities & Media Collaborations</h3>
              <p className={styles.speakingDescription}>
                Looking to inspire others or be inspired? I'm passionate about creating platforms for meaningful conversations that elevate and empower. Whether you're seeking a speaker for your event or want to share your transformational story on my YouTube channel, let's explore how we can amplify voices that matter.
              </p>
              <div className={styles.speakingOptions}>
                <div className={styles.speakingOption}>
                  <h4 className={styles.optionTitle}>🎤 Book Me to Speak</h4>
                  <p className={styles.optionText}>Engaging presentations on entrepreneurship, wellness, expat experiences, and building resilience through life's transitions.</p>
                  <Link to="/contact" className="btn btn-primary" style={{marginTop: '1rem', padding: '0.5rem 1rem', fontSize: 'var(--font-size-sm)', width: '200px', textAlign: 'center'}}>
                    Explore Speaking Opportunities
                  </Link>
                </div>
                <div className={styles.speakingOption}>
                  <h4 className={styles.optionTitle}>📺 Join My YouTube Channel</h4>
                  <p className={styles.optionText}>Share your inspiring journey and connect with our community of women breaking barriers and building businesses.</p>
                  <a 
                    href="https://www.youtube.com/@ElevatewithYoanaNin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary" 
                    style={{marginTop: '1rem', padding: '0.5rem 1rem', fontSize: 'var(--font-size-sm)', width: '200px', textAlign: 'center'}}
                  >
                    Visit My YouTube Channel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaTagline}>
              You don't have to do this alone
            </p>
            <p className={styles.ctaText}>
              If you're ready to stop surviving and start truly living, <br /><em className={styles.ctaEmphasis}>let's find your path together.</em>
            </p>
            <Link to="/contact" className="btn btn-primary" style={{fontSize: 'var(--font-size-lg)', padding: '1rem 2.5rem'}}>
              Let's Connect
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;