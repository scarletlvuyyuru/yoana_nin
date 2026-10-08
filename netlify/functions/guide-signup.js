const crypto = require('crypto');
const fetch = require('node-fetch');

const RESEND_API_URL = 'https://api.resend.com/emails';
const SITE_URL = process.env.URL || 'https://yoananincoaching.com';
const GUIDE_URL = `${SITE_URL}/downloads/adhd-sos-guide-yoana-nin.pdf`;
const LINK_TTL_MS = 30 * 24 * 60 * 60 * 1000; // confirm links work for 30 days

// Signed link: guide-confirm recomputes the signature, so no database is needed.
// Must match signLink in guide-confirm.js.
const signLink = ({ email, name, source, expires, secret }) =>
  crypto.createHmac('sha256', secret).update(`${email}|${name}|${source}|${expires}`).digest('hex');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildEmailHtml = ({ name, confirmUrl }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a2a42; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #004aad 0%, #b300b3 100%); color: #ffffff; padding: 24px; border-radius: 16px 16px 0 0;">
      <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase;">Yoana Nin Coaching</p>
      <h1 style="margin: 0; font-size: 26px;">Your Free ADHD SOS Guide</h1>
    </div>
    <div style="border: 1px solid #e7e5e2; border-top: none; padding: 28px 24px; border-radius: 0 0 16px 16px; background: #ffffff;">
      <p style="margin-top: 0;">Hi ${escapeHtml(name)},</p>
      <p>Thanks for signing up! Here is your download:</p>
      <p style="margin: 0 0 24px;">
        &rarr; <a href="${GUIDE_URL}" style="color: #004aad; font-weight: bold;">Download the ADHD SOS Guide (PDF)</a>
      </p>
      <p>Click the button below to confirm your subscription and you'll be on your way.</p>
      <p style="text-align: center; margin: 28px 0 12px;">
        <a href="${confirmUrl}" style="display: inline-block; background: #b300b3; color: #ffffff; text-decoration: none; font-weight: bold; padding: 14px 28px; border-radius: 999px;">Confirm Your Subscription</a>
      </p>
      <p style="text-align: center; margin: 0 0 28px; font-size: 18px; font-weight: bold; color: #b300b3;">It's good to have you!</p>
      <p style="margin-bottom: 0;">Warmly,<br>Yoana</p>
      <hr style="border: none; border-top: 1px solid #e7e5e2; margin: 24px 0 12px;">
      <p style="font-size: 12px; color: #6b7280; margin: 0;">You're receiving this because you requested the ADHD SOS Guide at yoananincoaching.com. If that wasn't you, you can ignore this email; you won't be subscribed unless you confirm.</p>
    </div>
  </div>
`;

const buildEmailText = ({ name, confirmUrl }) => `Hi ${name},

Thanks for signing up! Here is your download:
${GUIDE_URL}

Click the link below to confirm your subscription and you'll be on your way:
${confirmUrl}

It's good to have you!

Warmly,
Yoana

You're receiving this because you requested the ADHD SOS Guide at yoananincoaching.com. If that wasn't you, you can ignore this email; you won't be subscribed unless you confirm.`;

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const secret = process.env.GUIDE_LINK_SECRET;
    const from =
      process.env.GUIDE_EMAIL_FROM ||
      process.env.ASSESSMENT_RESULTS_FROM ||
      process.env.ASSESSMENT_RESULTS_FORM;
    const replyTo = process.env.ASSESSMENT_REPLY_TO || 'yoana@yoananin.com';

    if (!apiKey || !secret || !from) {
      console.error(
        'guide-signup: missing settings —',
        ['RESEND_API_KEY', 'GUIDE_LINK_SECRET', 'GUIDE_EMAIL_FROM/ASSESSMENT_RESULTS_FROM']
          .filter((_, i) => ![apiKey, secret, from][i])
          .join(', ')
      );
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email is not configured yet.' }) };
    }

    const payload = JSON.parse(event.body || '{}');
    const name = String(payload.name || '').trim().slice(0, 100);
    const email = String(payload.email || '').trim().toLowerCase().slice(0, 250);
    const source = String(payload.source || 'website').replace(/[^a-z0-9-]/gi, '').slice(0, 40) || 'website';

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please enter a valid name and email.' }) };
    }

    const expires = Date.now() + LINK_TTL_MS;
    const params = new URLSearchParams({
      email,
      name,
      source,
      expires: String(expires),
      sig: signLink({ email, name, source, expires, secret }),
    });
    const confirmUrl = `${SITE_URL}/.netlify/functions/guide-confirm?${params.toString()}`;

    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: email,
        reply_to: replyTo,
        subject: 'Your ADHD SOS Guide is here!',
        html: buildEmailHtml({ name, confirmUrl: escapeHtml(confirmUrl) }),
        text: buildEmailText({ name, confirmUrl }),
      }),
    });

    if (!response.ok) {
      console.error('guide-signup: Resend error', response.status, await response.text());
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'We could not send the email. Please try again.' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error('guide-signup:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Unexpected error. Please try again.' }) };
  }
};
