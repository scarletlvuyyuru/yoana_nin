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
      answer: "My approach combines spiritual wellness, practical strategies, and lived experience as an expat and entrepreneur. I specialize in working with ADHD entrepreneurs and expats, understanding the unique challenges of building a life and business while navigating new cultures and neurodivergent traits."
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
                Align Your Life for Joy, Gratitude, and Prosperity
              </h1>
              <p className={styles.heroSubtitle}>
                Expat Life Coach, Author, and Founder of The Prosperous Agency
              </p>
              <p className={styles.heroDescription}>
                Life isn't meant to be survived—it's meant to be felt, lived, and built with intention. 
                You deserve a life that brings you home to yourself: joyful, abundant, grounded, 
                and unapologetically aligned with who you were meant to be. Stop settling for a life you merely survive. <br /><em><strong>Let’s build the one you were born to lead.</strong></em>  
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
            Healing isn't a leap... <br /> It's a series of small, intentional steps.
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
                  <h3 className={styles.stepTitle}>Notice (The Awareness)</h3>
                  <p className={styles.stepDescription}>
                    We begin by gently identifying the old patterns and survival habits that no longer serve you.
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
                  <h3 className={styles.stepTitle}>Shift (The Pivot)</h3>
                  <p className={styles.stepDescription}>
                    We intentionally move your focus from the weight of the past to the potential of the present moment.
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
                  <h3 className={styles.stepTitle}>Rewire (The Transformation)</h3>
                  <p className={styles.stepDescription}>
                    Through consistent practice, we strengthen your conscious mind and turn new, empowering habits into your natural way of being.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.mapTechniqueSection}>
              <p className={styles.healingText}>
                Using the <em className={styles.mapTechnique}>MAP technique</em> (Mastery, Application, and Practice), we strengthen your conscious mind so you can take the wheel and direct your life toward positive change.
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
            Whether you are redefining your mindset, searching for your sanctuary, or rebuilding your life after a storm, you are in the right place to awaken your spiritual gifts. < br /><em>Let me help guide the way...</em>
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
                <Link to="/coaching" className={`${styles.cardLink} ${styles.blog}`}>
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
                      +
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

      {/* YouTube Channel Section */}
      <section className={styles.youtubeSection}>
        <div className={styles.container}>
          <h2 className={styles.youtubeTitle}>Elevate with Yoana Nin</h2>
          <div className={styles.youtubeContent}>
            <div className={styles.youtubeIntro}>
              <h3 className={styles.youtubeSubtitle}>Boost Your Confidence with Every Incredible Guest! </h3>
              <p className={styles.youtubeDescription}>
                Welcome to my channel where we explore inspiring success stories, women's empowerment, financial wisdom, and career development. Each conversation provides deep insights into what it takes to thrive in competitive environments while staying focused, energized, and working on your mindset daily.
              </p>
            </div>
            
            <div className={styles.youtubeHighlights}>
              <div className={styles.highlight}>
                <h3 className={styles.highlightTitle}> 🔥 Inspiring Stories</h3>
               
              </div>
              <div className={styles.highlight}>
                <h3 className={styles.highlightTitle}> 🔥 Women's Empowerment</h3>
               
              </div>
              <div className={styles.highlight}>
                <h3 className={styles.highlightTitle}> 🔥Financial Empowerment</h3>
             
              </div>
              <div className={styles.highlight}>
                <h3 className={styles.highlightTitle}> 🔥Career Development</h3>
               
              </div>
            </div>

            <div className={styles.recentVideos}>
              <h3 className={styles.videosTitle}>Latest Episodes</h3>
              <p className={styles.videosPlaceholder}>
                Recent YouTube videos will be displayed here once the Blog page is built and connected to the YouTube channel.
              </p>
              <a 
                href="https://www.youtube.com/@ElevatewithYoanaNin" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
                style={{marginTop: '1rem'}}
              >
                Visit My YouTube Channel
              </a>
            </div>
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
                </div>
                <div className={styles.speakingOption}>
                  <h4 className={styles.optionTitle}>📺 Join My YouTube Channel</h4>
                  <p className={styles.optionText}>Share your inspiring journey and connect with our community of women breaking barriers and building businesses.</p>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary" style={{marginTop: '1.5rem'}}>
                Explore Speaking Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 4 C's of Trust Section */}
      <section className={styles.trustSection}>
        <div className={styles.container}>
          <h2 className={styles.trustTitle}>
            Building Community with Integrity in the Triangle
          </h2>
          <h3 className={styles.trustSubtitle}>
            Co-Owner of The Prosperous Agency
          </h3>
          <p className={styles.trustDescription}>
            Whether I'm helping you find a home or helping you rise from a difficult chapter, my work begins with Integrity. I utilize the 4 C's of Trust (Competence, Care, Character, and Consistency) to ensure every interaction is meaningful and every relationship is authentic. Community is built through openhearted leadership—this is the foundation of everything I do. If your're not looking to buy a home but looking for community consider joining our community group here: <a href="https://www.facebook.com/groups/yoananincommunity" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>Yoana Nin Community Group Holder link</a>
          </p>
          
          <div className={styles.infographicContainer}>
            <img 
              src={fourCInfographic} 
              alt="4 C's of Trust Infographic - Competence, Care, Character, and Consistency" 
              className={styles.infographicImage}
            />
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