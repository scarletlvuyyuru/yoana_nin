const fetch = require('node-fetch');

// Generates a featured image for a blog post from its title/summary.
// The browser then crops it to 1200x630 and compresses it to WebP before upload.

const headers = { 'Content-Type': 'application/json' };

const json = (statusCode, body) => ({ statusCode, headers, body: JSON.stringify(body) });

const clip = (value, max) => String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);

async function openai(path, payload, apiKey) {
  const response = await fetch(`https://api.openai.com/v1/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error?.message || `OpenAI request failed (${response.status}).`);
  }
  return data;
}

// Turn the article into one concrete visual scene plus alt text. Image models do
// much better with a described scene than with an abstract blog title.
async function describeScene({ title, summary, idea }, apiKey) {
  const data = await openai(
    'chat/completions',
    {
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      temperature: 0.7,
      max_tokens: 250,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You art-direct featured images for an ADHD coaching blog whose readers are women entrepreneurs and women real estate agents. ' +
            'Return JSON {"scene": string, "alt": string}. "scene": one concrete, positive, realistic photo scene (1-2 sentences) that captures the article\'s idea; ' +
            'no text, signs, screens with words, or logos in the scene. "alt": accessible alt text under 120 characters describing that scene.',
        },
        {
          role: 'user',
          content: `Title: ${title}\nSummary: ${summary || '(none)'}\n${idea ? `The author wants: ${idea}` : ''}`,
        },
      ],
    },
    apiKey
  );

  const parsed = JSON.parse(data?.choices?.[0]?.message?.content || '{}');
  return {
    scene: clip(parsed.scene, 600) || `A calm, organized workspace that reflects: ${title}`,
    alt: clip(parsed.alt, 160) || title,
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json(500, { ok: false, error: 'Image generation is not configured (missing OPENAI_API_KEY).' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const title = clip(body.title, 200);
    const summary = clip(body.summary, 600);
    const idea = clip(body.idea, 300);

    if (!title) {
      return json(400, { ok: false, error: 'Add a title first so the image matches the article.' });
    }

    const { scene, alt } = await describeScene({ title, summary, idea }, apiKey);

    const prompt = [
      `Editorial lifestyle photograph: ${scene}`,
      'Warm natural light, modern and uplifting, professional but approachable.',
      'Subtle accents of magenta (#b300b3) and deep blue (#004aad) in the decor or clothing.',
      'Wide horizontal composition with the main subject centered; keep important details away from the top and bottom edges.',
      'Absolutely no text, words, letters, numbers, logos, or watermarks anywhere in the image.',
    ].join(' ');

    const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
    const isDallE = model.startsWith('dall-e');
    const imagePayload = isDallE
      ? { model, prompt, n: 1, size: '1792x1024', quality: 'standard', response_format: 'b64_json' }
      : {
          model,
          prompt,
          n: 1,
          size: '1536x1024',
          quality: process.env.OPENAI_IMAGE_QUALITY || 'medium',
          output_format: 'webp',
          output_compression: 85,
        };

    const data = await openai('images/generations', imagePayload, apiKey);
    const imageBase64 = data?.data?.[0]?.b64_json;
    if (!imageBase64) {
      throw new Error('The image service returned no image. Please try again.');
    }

    return json(200, {
      ok: true,
      imageBase64,
      mimeType: isDallE ? 'image/png' : 'image/webp',
      alt,
    });
  } catch (error) {
    console.error('generate-blog-image:', error);
    return json(502, { ok: false, error: error.message || 'Image generation failed. Please try again.' });
  }
};
