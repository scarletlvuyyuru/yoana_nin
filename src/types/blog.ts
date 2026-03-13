export type BlogCategory = 'Coaching' | 'Community' | 'Real Estate' | 'Personal Growth';

export type BlogCreationMode = 'manual' | 'video';

export type BlogDraftStatus = 'draft' | 'ready' | 'published';

export type BlogSourceType = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'other';

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPostData {
  title: string;
  content: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  excerpt: string;
  meta_description?: string;
  featured_image?: string;
  image_alt?: string;
  key_answer?: string;
  faq?: BlogFaqItem[];
  geo_focus?: string;
  geo_schema?: boolean;
  creation_mode?: BlogCreationMode;
  draft_status?: BlogDraftStatus;
  source_type?: BlogSourceType;
  source_url?: string;
  transcript?: string;
}

export interface BlogPostListItem extends BlogPostData {
  id: string;
  featured: boolean;
  slug: string;
}
