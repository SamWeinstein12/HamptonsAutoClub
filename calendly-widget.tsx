import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface CalendlyWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    vehicleType: string;
    message: string;
  };
}

export default function CalendlyWidget({ isOpen, onClose, selectedPackage, customerInfo }: CalendlyWidgetProps) {
  useEffect(() => {
    if (isOpen) {
      // Load Calendly script if not already loaded
      if (!window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
          initializeCalendly();
        };
        document.body.appendChild(script);
      } else {
        initializeCalendly();
      }
    }
  }, [isOpen]);

  const initializeCalendly = () => {
    if (window.Calendly) {
      const calendlyContainer = document.getElementById('calendly-inline-widget');
      if (calendlyContainer) {
        // Clear any existing content
        calendlyContainer.innerHTML = '';
        
        // Initialize Calendly widget
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/hamptonsautoclub',
          parentElement: calendlyContainer,
          prefill: {
            name: customerInfo.name,
            email: customerInfo.email,
            customAnswers: {
              a1: customerInfo.phone,
              a2: customerInfo.vehicleType,
              a3: selectedPackage,
              a4: customerInfo.message
            }
          },
          utm: {
            utmSource: 'hamptons-auto-club',
            utmMedium: 'website',
            utmCampaign: selectedPackage.toLowerCase()
          }
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-[hsl(213,19%,25%)] dark:text-white">
            Book Your {selectedPackage} Service
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
            Choose your preferred time slot and we'll come to you!
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-4">
          <div 
            id="calendly-inline-widget" 
            style={{ minWidth: '320px', height: '600px' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Extend window type to include Calendly
declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        };
        utm?: {
          utmSource?: string;
          utmMedium?: string;
          utmCampaign?: string;
        };
      }) => void;
    };
  }
}