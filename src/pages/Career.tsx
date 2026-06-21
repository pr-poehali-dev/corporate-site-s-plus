import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';

const LOGO     = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const HERO_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/54c79e7f-f61e-49e4-adaa-3b222bc20282.png';

const HH_URL = 'https://hh.ru/employer/11487460';
const HR_EMAIL = 'hr@softplus.systems';

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
  { label: 'О компании',  href: '/about' },
  { label: 'Блог',        href: '/blog' },
  { label: 'Карьера',     href: '/career', active: true },
  { label: 'Контакты',    href: '/contacts' },
];

const WHY = [
  { icon: 'Sparkles',   title: 'Интересные проекты',         desc: 'Разрабатываем корпоративные платформы, AI-сервисы, цифровые продукты и собственные игровые проекты, сочетая инженерный подход и современные технологии.' },
  { icon: 'Code2',      title: 'Современный стек технологий', desc: 'Используем актуальные инструменты разработки, облачные технологии, микросервисную архитектуру и искусственный интеллект для решения практических задач.' },
  { icon: 'Target',     title: 'Влияние на продукт',          desc: 'Небольшая команда позволяет каждому специалисту напрямую влиять на архитектуру, решения и развитие проектов.' },
  { icon: 'TrendingUp', title: 'Профессиональное развитие',   desc: 'Поощряем постоянное обучение, обмен знаниями и освоение новых технологий. Рост компетенций — часть корпоративной культуры.' },
  { icon: 'ShieldCheck',title: 'Инженерная культура',         desc: 'Ценим качество архитектуры, читаемый код, системное мышление и ответственное отношение к результату.' },
  { icon: 'Users',      title: 'Команда',                     desc: 'Создаём среду, где ценятся профессионализм, открытость к новым идеям и взаимное уважение.' },
];

const SPECIALTIES = [
  { icon: 'Database',     label: 'Backend-разработчики' },
  { icon: 'Monitor',      label: 'Frontend-разработчики' },
  { icon: 'Smartphone',   label: 'Mobile-разработчики' },
  { icon: 'BrainCircuit', label: 'AI Engineers' },
  { icon: 'Infinity',     label: 'DevOps-инженеры' },
  { icon: 'PenTool',      label: 'UI/UX-дизайнеры' },
  { icon: 'CheckSquare',  label: 'QA-инженеры' },
  { icon: 'Briefcase',    label: 'Project Managers' },
  { icon: 'Megaphone',    label: 'Специалисты по маркетингу' },
  { icon: 'Gamepad2',     label: 'Разработчики игровых проектов' },
];

const STEPS = [
  { n: '01', title: 'Отклик',                       desc: 'Отправьте резюме через HeadHunter или напрямую на почту HR' },
  { n: '02', title: 'Первичное знакомство',          desc: 'Короткая встреча или звонок с HR — рассказываем о компании и проектах' },
  { n: '03', title: 'Техническое интервью',          desc: 'Профессиональная беседа с тимлидом или техническим специалистом' },
  { n: '04', title: 'Финальная встреча',             desc: 'Знакомство с командой и руководством, обсуждение деталей' },
  { n: '05', title: 'Предложение о сотрудничестве', desc: 'Оффер с чёткими условиями и сроками присоединения' },
];

const FAQ_ITEMS = [
  { q: 'Можно ли отправить резюме без открытой вакансии?', a: 'Да. Мы формируем кадровый резерв и рассматриваем все релевантные резюме.' },
  { q: 'Возможен ли удалённый формат работы?',             a: 'Да. В зависимости от проекта сотрудники могут работать удалённо, гибридно или из офиса.' },
  { q: 'Есть ли стажировки?',                              a: 'По мере развития компании будут открываться программы стажировок для молодых специалистов.' },
  { q: 'Какие технологии используются?',                   a: 'Современные языки программирования, облачные технологии, микросервисная архитектура, AI-инструменты и корпоративные платформы.' },
];

const Career = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [openFaq,   setOpenFaq]   = useState<number | null>(null);
  const [email,     setEmail]     = useState('');
  const [agreed,    setAgreed]    = useState(false);
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
                className="px-4 py-2 text-sm relative transition-colors"
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
      <section className="relative min-h-[65vh] flex items-end pb-20 pt-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg0} 30%, rgba(7,10,15,0.2) 65%, transparent)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg0} 0%, transparent 40%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(7,10,15,0.5) 0%, transparent 30%)` }} />
        </div>
        <div className="section-pad relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px" style={{ background: gradBrand }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Карьера</span>
          </div>
          <h1 className="font-display font-bold mb-6 leading-tight"
            style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', color: C.text, maxWidth: 750 }}>
            Создаём технологии,<br />которыми хочется заниматься
          </h1>
          <div className="flex flex-col gap-3 mb-10" style={{ color: C.textSec, fontSize: 'clamp(0.95rem,1.3vw,1.1rem)', maxWidth: 620, lineHeight: 1.75 }}>
            <p>АО «С+» — российская IT-компания полного цикла, объединяющая разработчиков, инженеров, аналитиков, дизайнеров, специалистов по искусственному интеллекту и цифровому маркетингу.</p>
            <p>Мы создаём корпоративные информационные системы, AI-решения, собственные цифровые продукты и игровые проекты, которыми действительно можно гордиться.</p>
            <p>Если вам интересно решать сложные задачи, влиять на результат и работать с современными технологиями — будем рады познакомиться.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={HH_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 font-semibold transition-all"
              style={{ background: gradBrand, color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              <span className="font-bold text-base leading-none">hh</span>
              Смотреть вакансии на HeadHunter
            </a>
            <a href={`mailto:${HR_EMAIL}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold transition-all"
              style={{ border: `1px solid ${C.border}`, color: C.textSec }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.brand; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}>
              <Icon name="Mail" size={16} /> Связаться с HR
            </a>
          </div>
        </div>
      </section>

      {/* ─── ПОЧЕМУ АО С+ ─── */}
      <section className="py-24" style={{ background: C.bg1 }}>
        <div className="section-pad">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: gradBrand }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Преимущества</span>
          </div>
          <h2 className="font-display font-bold mb-12" style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', color: C.text }}>
            Почему работать в АО «С+»
          </h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {WHY.map((w, i) => (
              <div key={i} className="group p-7 transition-all"
                style={{ border: `1px solid ${C.border}`, background: C.bg2 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.brand)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                <div className="mb-4 w-12 h-12 flex items-center justify-center rounded"
                  style={{ background: 'rgba(47,128,255,0.1)', border: `1px solid ${C.border}` }}>
                  <Icon name={w.icon} size={22} style={{ color: C.brand }} />
                </div>
                <div className="font-display font-semibold mb-3" style={{ color: C.text, fontSize: '1.05rem' }}>{w.title}</div>
                <div style={{ color: C.textMut, fontSize: '0.875rem', lineHeight: 1.7 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── НЕТ ВАКАНСИЙ ─── */}
      <section className="py-24">
        <div className="section-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Вакансии</span>
              </div>
              <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', color: C.text }}>
                Сейчас мы формируем сильную команду на перспективу
              </h2>
              <div className="flex flex-col gap-4 mb-10" style={{ color: C.textSec, lineHeight: 1.75, fontSize: '1rem' }}>
                <p>На данный момент открытых вакансий нет, однако компания активно развивается и регулярно открывает новые позиции.</p>
                <p>Если подходящая вакансия пока отсутствует, рекомендуем подписаться на обновления HeadHunter или отправить резюме в кадровый резерв. Мы обязательно свяжемся с вами, когда появится подходящая возможность.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href={HH_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 font-semibold transition-all"
                  style={{ background: gradBrand, color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  <span className="font-bold">hh</span>
                  Следить на HeadHunter
                </a>
                <a href={`mailto:${HR_EMAIL}?subject=Резюме в кадровый резерв`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold transition-all"
                  style={{ border: `1px solid ${C.border}`, color: C.textSec }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.brand; e.currentTarget.style.color = C.text; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}>
                  <Icon name="FileText" size={16} /> Отправить резюме
                </a>
              </div>
            </div>

            {/* Иллюстрация */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full"
                  style={{ border: `1px solid ${C.border}`, opacity: 0.4 }} />
                <div className="absolute inset-8 rounded-full"
                  style={{ border: `1px solid ${C.border}`, opacity: 0.25 }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full"
                      style={{ background: 'rgba(47,128,255,0.1)', border: `1px solid ${C.border}`, boxShadow: '0 0 40px rgba(47,128,255,0.2)' }}>
                      <Icon name="Bell" size={36} style={{ color: C.brand }} />
                    </div>
                    <span className="text-xs text-center" style={{ color: C.textMut, maxWidth: 120, lineHeight: 1.5 }}>
                      Подпишитесь на обновления
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── СПЕЦИАЛЬНОСТИ + ПРОЦЕСС ─── */}
      <section className="py-24" style={{ background: C.bg1 }}>
        <div className="section-pad">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Специальности */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Специальности</span>
              </div>
              <h2 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: C.text }}>
                Мы всегда рады сильным специалистам
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {SPECIALTIES.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 transition-colors"
                    style={{ border: `1px solid ${C.border}`, background: C.bg2 }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = C.brand)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded"
                      style={{ background: 'rgba(47,128,255,0.1)' }}>
                      <Icon name={s.icon} size={16} style={{ color: C.brand }} />
                    </div>
                    <span style={{ color: C.textSec, fontSize: '0.85rem', lineHeight: 1.3 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Процесс найма */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Процесс</span>
              </div>
              <h2 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: C.text }}>
                Как проходит отбор
              </h2>
              <div className="flex flex-col gap-0">
                {STEPS.map((s, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex flex-col items-center">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-mono text-xs font-bold rounded-full"
                        style={{ background: 'rgba(47,128,255,0.12)', border: `1px solid ${C.border}`, color: C.brand }}>
                        {s.n}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-px flex-1 mt-1 mb-1" style={{ background: C.border, minHeight: 24 }} />
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="font-semibold mb-1 pt-2" style={{ color: C.text, fontSize: '0.95rem' }}>{s.title}</div>
                      <div style={{ color: C.textMut, fontSize: '0.85rem', lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm" style={{ color: C.textMut, lineHeight: 1.65 }}>
                Мы стремимся сделать процесс найма максимально прозрачным и комфортным. На каждом этапе вы понимаете дальнейшие шаги и сроки принятия решения.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── КАДРОВЫЙ РЕЗЕРВ + FAQ ─── */}
      <section className="py-24">
        <div className="section-pad">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Кадровый резерв */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Кадровый резерв</span>
              </div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: C.text }}>
                Оставайтесь на связи
              </h2>
              <div className="flex flex-col gap-4 mb-8" style={{ color: C.textSec, lineHeight: 1.75, fontSize: '1rem' }}>
                <p>Даже если сейчас нет подходящей вакансии, вы можете оставить контактные данные или отправить резюме.</p>
                <p>Мы регулярно расширяем команду и обязательно рассмотрим вашу кандидатуру при появлении соответствующей позиции.</p>
              </div>
              <div className="p-6" style={{ border: `1px solid ${C.border}`, background: C.bg1 }}>
                <div className="flex gap-3 mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    className="flex-1 px-4 py-3 outline-none text-sm transition-colors"
                    style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.text }}
                    onFocus={e => (e.target.style.borderColor = C.brand)}
                    onBlur={e  => (e.target.style.borderColor = C.border)}
                  />
                  <button
                    className="px-6 py-3 text-sm font-semibold transition-all flex-shrink-0"
                    style={{ background: gradBrand, color: '#fff' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    onClick={() => { if (email) window.location.href = `mailto:${HR_EMAIL}?subject=Кадровый резерв&body=Email для связи: ${email}`; }}>
                    Присоединиться
                  </button>
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                    className="mt-0.5 flex-shrink-0" style={{ accentColor: C.brand }} />
                  <span style={{ color: C.textMut, fontSize: '0.75rem', lineHeight: 1.5 }}>
                    Я согласен на обработку персональных данных
                  </span>
                </label>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>FAQ</span>
              </div>
              <h2 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: C.text }}>
                Частые вопросы
              </h2>
              <div className="flex flex-col">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} style={{ borderBottom: `1px solid ${C.borderS}` }}>
                    <button
                      className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
                      style={{ color: openFaq === i ? C.brand : C.text }}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span className="font-semibold text-sm">{item.q}</span>
                      <Icon name={openFaq === i ? 'Minus' : 'Plus'} size={18} style={{ flexShrink: 0, color: C.brand }} />
                    </button>
                    {openFaq === i && (
                      <div className="pb-5 text-sm" style={{ color: C.textSec, lineHeight: 1.7 }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20" style={{ background: C.bg1 }}>
        <div className="section-pad">
          <div className="relative overflow-hidden p-12 md:p-16"
            style={{ background: `linear-gradient(135deg, ${C.bg2} 0%, rgba(47,128,255,0.08) 100%)`, border: `1px solid ${C.border}` }}>
            <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(47,128,255,0.12) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="font-display font-bold mb-3"
                  style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: C.text }}>
                  Возможно, именно вы станете частью нашей команды
                </h2>
                <p style={{ color: C.textSec, lineHeight: 1.75, fontSize: '1.05rem' }}>
                  Если вам близок инженерный подход, интересны современные технологии и хочется создавать продукты с реальной ценностью — будем рады познакомиться.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a href={HH_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-3.5 font-semibold transition-all"
                  style={{ background: gradBrand, color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  <span className="font-bold">hh</span> Следить на HeadHunter
                </a>
                <a href={`mailto:${HR_EMAIL}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold transition-all"
                  style={{ border: `1px solid ${C.border}`, color: C.textSec }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.brand; e.currentTarget.style.color = C.text; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}>
                  <Icon name="Mail" size={16} /> Написать HR
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Career;