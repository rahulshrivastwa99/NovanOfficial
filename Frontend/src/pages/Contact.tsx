import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const Contact = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${isAtTop ? "bg-white/90 backdrop-blur-md border-b border-gray-100" : "bg-transparent"}`}
      >
        <Navbar />
      </div>
      <CartDrawer />
      <AuthModal />

      <main className="min-h-screen bg-white pt-32 px-4 md:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <h1 className="font-serif text-5xl text-black">Contact Us</h1>
              <div className="space-y-8">
                <div className="flex gap-5 items-start">
                  <Mail size={24} className="mt-1" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Email Support
                    </h3>
                    <p className="text-black font-medium">
                      Novan.clothing15@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <Phone size={24} className="mt-1" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Phone / WhatsApp
                    </h3>
                    <p className="text-black font-medium">+91 9958849763</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <MapPin size={24} className="mt-1" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Headquarters
                    </h3>
                    <p className="text-black font-medium leading-relaxed">
                      Novan Pvt Ltd.
                      <br />
                      Delhi, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <Clock size={24} className="mt-1" />
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">
                      Support Hours
                    </h3>
                    <p className="text-black font-medium">
                      Mon - Sat | 10:00 AM - 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    required
                    className="w-full bg-white border border-gray-200 rounded-md p-4 text-sm focus:border-black outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border border-gray-200 rounded-md p-4 text-sm focus:border-black outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full bg-white border border-gray-200 rounded-md p-4 text-sm focus:border-black outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-4 rounded-md font-bold text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
