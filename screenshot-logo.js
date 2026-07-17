const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///c:/Car%20Portfolio/public/images/check-logo.html');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot-logo.png' });
  await browser.close();
})();
