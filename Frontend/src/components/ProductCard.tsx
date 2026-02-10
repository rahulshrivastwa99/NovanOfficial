import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store';
import { addToCart, openCart } from '@/store/cartSlice';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: product.sizes[1] || product.sizes[0],
        color: product.colors[0].name,
        image: product.images[0],
      })
    );
    dispatch(openCart());
  };

  return (
    <Link to={`/product/${product.id}`}>
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
          <img
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
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
        <p className="font-body text-sm text-muted-foreground mt-1">${product.price}</p>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
