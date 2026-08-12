import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';
import useSEO from '@/hooks/useSEO';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const IMG_HERO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/229cd8e3-e493-413f-a957-6b508e64950c.png';

const C = {
  bg0:     '#070A0F',
  bg1:     '#0B1220',
  bg2:     '#101A2B',
  brand:   '#2F80FF',
  red:     '#FF6B6B',
  redH:    '#FF8A8A',
  text:    '#E6EDF7',
  textSec: '#B6C2D1',
  textMut: '#7A8AA0',
  border:  'rgba(255,107,107,0.18)',
  borderS: 'rgba(255,255,255,0.05)',
};

const gradRed = `linear-gradient(135deg, ${C.red} 0%, ${C.brand} 100%)`;

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
    icon: 'EyeOff',
    title: 'Есть сильный продукт, но рынок о нем не знает',
    text: 'Формируем позиционирование, определяем целевую аудиторию и выстраиваем систему продвижения, которая помогает продукту занять свое место на рынке.',
  },
  {
    icon: 'PuzzleIcon',
    title: 'Маркетинг есть, но не работает как система',
    text: 'Объединяем разрозненные инструменты и активности в единую стратегию с понятными целями, каналами, показателями и ответственностью за результат.',
  },
  {
    icon: 'MessageCircleQuestion',
    title: 'Сложный продукт трудно объяснить клиенту',
    text: 'Помогаем сформулировать ценность технологического решения и перевести сложные характеристики продукта в понятные преимущества для бизнеса и пользователей.',
  },
  {
    icon: 'Rocket',
    title: 'Нужно вывести новый продукт на рынок',
    text: 'Разрабатываем стратегию запуска, позиционирование, коммуникацию и план продвижения от подготовки продукта до масштабирования маркетинга.',
  },
];

const WHAT_WE_DO = [
  { icon: 'Compass',          title: 'Маркетинговая стратегия',        text: 'Анализируем рынок, продукт, конкурентов и аудиторию. Определяем позиционирование, цели, каналы продвижения и систему маркетинговых показателей.' },
  { icon: 'Megaphone',        title: 'Продвижение IT-компаний',        text: 'Формируем присутствие технологических компаний на рынке и выстраиваем коммуникацию с потенциальными клиентами, партнерами и профессиональным сообществом.' },
  { icon: 'MonitorSmartphone',title: 'Digital-маркетинг',              text: 'Создаем комплексную систему цифрового продвижения, объединяя сайт, поисковые системы, рекламу, контент и другие digital-каналы.' },
  { icon: 'Search',           title: 'SEO',                            text: 'Развиваем органическую видимость сайта и создаем поисковый контент, который привлекает целевую аудиторию на разных этапах принятия решения.' },
  { icon: 'TrendingUp',       title: 'Performance-маркетинг',          text: 'Запускаем и оптимизируем рекламные кампании с фокусом на измеримые показатели, стоимость привлечения и конечный бизнес-результат.' },
  { icon: 'FileText',         title: 'Контент-маркетинг',              text: 'Создаем экспертный контент, который помогает объяснять сложные продукты, формировать доверие и поддерживать продажи.' },
  { icon: 'Newspaper',        title: 'PR',                             text: 'Выстраиваем коммуникацию компании с рынком, СМИ и профессиональным сообществом, усиливая узнаваемость и репутацию бренда.' },
  { icon: 'UserCircle',       title: 'Личный бренд руководителей',     text: 'Формируем профессиональное позиционирование собственников и руководителей как экспертов и представителей технологического бизнеса.' },
  { icon: 'Rocket',           title: 'Запуск новых продуктов',         text: 'Разрабатываем go-to-market стратегию, позиционирование и комплекс маркетинговых активностей для вывода новых решений на рынок.' },
];

const STEPS = [
  { num: '01', icon: 'Search',        title: 'Анализ',                 text: 'Изучаем продукт, рынок, конкурентов, аудиторию, существующий маркетинг и бизнес-модель компании.' },
  { num: '02', icon: 'Target',        title: 'Позиционирование',       text: 'Определяем ценность продукта, ключевые аудитории, конкурентные преимущества и основные коммуникационные сообщения.' },
  { num: '03', icon: 'Compass',       title: 'Стратегия',              text: 'Формируем маркетинговую модель: цели, каналы, инструменты, бюджет, показатели эффективности и план реализации.' },
  { num: '04', icon: 'Rocket',        title: 'Запуск',                 text: 'Настраиваем необходимые каналы и запускаем маркетинговые активности в соответствии с выбранной стратегией.' },
  { num: '05', icon: 'BarChart3',     title: 'Аналитика и развитие',   text: 'Анализируем результаты, перераспределяем ресурсы между каналами и последовательно повышаем эффективность маркетинга.' },
];

const WHY_US = [
  { icon: 'Cpu',           title: 'Специализация на технологическом бизнесе', text: 'Понимаем специфику IT-продуктов, сложных решений, длинного цикла сделки и профессиональной аудитории.' },
  { icon: 'Briefcase',      title: 'Маркетинг начинается с бизнеса',           text: 'Отталкиваемся от бизнес-модели, продукта и коммерческих целей компании, а не от набора доступных рекламных инструментов.' },
  { icon: 'Code2',          title: 'Говорим на языке технологий',              text: 'Понимаем технологические продукты и умеем превращать сложную техническую информацию в понятную рынку ценность.' },
  { icon: 'Layers',         title: 'Стратегия и реализация',                   text: 'Можем не только разработать маркетинговую стратегию, но и принять участие в ее практической реализации и дальнейшем развитии.' },
  { icon: 'BarChart3',      title: 'Решения на основе данных',                 text: 'Используем аналитику и измеримые показатели для оценки эффективности каналов, гипотез и маркетинговых инвестиций.' },
  { icon: 'Blocks',         title: 'Комплексная экспертиза',                   text: 'Объединяем стратегический маркетинг, digital, performance, SEO, контент, PR и продуктовый подход в рамках единой системы.' },
];

const TechMarketing = () => {
  useSEO({
    title: 'Маркетинг технологических компаний | АО «С+»',
    description: 'Разрабатываем маркетинговые стратегии для IT-компаний и цифровых продуктов, помогаем формировать позиционирование, усиливать присутствие на рынке и выстраивать системное привлечение клиентов.',
    keywords: 'маркетинг IT-компаний, digital-маркетинг, SEO, performance-маркетинг, контент-маркетинг, PR, позиционирование, go-to-market',
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
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 120%, rgba(255,107,107,0.10), transparent 70%)` }} />

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
                style={{ color: n.active ? C.red : C.textSec }}
                onMouseEnter={e => { if (!n.active) e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { if (!n.active) e.currentTarget.style.color = C.textSec; }}>
                {n.label}
                <span className="absolute bottom-1 left-4 right-4 h-px transition-transform origin-left"
                  style={{ background: gradRed, transform: n.active ? 'scaleX(1)' : 'scaleX(0)' }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={goDiscuss}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
              style={{ border: `1px solid ${C.red}`, color: C.red, background: 'transparent' }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.background = C.red; t.style.color = '#fff'; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.color = C.red; }}>
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
                  style={{ color: n.active ? C.red : C.textSec, borderColor: C.borderS }}>
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
          <img src={IMG_HERO} alt="Маркетинг технологических компаний" className="w-full h-full object-cover object-center" />
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
                onMouseEnter={e => { e.currentTarget.style.color = C.red; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMut; }}>
                Направления
              </Link>
              <Icon name="ChevronRight" size={14} style={{ color: C.textMut } as React.CSSProperties} />
              <span style={{ color: C.red }}>Маркетинг tech-компаний</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid rgba(255,107,107,0.4)`, color: C.red, background: 'rgba(255,107,107,0.08)' }}>
              <Icon name="Megaphone" size={13} />
              Направление 05
            </div>

            <h1 className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', color: C.text, textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
              Маркетинг технологических компаний
            </h1>

            <p className="text-lg leading-relaxed mb-6 max-w-xl" style={{ color: C.textSec }}>
              Превращаем сложные технологии в понятные рынку продукты
            </p>

            <p className="text-base leading-relaxed mb-3 max-w-xl" style={{ color: C.textSec }}>
              Разрабатываем маркетинговые стратегии для IT-компаний и цифровых продуктов, помогаем формировать позиционирование, усиливать присутствие на рынке и выстраивать системное привлечение клиентов.
            </p>
            <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: C.textSec }}>
              Понимаем специфику технологического бизнеса и умеем говорить одновременно на языке продукта, бизнеса и его аудитории.
            </p>

            <button onClick={goDiscuss}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all"
              style={{ background: gradRed, color: '#fff' }}
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
          style={{ background: `radial-gradient(ellipse 60% 40% at 100% 50%, rgba(255,107,107,0.06) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.red, background: 'rgba(255,107,107,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
            Когда мы можем быть полезны
          </div>
          <div className="grid sm:grid-cols-2 gap-px mt-10" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHEN_USEFUL.map((w) => (
              <div key={w.title} className="p-8 lg:p-10" style={{ background: C.bg1 }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: 'rgba(255,107,107,0.1)' }}>
                  <Icon name={w.icon} size={22} style={{ color: C.red } as React.CSSProperties} />
                </div>
                <h3 className="font-display font-semibold mb-3 text-lg" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ЧТО МЫ ДЕЛАЕМ ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="section-pad py-24">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid ${C.border}`, color: C.red, background: 'rgba(255,107,107,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
              Что мы делаем
            </div>
            <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
              Выстраиваем маркетинг как единую систему — от стратегии и позиционирования до привлечения клиентов, коммуникаций и развития бренда.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHAT_WE_DO.map((w) => (
              <div key={w.title} className="p-7" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.red } as React.CSSProperties} />
                <h3 className="font-display font-semibold mb-2 text-base" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ОТ ПРОДУКТА ДО СИСТЕМНОГО МАРКЕТИНГА ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 10% 50%, rgba(255,107,107,0.05) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <h2 className="font-display font-bold mb-14 leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
            От продукта до системного маркетинга
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="relative p-6" style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,107,107,0.1)' }}>
                    <Icon name={s.icon} size={18} style={{ color: C.red } as React.CSSProperties} />
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
            style={{ border: `1px solid ${C.border}`, color: C.red, background: 'rgba(255,107,107,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
            Почему С+
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHY_US.map((w) => (
              <div key={w.title} className="p-8" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.red } as React.CSSProperties} />
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
            style={{ background: `radial-gradient(ellipse, ${C.red} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.red, background: 'rgba(255,107,107,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
            Обсудим задачу
          </div>
          <h2 className="font-display font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Технологии должны быть понятны рынку
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.textSec }}>
            Даже сильный продукт нуждается в правильном позиционировании и системном продвижении. Поможем определить его место на рынке, сформировать ценность для аудитории и выстроить маркетинг, который работает на задачи бизнеса.
          </p>
          <button onClick={goDiscuss}
            className="px-8 py-3.5 text-sm font-semibold transition-all"
            style={{ background: gradRed, color: '#fff' }}
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

export default TechMarketing;
