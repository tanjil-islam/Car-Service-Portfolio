"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Zap,
  Search,
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Car,
  FileText,
  User,
  Mail,
  Phone,
  Check,
} from "lucide-react";

const SERVICES = [
  {
    id: "engine",
    title: "Engine Rebuild",
    subtitle: "Full Overhaul & Blueprinting",
    icon: Wrench,
  },
  {
    id: "performance",
    title: "Dyno & Tune",
    subtitle: "ECU Mapping & Power Tuning",
    icon: Zap,
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    subtitle: "Telemetry & Deep System Analysis",
    icon: Search,
  },
  {
    id: "bodywork",
    title: "Aero & Paint",
    subtitle: "Custom Carbon, PPF & Refinishing",
    icon: Shield,
  },
];

const TIME_SLOTS = [
  { id: "08:00 AM", label: "08:00 AM", period: "EARLY MORNING" },
  { id: "10:00 AM", label: "10:00 AM", period: "MORNING" },
  { id: "12:00 PM", label: "12:00 PM", period: "MIDDAY" },
  { id: "02:00 PM", label: "02:00 PM", period: "AFTERNOON" },
  { id: "04:00 PM", label: "04:00 PM", period: "LATE AFTERNOON" },
  { id: "06:00 PM", label: "06:00 PM", period: "EVENING" },
];

const formatCustomTime = (time24: string) => {
  if (!time24) return "";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr || "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  const hFormatted = h < 10 ? `0${h}` : `${h}`;
  return `${hFormatted}:${m} ${ampm} (CUSTOM)`;
};

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [submittedManifestId, setSubmittedManifestId] = useState<string>("");
  const [previewEmailUrl, setPreviewEmailUrl] = useState<string>("");

  // Step 1 State: Selected Service
  const [selectedService, setSelectedService] = useState<string>("");

  // Step 2 State: Vehicle Details
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [engineSpec, setEngineSpec] = useState("");

  // Step 3 State: Requirements & Schedule
  const [notes, setNotes] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTimeValue, setCustomTimeValue] = useState("");

  // Step 4 State: Contact Info
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Helper for Email Format Validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Validation Logic per step
  const isStepValid = (() => {
    switch (currentStep) {
      case 1:
        return Boolean(selectedService);
      case 2:
        return Boolean(
          vehicleMake.trim() && vehicleModel.trim() && vehicleYear.trim()
        );
      case 3:
        return Boolean(preferredDate && preferredTime);
      case 4:
        return Boolean(
          clientName.trim() && isValidEmail(clientEmail) && clientPhone.trim()
        );
      default:
        return false;
    }
  })();

  const progressPercent = (currentStep / 4) * 100;

  const handleNext = () => {
    if (!isStepValid) return;
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid || loading) return;

    setLoading(true);

    const manifestId = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
    const selectedServiceData = SERVICES.find((s) => s.id === selectedService);

    const payload = {
      commissionId: manifestId,
      timestamp: new Date().toISOString(),
      service: {
        id: selectedService,
        name: selectedServiceData?.title || selectedService,
      },
      vehicle: {
        make: vehicleMake,
        model: vehicleModel,
        year: vehicleYear,
        engineSpec: engineSpec || "STANDARD",
      },
      schedule: {
        preferredDate,
        preferredTime,
        notes: notes || "NONE PROVIDED",
      },
      client: {
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
      },
    };

    // Submitting payload

    try {
      const response = await fetch("/api/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      // Handle response

      if (data?.previewUrl) {
        setPreviewEmailUrl(data.previewUrl);
      }
    } catch (err) {
      console.error("[BOOKING SERVICE] API fetch error:", err);
    } finally {
      setLoading(false);
      setSubmittedManifestId(manifestId);
      setSuccess(true);
      showToast(`APPOINTMENT CONFIRMED & SENT TO ${clientEmail.toUpperCase()} (${manifestId})`);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSuccess(false);
    setPreviewEmailUrl("");
    setSelectedService("");
    setVehicleMake("");
    setVehicleModel("");
    setVehicleYear("");
    setEngineSpec("");
    setNotes("");
    setPreferredDate("");
    setPreferredTime("");
    setIsCustomTime(false);
    setCustomTimeValue("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
  };

  const stepTitles: Record<number, string> = {
    1: "01 // SELECT SERVICE TYPE",
    2: "02 // VEHICLE DETAILS",
    3: "03 // REQUIREMENTS & SCHEDULE",
    4: "04 // REVIEW & CONTACT",
  };

  const selectedServiceTitle =
    SERVICES.find((s) => s.id === selectedService)?.title || "NOT SELECTED";

  return (
    <section
      id="booking"
      className="py-16 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 bg-void relative"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 right-8 z-50 bg-plasma text-void px-6 py-4 rounded-xl font-mono text-xs tracking-widest font-black uppercase shadow-2xl flex items-center gap-3 border border-black/20"
          >
            <CheckCircle size={20} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1920px] mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="flex flex-col mb-8 md:mb-16 items-center text-center">
          <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase block">
            // CLIENT CONCIERGE
          </span>
          <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text uppercase leading-none">
            BOOK <span className="text-muted">APPOINTMENT</span>
          </h2>
        </div>

        {/* Console Container */}
        <div className="w-full max-w-4xl bg-panel/30 p-5 md:p-8 md:p-6 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden backdrop-blur-md">
          {/* Top Dynamic Green Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-void/50">
            <div
              className="h-full bg-plasma transition-all duration-700 ease-out shadow-[0_0_12px_#D6FF00]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <AnimatePresence mode="sync">
            {!success ? (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-6"
              >
                {/* Step Header */}
                <div className="flex justify-between items-end mb-6 md:mb-12 border-b border-white/10 pb-6 font-mono text-xs">
                  <span className="tracking-widest text-text uppercase font-semibold flex items-center gap-2">
                    {stepTitles[currentStep]}
                  </span>
                  <span className="text-plasma font-bold tracking-widest">
                    STEP {currentStep}/4
                  </span>
                </div>

                {/* STEP 1: SERVICE SELECTION */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {SERVICES.map((cat) => {
                      const IconComponent = cat.icon;
                      const isSelected = selectedService === cat.id;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedService(cat.id)}
                          className={`p-5 md:p-8 border rounded-2xl flex flex-col items-start gap-6 text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                            isSelected
                              ? "border-plasma bg-plasma/10 shadow-glow-plasma-md"
                              : "border-white/10 hover:border-plasma/50 hover:bg-white/[0.02]"
                          }`}
                        >
                          <div className="w-full flex justify-between items-center">
                            <div
                              className={`p-3 rounded-xl transition-colors ${
                                isSelected
                                  ? "bg-plasma text-void"
                                  : "bg-white/5 text-muted group-hover:text-plasma"
                              }`}
                            >
                              <IconComponent size={28} strokeWidth={1.5} />
                            </div>
                            {isSelected && (
                              <span className="flex items-center gap-1 text-xs font-mono tracking-widest bg-plasma text-void px-2.5 py-1 rounded-full font-bold uppercase">
                                <Check size={12} /> SELECTED
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col font-mono">
                            <span
                              className={`text-lg tracking-widest uppercase mb-1 font-bold ${
                                isSelected ? "text-plasma" : "text-text"
                              }`}
                            >
                              {cat.title}
                            </span>
                            <span className="text-xs text-muted tracking-wider">
                              {cat.subtitle}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* STEP 2: VEHICLE DETAILS */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                        <Car size={14} className="text-plasma" /> VEHICLE MAKE *
                      </label>
                      <input
                        type="text"
                        required
                        suppressHydrationWarning
                        value={vehicleMake}
                        onChange={(e) => setVehicleMake(e.target.value)}
                        placeholder="E.G. PORSCHE, FERRARI, LAMBORGHINI"
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase focus:bg-white/[0.02]"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                        <Car size={14} className="text-plasma" /> VEHICLE MODEL *
                      </label>
                      <input
                        type="text"
                        required
                        suppressHydrationWarning
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        placeholder="E.G. 911 GT3 RS, SF90, HURACAN"
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase focus:bg-white/[0.02]"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                        <Calendar size={14} className="text-plasma" /> MODEL YEAR *
                      </label>
                      <input
                        type="text"
                        required
                        suppressHydrationWarning
                        value={vehicleYear}
                        onChange={(e) => setVehicleYear(e.target.value)}
                        placeholder="E.G. 2024"
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase focus:bg-white/[0.02]"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                        <Wrench size={14} className="text-plasma" /> ENGINE SPEC / SETUP
                      </label>
                      <input
                        type="text"
                        suppressHydrationWarning
                        value={engineSpec}
                        onChange={(e) => setEngineSpec(e.target.value)}
                        placeholder="E.G. 4.0L FLAT-6 NA / TWIN TURBO V8"
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase focus:bg-white/[0.02]"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: REQUIREMENTS & SCHEDULE */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-6 font-mono text-xs">
                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                        <Calendar size={14} className="text-plasma" /> TARGET DROP-OFF DATE *
                      </label>
                      <input
                        type="date"
                        required
                        suppressHydrationWarning
                        min={new Date().toISOString().split("T")[0]}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 [&::-webkit-calendar-picker-indicator]:filter-[invert(1)] uppercase cursor-pointer"
                      />
                    </div>

                    {/* Dynamic Time Slot & Custom Time Selection */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                          <Clock size={14} className="text-plasma" /> PREFERRED TIME SLOT *
                        </label>
                        {preferredTime && (
                          <span className="text-xs text-plasma tracking-widest uppercase font-bold bg-plasma/10 px-3 py-1 rounded-full border border-plasma/30">
                            SELECTED: {preferredTime}
                          </span>
                        )}
                      </div>

                      {/* Interactive Time Slot Chips */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = !isCustomTime && preferredTime === slot.label;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              suppressHydrationWarning
                              onClick={() => {
                                setIsCustomTime(false);
                                setPreferredTime(slot.label);
                              }}
                              className={`p-3.5 border rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? "border-plasma bg-plasma/15 text-plasma shadow-glow-plasma-md font-bold"
                                  : "border-white/10 hover:border-plasma/50 hover:bg-white/[0.02] text-text"
                              }`}
                            >
                              <span className="text-sm font-bold tracking-widest">{slot.label}</span>
                              <span className="text-xs text-muted tracking-wider uppercase mt-0.5">{slot.period}</span>
                            </button>
                          );
                        })}

                        {/* Custom Time Chip */}
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => {
                            setIsCustomTime(true);
                            if (customTimeValue) {
                              setPreferredTime(formatCustomTime(customTimeValue));
                            } else {
                              setPreferredTime("");
                            }
                          }}
                          className={`p-3.5 border rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                            isCustomTime
                              ? "border-plasma bg-plasma/15 text-plasma shadow-glow-plasma-md font-bold"
                              : "border-white/10 hover:border-plasma/50 hover:bg-white/[0.02] text-text"
                          }`}
                        >
                          <span className="text-xs font-bold tracking-widest flex items-center gap-1">
                            + CUSTOM TIME
                          </span>
                          <span className="text-xs text-muted tracking-wider uppercase mt-0.5">SET SPECIFIC HOUR</span>
                        </button>
                      </div>

                      {/* Custom Time Picker Input (shown when isCustomTime is true) */}
                      {isCustomTime && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 p-4 border border-plasma/30 bg-white/[0.02] rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                        >
                          <div className="flex flex-col gap-1 flex-1">
                            <span className="text-xs text-plasma tracking-widest uppercase font-bold">
                              SPECIFY CUSTOM APPOINTMENT TIME
                            </span>
                            <span className="text-xs text-muted">
                              Select an exact hour and minute for intake
                            </span>
                          </div>
                          <label htmlFor="customTime" className="sr-only">Custom Time</label>
                          <input id="customTime" type="time"
                            required
                            suppressHydrationWarning
                            value={customTimeValue}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomTimeValue(val);
                              setPreferredTime(formatCustomTime(val));
                            }}
                            className="bg-void border border-white/20 focus:border-plasma p-3 text-text rounded-xl outline-none tracking-widest transition-all text-sm font-bold [&::-webkit-calendar-picker-indicator]:filter-[invert(1)] uppercase cursor-pointer"
                          />
                        </motion.div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                        <FileText size={14} className="text-plasma" /> SPECIAL NOTES & GOALS
                      </label>
                      <textarea
                        rows={4}
                        suppressHydrationWarning
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="DESCRIBE TARGET HORSEPOWER, PREFERRED PARTS, OR SPECIFIC COMMISSION GOALS..."
                        className="bg-void border border-white/10 focus:border-plasma p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase resize-none focus:bg-white/[0.02]"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: REVIEW & CONTACT */}
                {currentStep === 4 && (
                  <div className="flex flex-col gap-4 md:gap-8 font-mono text-xs">
                    {/* Telemetry Summary Manifest Panel */}
                    <div className="border border-plasma/30 bg-void/80 p-6 md:p-5 md:p-8 rounded-2xl relative overflow-hidden backdrop-blur-md">
                      <div className="absolute top-0 right-0 bg-plasma/10 text-plasma font-mono text-xs px-4 py-1 border-b border-l border-plasma/30 uppercase tracking-widest">
                        PRE-FLIGHT MANIFEST
                      </div>

                      <span className="text-plasma tracking-widest block mb-6 uppercase font-bold flex items-center gap-2">
                        // APPOINTMENT SPECIFICATION
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-muted tracking-widest">
                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                          <span className="text-xs text-muted block mb-1 uppercase">SERVICE</span>
                          <span className="text-text font-bold block uppercase text-sm">{selectedServiceTitle}</span>
                        </div>

                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                          <span className="text-xs text-muted block mb-1 uppercase">VEHICLE</span>
                          <span className="text-text font-bold block uppercase text-sm truncate">
                            {vehicleMake} {vehicleModel} ({vehicleYear})
                          </span>
                        </div>

                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                          <span className="text-xs text-muted block mb-1 uppercase">WINDOW</span>
                          <span className="text-text font-bold block uppercase text-sm">
                            {preferredDate || "N/A"} @ {preferredTime || "N/A"}
                          </span>
                        </div>

                        <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                          <span className="text-xs text-muted block mb-1 uppercase">ENGINE SPEC</span>
                          <span className="text-text font-bold block uppercase text-sm truncate">
                            {engineSpec || "STANDARD"}
                          </span>
                        </div>
                      </div>

                      {notes && (
                        <div className="mt-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                          <span className="text-xs text-muted block mb-1 uppercase">NOTES & PREFERENCES</span>
                          <span className="text-text block uppercase text-xs leading-relaxed">{notes}</span>
                        </div>
                      )}
                    </div>

                    <form id="commission-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-3">
                          <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                            <User size={14} className="text-plasma" /> FULL NAME *
                          </label>
                          <input
                            type="text"
                            required
                            suppressHydrationWarning
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="ENTER FULL NAME"
                            className="bg-void border border-white/10 focus:border-plasma p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase focus:bg-white/[0.02]"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <label className="text-muted tracking-widest uppercase flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <Mail size={14} className="text-plasma" /> EMAIL ADDRESS *
                            </span>
                            {clientEmail.length > 0 && !isValidEmail(clientEmail) && (
                              <span className="text-xs text-red-400 font-normal tracking-normal lowercase">
                                invalid format (e.g. name@domain.com)
                              </span>
                            )}
                          </label>
                          <input
                            type="email"
                            required
                            suppressHydrationWarning
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="NAME@DOMAIN.COM"
                            className={`bg-void border p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 focus:bg-white/[0.02] ${
                              clientEmail.length > 0 && !isValidEmail(clientEmail)
                                ? "border-red-500/60 focus:border-red-400"
                                : "border-white/10 focus:border-plasma"
                            }`}
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <label className="text-muted tracking-widest uppercase flex items-center gap-2">
                            <Phone size={14} className="text-plasma" /> PHONE NUMBER *
                          </label>
                          <input
                            type="tel"
                            required
                            suppressHydrationWarning
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="bg-void border border-white/10 focus:border-plasma p-4 text-text rounded-xl outline-none tracking-widest transition-all duration-300 uppercase focus:bg-white/[0.02]"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Control Action Buttons */}
                <div className="flex justify-between items-center mt-6 md:mt-12 pt-6 border-t border-white/5">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={handlePrev}
                      className="px-6 py-4 bg-white/5 border border-white/10 hover:border-white/30 hover:text-white text-muted font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeft size={16} /> BACK
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      suppressHydrationWarning
                      disabled={!isStepValid}
                      onClick={handleNext}
                      className={`px-8 py-4 font-mono text-xs tracking-widest font-bold uppercase transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-2 ${
                        isStepValid
                          ? "bg-plasma text-void hover:bg-plasma/90 shadow-glow-plasma-md hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-white/5 border border-white/10 text-muted/50 cursor-not-allowed opacity-50"
                      }`}
                    >
                      PROCEED <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="commission-form"
                      suppressHydrationWarning
                      disabled={!isStepValid || loading}
                      className={`px-8 py-4 font-mono text-xs tracking-widest font-black uppercase transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-2 ${
                        isStepValid && !loading
                          ? "bg-plasma text-void hover:bg-plasma/90 shadow-glow-plasma-md hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-white/5 border border-white/10 text-muted/50 cursor-not-allowed opacity-50"
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin" />
                          TRANSMITTING...
                        </span>
                      ) : (
                        "SUBMIT APPOINTMENT"
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Success Screen State */
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 bg-plasma/10 border-2 border-plasma rounded-full flex items-center justify-center mb-8 shadow-glow-plasma-lg animate-pulse">
                  <CheckCircle size={40} className="text-plasma" />
                </div>

                <div className="bg-plasma/10 text-plasma font-mono text-xs px-4 py-1.5 rounded-full border border-plasma/30 mb-4 tracking-widest uppercase font-bold">
                  TRANSMISSION ACKNOWLEDGED // ID: {submittedManifestId}
                </div>

                <h3 className="font-bebas text-4xl md:text-6xl tracking-widest text-text uppercase mb-4">
                  APPOINTMENT <span className="text-plasma">SECURED</span>
                </h3>

                <p className="text-xs md:text-sm font-mono text-muted max-w-lg leading-relaxed uppercase mb-8 tracking-widest">
                  Your build slot request has been logged into our engineering queue.
                  An executive concierge engineer will review your chassis specifications and respond within 2 hours.
                </p>

                {/* Summary Box */}
                <div className="w-full max-w-md bg-void/80 border border-white/10 p-6 rounded-2xl text-left font-mono text-xs mb-10 tracking-wider">
                  <span className="text-plasma font-bold block mb-4 border-b border-white/10 pb-2 uppercase">
                    // CONFIRMATION SUMMARY
                  </span>
                  <div className="flex justify-between py-1 text-muted">
                    <span>SERVICE:</span>
                    <span className="text-text font-bold uppercase">{selectedServiceTitle}</span>
                  </div>
                  <div className="flex justify-between py-1 text-muted">
                    <span>CHASSIS:</span>
                    <span className="text-text font-bold uppercase">{vehicleMake} {vehicleModel}</span>
                  </div>
                  <div className="flex justify-between py-1 text-muted">
                    <span>SCHEDULE:</span>
                    <span className="text-text font-bold uppercase">{preferredDate} ({preferredTime})</span>
                  </div>
                  <div className="flex justify-between py-1 text-muted">
                    <span>CLIENT:</span>
                    <span className="text-text font-bold uppercase">{clientName}</span>
                  </div>
                  <div className="flex justify-between py-1 text-muted">
                    <span>CONTACT:</span>
                    <span className="text-text font-bold uppercase truncate max-w-[200px]">{clientEmail}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={resetForm}
                    className="px-8 py-4 bg-plasma text-void font-mono text-xs tracking-widest uppercase font-black transition-all duration-300 rounded-xl cursor-pointer shadow-glow-plasma-md hover:scale-[1.02] active:scale-[0.98]"
                  >
                    START NEW APPOINTMENT
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
