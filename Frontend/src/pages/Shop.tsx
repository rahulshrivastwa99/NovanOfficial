import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchProducts } from "@/store/productSlice";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopFilters from "@/components/ShopFilters";
import { RootState } from "@/store";

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // --- REDUX STATE ---
  const {
    items: products,
    status,
    page,
    pages,
  } = useSelector((state: RootState) => state.products);

  // --- LOCAL FILTER STATE ---
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("pageNumber")) || 1,
  );

  // UI States
  const [mobileFilters, setMobileFilters] = useState(false);

  // Debounce search
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  // Fetch Products
  useEffect(() => {
    const params: any = { pageNumber };
    if (debouncedKeyword) params.keyword = debouncedKeyword;
    if (category !== "all") params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (size) params.size = size;

    dispatch(fetchProducts(params) as any);
    setSearchParams(params);
  }, [
    dispatch,
    debouncedKeyword,
    category,
    minPrice,
    maxPrice,
    size,
    pageNumber,
    setSearchParams,
  ]);

  // Reset page on filter change
  useEffect(() => {
    setPageNumber(1);
  }, [debouncedKeyword, category, minPrice, maxPrice, size]);

  return (
    <>
      <Navbar />

      <main className="pt-24 lg:pt-32 min-h-screen bg-white">
        <div className="container px-4 md:px-8 py-8 lg:py-12">
          {/* --- HEADER --- */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 border-b border-gray-100 pb-6">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-black mb-2">
                Collection
              </h1>
              <p className="text-gray-500 font-sans text-sm tracking-wide">
                {status === "loading"
                  ? "Updating..."
                  : `${products.length} Items Found`}
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border border-black px-6 py-3 mt-4 w-full md:w-auto justify-center hover:bg-black hover:text-white transition-colors"
            >
              <SlidersHorizontal size={14} /> Filter
            </button>
          </div>

          <div className="flex gap-12">
            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <ShopFilters 
                  keyword={keyword}
                  setKeyword={setKeyword}
                  category={category}
                  setCategory={setCategory}
                  size={size}
                  setSize={setSize}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
              </div>
            </aside>

            {/* --- PRODUCT GRID --- */}
            <div className="flex-1">
              {status === "loading" && products.length === 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 opacity-50">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] bg-gray-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {products.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-gray-200 rounded-lg">
                      <p className="font-sans text-gray-500 mb-4">
                        No products match your filters.
                      </p>
                      <button
                        onClick={() => {
                          setCategory("all");
                          setKeyword("");
                          setMinPrice("");
                          setMaxPrice("");
                          setSize("");
                        }}
                        className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8">
                      {products.map((p: any) => (
                        <ProductCard key={p._id} product={p} />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* --- PAGINATION --- */}
              {pages > 1 && (
                <div className="flex justify-center mt-16 gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    className="p-2 border border-gray-200 hover:border-black disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[...Array(pages).keys()].map((x) => (
                    <button
                      key={x + 1}
                      onClick={() => setPageNumber(x + 1)}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-colors ${
                        page === x + 1
                          ? "bg-black text-white"
                          : "border border-gray-200 hover:border-black"
                      }`}
                    >
                      {x + 1}
                    </button>
                  ))}
                  <button
                    disabled={page === pages}
                    onClick={() => setPageNumber((p) => Math.min(pages, p + 1))}
                    className="p-2 border border-gray-200 hover:border-black disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- MOBILE FILTERS DRAWER --- */}
        <AnimatePresence>
          {mobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
                onClick={() => setMobileFilters(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 z-[100] w-[85%] max-w-sm bg-white shadow-2xl h-full flex flex-col"
              >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                  <span className="font-serif text-xl tracking-tight">
                    Filters
                  </span>
                  <button
                    onClick={() => setMobileFilters(false)}
                    className="hover:rotate-90 transition-transform"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <ShopFilters 
                    keyword={keyword}
                    setKeyword={setKeyword}
                    category={category}
                    setCategory={setCategory}
                    size={size}
                    setSize={setSize}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                  />
                </div>

                <div className="p-6 border-t border-gray-100 bg-white">
                  <button
                    onClick={() => setMobileFilters(false)}
                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
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
