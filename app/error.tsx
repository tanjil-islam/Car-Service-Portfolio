"use client";

import { useEffect } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[CRITICAL SYSTEM FAILURE]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05)_0%,#050505_100%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl w-full bg-panel/30 p-12 rounded-3xl border border-red-500/30 flex flex-col items-center text-center backdrop-blur-md">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500 rounded-full flex items-center justify-center mb-8 animate-pulse shadow-[0_0_30px_rgba(255,0,0,0.2)]">
          <span className="font-bebas text-4xl text-red-500">!</span>
        </div>
        
        <h2 className="font-bebas text-5xl md:text-6xl tracking-widest text-text uppercase mb-4">
          SYSTEM <span className="text-red-500">FAULT</span>
        </h2>
        
        <p className="font-mono text-xs md:text-sm text-muted tracking-widest leading-relaxed mb-10 max-w-lg">
          A critical error occurred in the telemetry matrix. Our engineers have been notified. Please recalibrate and try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all rounded-xl font-mono text-xs tracking-widest uppercase text-text group"
          >
            <RefreshCw size={16} className="text-red-500 group-hover:rotate-180 transition-transform duration-500" />
            RECALIBRATE
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-plasma text-void hover:bg-plasma/90 transition-all rounded-xl font-mono text-xs tracking-widest uppercase font-bold shadow-glow-plasma-sm"
          >
            <ArrowLeft size={16} />
            RETURN TO BASE
          </Link>
        </div>
      </div>
    </div>
  );
}
