import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import carbonFiberBg from "@assets/vector-carbon-fiber-background-and-texture-and-lighting-with-black-label-and-gold-line-luxury-style-material-wallpaper-for-car-tuning-or-service_1752706241798.jpg";
import logoImage from "@assets/ChatGPT_Image_Jul_16__2025__05_06_44_PM-removebg-preview_1752707256433.png";

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${carbonFiberBg})`,
            backgroundColor: '#1A1A1A'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 -mt-36"
        >
          <img 
            src={logoImage} 
            alt="Hamptons Auto Club Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto drop-shadow-2xl"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Hamptons Auto Club
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 font-light -mt-2"
        >
          Luxury Detailing. Delivered.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={scrollToContact}
            className="bg-gradient-to-r from-[hsl(43,74%,49%)] to-[hsl(43,74%,39%)] hover:from-[hsl(43,74%,39%)] hover:to-[hsl(43,74%,29%)] text-[hsl(219,28%,12%)] font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Book Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
