import { useEffect } from 'react';

export const SITE_URL = 'https://softplus.systems';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  /** Абсолютный canonical URL. Если не задан — берётся текущий путь на SITE_URL. */
  url?: string;
  /** og:type — 'website' для обычных страниц, 'article' для статей блога. */
  type?: string;
  /** Произвольные структурированные данные (schema.org), объект или массив объектов. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  publishedTime?: string;
  modifiedTime?: string;
}

const setMetaByName = (name: string, content: string) => {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.content = content;
};

const setMetaByProperty = (property: string, content: string) => {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
};

const setCanonical = (href: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
};

const JSONLD_ID = 'seo-jsonld';

const setJsonLd = (data?: Record<string, unknown> | Record<string, unknown>[]) => {
  const existing = document.getElementById(JSONLD_ID);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = JSONLD_ID;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

const useSEO = ({ title, description, keywords, image, url, type = 'website', jsonLd, publishedTime, modifiedTime }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    setMetaByName('description', description);
    if (keywords) setMetaByName('keywords', keywords);

    const canonicalUrl = url || (SITE_URL + window.location.pathname);
    setCanonical(canonicalUrl);

    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:type', type);
    setMetaByProperty('og:url', canonicalUrl);
    if (image) setMetaByProperty('og:image', image);

    setMetaByName('twitter:card', image ? 'summary_large_image' : 'summary');
    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);
    if (image) setMetaByName('twitter:image', image);

    if (type === 'article' && publishedTime) setMetaByProperty('article:published_time', publishedTime);
    if (type === 'article' && modifiedTime) setMetaByProperty('article:modified_time', modifiedTime);

    setJsonLd(jsonLd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, keywords, image, url, type, publishedTime, modifiedTime, JSON.stringify(jsonLd)]);
};

export default useSEO;
