import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MyStory.module.css';
import SEO from '../../components/SEO/SEO';
import bookImage from '../../assets/images/Journey_to_inner_joy_and_success_in_realestate.webp';
import adhdBadge from '../../assets/images/Adhd_certification_badge.webp';
import jayShettyCert from '../../assets/images/jay_Shetty_Certification.webp';
import energeticHealerBadge from '../../assets/images/energeticHealer.webp';
import tpaLogo from '../../assets/images/TPA_logo.webp';
import credentialsImage from '../../assets/images/YoanaHero1.webp';
import heroBackground from '../../assets/images/MyStoryHeroBackground.webp';

import yoanaYoung from '../../assets/images/yoana-nin-young.webp';
import yoanaRealEstate from '../../assets/images/yoana-nin-realestateshot.webp';
import yoanaHollywood from '../../assets/images/yoana-nin-hollywood.webp';
import yoanaBlueShirt from '../../assets/images/yoana-nin-blue-shirt-pose.webp';

const MyStory: React.FC = () => {
  return (
    <>
      <SEO 
        title="My Story | Yoana Nin - From Romania to NC"
        description="Learn how I rebuilt my life from the ground up, becoming a certified ADHD life coach, energetic healer, and real estate entrepreneur in Raleigh."
        url="https://yoananincoaching.com/my-story"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://yoananincoaching.com/#person",
          "name": "Yoana Nin",
          "url": "https://yoananincoaching.com",
          "image": "https://yoananincoaching.com/YoanaIseeYou.webp",
          "jobTitle": "ADHD Entrepreneur Coach & Real Estate Expert",
          "description": "Holistic life coach specializing in ADHD entrepreneurs and expat community support, certified through Jay Shetty Certified School of Life Coaching",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cary",
            "addressRegion": "NC",
            "addressCountry": "US"
          },
          "alumniOf": [
            { "@type": "Organization", "name": "Jay Shetty Certified School of Life Coaching" }
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "name": "Certified Life Coach",
              "credentialCategory": "certification",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Jay Shetty Certified School of Life Coaching"
              }
            }
          ],
          "knowsAbout": [
            "ADHD Coaching",
            "Life Coaching",
            "Business Coaching",
            "Mindset Coaching",
            "Real Estate",
            "Expat Coaching",
            "Energetic Healing",
            "Neurodivergent Entrepreneurship"
          ],
          "worksFor": [
            {
              "@type": "Organization",
              "@id": "https://yoananincoaching.com/#organization",
              "name": "Yoana Nin Coaching"
            },
            {
              "@type": "Organization",
              "name": "Prosperous Agency",
              "description": "Boutique Real Estate Agency"
            }
          ],
          "sameAs": [
            "https://www.youtube.com/@ElevatewithYoanaNin",
            "https://www.facebook.com/Nin.Yoana/",
            "https://www.instagram.com/yoananincoaching/",
            "https://www.linkedin.com/in/yoananin",
            "https://www.tiktok.com/@yoananincoaching"
          ]
        })}
      />
      {/* Hero Section */}
      <section className={styles.hero} style={{backgroundImage: `url(${heroBackground})`}}>
        <div className={styles.container}>
          <p className={styles.heroEyebrow}>My Story</p>
          <h1 className={styles.heroTitle}>
            I came to America with a suitcase, $10,000, an accent, and a dream.
          </h1>
          <h2 className={styles.heroSubtitle}>
            From starting over to building with intention.
          </h2>
          <div className={styles.heroSignals}>
            <span className={styles.heroSignal}>No connections.</span>
            <span className={styles.heroSignal}>No roadmap.</span>
            <span className={styles.heroSignal}>No guarantee it would work.</span>
          </div>
          <p className={styles.heroDescription}>
            I won the Green Card Lottery and landed in Los Angeles - wide-eyed, determined, and completely starting over.
          </p>
          
          {/* Film Reel - Mobile/Tablet Only */}
          <div className={styles.filmReel}>
            <div className={styles.filmStrip}>
              <img src={yoanaYoung} alt="Young Yoana" className={styles.filmFrame} />
                <img src={yoanaRealEstate} alt="Yoana working with Prosperous Agency" className={styles.filmFrame} />
              <img src={yoanaHollywood} alt="Yoana in Hollywood" className={styles.filmFrame} />
              <img src={yoanaBlueShirt} alt="Yoana blue shirt pose" className={styles.filmFrame} />
              <img src={credentialsImage} alt="Yoana coaching" className={styles.filmFrame} />
            </div>
          </div>
        </div>
      </section>

      {/* Story Path Section */}
      <section className={styles.actsSection}>
        <div className={styles.container}>
          <div className={styles.storyIntro} id="my-journey">
            <h2 className={styles.storyTitle}>What Starting Over Really Felt Like</h2>
            <p className={styles.storyLead}>
              But starting over is never just logistical. It's mental.
            </p>
          </div>

          <div className={styles.storyGrid}>
            <article className={styles.storyCard}>
              <p className={styles.storyTag}>Mental Load</p>
              <p className={styles.storyBody}>
                It's waking up every day not knowing which step to take first. It's the overwhelm of too many decisions and not enough clarity. It's the paralysis of wanting to move forward - and not knowing how.
              </p>
            </article>

            <article className={styles.storyCard}>
              <p className={styles.storyTag}>The Truth</p>
              <p className={styles.storyBody}>
                I know what it feels like to be stuck inside your own potential.
              </p>
            </article>

            <article className={styles.storyCard}>
              <p className={styles.storyTag}>The Questions</p>
              <p className={styles.storyBody}>
                Finding my purpose didn't happen overnight. It took sitting in the confusion long enough to finally ask the right questions - What do I actually want? What am I building? Where do I even begin?
              </p>
            </article>

            <article className={styles.storyCard}>
              <p className={styles.storyTag}>The Shift</p>
              <p className={styles.storyBody}>
                When I stopped trying to do everything and started building with intention, everything shifted.
              </p>
            </article>

            <article className={styles.storyCard}>
              <p className={styles.storyTag}>The System</p>
              <p className={styles.storyBody}>
                We moved to Raleigh, NC. We built The Prosperous Agency from the ground up - with focus, discipline, and a clear system that turned overwhelm into momentum.
              </p>
            </article>

            <article className={styles.storyCard}>
              <p className={styles.storyTag}>Now</p>
              <p className={styles.storyBody}>
                And now? I help women do the same. I have sat across from brilliant women entrepreneurs - women with ADHD, big ideas, and even bigger hearts - who were exhausted, scattered, and stuck. Not because they lacked talent. Because they lacked a system built for their brain.
              </p>
            </article>
          </div>

          <div className={styles.storyBridge}>
            <p className={styles.storyBridgeText}>
              I know what it means to face a blank page and not know where to start. I know the weight of confusion when your vision is clear but your path isn't. I know what it takes to push through - and come out the other side with purpose.
            </p>
            <p className={styles.storyBridgeText}>
              That lived experience is what I bring into every coaching session.
            </p>
            <p className={styles.storyBridgeText}>
              If I could build a thriving business starting from scratch, in a new country, in a new language, imagine what you can build when someone finally gives you the right system.
            </p>
            <blockquote className={styles.storyQuote}>
              "You don't need to be fixed. You need a strategy that works for the way you're wired." - Yoana Nin
            </blockquote>
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className={styles.bookSection}>
        <div className={styles.container}>
          <div className={styles.bookContent}>
            <div className={styles.bookImageSection}>
              <img 
                src={bookImage} 
                alt="Journey to Inner Joy & Success in Real Estate book cover" 
                className={styles.bookImage}
              />
            </div>
            <div className={styles.bookTextSection}>
              <h2 className={styles.bookTitle}>
                Why I Wrote "Journey to Inner Joy & Success in Real Estate"
              </h2>
              <p className={styles.bookDescription}>
                Real estate gave me a way to help people feel safe again. My book teaches you how to follow joy, stay aligned, and build success without sacrificing your soul, your values, or your peace.
              </p>
              <h3 className={styles.bookSubtitle}>Learn to Walk Joyfully Toward Success</h3>
              <a 
                href="https://www.amazon.com/Journey-Inner-Success-Real-Estate/dp/191294832X" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.bookButton}
              >
                → Buy on Amazon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section id="my-approach" className={styles.credentialsSection}>
        <div className={styles.container}>
          <h2 className={styles.credentialsTitle}>The Powerhouse Toolkit </h2>
          <h3 className={styles.credentialsSubtitle}>Because I had to rebuild my own life from the ashes, I became obsessed with the science and soul of transformation. Today, I combine these certifications to help you do the same.</h3>
          
          <div className={styles.credentialsLayout}>
            <div className={styles.credentialsImageSection}>
              <img 
                src={credentialsImage} 
                alt="Yoana Nin - Life Coach and Real Estate Professional" 
                className={styles.credentialsImage}
              />
            </div>
            
            <div className={styles.credentialsGrid}>
            <div className={styles.credentialCard}>
              <div className={styles.credentialContent}>
                <img 
                  src={adhdBadge} 
                  alt="ADHD Life Coach Certification" 
                  className={styles.credentialImage}
                />
                <div className={styles.credentialText}>
                  <h3 className={styles.credentialTitle}>Certified ADHD Life Coach</h3>
                  <p className={styles.credentialDescription}>
                    Specializing in overwhelmed achievers and high performers with racing minds. I can use the ABC Framework to help you perform a Life Audit and establish a "ladder to success" that respects how your brain actually works.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.credentialCard}>
              <div className={styles.credentialContent}>
                <img 
                  src={jayShettyCert} 
                  alt="Jay Shetty Life Coach Certification" 
                  className={styles.credentialImage}
                />
                <div className={styles.credentialText}>
                  <h3 className={styles.credentialTitle}>Certified Jay Shetty Life Coach</h3>
                  <p className={styles.credentialDescription}>
                    Trained in mindfulness, emotional intelligence, and purpose-driven transformation to help you find your divine life mission.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.credentialCard}>
              <div className={styles.credentialContent}>
                <img 
                  src={energeticHealerBadge} 
                  alt="Energetic Intuitive Healer Certification" 
                  className={styles.credentialImage}
                />
                <div className={styles.credentialText}>
                  <h3 className={styles.credentialTitle}>Certified Energetic Intuitive Healer</h3>
                  <p className={styles.credentialDescription}>
                    Helping you tune into your intuition and regulate your nervous system so you can move from a state of stress to a state of optimal functional flow.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.credentialCard}>
              <div className={styles.credentialContent}>
                <img 
                  src={tpaLogo} 
                  alt="The Prosperous Agency Logo" 
                  className={styles.credentialImage}
                />
                <div className={styles.credentialText}>
                  <h3 className={styles.credentialTitle}>Real Estate Entrepreneur</h3>
                  <p className={styles.credentialDescription}>
                    Co-Owner of The Prosperous Agency—serving Raleigh, Cary, Apex, and relocators worldwide with an integrity-first approach.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaTagline}>
              You do not need to be fixed.
            </p>
            <p className={styles.ctaText}>
              <span className={styles.ctaGradientText}>You need a strategy that works for the way you are wired.</span>
            </p>
            <Link to="/contact" className="btn btn-primary" style={{fontSize: 'var(--font-size-lg)', padding: '1rem 2.5rem'}}>
              Connect with Yoana
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyStory;