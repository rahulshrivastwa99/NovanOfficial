import React from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import privacyHero from "@/assets/category-accessories.jpg";

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

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Data Collection Principles",
      content:
        "At Novan, we believe privacy is the ultimate luxury. We collect only the personal information necessary to provide our bespoke services, including name, contact details, and payment information. This data is gathered strictly when you make a purchase, create an account, or subscribe to our newsletter.",
    },
    {
      title: "2. Usage of Information",
      content:
        "Your information allows us to process orders, manage your account, and personalize your experience. We do not sell, rent, or trade your personal information with third parties for their marketing purposes. Any data sharing is strictly limited to trusted partners essential for service delivery.",
    },
    {
      title: "3. Digital Security",
      content:
        "We implement rigorous security measures to protect your personal data against unauthorized access, alteration, or destruction. Our platform utilizes industry-standard encryption (SSL) for all sensitive data transmissions, ensuring your financial details remain secure.",
    },
    {
      title: "4. Cookie Policy",
      content:
        "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You have the option to accept or decline cookies through your browser settings, though this may limit your ability to use certain features of the Novan platform.",
    },
    {
      title: "5. Your Rights",
      content:
        "You retain full rights to your personal data. You may request access to, correction of, or deletion of your personal information at any time. To exercise these rights, please contact our dedicated data protection team at privacy@novan.com.",
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
              src={privacyHero}
              alt="Privacy Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40 z-10" />

          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
              <motion.div variants={fadeUp}>
                <p className="uppercase tracking-[0.3em] text-xs lg:text-sm mb-6 font-medium text-white/80">
                  Data Protection
                </p>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-none drop-shadow-lg"
              >
                Privacy Policy
              </motion.h1>
              <motion.div
                variants={fadeUp}
                className="w-24 h-[1px] bg-white/70 mx-auto mb-8"
              />
              <motion.p
                variants={fadeUp}
                className="font-body text-lg lg:text-xl max-w-xl mx-auto opacity-90 leading-relaxed font-light drop-shadow-md text-white/90"
              >
                Our commitment to protecting your digital footprint with the
                same care we apply to our garments.
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

export default PrivacyPolicy;
