import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ArrowLeft } from 'lucide-react';
import { useAppDispatch } from '@/store';
import { addToCart, openCart } from '@/store/cartSlice';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SizeGuideModal from '@/components/SizeGuideModal';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// Import the Product interface from types
import type { Product } from '@/types'; 

const mockReviews = [
  { id: 1, name: 'Sarah M.', rating: 5, text: 'Absolutely beautiful quality. The fabric is luxurious and the fit is perfect.' },
  { id: 2, name: 'James K.', rating: 4, text: 'Great piece, well-made. Runs slightly large but still love it.' },
  { id: 3, name: 'Emily R.', rating: 5, text: 'Worth every penny. I get compliments every time I wear it.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  // State for the fetched product
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <p className="font-body text-muted-foreground">Loading Product...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <p className="font-body text-muted-foreground">Product not found.</p>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    dispatch(
      addToCart({
        productId: product._id, // Ensure we use _id
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: selectedColor || product.colors[0].name,
        image: product.images[0],
      })
    );
    toast.success('Added to bag');
    dispatch(openCart());
  };

  return (
    <>
      <Navbar />

      <main className="pt-20 lg:pt-24 min-h-screen">
        <div className="container py-8">
          <Link to="/shop" className="inline-flex items-center gap-2 luxury-button text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden ${selectedImage === i ? 'ring-2 ring-foreground' : ''}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:py-8"
            >
              <h1 className="font-serif text-2xl lg:text-3xl mb-2">{product.name}</h1>
              <p className="font-body text-lg mb-6">₹{product.price}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

                  {/* Size */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="luxury-button text-muted-foreground">Size</label>
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs underline text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border font-body text-sm transition-colors ${
                        selectedSize === size
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-8">
                <label className="luxury-button text-muted-foreground block mb-3">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? 'border-foreground scale-110' : 'border-border'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-12">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-foreground text-background py-4 luxury-button hover:bg-accent transition-colors"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => {
                    setWishlisted(!wishlisted);
                    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
                  }}
                  className={`w-14 h-14 border flex items-center justify-center transition-colors ${
                    wishlisted ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="font-serif text-lg mb-6">Reviews</h3>
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < review.rating ? 'text-foreground fill-foreground' : 'text-border'}
                            />
                          ))}
                        </div>
                        <span className="font-body text-sm font-medium">{review.name}</span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </>
  );
};

export default ProductDetail;