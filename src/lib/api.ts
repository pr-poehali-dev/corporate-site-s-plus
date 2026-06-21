const BASE = 'https://functions.poehali.dev/dd31f286-4b2a-49dc-a63f-7bbd58a99a3f';

function authHeader() {
  const t = localStorage.getItem('cms_token');
  return t ? { 'X-Authorization': `Bearer ${t}` } : {};
}

// Все запросы идут на корневой URL, маршрут передаётся как ?_path=...
async function req<T>(method: string, route: string, body?: unknown, qp: Record<string, string> = {}): Promise<T> {
  const params = new URLSearchParams({ _path: route, ...qp });
  const res = await fetch(`${BASE}/?${params}`, {
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
  getPosts: (params: Record<string, string | number> = {}) => {
    const qp: Record<string, string> = {};
    Object.entries(params).forEach(([k, v]) => { qp[k] = String(v); });
    return req<PostsResponse>('GET', '/posts', undefined, qp);
  },
  getPost: (slug: string) => req<Post>('GET', `/posts/${slug}`),

  login: (username: string, password: string) =>
    req<{ token: string; display_name: string }>('POST', '/auth/login', { username, password }),

  adminPosts: () => req<{ posts: Post[] }>('GET', '/admin/posts'),
  adminPost: (id: number) => req<Post>('GET', `/admin/posts/${id}`),
  createPost: (data: Partial<Post>) => req<{ id: number; slug: string }>('POST', '/admin/posts', data),
  updatePost: (id: number, data: Partial<Post>) => req<{ updated: number }>('PUT', `/admin/posts/${id}`, data),
  archivePost: (id: number) => req<{ archived: number }>('DELETE', `/admin/posts/${id}`),
  uploadImage: (base64: string, mime: string) =>
    req<{ url: string }>('POST', '/admin/upload', { data: base64, mime }),
};