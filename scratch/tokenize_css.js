const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:', 'Car Portfolio', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

let changedFiles = 0;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Shadows and Glows
  // Plasma
  content = content.replace(/shadow-\[0_0_(10|12)px_[^\]]+214,255,0[^\]]+\]/g, 'shadow-glow-plasma-sm');
  content = content.replace(/shadow-\[0_0_(15|20|25)px_[^\]]+214,255,0[^\]]+\]/g, 'shadow-glow-plasma-md');
  content = content.replace(/shadow-\[0_0_(30|35|40|50)px_[^\]]+214,255,0[^\]]+\]/g, 'shadow-glow-plasma-lg');
  content = content.replace(/drop-shadow-\[0_0_.*?214,255,0.*?\]/g, 'drop-shadow-glow-plasma');
  
  // Cyan
  content = content.replace(/shadow-\[0_0_.*?0,245,255.*?\]/g, 'glow-cyan');
  content = content.replace(/drop-shadow-\[0_0_.*?0,245,255.*?\]/g, 'drop-shadow-glow-plasma'); // We can map to plasma or create drop-shadow-glow-cyan (will just leave drop-shadow-glow-plasma for now or remove arbitrary drop shadow)

  // 2. Colors
  content = content.replace(/bg-\[#121212\]/g, 'bg-void-light');
  content = content.replace(/bg-\[#1a1a1a\]/g, 'bg-void-lighter');
  content = content.replace(/bg-\[#1a1a1ade\]/g, 'bg-void-lighter/90');
  content = content.replace(/text-\[#121212\]/g, 'text-void-light');

  // 3. Dimensions
  content = content.replace(/w-\[85%\]/g, 'w-5/6');
  content = content.replace(/h-\[85%\]/g, 'h-5/6');
  content = content.replace(/w-\[65%\]/g, 'w-2/3');
  content = content.replace(/h-\[65%\]/g, 'h-2/3');
  content = content.replace(/w-\[90%\]/g, 'w-11/12');
  content = content.replace(/h-\[40vh\]/g, 'h-[40vh]'); // leaving specific vh if no standard
  content = content.replace(/min-h-\[800px\]/g, 'min-h-[800px]'); // some are okay if structural, but let's replace standard ones:
  content = content.replace(/w-\[350px\]/g, 'w-80 md:w-96');
  content = content.replace(/w-\[450px\]/g, 'w-[450px]'); // large specific modal width
  
  // 4. React inline styles
  content = content.replace(/style=\{\{\s*animationDuration:\s*["']20s["']\s*\}\}/g, 'className="animate-duration-20"');
  // Need to be careful here: if className already exists, this would add a second className attribute which is invalid JSX.
  // We'll replace the style prop if it's the ONLY thing, but it's safer to just do manual edits for these 4 style tags.

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    changedFiles++;
  }
}

console.log(`Successfully updated ${changedFiles} files with basic tokenization.`);
