import { test, expect } from '@playwright/test';

// Static-asset truth for the PWA surface: the manifest must be served,
// parse, and every icon it declares must actually resolve — guarding
// against the rename/remove class of change (cf. the public/ cleanup)
// silently breaking install metadata. Request-only: no page context
// needed, so it runs identically in every project.
test('manifest is served, valid, and its icons resolve', async ({
  request,
}) => {
  const res = await request.get('/manifest.json');
  expect(res.status()).toBe(200);

  const manifest = await res.json();
  expect(manifest.name).toContain('Lazy Perfectionist');
  expect(manifest.start_url).toBe('/');
  expect(manifest.id).toBe('/');

  const icons = manifest.icons as {
    src: string;
    sizes: string;
    purpose?: string;
  }[];
  expect(icons.length).toBeGreaterThan(0);

  for (const icon of icons) {
    const iconRes = await request.get(icon.src);
    expect(iconRes.status(), `${icon.src} should resolve`).toBe(200);

    if (icon.purpose) {
      // Spec tokens only — catches "any maskable" style drift.
      for (const token of icon.purpose.split(/\s+/)) {
        expect(['any', 'maskable', 'monochrome']).toContain(token);
      }
    }
  }
});
