"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full bg-void z-[100] flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-16 h-16 border-2 border-void border-t-plasma rounded-full mb-8 shadow-glow-plasma-md"
      />
      <div className="font-mono text-xs tracking-[0.5em] text-plasma uppercase font-bold animate-pulse">
        CALIBRATING SYSTEMS...
      </div>
    </div>
  );
}
