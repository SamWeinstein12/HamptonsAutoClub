import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Placeholder for real customer reviews
// Reviews will be added as they come in from actual customers
const testimonials: Array<{
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}> = [];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-[hsl(60,56%,91%)] dark:bg-[hsl(0,0%,7%)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(213,19%,25%)] dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Hamptons Auto Club.
          </p>
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white dark:bg-[hsl(0,0%,12%)] border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <Quote className="w-8 h-8 text-[hsl(43,74%,49%)] opacity-30 mr-2" />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[hsl(43,74%,49%)] text-[hsl(43,74%,49%)]" />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-[hsl(213,19%,25%)] dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[hsl(43,74%,49%)]">
                            {testimonial.service}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {testimonial.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Card className="max-w-2xl mx-auto bg-white dark:bg-[hsl(0,0%,12%)] border-0 shadow-lg">
              <CardContent className="p-12">
                <Quote className="w-16 h-16 text-[hsl(43,74%,49%)] opacity-30 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-[hsl(213,19%,25%)] dark:text-white mb-4">
                  Be Our First Review!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're just getting started and would love to detail your vehicle. 
                  Book our service today and share your experience!
                </p>
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-gradient-to-r from-[hsl(43,74%,49%)] to-[hsl(43,74%,39%)] hover:from-[hsl(43,74%,39%)] hover:to-[hsl(43,74%,29%)] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  Book Your Service
                </button>
              </CardContent>
            </Card>
          </motion.div>
        )}


      </div>
    </section>
  );
}