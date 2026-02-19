const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Instagram Basic Display API endpoint
    // You'll need to set these in Netlify Environment Variables
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp';
    const limit = 6;

    if (!accessToken) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Instagram access token not configured' }),
      };
    }

    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Instagram API Error:', data.error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch Instagram posts' }),
      };
    }

    // Filter for videos and images only (exclude carousel albums for simplicity)
    const filteredPosts = data.data.filter(post => 
      post.media_type === 'VIDEO' || post.media_type === 'IMAGE'
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(filteredPosts),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};