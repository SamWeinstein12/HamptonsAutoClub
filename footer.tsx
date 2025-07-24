import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[hsl(219,28%,12%)] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/hamptons-logo.png" 
                alt="Hamptons Auto Club Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="ml-3 text-xl font-bold">Hamptons Auto Club</span>
            </div>
            <p className="text-gray-300 mb-4">
              The Hamptons' premier mobile detailing service, delivering luxury-level care right to your driveway.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gradient-to-br from-[hsl(45,76%,52%)] to-[hsl(45,76%,42%)] rounded-full text-white hover:from-[hsl(45,76%,42%)] hover:to-[hsl(45,76%,32%)] transition-all duration-300"
                asChild
              >
                <a href="https://instagram.com/hamptonsautoclub" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gradient-to-br from-[hsl(45,76%,52%)] to-[hsl(45,76%,42%)] rounded-full text-white hover:from-[hsl(45,76%,42%)] hover:to-[hsl(45,76%,32%)] transition-all duration-300"
                asChild
              >
                <a href="https://tiktok.com/@hamptonsautoclub" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/>
                  </svg>
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-[hsl(45,76%,52%)] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("packages")}
                  className="text-gray-300 hover:text-[hsl(45,76%,52%)] transition-colors"
                >
                  Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-[hsl(45,76%,52%)] transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-[hsl(45,76%,52%)] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="tel:646-796-5433" className="hover:text-[hsl(45,76%,52%)] transition-colors">
                  646-796-5433
                </a>
              </li>
              <li>
                <a href="mailto:hamptonsautoclub@gmail.com" className="hover:text-[hsl(45,76%,52%)] transition-colors">
                  hamptonsautoclub@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/hamptonsautoclub" className="hover:text-[hsl(45,76%,52%)] transition-colors">
                  @hamptonsautoclub
                </a>
              </li>
              <li>
                <a href="https://hamptonsautoclub.com" className="hover:text-[hsl(45,76%,52%)] transition-colors">
                  hamptonsautoclub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Hamptons Auto Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
