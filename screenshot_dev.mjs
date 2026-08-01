import { chromium } from 'playwright';

async function takeScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3005/');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/dev_test.png', fullPage: true });
  
  await browser.close();
}
takeScreenshot().catch(console.error);
