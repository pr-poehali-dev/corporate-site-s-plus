import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';
import useSEO from '@/hooks/useSEO';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const IMG_HERO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fe84d075-429f-4c34-84d4-f90c0604c677.png';

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

const WHEN_USEFUL = [
  {
    icon: 'Sparkles',
    title: 'Нужно создать новый цифровой продукт',
    text: 'Есть идея, бизнес-задача или требования к будущей системе — поможем превратить их в спроектированный и работающий программный продукт.',
  },
  {
    icon: 'TrendingUp',
    title: 'Существующее решение требует развития',
    text: 'Модернизируем действующие системы, расширяем функциональность, перерабатываем архитектуру и устраняем технологические ограничения.',
  },
  {
    icon: 'Workflow',
    title: 'Необходимо автоматизировать процессы',
    text: 'Создаем программные решения, которые объединяют данные, пользователей и бизнес-процессы в единой цифровой среде.',
  },
  {
    icon: 'Network',
    title: 'Нужно связать несколько систем',
    text: 'Проектируем интеграции между внутренними и внешними сервисами, информационными системами, API и источниками данных.',
  },
];

const WHAT_WE_BUILD = [
  { icon: 'Building2',  title: 'Корпоративные порталы',           text: 'Единые цифровые пространства для сотрудников, подразделений, партнеров и внутренних сервисов организации.' },
  { icon: 'Globe',       title: 'Веб-системы',                     text: 'Высоконагруженные веб-сервисы, отраслевые платформы и специализированные информационные системы.' },
  { icon: 'Smartphone',  title: 'Мобильные приложения',            text: 'Приложения для iOS и Android как самостоятельные продукты или часть корпоративной цифровой экосистемы.' },
  { icon: 'UserCircle',  title: 'Личные кабинеты',                 text: 'Интерфейсы для клиентов, сотрудников и партнеров с интеграцией во внутренние информационные системы.' },
  { icon: 'Database',    title: 'CRM и ERP-решения',                text: 'Системы для управления клиентами, продажами, ресурсами и внутренними бизнес-процессами.' },
  { icon: 'GitMerge',    title: 'Интеграционные проекты',          text: 'Объединяем существующие информационные системы, сервисы и источники данных в единую инфраструктуру.' },
  { icon: 'Boxes',       title: 'API и микросервисная архитектура', text: 'Проектируем архитектуру для сложных, распределенных и масштабируемых программных решений.' },
  { icon: 'LifeBuoy',    title: 'Поддержка и развитие',            text: 'Развиваем существующие продукты, внедряем новую функциональность, оптимизируем и сопровождаем системы после запуска.' },
];

const STEPS = [
  { num: '01', icon: 'Search',       title: 'Анализ',                  text: 'Изучаем бизнес-задачу, требования, пользователей, существующую инфраструктуру и ограничения проекта.' },
  { num: '02', icon: 'PenTool',      title: 'Проектирование',          text: 'Определяем архитектуру решения, функциональные требования, пользовательские сценарии и подход к реализации.' },
  { num: '03', icon: 'Code2',        title: 'Разработка',              text: 'Создаем программный продукт итерационно, обеспечивая контроль качества и прозрачность процесса разработки.' },
  { num: '04', icon: 'CheckCircle2', title: 'Тестирование и запуск',   text: 'Проверяем работу системы, производительность и корректность интеграций, после чего готовим продукт к промышленной эксплуатации.' },
  { num: '05', icon: 'Rocket',       title: 'Поддержка и развитие',    text: 'Сопровождаем решение после запуска, развиваем функциональность и адаптируем продукт под новые задачи.' },
];

const WHY_US = [
  { icon: 'Layers',      title: 'Комплексный подход',                    text: 'Работаем не только с программным кодом. Учитываем бизнес-задачи, пользовательские сценарии, инфраструктуру и дальнейшее развитие продукта.' },
  { icon: 'TrendingUp',   title: 'Архитектура с запасом на развитие',    text: 'Проектируем решения с учетом будущего роста нагрузки, функциональности и количества пользователей.' },
  { icon: 'Cpu',          title: 'Работа со сложными системами',         text: 'Готовы к проектам с большим количеством интеграций, нестандартной бизнес-логикой и повышенными требованиями к надежности.' },
  { icon: 'ShieldCheck',  title: 'Информационная безопасность',          text: 'Учитываем требования к защите данных и безопасности информационных систем еще на этапе проектирования.' },
  { icon: 'Sliders',      title: 'Гибкая модель реализации',             text: 'Можем реализовать проект под ключ или подключиться к отдельному этапу, усилив существующую команду заказчика.' },
];

const SoftwareDevelopment = () => {
  useSEO({
    title: 'Разработка программного обеспечения | АО «С+»',
    description: 'Проектируем и разрабатываем корпоративные информационные системы, веб-платформы, мобильные приложения и специализированное программное обеспечение под задачи бизнеса и государственных организаций.',
    keywords: 'разработка ПО, корпоративные порталы, веб-системы, мобильные приложения, CRM, ERP, интеграции, API, микросервисы',
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
              style={{ background: 'rgba(7,10,15,0.98)', borderBottom: `1px solid ${C.border}`, padding: '0.5rem clamp(1.25rem,4vw,6rem) 1rem' }}>
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
      <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Разработка программного обеспечения" className="w-full h-full object-cover object-center" />
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
                onMouseEnter={e => { e.currentTarget.style.color = C.brand; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMut; }}>
                Направления
              </Link>
              <Icon name="ChevronRight" size={14} style={{ color: C.textMut } as React.CSSProperties} />
              <span style={{ color: C.brand }}>Разработка ПО</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid rgba(47,128,255,0.4)`, color: C.brand, background: 'rgba(47,128,255,0.08)' }}>
              <Icon name="Code2" size={13} />
              Направление 01
            </div>

            <h1 className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', color: C.text, textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
              Разработка программного обеспечения
            </h1>

            <p className="text-lg leading-relaxed mb-6 max-w-xl" style={{ color: C.textSec }}>
              Создаем программные продукты под задачи бизнеса и государственных организаций
            </p>

            <p className="text-base leading-relaxed mb-3 max-w-xl" style={{ color: C.textSec }}>
              Проектируем и разрабатываем корпоративные информационные системы, веб-платформы, мобильные приложения и специализированное программное обеспечение.
            </p>
            <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: C.textSec }}>
              Берем на себя полный цикл создания продукта — от анализа задачи и проектирования архитектуры до разработки, запуска и дальнейшего развития.
            </p>

            <button onClick={goDiscuss}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all"
              style={{ background: gradBrand, color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              Обсудить проект <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── КОГДА МЫ МОЖЕМ БЫТЬ ПОЛЕЗНЫ ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 100% 50%, rgba(47,128,255,0.06) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.brand, background: 'rgba(47,128,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.brand }} />
            Когда мы можем быть полезны
          </div>
          <div className="grid sm:grid-cols-2 gap-px mt-10" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHEN_USEFUL.map((w) => (
              <div key={w.title} className="p-8 lg:p-10" style={{ background: C.bg1 }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: 'rgba(47,128,255,0.1)' }}>
                  <Icon name={w.icon} size={22} style={{ color: C.brand } as React.CSSProperties} />
                </div>
                <h3 className="font-display font-semibold mb-3 text-lg" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ЧТО МЫ РАЗРАБАТЫВАЕМ ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="section-pad py-24">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid ${C.border}`, color: C.brand, background: 'rgba(47,128,255,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.brand }} />
              Что мы разрабатываем
            </div>
            <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
              Создаем программные решения с учетом требований к производительности, масштабируемости, информационной безопасности и дальнейшему развитию продукта.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHAT_WE_BUILD.map((w) => (
              <div key={w.title} className="p-7" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.brand } as React.CSSProperties} />
                <h3 className="font-display font-semibold mb-2 text-base" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ОТ ЗАДАЧИ ДО РАБОТАЮЩЕГО ПРОДУКТА ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 10% 50%, rgba(47,128,255,0.05) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <h2 className="font-display font-bold mb-14 leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
            От задачи до работающего продукта
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="relative p-6" style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(47,128,255,0.1)' }}>
                    <Icon name={s.icon} size={18} style={{ color: C.brand } as React.CSSProperties} />
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
            style={{ border: `1px solid ${C.border}`, color: C.brand, background: 'rgba(47,128,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.brand }} />
            Почему С+
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHY_US.map((w) => (
              <div key={w.title} className="p-8" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.brand } as React.CSSProperties} />
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
            style={{ background: `radial-gradient(ellipse, ${C.brand} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.brand, background: 'rgba(47,128,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.brand }} />
            Обсудим задачу
          </div>
          <h2 className="font-display font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Есть задача — найдем технологическое решение
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.textSec }}>
            Расскажите нам о проекте, существующей системе или бизнес-задаче. Изучим вводные, определим возможный подход к реализации и предложим следующие шаги.
          </p>
          <button onClick={goDiscuss}
            className="px-8 py-3.5 text-sm font-semibold transition-all"
            style={{ background: gradBrand, color: '#fff' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
            Обсудить проект
          </button>
        </div>
      </section>

      <div className="section-pad" style={{ background: C.bg0 }}>
        <SiteFooter />
      </div>
    </div>
  );
};

export default SoftwareDevelopment;
