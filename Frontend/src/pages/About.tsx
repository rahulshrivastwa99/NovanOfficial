import React from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import aboutHero from "@/assets/category-women.jpg";

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

const About = () => {
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
              src={aboutHero}
              alt="About Background"
              className="w-full h-full object-cover object-top"
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
                  Est. 2024
                </p>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-none drop-shadow-lg"
              >
                The Story of <br className="hidden md:block" />
                Novan
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="w-24 h-[1px] bg-white/70 mx-auto mb-8"
              />

              <motion.p
                variants={fadeUp}
                className="font-body text-lg lg:text-xl max-w-xl mx-auto opacity-90 leading-relaxed font-light drop-shadow-md text-white/90"
              >
                Born from a belief that true luxury lies in simplicity and
                restraint.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="container max-w-4xl mx-auto px-4 md:px-6 py-20 lg:py-32">
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
              <p className="font-body text-muted-foreground leading-9 text-lg md:text-xl">
                In a world of fast fashion and fleeting trends, Novan stands
                still. We believe that luxury isn't about excess, but about the
                elimination of the unnecessary. Every stitch, every seam, and
                every silhouette is calculated to provide an effortless sense of
                elegance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="font-serif text-2xl text-foreground">
                  Artisan Craftsmanship
                </h3>
                <p className="font-body text-muted-foreground leading-8 text-lg">
                  Our pieces are brought to life in small, family-owned ateliers
                  in Italy and Portugal. We partner with artisans who have honed
                  their craft over generations, ensuring that every garment
                  meets our exacting standards of quality.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-2xl text-foreground">
                  Conscious Creation
                </h3>
                <p className="font-body text-muted-foreground leading-8 text-lg">
                  Sustainability is at the core of our design process. We source
                  only the finest organic cottons, linens, and ethically sourced
                  wools. We create pieces meant to last a lifetime, not just a
                  season.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-secondary/30 p-16 text-center rounded-[2rem] mt-12"
            >
              <blockquote className="font-serif text-2xl md:text-4xl italic text-foreground mb-6 leading-tight">
                "Simplicity is the ultimate sophistication."
              </blockquote>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                — The Novan Design Team
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
