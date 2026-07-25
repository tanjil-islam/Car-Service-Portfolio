"use client";

import { useState, useRef, MouseEvent, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseFiles } from "@/data/RoadmenData";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";

function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) { // Click is active
      handleMove(e.clientX);
    }
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className="relative w-full h-[400px] md:h-[600px] border border-white/10 rounded-2xl overflow-hidden select-none cursor-ew-resize bg-void mb-24 group"
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2000&auto=format&fit=crop"
          alt="Before restoration"
          fill
          className="object-cover opacity-50 filter grayscale transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-void/40" />
      </div>
      <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-void/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-text rounded-md uppercase">
        RAW CHASSIS // BEFORE
      </div>

      {/* After Image (Overlay, width controlled) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="absolute inset-y-0 left-0 w-[100vw] h-full">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
            alt="After restoration"
            fill
            className="object-cover filter contrast-[1.1] transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="absolute top-6 right-6 z-20 px-4 py-2 bg-plasma text-void text-[10px] font-mono tracking-widest font-black rounded-md uppercase">
        ENGINEERED // AFTER
      </div>

      {/* Drag Slider Divider Bar */}
      <div
        className="absolute inset-y-0 w-[2px] bg-white z-20 pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-void shadow-xl">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    </div>
  );
}

export default function WorkGallery() {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [activeModalProject, setActiveModalProject] = useState<(typeof caseFiles)[0] | null>(null);

  const filters = ["ALL", "NISSAN", "TOYOTA", "ZONDA"];

  const filteredProjects = selectedFilter === "ALL"
    ? caseFiles
    : caseFiles.filter(project => project.model.toUpperCase().includes(selectedFilter));

  return (
    <section
      id="work"
      className="py-32 px-6 md:px-16 lg:px-24 bg-void relative"
    >
      <div className="max-w-[1920px] mx-auto">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase">
            // CASE STUDIES
          </span>
          <h2 className="font-bebas text-6xl md:text-8xl tracking-wider text-text uppercase leading-none">
            ENGINEERING <span className="text-muted">ARCHIVE</span>
          </h2>
        </div>

        {/* Before/After Drag Slider */}
        <BeforeAfterSlider />

        {/* Filters */}
        <div className="flex gap-4 flex-wrap mb-12 border-b border-white/10 pb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`font-mono text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 cursor-pointer border ${
                selectedFilter === filter
                  ? "border-plasma bg-plasma text-void font-bold"
                  : "border-white/10 text-muted hover:border-plasma/50 hover:text-plasma bg-white/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Contact Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={project.title}
                onClick={() => setActiveModalProject(project)}
                className="group border border-white/5 bg-panel/30 hover:bg-white/[0.02] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 cursor-pointer relative"
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-void">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-void/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="text-plasma" size={20} />
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 relative z-20">
                  <span className="text-[10px] font-mono tracking-widest text-plasma block mb-2 uppercase">
                    {project.service} // {project.model}
                  </span>
                  <h3 className="font-bebas text-4xl tracking-wider text-text mb-6 uppercase">
                    {project.title}
                  </h3>

                  <div className="flex justify-between items-center text-xs font-mono border-t border-white/10 pt-4 text-muted uppercase">
                    <span>{project.duration}</span>
                    <span className="text-text font-bold">{project.cost}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeModalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-void/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-panel border border-white/10 p-8 md:p-12 max-w-4xl w-full rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-12"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/5 hover:bg-plasma group rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <X className="text-muted group-hover:text-void transition-colors duration-300" size={20} />
                </button>

                <div className="md:w-1/2 flex flex-col justify-center">
                  <span className="text-[10px] font-mono text-plasma tracking-[0.3em] block mb-4 uppercase">
                    LOG // {activeModalProject.model}
                  </span>
                  <h3 className="font-bebas text-5xl md:text-6xl tracking-wider text-text uppercase mb-8 leading-none">
                    {activeModalProject.title}
                  </h3>
                  
                  <p className="text-sm text-muted leading-relaxed tracking-wide mb-8">
                    This project involved deep mechanical restoration and precision calibration. A comprehensive sensor diagnostic log was completed, with multiple test passes conducted to optimize absolute performance metrics.
                  </p>
                  
                  {activeModalProject.adjustmentData && (
                    <div className="border border-white/10 rounded-xl p-6 bg-void/50">
                      <span className="text-[10px] font-mono text-plasma tracking-widest block mb-4 uppercase">
                        // CALIBRATION LOG
                      </span>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(activeModalProject.adjustmentData).map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-[10px] font-mono text-muted uppercase mb-1">{key}</span>
                            <span className="text-sm font-mono text-text uppercase">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:w-1/2 relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,#050505,transparent)] opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between font-mono text-xs text-text uppercase">
                    <span>{activeModalProject.duration}</span>
                    <span className="text-plasma font-bold">{activeModalProject.cost}</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
