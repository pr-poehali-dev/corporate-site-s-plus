import { mdToHtml } from './mdToHtml';
import type { Post } from './api';

export const SITE_URL = 'https://softplus.systems';
export const SITE_NAME = 'АО «СОФТ ПЛЮС СИСТЕМС»';
export const DEFAULT_OG_IMAGE = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/files/og-image-1782221586814.png';
export const LOGO_URL = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
export const BLOG_PER_PAGE = 12;

export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string;
  image: string;
  url: string;
  type: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
  publishedTime?: string;
  modifiedTime?: string;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,.;:—-]+$/, '') + '…';
}

export function toIso(s?: string): string | undefined {
  if (!s) return undefined;
  const d = new Date(s);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${encodeURI(slug)}`;
}

export function listPath(page: number): string {
  return page > 1 ? `/blog/page/${page}` : '/blog';
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[\s«»"'.,:;!?—–-]+/g, ' ').trim();
}

export function postContentHtml(post: Post): string {
  let md = post.content || '';
  const lines = md.split('\n');
  const first = lines.findIndex((l) => l.trim() !== '');
  if (first >= 0 && /^# /.test(lines[first]) && normalize(lines[first].slice(2)) === normalize(post.title)) {
    lines.splice(first, 1);
  }
  md = lines.map((l) => (/^# /.test(l) ? `#${l}` : l)).join('\n');
  const alt = post.title.replace(/"/g, '&quot;');
  return mdToHtml(md).replace(/<img([^>]*?)alt=""/g, `<img$1alt="${alt}"`);
}

export function postSeo(post: Post): SeoMeta {
  const description = truncate(post.excerpt?.trim() || stripHtml(postContentHtml(post)), 220);
  const image = post.cover_url || DEFAULT_OG_IMAGE;
  const url = postUrl(post.slug);
  const published = toIso(post.published_at);
  const modified = toIso(post.updated_at) || published;
  const words = stripHtml(postContentHtml(post)).split(' ').filter(Boolean).length;
  return {
    title: `${post.title} — Блог АО «С+»`,
    description,
    keywords: (post.keywords?.length ? post.keywords : post.tags)?.join(', '),
    image,
    url,
    type: 'article',
    publishedTime: published,
    modifiedTime: modified,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description,
      image: [image],
      datePublished: published,
      dateModified: modified,
      inLanguage: 'ru-RU',
      articleSection: post.category || undefined,
      keywords: post.keywords?.length ? post.keywords.join(', ') : undefined,
      wordCount: words,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: { '@type': 'ImageObject', url: LOGO_URL },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
  };
}

export function listSeo(page: number): SeoMeta {
  const suffix = page > 1 ? ` — страница ${page}` : '';
  return {
    title: `Экспертиза АО «С+» — статьи об IT, AI и цифровой трансформации${suffix}`,
    description:
      'Экспертные статьи специалистов АО «СОФТ ПЛЮС СИСТЕМС» о разработке программного обеспечения, искусственном интеллекте, цифровой трансформации и корпоративных технологиях.',
    keywords: 'IT блог, AI статьи, цифровая трансформация, разработка ПО, искусственный интеллект, B2B, B2G, Enterprise',
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL + listPath(page),
    type: 'website',
  };
}
