const fs = require('fs');
const path = require('path');

function addImport(content) {
  if (!content.includes('next/image')) {
    return content.replace(/(import .*?;?\n)/, '$1import Image from "next/image";\n');
  }
  return content;
}

// 1. Footer.tsx
let footer = fs.readFileSync('components/Footer.tsx', 'utf8');
footer = addImport(footer);
footer = footer.replace(
  /<img src="\/images\/logo.png" alt="Roadmen Logo" className="(.*?)" \/>/g,
  '<Image src="/images/logo.png" alt="Roadmen Logo" width={112} height={112} className="$1" />'
);
fs.writeFileSync('components/Footer.tsx', footer);

// 2. Navbar.tsx
let navbar = fs.readFileSync('components/Navbar.tsx', 'utf8');
navbar = addImport(navbar);
navbar = navbar.replace(
  /<img\s*src="\/images\/logo.png"\s*alt="Roadmen Logo"\s*className="(.*?)"\s*\/>/gs,
  '<Image src="/images/logo.png" alt="Roadmen Logo" width={48} height={48} className="$1" />'
);
fs.writeFileSync('components/Navbar.tsx', navbar);

// 3. Owner.tsx
let owner = fs.readFileSync('components/Owner.tsx', 'utf8');
owner = addImport(owner);
owner = owner.replace(
  /<img\s*src="\/images\/marcus.png"\s*alt="Marcus Aurelius"\s*className="(.*?)"\s*\/>/gs,
  '<Image src="/images/marcus.png" alt="Marcus Aurelius" fill className="$1" />'
);
fs.writeFileSync('components/Owner.tsx', owner);

// 4. Team.tsx
let team = fs.readFileSync('components/Team.tsx', 'utf8');
team = addImport(team);
team = team.replace(
  /<img\s*src=\{member\.image\}\s*alt=\{member\.name\}\s*className="(.*?)"\s*\/>/gs,
  '<Image src={member.image} alt={member.name} fill className="$1" />'
);
fs.writeFileSync('components/Team.tsx', team);

// 5. WorkGallery.tsx
let gallery = fs.readFileSync('components/WorkGallery.tsx', 'utf8');
gallery = addImport(gallery);
gallery = gallery.replace(
  /<img\s*src=\{project\.image\}\s*alt=\{project\.title\}\s*className="(.*?)"\s*\/>/gs,
  '<Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="$1" />'
);
gallery = gallery.replace(
  /<img\s*src=\{img\}\s*alt=\{`\$\{activeModalProject\.title\} detail \$\{idx \+ 1\}`\}\s*className="(.*?)"\s*\/>/gs,
  '<Image src={img} alt={`${activeModalProject.title} detail ${idx + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="$1" />'
);
fs.writeFileSync('components/WorkGallery.tsx', gallery);

// 6. PartsShowcase.tsx
let parts = fs.readFileSync('components/PartsShowcase.tsx', 'utf8');
parts = addImport(parts);
parts = parts.replace(
  /<img\s*src="\/images\/parts\/chassis\.png"\s*alt="Precision Chassis"\s*className="(.*?)"\s*\/>/gs,
  '<Image src="/images/parts/chassis.png" alt="Precision Chassis" fill className="$1" />'
);
parts = parts.replace(
  /<img\s*src="\/images\/parts\/engine\.png"\s*alt="Powertrain"\s*className="(.*?)"\s*\/>/gs,
  '<Image src="/images/parts/engine.png" alt="Powertrain" fill className="$1" />'
);
parts = parts.replace(
  /<img\s*src="\/images\/parts\/aero\.png"\s*alt="Aero Kit"\s*className="(.*?)"\s*\/>/gs,
  '<Image src="/images/parts/aero.png" alt="Aero Kit" fill className="$1" />'
);
fs.writeFileSync('components/PartsShowcase.tsx', parts);

// 7. FleetViewer.tsx
let fleet = fs.readFileSync('components/FleetViewer.tsx', 'utf8');
fleet = addImport(fleet);
fleet = fleet.replace(
  /<img\s*src=\{vehicle\.image\}\s*alt=\{vehicle\.name\}\s*className="(.*?)"\s*\/>/gs,
  '<Image src={vehicle.image} alt={vehicle.name} fill className="$1" />'
);
fs.writeFileSync('components/FleetViewer.tsx', fleet);

console.log("Image refactor complete.");
