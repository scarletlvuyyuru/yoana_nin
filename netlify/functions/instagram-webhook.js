const fetch = require('node-fetch');

exports.handler = async (event, context) => {
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
    // This function will be called by Instagram webhook when new posts are published
    // Or can be triggered by a cron job to check for new posts
    
    const { hub_mode, hub_verify_token, hub_challenge } = JSON.parse(event.body || '{}');
    
    // Verify webhook (Instagram subscription verification)
    if (hub_mode === 'subscribe' && hub_verify_token === process.env.INSTAGRAM_VERIFY_TOKEN) {
      return {
        statusCode: 200,
        headers,
        body: hub_challenge,
      };
    }

    // Handle actual webhook notification
    const buildHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;
    
    if (buildHookUrl) {
      // Trigger Netlify build to refresh content
      await fetch(buildHookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Build triggered for new Instagram content');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Webhook processed successfully' }),
    };

  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};