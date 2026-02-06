import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RealEstate.module.css';
import fourCInfographic from '../../assets/images/4cInfographic.webp';
// Import placeholder images - replace with actual images when available
import triangleHeroImage from '../../assets/images/Sanctuary.webp'; // Hero background
import familyParkImage from '../../assets/images/familyGroupImage.webp'; // Mom's perspective
import teamOfficeImage from '../../assets/images/yoana-nin-realestateshot.webp'; // TPA team
import homeInteriorImage from '../../assets/images/yoana_nin_leaning_in.webp'; // Physical environment
import relocationImage from '../../assets/images/GlobalFamilies.webp'; // Relocation services

const RealEstate: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="environment-effect" className={styles.hero} style={{backgroundImage: `url(${triangleHeroImage})`}}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Real Estate & Relocation: More Than a Transaction
            </h1>
            <p className={styles.heroDescription}>
              Your home is not just a building; it is the physical environment that supports your daily life, well-being, and future goals. Finding the right home is about more than a zip code—it's about finding a space that supports your lifestyle and aspirations. At The Prosperous Agency, we don't just sell houses; we help you integrate into a community and build a life that works for you.
            </p>
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
              <h2 className={styles.sectionTitle}>A Resident's Perspective on the Triangle</h2>
              <h3 className={styles.sectionSubtitle}>Lifestyle, Connection, and Wellness in Cary, Apex, and Raleigh</h3>
              <p className={styles.sectionText}>
                As someone who built a new beginning right here in the Triangle, I know that a home search is truly a search for the foundation of your daily life. I focus on the holistic elements that help a household's unique rhythm flourish.
              </p>
              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <strong>Wellness & The Outdoors:</strong> We prioritize homes with proximity to the Triangle's extensive trail systems and parks, perfect for those who value nature as a tool for mindfulness and vitality.
                </li>
                <li className={styles.featureItem}>
                  <strong>Peace of Mind:</strong> I guide you toward neighborhoods that align with your specific lifestyle needs, helping you find a serene environment where you can feel truly at home the moment you walk through the door.
                </li>
                <li className={styles.featureItem}>
                  <strong>The "Joy" Factor:</strong> We look for vibrant communities rich in cultural opportunities and local amenities that provide the energy you need to excel in your personal and professional mission.
                </li>
              </ul>
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
              <h3 className={styles.sectionSubtitle}>An Integrity-First Approach</h3>
              <p className={styles.sectionText}>
                We believe that the quality of your life is dependent on the quality of your relationships—and that starts with trust. My team and I utilize a specialized framework to ensure every interaction is rooted in reliability and truth.
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
          <h2 className={styles.trustTitle}>The 4 C's of Trust in Your Home Search</h2>
          <p className={styles.trustSubtitle}>
            To ensure a home meets your specific needs and preferences, we apply the 4 C's of Trust:
          </p>
          
          <div className={styles.trustContent}>
            <div className={styles.trustGrid}>
              <div className={styles.trustCard}>
                <div className={styles.trustNumber}>1</div>
                <h4 className={styles.trustCardTitle}>Competence</h4>
                <p className={styles.trustCardText}>
                  We bring deep market knowledge and technical skills to the table, ensuring your investment is sound.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustNumber}>2</div>
                <h4 className={styles.trustCardTitle}>Care</h4>
                <p className={styles.trustCardText}>
                  We act in your best interest, focusing on what is best for your family's growth, not just the transaction.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustNumber}>3</div>
                <h4 className={styles.trustCardTitle}>Character</h4>
                <p className={styles.trustCardText}>
                  We practice what we preach, operating with the highest professional standards and ethical principles throughout every transaction.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustNumber}>4</div>
                <h4 className={styles.trustCardTitle}>Consistency</h4>
                <p className={styles.trustCardText}>
                  Our standards, promises, and behaviors stay aligned throughout the process, providing a stable foundation for your move.
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

      {/* Physical Environment Section */}
      <section id="spaces-support" className={styles.environmentSection}>
        <div className={styles.container}>
          <div className={styles.environmentContent}>
            <div className={styles.environmentImageSection}>
              <img 
                src={homeInteriorImage} 
                alt="Beautiful, peaceful home interior representing optimal living environment" 
                className={styles.environmentImage}
              />
            </div>
            <div className={styles.environmentTextSection}>
              <h2 className={styles.sectionTitle}>Your Physical Environment & Personal Growth</h2>
              <p className={styles.sectionText}>
                In my coaching practice, we perform a "Wheel of Life" audit, and one of the most critical rungs on that ladder is your Physical Environment.
              </p>
              <h4 className={styles.impactTitle}>Impact on Mental Health and Thriving</h4>
              <p className={styles.sectionText}>
                Your living space has a significant impact on your daily routine, productivity, and overall quality of life. A home that meets your specific needs supports healthy habits, better rest, and the space needed to pursue your goals. We help you find a property that serves your practical requirements and lifestyle preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Relocation Section */}
      <section id="global-integration" className={styles.relocationSection}>
        <div className={styles.container}>
          <div className={styles.relocationContent}>
            <div className={styles.relocationTextSection}>
              <h2 className={styles.sectionTitle}>Relocation for Global Families</h2>
              <h3 className={styles.sectionSubtitle}>Comprehensive Marketing and Integration Services</h3>
              <p className={styles.sectionText}>
                Having moved from Romania to Los Angeles and finally to Raleigh, I am intimately familiar with the complexities of international relocation. We offer a comprehensive Relocation Integration Program designed to ease the stress of significant life transitions.
              </p>
              <ul className={styles.servicesList}>
                <li className={styles.serviceItem}>
                  <strong>Full-Service Integration:</strong> Our services extend from airport coordination to closing assistance, managing logistical details so you can focus on your transition.
                </li>
                <li className={styles.serviceItem}>
                  <strong>Strategic Marketing:</strong> For those selling, we use proven marketing strategies that showcase your home's best features to attract qualified buyers.
                </li>
                <li className={styles.serviceItem}>
                  <strong>Transition Support:</strong> We provide the guidance and resources needed to help you establish yourself successfully in your new community.
                </li>
              </ul>
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
            <h2 className={styles.ctaTitle}>Let's Discuss Your Move</h2>
            <p className={styles.ctaText}>
              Ready to find your ideal home in the Triangle? <br />Whether you're relocating from across the globe or across town, we're here to make your transition smooth and successful.
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