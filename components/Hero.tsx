"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      
      const handleCanPlay = () => {
        video.play().catch(() => {});
      };

      if (video.readyState >= 2) {
        video.play().catch(() => {});
      } else {
        video.addEventListener("canplay", handleCanPlay);
      }

      // Fallback play trigger
      const timer = setTimeout(() => {
        video.play().catch(() => {});
      }, 300);

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
        clearTimeout(timer);
      };
    }
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 20, 
        mass: 1 
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative h-[100dvh] md:h-screen min-h-[500px] md:min-h-[800px] flex items-center justify-center bg-void overflow-hidden"
    >
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full bg-void">
        {/* FastStart 1080p Video - Direct SRC with Guaranteed Autoplay */}
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105"
        />

        {/* Deep vignette for premium contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] z-10 pointer-events-none" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 w-full max-w-screen-2xl px-6 md:px-16 flex flex-col items-center text-center mt-10 md:mt-20"
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="font-mono text-xs md:text-sm tracking-[0.5em] text-muted uppercase mb-6 flex items-center gap-4"
        >
          <div className="w-12 h-px bg-plasma" />
          EXPERT PERFORMANCE ENGINEERING
          <div className="w-12 h-px bg-plasma" />
        </motion.div>

        {/* Massive Title Group */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <h1 className="font-bebas text-[15vw] md:text-9vw leading-[0.8] tracking-widest text-text uppercase mix-blend-difference z-20">
            PRECISION
          </h1>
          <h1 className="font-bebas text-[15vw] md:text-9vw leading-[0.8] tracking-widest text-plasma uppercase drop-shadow-glow-plasma-lg">
            ENGINEERING
          </h1>
        </motion.div>
        
        <motion.p 
          variants={itemVariants}
          className="mt-8 text-sm md:text-base text-muted max-w-lg text-center font-mono tracking-wide leading-relaxed"
        >
          ELEVATING YOUR VEHICLE TO ITS PEAK POTENTIAL WITH AEROSPACE-GRADE TOLERANCES.
        </motion.p>

        {/* Magnetic CTA Area (Simulated for simplicity) */}
        <motion.div variants={itemVariants} className="mt-10 md:mt-20 group relative">
          <div className="absolute inset-0 bg-plasma opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-full" />
          <a
            href="#parts"
            className="flex items-center gap-4 px-10 py-5 bg-panel border border-white/10 text-text font-mono text-sm tracking-widest uppercase transition-all duration-500 rounded-full hover:border-plasma hover:bg-white/5 backdrop-blur-md"
          >
            DISCOVER SCHEMATICS
            <ArrowDownRight className="text-plasma group-hover:rotate-[-45deg] transition-transform duration-500" />
          </a>
        </motion.div>
      </motion.div>

      {/* Technical coordinate stamp */}
      <div className="absolute bottom-10 left-6 md:left-16 z-20 text-xs font-mono tracking-widest text-muted/50 hidden sm:block uppercase flex-col gap-1">
        <div>GARAGE LOC // LOS ANGELES, CA</div>
        <div>LAT. 34.0522° N, LONG. 118.2437° W</div>
      </div>
    </section>
  );
}
