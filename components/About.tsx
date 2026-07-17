"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="about" className="py-32 px-6 md:px-16 lg:px-24 bg-void relative">
      <div className="max-w-[1920px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-12">
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 block uppercase">
              // THE FOUNDATION
            </span>
            <h2 className="font-bebas text-6xl md:text-8xl tracking-wider text-text uppercase leading-[0.9]">
              OBSESSIVE <br />
              <span className="text-muted">ENGINEERING</span>
            </h2>
          </div>
          <p className="font-mono text-sm tracking-widest text-muted max-w-sm mt-8 md:mt-0 leading-relaxed uppercase">
            Founded on the principles of mechanical excellence and precision tuning since 2010.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Large Editorial Image */}
          <div className="lg:col-span-7 h-[60vh] md:h-[80vh] relative perspective-container" ref={containerRef}>
            <motion.div 
              className="w-full h-full relative group overflow-hidden bg-panel border border-white/5 rounded-2xl shadow-[0_0_50px_rgba(214,255,0,0.03)]"
              style={{ 
                rotateX: useTransform(scrollYProgress, [0, 1], [15, -15]), 
                rotateY: useTransform(scrollYProgress, [0, 1], [-15, 15]),
                transformStyle: "preserve-3d" 
              }}
            >
              <motion.img 
                src="/images/carbon_aero_3d.png" 
                alt="3D Carbon Aero Kit" 
                className="w-full h-full object-cover filter contrast-[1.1] opacity-90 group-hover:opacity-100 transition-all duration-1000"
                style={{ 
                  scale: useTransform(scrollYProgress, [0, 1], [1.1, 1.2]),
                  z: 50 
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-[linear-gradient(to_top,#050505,transparent)] opacity-80" 
                style={{ z: 20 }} 
              />
              
              <motion.div 
                className="absolute bottom-10 left-10 text-text" 
                style={{ z: 80 }}
              >
                <div className="font-mono text-xs tracking-widest text-plasma mb-2 drop-shadow-[0_0_10px_rgba(214,255,0,0.5)]">FIG 01. AERODYNAMIC FLOW</div>
                <div className="font-bebas text-4xl tracking-widest drop-shadow-[0_0_20px_rgba(0,0,0,1)]">DRY CARBON FIBER KIT</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Text and Stats */}
          <div className="lg:col-span-5 flex flex-col pt-10">
            <h3 className="font-bebas text-3xl tracking-widest text-text mb-6">
              THE ART OF MECHANICAL PERFECTION
            </h3>
            <p className="text-muted leading-relaxed tracking-wide mb-12">
              We specialize in custom engine building, performance calibration, and premium aftermarket parts. Every vehicle is subjected to a rigorous multi-point mechanical inspection, treating engineering not just as a service, but as an art form.
              <br /><br />
              Our facility is equipped with state-of-the-art telemetry tools, 4-wheel dynos, and climate-controlled clean rooms for engine assembly.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
              <div className="flex flex-col">
                <span className="font-mono text-xs tracking-widest text-plasma mb-2 uppercase">Experience</span>
                <span className="font-bebas text-5xl text-text">14+ YRS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs tracking-widest text-plasma mb-2 uppercase">Projects</span>
                <span className="font-bebas text-5xl text-text">850+</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs tracking-widest text-plasma mb-2 uppercase">Global Reach</span>
                <span className="font-bebas text-5xl text-text">24 CTRS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs tracking-widest text-plasma mb-2 uppercase">Precision</span>
                <span className="font-bebas text-5xl text-text">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
