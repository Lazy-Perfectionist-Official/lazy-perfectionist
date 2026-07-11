'use client';

import { useEffect } from 'react';

/**
 * Service Worker Registration Component
 *
 * Registers the service worker for PWA functionality:
 * - Offline capability
 * - Improved caching strategies
 * - Better performance with cache-first approach
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Only register in production and supported browsers
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Service worker registered successfully:', registration.scope);

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  console.log('[SW] New content is available; please refresh.');
                  // You could show a notification to the user here
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('[SW] Service worker registration failed:', error);
        });

      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('[SW] Message from service worker:', event.data);
      });

      // Cleanup on unmount
      return () => {
        // Service worker continues running even if component unmounts
      };
    }
  }, []);

  return null; // This component doesn't render anything
}