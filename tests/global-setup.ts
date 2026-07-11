import { FullConfig } from '@playwright/test';

/**
 * Global setup for Playwright tests
 * Runs once before all tests
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Playwright test suite...');
  console.log(`📁 Test directory: ${config.projects?.[0]?.use?.baseURL}`);

  // Any pre-test setup can go here
  // Example: Database cleanup, test data seeding, etc.
}

export default globalSetup;
