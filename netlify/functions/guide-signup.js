const {
  GUIDE_URL,
  escapeHtml,
  isValidEmail,
  cleanSource,
  buildConfirmUrl,
  getEmailSettings,
  missingEmailSettings,
  sendEmail,
  emailLayout,
  confirmButtonHtml,
} = require('../lib/subscribers');

const buildEmailHtml = ({ name, confirmUrl }) =>
  emailLayout({
    heading: 'Your Free ADHD SOS Guide',
    bodyHtml: `
      <p style="margin-top: 0;">Hi ${escapeHtml(name)},</p>
      <p>Thanks for signing up! Here is your download:</p>
      <p style="margin: 0 0 24px;">
        &rarr; <a href="${GUIDE_URL}" style="color: #004aad; font-weight: bold;">Download the ADHD SOS Guide (PDF)</a>
      </p>
      <p>Click the button below to confirm your subscription and you'll be on your way.</p>
      ${confirmButtonHtml(confirmUrl)}
      <p style="margin-bottom: 0;">Warmly,<br>Yoana</p>
      <hr style="border: none; border-top: 1px solid #e7e5e2; margin: 24px 0 12px;">
      <p style="font-size: 12px; color: #6b7280; margin: 0;">You're receiving this because you requested the ADHD SOS Guide at yoananincoaching.com. If that wasn't you, you can ignore this email; you won't be subscribed unless you confirm.</p>`,
  });

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
    const settings = getEmailSettings();
    const missing = missingEmailSettings(settings);
    if (missing.length) {
      console.error('guide-signup: missing settings —', missing.join(', '));
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email is not configured yet.' }) };
    }

    const payload = JSON.parse(event.body || '{}');
    const name = String(payload.name || '').trim().slice(0, 100);
    const email = String(payload.email || '').trim().toLowerCase().slice(0, 250);
    const source = cleanSource(payload.source);

    if (!name || !isValidEmail(email)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Please enter a valid name and email.' }) };
    }

    const confirmUrl = buildConfirmUrl({ email, name, source, secret: settings.linkSecret });

    try {
      await sendEmail({
        settings,
        to: email,
        subject: 'Your ADHD SOS Guide is here!',
        html: buildEmailHtml({ name, confirmUrl }),
        text: buildEmailText({ name, confirmUrl }),
      });
    } catch (error) {
      console.error('guide-signup:', error.message);
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'We could not send the email. Please try again.' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error('guide-signup:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Unexpected error. Please try again.' }) };
  }
};
