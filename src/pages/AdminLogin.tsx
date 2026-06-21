import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';

const C = {
  bg0: '#070A0F', bg1: '#0B1220', bg2: '#101A2B',
  brand: '#2F80FF', text: '#E6EDF7',
  textSec: '#B6C2D1', textMut: '#7A8AA0',
  border: 'rgba(77,163,255,0.15)',
};

export default function AdminLogin() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [show, setShow]         = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const r = await api.login(username, password);
      localStorage.setItem('cms_token', r.token);
      localStorage.setItem('cms_user', r.display_name);
      nav('/admin');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: C.bg0, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="fixed inset-0 pointer-events-none grid-lines grid-fade" style={{ opacity: 0.4 }} />
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(47,128,255,0.08), transparent 70%)' }} />

      <div className="relative w-full" style={{ maxWidth: 420, padding: '0 1.5rem' }}>
        <div className="text-center mb-10">
          <img src={LOGO} alt="АО СОФТ ПЛЮС СИСТЕМС" className="h-14 mx-auto mb-4 object-contain" />
          <h1 className="font-display font-bold text-2xl mb-1" style={{ color: C.text }}>CMS Блог</h1>
          <p className="text-sm" style={{ color: C.textMut }}>АО «СОФТ ПЛЮС СИСТЕМС»</p>
        </div>

        <form onSubmit={submit}
          className="glass-card p-8 flex flex-col gap-5"
          style={{ background: 'rgba(11,18,32,0.9)' }}>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>Логин</label>
            <input value={username} onChange={e => setUsername(e.target.value)}
              placeholder="admin" autoComplete="username"
              className="px-4 py-3 outline-none transition-colors"
              style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }}
              onFocus={e => (e.target.style.borderColor = C.brand)}
              onBlur={e  => (e.target.style.borderColor = C.border)} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>Пароль</label>
            <div className="relative">
              <input value={password} onChange={e => setPassword(e.target.value)}
                type={show ? 'text' : 'password'} autoComplete="current-password"
                className="w-full px-4 py-3 pr-11 outline-none transition-colors"
                style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }}
                onFocus={e => (e.target.style.borderColor = C.brand)}
                onBlur={e  => (e.target.style.borderColor = C.border)} />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: C.textMut }}>
                <Icon name={show ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 text-sm"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              <Icon name="AlertCircle" size={16} /> {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 font-semibold disabled:opacity-50 mt-1">
            {loading ? <><Icon name="Loader" size={18} className="animate-spin" /> Вход...</> : <>Войти <Icon name="ArrowRight" size={18} /></>}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: C.textMut }}>
          Доступ только для администраторов
        </p>
      </div>
    </div>
  );
}