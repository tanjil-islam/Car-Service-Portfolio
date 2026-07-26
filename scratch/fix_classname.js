const fs = require('fs');
let content = fs.readFileSync('components/HoloCarLoop.tsx', 'utf8');
content = content.replace(/className="(.*?)" className="(.*?)"/g, 'className="$1 $2"');
fs.writeFileSync('components/HoloCarLoop.tsx', content);
