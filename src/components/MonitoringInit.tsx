'use client';

import { useEffect } from 'react';
import { initMonitoring } from '@/lib/monitoring';

/**
 * Initializes analytics, error tracking, and performance monitoring on the client.
 * Silently no-ops when env vars (NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_SENTRY_DSN) are not set.
 */
export default function MonitoringInit() {
  useEffect(() => {
    initMonitoring();
  }, []);

  return null;
}
