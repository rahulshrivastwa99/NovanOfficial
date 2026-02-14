import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const About = () => {
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

      <main className="min-h-screen bg-white pt-32 px-4 md:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="font-serif text-5xl text-black leading-tight mb-4">
              Novan: Where Your Weird is Your Superpower
            </h1>
            <p className="text-xl text-gray-500 font-serif leading-relaxed italic">
              "We're not about fitting in. We're about owning your crazy, loud,
              unapologetically you."
            </p>
          </motion.div>

          <div className="space-y-12 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Every blank wall's a canvas, every hallway a runway. Novan is your
              antidote to the mundane. We're streetwear for the next generation,
              the generation that turns curiosity into fire, imagination into
              fuel. We're the vocal minority, the square pegs in the round
              world, redefining cool with every eccentric move.
            </p>

            <section className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
              <h3 className="font-serif text-2xl text-black mb-4">
                The Novan Motto
              </h3>
              <p className="italic">"Be you. Be Novan."</p>
              <p className="mt-4">
                Often, a person who does things differently is termed as
                "weirdo". Truth be told, a weirdo is simply someone open to
                exploring their life on their terms and not worried about
                fitting in the box load of norms. We embrace that inner
                weirdness with style!
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-l-4 border-black pl-6">
                <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400 mb-2">
                  Our Reach
                </h4>
                <p className="text-xl font-serif text-black">
                  Serving the entire nation from our Delhi headquarters.
                </p>
              </div>
              <div className="border-l-4 border-black pl-6">
                <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400 mb-2">
                  Our Goal
                </h4>
                <p className="text-xl font-serif text-black">
                  Providing unparalleled prints and out-of-the-ordinary styles.
                </p>
              </div>
            </div>

            <p>
              Unparalleled prints, out-of-the-ordinary styles, head-turning
              graphics? Novan's like your wardrobe on fleek. Join the tribe,
              unleash your inner weirdo, and make every damn day unskippable.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
