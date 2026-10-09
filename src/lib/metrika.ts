export const METRIKA_ID = 110095140;

type Ym = (id: number, action: string, ...args: unknown[]) => void;

export function currentUrl(): string {
  return window.location.origin + window.location.pathname + window.location.search;
}

let lastUrl: string | null = typeof window !== 'undefined' ? currentUrl() : null;

export function trackPageview(title: string) {
  const url = currentUrl();
  if (url === lastUrl) return;
  const referer = lastUrl || document.referrer;
  lastUrl = url;
  try {
    const ym = (window as unknown as { ym?: Ym }).ym;
    if (typeof ym === 'function') ym(METRIKA_ID, 'hit', url, { title, referer });
  } catch {
    /* ошибки счётчика не должны ломать страницу */
  }
}
