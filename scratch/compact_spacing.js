const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:', 'Car Portfolio', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

let changedFiles = 0;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Paddings
  content = content.replace(/\bpy-32\b/g, 'py-16 md:py-32');
  content = content.replace(/\bpy-24\b/g, 'py-12 md:py-24');
  content = content.replace(/\bpy-20\b/g, 'py-10 md:py-20');
  content = content.replace(/\bpt-32\b/g, 'pt-16 md:pt-32');
  content = content.replace(/\bpb-32\b/g, 'pb-16 md:pb-32');
  content = content.replace(/\bpt-20\b/g, 'pt-10 md:pt-20');
  
  // Card paddings
  content = content.replace(/\bp-12\b/g, 'p-6 md:p-12');
  content = content.replace(/\bp-10\b/g, 'p-6 md:p-10');
  content = content.replace(/\bp-8\b/g, 'p-5 md:p-8');
  
  // 2. Margins
  content = content.replace(/\bmb-24\b/g, 'mb-12 md:mb-24');
  content = content.replace(/\bmb-20\b/g, 'mb-10 md:mb-20');
  content = content.replace(/\bmb-16\b/g, 'mb-8 md:mb-16');
  content = content.replace(/\bmb-12\b/g, 'mb-6 md:mb-12');
  
  content = content.replace(/\bmt-32\b/g, 'mt-16 md:mt-32');
  content = content.replace(/\bmt-20\b/g, 'mt-10 md:mt-20');
  content = content.replace(/\bmt-16\b/g, 'mt-8 md:mt-16');
  content = content.replace(/\bmt-12\b/g, 'mt-6 md:mt-12');
  
  // 3. Gaps
  content = content.replace(/\bgap-24\b/g, 'gap-10 md:gap-24');
  content = content.replace(/\bgap-16\b/g, 'gap-8 md:gap-16');
  content = content.replace(/\bgap-12\b/g, 'gap-6 md:gap-12');
  content = content.replace(/\bgap-10\b/g, 'gap-5 md:gap-10');
  content = content.replace(/\bgap-8\b/g, 'gap-4 md:gap-8');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    changedFiles++;
  }
}

console.log(`Successfully updated ${changedFiles} files with vertical compaction.`);
