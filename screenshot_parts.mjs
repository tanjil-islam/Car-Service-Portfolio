import { chromium } from 'playwright';

async function takePartsScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  await page.goto('http://localhost:3001/parts');
  await page.waitForTimeout(2000); // wait for initial load
  
  // scroll to parts section
  await page.evaluate(() => {
    document.getElementById('parts').scrollIntoView();
  });
  
  await page.waitForTimeout(1000);
  
  // scroll down slightly inside parts to trigger the sticky
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'screenshots/parts_desktop.png' });
  await browser.close();
}
takePartsScreenshot().catch(console.error);
