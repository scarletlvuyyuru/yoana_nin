import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RealEstate.module.css';
import SEO from '../../components/SEO/SEO';
import fourCInfographic from '../../assets/images/4cInfographic.webp';
import bulletPoint from '../../assets/images/bulletPoint.webp';
import yoanaPrideFlag from '../../assets/images/yoanaPrideFlag.webp';

import triangleHeroImage from '../../assets/images/Sanctuary.webp'; // Hero background
import familyParkImage from '../../assets/images/familyGroupImage.webp'; // Mom's perspective
import teamOfficeImage from '../../assets/images/yoana_nin_the_prosperous_agency.webp'; 

import relocationImage from '../../assets/images/GlobalFamilies.webp'; // Relocation services

const RealEstate: React.FC = () => {
  return (
    <>
      <SEO 
        title="Prosperous Agency | Real Estate Expert in Raleigh, Cary, Apex NC"
        description="Looking to buy, sell, or relocate in the Raleigh Triangle Area? Yoana Nin and The Prosperous Agency provide holistic real estate services."
        url="https://yoananincoaching.com/real-estate"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": "https://yoananincoaching.com/real-estate#agent",
          "name": "Yoana Nin \u2014 The Prosperous Agency",
          "description": "Real Estate Expert serving Raleigh NC Triangle Area - helping relocating families find their sanctuary",
          "url": "https://yoananincoaching.com/real-estate",
          "image": "https://yoananincoaching.com/metaOG.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cary",
            "addressRegion": "NC",
            "addressCountry": "US"
          },
          "employee": {
            "@type": "Person",
            "@id": "https://yoananincoaching.com/#person",
            "name": "Yoana Nin",
            "jobTitle": "Real Estate Agent & ADHD Life Coach"
          },
          "areaServed": [
            { "@type": "City", "name": "Raleigh" },
            { "@type": "City", "name": "Durham" },
            { "@type": "City", "name": "Chapel Hill" },
            { "@type": "City", "name": "Cary" },
            { "@type": "City", "name": "Apex" },
            { "@type": "City", "name": "Holly Springs" },
            { "@type": "City", "name": "Morrisville" },
            { "@type": "City", "name": "Wake Forest" },
            { "@type": "City", "name": "Fuquay-Varina" },
            { "@type": "City", "name": "Garner" },
            { "@type": "City", "name": "Clayton" },
            { "@type": "City", "name": "Rolesville" }
          ],
          "priceRange": "$$",
          "serviceType": [
            "Real Estate Buyer Agent",
            "Real Estate Seller Agent",
            "Relocation Services",
            "New Construction Home Buying"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Real Estate Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Relocation Services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "New Construction Home Buying"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Buyer Representation"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Seller Representation"
                }
              }
            ]
          },
          "knowsAbout": [
            "Triangle Area Real Estate Market",
            "Raleigh Real Estate",
            "Durham Real Estate",
            "Chapel Hill Real Estate",
            "Cary Real Estate",
            "Apex Real Estate",
            "Holly Springs Real Estate",
            "Morrisville Real Estate",
            "Wake Forest Real Estate",
            "Fuquay-Varina Real Estate",
            "Garner Real Estate",
            "Clayton Real Estate",
            "Rolesville Real Estate",
            "Relocation Services",
            "New Construction Homes",
            "Builder Contracts",
            "International Relocation",
            "Expat Relocation"
          ],
          "sameAs": [
            "https://www.facebook.com/share/1DTKdgCCyL/",
            "https://www.linkedin.com/in/yoananin",
            "https://www.instagram.com/yoananin/",
            "https://www.threads.net/@yoananin",
            "https://www.youtube.com/@yoananinrealty",
            "https://www.tiktok.com/@yoananin",
            "https://x.com/NinYoana",
            "https://license.ncrec.gov/ncrec/oecgi3.exe/O4W_WRAPPER?ID=O4W_BROKERS_BY_FIRM_DETAIL_NEW&FIRM_ID=C26570*0*0",
            "https://www.bbb.org/us/nc/cary/profile/real-estate-broker/yoana-nin-realty-aka-the-prosperous-agency-0593-90359119",
            "https://www.realtor.com/realestateagents/5681075989a68901006b0471",
            "https://www.zillow.com/profile/Yoana%20Nin",
            "https://www.homes.com/real-estate-agents/cary-nc/macgregor-downs-neighborhood/",
            "https://web.carychamber.com/Real-Estate/The-Prosperous-Agency-16421",
            "https://nextdoor.com/pages/the-prosperous-agency-cary-nc/",
            "https://www.yelp.com/biz/the-prosperous-agency-cary-2",
            "https://www.amazon.in/Journey-Inner-Success-Real-Estate/dp/191294832X",
            "https://www.b2bmit.com/showroom-11068975.htm"
          ]
        })}
      />
      {/* Hero Section */}
      <section id="environment-effect" className={styles.hero} style={{backgroundImage: `url(${triangleHeroImage})`}}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Find Your Sanctuary in the Raleigh Triangle Area
            </h1>
            <p className={styles.heroDescription}>
              More than just real estate—we help you build a life that works.
            </p>
            <div className={styles.heroBullets}>
              <div className={styles.bulletItem}>
                <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                <span>Find Homes That Support Your Lifestyle</span>
              </div>
              <div className={styles.bulletItem}>
                <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                <span>Integrate Into Meaningful Communities</span>
              </div>
              <div className={styles.bulletItem}>
                <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                <span>Relocation Support For Global Clients</span>
              </div>
            </div>
            <a 
              href="https://www.theprosperousagency.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.heroButton}
            >
              → Search Raleigh Triangle Homes
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
                alt="Family enjoying Raleigh Triangle area parks and green spaces" 
                className={styles.momsImage}
              />
            </div>
            <div className={styles.momsTextSection}>
              <h2 className={`taglineDark ${styles.taglineDarkLeft}`}>
                The Raleigh Triangle Living Life Balance
              </h2>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitleLeft}`}>
                Lifestyle, Connection & Wellness
              </h3>
              <p className={styles.sectionText}>
                As someone who built a new beginning in the Triangle, I know home is where your life rhythm begins.
              </p>
              <div className={styles.featuresList}>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                  <div>
                    <strong>Wellness & Outdoors:</strong> Find homes near Triangle's extensive trails and parks
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                  <div>
                    <strong>Peace of Mind:</strong> Neighborhoods that align with your specific lifestyle needs
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
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
              <p className={`taglineDark ${styles.taglineDarkLeft}`}>
                The Prosperous Agency Difference
              </p>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLeft}`}>
                Integrity-First Approach
              </h2>
              <p className={styles.sectionText}>
                Quality life starts with trust. Every interaction is rooted in reliability.
              </p>
            </div>
            <div className={styles.tpaImageSection}>
              <img 
                src={teamOfficeImage} 
                alt="The Prosperous Agency Team Lead Yoana Nin " 
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
                <div className={styles.trustCardHeader}>
                  <div className={styles.trustNumber}>1</div>
                  <h4 className={styles.trustCardTitle}>Competence</h4>
                </div>
                <p className={styles.trustCardText}>
                  Deep market knowledge & technical skills for sound investments.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustCardHeader}>
                  <div className={styles.trustNumber}>2</div>
                  <h4 className={styles.trustCardTitle}>Care</h4>
                </div>
                <p className={styles.trustCardText}>
                  Focus on your family's growth, not just the transaction.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustCardHeader}>
                  <div className={styles.trustNumber}>3</div>
                  <h4 className={styles.trustCardTitle}>Character</h4>
                </div>
                <p className={styles.trustCardText}>
                  Highest professional standards & ethical principles every time.
                </p>
              </div>
              
              <div className={styles.trustCard}>
                <div className={styles.trustCardHeader}>
                  <div className={styles.trustNumber}>4</div>
                  <h4 className={styles.trustCardTitle}>Consistency</h4>
                </div>
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
              <p className={`taglineDark ${styles.taglineDarkLeft}`}>
                Relocation For Global Clients
              </p>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLeft}`}>
                Comprehensive Support & Services
              </h2>
              <p className={styles.sectionText}>
                I moved from Romania → LA → Raleigh. I know international relocation challenges. We can support your move. 
              </p>
              <div className={styles.servicesList}>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                  <div>
                    <strong>Full-Service Integration:</strong> Airport coordination to closing assistance
                  </div>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
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

      {/* Welcoming All Families Section */}
      <section className={styles.inclusivitySection}>
        <div className={styles.container}>
          <div className={styles.inclusivityContent}>
            <div className={styles.inclusivityImageSection}>
              <img 
                src={yoanaPrideFlag} 
                alt="Yoana Nin proudly supporting LGBTQ+ community" 
                className={styles.inclusivityImage}
              />
            </div>
            <div className={styles.inclusivityText}>
              <p className={`taglineDark ${styles.taglineDarkLeft}`}>
                Open Doors For All Families
              </p>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLeft}`}>
                Welcoming All Families Home
              </h2>
              <p className={styles.sectionText}>
                Every client deserves to find their perfect sanctuary. As a proud LGBTQ+ ally, 
                I'm committed to helping everyone find not just a house, 
                but a true home where they can be themselves and thrive.
              </p>
              <div className={styles.inclusivityFeatures}>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                  <span>Safe, welcoming environment for all </span>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                  <span>Understanding of diverse family needs</span>
                </div>
                <div className={styles.bulletItem}>
                  <img src={bulletPoint} alt="Pink Star Custom Bullet Point" className={styles.bulletIcon} />
                  <span>Connections to inclusive community resources</span>
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
            <h2 className={styles.ctaTitle}>Let's Find Your Sanctuary</h2>
            <p className={styles.ctaText}>
              Ready to find your ideal Raleigh Area home? <br />We make your transition smooth & successful.
            </p>
            <div className={styles.ctaButtons}>
              <Link 
                to="/contact" 
                className={styles.primaryButton}
                onClick={() => {
                  setTimeout(() => window.scrollTo(0, 0), 100);
                }}
              >
                Schedule<br />Consultation
              </Link>
              <a 
                href="https://www.theprosperousagency.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                Browse<br />Properties
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RealEstate;