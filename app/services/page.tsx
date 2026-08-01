import Navbar from "@/components/Navbar";
import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main className="bg-void min-h-screen text-text relative select-none font-inter">
      <Navbar />
      <ServicesGrid />
      <Footer />
    </main>
  );
}
