const fs = require('fs');

function fixBooking() {
  let b = fs.readFileSync('components/Booking.tsx', 'utf8');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*<Car size={14} className="text-plasma" \/> VEHICLE MAKE \*\s*<\/label>\s*<input/g, '<label htmlFor="make" className="text-muted tracking-widest uppercase flex items-center gap-2">\n                        <Car size={14} className="text-plasma" /> VEHICLE MAKE *\n                      </label>\n                      <input id="make"');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*<Car size={14} className="text-plasma" \/> VEHICLE MODEL \*\s*<\/label>\s*<input/g, '<label htmlFor="model" className="text-muted tracking-widest uppercase flex items-center gap-2">\n                        <Car size={14} className="text-plasma" /> VEHICLE MODEL *\n                      </label>\n                      <input id="model"');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*<Calendar size={14} className="text-plasma" \/> MODEL YEAR \*\s*<\/label>\s*<input/g, '<label htmlFor="year" className="text-muted tracking-widest uppercase flex items-center gap-2">\n                        <Calendar size={14} className="text-plasma" /> MODEL YEAR *\n                      </label>\n                      <input id="year"');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*<Wrench size={14} className="text-plasma" \/> ENGINE SPEC \/ SETUP\s*<\/label>\s*<input/g, '<label htmlFor="spec" className="text-muted tracking-widest uppercase flex items-center gap-2">\n                        <Wrench size={14} className="text-plasma" /> ENGINE SPEC / SETUP\n                      </label>\n                      <input id="spec"');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*<Calendar size={14} className="text-plasma" \/> TARGET DROP-OFF DATE \*\s*<\/label>\s*<input/g, '<label htmlFor="date" className="text-muted tracking-widest uppercase flex items-center gap-2">\n                        <Calendar size={14} className="text-plasma" /> TARGET DROP-OFF DATE *\n                      </label>\n                      <input id="date"');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*<FileText size={14} className="text-plasma" \/> SPECIAL NOTES & GOALS\s*<\/label>\s*<textarea/g, '<label htmlFor="notes" className="text-muted tracking-widest uppercase flex items-center gap-2">\n                        <FileText size={14} className="text-plasma" /> SPECIAL NOTES & GOALS\n                      </label>\n                      <textarea id="notes"');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*<User size={14} className="text-plasma" \/> FULL NAME \*\s*<\/label>\s*<input/g, '<label htmlFor="name" className="text-muted tracking-widest uppercase flex items-center gap-2">\n                            <User size={14} className="text-plasma" /> FULL NAME *\n                          </label>\n                          <input id="name"');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center justify-between">\s*<span className="flex items-center gap-2">\s*<Mail size={14} className="text-plasma" \/> EMAIL ADDRESS \*\s*<\/span>\s*(.*?)<\/label>\s*<input/g, '<label htmlFor="email" className="text-muted tracking-widest uppercase flex items-center justify-between">\n                            <span className="flex items-center gap-2">\n                              <Mail size={14} className="text-plasma" /> EMAIL ADDRESS *\n                            </span>\n                            $1</label>\n                          <input id="email"');
  b = b.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*<Phone size={14} className="text-plasma" \/> PHONE NUMBER \*\s*<\/label>\s*<input/g, '<label htmlFor="phone" className="text-muted tracking-widest uppercase flex items-center gap-2">\n                            <Phone size={14} className="text-plasma" /> PHONE NUMBER *\n                          </label>\n                          <input id="phone"');
  b = b.replace(/<input\s*type="time"/g, '<label htmlFor="customTime" className="sr-only">Custom Time</label>\n                          <input id="customTime" type="time"');
  
  fs.writeFileSync('components/Booking.tsx', b);
  console.log("Fixed Booking.tsx accessibility");
}

function fixContact() {
  if (fs.existsSync('components/Contact.tsx')) {
    let c = fs.readFileSync('components/Contact.tsx', 'utf8');
    c = c.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*FULL NAME \*\s*<\/label>\s*<input/g, '<label htmlFor="name" className="text-muted tracking-widest uppercase flex items-center gap-2">\nFULL NAME *\n</label>\n<input id="name"');
    c = c.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*EMAIL ADDRESS \*\s*<\/label>\s*<input/g, '<label htmlFor="email" className="text-muted tracking-widest uppercase flex items-center gap-2">\nEMAIL ADDRESS *\n</label>\n<input id="email"');
    c = c.replace(/<label className="text-muted tracking-widest uppercase flex items-center gap-2">\s*MESSAGE \*\s*<\/label>\s*<textarea/g, '<label htmlFor="message" className="text-muted tracking-widest uppercase flex items-center gap-2">\nMESSAGE *\n</label>\n<textarea id="message"');
    fs.writeFileSync('components/Contact.tsx', c);
    console.log("Fixed Contact.tsx accessibility");
  } else {
    console.log("No Contact.tsx found.");
  }
}

fixBooking();
fixContact();
