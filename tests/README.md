# Testing Strategy for Lazy Perfectionist Website

## Overview

This document outlines the comprehensive testing infrastructure for the Lazy Perfectionist website, including E2E tests, visual regression testing, accessibility testing, performance auditing, and cross-browser compatibility testing.

## Test Structure

```
tests/
├── e2e/
│   ├── navigation.spec.ts           # Navigation flow tests
│   ├── portfolio-interactions.spec.ts # Portfolio component tests
│   ├── visual/
│   │   ├── home-visual.spec.ts      # Homepage visual regression
│   │   └── pages-visual.spec.ts     # Other pages visual regression
│   ├── a11y/
│   │   └── accessibility.spec.ts    # WCAG compliance tests
│   ├── lighthouse.spec.ts           # Performance and SEO audits
│   ├── cross-browser.spec.ts        # Multi-browser compatibility
│   └── ux/
│       └── user-journeys.spec.ts    # User experience scenarios
├── fixtures.ts                       # Custom test fixtures
├── global-setup.ts                   # Test suite setup
└── global-teardown.ts                 # Test suite cleanup
```

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test Suites

```bash
# E2E tests only
npm run test:e2e

# Visual regression tests
npm run test:visual

# Accessibility tests
npm run test:a11y

# Lighthouse performance tests
npm run test:lighthouse

# User journey tests
npm run test:ux

# Cross-browser tests
npm run test:cross-browser

# Mobile responsive tests
npm run test:mobile
```

### Development Mode

```bash
# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with Playwright UI
npm run test:ui

# Debug tests with inspector
npm run test:debug
```

### Lighthouse CI

```bash
# Run complete Lighthouse audit
npm run lighthouse

# Collect Lighthouse data
npm run lighthouse:collect

# Assert against performance budgets
npm run lighthouse:assert
```

## Test Coverage

### E2E Navigation Tests
- Page navigation flows
- Mobile navigation
- Accessibility navigation
- Browser back/forward
- URL parameters
- 404 error handling

### Portfolio Interaction Tests
- Loading screen behavior
- Hero section functionality
- Cursor reveal effects
- Scroll animations
- Selected works component
- Stats component
- Contact component
- Responsive design
- Performance metrics

### Visual Regression Tests
- Homepage screenshots
- Page layout screenshots
- Interactive states (hover, focus, active)
- Color consistency
- Typography
- Spacing and layout
- Mobile and tablet viewports
- Error pages
- Loading states

### Accessibility Tests
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast
- Image alt text
- Form labels
- ARIA attributes
- Focus management
- Mobile accessibility
- Animation preferences

### Lighthouse Performance Tests
- Performance score (target: 80+)
- Accessibility score (target: 90+)
- Best practices score (target: 80+)
- SEO score (target: 90+)
- PWA score (target: 70+)
- Core Web Vitals:
  - First Contentful Paint (target: <2s)
  - Largest Contentful Paint (target: <2.5s)
  - Cumulative Layout Shift (target: <0.1)
  - Total Blocking Time (target: <300ms)
  - Speed Index (target: <3.4s)

### Cross-Browser Tests
- Chrome/Chromium compatibility
- Firefox compatibility
- Safari/WebKit compatibility
- Feature detection
- Font loading
- Image loading
- Form interactions

### User Journey Tests
- First-time visitor flows
- Returning visitor flows
- Mobile user flows
- Tablet user flows
- Accessibility user flows
- Performance-conscious user flows
- Content explorer flows
- Error recovery flows

## Performance Budgets

### Lighthouse CI Thresholds

```json
{
  "performance": 80,
  "accessibility": 90,
  "best-practices": 80,
  "seo": 90,
  "pwa": 70
}
```

### Core Web Vitals Budgets

```json
{
  "first-contentful-paint": 2000,
  "largest-contentful-paint": 2500,
  "cumulative-layout-shift": 0.1,
  "total-blocking-time": 300,
  "speed-index": 3400
}
```

## CI/CD Integration

Tests run automatically on:
- Push to `main`, `develop`, or `feature/*` branches
- Pull requests to `main` or `develop`
- Manual workflow dispatch

### Test Jobs

1. **e2e-tests**: Core E2E test suite
2. **visual-regression**: Screenshot comparison tests
3. **accessibility-tests**: WCAG compliance verification
4. **lighthouse-performance**: Performance and SEO audits
5. **cross-browser-tests**: Multi-browser compatibility
6. **mobile-tests**: Mobile responsive design tests
7. **test-summary**: Aggregate test results

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '../fixtures';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('selector');

    // Act
    await element.click();

    // Assert
    await expect(page).toHaveURL(/expected-url/);
  });
});
```

### Best Practices

1. **Use descriptive test names**: "should do something" format
2. **Follow AAA pattern**: Arrange, Act, Assert
3. **Use fixtures for common operations**: `portfolioPage` fixture
4. **Test user behavior**: Focus on what users see and do
5. **Keep tests independent**: Each test should setup its own state
6. **Use data-testid attributes**: For stable selectors
7. **Wait for animations**: Use `page.waitForTimeout()` after triggering animations
8. **Test across viewports**: Use `test.use({ viewport: {...} })` for mobile tests

### Adding Visual Tests

```typescript
test('component visual @visual', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000); // Wait for animations

  await expect(page).toHaveScreenshot('component-name.png', {
    maxDiffPixels: 100,
    threshold: 0.2,
  });
});
```

### Adding Accessibility Tests

```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('accessibility audit', async ({ page }) => {
  await injectAxe(page);
  await page.goto('/');

  await checkA11y(page, undefined, {
    includedImpacts: ['critical', 'serious'],
  });
});
```

## Debugging Tests

### Local Debugging

```bash
# Run specific test file
npx playwright test navigation.spec.ts

# Run with debugging
npx playwright test --debug

# Show browser
npx playwright test --headed

# Run and show UI
npx playwright test --ui
```

### Debugging Tips

1. **Use `page.pause()`**: Pauses test execution and opens inspector
2. **Take screenshots**: `await page.screenshot({ path: 'debug.png' })`
3. **Console logging**: `await page.evaluate(() => console.log(...))`
4. **Slow mode**: `npx playwright test --slowmo=1000`
5. **Trace viewing**: `npx playwright show-trace test-results/trace.zip`

## Test Maintenance

### Updating Screenshots

When visual changes are intentional:

```bash
# Update screenshots
npx playwright test --update-snapshots
```

### Updating Performance Budgets

Edit `lighthouserc.json` to adjust thresholds:

```json
{
  "assert": {
    "assertions": {
      "categories:performance": ["error", { "minScore": 0.85 }]
    }
  }
}
```

### Flaky Test Handling

If tests are flaky:
1. Increase timeouts for animations: `await page.waitForTimeout(1500)`
2. Use more specific selectors
3. Wait for specific states: `await element.waitFor({ state: 'visible' })`
4. Add retries in config: `retries: 2`

## Troubleshooting

### Common Issues

**Tests fail in CI but pass locally:**
- Check environment variables
- Verify browser versions match
- Increase timeouts for slower CI environments

**Visual tests fail:**
- Check if animations completed
- Verify font loading
- Check viewport settings

**Accessibility tests fail:**
- Check for dynamic content issues
- Verify ARIA attributes
- Check color contrast ratios

**Performance tests fail:**
- Check if it's a real regression or temporary network issue
- Verify build optimizations are enabled
- Check bundle sizes

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [axe-core Documentation](https://www.deque.com/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)
