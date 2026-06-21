import Icon from '@/components/ui/icon';

const LOGO = 'https://cdn.poehali.dev/projects/0ee0b91b-714d-4de7-b57c-dc6c4abbfed0/bucket/fa8d0eab-d2fc-4e10-9c72-e8781f108f03.png';

const C = {
  text:    '#E6EDF7',
  textMut: '#7A8AA0',
  brand:   '#2F80FF',
  borderS: 'rgba(255,255,255,0.05)',
};

const DIRECTIONS = ['Разработка ПО', 'AI и автоматизация', 'Игровые проекты', 'Консалтинг', 'Маркетинг', 'Платформа С+'];

const FooterCol = ({ title, items, onClick }: { title: string; items: string[]; onClick?: (t: string) => void }) => (
  <div>
    <div className="font-display font-semibold mb-4" style={{ color: C.text }}>{title}</div>
    <div className="flex flex-col gap-2 text-sm" style={{ color: C.textMut }}>
      {items.map((it) => (
        <button key={it} onClick={() => onClick?.(it)}
          className="text-left transition-colors hover:text-white">{it}</button>
      ))}
    </div>
  </div>
);

const SiteFooter = () => {
  const go = (path: string) => { window.location.href = path; };

  const handleCompany = (t: string) => {
    if (t === 'О компании') { go('/about'); return; }
    if (t === 'Блог') { go('/blog'); return; }
    if (t === 'Карьера')  { go('/#career'); return; }
    if (t === 'Контакты') { go('/#contacts'); return; }
  };

  return (
    <footer className="relative section-pad py-14" style={{ borderTop: `1px solid ${C.borderS}` }}>
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={LOGO} alt="АО СОФТ ПЛЮС СИСТЕМС" className="h-10 w-auto object-contain" />
            <div className="leading-none">
              <div className="font-display font-semibold text-sm" style={{ color: C.text }}>АО «СОФТ ПЛЮС СИСТЕМС»</div>
            </div>
          </div>
          <p className="text-sm" style={{ color: C.textMut }}>Российская IT-компания полного цикла.</p>
        </div>

        <FooterCol title="Направления" items={DIRECTIONS} />

        <FooterCol title="Компания" items={['О компании', 'Блог', 'Карьера', 'Контакты']}
          onClick={handleCompany} />

        <div>
          <div className="font-display font-semibold mb-4" style={{ color: C.text }}>Контакты</div>
          <div className="flex flex-col gap-2 text-sm" style={{ color: C.textMut }}>
            <span>info@softplus.systems</span>
            <span>+7 (495) 123-45-67</span>
            <span>г. Москва</span>
            <div className="flex gap-3 mt-3">
              {(['Send', 'MessageCircle', 'Linkedin'] as const).map((ic) => (
                <span key={ic} className="w-9 h-9 flex items-center justify-center cursor-pointer transition-colors"
                  style={{ border: `1px solid ${C.borderS}`, color: C.textMut }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.brand; (e.currentTarget as HTMLElement).style.color = C.brand; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.borderS; (e.currentTarget as HTMLElement).style.color = C.textMut; }}>
                  <Icon name={ic} size={16} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        style={{ borderTop: `1px solid ${C.borderS}`, color: C.textMut }}>
        <span>© 2026 АО «СОФТ ПЛЮС СИСТЕМС». Все права защищены.</span>
        <a href="/admin/login" className="hover:underline" style={{ color: C.textMut }}>Вход в CMS</a>
      </div>
    </footer>
  );
};

export default SiteFooter;
