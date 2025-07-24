import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Phone, Mail, Globe, Instagram, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import CalendlyWidget from "./calendly-widget";
import PaymentModal from "./payment-modal";
import { z } from "zod";

const formSchema = insertContactSchema;

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [showCalendly, setShowCalendly] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPackagePrice, setSelectedPackagePrice] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    message: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicleType: "",
      preferredPackage: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll contact you soon to schedule your appointment.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    contactMutation.mutate(data);
  };

  const handleBookingMethod = (method: 'calendly', packageName: string) => {
    // Set package details based on selection
    const packagePrices: Record<string, number> = {
      'platinum': 100,
      'gold': 150,
      'diamond': 250,
    };
    
    const packageNames: Record<string, string> = {
      'platinum': 'Platinum Package',
      'gold': 'Gold Package',
      'diamond': 'Diamond Package',
    };
    
    const selectedPackageName = packageNames[packageName] || 'General Service';
    const selectedPrice = packagePrices[packageName] || 100;
    
    setSelectedPackage(selectedPackageName);
    setSelectedPackagePrice(selectedPrice);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    const formData = form.getValues();
    setCustomerInfo(formData);
    setShowCalendly(true);
  };



  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "646-796-5433",
      href: "tel:646-796-5433",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hamptonsautoclub@gmail.com",
      href: "mailto:hamptonsautoclub@gmail.com",
    },
    {
      icon: Globe,
      title: "Website",
      content: "hamptonsautoclub.com",
      href: "https://hamptonsautoclub.com",
    },
    {
      icon: Instagram,
      title: "Social Media",
      content: "@hamptonsautoclub",
      href: "https://instagram.com/hamptonsautoclub",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[hsl(0,0%,12%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Booking Section - Full Width Row */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)] mb-4">
              Book Your Appointment
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Ready to schedule your luxury car detailing service? Click below to book your appointment.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Card className="bg-white dark:bg-[hsl(0,0%,12%)] border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)] mb-2">
                      Select Package
                    </label>
                    <Select onValueChange={(value) => form.setValue('preferredPackage', value)} defaultValue={form.getValues('preferredPackage')}>
                      <SelectTrigger className="w-full bg-white border-gray-300 focus:ring-2 focus:ring-[hsl(43,74%,49%)] focus:border-transparent">
                        <SelectValue placeholder="Choose your service package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platinum">Platinum - $100 (45-60 min)</SelectItem>
                        <SelectItem value="gold">Gold - $150 (90-120 min)</SelectItem>
                        <SelectItem value="diamond">Diamond - $250 (2.5-3.5 hrs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    type="button"
                    onClick={() => {
                      const packageValue = form.getValues('preferredPackage');
                      if (!packageValue) {
                        toast({
                          title: "Please select a package",
                          description: "Choose a service package before booking.",
                          variant: "destructive",
                        });
                        return;
                      }
                      handleBookingMethod('calendly', packageValue);
                    }}
                    className="w-full bg-gradient-to-r from-[hsl(43,74%,49%)] to-[hsl(43,74%,39%)] hover:from-[hsl(43,74%,39%)] hover:to-[hsl(43,74%,29%)] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Contact Info and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)] mb-6">
              Contact Us
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Contact us on our website or DM us on social media to book your appointment.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(43,74%,49%)] to-[hsl(43,74%,39%)] rounded-full flex items-center justify-center mr-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)]">{item.title}</h4>
                    <a
                      href={item.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-[hsl(43,74%,49%)] transition-colors"
                    >
                      {item.content}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white dark:bg-[hsl(0,0%,12%)] border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)] flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  Send Message
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Have questions or need more information? Send us a message and we'll get back to you soon.
                </p>
              </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)]">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                className="bg-white border-gray-300 focus:ring-2 focus:ring-[hsl(43,74%,49%)] focus:border-transparent"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)]">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                className="bg-white border-gray-300 focus:ring-2 focus:ring-[hsl(43,74%,49%)] focus:border-transparent"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)]">Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="(555) 123-4567"
                                {...field}
                                className="bg-white border-gray-300 focus:ring-2 focus:ring-[hsl(43,74%,49%)] focus:border-transparent"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="vehicleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)]">Vehicle Type</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., BMW 3 Series"
                                {...field}
                                className="bg-white border-gray-300 focus:ring-2 focus:ring-[hsl(43,74%,49%)] focus:border-transparent"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="preferredPackage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)]">Preferred Package</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-gray-300 focus:ring-2 focus:ring-[hsl(43,74%,49%)] focus:border-transparent">
                                <SelectValue placeholder="Select a package" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="platinum">Platinum - $100 (45-60 min)</SelectItem>
                              <SelectItem value="gold">Gold - $150 (90-120 min)</SelectItem>
                              <SelectItem value="diamond">Diamond - $250 (2.5-3.5 hrs)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)]">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your vehicle and any specific needs..."
                              rows={4}
                              {...field}
                              className="bg-white border-gray-300 focus:ring-2 focus:ring-[hsl(43,74%,49%)] focus:border-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="w-full bg-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,39%)] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onPaymentComplete={handlePaymentComplete}
        selectedPackage={selectedPackage}
        packagePrice={selectedPackagePrice}
      />

      {/* Calendly Widget */}
      <CalendlyWidget
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
        selectedPackage={selectedPackage}
        customerInfo={customerInfo}
      />
    </section>
  );
}
