import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  testDir: 'src',
  timeout: 45000,
  retries: 0,

  use: {
    headless: false,
    launchOptions: {
      slowMo: 100,
    },
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
};
export default config;
