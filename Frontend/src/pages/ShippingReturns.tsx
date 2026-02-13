import React from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import shippingHero from "@/assets/category-men.jpg";

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

const ShippingReturns = () => {
  const sections = [
    {
      title: "Domestic Shipping",
      content:
        "We offer complimentary standard shipping on all domestic orders over $200. Please allow 1-2 business days for our atelier to prepare your order. Standard shipping typically takes 3-5 business days. Express Overnight shipping is available for a flat rate of $25 if placed before 12 PM EST.",
    },
    {
      title: "International Duties",
      content:
        "Novan ships to over 100 countries worldwide. International shipping rates are calculated at checkout based on weight and destination. Please note: International orders are shipped Delivery Duty Unpaid (DDU). Customs duties and taxes are not included in the price at checkout and are the sole responsibility of the recipient upon delivery.",
    },
    {
      title: "Lost or Stolen Packages",
      content:
        "Novan is not responsible for packages that are lost or stolen after they have been marked as 'Delivered' by the carrier. We highly recommend selecting a secure delivery location. If your package is missing in transit, please contact us immediately so we can file a claim with the carrier on your behalf.",
    },
    {
      title: "Return Initiation",
      content:
        "We accept returns within 30 days of delivery. To initiate a return, please visit our digital Returns Center. A pre-paid shipping label will be generated for domestic returns (a $10 restocking fee will be deducted from your refund). International customers are responsible for their own return shipping costs.",
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
              src={shippingHero}
              alt="Shipping Background"
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
                  Global Logistics
                </p>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-none drop-shadow-lg"
              >
                Shipping & <br className="hidden md:block" />
                Returns
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="w-24 h-[1px] bg-white/70 mx-auto mb-8"
              />

              <motion.p
                variants={fadeUp}
                className="font-body text-lg lg:text-xl max-w-xl mx-auto opacity-90 leading-relaxed font-light drop-shadow-md text-white/90"
              >
                Ensuring your Novan pieces arrive safely, anywhere in the world.
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ShippingReturns;
