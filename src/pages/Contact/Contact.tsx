import React, { useState } from 'react';
import styles from './Contact.module.css';

// Import all icons for proper Vite build handling
import masterMindsetIcon from '../../assets/images/masterMindset.webp';
import sanctuaryIcon from '../../assets/images/Sanctuary.webp';
import speakingArrangementsIcon from '../../assets/images/SpeakingArrangementsBanner.webp';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    inquiry: '',
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        {/* Main Title */}
        <div className={styles.mainTitle}>
          <p className="taglineDark">Ready to Begin Your Journey?</p>
          <h1 className={styles.title}>Connect with Yoana</h1>
          <p className={styles.description}>
            Whether you're rebuilding confidence through coaching, finding your dream home in the Triangle, or exploring speaking opportunities—let's start with a simple conversation.
          </p>
        </div>

        {/* Split Content Layout */}
        <div className={styles.splitLayout}>
          {/* Left Side - How Can I Support You */}
          <div className={styles.leftContent}>
            {/* Journey Section */}
            <div className={styles.journeySection}>
              <p className="taglineDark">Let me help guide the way</p>
              <h2 className={styles.servicesTitle}>Let's Get Started</h2>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.cardImageContainer}>
                    <img 
                      src={masterMindsetIcon} 
                      alt="Coaching & Community" 
                      className={styles.cardImage}
                    />
                  </div>
                 
                  <h3 className={styles.infoTitle}>Coaching & Community</h3>
                  <p className={styles.infoDescription}>
                    Specialized support for ADHD entrepreneurs, expats, and those ready to create clarity in life's biggest transitions.
                  </p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.cardImageContainer}>
                    <img 
                      src={sanctuaryIcon} 
                      alt="Real Estate Services" 
                      className={styles.cardImage}
                    />
                  </div>
                
                  <h3 className={styles.infoTitle}>Real Estate Services</h3>
                  <p className={styles.infoDescription}>
                    Find your sanctuary in the Raleigh Triangle—home buying, selling, and relocation support that considers your whole life, not just the transaction.
                  </p>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.cardImageContainer}>
                    <img 
                      src={speakingArrangementsIcon} 
                      alt="Speaking & Media" 
                      className={styles.cardImage}
                    />
                  </div>
                 
                  <h3 className={styles.infoTitle}>Speaking & Media</h3>
                  <p className={styles.infoDescription}>
                    Engaging presentations on entrepreneurship, spiritual wellness, and building resilience through life's major transitions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={styles.rightContent}>
            <div className={styles.formSection}>
              <p className="taglineDark">Your information is private and secure</p>
              <h2 className={styles.formTitle}>Let's Connect</h2>
              
          <form 
            name="contact"
            method="POST"
            data-netlify="true"
            className={styles.contactForm}
            action="/contact-success"
          >
            {/* Netlify form detection */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="subject" value="New Contact Form Submission - Yoana Nin" />
            
            {/* Honeypot field for spam protection */}
            <div className={styles.honeypot}>
              <label htmlFor="bot-field">Don't fill this out if you're human:</label>
              <input type="text" name="bot-field" id="bot-field" tabIndex={-1} autoComplete="off" />
            </div>
            
            {/* Inquiry Type Dropdown */}
            <div className={styles.formGroup}>
              <label htmlFor="inquiry" className={styles.label}>
                What can I help you with? <span className={styles.required}>*</span>
              </label>
              <select
                id="inquiry"
                name="inquiry"
                value={formData.inquiry}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Please select an option</option>
                <option value="Looking for a Coach (Entrepreneur/Expat/ADHD)">Looking for a Coach (Entrepreneur/Expat/ADHD)</option>
                <option value="Looking for a Home (Real Estate)">Looking for a Home (Real Estate)</option>
                <option value="Media/Speaking Inquiry">Media/Speaking Inquiry</option>
                <option value="Submit a question">Submit a Question</option>
              </select>
            </div>

            {/* Full Name */}
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Full Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone Number */}
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Message */}
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Tell me more about your goals and how I can help
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={styles.textarea}
                placeholder="Share details about what you're looking for..."
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>

            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <p className={styles.infoText}>
                Or reach out directly at: 
                <a href="mailto:yoana@yoananin.com" className={styles.emailLink}>
                  yoana@yoananin.com
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Contact;