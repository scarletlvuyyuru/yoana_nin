import React, { useState } from 'react';
import styles from './LeadMagnetForm.module.css';

type LeadMagnetVariant = 'modal' | 'banner' | 'page';

interface LeadMagnetFormProps {
  variant: LeadMagnetVariant;
  source: string;
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

const FORM_NAME = 'free-guide-download';

const encodeForm = (data: Record<string, string>) =>
  new URLSearchParams(data).toString();

const sanitizeInput = (input: string): string =>
  input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, 250);

const LeadMagnetForm: React.FC<LeadMagnetFormProps> = ({
  variant,
  source,
  title = 'Free ADHD SOS Guide',
  subtitle = "Enter your name and email and we'll send the guide straight to your inbox.",
  showCloseButton = false,
  onClose,
  onSuccess,
}) => {
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formLoadTime] = useState(() => Date.now());

  const isModal = variant === 'modal';
  const shellClass = [
    styles.formShell,
    variant === 'banner' ? styles.bannerShell : '',
    variant === 'page' ? styles.pageShell : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleSuccess = () => {
    setIsSubmitted(true);
    setError('');

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('leadMagnetSubmitted', '1');
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (botField.trim().length > 0) {
      return;
    }

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanName || !cleanEmail) {
      setError('Please enter your name and email.');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    const elapsed = Date.now() - formLoadTime;
    if (elapsed < 2500) {
      setError('Please take a moment and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({
          'form-name': FORM_NAME,
          name: cleanName,
          email: cleanEmail,
          source,
          'bot-field': '',
          'form-timestamp': formLoadTime.toString(),
          subject: 'New Free Guide Signup',
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed. Please try again.');
      }

      // Send the "Confirm subscription" email; its button downloads the guide.
      const emailResponse = await fetch('/.netlify/functions/guide-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, source }),
      });

      if (!emailResponse.ok) {
        const data = await emailResponse.json().catch(() => ({}));
        throw new Error(data.error || 'We could not send your email. Please try again.');
      }

      setSubmittedEmail(cleanEmail);
      handleSuccess();
    } catch (submitError) {
      const isLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

      setError(
        isLocalhost
          ? 'This form posts to Netlify Forms. Test submissions on your Netlify deploy or with netlify dev.'
          : submitError instanceof Error
            ? submitError.message
            : 'Submission failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formMarkup = (
    <div className={shellClass}>
      {showCloseButton && onClose && (
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close popup"
          onClick={onClose}
        >
          x
        </button>
      )}

      <p className={styles.eyebrow}>FREE DOWNLOAD</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>

      {isSubmitted ? (
        <div className={styles.successCard} role="status" aria-live="polite">
          <p className={styles.successTitle}>Check your inbox!</p>
          <p className={styles.successHint}>
            Your guide is on its way to <strong>{submittedEmail}</strong>. Open the email to download it, and
            click <strong>Confirm Your Subscription</strong> so we can stay in touch.
          </p>
          <p className={styles.successHint}>
            Don't see it in a few minutes? Check your spam or promotions folder.
          </p>
          {isModal && onClose && (
            <button type="button" className={styles.downloadButton} onClick={onClose}>
              Got It
            </button>
          )}
        </div>
      ) : (
        <form
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <input type="hidden" name="form-name" value={FORM_NAME} />
          <input type="hidden" name="source" value={source} />
          <input type="hidden" name="form-timestamp" value={formLoadTime.toString()} />

          <div className={styles.honeypotField}>
            <label htmlFor={`${source}-bot-field`}>Leave this field empty</label>
            <input
              id={`${source}-bot-field`}
              type="text"
              name="bot-field"
              value={botField}
              onChange={(event) => setBotField(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className={styles.inlineRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor={`${source}-name`} className={styles.label}>Name</label>
              <input
                id={`${source}-name`}
                name="name"
                type="text"
                className={styles.input}
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor={`${source}-email`} className={styles.label}>Email</label>
              <input
                id={`${source}-email`}
                name="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get My Free Guide'}
            </button>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <p className={styles.policyText}>
            We respect your inbox. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );

  if (!isModal) {
    return formMarkup;
  }

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Free guide signup">
      <div className={styles.modalInner}>{formMarkup}</div>
    </div>
  );
};

export default LeadMagnetForm;
