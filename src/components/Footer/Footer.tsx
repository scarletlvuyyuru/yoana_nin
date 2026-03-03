import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/yoana_nin_coaching_logo.webp';
import facebookIcon from '../../assets/images/icon_fb_wht.webp';
import instagramIcon from '../../assets/images/icon_instagram.webp';
import linkedinIcon from '../../assets/images/icon_linkedin.webp';
import tiktokIcon from '../../assets/images/icon_tiktok_wht.webp';

const Footer: React.FC = () => {
  const footerStyle = {
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    marginTop: '4rem',
    padding: '3rem 0'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const linkStyle = {
    color: 'var(--footer-text-secondary)',
    textDecoration: 'none',
    marginBottom: '0.5rem',
    display: 'block',
    transition: 'color 0.2s ease'
  };

  const socialStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  };

  const socialLinkStyle = {
    color: 'var(--footer-text-secondary)',
    textDecoration: 'none',
    padding: '0.75rem',
    borderRadius: '50%',
    backgroundColor: 'var(--color-navy)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Brand Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <img 
                src={logo} 
                alt="Yoana Nin Logo" 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%'
                }}
              />
              <h3 style={{ 
                fontFamily: 'var(--font-heading)', 
                color: 'var(--footer-text-primary)', 
                margin: '0',
                fontSize: 'var(--font-size-xl)'
              }}>
                Yoana Nin Coaching
              </h3>
            </div>
            <p style={{ color: 'var(--footer-text-secondary)', marginBottom: '1rem' }}>
           Accredited Life Coach For Women Entrepreneurs (ADHD Focus)
            </p>
            {/* Social Media Links */}
            <div style={socialStyle}>
              <a 
                href="https://www.facebook.com/Nin.Yoana/" 
                style={socialLinkStyle} 
                aria-label="Facebook"
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(13, 37, 71, 0.8)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy)'}
              >
                <img src={facebookIcon} alt="Facebook" style={{width: '20px', height: '20px'}} />
              </a>
              <a 
                href="https://www.instagram.com/yoananincoaching/" 
                style={socialLinkStyle} 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(13, 37, 71, 0.8)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy)'}
              >
                <img src={instagramIcon} alt="Instagram" style={{width: '20px', height: '20px'}} />
              </a>
              <a 
                href="https://www.linkedin.com/in/yoananin" 
                style={socialLinkStyle} 
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(13, 37, 71, 0.8)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy)'}
              >
                <img src={linkedinIcon} alt="LinkedIn" style={{width: '20px', height: '20px'}} />
              </a>
              <a 
                href="https://www.tiktok.com/@yoananincoaching" 
                style={socialLinkStyle} 
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(13, 37, 71, 0.8)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy)'}
              >
                <img src={tiktokIcon} alt="TikTok" style={{width: '20px', height: '20px'}} />
              </a>
            </div>
          </div>
          
          {/* Services Section */}
          <div>
            <h4 style={{ 
              color: 'var(--footer-text-primary)', 
              marginBottom: '1rem',
              fontSize: 'var(--font-size-lg)'
            }}>
              Services
            </h4>
            <Link to="/coaching" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Life Coaching</Link>
            <Link to="/coaching" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>ADHD Coaching</Link>
            <Link to="/coaching" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Entrepreneur Guidance</Link>
            <Link to="/real-estate" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Real Estate</Link>
            <Link to="/real-estate" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Relocation Services</Link>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h4 style={{ 
              color: 'var(--footer-text-primary)', 
              marginBottom: '1rem',
              fontSize: 'var(--font-size-lg)'
            }}>
              Quick Links
            </h4>
            <Link to="/my-story" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>My Story</Link>
            <Link to="/blog" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Insights & Inspiration</Link>
            <Link to="/contact" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact</Link>
            <Link to="/privacy" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Privacy Policy</Link>
            <Link to="/terms" style={linkStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Terms & Conditions</Link>
          </div>
          
          {/* Contact Section */}
          <div>
            <h4 style={{ 
              color: 'var(--footer-text-primary)', 
              marginBottom: '1rem',
              fontSize: 'var(--font-size-lg)'
            }}>
              Get In Touch
            </h4>
            <p style={{ color: 'var(--footer-text-secondary)', marginBottom: '0.5rem' }}>
              Serving Raleigh, Cary, Apex & relocators worldwide
            </p>
            <a 
              href="mailto:yoana@yoananin.com" 
              style={linkStyle}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-magenta)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
            >
              yoana@yoananin.com
            </a>
            <p style={{ color: 'var(--footer-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '0.5rem' }}>
              Licensed in North Carolina
            </p>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap' as const,
          gap: '1rem',
          color: 'var(--footer-text-secondary)',
          fontSize: 'var(--font-size-sm)'
        }}>
          <p style={{ margin: '0' }}>
            © {new Date().getFullYear()} Yoana. All rights reserved. 
          </p>
          <p style={{ margin: '0' }}>
            <a 
              href="https://scarletcodes.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'var(--footer-text-secondary)',
                textDecoration: 'none',
                fontSize: 'var(--font-size-xs)',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              Coded by Scarlet Codes LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;