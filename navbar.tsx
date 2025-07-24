import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import MobileMenu from "./mobile-menu";
import logoImage from "@assets/ChatGPT_Image_Jul_16__2025__05_06_44_PM-removebg-preview_1752703774110.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-xl" : "bg-black/95 backdrop-blur-md shadow-lg"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <img 
                  src={logoImage} 
                  alt="Hamptons Auto Club Logo" 
                  className="w-12 h-12 object-contain"
                />
                <span className="ml-3 text-xl font-bold text-[hsl(43,74%,49%)]">
                  Hamptons Auto Club
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-[hsl(43,74%,49%)] hover:text-white transition-colors duration-300 font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("packages")}
                  className="text-[hsl(43,74%,49%)] hover:text-white transition-colors duration-300 font-medium"
                >
                  Packages
                </button>
                <button
                  onClick={() => scrollToSection("memberships")}
                  className="text-[hsl(43,74%,49%)] hover:text-white transition-colors duration-300 font-medium"
                >
                  Memberships
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-[hsl(43,74%,49%)] hover:text-white transition-colors duration-300 font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-[hsl(43,74%,49%)] hover:text-white transition-colors duration-300 font-medium"
                >
                  Reviews
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-[hsl(43,74%,49%)] hover:text-white transition-colors duration-300 font-medium"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="hidden md:flex items-center ml-4">
              <ThemeToggle />
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[hsl(43,74%,49%)] hover:text-white"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
}
