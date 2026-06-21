import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/files/e5b682da-cf58-41e2-be31-57a932303f40.jpg';
const AI_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/files/a7c219b0-f710-4405-8dbe-936362444f42.jpg';

const NAV = [
  { label: 'Главная', id: 'hero' },
  { label: 'Услуги', id: 'services' },
  { label: 'Решения', id: 'solutions' },
  { label: 'О компании', id: 'about' },
  { label: 'Блог', id: 'blog' },
  { label: 'Карьера', id: 'career' },
  { label: 'Контакты', id: 'contacts' },
];

const SERVICES = [
  { icon: 'Code2', title: 'Разработка ПО', desc: 'Проектирование и инженерия сложных программных систем под ключ — от архитектуры до эксплуатации.' },
  { icon: 'BrainCircuit', title: 'Искусственный интеллект', desc: 'ML-модели, компьютерное зрение и интеллектуальная автоматизация бизнес-процессов.' },
  { icon: 'LineChart', title: 'Цифровой консалтинг', desc: 'Стратегия цифровой трансформации, аудит и проектирование технологического ландшафта.' },
  { icon: 'Megaphone', title: 'Маркетинг tech-компаний', desc: 'Позиционирование и рост технологических продуктов на B2B и B2C рынках.' },
  { icon: 'Boxes', title: 'Собственные продукты', desc: 'Разработка и развитие собственной линейки цифровых продуктов и сервисов.' },
  { icon: 'Network', title: 'Платформенные решения', desc: 'Масштабируемые платформы и экосистемы интеграций корпоративного класса.' },
];

const PRODUCTS = [
  { tag: 'Платформа', title: 'Платформа С+', desc: 'Корпоративная платформа автоматизации и интеграции цифровых сервисов.', icon: 'Layers' },
  { tag: 'Игровая студия', title: '«Лихие 90-е»', desc: 'Сюжетная компьютерная игра — пример внутренней продуктовой разработки компании.', icon: 'Gamepad2' },
  { tag: 'AI-сервисы', title: 'Интеллектуальные модули', desc: 'Готовые AI-компоненты для встраивания в инфраструктуру заказчика.', icon: 'Sparkles' },
];

const STATS = [
  { value: '12+', label: 'лет инженерной практики' },
  { value: '200+', label: 'реализованных проектов' },
  { value: '6', label: 'направлений деятельности' },
  { value: '24/7', label: 'сопровождение систем' },
];

const BLOG = [
  { cat: 'Инженерия', title: 'Архитектура отказоустойчивых платформ', date: '14 июня 2026' },
  { cat: 'AI', title: 'Как мы внедряем ML в промышленные процессы', date: '02 июня 2026' },
  { cat: 'Консалтинг', title: 'Дорожная карта цифровой трансформации', date: '21 мая 2026' },
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
      {/* Глобальная сетка-фон */}
      <div className="fixed inset-0 grid-lines grid-fade pointer-events-none opacity-60" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,hsla(205,100%,40%,0.12),transparent_60%)]" />

      {/* HEADER */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass-card border-b border-white/5 py-3' : 'py-6 bg-transparent'}`}>
        <div className="section-pad flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center border border-primary/40 bg-primary/10">
              <span className="font-display font-bold text-xl text-primary">С+</span>
              <div className="absolute inset-0 animate-pulse-glow bg-primary/10" />
            </div>
            <div className="leading-none text-left">
              <div className="font-display font-semibold tracking-wide text-sm">АО «С+»</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Digital Engineering</div>
            </div>
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
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Связаться
              <Icon name="ArrowUpRight" size={16} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-foreground">
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden glass-card border-t border-white/5 mt-3 animate-fade-up">
            <div className="section-pad py-4 flex flex-col">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)}
                  className="py-3 text-left text-muted-foreground hover:text-foreground border-b border-white/5">
                  {n.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60" />
        </div>

        <div className="section-pad relative z-10 w-full">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/5 mb-8 animate-fade-up">
              <span className="w-2 h-2 bg-primary animate-pulse-glow" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">IT-компания полного цикла</span>
            </div>

            <h1 className="font-display font-bold leading-[0.95] mb-8 animate-fade-up" style={{ fontSize: 'clamp(2.75rem, 7vw, 7rem)', animationDelay: '0.1s' }}>
              <span className="block text-gradient">ИНЖЕНЕРИЯ</span>
              <span className="block">ЦИФРОВЫХ СИСТЕМ</span>
              <span className="block text-muted-foreground">ЛЮБОГО МАСШТАБА</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              АО «С+» проектирует, разрабатывает и сопровождает сложные программные платформы,
              системы искусственного интеллекта и собственные цифровые продукты.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => scrollTo('services')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Направления деятельности
                <Icon name="ArrowRight" size={18} />
              </button>
              <button onClick={() => scrollTo('solutions')}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-primary/50 hover:bg-primary/5 transition-colors font-medium">
                Наши продукты
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mt-24 border-y border-white/5 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {STATS.map((s) => (
              <div key={s.label} className="bg-background/60 backdrop-blur px-6 py-8">
                <div className="font-display font-bold text-3xl md:text-5xl text-primary mb-2">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-28 section-pad">
        <SectionHead kicker="Услуги" title="Направления деятельности" sub="Шесть инженерных компетенций, объединённых в единую экосистему полного цикла." />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5 mt-16 border border-white/5">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="group glass-card glow-border p-8 lg:p-10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 font-display text-7xl font-bold text-white/[0.03] p-4">0{i + 1}</div>
              <div className="w-14 h-14 flex items-center justify-center border border-primary/30 bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon name={s.icon} size={26} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS / PRODUCTS */}
      <section id="solutions" className="relative py-28 section-pad">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full" />
            <img src={AI_IMG} alt="AI инфраструктура" className="relative w-full border border-white/10 animate-float" />
          </div>
          <div>
            <SectionHead kicker="Решения" title="Собственные продукты" sub="Мы не только реализуем проекты для заказчиков, но и развиваем собственную линейку цифровых продуктов." />
            <div className="mt-10 flex flex-col gap-px bg-white/5 border border-white/5">
              {PRODUCTS.map((p) => (
                <div key={p.title} className="glass-card glow-border p-6 flex items-start gap-5 transition-all">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center border border-primary/30 bg-primary/10">
                    <Icon name={p.icon} size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-1">{p.tag}</div>
                    <h4 className="font-display text-xl font-semibold mb-1">{p.title}</h4>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-28 section-pad">
        <div className="glass-card border border-white/10 p-10 lg:p-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="relative grid lg:grid-cols-2 gap-16">
            <div>
              <SectionHead kicker="О компании" title="Зрелая инженерная культура" />
              <p className="text-lg text-muted-foreground leading-relaxed mt-8">
                АО «С+» — российская технологическая компания полного цикла. Мы объединяем глубокую
                инженерную экспертизу, продуктовое мышление и опыт реализации масштабных цифровых систем.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Наша цель — создавать надёжные технологические решения, которым доверяют клиенты,
                партнёры и инвесторы.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-px bg-white/5 border border-white/5 self-start">
              {[
                { icon: 'ShieldCheck', t: 'Надёжность', d: 'Системы корпоративного класса' },
                { icon: 'Cpu', t: 'Инженерия', d: 'Глубокая техническая экспертиза' },
                { icon: 'Workflow', t: 'Полный цикл', d: 'От стратегии до эксплуатации' },
                { icon: 'Globe', t: 'Масштаб', d: 'Проекты любого размера' },
              ].map((v) => (
                <div key={v.t} className="bg-background/60 p-7">
                  <Icon name={v.icon} size={24} className="text-primary mb-4" />
                  <div className="font-display font-semibold text-lg">{v.t}</div>
                  <div className="text-sm text-muted-foreground">{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="relative py-28 section-pad">
        <SectionHead kicker="Блог" title="Инженерная экспертиза" sub="Материалы об архитектуре, AI и цифровой трансформации от команды АО «С+»." />
        <div className="grid md:grid-cols-3 gap-px bg-white/5 mt-16 border border-white/5">
          {BLOG.map((b) => (
            <article key={b.title} className="glass-card glow-border p-8 group cursor-pointer transition-all">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-6">{b.cat}</div>
              <h3 className="font-display text-2xl font-semibold mb-6 group-hover:text-primary transition-colors">{b.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{b.date}</span>
                <Icon name="ArrowUpRight" size={18} className="group-hover:text-primary transition-colors" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CAREER */}
      <section id="career" className="relative py-28 section-pad">
        <div className="relative glass-card border border-white/10 p-10 lg:p-20 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsla(205,100%,50%,0.15),transparent_70%)]" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Карьера</div>
            <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Стройте сложные системы<br />вместе с нами
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              Мы ищем инженеров, исследователей и архитекторов, которым интересны задачи реального масштаба.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {['Backend', 'ML Engineer', 'Solution Architect', 'Product', 'DevOps', 'Frontend'].map((r) => (
                <span key={r} className="px-5 py-2 border border-white/10 bg-white/5 text-sm hover:border-primary/50 transition-colors">{r}</span>
              ))}
            </div>
            <button onClick={() => scrollTo('contacts')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Открытые вакансии
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative py-28 section-pad">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHead kicker="Контакты" title="Обсудим ваш проект" sub="Расскажите о задаче — мы предложим инженерное решение." />
            <div className="mt-10 flex flex-col gap-5">
              {[
                { icon: 'Mail', t: 'info@splus.ru', d: 'Электронная почта' },
                { icon: 'Phone', t: '+7 (495) 000-00-00', d: 'Отдел развития' },
                { icon: 'MapPin', t: 'Москва, Россия', d: 'Головной офис' },
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
              Отправить заявку
              <Icon name="Send" size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 section-pad py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center border border-primary/40 bg-primary/10">
              <span className="font-display font-bold text-xl text-primary">С+</span>
            </div>
            <div>
              <div className="font-display font-semibold">АО «С+»</div>
              <div className="text-xs text-muted-foreground">Инженерия цифровых систем</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="hover:text-foreground transition-colors">{n.label}</button>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/5 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© 2026 АО «С+». Все права защищены.</span>
          <span>Российская IT-компания полного цикла</span>
        </div>
      </footer>
    </div>
  );
};

const SectionHead = ({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) => (
  <div className="max-w-3xl">
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-px bg-primary" />
      <span className="text-xs uppercase tracking-[0.3em] text-primary">{kicker}</span>
    </div>
    <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}>{title}</h2>
    {sub && <p className="text-muted-foreground text-lg mt-5">{sub}</p>}
  </div>
);

const Field = ({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
    <input type={type} placeholder={placeholder}
      className="bg-background/60 border border-white/10 px-4 py-3 focus:border-primary/50 outline-none transition-colors" />
  </div>
);

export default Index;
