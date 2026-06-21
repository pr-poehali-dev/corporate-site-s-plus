import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';

const LOGO      = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const OFFICE_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/8db0167a-38e9-4d0d-b53f-ac4dbf1589bd.png';
const LOGO_WHITE = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/28fa1250-d0b0-4356-a476-0ab0085147c3.png';

const C = {
  bg0:     '#070A0F',
  bg1:     '#0B1220',
  bg2:     '#101A2B',
  brand:   '#2F80FF',
  tech:    '#00C2FF',
  text:    '#E6EDF7',
  textSec: '#B6C2D1',
  textMut: '#7A8AA0',
  border:  'rgba(77,163,255,0.15)',
  borderS: 'rgba(255,255,255,0.05)',
};

const gradBrand = `linear-gradient(135deg, ${C.brand} 0%, ${C.tech} 100%)`;

const NAV = [
  { label: 'Направления', href: '/#services' },
  { label: 'Технологии',  href: '/#tech' },
  { label: 'О компании',  href: '/about', active: true },
  { label: 'Блог',        href: '/blog' },
  { label: 'Карьера',     href: '/career' },
  { label: 'Контакты',    href: '/#contacts' },
];

const DIRECTIONS = [
  { n: '01', icon: 'Code2',        title: 'Разработка корпоративного ПО',                          desc: 'Создаём корпоративные системы, веб- и мобильные приложения, сервисы и платформы любой сложности.' },
  { n: '02', icon: 'BrainCircuit', title: 'Искусственный интеллект и автоматизация',               desc: 'Разрабатываем интеллектуальные решения, внедряем AI в бизнес-процессы и автоматизируем принятие решений.' },
  { n: '03', icon: 'RefreshCw',    title: 'Цифровая трансформация организаций',                    desc: 'Помогаем компаниям внедрять цифровые технологии, оптимизировать процессы и повышать эффективность.' },
  { n: '04', icon: 'BarChart2',    title: 'IT-консалтинг и проектирование ИС',                     desc: 'Проводим анализ, проектируем архитектуру решений и помогаем выстраивать технологические стратегии.' },
  { n: '05', icon: 'Megaphone',    title: 'Маркетинг tech-компаний и цифровых продуктов',          desc: 'Продвигаем технологические компании и цифровые продукты на рынке.' },
  { n: '06', icon: 'Gamepad2',     title: 'Собственные цифровые сервисы и игровые проекты',        desc: 'Создаём и развиваем собственные цифровые сервисы и игровые проекты.' },
  { n: '07', icon: 'Layers',       title: 'Платформенные решения',                                 desc: 'Разрабатываем платформы и инструменты для масштабируемых цифровых экосистем.' },
];

const PROCESS_STEPS = [
  { icon: 'Search',       title: 'Анализ',         desc: 'Исследуем задачи и процессы' },
  { icon: 'PenTool',      title: 'Проектирование',  desc: 'Разрабатываем архитектуру решения' },
  { icon: 'Code2',        title: 'Разработка',      desc: 'Создаём продукт с использованием современных технологий' },
  { icon: 'Rocket',       title: 'Внедрение',       desc: 'Запускаем решение и обеспечиваем интеграцию' },
  { icon: 'Headphones',   title: 'Поддержка',       desc: 'Сопровождаем проект и развиваем его вместе с вами' },
];

const STRATEGY = [
  'Разработка программных решений',
  'Искусственный интеллект и автоматизация',
  'Игровые продукты',
  'SaaS сервисы',
  'Платформенные экосистемы',
];

const PRINCIPLES = [
  { icon: 'Code2',      title: 'Инженерный подход',    desc: 'Каждое решение проектируется с учётом долгосрочной масштабируемости и надёжности.' },
  { icon: 'Users',      title: 'Открытость',            desc: 'Выстраиваем прозрачное взаимодействие с заказчиками и партнёрами на всех этапах проекта.' },
  { icon: 'Target',     title: 'Практический результат', desc: 'Создаём технологии, которые помогают решать реальные задачи бизнеса.' },
  { icon: 'TrendingUp', title: 'Постоянное развитие',   desc: 'Расширяем компетенции, внедряем современные технологии и развиваем собственные продукты.' },
];

const REQUISITES = [
  { label: 'Полное наименование',      value: 'Акционерное общество «СОФТ ПЛЮС СИСТЕМС»' },
  { label: 'Сокращённое наименование', value: 'АО «С+»' },
  { label: 'ИНН',                      value: '9723262540' },
  { label: 'ОГРН',                     value: '1257700464669' },
  { label: 'Юридический адрес',        value: '109390, г. Москва, вн. тер. г. муниципальный округ Текстильщики, ул. Юных Ленинцев, д. 25' },
];

const About = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const goContacts = () => navigate('/#contacts');

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
      <section className="relative min-h-[55vh] flex items-end pb-20 pt-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={OFFICE_IMG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.95 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg0} 25%, rgba(7,10,15,0.15) 60%, transparent)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg0} 0%, transparent 35%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(7,10,15,0.4) 0%, transparent 25%)` }} />
        </div>
        <div className="section-pad relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px" style={{ background: gradBrand }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>О компании</span>
          </div>
          <h1 className="font-display font-bold mb-6 leading-tight"
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', color: C.text, maxWidth: 900 }}>
            О компании
          </h1>
          <p style={{ color: C.textSec, fontSize: 'clamp(1rem,1.4vw,1.2rem)', maxWidth: 700, lineHeight: 1.75 }}>
            Акционерное общество «СОФТ ПЛЮС СИСТЕМС» (АО «С+») — российская IT‑компания полного цикла, специализирующаяся на разработке программного обеспечения, внедрении искусственного интеллекта, цифровой трансформации и создании собственных технологических продуктов.
          </p>
        </div>
      </section>

      {/* ─── КТО МЫ ─── */}
      <section className="py-24">
        <div className="section-pad">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>О нас</span>
              </div>
              <h2 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', color: C.text }}>
                Кто мы
              </h2>
              <div className="flex flex-col gap-5" style={{ color: C.textSec, lineHeight: 1.8, fontSize: '1.05rem' }}>
                <p>Акционерное общество «СОФТ ПЛЮС СИСТЕМС» (АО «С+») — российская технологическая компания, объединяющая компетенции в области разработки программного обеспечения, искусственного интеллекта, цифровой трансформации и создания собственных цифровых продуктов.</p>
                <p>Мы создаём программные решения для бизнеса и государственных организаций, сопровождая проекты на всех этапах жизненного цикла — от анализа требований и проектирования архитектуры до разработки, внедрения и технической поддержки.</p>
                <p>Наша деятельность основана на инженерном подходе, современных технологических стандартах и стремлении создавать продукты, которые решают реальные задачи заказчиков.</p>
              </div>
            </div>

            {/* Схема компетенций */}
            <div className="relative flex items-center justify-center" style={{ minHeight: 360 }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full" style={{ width: 320, height: 320, border: `1px solid ${C.border}`, opacity: 0.4 }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full" style={{ width: 220, height: 220, border: `1px solid ${C.border}`, opacity: 0.25 }} />
              </div>
              <div className="relative z-10 flex items-center justify-center"
                style={{ width: 120, height: 120, filter: 'drop-shadow(0 0 24px rgba(47,128,255,0.45))' }}>
                <img src={LOGO_WHITE} alt="С+" className="w-full h-full object-contain"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.92 }} />
              </div>
              {[
                { label: 'Разработка ПО',           angle: -90 },
                { label: 'Искусственный интеллект', angle: -18 },
                { label: 'Цифровая трансформация',  angle:  54 },
                { label: 'Собственные продукты',    angle: 126 },
                { label: 'Консалтинг и архитектура',angle: 198 },
              ].map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 148;
                const y = Math.sin(rad) * 148;
                return (
                  <div key={i} className="absolute z-10 text-center"
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, top: '50%', left: '50%', width: 110 }}>
                    <div className="w-2 h-2 rounded-full mx-auto mb-1.5"
                      style={{ background: C.brand, boxShadow: `0 0 6px ${C.brand}` }} />
                    <span style={{ color: C.textSec, fontSize: '0.7rem', lineHeight: 1.3 }}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── НАПРАВЛЕНИЯ ─── */}
      <section className="py-24" style={{ background: C.bg1 }}>
        <div className="section-pad">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: gradBrand }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Направления</span>
          </div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', color: C.text }}>
            Чем занимается АО «С+»
          </h2>
          <p className="mb-12" style={{ color: C.textSec, maxWidth: 700, fontSize: '1.05rem', lineHeight: 1.75 }}>
            Компания развивает несколько взаимосвязанных направлений, объединяя сервисную разработку, консалтинг и собственные продукты в единую технологическую экосистему.
          </p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-px" style={{ border: `1px solid ${C.border}` }}>
            {DIRECTIONS.map((d, i) => (
              <div key={i} className="group relative p-7 transition-colors"
                style={{ background: C.bg0 }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bg2)}
                onMouseLeave={e => (e.currentTarget.style.background = C.bg0)}>
                <div className="text-xs mb-4 font-mono" style={{ color: C.brand }}>{d.n}</div>
                <div className="mb-3 w-10 h-10 flex items-center justify-center rounded"
                  style={{ background: 'rgba(47,128,255,0.1)', border: `1px solid ${C.border}` }}>
                  <Icon name={d.icon} size={20} style={{ color: C.brand }} />
                </div>
                <div className="font-semibold mb-2 leading-snug" style={{ color: C.text, fontSize: '0.95rem' }}>{d.title}</div>
                <div style={{ color: C.textMut, fontSize: '0.85rem', lineHeight: 1.65 }}>{d.desc}</div>
                <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  style={{ background: gradBrand }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── НАШ ПОДХОД ─── */}
      <section className="py-24">
        <div className="section-pad">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Методология</span>
              </div>
              <h2 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', color: C.text }}>
                Как мы работаем
              </h2>
              <div className="flex flex-col gap-5" style={{ color: C.textSec, lineHeight: 1.8, fontSize: '1.05rem' }}>
                <p>Мы убеждены, что успешный IT-проект начинается не с выбора технологий, а с глубокого понимания задач заказчика.</p>
                <p>Поэтому каждый проект проходит последовательные этапы анализа, проектирования, разработки, внедрения и дальнейшего сопровождения.</p>
                <p>Такой подход позволяет создавать масштабируемые, надёжные и удобные в эксплуатации решения, рассчитанные на долгосрочное использование.</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-5 p-5 transition-colors"
                  style={{ border: `1px solid ${C.border}`, background: C.bg1 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = C.brand)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded"
                    style={{ background: 'rgba(47,128,255,0.12)', border: `1px solid ${C.border}` }}>
                    <Icon name={step.icon} size={20} style={{ color: C.brand }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1" style={{ color: C.text }}>{step.title}</div>
                    <div style={{ color: C.textMut, fontSize: '0.875rem', lineHeight: 1.6 }}>{step.desc}</div>
                  </div>
                  <div className="flex-shrink-0 font-mono text-xs self-center" style={{ color: C.brand }}>0{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── СТРАТЕГИЯ ─── */}
      <section className="py-24" style={{ background: C.bg1 }}>
        <div className="section-pad">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Развитие</span>
              </div>
              <h2 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', color: C.text }}>
                Стратегия развития
              </h2>
              <div className="flex flex-col gap-5" style={{ color: C.textSec, lineHeight: 1.8, fontSize: '1.05rem' }}>
                <p>АО «С+» последовательно расширяет направления деятельности, развивает собственные цифровые продукты и внедряет современные технологии, включая искусственный интеллект, облачные сервисы и интеллектуальную автоматизацию.</p>
                <p>Мы стремимся формировать долгосрочную технологическую экспертизу и создавать решения, востребованные как коммерческим сектором, так и государственными организациями.</p>
              </div>
            </div>
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.3em]" style={{ color: C.textMut }}>Принципы работы</div>
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {PRINCIPLES.map((p, i) => (
                  <div key={i} className="p-5" style={{ border: `1px solid ${C.border}`, background: C.bg2 }}>
                    <div className="mb-3 w-9 h-9 flex items-center justify-center rounded"
                      style={{ background: 'rgba(47,128,255,0.1)' }}>
                      <Icon name={p.icon} size={18} style={{ color: C.brand }} />
                    </div>
                    <div className="font-semibold mb-1.5" style={{ color: C.text, fontSize: '0.9rem' }}>{p.title}</div>
                    <div style={{ color: C.textMut, fontSize: '0.8rem', lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mb-3 text-xs uppercase tracking-[0.3em]" style={{ color: C.textMut }}>Стратегический трек</div>
              <div className="flex flex-wrap gap-2">
                {STRATEGY.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm"
                    style={{ border: `1px solid ${C.border}`, color: C.textSec }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── РЕКВИЗИТЫ ─── */}
      <section className="py-24">
        <div className="section-pad">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: gradBrand }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Документы</span>
          </div>
          <h2 className="font-display font-bold mb-10" style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', color: C.text }}>
            Реквизиты компании
          </h2>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2" style={{ border: `1px solid ${C.border}` }}>
              {REQUISITES.map((r, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6 px-6 py-4"
                  style={{ borderBottom: i < REQUISITES.length - 1 ? `1px solid ${C.borderS}` : 'none' }}>
                  <div className="sm:w-64 flex-shrink-0 text-sm" style={{ color: C.textMut }}>{r.label}</div>
                  <div className="font-medium" style={{ color: C.text, fontSize: '0.95rem' }}>{r.value}</div>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ border: `1px solid ${C.border}`, background: C.bg1 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded"
                  style={{ background: 'rgba(47,128,255,0.1)', border: `1px solid ${C.border}` }}>
                  <Icon name="FileText" size={20} style={{ color: C.brand }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: C.text }}>Карточка организации</div>
                  <div className="text-xs" style={{ color: C.textMut }}>PDF-документ</div>
                </div>
              </div>
              <p className="text-sm mb-5" style={{ color: C.textSec, lineHeight: 1.65 }}>
                Реквизиты компании для оформления договоров и партнёрских соглашений.
              </p>
              <button
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all"
                style={{ background: gradBrand, color: '#fff' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                <Icon name="Download" size={16} />
                Скачать карточку (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── КОНТАКТЫ CTA ─── */}
      <section className="py-24">
        <div className="section-pad">
          <div className="relative overflow-hidden p-12 md:p-16"
            style={{ background: `linear-gradient(135deg, ${C.bg2} 0%, rgba(47,128,255,0.08) 100%)`, border: `1px solid ${C.border}` }}>
            <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(47,128,255,0.12) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="font-display font-bold mb-3"
                  style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: C.text }}>
                  Есть вопросы или хотите обсудить сотрудничество?
                </h2>
                <p style={{ color: C.textSec, lineHeight: 1.75, fontSize: '1.05rem' }}>
                  Свяжитесь с нами удобным способом — мы открыты к диалогу и готовы обсудить ваш проект.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <button onClick={goContacts}
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold transition-all"
                  style={{ background: gradBrand, color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  Связаться с нами <Icon name="ArrowRight" size={16} />
                </button>
                <Link to="/#contacts"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold transition-all"
                  style={{ border: `1px solid ${C.border}`, color: C.textSec }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.brand; e.currentTarget.style.color = C.text; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}>
                  Контакты
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default About;