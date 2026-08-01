import { chromium } from 'playwright';

async function checkUserDev() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR CONSOLE:', msg.text());
    }
  });
  page.on('pageerror', err => console.log('BROWSER PAGE ERROR:', err.message));
  
  console.log("Navigating to http://localhost:3000/");
  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    console.log("Navigation successful.");
  } catch (err) {
    console.log("Failed to navigate:", err.message);
  }
  
  await browser.close();
}
checkUserDev().catch(console.error);
