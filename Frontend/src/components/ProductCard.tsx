import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { addToCart, openCart } from '@/store/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  // Match using _id
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const { user } = useAppSelector((state) => state.auth);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
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
    if (!product.sizes?.length || !product.colors?.length || !product.images?.length) return;

    dispatch(
      addToCart({
        productId: product._id, // Use _id here
        name: product.name,
        price: product.price,
        quantity: 1,
        // Update to handle size objects -> size.size
        size: product.sizes[0]?.size || "One Size", 
        color: product.colors[0].name,
        image: product.images[0],
      })
    );
    toast.success('Added to bag');
    dispatch(openCart());
  };

  return (
    <Link to={`/product/${product._id}`}>
      <motion.div
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 z-10 p-2 bg-background/50 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          >
            <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"} />
          </button>
          <img
            src={
              product.images && product.images.length > 0
                ? (hovered && product.images[1] ? product.images[1] : product.images[0])
                : "/placeholder.png" // Fallback image
            }
            alt={product.name}
            className="w-full h-full object-cover image-zoom"
          />
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-4 right-4 bg-foreground text-background py-3 luxury-button hover:bg-accent transition-colors"
          >
            Quick Add
          </motion.button>
        </div>

        {/* Info */}
        <h3 className="font-serif text-sm lg:text-base">{product.name}</h3>
        <p className="font-body text-sm text-muted-foreground mt-1">₹{product.price}</p>
      </motion.div>
    </Link>
  );
};

export default ProductCard;