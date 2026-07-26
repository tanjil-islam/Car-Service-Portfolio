"use client";

import { useState } from "react";
import { motion, AnimatePresence, MotionValue, useMotionValueEvent } from "framer-motion";
import { hudPhases } from "@/data/carData";

interface ZondaExperienceProps {
  scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [rawScroll, setRawScroll] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setRawScroll(latest);
    // Determine active phase based on scroll progress (0 to 1)
    if (latest < 0.33) {
      setCurrentPhase(0);
    } else if (latest < 0.66) {
      setCurrentPhase(1);
    } else {
      setCurrentPhase(2);
    }
  });

  const activeContent = hudPhases[currentPhase];

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-6 md:p-12 font-rajdhani">
      {/* 1. TOP CORNER HUD TELEMETRY */}
      <div className="flex justify-between items-start w-full mt-8 md:mt-16 md:mt-10 md:mt-20">
        <div className="hud-border hud-bg px-4 py-2 border-l-2 border-l-pagani-gold flex flex-col text-xs tracking-[0.2em] text-gray-400">
          <span>SYSTEM // OK</span>
          <span>LATENCY // 1.2MS</span>
          <span className="text-pagani-gold">SEQUENCE CONTROL // ACTIVE</span>
        </div>

        <div className="hud-border hud-bg px-4 py-2 border-r-2 border-r-pagani-gold text-right text-xs tracking-[0.2em] text-gray-400">
          <span>FRAME // {Math.round(rawScroll * 300)} / 300</span>
          <br />
          <span>SPEED // <span className="text-white font-bold">{(rawScroll * 375).toFixed(0)}</span> KM/H</span>
        </div>
      </div>

      {/* 2. MAIN CENTER HUD TRANSITIONED CONTENT */}
      <div className="flex-1 flex items-center justify-center relative w-full my-4">
        {/* Dynamic decorative reticle */}
        <div className="absolute w-280px h-280px md:w-450px md:h-450px border border-pagani-gold/10 rounded-full flex items-center justify-center">
          <div className="w-5/6 h-5/6 border border-dashed border-pagani-gold/5 rounded-full" />
          <div className="absolute w-4 h-4 border-t border-l border-pagani-gold/30 top-0 left-0" />
          <div className="absolute w-4 h-4 border-t border-r border-pagani-gold/30 top-0 right-0" />
          <div className="absolute w-4 h-4 border-b border-l border-pagani-gold/30 bottom-0 left-0" />
          <div className="absolute w-4 h-4 border-b border-r border-pagani-gold/30 bottom-0 right-0" />
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center z-20 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, x: currentPhase === 2 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: currentPhase === 2 ? -50 : 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`w-full md:max-w-md pointer-events-auto ${
                currentPhase === 2 ? "md:ml-auto md:text-right" : ""
              }`}
            >
              <div className={`flex flex-col ${currentPhase === 2 ? "md:items-end" : ""}`}>
                <span className="text-xs font-orbitron tracking-[0.4em] text-pagani-gold font-bold mb-2">
                  // PHASE 0{currentPhase + 1} // {activeContent.subtitle}
                </span>
                <h1 className="font-orbitron text-4xl md:text-6xl font-black tracking-wider text-white leading-none mb-4 uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  {activeContent.title}
                </h1>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed tracking-wide mb-6">
                  {activeContent.description}
                </p>

                {currentPhase === 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#D4AF37", color: "#1a1a1a" }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-pagani-gold text-pagani-gold px-6 py-3 font-orbitron text-xs tracking-[0.2em] uppercase font-bold rounded-sm shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(214,175,55,0.4)] cursor-pointer"
                  >
                    INQUIRE NOW
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. BOTTOM SPECIFICATIONS PANEL */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch gap-4 md:gap-4 md:gap-8 pointer-events-auto">
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-3 w-full gap-4">
            {activeContent.details.map((detail, idx) => (
              <motion.div
                key={`${currentPhase}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="hud-border hud-bg p-3 md:p-4 rounded-sm flex flex-col justify-between border-b-2 border-b-pagani-gold/40 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-2 h-2 bg-pagani-gold/20" />
                <span className="text-xs md:text-xs font-orbitron tracking-[0.2em] text-gray-400 uppercase">
                  {detail.label}
                </span>
                <span className="text-sm md:text-xl font-orbitron font-extrabold tracking-wider text-white mt-1 md:mt-2">
                  {detail.value}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* BACKGROUND DECORATIVE GRID LINES */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 m-4 md:m-8" />
    </div>
  );
}
