const BASE = 'https://functions.poehali.dev/dd31f286-4b2a-49dc-a63f-7bbd58a99a3f';

function authHeader() {
  const t = localStorage.getItem('cms_token');
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка запроса');
  return data as T;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  cover_url?: string;
  category?: string;
  tags?: string[];
  keywords?: string[];
  published_at?: string;
  author?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PostsResponse { posts: Post[]; total: number; page: number; per: number; }

export const api = {
  // public
  getPosts: (params: Record<string, string | number> = {}) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return req<PostsResponse>('GET', `/posts${q ? '?' + q : ''}`);
  },
  getPost: (slug: string) => req<Post>('GET', `/posts/${slug}`),

  // auth
  login: (username: string, password: string) =>
    req<{ token: string; display_name: string }>('POST', '/auth/login', { username, password }),

  // admin
  adminPosts: () => req<{ posts: Post[] }>('GET', '/admin/posts'),
  createPost: (data: Partial<Post>) => req<{ id: number; slug: string }>('POST', '/admin/posts', data),
  updatePost: (id: number, data: Partial<Post>) => req<{ updated: number }>('PUT', `/admin/posts/${id}`, data),
  archivePost: (id: number) => req<{ archived: number }>('DELETE', `/admin/posts/${id}`),
  uploadImage: (base64: string, mime: string) =>
    req<{ url: string }>('POST', '/admin/upload', { data: base64, mime }),
};
