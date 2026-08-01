import Navbar from "@/components/Navbar";
import PartsShowcase from "@/components/PartsShowcase";
import Footer from "@/components/Footer";

export default function PartsPage() {
  return (
    <main className="bg-void min-h-screen text-text relative select-none font-inter">
      <Navbar />
      <PartsShowcase />
      <Footer />
    </main>
  );
}
