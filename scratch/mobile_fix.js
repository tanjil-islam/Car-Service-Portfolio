const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:', 'Car Portfolio', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

let changedFiles = 0;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Padding standardisation
  content = content.replace(/px-6 md:px-16 lg:px-24/g, 'px-4 sm:px-6 md:px-16 lg:px-24');
  
  // 2. Viewport height optimizations
  content = content.replace(/h-screen/g, 'h-[100dvh] md:h-screen');
  content = content.replace(/min-h-800px/g, 'min-h-[500px] md:min-h-800px');
  
  // 3. Scroll Canvas optimizations
  // If h-300vh exists, cut it down for mobile so they don't scroll forever
  content = content.replace(/h-300vh/g, 'h-[150vh] md:h-300vh');
  content = content.replace(/h-80vh/g, 'h-[60vh] md:h-80vh');
  content = content.replace(/h-60vh/g, 'h-[50vh] md:h-60vh');
  
  // 4. Fixed dimensions optimizations
  content = content.replace(/h-800px/g, 'h-[500px] md:h-800px');
  content = content.replace(/h-600px/g, 'h-[400px] md:h-600px');
  content = content.replace(/h-500px/g, 'h-[350px] md:h-500px');
  
  // 5. Typography scaling (Aggressive mobile downscaling)
  content = content.replace(/text-6xl md:text-8xl/g, 'text-4xl sm:text-5xl md:text-7xl lg:text-8xl');
  content = content.replace(/text-5xl md:text-6xl/g, 'text-4xl md:text-6xl');
  content = content.replace(/text-4xl md:text-5xl/g, 'text-3xl md:text-5xl');
  
  // 6. Dynamic Hero text
  content = content.replace(/text-12vw md:text-9vw/g, 'text-[15vw] md:text-9vw'); // Make it properly huge on small screens or adjust. Actually 15vw on mobile is great.
  
  // 7. Grid collapsing
  // Many grids are already grid-cols-1 md:grid-cols-X. Let's make sure they are fine.
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    changedFiles++;
  }
}

console.log(`Successfully updated ${changedFiles} files with mobile responsiveness.`);
