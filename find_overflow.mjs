import { chromium } from 'playwright';

async function findOverflow() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const badElements = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    const result = [];
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 390 || rect.right > 390) {
        result.push({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          width: rect.width,
          right: rect.right
        });
      }
    }
    return result;
  });
  
  console.log("Elements wider than 390 on Home/Mobile:", JSON.stringify(badElements.filter(e => e.width > 400), null, 2));
  
  await browser.close();
}

findOverflow().catch(console.error);
