const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3000');
  
  await page.waitForTimeout(2000);
  
  // Scroll down by 2500px to reach the Powertrain section centered
  await page.evaluate(() => {
    window.scrollTo(0, 2500);
  });
  
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'screenshot-viewport2.png' });
  await browser.close();
})();
