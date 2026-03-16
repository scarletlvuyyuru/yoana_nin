const fetch = require('node-fetch');

const ALLOWED_SOURCE_TYPES = ['instagram', 'facebook', 'tiktok', 'youtube', 'other'];

function buildHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

function normalizeSourceType(sourceType) {
  if (!sourceType || typeof sourceType !== 'string') return 'other';
  const normalized = sourceType.toLowerCase().trim();
  return ALLOWED_SOURCE_TYPES.includes(normalized) ? normalized : 'other';
}

function validateSourceUrl(sourceUrl) {
  if (!sourceUrl || typeof sourceUrl !== 'string') {
    throw new Error('sourceUrl is required.');
  }

  let parsed;
  try {
    parsed = new URL(sourceUrl.trim());
  } catch (error) {
    throw new Error('sourceUrl must be a valid URL.');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('sourceUrl must use http or https.');
  }

  return parsed.toString();
}

function toTranscriptText(rawData) {
  if (!rawData) return '';

  if (typeof rawData.transcript === 'string') return rawData.transcript.trim();
  if (typeof rawData.text === 'string') return rawData.text.trim();

  if (Array.isArray(rawData.transcript)) {
    return rawData.transcript
      .map((item) => (typeof item === 'string' ? item : item?.text || ''))
      .filter(Boolean)
      .join('\n')
      .trim();
  }

  if (Array.isArray(rawData.segments)) {
    return rawData.segments
      .map((segment) => segment?.text || '')
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  return '';
}

function buildMockTranscript(sourceType, sourceUrl) {
  return [
    `Mock transcript for ${sourceType} video.`,
    `Source URL: ${sourceUrl}`,
    'This is a placeholder transcript so you can test your CMS workflow end-to-end before enabling a real transcript provider.',
  ].join('\n\n');
}

async function fetchProviderTranscript(sourceType, sourceUrl) {
  const providerUrl = process.env.TRANSCRIPT_API_URL;
  const providerKey = process.env.TRANSCRIPT_API_KEY;

  if (!providerUrl) {
    return {
      ok: false,
      statusCode: 501,
      error: 'TRANSCRIPT_API_URL is not configured. Set it or enable mock mode.',
    };
  }

  const headers = { 'Content-Type': 'application/json' };
  if (providerKey) {
    headers.Authorization = `Bearer ${providerKey}`;
    headers['x-api-key'] = providerKey;
  }

  const response = await fetch(providerUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ sourceUrl, sourceType }),
  });

  const data = await response.json().catch(() => ({}));
  const transcript = toTranscriptText(data);

  if (!response.ok) {
    return {
      ok: false,
      statusCode: response.status,
      error: data?.error || 'Transcript provider request failed.',
      providerResponse: data,
    };
  }

  if (!transcript) {
    return {
      ok: false,
      statusCode: 502,
      error: 'Transcript provider returned no transcript text.',
      providerResponse: data,
    };
  }

  return {
    ok: true,
    statusCode: 200,
    transcript,
    providerResponse: data,
  };
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
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' }),
    };
  }

  try {
    const body = parseBody(event.body);
    const sourceType = normalizeSourceType(body.sourceType);
    const sourceUrl = validateSourceUrl(body.sourceUrl);
    const useMock = body.mock === true || process.env.TRANSCRIPT_TEST_MODE === 'mock';

    if (useMock) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ok: true,
          mode: 'mock',
          sourceType,
          sourceUrl,
          transcript: buildMockTranscript(sourceType, sourceUrl),
        }),
      };
    }

    const result = await fetchProviderTranscript(sourceType, sourceUrl);

    if (!result.ok) {
      return {
        statusCode: result.statusCode,
        headers,
        body: JSON.stringify({
          ok: false,
          mode: 'provider',
          sourceType,
          sourceUrl,
          error: result.error,
          providerResponse: result.providerResponse,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        mode: 'provider',
        sourceType,
        sourceUrl,
        transcript: result.transcript,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        ok: false,
        error: error.message || 'Invalid request.',
      }),
    };
  }
};
