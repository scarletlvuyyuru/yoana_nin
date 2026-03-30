import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import logo from '../../assets/yoana_nin_coaching_logo.webp';
import facebookIcon from '../../assets/images/icon_fb_wht.webp';
import instagramIcon from '../../assets/images/icon_instagram.webp';
import linkedinIcon from '../../assets/images/icon_linkedin.webp';
import tiktokIcon from '../../assets/images/icon_tiktok_wht.webp';

interface NavigationItem {
  name: string;
  path: string;
  sections?: { name: string; id: string }[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'My Story',
    path: '/my-story',
    sections: [
      { name: 'My Journey', id: 'my-journey' },
      { name: 'Authorship', id: 'authorship' },
      { name: 'My Approach', id: 'my-approach' }
    ]
  },
  {
    name: 'Coaching',
    path: '/coaching',
    sections: [
      { name: 'Coaching Overview', id: 'coaching-overview' },
      { name: 'Phase 1: Personal Development', id: 'phase1-details' },
      { name: 'Phase 2: Planning', id: 'phase2-details' },
      { name: 'Phase 3: Execution', id: 'phase3-details' },
      { name: 'Coaching Pricing', id: 'coaching-pricing' }
    ]
  },
  {
    name: 'Real Estate',
    path: '/real-estate',
    sections: [
      { name: 'The Environment Effect', id: 'environment-effect' },
      { name: 'Triangle Living', id: 'triangle-living' },
      { name: 'The Prosperous Difference', id: 'prosperous-difference' },
      { name: 'The Foundation of Trust', id: 'foundation-trust' },
      { name: 'Global Integration', id: 'global-integration' }
    ]
  },
  {
    name: 'Inspiration and Resources',
    path: '/blog',
    sections: [
      { name: 'Featured Stories', id: 'featured-stories' },
      { name: 'Social Highlights', id: 'social-highlights' },
      { name: 'All Articles', id: 'all-articles' }
    ]
  }
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, targetPath: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const attemptScroll = () => {
      const element = document.getElementById(sectionId);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const offsetPosition = elementTop - 120;
        
        // Use requestAnimationFrame to ensure scroll happens after any other scroll resets
        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        });
      } else {
        // Retry after a short delay if element not found
        setTimeout(() => {
          const retryElement = document.getElementById(sectionId);
          if (retryElement) {
            const rect = retryElement.getBoundingClientRect();
            const elementTop = rect.top + window.pageYOffset;
            const offsetPosition = elementTop - 120;
            
            requestAnimationFrame(() => {
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            });
          }
        }, 200);
      }
    };
    
    // If we're already on the target page, scroll immediately
    if (location.pathname === targetPath) {
      // Use multiple attempts to overcome any scroll resets
      setTimeout(attemptScroll, 50);
      setTimeout(attemptScroll, 200);
    } else {
      // If navigating to a different page, wait longer and make multiple attempts
      setTimeout(attemptScroll, 800);
      setTimeout(attemptScroll, 1200);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className={styles.topBanner}>
        <div className={styles.bannerContainer}>
          {/* Social Links - Left Side */}
          <div className={styles.socialLinks}>
            <a 
              href="https://www.facebook.com/Nin.Yoana/" 
              className={styles.socialIcon}
              aria-label="Follow us on Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" className={styles.socialIconImage} />
            </a>
            <a 
              href="https://www.instagram.com/yoananincoaching/" 
              className={styles.socialIcon}
              aria-label="Follow us on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" className={styles.socialIconImage} />
            </a>
            <a 
              href="https://www.linkedin.com/in/yoananin" 
              className={styles.socialIcon}
              aria-label="Connect with us on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" className={styles.socialIconImage} />
            </a>
            <a 
              href="https://www.tiktok.com/@yoananincoaching" 
              className={styles.socialIcon}
              aria-label="Follow us on TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tiktokIcon} alt="TikTok" className={styles.socialIconImage} />
            </a>
          </div>

          {/* Banner Buttons - Right Side */}
          <div className={styles.bannerButtons}>
            <Link 
              to="/contact" 
              className={`${styles.bannerButton} ${styles.primary}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Contact
            </Link>
            <a 
              href="https://sendlink.co/documents/doc-form/69b2d898993c38a3c094ca2b?locale=en-US"
              className={`${styles.bannerButton} ${styles.blue}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Community
            </a>
            <Link
              to="/assessment"
              className={`${styles.bannerButton} ${styles.quiz}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              ADHD Quiz
            </Link>
          </div>
        </div>
      </div>

      <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
        <div className={styles.container}>
          {/* Left Navigation */}
          <div className={styles.navLeft}>
            <ul className={styles.navList}>
              {navigationItems.slice(0, 2).map((item) => (
                <li key={item.name} className={styles.navItem}>
                  {item.sections ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className={styles.dropdownButton}
                        aria-expanded={activeDropdown === item.name}
                        aria-haspopup="true"
                      >
                        {item.name}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`${styles.dropdownIcon} ${activeDropdown === item.name ? styles.open : ''}`}
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 4.5L6 8L9.5 4.5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {activeDropdown === item.name && (
                        <ul className={styles.dropdown} role="menu">
                          {/* Main page link */}
                          <li role="none">
                            <Link
                              to={item.path}
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setActiveDropdown(null);
                              }}
                              className={`${styles.dropdownItem} ${styles.mainPageLink}`}
                              role="menuitem"
                            >
                              {item.name}
                            </Link>
                          </li>
                          {/* Sub-sections */}
                          {item.sections.map((section) => (
                            <li key={section.id} role="none">
                              <Link
                                to={item.path}
                                onClick={() => {
                                  setTimeout(() => scrollToSection(section.id, item.path), 100);
                                  setActiveDropdown(null);
                                }}
                                className={`${styles.dropdownItem} ${styles.subSection}`}
                                role="menuitem"
                              >
                                {section.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => window.scrollTo(0, 0)}
                      className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Centered Logo */}
          <Link 
            to="/" 
            className={`${styles.logo} ${isScrolled ? styles.logoScrolled : ''}`} 
            aria-label="Yoana - Home"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src={logo} 
              alt="Yoana Coaching Logo" 
              className={styles.logoImage}
              width="300"
              height="200"
            />
          </Link>

          <Link
            to="/assessment"
            className={styles.mobileQuizButton}
            onClick={() => window.scrollTo(0, 0)}
          >
            ADHD Quiz
          </Link>

          {/* Right Navigation */}
          <div className={styles.navRight}>
            <ul className={styles.navList}>
              {navigationItems.slice(2).map((item) => (
                <li key={item.name} className={styles.navItem}>
                  {item.sections ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className={styles.dropdownButton}
                        aria-expanded={activeDropdown === item.name}
                        aria-haspopup="true"
                      >
                        {item.name}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`${styles.dropdownIcon} ${activeDropdown === item.name ? styles.open : ''}`}
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 4.5L6 8L9.5 4.5"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {activeDropdown === item.name && (
                        <ul className={styles.dropdown} role="menu">
                          {/* Main page link */}
                          <li role="none">
                            <Link
                              to={item.path}
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setActiveDropdown(null);
                              }}
                              className={`${styles.dropdownItem} ${styles.mainPageLink}`}
                              role="menuitem"
                            >
                              {item.name}
                            </Link>
                          </li>
                          {/* Sub-sections */}
                          {item.sections.map((section) => (
                            <li key={section.id} role="none">
                              <Link
                                to={item.path}
                                onClick={() => {
                                  setTimeout(() => scrollToSection(section.id, item.path), 100);
                                  setActiveDropdown(null);
                                }}
                                className={`${styles.dropdownItem} ${styles.subSection}`}
                                role="menuitem"
                              >
                                {section.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => window.scrollTo(0, 0)}
                      className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className={styles.navMobile}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.mobileMenuButton}
              aria-expanded={isOpen}
              aria-label="Toggle mobile menu"
            >
              <div className={styles.hamburger}>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileNavList}>
              {navigationItems.map((item) => (
                <li key={item.name} className={styles.mobileNavItem}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={styles.mobileNavLink}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className={styles.mobileContactButton}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;