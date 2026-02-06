import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/yoana_nin_coaching_logo.webp';

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

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
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
                Yoana
              </h3>
            </div>
            <p style={{ color: 'var(--footer-text-secondary)', marginBottom: '1rem' }}>
              Spiritual Coach & Real Estate Professional helping women align their lives for joy, gratitude, and prosperity.
            </p>
          </div>
          
          <div>
            <h4 style={{ 
              color: 'var(--footer-text-primary)', 
              marginBottom: '1rem',
              fontSize: 'var(--font-size-lg)'
            }}>
              Services
            </h4>
            <Link to="/coaching" style={linkStyle}>Spiritual Coaching</Link>
            <Link to="/coaching" style={linkStyle}>ADHD Coaching</Link>
            <Link to="/real-estate" style={linkStyle}>Real Estate</Link>
            <Link to="/real-estate" style={linkStyle}>Relocation Services</Link>
          </div>
          
          <div>
            <h4 style={{ 
              color: 'var(--footer-text-primary)', 
              marginBottom: '1rem',
              fontSize: 'var(--font-size-lg)'
            }}>
              Resources
            </h4>
            <Link to="/blog" style={linkStyle}>Insights & Inspiration</Link>
            <Link to="/my-story" style={linkStyle}>My Story</Link>
            <a href="#faq" style={linkStyle}>FAQ</a>
            <Link to="/contact" style={linkStyle}>Contact</Link>
          </div>
          
          <div>
            <h4 style={{ 
              color: 'var(--footer-text-primary)', 
              marginBottom: '1rem',
              fontSize: 'var(--font-size-lg)'
            }}>
              Triangle Area
            </h4>
            <p style={{ color: 'var(--footer-text-secondary)', marginBottom: '0.5rem' }}>Serving Raleigh, Cary, Apex</p>
            <p style={{ color: 'var(--footer-text-secondary)', marginBottom: '1rem' }}>& relocators worldwide</p>
            <a 
              href="mailto:yoana@yoananin.com" 
              style={linkStyle}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-magenta)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
            >
              yoana@yoananin.com
            </a>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem',
          textAlign: 'center' as const,
          color: 'var(--footer-text-secondary)',
          fontSize: 'var(--font-size-sm)'
        }}>
          <p>© {new Date().getFullYear()} Yoana. All rights reserved. Built with accessibility and performance in mind.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;