import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface TimeSlot {
  time: string;
  available: boolean;
  duration: number;
}

interface CalendarBookingProps {
  onBookingComplete: (appointmentData: any) => void;
  selectedPackage: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    vehicleType: string;
    message: string;
  };
}

export default function CalendarBooking({ onBookingComplete, selectedPackage, customerInfo }: CalendarBookingProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Package durations in hours
  const packageDurations = {
    platinum: 1, // 45-60 minutes
    gold: 2, // 90-120 minutes  
    diamond: 3, // 2.5-3.5 hours
  };

  // Generate next 14 days for booking
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const availableDates = generateDates();

  // Query appointments for selected date
  const { data: appointments = [] } = useQuery({
    queryKey: ['/api/appointments', selectedDate],
    queryFn: async () => {
      if (!selectedDate) return [];
      const response = await apiRequest("GET", `/api/appointments/${selectedDate}`);
      return response.json();
    },
    enabled: !!selectedDate,
  });

  // Generate time slots from 10am to 5pm
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const baseTime = 10; // 10am in 24-hour format
    const endTime = 17; // 5pm in 24-hour format
    
    for (let hour = baseTime; hour <= endTime; hour++) {
      const time = `${hour}:00`;
      const slotStartTime = hour;
      const packageDuration = packageDurations[selectedPackage as keyof typeof packageDurations] || 1;
      
      // Check if this slot conflicts with existing appointments
      const isAvailable = checkSlotAvailability(slotStartTime, packageDuration, appointments);
      
      slots.push({
        time,
        available: isAvailable,
        duration: packageDuration,
      });
    }
    
    return slots;
  };

  const checkSlotAvailability = (startTime: number, duration: number, existingAppointments: any[]) => {
    const endTime = startTime + duration;
    
    for (const appointment of existingAppointments) {
      const appointmentStart = parseInt(appointment.timeSlot.split(':')[0]);
      const appointmentDuration = packageDurations[appointment.package as keyof typeof packageDurations] || 1;
      const appointmentEnd = appointmentStart + appointmentDuration;
      
      // Check for overlap
      if (
        (startTime >= appointmentStart && startTime < appointmentEnd) ||
        (endTime > appointmentStart && endTime <= appointmentEnd) ||
        (startTime <= appointmentStart && endTime >= appointmentEnd)
      ) {
        return false;
      }
    }
    
    return endTime <= 17; // Don't allow bookings past 5pm
  };

  const bookingMutation = useMutation({
    mutationFn: async (appointmentData: any) => {
      const response = await apiRequest("POST", "/api/appointments", appointmentData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Appointment booked successfully!",
        description: `Your ${selectedPackage} appointment is confirmed for ${selectedDate} at ${selectedTimeSlot}.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      onBookingComplete(data);
    },
    onError: (error: any) => {
      toast({
        title: "Error booking appointment",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleBooking = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Please select date and time",
        description: "Both date and time slot are required.",
        variant: "destructive",
      });
      return;
    }

    const appointmentData = {
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      package: selectedPackage,
      duration: packageDurations[selectedPackage as keyof typeof packageDurations].toString(),
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      vehicleType: customerInfo.vehicleType,
      message: customerInfo.message,
    };

    bookingMutation.mutate(appointmentData);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    const [hour] = time.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum;
    return `${displayHour}:00 ${period}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-[hsl(0,0%,90%)] mb-2">
          Select Your Appointment Time
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Choose a date and time slot for your {selectedPackage} package
        </p>
      </div>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {availableDates.map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "default" : "outline"}
                className={`p-3 h-auto flex flex-col ${
                  selectedDate === date
                    ? "bg-[hsl(43,74%,49%)] text-white"
                    : "hover:bg-[hsl(43,74%,49%)] hover:text-white"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="text-sm font-medium">{formatDate(date)}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Slot Selection */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Available Time Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {generateTimeSlots().map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                    className={`p-3 h-auto flex flex-col relative ${
                      !slot.available
                        ? "opacity-50 cursor-not-allowed"
                        : selectedTimeSlot === slot.time
                        ? "bg-[hsl(43,74%,49%)] text-white"
                        : "hover:bg-[hsl(43,74%,49%)] hover:text-white"
                    }`}
                    onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                    disabled={!slot.available}
                  >
                    <div className="text-sm font-medium">{formatTime(slot.time)}</div>
                    <div className="text-xs opacity-75">
                      {slot.duration}h duration
                    </div>
                    {!slot.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <XCircle className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </Button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">
                  Package Information:
                </p>
                <p className="text-sm text-blue-600">
                  {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} Package - 
                  {packageDurations[selectedPackage as keyof typeof packageDurations]} hour duration
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Booking Summary */}
      {selectedDate && selectedTimeSlot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-[hsl(43,74%,49%)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{formatTime(selectedTimeSlot)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Package:</span>
                  <Badge className="bg-[hsl(43,74%,49%)] text-white">
                    {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>{packageDurations[selectedPackage as keyof typeof packageDurations]} hours</span>
                </div>
              </div>
              
              <Button
                onClick={handleBooking}
                disabled={bookingMutation.isPending}
                className="w-full mt-6 bg-gradient-to-r from-[hsl(43,74%,49%)] to-[hsl(43,74%,39%)] hover:from-[hsl(43,74%,39%)] hover:to-[hsl(43,74%,29%)] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}