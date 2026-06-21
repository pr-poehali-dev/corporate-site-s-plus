import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';

const IMG_HERO    = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/eff337df-b3a7-40c1-b032-cd036b088a62.png';
const IMG_SERIAL  = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/82b03de2-82d8-41dd-9bec-7a24f45d6ed5.png';
const IMG_OLD_NEW = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/d920d925-113e-468a-bb3b-10838f874559.png';
const IMG_SOON    = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/74040df6-5127-4210-9089-4f2352b1eb13.png';

const C = {
  bg0:     '#0A0705',
  bg1:     '#130E08',
  bg2:     '#1A1208',
  gold:    '#E8A020',
  goldL:   '#F5C842',
  red:     '#C0392B',
  text:    '#F0E8D8',
  textSec: '#C8B898',
  textMut: '#8A7A60',
  border:  'rgba(232,160,32,0.18)',
  borderS: 'rgba(255,255,255,0.05)',
};

const gradGold = `linear-gradient(135deg, ${C.gold} 0%, ${C.goldL} 100%)`;

const NAV = [
  { label: 'Направления', href: '/services' },
  { label: 'Продукты',    href: '/products', active: true },
  { label: 'О компании',  href: '/about' },
  { label: 'Блог',        href: '/blog' },
  { label: 'Карьера',     href: '/career' },
  { label: 'Контакты',    href: '/contacts' },
];

const HISTORY_CARDS = [
  {
    year: '2011',
    title: 'Стремительный старт',
    text: 'После выхода игра менее чем за час вошла в число самых популярных проектов социальной сети «ВКонтакте», набрав более 100 000 установок.',
    icon: 'Zap',
    num: '100К+',
    sub: 'установок за час',
  },
  {
    year: 'Первый месяц',
    title: 'Более 500 000 игроков',
    text: 'За первый месяц после запуска аудитория проекта превысила 500 000 игроков, подтвердив высокий интерес пользователей к игровой вселенной.',
    icon: 'Users',
    num: '500К+',
    sub: 'игроков за месяц',
  },
  {
    year: 'Развитие',
    title: 'Успех на нескольких площадках',
    text: 'После успешного запуска во «ВКонтакте» проект был адаптирован для социальной сети «Одноклассники», где также сформировал большую активную аудиторию.',
    icon: 'Globe',
    num: '2',
    sub: 'крупные платформы',
  },
  {
    year: 'Наследие',
    title: 'Проверенная игровая концепция',
    text: 'Проект стал одним из заметных представителей отечественных социальных игр своего периода и сохранил интерес аудитории даже спустя годы.',
    icon: 'Award',
    num: '10+',
    sub: 'лет в истории',
  },
];

const TECH_ITEMS = [
  'Современная мобильная архитектура',
  'Масштабируемая серверная инфраструктура',
  'Облачные технологии',
  'Игровая аналитика',
  'LiveOps',
  'CI/CD',
  'Инструменты искусственного интеллекта',
  'Высоконагруженный backend',
  'Защита игровых данных',
  'Система обновлений и управления контентом',
];

const FRANCHISE = [
  {
    icon: 'Film',
    title: 'AI-сериал',
    text: 'Создание интернет-сериала по мотивам вселенной «Лихие 90-е» с использованием современных технологий генеративного искусственного интеллекта.',
    img: IMG_SERIAL,
  },
  {
    icon: 'Newspaper',
    title: 'Медиа',
    text: 'Новости разработки, интервью, дневники команды, материалы о создании проекта и развитии игровой вселенной.',
    img: null,
  },
  {
    icon: 'MessageSquare',
    title: 'Сообщество',
    text: 'Развитие официальных сообществ проекта, взаимодействие с игроками, проведение мероприятий и работа с обратной связью.',
    img: null,
  },
  {
    icon: 'Layers',
    title: 'Цифровой контент',
    text: 'Дополнительные материалы, посвященные истории проекта, персонажам и развитию игровой вселенной.',
    img: null,
  },
];

const Lihie90 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const goContacts = () => navigate('/contacts');

  return (
    <div style={{ background: C.bg0, color: C.text, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* subtle texture overlay */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'1\' height=\'1\' fill=\'white\' fill-opacity=\'0.015\'/%3E%3C/svg%3E")', opacity: 0.5 }} />

      {/* ─── HEADER ─── */}
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10,7,5,0.95)' : 'transparent',
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
                className="px-4 py-2 text-sm relative transition-colors"
                style={{ color: n.active ? C.gold : C.textSec }}
                onMouseEnter={e => { if (!n.active) e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { if (!n.active) e.currentTarget.style.color = C.textSec; }}>
                {n.label}
                <span className="absolute bottom-1 left-4 right-4 h-px transition-transform origin-left"
                  style={{ background: gradGold, transform: n.active ? 'scaleX(1)' : 'scaleX(0)' }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={goContacts}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
              style={{ border: `1px solid ${C.gold}`, color: C.gold, background: 'transparent' }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.background = C.gold; t.style.color = '#0A0705'; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.color = C.gold; }}>
              Обсудить проект <Icon name="ArrowUpRight" size={16} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2" style={{ color: C.text }}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>

          {menuOpen && (
            <div className="absolute top-full inset-x-0 flex flex-col"
              style={{ background: 'rgba(10,7,5,0.98)', borderBottom: `1px solid ${C.border}`, padding: '0.5rem clamp(1.25rem,4vw,6rem) 1rem' }}>
              {NAV.map((n) => (
                <Link key={n.label} to={n.href} onClick={() => setMenuOpen(false)}
                  className="py-3 text-left transition-colors border-b"
                  style={{ color: n.active ? C.gold : C.textSec, borderColor: C.borderS }}>
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
          <img src={IMG_HERO} alt="Лихие 90-е" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(10,7,5,0.92) 0%, rgba(10,7,5,0.70) 50%, rgba(10,7,5,0.35) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(0deg, rgba(10,7,5,0.95) 0%, transparent 40%)' }} />
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
              <Link to="/products" className="transition-colors" style={{ color: C.textMut }}
                onMouseEnter={e => { e.currentTarget.style.color = C.gold; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMut; }}>
                Продукты
              </Link>
              <Icon name="ChevronRight" size={14} style={{ color: C.textMut } as React.CSSProperties} />
              <span style={{ color: C.gold }}>Лихие 90-е</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid rgba(232,160,32,0.4)`, color: C.gold, background: 'rgba(232,160,32,0.08)' }}>
              <Icon name="Gamepad2" size={13} />
              Собственный игровой проект
            </div>

            <h1 className="font-display font-black leading-none mb-5"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', color: C.text, textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}>
              Лихие 90-е
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: C.textSec }}>
              Собственный игровой проект АО «С+», вдохновленный атмосферой России 1990-х годов. Сегодня мы открываем новую главу его развития, сочетая успешное наследие оригинальной игры с современными технологиями разработки, искусственным интеллектом и долгосрочной стратегией развития цифровой медийной франшизы.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={goContacts}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all"
                style={{ background: gradGold, color: '#0A0705' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                <Icon name="Download" size={16} />
                Скачать презентацию
              </button>
              <button onClick={goContacts}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all"
                style={{ border: `1px solid rgba(232,160,32,0.5)`, color: C.gold, background: 'transparent' }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.background = 'rgba(232,160,32,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                Связаться с командой проекта
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ИСТОРИЯ УСПЕХА ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 100% 50%, rgba(232,160,32,0.05) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.gold, background: 'rgba(232,160,32,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.gold }} />
            Проект с историей
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display font-bold mb-6 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
                История успеха
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: C.textSec }}>
                «Лихие 90-е» — это проект с уже сложившейся историей. Впервые игра была выпущена в 2011 году и практически сразу привлекла внимание широкой аудитории, став одним из самых успешных игровых запусков в социальных сетях своего времени.
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
                Популярность проекта стала подтверждением того, что уникальная атмосфера, узнаваемый стиль и интересная игровая концепция способны объединить сотни тысяч игроков.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {HISTORY_CARDS.map((c) => (
                <div key={c.year} className="p-5 rounded-xl relative overflow-hidden"
                  style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(232,160,32,0.12)' }}>
                      <Icon name={c.icon as "Zap"} size={16} style={{ color: C.gold } as React.CSSProperties} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: C.gold }}>{c.year}</span>
                  </div>
                  <div className="font-display font-bold text-2xl mb-1" style={{ color: C.text }}>{c.num}</div>
                  <div className="text-xs mb-3" style={{ color: C.textMut }}>{c.sub}</div>
                  <div className="font-semibold text-sm mb-2" style={{ color: C.text }}>{c.title}</div>
                  <p className="text-xs leading-relaxed" style={{ color: C.textMut }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── НОВАЯ ГЛАВА / перезапуск ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 10% 50%, rgba(232,160,32,0.04) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
                style={{ border: `1px solid ${C.border}`, color: C.gold, background: 'rgba(232,160,32,0.06)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.gold }} />
                Новая глава проекта
              </div>
              <h2 className="font-display font-bold mb-6 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
                Перезапуск на современных технологиях
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: C.textSec }}>
                Сегодня АО «С+» полностью переосмысливает проект «Лихие 90-е».
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: C.textSec }}>
                Наша задача — не просто перенести игру на современные устройства, а создать качественный цифровой продукт нового поколения, сохранив атмосферу оригинала и значительно расширив игровые возможности.
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
                Разработка ведется с учетом современных требований к производительности, безопасности, масштабируемости и пользовательскому опыту.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl opacity-15"
                style={{ background: 'radial-gradient(ellipse, #E8A020 0%, transparent 70%)', filter: 'blur(30px)' }} />
              <div className="relative overflow-hidden rounded-xl"
                style={{ border: `1px solid ${C.border}` }}>
                <img src={IMG_OLD_NEW} alt="Новая эпоха — старая история" className="w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── МОБИЛЬНЫЕ ПЛАТФОРМЫ ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="section-pad py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative lg:order-last">
              <div className="absolute -inset-4 rounded-2xl opacity-15"
                style={{ background: 'radial-gradient(ellipse, #E8A020 0%, transparent 70%)', filter: 'blur(30px)' }} />
              <div className="relative overflow-hidden rounded-xl"
                style={{ border: `1px solid ${C.border}` }}>
                <img src={IMG_SOON} alt="Скоро на всех платформах" className="w-full object-cover" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
                style={{ border: `1px solid ${C.border}`, color: C.gold, background: 'rgba(232,160,32,0.06)' }}>
                <Icon name="Smartphone" size={13} />
                Мобильные платформы
              </div>
              <h2 className="font-display font-bold mb-6 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
                Игра станет доступна на ведущих мобильных площадках
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: C.textSec }}>
                Новая версия проекта разрабатывается специально для современных мобильных устройств.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: C.textSec }}>
                Единая архитектура позволит поддерживать одинаково высокий уровень качества независимо от платформы.
              </p>
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textMut }}>
                  Планируется выпуск на:
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'App Store', icon: 'Apple' },
                    { name: 'Google Play', icon: 'Play' },
                    { name: 'RuStore', icon: 'ShoppingBag' },
                  ].map(p => (
                    <div key={p.name} className="flex items-center gap-3 px-4 py-3 rounded-lg"
                      style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(232,160,32,0.12)' }}>
                        <Icon name={p.icon as "Play"} size={16} style={{ color: C.gold } as React.CSSProperties} />
                      </div>
                      <span className="font-semibold text-sm" style={{ color: C.text }}>{p.name}</span>
                      <span className="ml-auto text-xs px-2 py-0.5 rounded"
                        style={{ background: 'rgba(232,160,32,0.12)', color: C.gold }}>Скоро</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ТЕХНОЛОГИИ ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 50% at 50% 0%, rgba(232,160,32,0.04) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid ${C.border}`, color: C.gold, background: 'rgba(232,160,32,0.06)' }}>
              <Icon name="Cpu" size={13} />
              Технологии
            </div>
            <h2 className="font-display font-bold mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
              Современная технологическая основа
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: C.textSec }}>
              Разработка проекта строится на современных инженерных принципах и масштабируемой архитектуре, обеспечивающей долгосрочное развитие игры.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
              В рамках проекта используются современные подходы к разработке, эксплуатации и развитию цифровых продуктов.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {TECH_ITEMS.map((item, i) => (
              <div key={item} className="flex items-start gap-3 px-4 py-3.5 rounded-lg"
                style={{ background: C.bg1, border: `1px solid ${C.border}` }}>
                <span className="text-xs font-bold mt-0.5 flex-shrink-0 tabular-nums"
                  style={{ color: C.gold, minWidth: 20 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-snug" style={{ color: C.textSec }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── МЕДИЙНАЯ ФРАНШИЗА ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 50% at 50% 100%, rgba(192,57,43,0.06) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid rgba(192,57,43,0.35)`, color: C.red, background: 'rgba(192,57,43,0.06)' }}>
              <Icon name="TrendingUp" size={13} />
              Медийная франшиза
            </div>
            <h2 className="font-display font-bold mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: C.text }}>
              Больше, чем игра
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: C.textSec }}>
              АО «С+» рассматривает «Лихие 90-е» как основу для развития полноценной цифровой медийной франшизы.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
              Мы создаем экосистему, объединяющую игру, современные медиаформаты и цифровой контент вокруг единой вселенной проекта.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {FRANCHISE.map((f) => (
              <div key={f.title} className="rounded-xl overflow-hidden"
                style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                {f.img && (
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
                    <img src={f.img} alt={f.title} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(0deg, rgba(10,7,5,0.85) 0%, transparent 60%)' }} />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(232,160,32,0.12)' }}>
                      <Icon name={f.icon as "Film"} size={18} style={{ color: C.gold } as React.CSSProperties} />
                    </div>
                    <span className="font-display font-semibold text-base" style={{ color: C.text }}>{f.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.textSec }}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ПОЧЕМУ ЭТО ВАЖНО ДЛЯ АО «С+» ─── */}
      <section style={{ background: C.bg2 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 100% 50%, rgba(232,160,32,0.04) 0%, transparent 70%)` }} />
        <div className="section-pad py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
                style={{ border: `1px solid ${C.border}`, color: C.gold, background: 'rgba(232,160,32,0.06)' }}>
                <Icon name="Building2" size={13} />
                Почему это важно для АО «С+»
              </div>
              <h2 className="font-display font-bold mb-6 leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: C.text }}>
                Собственный продукт как источник технологической экспертизы
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: C.textSec }}>
                Работа над собственными цифровыми продуктами позволяет АО «С+» постоянно развивать инженерную экспертизу, тестировать современные технологии и применять накопленный опыт в коммерческих проектах.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: C.textSec }}>
                Проект «Лихие 90-е» способствует развитию компетенций компании в области высоконагруженных систем, облачной инфраструктуры, искусственного интеллекта, аналитики данных, цифрового маркетинга и управления жизненным циклом цифровых продуктов.
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
                Полученный опыт используется при разработке корпоративных решений для бизнеса и государственных организаций.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'Server', label: 'Высоконагруженные системы' },
                { icon: 'Cloud', label: 'Облачная инфраструктура' },
                { icon: 'Brain', label: 'Искусственный интеллект' },
                { icon: 'BarChart3', label: 'Аналитика данных' },
                { icon: 'Megaphone', label: 'Цифровой маркетинг' },
                { icon: 'RefreshCw', label: 'Управление продуктом' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-xl flex flex-col gap-3"
                  style={{ background: C.bg0, border: `1px solid ${C.border}` }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(232,160,32,0.10)' }}>
                    <Icon name={item.icon as "Server"} size={18} style={{ color: C.gold } as React.CSSProperties} />
                  </div>
                  <span className="text-sm font-medium leading-snug" style={{ color: C.textSec }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ПРЕЗЕНТАЦИЯ ─── */}
      <section style={{ background: C.bg0 }} className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 40% at 50% 100%, rgba(232,160,32,0.05) 0%, transparent 70%)` }} />
        <div className="section-pad py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: `1px solid ${C.border}`, color: C.gold, background: 'rgba(232,160,32,0.06)' }}>
              <Icon name="FileText" size={13} />
              Презентация проекта
            </div>
            <h2 className="font-display font-bold mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: C.text }}>
              Скачать презентацию
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: C.textSec }}>
              Подробная информация о проекте, концепции игры, текущем этапе разработки, технологической архитектуре и стратегии развития представлена в презентации.
            </p>
            <button onClick={goContacts}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all"
              style={{ background: gradGold, color: '#0A0705' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              <Icon name="Download" size={16} />
              Скачать презентацию (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* ─── ФИНАЛЬНЫЙ CTA ─── */}
      <section style={{ background: C.bg1 }} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(232,160,32,0.07) 0%, transparent 70%)` }} />
        </div>
        <div className="relative section-pad py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{ border: `1px solid ${C.border}`, color: C.gold, background: 'rgba(232,160,32,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.gold }} />
            В разработке
          </div>
          <h2 className="font-display font-bold mb-5 leading-tight max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text }}>
            Следите за развитием проекта
          </h2>
          <p className="text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: C.textSec }}>
            «Лихие 90-е» — это долгосрочный проект, который объединяет современные технологии разработки, искусственный интеллект и сильную игровую концепцию. Мы регулярно рассказываем о ходе разработки, публикуем новости проекта и делимся планами по развитию игровой вселенной.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/blog')}
              className="px-8 py-3.5 text-sm font-semibold transition-all"
              style={{ background: gradGold, color: '#0A0705' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              Подписаться на новости
            </button>
            <button onClick={goContacts}
              className="px-8 py-3.5 text-sm font-semibold transition-all"
              style={{ border: `1px solid ${C.border}`, color: C.text, background: 'transparent' }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = C.gold; t.style.color = C.gold; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = C.border; t.style.color = C.text; }}>
              Связаться с командой проекта
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

export default Lihie90;