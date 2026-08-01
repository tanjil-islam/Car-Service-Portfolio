import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Owner from "@/components/Owner";
import Team from "@/components/Team";
import WorkGallery from "@/components/WorkGallery";
import Testimonials from "@/components/Testimonials";
import LocationMap from "@/components/LocationMap";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-void min-h-screen text-text relative select-none font-inter">
      {/* GLOBAL HEADERS & INTERFACES */}
      <Navbar />

      {/* SECTION BLOCKS */}
      <Hero />
      <About />
      <Owner />
      <Team />
      <WorkGallery />
      <Testimonials />
      <LocationMap />
      <Footer />
    </main>
  );
}
