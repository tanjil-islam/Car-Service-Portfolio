"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

export default function PartsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });


  // Image Opacities (Synchronized, GPU Smooth)
  const img1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.36], [1, 1, 0]);
  const img2Opacity = useTransform(scrollYProgress, [0.28, 0.36, 0.62, 0.7], [0, 1, 1, 0]);
  const img3Opacity = useTransform(scrollYProgress, [0.62, 0.7, 1], [0, 1, 1]);

  // Image Scales
  const img1Scale = useTransform(scrollYProgress, [0, 0.36], [1, 1.06]);
  const img2Scale = useTransform(scrollYProgress, [0.28, 0.36, 0.7], [0.96, 1, 1.06]);
  const img3Scale = useTransform(scrollYProgress, [0.62, 0.7, 1], [0.96, 1, 1]);

  // Left Column Typography Opacities (Driven directly by scroll position to eliminate whileInView flickering)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.36], [1, 1, 0.2]);
  const text2Opacity = useTransform(scrollYProgress, [0.28, 0.36, 0.62, 0.7], [0.2, 1, 1, 0.2]);
  const text3Opacity = useTransform(scrollYProgress, [0.62, 0.7, 1], [0.2, 1, 1]);

  return (
    <section ref={containerRef} id="parts" className="relative h-[300vh] bg-void max-w-[1920px] mx-auto">
      {/* RIGHT COLUMN: STICKY CANVAS */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-auto z-10">
        <div className="sticky top-0 w-full h-[100dvh] md:h-screen flex items-center justify-center p-4 lg:p-5 md:p-8">
          <div
            className="w-full h-full max-h-85vh relative bg-panel/40 border border-white/10 rounded-[40px] overflow-hidden shadow-glow-plasma-sm will-change-transform transform-gpu preserve-3d"
          >
            {/* Image 1: Precision Chassis */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none origin-center will-change-transform transform-gpu"
              style={{
                opacity: img1Opacity,
                scale: img1Scale,
              }}
            >
              <img
                src="/images/chassis_new.png"
                alt="Precision Chassis"
                className="w-full h-full object-cover filter contrast-[1.15] brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-void/30" />
            </motion.div>

            {/* Image 2: V12 Engine */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none origin-center will-change-transform transform-gpu"
              style={{
                opacity: img2Opacity,
                scale: img2Scale,
              }}
            >
              <img
                src="/images/engine_new.png"
                alt="V12 Engine"
                className="w-full h-full object-cover filter contrast-[1.15] brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-void/30" />
            </motion.div>

            {/* Image 3: Carbon Aero */}
            <motion.div
              className="absolute inset-0 w-full h-full pointer-events-none origin-center will-change-transform transform-gpu"
              style={{
                opacity: img3Opacity,
                scale: img3Scale,
              }}
            >
              <img
                src="/images/aero_new.png"
                alt="Carbon Aero Kit"
                className="w-full h-full object-cover filter contrast-[1.15] brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-void/30" />
            </motion.div>

            {/* Overlay UI elements on the canvas */}
            <div className="absolute bottom-6 right-8 text-right z-30">
              <span className="font-mono text-xs tracking-widest text-plasma uppercase block opacity-80">
                SYSTEM CALIBRATION
              </span>
              <span className="font-bebas text-3xl text-white tracking-widest">
                100% OPTIMIZED
              </span>
            </div>

            <div className="absolute top-6 left-8 z-30">
              <span className="font-mono text-xs tracking-widest text-plasma uppercase flex items-center gap-3 opacity-80">
                // TELEMETRY ACTIVE
                <div className="w-2 h-2 bg-plasma rounded-full shadow-[0_0_8px_rgba(214,255,0,0.8)] animate-pulse" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT COLUMN: SCROLLING TYPOGRAPHY */}
      <div className="w-full lg:w-1/2 relative z-20 flex flex-col px-4 sm:px-6 md:px-16 lg:px-24">
        <div className="h-[100dvh] md:h-screen flex flex-col justify-center items-start">
          <motion.div style={{ opacity: text1Opacity }} className="transition-opacity duration-300">
            <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-4 block">
              // 01. THE FOUNDATION
            </span>
            <h2 className="font-bebas text-4xl md:text-6xl text-text leading-[0.9] tracking-wider mb-6">
              PRECISION <br />
              <span className="text-muted">CHASSIS</span>
            </h2>
            <p className="font-mono text-sm tracking-wide text-muted max-w-md leading-relaxed border-l border-plasma/30 pl-6">
              Every hyper-performance build begins at the core. We strip the vehicle down to bare carbon and aluminum, ensuring structural rigidity capable of handling extreme G-forces.
            </p>
          </motion.div>
        </div>

        <div className="h-[100dvh] md:h-screen flex flex-col justify-center items-start">
          <motion.div style={{ opacity: text2Opacity }} className="transition-opacity duration-300">
            <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-4 block">
              // 02. HEART OF THE MACHINE
            </span>
            <h2 className="font-bebas text-4xl md:text-6xl text-text leading-[0.9] tracking-wider mb-6">
              POWERTRAIN <br />
              <span className="text-muted">ASSEMBLY</span>
            </h2>
            <p className="font-mono text-sm tracking-wide text-muted max-w-md leading-relaxed border-l border-plasma/30 pl-6">
              Forged internals. Twin-scroll turbos. Aerospace-grade titanium exhaust manifolds. Our powertrain builds are engineered for relentless, repeatable track-day performance.
            </p>
          </motion.div>
        </div>

        <div className="h-[100dvh] md:h-screen flex flex-col justify-center items-start">
          <motion.div style={{ opacity: text3Opacity }} className="transition-opacity duration-300">
            <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-4 block">
              // 03. AERODYNAMIC FLOW
            </span>
            <h2 className="font-bebas text-4xl md:text-6xl text-text leading-[0.9] tracking-wider mb-6">
              CARBON <br />
              <span className="text-muted">AERO KIT</span>
            </h2>
            <p className="font-mono text-sm tracking-wide text-muted max-w-md leading-relaxed border-l border-plasma/30 pl-6">
              Wind-tunnel tested carbon fiber composites that deliver massive downforce without compromising drag coefficient. Every splitter and wing is bespoke.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
