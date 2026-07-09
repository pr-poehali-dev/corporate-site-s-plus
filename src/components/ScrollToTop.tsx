import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Сбрасывает скролл страницы наверх при каждом переходе между роутами.
 * Если в адресе есть якорь (#id) — плавно прокручивает к нужному блоку.
 * Монтируется один раз внутри BrowserRouter, работает для всех страниц.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo(0, 0);
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;