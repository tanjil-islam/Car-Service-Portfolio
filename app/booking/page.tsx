import Navbar from "@/components/Navbar";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function BookingPage() {
  return (
    <main className="bg-void min-h-screen text-text relative select-none font-inter">
      <Navbar />
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-void text-plasma font-mono tracking-widest text-sm">INITIALIZING TELEMETRY...</div>}>
        <Booking />
      </Suspense>
      <Footer />
    </main>
  );
}
