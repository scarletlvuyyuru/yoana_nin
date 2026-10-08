// Shared helpers for the subscriber list (Google Sheet) and confirmation emails.
// Used by guide-signup, guide-confirm and submission-created.
const crypto = require('crypto');
const fetch = require('node-fetch');

const SITE_URL = process.env.URL || 'https://yoananincoaching.com';
const GUIDE_URL = `${SITE_URL}/downloads/adhd-sos-guide-yoana-nin.pdf`;
const CONFIRM_LINK_TTL_MS = 30 * 24 * 60 * 60 * 1000; // confirm links work for 30 days

// Tolerate common paste mistakes in Netlify settings: surrounding quotes,
// stray whitespace/newlines, and smart quotes around a display name.
const cleanAddress = (value) =>
  String(value || '')
    .replace(/[“”‘’]/g, '"')
    .trim()
    .replace(/^(['"])(.*)\1$/s, '$2')
    .replace(/\s+/g, ' ')
    .trim();

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const cleanSource = (source) => String(source || 'website').replace(/[^a-z0-9-]/gi, '').slice(0, 40) || 'website';

// ---------- Signed confirmation links (no database needed) ----------

const signLink = ({ email, name, source, expires, secret }) =>
  crypto.createHmac('sha256', secret).update(`${email}|${name}|${source}|${expires}`).digest('hex');

const buildConfirmUrl = ({ email, name, source, secret }) => {
  const expires = Date.now() + CONFIRM_LINK_TTL_MS;
  const params = new URLSearchParams({
    email,
    name,
    source,
    expires: String(expires),
    sig: signLink({ email, name, source, expires, secret }),
  });
  return `${SITE_URL}/.netlify/functions/guide-confirm?${params.toString()}`;
};

// Returns 'ok', 'invalid' or 'expired'.
const verifyConfirmLink = ({ email, name, source, expires, sig, secret }) => {
  if (!secret || !email || !expires || !/^[0-9a-f]{64}$/.test(sig)) return 'invalid';
  const expected = signLink({ email, name, source, expires, secret });
  if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return 'invalid';
  if (Date.now() > Number(expires)) return 'expired';
  return 'ok';
};

// ---------- Email (Resend) ----------

const getEmailSettings = () => ({
  apiKey: process.env.RESEND_API_KEY,
  linkSecret: process.env.GUIDE_LINK_SECRET,
  from: cleanAddress(
    process.env.GUIDE_EMAIL_FROM || process.env.ASSESSMENT_RESULTS_FROM || process.env.ASSESSMENT_RESULTS_FORM
  ),
  replyTo: cleanAddress(process.env.ASSESSMENT_REPLY_TO) || 'yoana@yoananin.com',
});

const missingEmailSettings = (settings) =>
  [
    ['RESEND_API_KEY', settings.apiKey],
    ['GUIDE_LINK_SECRET', settings.linkSecret],
    ['GUIDE_EMAIL_FROM/ASSESSMENT_RESULTS_FROM', settings.from],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

const sendEmail = async ({ settings, to, subject, html, text }) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${settings.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: settings.from, to, reply_to: settings.replyTo, subject, html, text }),
    timeout: 10000,
  });
  if (!response.ok) {
    throw new Error(
      `Resend error ${response.status} ${await response.text()} | from: ${JSON.stringify(settings.from)} | reply_to: ${JSON.stringify(settings.replyTo)}`
    );
  }
};

// Branded email shell shared by the confirmation emails.
const emailLayout = ({ heading, bodyHtml }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a2a42; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #004aad 0%, #b300b3 100%); color: #ffffff; padding: 24px; border-radius: 16px 16px 0 0;">
      <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase;">Yoana Nin Coaching</p>
      <h1 style="margin: 0; font-size: 26px;">${heading}</h1>
    </div>
    <div style="border: 1px solid #e7e5e2; border-top: none; padding: 28px 24px; border-radius: 0 0 16px 16px; background: #ffffff;">
      ${bodyHtml}
    </div>
  </div>
`;

const confirmButtonHtml = (confirmUrl) => `
      <p style="text-align: center; margin: 28px 0 12px;">
        <a href="${escapeHtml(confirmUrl)}" style="display: inline-block; background: #b300b3; color: #ffffff; text-decoration: none; font-weight: bold; padding: 14px 28px; border-radius: 999px;">Confirm Your Subscription</a>
      </p>
      <p style="text-align: center; margin: 0 0 28px; font-size: 18px; font-weight: bold; color: #b300b3;">It's good to have you!</p>`;

// Confirmation email for people who ticked "ongoing tips" on the quiz.
const sendNewsletterConfirmEmail = async ({ settings, email, name, source }) => {
  const confirmUrl = buildConfirmUrl({ email, name, source, secret: settings.linkSecret });
  const html = emailLayout({
    heading: 'Confirm your subscription',
    bodyHtml: `
      <p style="margin-top: 0;">Hi ${escapeHtml(name || 'there')},</p>
      <p>Thanks for asking to hear from me! You'll get practical ADHD tips, updates, and the occasional offer, made for women entrepreneurs and real estate agents.</p>
      <p>Click the button below to confirm your subscription and you'll be on your way.</p>
      ${confirmButtonHtml(confirmUrl)}
      <p style="margin-bottom: 0;">Warmly,<br>Yoana</p>
      <hr style="border: none; border-top: 1px solid #e7e5e2; margin: 24px 0 12px;">
      <p style="font-size: 12px; color: #6b7280; margin: 0;">You're receiving this because you asked for updates when you took the ADHD self-assessment at yoananincoaching.com. If that wasn't you, ignore this email; you won't be subscribed unless you confirm.</p>`,
  });
  const text = `Hi ${name || 'there'},

Thanks for asking to hear from me! You'll get practical ADHD tips, updates, and the occasional offer.

Click the link below to confirm your subscription and you'll be on your way:
${confirmUrl}

It's good to have you!

Warmly,
Yoana

You're receiving this because you asked for updates when you took the ADHD self-assessment at yoananincoaching.com. If that wasn't you, ignore this email; you won't be subscribed unless you confirm.`;

  await sendEmail({ settings, to: email, subject: 'Please confirm your subscription', html, text });
};

// ---------- Google Sheet (via the Apps Script web app) ----------

const addToGoogleSheet = async ({ email, name, source, status = 'Confirmed' }) => {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    throw new Error(`GOOGLE_SHEET_WEBHOOK_URL is not set; subscriber not saved: ${email}`);
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: (process.env.GOOGLE_SHEET_SECRET || '').trim(), email, name, source, status }),
    // Apps Script can take several seconds to cold-start; cap the wait.
    timeout: 20000,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(`Google Sheet webhook failed (${response.status}): ${data.error || 'unknown error'}`);
  }
  return data;
};

module.exports = {
  SITE_URL,
  GUIDE_URL,
  cleanAddress,
  escapeHtml,
  isValidEmail,
  cleanSource,
  buildConfirmUrl,
  verifyConfirmLink,
  getEmailSettings,
  missingEmailSettings,
  sendEmail,
  emailLayout,
  confirmButtonHtml,
  sendNewsletterConfirmEmail,
  addToGoogleSheet,
};
