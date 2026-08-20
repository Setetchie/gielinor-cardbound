const base = require('./playwright.config');

module.exports = {
  ...base,
  repeatEach: 1,
  workers: 1,
  webServer: {
    command: 'node scripts/test-static-server.js',
    port: 4173,
    reuseExistingServer: true
  },
  reporter: [['list']]
};
