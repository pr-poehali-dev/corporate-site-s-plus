import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const HERO_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/04cb0faf-bf58-41b4-9e40-aa2213f851e0.png';
const DEV_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/927a7206-245d-4419-833b-ebebe282a50b.png';
const GAME_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/a481b456-4750-4058-a433-925f36e12555.png';

const NAV = [
  { label: 'Направления', id: 'services' },
  { label: 'Технологии', id: 'tech' },
  { label: 'О компании', id: 'about' },
  { label: 'Блог', id: 'blog' },
  { label: 'Карьера', id: 'career' },
  { label: 'Контакты', id: 'contacts' },
];

const HERO_TAGS = [
  { title: 'Разработка ПО', side: 'left', top: '12%' },
  { title: 'Консалтинг', side: 'left', top: '42%' },
  { title: 'Игровые проекты', side: 'left', top: '72%' },
  { title: 'AI и автоматизация', side: 'right', top: '8%' },
  { title: 'Маркетинг tech-компаний', side: 'right', top: '38%' },
  { title: 'Платформа С+', side: 'right', top: '68%' },
];

const SERVICES = [
  { icon: 'Code2', title: 'Разработка ПО', desc: 'Корпоративные системы, веб-платформы, мобильные приложения и сложные интеграции.' },
  { icon: 'BrainCircuit', title: 'AI и автоматизация', desc: 'Внедряем искусственный интеллект, автоматизируем процессы и создаём умные сервисы.' },
  { icon: 'Gamepad2', title: 'Игровые проекты', desc: 'Создаём игры и игровые миры. Наш флагманский проект — «Лихие 90-е».' },
  { icon: 'LineChart', title: 'Консалтинг', desc: 'Цифровая стратегия, IT-архитектура, проектирование и оптимизация процессов.' },
  { icon: 'Megaphone', title: 'Маркетинг', desc: 'Продвижение технологических продуктов и компаний на B2B и B2C рынках.' },
  { icon: 'Layers', title: 'Платформа С+', desc: 'Технологическая платформа для создания масштабируемых цифровых решений.' },
];

const WHY = [
  { icon: 'Workflow', t: 'Полный цикл разработки', d: 'От анализа и архитектуры до поддержки и развития' },
  { icon: 'BrainCircuit', t: 'AI-first подход', d: 'Используем ИИ для создания умных систем и автоматизации' },
  { icon: 'Building2', t: 'Enterprise экспертиза', d: 'Строим решения уровня крупных корпораций и госструктур' },
  { icon: 'Handshake', t: 'Гибкие модели сотрудничества', d: 'Адаптируемся под задачи клиента и обеспечиваем независимость' },
  { icon: 'ShieldCheck', t: 'Российская компания', d: 'Локальная команда, понимание рынка и полная независимость' },
  { icon: 'Target', t: 'Фокус на результат', d: 'Измеримые KPI, прозрачность и ответственность' },
];

const PRODUCTS = [
  { tag: 'AI-сервисы', title: 'AI-сервисы в разработке', desc: 'Интеллектуальные сервисы для бизнеса на базе современных моделей ИИ и машинного обучения.', soon: true, icon: 'Sparkles' },
  { tag: 'SaaS', title: 'SaaS-платформы в разработке', desc: 'Облачные продукты для автоматизации бизнес-процессов.', soon: true, icon: 'Cloud' },
  { tag: 'Игры', title: 'Новые игровые проекты', desc: 'Работаем над новыми игровыми вселенными и механиками.', soon: true, icon: 'Gamepad2' },
];

const TECH = [
  { icon: 'BrainCircuit', name: 'AI / Machine Learning' },
  { icon: 'MessagesSquare', name: 'LLM / NLP' },
  { icon: 'Database', name: 'Big Data' },
  { icon: 'Cloud', name: 'Cloud' },
  { icon: 'Infinity', name: 'DevOps' },
  { icon: 'Boxes', name: 'Microservices' },
  { icon: 'ShieldCheck', name: 'Cybersecurity' },
  { icon: 'Network', name: 'API / Integration' },
  { icon: 'Cpu', name: 'IoT' },
  { icon: 'Hexagon', name: 'Blockchain' },
];

const PROCESS = [
  { n: '01', t: 'Анализируем задачу', d: 'Погружаемся в бизнес и формируем видение решения' },
  { n: '02', t: 'Проектируем решение', d: 'Архитектура, прототипы, оценка сроков и бюджета' },
  { n: '03', t: 'Разрабатываем и тестируем', d: 'Гибкая разработка и контроль качества на каждом этапе' },
  { n: '04', t: 'Внедряем и запускаем', d: 'Интеграция, миграция и запуск в эксплуатацию' },
  { n: '05', t: 'Поддерживаем и развиваем', d: 'Техническая поддержка и постоянное развитие продукта' },
];

const STATS = [
  { value: 'Полный цикл', label: 'разработки' },
  { value: 'AI-first', label: 'подход' },
  { value: 'Российская', label: 'компания' },
  { value: 'Фокус на', label: 'результат' },
];

const BLOG = [
  { cat: 'AI', title: 'Как AI меняет корпоративные процессы', date: '12 июня 2026' },
  { cat: 'Разработка', title: 'Архитектура масштабируемых веб-платформ', date: '28 апреля 2026' },
  { cat: 'GovTech', title: 'Государственные цифровые платформы: тренды 2026', date: '15 марта 2026' },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="eco-bg min-h-screen text-foreground relative">
      <div className="fixed inset-0 grid-lines grid-fade pointer-events-none opacity-50" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,hsla(205,100%,40%,0.10),transparent_60%)]" />

      {/* HEADER */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass-card border-b border-white/5 py-2' : 'py-4 bg-transparent'}`}>
        <div className="section-pad flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3">
            <img src={LOGO} alt="АО С+" className="h-11 w-auto object-contain" />
            <span className="font-display font-semibold text-lg tracking-wide hidden sm:block">АО «С+»</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
                {n.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo('contacts')}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              Обсудить проект
              <Icon name="ArrowUpRight" size={16} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden glass-card border-t border-white/5 mt-2 animate-fade-up">
            <div className="section-pad py-4 flex flex-col">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)}
                  className="py-3 text-left text-muted-foreground hover:text-foreground border-b border-white/5">{n.label}</button>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        {/* плавающие теги направлений (десктоп) */}
        <div className="absolute inset-0 hidden xl:block section-pad pointer-events-none">
          {HERO_TAGS.map((t, i) => (
            <div key={t.title}
              className="absolute glass-card border border-primary/20 px-4 py-3 text-sm font-medium animate-fade-up animate-float"
              style={{
                top: t.top,
                [t.side]: 'clamp(1.25rem, 6vw, 9rem)',
                animationDelay: `${0.6 + i * 0.12}s`,
              } as React.CSSProperties}>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary animate-pulse-glow" />
                {t.title}
              </span>
            </div>
          ))}
        </div>

        <div className="section-pad relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/5 mb-8 animate-fade-up">
              <span className="w-2 h-2 bg-primary animate-pulse-glow" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Российская IT-компания полного цикла</span>
            </div>

            <h1 className="font-display font-bold leading-[1] mb-8 animate-fade-up" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', animationDelay: '0.1s' }}>
              <span className="block text-gradient">Создаём технологии,</span>
              <span className="block">которые меняют бизнес</span>
              <span className="block">и строят будущее</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Разрабатываем программное обеспечение, внедряем искусственный интеллект,
              создаём собственные продукты и сопровождаем проекты любой сложности.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => scrollTo('contacts')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Обсудить проект
                <Icon name="ArrowRight" size={18} />
              </button>
              <button onClick={() => scrollTo('services')}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-primary/50 hover:bg-primary/5 transition-colors font-medium">
                Наши направления
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 mt-14 border border-white/5 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {STATS.map((s) => (
                <div key={s.value} className="bg-background/50 backdrop-blur px-5 py-5">
                  <Icon name="CheckCircle2" size={18} className="text-primary mb-2" />
                  <div className="font-display font-semibold text-sm">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-28 section-pad">
        <SectionHead kicker="Направления деятельности" title="Решаем сложные задачи и создаём продукты" action="Все направления" onAction={() => scrollTo('solutions')} />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5 mt-16 border border-white/5">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="group glass-card glow-border p-8 lg:p-10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 font-display text-7xl font-bold text-white/[0.03] p-4">0{i + 1}</div>
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon name={s.icon} size={26} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
              <Icon name="ArrowRight" size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </section>

      {/* DEV / ARCHITECTURE */}
      <section className="relative py-20 section-pad">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full" />
            <img src={DEV_IMG} alt="Архитектура информационных систем" className="relative w-full border border-white/10" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHead kicker="Инженерия" title="Архитектура систем любого масштаба" sub="Проектируем отказоустойчивые платформы, микросервисы и сложные интеграции корпоративного уровня." />
            <div className="mt-8 flex flex-col gap-4">
              {['Микросервисная архитектура', 'API-first интеграции', 'Высоконагруженные системы', 'DevOps и облачная инфраструктура'].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <Icon name="Check" size={18} className="text-primary" />
                  <span className="text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative py-20 section-pad">
        <SectionHead kicker="Почему выбирают нас" title="Надёжный технологический партнёр для вашего бизнеса" />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5 mt-14 border border-white/5">
          {WHY.map((w) => (
            <div key={w.t} className="glass-card glow-border p-7 transition-all">
              <div className="w-12 h-12 flex items-center justify-center border border-primary/30 bg-primary/10 mb-5">
                <Icon name={w.icon} size={22} className="text-primary" />
              </div>
              <h4 className="font-display text-lg font-semibold mb-2">{w.t}</h4>
              <p className="text-sm text-muted-foreground">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="solutions" className="relative py-28 section-pad">
        <SectionHead kicker="Собственные продукты" title="Создаём продукты, которыми пользуются" />
        <div className="grid lg:grid-cols-12 gap-px bg-white/5 mt-16 border border-white/5">
          {/* Лихие 90-е — крупный блок */}
          <article className="lg:col-span-6 relative min-h-[420px] group overflow-hidden">
            <img src={GAME_IMG} alt="Лихие 90-е" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary mb-3">Флагманский проект</span>
              <h3 className="font-display text-3xl font-bold mb-2">«Лихие 90-е»</h3>
              <p className="text-muted-foreground max-w-md mb-2">Криминальная RPG с открытым миром о 90-х годах в России. Реализм, атмосфера и свобода выбора.</p>
              <button className="inline-flex items-center gap-2 text-primary font-medium mt-2 w-fit hover:gap-3 transition-all">
                Подробнее о проекте <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </article>
          {/* остальные продукты */}
          <div className="lg:col-span-6 grid gap-px bg-white/5">
            {PRODUCTS.map((p) => (
              <div key={p.title} className="glass-card glow-border p-7 flex items-start gap-5 transition-all">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center border border-primary/30 bg-primary/10">
                  <Icon name={p.icon} size={22} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary">{p.tag}</div>
                    {p.soon && <span className="text-[10px] px-2 py-0.5 border border-white/15 text-muted-foreground">Скоро</span>}
                  </div>
                  <h4 className="font-display text-xl font-semibold mb-1">{p.title}</h4>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="relative py-20 section-pad">
        <SectionHead kicker="Технологии" title="Используем передовые технологии" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-white/5 mt-14 border border-white/5">
          {TECH.map((t) => (
            <div key={t.name} className="glass-card glow-border p-7 flex flex-col items-center text-center gap-4 transition-all">
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 bg-primary/10">
                <Icon name={t.icon} size={24} className="text-primary" />
              </div>
              <span className="text-sm font-medium">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS + ABOUT */}
      <section id="about" className="relative py-28 section-pad">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHead kicker="Как мы работаем" title="Прозрачный процесс — предсказуемый результат" />
            <div className="mt-12 flex flex-col">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="flex gap-5 pb-8 relative">
                  {i < PROCESS.length - 1 && <span className="absolute left-[18px] top-10 bottom-0 w-px bg-white/10" />}
                  <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-primary/40 bg-primary/10 font-display text-sm text-primary z-10">{p.n}</div>
                  <div>
                    <h4 className="font-display text-lg font-semibold mb-1">{p.t}</h4>
                    <p className="text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card border border-white/10 p-8 lg:p-12 relative overflow-hidden self-start">
            <div className="absolute inset-0 grid-lines opacity-40" />
            <div className="relative">
              <SectionHead kicker="О компании" title="Технологии. Люди. Результат." />
              <p className="text-muted-foreground leading-relaxed mt-8">
                АО «С+» — российская IT-компания полного цикла. Мы объединяем экспертизу,
                технологии и страсть к созданию сложных цифровых продуктов.
              </p>
              <div className="grid grid-cols-3 gap-px bg-white/5 border border-white/5 mt-10">
                {[
                  { icon: 'Code2', t: 'IT', d: 'экспертиза' },
                  { icon: 'BrainCircuit', t: 'AI', d: 'компетенции' },
                  { icon: 'Boxes', t: 'Продукты', d: 'и платформы' },
                ].map((v) => (
                  <div key={v.t} className="bg-background/50 p-5 text-center">
                    <Icon name={v.icon} size={22} className="text-primary mb-3 mx-auto" />
                    <div className="font-display font-semibold">{v.t}</div>
                    <div className="text-xs text-muted-foreground">{v.d}</div>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 text-primary font-medium mt-8 hover:gap-3 transition-all">
                Подробнее о компании <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG + CAREER */}
      <section id="blog" className="relative py-20 section-pad">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHead kicker="Блог" title="Экспертиза, статьи и новости" action="Все статьи" onAction={() => {}} />
            <div className="mt-10 flex flex-col gap-px bg-white/5 border border-white/5">
              {BLOG.map((b) => (
                <article key={b.title} className="glass-card glow-border p-6 group cursor-pointer transition-all flex items-center justify-between gap-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2">{b.cat}</div>
                    <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">{b.title}</h3>
                    <span className="text-sm text-muted-foreground">{b.date}</span>
                  </div>
                  <Icon name="ArrowUpRight" size={20} className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </article>
              ))}
            </div>
          </div>

          <div id="career" className="relative glass-card border border-white/10 p-8 lg:p-12 overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsla(205,100%,50%,0.18),transparent_70%)]" />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Карьера</div>
              <h2 className="font-display font-bold mb-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}>
                Присоединяйтесь к команде
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Работаем над сложными проектами и растём вместе. Создаём будущее — присоединяйтесь к нам.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Backend', 'ML Engineer', 'Solution Architect', 'Product', 'DevOps', 'Frontend'].map((r) => (
                  <span key={r} className="px-4 py-2 border border-white/10 bg-white/5 text-sm hover:border-primary/50 transition-colors">{r}</span>
                ))}
              </div>
              <button onClick={() => scrollTo('contacts')} className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                Смотреть вакансии <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 section-pad">
        <div className="relative glass-card border border-white/10 p-10 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsla(205,100%,50%,0.15),transparent_70%)]" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}>Готовы обсудить ваш проект?</h2>
              <p className="text-muted-foreground">Расскажите о вашей задаче — мы предложим оптимальное решение.</p>
            </div>
            <button onClick={() => scrollTo('contacts')}
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Связаться с нами <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative py-20 section-pad">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHead kicker="Контакты" title="Обсудим ваш проект" sub="Расскажите о задаче — мы предложим инженерное решение." />
            <div className="mt-10 flex flex-col gap-5">
              {[
                { icon: 'Mail', t: 'info@softplus.systems', d: 'Электронная почта' },
                { icon: 'Phone', t: '+7 (495) 123-45-67', d: 'Отдел развития' },
                { icon: 'MapPin', t: 'г. Москва', d: 'Головной офис' },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-5">
                  <div className="w-12 h-12 flex items-center justify-center border border-primary/30 bg-primary/10">
                    <Icon name={c.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-medium">{c.t}</div>
                    <div className="text-sm text-muted-foreground">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="glass-card border border-white/10 p-8 lg:p-10 flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Имя" placeholder="Иван Петров" />
              <Field label="Компания" placeholder="ООО «Компания»" />
            </div>
            <Field label="E-mail" placeholder="you@company.ru" type="email" />
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Задача</label>
              <textarea rows={4} placeholder="Опишите проект..."
                className="bg-background/60 border border-white/10 px-4 py-3 focus:border-primary/50 outline-none transition-colors resize-none" />
            </div>
            <button type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Отправить заявку <Icon name="Send" size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 section-pad py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO} alt="АО С+" className="h-10 w-auto object-contain" />
              <span className="font-display font-semibold">АО «С+»</span>
            </div>
            <p className="text-sm text-muted-foreground">Российская IT-компания полного цикла.</p>
          </div>
          <FooterCol title="Направления" items={SERVICES.map((s) => s.title)} />
          <FooterCol title="Компания" items={['О компании', 'Блог', 'Карьера', 'Контакты']} onClick={(t) => { const map: Record<string,string> = {'О компании':'about','Блог':'blog','Карьера':'career','Контакты':'contacts'}; if (map[t]) scrollTo(map[t]); }} />
          <div>
            <div className="font-display font-semibold mb-4">Контакты</div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>info@softplus.systems</span>
              <span>+7 (495) 123-45-67</span>
              <span>г. Москва</span>
              <div className="flex gap-3 mt-3">
                {['Send', 'MessageCircle', 'Linkedin'].map((ic) => (
                  <span key={ic} className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer">
                    <Icon name={ic} size={16} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-xs text-muted-foreground">
          © 2026 АО «С+». Все права защищены.
        </div>
      </footer>
    </div>
  );
};

const SectionHead = ({ kicker, title, sub, action, onAction }: { kicker: string; title: string; sub?: string; action?: string; onAction?: () => void }) => (
  <div className="flex items-end justify-between gap-6 flex-wrap">
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-primary" />
        <span className="text-xs uppercase tracking-[0.3em] text-primary">{kicker}</span>
      </div>
      <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)' }}>{title}</h2>
      {sub && <p className="text-muted-foreground text-lg mt-4">{sub}</p>}
    </div>
    {action && (
      <button onClick={onAction} className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all whitespace-nowrap">
        {action} <Icon name="ArrowRight" size={16} />
      </button>
    )}
  </div>
);

const Field = ({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
    <input type={type} placeholder={placeholder}
      className="bg-background/60 border border-white/10 px-4 py-3 focus:border-primary/50 outline-none transition-colors" />
  </div>
);

const FooterCol = ({ title, items, onClick }: { title: string; items: string[]; onClick?: (t: string) => void }) => (
  <div>
    <div className="font-display font-semibold mb-4">{title}</div>
    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
      {items.map((it) => (
        <button key={it} onClick={() => onClick?.(it)} className="text-left hover:text-foreground transition-colors">{it}</button>
      ))}
    </div>
  </div>
);

export default Index;
