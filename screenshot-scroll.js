const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3000');
  
  // Wait for load
  await page.waitForTimeout(2000);
  
  // Scroll down by 1500px to reach the Powertrain section
  await page.evaluate(() => {
    window.scrollTo(0, 1500);
  });
  
  await page.waitForTimeout(1000);
  
  // Take screenshot of viewport
  await page.screenshot({ path: 'screenshot-viewport.png' });
  await browser.close();
})();
