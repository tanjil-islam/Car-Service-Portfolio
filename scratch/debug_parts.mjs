import { chromium } from 'playwright';

async function debugParts() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  await page.goto('http://localhost:3001/parts');
  await page.waitForTimeout(2000);
  
  const results = await page.evaluate(() => {
    const parts = document.getElementById('parts');
    const stickyContainer = parts.querySelector('.sticky');
    const images = Array.from(parts.querySelectorAll('img')).map(img => ({
      src: img.src,
      width: img.clientWidth,
      height: img.clientHeight,
      opacity: window.getComputedStyle(img.parentElement).opacity,
      display: window.getComputedStyle(img.parentElement).display,
    }));
    
    return {
      partsHeight: parts.clientHeight,
      stickyContainerHeight: stickyContainer ? stickyContainer.clientHeight : null,
      stickyContainerTop: stickyContainer ? stickyContainer.getBoundingClientRect().top : null,
      images,
    };
  });
  
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}
debugParts().catch(console.error);
