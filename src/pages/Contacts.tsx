import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SiteFooter from '@/components/SiteFooter';
import useSEO from '@/hooks/useSEO';

const LOGO     = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';
const HERO_IMG = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/77b32b4e-cc74-4e2d-b7be-02262fd51cd0.png';

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
  { label: 'Продукты',    href: '/products' },
  { label: 'О компании',  href: '/about' },
  { label: 'Блог',        href: '/blog' },
  { label: 'Карьера',     href: '/career' },
  { label: 'Контакты',    href: '/contacts', active: true },
];

const CONTACT_CARDS = [
  { icon: 'Phone',      title: 'Телефон',          value: '+7 (495) 120-35-45', sub: 'Пн–Пт с 10:00 до 19:00 по московскому времени', href: 'tel:+74951203545' },
  { icon: 'Mail',       title: 'Email',             value: 'info@softplus.systems',        sub: 'Ответим в течение 1–2 рабочих дней',             href: 'mailto:info@softplus.systems' },
  { icon: 'Briefcase',  title: 'Отдел кадров (HR)', value: 'hr@softplus.systems',         sub: 'Вопросы о карьере и вакансиях',                  href: 'mailto:hr@softplus.systems' },
  { icon: 'Handshake',  title: 'Партнёрство',       value: 'partnership@softplus.systems', sub: 'Предложения о сотрудничестве и совместных проектах', href: 'mailto:partnership@softplus.systems' },
  { icon: 'MapPin',     title: 'Адрес',             value: '109390, г. Москва, ул. Юных Ленинцев, д. 25', sub: 'Муниципальный округ Текстильщики', href: null },
];

const Contacts = () => {
  useSEO({
    title: 'Контакты АО «СОФТ ПЛЮС СИСТЕМС»',
    description: 'Контактная информация АО «СОФТ ПЛЮС СИСТЕМС». Адрес офиса, телефон, электронная почта, реквизиты и форма обратной связи.',
    keywords: 'контакты АО С+, контакты СОФТ ПЛЮС СИСТЕМС, офис IT компании, реквизиты, связаться',
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', contact: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Заявка с сайта: ' + (form.company || form.name));
    const body = encodeURIComponent(
      `Имя: ${form.name}\nКомпания: ${form.company}\nКонтакт: ${form.contact}\n\nОписание проекта:\n${form.message}`
    );
    window.location.href = `mailto:info@softplus.systems?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inp = (placeholder: string, k: keyof typeof form, type = 'text', area = false) => {
    const shared = {
      placeholder,
      value: form[k],
      onChange: set(k),
      style: { background: C.bg2, border: `1px solid ${C.border}`, color: C.text } as React.CSSProperties,
      className: 'w-full px-4 py-3 outline-none text-sm transition-colors',
      onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = C.brand),
      onBlur:  (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = C.border),
    };
    return area
      ? <textarea {...shared} rows={4} style={{ ...shared.style, resize: 'none' }} />
      : <input type={type} {...shared} />;
  };

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
            <Link to="/contacts"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all"
              style={{ border: `1px solid ${C.brand}`, color: C.brand, background: 'transparent' }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.background = C.brand; t.style.color = '#fff'; }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.color = C.brand; }}>
              Обсудить проект <Icon name="ArrowUpRight" size={16} />
            </Link>
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
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.65 }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg0} 30%, rgba(7,10,15,0.2) 65%, transparent)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg0} 0%, transparent 40%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(7,10,15,0.55) 0%, transparent 35%)` }} />
        </div>
        <div className="section-pad relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px" style={{ background: gradBrand }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Контакты</span>
          </div>
          <h1 className="font-display font-bold mb-6 leading-tight"
            style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', color: C.text, maxWidth: 700 }}>
            Всегда на связи для новых проектов и партнёрства
          </h1>
          <p style={{ color: C.textSec, fontSize: 'clamp(0.95rem,1.3vw,1.1rem)', maxWidth: 560, lineHeight: 1.75, marginBottom: '0.75rem' }}>
            Мы всегда открыты к диалогу — расскажите о вашем проекте, предложении или идее, и мы свяжемся с вами в ближайшее время.
          </p>
          <p style={{ color: C.textMut, fontSize: '0.9rem', maxWidth: 560, lineHeight: 1.65 }}>
            АО «С+» — российская IT-компания полного цикла, работающая в сфере разработки программного обеспечения, искусственного интеллекта, цифровой трансформации и создания технологических продуктов.
          </p>
        </div>
      </section>

      {/* ─── КОНТАКТНЫЕ ДАННЫЕ ─── */}
      <section className="py-20" style={{ background: C.bg1 }}>
        <div className="section-pad">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: gradBrand }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Связь</span>
          </div>
          <h2 className="font-display font-bold mb-10" style={{ fontSize: 'clamp(1.75rem,3.5vw,3rem)', color: C.text }}>
            Свяжитесь с нами
          </h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
            {CONTACT_CARDS.map((c, i) => (
              <div key={i} className="group p-6 transition-all"
                style={{ border: `1px solid ${C.border}`, background: C.bg2 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.brand)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                <div className="mb-4 w-10 h-10 flex items-center justify-center rounded"
                  style={{ background: 'rgba(47,128,255,0.1)', border: `1px solid ${C.border}` }}>
                  <Icon name={c.icon} size={20} style={{ color: C.brand }} />
                </div>
                <div className="text-xs uppercase tracking-[0.15em] mb-2" style={{ color: C.textMut }}>{c.title}</div>
                {c.href ? (
                  <a href={c.href} className="font-semibold text-sm block mb-2 transition-colors hover:underline"
                    style={{ color: C.text }}>{c.value}</a>
                ) : (
                  <div className="font-semibold text-sm mb-2" style={{ color: C.text }}>{c.value}</div>
                )}
                <div style={{ color: C.textMut, fontSize: '0.78rem', lineHeight: 1.55 }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КАРТА ─── */}
      <section className="py-20">
        <div className="section-pad">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Расположение</span>
              </div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', color: C.text }}>
                Где мы находимся
              </h2>
              <p className="mb-6" style={{ color: C.textSec, lineHeight: 1.75 }}>
                Наш офис расположен в России. Мы работаем с клиентами по всей стране и за её пределами в дистанционном формате.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={16} style={{ color: C.brand, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: C.textSec, fontSize: '0.9rem', lineHeight: 1.6 }}>
                    109390, г. Москва, вн. тер. г. муниципальный округ Текстильщики, ул. Юных Ленинцев, д. 25
                  </span>
                </div>
              </div>
              <a href="https://yandex.ru/maps/?pt=37.740776,55.700359&z=14" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
                style={{ border: `1px solid ${C.border}`, color: C.textSec }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.brand; e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}>
                Построить маршрут <Icon name="ArrowRight" size={16} />
              </a>
              <p className="mt-6 text-xs" style={{ color: C.textMut, lineHeight: 1.6 }}>
                Цифровая инфраструктура компании позволяет нам работать с заказчиками из любых регионов.
              </p>
            </div>

            <div className="lg:col-span-2 overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?lang=ru&pt=37.740776,55.700359&z=14&scroll=false"
                width="100%"
                height="420"
                style={{ display: 'block', border: 'none', filter: 'grayscale(30%) brightness(0.85)' }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
                title="Карта офиса АО С+"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── ФОРМА + HR + ПАРТНЁРСТВО ─── */}
      <section className="py-20" style={{ background: C.bg1 }}>
        <div className="section-pad">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Форма */}
            <div className="p-8" style={{ border: `1px solid ${C.border}`, background: C.bg2 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px" style={{ background: gradBrand }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Заявка</span>
              </div>
              <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: C.text }}>
                Обсудим ваш проект
              </h2>
              {sent ? (
                <div className="py-10 text-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4"
                    style={{ background: 'rgba(0,211,138,0.1)', border: '1px solid rgba(0,211,138,0.3)' }}>
                    <Icon name="Check" size={28} style={{ color: '#00D38A' }} />
                  </div>
                  <div className="font-semibold mb-2" style={{ color: C.text }}>Заявка отправлена</div>
                  <div style={{ color: C.textMut, fontSize: '0.875rem' }}>Мы свяжемся с вами в течение 1–2 рабочих дней</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {inp('Ваше имя *', 'name')}
                    {inp('Компания', 'company')}
                  </div>
                  {inp('Телефон или email *', 'contact')}
                  {inp('Опишите ваш проект или задачу', 'message', 'text', true)}
                  <div className="flex items-start gap-4 mt-2">
                    <button type="submit"
                      className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold flex-shrink-0">
                      Отправить заявку <Icon name="Send" size={16} />
                    </button>
                    <p style={{ color: C.textMut, fontSize: '0.75rem', lineHeight: 1.55 }}>
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                  <p style={{ color: C.textMut, fontSize: '0.8rem', lineHeight: 1.55 }}>
                    Мы свяжемся с вами в течение 1–2 рабочих дней и предложим оптимальный формат сотрудничества.
                  </p>
                </form>
              )}
            </div>

            {/* HR + Партнёрство */}
            <div className="flex flex-col gap-6">

              {/* HR */}
              <div className="flex-1 p-8 relative overflow-hidden"
                style={{ border: `1px solid ${C.border}`, background: C.bg2 }}>
                <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(47,128,255,0.08) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px" style={{ background: gradBrand }} />
                    <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Команда</span>
                  </div>
                  <h3 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.25rem,2vw,1.75rem)', color: C.text }}>
                    Карьера в АО «С+»
                  </h3>
                  <p className="mb-4" style={{ color: C.textSec, lineHeight: 1.7, fontSize: '0.95rem' }}>
                    Если вы хотите стать частью команды и работать над сложными технологическими проектами, отправьте своё резюме.
                  </p>
                  <div className="flex items-center gap-2 mb-5" style={{ color: C.textMut, fontSize: '0.875rem' }}>
                    <Icon name="Mail" size={14} style={{ color: C.brand }} />
                    <a href="mailto:hr@softplus.systems" className="hover:underline transition-colors"
                      style={{ color: C.textSec }}>hr@softplus.systems</a>
                  </div>
                  <div className="flex gap-3">
                    <a href="mailto:hr@softplus.systems?subject=Резюме"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all"
                      style={{ background: gradBrand, color: '#fff' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                      Отправить резюме <Icon name="ArrowRight" size={14} />
                    </a>
                    <Link to="/career"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all"
                      style={{ border: `1px solid ${C.border}`, color: C.textSec }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.brand; e.currentTarget.style.color = C.text; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}>
                      Вакансии
                    </Link>
                  </div>
                </div>
              </div>

              {/* Партнёрство */}
              <div className="p-8 relative overflow-hidden"
                style={{ border: `1px solid ${C.border}`, background: C.bg2 }}>
                <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(0,194,255,0.06) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px" style={{ background: gradBrand }} />
                    <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C.brand }}>Партнёрство</span>
                  </div>
                  <h3 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.25rem,2vw,1.75rem)', color: C.text }}>
                    Партнёрство и сотрудничество
                  </h3>
                  <p className="mb-4" style={{ color: C.textSec, lineHeight: 1.7, fontSize: '0.95rem' }}>
                    Мы открыты к технологическому партнёрству, совместным проектам и долгосрочному сотрудничеству.
                  </p>
                  <div className="flex items-center gap-2 mb-5" style={{ color: C.textMut, fontSize: '0.875rem' }}>
                    <Icon name="Mail" size={14} style={{ color: C.brand }} />
                    <a href="mailto:partnership@softplus.systems" className="hover:underline transition-colors"
                      style={{ color: C.textSec }}>partnership@softplus.systems</a>
                  </div>
                  <a href="mailto:partnership@softplus.systems?subject=Предложение о сотрудничестве"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all"
                    style={{ border: `1px solid ${C.border}`, color: C.textSec }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.brand; e.currentTarget.style.color = C.text; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}>
                    Написать о сотрудничестве <Icon name="ArrowRight" size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contacts;