"use client";

import { motion } from "framer-motion";
import { teamData } from "@/data/RoadmenData";

export default function Team() {
  return (
    <section id="team" className="py-32 px-6 md:px-16 lg:px-24 bg-void border-t border-white/5 relative">
      <div className="max-w-[1920px] mx-auto">
        
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase">
            // THE ENGINEERS
          </span>
          <h2 className="font-bebas text-6xl md:text-8xl tracking-wider text-text uppercase leading-none">
            MEET THE <span className="text-muted">CREW</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.map((member, idx) => {
            const AvatarIcon = member.avatar;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative h-[500px] lg:h-[600px] rounded-xl overflow-hidden border border-white/5 bg-panel/30"
              >
                {/* Background Image */}
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                
                {/* Gradients for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-plasma/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  
                  {/* Top Icon - absolute positioned within card */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-void/50 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-plasma transition-colors duration-500 z-10">
                    <AvatarIcon size={20} className="text-muted group-hover:text-plasma transition-colors duration-500" />
                  </div>
                  
                  <div className="relative z-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="font-bebas text-4xl tracking-widest text-text uppercase mb-1">
                      {member.name}
                    </h4>
                    <span className="font-mono text-[10px] tracking-widest text-plasma uppercase mb-4 block">
                      {member.role}
                    </span>
                    
                    {/* Expandable Bio Section */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <p className="text-xs text-muted leading-relaxed tracking-wide mb-6">
                        {member.bio}
                      </p>
                      
                      <div className="border-t border-white/10 pt-4 mt-auto">
                        <div className="font-mono text-[10px] tracking-widest text-muted uppercase mb-2">CERTIFICATIONS</div>
                        <div className="flex flex-col gap-1">
                          {member.certifications.map((cert, cIdx) => (
                            <span key={cIdx} className="text-[10px] tracking-widest text-text uppercase">
                              • {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Corner Accents */}
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-plasma/50 z-20 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-plasma/50 z-20 m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
