import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart, openCart } from "@/store/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();

  // Wishlist Logic
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);
  const { user } = useAppSelector((state) => state.auth);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to use wishlist");
      return;
    }
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Basic validation to prevent errors
    if (
      !product.sizes?.length ||
      !product.colors?.length ||
      !product.images?.length
    ) {
      toast.error("Select options on details page");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        // Default to first available options for Quick Add
        size: product.sizes[0]?.size || "One Size",
        color: product.colors[0].name,
        image: product.images[0],
      }),
    );
    toast.success("Added to bag");
    dispatch(openCart());
  };

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* --- IMAGE CONTAINER --- */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
          {/* Category Tag (Optional - visual polish) */}
          {product.category && (
            <span className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              {product.category}
            </span>
          )}

          {/* Wishlist Button (Top Right) */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0"
          >
            <Heart
              size={16}
              className={`transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "currentColor"}`}
            />
          </button>

          {/* Product Image (Swap Logic) */}
          <img
            src={
              product.images && product.images.length > 0
                ? hovered && product.images[1]
                  ? product.images[1]
                  : product.images[0]
                : "/placeholder.png"
            }
            alt={product.name}
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Quick Add Button (Slide Up) */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md text-black py-3 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-black hover:text-white border-t border-gray-100"
          >
            <Plus size={14} /> Quick Add
          </button>
        </div>

        {/* --- INFO SECTION --- */}
        <div className="space-y-1">
          <h3 className="font-serif text-base text-black group-hover:underline decoration-1 underline-offset-4 decoration-gray-400 truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-900 tracking-wider">
              ₹{product.price?.toLocaleString()}
            </span>
            {/* Optional: Show strikethrough price if you have 'originalPrice' in data */}
            {/* <span className="text-[10px] text-gray-400 line-through">₹2,999</span> */}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
