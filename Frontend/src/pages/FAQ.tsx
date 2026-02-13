import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import faqHero from "@/assets/category-women.jpg";

const luxuryEase = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
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
        a: "No, you can shop as a guest. However, creating an account allows you to track your orders, save your shipping details for faster checkout, and access your purchase history.",
      },
      {
        q: "Can I modify my order after placing it?",
        a: "We process orders quickly. You have a 2-hour window after placing your order to request changes or cancellations. Please contact support immediately.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How long will it take to receive my order?",
        a: "Domestic orders typically arrive within 3-5 business days. International shipping can take between 7-14 business days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, NOVAN ships to over 100 countries worldwide. Shipping costs are calculated at checkout.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and have original tags attached.",
      },
      {
        q: "How long do refunds take to process?",
        a: "Refunds are processed within 3-5 business days of receipt and typically appear on your statement within 5-10 business days.",
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="min-h-screen bg-background">
        {/* --- FULL WIDTH HERO --- */}
        <section className="relative h-[85vh] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: luxuryEase }}
          >
            <img
              src={faqHero}
              alt="FAQ Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40 z-10" />

          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
            >
              <motion.div variants={fadeUp}>
                <p className="uppercase tracking-[0.3em] text-xs lg:text-sm mb-6 font-medium text-white/80">
                  Support Center
                </p>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-none drop-shadow-lg"
              >
                Frequently <br className="hidden md:block" />
                Asked
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="w-24 h-[1px] bg-white/70 mx-auto mb-8"
              />

              <motion.p
                variants={fadeUp}
                className="font-body text-lg lg:text-xl max-w-xl mx-auto opacity-90 leading-relaxed font-light drop-shadow-md text-white/90"
              >
                Find answers to common questions about our products and
                policies.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container max-w-4xl mx-auto px-4 md:px-6 py-20 lg:py-32">
          <div className="space-y-20">
            {faqData.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: catIndex * 0.1,
                  ease: luxuryEase,
                }}
              >
                <h3 className="font-serif text-2xl mb-8 border-b border-border pb-4">
                  {category.category}
                </h3>

                <div className="space-y-4">
                  {category.questions.map((item, qIndex) => {
                    const uniqueId = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === uniqueId;

                    return (
                      <div
                        key={qIndex}
                        className="group border-b border-border last:border-0 pb-4"
                      >
                        <button
                          onClick={() => toggleQuestion(uniqueId)}
                          className="w-full flex items-center justify-between text-left py-4 focus:outline-none"
                        >
                          <span
                            className={`font-body text-lg transition-colors duration-300 ${isOpen ? "text-foreground font-medium" : "text-foreground/80"}`}
                          >
                            {item.q}
                          </span>
                          <span
                            className={`p-1 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="pb-6 pr-8 text-muted-foreground font-body leading-relaxed">
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

            <div className="text-center pt-12">
              <p className="text-muted-foreground mb-4">Still need help?</p>
              <Link
                to="/contact"
                className="luxury-button border-b border-foreground pb-1 hover:text-muted-foreground transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;
