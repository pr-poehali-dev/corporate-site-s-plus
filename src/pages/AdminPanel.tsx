import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { api, Post } from '@/lib/api';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';

const C = {
  bg0: '#070A0F', bg1: '#0B1220', bg2: '#101A2B',
  brand: '#2F80FF', tech: '#00C2FF', signal: '#00D38A',
  text: '#E6EDF7', textSec: '#B6C2D1', textMut: '#7A8AA0',
  border: 'rgba(77,163,255,0.15)', borderS: 'rgba(255,255,255,0.05)',
};

const empty: Partial<Post> = {
  title: '', excerpt: '', content: '', cover_url: '',
  category: '', tags: [], keywords: [], is_published: false,
};

function TagInput({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [inp, setInp] = useState('');
  const add = () => {
    const v = inp.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setInp('');
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>{label}</label>
      <div className="flex flex-wrap gap-2 min-h-[42px] px-3 py-2"
        style={{ background: C.bg2, border: `1px solid ${C.border}` }}>
        {value.map(t => (
          <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs"
            style={{ background: 'rgba(47,128,255,0.15)', border: `1px solid ${C.border}`, color: C.brand }}>
            {t}
            <button type="button" onClick={() => onChange(value.filter(x => x !== t))} style={{ color: C.textMut }}>×</button>
          </span>
        ))}
        <input value={inp} onChange={e => setInp(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }}
          placeholder="Введите и нажмите Enter"
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
          style={{ color: C.text }}
          onBlur={add} />
      </div>
    </div>
  );
}

function Inp({ label, value, onChange, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>{label}</label>
      <input type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="px-4 py-3 outline-none transition-colors"
        style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }}
        onFocus={e => (e.target.style.borderColor = C.brand)}
        onBlur={e  => (e.target.style.borderColor = C.border)} />
    </div>
  );
}

export default function AdminPanel() {
  const nav = useNavigate();
  const user = localStorage.getItem('cms_user') || 'Администратор';

  const [posts, setPosts]     = useState<Post[]>([]);
  const [view, setView]       = useState<'list' | 'edit'>('list');
  const [form, setForm]       = useState<Partial<Post>>(empty);
  const [editId, setEditId]   = useState<number | null>(null);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = localStorage.getItem('cms_token');
    if (!t) { nav('/admin/login'); return; }
    loadPosts();
  }, []);

  function logout() {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    nav('/admin/login');
  }

  async function loadPosts() {
    try {
      const r = await api.adminPosts();
      setPosts(r.posts);
    } catch {
      logout();
    }
  }

  function newPost() {
    setForm(empty); setEditId(null); setView('edit');
  }

  function editPost(p: Post) {
    setForm({ ...p, tags: p.tags || [], keywords: p.keywords || [] });
    setEditId(p.id); setView('edit');
  }

  async function save(publish?: boolean) {
    setSaving(true); setMsg('');
    const data = { ...form };
    if (publish !== undefined) data.is_published = publish;
    try {
      if (editId) {
        await api.updatePost(editId, data);
      } else {
        await api.createPost(data);
      }
      setMsg('Сохранено!');
      await loadPosts();
      setTimeout(() => { setView('list'); setMsg(''); }, 800);
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  }

  async function archive(id: number) {
    if (!confirm('Снять публикацию?')) return;
    await api.archivePost(id);
    await loadPosts();
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const b64 = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res((r.result as string).split(',')[1]);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const { url } = await api.uploadImage(b64, file.type);
      setForm(f => ({ ...f, cover_url: url }));
    } catch {
      setMsg('Ошибка загрузки изображения');
    } finally {
      setUploading(false);
    }
  }

  const set = (k: keyof Post) => (v: unknown) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ background: C.bg0, minHeight: '100vh', color: C.text }}>
      <div className="fixed inset-0 pointer-events-none grid-lines grid-fade" style={{ opacity: 0.3 }} />

      {/* header */}
      <header className="sticky top-0 z-40 flex items-center justify-between py-3 px-6"
        style={{ background: 'rgba(7,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}` }}>
        <div className="flex items-center gap-4">
          <img src={LOGO} alt="" className="h-9 w-auto" />
          <div>
            <div className="font-display font-semibold text-sm" style={{ color: C.text }}>CMS Блог</div>
            <div className="text-[10px]" style={{ color: C.textMut }}>АО «СОФТ ПЛЮС СИСТЕМС»</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:block" style={{ color: C.textSec }}>{user}</span>
          <a href="/blog" target="_blank" className="inline-flex items-center gap-1 text-xs px-3 py-1.5 transition-colors"
            style={{ border: `1px solid ${C.border}`, color: C.textSec }}>
            <Icon name="ExternalLink" size={14} /> Блог
          </a>
          <button onClick={logout} className="inline-flex items-center gap-1 text-xs px-3 py-1.5"
            style={{ border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
            <Icon name="LogOut" size={14} /> Выйти
          </button>
        </div>
      </header>

      <div className="relative" style={{ maxWidth: 1400, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* LIST VIEW */}
        {view === 'list' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display font-bold text-2xl" style={{ color: C.text }}>Статьи</h1>
                <p className="text-sm mt-1" style={{ color: C.textMut }}>{posts.length} материалов в базе</p>
              </div>
              <button onClick={newPost}
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
                <Icon name="Plus" size={18} /> Новая статья
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-24 glass-card">
                <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-display text-xl mb-2" style={{ color: C.text }}>Статей пока нет</p>
                <p className="text-sm mb-6" style={{ color: C.textMut }}>Создайте первую публикацию</p>
                <button onClick={newPost} className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
                  <Icon name="Plus" size={16} /> Создать
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
                {/* table header */}
                <div className="grid gap-4 px-5 py-3 text-xs uppercase tracking-wider"
                  style={{ gridTemplateColumns: '1fr 140px 100px 180px 100px', background: C.bg2, color: C.textMut }}>
                  <span>Заголовок</span>
                  <span>Категория</span>
                  <span>Статус</span>
                  <span>Обновлено</span>
                  <span></span>
                </div>
                {posts.map(p => (
                  <div key={p.id} className="grid gap-4 px-5 py-4 items-center transition-colors"
                    style={{ gridTemplateColumns: '1fr 140px 100px 180px 100px', background: C.bg1 }}
                    onMouseEnter={e => (e.currentTarget.style.background = C.bg2)}
                    onMouseLeave={e => (e.currentTarget.style.background = C.bg1)}>
                    <div>
                      <div className="font-display font-semibold text-sm line-clamp-1" style={{ color: C.text }}>{p.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: C.textMut }}>/blog/{p.slug}</div>
                    </div>
                    <span className="text-xs" style={{ color: C.textSec }}>{p.category || '—'}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 w-fit"
                      style={{
                        background: p.is_published ? 'rgba(0,211,138,0.1)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${p.is_published ? 'rgba(0,211,138,0.3)' : C.borderS}`,
                        color: p.is_published ? C.signal : C.textMut,
                      }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.is_published ? C.signal : C.textMut }} />
                      {p.is_published ? 'Опубликовано' : 'Черновик'}
                    </span>
                    <span className="text-xs" style={{ color: C.textMut }}>
                      {p.updated_at ? new Date(p.updated_at).toLocaleString('ru-RU') : '—'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => editPost(p)} title="Редактировать"
                        className="p-1.5 transition-colors" style={{ color: C.textMut }}
                        onMouseEnter={e => ((e.target as HTMLElement).style.color = C.brand)}
                        onMouseLeave={e => ((e.target as HTMLElement).style.color = C.textMut)}>
                        <Icon name="Pencil" size={16} />
                      </button>
                      {p.is_published && (
                        <button onClick={() => archive(p.id)} title="Снять с публикации"
                          className="p-1.5 transition-colors" style={{ color: C.textMut }}
                          onMouseEnter={e => ((e.target as HTMLElement).style.color = '#f87171')}
                          onMouseLeave={e => ((e.target as HTMLElement).style.color = C.textMut)}>
                          <Icon name="EyeOff" size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* EDIT VIEW */}
        {view === 'edit' && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setView('list')} className="inline-flex items-center gap-2 text-sm"
                style={{ color: C.textMut }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textMut)}>
                <Icon name="ArrowLeft" size={16} /> Назад
              </button>
              <h1 className="font-display font-bold text-2xl" style={{ color: C.text }}>
                {editId ? 'Редактировать статью' : 'Новая статья'}
              </h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* main */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <Inp label="Заголовок *" value={form.title || ''} onChange={set('title')} placeholder="Введите заголовок" />

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>Краткое описание (excerpt)</label>
                  <textarea value={form.excerpt || ''} onChange={e => set('excerpt')(e.target.value)}
                    placeholder="Краткое описание для карточки в списке..." rows={3}
                    className="px-4 py-3 outline-none transition-colors resize-none"
                    style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }}
                    onFocus={e => (e.target.style.borderColor = C.brand)}
                    onBlur={e  => (e.target.style.borderColor = C.border)} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>Текст статьи *</label>
                  <textarea value={form.content || ''} onChange={e => set('content')(e.target.value)}
                    placeholder="Основной текст статьи..." rows={18}
                    className="px-4 py-3 outline-none transition-colors resize-y font-mono text-sm"
                    style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text, minHeight: 400 }}
                    onFocus={e => (e.target.style.borderColor = C.brand)}
                    onBlur={e  => (e.target.style.borderColor = C.border)} />
                  <p className="text-xs" style={{ color: C.textMut }}>Поддерживается обычный текст с переносами строк</p>
                </div>
              </div>

              {/* sidebar */}
              <div className="flex flex-col gap-5">
                {/* actions */}
                <div className="glass-card p-5 flex flex-col gap-3">
                  <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: C.textMut }}>Публикация</div>
                  <button onClick={() => save(true)} disabled={saving || !form.title || !form.content}
                    className="btn-primary flex items-center justify-center gap-2 py-3 text-sm font-semibold disabled:opacity-40">
                    {saving ? <Icon name="Loader" size={16} className="animate-spin" /> : <Icon name="Globe" size={16} />}
                    Опубликовать
                  </button>
                  <button onClick={() => save(false)} disabled={saving || !form.title || !form.content}
                    className="flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors disabled:opacity-40"
                    style={{ border: `1px solid ${C.border}`, color: C.textSec, background: 'transparent' }}>
                    <Icon name="Save" size={16} /> Сохранить черновик
                  </button>
                  {msg && (
                    <p className="text-sm text-center py-2"
                      style={{ color: msg.includes('Сохранено') ? C.signal : '#f87171' }}>
                      {msg}
                    </p>
                  )}
                </div>

                {/* cover */}
                <div className="glass-card p-5">
                  <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: C.textMut }}>Обложка</div>
                  {form.cover_url && (
                    <div className="mb-3 overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                      <img src={form.cover_url} alt="" className="w-full object-cover" style={{ maxHeight: 160 }} />
                    </div>
                  )}
                  <Inp label="URL изображения" value={form.cover_url || ''} onChange={set('cover_url')} placeholder="https://..." />
                  <div className="mt-3 text-center">
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                    <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                      className="inline-flex items-center gap-2 text-xs px-4 py-2 transition-colors disabled:opacity-40"
                      style={{ border: `1px solid ${C.border}`, color: C.textSec }}>
                      {uploading ? <><Icon name="Loader" size={14} className="animate-spin" /> Загрузка...</>
                        : <><Icon name="Upload" size={14} /> Загрузить файл</>}
                    </button>
                  </div>
                </div>

                {/* meta */}
                <div className="glass-card p-5 flex flex-col gap-4">
                  <div className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>Мета-данные</div>
                  <Inp label="Категория" value={form.category || ''} onChange={set('category')} placeholder="AI, Разработка, Консалтинг..." />
                  <TagInput label="Теги (Enter для добавления)" value={form.tags || []} onChange={set('tags')} />
                  <TagInput label="Ключевые слова (SEO)" value={form.keywords || []} onChange={set('keywords')} />
                  <Inp label="Слаг URL (авто)" value={form.slug || ''} onChange={set('slug')} placeholder="оставьте пустым для авто" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
