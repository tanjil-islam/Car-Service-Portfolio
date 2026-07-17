"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

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
            ? "bg-void/80 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-4"
            : "bg-transparent border-transparent py-8"
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto flex justify-between items-center">
          {/* LOGO BLOCK - Premium Minimalist */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <img src="/images/logo.png" alt="Roadmen Logo" className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
            <div className="flex flex-col">
              <span className="font-bebas text-3xl md:text-4xl tracking-widest text-text leading-none uppercase">
                ROADMEN
              </span>
              <span className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-muted mt-1 uppercase transition-colors duration-300 group-hover:text-text">
                PERFORMANCE // ENGINEERING
              </span>
            </div>
          </div>

          {/* HUD NAV ITEMS (DESKTOP) */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[10px] font-mono tracking-[0.2em] text-muted hover:text-text transition-colors duration-300 uppercase group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-plasma transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* SYSTEM BADGE / CTA */}
          <div className="flex items-center gap-6">
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center justify-center px-8 py-3 bg-white text-void text-[10px] font-mono tracking-widest font-black uppercase transition-all duration-500 hover:bg-plasma hover:text-void rounded-full"
            >
              COMMISSION BUILD
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
            <div className="flex flex-col gap-8 text-center w-full max-w-sm">
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
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.1 }}
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 px-8 py-4 bg-plasma text-void font-mono text-sm tracking-[0.2em] font-bold uppercase rounded-full"
              >
                COMMISSION BUILD
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
