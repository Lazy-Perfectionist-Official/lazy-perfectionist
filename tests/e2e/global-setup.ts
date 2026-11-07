import { request, type FullConfig } from '@playwright/test';

// The dev server compiles each route on its first request, and when that
// compile finishes under an in-flight navigation Next forces a Fast Refresh
// full reload — WebKit reports it as "navigation interrupted", which looks
// like a broken link and is not. Warming every route once here, before the
// workers start, keeps that dev-server artifact out of the assertions.
//
// This is a test-harness warm-up, not a site fix: the same navigations are
// clean against a warm server, and `next build` renders every route.
const ROUTES = ['/', '/music', '/discography', '/shop', '/writing', '/sitemap.xml'];

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL;
  if (!baseURL) throw new Error('warm-up: no baseURL configured');

  const context = await request.newContext({ baseURL });
  try {
    for (const route of ROUTES) {
      const response = await context.get(route);
      if (!response.ok()) {
        throw new Error(`warm-up: ${route} answered ${response.status()}`);
      }
    }
  } finally {
    await context.dispose();
  }
}
