import React, { useState, useEffect } from "react";
import { Clock, Truck, Globe, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const ShippingReturns = () => {
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
            className="mb-10"
          >
            <h1 className="font-serif text-4xl text-black leading-tight mb-2">
              Shipping Policy
            </h1>
          </motion.div>

          <div className="space-y-12">
            <section>
              <h3 className="font-serif text-2xl text-black mb-4 flex items-center gap-3">
                <Globe /> Shipping Charges
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Shipping is free for all prepaid orders. However, there is a{" "}
                <strong>₹100 cash handling fee</strong> for Cash on Delivery
                (COD) orders, which is non-refundable if you return your items.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-2xl text-black mb-4 flex items-center gap-3">
                <Clock /> Order Delivery Time
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're fast! We typically process orders within{" "}
                <strong>24-48 hours</strong> because we manage our own stock at
                our Delhi headquarters. Delivery times depend on your location:
              </p>
              <ul className="list-disc pl-10 mt-4 space-y-2 text-gray-600">
                <li>
                  <strong>Delhi NCR:</strong> 1-2 business days.
                </li>
                <li>
                  <strong>Metros:</strong> Your order will arrive in 1-4 days
                  after shipping.
                </li>
                <li>
                  <strong>Rest of India:</strong> Your package will be there in
                  4-7 days after shipping.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-serif text-2xl text-black mb-4 flex items-center gap-3">
                <MapPin /> Shipping Locations
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We ship all over India. We're on a mission to clothe the entire
                nation starting from our base in Delhi, India.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-2xl text-black mb-4 flex items-center gap-3">
                <Search /> Tracking Your Order
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We'll send you an order ID by email and WhatsApp (
                <strong>+91 9958849763</strong>). Use that ID to track your
                package.
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <h3 className="font-serif text-2xl text-black mb-4 flex items-center gap-3">
                <Truck /> Reverse Pickup
              </h3>
              <p className="text-gray-600 leading-relaxed">
                In cases where the customer’s location is non-serviceable for
                reverse pickup by our courier partners, we may request the
                customer to self-ship the product to our return address. Courier
                charges will be reimbursed upon submission of a valid receipt to{" "}
                <strong>Novan.clothing15@gmail.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ShippingReturns;
