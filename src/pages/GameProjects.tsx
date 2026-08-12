import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';
import useSEO from '@/hooks/useSEO';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const IMG_HERO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/32fcf391-bc64-4ff6-9147-d5251c301499.png';
const GAME_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/a481b456-4750-4058-a433-925f36e12555.png';

const C = {
  bg0:     '#070A0F',
  bg1:     '#0B1220',
  bg2:     '#101A2B',
  brand:   '#2F80FF',
  purple:  '#9B6DFF',
  purpleH: '#B18BFF',
  text:    '#E6EDF7',
  textSec: '#B6C2D1',
  textMut: '#7A8AA0',
  border:  'rgba(155,109,255,0.18)',
  borderS: 'rgba(255,255,255,0.05)',
};

const gradPurple = `linear-gradient(135deg, ${C.purple} 0%, ${C.brand} 100%)`;

const NAV = [
  { label: 'Направления', href: '/services', active: true },
  { label: 'Продукты',    href: '/products' },
  { label: 'О компании',  href: '/about' },
  { label: 'Блог',        href: '/blog' },
  { label: 'Карьера',     href: '/career' },
  { label: 'Контакты',    href: '/contacts' },
];

const WHAT_WE_CREATE = [
  { icon: 'Gamepad2',   title: 'Игровые продукты',              text: 'Разрабатываем собственные игровые проекты — от концепции и игровой механики до полноценного продукта и выхода на рынок.' },
  { icon: 'Wifi',        title: 'Онлайн-игры и сервисы',         text: 'Создаем игры с постоянным взаимодействием пользователей, серверной логикой, социальными механиками и регулярно обновляемым контентом.' },
  { icon: 'Layers',      title: 'Кроссплатформенные проекты',    text: 'Проектируем продукты с возможностью работы на мобильных устройствах, в браузере и на других целевых платформах.' },
  { icon: 'Globe2',      title: 'Развивающиеся игровые миры',    text: 'Создаем проекты, рассчитанные не только на запуск, но и на долгосрочное развитие, обновление контента и взаимодействие с аудиторией.' },
];

const COMPETENCIES = [
  { icon: 'Code2',        title: 'Разработка компьютерных игр', text: 'Проектируем игровую механику, архитектуру и клиентскую часть продукта, объединяя техническую разработку с визуальным и пользовательским опытом.' },
  { icon: 'Server',        title: 'Игровые серверы',             text: 'Разрабатываем серверную инфраструктуру для хранения данных, игровой логики, взаимодействия пользователей и работы онлайн-функциональности.' },
  { icon: 'Cloud',          title: 'Онлайн-сервисы',              text: 'Создаем необходимые для игровых продуктов сервисы: авторизацию, профили пользователей, платежную инфраструктуру, рейтинги, события и другие механики.' },
  { icon: 'BarChart3',      title: 'Игровая аналитика',           text: 'Собираем и анализируем данные о поведении пользователей, удержании, активности, игровой экономике и эффективности изменений продукта.' },
  { icon: 'Radio',          title: 'LiveOps',                     text: 'Развиваем игровые проекты после запуска с помощью событий, нового контента, механик, обновлений и постоянной работы с аудиторией.' },
  { icon: 'Coins',          title: 'Монетизация',                 text: 'Проектируем экономику продукта и механики монетизации с учетом пользовательского опыта, жизненного цикла игрока и долгосрочной эффективности проекта.' },
];

const STEPS = [
  { num: '01', icon: 'Lightbulb',    title: 'Концепция',           text: 'Определяем идею продукта, целевую аудиторию, ключевые игровые механики и модель развития проекта.' },
  { num: '02', icon: 'PenTool',      title: 'Проектирование',      text: 'Формируем игровую экономику, пользовательские сценарии, техническую архитектуру и требования к будущему продукту.' },
  { num: '03', icon: 'Code2',        title: 'Разработка',          text: 'Создаем клиентскую и серверную части, визуальный контент, интерфейсы и необходимые онлайн-сервисы.' },
  { num: '04', icon: 'Rocket',       title: 'Запуск',              text: 'Тестируем продукт, настраиваем аналитику и инфраструктуру, готовим игру к выходу на рынок и первым пользователям.' },
  { num: '05', icon: 'TrendingUp',   title: 'LiveOps и развитие',  text: 'Анализируем поведение аудитории, выпускаем обновления, развиваем контент, игровую экономику и механики монетизации.' },
];

const WHY_US = [
  { icon: 'Sparkles',    title: 'Собственные продукты',        text: 'Мы создаем игры как собственные цифровые продукты и самостоятельно проходим весь путь от идеи до запуска и дальнейшего развития.' },
  { icon: 'Cpu',          title: 'Технологическая экспертиза',   text: 'Игровые проекты позволяют развивать компетенции в клиент-серверной разработке, высоконагруженных системах, аналитике и масштабируемой инфраструктуре.' },
  { icon: 'Target',       title: 'Продуктовый подход',           text: 'Работа над игрой не заканчивается релизом. Мы рассматриваем запуск как начало жизненного цикла продукта и развиваем его на основании данных и обратной связи пользователей.' },
  { icon: 'Palette',      title: 'Технологии и контент',         text: 'Объединяем программную разработку, визуальную составляющую, пользовательский опыт и продуктовую аналитику в рамках единой команды.' },
  { icon: 'Coins',        title: 'Экономика продукта',           text: 'Проектируем игровые механики и монетизацию как взаимосвязанные элементы продукта, ориентируясь на его долгосрочное развитие.' },
];

const GameProjects = () => {
  useSEO({
    title: 'Игровые проекты | АО «С+»',
    description: 'Разрабатываем собственные игровые проекты, объединяя технологии, визуальный контент, игровую экономику и масштабируемую серверную инфраструктуру.',
    keywords: 'игровые проекты, разработка игр, GameDev, игровые серверы, LiveOps, игровая аналитика, монетизация, Лихие 90-е',
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
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 120%, rgba(155,109,255,0.10), transparent 70%)` }} />

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
                style={{ color: n.active ? C.purple : C.textSec }}
                onMouseEnter={e => { if (!n.active) e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { if (!n.active) e.currentTarget.style.color = C.textSec; }}>
                {n.label}
                <span className="absolute bottom-1 left-4 right-4 h-px transition-transform origin-left"
                  style={{ background: gradPurple, transform: n.active ? 'scaleX(1)' : 'scaleX(0)' }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={goDiscuss}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
              style={{ border: `1px solid ${C.purple}`, color: C.purple, background: 'transparent' }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.background = C.purple; t.style.color = '#fff'; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.color = C.purple; }}>
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
                  style={{ color: n.active ? C.purple : C.textSec, borderColor: C.borderS }}>
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
          <img src={IMG_HERO} alt="Игровые проекты" className="w-full h-full object-cover object-center" />
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
                onMouseEnter={e => { e.currentTarget.style.color = C.purple; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMut; }}>
                Направления
              </Link>
              <Icon name="ChevronRight" size={14} style={{ color: C.textMut } as React.CSSProperties} />
              <span style={{ color: C.purple }}>Игровые проекты</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid rgba(155,109,255,0.4)`, color: C.purple, background: 'rgba(155,109,255,0.08)' }}>
              <Icon name="Gamepad2" size={13} />
              Направление 03
            </div>

            <h1 className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', color: C.text, textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
              Игровые проекты
            </h1>

            <p className="text-lg leading-relaxed mb-6 max-w-xl" style={{ color: C.textSec }}>
              Создаем игровые продукты и развиваем их как технологический бизнес
            </p>

            <p className="text-base leading-relaxed mb-3 max-w-xl" style={{ color: C.textSec }}>
              Разрабатываем собственные игровые проекты, объединяя технологии, визуальный контент, игровую экономику и масштабируемую серверную инфраструктуру.
            </p>
            <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: C.textSec }}>
              Для нас игра — это не только программный продукт, но и постоянно развивающийся цифровой сервис, в котором технологии, аналитика, контент и монетизация работают как единая система.
            </p>

            <button onClick={() => document.getElementById('our-projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all"
              style={{ background: gradPurple, color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              Узнать о проектах <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── ЧТО МЫ СОЗДАЕМ ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 100% 50%, rgba(155,109,255,0.06) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.purple, background: 'rgba(155,109,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.purple }} />
            Что мы создаем
          </div>
          <div className="grid sm:grid-cols-2 gap-px mt-10" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHAT_WE_CREATE.map((w) => (
              <div key={w.title} className="p-8 lg:p-10" style={{ background: C.bg1 }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: 'rgba(155,109,255,0.1)' }}>
                  <Icon name={w.icon} size={22} style={{ color: C.purple } as React.CSSProperties} />
                </div>
                <h3 className="font-display font-semibold mb-3 text-lg" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КЛЮЧЕВЫЕ КОМПЕТЕНЦИИ ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="section-pad py-24">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid ${C.border}`, color: C.purple, background: 'rgba(155,109,255,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.purple }} />
              Ключевые компетенции
            </div>
            <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
              Разработка игровых продуктов требует одновременной работы с технологиями, пользовательским опытом, данными и экономикой проекта.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {COMPETENCIES.map((w) => (
              <div key={w.title} className="p-8" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.purple } as React.CSSProperties} />
                <h3 className="font-display font-semibold mb-2 text-base" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ОТ ИДЕИ ДО РАЗВИВАЮЩЕГОСЯ ИГРОВОГО ПРОДУКТА ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 10% 50%, rgba(155,109,255,0.05) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <h2 className="font-display font-bold mb-14 leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
            От идеи до развивающегося игрового продукта
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="relative p-6" style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(155,109,255,0.1)' }}>
                    <Icon name={s.icon} size={18} style={{ color: C.purple } as React.CSSProperties} />
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

      {/* ─── ПОЧЕМУ МЫ РАЗВИВАЕМ ИГРОВОЕ НАПРАВЛЕНИЕ ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-14 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.purple, background: 'rgba(155,109,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.purple }} />
            Почему мы развиваем игровое направление
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHY_US.map((w) => (
              <div key={w.title} className="p-8" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.purple } as React.CSSProperties} />
                <h3 className="font-display font-semibold mb-3 text-base" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── НАШИ ИГРОВЫЕ ПРОЕКТЫ ─── */}
      <section id="our-projects" style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 90% 30%, rgba(155,109,255,0.06) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.purple, background: 'rgba(155,109,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.purple }} />
            Наши игровые проекты
          </div>
          <p className="text-base leading-relaxed mb-10 max-w-2xl" style={{ color: C.textSec }}>
            Игры — территория для технологических экспериментов. Собственные игровые проекты позволяют нам создавать самостоятельные продукты и одновременно развивать технологии и компетенции, которые находят применение в других направлениях компании.
          </p>

          <Link to="/lihie90" className="group relative overflow-hidden block" style={{ minHeight: 440, border: `1px solid ${C.border}` }}>
            <img src={GAME_IMG} alt="Лихие 90-е"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.5) 50%, transparent)' }} />
            <div className="relative h-full flex flex-col justify-end p-8 lg:p-10" style={{ minHeight: 440 }}>
              <h3 className="font-display text-3xl font-bold mb-2" style={{ color: '#fff' }}>«Лихие 90-е»</h3>
              <p className="max-w-md mb-3" style={{ color: C.textSec }}>
                Криминальная RPG с открытым миром о 90-х годах в России. Реализм, атмосфера и свобода выбора.
              </p>
              <span className="inline-flex items-center gap-2 font-medium w-fit group-hover:gap-3 transition-all"
                style={{ color: C.purpleH }}>
                Подробнее о проекте <Icon name="ArrowRight" size={16} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad py-24 relative overflow-hidden" style={{ background: C.bg0 }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-10 rounded-full"
            style={{ background: `radial-gradient(ellipse, ${C.purple} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.purple, background: 'rgba(155,109,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.purple }} />
            Обсудим задачу
          </div>
          <h2 className="font-display font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Есть идея игрового продукта?
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.textSec }}>
            Расскажите нам о своем проекте или задаче — обсудим концепцию, технологический подход и возможности реализации.
          </p>
          <button onClick={goDiscuss}
            className="px-8 py-3.5 text-sm font-semibold transition-all"
            style={{ background: gradPurple, color: '#fff' }}
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

export default GameProjects;
