export type Lang = 'fr' | 'ar';

export interface LocaleDict<T> {
  fr: T;
  ar: T;
}

/** Pick the dictionary matching the current language (falls back to French). */
export function pick<T>(dict: LocaleDict<T>, lang: Lang | string | undefined | null): T {
  return lang === 'ar' ? dict.ar : dict.fr;
}

/** Prefix an internal path with /ar for the Arabic locale. */
export function localePath(lang: Lang | string | undefined | null, href: string): string {
  if (lang !== 'ar') return href;
  return href === '/' ? '/ar/' : `/ar${href}`;
}
