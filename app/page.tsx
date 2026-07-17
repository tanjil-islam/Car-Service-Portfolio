import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartsShowcase from "@/components/PartsShowcase";
import About from "@/components/About";
import Owner from "@/components/Owner";
import Team from "@/components/Team";
import Services from "@/components/Services";
import WorkGallery from "@/components/WorkGallery";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-void min-h-screen text-text relative select-none font-inter">
      {/* GLOBAL HEADERS & INTERFACES */}
      <Navbar />

      {/* SECTION BLOCKS */}
      <Hero />
      <PartsShowcase />
      <About />
      <Owner />
      <Team />
      <Services />
      <WorkGallery />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
    </main>
  );
}
