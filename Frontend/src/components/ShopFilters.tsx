import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Check } from "lucide-react";

interface ShopFiltersProps {
  keyword: string;
  setKeyword: (value: string | ((val: string) => string)) => void;
  category: string;
  setCategory: (val: string) => void;
  size: string;
  setSize: (value: string | ((val: string) => string)) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
}

const ShopFilters = ({
  keyword,
  setKeyword,
  category,
  setCategory,
  size,
  setSize,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: ShopFiltersProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    style: true,
    size: true,
    price: true,
  });

  // --- PRICE STATE ---
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
     setLocalMinPrice(minPrice);
  }, [minPrice]);

  useEffect(() => {
     setLocalMaxPrice(maxPrice);
  }, [maxPrice]);

  const handlePriceCommit = () => {
      if (localMinPrice !== minPrice) setMinPrice(localMinPrice);
      if (localMaxPrice !== maxPrice) setMaxPrice(localMaxPrice);
  };

  const onPriceKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handlePriceCommit();
          (e.target as HTMLInputElement).blur();
      }
  };

  // --- SEARCH STATE ---
  const [localKeyword, setLocalKeyword] = useState(keyword);
  useEffect(() => { setLocalKeyword(keyword); }, [keyword]);

  const handleSearchCommit = () => {
    if (localKeyword !== keyword) setKeyword(localKeyword);
  };

  const onSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchCommit();
      (e.target as HTMLInputElement).blur();
    }
  };
  // ------------------------

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="SEARCH T-SHIRTS..."
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.target.value)}
          onBlur={handleSearchCommit}
          onKeyDown={onSearchKeyDown}
          className="w-full bg-transparent border-b border-gray-300 py-2 pl-0 pr-8 text-sm font-sans focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 uppercase"
        />
        <Search
          size={16}
          className="absolute right-0 top-2 text-gray-400"
        />
      </div>

      {/* 1. GENDER (Category) */}
      <div className="border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left group mb-4"
        >
          <span className="font-bold text-xs uppercase tracking-widest text-black">
            Gender
          </span>
          {openSections["category"] ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
        <AnimatePresence>
          {openSections["category"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {["all", "men", "women", "unisex"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer group/label"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${category === cat ? "border-black bg-black" : "border-gray-200"}`}
                    >
                      {category === cat && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <input
                      type="radio"
                      className="hidden"
                      name="category"
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                    />
                    <span
                      className={`text-sm font-sans uppercase ${category === cat ? "text-black font-medium" : "text-gray-500"}`}
                    >
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. STYLE */}
      <div className="border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection("style")}
          className="flex items-center justify-between w-full text-left group mb-4"
        >
          <span className="font-bold text-xs uppercase tracking-widest text-black">
            Style
          </span>
          {openSections["style"] ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
        <AnimatePresence>
          {openSections["style"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {[
                  "Graphic Tees",
                  "Solid / Plain",
                  "Oversized",
                  "Polos",
                  "V-Neck",
                ].map((style) => (
                  <label
                    key={style}
                    className="flex items-center gap-3 cursor-pointer group/label"
                  >
                     <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${keyword === style ? "border-black bg-black" : "border-gray-200"}`}
                    >
                      {keyword === style && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={keyword === style}
                      onChange={() =>
                        setKeyword((prev: string) => (prev === style ? "" : style))
                      }
                    />
                    <span
                      className={`text-sm font-sans ${keyword === style ? "text-black font-medium" : "text-gray-500"}`}
                    >
                      {style}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. SIZE */}
      <div className="border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection("size")}
          className="flex items-center justify-between w-full text-left group mb-4"
        >
          <span className="font-bold text-xs uppercase tracking-widest text-black">
            Size
          </span>
          {openSections["size"] ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
        <AnimatePresence>
          {openSections["size"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-3">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize((prev: string) => (prev === s ? "" : s))}
                    className={`h-10 border text-xs font-bold transition-all uppercase ${
                      size === s
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-700 hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. PRICE */}
      <div className="border-b border-gray-100 pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left group mb-4"
        >
          <span className="font-bold text-xs uppercase tracking-widest text-black">
            Price
          </span>
          {openSections["price"] ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
        <AnimatePresence>
          {openSections["price"] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-4">
                <div className="flex-1">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Min</p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={localMinPrice}
                      onChange={(e) => setLocalMinPrice(e.target.value)}
                      onBlur={handlePriceCommit}
                      onKeyDown={onPriceKeyDown}
                      className="w-full bg-gray-50 border border-gray-200 py-2 pl-6 pr-2 text-xs font-medium focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Max</p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={localMaxPrice}
                      onChange={(e) => setLocalMaxPrice(e.target.value)}
                      onBlur={handlePriceCommit}
                      onKeyDown={onPriceKeyDown}
                      className="w-full bg-gray-50 border border-gray-200 py-2 pl-6 pr-2 text-xs font-medium focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShopFilters;
