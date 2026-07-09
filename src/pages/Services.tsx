import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';
import useSEO from '@/hooks/useSEO';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';

const C = {
  bg0:     '#070A0F',
  bg1:     '#0B1220',
  bg2:     '#101A2B',
  brand:   '#2F80FF',
  brandH:  '#4DA3FF',
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
  { label: 'Направления', href: '/services', active: true },
  { label: 'Продукты',    href: '/products' },
  { label: 'О компании',  href: '/about' },
  { label: 'Блог',        href: '/blog' },
  { label: 'Карьера',     href: '/career' },
  { label: 'Контакты',    href: '/contacts' },
];

const DIRECTIONS = [
  {
    id: 'dev',
    num: '01',
    icon: 'Code2',
    title: 'Разработка программного обеспечения',
    short: 'Разработка ПО',
    desc: `Проектируем и создаем корпоративные информационные системы, веб-платформы, мобильные приложения и специализированное программное обеспечение под задачи бизнеса и государственных организаций.\n\nРазработка ведется с учетом масштабируемости, информационной безопасности и возможности дальнейшего развития продукта.`,
    services: [
      'Корпоративные порталы',
      'Веб-системы',
      'Мобильные приложения',
      'Личные кабинеты',
      'CRM и ERP решения',
      'Интеграционные проекты',
      'API и микросервисная архитектура',
      'Поддержка и развитие программных продуктов',
    ],
    img: 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fe84d075-429f-4c34-84d4-f90c0604c677.png',
    accent: C.brand,
  },
  {
    id: 'ai',
    num: '02',
    icon: 'BrainCircuit',
    title: 'Искусственный интеллект и автоматизация',
    desc: `Разрабатываем и внедряем решения на базе современных технологий искусственного интеллекта, помогая компаниям автоматизировать процессы, анализировать данные и повышать эффективность бизнеса.\n\nМы используем AI как практический инструмент для решения конкретных задач, а не как модный тренд.`,
    services: [
      'Корпоративные AI-помощники',
      'Интеллектуальный поиск',
      'Обработка документов',
      'Анализ данных',
      'Автоматизация бизнес-процессов',
      'LLM-решения',
      'AI-интеграции',
      'Разработка интеллектуальных сервисов',
    ],
    img: 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/5a6b7385-2823-4f51-b6c1-768f4326ce80.png',
    accent: C.tech,
  },
  {
    id: 'games',
    num: '03',
    icon: 'Gamepad2',
    title: 'Игровые проекты',
    desc: `Создаем собственные игровые продукты, объединяя современные технологии разработки, качественный визуальный контент и масштабируемую серверную инфраструктуру.\n\nИгровые проекты позволяют нам постоянно развивать внутреннюю экспертизу в области высоконагруженных систем, графики и пользовательского опыта.`,
    services: [
      'Разработка компьютерных игр',
      'Игровые серверы',
      'Онлайн-сервисы',
      'Игровая аналитика',
      'LiveOps',
      'Монетизация',
      'Игровые платформы',
    ],
    img: 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/32fcf391-bc64-4ff6-9147-d5251c301499.png',
    accent: '#9B6DFF',
  },
  {
    id: 'consulting',
    num: '04',
    icon: 'BarChart2',
    title: 'Цифровой консалтинг',
    desc: `Помогаем компаниям выстраивать эффективную цифровую архитектуру, проектировать информационные системы и принимать технологические решения, ориентированные на долгосрочное развитие.`,
    services: [
      'IT-консалтинг',
      'Проектирование архитектуры',
      'Аудит информационных систем',
      'Цифровая трансформация',
      'Оптимизация процессов',
      'Техническая экспертиза',
      'Архитектурное сопровождение',
    ],
    img: 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/f2ef3f3e-deb6-469e-894b-30c4fb3d21f0.png',
    accent: C.signal,
  },
  {
    id: 'marketing',
    num: '05',
    icon: 'Megaphone',
    title: 'Маркетинг технологических компаний',
    desc: `Разрабатываем маркетинговые стратегии для IT-компаний и цифровых продуктов, помогая усиливать присутствие на рынке, привлекать клиентов и формировать сильный бренд.\n\nМы понимаем специфику технологического бизнеса и говорим с рынком на одном языке.`,
    services: [
      'Маркетинговая стратегия',
      'Продвижение IT-компаний',
      'Digital-маркетинг',
      'SEO',
      'Performance-маркетинг',
      'Контент-маркетинг',
      'PR',
      'Личный бренд руководителей',
      'Запуск новых продуктов',
    ],
    img: 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/229cd8e3-e493-413f-a957-6b508e64950c.png',
    accent: '#FF6B6B',
  },
];

const Services = () => {
  useSEO({
    title: 'Направления деятельности — разработка ПО, AI, консалтинг | АО «С+»',
    description: 'Основные направления деятельности АО «СОФТ ПЛЮС СИСТЕМС»: разработка программного обеспечения, искусственный интеллект, цифровая трансформация, маркетинг, игровые проекты и платформа С+.',
    keywords: 'разработка ПО, AI, автоматизация, цифровая трансформация, маркетинг, игровая разработка, консалтинг, корпоративные системы, IT услуги',
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const goDiscuss = () => navigate('/#contacts');

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
            <button onClick={goDiscuss}
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

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 section-pad"
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
            Направления{' '}
            <span style={{ background: gradBrand, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              деятельности
            </span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: C.textSec }}>
            АО «С+» объединяет инженерную экспертизу, современные технологии и опыт реализации цифровых проектов. Мы создаем программное обеспечение, внедряем искусственный интеллект, сопровождаем цифровую трансформацию бизнеса и развиваем собственные технологические продукты.
          </p>

          <div className="flex flex-wrap gap-3 mt-10">
            {DIRECTIONS.map(d => (
              <button key={d.id}
                onClick={() => document.getElementById(d.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-4 py-2 text-sm font-medium transition-all"
                style={{ border: `1px solid ${C.border}`, color: C.textSec, background: 'transparent' }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = d.accent; t.style.color = d.accent; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = C.border; t.style.color = C.textSec; }}>
                {d.num} — {d.short ?? d.title.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTION SECTIONS */}
      {DIRECTIONS.map((d, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section key={d.id} id={d.id}
            style={{ background: idx % 2 === 0 ? C.bg0 : C.bg1 }}
            className="relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 60% 40% at ${isEven ? '80%' : '20%'} 50%, ${d.accent}08 0%, transparent 70%)` }} />

            <div className="section-pad py-24 relative">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:[&>*:first-child]:order-last' : ''}`}>

                {/* IMAGE */}
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl opacity-20"
                    style={{ background: `radial-gradient(ellipse, ${d.accent} 0%, transparent 70%)`, filter: 'blur(30px)' }} />
                  <div className="relative overflow-hidden rounded-xl"
                    style={{ border: `1px solid ${d.accent}30` }}>
                    <img src={d.img} alt={d.title}
                      className="w-full object-cover"
                      style={{ aspectRatio: '16/10' }} />
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${d.accent}10 0%, transparent 50%)` }} />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 flex items-center justify-center rounded-xl font-display font-black text-4xl"
                    style={{ background: C.bg0, border: `1px solid ${d.accent}40`, color: d.accent }}>
                    {d.num}
                  </div>
                </div>

                {/* CONTENT */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
                    style={{ border: `1px solid ${d.accent}40`, color: d.accent, background: `${d.accent}08` }}>
                    <Icon name={d.icon} size={14} />
                    Направление {d.num}
                  </div>

                  <h2 className="font-display font-bold mb-5 leading-tight"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: C.text }}>
                    {d.title}
                  </h2>

                  <div className="mb-8" style={{ color: C.textSec }}>
                    {d.desc.split('\n\n').map((p, i) => (
                      <p key={i} className={`text-base leading-relaxed ${i > 0 ? 'mt-4' : ''}`}>{p}</p>
                    ))}
                  </div>

                  <div className="mb-8">
                    <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textMut }}>
                      Основные услуги
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {d.services.map(s => (
                        <div key={s} className="flex items-start gap-2.5">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.accent }} />
                          <span className="text-sm" style={{ color: C.textSec }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => navigate('/contacts')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
                    style={{ background: d.accent, color: '#fff' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                    Подробнее
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="section-pad py-24 relative overflow-hidden" style={{ background: C.bg1 }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-10 rounded-full"
            style={{ background: `radial-gradient(ellipse, ${C.brand} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.brand, background: 'rgba(47,128,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.brand }} />
            Комплексный подход
          </div>
          <h2 className="font-display font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Не нашли подходящую услугу?
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.textSec }}>
            Многие проекты требуют комплексного подхода и объединяют сразу несколько направлений нашей экспертизы. Расскажите о своей задаче — мы предложим оптимальное решение.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goDiscuss}
              className="px-8 py-3.5 text-sm font-semibold transition-all"
              style={{ background: gradBrand, color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              Обсудить проект
            </button>
            <button onClick={() => navigate('/contacts')}
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
    </div>
  );
};

export default Services;