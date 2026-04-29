const fetch = require('node-fetch');

function buildHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

function parseBody(rawBody) {
  if (!rawBody) return {};
  try {
    return JSON.parse(rawBody);
  } catch (error) {
    throw new Error('Request body must be valid JSON.');
  }
}

function buildImagePrompt(title, excerpt) {
  const safeTitle = (title || '').replace(/[^\w\s,.-]/g, '').trim().slice(0, 120);
  const safeExcerpt = (excerpt || '').replace(/[^\w\s,.-]/g, '').trim().slice(0, 200);

  const topicLine = safeTitle
    ? `The blog post is titled: "${safeTitle}".`
    : 'A wellness and personal growth blog post.';

  const contextLine = safeExcerpt
    ? `Key message: ${safeExcerpt}`
    : '';

  return [
    'Create a warm, uplifting lifestyle photograph that matches the mood and theme of a blog post.',
    topicLine,
    contextLine,
    'Style: natural lighting, soft and warm color palette, photorealistic.',
    'The image should feel calm, empowering, and relatable — suitable for a life coaching or wellness blog.',
    'No text, no words, no letters, no captions, no overlays of any kind anywhere in the image.',
    'No people shown up close; if people appear keep them soft-focus or silhouetted in the background.',
    'Horizontal landscape composition (16:9 ratio feel).',
  ]
    .filter(Boolean)
    .join(' ');
}

exports.handler = async (event) => {
  const headers = buildHeaders();

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed. Use POST.' }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'OPENAI_API_KEY is not configured. Add it to Netlify environment variables.',
      }),
    };
  }

  try {
    const body = parseBody(event.body);
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const excerpt = typeof body.excerpt === 'string' ? body.excerpt.trim() : '';

    if (!title && !excerpt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Provide at least a title or excerpt to generate an image.' }),
      };
    }

    const prompt = buildImagePrompt(title, excerpt);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1792x1024',
        quality: 'standard',
        response_format: 'b64_json',
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const msg = data?.error?.message || `OpenAI image generation failed (${response.status}).`;
      return {
        statusCode: response.status >= 500 ? 502 : response.status,
        headers,
        body: JSON.stringify({ ok: false, error: msg }),
      };
    }

    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ ok: false, error: 'OpenAI returned no image data.' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true, b64, prompt }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: error.message || 'Image generation failed.' }),
    };
  }
};
