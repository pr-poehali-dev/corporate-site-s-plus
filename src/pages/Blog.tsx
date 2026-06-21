import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { api, Post } from '@/lib/api';

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

export default function Blog() {
  const [posts, setPosts]       = useState<Post[]>([]);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);
  const [category, setCategory] = useState('');
  const [tag, setTag]           = useState('');
  const [loading, setLoading]   = useState(true);

  const PER = 9;

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string | number> = { page, per: PER };
    if (category) params.category = category;
    if (tag) params.tag = tag;
    api.getPosts(params)
      .then(r => { setPosts(r.posts); setTotal(r.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, category, tag]);

  const cats = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));

  return (
    <div style={{ background: C.bg0, minHeight: '100vh', color: C.text }}>
      {/* grid overlay */}
      <div className="fixed inset-0 pointer-events-none grid-lines grid-fade" style={{ opacity: 0.5 }} />

      {/* header */}
      <header className="sticky top-0 z-40 section-pad flex items-center justify-between py-4"
        style={{ background: 'rgba(7,10,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}` }}>
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO} alt="АО СОФТ ПЛЮС СИСТЕМС" className="h-10 w-auto" />
          <span className="font-display font-semibold hidden sm:block" style={{ color: C.text }}>АО «СОФТ ПЛЮС СИСТЕМС»</span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: C.textSec }}
          onMouseEnter={e => (e.currentTarget.style.color = C.text)}
          onMouseLeave={e => (e.currentTarget.style.color = C.textSec)}>
          <Icon name="ArrowLeft" size={16} /> На главную
        </Link>
      </header>

      <main className="section-pad py-20" style={{ maxWidth: 1600, margin: '0 auto' }}>
        {/* hero */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: `linear-gradient(90deg,${C.brand},${C.tech})` }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Блог</span>
          </div>
          <h1 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: C.text }}>
            Экспертиза, статьи и новости
          </h1>
          <p style={{ color: C.textSec }}>Материалы об архитектуре, AI и цифровой трансформации от команды АО «СОФТ ПЛЮС СИСТЕМС».</p>
        </div>

        {/* filters */}
        {cats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => { setCategory(''); setTag(''); setPage(1); }}
              className="px-4 py-2 text-sm transition-colors"
              style={{
                border: `1px solid ${!category ? C.brand : C.border}`,
                background: !category ? 'rgba(47,128,255,0.12)' : 'transparent',
                color: !category ? C.brand : C.textSec,
              }}>
              Все
            </button>
            {cats.map(c => (
              <button key={c} onClick={() => { setCategory(c!); setTag(''); setPage(1); }}
                className="px-4 py-2 text-sm transition-colors"
                style={{
                  border: `1px solid ${category === c ? C.brand : C.border}`,
                  background: category === c ? 'rgba(47,128,255,0.12)' : 'transparent',
                  color: category === c ? C.brand : C.textSec,
                }}>
                {c}
              </button>
            ))}
          </div>
        )}

        {/* grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: C.borderS }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-8" style={{ background: C.bg1, minHeight: 280 }}>
                <div className="animate-pulse space-y-4">
                  <div className="h-3 w-20 rounded" style={{ background: C.bg2 }} />
                  <div className="h-48 rounded" style={{ background: C.bg2 }} />
                  <div className="h-4 w-3/4 rounded" style={{ background: C.bg2 }} />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24" style={{ color: C.textMut }}>
            <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-display text-xl">Статей пока нет</p>
            <p className="text-sm mt-2">Первая публикация появится совсем скоро</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: C.borderS, border: `1px solid ${C.borderS}` }}>
            {posts.map(p => (
              <Link key={p.id} to={`/blog/${p.slug}`}
                className="group block transition-all duration-300"
                style={{ background: C.bg1 }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bg2)}
                onMouseLeave={e => (e.currentTarget.style.background = C.bg1)}>
                {p.cover_url && (
                  <div className="overflow-hidden" style={{ height: 200 }}>
                    <img src={p.cover_url} alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    {p.category && (
                      <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: C.brand }}>{p.category}</span>
                    )}
                    {p.tags?.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5"
                        style={{ border: `1px solid ${C.borderS}`, color: C.textMut }}>#{t}</span>
                    ))}
                  </div>
                  <h2 className="font-display text-xl font-semibold mb-3 group-hover:text-gradient transition-colors line-clamp-2"
                    style={{ color: C.text }}>{p.title}</h2>
                  {p.excerpt && (
                    <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: C.textSec }}>{p.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: C.textMut }}>{formatDate(p.published_at)}</span>
                    <Icon name="ArrowUpRight" size={18} className="group-hover:text-brand transition-colors"
                      style={{ color: C.textMut } as React.CSSProperties} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* pagination */}
        {total > PER && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="px-5 py-2.5 text-sm transition-colors disabled:opacity-30"
              style={{ border: `1px solid ${C.border}`, color: C.textSec }}>
              ← Назад
            </button>
            <span className="text-sm" style={{ color: C.textMut }}>
              {page} / {Math.ceil(total / PER)}
            </span>
            <button disabled={page >= Math.ceil(total / PER)} onClick={() => setPage(p => p + 1)}
              className="px-5 py-2.5 text-sm transition-colors disabled:opacity-30"
              style={{ border: `1px solid ${C.border}`, color: C.textSec }}>
              Вперёд →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
