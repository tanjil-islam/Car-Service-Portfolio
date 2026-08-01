"use client";

import { MapPin, Navigation } from "lucide-react";

export default function LocationMap() {
  return (
    <section id="location" className="py-16 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 bg-void relative border-t border-white/5">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col mb-12 md:mb-16">
          <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase block">
            // HEADQUARTERS
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text uppercase leading-none">
            OUR <span className="text-muted">LOCATION</span>
          </h2>
        </div>

        <a 
          href="https://maps.google.com/maps?q=Lake%20City,%20Concord.%20Khilkhet,%20Dhaka,%20Bangladesh,%201229" 
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 relative group bg-[#0a0a0a] cursor-pointer"
        >
          {/* Static Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: "url('/images/dark_city_map.jpg')" }}
          />

          {/* Dark Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />

          {/* Center Marker */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-transform duration-500 group-hover:-translate-y-2">
            
            {/* Glowing Marker */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-20 h-20 bg-[#e50914]/20 rounded-full animate-ping" />
              <div className="relative w-16 h-16 bg-[#e50914]/20 backdrop-blur-md rounded-full flex items-center justify-center border border-[#e50914]/50 shadow-[0_0_30px_rgba(229,9,20,0.4)]">
                <MapPin className="text-[#e50914]" size={28} />
              </div>
            </div>
            
            {/* Hover Action Badge */}
            <div className="flex items-center gap-2 bg-plasma text-void px-6 py-3 rounded-full font-mono text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-glow-plasma-sm translate-y-4 group-hover:translate-y-0">
              <Navigation size={14} />
              GET DIRECTIONS
            </div>
          </div>

          {/* Decorative Overlay to match dark theme */}
          <div className="absolute inset-0 pointer-events-none border-[4px] border-plasma/20 rounded-3xl z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>
      </div>
    </section>
  );
}
