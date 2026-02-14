import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import categoryMen from "@/assets/category-men.jpg";
import categoryWomen from "@/assets/category-women.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts } from "@/store/productSlice";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
// We import Product but will use 'any' in the map to prevent errors
import { Product } from "@/types";

const categories = [
  { label: "Men", image: categoryMen, to: "/shop?category=men" },
  { label: "Women", image: categoryWomen, to: "/shop?category=women" },
  {
    label: "Accessories",
    image: categoryAccessories,
    to: "/shop?category=accessories",
  },
];

  /* import { useState } from "react"; */ // Don't forget to update imports if needed, but Index already imports React hooks?
  // Checking file imports... imports "useEffect", need to add "useState"
  
const Index = () => {
  const dispatch = useAppDispatch();
  // Get pagination info from store
  const { items: products, status, page: reduxPage, pages } = useAppSelector((state) => state.products);
  
  // Local state to trigger updates (or we can just rely on reduxPage if we sync it)
  // But let's use a local state to drive the effect
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Always fetch when page changes
    dispatch(fetchProducts({ pageNumber: page }));
  }, [page, dispatch]);

  // Safety check to prevent crashes
  const safeProducts = Array.isArray(products) ? products : [];

  // Filter Logic
  const bestSellers = safeProducts
    .filter((p: any) => p.isBestSeller)
    .slice(0, 8);
  const newArrivals = safeProducts.slice(0, 8);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif uppercase tracking-widest animate-pulse">
        Loading Novan Collection...
      </div>
    );
  }

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
                    <h3 className="font-serif text-2xl text-primary-foreground tracking-wider">
                      {cat.label}
                    </h3>
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
              <Link
                to="/shop"
                className="luxury-button text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>
            {bestSellers.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {/* FIXED: Using (p: any) here forces TypeScript to accept the data */}
                {bestSellers.map((p: any) => (
                  <ProductCard key={p._id || p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p>No best sellers available right now.</p>
              </div>
            )}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="container py-20 lg:py-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl">New Arrivals</h2>
            <Link
              to="/shop"
              className="luxury-button text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {/* FIXED: Using (p: any) here forces TypeScript to accept the data */}
              {newArrivals.map((p: any) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>New arrivals coming soon.</p>
            </div>
          )}
        </section>

        {/* All Collection with Pagination */}
        <section className="container pb-20 lg:pb-32">
           <h2 className="font-serif text-2xl lg:text-3xl mb-12 text-center">Our Collection</h2>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {safeProducts.map((p: any) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
           </div>

           {/* Pagination */}
           {pages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="p-2 border border-border rounded-md disabled:opacity-50 hover:bg-secondary/50 transition-colors"
                aria-label="Previous Page"
              >
                <ArrowRight size={16} className="rotate-180" />
              </button>
              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  onClick={() => setPage(x + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                    page === x + 1
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-secondary/50 border border-border"
                  }`}
                >
                  {x + 1}
                </button>
              ))}
              <button
                disabled={page === pages}
                onClick={() => setPage(p => Math.min(pages, p + 1))}
                className="p-2 border border-border rounded-md disabled:opacity-50 hover:bg-secondary/50 transition-colors"
                aria-label="Next Page"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        {/* Mission / Philosophy */}
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
              We believe in the power of restraint. Each piece is designed to
              transcend seasons, crafted from the finest materials, and built to
              become a cornerstone of your wardrobe.
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
