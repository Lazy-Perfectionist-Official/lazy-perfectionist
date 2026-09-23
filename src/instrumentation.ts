// Node 25 ships webstorage by default, but without --localstorage-file the
// global `localStorage` object is inert — `getItem` doesn't exist. Next's
// dev overlay reads its theme settings via localStorage during SSR, which
// crashes every render with "localStorage.getItem is not a function" on
// affected Node versions. Install a functional in-memory shim before any
// rendering happens. In real browsers localStorage is untouched.

export async function register() {
  if (
    typeof globalThis.localStorage !== "undefined" &&
    typeof globalThis.localStorage.getItem !== "function"
  ) {
    const store = new Map<string, string>();

    const shim: Storage = {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => {
        store.set(key, String(value));
      },
      removeItem: (key) => {
        store.delete(key);
      },
      clear: () => {
        store.clear();
      },
      key: (index) => Array.from(store.keys())[index] ?? null,
      get length() {
        return store.size;
      },
    };

    globalThis.localStorage = shim;
  }
}
