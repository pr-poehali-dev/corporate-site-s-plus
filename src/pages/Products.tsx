import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';

const IMG_LIHIE    = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/1382be73-6981-4cdb-9fe3-ae6dec1882eb.png';
const IMG_GAMEFLOW = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/00b5544b-c0a6-41ea-b36a-81be0382842c.png';
const IMG_HERO     = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/441812ff-44cb-4d67-bdc3-131dead074fe.png';

const C = {
  bg0:     '#070A0F',
  bg1:     '#0B1220',
  bg2:     '#101A2B',
  brand:   '#2F80FF',
  tech:    '#00C2FF',
  signal:  '#00D38A',
  text:    '#E6EDF7',
  textSec: '#B6C2D1',
  textMut: '#7A8AA0',
  border:  'rgba(77,163,255,0.15)',
  borderS: 'rgba(255,255,255,0.05)',
};

const gradBrand = `linear-gradient(135deg, ${C.brand} 0%, ${C.tech} 100%)`;

const NAV = [
  { label: 'Направления', href: '/services' },
  { label: 'Продукты',    href: '/products', active: true },
  { label: 'О компании',  href: '/about' },
  { label: 'Блог',        href: '/blog' },
  { label: 'Карьера',     href: '/career' },
  { label: 'Контакты',    href: '/contacts' },
];

type Modal = 'gameflow' | 'cplus' | null;

const Products = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [modal, setModal]         = useState<Modal>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const goContacts = () => navigate('/contacts');

  return (
    <div style={{ background: C.bg0, color: C.text, minHeight: '100vh', overflowX: 'hidden' }}>

      <div className="fixed inset-0 pointer-events-none grid-lines grid-fade" style={{ opacity: 0.6 }} />
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 120%, rgba(47,128,255,0.10), transparent 70%)` }} />

      {/* ─── HEADER ─── */}
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(7,10,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        }}>
        <div className="section-pad flex items-center justify-between"
          style={{ paddingTop: scrolled ? 10 : 18, paddingBottom: scrolled ? 10 : 18 }}>

          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO} alt="АО СОФТ ПЛЮС СИСТЕМС" className="h-11 w-auto object-contain" />
            <span className="font-display font-semibold hidden sm:block"
              style={{ color: C.text, fontSize: 'clamp(0.8rem,1.2vw,1rem)', lineHeight: 1 }}>
              АО «СОФТ ПЛЮС СИСТЕМС»
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link key={n.label} to={n.href}
                className="px-4 py-2 text-sm relative group transition-colors"
                style={{ color: n.active ? C.brand : C.textSec }}
                onMouseEnter={e => { if (!n.active) e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { if (!n.active) e.currentTarget.style.color = C.textSec; }}>
                {n.label}
                <span className="absolute bottom-1 left-4 right-4 h-px transition-transform origin-left"
                  style={{ background: gradBrand, transform: n.active ? 'scaleX(1)' : 'scaleX(0)' }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={goContacts}
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
            <div className="absolute top-full inset-x-0 flex flex-col"
              style={{ background: 'rgba(7,10,15,0.97)', borderBottom: `1px solid ${C.border}`, padding: '0.5rem clamp(1.25rem,4vw,6rem) 1rem' }}>
              {NAV.map((n) => (
                <Link key={n.label} to={n.href} onClick={() => setMenuOpen(false)}
                  className="py-3 text-left transition-colors border-b"
                  style={{ color: n.active ? C.brand : C.textSec, borderColor: C.borderS }}>
                  {n.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-40 pb-20 section-pad"
        style={{ background: `linear-gradient(180deg, ${C.bg1} 0%, ${C.bg0} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10"
            style={{ background: `radial-gradient(ellipse, ${C.brand} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.brand, background: 'rgba(47,128,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.brand }} />
            АО «С+»
          </div>
          <h1 className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: C.text }}>
            Собственные{' '}
            <span style={{ background: gradBrand, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              продукты
            </span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-4" style={{ color: C.textSec }}>
            АО «С+» развивает собственные цифровые продукты, объединяющие опыт разработки программного обеспечения, искусственного интеллекта, игровых технологий и корпоративных информационных систем.
          </p>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.textMut }}>
            Каждый продукт создается как самостоятельное решение с возможностью масштабирования и долгосрочного развития.
          </p>

          <div className="flex flex-wrap gap-3 mt-10">
            {[
              { label: '01 — Лихие 90-е', id: 'lihie' },
              { label: '02 — GameFlow',   id: 'gameflow' },
              { label: '03 — С+',         id: 'cplus' },
            ].map(p => (
              <button key={p.id}
                onClick={() => document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-4 py-2 text-sm font-medium transition-all"
                style={{ border: `1px solid ${C.border}`, color: C.textSec, background: 'transparent' }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = C.brand; t.style.color = C.brand; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = C.border; t.style.color = C.textSec; }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 01 ЛИХИЕ 90-е ─── */}
      <section id="lihie" style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255,150,50,0.06) 0%, transparent 70%)` }} />
        <div className="section-pad py-24 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl opacity-20"
                style={{ background: 'radial-gradient(ellipse, #FF9632 0%, transparent 70%)', filter: 'blur(30px)' }} />
              <div className="relative overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(255,150,50,0.25)' }}>
                <img src={IMG_LIHIE} alt="Лихие 90-е" className="w-full object-cover" style={{ aspectRatio: '16/10' }} />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(255,150,50,0.08) 0%, transparent 50%)' }} />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 flex items-center justify-center rounded-xl font-display font-black text-4xl"
                style={{ background: C.bg0, border: '1px solid rgba(255,150,50,0.35)', color: '#FF9632' }}>
                01
              </div>
            </div>
            {/* CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
                style={{ border: '1px solid rgba(255,150,50,0.35)', color: '#FF9632', background: 'rgba(255,150,50,0.06)' }}>
                <Icon name="Gamepad2" size={14} />
                Игровой проект
              </div>
              <h2 className="font-display font-bold mb-2 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
                Лихие 90-е
              </h2>
              <p className="text-base mb-5" style={{ color: '#FF9632' }}>
                Культовая социальная игра, вдохновленная атмосферой криминальной эпохи 90-х годов.
              </p>
              <div className="mb-8" style={{ color: C.textSec }}>
                <p className="text-base leading-relaxed mb-4">
                  «Лихие 90-е» — собственный игровой проект АО «С+», объединяющий элементы стратегии, симулятора, RPG и социальных механик.
                </p>
                <p className="text-base leading-relaxed">
                  Проект стал одним из наиболее заметных игровых продуктов своего времени, собрав сотни тысяч игроков и сформировав активное сообщество. Сегодня игра развивается как самостоятельная цифровая вселенная с перспективами масштабирования на современные мобильные платформы, LiveOps и международные рынки.
                </p>
              </div>
              <div className="mb-8">
                <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textMut }}>
                  Возможности
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Стратегическая игровая экономика',
                    'Социальные механики',
                    'Онлайн-события',
                    'Развитие персонажа',
                    'Масштабируемая игровая архитектура',
                    'Поддержка LiveOps',
                    'Потенциал франшизы',
                  ].map(s => (
                    <div key={s} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF9632' }} />
                      <span className="text-sm" style={{ color: C.textSec }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => navigate('/lihie90')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
                style={{ background: '#FF9632', color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                Подробнее о проекте
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02 GAMEFLOW ─── */}
      <section id="gameflow" style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 20% 50%, rgba(155,109,255,0.07) 0%, transparent 70%)` }} />
        <div className="section-pad py-24 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center lg:[&>*:first-child]:order-last">
            {/* IMAGE */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl opacity-20"
                style={{ background: 'radial-gradient(ellipse, #9B6DFF 0%, transparent 70%)', filter: 'blur(30px)' }} />
              <div className="relative overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(155,109,255,0.25)' }}>
                <img src={IMG_GAMEFLOW} alt="GameFlow" className="w-full object-cover" style={{ aspectRatio: '16/10' }} />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(155,109,255,0.08) 0%, transparent 50%)' }} />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 flex items-center justify-center rounded-xl font-display font-black text-4xl"
                style={{ background: C.bg0, border: '1px solid rgba(155,109,255,0.35)', color: '#9B6DFF' }}>
                02
              </div>
            </div>
            {/* CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
                style={{ border: '1px solid rgba(155,109,255,0.35)', color: '#9B6DFF', background: 'rgba(155,109,255,0.06)' }}>
                <Icon name="Trophy" size={14} />
                Корпоративная платформа
              </div>
              <h2 className="font-display font-bold mb-2 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
                GameFlow
              </h2>
              <p className="text-base mb-5" style={{ color: '#9B6DFF' }}>
                Платформа геймификации корпоративных процессов
              </p>
              <div className="mb-8" style={{ color: C.textSec }}>
                <p className="text-base leading-relaxed mb-4">
                  GameFlow — собственная платформа АО «С+», предназначенная для вовлечения сотрудников, обучения, оценки компетенций и мотивации персонала с использованием игровых механик.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Решение помогает превращать обучение, адаптацию новых сотрудников, внутренние программы развития и корпоративные инициативы в понятные, измеримые и интересные процессы.
                </p>
                <p className="text-base leading-relaxed">
                  Платформа ориентирована на корпоративный сектор, государственные организации и образовательные учреждения.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textMut }}>
                    Возможности
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      'Обучающие сценарии',
                      'Игровые миссии',
                      'Система достижений',
                      'Рейтинги сотрудников',
                      'Баллы и награды',
                      'Цифровые бейджи',
                      'Аналитика вовлеченности',
                      'Интеграция с корпоративными системами',
                      'Поддержка LMS',
                      'White Label',
                    ].map(s => (
                      <div key={s} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#9B6DFF' }} />
                        <span className="text-sm" style={{ color: C.textSec }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textMut }}>
                    Где применяется
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      'Корпоративное обучение',
                      'Адаптация сотрудников',
                      'Повышение квалификации',
                      'Государственные образовательные программы',
                      'Корпоративные университеты',
                      'Мотивационные программы',
                    ].map(s => (
                      <div key={s} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#9B6DFF' }} />
                        <span className="text-sm" style={{ color: C.textSec }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setModal('gameflow')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
                style={{ background: '#9B6DFF', color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                Подробнее
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03 С+ ─── */}
      <section id="cplus" style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 80% 50%, rgba(47,128,255,0.07) 0%, transparent 70%)` }} />
        <div className="section-pad py-24 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl opacity-20"
                style={{ background: `radial-gradient(ellipse, ${C.brand} 0%, transparent 70%)`, filter: 'blur(30px)' }} />
              <div className="relative overflow-hidden rounded-xl"
                style={{ border: `1px solid rgba(47,128,255,0.25)` }}>
                <img src={IMG_HERO} alt="С+" className="w-full object-cover" style={{ aspectRatio: '16/10' }} />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, rgba(47,128,255,0.08) 0%, transparent 50%)` }} />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 flex items-center justify-center rounded-xl font-display font-black text-4xl"
                style={{ background: C.bg0, border: `1px solid rgba(47,128,255,0.35)`, color: C.brand }}>
                03
              </div>
            </div>
            {/* CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
                style={{ border: `1px solid ${C.border}`, color: C.brand, background: 'rgba(47,128,255,0.06)' }}>
                <Icon name="Layers" size={14} />
                Цифровая платформа
              </div>
              <h2 className="font-display font-bold mb-2 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
                С+
              </h2>
              <p className="text-base mb-5" style={{ color: C.brand }}>
                Единая цифровая платформа управления корпоративными процессами
              </p>
              <div className="mb-8" style={{ color: C.textSec }}>
                <p className="text-base leading-relaxed mb-4">
                  «С+» — собственная цифровая платформа АО «С+», предназначенная для создания, интеграции и сопровождения корпоративных информационных систем.
                </p>
                <p className="text-base leading-relaxed">
                  Платформа объединяет инструменты управления данными, документооборотом, аналитикой, интеграциями и цифровыми сервисами, позволяя ускорять разработку и внедрение прикладных решений для бизнеса и государственного сектора.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textMut }}>
                    Возможности
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      'Управление данными',
                      'Документооборот',
                      'Интеграционные сервисы',
                      'API',
                      'Аналитические панели',
                      'Управление процессами',
                      'Ролевая модель доступа',
                      'Масштабируемая архитектура',
                      'Облачное развертывание',
                      'Поддержка AI-модулей',
                    ].map(s => (
                      <div key={s} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.brand }} />
                        <span className="text-sm" style={{ color: C.textSec }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textMut }}>
                    Для кого
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      'Государственные организации',
                      'Средний и крупный бизнес',
                      'Корпоративные заказчики',
                      'Производственные предприятия',
                    ].map(s => (
                      <div key={s} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.brand }} />
                        <span className="text-sm" style={{ color: C.textSec }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setModal('cplus')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
                style={{ background: gradBrand, color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                Подробнее
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad py-24 relative overflow-hidden" style={{ background: C.bg1 }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-10 rounded-full"
            style={{ background: `radial-gradient(ellipse, ${C.brand} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.brand, background: 'rgba(47,128,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.brand }} />
            Наш подход
          </div>
          <h2 className="font-display font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Создаем продукты, которые решают реальные задачи
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.textSec }}>
            Мы не только разрабатываем программное обеспечение на заказ, но и создаем собственные цифровые продукты, развивая внутреннюю экспертизу и формируя новые технологические решения для бизнеса, государства и конечных пользователей.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goContacts}
              className="px-8 py-3.5 text-sm font-semibold transition-all"
              style={{ background: gradBrand, color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              Обсудить проект
            </button>
            <button onClick={goContacts}
              className="px-8 py-3.5 text-sm font-semibold transition-all"
              style={{ border: `1px solid ${C.border}`, color: C.text, background: 'transparent' }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = C.brand; t.style.color = C.brand; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = C.border; t.style.color = C.text; }}>
              Связаться с нами
            </button>
          </div>
        </div>
      </section>

      <div className="section-pad" style={{ background: C.bg0 }}>
        <SiteFooter />
      </div>

      {/* ─── MODAL GameFlow ─── */}
      {modal === 'gameflow' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(7,10,15,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setModal(null)}>
          <div className="relative w-full max-w-lg rounded-2xl p-8"
            style={{ background: C.bg1, border: `1px solid rgba(155,109,255,0.25)` }}
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)}
              className="absolute top-4 right-4 p-1.5 transition-colors"
              style={{ color: C.textMut }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.text; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.textMut; }}>
              <Icon name="X" size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(155,109,255,0.15)' }}>
                <Icon name="Trophy" size={20} style={{ color: '#9B6DFF' } as React.CSSProperties} />
              </div>
              <div>
                <div className="font-display font-bold text-lg" style={{ color: C.text }}>GameFlow</div>
                <div className="text-sm" style={{ color: '#9B6DFF' }}>Платформа геймификации</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: C.textSec }}>
              Мы готовим подробную презентацию продукта. В настоящий момент информация о данном продукте находится в стадии подготовки.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: C.textSec }}>
              Совсем скоро здесь появится подробное описание возможностей, архитектуры, сценариев применения и преимуществ решения. Если вас уже сейчас заинтересовал продукт — свяжитесь с нами.
            </p>
            <div className="flex gap-3">
              <button onClick={() => { setModal(null); navigate('/contacts'); }}
                className="flex-1 py-3 text-sm font-semibold transition-all"
                style={{ background: '#9B6DFF', color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                Связаться с нами
              </button>
              <button onClick={() => setModal(null)}
                className="flex-1 py-3 text-sm font-semibold transition-all"
                style={{ border: `1px solid ${C.borderS}`, color: C.textSec, background: 'transparent' }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = C.brand; t.style.color = C.text; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = C.borderS; t.style.color = C.textSec; }}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL С+ ─── */}
      {modal === 'cplus' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(7,10,15,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setModal(null)}>
          <div className="relative w-full max-w-lg rounded-2xl p-8"
            style={{ background: C.bg1, border: `1px solid ${C.border}` }}
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)}
              className="absolute top-4 right-4 p-1.5 transition-colors"
              style={{ color: C.textMut }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.text; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.textMut; }}>
              <Icon name="X" size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(47,128,255,0.15)' }}>
                <Icon name="Layers" size={20} style={{ color: C.brand } as React.CSSProperties} />
              </div>
              <div>
                <div className="font-display font-bold text-lg" style={{ color: C.text }}>С+</div>
                <div className="text-sm" style={{ color: C.brand }}>Цифровая платформа</div>
              </div>
            </div>
            <p className="text-base font-semibold mb-3" style={{ color: C.text }}>
              Мы готовим подробную презентацию продукта
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: C.textSec }}>
              В настоящий момент информация о данном продукте находится в стадии подготовки.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: C.textSec }}>
              Совсем скоро здесь появится подробное описание возможностей, архитектуры, сценариев применения и преимуществ решения. Если вас уже сейчас заинтересовал продукт, свяжитесь с нами — мы с удовольствием расскажем о нем подробнее.
            </p>
            <div className="flex gap-3">
              <button onClick={() => { setModal(null); navigate('/contacts'); }}
                className="flex-1 py-3 text-sm font-semibold transition-all"
                style={{ background: gradBrand, color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                Связаться с нами
              </button>
              <button onClick={() => setModal(null)}
                className="flex-1 py-3 text-sm font-semibold transition-all"
                style={{ border: `1px solid ${C.borderS}`, color: C.textSec, background: 'transparent' }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = C.brand; t.style.color = C.text; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = C.borderS; t.style.color = C.textSec; }}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;