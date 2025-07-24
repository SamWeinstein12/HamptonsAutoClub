import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Gem } from "lucide-react";

export default function Packages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const packages = [
    {
      name: "Platinum Package",
      price: "$75",
      duration: "45–60 minutes",
      icon: Star,
      features: [
        "Pressure washer + foam cannon hand wash",
        "Rinse & dry with plush microfiber towels",
        "Wheel degreasing & tire shine",
        "Quick vacuum (seats, floors, trunk)",
        "Wipe down of dash, doors, and plastics",
        "Streak-free window cleaning (inside & out)",
        "Air freshener spray",
      ],
      bestFor: "Quick refresh or regular weekly cleanups",
      buttonStyle: "bg-[hsl(213,19%,25%)] hover:bg-[hsl(43,74%,49%)] text-white",
      borderColor: "border-gray-200",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600 dark:text-gray-300",
    },
    {
      name: "Gold Package",
      price: "$120",
      duration: "90–120 minutes",
      icon: Crown,
      features: [
        "Everything in Platinum, plus:",
        "Ceramic spray sealant or wax applied by hand",
        "Interior plastic + leather surfaces cleaned",
        "Leather seats conditioned",
        "Carpet & fabric seats cleaned using drill brush + carpet cleaner",
        "Vents, cup holders, door jambs detailed",
        "Trim & bumper restoration for faded plastics",
        "Pet hair removal (light to moderate)",
        "Tornador blowout for tight areas",
      ],
      bestFor: "Monthly deep cleans or pre-event prep",
      buttonStyle: "gold-gradient hover:opacity-90 text-white",
      borderColor: "border-[hsl(43,74%,49%)]",
      iconBg: "bg-[hsl(43,74%,49%)]",
      iconColor: "text-white",
      popular: true,
    },
    {
      name: "Diamond Package",
      price: "$175",
      duration: "2.5–3.5 hours",
      icon: Gem,
      features: [
        "Everything in Gold, plus:",
        "Full Tornador + vacuum interior blowout/detail",
        "Ceramic coat applied for 3–6 month paint protection",
        "1-step spray wax enhancement for shine",
        "Deep stain treatment for carpets & seats",
        "Engine bay light cleaning (if safe to access)",
        "Full pet hair removal (heavy-duty)",
        "Odor treatment & premium scent choice",
        "Complimentary microfiber towel & 'Hamptons Auto Club' decal",
      ],
      bestFor: "High-end vehicles, special occasions, or resale prep",
      buttonStyle: "bg-[hsl(219,28%,12%)] hover:bg-[hsl(43,74%,49%)] text-white",
      borderColor: "border-gray-200",
      iconBg: "bg-[hsl(219,28%,12%)]",
      iconColor: "text-[hsl(43,74%,49%)]",
    },
  ];

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
    <section id="packages" className="py-20 bg-white dark:bg-[hsl(0,0%,12%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Our Packages
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our three premium detailing packages, each designed to meet your specific needs and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className={`h-full card-hover border-2 ${pkg.borderColor} ${pkg.popular ? 'relative' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-[hsl(43,74%,49%)] text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${pkg.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <pkg.icon className={`w-8 h-8 ${pkg.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-white dark:text-[hsl(0,0%,90%)] mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-4xl font-bold text-[hsl(43,74%,49%)] mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{pkg.duration}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-[hsl(43,74%,49%)] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-[hsl(210,40%,95%)] dark:bg-[hsl(0,0%,18%)] rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      <strong>Best for:</strong> {pkg.bestFor}
                    </p>
                  </div>
                  
                  <Button
                    onClick={scrollToContact}
                    className={`w-full ${pkg.buttonStyle} font-semibold py-3 px-6 rounded-lg transition-all duration-300`}
                  >
                    Choose {pkg.name.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
