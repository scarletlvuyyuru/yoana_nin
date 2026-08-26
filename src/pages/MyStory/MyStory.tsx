import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MyStory.module.css';
import SEO from '../../components/SEO/SEO';
import adhdBadge from '../../assets/images/Adhd_certification_badge.webp';
import jayShettyCert from '../../assets/images/jay_Shetty_Certification.webp';
import energeticHealerBadge from '../../assets/images/energeticHealer.webp';
import tpaLogo from '../../assets/images/TPA_logo.webp';
import credentialsImage from '../../assets/images/YoanaHero1.webp';
import heroPortrait from '../../assets/images/YoanaIseeYou.webp';
import interviewPoster from '../../assets/images/interviewCoverforMeetingWithYoanaNinCoaching.webp';

const MyStory: React.FC = () => {
  const [showInterviewVideo, setShowInterviewVideo] = useState(false);

  return (
    <>
      <SEO 
        title="My Story | Yoana Nin - From Romania to NC"
        description="Learn how I rebuilt my life from the ground up and became a certified ADHD coach and energetic healer supporting women entrepreneurs across the U.S. and in Raleigh NC."
        url="https://yoananincoaching.com/my-story"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://yoananincoaching.com/#person",
          "name": "Yoana Nin",
          "url": "https://yoananincoaching.com",
          "image": "https://yoananincoaching.com/YoanaIseeYou.webp",
          "jobTitle": "ADHD Entrepreneur Coach",
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
            "Virtual Coaching",
            "Expat Coaching",
            "Energetic Healing",
            "Neurodivergent Entrepreneurship"
          ],
          "worksFor": [
            {
              "@id": "https://yoananincoaching.com/#organization"
            }
          ],
          "sameAs": [
            "https://www.youtube.com/@ElevatewithYoanaNin",
            "https://www.facebook.com/Nin.Yoana/",
            "https://www.instagram.com/yoananincoaching/",
            "https://www.linkedin.com/in/yoananin",
            "https://www.tiktok.com/@adhdcoachyoana?is_from_webapp=1&sender_device=pc"
          ]
        })}
      />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroLayout}>
            <div className={styles.heroText}>
              <p className={styles.heroEyebrow}>My Story</p>
              <h1 className={styles.heroTitle}>From Romania<br />to Raleigh.</h1>
              <div className={styles.heroSignals}>
                <span className={styles.heroSignal}>No connections.</span>
                <span className={styles.heroSignal}>No roadmap.</span>
                <span className={styles.heroSignal}>No guarantee it would work.</span>
              </div>
            </div>
            <div className={styles.heroImageContainer}>
              <div className={styles.heroImageFrame}>
                <img
                  src={heroPortrait}
                  alt="Yoana Nin — ADHD Life Coach and Entrepreneur"
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Reel Section (lazy-loaded on click) */}
      <section className={styles.interviewSection} aria-label="Interview with Yoana Nin">
        <div className={styles.container}>
          <div className={styles.interviewHeader}>
            <p className={styles.interviewEyebrow}>Watch</p>
            <h2 className={styles.interviewTitle}>Interview: Meet Yoana Nin Coaching</h2>
            <p className={styles.interviewDescription}>
              Press play to watch the full interview. 
            </p>
          </div>

          <div className={styles.interviewReelWrap}>
            {!showInterviewVideo ? (
              <button
                type="button"
                className={styles.interviewPosterButton}
                onClick={() => setShowInterviewVideo(true)}
                aria-label="Play interview video"
              >
                <img
                  src={interviewPoster}
                  alt="Interview cover for Meeting with Yoana Nin Coaching"
                  className={styles.interviewPosterImage}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.interviewPlayBadge} aria-hidden="true">
                  <span className={styles.interviewPlayTriangle} />
                </span>
              </button>
            ) : (
              <video
                className={styles.interviewVideo}
                controls
                playsInline
                preload="metadata"
                poster={interviewPoster}
                autoPlay
              >
                <source src="/videos/my-story/YoanaInverviewAboutYoanaCoaching.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className={styles.actsSection} id="my-journey">
        <div className={styles.container}>

          {/* Section header */}
          <div className={styles.storySectionHeader}>
            <p className={styles.storyEyebrow}>My Story</p>
            <h2 className={styles.storySectionTitle}>From Romania to Raleigh</h2>
            <p className={styles.storySectionLead}>
              I came to America with a suitcase, $10,000, an accent, and a dream.
            </p>
            <p className={styles.storySectionBody}>
              I won the Green Card Lottery and landed in Los Angeles — wide-eyed, determined, and completely starting over.
            </p>
          </div>

          {/* Mental truth opener */}
          <div className={styles.storyOpener}>
            <p className={styles.storyOpenerMain}>But starting over is never just logistical.</p>
            <p className={styles.storyOpenerAccent}>It's mental.</p>
          </div>

          {/* "It's..." ADHD-friendly card cluster */}
          <div className={styles.itsGrid}>
            <div className={styles.itsCard}>
              <p>It's waking up every day not knowing which step to take first.</p>
            </div>
            <div className={styles.itsCard}>
              <p>It's the overwhelm of too many decisions and not enough clarity.</p>
            </div>
            <div className={styles.itsCard}>
              <p>It's the paralysis of wanting to move forward — and not knowing how.</p>
            </div>
          </div>

          {/* Prose continuation */}
          <div className={styles.storyBridge}>
            <p className={styles.storyBridgeText}>
              I know what it feels like to be <strong>stuck inside your own potential.</strong>
            </p>
            <p className={styles.storyBridgeText}>
              Finding my purpose didn't happen overnight. It took sitting in the confusion long enough to finally ask the right questions — <strong>What do I actually want? What am I building? Where do I even begin?</strong>
            </p>
            <p className={styles.storyBridgeText}>
              When I stopped trying to do everything and started building <strong>with intention</strong>, everything shifted.
            </p>
            <p className={styles.storyBridgeText}>
              We moved to <strong>Raleigh, NC.</strong> We built <strong>The Prosperous Agency</strong> from the ground up — with focus, discipline, and a clear system that turned <strong>overwhelm into momentum.</strong>
            </p>
            <p className={styles.storyBridgeText}>
              And now? <strong>I help women do the same.</strong>
            </p>
            <p className={styles.storyBridgeText}>
              I have sat across from brilliant women entrepreneurs — <strong>women with ADHD, big ideas, and even bigger hearts</strong> — who were exhausted, scattered, and stuck.
            </p>
            <p className={styles.storyBridgeText}>
              Not because they lacked talent. <strong>Because they lacked a system built for their brain.</strong>
            </p>
            <p className={styles.storyBridgeText}>
              <strong>I know</strong> what it means to face a blank page and not know where to start. <strong>I know</strong> the weight of confusion when your vision is clear but your path isn't. <strong>I know</strong> what it takes to push through — and come out the other side with <strong>purpose.</strong>
            </p>

          {/* Bridge + Promise + Quote */}
            <p className={styles.storyBridgeText}>
              That lived experience is what I bring into every coaching session.
            </p>
            <p className={styles.storyBridgeText}>
              If I could build a thriving business starting from scratch, in a new country, in a new language — imagine what you can build when someone finally gives you the right system.
            </p>
            <blockquote className={styles.storyQuote}>
              "You don't need to be fixed. You need a strategy that works for the way you're wired." — Yoana Nin
            </blockquote>
          </div>

        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section id="authorship" className={styles.quoteSection}>
        <div className={styles.container}>
          <blockquote className={styles.quote}>
            <p className={styles.quoteText}>
              "And the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom"
            </p>
            <cite className={styles.quoteAuthor}>— Anaïs Nin</cite>
          </blockquote>
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
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{fontSize: 'var(--font-size-lg)', padding: '1rem 2.5rem'}}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Connect with Yoana
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyStory;