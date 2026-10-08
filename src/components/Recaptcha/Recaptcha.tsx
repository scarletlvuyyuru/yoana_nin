import React, { useEffect, useRef, useState } from 'react';

/*
 * Google reCAPTCHA v2 checkbox for Netlify Forms rendered by React.
 *
 * Netlify can only inject its own reCAPTCHA into forms that exist in the
 * static HTML, and React re-renders the page on load anyway, so we render
 * the widget ourselves with our own keys. Netlify verifies the submitted
 * `g-recaptcha-response` using SITE_RECAPTCHA_SECRET.
 *
 * The site key comes from the SITE_RECAPTCHA_KEY build variable (see vite.config.ts).
 */
export const RECAPTCHA_SITE_KEY: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

type GreCaptcha = {
  render: (container: HTMLElement, params: Record<string, unknown>) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: GreCaptcha;
    __onRecaptchaLoad?: () => void;
  }
}

let loader: Promise<GreCaptcha> | null = null;

// Load Google's script once, only on pages that show a form.
function loadRecaptcha(): Promise<GreCaptcha> {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      window.__onRecaptchaLoad = () => (window.grecaptcha ? resolve(window.grecaptcha) : reject(new Error('reCAPTCHA unavailable')));
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        loader = null;
        reject(new Error('reCAPTCHA failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return loader;
}

const currentTheme = (): 'dark' | 'light' =>
  typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

/** Clears the checkbox (e.g. after a submission) so the next one gets a fresh token. */
export function resetRecaptcha(): void {
  try {
    window.grecaptcha?.reset();
  } catch {
    /* widget not rendered */
  }
}

/** Reads the token from a form; empty string when the box isn't ticked. */
export function getRecaptchaToken(formData: FormData): string {
  return formData.get('g-recaptcha-response')?.toString().trim() || '';
}

/** True when the form may be submitted (token present, or reCAPTCHA not configured). */
export function hasRecaptchaToken(formData: FormData): boolean {
  return !RECAPTCHA_SITE_KEY || !!getRecaptchaToken(formData);
}

interface RecaptchaProps {
  className?: string;
}

const Recaptcha: React.FC<RecaptchaProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [loadError, setLoadError] = useState(false);

  // Follow the site's light/dark toggle (set as data-theme on <html>).
  useEffect(() => {
    setTheme(currentTheme());
    const observer = new MutationObserver(() => setTheme(currentTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!RECAPTCHA_SITE_KEY || !container) return;

    let cancelled = false;
    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled) return;
        // Render into a fresh element each time (e.g. after a theme change).
        container.innerHTML = '';
        const target = document.createElement('div');
        container.appendChild(target);
        grecaptcha.render(target, { sitekey: RECAPTCHA_SITE_KEY, theme });
        setLoadError(false);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
      container.innerHTML = '';
    };
  }, [theme]);

  if (!RECAPTCHA_SITE_KEY) return null;

  return (
    <div className={className}>
      <div ref={containerRef} style={{ minHeight: 78 }} />
      {loadError && (
        <p role="alert" style={{ color: '#b11a1a', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
          The spam check could not load. Please check your connection or disable content blockers, then refresh the page.
        </p>
      )}
    </div>
  );
};

export default Recaptcha;
