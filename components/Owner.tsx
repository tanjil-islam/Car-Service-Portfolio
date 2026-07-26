"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useInView, motion } from "framer-motion";
import { UserCog } from "lucide-react";

export default function Owner() {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isCounterInView = useInView(counterRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isCounterInView) return;

    let start = 0;
    const end = 20;
    const duration = 2000;
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isCounterInView]);

  return (
    <section id="owner" className="py-16 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 bg-void relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 md:gap-16 items-center">
          
          {/* Graphic / Avatar side */}
          <div className="lg:col-span-6 relative h-[400px] md:h-600px md:h-[500px] md:h-800px rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-plasma/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <motion.div 
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <img 
                src="/images/marcus.png" 
                alt="Marcus Vance" 
                className="w-full h-full object-cover filter contrast-[1.1] grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" 
              />
            </motion.div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-plasma/50 z-20 m-6 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-plasma/50 z-20 m-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
            
            <div className="absolute bottom-0 left-0 p-5 md:p-8 z-20 w-full bg-gradient-to-t from-void/90 via-void/50 to-transparent">
              <span className="font-mono text-xs tracking-[0.4em] text-plasma uppercase block mb-2">
                // CLEARANCE LEVEL: OMEGA
              </span>
              <div className="font-mono text-xs text-white/50 tracking-widest uppercase">
                ID: 884-A / VANCE, M.
              </div>
            </div>
          </div>

          {/* Bio side */}
          <div className="lg:col-span-6 flex flex-col justify-center pl-0 lg:pl-12">
            <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase flex items-center gap-4">
              <span className="w-12 h-px bg-plasma" /> CHIEF ENGINEER
            </span>
            <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text uppercase mb-2">
              <span className="text-muted">MARCUS</span> VANCE
            </h2>
            <span className="text-xs font-mono tracking-widest text-muted uppercase mb-10 block">
              Founder & Master Calibration Technician
            </span>

            <div className="border-l border-plasma/40 pl-8 mb-10 py-2 italic font-inter text-sm md:text-lg text-text">
              "Every chassis has a soul. My life's dedication is to find its absolute limit, rebuild it, and send it back to the tarmac stronger than ever."
            </div>

            <p className="text-sm md:text-base text-muted leading-relaxed tracking-wide mb-6 md:mb-12 max-w-2xl">
              Marcus spent a decade working alongside top GT3 racing teams in Germany before establishing his own performance garage. Holding master-level engineering certifications and proprietary aerodynamic fabrication credits, he guides the engineering vision of the shop with extreme attention to detail.
            </p>

            {/* Stats count and credentials wrapper */}
            <div className="flex flex-col sm:flex-row gap-5 md:gap-10 items-start sm:items-center justify-between border-t border-white/10 pt-10">
              {/* Animated Experience Counter */}
              <div ref={counterRef} className="flex flex-col">
                <span className="text-xs font-mono text-plasma tracking-widest uppercase mb-2">
                  EXPERIENCE RECORD
                </span>
                <span className="font-bebas text-6xl text-text">
                  {count}+ YRS
                </span>
              </div>

              {/* Social Channels & Credentials */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-3 flex-wrap">
                  <span className="px-5 py-2 bg-white/5 border border-white/10 text-text text-xs font-mono tracking-widest uppercase rounded-full">
                    ASE MASTER TUNE
                  </span>
                  <span className="px-5 py-2 bg-white/5 border border-white/10 text-text text-xs font-mono tracking-widest uppercase rounded-full">
                    3D COMPOSITES
                  </span>
                </div>
                
                <div className="flex gap-4 items-center text-xs font-mono text-muted uppercase tracking-widest">
                  <span className="text-xs text-muted/50">// SOCIAL INDEX:</span>
                  <a href="#" className="hover:text-plasma transition-colors duration-300">INSTAGRAM</a>
                  <span>/</span>
                  <a href="#" className="hover:text-plasma transition-colors duration-300">LINKEDIN</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
