
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ isOpen, onClose, onConfirmExit }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    "I don't wish to share my contact details",
    "I found a better price or product elsewhere",
    "I want to add or modify items in my cart",
    "I find pricing too high or unclear",
    "I am not sure about quality and return/exchange policy",
    "I am facing issues in applying coupons"
  ];

  const handleReasonChange = (reason: string) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason) 
        : [...prev, reason]
    );
  };

  const handleSupportSubmit = async () => {
    // Only submit if reasons are selected, otherwise just close/redirect
    if (selectedReasons.length > 0) {
        setIsSubmitting(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            await axios.post(`${backendUrl}/api/orders/abandonment`, {
                reasons: selectedReasons,
                deviceInfo: navigator.userAgent
            });
        } catch (error) {
            console.error("Failed to submit feedback", error);
        } finally {
            setIsSubmitting(false);
            onConfirmExit(); // Proceed with exit
        }
    } else {
        onConfirmExit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl overflow-hidden relative"
          >
            <button 
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
                <X size={20} />
            </button>

            <h2 className="font-serif text-xl font-bold mb-1">Wait, are you sure?</h2>
            <p className="text-sm font-medium text-orange-500 mb-4">
                Products in huge demand might run <span className="font-bold">Out of Stock</span>
            </p>

            <p className="text-sm text-gray-600 mb-4">Let us know what went wrong.</p>

            <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto">
                {reasons.map((reason) => (
                    <label key={reason} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center mt-0.5">
                            <input
                                type="checkbox"
                                className="peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground accent-black"
                                checked={selectedReasons.includes(reason)}
                                onChange={() => handleReasonChange(reason)}
                            />
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-black transition-colors leading-tight">
                            {reason}
                        </span>
                    </label>
                ))}
            </div>

            <button
                onClick={handleSupportSubmit}
                disabled={isSubmitting}
                className="w-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 font-bold py-3 rounded-lg text-sm transition-colors flex justify-center items-center gap-2"
            >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                Do you want to still cancel the payment?
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;
