"use client";

import { motion } from "framer-motion";
import { testimonialsData } from "@/data/RoadmenData";

export default function Testimonials() {
  const marqueeItems = [...testimonialsData, ...testimonialsData];

  return (
    <section
      id="testimonials"
      className="py-16 md:py-32 bg-void relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24 mb-10 md:mb-20 flex flex-col items-center text-center">
        <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase block">
          // CLIENT LOGS
        </span>
        <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text uppercase leading-none">
          PERFORMANCE <span className="text-muted">VERIFIED</span>
        </h2>
      </div>

      {/* Row 1 Marquee (Moving Left) */}
      <div className="flex gap-4 md:gap-8 overflow-hidden relative w-full mb-8 py-4">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-[linear-gradient(to_right,#050505,transparent)] z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-[linear-gradient(to_left,#050505,transparent)] z-10 pointer-events-none" />
        
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          className="flex gap-4 md:gap-8 shrink-0"
        >
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-panel/30 p-5 md:p-8 md:p-6 md:p-10 w-80 md:w-96 md:w-450px rounded-2xl shrink-0 border border-white/5 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div>
                <div className="flex gap-1 mb-6 text-plasma text-xs font-mono">
                  {Array.from({ length: testimonial.rating }).map((_, rIdx) => (
                    <span key={rIdx}>★</span>
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted leading-relaxed tracking-wide mb-8">
                  "{testimonial.quote.toUpperCase()}"
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-mono uppercase">
                <span className="text-text tracking-widest">{testimonial.name}</span>
                <span className="text-plasma font-bold">{testimonial.vehicle}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 Marquee (Moving Right) */}
      <div className="flex gap-4 md:gap-8 overflow-hidden relative w-full py-4">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-[linear-gradient(to_right,#050505,transparent)] z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-[linear-gradient(to_left,#050505,transparent)] z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [-2000, 0] }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          className="flex gap-4 md:gap-8 shrink-0"
        >
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-panel/30 p-5 md:p-8 md:p-6 md:p-10 w-80 md:w-96 md:w-450px rounded-2xl shrink-0 border border-white/5 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div>
                <div className="flex gap-1 mb-6 text-plasma text-xs font-mono">
                  {Array.from({ length: testimonial.rating }).map((_, rIdx) => (
                    <span key={rIdx}>★</span>
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted leading-relaxed tracking-wide mb-8">
                  "{testimonial.quote.toUpperCase()}"
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-mono uppercase">
                <span className="text-text tracking-widest">{testimonial.name}</span>
                <span className="text-plasma font-bold">{testimonial.vehicle}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
