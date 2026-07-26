"use client";

import { motion } from "framer-motion";
import { servicesData } from "@/data/RoadmenData";
import { useState } from "react";

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-16 md:py-32 px-6 md:px-12 bg-void relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="flex flex-col mb-8 md:mb-16">
          <span className="font-mono text-xs tracking-[0.35em] text-plasma mb-4 uppercase drop-shadow-glow-plasma-sm">
            // OUR EXPERTISE
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl tracking-widest text-text uppercase leading-none">
            GARAGE <span className="text-plasma">SERVICES</span>
          </h2>
        </div>

        {/* Services Hover-Reveal List */}
        <div className="flex flex-col border-t border-white/10">
          {servicesData.map((service, idx) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIdx === idx;
            
            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative border-b border-white/10 py-10 md:py-14 transition-colors duration-500 hover:bg-white/[0.02]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10 gap-4 md:gap-8 px-4 md:px-8">
                  
                  {/* Left: Number & Title */}
                  <div className="flex items-center gap-4 md:gap-8 md:w-1/2">
                    <span className="font-mono text-sm text-muted/50 group-hover:text-plasma transition-colors duration-300">
                      0{idx + 1}
                    </span>
                    <h3 className="font-bebas text-4xl md:text-6xl tracking-wide text-text uppercase group-hover:translate-x-4 transition-transform duration-500">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: Icon, Desc & Price */}
                  <div className="flex flex-col md:w-1/2 justify-between h-full">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-muted leading-relaxed max-w-sm">
                        {service.description}
                      </p>
                      <IconComponent 
                        size={48} 
                        strokeWidth={1} 
                        className="text-muted/30 group-hover:text-plasma group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 drop-shadow-glow-plasma-md" 
                      />
                    </div>
                    
                    {/* Collapsible Specs */}
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: isHovered ? "auto" : 0, 
                        opacity: isHovered ? 1 : 0 
                      }}
                      className="overflow-hidden mt-6"
                    >
                      <div className="flex flex-col gap-2 font-mono text-xs text-muted/80 pb-4">
                        {service.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3">
                            <span className="text-plasma">//</span>
                            <span className="tracking-widest uppercase">{spec}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs font-mono tracking-widest text-text uppercase pt-4 border-t border-white/10">
                        STARTING FROM <span className="text-plasma ml-2">{service.price}</span>
                      </div>
                    </motion.div>
                  </div>
                  
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
