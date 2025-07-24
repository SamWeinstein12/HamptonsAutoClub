import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-[hsl(210,40%,98%)] dark:bg-[hsl(0,0%,12%)] dark:bg-[hsl(0,0%,8%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* About Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(213,19%,25%)] dark:text-white mb-6">
              About Us
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
              Hamptons Auto Club is the Hamptons' go-to mobile detailing service, founded and operated by a local 16-year-old entrepreneur. <strong>We come to you</strong> - providing luxury-level interior and exterior detailing with exclusive club-style service, right at your driveway.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
              We're built on precision, hustle, and quality. Our commitment to excellence ensures every vehicle receives the premium care it deserves, delivered directly to your location.
            </p>
            <div className="flex items-center justify-center space-x-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[hsl(43,74%,49%)]">4+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[hsl(43,74%,49%)]">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[hsl(43,74%,49%)]">Mobile</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Service</div>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
