import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';
import useSEO from '@/hooks/useSEO';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const IMG_HERO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/f2ef3f3e-deb6-469e-894b-30c4fb3d21f0.png';

const C = {
  bg0:     '#070A0F',
  bg1:     '#0B1220',
  bg2:     '#101A2B',
  brand:   '#2F80FF',
  signal:  '#00D38A',
  signalH: '#33E0A3',
  text:    '#E6EDF7',
  textSec: '#B6C2D1',
  textMut: '#7A8AA0',
  border:  'rgba(0,211,138,0.18)',
  borderS: 'rgba(255,255,255,0.05)',
};

const gradSignal = `linear-gradient(135deg, ${C.signal} 0%, ${C.brand} 100%)`;

const NAV = [
  { label: 'Направления', href: '/services', active: true },
  { label: 'Продукты',    href: '/products' },
  { label: 'О компании',  href: '/about' },
  { label: 'Блог',        href: '/blog' },
  { label: 'Карьера',     href: '/career' },
  { label: 'Контакты',    href: '/contacts' },
];

const WHEN_USEFUL = [
  {
    icon: 'GitBranch',
    title: 'IT-системы развиваются бессистемно',
    text: 'Помогаем сформировать целевую архитектуру, определить взаимосвязи между системами и выстроить последовательный план развития цифровой инфраструктуры.',
  },
  {
    icon: 'GitCompare',
    title: 'Нужно выбрать технологическое решение',
    text: 'Оцениваем возможные подходы, платформы и архитектурные варианты с учетом бизнес-задач, бюджета и перспектив дальнейшего развития.',
  },
  {
    icon: 'AlertTriangle',
    title: 'Текущие системы стали ограничением',
    text: 'Анализируем существующую IT-инфраструктуру, выявляем технологические риски, узкие места и причины высокой стоимости поддержки.',
  },
  {
    icon: 'Map',
    title: 'Планируется цифровая трансформация',
    text: 'Помогаем определить приоритеты, сформировать дорожную карту изменений и связать технологические инициативы с конкретными задачами бизнеса.',
  },
];

const WHAT_WE_DO = [
  { icon: 'Lightbulb',    title: 'IT-консалтинг',                text: 'Помогаем принимать обоснованные решения в области разработки, инфраструктуры, технологий и развития информационных систем.' },
  { icon: 'Boxes',         title: 'Проектирование архитектуры',   text: 'Разрабатываем архитектуру информационных систем и определяем принципы взаимодействия между приложениями, сервисами, данными и инфраструктурой.' },
  { icon: 'ClipboardCheck',title: 'Аудит информационных систем',  text: 'Оцениваем архитектуру, технологии, производительность, безопасность и возможности дальнейшего развития существующих решений.' },
  { icon: 'Rocket',        title: 'Цифровая трансформация',       text: 'Помогаем определить направления цифрового развития компании и сформировать последовательную программу технологических изменений.' },
  { icon: 'Workflow',      title: 'Оптимизация процессов',        text: 'Анализируем существующие бизнес-процессы и определяем возможности их автоматизации, упрощения и технологической перестройки.' },
  { icon: 'ShieldCheck',   title: 'Техническая экспертиза',       text: 'Проводим независимую оценку проектов, решений, технической документации и предложений подрядчиков.' },
  { icon: 'Compass',       title: 'Архитектурное сопровождение',  text: 'Поддерживаем проект на ключевых этапах реализации, контролируя соответствие решений выбранной архитектуре и стратегическим целям.' },
];

const STEPS = [
  { num: '01', icon: 'Search',        title: 'Погружение',                text: 'Изучаем бизнес-задачи, существующие системы, процессы, ограничения и планы развития компании.' },
  { num: '02', icon: 'Stethoscope',    title: 'Диагностика',               text: 'Определяем ключевые проблемы, технологические риски, точки роста и потенциальные ограничения.' },
  { num: '03', icon: 'PenTool',        title: 'Проектирование решения',    text: 'Формируем целевую архитектуру, возможные сценарии развития и требования к будущим изменениям.' },
  { num: '04', icon: 'ListOrdered',    title: 'Приоритизация',             text: 'Определяем последовательность инициатив с учетом эффекта, сложности реализации, стоимости и зависимостей.' },
  { num: '05', icon: 'Compass',        title: 'Сопровождение',             text: 'При необходимости сопровождаем реализацию изменений и помогаем сохранять целостность выбранного технологического подхода.' },
];

const WHY_US = [
  { icon: 'Layers',        title: 'Бизнес и технологии в одной системе',  text: 'Рассматриваем IT не отдельно от бизнеса, а как инструмент достижения конкретных организационных и коммерческих целей.' },
  { icon: 'Unlink',         title: 'Независимость решений',                 text: 'Не привязываем рекомендации к конкретной платформе, подрядчику или технологии, если этого не требует сама задача.' },
  { icon: 'Code2',          title: 'Практический опыт разработки',          text: 'Наши рекомендации основаны не только на теории — мы сами проектируем и создаем программные продукты и понимаем ограничения реальной разработки.' },
  { icon: 'Network',        title: 'Системный архитектурный подход',        text: 'Оцениваем не отдельный сервис или приложение, а его место в общей цифровой архитектуре компании.' },
  { icon: 'TrendingUp',     title: 'Ориентация на долгосрочное развитие',   text: 'Учитываем масштабирование, интеграции, стоимость владения и возможность дальнейшего развития решений.' },
  { icon: 'Sliders',        title: 'Гибкий формат работы',                  text: 'Можем провести отдельную экспертизу, комплексный аудит или сопровождать компанию на протяжении всей программы изменений.' },
];

const DigitalConsulting = () => {
  useSEO({
    title: 'Цифровой консалтинг | АО «С+»',
    description: 'Помогаем компаниям выстраивать эффективную цифровую архитектуру, проектировать информационные системы и принимать технологические решения с учетом текущих задач и долгосрочного развития.',
    keywords: 'цифровой консалтинг, IT-консалтинг, архитектура информационных систем, аудит IT, цифровая трансформация, техническая экспертиза',
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
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 120%, rgba(0,211,138,0.10), transparent 70%)` }} />

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
                style={{ color: n.active ? C.signal : C.textSec }}
                onMouseEnter={e => { if (!n.active) e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { if (!n.active) e.currentTarget.style.color = C.textSec; }}>
                {n.label}
                <span className="absolute bottom-1 left-4 right-4 h-px transition-transform origin-left"
                  style={{ background: gradSignal, transform: n.active ? 'scaleX(1)' : 'scaleX(0)' }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={goDiscuss}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
              style={{ border: `1px solid ${C.signal}`, color: C.signal, background: 'transparent' }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.background = C.signal; t.style.color = '#07131a'; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.color = C.signal; }}>
              Обсудить задачу <Icon name="ArrowUpRight" size={16} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2" style={{ color: C.text }}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>

          {menuOpen && (
            <div className="absolute top-full inset-x-0 flex flex-col"
              style={{ background: 'rgba(7,10,15,0.98)', borderBottom: `1px solid ${C.border}`, padding: '0.5rem clamp(1.25rem,4vw,6rem) 1rem' }}>
              {NAV.map((n) => (
                <Link key={n.label} to={n.href} onClick={() => setMenuOpen(false)}
                  className="py-3 text-left transition-colors border-b"
                  style={{ color: n.active ? C.signal : C.textSec, borderColor: C.borderS }}>
                  {n.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Цифровой консалтинг" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(7,10,15,0.94) 0%, rgba(7,10,15,0.72) 50%, rgba(7,10,15,0.35) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(0deg, rgba(7,10,15,0.96) 0%, transparent 40%)' }} />
        </div>

        <div className="relative section-pad pt-44 pb-24 flex flex-col justify-end" style={{ minHeight: '90vh' }}>
          <div className="max-w-2xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Link to="/" className="transition-colors" style={{ color: C.textMut }}
                onMouseEnter={e => { e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMut; }}>
                Главная
              </Link>
              <Icon name="ChevronRight" size={14} style={{ color: C.textMut } as React.CSSProperties} />
              <Link to="/services" className="transition-colors" style={{ color: C.textMut }}
                onMouseEnter={e => { e.currentTarget.style.color = C.signal; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMut; }}>
                Направления
              </Link>
              <Icon name="ChevronRight" size={14} style={{ color: C.textMut } as React.CSSProperties} />
              <span style={{ color: C.signal }}>Цифровой консалтинг</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid rgba(0,211,138,0.4)`, color: C.signal, background: 'rgba(0,211,138,0.08)' }}>
              <Icon name="BarChart2" size={13} />
              Направление 04
            </div>

            <h1 className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', color: C.text, textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
              Цифровой консалтинг
            </h1>

            <p className="text-lg leading-relaxed mb-6 max-w-xl" style={{ color: C.textSec }}>
              Помогаем принимать технологические решения, которые работают на бизнес
            </p>

            <p className="text-base leading-relaxed mb-3 max-w-xl" style={{ color: C.textSec }}>
              Помогаем компаниям выстраивать эффективную цифровую архитектуру, проектировать информационные системы и принимать технологические решения с учетом текущих задач и долгосрочного развития.
            </p>
            <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: C.textSec }}>
              Работаем на стыке бизнеса и технологий — помогаем определить, какие решения действительно нужны компании, как их правильно спроектировать и как избежать лишних затрат и технологических ограничений.
            </p>

            <button onClick={goDiscuss}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all"
              style={{ background: gradSignal, color: '#07131a' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              Обсудить задачу <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── КОГДА МЫ МОЖЕМ БЫТЬ ПОЛЕЗНЫ ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 100% 50%, rgba(0,211,138,0.06) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.signal, background: 'rgba(0,211,138,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.signal }} />
            Когда мы можем быть полезны
          </div>
          <div className="grid sm:grid-cols-2 gap-px mt-10" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHEN_USEFUL.map((w) => (
              <div key={w.title} className="p-8 lg:p-10" style={{ background: C.bg1 }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: 'rgba(0,211,138,0.1)' }}>
                  <Icon name={w.icon} size={22} style={{ color: C.signal } as React.CSSProperties} />
                </div>
                <h3 className="font-display font-semibold mb-3 text-lg" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ЧЕМ МЫ ЗАНИМАЕМСЯ ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="section-pad py-24">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid ${C.border}`, color: C.signal, background: 'rgba(0,211,138,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.signal }} />
              Чем мы занимаемся
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHAT_WE_DO.map((w) => (
              <div key={w.title} className="p-7" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.signal } as React.CSSProperties} />
                <h3 className="font-display font-semibold mb-2 text-base" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ОТ АНАЛИЗА К ТЕХНОЛОГИЧЕСКОЙ СТРАТЕГИИ ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 10% 50%, rgba(0,211,138,0.05) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <h2 className="font-display font-bold mb-14 leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
            От анализа к технологической стратегии
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="relative p-6" style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,211,138,0.1)' }}>
                    <Icon name={s.icon} size={18} style={{ color: C.signal } as React.CSSProperties} />
                  </div>
                  <span className="font-display font-bold text-xl" style={{ color: 'rgba(255,255,255,0.15)' }}>{s.num}</span>
                </div>
                <h3 className="font-semibold mb-2 text-base" style={{ color: C.text }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ПОЧЕМУ С+ ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-14 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.signal, background: 'rgba(0,211,138,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.signal }} />
            Почему С+
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHY_US.map((w) => (
              <div key={w.title} className="p-8" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.signal } as React.CSSProperties} />
                <h3 className="font-display font-semibold mb-3 text-base" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad py-24 relative overflow-hidden" style={{ background: C.bg1 }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-10 rounded-full"
            style={{ background: `radial-gradient(ellipse, ${C.signal} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.signal, background: 'rgba(0,211,138,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.signal }} />
            Обсудим задачу
          </div>
          <h2 className="font-display font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Сложные технологические решения начинаются с правильных вопросов
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.textSec }}>
            Расскажите нам о задаче, существующей инфраструктуре или планируемых изменениях. Поможем разобраться в ситуации, определить возможные сценарии и выбрать оптимальный путь развития.
          </p>
          <button onClick={goDiscuss}
            className="px-8 py-3.5 text-sm font-semibold transition-all"
            style={{ background: gradSignal, color: '#07131a' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
            Обсудить задачу
          </button>
        </div>
      </section>

      <div className="section-pad" style={{ background: C.bg0 }}>
        <SiteFooter />
      </div>
    </div>
  );
};

export default DigitalConsulting;
