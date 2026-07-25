"use client";

import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-void pt-20 pb-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20 border-b border-white/10 pb-16">
          
          <div className="max-w-sm">
            <div className="flex items-center gap-6 mb-8">
              <img src="/images/logo.png" alt="Roadmen Logo" className="h-24 w-24 md:h-28 md:w-28 object-contain rounded-full border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
              <h3 className="font-bebas text-6xl md:text-7xl tracking-widest text-text uppercase m-0 leading-none">
                ROADMEN
              </h3>
            </div>
            <p className="font-mono text-xs text-muted leading-relaxed tracking-widest uppercase">
              Precision automotive engineering. We build, calibrate, and perfect high-performance vehicles for the track and the street.
            </p>
            
            <div className="mt-8 flex flex-col gap-2 font-mono text-[10px] tracking-widest text-muted uppercase">
              <p>Lake city, Concord. Khilkhet</p>
              <p>Dhaka, Bangladesh, 1229</p>
              <p className="mt-2 text-plasma">+880 1956-455165</p>
              <p>info@roadmenbd.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-mono text-xs tracking-widest uppercase">
            <div className="flex flex-col gap-4">
              <span className="text-plasma mb-2">NAVIGATION</span>
              <a href="#hero" className="text-muted hover:text-text transition-colors">HOME</a>
              <a href="#parts" className="text-muted hover:text-text transition-colors">PARTS</a>
              <a href="#services" className="text-muted hover:text-text transition-colors">SERVICES</a>
              <a href="#about" className="text-muted hover:text-text transition-colors">ABOUT</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-plasma mb-2">SERVICES</span>
              <a href="#services" className="text-muted hover:text-text transition-colors">DELIVERY</a>
              <a href="#booking" className="text-muted hover:text-text transition-colors">ONLINE BOOKING</a>
              <a href="#booking" className="text-muted hover:text-text transition-colors">RESERVATIONS</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-plasma mb-2">SOCIAL</span>
              <a href="#" className="text-muted hover:text-text transition-colors flex items-center gap-2">INSTAGRAM <ArrowUpRight size={14} /></a>
              <a href="#" className="text-muted hover:text-text transition-colors flex items-center gap-2">FACEBOOK <ArrowUpRight size={14} /></a>
              <a href="#" className="text-muted hover:text-text transition-colors flex items-center gap-2">YOUTUBE <ArrowUpRight size={14} /></a>
            </div>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
          <p>© {new Date().getFullYear()} ROADMEN. ALL RIGHTS RESERVED.</p>
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 hover:text-plasma transition-colors border border-white/10 px-6 py-3 rounded-full hover:border-plasma"
          >
            RETURN TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
