import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import termsHero from "@/assets/category-men.jpg";

const luxuryEase = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.15, ease: luxuryEase },
  }),
};

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // White BG at top, Transparent when scrolling down
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "1. General Agreement",
      content:
        "By accessing and using the Novan website, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using this site.",
    },
    {
      title: "2. Payments & Billing",
      content:
        "We use Razorpay as our authorized payment gateway. All payments are processed securely. You agree to provide current, complete, and accurate purchase information for all purchases.",
    },
    {
      title: "3. Shipping & Delivery",
      content:
        "Orders are typically processed within 1-2 business days. Standard delivery takes between 3-7 business days depending on the location within India. We are not liable for delays caused by the courier partner or Force Majeure events.",
    },
    {
      title: "4. Returns & Refunds",
      content:
        "Return requests must be raised within 7 days of delivery. Once approved, refunds are processed within 5-7 business days to the original method of payment.",
    },
    {
      title: "5. Governing Law (Jurisdiction)",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.",
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
          {/* BACK BUTTON: Shifted Up */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-8 left-6 z-30 flex items-center gap-2 text-white hover:text-gray-200 transition-colors group"
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
              src={termsHero}
              alt="Terms Background"
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
                className="font-serif text-5xl md:text-7xl mb-6 leading-none"
              >
                Terms & Conditions
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="font-body text-lg opacity-90 max-w-lg mx-auto"
              >
                Legal framework and usage rules for the Novan platform.
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <h3 className="font-serif text-2xl mb-4 pl-6 border-l-2 border-gray-300 group-hover:border-black transition-colors">
                  {section.title}
                </h3>
                <p className="font-body text-gray-600 leading-relaxed text-lg pl-6">
                  {section.content}
                </p>
                {index !== sections.length - 1 && (
                  <div className="h-[1px] bg-gray-200 mt-12 w-full" />
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
