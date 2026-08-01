"use client";

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { caseFiles } from "@/data/RoadmenData";
import Image from "next/image";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // ResizeObserver for instant container width sync
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();

    const resizeObserver = new ResizeObserver(() => updateWidth());
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Smooth movement calculation with hardware-accelerated RAF throttling
  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
      setSliderPos(percentage);
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault(); // Stop native image drag or text selection
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore if pointer capture was already released
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      setSliderPos(0);
    } else if (e.key === "End") {
      setSliderPos(100);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6 md:mb-12 md:mb-24 w-full max-w-5xl mx-auto">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before and After Car Restoration Slider"
        className="relative w-full aspect-[16/9] border-2 border-white/10 rounded-2xl overflow-hidden select-none cursor-ew-resize bg-void touch-none group shadow-[0_20px_60px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-plasma/80 transition-shadow"
      >
        {/* BEFORE IMAGE (Full Background) */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <img
            src="/images/before_repair.png"
            alt="Raw Chassis Before Repair"
            draggable={false}
            className="w-full h-full object-cover object-center block"
          />
          <div className="hidden md:flex absolute top-6 left-6 z-20 px-4 py-2 bg-void/85 backdrop-blur-md border border-white/10 text-xs font-mono tracking-widest text-text rounded-md uppercase items-center gap-2 shadow-lg pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            RAW CHASSIS // BEFORE REPAIR
          </div>
        </div>

        {/* AFTER IMAGE (Pixel-Perfect Overlay Container) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="absolute inset-y-0 left-0 h-full max-w-none"
            style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
          >
            <img
              src="/images/after_repair.png"
              alt="Engineered After Repair"
              draggable={false}
              className="w-full h-full object-cover object-center block"
            />
          </div>
          <div className="hidden md:flex absolute top-6 right-6 z-20 px-4 py-2 bg-plasma text-void text-xs font-mono tracking-widest font-black rounded-md uppercase items-center gap-2 shadow-glow-plasma-md">
            <span className="w-2 h-2 rounded-full bg-void animate-ping" />
            PERFORMANCE ENGINEERED // AFTER REPAIR
          </div>
        </div>

        {/* Drag Slider Divider Line */}
        <div
          className={`absolute inset-y-0 w-[2px] bg-plasma z-20 pointer-events-none transition-shadow duration-300 ${
            isDragging ? "shadow-[0_0_25px_#D6FF00]" : "shadow-[0_0_12px_#D6FF00]"
          }`}
          style={{ left: `${sliderPos}%` }}
        >
          {/* Handle Button with Active Drag Feedback */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-plasma text-void flex items-center justify-center font-bold border-2 border-void cursor-ew-resize transition-transform duration-200 ${
              isDragging
                ? "scale-125 shadow-glow-plasma-lg bg-white"
                : "group-hover:scale-110 shadow-glow-plasma-md"
            }`}
          >
            <div className="flex items-center justify-center -space-x-1.5">
              <ChevronLeft size={18} strokeWidth={4} />
              <ChevronRight size={18} strokeWidth={4} />
            </div>
          </div>
        </div>

        {/* Dynamic Position HUD Pill */}
        <div className="hidden md:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 px-4 py-1.5 bg-void/80 backdrop-blur-md border border-white/10 text-xs font-mono tracking-widest text-muted rounded-full uppercase pointer-events-none items-center gap-3">
          <span className="text-plasma font-bold">{Math.round(sliderPos)}% SPLIT</span>
          <span className="text-white/30">//</span>
          <span>SLIDE OR CLICK TO COMPARE</span>
        </div>
      </div>

      {/* UX QUICK PRESET BUTTONS */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setSliderPos(0)}
          className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all border ${
            sliderPos === 0
              ? "bg-plasma text-void border-plasma font-bold"
              : "bg-void/60 text-muted border-white/10 hover:border-white/30 hover:text-text"
          }`}
        >
          100% BEFORE
        </button>
        <button
          onClick={() => setSliderPos(50)}
          className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all border ${
            sliderPos === 50
              ? "bg-plasma text-void border-plasma font-bold"
              : "bg-void/60 text-muted border-white/10 hover:border-white/30 hover:text-text"
          }`}
        >
          50% SPLIT
        </button>
        <button
          onClick={() => setSliderPos(100)}
          className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase transition-all border ${
            sliderPos === 100
              ? "bg-plasma text-void border-plasma font-bold"
              : "bg-void/60 text-muted border-white/10 hover:border-white/30 hover:text-text"
          }`}
        >
          100% AFTER
        </button>
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
      className="py-16 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 bg-void relative"
    >
      <div className="max-w-[1920px] mx-auto">
        
        {/* Title */}
        <div className="flex flex-col mb-8 md:mb-16">
          <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase">
            // CASE STUDIES
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text uppercase leading-none">
            ENGINEERING <span className="text-muted">ARCHIVE</span>
          </h2>
        </div>

        {/* Before/After Drag Slider */}
        <BeforeAfterSlider />

        {/* Filters */}
        <div className="flex gap-4 flex-wrap mb-6 md:mb-12 border-b border-white/10 pb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 cursor-pointer border ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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
                <div className="p-5 md:p-8 relative z-20">
                  <span className="text-xs font-mono tracking-widest text-plasma block mb-2 uppercase">
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
              className="fixed inset-0 z-50 bg-void/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 md:p-12"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-panel border border-white/10 p-5 md:p-8 lg:p-12 max-w-4xl w-full rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-12"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/5 hover:bg-plasma group rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <X className="text-muted group-hover:text-void transition-colors duration-300" size={20} />
                </button>

                <div className="md:w-1/2 flex flex-col justify-center">
                  <span className="text-xs font-mono text-plasma tracking-[0.3em] block mb-4 uppercase">
                    LOG // {activeModalProject.model}
                  </span>
                  <h3 className="font-bebas text-4xl md:text-6xl tracking-wider text-text uppercase mb-8 leading-none">
                    {activeModalProject.title}
                  </h3>
                  
                  <p className="text-sm text-muted leading-relaxed tracking-wide mb-8">
                    This project involved deep mechanical restoration and precision calibration. A comprehensive sensor diagnostic log was completed, with multiple test passes conducted to optimize absolute performance metrics.
                  </p>
                  
                  {activeModalProject.adjustmentData && (
                    <div className="border border-white/10 rounded-xl p-6 bg-void/50">
                      <span className="text-xs font-mono text-plasma tracking-widest block mb-4 uppercase">
                        // CALIBRATION LOG
                      </span>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(activeModalProject.adjustmentData).map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-xs font-mono text-muted uppercase mb-1">{key}</span>
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
