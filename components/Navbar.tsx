"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Phone } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { href: "#hero", label: "HOME" },
    { href: "#parts", label: "PARTS" },
    { href: "#services", label: "SERVICES" },
    { href: "#about", label: "ABOUT" },
    { href: "#work", label: "PORTFOLIO" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6 md:px-16 lg:px-24 border-b ${
          isScrolled
            ? "bg-void/90 backdrop-blur-2xl border-plasma/30 shadow-[0_10px_40px_rgba(0,0,0,0.9)] py-3 md:py-4"
            : "bg-void/70 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-4 md:py-6"
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto flex justify-between items-center">
          {/* LOGO BLOCK - Premium High-Visibility */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <img src="/images/logo.png" alt="Roadmen Logo" className="h-14 w-14 md:h-16 md:w-16 object-contain rounded-full border-2 border-plasma/60 shadow-[0_0_20px_rgba(214,255,0,0.25)] transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-bebas text-3xl md:text-4xl tracking-widest text-text leading-none uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                ROADMEN
              </span>
              <span className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-plasma font-bold mt-1 uppercase transition-colors duration-300">
                PERFORMANCE // ENGINEERING
              </span>
            </div>
          </div>

          {/* HUD NAV ITEMS (DESKTOP) */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-xs font-mono tracking-[0.2em] font-bold text-text hover:text-plasma transition-colors duration-300 uppercase group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-plasma transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_8px_#D6FF00]" />
              </a>
            ))}
          </nav>

          {/* SYSTEM BADGE / DIRECT CALL & CTA */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Direct Phone Call Button */}
            <a
              href="tel:+8801956455165"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 border border-plasma/40 bg-plasma/10 text-plasma hover:bg-plasma hover:text-void font-mono text-[11px] tracking-widest font-bold uppercase transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(214,255,0,0.15)] cursor-pointer"
            >
              <Phone size={14} className="animate-pulse" />
              <span>+880 1956-455165</span>
            </a>

            {/* Book Appointment CTA Button */}
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-plasma text-void text-[11px] font-mono tracking-widest font-black uppercase transition-all duration-300 hover:bg-white hover:text-void rounded-full shadow-[0_0_25px_rgba(214,255,0,0.35)] hover:scale-105 cursor-pointer"
            >
              BOOK APPOINTMENT
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative"
            >
              <span className={`block w-6 h-px bg-text transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-6 h-px bg-text transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-text transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6 lg:hidden border-l border-white/10"
          >
            <div className="flex flex-col gap-6 text-center w-full max-w-sm">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.1 }}
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-bebas text-4xl tracking-[0.2em] text-muted hover:text-plasma transition-colors uppercase py-2 border-b border-white/5"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Direct Phone Call Button for Mobile */}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.05 }}
                href="tel:+8801956455165"
                className="mt-4 flex items-center justify-center gap-3 px-6 py-3 border border-plasma/40 text-plasma font-mono text-xs tracking-widest font-bold uppercase rounded-full bg-plasma/10"
              >
                <Phone size={16} />
                <span>+880 1956-455165</span>
              </motion.a>

              {/* Book Appointment Button for Mobile */}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.15 }}
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-8 py-4 bg-plasma text-void font-mono text-sm tracking-[0.2em] font-black uppercase rounded-full shadow-[0_0_20px_rgba(214,255,0,0.3)]"
              >
                BOOK APPOINTMENT
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
