import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { api, Post } from '@/lib/api';

/* Максимальная ширина контейнера для 2K/4K — контент центрируется */
const WRAP = { maxWidth: 1680, margin: '0 auto', width: '100%' };

const LOGO     = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const HERO_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/04cb0faf-bf58-41b4-9e40-aa2213f851e0.png';
const DEV_IMG  = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/927a7206-245d-4419-833b-ebebe282a50b.png';
const GAME_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/a481b456-4750-4058-a433-925f36e12555.png';

const NAV = [
  { label: 'Направления', id: 'services',  href: '' },
  { label: 'Технологии',  id: 'tech',      href: '' },
  { label: 'О компании',  id: 'about',     href: '' },
  { label: 'Блог',        id: '',          href: '/blog' },
  { label: 'Карьера',     id: 'career',    href: '' },
  { label: 'Контакты',    id: 'contacts',  href: '' },
];

const HERO_TAGS = [
  { title: 'Разработка ПО',          side: 'left',  top: '14%' },
  { title: 'Консалтинг',             side: 'left',  top: '44%' },
  { title: 'Игровые проекты',        side: 'left',  top: '73%' },
  { title: 'AI и автоматизация',     side: 'right', top: '10%' },
  { title: 'Маркетинг tech-компаний',side: 'right', top: '40%' },
  { title: 'Платформа С+',           side: 'right', top: '70%' },
];

const SERVICES = [
  { icon: 'Code2',        title: 'Разработка ПО',        desc: 'Корпоративные системы, веб-платформы, мобильные приложения и сложные интеграции.' },
  { icon: 'BrainCircuit', title: 'AI и автоматизация',   desc: 'Внедряем искусственный интеллект, автоматизируем процессы и создаём умные сервисы.' },
  { icon: 'Gamepad2',     title: 'Игровые проекты',      desc: 'Создаём игры и игровые миры. Флагманский проект — «Лихие 90-е».' },
  { icon: 'LineChart',    title: 'Консалтинг',           desc: 'Цифровая стратегия, IT-архитектура, проектирование и оптимизация процессов.' },
  { icon: 'Megaphone',    title: 'Маркетинг',            desc: 'Продвижение технологических продуктов и компаний на B2B и B2C рынках.' },
  { icon: 'Layers',       title: 'Платформа С+',         desc: 'Технологическая платформа для создания масштабируемых цифровых решений.' },
];

const WHY = [
  { icon: 'Workflow',    t: 'Полный цикл разработки',        d: 'От анализа и архитектуры до поддержки и развития' },
  { icon: 'BrainCircuit',t: 'AI-first подход',               d: 'Используем ИИ для создания умных систем и автоматизации' },
  { icon: 'Building2',   t: 'Enterprise экспертиза',         d: 'Строим решения уровня крупных корпораций и госструктур' },
  { icon: 'Handshake',   t: 'Гибкие модели сотрудничества', d: 'Адаптируемся под задачи клиента, обеспечиваем независимость' },
  { icon: 'ShieldCheck', t: 'Российская компания',           d: 'Локальная команда, понимание рынка и полная независимость' },
  { icon: 'Target',      t: 'Фокус на результат',           d: 'Измеримые KPI, прозрачность и ответственность' },
];

const PRODUCTS = [
  { tag: 'AI-сервисы', title: 'AI-сервисы в разработке',      desc: 'Интеллектуальные сервисы для бизнеса на базе современных моделей ИИ.', soon: true, icon: 'Sparkles' },
  { tag: 'SaaS',       title: 'SaaS-платформы в разработке',  desc: 'Облачные продукты для автоматизации бизнес-процессов.',                soon: true, icon: 'Cloud' },
  { tag: 'Игры',       title: 'Новые игровые проекты',        desc: 'Работаем над новыми игровыми вселенными и механиками.',                soon: true, icon: 'Gamepad2' },
];

const TECH = [
  { icon: 'BrainCircuit',   name: 'AI / Machine Learning' },
  { icon: 'MessagesSquare', name: 'LLM / NLP' },
  { icon: 'Database',       name: 'Big Data' },
  { icon: 'Cloud',          name: 'Cloud' },
  { icon: 'Infinity',       name: 'DevOps' },
  { icon: 'Boxes',          name: 'Microservices' },
  { icon: 'ShieldCheck',    name: 'Cybersecurity' },
  { icon: 'Network',        name: 'API / Integration' },
  { icon: 'Cpu',            name: 'IoT' },
  { icon: 'Hexagon',        name: 'Blockchain' },
];

const PROCESS = [
  { n: '01', t: 'Анализируем задачу',        d: 'Погружаемся в бизнес и формируем видение решения' },
  { n: '02', t: 'Проектируем решение',       d: 'Архитектура, прототипы, оценка сроков и бюджета' },
  { n: '03', t: 'Разрабатываем и тестируем', d: 'Гибкая разработка и контроль качества на каждом этапе' },
  { n: '04', t: 'Внедряем и запускаем',      d: 'Интеграция, миграция и запуск в эксплуатацию' },
  { n: '05', t: 'Поддерживаем и развиваем',  d: 'Техническая поддержка и постоянное развитие продукта' },
];

const STATS = [
  { value: 'Полный цикл', label: 'разработки' },
  { value: 'AI-first',    label: 'подход' },
  { value: 'Российская',  label: 'компания' },
  { value: 'Фокус на',    label: 'результат' },
];

/* ───────── helpers ───────── */

const C = {
  bg0:      '#070A0F',
  bg1:      '#0B1220',
  bg2:      '#101A2B',
  brand:    '#2F80FF',
  brandH:   '#4DA3FF',
  brandD:   '#1C5CFF',
  tech:     '#00C2FF',
  signal:   '#00D38A',
  text:     '#E6EDF7',
  textSec:  '#B6C2D1',
  textMut:  '#7A8AA0',
  border:   'rgba(77,163,255,0.15)',
  borderT:  'rgba(0,194,255,0.08)',
  borderS:  'rgba(255,255,255,0.05)',
};

const gradBrand = `linear-gradient(135deg, ${C.brand} 0%, ${C.tech} 100%)`;

/* ───────── components ───────── */

const SectionHead = ({
  kicker, title, sub, action, onAction,
}: { kicker: string; title: string; sub?: string; action?: string; onAction?: () => void }) => (
  <div className="flex items-end justify-between gap-6 flex-wrap">
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px" style={{ background: gradBrand }} />
        <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>{kicker}</span>
      </div>
      <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.75rem,3.5vw,3.25rem)', color: C.text }}>{title}</h2>
      {sub && <p className="text-lg mt-4" style={{ color: C.textSec }}>{sub}</p>}
    </div>
    {action && (
      <button onClick={onAction}
        className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
        style={{ color: C.brand }}>
        {action} <Icon name="ArrowRight" size={16} />
      </button>
    )}
  </div>
);

const Field = ({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>{label}</label>
    <input type={type} placeholder={placeholder}
      className="px-4 py-3 outline-none transition-colors"
      style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }}
      onFocus={e => (e.target.style.borderColor = C.brand)}
      onBlur={e  => (e.target.style.borderColor = C.border)} />
  </div>
);

const FooterCol = ({ title, items, onClick }: { title: string; items: string[]; onClick?: (t: string) => void }) => (
  <div>
    <div className="font-display font-semibold mb-4" style={{ color: C.text }}>{title}</div>
    <div className="flex flex-col gap-2 text-sm" style={{ color: C.textMut }}>
      {items.map((it) => (
        <button key={it} onClick={() => onClick?.(it)}
          className="text-left transition-colors hover:text-white">{it}</button>
      ))}
    </div>
  </div>
);

/* ───────── page ───────── */

const Index = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    api.getPosts({ per: 3 }).then(r => setLatestPosts(r.posts)).catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: C.bg0, color: C.text, minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* Глобальная сетка */}
      <div className="fixed inset-0 pointer-events-none grid-lines grid-fade" style={{ opacity: 0.6 }} />
      {/* AI glow фон */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 120%, rgba(47,128,255,0.10), transparent 70%)` }} />

      {/* ─── HEADER ─── */}
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(7,10,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        }}>
        <div style={{ ...WRAP, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '10px clamp(1.25rem,4vw,6rem)' : '18px clamp(1.25rem,4vw,6rem)' }}>
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3">
          <img src={LOGO} alt="АО СОФТ ПЛЮС СИСТЕМС" className="h-11 w-auto object-contain" />
          <span className="font-display font-semibold hidden sm:block" style={{ color: C.text, fontSize: 'clamp(0.8rem,1.2vw,1rem)', lineHeight: 1 }}>АО «СОФТ ПЛЮС СИСТЕМС»</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => n.href ? (
            <Link key={n.label} to={n.href}
              className="px-4 py-2 text-sm relative group transition-colors"
              style={{ color: C.textSec }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.textSec)}>
              {n.label}
              <span className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{ background: C.brand }} />
            </Link>
          ) : (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="px-4 py-2 text-sm relative group transition-colors"
              style={{ color: C.textSec }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = C.text)}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = C.textSec)}>
              {n.label}
              <span className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{ background: C.brand }} />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => scrollTo('contacts')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
            style={{ border: `1px solid ${C.brand}`, color: C.brand, background: 'transparent' }}
            onMouseEnter={e => { const t = e.currentTarget; t.style.background = C.brand; t.style.color = '#fff'; }}
            onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.color = C.brand; }}>
            Обсудить проект <Icon name="ArrowUpRight" size={16} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2" style={{ color: C.text }}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full inset-x-0 animate-fade-up flex flex-col"
            style={{ background: 'rgba(7,10,15,0.97)', borderBottom: `1px solid ${C.border}`, padding: '0.5rem clamp(1.25rem,4vw,6rem) 1rem' }}>
            {NAV.map((n) => n.href ? (
              <Link key={n.label} to={n.href} onClick={() => setMenuOpen(false)}
                className="py-3 text-left transition-colors border-b"
                style={{ color: C.textSec, borderColor: C.borderS }}>
                {n.label}
              </Link>
            ) : (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="py-3 text-left transition-colors border-b"
                style={{ color: C.textSec, borderColor: C.borderS }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = C.text)}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = C.textSec)}>
                {n.label}
              </button>
            ))}
          </div>
        )}
        </div>{/* /WRAP */}
      </header>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.65 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg0} 30%, rgba(7,10,15,0.3) 70%, transparent)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg0} 0%, transparent 60%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(7,10,15,0.7) 0%, transparent 30%)` }} />
        </div>

        {/* плавающие теги — только десктоп, строго внутри WRAP */}
        <div className="absolute inset-0 hidden xl:flex pointer-events-none" style={{ justifyContent: 'center' }}>
          <div className="relative w-full" style={{ maxWidth: 1680, padding: '0 clamp(1.25rem,4vw,6rem)' }}>
            {HERO_TAGS.map((t, i) => (
              <div key={t.title}
                className="absolute animate-fade-up animate-float text-sm font-medium"
                style={{
                  top: t.top,
                  [t.side]: 'clamp(1.25rem,4vw,6rem)',
                  animationDelay: `${0.6 + i * 0.13}s`,
                  background: 'rgba(11,18,32,0.88)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${C.border}`,
                  padding: '10px 16px',
                  whiteSpace: 'nowrap',
                } as React.CSSProperties}>
                <span className="flex items-center gap-2" style={{ color: C.text }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: C.brand }} />
                  {t.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-pad relative z-10 w-full">
          <div className="max-w-3xl">
            {/* badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 animate-fade-up"
              style={{ border: `1px solid rgba(47,128,255,0.35)`, background: 'rgba(47,128,255,0.08)' }}>
              <span className="w-2 h-2 animate-pulse-glow" style={{ background: C.brand }} />
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>
                Российская IT-компания полного цикла
              </span>
            </div>

            <h1 className="font-display font-bold leading-[1.02] mb-8 animate-fade-up"
              style={{ fontSize: 'clamp(2.5rem,5.5vw,5.5rem)', animationDelay: '0.1s' }}>
              <span className="block text-gradient">Создаём технологии,</span>
              <span className="block" style={{ color: C.text }}>которые меняют бизнес</span>
              <span className="block" style={{ color: C.textSec }}>и строят будущее</span>
            </h1>

            <p className="text-lg mb-10 max-w-xl animate-fade-up"
              style={{ color: C.textSec, animationDelay: '0.2s' }}>
              Разрабатываем программное обеспечение, внедряем искусственный интеллект,
              создаём собственные продукты и сопровождаем проекты любой сложности.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => scrollTo('contacts')}
                className="btn-primary inline-flex items-center gap-2 px-8 py-4">
                Обсудить проект <Icon name="ArrowRight" size={18} />
              </button>
              <button onClick={() => scrollTo('services')}
                className="btn-ghost inline-flex items-center gap-2 px-8 py-4">
                Наши направления
              </button>
            </div>

            {/* мини-плашки */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-14 animate-fade-up"
              style={{ animationDelay: '0.4s', border: `1px solid ${C.border}`, borderColor: C.borderS }}>
              {STATS.map((s) => (
                <div key={s.value} className="px-5 py-5" style={{ background: 'rgba(11,18,32,0.6)', backdropFilter: 'blur(8px)' }}>
                  <Icon name="CheckCircle2" size={18} className="mb-2" style={{ color: C.brand } as React.CSSProperties} />
                  <div className="font-display font-semibold text-sm" style={{ color: C.text }}>{s.value}</div>
                  <div className="text-xs" style={{ color: C.textMut }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="relative py-28 section-pad">
        <SectionHead kicker="Направления деятельности" title="Решаем сложные задачи и создаём продукты"
          action="Все направления" onAction={() => scrollTo('solutions')} />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px mt-16"
          style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="group glow-border glass-card p-8 lg:p-10 relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 font-display font-bold p-4"
                style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.025)', lineHeight: 1 }}>0{i + 1}</div>
              <div className="icon-box w-14 h-14 mb-6">
                <Icon name={s.icon} size={26} style={{ color: C.brand } as React.CSSProperties} />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: C.text }}>{s.title}</h3>
              <p className="leading-relaxed mb-6" style={{ color: C.textSec }}>{s.desc}</p>
              <Icon name="ArrowRight" size={20}
                className="group-hover:translate-x-1 transition-all"
                style={{ color: C.textMut } as React.CSSProperties} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEV VISUAL ─── */}
      <section className="relative py-20 section-pad">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-8 rounded-full" style={{ background: 'radial-gradient(circle, rgba(47,128,255,0.12), transparent 70%)' }} />
            <img src={DEV_IMG} alt="Архитектура информационных систем"
              className="relative w-full animate-float" style={{ border: `1px solid ${C.border}` }} />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHead kicker="Инженерия" title="Архитектура систем любого масштаба"
              sub="Проектируем отказоустойчивые платформы, микросервисы и интеграции корпоративного уровня." />
            <div className="mt-8 flex flex-col gap-4">
              {['Микросервисная архитектура','API-first интеграции','Высоконагруженные системы','DevOps и облачная инфраструктура'].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <Icon name="Check" size={18} style={{ color: C.signal } as React.CSSProperties} />
                  <span style={{ color: C.textSec }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY ─── */}
      <section className="relative py-20 section-pad">
        <SectionHead kicker="Почему выбирают нас" title="Надёжный технологический партнёр для вашего бизнеса" />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px mt-14"
          style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
          {WHY.map((w) => (
            <div key={w.t} className="glass-card glow-border p-7 transition-all">
              <div className="icon-box w-12 h-12 mb-5">
                <Icon name={w.icon} size={22} style={{ color: C.brand } as React.CSSProperties} />
              </div>
              <h4 className="font-display text-lg font-semibold mb-2" style={{ color: C.text }}>{w.t}</h4>
              <p className="text-sm" style={{ color: C.textSec }}>{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section id="solutions" className="relative py-28 section-pad">
        <SectionHead kicker="Собственные продукты" title="Создаём продукты, которыми пользуются" />
        <div className="grid lg:grid-cols-12 gap-px mt-16" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
          {/* «Лихие 90-е» крупный блок */}
          <article className="lg:col-span-6 relative overflow-hidden group" style={{ minHeight: 440 }}>
            <img src={GAME_IMG} alt="Лихие 90-е"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.5) 50%, transparent)' }} />
            <div className="relative h-full flex flex-col justify-end p-8 lg:p-10" style={{ minHeight: 440 }}>
              <span className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: C.brand }}>Флагманский проект</span>
              <h3 className="font-display text-3xl font-bold mb-2" style={{ color: '#fff' }}>«Лихие 90-е»</h3>
              <p className="max-w-md mb-3" style={{ color: C.textSec }}>
                Криминальная RPG с открытым миром о 90-х годах в России. Реализм, атмосфера и свобода выбора.
              </p>
              <button className="inline-flex items-center gap-2 font-medium w-fit hover:gap-3 transition-all"
                style={{ color: C.brand }}>
                Подробнее о проекте <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </article>

          {/* остальные */}
          <div className="lg:col-span-6 flex flex-col gap-px" style={{ background: C.borderS }}>
            {PRODUCTS.map((p) => (
              <div key={p.title} className="glass-card glow-border p-7 flex items-start gap-5 flex-1 transition-all">
                <div className="icon-box w-12 h-12">
                  <Icon name={p.icon} size={22} style={{ color: C.tech } as React.CSSProperties} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: C.tech }}>{p.tag}</span>
                    {p.soon && (
                      <span className="text-[10px] px-2 py-0.5" style={{ border: `1px solid ${C.borderS}`, color: C.textMut }}>Скоро</span>
                    )}
                  </div>
                  <h4 className="font-display text-xl font-semibold mb-1" style={{ color: C.text }}>{p.title}</h4>
                  <p className="text-sm" style={{ color: C.textSec }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH ─── */}
      <section id="tech" className="relative py-20 section-pad">
        <SectionHead kicker="Технологии" title="Используем передовые технологии" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px mt-14"
          style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
          {TECH.map((t) => (
            <div key={t.name} className="glass-card glow-border p-7 flex flex-col items-center text-center gap-4 transition-all">
              <div className="icon-box w-14 h-14">
                <Icon name={t.icon} size={24} style={{ color: C.tech } as React.CSSProperties} />
              </div>
              <span className="text-sm font-medium" style={{ color: C.textSec }}>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESS + ABOUT ─── */}
      <section id="about" className="relative py-28 section-pad">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHead kicker="Как мы работаем" title="Прозрачный процесс — предсказуемый результат" />
            <div className="mt-12 flex flex-col">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="flex gap-5 pb-8 relative">
                  {i < PROCESS.length - 1 && (
                    <span className="absolute w-px" style={{ left: 18, top: 40, bottom: 0, background: C.borderS }} />
                  )}
                  <div className="w-9 h-9 shrink-0 flex items-center justify-center font-display text-sm z-10"
                    style={{ border: `1px solid rgba(47,128,255,0.4)`, background: 'rgba(47,128,255,0.08)', color: C.brand }}>
                    {p.n}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold mb-1" style={{ color: C.text }}>{p.t}</h4>
                    <p className="text-sm" style={{ color: C.textSec }}>{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 lg:p-12 relative overflow-hidden self-start">
            <div className="absolute inset-0 grid-lines" style={{ opacity: 0.4 }} />
            <div className="absolute inset-0 ai-glow" />
            <div className="relative">
              <SectionHead kicker="О компании" title="Технологии. Люди. Результат." />
              <p className="leading-relaxed mt-8" style={{ color: C.textSec }}>
                АО «С+» — российская IT-компания полного цикла. Мы объединяем экспертизу,
                технологии и страсть к созданию сложных цифровых продуктов.
              </p>
              <div className="grid grid-cols-3 gap-px mt-10" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
                {[{ icon: 'Code2', t: 'IT', d: 'экспертиза' }, { icon: 'BrainCircuit', t: 'AI', d: 'компетенции' }, { icon: 'Boxes', t: 'Продукты', d: 'и платформы' }].map((v) => (
                  <div key={v.t} className="p-5 text-center" style={{ background: C.bg2 }}>
                    <Icon name={v.icon} size={22} className="mx-auto mb-3" style={{ color: C.brand } as React.CSSProperties} />
                    <div className="font-display font-semibold" style={{ color: C.text }}>{v.t}</div>
                    <div className="text-xs" style={{ color: C.textMut }}>{v.d}</div>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 font-medium mt-8 hover:gap-3 transition-all"
                style={{ color: C.brand }}>
                Подробнее о компании <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG + CAREER ─── */}
      <section id="blog" className="relative py-20 section-pad">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHead kicker="Блог" title="Экспертиза, статьи и новости"
              action="Все статьи" onAction={() => window.location.href = '/blog'} />
            <div className="mt-10 flex flex-col gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
              {latestPosts.length === 0 ? (
                /* статика, пока нет статей */
                [
                  { cat: 'AI',         title: 'Как AI меняет корпоративные процессы',   date: '12 июня 2026',    slug: '' },
                  { cat: 'Разработка', title: 'Архитектура масштабируемых веб-платформ', date: '28 апреля 2026',  slug: '' },
                  { cat: 'GovTech',    title: 'Цифровые платформы: тренды 2026',         date: '15 марта 2026',   slug: '' },
                ].map((b) => (
                  <article key={b.title} className="glass-card glow-border p-6 group flex items-center justify-between gap-5">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: C.brand }}>{b.cat}</div>
                      <h3 className="font-display text-xl font-semibold mb-1" style={{ color: C.text }}>{b.title}</h3>
                      <span className="text-sm" style={{ color: C.textMut }}>{b.date}</span>
                    </div>
                    <Icon name="ArrowUpRight" size={20} style={{ color: C.textMut } as React.CSSProperties} />
                  </article>
                ))
              ) : (
                latestPosts.map((p) => (
                  <Link key={p.id} to={`/blog/${p.slug}`}
                    className="glass-card glow-border p-6 group flex items-center justify-between gap-5 transition-all"
                    style={{ background: C.bg1 }}
                    onMouseEnter={e => (e.currentTarget.style.background = C.bg2)}
                    onMouseLeave={e => (e.currentTarget.style.background = C.bg1)}>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: C.brand }}>{p.category || 'Статья'}</div>
                      <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-gradient"
                        style={{ color: C.text }}>{p.title}</h3>
                      <span className="text-sm" style={{ color: C.textMut }}>
                        {p.published_at ? new Date(p.published_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                      </span>
                    </div>
                    <Icon name="ArrowUpRight" size={20}
                      className="shrink-0 group-hover:text-brand transition-colors"
                      style={{ color: C.textMut } as React.CSSProperties} />
                  </Link>
                ))
              )}
            </div>
          </div>

          <div id="career" className="glass-card p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0"
              style={{ background: `radial-gradient(circle at 70% 20%, rgba(47,128,255,0.15), transparent 65%)` }} />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C.brand }}>Карьера</div>
              <h2 className="font-display font-bold mb-5"
                style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', color: C.text }}>
                Присоединяйтесь к команде
              </h2>
              <p className="mb-8 max-w-md" style={{ color: C.textSec }}>
                Работаем над сложными проектами и растём вместе. Создаём будущее — присоединяйтесь к нам.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Backend','ML Engineer','Solution Architect','Product','DevOps','Frontend'].map((r) => (
                  <span key={r} className="px-4 py-2 text-sm transition-colors cursor-default"
                    style={{ border: `1px solid ${C.border}`, color: C.textSec }}>
                    {r}
                  </span>
                ))}
              </div>
              <button onClick={() => scrollTo('contacts')}
                className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
                style={{ color: C.brand }}>
                Смотреть вакансии <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-12 section-pad">
        <div className="glass-card p-10 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 grid-lines" style={{ opacity: 0.4 }} />
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(47,128,255,0.18), transparent 70%)` }} />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h2 className="font-display font-bold mb-3"
                style={{ fontSize: 'clamp(1.75rem,4vw,3.25rem)', color: C.text }}>
                Готовы обсудить ваш проект?
              </h2>
              <p style={{ color: C.textSec }}>Расскажите о вашей задаче — мы предложим оптимальное решение.</p>
            </div>
            <button onClick={() => scrollTo('contacts')}
              className="btn-primary shrink-0 inline-flex items-center gap-2 px-8 py-4">
              Связаться с нами <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── CONTACTS ─── */}
      <section id="contacts" className="relative py-20 section-pad">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHead kicker="Контакты" title="Обсудим ваш проект"
              sub="Расскажите о задаче — мы предложим инженерное решение." />
            <div className="mt-10 flex flex-col gap-5">
              {[
                { icon: 'Mail',   t: 'info@softplus.systems', d: 'Электронная почта' },
                { icon: 'Phone',  t: '+7 (495) 123-45-67',    d: 'Отдел развития' },
                { icon: 'MapPin', t: 'г. Москва',             d: 'Головной офис' },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-5">
                  <div className="icon-box w-12 h-12">
                    <Icon name={c.icon} size={20} style={{ color: C.brand } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="font-display text-lg font-medium" style={{ color: C.text }}>{c.t}</div>
                    <div className="text-sm" style={{ color: C.textMut }}>{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}
            className="glass-card p-8 lg:p-10 flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Имя" placeholder="Иван Петров" />
              <Field label="Компания" placeholder="ООО «Компания»" />
            </div>
            <Field label="E-mail" placeholder="you@company.ru" type="email" />
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em]" style={{ color: C.textMut }}>Задача</label>
              <textarea rows={4} placeholder="Опишите проект..."
                className="px-4 py-3 outline-none transition-colors resize-none"
                style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }}
                onFocus={e => (e.target.style.borderColor = C.brand)}
                onBlur={e  => (e.target.style.borderColor = C.border)} />
            </div>
            <button type="submit"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4">
              Отправить заявку <Icon name="Send" size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative section-pad py-14" style={{ borderTop: `1px solid ${C.borderS}` }}>
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO} alt="АО СОФТ ПЛЮС СИСТЕМС" className="h-10 w-auto object-contain" />
              <div className="leading-none">
                <div className="font-display font-semibold text-sm" style={{ color: C.text }}>АО «СОФТ ПЛЮС СИСТЕМС»</div>
              </div>
            </div>
            <p className="text-sm" style={{ color: C.textMut }}>Российская IT-компания полного цикла.</p>
          </div>
          <FooterCol title="Направления" items={SERVICES.map((s) => s.title)} />
          <FooterCol title="Компания" items={['О компании','Блог','Карьера','Контакты']}
            onClick={(t) => {
              const m: Record<string,string> = {'О компании':'about','Карьера':'career','Контакты':'contacts'};
              if (t === 'Блог') { window.location.href = '/blog'; return; }
              if (m[t]) scrollTo(m[t]);
            }} />
          <div>
            <div className="font-display font-semibold mb-4" style={{ color: C.text }}>Контакты</div>
            <div className="flex flex-col gap-2 text-sm" style={{ color: C.textMut }}>
              <span>info@softplus.systems</span>
              <span>+7 (495) 123-45-67</span>
              <span>г. Москва</span>
              <div className="flex gap-3 mt-3">
                {['Send','MessageCircle','Linkedin'].map((ic) => (
                  <span key={ic} className="w-9 h-9 flex items-center justify-center cursor-pointer transition-colors"
                    style={{ border: `1px solid ${C.borderS}`, color: C.textMut }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.brand; (e.currentTarget as HTMLElement).style.color = C.brand; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.borderS; (e.currentTarget as HTMLElement).style.color = C.textMut; }}>
                    <Icon name={ic} size={16} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          style={{ borderTop: `1px solid ${C.borderS}`, color: C.textMut }}>
          <span>© 2026 АО «СОФТ ПЛЮС СИСТЕМС». Все права защищены.</span>
          <a href="/admin/login" className="hover:underline" style={{ color: C.textMut }}>Вход в CMS</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;