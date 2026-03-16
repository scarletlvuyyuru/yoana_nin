import { marked } from 'marked';
import { load as parseYaml } from 'js-yaml';
import type {
  BlogCategory,
  BlogCreationMode,
  BlogFaqItem,
  BlogPostListItem,
  BlogSourceType,
  BlogWorkflowStage,
} from '../types/blog';

const rawBlogFiles = import.meta.glob('./blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const allowedCategories: BlogCategory[] = ['Coaching', 'Community', 'Real Estate', 'Personal Growth'];
const allowedCreationModes: BlogCreationMode[] = ['manual', 'video'];
const allowedWorkflowStages: BlogWorkflowStage[] = [
  'intake',
  'transcript_ready',
  'draft_ready',
  'final_review',
  'published',
];
const allowedSourceTypes: BlogSourceType[] = ['instagram', 'facebook', 'tiktok', 'youtube', 'other'];

function stripFrontmatter(raw: string): { frontmatterText: string; markdownBody: string } {
  if (!raw.startsWith('---')) {
    return { frontmatterText: '', markdownBody: raw };
  }

  const endDelimiterIndex = raw.indexOf('\n---', 3);
  if (endDelimiterIndex === -1) {
    return { frontmatterText: '', markdownBody: raw };
  }

  const frontmatterText = raw.slice(3, endDelimiterIndex).trim();
  const markdownBody = raw.slice(endDelimiterIndex + 4).trim();

  return { frontmatterText, markdownBody };
}

function toDateString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string' && value.trim()) {
    return value;
  }
  return new Date().toISOString().slice(0, 10);
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
      .filter(Boolean);
  }

  if (typeof value === 'string' && value.trim()) {
    return value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
}

function toFaqList(value: unknown): BlogFaqItem[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const faq = value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null;
      }

      const maybeQuestion = (entry as { question?: unknown }).question;
      const maybeAnswer = (entry as { answer?: unknown }).answer;

      if (typeof maybeQuestion !== 'string' || typeof maybeAnswer !== 'string') {
        return null;
      }

      const question = maybeQuestion.trim();
      const answer = maybeAnswer.trim();

      if (!question || !answer) {
        return null;
      }

      return { question, answer };
    })
    .filter((entry): entry is BlogFaqItem => entry !== null);

  return faq.length ? faq : undefined;
}

function normalizeCategory(value: unknown): BlogCategory {
  if (typeof value === 'string' && allowedCategories.includes(value as BlogCategory)) {
    return value as BlogCategory;
  }
  return 'Coaching';
}

function normalizeCreationMode(value: unknown): BlogCreationMode | undefined {
  if (typeof value === 'string' && allowedCreationModes.includes(value as BlogCreationMode)) {
    return value as BlogCreationMode;
  }
  return undefined;
}

function normalizeSourceType(value: unknown): BlogSourceType | undefined {
  if (typeof value === 'string' && allowedSourceTypes.includes(value as BlogSourceType)) {
    return value as BlogSourceType;
  }
  return undefined;
}

function normalizeWorkflowStage(value: unknown): BlogWorkflowStage | undefined {
  if (typeof value === 'string' && allowedWorkflowStages.includes(value as BlogWorkflowStage)) {
    return value as BlogWorkflowStage;
  }
  return undefined;
}

function removeLeadingH1(markdownBody: string): string {
  let normalizedBody = markdownBody.trimStart();

  normalizedBody = normalizedBody.replace(/^#\s+.+(?:\r?\n)+/, '').trimStart();
  normalizedBody = normalizedBody.replace(/^<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, '').trimStart();

  return normalizedBody.trim();
}

function markdownToHtml(markdownBody: string): string {
  return marked.parse(markdownBody) as string;
}

function extractSlug(path: string, frontmatterSlug: unknown): string {
  if (typeof frontmatterSlug === 'string' && frontmatterSlug.trim()) {
    return frontmatterSlug.trim();
  }

  const filename = path.split('/').pop() ?? '';
  return filename.replace(/\.md$/i, '');
}

function parseBlogFile(path: string, rawContent: string): BlogPostListItem {
  const { frontmatterText, markdownBody } = stripFrontmatter(rawContent);
  const frontmatter = (frontmatterText ? parseYaml(frontmatterText) : {}) as Record<string, unknown>;

  const slug = extractSlug(path, frontmatter.slug);
  const title =
    typeof frontmatter.title === 'string' && frontmatter.title.trim()
      ? frontmatter.title.trim()
      : slug;

  const bodyWithoutTitle = removeLeadingH1(markdownBody);

  return {
    id: slug,
    slug,
    title,
    content: markdownToHtml(bodyWithoutTitle),
    date: toDateString(frontmatter.date),
    author:
      typeof frontmatter.author === 'string' && frontmatter.author.trim()
        ? frontmatter.author.trim()
        : 'Yoana Nin',
    category: normalizeCategory(frontmatter.category),
    tags: toStringList(frontmatter.tags),
    featured: typeof frontmatter.featured === 'boolean' ? frontmatter.featured : true,
    is_published: typeof frontmatter.is_published === 'boolean' ? frontmatter.is_published : true,
    excerpt:
      typeof frontmatter.excerpt === 'string' && frontmatter.excerpt.trim()
        ? frontmatter.excerpt.trim()
        : '',
    meta_description:
      typeof frontmatter.meta_description === 'string' ? frontmatter.meta_description : undefined,
    featured_image:
      typeof frontmatter.featured_image === 'string' ? frontmatter.featured_image : undefined,
    image_alt: typeof frontmatter.image_alt === 'string' ? frontmatter.image_alt : undefined,
    key_answer: typeof frontmatter.key_answer === 'string' ? frontmatter.key_answer : undefined,
    faq: toFaqList(frontmatter.faq),
    geo_focus: typeof frontmatter.geo_focus === 'string' ? frontmatter.geo_focus : undefined,
    geo_schema: typeof frontmatter.geo_schema === 'boolean' ? frontmatter.geo_schema : undefined,
    creation_mode: normalizeCreationMode(frontmatter.creation_mode),
    workflow_stage: normalizeWorkflowStage(frontmatter.workflow_stage),
    source_type: normalizeSourceType(frontmatter.source_type),
    source_url: typeof frontmatter.source_url === 'string' ? frontmatter.source_url : undefined,
    transcript: typeof frontmatter.transcript === 'string' ? frontmatter.transcript : undefined,
  };
}

const blogPostsCache = Object.entries(rawBlogFiles)
  .map(([path, rawContent]) => parseBlogFile(path, rawContent))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const publishedBlogPostsCache = blogPostsCache.filter((post) => post.is_published === true);

export function getAllBlogPosts(): BlogPostListItem[] {
  return publishedBlogPostsCache;
}

export function getFeaturedBlogPosts(): BlogPostListItem[] {
  return publishedBlogPostsCache.filter((post) => post.featured);
}

export function getBlogPostBySlug(slug: string): BlogPostListItem | undefined {
  return publishedBlogPostsCache.find((post) => post.slug === slug);
}
