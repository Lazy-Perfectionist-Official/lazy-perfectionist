import { defineConfig, devices } from '@playwright/test';

/**
 * Dedicated config for Lighthouse audits against the PRODUCTION build.
 *
 * Why this exists separately from playwright.config.ts:
 * - Lighthouse scores are only meaningful on minified production output.
 *   Auditing the dev server measures Next.js compile-on-demand, not the
 *   shipped site (measured: dev performance 50 vs the same site's real
 *   production build scoring far higher).
 * - `npm run start` serves on an isolated port (3001) so a lingering dev
 *   server on 3000 can never be mistaken for the shipped site.
 * - Workers pinned to 1: playwright-lighthouse connects to Chrome's CDP
 *   port 9222 (opened by this project's launchOptions) and parallel
 *   workers would fight over the single port.
 *
 * Usage: npm run test:lighthouse  (builds first, then audits)
 */
export default defineConfig({
  testDir: './tests/e2e',

  // Each Lighthouse run loads the page multiple times under throttling;
  // single-audit tests can take over a minute.
  timeout: 180000,
  expect: {
    timeout: 10000,
  },

  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,

  reporter: [
    ['html', { outputFolder: 'playwright-report-lighthouse', open: 'never' }],
    ['json', { outputFile: 'playwright-report-lighthouse/results.json' }],
    ['list'],
    ['junit', { outputFile: 'playwright-report-lighthouse/junit.xml' }],
  ],

  globalSetup: require.resolve('./tests/global-setup'),
  globalTeardown: require.resolve('./tests/global-teardown'),

  outputDir: 'test-results-lighthouse',

  use: {
    baseURL: 'http://localhost:3001',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'lighthouse',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        contextOptions: {
          serviceWorkers: 'allow',
        },
        launchOptions: {
          args: ['--remote-debugging-port=9222'],
        },
      },
      testMatch: '**/lighthouse.spec.ts',
    },
  ],

  webServer: {
    // Serves the standalone production server — the output the site actually
    // ships as (next.config.ts `output: 'standalone'`). `next start` warns it
    // does not support standalone builds; serve:prod copies static assets and
    // public/ into .next/standalone (Next does not do this automatically) and
    // runs the traced server. Binds loopback only.
    command: 'PORT=3001 HOSTNAME=127.0.0.1 npm run serve:prod',
    url: 'http://localhost:3001',
    timeout: 120000,
    // Never reuse: the whole point is auditing a fresh production build.
    reuseExistingServer: false,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
