/**
 * Service Worker for Lazy Perfectionist PWA
 *
 * Features:
 * - Offline capability with cache-first strategy
 * - Automatic cache management
 * - Stale-while-revalidate for API calls
 * - Progressive web app capabilities
 */

const CACHE_NAME = 'lazy-perfectionist-v1';
const RUNTIME_CACHE = 'lazy-perfectionist-runtime-v1';

// Assets to cache immediately (using optimized images)
const STATIC_ASSETS = [
  '/',
  '/music',
  '/blog',
  '/store',
  '/manifest.json',
  '/assets/img/optimized/logo-800.avif',
  '/assets/img/optimized/logo-600.avif',
  '/assets/img/optimized/logo-400.avif',
  '/assets/img/optimized/logo-200.avif',
  '/assets/img/optimized/noise-tile-200.webp',
  '/assets/img/optimized/noise-tile-100.webp',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting(); // Activate immediately
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome extensions and other protocols
  if (!url.protocol.startsWith('http')) return;

  // API calls - Network first with stale-while-revalidate
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Static assets - Cache first
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/_next/static/')) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Pages - Network first, fall back to cache
  event.respondWith(handlePageRequest(request));
});

/**
 * Handle API requests with stale-while-revalidate
 */
async function handleApiRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);

  // Fetch in background
  const fetchPromise = fetch(request)
    .then((response) => {
      // Only cache successful responses
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch((error) => {
      console.error('[SW] API fetch failed:', error);
      return cachedResponse; // Fall back to cache
    });

  // Return cached response immediately if available
  return cachedResponse || fetchPromise;
}

/**
 * Handle static assets with cache-first strategy
 */
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Static asset fetch failed:', error);
    // Return a generic error response or offline fallback
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Handle page requests with network-first strategy
 */
async function handlePageRequest(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache');
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return cache.match('/') || new Response('Offline', { status: 503 });
    }

    return new Response('Offline', { status: 503 });
  }
}

// Message handling for communication from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(event.data.urls))
    );
  }
});

// Periodic cache cleanup (every hour)
setInterval(async () => {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const requests = await cache.keys();
    const now = Date.now();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const cacheTime = parseInt(response.headers.get('sw-cache-time') || '0');
        const age = now - cacheTime;

        // Remove entries older than 1 hour
        if (age > 3600000) {
          await cache.delete(request);
          console.log('[SW] Removed stale cache entry:', request.url);
        }
      }
    }
  } catch (error) {
    console.error('[SW] Cache cleanup failed:', error);
  }
}, 3600000); // Run every hour