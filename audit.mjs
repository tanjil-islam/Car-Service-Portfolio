import { chromium } from 'playwright';
import fs from 'fs';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Booking', path: '/booking' },
  { name: 'Services', path: '/services' },
  { name: 'Parts', path: '/parts' },
  { name: 'Contact', path: '/contact' }
];

const viewports = [
  { name: 'Mobile', width: 390, height: 844 }, // iPhone 12
  { name: 'Tablet', width: 768, height: 1024 }, // iPad Mini
  { name: 'Desktop', width: 1280, height: 720 }
];

async function runAudit() {
  const browser = await chromium.launch();
  const results = [];
  
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  for (const pageInfo of pages) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }
      });
      const page = await context.newPage();
      
      console.log(`Auditing ${pageInfo.name} on ${vp.name}...`);
      try {
        await page.goto(`http://localhost:3000${pageInfo.path}`, { waitUntil: 'networkidle' });
        
        // Wait a moment for any animations
        await page.waitForTimeout(1000);
        
        // Check for horizontal scroll
        const scrollMetrics = await page.evaluate(() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
          };
        });
        
        // Take screenshot
        const safeName = `${pageInfo.name.toLowerCase()}_${vp.name.toLowerCase()}`;
        const screenshotPath = `screenshots/${safeName}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });
        
        results.push({
          page: pageInfo.name,
          viewport: vp.name,
          scrollMetrics,
          screenshot: screenshotPath
        });
      } catch (err) {
        console.error(`Error auditing ${pageInfo.name} on ${vp.name}:`, err);
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();
  
  fs.writeFileSync('audit_results.json', JSON.stringify(results, null, 2));
  console.log('Audit complete.');
}

runAudit().catch(console.error);
