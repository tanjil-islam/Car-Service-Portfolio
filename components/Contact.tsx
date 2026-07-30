"use client";

import { useState } from "react";
import { Send, MapPin, Clock, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactName,
          contactEmail,
          contactMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }, 5000);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 bg-void relative">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 md:gap-16 lg:gap-5 md:gap-10 md:gap-24 items-stretch">
          
          {/* Left panel: Info & styled map */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs tracking-[0.4em] text-plasma mb-6 uppercase block">
                // CONNECT
              </span>
              <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text uppercase mb-6 md:mb-12 leading-none">
                CONTACT <br />
                <span className="text-muted">GARAGE</span>
              </h2>
              
              <div className="flex flex-col gap-4 md:gap-8 mb-8 md:mb-16">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-plasma transition-colors duration-300 shrink-0">
                    <MapPin className="text-muted group-hover:text-plasma transition-colors duration-300" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs tracking-widest text-muted uppercase mb-1">HQ LOCATION</span>
                    <span className="font-mono text-sm tracking-wider text-text uppercase">Lake city,Concord. Khilkhet,<br/>Dhaka, Bangladesh, 1229</span>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-plasma transition-colors duration-300 shrink-0">
                    <Phone className="text-muted group-hover:text-plasma transition-colors duration-300" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs tracking-widest text-muted uppercase mb-1">DIRECT LINE</span>
                    <span className="font-mono text-sm tracking-wider text-text uppercase">+880 1956-455165</span>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-plasma transition-colors duration-300 shrink-0">
                    <Mail className="text-muted group-hover:text-plasma transition-colors duration-300" size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs tracking-widest text-muted uppercase mb-1">EMAIL INQUIRIES</span>
                    <span className="font-mono text-sm tracking-wider text-text uppercase">info@roadmenbd.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: message form */}
          <div className="lg:col-span-7">
            <div className="bg-panel/30 p-5 md:p-8 md:p-6 md:p-12 rounded-3xl border border-white/5 h-full flex flex-col justify-center backdrop-blur-md">
              
              {!submitted ? (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 md:gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-mono text-muted tracking-widest uppercase">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        suppressHydrationWarning
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="ENTER NAME"
                        className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none font-mono text-xs tracking-widest uppercase transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-mono text-muted tracking-widest uppercase">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        suppressHydrationWarning
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="ENTER EMAIL"
                        className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none font-mono text-xs tracking-widest uppercase transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-mono text-muted tracking-widest uppercase">
                      MESSAGE DETAILS
                    </label>
                    <textarea
                      required
                      rows={5}
                      suppressHydrationWarning
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="HOW CAN WE ASSIST WITH YOUR BUILD?"
                      className="bg-void border border-white/10 focus:border-plasma p-5 text-text rounded-xl outline-none font-mono text-xs tracking-widest uppercase transition-colors resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-red-500 font-mono text-xs tracking-widest uppercase mt-2 border border-red-500/30 bg-red-500/10 p-4 rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-4 py-5 bg-white text-void font-mono font-black text-xs tracking-widest uppercase rounded-xl transition-all hover:bg-plasma cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}
                    <Send size={16} className={isSubmitting ? "animate-pulse" : ""} />
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 md:py-32 text-center h-full">
                  <Mail className="text-plasma mb-6" size={48} strokeWidth={1} />
                  <span className="font-mono text-sm tracking-widest text-text font-bold block mb-4 uppercase">
                    MESSAGE DELIVERED
                  </span>
                  <p className="font-mono text-xs text-muted max-w-sm leading-relaxed tracking-widest uppercase">
                    Our team will review your inquiry and respond within 24 hours.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
