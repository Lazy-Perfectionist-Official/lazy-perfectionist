import { defineConfig, devices } from '@playwright/test';
import { defineConfig as defineBundlerConfig } from '@playwright/test';

/**
 * Comprehensive Playwright configuration for Lazy Perfectionist website testing
 * Covers E2E, visual regression, accessibility, and cross-browser testing
 */
export default defineConfig({
  // Test directory
  testDir: './tests/e2e',

  // Timeout settings
  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  // Fully parallelize tests for faster execution
  fullyParallel: true,

  // Fail on first test failure for CI, but allow local debugging
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['list'],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
  ],

  // Global setup and teardown
  globalSetup: require.resolve('./tests/global-setup'),
  globalTeardown: require.resolve('./tests/global-teardown'),

  // Output directory for test artifacts
  outputDir: 'test-results',

  // Use headless mode in CI, headed mode locally
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Projects for different browsers and devices
  projects: [
    // Desktop Chrome - Primary testing browser
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        contextOptions: {
          // Enable service workers for PWA testing
          serviceWorkers: 'allow',
        },
      },
      // Lighthouse needs CDP (chromium-only) and runs in its own project.
      testIgnore: '**/lighthouse.spec.ts',
    },

    // Desktop Firefox
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
      testIgnore: '**/lighthouse.spec.ts',
    },

    // Desktop Safari (WebKit)
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
      testIgnore: '**/lighthouse.spec.ts',
    },

    // Mobile Chrome - Small phone
    {
      name: 'mobile-chrome-small',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
        deviceScaleFactor: 2,
        hasTouch: true,
        contextOptions: {
          serviceWorkers: 'allow',
        },
      },
      testIgnore: '**/lighthouse.spec.ts',
    },

    // Mobile Safari - iPhone
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 13'],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        hasTouch: true,
        contextOptions: {
          serviceWorkers: 'allow',
        },
      },
      testIgnore: '**/lighthouse.spec.ts',
    },

    // Tablet - iPad
    {
      name: 'tablet-ipad',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 1366 },
        deviceScaleFactor: 2,
        hasTouch: true,
        contextOptions: {
          serviceWorkers: 'allow',
        },
      },
      testIgnore: '**/lighthouse.spec.ts',
    },

    // Lighthouse runs in its own config (playwright.lighthouse.config.ts)
    // against a production build on port 3001 — see the notes there. The
    // testIgnore above keeps this spec out of the browser projects.

    // Visual Regression Project
    {
      name: 'visual-regression',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: '**/visual/**/*.spec.ts',
    },

    // Accessibility Testing Project
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: '**/a11y/**/*.spec.ts',
    },
  ],

  // Development server configuration
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
