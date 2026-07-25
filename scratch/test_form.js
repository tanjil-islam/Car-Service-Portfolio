const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser test...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));
  page.on('response', async res => {
    if (res.url().includes('/api/commission')) {
      console.log('API RESPONSE STATUS:', res.status());
      try {
        const body = await res.text();
        console.log('API RESPONSE BODY:', body);
      } catch (e) {}
    }
  });

  await page.goto('http://localhost:3000#booking', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Step 1: Select Service
  await page.click('button:has-text("Engine Rebuild")');
  await page.click('button:has-text("PROCEED")');
  await page.waitForTimeout(500);

  // Step 2: Vehicle Details
  await page.fill('input[placeholder*="PORSCHE"]', 'PORSCHE');
  await page.fill('input[placeholder*="911 GT3 RS"]', '911 GT3 RS');
  await page.fill('input[placeholder*="2024"]', '2024');
  await page.click('button:has-text("PROCEED")');
  await page.waitForTimeout(500);

  // Step 3: Requirements & Schedule
  await page.fill('input[type="date"]', '2026-08-01');
  await page.click('button:has-text("10:00 AM")');
  await page.click('button:has-text("PROCEED")');
  await page.waitForTimeout(500);

  // Step 4: Review & Contact
  await page.fill('input[placeholder*="FULL NAME"]', 'Test Client');
  await page.fill('input[placeholder*="NAME@DOMAIN.COM"]', 'testclient999@gmail.com');
  await page.fill('input[placeholder*="555"]', '+15551234567');

  console.log('Clicking SUBMIT APPOINTMENT...');
  await page.click('button:has-text("SUBMIT APPOINTMENT")');
  await page.waitForTimeout(6000);

  await page.screenshot({ path: 'c:/Car Portfolio/booking_live_result.png' });
  console.log('Form submission test complete!');
  await browser.close();
})();
