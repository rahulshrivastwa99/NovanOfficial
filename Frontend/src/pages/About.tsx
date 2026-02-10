import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';
import aboutHero from '@/assets/category-women.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

const About = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="pt-16 lg:pt-20 min-h-screen">
        {/* Hero Split */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-24 order-2 lg:order-1"
          >
            <p className="luxury-button text-muted-foreground mb-4">Our Story</p>
            <h1 className="font-serif text-4xl lg:text-6xl leading-[1.1] mb-6">
              Redefining<br />Modern Luxury.
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed max-w-md">
              Born from a belief that true luxury lies in simplicity, Novan creates 
              timeless pieces that transcend seasons and trends.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-2 h-[50vh] lg:h-auto"
          >
            <img
              src={aboutHero}
              alt="Novan brand story"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* Values */}
        <section className="container py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <h3 className="font-serif text-2xl lg:text-3xl mb-6">Uncompromising Quality</h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Every piece in our collection is developed over months, not days. We work 
                with the finest mills in Italy, Portugal, and Japan to source materials that 
                feel extraordinary against the skin and age gracefully with wear.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <h3 className="font-serif text-2xl lg:text-3xl mb-6">Thoughtful Sustainability</h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Sustainability isn't a marketing tagline for us — it's the natural outcome 
                of making things that last. When you buy less but buy better, the planet 
                benefits. That's the Novan promise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-secondary">
          <div className="container py-20 lg:py-32 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="luxury-button text-muted-foreground mb-6">Our Philosophy</p>
              <blockquote className="font-serif text-2xl lg:text-4xl leading-snug italic">
                "We don't chase trends. We refine. Each season, we revisit our core 
                pieces — perfecting fits, upgrading fabrics, and ensuring every stitch 
                meets our exacting standards."
              </blockquote>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
