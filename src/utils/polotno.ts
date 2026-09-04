/**
 * Every Polotno link on this site is built here.
 *
 * Two rules make the referral traffic readable:
 *   1. One canonical origin. While links were split between polotno.com and
 *      polotno.dev the analytics could not be added up.
 *   2. Every link carries utm_content, so each placement is measured on its own
 *      instead of collapsing into a single "konvajs" bucket.
 *
 * Markdown pages, static/llms.txt, and the package READMEs cannot import this
 * helper, so they hand-write the same shape: utm_source=konvajs, utm_medium of
 * docs | llms | readme, and a per-placement utm_content.
 */
const POLOTNO_ORIGIN = 'https://polotno.com';

export type PolotnoMedium = 'homepage' | 'docs' | 'footer';

export function polotnoUrl(
  medium: PolotnoMedium,
  content: string,
  path = '/'
): string {
  const url = new URL(path, POLOTNO_ORIGIN);
  url.searchParams.set('utm_source', 'konvajs');
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_content', content);
  return url.toString();
}
