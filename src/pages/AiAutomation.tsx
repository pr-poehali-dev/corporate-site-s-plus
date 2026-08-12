import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';
import useSEO from '@/hooks/useSEO';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const IMG_HERO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/5a6b7385-2823-4f51-b6c1-768f4326ce80.png';

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
  border:  'rgba(0,194,255,0.18)',
  borderS: 'rgba(255,255,255,0.05)',
};

const gradTech = `linear-gradient(135deg, ${C.tech} 0%, ${C.brand} 100%)`;

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
    icon: 'Clock',
    title: 'Сотрудники тратят время на рутинные операции',
    text: 'Автоматизируем повторяющиеся задачи и работу с информацией, сокращая количество ручных операций и освобождая ресурсы команды.',
  },
  {
    icon: 'Layers3',
    title: 'Информации становится слишком много',
    text: 'Помогаем быстро находить, обрабатывать и анализировать данные, документы и корпоративные знания с помощью AI.',
  },
  {
    icon: 'Gauge',
    title: 'Нужно повысить эффективность процессов',
    text: 'Анализируем существующие процессы и определяем задачи, где применение искусственного интеллекта может дать измеримый практический эффект.',
  },
  {
    icon: 'Lightbulb',
    title: 'Есть идея AI-продукта',
    text: 'Помогаем пройти путь от идеи и проверки гипотезы до разработки и внедрения полноценного интеллектуального сервиса.',
  },
];

const WHAT_WE_BUILD = [
  { icon: 'Bot',          title: 'Корпоративные AI-помощники', text: 'Создаем интеллектуальных помощников для сотрудников и клиентов, способных работать с корпоративными знаниями, документами и внутренними системами.' },
  { icon: 'SearchCode',   title: 'Интеллектуальный поиск',     text: 'Разрабатываем системы поиска по большим массивам корпоративной информации с пониманием контекста и смысла пользовательского запроса.' },
  { icon: 'FileScan',     title: 'Обработка документов',       text: 'Автоматизируем классификацию, анализ, извлечение и структурирование информации из документов и других неструктурированных источников.' },
  { icon: 'BarChart3',    title: 'Анализ данных',              text: 'Используем AI для обработки больших массивов информации, выявления закономерностей и подготовки данных для принятия решений.' },
  { icon: 'Workflow',     title: 'Автоматизация бизнес-процессов', text: 'Встраиваем AI в существующие процессы и сокращаем объем ручных операций при работе с информацией и типовыми задачами.' },
  { icon: 'MessageSquareText', title: 'LLM-решения',           text: 'Создаем решения на базе больших языковых моделей с учетом специфики бизнеса, корпоративных данных и требований к информационной безопасности.' },
  { icon: 'Plug',         title: 'AI-интеграции',              text: 'Интегрируем технологии искусственного интеллекта с корпоративными информационными системами, сервисами, базами знаний и внешними платформами.' },
  { icon: 'Sparkles',     title: 'Интеллектуальные сервисы',   text: 'Проектируем и разрабатываем самостоятельные продукты и сервисы, в которых технологии искусственного интеллекта являются частью основной функциональности.' },
];

const STEPS = [
  { num: '01', icon: 'Search',       title: 'Анализ',                 text: 'Изучаем бизнес-процесс, данные и существующую инфраструктуру. Определяем задачи, где применение AI действительно целесообразно.' },
  { num: '02', icon: 'PenTool',      title: 'Проектирование',         text: 'Выбираем технологический подход, определяем архитектуру решения, требования к данным и сценарии использования.' },
  { num: '03', icon: 'FlaskConical', title: 'Прототипирование',       text: 'Создаем прототип и проверяем ключевые гипотезы до перехода к полноценной разработке и внедрению.' },
  { num: '04', icon: 'Code2',        title: 'Разработка и интеграция', text: 'Разрабатываем решение и интегрируем его в существующую IT-инфраструктуру и бизнес-процессы организации.' },
  { num: '05', icon: 'Rocket',       title: 'Запуск и развитие',      text: 'Запускаем решение, оцениваем его работу на реальных сценариях и развиваем с учетом полученных результатов.' },
];

const WHY_US = [
  { icon: 'Target',       title: 'AI для решения задач, а не ради технологии', text: 'Начинаем с бизнес-задачи и только после этого определяем, где и каким образом применение искусственного интеллекта действительно оправдано.' },
  { icon: 'Layers',        title: 'Экспертиза в разработке',                    text: 'Рассматриваем AI не как отдельный инструмент, а как часть полноценной информационной системы, которая должна надежно работать и интегрироваться с существующей инфраструктурой.' },
  { icon: 'Building',      title: 'Работа с корпоративным контуром',            text: 'Создаем решения с учетом внутренних данных, информационных систем, бизнес-процессов и требований конкретной организации.' },
  { icon: 'ShieldCheck',   title: 'Информационная безопасность',                text: 'Учитываем требования к защите корпоративной информации, разграничению доступа и работе с чувствительными данными.' },
  { icon: 'Blocks',        title: 'Независимость от конкретной технологии',     text: 'Подбираем модели, инструменты и архитектуру исходя из задачи проекта, а не привязываем решение к одной AI-платформе или поставщику.' },
];

const AiAutomation = () => {
  useSEO({
    title: 'Искусственный интеллект и автоматизация | АО «С+»',
    description: 'Разрабатываем и внедряем решения на базе современных технологий искусственного интеллекта, которые помогают автоматизировать процессы, работать с большими объемами информации и повышать эффективность бизнеса.',
    keywords: 'искусственный интеллект, AI, автоматизация, LLM, корпоративные AI-помощники, интеллектуальный поиск, обработка документов, анализ данных',
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
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 120%, rgba(0,194,255,0.10), transparent 70%)` }} />

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
                style={{ color: n.active ? C.tech : C.textSec }}
                onMouseEnter={e => { if (!n.active) e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { if (!n.active) e.currentTarget.style.color = C.textSec; }}>
                {n.label}
                <span className="absolute bottom-1 left-4 right-4 h-px transition-transform origin-left"
                  style={{ background: gradTech, transform: n.active ? 'scaleX(1)' : 'scaleX(0)' }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={goDiscuss}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
              style={{ border: `1px solid ${C.tech}`, color: C.tech, background: 'transparent' }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.background = C.tech; t.style.color = '#07131a'; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.color = C.tech; }}>
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
                  style={{ color: n.active ? C.tech : C.textSec, borderColor: C.borderS }}>
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
          <img src={IMG_HERO} alt="Искусственный интеллект и автоматизация" className="w-full h-full object-cover object-center" />
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
                onMouseEnter={e => { e.currentTarget.style.color = C.tech; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMut; }}>
                Направления
              </Link>
              <Icon name="ChevronRight" size={14} style={{ color: C.textMut } as React.CSSProperties} />
              <span style={{ color: C.tech }}>ИИ и автоматизация</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid rgba(0,194,255,0.4)`, color: C.tech, background: 'rgba(0,194,255,0.08)' }}>
              <Icon name="BrainCircuit" size={13} />
              Направление 02
            </div>

            <h1 className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', color: C.text, textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
              Искусственный интеллект и автоматизация
            </h1>

            <p className="text-lg leading-relaxed mb-6 max-w-xl" style={{ color: C.textSec }}>
              Внедряем искусственный интеллект в реальные бизнес-процессы
            </p>

            <p className="text-base leading-relaxed mb-3 max-w-xl" style={{ color: C.textSec }}>
              Разрабатываем и внедряем решения на базе современных технологий искусственного интеллекта, которые помогают автоматизировать процессы, работать с большими объемами информации и повышать эффективность бизнеса.
            </p>
            <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: C.textSec }}>
              Используем AI как практический инструмент для решения конкретных задач — от корпоративных помощников и интеллектуального поиска до комплексной автоматизации процессов.
            </p>

            <button onClick={goDiscuss}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all"
              style={{ background: gradTech, color: '#07131a' }}
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
          style={{ background: `radial-gradient(ellipse 60% 40% at 100% 50%, rgba(0,194,255,0.06) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.tech, background: 'rgba(0,194,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.tech }} />
            Когда мы можем быть полезны
          </div>
          <div className="grid sm:grid-cols-2 gap-px mt-10" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHEN_USEFUL.map((w) => (
              <div key={w.title} className="p-8 lg:p-10" style={{ background: C.bg1 }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: 'rgba(0,194,255,0.1)' }}>
                  <Icon name={w.icon} size={22} style={{ color: C.tech } as React.CSSProperties} />
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
              style={{ border: `1px solid ${C.border}`, color: C.tech, background: 'rgba(0,194,255,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.tech }} />
              Что мы разрабатываем
            </div>
            <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
              Создаем AI-решения под конкретные процессы и задачи организации с возможностью интеграции в существующую цифровую инфраструктуру.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHAT_WE_BUILD.map((w) => (
              <div key={w.title} className="p-7" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.tech } as React.CSSProperties} />
                <h3 className="font-display font-semibold mb-2 text-base" style={{ color: C.text }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ОТ ЗАДАЧИ ДО РАБОТАЮЩЕГО AI-РЕШЕНИЯ ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 10% 50%, rgba(0,194,255,0.05) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <h2 className="font-display font-bold mb-14 leading-tight max-w-2xl"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
            От задачи до работающего AI-решения
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="relative p-6" style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,194,255,0.1)' }}>
                    <Icon name={s.icon} size={18} style={{ color: C.tech } as React.CSSProperties} />
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
            style={{ border: `1px solid ${C.border}`, color: C.tech, background: 'rgba(0,194,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.tech }} />
            Почему С+
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: `1px solid ${C.borderS}`, background: C.borderS }}>
            {WHY_US.map((w) => (
              <div key={w.title} className="p-8" style={{ background: C.bg0 }}>
                <Icon name={w.icon} size={24} className="mb-4" style={{ color: C.tech } as React.CSSProperties} />
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
            style={{ background: `radial-gradient(ellipse, ${C.tech} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.tech, background: 'rgba(0,194,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.tech }} />
            Обсудим задачу
          </div>
          <h2 className="font-display font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Найдем практическое применение AI для вашей задачи
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.textSec }}>
            Расскажите нам о процессе, который хотите автоматизировать, или идее AI-продукта. Изучим задачу, оценим возможности применения искусственного интеллекта и предложим подход к реализации.
          </p>
          <button onClick={goDiscuss}
            className="px-8 py-3.5 text-sm font-semibold transition-all"
            style={{ background: gradTech, color: '#07131a' }}
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

export default AiAutomation;
