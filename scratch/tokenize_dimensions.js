const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:', 'Car Portfolio', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

let changedFiles = 0;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Tiny borders
  content = content.replace(/h-\[1px\]/g, 'h-px');
  content = content.replace(/h-\[2px\]/g, 'h-0.5');
  
  // Specific viewports
  content = content.replace(/h-\[40vh\]/g, 'h-40vh');
  content = content.replace(/h-\[60vh\]/g, 'h-60vh');
  content = content.replace(/h-\[80vh\]/g, 'h-80vh');
  content = content.replace(/max-h-\[85vh\]/g, 'max-h-85vh');
  content = content.replace(/max-h-\[40vh\]/g, 'max-h-40vh');
  content = content.replace(/max-h-\[60vh\]/g, 'max-h-60vh');
  content = content.replace(/h-\[300vh\]/g, 'h-300vh');
  
  // Specific pixels
  content = content.replace(/min-h-\[800px\]/g, 'min-h-800px');
  content = content.replace(/h-\[600px\]/g, 'h-600px');
  content = content.replace(/h-\[800px\]/g, 'h-800px');
  content = content.replace(/h-\[500px\]/g, 'h-500px');
  content = content.replace(/w-\[280px\]/g, 'w-280px'); 
  content = content.replace(/h-\[280px\]/g, 'h-280px');
  content = content.replace(/w-\[450px\]/g, 'w-450px');
  content = content.replace(/h-\[450px\]/g, 'h-450px');
  content = content.replace(/w-\[400px\]/g, 'w-400px');
  content = content.replace(/h-\[400px\]/g, 'h-400px');
  content = content.replace(/w-\[300px\]/g, 'w-300px');

  // Text viewports
  content = content.replace(/text-\[12vw\]/g, 'text-12vw');
  content = content.replace(/text-\[9vw\]/g, 'text-9vw');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    changedFiles++;
  }
}

console.log(`Successfully updated ${changedFiles} files with dimension tokenization.`);
