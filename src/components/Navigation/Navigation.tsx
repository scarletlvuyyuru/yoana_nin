import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import desktopLogo from '../../assets/yoana_nin_coaching_logo.webp';
import mobileLogo from '../../assets/yoana_nin_coaching_logomobile.webp';
import facebookIcon from '../../assets/images/icon_fb_wht.webp';
import instagramIcon from '../../assets/images/icon_instagram.webp';
import linkedinIcon from '../../assets/images/icon_linkedin.webp';
import tiktokIcon from '../../assets/images/icon_tiktok_wht.webp';
import youtubeIcon from '../../assets/images/youtubeLikesIcon.webp';

interface NavigationItem {
  name: string;
  path: string;
  sections?: { name: string; id: string }[];
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Coaching',
    path: '/coaching',
    sections: [
      { name: 'Coaching Offers', id: 'coaching-offers' },
      { name: 'Group Coaching', id: 'group-offer' },
      { name: '6-Month 1:1 Coaching', id: 'private-offer' }
    ]
  },
  {
    name: 'Blog',
    path: '/blog',
    sections: [
      { name: 'Featured Stories', id: 'featured-stories' },
      { name: 'Social Highlights', id: 'social-highlights' },
      { name: 'All Articles', id: 'all-articles' }
    ]
  },
  {
    name: 'Events',
    path: '/events',
    sections: [
      { name: 'Media Features', id: 'media-features' },
      { name: 'Community Highlights', id: 'community-highlights' },
      { name: 'Upcoming Events', id: 'upcoming-events' }
    ]
  }
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    let ticking = false;
    const SCROLL_DOWN_THRESHOLD = 72;
    const SCROLL_UP_THRESHOLD = 28;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const nextScrolled = isScrolledRef.current
        ? scrollTop > SCROLL_UP_THRESHOLD
        : scrollTop > SCROLL_DOWN_THRESHOLD;

      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollState);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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
              href="https://www.tiktok.com/@adhdcoachyoana?is_from_webapp=1&sender_device=pc" 
              className={styles.socialIcon}
              aria-label="Follow us on TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tiktokIcon} alt="TikTok" className={styles.socialIconImage} />
            </a>
            <a
              href="https://www.youtube.com/@ElevatewithYoanaNin"
              className={styles.socialIcon}
              aria-label="Subscribe on YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtubeIcon} alt="YouTube" className={styles.socialIconImage} />
            </a>
          </div>

          <div className={styles.topBannerActions}>
            <Link
              to="/resources/"
              className={`${styles.bannerButton} ${styles.bookNowButton}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Book Now
            </Link>
          </div>

        </div>
      </div>

      <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
        <div className={styles.container}>
          {/* Left Navigation */}
          <div className={styles.navLeft}>
            <ul className={styles.navList}>
              {navigationItems.slice(0, 3).map((item) => (
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
            <picture>
              <source media="(max-width: 768px)" srcSet={mobileLogo} />
              <img 
                src={desktopLogo} 
                alt="Yoana Coaching Logo" 
                className={styles.logoImage}
                width="300"
                height="200"
              />
            </picture>
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
            <div className={`${styles.bannerButtons} ${styles.navBannerButtons}`}>
              <Link
                to="/contact"
                className={`${styles.bannerButton} ${styles.neutralContactButton}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                Contact
              </Link>
              <Link
                to="/assessment"
                className={`${styles.bannerButton} ${styles.quiz}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                ADHD Quiz
              </Link>
              <a
                href="https://link.fastpaydirect.com/payment-link/6a73adcc7b99151a5404288d"
                className={styles.joinCommunityLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Community
                <span className={styles.textLinkIcon} aria-hidden="true">↗</span>
              </a>
            </div>
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