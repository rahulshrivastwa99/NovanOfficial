import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'sonner';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletter');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenNewsletter', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
    toast.success('Thank you for subscribing!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" 
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-background p-6 md:p-8 lg:p-12 shadow-2xl text-center border border-border"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl lg:text-3xl mb-3">Join the Club</h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent text-center"
              />
              <button
                type="submit"
                className="w-full bg-foreground text-background py-3 luxury-button hover:bg-accent transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="mt-4 text-xs text-muted-foreground">
              By subscribing you agree to our Terms & Conditions.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
