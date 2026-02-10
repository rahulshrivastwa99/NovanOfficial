import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  const inputClass =
    'w-full bg-transparent border-0 border-b border-border pb-3 font-body text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground';

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="pt-16 lg:pt-20 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-24 bg-secondary"
          >
            <p className="luxury-button text-muted-foreground mb-4">Get in Touch</p>
            <h1 className="font-serif text-4xl lg:text-5xl mb-10">Contact Us</h1>

            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <Mail size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-body text-sm font-medium mb-1">Email</h3>
                  <p className="font-body text-sm text-muted-foreground">hello@novan.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-body text-sm font-medium mb-1">Address</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    123 Fashion District, SoHo<br />New York, NY 10012
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-body text-sm font-medium mb-1">Phone</h3>
                  <p className="font-body text-sm text-muted-foreground">+1 (212) 555-0199</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <a href="#" aria-label="Instagram"><Instagram size={18} className="text-muted-foreground hover:text-foreground transition-colors" /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} className="text-muted-foreground hover:text-foreground transition-colors" /></a>
              <a href="#" aria-label="Facebook"><Facebook size={18} className="text-muted-foreground hover:text-foreground transition-colors" /></a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center px-8 lg:px-20 py-16 lg:py-24"
          >
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
              <div>
                <label className="luxury-button text-muted-foreground block mb-3">Name</label>
                <input required placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className="luxury-button text-muted-foreground block mb-3">Email</label>
                <input type="email" required placeholder="your@email.com" className={inputClass} />
              </div>
              <div>
                <label className="luxury-button text-muted-foreground block mb-3">Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="How can we help?"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="bg-foreground text-background px-10 py-4 luxury-button hover:bg-accent transition-colors w-full lg:w-auto"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
