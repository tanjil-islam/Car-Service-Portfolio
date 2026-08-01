import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="bg-void min-h-screen text-text relative select-none font-inter pt-20">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
}
