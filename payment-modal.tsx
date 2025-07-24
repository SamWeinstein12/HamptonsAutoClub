import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, DollarSign, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  selectedPackage: string;
  packagePrice: number;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  onPaymentComplete, 
  selectedPackage, 
  packagePrice 
}: PaymentModalProps) {
  const { toast } = useToast();



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-white">
            Service Pricing
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
            Review your selected package details before booking.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Package Summary */}
          <Card className="bg-gray-50 dark:bg-gray-800 border-0">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{selectedPackage}</h3>
              
              <div className="space-y-2">
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Service Price:</span>
                    <span className="text-[hsl(43,74%,49%)]">${packagePrice}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Info */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Payment Information:</h4>
            <ul className="space-y-1">
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Check className="w-4 h-4 text-green-500" />
                Payment due at time of service
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Check className="w-4 h-4 text-green-500" />
                Cash or card accepted
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Check className="w-4 h-4 text-green-500" />
                24-hour cancellation notice required
              </li>
            </ul>
          </div>

          {/* Payment Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={() => {
                toast({
                  title: "Pay at Service",
                  description: "You can pay when we arrive. Redirecting to booking...",
                });
                onPaymentComplete(); // This will trigger Calendly to open
              }}
              className="w-full bg-gradient-to-r from-[hsl(43,74%,49%)] to-[hsl(43,74%,39%)] hover:from-[hsl(43,74%,39%)] hover:to-[hsl(43,74%,29%)] text-white font-semibold py-3"
            >
              Continue to Booking
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Cancellations must be made 24 hours in advance.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}