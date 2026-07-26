const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:', 'Car Portfolio', 'components');

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

let changedFiles = 0;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace small pixel sizes with text-xs
  content = content.replace(/text-\[(9|10|11|12)px\]/g, 'text-xs');
  
  // Replace large headings
  content = content.replace(/text-6xl md:text-8xl/g, 'text-5xl md:text-6xl');
  content = content.replace(/text-5xl md:text-8xl/g, 'text-4xl md:text-6xl');
  content = content.replace(/md:text-8xl/g, 'md:text-6xl'); // fallback for any missed ones
  
  // Replace 7xl just in case
  content = content.replace(/text-6xl md:text-7xl/g, 'text-5xl md:text-6xl');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    changedFiles++;
  }
}

console.log(`Successfully updated ${changedFiles} files.`);
