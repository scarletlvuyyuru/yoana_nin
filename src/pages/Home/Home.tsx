import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import heroImage from '../../assets/images/YoanaHero1.webp';
import coachingImage from '../../assets/images/masterMindset.webp';
import realEstateImage from '../../assets/images/Sanctuary.webp';
import blogImage from '../../assets/images/buildYourCommuntiy.webp';
import bulletPoint from '../../assets/images/bulletPoint.webp';
import lookingThroughFingersImage from '../../assets/images/YoanaIseeYou.webp';
import microphoneIcon from '../../assets/images/microphoneIcon.webp';
import youtubeLikesIcon from '../../assets/images/youtubeLikesIcon.webp';
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
        <div className={styles.heroContent}>
          <div className={styles.heroImageSection}>
            <img 
              src={heroImage}
              alt="Yoana Nin - ADHD Powerhouse Coach and Raleigh Real Estate Expert"
              className={styles.heroImage}
              loading="eager"
            />
            <div className={styles.heroImageOverlay}></div>
          </div>
          <div className={styles.heroTextSection}>
            <div className={styles.serviceBadge}>
              ADHD Powerhouse Coaching + Raleigh Real Estate
            </div>
            <h1 className={styles.heroTitle}>
              Brilliant mind. Overloaded life.
            </h1>
            <p className={styles.heroSubtitle}>
              Let's fix the system — not you.
            </p>
            <div className={styles.heroValueProps}>
              <div className={styles.valueItem}>
                <span className={styles.valueHighlight}>Build the business.</span>
              </div>
              <div className={styles.valueItem}>
                <span className={styles.valueHighlight}>Calm the chaos.</span>
              </div>
              <div className={styles.valueItem}>
                <span className={styles.valueHighlight}>Make your ADHD your unfair advantage.</span>
              </div>
            </div>
            <p className={styles.raleighText}>
              And if Raleigh, NC is calling? Let's build your next chapter there, too.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/coaching#top" className={`btn btn-primary ${styles.primaryCta}`}>
                Transform Your ADHD Into Your Business Superpower
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <CredibilityStrip />

      {/* Three Paths Section */}
      <section id="three-paths" className={styles.section}>
        <div className={styles.container}>
          <p className="taglineDark">Let me help guide the way</p>
          <h2 className={styles.sectionTitle}>
           How We Can Begin Your Journey Together
          </h2>
          <h3 className={styles.sectionSubtitle}>
            Three ways to stop surviving and start thriving, whether you're rebuilding confidence, finding home, or getting inspired.
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
                  <h4 className={`${styles.cardTitle} ${styles.coaching}`}>
                    Master Your ADHD Power<br/>(Coaching)
                  </h4>
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardDescription}>
                  Build the business. Calm the chaos.
                </p>
                <div className={styles.cardText}>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="pink bullet point star" className={styles.bulletIcon} />
                    <span>Community-Driven Transformation</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="pink bullet point star" className={styles.bulletIcon} />
                    <span>6-Month Focused Founder Framework</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="pink bullet point star" className={styles.bulletIcon} />
                    <span>Create Structure that Works for Your Brain</span>
                  </div>
                     <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="pink bullet point star" className={styles.bulletIcon} />
                    <span>Emotional Regulation for Consistency</span>
                  </div>
                  
                </div>
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
                <div className={styles.cardHeaderOverlay} style={{background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)'}}>
                  <h4 className={`${styles.cardTitle} ${styles.realEstate}`}>
                    Find Your Sanctuary<br/>(Real Estate)
                  </h4>
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardDescription}>
                  Spaces that fuel focus—not drain it.
                </p>
                <div className={styles.cardText}>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="pink bullet point star" className={styles.bulletIcon} />
                    <span>Serving NC Triangle Area since 2013</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="pink bullet point star" className={styles.bulletIcon} />
                    <span>Relocation Specialist</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="pink bullet point star" className={styles.bulletIcon} />
                    <span>Precision Scouting for layouts designed for focus
                    </span>
                  </div>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="pink bullet point star" className={styles.bulletIcon} />
                    <span>Find a Home That Matches Your Energy</span>
                  </div>
                </div>
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
                  <h4 className={`${styles.cardTitle} ${styles.blog}`}>
                    Inspiration & Resources<br/>(Blog)
                  </h4>
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardDescription}>
                  Inspiring stories fueling action. 
                </p>
                <div className={styles.cardText}>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                    <span>Weekly ADHD Business Tips</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                    <span>Entrepreneurial Success Stories</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                    <span>Free Resources & Guides</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                    <span>Practical Strategies That Work</span>
                  </div>
                </div>
                <Link 
                  to="/blog" 
                  className={`${styles.cardLink} ${styles.blog}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  → Get Weekly Inspiration
                </Link>
              </div>
            </div>
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

      {/* Testimonials Section */}
      <Testimonials />

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

      {/* Section Divider */}
      <div className={styles.sectionDivider}></div>

     {/* Speaking Arrangements Section */}
      <section className={styles.speakingSection}>
        <div className={styles.container}>
          <p className="taglineDark">Share Your Story, Amplify Your Voice</p>
          <div className={styles.speakingContent}>
            <div className={styles.speakingText}>
              <h2 className={styles.speakingSubtitle}>Speaking Opportunities & Media Collaborations</h2>
              <p className={styles.speakingDescription}>
                Ready to share your story or book an inspiring speaker? Let's create conversations that matter and amplify voices that inspire change.
              </p>
              <div className={styles.speakingOptions}>
                <div className={styles.speakingOption}>
                  <h3 className={styles.optionTitle}>
                    <img 
                      src={microphoneIcon} 
                      alt="Microphone" 
                      style={{width: '32px', height: '32px', marginRight: '0.75rem', verticalAlign: 'middle'}} 
                    /> 
                    Book Me to Speak
                  </h3>
                  <p className={styles.optionText}>Engaging presentations on entrepreneurship, wellness, expat experiences, and building resilience through life's transitions.</p>
                  <Link to="/contact" className="btn btn-primary" style={{marginTop: '1rem', padding: '0.5rem 1rem', fontSize: 'var(--font-size-sm)', width: '200px', textAlign: 'center'}}>
                    Explore Speaking Opportunities
                  </Link>
                </div>
                <div className={styles.speakingOption}>
                  <h3 className={styles.optionTitle}>
                    <img 
                      src={youtubeLikesIcon} 
                      alt="YouTube" 
                      style={{width: '32px', height: '32px', marginRight: '0.75rem', verticalAlign: 'middle'}} 
                    /> 
                    Join My YouTube Channel
                  </h3>
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
            <h2 className="tagline">
              Claim My Unfair Advantage
            </h2>
            <p className={styles.ctaText}>
             <span className={styles.ctaGradientText}>Turn ADHD into your business superpower.</span>
            </p>
            <Link 
              to="/contact#top" 
              className="btn btn-primary" 
              style={{fontSize: 'var(--font-size-lg)', padding: '1rem 2.5rem'}}
            >
              Let's Connect
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;