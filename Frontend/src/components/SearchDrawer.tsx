import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAppSelector, useAppDispatch } from '@/store';
import { searchProducts, clearSearch } from '@/store/productSlice';
import EmptyState from './EmptyState';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDrawer = ({ isOpen, onClose }: SearchDrawerProps) => {
  const [query, setQuery] = useState('');
  // Debounce query
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  
  // Use separate search state
  const { searchItems: products, searchStatus: status } = useAppSelector((state) => state.products);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch products when debounced query changes
  useEffect(() => {
    if (isOpen) {
        if(debouncedQuery) {
            dispatch(searchProducts(debouncedQuery));
        } else {
            // clear results if empty
            dispatch(clearSearch());
        }
    }
  }, [debouncedQuery, isOpen, dispatch]);

  // Auto-focus input when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery(''); // Reset query on close
      dispatch(clearSearch());
    }
  }, [isOpen, dispatch]);

  // Use products directly from store (server-side filtered)
  const results = products.slice(0, 4); 

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 z-[90] bg-background border-b border-border shadow-lg"
          >
            <div className="container py-6">
              <div className="flex items-center gap-4 mb-8">
                <Search size={24} className="text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for products, categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        // Navigate to shop with query
                        window.location.href = `/shop?keyword=${encodeURIComponent(query)}`;
                        onClose();
                    }
                  }}
                  className="flex-1 bg-transparent text-2xl font-serif outline-none placeholder:text-muted-foreground/50"
                />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Results Area */}
              <div className="min-h-[200px] mb-4">
                {status === 'loading' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-50">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="aspect-[3/4] bg-gray-100 animate-pulse" />
                                <div className="h-4 bg-gray-100 w-2/3 animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : query && results.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((product) => (
                      <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        onClick={onClose}
                        className="group flex flex-col gap-3"
                      >
                        <div className="aspect-[3/4] overflow-hidden bg-secondary/30 relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-medium group-hover:underline">
                            {product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground flex items-center justify-between">
                            ₹{product.price}
                            <ArrowRight
                              size={14}
                              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                            />
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : query && results.length === 0 ? (
                  <EmptyState
                    icon={Search}
                    title="No results found"
                    description={`We couldn't find any products matching "${query}".`}
                  />
                ) : (
                  <div className="text-center text-muted-foreground/60 py-10">
                    <p>Start typing to search our collection...</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mt-6">
                 <Link to={`/shop?keyword=${encodeURIComponent(query)}`} onClick={onClose}>
                     <Button variant="link" className="text-muted-foreground hover:text-foreground">
                         View all results
                     </Button>
                 </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default SearchDrawer;
