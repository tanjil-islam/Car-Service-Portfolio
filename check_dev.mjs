import { chromium } from 'playwright';

async function checkDev() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));
  
  await page.goto('http://localhost:3005/');
  await page.waitForTimeout(2000);
  
  await browser.close();
}
checkDev().catch(console.error);
