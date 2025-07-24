import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Shield, Star, Diamond, Check, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

const membershipFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  vehicleMakeModel: z.string().min(3, "Please enter your vehicle make and model"),
  membershipTier: z.enum(["platinum", "gold", "diamond"], {
    required_error: "Please select a membership tier",
  }),
  frequency: z.enum(["monthly", "weekly"], {
    required_error: "Please select service frequency",
  }),
  startDate: z.string().min(1, "Please select a start date"),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the 2-month minimum commitment",
  }),
});

type MembershipFormValues = z.infer<typeof membershipFormSchema>;

const membershipTiers = [
  {
    id: "platinum",
    name: "Platinum Member",
    icon: Shield,
    monthlyPrice: 68,
    weeklyPrice: 60,
    monthlySavings: 7,
    weeklySavings: 60,
    color: "from-gray-400 to-gray-600",
    benefits: [
      "Priority access to booking",
      "Discounted add-ons (pet hair, engine bay, etc.)",
      "$10 OFF Platinum service",
      "$15 OFF Gold service",
      "$20 OFF Diamond service",
      "Locked-in pricing for membership duration",
    ],
    description: "Best for routine maintenance & seasonal refreshes",
  },
  {
    id: "gold",
    name: "Gold Member",
    icon: Star,
    monthlyPrice: 96,
    weeklyPrice: 85,
    monthlySavings: 24,
    weeklySavings: 140,
    color: "from-[hsl(43,74%,49%)] to-[hsl(43,74%,39%)]",
    benefits: [
      "48-hour guaranteed booking",
      "Free tire shine + premium scent upgrades",
      "$15 OFF Platinum service",
      "$25 OFF Gold service",
      "$35 OFF Diamond service",
      "Locked-in pricing for full term",
    ],
    description: "Perfect for daily drivers or families",
  },
  {
    id: "diamond",
    name: "Diamond Member",
    icon: Diamond,
    monthlyPrice: 140,
    weeklyPrice: 125,
    monthlySavings: 35,
    weeklySavings: 200,
    color: "from-blue-400 to-purple-600",
    benefits: [
      "First-priority scheduling",
      "Monthly pet hair + stain touch-up included",
      "Free microfiber towel + club decal",
      "$25 OFF Platinum service",
      "$40 OFF Gold service",
      "$60 OFF Diamond service",
      "Locked-in VIP pricing",
    ],
    description: "Ideal for luxury cars, show vehicles, or perfectionists",
  },
];

export default function Memberships() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [showSignupForm, setShowSignupForm] = useState(false);

  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicleMakeModel: "",
      membershipTier: undefined,
      frequency: undefined,
      startDate: "",
      agreedToTerms: false,
    },
  });

  const submitMembership = useMutation({
    mutationFn: async (data: MembershipFormValues) => {
      return apiRequest("POST", "/api/membership-signup", data);
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the Club!",
        description: "We'll contact you shortly to confirm your membership details.",
      });
      form.reset();
      setShowSignupForm(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit membership request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: MembershipFormValues) => {
    submitMembership.mutate(data);
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="memberships" ref={ref} className="py-20 bg-[hsl(60,56%,91%)] dark:bg-[hsl(0,0%,7%)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(213,19%,25%)] dark:text-white mb-4">
            🔱 Hamptons Auto Club Membership
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-2">
            Consistent Care. Premium Discounts. VIP Access.
          </p>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join our exclusive membership program for regular car care at discounted rates. 
            Choose between monthly or weekly service with a minimum 2-month commitment.
          </p>
        </motion.div>

        {/* Membership Benefits Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white/80 dark:bg-[hsl(0,0%,12%)]/80 backdrop-blur border-0 shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-white mb-6 text-center">
                💼 What is the Club?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                The Hamptons Auto Club Membership gives clients exclusive access to high-end car care 
                on a recurring basis — either once a month or once a week — at a discounted rate.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Badge className="bg-[hsl(43,74%,49%)] text-white mb-2">Minimum Commitment</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2-month minimum required</p>
                </div>
                <div className="flex flex-col items-center">
                  <Badge className="bg-[hsl(43,74%,49%)] text-white mb-2">Service Options</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly or weekly service</p>
                </div>
                <div className="flex flex-col items-center">
                  <Badge className="bg-[hsl(43,74%,49%)] text-white mb-2">Custom Plans</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tailored options available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full bg-white dark:bg-[hsl(0,0%,12%)] border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                    <tier.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-white">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Once a Month</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-white">
                            ${tier.monthlyPrice}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">/mo</span>
                        </div>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Save ${tier.monthlySavings}/month
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Once a Week</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-white">
                            ${tier.weeklyPrice}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">/wk</span>
                        </div>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Save up to ${tier.weeklySavings}/month
                      </p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-[hsl(213,19%,25%)] dark:text-white">
                      Includes:
                    </h4>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => {
                      form.setValue('membershipTier', tier.id as any);
                      setShowSignupForm(true);
                    }}
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-semibold py-3`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Join {tier.name.split(' ')[0]} Tier
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Custom Plans Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-[hsl(213,19%,25%)] to-[hsl(213,19%,35%)] border-0 shadow-xl max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ⚙️ Need a Custom Plan?
              </h3>
              <p className="text-gray-200 mb-6">
                Looking for something different? Maybe 2x/month service or coverage for multiple vehicles? 
                We'll create a tailored membership just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:hamptonsautoclub@gmail.com"
                  className="inline-flex items-center justify-center bg-white text-[hsl(213,19%,25%)] hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  hamptonsautoclub@gmail.com
                </a>
                <a 
                  href="tel:6467965433"
                  className="inline-flex items-center justify-center bg-[hsl(43,74%,49%)] text-white hover:bg-[hsl(43,74%,39%)] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  646-796-5433
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Membership Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <Card className="bg-white dark:bg-[hsl(0,0%,12%)] border-0 shadow-lg max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[hsl(213,19%,25%)] dark:text-white">
                📜 Membership Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• All memberships require a 2-month minimum commitment</li>
                <li>• Billed monthly</li>
                <li>• No cancellations during active term</li>
                <li>• Missed appointments do not roll over</li>
                <li>• Services are non-transferable</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Signup Form */}
        {showSignupForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowSignupForm(false)}
          >
            <div 
              className="bg-white dark:bg-[hsl(0,0%,12%)] rounded-lg shadow-2xl max-w-2xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-white mb-6">
                  📲 Join Hamptons Auto Club
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vehicleMakeModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Make/Model</FormLabel>
                            <FormControl>
                              <Input placeholder="BMW X5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="membershipTier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Membership Tier</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a tier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="platinum">Platinum</SelectItem>
                                <SelectItem value="gold">Gold</SelectItem>
                                <SelectItem value="diamond">Diamond</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Frequency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" min={today} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="agreedToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I understand this is a 2-month minimum commitment
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={submitMembership.isPending}
                        className="flex-1 bg-gradient-to-r from-[hsl(43,74%,49%)] to-[hsl(43,74%,39%)] hover:from-[hsl(43,74%,39%)] hover:to-[hsl(43,74%,29%)] text-white font-semibold"
                      >
                        {submitMembership.isPending ? "Submitting..." : "Submit Membership Request"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowSignupForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}