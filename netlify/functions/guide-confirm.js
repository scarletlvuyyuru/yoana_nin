const crypto = require('crypto');
const fetch = require('node-fetch');

const GUIDE_PATH = '/downloads/adhd-sos-guide-yoana-nin.pdf';

// Must match signLink in guide-signup.js.
const signLink = ({ email, name, expires, secret }) =>
  crypto.createHmac('sha256', secret).update(`${email}|${name}|${expires}`).digest('hex');

const page = (title, message) => ({
  statusCode: 400,
  headers: { 'Content-Type': 'text/html; charset=utf-8' },
  body: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>
<body style="font-family:Arial,sans-serif;max-width:560px;margin:60px auto;padding:0 20px;color:#1a2a42;line-height:1.6">
<h1 style="color:#b300b3">${title}</h1><p>${message}</p>
<p><a href="/free-adhd-guide" style="color:#004aad;font-weight:bold">Request a new link</a></p></body></html>`,
});

// Optional: add the confirmed subscriber to a Resend Audience (set RESEND_AUDIENCE_ID).
const addToAudience = async ({ apiKey, audienceId, email, name }) => {
  const [firstName, ...rest] = name.split(/\s+/);
  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, first_name: firstName, last_name: rest.join(' '), unsubscribed: false }),
  });
  if (!response.ok) {
    console.error('guide-confirm: audience add failed', response.status, await response.text());
  }
};

exports.handler = async (event) => {
  const secret = process.env.GUIDE_LINK_SECRET;
  const { email = '', name = '', expires = '', sig = '' } = event.queryStringParameters || {};

  if (!secret || !email || !expires || !/^[0-9a-f]{64}$/.test(sig)) {
    return page('This link is not valid', 'Please request your guide again and use the newest email we send you.');
  }

  const expected = signLink({ email, name, expires, secret });
  if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) {
    return page('This link is not valid', 'Please request your guide again and use the newest email we send you.');
  }

  if (Date.now() > Number(expires)) {
    return page('This link has expired', 'Confirmation links work for 7 days. Request the guide again and we will send you a fresh link.');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (apiKey && audienceId) {
    try {
      await addToAudience({ apiKey, audienceId, email, name });
    } catch (error) {
      // Never block the download on list sync.
      console.error('guide-confirm: audience add error', error);
    }
  }

  return {
    statusCode: 302,
    headers: { Location: GUIDE_PATH, 'Cache-Control': 'no-store' },
    body: '',
  };
};
