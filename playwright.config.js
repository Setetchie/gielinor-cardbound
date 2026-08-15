const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  repeatEach: 50,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 390, height: 844 },
    // The app intentionally installs a service worker for production/PWA use.
    // E2E regression tests exercise the current checkout served by Playwright's
    // local web server; letting a service worker claim/reload those pages makes
    // navigation nondeterministic and can leave tests on a stale cached shell.
    serviceWorkers: 'block'
  },
  webServer: { command: 'python3 -m http.server 4173', port: 4173, reuseExistingServer: false },
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]]
});
