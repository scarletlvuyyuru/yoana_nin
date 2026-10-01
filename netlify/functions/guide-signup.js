const crypto = require('crypto');
const fetch = require('node-fetch');

const RESEND_API_URL = 'https://api.resend.com/emails';
const SITE_URL = process.env.URL || 'https://yoananincoaching.com';
const LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000; // confirm links work for 7 days

// Signed link: guide-confirm recomputes the signature, so no database is needed.
const signLink = ({ email, name, expires, secret }) =>
  crypto.createHmac('sha256', secret).update(`${email}|${name}|${expires}`).digest('hex');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildEmailHtml = ({ name, confirmUrl }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a2a42; max-width: 640px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #004aad 0%, #b300b3 100%); color: #ffffff; padding: 24px; border-radius: 16px 16px 0 0;">
      <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase;">Yoana Nin Coaching</p>
      <h1 style="margin: 0; font-size: 28px;">Your Free ADHD SOS Guide</h1>
    </div>
    <div style="border: 1px solid #e7e5e2; border-top: none; padding: 24px; border-radius: 0 0 16px 16px; background: #ffffff;">
      <p style="margin-top: 0;">Hi ${escapeHtml(name)},</p>
      <p>Thanks for requesting the ADHD SOS Guide! Please confirm your subscription and your guide will download right away.</p>
      <p style="text-align: center; margin: 28px 0;">
        <a href="${confirmUrl}" style="display: inline-block; background: #b300b3; color: #ffffff; text-decoration: none; font-weight: bold; padding: 14px 28px; border-radius: 999px;">Confirm Subscription</a>
      </p>
      <p style="font-size: 13px; color: #4b5563;">This link works for 7 days. If the button doesn't work, copy this link into your browser:<br><a href="${confirmUrl}" style="color: #004aad; word-break: break-all;">${confirmUrl}</a></p>
      <p style="font-size: 13px; color: #4b5563; margin-bottom: 0;">Didn't request this? You can safely ignore this email.</p>
    </div>
  </div>
`;

const buildEmailText = ({ name, confirmUrl }) => `Hi ${name},

Thanks for requesting the ADHD SOS Guide! Confirm your subscription and your guide will download right away:

${confirmUrl}

This link works for 7 days. Didn't request this? You can safely ignore this email.

Yoana Nin Coaching`;

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
      console.error('guide-signup: missing RESEND_API_KEY, GUIDE_LINK_SECRET or sender address');
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email is not configured yet.' }) };
    }

    const payload = JSON.parse(event.body || '{}');
    const name = String(payload.name || '').trim().slice(0, 100);
    const email = String(payload.email || '').trim().toLowerCase().slice(0, 250);

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please enter a valid name and email.' }) };
    }

    const expires = Date.now() + LINK_TTL_MS;
    const params = new URLSearchParams({
      email,
      name,
      expires: String(expires),
      sig: signLink({ email, name, expires, secret }),
    });
    const confirmUrl = `${SITE_URL}/.netlify/functions/guide-confirm?${params.toString()}`;

    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: email,
        reply_to: replyTo,
        subject: 'Confirm your subscription to get your free ADHD SOS Guide',
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
