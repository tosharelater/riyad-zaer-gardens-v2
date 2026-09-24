export type Lang = 'fr' | 'ar';

export interface LocaleDict<T> {
  fr: T;
  ar: T;
}

/** Pick the dictionary matching the current language (falls back to French). */
export function pick<T>(dict: LocaleDict<T>, lang: Lang | string | undefined | null): T {
  return lang === 'ar' ? dict.ar : dict.fr;
}

/** Site base without trailing slash (`''` locally, `/riyad-zaer-gardens-v2` on Pages). */
export function siteBase(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '');
}

/** Strip the deploy base from a pathname so locale logic never sees it. */
export function stripBase(pathname: string): string {
  const base = siteBase();
  let p = pathname || '/';
  if (base && (p === base || p.startsWith(`${base}/`))) {
    p = p.slice(base.length) || '/';
  }
  return p;
}

/** Path without base and without `/ar` prefix — e.g. `/appartements`. */
export function localeAgnosticPath(pathname: string): string {
  const stripped = stripBase(pathname).replace(/\/$/, '') || '/';
  if (stripped === '/ar') return '/';
  return stripped.replace(/^\/ar(?=\/)/, '') || '/';
}

/** Prefix an internal path with /ar for the Arabic locale. */
export function localePath(lang: Lang | string | undefined | null, href: string): string {
  if (lang !== 'ar') return href;
  return href === '/' ? '/ar/' : `/ar${href}`;
}
