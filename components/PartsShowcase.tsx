"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function PartsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="parts" className="relative h-[400vh] bg-void max-w-[1920px] mx-auto">
      
      {/* RIGHT COLUMN: STICKY CANVAS (Bulletproof Layout) */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none z-10">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center p-4 perspective-container pointer-events-auto">
          <div 
            className="w-full h-full max-h-[90vh] relative bg-panel/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm shadow-[0_0_50px_rgba(214,255,0,0.03)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Image 1: Precision Chassis */}
            <motion.div 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]),
                rotateX: useTransform(scrollYProgress, [0, 0.33], [15, -15]),
                rotateY: useTransform(scrollYProgress, [0, 0.33], [-15, 15]),
                scale: useTransform(scrollYProgress, [0, 0.33], [1, 1.15])
              }}
            >
              <img src="/images/precision_chassis_3d.png" alt="Precision Chassis" className="w-full h-full object-cover filter contrast-[1.1]" />
              <div className="absolute inset-0 bg-void/20" />
            </motion.div>

            {/* Image 2: V12 Engine */}
            <motion.div 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ 
                opacity: useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]),
                rotateX: useTransform(scrollYProgress, [0.33, 0.66], [15, -15]),
                rotateY: useTransform(scrollYProgress, [0.33, 0.66], [-15, 15]),
                scale: useTransform(scrollYProgress, [0.33, 0.66], [1, 1.15])
              }}
            >
              <img src="/images/v12_engine_3d.png" alt="V12 Engine" className="w-full h-full object-cover filter contrast-[1.1]" />
              <div className="absolute inset-0 bg-void/20" />
            </motion.div>

            {/* Image 3: Carbon Aero */}
            <motion.div 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ 
                opacity: useTransform(scrollYProgress, [0.55, 0.65, 1], [0, 1, 1]),
                rotateX: useTransform(scrollYProgress, [0.66, 1], [15, -15]),
                rotateY: useTransform(scrollYProgress, [0.66, 1], [-15, 15]),
                scale: useTransform(scrollYProgress, [0.66, 1], [1, 1.15])
              }}
            >
              <img src="/images/carbon_aero_3d.png" alt="Carbon Aero Kit" className="w-full h-full object-cover filter contrast-[1.1]" />
              <div className="absolute inset-0 bg-void/20" />
            </motion.div>
            
            {/* Overlay UI elements on the canvas */}
            <div className="absolute bottom-6 right-8 text-right mix-blend-difference z-20">
              <span className="font-mono text-[10px] tracking-widest text-muted uppercase block">
                RENDER ENGINE // ACTIVE
              </span>
              <motion.span 
                className="font-bebas text-3xl text-plasma tracking-widest"
                style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.3, 1]) }}
              >
                100% OPTIMIZED
              </motion.span>
            </div>
            
            <div className="absolute top-6 left-8 mix-blend-difference z-20">
              <span className="font-mono text-[10px] tracking-widest text-muted uppercase flex items-center gap-2">
                // TELEMETRY
                <motion.div 
                  className="w-1.5 h-1.5 bg-plasma rounded-full"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT COLUMN: SCROLLING TYPOGRAPHY */}
      <div className="w-full lg:w-1/2 relative z-20 flex flex-col px-6 md:px-16 lg:px-24">
          
          <div className="h-screen flex flex-col justify-center items-start">
            <motion.div 
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
            >
              <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-4 block">
                // 01. THE FOUNDATION
              </span>
              <h2 className="font-bebas text-6xl md:text-8xl text-text leading-[0.9] tracking-wider mb-6">
                PRECISION <br />
                <span className="text-muted">CHASSIS</span>
              </h2>
              <p className="font-mono text-sm tracking-wide text-muted max-w-md leading-relaxed border-l border-plasma/30 pl-6">
                Every hyper-performance build begins at the core. We strip the vehicle down to bare carbon and aluminum, ensuring structural rigidity capable of handling extreme G-forces.
              </p>
            </motion.div>
          </div>

          <div className="h-screen flex flex-col justify-center items-start">
            <motion.div 
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
            >
              <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-4 block">
                // 02. HEART OF THE MACHINE
              </span>
              <h2 className="font-bebas text-6xl md:text-8xl text-text leading-[0.9] tracking-wider mb-6">
                POWERTRAIN <br />
                <span className="text-muted">ASSEMBLY</span>
              </h2>
              <p className="font-mono text-sm tracking-wide text-muted max-w-md leading-relaxed border-l border-plasma/30 pl-6">
                Forged internals. Twin-scroll turbos. Aerospace-grade titanium exhaust manifolds. Our powertrain builds are engineered for relentless, repeatable track-day performance.
              </p>
            </motion.div>
          </div>

          <div className="h-screen flex flex-col justify-center items-start">
            <motion.div 
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.5 }}
            >
              <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-4 block">
                // 03. AERODYNAMIC FLOW
              </span>
              <h2 className="font-bebas text-6xl md:text-8xl text-text leading-[0.9] tracking-wider mb-6">
                CARBON <br />
                <span className="text-muted">AERO KIT</span>
              </h2>
              <p className="font-mono text-sm tracking-wide text-muted max-w-md leading-relaxed border-l border-plasma/30 pl-6">
                Downforce is nothing without balance. We utilize computational fluid dynamics to sculpt dry carbon fiber panels that stick the car to the tarmac at 300+ km/h.
              </p>
            </motion.div>
          </div>

          {/* Empty spacer so scroll continues past the last text block smoothly */}
          <div className="h-screen" />
        </div>
    </section>
  );
}
