"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData, Testimonial } from "@/data/RoadmenData";
import { X, Star, Send } from "lucide-react";

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>(testimonialsData);
  // Double up the items so the marquee loops smoothly
  const marqueeItems = [...reviews, ...reviews];

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !vehicle || !quote) return;

    const newReview: Testimonial = {
      id: `rev-${Date.now()}`,
      name,
      vehicle,
      quote,
      rating
    };

    // Add to state so it appears in the marquee instantly
    setReviews((prev) => [newReview, ...prev]);
    setSubmitted(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setName("");
      setVehicle("");
      setQuote("");
      setRating(5);
    }, 2500);
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-32 bg-void relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-16 lg:px-24 mb-10 md:mb-16 flex flex-col items-center text-center relative z-20">
        <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase block">
          // CLIENT LOGS
        </span>
        <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text uppercase leading-none mb-8">
          PERFORMANCE <span className="text-muted">VERIFIED</span>
        </h2>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 border border-plasma/40 bg-plasma/10 text-plasma hover:bg-plasma hover:text-void font-mono text-xs tracking-widest font-bold uppercase transition-all duration-300 rounded-full shadow-glow-plasma-sm cursor-pointer"
        >
          LEAVE A REVIEW
        </button>
      </div>

      {/* Row 1 Marquee (Moving Left) */}
      <div className="flex gap-4 md:gap-8 overflow-hidden relative w-full max-w-[100vw] mb-8 py-4">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-[linear-gradient(to_right,#050505,transparent)] z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-[linear-gradient(to_left,#050505,transparent)] z-10 pointer-events-none" />
        
        <motion.div
          key={`row1-${reviews.length}`} // Key helps force re-render/animation restart if items change length drastically
          animate={{ x: [0, -2000] }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          className="flex gap-4 md:gap-8 shrink-0"
        >
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}-1`}
              className="bg-panel/30 p-5 md:p-8 lg:p-10 w-80 md:w-96 rounded-2xl shrink-0 border border-white/5 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div>
                <div className="flex gap-1 mb-6 text-plasma text-xs font-mono">
                  {Array.from({ length: testimonial.rating }).map((_, rIdx) => (
                    <span key={rIdx}>★</span>
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted leading-relaxed tracking-wide mb-8">
                  "{testimonial.quote.toUpperCase()}"
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-mono uppercase">
                <span className="text-text tracking-widest">{testimonial.name}</span>
                <span className="text-plasma font-bold truncate max-w-[150px]">{testimonial.vehicle}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 Marquee (Moving Right) */}
      <div className="flex gap-4 md:gap-8 overflow-hidden relative w-full mb-16 py-4">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-[linear-gradient(to_right,#050505,transparent)] z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-[linear-gradient(to_left,#050505,transparent)] z-10 pointer-events-none" />

        <motion.div
          key={`row2-${reviews.length}`}
          animate={{ x: [-2000, 0] }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          className="flex gap-4 md:gap-8 shrink-0"
        >
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}-2`}
              className="bg-panel/30 p-5 md:p-8 lg:p-10 w-80 md:w-96 rounded-2xl shrink-0 border border-white/5 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div>
                <div className="flex gap-1 mb-6 text-plasma text-xs font-mono">
                  {Array.from({ length: testimonial.rating }).map((_, rIdx) => (
                    <span key={rIdx}>★</span>
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted leading-relaxed tracking-wide mb-8">
                  "{testimonial.quote.toUpperCase()}"
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-mono uppercase">
                <span className="text-text tracking-widest">{testimonial.name}</span>
                <span className="text-plasma font-bold truncate max-w-[150px]">{testimonial.vehicle}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitted && setIsModalOpen(false)}
              className="absolute inset-0 bg-void/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl z-10 font-mono"
            >
              {!submitted ? (
                <>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 text-muted hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                  
                  <div className="flex flex-col mb-8">
                    <span className="text-plasma text-xs tracking-widest uppercase mb-2">// FEEDBACK</span>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Submit Review</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-xs uppercase tracking-widest">
                    <div className="flex flex-col gap-2">
                      <label className="text-muted font-bold">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="E.G. JOHN DOE"
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-white rounded-xl outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-muted font-bold">VEHICLE MAKE & MODEL</label>
                      <input
                        type="text"
                        required
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        placeholder="E.G. PORSCHE 911 GT3"
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-white rounded-xl outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-muted font-bold">RATING</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              size={28}
                              fill={(hoverRating || rating) >= star ? "#D6FF00" : "transparent"}
                              stroke={(hoverRating || rating) >= star ? "#D6FF00" : "#444"}
                              strokeWidth={1.5}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-muted font-bold">REVIEW / QUOTE</label>
                      <textarea
                        required
                        rows={3}
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="SHARE YOUR EXPERIENCE..."
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-white rounded-xl outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-4 bg-plasma text-void hover:bg-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors w-full uppercase"
                    >
                      <span>SUBMIT REVIEW</span>
                      <Send size={16} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center text-center py-12">
                  <div className="w-16 h-16 bg-plasma/20 rounded-full flex items-center justify-center mb-6">
                    <Star className="text-plasma" size={32} fill="#D6FF00" />
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">Review Added</h3>
                  <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                    Thank you for your feedback! Your review has been added to our logs.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
