const fetch = require('node-fetch');
const yaml = require('js-yaml');

const ALLOWED_CATEGORIES = ['Coaching', 'Community', 'Real Estate', 'Personal Growth'];

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

function normalizeSlug(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getValidatedSlug(payload) {
  const slug = normalizeSlug(payload.slug || payload.title);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Slug is required and must contain only lowercase letters, numbers, and hyphens.');
  }

  return slug;
}

function sanitizeFilenameStem(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

function getSafeExtension(fileName, mimeType) {
  const fromName = String(fileName || '').toLowerCase().match(/\.([a-z0-9]{2,8})$/);
  if (fromName && fromName[1]) {
    return fromName[1];
  }

  const mimeMap = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
  };

  return mimeMap[String(mimeType || '').toLowerCase()] || 'bin';
}

function normalizeBase64Payload(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  const commaIndex = raw.indexOf(',');
  return commaIndex >= 0 ? raw.slice(commaIndex + 1) : raw;
}

function normalizeMarkdownBody(rawBody) {
  const body = String(rawBody || '').replace(/\r\n/g, '\n');

  // Some AI outputs escape markdown heading markers like \##, which renders as plain text.
  return body
    .replace(/^\s*\\(#{1,6}\s+)/gm, '$1')
    .trim();
}

function parseTags(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag || '').trim()).filter(Boolean);
  }

  return String(value)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function toBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lowered = value.toLowerCase().trim();
    if (lowered === 'true') return true;
    if (lowered === 'false') return false;
  }
  return fallback;
}

function resolveRepoConfig() {
  const token = process.env.BLOG_GITHUB_TOKEN;
  const branch = process.env.BLOG_GITHUB_BRANCH || 'main';

  let owner = process.env.BLOG_GITHUB_OWNER || '';
  let repo = process.env.BLOG_GITHUB_REPO || '';

  if ((!owner || !repo) && process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    if (parts.length === 2) {
      owner = owner || parts[0];
      repo = repo || parts[1];
    }
  }

  if (!token) {
    throw new Error('Missing BLOG_GITHUB_TOKEN environment variable.');
  }

  if (!owner || !repo) {
    throw new Error('Missing BLOG_GITHUB_OWNER and BLOG_GITHUB_REPO environment variables.');
  }

  return { token, owner, repo, branch };
}

async function githubRequest(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  return { response, data };
}

async function ensureFileDoesNotExist({ owner, repo, branch, token, path }) {
  const checkUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
  const { response, data } = await githubRequest(checkUrl, token, { method: 'GET' });

  if (response.status === 404) return;

  if (response.ok) {
    throw new Error(`A post with slug "${path.replace('src/content/blog/', '').replace('.md', '')}" already exists.`);
  }

  throw new Error(data?.message || 'Failed checking for existing blog post file.');
}

function buildFrontmatter(payload) {
  const slug = getValidatedSlug(payload);

  const title = String(payload.title || '').trim();
  const body = normalizeMarkdownBody(payload.body);
  if (!title) throw new Error('Title is required.');
  if (!body) throw new Error('Body is required.');

  const category = ALLOWED_CATEGORIES.includes(payload.category)
    ? payload.category
    : 'Coaching';

  const nowIso = new Date().toISOString();
  const publishDate = payload.date ? new Date(payload.date).toISOString() : nowIso;

  const frontmatter = {
    title,
    slug,
    date: publishDate,
    author: String(payload.author || 'Yoana Nin').trim() || 'Yoana Nin',
    category,
    is_published: toBoolean(payload.is_published, false),
    tags: parseTags(payload.tags),
    featured: toBoolean(payload.featured, true),
    image: String(payload.featured_image || '').trim() || undefined,
    image_alt: String(payload.image_alt || '').trim() || undefined,
    key_answer: String(payload.key_answer || '').trim() || undefined,
    excerpt: String(payload.excerpt || '').trim() || undefined,
    meta_description: String(payload.meta_description || '').trim() || undefined,
    geo_focus: String(payload.geo_focus || 'Raleigh, NC').trim(),
    geo_schema: toBoolean(payload.geo_schema, true),
    source_url: String(payload.source_url || '').trim() || undefined,
    source_type: String(payload.source_type || '').trim() || undefined,
    creation_mode: 'video',
    workflow_stage: 'draft_ready',
  };

  // Remove undefined keys so frontmatter stays clean.
  Object.keys(frontmatter).forEach((key) => {
    if (frontmatter[key] === undefined) {
      delete frontmatter[key];
    }
  });

  const yamlBody = yaml.dump(frontmatter, {
    lineWidth: 100,
    noRefs: true,
    sortKeys: false,
  });

  const markdown = `---\n${yamlBody}---\n\n${body}\n`;

  return {
    slug,
    markdown,
  };
}

async function uploadFeaturedAssetIfProvided({ payload, repoConfig, slug }) {
  const base64Content = normalizeBase64Payload(payload.featured_file_content_base64);
  if (!base64Content) {
    return String(payload.featured_image || '').trim() || undefined;
  }

  const fileNameFromClient = String(payload.featured_file_name || '').trim();
  const mimeTypeFromClient = String(payload.featured_file_mime_type || '').trim();
  const extension = getSafeExtension(fileNameFromClient, mimeTypeFromClient);
  const stem = sanitizeFilenameStem(fileNameFromClient.replace(/\.[a-z0-9]{2,8}$/i, '')) || `${slug}-featured`;
  const uniqueSuffix = Date.now();
  const fileName = `${slug}-${stem}-${uniqueSuffix}.${extension}`;
  const path = `public/images/uploads/${fileName}`;

  let buffer;
  try {
    buffer = Buffer.from(base64Content, 'base64');
  } catch (error) {
    throw new Error('Featured file upload is not valid base64 data.');
  }

  if (!buffer || buffer.length === 0) {
    throw new Error('Featured file upload is empty.');
  }

  const maxBytes = 8 * 1024 * 1024;
  if (buffer.length > maxBytes) {
    throw new Error('Featured file is too large. Keep it under 8 MB.');
  }

  await ensureFileDoesNotExist({ ...repoConfig, path });
  await createFileInGitHub({
    ...repoConfig,
    path,
    contentBase64: buffer.toString('base64'),
    message: `Upload featured media for: ${slug}`,
  });

  return `/images/uploads/${fileName}`;
}

async function createFileInGitHub({ token, owner, repo, branch, path, contentBase64, message }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

  const { response, data } = await githubRequest(url, token, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch,
    }),
  });

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to create blog post file in GitHub.');
  }

  return data;
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
    const repoConfig = resolveRepoConfig();
    const validatedSlug = getValidatedSlug(body);
    const uploadedFeaturedImagePath = await uploadFeaturedAssetIfProvided({
      payload: body,
      repoConfig,
      slug: validatedSlug,
    });

    if (uploadedFeaturedImagePath) {
      body.featured_image = uploadedFeaturedImagePath;
    }

    const { slug, markdown } = buildFrontmatter(body);

    const path = `src/content/blog/${slug}.md`;
    await ensureFileDoesNotExist({ ...repoConfig, path });

    const commitMessage = `Add blog draft: ${slug}`;
    const contentBase64 = Buffer.from(markdown, 'utf8').toString('base64');

    const created = await createFileInGitHub({
      ...repoConfig,
      path,
      contentBase64,
      message: commitMessage,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        slug,
        path,
        featuredImagePath: body.featured_image || null,
        commitSha: created?.commit?.sha || null,
        githubUrl: created?.content?.html_url || null,
        websitePreviewPath: `/blog/${slug}`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        ok: false,
        error: error.message || 'Failed to publish blog post.',
      }),
    };
  }
};
