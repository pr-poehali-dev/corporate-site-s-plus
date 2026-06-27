import { useEffect, useRef, useState, useCallback } from 'react';
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

  const addMany = (raw: string, current: string[]) => {
    const parts = raw.split(/[,،،]+/).map(s => s.trim()).filter(Boolean);
    if (!parts.length) return current;
    const next = [...current];
    for (const p of parts) {
      if (!next.includes(p)) next.push(p);
    }
    return next;
  };

  const add = (text = inp) => {
    const next = addMany(text, value);
    if (next.length !== value.length) onChange(next);
    setInp('');
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text');
    if (pasted.includes(',')) {
      e.preventDefault();
      const next = addMany(pasted, value);
      onChange(next);
      setInp('');
    }
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
          onPaste={handlePaste}
          placeholder="Введите и нажмите Enter"
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
          style={{ color: C.text }}
          onBlur={() => add()} />
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

const SITE_PAGES = [
  { label: 'Главная', path: '/' },
  { label: 'Продукты', path: '/products' },
  { label: 'Лихие 90-е', path: '/products/lihie-90e' },
  { label: 'О компании', path: '/about' },
  { label: 'Блог', path: '/blog' },
  { label: 'Карьера', path: '/career' },
  { label: 'Контакты', path: '/contacts' },
];

function mdToHtml(md: string): string {
  let s = md;
  // headings
  s = s.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  s = s.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  s = s.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  // hr
  s = s.replace(/^---+$/gm, '<hr/>');
  // blockquote
  s = s.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  // code block
  s = s.replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  // inline code
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // bold + italic
  s = s.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // underline ++ strikethrough ~~
  s = s.replace(/\+\+(.+?)\+\+/g, '<u>$1</u>');
  s = s.replace(/~~(.+?)~~/g, '<s>$1</s>');
  // links
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // images
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>');
  // center
  s = s.replace(/^->(.*?)<-$/gm, '<div style="text-align:center">$1</div>');
  // markdown tables
  s = s.replace(/(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)*)/g, (tbl) => {
    const rows = tbl.trim().split('\n');
    const head = rows[0].split('|').filter(Boolean).map(c => `<th>${c.trim()}</th>`).join('');
    const body = rows.slice(2).map(r =>
      '<tr>' + r.split('|').filter(Boolean).map(c => `<td>${c.trim()}</td>`).join('') + '</tr>'
    ).join('');
    return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  });
  // unordered list
  s = s.replace(/(^[-*] .+$\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^[-*] /, '').trim()}</li>`).join('');
    return `<ul>${items}</ul>`;
  });
  // ordered list
  s = s.replace(/(^\d+\. .+$\n?)+/gm, (block) => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '').trim()}</li>`).join('');
    return `<ol>${items}</ol>`;
  });
  // paragraphs: wrap plain lines
  s = s.replace(/^(?!<[a-z/]).+$/gm, (line) => line ? `<p>${line}</p>` : '');
  return s;
}

type ToolBtn = { icon: string; title: string; action: () => void; active?: boolean };

function TBtn({ icon, title, action, active }: ToolBtn) {
  return (
    <button type="button" title={title} onClick={action}
      className="w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0"
      style={{ background: active ? 'rgba(47,128,255,0.18)' : 'transparent', color: active ? C.brand : C.textSec, border: 'none' }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = C.text; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.textSec; } }}>
      <Icon name={icon} size={15} />
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 flex-shrink-0" style={{ background: C.border }} />;
}

function ContentEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [showLink, setShowLink] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [tableRows, setTableRows] = useState('3');
  const [tableCols, setTableCols] = useState('3');

  const wrap = useCallback((before: string, after = before, placeholder = '') => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    onChange(next);
    setTimeout(() => {
      ta.focus();
      const ns = s + before.length;
      ta.setSelectionRange(ns, ns + sel.length);
    }, 0);
  }, [value, onChange]);

  const insertAt = useCallback((text: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const next = value.slice(0, s) + text + value.slice(s);
    onChange(next);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(s + text.length, s + text.length); }, 0);
  }, [value, onChange]);

  const prefixLines = useCallback((prefix: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const lines = value.slice(s, e || value.length).split('\n').map(l => prefix + l).join('\n');
    const next = value.slice(0, s) + lines + value.slice(e || value.length);
    onChange(next);
    setTimeout(() => { ta.focus(); }, 0);
  }, [value, onChange]);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text');
    if (/^#+ |^\*\*|^\* |\[.+\]\(|^> |^---/.test(text)) {
      e.preventDefault();
      insertAt(text);
    }
  };

  const insertTable = () => {
    const r = parseInt(tableRows) || 3;
    const c = parseInt(tableCols) || 3;
    const header = '| ' + Array(c).fill('Заголовок').map((h, i) => `${h} ${i + 1}`).join(' | ') + ' |';
    const sep = '| ' + Array(c).fill('---').join(' | ') + ' |';
    const rows = Array(r).fill(null).map(() => '| ' + Array(c).fill('Ячейка').join(' | ') + ' |').join('\n');
    insertAt('\n' + header + '\n' + sep + '\n' + rows + '\n');
    setShowTable(false);
  };

  const insertLink = () => {
    const text = linkText || 'ссылка';
    insertAt(`[${text}](${linkUrl})`);
    setShowLink(false); setLinkText(''); setLinkUrl('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res((r.result as string).split(',')[1]);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    try {
      const { url } = await import('@/lib/api').then(m => m.api.uploadImage(b64, file.type));
      insertAt(`![${file.name}](${url})`);
    } catch { /* ignore */ }
    e.target.value = '';
  };

  const toolGroups: ToolBtn[][] = [
    [
      { icon: 'Heading1', title: 'H1', action: () => prefixLines('# ') },
      { icon: 'Heading2', title: 'H2', action: () => prefixLines('## ') },
      { icon: 'Heading3', title: 'H3', action: () => prefixLines('### ') },
    ],
    [
      { icon: 'Bold',          title: 'Жирный (Ctrl+B)',     action: () => wrap('**', '**', 'жирный текст') },
      { icon: 'Italic',        title: 'Курсив (Ctrl+I)',     action: () => wrap('*', '*', 'курсив') },
      { icon: 'Underline',     title: 'Подчёркнутый',       action: () => wrap('++', '++', 'подчёркнутый') },
      { icon: 'Strikethrough', title: 'Зачёркнутый',        action: () => wrap('~~', '~~', 'зачёркнутый') },
    ],
    [
      { icon: 'AlignCenter',   title: 'По центру',          action: () => wrap('->', '<-', 'текст по центру') },
    ],
    [
      { icon: 'List',          title: 'Маркированный список', action: () => prefixLines('- ') },
      { icon: 'ListOrdered',   title: 'Нумерованный список', action: () => prefixLines('1. ') },
      { icon: 'Quote',         title: 'Цитата',             action: () => prefixLines('> ') },
    ],
    [
      { icon: 'Code',          title: 'Код',                action: () => wrap('`', '`', 'код') },
      { icon: 'SquareCode',    title: 'Блок кода',          action: () => insertAt('\n```\nкод здесь\n```\n') },
      { icon: 'SeparatorHorizontal', title: 'Разделитель',  action: () => insertAt('\n---\n') },
    ],
    [
      { icon: 'Link',          title: 'Ссылка',             action: () => { const ta = taRef.current; if (ta) { const sel = value.slice(ta.selectionStart, ta.selectionEnd).trim(); if (sel) setLinkText(sel); } setShowLink(v => !v); setShowTable(false); } },
      { icon: 'Table2',        title: 'Таблица',            action: () => { setShowTable(v => !v); setShowLink(false); } },
      { icon: 'ImagePlus',     title: 'Изображение',        action: () => fileRef.current?.click() },
    ],
    [
      { icon: 'RemoveFormatting', title: 'Очистить форматирование', action: () => {
        const ta = taRef.current;
        if (!ta) return;
        const s = ta.selectionStart, e = ta.selectionEnd;
        const sel = value.slice(s, e);
        const clean = sel.replace(/[*_~`#>|+\-]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // eslint-disable-line no-useless-escape
        const next = value.slice(0, s) + clean + value.slice(e);
        onChange(next);
      }},
    ],
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') { e.preventDefault(); wrap('**', '**', 'жирный текст'); }
      if (e.key === 'i') { e.preventDefault(); wrap('*', '*', 'курсив'); }
    }
  };

  return (
    <div className="flex flex-col gap-0">
      <label className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: C.textMut }}>Текст статьи *</label>

      {/* tabs */}
      <div className="flex items-center justify-between px-3"
        style={{ background: C.bg1, border: `1px solid ${C.border}`, borderBottom: 'none' }}>
        <div className="flex">
          {(['edit', 'preview'] as const).map(t => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className="px-4 py-2.5 text-xs font-semibold transition-colors"
              style={{
                color: tab === t ? C.brand : C.textMut,
                borderBottom: tab === t ? `2px solid ${C.brand}` : '2px solid transparent',
              }}>
              {t === 'edit' ? 'Редактор' : 'Превью'}
            </button>
          ))}
        </div>
        <span className="text-xs" style={{ color: C.textMut }}>{value.length} симв.</span>
      </div>

      {/* toolbar */}
      {tab === 'edit' && (
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5"
          style={{ background: C.bg2, border: `1px solid ${C.border}`, borderTop: 'none', borderBottom: 'none' }}>
          {toolGroups.map((group, gi) => (
            <div key={gi} className="flex items-center gap-0.5">
              {gi > 0 && <Divider />}
              {group.map(btn => <TBtn key={btn.title} {...btn} />)}
            </div>
          ))}
        </div>
      )}

      {/* link panel */}
      {tab === 'edit' && showLink && (
        <div className="p-4 flex flex-col gap-3" style={{ background: C.bg1, border: `1px solid ${C.brand}`, borderTop: 'none', borderBottom: 'none' }}>
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.brand }}>Вставка ссылки</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: C.textMut }}>Текст</span>
              <input value={linkText} onChange={e => setLinkText(e.target.value)} placeholder="Текст ссылки"
                className="px-3 py-2 text-sm outline-none" style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: C.textMut }}>URL</span>
              <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://... или /путь"
                className="px-3 py-2 text-sm outline-none" style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs" style={{ color: C.textMut }}>Страницы:</span>
            {SITE_PAGES.map(p => (
              <button key={p.path} type="button" onClick={() => setLinkUrl(p.path)}
                className="px-2 py-1 text-xs transition-colors"
                style={{ border: `1px solid ${linkUrl === p.path ? C.brand : C.border}`, color: linkUrl === p.path ? C.brand : C.textMut, background: linkUrl === p.path ? 'rgba(47,128,255,0.1)' : 'transparent' }}>
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={insertLink} disabled={!linkUrl}
              className="px-4 py-2 text-sm font-semibold disabled:opacity-40"
              style={{ background: `linear-gradient(135deg,${C.brand},${C.tech})`, color: '#fff' }}>Вставить</button>
            <button type="button" onClick={() => { setShowLink(false); setLinkText(''); setLinkUrl(''); }}
              className="px-4 py-2 text-sm" style={{ border: `1px solid ${C.border}`, color: C.textMut }}>Отмена</button>
          </div>
        </div>
      )}

      {/* table panel */}
      {tab === 'edit' && showTable && (
        <div className="p-4 flex flex-col gap-3" style={{ background: C.bg1, border: `1px solid ${C.brand}`, borderTop: 'none', borderBottom: 'none' }}>
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.brand }}>Вставка таблицы</div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: C.textMut }}>Строк</span>
              <input type="number" min="1" max="20" value={tableRows} onChange={e => setTableRows(e.target.value)}
                className="w-20 px-3 py-2 text-sm outline-none" style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: C.textMut }}>Колонок</span>
              <input type="number" min="1" max="10" value={tableCols} onChange={e => setTableCols(e.target.value)}
                className="w-20 px-3 py-2 text-sm outline-none" style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }} />
            </div>
            <button type="button" onClick={insertTable}
              className="px-4 py-2 text-sm font-semibold self-end"
              style={{ background: `linear-gradient(135deg,${C.brand},${C.tech})`, color: '#fff' }}>Вставить</button>
            <button type="button" onClick={() => setShowTable(false)}
              className="px-4 py-2 text-sm self-end" style={{ border: `1px solid ${C.border}`, color: C.textMut }}>Отмена</button>
          </div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

      {tab === 'edit' ? (
        <textarea ref={taRef} value={value} onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown} onPaste={handlePaste}
          placeholder={`# Заголовок статьи\n\nНачните писать или вставьте текст с Markdown-разметкой...\n\n**Жирный**, *курсив*, [ссылка](/contacts)\n\n- Пункт 1\n- Пункт 2`}
          rows={22}
          className="px-4 py-4 outline-none resize-y font-mono text-sm leading-relaxed"
          style={{ background: C.bg2, border: `1px solid ${C.border}`, borderTop: (showLink || showTable) ? 'none' : `1px solid ${C.border}`, color: C.text, minHeight: 450 }}
          onFocus={e => (e.target.style.borderColor = C.brand)}
          onBlur={e  => (e.target.style.borderColor = C.border)} />
      ) : (
        <div className="md-preview px-6 py-6 overflow-auto"
          style={{ background: C.bg2, border: `1px solid ${C.border}`, minHeight: 450 }}
          dangerouslySetInnerHTML={{ __html: mdToHtml(value) || '<p style="color:#7A8AA0;font-style:italic">Пусто — начните писать в режиме редактора</p>' }} />
      )}

      <style>{`
        .md-preview h1,.md-preview h2,.md-preview h3{font-family:inherit}
      `}</style>

      <p className="text-xs mt-1" style={{ color: C.textMut }}>
        Поддерживается Markdown: **жирный**, *курсив*, # Заголовки, - списки, [ссылка](url), {'`'}код{'`'}, {'>'} цитата, --- разделитель, -{'>'} центр {'<-'}
      </p>
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
    } catch (e: unknown) {
      // Выкидываем только при явной ошибке авторизации (401), не при сетевых ошибках
      const msg = e instanceof Error ? e.message : '';
      if (msg.includes('авторизаци') || msg.includes('401') || msg.includes('Unauthorized')) {
        logout();
      }
      // иначе просто показываем пустой список — не выгоняем пользователя
    }
  }

  function newPost() {
    setForm(empty); setEditId(null); setView('edit');
  }

  async function editPost(p: Post) {
    // Сначала открываем форму с базовыми данными
    setForm({ ...p, tags: p.tags || [], keywords: p.keywords || [] });
    setEditId(p.id); setView('edit');
    // Затем догружаем полную статью (с content, excerpt, keywords)
    try {
      const full = await api.adminPost(p.id);
      setForm({ ...full, tags: full.tags || [], keywords: full.keywords || [] });
    } catch {
      // оставляем то что уже есть
    }
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

                <ContentEditor
                  value={form.content || ''}
                  onChange={v => set('content')(v)}
                />
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