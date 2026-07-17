"use client";

import { motion } from "framer-motion";
import { keyFeatures } from "@/data/carData";
import Image from "next/image";

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-[#121212] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col mb-16 items-end text-right">
          <span className="font-orbitron text-xs tracking-[0.4em] text-pagani-gold mb-2 uppercase">
            // MASTERING THE ELEMENTS
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black tracking-wide text-white uppercase">
            PERFORMANCE ENGINEERING
          </h2>
          <div className="h-[2px] w-24 bg-pagani-gold mt-4" />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {keyFeatures.map((feature, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              key={idx}
              className="group border border-white/5 bg-black/60 hover:border-pagani-gold/30 rounded-sm overflow-hidden flex flex-col justify-between transition-colors duration-500"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-60 w-full overflow-hidden bg-pagani-black">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Metric Overlay */}
                <div className="absolute bottom-4 left-4 flex flex-col">
                  <span className="font-orbitron text-[10px] tracking-[0.3em] text-pagani-gold font-bold">
                    METRIC VALUE
                  </span>
                  <span className="font-orbitron text-3xl font-black tracking-wide text-white glow-gold">
                    {feature.value}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-orbitron text-base tracking-[0.2em] font-bold text-white mb-3 uppercase group-hover:text-pagani-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-orbitron tracking-widest text-gray-500">
                  <span>TELEMETRY_REF: 0{idx + 1}</span>
                  <span className="text-pagani-gold/60">// SYNCED</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
