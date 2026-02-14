import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Video, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const RefundCancellation = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${isAtTop ? "bg-white/90 backdrop-blur-md border-b border-gray-100" : "bg-transparent"}`}
      >
        <Navbar />
      </div>
      <CartDrawer />
      <AuthModal />

      <main className="min-h-screen bg-white pt-28 px-4 md:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="font-serif text-4xl text-black leading-tight mb-2">
              Refund & Replacement Policy
            </h1>
            <p className="text-gray-500 text-sm">
              We want you to love your Novan look.
            </p>
          </motion.div>

          <div className="space-y-12">
            <section>
              <h3 className="font-serif text-2xl text-black mb-4 flex items-center gap-3">
                <RefreshCcw /> Return & Replacement
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Didn’t like your Novan look? No worries, you can return or
                exchange your purchase within{" "}
                <strong>7 days of delivery</strong>, free of charge for
                exchanges. We want you to love your look.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-black mb-2">Prepaid Orders</h4>
                  <p className="text-sm text-gray-600">
                    Refunded in full to your original payment method via
                    Razorpay within 5-7 business days.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-black mb-2">COD Orders</h4>
                  <p className="text-sm text-gray-600">
                    Refunded to your bank account. You will need to provide
                    bank/UPI details. COD charges are non-refundable.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-black text-white p-8 rounded-2xl">
              <h3 className="font-serif text-2xl mb-4 flex items-center gap-3">
                <Video /> Mandatory Unboxing Video
              </h3>
              <p className="text-gray-300 leading-relaxed">
                For cases of defective/damaged products or insufficient quantity
                delivered, it is{" "}
                <strong>mandatory to provide an unboxing video</strong>. Just
                shoot us a message on WhatsApp at{" "}
                <strong>+91 9958849763</strong> with the video/pics and we'll
                send a brand new one ASAP.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-2xl text-black mb-4">
                How to Exchange
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Choose a new item you love. If it's more expensive, pay the
                difference at checkout via Razorpay. If it's less expensive,
                we'll send you a gift card for the remaining amount.
              </p>
            </section>

            <section className="text-center">
              <div className="flex justify-center gap-4">
                <a
                  href="mailto:Novan.clothing15@gmail.com"
                  className="bg-black text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest text-xs"
                >
                  Email Support
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RefundCancellation;
