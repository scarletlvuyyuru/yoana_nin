import React, { useState } from 'react';
import SEO from '../../components/SEO/SEO';
import styles from './Resources.module.css';

const Resources: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formLoadTime] = useState(Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const sanitizeInput = (input: string): string =>
      input
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .substring(0, 500);

    const requiredFields = ['name', 'email', 'phone'];
    const missingFields = requiredFields.filter((field) => {
      const value = formData.get(field)?.toString() || '';
      return !value.trim();
    });

    if (missingFields.length > 0) {
      alert('Please complete all required fields before submitting.');
      setIsSubmitting(false);
      return;
    }

    const email = formData.get('email')?.toString() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    const phone = formData.get('phone')?.toString().trim() || '';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Please enter a valid phone number.');
      setIsSubmitting(false);
      return;
    }

    const recaptchaToken = formData.get('g-recaptcha-response')?.toString().trim() || '';
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA check before submitting.');
      setIsSubmitting(false);
      return;
    }

    const sanitizedFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      sanitizedFormData.append(
        key,
        value instanceof File ? value : sanitizeInput(value.toString())
      );
    }

    if (sanitizedFormData.get('bot-field')) {
      setIsSubmitting(false);
      return;
    }

    const submitTime = Date.now();
    const timestampValue = sanitizedFormData.get('form-timestamp');
    const timestamp = timestampValue ? parseInt(timestampValue.toString(), 10) : 0;
    const fillTime = submitTime - timestamp;

    if (!timestamp || fillTime < 4000) {
      setIsSubmitting(false);
      return;
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

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setShowSuccess(true);
      window.setTimeout(() => {
        window.location.assign('/');
      }, 3000);
      form.reset();
    } catch (error) {
      const isLocalhost =
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      alert(
        isLocalhost
          ? 'This form posts to Netlify Forms and will not submit from localhost. Please test on your Netlify deploy (or run with netlify dev).'
          : 'There was an issue submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Book a Free Consultation | Yoana Nin ADHD Coaching"
        description="Schedule your free 30-minute consultation with Yoana Nin — certified ADHD life coach for women entrepreneurs. Start building a system that works for your brain."
        url="https://yoananincoaching.com/resources"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://yoananincoaching.com/resources",
          "url": "https://yoananincoaching.com/resources",
          "name": "Book a Free Consultation — Yoana Nin ADHD Coaching",
          "description": "Schedule a free 30-minute consultation with Yoana Nin, certified ADHD life coach for women entrepreneurs.",
          "inLanguage": "en-US",
          "isPartOf": { "@id": "https://yoananincoaching.com/#website" },
          "mainEntity": {
            "@type": "Service",
            "name": "Free 30-Minute Consultation",
            "provider": {
              "@type": "Person",
              "name": "Yoana Nin",
              "@id": "https://yoananincoaching.com/#person"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Free 30-minute discovery call with Yoana Nin"
            }
          }
        })}
      />

      <section className={styles.hero}>
        {showSuccess && (
          <div className={styles.successOverlay} role="status" aria-live="polite">
            <div className={styles.successOverlayCard}>
              <h2 className={styles.successOverlayTitle}>Thank you, we will talk soon!</h2>
              <p className={styles.successOverlayText}>Redirecting you to the home page...</p>
            </div>
          </div>
        )}

        <div className={styles.container}>
          <p className={styles.eyebrow}>Get In Touch</p>
          <h1 className={styles.title}>Start Your Journey</h1>
          <p className={styles.subtitle}>
            I look forward to connecting with you and supporting your journey!
          </p>

          <div className={styles.formShell}>
            <h2 className={styles.formTitle}>Schedule your Free 30 Minute Consultation Now</h2>

            <form
              name="book-now-contact"
              method="POST"
              data-netlify="true"
              data-netlify-recaptcha="true"
              data-netlify-honeypot="bot-field"
              className={styles.form}
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <input type="hidden" name="form-name" value="book-now-contact" />
              <input type="hidden" name="subject" value="New Resources Consultation Request" />
              <input type="hidden" name="form-timestamp" value={formLoadTime.toString()} />

              <div className={styles.honeypotField}>
                <label htmlFor="bot-field">Do not fill this out if you are human</label>
                <input type="text" name="bot-field" id="bot-field" tabIndex={-1} autoComplete="off" />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input id="name" name="name" type="text" required className={styles.input} autoComplete="name" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={styles.input}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input id="email" name="email" type="email" required className={styles.input} autoComplete="email" />
              </div>

              <div data-netlify-recaptcha="true"></div>

              <p className={styles.captchaNote}>
                This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
              </p>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
