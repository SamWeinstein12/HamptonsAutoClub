import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Packages from "@/components/packages";
import Memberships from "@/components/memberships";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    // Set page title
    document.title = "Hamptons Auto Club - Luxury Detailing. Delivered.";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Hamptons Auto Club is the Hamptons\' premier mobile car detailing service. We provide luxury-level interior and exterior detailing with exclusive club-style service, right at your driveway.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Hamptons Auto Club is the Hamptons\' premier mobile car detailing service. We provide luxury-level interior and exterior detailing with exclusive club-style service, right at your driveway.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Packages />
      <Memberships />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
