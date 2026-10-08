// Netlify runs this automatically for every form submission that passes its
// spam filter (and reCAPTCHA). It feeds the subscriber Google Sheet:
//  - events-newsletter: added straight away (they ticked the consent box)
//  - assessment-results with "ongoing tips" ticked: sent a confirmation email;
//    they're added only after clicking Confirm (double opt-in)
const {
  isValidEmail,
  addToGoogleSheet,
  getEmailSettings,
  missingEmailSettings,
  sendNewsletterConfirmEmail,
} = require('../lib/subscribers');

const field = (data, ...keys) => {
  for (const key of keys) {
    const value = data && data[key];
    if (value !== undefined && value !== null && String(value).trim()) return String(value).trim();
  }
  return '';
};

exports.handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body || '{}').payload || {};
  } catch {
    return { statusCode: 400, body: 'Invalid payload' };
  }

  const formName = payload.form_name || (payload.data && payload.data['form-name']) || '';
  const data = payload.data || {};
  const email = field(data, 'email').toLowerCase().slice(0, 250);
  const name = field(data, 'name', 'fullName').slice(0, 100);

  try {
    if (formName === 'events-newsletter') {
      if (!isValidEmail(email)) return { statusCode: 200, body: 'Skipped: no valid email' };
      await addToGoogleSheet({ email, name, source: 'events-newsletter', status: 'Subscribed (newsletter form)' });
      console.log('submission-created: added newsletter signup', email);
    } else if (formName === 'assessment-results' && field(data, 'marketingConsent').toLowerCase() === 'yes') {
      if (!isValidEmail(email)) return { statusCode: 200, body: 'Skipped: no valid email' };
      const settings = getEmailSettings();
      const missing = missingEmailSettings(settings);
      if (missing.length) throw new Error(`Missing email settings: ${missing.join(', ')}`);
      await sendNewsletterConfirmEmail({ settings, email, name, source: 'quiz' });
      console.log('submission-created: sent quiz subscription confirmation to', email);
    }
  } catch (error) {
    // Log and return 200 so Netlify doesn't retry; the submission itself is already saved in Forms.
    console.error(`submission-created (${formName}):`, error.message || error);
  }

  return { statusCode: 200, body: 'OK' };
};
