const fetch = require('node-fetch');

const RESEND_API_URL = 'https://api.resend.com/emails';

const buildUserEmailHtml = ({ totalScore, scoreRange, scoreSuggestion, nextStep, answers }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a2a42; max-width: 640px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #004aad 0%, #b300b3 100%); color: #ffffff; padding: 24px; border-radius: 16px 16px 0 0;">
      <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase;">Yoana Nin Coaching</p>
      <h1 style="margin: 0; font-size: 28px;">Your ADHD Self-Assessment Results</h1>
    </div>
    <div style="border: 1px solid #e7e5e2; border-top: none; padding: 24px; border-radius: 0 0 16px 16px; background: #ffffff;">
      <p style="margin-top: 0;">Here is your personalized assessment summary.</p>
      <div style="padding: 16px; border-radius: 12px; background: #faf9f6; border: 1px solid #ffe4ff; margin-bottom: 16px;">
        <p style="margin: 0 0 6px;"><strong>Total score:</strong> ${totalScore} / 50</p>
        <p style="margin: 0 0 6px;"><strong>Score range:</strong> ${scoreRange}</p>
        <p style="margin: 0;"><strong>Impact:</strong> ${scoreSuggestion}</p>
      </div>
      <div style="padding: 16px; border-radius: 12px; background: #fff7e8; border: 1px solid #ffd487; margin-bottom: 16px;">
        <p style="margin: 0 0 6px;"><strong>Recommended next step</strong></p>
        <p style="margin: 0;">${nextStep}</p>
      </div>
      <div style="padding: 16px; border-radius: 12px; background: #faf9f6; border: 1px solid #e7e5e2; margin-bottom: 16px;">
        <p style="margin: 0 0 6px;"><strong>Your answers</strong></p>
        <p style="margin: 0;">${answers}</p>
      </div>
      <p style="margin-bottom: 0;">Ready to turn your ADHD into your business superpower? Reply to this email or book your free discovery call with Yoana.</p>
    </div>
  </div>
`;

const buildUserEmailText = ({ totalScore, scoreRange, scoreSuggestion, nextStep, answers }) => `Your ADHD Self-Assessment Results

Total score: ${totalScore} / 50
Score range: ${scoreRange}
Impact: ${scoreSuggestion}
Recommended next step: ${nextStep}
Answers: ${answers}

Ready to turn your ADHD into your business superpower? Reply to this email or book your free discovery call with Yoana.`;

const sendEmail = async ({ apiKey, from, to, subject, html, text, replyTo }) => {
  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email send failed: ${details}`);
  }
};

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ASSESSMENT_RESULTS_FROM;
    const replyTo = process.env.ASSESSMENT_REPLY_TO || 'yoana@yoananin.com';

    if (!apiKey || !from) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Missing email configuration. Set RESEND_API_KEY and ASSESSMENT_RESULTS_FROM in Netlify.',
        }),
      };
    }

    const payload = JSON.parse(event.body || '{}');
    const {
      email,
      totalScore,
      scoreRange,
      scoreSuggestion,
      nextStep,
      answers,
      marketingConsent,
      resultsConsent,
    } = payload;

    if (!email || !resultsConsent || !totalScore || !scoreRange || !nextStep) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required assessment fields.' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address.' }),
      };
    }

    await sendEmail({
      apiKey,
      from,
      to: email,
      subject: 'Your ADHD Self-Assessment Results',
      html: buildUserEmailHtml({ totalScore, scoreRange, scoreSuggestion, nextStep, answers }),
      text: buildUserEmailText({ totalScore, scoreRange, scoreSuggestion, nextStep, answers }),
      replyTo,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Unexpected error sending assessment results.' }),
    };
  }
};
