import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const Contact = () => {
  const navigate = useNavigate();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // White at top, Transparent when scrolling
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-gray-300 pb-3 font-body text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400";

  return (
    <>
      {/* NAVBAR: White at Top, Transparent when Scrolling */}
      <div
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isAtTop ? "bg-white border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <Navbar />
      </div>

      <CartDrawer />
      <AuthModal />

      <main className="min-h-screen pt-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center px-8 lg:px-20 py-12 bg-gray-50 relative"
          >
            {/* BACK TO HOME BUTTON (Dark text for light background) */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="uppercase tracking-widest text-xs font-medium">
                Back to Home
              </span>
            </button>

            <h1 className="font-serif text-4xl lg:text-5xl mb-10 text-black mt-12 lg:mt-0">
              Contact Us
            </h1>

            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <Mail size={20} className="text-gray-600 mt-1" />
                <div>
                  <h3 className="font-body font-medium mb-1">Email</h3>
                  <p className="text-gray-600">support@novan.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin size={20} className="text-gray-600 mt-1" />
                <div>
                  <h3 className="font-body font-medium mb-1">
                    Registered Address
                  </h3>
                  <p className="text-gray-600">
                    Novan Pvt Ltd.
                    <br />
                    123, Fashion Street, Bandra West
                    <br />
                    Mumbai, Maharashtra - 400050, India
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={20} className="text-gray-600 mt-1" />
                <div>
                  <h3 className="font-body font-medium mb-1">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <a href="#" aria-label="Instagram">
                <Instagram
                  size={18}
                  className="text-gray-500 hover:text-black transition-colors"
                />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter
                  size={18}
                  className="text-gray-500 hover:text-black transition-colors"
                />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook
                  size={18}
                  className="text-gray-500 hover:text-black transition-colors"
                />
              </a>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center px-8 lg:px-20 py-12"
          >
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
              <div>
                <label className="text-gray-500 block mb-2 text-xs uppercase tracking-wider">
                  Name
                </label>
                <input
                  required
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-2 text-xs uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-2 text-xs uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help?"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-10 py-4 hover:bg-gray-800 transition-colors w-full"
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
