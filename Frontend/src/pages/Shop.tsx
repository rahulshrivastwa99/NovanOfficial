import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const priceRanges = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $300', min: 200, max: 300 },
  { label: 'Over $300', min: 300, max: Infinity },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('category');

  // Ensure mobile filters are closed on mount/unmount
  useEffect(() => {
    setMobileFilters(false);
    return () => setMobileFilters(false);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedPrice !== null) {
        const range = priceRanges[selectedPrice];
        if (p.price < range.min || p.price >= range.max) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedPrice]);

  const FilterSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
        className="w-full flex items-center justify-between luxury-button text-muted-foreground mb-3"
      >
        {title}
        <ChevronDown size={14} className={`transition-transform ${openAccordion === id ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {openAccordion === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const filters = (
    <div>
      <FilterSection id="category" title="Category">
        <div className="space-y-2">
          {['all', 'men', 'women', 'accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block font-body text-sm capitalize transition-colors ${
                selectedCategory === cat ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection id="price" title="Price">
        <div className="space-y-2">
          <button
            onClick={() => setSelectedPrice(null)}
            className={`block font-body text-sm transition-colors ${
              selectedPrice === null ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Prices
          </button>
          {priceRanges.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setSelectedPrice(i)}
              className={`block font-body text-sm transition-colors ${
                selectedPrice === i ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      <Navbar />

      <main className="pt-20 lg:pt-24 min-h-screen">
        <div className="container py-8 lg:py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-serif text-3xl lg:text-4xl">Collection</h1>
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 luxury-button text-muted-foreground"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              {filters}
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <p className="font-body text-sm text-muted-foreground mb-6">{filtered.length} products</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="font-body text-muted-foreground text-center py-20">No products match your filters.</p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <AnimatePresence>
          {mobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] bg-foreground/40"
                onClick={() => setMobileFilters(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed left-0 top-0 bottom-0 z-[90] w-80 bg-background p-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-lg">Filters</h3>
                  <button onClick={() => setMobileFilters(false)}><X size={20} /></button>
                </div>
                {filters}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
};

export default Shop;
