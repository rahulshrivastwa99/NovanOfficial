import React, { useState, useEffect } from "react";
import { Plus, Minus, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const faqData = [
  {
    category: "Order & Tracking",
    questions: [
      {
        q: "How can I track my order?",
        a: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track it directly on our website under the 'Track Order' section.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 24 hours of placement, provided they haven't been dispatched. Please email Novan.clothing15@gmail.com with your Order ID to request a cancellation.",
      },
      {
        q: "Can I change my delivery address after placing an order?",
        a: "Address changes are only possible if the order has not yet been shipped. Please contact us immediately on WhatsApp at +91 9958849763 for urgent changes.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "What are the shipping charges?",
        a: "We offer free shipping on all prepaid orders above ₹999. For orders below that, a nominal shipping fee is applied at checkout.",
      },
      {
        q: "How long will it take for my order to arrive?",
        a: "Standard delivery takes 3-7 business days depending on your location. Metro cities usually receive orders within 3-4 days.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major Credit/Debit cards, UPI (Google Pay, PhonePe, etc.), and Net Banking via our secure Razorpay gateway.",
      },
      {
        q: "Is Cash on Delivery (COD) available?",
        a: "Yes, we offer COD on most pin codes within India for a small additional handling fee.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 7-day return policy for unused products with original tags. Please note that a mandatory unboxing video is required for any damage or mismatch claims.",
      },
      {
        q: "Why is an unboxing video mandatory?",
        a: "The unboxing video serves as proof in case of items lost in transit or wrong products received. It helps us process your claims faster with our logistics partners.",
      },
      {
        q: "When will I get my refund?",
        a: "Once the return is picked up and verified, refunds are processed via Razorpay within 5-7 business days to your original payment method.",
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
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
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl text-black mb-4">
              How can we help?
            </h1>
            <p className="text-gray-500 font-sans">
              Find answers to frequently asked questions about NovanClothing.
            </p>
          </motion.div>

          <div className="space-y-12">
            {faqData.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif text-xl mb-6 text-black border-b border-gray-100 pb-2">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((item, qIndex) => {
                    const uniqueId = `${catIndex}-${qIndex}`;
                    const isOpen = openIndex === uniqueId;
                    return (
                      <div
                        key={qIndex}
                        className={`group border rounded-xl transition-all duration-300 ${isOpen ? "border-black bg-gray-50" : "border-gray-200 bg-white hover:border-gray-400"}`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : uniqueId)}
                          className="w-full flex items-center justify-between text-left p-5 transition-colors"
                        >
                          <span className="font-sans text-sm font-semibold text-gray-900 leading-tight">
                            {item.q}
                          </span>
                          <div
                            className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          >
                            {isOpen ? (
                              <Minus size={18} className="text-black" />
                            ) : (
                              <Plus size={18} className="text-gray-400" />
                            )}
                          </div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed font-sans">
                                {item.a}
                              </div>
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

          {/* Still have questions? Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 p-8 bg-black rounded-2xl text-center text-white"
          >
            <h3 className="font-serif text-2xl mb-2">Still have questions?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Can't find the answer you're looking for? Reach out to our team.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="mailto:Novan.clothing15@gmail.com"
                className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                Email Us
              </a>
              <a
                href="https://wa.me/919958849763"
                className="border border-white text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors"
              >
                WhatsApp Support
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
