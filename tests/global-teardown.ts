import { FullConfig } from '@playwright/test';

/**
 * Global teardown for Playwright tests
 * Runs once after all tests complete
 */
async function globalTeardown(config: FullConfig) {
  console.log('✅ Playwright test suite completed');
  console.log(`📊 Results available in: playwright-report/`);

  // Any post-test cleanup can go here
}

export default globalTeardown;
