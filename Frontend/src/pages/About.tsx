import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import aboutHero from "@/assets/category-women.jpg";

const luxuryEase = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.15, ease: luxuryEase },
  }),
};

const About = () => {
  const navigate = useNavigate();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              src={aboutHero}
              alt="About"
              className="w-full h-full object-cover object-top"
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
                The Story of <br className="hidden md:block" /> Novan
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="font-body text-lg opacity-90"
              >
                Born from a belief that true luxury lies in simplicity.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="container max-w-4xl mx-auto px-4 md:px-6 py-20">
          <div className="space-y-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-serif text-3xl md:text-5xl mb-8 text-foreground">
                Redefining Modern Luxury
              </h2>
              <p className="font-body text-gray-600 leading-9 text-lg md:text-xl">
                Founded in 2024, Novan was created to bridge the gap between
                high fashion and everyday wear. We noticed a void in the market
                for clothing that feels as good as it looks—garments that
                respect the body's movement while maintaining a sharp,
                structured silhouette.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif text-2xl mb-4">Our Philosophy</h3>
                <p className="text-gray-600 leading-relaxed">
                  We believe in "Less, but better." In a world of fast fashion,
                  we slow down. Each collection is released in limited
                  quantities to ensure quality and reduce waste. We design for
                  longevity, not just for the season.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif text-2xl mb-4">The Craft</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every Novan piece is crafted with precision. From the
                  selection of premium fabrics to the final stitch, we partner
                  with ethical factories that prioritize worker welfare and
                  environmental sustainability.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
