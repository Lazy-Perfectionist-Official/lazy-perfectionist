import { defineConfig, devices } from '@playwright/test';

/**
 * Minimal Playwright configuration for the stripped-down single-page site.
 *
 * One spec (tests/e2e/home.spec.ts) across three desktop engines plus one
 * small-mobile Chrome project. The dev server on :3000 is reused when it is
 * already running so tests never fight an active `next dev`.
 *
 * The port is `PORT` when set, because :3000 is not always ours — another
 * local app squatting it makes Next bind a different port and the run fails
 * with "Timed out waiting from config.webServer", which reads like a broken
 * site rather than a busy port. `PORT=3137 npm test` keeps the suite honest
 * without editing this file.
 */
const port = process.env.PORT ?? '3000';
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './tests/e2e',

  // Every route is compiled once before the workers start: a route compiling
  // under a live navigation makes Next force a full reload, which WebKit
  // reports as an interrupted goto.
  globalSetup: './tests/e2e/global-setup.ts',

  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: 'list',

  outputDir: 'test-results',

  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    // Primary testing browser.
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Cross-browser parity.
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Small phone — guards the no-horizontal-scroll invariant.
    {
      name: 'mobile-chrome-small',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: true,
      },
    },
  ],

  webServer: {
    // The port is passed explicitly: `url` alone does not tell the server
    // which port to bind, and Next silently moves to the next free one.
    command: `npm run dev -- -p ${port}`,
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
