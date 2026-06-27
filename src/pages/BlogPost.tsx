import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { api, Post } from '@/lib/api';
import { mdToHtml } from '@/lib/mdToHtml';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';

const C = {
  bg0: '#070A0F', bg1: '#0B1220', bg2: '#101A2B',
  brand: '#2F80FF', tech: '#00C2FF', text: '#E6EDF7',
  textSec: '#B6C2D1', textMut: '#7A8AA0',
  border: 'rgba(77,163,255,0.15)', borderS: 'rgba(255,255,255,0.05)',
};

function formatDate(s?: string) {
  if (!s) return '';
  return new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost]   = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getPost(slug)
      .then(setPost)
      .catch(() => setError('Статья не найдена'))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div style={{ background: C.bg0, minHeight: '100vh', color: C.text }}>
      <div className="fixed inset-0 pointer-events-none grid-lines grid-fade" style={{ opacity: 0.4 }} />

      <header className="sticky top-0 z-40 section-pad flex items-center justify-between py-4"
        style={{ background: 'rgba(7,10,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}` }}>
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO} alt="АО СОФТ ПЛЮС СИСТЕМС" className="h-10 w-auto" />
          <span className="font-display font-semibold hidden sm:block" style={{ color: C.text }}>АО «СОФТ ПЛЮС СИСТЕМС»</span>
        </Link>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm" style={{ color: C.textSec }}
          onMouseEnter={e => (e.currentTarget.style.color = C.text)}
          onMouseLeave={e => (e.currentTarget.style.color = C.textSec)}>
          <Icon name="ArrowLeft" size={16} /> Все статьи
        </Link>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '4rem clamp(1.25rem,4vw,3rem)' }}>
        {loading && (
          <div className="animate-pulse space-y-6 pt-10">
            <div className="h-8 w-2/3 rounded" style={{ background: C.bg2 }} />
            <div className="h-4 w-1/3 rounded" style={{ background: C.bg2 }} />
            <div className="h-64 rounded" style={{ background: C.bg2 }} />
            {[...Array(5)].map((_, i) => <div key={i} className="h-4 rounded" style={{ background: C.bg2 }} />)}
          </div>
        )}

        {error && (
          <div className="text-center py-24">
            <Icon name="FileX" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-display text-2xl mb-4" style={{ color: C.text }}>{error}</p>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm" style={{ color: C.brand }}>
              <Icon name="ArrowLeft" size={16} /> Вернуться к блогу
            </Link>
          </div>
        )}

        {post && (
          <article>
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-xs mb-8" style={{ color: C.textMut }}>
              <Link to="/" style={{ color: C.textMut }}
                onMouseEnter={e => (e.currentTarget.style.color = C.brand)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textMut)}>Главная</Link>
              <span>/</span>
              <Link to="/blog" style={{ color: C.textMut }}
                onMouseEnter={e => (e.currentTarget.style.color = C.brand)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textMut)}>Блог</Link>
              <span>/</span>
              <span style={{ color: C.textSec }}>{post.title}</span>
            </div>

            {/* meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.category && (
                <span className="text-xs uppercase tracking-[0.25em]" style={{ color: C.brand }}>{post.category}</span>
              )}
              {post.tags?.map(t => (
                <span key={t} className="text-xs px-2 py-0.5"
                  style={{ border: `1px solid ${C.borderS}`, color: C.textMut }}>#{t}</span>
              ))}
            </div>

            <h1 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', color: C.text, lineHeight: 1.05 }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-5 mb-10 pb-8" style={{ borderBottom: `1px solid ${C.borderS}` }}>
              {post.author && <span className="text-sm" style={{ color: C.textSec }}>{post.author}</span>}
              {post.author && <span style={{ color: C.borderS }}>|</span>}
              <span className="text-sm" style={{ color: C.textMut }}>{formatDate(post.published_at)}</span>
            </div>

            {post.cover_url && (
              <div className="mb-10 overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                <img src={post.cover_url} alt={post.title} className="w-full object-cover" style={{ maxHeight: 480 }} />
              </div>
            )}

            {post.excerpt && (
              <p className="text-lg mb-8 leading-relaxed font-medium" style={{ color: C.textSec, borderLeft: `3px solid ${C.brand}`, paddingLeft: '1.25rem' }}>
                {post.excerpt}
              </p>
            )}

            {/* content */}
            <div className="prose-blog" style={{ color: C.textSec }}
              dangerouslySetInnerHTML={{ __html: mdToHtml(post.content || '') }} />

            {/* keywords */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${C.borderS}` }}>
                <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: C.textMut }}>Ключевые слова</p>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map(k => (
                    <span key={k} className="text-xs px-3 py-1"
                      style={{ border: `1px solid ${C.border}`, color: C.textSec, background: 'rgba(47,128,255,0.05)' }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                style={{ color: C.brand }}>
                <Icon name="ArrowLeft" size={16} /> Все статьи
              </Link>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}