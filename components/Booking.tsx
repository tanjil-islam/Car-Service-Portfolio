"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Zap, Search, Shield, CheckCircle } from "lucide-react";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [category, setCategory] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const handleNext = () => {
    if (step === 1 && !category) return;
    if (step === 2 && (!vehicleModel || !description)) return;
    if (step === 3 && (!date || !time)) return;
    setStep(s => s + 1);
  };

  const handlePrev = () => {
    setStep(s => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const progressPercent = (step / 4) * 100;

  const categoryTitles: Record<string, string> = {
    engine: "Engine Rebuild",
    performance: "Dyno & ECU Tuning",
    diagnostics: "Fault Scanning",
    bodywork: "PPF & Ceramic",
  };

  return (
    <section
      id="booking"
      className="py-32 px-6 md:px-16 lg:px-24 bg-void border-t border-white/5 relative"
    >
      <div className="max-w-[1920px] mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase block">
            // CLIENT CONCIERGE
          </span>
          <h2 className="font-bebas text-6xl md:text-8xl tracking-wider text-text uppercase leading-none">
            COMMISSION <span className="text-muted">SERVICE</span>
          </h2>
        </div>

        {/* Console Container */}
        <div className="w-full max-w-4xl bg-panel/30 p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden backdrop-blur-md">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-void/50">
            <div
              className="h-full bg-plasma transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="pt-6"
              >
                {/* Step Header */}
                <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6 font-mono text-xs">
                  <span className="tracking-widest text-text uppercase">
                    {step === 1 && "01 // SELECT SERVICE TYPE"}
                    {step === 2 && "02 // VEHICLE DETAILS"}
                    {step === 3 && "03 // APPOINTMENT WINDOW"}
                    {step === 4 && "04 // CONFIRM & SUBMIT"}
                  </span>
                  <span className="text-plasma font-bold">
                    STEP {step}/4
                  </span>
                </div>

                {/* Step 1: Category */}
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { id: "engine", title: "Engine Rebuild", icon: Wrench },
                      { id: "performance", title: "Dyno & Tune", icon: Zap },
                      { id: "diagnostics", title: "Diagnostics", icon: Search },
                      { id: "bodywork", title: "Aero & Paint", icon: Shield },
                    ].map((cat) => {
                      const IconComponent = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setCategory(cat.id)}
                          className={`p-8 border rounded-2xl flex flex-col items-start gap-6 text-left transition-all duration-300 cursor-pointer ${
                            category === cat.id
                              ? "border-plasma bg-white/[0.03]"
                              : "border-white/10 hover:border-plasma/50 hover:bg-white/[0.02]"
                          }`}
                        >
                          <IconComponent 
                            size={32} 
                            strokeWidth={1}
                            className={category === cat.id ? "text-plasma" : "text-muted"} 
                          />
                          <div className="flex flex-col font-mono">
                            <span className={`text-lg tracking-widest uppercase ${category === cat.id ? "text-plasma font-bold" : "text-text"}`}>
                              {cat.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 2: Car model & Description */}
                {step === 2 && (
                  <div className="flex flex-col gap-8 font-mono text-xs">
                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase">
                        VEHICLE MAKE / YEAR / MODEL
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        placeholder="e.g. PORSCHE 911 GT3 RS (2023)"
                        className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase">
                        PROJECT SCOPE
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="DESCRIBE THE GOALS FOR THIS BUILD..."
                        className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Date / Time Selection */}
                {step === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-mono text-xs">
                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase">
                        TARGET DROP-OFF DATE
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none tracking-widest transition-all duration-300 [&::-webkit-calendar-picker-indicator]:filter-[invert(1)] uppercase"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase">
                        PREFERRED TIME
                      </label>
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none tracking-widest transition-all duration-300 appearance-none uppercase"
                      >
                        <option value="" className="bg-void">SELECT SLOT</option>
                        <option value="09:00" className="bg-void">09:00 AM</option>
                        <option value="11:00" className="bg-void">11:00 AM</option>
                        <option value="13:00" className="bg-void">01:00 PM</option>
                        <option value="15:00" className="bg-void">03:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 4: Summary & contact submit */}
                {step === 4 && (
                  <div className="flex flex-col gap-8 font-mono text-xs">
                    {/* Telemetry Summary Panel */}
                    <div className="border border-white/10 p-8 bg-void/50 rounded-2xl">
                      <span className="text-plasma tracking-widest block mb-6 uppercase">
                        // COMMISSION MANIFEST
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-muted tracking-widest">
                        <div>
                          <span>SERVICE:</span>
                          <span className="text-text block mt-2 uppercase">{categoryTitles[category] || "NOT SPECIFIED"}</span>
                        </div>
                        <div>
                          <span>CHASSIS:</span>
                          <span className="text-text block mt-2 uppercase">{vehicleModel || "NOT SPECIFIED"}</span>
                        </div>
                        <div>
                          <span>WINDOW:</span>
                          <span className="text-text block mt-2 uppercase">{date || "NOT SELECTED"} @ {time || "NOT SELECTED"}</span>
                        </div>
                        <div>
                          <span>SCOPE:</span>
                          <span className="text-text block mt-2 uppercase truncate">{description || "NONE"}</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-3">
                          <label className="text-muted tracking-widest uppercase">
                            CLIENT NAME
                          </label>
                          <input
                            type="text"
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="ENTER FULL NAME"
                            className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <label className="text-muted tracking-widest uppercase">
                            CONTACT EMAIL
                          </label>
                          <input
                            type="email"
                            required
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="ENTER EMAIL ADDRESS"
                            className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-white text-void hover:bg-plasma hover:text-void font-mono text-xs tracking-widest font-black uppercase transition-colors duration-300 rounded-xl cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "TRANSMITTING..." : "CONFIRM COMMISSION"}
                      </button>
                    </form>
                  </div>
                )}

                {/* Control Action Buttons */}
                <div className="flex justify-between items-center mt-12">
                  {step > 1 ? (
                    <button
                      onClick={handlePrev}
                      className="px-6 py-3 text-muted hover:text-text font-mono text-xs tracking-widest uppercase transition-colors duration-300 cursor-pointer"
                    >
                      GO BACK
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 && (
                    <button
                      onClick={handleNext}
                      className="px-8 py-4 bg-white/5 border border-white/10 hover:border-plasma hover:bg-plasma hover:text-void text-text font-mono text-xs tracking-widest uppercase transition-colors duration-300 rounded-xl cursor-pointer"
                    >
                      PROCEED
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle size={64} strokeWidth={1} className="text-plasma mb-8" />
                <h3 className="font-bebas text-5xl tracking-widest text-text uppercase mb-4">
                  MANIFEST <span className="text-muted">RECEIVED</span>
                </h3>
                <p className="text-sm font-mono text-muted max-w-md leading-relaxed uppercase mb-12 tracking-widest">
                  Your build slot is secured. Our engineering team will contact you shortly to confirm the logistics.
                </p>
                <button
                  onClick={() => {
                    setStep(1);
                    setSuccess(false);
                    setCategory("");
                    setVehicleModel("");
                    setDescription("");
                    setDate("");
                    setTime("");
                    setClientName("");
                    setClientEmail("");
                  }}
                  className="px-8 py-4 border border-white/10 hover:border-plasma hover:bg-plasma hover:text-void text-text font-mono text-xs tracking-widest uppercase transition-colors duration-300 rounded-xl cursor-pointer"
                >
                  START NEW COMMISSION
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
