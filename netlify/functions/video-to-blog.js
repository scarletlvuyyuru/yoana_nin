const fetch = require('node-fetch');

const ALLOWED_SOURCE_TYPES = ['instagram', 'facebook', 'tiktok', 'youtube', 'other'];
const DEFAULT_MAX_TRANSCRIPT_CHARS = 12000;
const DEFAULT_OPENAI_MAX_RETRIES = 2;

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
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
    };
  }

  if (!transcript) {
    return {
      ok: false,
      statusCode: 502,
      error: 'Transcript provider returned no transcript text.',
    };
  }

  return {
    ok: true,
    statusCode: 200,
    transcript,
  };
}

async function resolveTranscript(sourceType, sourceUrl, useMock) {
  if (useMock) {
    return {
      ok: true,
      statusCode: 200,
      mode: 'mock',
      transcript: buildMockTranscript(sourceType, sourceUrl),
    };
  }

  const result = await fetchProviderTranscript(sourceType, sourceUrl);
  if (!result.ok) {
    return {
      ok: false,
      statusCode: result.statusCode,
      mode: 'provider',
      error: result.error,
    };
  }

  return {
    ok: true,
    statusCode: 200,
    mode: 'provider',
    transcript: result.transcript,
  };
}

function createSlug(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function firstSentence(text) {
  if (!text) return '';
  const normalized = text.replace(/\s+/g, ' ').trim();
  const match = normalized.match(/(.+?[.!?])\s/);
  return match ? match[1].trim() : normalized.slice(0, 180).trim();
}

function fallbackDraftFromTranscript(transcript, sourceType, sourceUrl) {
  const sentence = firstSentence(transcript) || 'Key insight from this conversation';
  const title = sentence.length > 90 ? `${sentence.slice(0, 87)}...` : sentence;
  const excerpt = transcript.replace(/\s+/g, ' ').trim().slice(0, 220);

  return {
    title,
    slug: createSlug(title || 'video-insight'),
    excerpt,
    meta_description: excerpt,
    key_answer: sentence,
    body: [
      '## Core Message',
      '',
      transcript,
      '',
      '## Practical Takeaway',
      '',
      `This post is based only on the ${sourceType} transcript from: ${sourceUrl}`,
    ].join('\n'),
  };
}

function sanitizeAiDraft(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new Error('AI returned invalid response.');
  }

  const title = typeof raw.title === 'string' ? raw.title.trim() : '';
  const body = typeof raw.body === 'string' ? raw.body.trim() : '';
  const excerpt = typeof raw.excerpt === 'string' ? raw.excerpt.trim() : '';
  const metaDescription =
    typeof raw.meta_description === 'string' ? raw.meta_description.trim() : excerpt;
  const keyAnswer = typeof raw.key_answer === 'string' ? raw.key_answer.trim() : excerpt;

  if (!title || !body) {
    throw new Error('AI draft missing required title/body.');
  }

  const cleanTitle = title.replace(/^#+\s*/, '').trim();

  return {
    title: cleanTitle,
    slug: createSlug(raw.slug || cleanTitle || 'video-insight'),
    excerpt: excerpt || firstSentence(body),
    meta_description: metaDescription || firstSentence(body),
    key_answer: keyAnswer || firstSentence(body),
    body: body.replace(/^#\s+.+(?:\r?\n)+/, '').trim(),
  };
}

function clampTranscript(transcript) {
  const maxChars = toPositiveInt(process.env.TRANSCRIPT_MAX_CHARS, DEFAULT_MAX_TRANSCRIPT_CHARS);
  const safeTranscript = typeof transcript === 'string' ? transcript.trim() : '';

  if (!safeTranscript || safeTranscript.length <= maxChars) {
    return {
      transcript: safeTranscript,
      truncated: false,
      maxChars,
    };
  }

  const headSize = Math.floor(maxChars * 0.75);
  const tailSize = Math.max(maxChars - headSize - 40, 0);
  const clamped = [
    safeTranscript.slice(0, headSize).trim(),
    '[... transcript truncated for generation ...]',
    safeTranscript.slice(Math.max(safeTranscript.length - tailSize, 0)).trim(),
  ]
    .filter(Boolean)
    .join('\n\n');

  return {
    transcript: clamped,
    truncated: true,
    maxChars,
  };
}

async function callOpenAIWithRetry(payload, apiKey) {
  const retries = toPositiveInt(process.env.OPENAI_MAX_RETRIES, DEFAULT_OPENAI_MAX_RETRIES);

  let lastError = new Error('OpenAI generation failed.');

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      return data;
    }

    const shouldRetry = response.status === 429 || response.status >= 500;
    lastError = new Error(data?.error?.message || `OpenAI generation failed (${response.status}).`);

    if (!shouldRetry || attempt === retries) {
      throw lastError;
    }

    const backoffMs = (attempt + 1) * 800;
    await sleep(backoffMs);
  }

  throw lastError;
}

async function generateDraftWithOpenAI(transcript, sourceType, sourceUrl) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return fallbackDraftFromTranscript(transcript, sourceType, sourceUrl);
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
  const prompt = [
    'You are writing a blog draft using ONLY the transcript content provided.',
    'Do not add facts, claims, or context that are not explicitly present in the transcript.',
    'Keep tone warm, conversational, and coach-like.',
    'Output strictly valid JSON with keys: title, slug, excerpt, meta_description, key_answer, body.',
    'Rules:',
    '- body must be Markdown',
    '- Do NOT include an H1 in body; use H2/H3 only',
    '- keep the messaging faithful to transcript wording and intent',
    '',
    `Source type: ${sourceType}`,
    `Source URL: ${sourceUrl}`,
    '',
    'Transcript:',
    transcript,
  ].join('\n');

  const data = await callOpenAIWithRetry(
    {
      model,
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You convert transcripts into blog drafts while preserving only transcript-derived meaning.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    },
    apiKey
  );

  const content = data?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') {
    throw new Error('OpenAI returned empty content.');
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    throw new Error('OpenAI response was not valid JSON.');
  }

  return sanitizeAiDraft(parsed);
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

  try {
    const body = parseBody(event.body);
    const sourceType = normalizeSourceType(body.sourceType);
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
    const allowFallback = body.allowFallback === true;

    // If transcript text is pasted directly, skip URL fetching entirely.
    let transcript;
    let sourceUrl = '';
    let transcriptMode;

    if (body.transcript && typeof body.transcript === 'string' && body.transcript.trim().length > 0) {
      transcript = body.transcript.trim();
      transcriptMode = 'pasted';
      sourceUrl = (body.sourceUrl && typeof body.sourceUrl === 'string') ? body.sourceUrl.trim() : '';
    } else {
      // Legacy URL-based path (mock or provider).
      sourceUrl = validateSourceUrl(body.sourceUrl);
      const useMockTranscript = body.mock === true || process.env.TRANSCRIPT_TEST_MODE === 'mock';
      const transcriptResult = await resolveTranscript(sourceType, sourceUrl, useMockTranscript);
      if (!transcriptResult.ok || !transcriptResult.transcript) {
        return {
          statusCode: transcriptResult.statusCode || 502,
          headers,
          body: JSON.stringify({
            ok: false,
            stage: 'transcript',
            error: transcriptResult.error || 'Failed to resolve transcript.',
          }),
        };
      }
      transcript = transcriptResult.transcript;
      transcriptMode = transcriptResult.mode;
    }

    const clampedTranscript = clampTranscript(transcript);

    if (!hasOpenAIKey && !allowFallback) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          ok: false,
          stage: 'generation',
          error:
            'OPENAI_API_KEY is not available in this deploy context. Add it to Netlify Environment Variables for Functions + Branch deploys, then redeploy.',
        }),
      };
    }

    const aiDraft = await generateDraftWithOpenAI(clampedTranscript.transcript, sourceType, sourceUrl);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        stage: 'completed',
        mode: hasOpenAIKey ? 'openai' : 'fallback',
        transcriptMode,
        sourceType,
        sourceUrl,
        transcript,
        transcript_truncated_for_generation: clampedTranscript.truncated,
        transcript_generation_limit_chars: clampedTranscript.maxChars,
        draft: aiDraft,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        ok: false,
        stage: 'generation',
        error: error.message || 'Failed to generate blog draft.',
      }),
    };
  }
};
