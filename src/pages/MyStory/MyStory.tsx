import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MyStory.module.css';
import bookImage from '../../assets/images/Journey_to_inner_joy_and_success_in_realestate.webp';
import adhdBadge from '../../assets/images/Adhd_certification_badge.webp';
import jayShettyCert from '../../assets/images/jay_Shetty_Certification.webp';
import energeticHealerBadge from '../../assets/images/energeticHealer.webp';
import tpaLogo from '../../assets/images/TPA_logo.webp';
import credentialsImage from '../../assets/images/yoana_nin_green_sweater.webp';
import heroBackground from '../../assets/images/MyStoryHeroBackground.webp';

import yoanaYoung from '../../assets/images/yoana-nin-young.webp';
import yoanaRealEstate from '../../assets/images/yoana-nin-realestateshot.webp';
import yoanaHollywood from '../../assets/images/yoana-nin-hollywood.webp';
import yoanaBlueShirt from '../../assets/images/yoana-nin-blue-shirt-pose.webp';

const MyStory: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} style={{backgroundImage: `url(${heroBackground})`}}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            MY STORY: <br />FROM ROMANIA TO RALEIGH
          </h1>
          <h2 className={styles.heroSubtitle}>
            How I Found Joy and Success by Rebuilding From the Ground Up
          </h2>
          <p className={styles.heroDescription}>
            Some journeys start with certainty. Mine started with a suitcase, $10,000, an accent, and a dream that felt bigger than my reality.
          </p>
          <p className={styles.heroDescription} style={{paddingTop: '1.5rem'}}>
            Life had a bigger plan — one that would break me open, strip me down, rebuild me completely, and eventually reveal the woman I was meant to become.
          </p>
          
          {/* Film Reel - Mobile/Tablet Only */}
          <div className={styles.filmReel}>
            <div className={styles.filmStrip}>
              <img src={yoanaYoung} alt="Young Yoana" className={styles.filmFrame} />
                <img src={yoanaRealEstate} alt="Yoana real estate" className={styles.filmFrame} />
              <img src={yoanaHollywood} alt="Yoana in Hollywood" className={styles.filmFrame} />
              <img src={yoanaBlueShirt} alt="Yoana blue shirt pose" className={styles.filmFrame} />
              <img src={credentialsImage} alt="Yoana coaching" className={styles.filmFrame} />
            </div>
          </div>
        </div>
      </section>

      {/* Acts Section - Combined */}
      <section className={styles.actsSection}>
        <div className={styles.container}>
          {/* Act I */}
          <div className={styles.actContent}>
            <div className={styles.actNumber}>I</div>
            <div className={styles.actText}>
              <h2 className={styles.actTitle}>The American Dream & The Hollywood Hustle</h2>
              <h3 className={styles.actDescription}>
                I arrived in Los Angeles after winning the Green Card Lottery, wide-eyed and determined. I worked jobs that built grit, but I learned quickly that in America, dreams don't chase you— you chase them. Yet, something was missing: joy, alignment, and purpose. The success I wanted wasn't loud or glamorous; it was peaceful.
              </h3>
            </div>
          </div>

          {/* Act Divider */}
          <div className={styles.actDivider}></div>

          {/* Act II */}
          <div className={styles.actContent}>
            <div className={styles.actNumber}>II</div>
            <div className={styles.actText}>
              <h2 className={styles.actTitle}>The Struggle and The Shift</h2>
              <h3 className={styles.actDescription}>
                Life tested me in ways I never expected. Infertility. Two heartbreaking miscarriages. Financial collapse. In my darkest moments, I realized that hard work alone doesn't save you—joy does. To heal, I had to stop merely surviving and start listening to my soul. I learned that making peace with the past is essential because you no longer reside in that space, and change cannot occur there. I had to engage in a step-by-step process of forgiveness to release the emotional burdens acting as barriers to my goals.
              </h3>
            </div>
          </div>

          {/* Act Divider */}
          <div className={styles.actDivider}></div>

          {/* Act III */}
          <div className={styles.actContent}>
            <div className={styles.actNumber}>III</div>
            <div className={styles.actText}>
              <h2 className={styles.actTitle}>The Phoenix Rising</h2>
              <h3 className={styles.actDescription}>
                We moved to Raleigh, NC—a place that welcomed us with open arms. We rebuilt from zero and created The Prosperous Agency. Naming my son Phoenix was a testament to rising from the ashes to find stability and purpose. Today, I choose to give that joy back to every person I work with.
              </h3>
            </div>
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
      <section className={styles.credentialsSection}>
        <div className={styles.container}>
          <h2 className={styles.credentialsTitle}>How I turn Empathy into Action</h2>
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
                    Specializing in overwhelmed achievers and high performers with racing minds. I use the ABC Framework to help you perform a Life Audit and establish a "ladder to success" that respects how your brain actually works.
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
              The next chapter awaits
            </p>
            <p className={styles.ctaText}>
              Your story is still being written. <br /><em className={styles.ctaEmphasis}>Let's find your next chapter together.</em>
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