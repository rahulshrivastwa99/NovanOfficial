import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import faqHero from "@/assets/category-women.jpg";

const luxuryEase = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.15, ease: luxuryEase },
  }),
};

const faqData = [
  {
    category: "Shopping & Orders",
    questions: [
      {
        q: "Do I need an account to place an order?",
        a: "No, you can shop as a guest. However, creating an account allows you to track your orders.",
      },
      {
        q: "Can I cancel my order?",
        a: "You may request to cancel your order within 24 hours of placement, provided it has not yet been shipped.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How long will it take to receive my order?",
        a: "Domestic orders (India) typically arrive within 3-7 business days. International timelines vary between 10-15 days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to select countries. Shipping costs are calculated at checkout.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery for unworn items with tags attached.",
      },
      {
        q: "How long do refunds take?",
        a: "Once approved, refunds are credited to your original payment method within 5-7 business days.",
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleQuestion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              src={faqHero}
              alt="FAQ"
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
                FAQ
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="font-body text-lg opacity-90"
              >
                Common questions about our products and policies.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="container max-w-4xl mx-auto px-4 py-20">
          <div className="space-y-20">
            {faqData.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="font-serif text-2xl mb-8 border-b border-gray-200 pb-4">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((item, qIndex) => {
                    const uniqueId = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === uniqueId;
                    return (
                      <div
                        key={qIndex}
                        className="group border-b border-gray-100 last:border-0 pb-4"
                      >
                        <button
                          onClick={() => toggleQuestion(uniqueId)}
                          className="w-full flex items-center justify-between text-left py-4 focus:outline-none"
                        >
                          <span
                            className={`font-body text-lg ${isOpen ? "text-black font-medium" : "text-gray-600"}`}
                          >
                            {item.q}
                          </span>
                          <span
                            className={`p-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          >
                            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                          </span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="pb-6 pr-8 text-gray-500 font-body leading-relaxed">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
