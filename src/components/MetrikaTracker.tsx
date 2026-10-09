import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageview } from '@/lib/metrika';

const MetrikaTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/admin') || pathname.startsWith('/blog')) return;
    const t = setTimeout(() => trackPageview(document.title), 0);
    return () => clearTimeout(t);
  }, [pathname, search]);

  return null;
};

export default MetrikaTracker;
