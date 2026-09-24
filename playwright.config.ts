import { defineConfig, devices } from '@playwright/test';

/**
 * Minimal Playwright configuration for the stripped-down single-page site.
 *
 * One spec (tests/e2e/home.spec.ts) across three desktop engines plus one
 * small-mobile Chrome project. The dev server on :3000 is reused when it is
 * already running so tests never fight an active `next dev`.
 */
export default defineConfig({
  testDir: './tests/e2e',

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
    baseURL: 'http://localhost:3000',
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
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
