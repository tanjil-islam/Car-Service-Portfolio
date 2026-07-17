"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RatingDashboard() {
  const [reviewsCount, setReviewsCount] = useState(286);
  const [reviewsRating, setReviewsRating] = useState(4.9);
  
  // Interactive Form State
  const [clientName, setClientName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !comment) return;

    setReviewsCount(c => c + 1);
    setReviewsRating(r => parseFloat(((r * reviewsCount + rating) / (reviewsCount + 1)).toFixed(2)));
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setClientName("");
      setVehicle("");
      setComment("");
      setRating(5);
    }, 4000);
  };

  return (
    <section
      id="ratings"
      className="py-32 px-6 md:px-12 bg-void border-t border-plasma/10 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Overall Score and Bars */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.35em] text-plasma mb-2 uppercase drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">
              // LOG_METRICS
            </span>
            <h2 className="font-bebas text-4xl md:text-6xl tracking-wide text-text uppercase mb-8 drop-shadow-md">
              RATING <span className="text-holo-gradient glow-cyan">TELEMETRY</span>
            </h2>

            <div className="holo-panel p-6 rounded-xl border-t-2 border-t-plasma mb-6 shadow-[0_0_20px_rgba(122,0,255,0.1)_inset]">
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center font-mono">
                  <div className="text-5xl md:text-6xl font-black text-plasma leading-none drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">
                    {reviewsRating}
                  </div>
                  <div className="text-gold text-xs tracking-wider mt-2 drop-shadow-[0_0_5px_rgba(255,0,127,0.5)]">★★★★★</div>
                  <div className="text-[9px] text-muted tracking-widest mt-1 uppercase">
                    {reviewsCount} AUDIT LOGS
                  </div>
                </div>
                <div className="h-16 w-[2px] bg-holo-gradient rounded-full" />
                
                {/* Category ratings with grow bars */}
                <div className="flex-1 flex flex-col gap-3 text-[10px] font-mono text-muted tracking-widest">
                  {[
                    { label: "QUALITY OF BUILD", value: "98%" },
                    { label: "COMPILING SPEED", value: "94%" },
                    { label: "VALUATION SPEC", value: "96%" },
                  ].map((cat, cIdx) => (
                    <div key={cIdx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between">
                        <span>{cat.label}</span>
                        <span className="text-plasma font-bold drop-shadow-[0_0_5px_rgba(0,245,255,0.5)]">{cat.value}</span>
                      </div>
                      <div className="h-[2px] bg-plasma/20 overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: cat.value }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: cIdx * 0.1 }}
                          className="h-full bg-plasma glow-cyan shadow-[0_0_5px_rgba(0,245,255,0.8)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress bars */}
              <div className="flex flex-col gap-2">
                {[
                  { stars: 5, percentage: "92%" },
                  { stars: 4, percentage: "6%" },
                  { stars: 3, percentage: "1%" },
                  { stars: 2, percentage: "1%" },
                  { stars: 1, percentage: "0%" },
                ].map((bar) => (
                  <div key={bar.stars} className="flex items-center gap-4 text-[11px] font-mono text-muted">
                    <span className="w-4 text-plasma font-bold">{bar.stars}</span>
                    <div className="flex-1 h-2 bg-void border border-plasma/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: bar.percentage }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-holo-gradient"
                      />
                    </div>
                    <span className="text-plasma font-bold w-10 text-right drop-shadow-[0_0_5px_rgba(0,245,255,0.3)]">{bar.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Leave a transmission form */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.35em] text-plasma mb-2 uppercase block drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">
              // BROADCAST_FORM
            </span>
            <h3 className="font-bebas text-3xl tracking-wider text-text uppercase mb-6 drop-shadow-md">
              LEAVE A <span className="text-holo-gradient glow-cyan">DIAGNOSTIC</span> LOG
            </h3>

            <div className="holo-panel p-6 md:p-8 rounded-xl border border-plasma/20 shadow-[0_0_20px_rgba(122,0,255,0.1)_inset]">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 text-sm font-mono tracking-wider"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-plasma tracking-widest uppercase text-[10px] font-bold">
                          PILOT CALLSIGN
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. H. KOVALAINEN"
                          className="bg-void/50 border border-plasma/20 focus:border-plasma focus:shadow-[0_0_10px_rgba(0,245,255,0.3)] p-3.5 text-text rounded-md outline-none font-mono transition-all duration-300 text-xs"
                        />
                      </div>

                      {/* Vehicle */}
                      <div className="flex flex-col gap-2">
                        <label className="text-plasma tracking-widest uppercase text-[10px] font-bold">
                          VEHICLE TYPE
                        </label>
                        <input
                          type="text"
                          required
                          value={vehicle}
                          onChange={(e) => setVehicle(e.target.value)}
                          placeholder="e.g. PAGANI ZONDA R"
                          className="bg-void/50 border border-plasma/20 focus:border-plasma focus:shadow-[0_0_10px_rgba(0,245,255,0.3)] p-3.5 text-text rounded-md outline-none font-mono transition-all duration-300 text-xs"
                        />
                      </div>
                    </div>

                    {/* Star Rating Select */}
                    <div className="flex flex-col gap-2">
                      <label className="text-plasma tracking-widest uppercase text-[10px] font-bold">
                        TRANSMISSION FEED STRENGTH
                      </label>
                      <div className="flex gap-2 text-2xl text-muted/30 cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setRating(star)}
                            className={`transition-colors duration-200 hover:scale-110 ${
                              star <= rating ? "text-gold drop-shadow-[0_0_8px_rgba(255,0,127,0.8)]" : "text-muted/30 hover:text-plasma"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-plasma tracking-widest uppercase text-[10px] font-bold">
                        TRANSMISSION LOG DATA
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="PROVIDE DETAILED FEEDBACK ON ENGINE CALIBRATION SPECIFICATIONS..."
                        className="bg-void/50 border border-plasma/20 focus:border-plasma focus:shadow-[0_0_10px_rgba(0,245,255,0.3)] p-3.5 text-text rounded-md outline-none font-mono transition-all duration-300 text-xs uppercase resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-4 bg-holo-gradient text-void font-mono text-[11px] tracking-widest font-black uppercase transition-all duration-300 rounded-md cursor-pointer mt-2 hover:scale-[1.02] hover:glow-cyan shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                    >
                      TRANSMIT DIAGNOSTIC FEED
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <span className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">📡</span>
                    <span className="font-mono text-sm tracking-widest text-plasma font-bold block mb-3 drop-shadow-[0_0_5px_rgba(0,245,255,0.5)]">
                      FEED TRANSMISSION COMPLETED
                    </span>
                    <p className="text-xs text-muted max-w-sm leading-relaxed uppercase">
                      Calibration logs committed. Database index sync verified successfully.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
