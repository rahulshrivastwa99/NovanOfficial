import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import hero1 from '@/assets/hero1.jpeg';
import hero2 from '@/assets/hero.jpg';
import hero3 from '@/assets/category-men.jpg';

const slides = [
  {
    id: 1,
    image: hero1,
    title: "ELEVATE YOUR STYLE",
    subtitle: "Redefining modern luxury, piece by piece",
    cta: "Explore Collection",
    link: "/shop"
  },
  {
    id: 2,
    image: hero2,
    title: "ELEGANCE FOR HER",
    subtitle: "Sophisticated styles for every occasion",
    cta: "Shop Women",
    link: "/shop?category=women"
  },
  {
    id: 3,
    image: hero3,
    title: "TIMELESS MENSWEAR",
    subtitle: "Crafted for the modern gentleman",
    cta: "Shop Women",
    link: "/shop?category=women"
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl">
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6"
          >
            {slides[current].title}
          </motion.h1>
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-white/90 mb-10 tracking-wider"
          >
            {slides[current].subtitle}
          </motion.p>
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to={slides[current].link}
              className="inline-flex items-center gap-2 border border-white/80 text-white px-8 py-4 luxury-button hover:bg-white hover:text-black transition-colors duration-300"
            >
              {slides[current].cta} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors z-20 hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors z-20 hidden md:block"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
