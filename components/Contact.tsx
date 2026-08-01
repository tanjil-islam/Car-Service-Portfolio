"use client";

import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";

// Custom WhatsApp Icon SVG
const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.661-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

export default function Contact() {
  const [contactName, setContactName] = useState("");
  const [contactPhoneEmail, setContactPhoneEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("General Inquiry");
  const [contactMessage, setContactMessage] = useState("");
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhoneEmail || !contactMessage) return;

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
          contactPhoneEmail,
          contactSubject,
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
        setContactPhoneEmail("");
        setContactSubject("General Inquiry");
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
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 md:px-16 lg:px-24 bg-[#0a0a0a] min-h-[80vh] flex items-center justify-center font-inter">
      <div className="max-w-[1200px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left panel: Info Cards */}
          <div className="flex flex-col gap-4 w-full lg:max-w-[500px]">
            {/* Hotline */}
            <a href="tel:+8801956455165" className="bg-[#141414] border border-white/5 rounded-2xl p-4 md:p-5 flex items-center gap-4 md:gap-5 transition-all hover:border-white/20 hover:bg-white/[0.02] cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1a0f0f] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="text-[#e50914] w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-white/50 uppercase font-bold tracking-wider mb-1">HOTLINE</span>
                <span className="text-sm md:text-base text-white font-bold group-hover:text-[#e50914] transition-colors">+880 1956-455165</span>
                <span className="text-xs md:text-sm text-white/40">Available 24/7 for emergencies</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/8801956455165" target="_blank" rel="noopener noreferrer" className="bg-[#141414] border border-white/5 rounded-2xl p-4 md:p-5 flex items-center gap-4 md:gap-5 transition-all hover:border-white/20 hover:bg-white/[0.02] cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0d1a10] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="text-[#25D366] w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-white/50 uppercase font-bold tracking-wider mb-1">WHATSAPP</span>
                <span className="text-sm md:text-base text-white font-bold group-hover:text-[#25D366] transition-colors">Chat with us</span>
                <span className="text-xs md:text-sm text-white/40">Click to open WhatsApp</span>
              </div>
            </a>

            {/* Email */}
            <a href="mailto:info@roadmenbd.com" className="bg-[#141414] border border-white/5 rounded-2xl p-4 md:p-5 flex items-center gap-4 md:gap-5 transition-all hover:border-white/20 hover:bg-white/[0.02] cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1a160d] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="text-[#FBBF24] w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-white/50 uppercase font-bold tracking-wider mb-1">EMAIL</span>
                <span className="text-sm md:text-base text-white font-bold group-hover:text-[#FBBF24] transition-colors">info@roadmenbd.com</span>
                <span className="text-xs md:text-sm text-white/40">Response within 24 hours</span>
              </div>
            </a>

            {/* Main Premises */}
            <a href="https://maps.google.com/maps?q=Lake%20City,%20Concord.%20Khilkhet,%20Dhaka,%20Bangladesh,%201229" target="_blank" rel="noopener noreferrer" className="bg-[#141414] border border-white/5 rounded-2xl p-4 md:p-5 flex items-center gap-4 md:gap-5 transition-all hover:border-white/20 hover:bg-white/[0.02] cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1a0f0f] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="text-[#e50914] w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-white/50 uppercase font-bold tracking-wider mb-1">MAIN PREMISES</span>
                <span className="text-sm md:text-base text-white font-bold group-hover:text-[#e50914] transition-colors">Lake city, Concord. Khilkhet</span>
                <span className="text-xs md:text-sm text-white/40">Dhaka, Bangladesh, 1229</span>
              </div>
            </a>

            {/* Chat on WhatsApp Button */}
            <a 
              href="https://wa.me/8801956455165" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 w-fit transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:scale-105 text-sm md:text-base"
            >
              <WhatsAppIcon size={20} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Right panel: Message Form */}
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col w-full">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Send Us a Message</h2>
            
            {!submitted ? (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your full name"
                    className="bg-[#0a0a0a] border border-white/10 focus:border-white/30 p-3.5 text-white rounded-lg outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                    PHONE / EMAIL
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPhoneEmail}
                    onChange={(e) => setContactPhoneEmail(e.target.value)}
                    placeholder="Contact information"
                    className="bg-[#0a0a0a] border border-white/10 focus:border-white/30 p-3.5 text-white rounded-lg outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                    SUBJECT
                  </label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="bg-[#0a0a0a] border border-white/10 focus:border-white/30 p-3.5 text-white rounded-lg outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Service Booking">Service Booking</option>
                    <option value="Parts Order">Parts Order</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-wider">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="bg-[#0a0a0a] border border-white/10 focus:border-white/30 p-3.5 text-white rounded-lg outline-none transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="text-red-500 text-sm mt-1 border border-red-500/30 bg-red-500/10 p-3 rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 bg-[#e50914] hover:bg-[#f00b17] text-white font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} className={isSubmitting ? "animate-pulse" : ""} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                <div className="w-16 h-16 bg-[#e50914]/10 rounded-full flex items-center justify-center mb-6">
                  <Send className="text-[#e50914]" size={32} />
                </div>
                <span className="text-xl text-white font-bold mb-2">
                  Message Delivered
                </span>
                <p className="text-white/60 max-w-xs leading-relaxed text-sm">
                  Our team will review your inquiry and respond shortly.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
