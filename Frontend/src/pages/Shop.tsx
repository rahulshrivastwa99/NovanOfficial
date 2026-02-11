import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { fetchProducts } from '@/store/productSlice'; 
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const priceRanges = [
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 - ₹4,000', min: 2000, max: 4000 },
  { label: '₹4,000 - ₹6,000', min: 4000, max: 6000 },
  { label: 'Over ₹6,000', min: 6000, max: Infinity },
];

const Shop = () => {
  const dispatch = useDispatch();
  // Get products from Redux state
  const { items: products, status } = useSelector((state: any) => state.products);

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('category');

  // Fetch products on mount if not already loaded
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts() as any);
    }
  }, [status, dispatch]);

  // Handle category updates if URL search param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p: any) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedPrice !== null) {
        const range = priceRanges[selectedPrice];
        if (p.price < range.min || p.price >= range.max) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedPrice]);

  const FilterSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
        className="w-full flex items-center justify-between luxury-button text-muted-foreground mb-3"
      >
        <span className="font-medium uppercase tracking-wider text-xs">{title}</span>
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
    <div className="py-2">
      <FilterSection id="category" title="Category">
        <div className="space-y-2 pb-2">
          {['all', 'men', 'women', 'accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block font-body text-sm capitalize transition-colors ${
                selectedCategory === cat ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection id="price" title="Price">
        <div className="space-y-2 pb-2">
          <button
            onClick={() => setSelectedPrice(null)}
            className={`block font-body text-sm transition-colors ${
              selectedPrice === null ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Prices
          </button>
          {priceRanges.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setSelectedPrice(i)}
              className={`block font-body text-sm transition-colors ${
                selectedPrice === i ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
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

      <main className="pt-20 lg:pt-24 min-h-screen bg-background">
        <div className="container py-8 lg:py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-serif text-3xl lg:text-4xl tracking-tight">Collection</h1>
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 luxury-button text-muted-foreground border border-border px-4 py-2 rounded-full"
            >
              <SlidersHorizontal size={14} /> <span className="text-xs uppercase font-medium">Filters</span>
            </button>
          </div>

          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-32">
                {filters}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-6">
                {status === 'loading' ? 'Updating...' : `${filtered.length} products`}
              </p>
              
              {status === 'loading' ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 opacity-50">
                   {/* You could add a skeleton loader here */}
                   <p>Loading Collection...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                  {filtered.map((p: any) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}

              {status === 'succeeded' && filtered.length === 0 && (
                <div className="text-center py-20 border border-dashed border-border rounded-lg">
                  <p className="font-body text-muted-foreground italic">No products match your current filters.</p>
                  <button 
                    onClick={() => {setSelectedCategory('all'); setSelectedPrice(null);}}
                    className="mt-4 text-xs uppercase tracking-widest underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        <AnimatePresence>
          {mobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
                onClick={() => setMobileFilters(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 z-[100] w-full max-w-xs bg-background p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                  <h3 className="font-serif text-xl tracking-tight">Filters</h3>
                  <button 
                    className="hover:rotate-90 transition-transform duration-200"
                    onClick={() => setMobileFilters(false)}
                  >
                    <X size={20} />
                  </button>
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