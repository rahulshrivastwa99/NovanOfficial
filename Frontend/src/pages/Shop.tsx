import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, SlidersHorizontal, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProducts } from "@/store/productSlice";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RootState } from "@/store";

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Redux State
  const {
    items: products,
    status,
    page,
    pages,
  } = useSelector((state: RootState) => state.products);

  // Local State for filters
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get("pageNumber")) || 1);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("category");

  // Debounce search
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  // Fetch Products when filters change
  useEffect(() => {
    const params: any = {
      pageNumber,
    };
    if (debouncedKeyword) params.keyword = debouncedKeyword;
    if (category !== "all") params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    dispatch(fetchProducts(params) as any);

    // Update URL
    setSearchParams(params);
  }, [dispatch, debouncedKeyword, category, minPrice, maxPrice, pageNumber, setSearchParams]);

  // Reset page when filters change (except page itself)
  useEffect(() => {
    setPageNumber(1);
  }, [debouncedKeyword, category, minPrice, maxPrice]);

  const FilterSection = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
        className="w-full flex items-center justify-between luxury-button text-muted-foreground mb-3"
      >
        <span className="font-medium uppercase tracking-wider text-xs">
          {title}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${openAccordion === id ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {openAccordion === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
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
      <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-border rounded-md text-sm focus:outline-none focus:border-foreground transition-colors"
          />
          <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
      </div>

      <FilterSection id="category" title="Category">
        <div className="space-y-2 pb-2">
          {["all", "men", "women", "accessories"].map((cat) => (
            <div key={cat} className="flex items-center">
              <input
                type="radio"
                id={`cat-${cat}`}
                name="category"
                checked={category === cat}
                onChange={() => setCategory(cat)}
                className="mr-2 accent-black"
              />
              <label
                htmlFor={`cat-${cat}`}
                className={`cursor-pointer text-sm capitalize ${
                  category === cat ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {cat === "all" ? "All Products" : cat}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection id="price" title="Price Range">
        <div className="flex items-center gap-2 pb-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-3 py-2 bg-secondary/30 border border-border rounded-md text-sm focus:outline-none focus:border-foreground"
            />
            <span className="text-muted-foreground">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 bg-secondary/30 border border-border rounded-md text-sm focus:outline-none focus:border-foreground"
            />
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
            <h1 className="font-serif text-3xl lg:text-4xl tracking-tight">
              Collection
            </h1>
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 luxury-button text-muted-foreground border border-border px-4 py-2 rounded-full"
            >
              <SlidersHorizontal size={14} />{" "}
              <span className="text-xs uppercase font-medium">Filters</span>
            </button>
          </div>

          <div className="flex gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">{filters}</div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-6">
                 {status === "loading" ? "Loading..." : `Showing results`}
              </p>

              {status === "loading" && products.length === 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 opacity-50">
                  <p>Loading Collection...</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page + category + keyword + minPrice + maxPrice} // Force re-render animation when filters change
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
                  >
                    {products.map((p: any) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}

              {status === "succeeded" && products.length === 0 && (
                <div className="text-center py-20 border border-dashed border-border rounded-lg">
                  <p className="font-body text-muted-foreground italic">
                    No products match your current filters.
                  </p>
                  <button
                    onClick={() => {
                      setCategory("all");
                      setKeyword("");
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className="mt-4 text-xs uppercase tracking-widest underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                    className="p-2 border border-border rounded-md disabled:opacity-50 hover:bg-secondary/50 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[...Array(pages).keys()].map((x) => (
                    <button
                      key={x + 1}
                      onClick={() => setPageNumber(x + 1)}
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
                    onClick={() => setPageNumber(p => Math.min(pages, p + 1))}
                    className="p-2 border border-border rounded-md disabled:opacity-50 hover:bg-secondary/50 transition-colors"
                  >
                    <ChevronRight size={16} />
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
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 z-[100] w-full max-w-xs bg-background p-8 shadow-2xl h-full overflow-y-auto"
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
