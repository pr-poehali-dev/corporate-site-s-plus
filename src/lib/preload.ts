import type { Post } from './api';

export type Preload =
  | { type: 'post'; post: Post }
  | { type: 'list'; page: number; total: number; posts: Post[]; categories: string[] }
  | { type: 'notfound' };

let cached: Preload | null | undefined;

export function getPreload(): Preload | null {
  const g = globalThis as { __BLOG_PRELOAD__?: Preload | null };
  if (g.__BLOG_PRELOAD__) return g.__BLOG_PRELOAD__;
  if (typeof document === 'undefined') return null;
  if (cached !== undefined) return cached;
  try {
    const el = document.getElementById('blog-preload');
    cached = el?.textContent ? (JSON.parse(el.textContent) as Preload) : null;
  } catch {
    cached = null;
  }
  return cached;
}

export function preloadedPost(slug?: string): Post | null {
  const p = getPreload();
  return p && p.type === 'post' && p.post.slug === slug ? p.post : null;
}

export function preloadedList(page: number) {
  const p = getPreload();
  return p && p.type === 'list' && p.page === page ? p : null;
}
