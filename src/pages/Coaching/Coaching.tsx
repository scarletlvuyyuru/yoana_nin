import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Coaching.module.css';
import SEO from '../../components/SEO/SEO';
import buildYourCommunityImage from '../../assets/images/buildYourCommuntiy.webp';
import brainIconforRewire from '../../assets/images/brainIconforRewire.webp';
import compassIconforShift from '../../assets/images/compassIconforShift.webp';
import rocketicon from '../../assets/images/rocketicon.webp';
import bulletPoint from '../../assets/images/bulletPoint.webp';

const Coaching: React.FC = () => {
  return (
    <div className="main-content">
      <SEO 
        title="ADHD Coaching for Entrepreneurs & Expats | Yoana Nin"
        description="Overcome ADHD overwhelm with actionable strategies. Elevate your life and business with the ABC Framework tailored for neurodivergent entrepreneurs."
        url="https://yoananincoaching.com/coaching"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://yoananincoaching.com/coaching#service",
          "name": "ADHD Entrepreneur Coaching — Focused Founder Framework",
          "description": "A 6-month coaching program for ADHD entrepreneurs. Build confidence, sustainable systems, and business momentum. Fix the system, not you.",
          "serviceType": "Life Coaching",
          "provider": {
            "@type": "Person",
            "@id": "https://yoananincoaching.com/#person",
            "name": "Yoana Nin",
            "jobTitle": "ADHD Entrepreneur Coach"
          },
          "areaServed": { "@type": "Place", "name": "Worldwide (Remote)" },
          "audience": {
            "@type": "Audience",
            "audienceType": "ADHD Entrepreneurs, Women Entrepreneurs, Neurodivergent Business Owners"
          },
          "offers": {
            "@type": "Offer",
            "price": "97.00",
            "priceCurrency": "USD",
            "description": "$97/month for 6 months — 2 one-hour sessions twice per month"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Coaching Program Phases",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Phase 1: Personal Development — Identity & Foundation" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Phase 2: Planning — Systems & Habits" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Phase 3: Execution — Growth & Momentum" } }
            ]
          }
        })}
      />
      {/* Hero Section */}
      <section id="top" className={styles.heroSection} style={{backgroundImage: `url(${buildYourCommunityImage})`}}>
        <div className={styles.container}>
          <p className="tagline">From Overwhelmed to Prosperous</p>
          <h1 className={`playfair-bold ${styles.heroTitle} brand-gradient-text`}>
            Community Driven Transformation
          </h1>
          <h2 className={styles.heroSubtitle}>
            6 Month Focused Founder Framework
          </h2>
          
          {/* Pricing Box */}
          <div className={styles.pricingBox}>
            <p className={`taglineDark ${styles.pricingTitle}`}>
              Start Your Transformation
            </p>
            <div className={styles.pricingAmount}>
              $97/Month for 6 Months
            </div>
            <div className={styles.pricingDetails}>
              <div className={styles.pricingItem}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                2 One Hour Sessions Twice Per Month
              </div>
              <div className={styles.pricingItem}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                BONUS: 1-Hour Community Talk Every Month
              </div>
            </div>
            <a 
              href="https://sendlink.co/documents/doc-form/69b2d898993c38a3c094ca2b?locale=en-US"
              className={`btn btn-secondary ${styles.buttonSpacing}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              JOIN THE COMMUNITY
            </a>
          </div>
        </div>
      </section>

      {/* Phase Overview */}
      <section className={styles.phaseOverview}>
        <div id="coaching-overview" style={{ position: 'relative', top: '-100px' }}></div>
        <div className={styles.container}>
          <p className="taglineDark" style={{textAlign: 'center'}}>Your transformation roadmap</p>
          <h2 className={`${styles.phaseOverviewTitle} brand-gradient-text`}>
            Here's Our Three Phase Journey
          </h2>
          <div className={styles.phaseOverviewContent}>
            <div className={styles.phasesContainer}>
              <div className={`${styles.phaseStep} ${styles.phaseStepPersonal}`}>
                <div className={styles.phaseStepIcon}>
                  <img 
                    src={brainIconforRewire} 
                    alt="Rewire - Transformation Icon of a black brain with a pink arrow circling through the middle of it." 
                    className={styles.phaseStepIconImage}
                  />
                </div>
                <div className={styles.phaseStepContent}>
                  <h3 className={styles.phaseStepTitle}>PHASE 1 — Personal Development</h3>
                  <p className={styles.phaseStepDescription}>
                    Stabilize identity, nervous system, and internal foundation before business growth. Transform shame into self-trust and build the confidence to lead authentically.
                  </p>
                  <p className={styles.phaseStepLink}>
                    <a href="#phase1-details" className={styles.detailsLink}>
                      <strong> → Want More Details?</strong>
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.phaseStepArrow}>
                <div className={styles.arrowDown}>↓</div>
              </div>

              <div className={`${styles.phaseStep} ${styles.phaseStepPlanning}`}>
                <div className={styles.phaseStepIcon}>
                  <img 
                    src={compassIconforShift} 
                    alt="Compass Icon - Planning and Strategy" 
                    className={styles.phaseStepIconImage}
                  />
                </div>
                <div className={styles.phaseStepContent}>
                  <h3 className={styles.phaseStepTitle}>PHASE 2 — Planning</h3>
                  <p className={styles.phaseStepDescription}>
                    Build systems that match ADHD energy, not fight it. Create sustainable habits, master scheduling, and design your ideal business infrastructure.
                  </p>
                  <p className={styles.phaseStepLink}>
                    <a href="#phase2-details" className={styles.detailsLink}>
                      <strong> → Want More Details?</strong>
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.phaseStepArrow}>
                <div className={styles.arrowDown}>↓</div>
              </div>

              <div className={`${styles.phaseStep} ${styles.phaseStepExecution}`}>
                <div className={styles.phaseStepIcon}>
                  <img 
                    src={rocketicon} 
                    alt="Rocket Icon - Execution Phase" 
                    className={styles.phaseStepIconImage}
                  />
                </div>
                <div className={styles.phaseStepContent}>
                  <h3 className={styles.phaseStepTitle}>PHASE 3 — Execution</h3>
                  <p className={styles.phaseStepDescription}>
                    Convert clarity into profit, momentum, and sustainable growth. Execute with confidence while building relationships that support your success.
                  </p>
                  <p className={styles.phaseStepLink}>
                    <a href="#phase3-details" className={styles.detailsLink}>
                      <strong> → Want More Details?</strong>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 - Personal Development */}
      <section className={styles.phase1Section}>
        <div id="phase1-details" style={{ position: 'relative', top: '-100px' }}></div>
        <div className={styles.container}>
          <div className={styles.phaseHeader}>
            <p className={styles.taglineDarkLeft}>Phase 1</p>
            <h2 className={styles.phaseMainTitle1}>
              <img 
                src={brainIconforRewire} 
                alt="Brain Icon - Personal Development" 
                className={styles.phaseHeaderIcon}
              /> 
              Personal Development
            </h2>
            <p className={styles.phaseDescriptionLarge}>
              Stabilize identity, nervous system, and internal foundation before business growth.
            </p>
          </div>

          {/* Month 1 */}
          <div className={`grid grid-2 ${styles.monthGrid}`}>
            <div className={styles.monthCardWhite}>
              <p className={`taglineDark ${styles.monthTagline}`}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                Month 1, Step 1
              </p>
              <h3 className={styles.monthSubtitle}>
                Healing the ADHD Story
              </h3>
              <p className={styles.monthTheme}>
                Theme: From shame → self-trust → self-leadership
              </p>
              
              <div className={styles.lessonContainer}>
                <h4 className={styles.lessonTitle}>Lesson 1:</h4>
                <p className={styles.lessonDescription}>
                  👉 Understanding ADHD Trauma, Masking & Rejection Sensitivity<br/>
                  <small>(Shame cycles, RSD triggers, emotional pattern awareness)</small>
                </p>
              </div>
              
              <div>
                <h4 className={styles.lessonTitle}>Lesson 2:</h4>
                <p className={styles.lessonDescription}>
                  👉 Secure Attachment Patterns in Business & Relationships<br/>
                  <small>(Trust building, communication repair, relationship stability)</small>
                </p>
              </div>
            </div>

            {/* Month 2 */}
            <div className={styles.monthCardMagenta}>
              <p className={`taglineDark ${styles.monthTagline}`}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                Month 2, Step 2
              </p>
              <h3 className={styles.monthSubtitleGradient}>
                Identity & Confidence Expansion
              </h3>
              <p className={styles.monthThemeGradient}>
                Theme: Becoming the woman who can hold the business you want
              </p>
              
              <div className={styles.lessonContainer}>
                <h4 className={styles.lessonTitle}>Lesson 1:</h4>
                <p className={styles.lessonDescriptionGradient}>
                  👉 Strength-Based Identity + Creative Power<br/>
                  <small>(You are not broken — you are wired for innovation)</small>
                </p>
              </div>
              
              <div>
                <h4 className={styles.lessonTitle}>Lesson 2:</h4>
                <p className={styles.lessonDescriptionGradient}>
                  👉 Vulnerability Without Shame + Community Belonging<br/>
                  <small>(How to be seen, supported, and safe while growing)</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2 - Planning */}
      <section className={styles.phase2Section}>
        <div id="phase2-details" style={{ position: 'relative', top: '-100px' }}></div>
        <div className={styles.container}>
          <div className={styles.phaseHeader}>
            <p className={styles.taglineDarkLeft}>Phase 2</p>
            <h2 className={styles.phaseMainTitle2}>
              <img 
                src={compassIconforShift} 
                alt="Compass Icon - Planning" 
                className={styles.phaseHeaderIcon}
              /> 
              Planning
            </h2>
            <p className={styles.phaseDescriptionLarge}>
              Build systems that match ADHD energy, not fight it.
            </p>
          </div>

          {/* Alternating layout */}
          <div className={styles.monthGridPhase2}>
            <div className={`grid grid-2 ${styles.phaseGrid}`}>
              {/* Month 3 - Right side, blue theme */}
              <div className={styles.monthCardBlue}>
                <p className={`taglineDark ${styles.monthTagline}`}>
                  <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                  Month 3, Step 3
                </p>
                <h3 className={styles.monthSubtitleGradient}>
                  ADHD-Friendly Productivity & Habit Sustainability
                </h3>
                <p className={styles.monthThemeGradient}>
                  Theme: Systems that actually stick
                </p>
                
                <div className={styles.lessonContainer}>
                  <h4 className={styles.lessonTitle}>Lesson 1:</h4>
                  <p className={styles.lessonDescriptionGradient}>
                    👉 Strength-Based Time & Energy Management<br/>
                    <small>(Energy mapping, peak performance windows)</small>
                  </p>
                </div>
                
                <div>
                  <h4 className={styles.lessonTitle}>Lesson 2:</h4>
                  <p className={styles.lessonDescriptionGradient}>
                    👉 Sustainable Habits + Breaking Perfectionism<br/>
                    <small>(Progress &gt; perfection, one-focus execution model)</small>
                  </p>
                </div>
              </div>

              {/* Month 4 */}
              <div className={styles.monthCardWhiteBlue}>
                <p className={`taglineDark ${styles.monthTagline}`}>
                  <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                  Month 4, Step 4
                </p>
                <h3 className={styles.monthSubtitle}>
                  Life + Business Infrastructure
                </h3>
                <p className={styles.monthTheme}>
                  Theme: External structure = internal calm
                </p>
                
                <div className={styles.lessonContainer}>
                  <h4 className={styles.lessonTitle}>Lesson 1:</h4>
                  <p className={styles.lessonDescription}>
                    👉 Mastering Your Schedule + Anti-Overwhelm Planning<br/>
                    <small>(Flexible structure, CEO calendar thinking)</small>
                  </p>
                </div>
                
                <div>
                  <h4 className={styles.lessonTitle}>Lesson 2:</h4>
                  <p className={styles.lessonDescription}>
                    👉 Environment Reset: Decluttering Home, Office & Digital Life<br/>
                    <small>(Cognitive load reduction = focus increase)</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 3 - Execution */}
      <section className={styles.phase3Section}>
        <div id="phase3-details" style={{ position: 'relative', top: '-100px' }}></div>
        <div className={styles.container}>
          <div className={styles.phaseHeader}>
            <p className={styles.taglineDarkLeft}>Phase 3</p>
            <h2 className={styles.phaseMainTitle3}>
              <img 
                src={rocketicon} 
                alt="Rocket Icon - Execution" 
                className={styles.phaseHeaderIcon}
              /> 
              Execution
            </h2>
            <p className={styles.phaseDescriptionWhite}>
              Convert clarity into profit, momentum, and sustainable growth.
            </p>
          </div>

          <div className={`grid grid-2 ${styles.phaseGrid}`}>
            {/* Month 5 */}
            <div className={styles.monthCardWhiteSage}>
              <p className={`taglineDark ${styles.monthTagline}`}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                Month 5, Step 5
              </p>
              <h3 className={styles.monthSubtitle}>
                Focused Action & Financial Control
              </h3>
              <p className={styles.monthTheme}>
                Theme: Execution with emotional and financial stability
              </p>
              
              <div className={styles.lessonContainer}>
                <h4 className={styles.lessonTitle}>Lesson 1:</h4>
                <p className={styles.lessonDescription}>
                  👉 From Perfectionism → Execution Mode<br/>
                  <small>(Task activation, momentum building, decision speed)</small>
                </p>
              </div>
              
              <div>
                <h4 className={styles.lessonTitle}>Lesson 2:</h4>
                <p className={styles.lessonDescription}>
                  👉 Impulse Spending & Financial Nervous System Regulation<br/>
                  <small>(Money awareness, dopamine spending cycles)</small>
                </p>
              </div>
            </div>

            {/* Month 6 */}
            <div className={styles.monthCardOrange}>
              <p className={`taglineDark ${styles.monthTagline}`}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                Month 6, Step 6
              </p>
              <h3 className={styles.monthSubtitleGradient}>
                Sustainable Success & Relationship Leadership
              </h3>
              <p className={styles.monthThemeGradient}>
                Theme: Building a life that can hold your success
              </p>
              
              <div className={styles.lessonContainer}>
                <h4 className={styles.lessonTitle}>Lesson 1:</h4>
                <p className={styles.lessonDescriptionGradient}>
                  👉 Preventing Parental Burnout + Energy Protection<br/>
                  <small>(Business growth without self-loss)</small>
                </p>
              </div>
              
              <div>
                <h4 className={styles.lessonTitle}>Lesson 2:</h4>
                <p className={styles.lessonDescriptionGradient}>
                  👉 Partner Connection, Support Systems & Long-Term Stability<br/>
                  <small>(Relationships that support your ambition)</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div id="coaching-pricing" style={{ position: 'relative', top: '-100px' }}></div>
        <div className={styles.container}>
          <p className="taglineDark">Your transformation starts here</p>
          <h2 className={`${styles.ctaTitle} brand-gradient-text`}>
            Transform Your ADHD into Your Entrepreneurial Superpower
          </h2>
          <h3 className={styles.ctaSubtitle}>
            Join Our Community of Successful ADHD Entrepreneurs
          </h3>
          <p className={styles.ctaDescription}>
            Build a thriving business that works WITH your ADHD brain, not against it. 
            Get the support, strategies, and community you need to succeed.
          </p>
          
          <div className={styles.ctaPricingContainer}>
            <div className={styles.ctaPricingAmount}>
              $97/month × 6 months
            </div>
            <div className={styles.ctaPricingDetails}>
              2 Hours of Live Coaching + 1 Hour Community Bonus Each Month
            </div>
          </div>

          <div className={styles.ctaButtonContainer}>
            <a 
              href="https://sendlink.co/documents/doc-form/69b2d898993c38a3c094ca2b?locale=en-US"
              className={`btn btn-secondary ${styles.ctaBtnSecondary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              START YOUR TRANSFORMATION
            </a>
            
            <Link to="/contact" className={`btn ${styles.ctaBtnPrimary}`}>
              SCHEDULE A CALL
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coaching;