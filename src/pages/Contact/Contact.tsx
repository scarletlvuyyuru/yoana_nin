import React, { useState } from 'react';
import styles from './Contact.module.css';

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
          <h1 className={styles.title}>Connect with Yoana</h1>
        </div>

        {/* Split Content Layout */}
        <div className={styles.splitLayout}>
          {/* Left Side - How Can I Support You */}
          <div className={styles.leftContent}>
            <div className={styles.supportSection}>
              <h2 className={styles.subtitle}>How Can I Support You?</h2>
              <p className={styles.description}>
                Ready to take the next step in your journey? Whether you're looking to unlock your potential through personalized coaching, find your dream home in the Triangle, build meaningful connections, or explore speaking opportunities—I'm here to guide you.
              </p>
              <div className={styles.heroHighlight}>
                <span className={styles.highlightText}>✨ Your transformation starts with a simple conversation</span>
              </div>
            </div>

            {/* Why Work With Me */}
            <div className={styles.whySection}>
              <h2 className={styles.whyTitle}>Why Work With Me?</h2>
              <div className={styles.benefitsList}>
                <div className={styles.benefit}>
                  <div className={styles.benefitIcon}>
                    <img 
                      src="/src/assets/images/Personalized_Approach.webp" 
                      alt="Personalized Approach" 
                      className={styles.benefitIconImage}
                    />
                  </div>
                  <div className={styles.benefitContent}>
                    <h3 className={styles.benefitTitle}>Personalized Approach</h3>
                    <p className={styles.benefitText}>Every strategy is tailored to your unique goals and circumstances.</p>
                  </div>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.benefitIcon}>
                    <img 
                      src="/src/assets/images/Proven_Results.webp" 
                      alt="Proven Results" 
                      className={styles.benefitIconImage}
                    />
                  </div>
                  <div className={styles.benefitContent}>
                    <h3 className={styles.benefitTitle}>Proven Results</h3>
                    <p className={styles.benefitText}>Experience the transformation that comes from dedicated guidance and support.</p>
                  </div>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.benefitIcon}>
                    <img 
                      src="/src/assets/images/Holistic_Support.webp" 
                      alt="Holistic Support" 
                      className={styles.benefitIconImage}
                    />
                  </div>
                  <div className={styles.benefitContent}>
                    <h3 className={styles.benefitTitle}>Holistic Support</h3>
                    <p className={styles.benefitText}>Addressing your whole life—not just isolated pieces.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className={styles.rightContent}>
            <div className={styles.formSection}>
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
                <option value="Looking for a Community">Looking to build your Village (Community)</option>
                <option value="Media/Speaking Inquiry">Media/Speaking Inquiry</option>
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

        {/* Additional Info */}
        <div className={styles.additionalInfo}>
          <h2 className={styles.servicesTitle}>Ways I Can Help You Thrive</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.cardImageContainer}>
                <img 
                  src="/src/assets/images/masterMindset.webp" 
                  alt="Coaching & Mentorship" 
                  className={styles.cardImage}
                />
              </div>
             
              <h3 className={styles.infoTitle}>Coaching & Mentorship</h3>
              <p className={styles.infoDescription}>
                Specialized support for ADHD entrepreneurs, expats, and those seeking personal transformation through proven frameworks and personalized guidance.
              </p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.cardImageContainer}>
                <img 
                  src="/src/assets/images/Sanctuary.webp" 
                  alt="Real Estate Services" 
                  className={styles.cardImage}
                />
              </div>
            
              <h3 className={styles.infoTitle}>Real Estate Services</h3>
              <p className={styles.infoDescription}>
                Triangle area home buying, selling, and relocation support with a holistic approach that considers your lifestyle and long-term goals.
              </p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.cardImageContainer}>
                <img 
                  src="/src/assets/images/buildYourCommuntiy.webp" 
                  alt="Community" 
                  className={styles.cardImage}
                />
              </div>
             
              <h3 className={styles.infoTitle}>Community</h3>
              <p className={styles.infoDescription}>
                Join a supportive network of like-minded individuals focused on growth, wellness, and creating meaningful connections in the Triangle area.
              </p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.cardImageContainer}>
                <img 
                  src="/src/assets/images/SpeakingArrangementsBanner.webp" 
                  alt="Speaking & Media" 
                  className={styles.cardImage}
                />
              </div>
           
              <h3 className={styles.infoTitle}>Speaking & Media</h3>
              <p className={styles.infoDescription}>
                Engaging presentations on entrepreneurship, spiritual wellness, the expat experience, and building resilience in life's major transitions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;