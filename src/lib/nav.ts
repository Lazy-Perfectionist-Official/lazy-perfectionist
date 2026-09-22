// Shared nav-link mapping for the two navigation bars (Hero on `/`,
// Navigation on subpages). Store links point straight at the Ko-fi shop:
// linking the internal /store route made next/link treat the redirect as
// a client-side navigation — the RSC prefetch chased the 307 cross-origin,
// died on Ko-fi's missing CORS headers, and errored in the console on
// every page while the click fell back to a full load. Absolute URLs skip
// the RSC machinery entirely (same pattern as the Listen Now button).
export const STORE_URL = 'https://ko-fi.com/lazyperfectionist/shop';

export const navHref = (item: string) =>
  item === 'Home'
    ? '/'
    : item === 'Connect'
      ? '/platform-links'
      : item === 'Store'
        ? STORE_URL
        : `/${item.toLowerCase()}`;
