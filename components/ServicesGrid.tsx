"use client";

import { motion } from "framer-motion";
import { gridServicesData } from "@/data/RoadmenData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesGrid() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8 bg-void relative min-h-screen">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col mb-12 md:mb-20 text-center items-center">
          <span className="font-mono text-xs tracking-[0.35em] text-[#e50914] mb-4 uppercase">
            // COMPREHENSIVE CARE
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-widest text-text uppercase leading-none">
            OUR <span className="text-[#e50914]">SERVICES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gridServicesData.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-void border border-white/5 shadow-2xl transition-all duration-300 hover:border-white/20"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300" />
                
                {/* Top Right Badge */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#e50914] rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 z-20 pointer-events-none">
                  <Icon size={20} className="text-white" />
                </div>

                {/* Clickable Area */}
                <Link href={`${service.link}?service=${service.id}`} className="absolute inset-0 z-10" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-row items-end justify-between pointer-events-none z-20">
                  <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-white leading-tight uppercase w-3/4 drop-shadow-md">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[#e50914] font-bold text-xs tracking-widest font-mono group-hover:translate-x-1 transition-transform duration-300 uppercase whitespace-nowrap drop-shadow-md">
                    Book Now <ArrowRight size={14} />
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
