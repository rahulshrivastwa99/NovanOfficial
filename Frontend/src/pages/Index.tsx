import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import categoryMen from '@/assets/category-men.jpg';
import categoryWomen from '@/assets/category-women.jpg';
import categoryAccessories from '@/assets/category-accessories.jpg';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProducts } from '@/store/productSlice';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';

const categories = [
  { label: 'Men', image: categoryMen, to: '/shop?category=men' },
  { label: 'Women', image: categoryWomen, to: '/shop?category=women' },
  { label: 'Accessories', image: categoryAccessories, to: '/shop?category=accessories' },
];

const Index = () => {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Safely filter best sellers from the potentially empty or loading products array
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8); // Limit to 8 for the homepage
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Categories */}
        <section className="container py-20 lg:py-32">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-2xl lg:text-3xl text-center mb-12 lg:mb-16"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link key={cat.label} to={cat.to}>
                <motion.div
                  className="relative aspect-[3/4] overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover image-zoom group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-end p-8">
                    <h3 className="font-serif text-2xl text-primary-foreground tracking-wider">{cat.label}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="bg-secondary py-20 lg:py-32">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-2xl lg:text-3xl">Best Sellers</h2>
              <Link to="/shop" className="luxury-button text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {bestSellers.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="container py-20 lg:py-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl">New Arrivals</h2>
            <Link to="/shop" className="luxury-button text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="container py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="luxury-button text-muted-foreground mb-6"
            >
              Our Philosophy
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-2xl lg:text-4xl leading-relaxed mb-8"
            >
              We believe in the power of restraint. Each piece is designed to transcend seasons, 
              crafted from the finest materials, and built to become a cornerstone of your wardrobe.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/about"
                className="luxury-button text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;
