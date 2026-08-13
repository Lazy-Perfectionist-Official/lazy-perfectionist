/**
 * Production Monitoring and Analytics Configuration
 *
 * This module provides production-ready monitoring and analytics integration
 * with support for multiple analytics platforms and error tracking.
 */

interface AnalyticsConfig {
  gaId?: string;
  enabled: boolean;
  debugMode: boolean;
}

interface ErrorTrackingConfig {
  sentryDsn?: string;
  environment: string;
  enabled: boolean;
  sampleRate: number;
}

interface PerformanceConfig {
  enabled: boolean;
  sampleRate: number;
  trackWebVitals: boolean;
}

/**
 * Analytics configuration for production
 */
export const analyticsConfig: AnalyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  enabled: process.env.ENABLE_ANALYTICS === 'true' || process.env.NODE_ENV === 'production',
  debugMode: process.env.NODE_ENV === 'development',
};

/**
 * Error tracking configuration
 */
export const errorTrackingConfig: ErrorTrackingConfig = {
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NODE_ENV === 'production',
  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% sampling in production
};

/**
 * Performance monitoring configuration
 */
export const performanceConfig: PerformanceConfig = {
  enabled: process.env.NODE_ENV === 'production',
  sampleRate: 0.1, // 10% sampling to reduce overhead
  trackWebVitals: true,
};

/**
 * Track page view
 */
export const trackPageView = (url: string, title?: string) => {
  if (!analyticsConfig.enabled) return;

  try {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: title,
        page_location: url,
        send_to: analyticsConfig.gaId,
      });
    }

    // Custom analytics endpoint
    if (typeof window !== 'undefined' && analyticsConfig.gaId) {
      fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, title, timestamp: Date.now() }),
        // Keepalive beacon for reliable tracking
        keepalive: true,
      }).catch(() => {
        // Silently fail to not disrupt user experience
      });
    }
  } catch (error) {
    // Silently fail to not disrupt user experience
    console.warn('Analytics tracking failed:', error);
  }
};

/**
 * Track custom event
 */
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (!analyticsConfig.enabled) return;

  try {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        ...properties,
        send_to: analyticsConfig.gaId,
      });
    }

    // Custom analytics endpoint
    if (analyticsConfig.gaId) {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          properties,
          timestamp: Date.now(),
        }),
        keepalive: true,
      }).catch(() => {
        // Silently fail
      });
    }
  } catch (error) {
    console.warn('Event tracking failed:', error);
  }
};

/**
 * Track error
 */
export const trackError = (error: Error, context?: Record<string, unknown>) => {
  if (!errorTrackingConfig.enabled) return;

  try {
    // Sentry error tracking
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: { custom: context },
      });
    }

    // Custom error endpoint
    if (errorTrackingConfig.sentryDsn) {
      fetch('/api/analytics/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          context,
          timestamp: Date.now(),
        }),
        keepalive: true,
      }).catch(() => {
        // Silently fail
      });
    }
  } catch (trackingError) {
    console.warn('Error tracking failed:', trackingError);
  }
};

/**
 * Track Web Vitals
 */
export const reportWebVitals = (metric: {
  id: string;
  name: string;
  value: number;
  delta: number;
}) => {
  if (!performanceConfig.enabled || !performanceConfig.trackWebVitals) return;

  try {
    // Google Analytics Web Vitals
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.delta),
        metric_id: metric.id,
        non_interaction: true,
        send_to: analyticsConfig.gaId,
      });
    }

    // Custom analytics endpoint
    if (analyticsConfig.gaId) {
      fetch('/api/analytics/web-vital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          id: metric.id,
          timestamp: Date.now(),
        }),
        keepalive: true,
      }).catch(() => {
        // Silently fail
      });
    }
  } catch (error) {
    console.warn('Web Vitals tracking failed:', error);
  }
};

/**
 * Initialize monitoring
 */
export const initMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Initialize Google Analytics
  if (analyticsConfig.enabled && analyticsConfig.gaId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaId}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function (...args: any[]) {
      (window as any).dataLayer.push(args);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', analyticsConfig.gaId, {
      debug_mode: analyticsConfig.debugMode,
      anonymize_ip: true,
      send_page_view: false, // We'll handle page views manually
    });
  }

  // Initialize Sentry (optional — only if @sentry/nextjs is installed and DSN is set).
  // The import is hidden behind `new Function` so webpack does not try to statically
  // resolve an optional dependency (which would emit "Critical dependency" warnings
  // and trigger Fast Refresh full reloads).
  // To enable Sentry: `npm i @sentry/nextjs`, set NEXT_PUBLIC_SENTRY_DSN, and this block will run.
  if (errorTrackingConfig.enabled && errorTrackingConfig.sentryDsn) {
    try {
      const loadSentry = new Function('return import("@sentry/nextjs")') as () => Promise<any>;
      loadSentry()
        .then((Sentry) => {
          Sentry.init({
            dsn: errorTrackingConfig.sentryDsn,
            environment: errorTrackingConfig.environment,
            tracesSampleRate: errorTrackingConfig.sampleRate,
            beforeSend(event: any) {
              if (event.request) {
                delete event.request.cookies;
              }
              return event;
            },
          });
        })
        .catch((error: unknown) => {
          console.warn('Failed to initialize Sentry (module not installed):', error);
        });
    } catch {
      // new Function() can throw in CSP-restricted environments — silently skip.
    }
  }

  // Track initial page view
  if (analyticsConfig.enabled) {
    trackPageView(window.location.pathname, document.title);
  }
};

/**
 * Performance monitoring utilities
 */
export const performanceMonitor = {
  /**
   * Mark performance timing
   */
  mark: (name: string) => {
    if (typeof window !== 'undefined' && performanceConfig.enabled) {
      performance.mark(`mark_${name}`);
    }
  },

  /**
   * Measure performance between marks
   */
  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== 'undefined' && performanceConfig.enabled) {
      try {
        performance.measure(name, `mark_${startMark}`, `mark_${endMark}`);
        const measure = performance.getEntriesByName(name)[0];

        if (measure && analyticsConfig.enabled) {
          trackEvent('performance_metric', {
            metric_name: name,
            duration: measure.duration,
          });
        }
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
  },

  /**
   * Get navigation timing metrics
   */
  getNavigationTiming: () => {
    if (typeof window === 'undefined' || !performanceConfig.enabled) return null;

    const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!timing) return null;

    return {
      domContentLoaded: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
      loadComplete: timing.loadEventEnd - timing.loadEventStart,
      firstPaint: timing.responseStart - timing.requestStart,
      timeToFirstByte: timing.responseStart - timing.requestStart,
    };
  },
};

/**
 * User interaction tracking
 */
export const interactionTracking = {
  /**
   * Track button click
   */
  trackClick: (buttonId: string, context?: string) => {
    trackEvent('button_click', {
      button_id: buttonId,
      context,
      page: window.location.pathname,
    });
  },

  /**
   * Track form submission
   */
  trackFormSubmit: (formId: string, success: boolean) => {
    trackEvent('form_submit', {
      form_id: formId,
      success,
      page: window.location.pathname,
    });
  },

  /**
   * Track scroll depth
   */
  trackScrollDepth: (depth: number) => {
    trackEvent('scroll_depth', {
      depth_percent: depth,
      page: window.location.pathname,
    });
  },
};

/**
 * Export monitoring configuration for verification
 */
export const getMonitoringConfig = () => ({
  analytics: analyticsConfig,
  errorTracking: errorTrackingConfig,
  performance: performanceConfig,
  hasGoogleAnalytics: !!analyticsConfig.gaId,
  hasSentry: !!errorTrackingConfig.sentryDsn,
  environment: process.env.NODE_ENV,
});

const monitoringServices = {
  initMonitoring,
  trackPageView,
  trackEvent,
  trackError,
  reportWebVitals,
  performanceMonitor,
  interactionTracking,
  getMonitoringConfig,
  analyticsConfig,
  errorTrackingConfig,
  performanceConfig,
};

export default monitoringServices;
