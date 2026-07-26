"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="font-bebas text-[30vw] text-plasma">404</span>
      </div>
      
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        <span className="font-mono text-xs tracking-[0.5em] text-plasma mb-6 uppercase block font-bold border border-plasma/30 px-4 py-1.5 rounded-full bg-plasma/10">
          // ERR: 404
        </span>
        
        <h1 className="font-bebas text-6xl md:text-8xl tracking-widest text-text uppercase leading-none mb-6">
          WAYPOINT <span className="text-muted">LOST</span>
        </h1>
        
        <p className="font-mono text-xs md:text-sm text-muted tracking-widest leading-relaxed mb-12 max-w-md">
          The requested trajectory does not exist in our telemetry logs. Verify your coordinates and try again.
        </p>
        
        <Link
          href="/"
          className="flex items-center justify-center gap-4 px-10 py-5 bg-panel border border-white/10 hover:border-plasma hover:bg-white/5 transition-all duration-300 rounded-full font-mono text-xs tracking-widest uppercase text-text group backdrop-blur-md"
        >
          <ArrowLeft size={16} className="text-plasma group-hover:-translate-x-2 transition-transform duration-300" />
          RETURN TO HOME
        </Link>
      </div>
    </div>
  );
}
