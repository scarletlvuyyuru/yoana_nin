import React, { useState, useEffect } from 'react';
import styles from './Contact.module.css';
import SEO from '../../components/SEO/SEO';

// Import all icons for proper Vite build handling
import masterMindsetIcon from '../../assets/images/masterMindset.webp';
import sanctuaryIcon from '../../assets/images/Sanctuary.webp';
import speakingArrangementsIcon from '../../assets/images/SpeakingArrangementsBanner.webp';

const Contact: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formLoadTime] = useState(Date.now()); // Track when form loads

  // Auto-dismiss success message after 8 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Security: sanitize string inputs
    const sanitizeInput = (input: string): string =>
      input
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .substring(0, 1000);

    // Required fields
    const requiredFields = ['fullName', 'email', 'inquiry', 'message'];
    const missingFields = requiredFields.filter(field => {
      const value = formData.get(field)?.toString() || '';
      return !value.trim();
    });

    if (missingFields.length > 0) {
      alert('Please fill in all required fields before submitting.');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const email = formData.get('email')?.toString() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Sanitize all form data
    const sanitizedFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      sanitizedFormData.append(
        key,
        value instanceof File ? value : sanitizeInput(value.toString())
      );
    }

    // Bot protection: honeypot
    if (sanitizedFormData.get('bot-field')) {
      setIsSubmitting(false);
      return; // silently fail
    }

    // Step B: timestamp check
    const submitTime = Date.now();
    const timestampValue = sanitizedFormData.get('form-timestamp');
    const timestamp = timestampValue ? parseInt(timestampValue.toString()) : 0;
    const fillTime = submitTime - timestamp;

    if (!timestamp || fillTime < 5000) {
      setIsSubmitting(false);
      return; // probably a bot
    }

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          Array.from(sanitizedFormData.entries()).map(([key, value]) => [
            key,
            value.toString(),
          ])
        ).toString(),
      });

      if (response.ok) {
        setShowSuccess(true);
        form.reset();
        setTimeout(() => {
          document
            .getElementById('contact-success')
            ?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert(
        'There was an error submitting your message. Please try again or email directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <SEO 
        title="Contact Yoana Nin | Start Your Transformation"
        description="Ready to begin your journey? Get in touch for ADHD coaching, real estate services, or speaking engagements in the Raleigh Triangle area."
        url="https://yoananincoaching.com/contact"
      />
      <div className={styles.container}>
        {/* Main Title */}
        <div className={styles.mainTitle}>
          <p className="taglineDark">Ready to Begin Your Journey?</p>
          <h1 className={styles.title}>Connect with Yoana</h1>
          <p className={styles.description}>
            Whether you're rebuilding confidence through coaching, finding your dream home in the Triangle, or exploring speaking opportunities—let's start with a simple conversation.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div id="contact-success" className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h2>Thank You!</h2>
            <p>Your message has been successfully sent. I'll get back to you within 24-48 hours.</p>
            <p>Looking forward to connecting with you!</p>
            <button
              onClick={() => setShowSuccess(false)}
              className={styles.dismissButton}
            >
              Continue Browsing
            </button>
          </div>
        )}

        {/* Split Content Layout */}
        <div className={styles.splitLayout}>
          {/* Left Side */}
          <div className={styles.leftContent}>
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
                data-netlify-recaptcha="true"
                data-netlify-honeypot="bot-field"
                className={styles.contactForm}
                onSubmit={handleSubmit}
                autoComplete="on"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="subject" value="New Contact Form Submission - Yoana Nin" />
                <input type="hidden" name="form-timestamp" value={formLoadTime.toString()} />

                {/* Honeypot */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                  <label htmlFor="bot-field">Don't fill this out if you're human:</label>
                  <input type="text" name="bot-field" id="bot-field" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Inquiry */}
                <div className={styles.formGroup}>
                  <label htmlFor="inquiry" className={styles.label}>
                    What can I help you with? <span className={styles.required}>*</span>
                  </label>
                  <select id="inquiry" name="inquiry" required className={styles.select}>
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
                  <input type="text" id="fullName" name="fullName" required className={styles.input} placeholder="Your full name" autoComplete="name" />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input type="email" id="email" name="email" required className={styles.input} placeholder="your.email@example.com" autoComplete="email" />
                </div>

                {/* Optional Phone */}
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <input type="tel" id="phone" name="phone" className={styles.input} placeholder="(555) 123-4567" autoComplete="tel" />
                </div>

                {/* Message */}
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Tell me more about your goals and how I can help</label>
                  <textarea id="message" name="message" rows={5} className={styles.textarea} placeholder="Share details about what you're looking for..." maxLength={1000} />
                </div>

                {/* reCAPTCHA */}
                <div data-netlify-recaptcha="true"></div>

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <div className={styles.contactInfo}>
                  <p className={styles.infoText}>
                    Or reach out directly at:
                    <a href="mailto:yoana@yoananin.com" className={styles.emailLink}>yoana@yoananin.com</a>
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