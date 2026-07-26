"use client";

import { motion } from "framer-motion";
import { technicalSpecs } from "@/data/carData";

export default function SpecsGrid() {
  return (
    <section id="specs" className="py-12 md:py-24 px-6 md:px-12 bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pagani-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="flex flex-col mb-8 md:mb-16">
          <span className="font-orbitron text-xs tracking-[0.4em] text-pagani-gold mb-2 uppercase">
            // TELEMETRY & SPECIFICATIONS
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black tracking-wide text-white uppercase">
            TECHNICAL SHEETS
          </h2>
          <div className="h-0.5 w-24 bg-pagani-gold mt-4" />
        </div>

        {/* Specs Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {technicalSpecs.map((category, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              key={idx}
              className="border border-white/5 bg-black/40 backdrop-blur-sm p-6 rounded-sm relative"
            >
              <div className="absolute top-0 left-0 w-8 h-px bg-pagani-gold" />
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-pagani-gold" />
              
              <h3 className="font-orbitron text-sm tracking-[0.2em] font-bold text-pagani-gold mb-6 border-b border-white/10 pb-3 uppercase">
                {category.category}
              </h3>

              <div className="flex flex-col gap-4">
                {category.specs.map((spec, specIdx) => (
                  <div key={specIdx} className="flex justify-between items-center text-xs tracking-wider border-b border-white/5 pb-2">
                    <span className="text-gray-400 uppercase">{spec.name}</span>
                    <span className="text-white font-semibold font-orbitron text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
