const fs = require('fs');

// Fix About.tsx
let about = fs.readFileSync('components/About.tsx', 'utf8');
about = about.replace('h-[50vh] md:h-60vh md:h-[60vh] md:h-80vh', 'h-[50vh] md:h-[80vh]');
fs.writeFileSync('components/About.tsx', about);

// Fix Hero.tsx
let hero = fs.readFileSync('components/Hero.tsx', 'utf8');
hero = hero.replace('min-h-[500px] md:min-h-[500px] md:h-800px', 'min-h-[500px] md:min-h-[800px]');
fs.writeFileSync('components/Hero.tsx', hero);

// Fix Owner.tsx
let owner = fs.readFileSync('components/Owner.tsx', 'utf8');
owner = owner.replace('h-[400px] md:h-600px md:h-[500px] md:h-800px', 'h-[500px] md:h-[800px]');
fs.writeFileSync('components/Owner.tsx', owner);

// Fix Team.tsx
let team = fs.readFileSync('components/Team.tsx', 'utf8');
team = team.replace('h-[350px] md:h-500px lg:h-[400px] md:h-600px', 'h-[350px] lg:h-[500px]');
fs.writeFileSync('components/Team.tsx', team);

// Fix PartsShowcase.tsx
let parts = fs.readFileSync('components/PartsShowcase.tsx', 'utf8');
parts = parts.replace('h-[150vh] md:h-300vh', 'h-[300vh]');
fs.writeFileSync('components/PartsShowcase.tsx', parts);

console.log("Fixed mobile layout bugs.");
