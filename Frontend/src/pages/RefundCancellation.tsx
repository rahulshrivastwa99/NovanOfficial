import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import refundHero from "@/assets/category-accessories.jpg";

const luxuryEase = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.15, ease: luxuryEase },
  }),
};

const RefundCancellation = () => {
  const navigate = useNavigate();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "Cancellation Policy",
      content:
        "You may cancel your order within 24 hours of placing it, provided it has not been shipped. To cancel, email support@novan.com with the subject 'CANCEL ORDER'.",
    },
    {
      title: "Refund Eligibility",
      content:
        "Returns are accepted within 7 days of delivery. Items must be unworn, unwashed, and with tags attached. We reserve the right to deny refunds for damaged items.",
    },
    {
      title: "Refund Timeline",
      content:
        "Once your return is inspected and approved, the refund will be processed to your original payment method (Card/UPI/Netbanking) within 5-7 business days.",
    },
    {
      title: "Late Refunds",
      content:
        "If you haven't received your refund after 10 days, please check with your bank. Processing times may vary.",
    },
  ];

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isAtTop ? "bg-white border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <Navbar />
      </div>

      <CartDrawer />
      <AuthModal />

      <main className="min-h-screen bg-background pt-20">
        <section className="relative h-[60vh] w-full overflow-hidden">
          <button
            onClick={() => navigate("/")}
            className="absolute top-16 left-6 z-30 flex items-center gap-2 text-white hover:text-gray-200 transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="uppercase tracking-widest text-xs font-medium">
              Back to Home
            </span>
          </button>

          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: luxuryEase }}
          >
            <img
              src={refundHero}
              alt="Refunds"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-7xl mb-6"
              >
                Refunds & Cancellation
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="font-body text-lg opacity-90"
              >
                Transparent financial policies.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="container max-w-4xl mx-auto px-4 py-20">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <h3 className="font-serif text-2xl mb-4 pl-6 border-l-2 border-gray-300 group-hover:border-black transition-colors">
                  {section.title}
                </h3>
                <p className="font-body text-gray-600 leading-relaxed text-lg pl-6">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RefundCancellation;
