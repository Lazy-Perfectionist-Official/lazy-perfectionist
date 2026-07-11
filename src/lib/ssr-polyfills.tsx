// SSR-safe localStorage polyfill to prevent localStorage errors during server-side rendering

if (typeof window === 'undefined') {
  // Server-side: provide mock localStorage
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  } as Storage
}