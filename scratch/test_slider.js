const { chromium } = require('playwright');

(async () => {
  console.log('Testing slider controls...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000#work', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // Click 100% BEFORE preset
  await page.click('button:has-text("100% BEFORE")');
  await page.waitForTimeout(400);

  // Click 50% SPLIT preset
  await page.click('button:has-text("50% SPLIT")');
  await page.waitForTimeout(400);

  // Click 100% AFTER preset
  await page.click('button:has-text("100% AFTER")');
  await page.waitForTimeout(400);

  await page.screenshot({ path: 'c:/Car Portfolio/slider_smooth_verified.png' });
  console.log('SLIDER CONTROLS TEST COMPLETE!');
  await browser.close();
})();
