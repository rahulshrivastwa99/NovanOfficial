import React from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import refundHero from "@/assets/category-accessories.jpg";

const luxuryEase = [0.22, 1, 0.36, 1];

// FIX: Added default value (i = 0)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.15, ease: luxuryEase },
  }),
};

const RefundCancellation = () => {
  const sections = [
    {
      title: "Order Cancellation Window",
      content:
        "We understand that plans change. You may request to cancel your order within 2 hours of placement. After this window, our fulfillment team will have already begun processing your dispatch, and cancellation will no longer be possible. To cancel, please email support immediately with the subject 'URGENT: CANCEL ORDER'.",
    },
    {
      title: "Refund Eligibility",
      content:
        "To be eligible for a return and refund, your item must be in the same condition that you received it: unworn, unwashed, and in its original packaging with all tags intact. We reserve the right to deny refunds for items that show signs of wear, scent, or damage.",
    },
    {
      title: "Refund Timeline",
      content:
        "Once your return is received and inspected at our atelier (typically within 72 hours of receipt), we will notify you of the approval or rejection of your refund. If approved, a credit will strictly be applied to your original method of payment. Please allow your bank 5-10 business days to post this credit to your account.",
    },
    {
      title: "Exceptions & Final Sale",
      content:
        "Only regular-priced items may be refunded. Items marked as 'Final Sale,' 'Sample Sale,' or 'Archive' are not eligible for return, refund, or exchange. Gift cards are non-refundable.",
    },
  ];

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="min-h-screen bg-background">
        <section className="relative h-[85vh] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: luxuryEase }}
          >
            <img
              src={refundHero}
              alt="Refunds Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40 z-10" />

          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
              <motion.div variants={fadeUp}>
                <p className="uppercase tracking-[0.3em] text-xs lg:text-sm mb-6 font-medium text-white/80">
                  Financial Policy
                </p>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-none drop-shadow-lg"
              >
                Refunds & <br className="hidden md:block" />
                Cancellation
              </motion.h1>
              <motion.div
                variants={fadeUp}
                className="w-24 h-[1px] bg-white/70 mx-auto mb-8"
              />
              <motion.p
                variants={fadeUp}
                className="font-body text-lg lg:text-xl max-w-xl mx-auto opacity-90 leading-relaxed font-light drop-shadow-md text-white/90"
              >
                Transparent policies regarding order modifications and financial
                returns.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="container max-w-4xl mx-auto px-4 md:px-6 py-20 lg:py-32">
          <div className="space-y-20">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: luxuryEase,
                }}
                className="group"
              >
                <h3 className="font-serif text-2xl md:text-3xl mb-6 text-foreground pl-6 border-l-2 border-foreground/30 group-hover:border-foreground transition-colors duration-500">
                  {section.title}
                </h3>
                <div className="pl-6 md:pl-8">
                  <p className="font-body text-muted-foreground leading-8 text-lg">
                    {section.content}
                  </p>
                </div>
                {index !== sections.length - 1 && (
                  <div className="h-[1px] bg-border mt-16 w-full opacity-60" />
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-secondary/50 rounded-xl p-12 text-center mt-20"
            >
              <h4 className="font-serif text-2xl mb-4">
                Have a specific question?
              </h4>
              <Link
                to="/contact"
                className="inline-block border-b border-foreground pb-1 uppercase tracking-widest text-xs hover:opacity-70 transition-opacity"
              >
                Contact Concierge
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RefundCancellation;
