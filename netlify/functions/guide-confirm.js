const fetch = require('node-fetch');
const { SITE_URL, GUIDE_URL, escapeHtml, verifyConfirmLink, addToGoogleSheet } = require('../lib/subscribers');

// Handles the "Confirm Your Subscription" button from both the guide email
// and the quiz "ongoing tips" email; adds the person to the Google Sheet.

const page = (statusCode, title, bodyHtml) => ({
  statusCode,
  headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  body: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} | Yoana Nin Coaching</title></head>
<body style="margin:0;background:#faf9f6;font-family:Arial,sans-serif;color:#1a2a42;line-height:1.6">
<div style="max-width:560px;margin:48px auto;padding:0 20px">
<div style="background:linear-gradient(135deg,#004aad 0%,#b300b3 100%);color:#fff;padding:24px;border-radius:16px 16px 0 0">
<p style="margin:0 0 6px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase">Yoana Nin Coaching</p>
<h1 style="margin:0;font-size:26px">${title}</h1></div>
<div style="background:#fff;border:1px solid #e7e5e2;border-top:none;padding:24px;border-radius:0 0 16px 16px">${bodyHtml}</div>
</div></body></html>`,
});

const button = (href, label, primary) =>
  `<a href="${href}" style="display:inline-block;margin:6px 6px 6px 0;padding:12px 22px;border-radius:999px;font-weight:bold;text-decoration:none;${
    primary ? 'background:#b300b3;color:#fff' : 'background:#eef2ff;color:#004aad'
  }">${label}</a>`;

// Optional: also add the subscriber to a Resend Audience (set RESEND_AUDIENCE_ID).
const addToResendAudience = async ({ email, name }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) return;
  const [firstName, ...rest] = name.split(/\s+/);
  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, first_name: firstName, last_name: rest.join(' '), unsubscribed: false }),
    timeout: 8000,
  });
  if (!response.ok) {
    throw new Error(`Resend audience add failed (${response.status}): ${await response.text()}`);
  }
};

exports.handler = async (event) => {
  const { email = '', name = '', source = '', expires = '', sig = '' } = event.queryStringParameters || {};
  const result = verifyConfirmLink({ email, name, source, expires, sig, secret: process.env.GUIDE_LINK_SECRET });

  if (result === 'invalid') {
    return page(
      400,
      'This link is not valid',
      `<p>Please use the newest email we sent you, or sign up again.</p>${button(`${SITE_URL}/free-adhd-guide`, 'Get the free guide', true)}`
    );
  }
  if (result === 'expired') {
    return page(
      400,
      'This link has expired',
      `<p>Confirmation links work for 30 days. Sign up again and we'll send you a fresh link.</p>${button(`${SITE_URL}/free-adhd-guide`, 'Get the free guide', true)}`
    );
  }

  // Never block the confirmation page on list sync; failures are logged for follow-up.
  const results = await Promise.allSettled([
    addToGoogleSheet({ email, name, source, status: 'Confirmed' }),
    addToResendAudience({ email, name }),
  ]);
  results.forEach((r) => {
    if (r.status === 'rejected') console.error('guide-confirm:', r.reason && r.reason.message ? r.reason.message : r.reason);
  });

  const firstName = escapeHtml(name.split(/\s+/)[0] || 'friend');
  const fromQuiz = source.startsWith('quiz');
  return page(
    200,
    "You're subscribed!",
    `<p style="margin-top:0">Thank you, ${firstName}! Your subscription is confirmed. It's good to have you!</p>
${fromQuiz ? '<p>As a thank-you, here is Yoana\'s free ADHD SOS Guide:</p>' : '<p>Your guide is ready whenever you are:</p>'}
${button(GUIDE_URL, 'Download the ADHD SOS Guide', true)}
<p style="margin-top:22px">Want help putting it into practice? Book a free discovery call with Yoana.</p>
${button(`${SITE_URL}/resources`, 'Book a free call', false)}${button(SITE_URL, 'Visit the website', false)}`
  );
};
