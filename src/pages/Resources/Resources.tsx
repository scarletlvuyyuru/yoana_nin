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
      form.reset();
    } catch (error) {
      alert('There was an issue submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Resources | Yoana Nin"
        description="Book now and explore resources, tools, and next-step support options with Yoana Nin."
        url="https://yoananincoaching.com/resources"
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Get In Touch</p>
          <h1 className={styles.title}>Start Your Journey</h1>
          <p className={styles.subtitle}>
            I look forward to connecting with you and supporting your journey!
          </p>

          <div className={styles.formShell}>
            <h2 className={styles.formTitle}>Schedule your Free 30 Minute Consultation Now</h2>

            {showSuccess && (
              <p className={styles.successMessage}>~ Thank you we will talk soon!</p>
            )}

            <form
              name="resources-consultation"
              method="POST"
              data-netlify="true"
              data-netlify-recaptcha="true"
              data-netlify-honeypot="bot-field"
              className={styles.form}
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <input type="hidden" name="form-name" value="resources-consultation" />
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
