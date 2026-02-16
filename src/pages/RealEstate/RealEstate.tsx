import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RealEstate.module.css';
import fourCInfographic from '../../assets/images/4cInfographic.webp';
import bulletPoint from '../../assets/images/bulletPoint.webp';
// Import placeholder images - replace with actual images when available
import triangleHeroImage from '../../assets/images/Sanctuary.webp'; // Hero background
import familyParkImage from '../../assets/images/familyGroupImage.webp'; // Mom's perspective
import teamOfficeImage from '../../assets/images/yoana-nin-realestateshot.webp'; // TPA team

import relocationImage from '../../assets/images/GlobalFamilies.webp'; // Relocation services

const RealEstate: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="environment-effect" className={styles.hero} style={{backgroundImage: `url(${triangleHeroImage})`}}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Find Your Sanctuary In The Triangle
            </h1>
            <p className={styles.heroDescription}>
              More than just real estate—we help you build a life that works.
            </p>
            <div className={styles.heroBullets}>
              <div className={styles.bulletItem}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                <span>Find Homes That Support Your Lifestyle</span>
              </div>
              <div className={styles.bulletItem}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                <span>Integrate Into Meaningful Communities</span>
              </div>
              <div className={styles.bulletItem}>
                <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                <span>Relocation Support For Global Families</span>
              </div>
            </div>
            <a 
              href="https://www.theprosperousagency.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.heroButton}
            >
              → Search Triangle Homes
            </a>
          </div>
        </div>
      </section>

      {/* Mom's Perspective Section */}
      <section id="triangle-living" className={styles.momsSection}>
        <div className={styles.container}>
          <div className={styles.momsContent}>
            <div className={styles.momsImageSection}>
              <img 
                src={familyParkImage} 
                alt="Family enjoying Triangle area parks and green spaces" 
                className={styles.momsImage}
              />
            </div>
            <div className={styles.momsTextSection}>
              <h2 className={styles.sectionTitle}>Living The Triangle Life</h2>
              <h3 className={styles.sectionSubtitle}>Lifestyle, Connection & Wellness</h3>
              <p className={styles.sectionText}>
                As someone who built a new beginning in the Triangle, I know home is where your life rhythm begins.
              </p>
              <div className={styles.featuresList}>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                  <div>
                    <strong>Wellness & Outdoors:</strong> Find homes near Triangle's extensive trails and parks
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                  <div>
                    <strong>Peace of Mind:</strong> Neighborhoods that align with your specific lifestyle needs
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                  <div>
                    <strong>The Joy Factor:</strong> Vibrant communities with cultural opportunities & local energy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prosperous Agency Difference Section */}
      <section id="prosperous-difference" className={styles.tpaSection}>
        <div className={styles.container}>
          <div className={styles.tpaContent}>
            <div className={styles.tpaTextSection}>
              <h2 className={styles.sectionTitle}>The Prosperous Agency Difference</h2>
              <h3 className={styles.sectionSubtitle}>Integrity-First Approach</h3>
              <p className={styles.sectionText}>
                Quality life starts with trust. Every interaction is rooted in reliability.
              </p>
            </div>
            <div className={styles.tpaImageSection}>
              <img 
                src={teamOfficeImage} 
                alt="The Prosperous Agency team" 
                className={styles.tpaImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 C's of Trust Section */}
      <section id="foundation-trust" className={styles.trustSection}>
        <div className={styles.container}>
          <h2 className={styles.trustTitle}>The 4 C's of Trust</h2>
          <p className={styles.trustSubtitle}>
            Our proven framework for ensuring your home meets your needs:
          </p>
          
          <div className={styles.trustContent}>
            <div className={styles.trustGrid}>
              <div className={styles.trustCard}>
                <div className={styles.trustNumber}>1</div>
                <h4 className={styles.trustCardTitle}>Competence</h4>
                <p className={styles.trustCardText}>
                  Deep market knowledge & technical skills for sound investments.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustNumber}>2</div>
                <h4 className={styles.trustCardTitle}>Care</h4>
                <p className={styles.trustCardText}>
                  Focus on your family's growth, not just the transaction.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustNumber}>3</div>
                <h4 className={styles.trustCardTitle}>Character</h4>
                <p className={styles.trustCardText}>
                  Highest professional standards & ethical principles every time.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustNumber}>4</div>
                <h4 className={styles.trustCardTitle}>Consistency</h4>
                <p className={styles.trustCardText}>
                  Stable standards & promises throughout your entire move.
                </p>
              </div>
            </div>
            
            <div className={styles.infographicSection}>
              <img 
                src={fourCInfographic} 
                alt="4 C's of Trust Infographic - Competence, Care, Character, and Consistency" 
                className={styles.infographicImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Relocation Section */}
      <section id="global-integration" className={styles.relocationSection}>
        <div className={styles.container}>
          <div className={styles.relocationContent}>
            <div className={styles.relocationTextSection}>
              <h2 className={styles.sectionTitle}>Relocation For Global Families</h2>
              <h3 className={styles.sectionSubtitle}>Comprehensive Support & Services</h3>
              <p className={styles.sectionText}>
                I moved from Romania → LA → Raleigh. I know international relocation challenges.
              </p>
              <div className={styles.servicesList}>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                  <div>
                    <strong>Full-Service Integration:</strong> Airport coordination to closing assistance
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                  <div>
                    <strong>Strategic Marketing:</strong> Proven strategies to showcase & attract qualified buyers
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="" className={styles.bulletIcon} />
                  <div>
                    <strong>Transition Support:</strong> Resources to establish yourself in your new community
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.relocationImageSection}>
              <img 
                src={relocationImage} 
                alt="Global relocation and family transition services" 
                className={styles.relocationImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Let's Find Your Sanctuary</h2>
            <p className={styles.ctaText}>
              Ready to find your ideal Triangle home? <br />We make your transition smooth & successful.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.primaryButton}>
                Schedule Consultation
              </Link>
              <a 
                href="https://www.theprosperousagency.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                Browse Properties
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RealEstate;