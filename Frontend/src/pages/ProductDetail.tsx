import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowLeft,
  ShoppingBag,
  Truck,
  RotateCcw,
  CheckCircle2,
  X,
  Ruler,
  FileText,
  Plus,
  Minus,
  RefreshCcw,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart, openCart } from "@/store/cartSlice";
import { createReview, resetReviewStatus } from "@/store/productSlice";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Rating from "@/components/Rating";
import axios from "axios";
import type { Product } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// --- REFINED COMPONENT: Satisfying Smooth Inner Zoom ---
const ImageZoom = ({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    // Calculate cursor position relative to the container
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    // Calculate percentage positions with safety clamping
    const xPercent = Math.min(Math.max((x / width) * 100, 0), 100);
    const yPercent = Math.min(Math.max((y / height) * 100, 0), 100);

    setTransformOrigin(`${xPercent}% ${yPercent}%`);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl bg-secondary cursor-zoom-in"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => {
        setIsZoomed(false);
        // Subtle delay before resetting origin to keep the exit transition smooth
        setTimeout(() => setTransformOrigin("center center"), 500);
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        // scale-[1.8] for a realistic zoom level
        // duration-500 + ease-out creates that "liquid" satisfying glide
        className={`w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform ${
          isZoomed ? "scale-[1.8]" : "scale-100"
        }`}
        style={{ transformOrigin: transformOrigin }}
      />

      {/* Subtle protective ring to maintain clean edges during zoom */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isZoomed ? "opacity-100" : "opacity-0"
        } ring-1 ring-inset ring-black/5 rounded-2xl`}
      />
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // Auth & State
  const { user } = useSelector((state: RootState) => state.auth);
  const { reviewStatus, reviewError } = useSelector(
    (state: RootState) => state.products,
  );
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (product && wishlistItems) {
      setWishlisted(wishlistItems.some((item) => item._id === product._id));
    }
  }, [product, wishlistItems]);

  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isReturnsOpen, setIsReturnsOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (reviewStatus === "succeeded") {
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      dispatch(resetReviewStatus());
      fetchProduct();
    }
    if (reviewStatus === "failed") {
      toast.error(reviewError || "Failed to submit review");
      dispatch(resetReviewStatus());
    }
  }, [reviewStatus, reviewError, dispatch, fetchProduct]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    dispatch(createReview({ productId: id!, review: { rating, comment } }));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-serif text-xl animate-pulse">
        Loading Collection...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Navbar />
        <h2>Product not found.</h2>
        <Link to="/shop" className="underline">
          Return to Shop
        </Link>
      </div>
    );

  const productImages =
    product.images?.length > 0 ? product.images : [product.images?.[0] || ""];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: product.colors?.[0]?.name || "Standard",
        image: productImages[0],
      }),
    );

    toast.success("Added to bag");
    dispatch(openCart());
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen bg-background">
        <div className="container max-w-7xl px-4 md:px-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* GALLERY SECTION */}
            <div className="lg:col-span-5 space-y-6">
              <div className="aspect-[3/4] shadow-sm rounded-2xl overflow-hidden">
                <ImageZoom
                  src={productImages[selectedImage]}
                  alt={product.name}
                  onClick={() => setIsLightboxOpen(true)}
                />
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 aspect-square flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-foreground" : "border-transparent opacity-60"}`}
                  >
                    <img
                      src={img}
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* INFO SECTION */}
            <div className="lg:col-span-7 space-y-8">
              <header className="space-y-4">
                <h1 className="font-serif text-4xl lg:text-5xl">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{(product.price * 2).toLocaleString()}
                  </span>
                  <div className="bg-foreground text-background text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    50% OFF
                  </div>
                </div>
              </header>

              <div className="space-y-4">
                <p className="font-body text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-[11px] uppercase tracking-widest font-black">
                  <span>Select Size</span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-1 underline opacity-70 hover:opacity-100"
                  >
                    <Ruler size={12} /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((sizeName) => {
                    const sizeVariant = product.sizes.find(
                      (s: any) => s.size === sizeName,
                    );
                    const isOutOfStock = !sizeVariant || sizeVariant.stock <= 0;

                    return (
                      <button
                        key={sizeName}
                        onClick={() =>
                          !isOutOfStock && setSelectedSize(sizeName)
                        }
                        disabled={isOutOfStock}
                        className={`w-14 h-12 flex items-center justify-center border-2 rounded-xl text-xs font-bold transition-all relative
                        ${selectedSize === sizeName ? "bg-foreground text-background border-foreground" : isOutOfStock ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50" : "hover:border-foreground border-border text-muted-foreground"}
                      `}
                      >
                        {sizeName}
                        {isOutOfStock && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-[1px] bg-gray-300 -rotate-45"></div>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-[5] bg-foreground text-background font-bold h-16 uppercase tracking-widest text-xs hover:bg-foreground/90 transition-all rounded-xl shadow-lg flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={20} /> Add to Bag
                  </button>
                  <button
                    onClick={() => {
                      if (!user) {
                        toast.error("Please login to use wishlist");
                        return;
                      }
                      wishlisted
                        ? dispatch(removeFromWishlist(product._id))
                        : dispatch(addToWishlist(product));
                    }}
                    className={`flex-1 border-2 flex items-center justify-center rounded-xl transition-all ${wishlisted ? "text-red-500 border-red-500 bg-red-50" : "text-muted-foreground"}`}
                  >
                    <Heart
                      size={24}
                      fill={wishlisted ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>

              {/* PRODUCT INFORMATION ACCORDION */}
              <div className="pt-8 border-t border-border space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">
                  Product Information
                </h3>

                {/* Description Accordion */}
                <div className="border-b border-border pb-4">
                  <button
                    onClick={() => setIsDescOpen(!isDescOpen)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center text-purple-600">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">
                          Product Description
                        </h4>
                        <p className="text-[10px] text-muted-foreground">
                          Manufacture, Care and Fit
                        </p>
                      </div>
                    </div>
                    {isDescOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                  <AnimatePresence>
                    {isDescOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-11">
                          <table className="w-full text-xs text-left border border-gray-200">
                            <tbody className="divide-y divide-gray-200">
                              {[
                                { label: "Made of", value: "100% Cotton" },
                                { label: "Neck Type", value: "Round Neck" },
                                { label: "Fit Type", value: "Oversized Fit" },
                                {
                                  label: "Color",
                                  value:
                                    product.colors?.[0]?.name || "Standard",
                                },
                                {
                                  label: "SKU",
                                  value: `NVN_${product._id.slice(-6).toUpperCase()}`,
                                },
                                {
                                  label: "Description",
                                  value: product.description,
                                },
                              ].map((row, i) => (
                                <tr
                                  key={i}
                                  className="divide-x divide-gray-200"
                                >
                                  <td className="px-3 py-2 font-bold w-1/3 bg-gray-50">
                                    {row.label}
                                  </td>
                                  <td className="px-3 py-2 text-muted-foreground">
                                    {row.value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shipping Info */}
                <div className="border-b border-border pb-4">
                  <button
                    onClick={() => setIsShippingOpen(!isShippingOpen)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center text-green-600">
                        <Truck size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Shipping Info</h4>
                        <p className="text-[10px] text-muted-foreground">
                          Free shipping across India
                        </p>
                      </div>
                    </div>
                    {isShippingOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                  <AnimatePresence>
                    {isShippingOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-xs text-muted-foreground leading-relaxed pl-11 space-y-3">
                          <p>
                            We dispatch orders within 1-2 days. Delivery usually
                            takes 2-5 working days depending on location.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <section className="mt-24 pt-20 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16">
              <div className="max-w-xs w-full space-y-6">
                <h3 className="font-serif text-3xl">Customer Stories</h3>
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-serif">
                    {product.rating > 0 ? product.rating.toFixed(1) : "0.0"}
                  </span>
                  <div className="space-y-1">
                    <Rating value={product.rating} color="#000000" />
                    <p className="text-[10px] uppercase tracking-widest opacity-60">
                      Based on {product.numReviews} Reviews
                    </p>
                  </div>
                </div>
                <div className="pt-8 border-t border-border">
                  <h4 className="font-medium mb-4">Write a Review</h4>
                  {user ? (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full p-2 border border-border rounded-md bg-transparent"
                      >
                        <option value="0">Select Rating...</option>
                        <option value="1">1 - Poor</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-border rounded-md bg-transparent text-sm"
                        placeholder="Your thoughts..."
                        required
                      />
                      <button
                        type="submit"
                        disabled={reviewStatus === "loading"}
                        className="w-full bg-foreground text-background py-2 rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors"
                      >
                        {reviewStatus === "loading"
                          ? "Submitting..."
                          : "Submit Review"}
                      </button>
                    </form>
                  ) : (
                    <p className="text-sm opacity-60">
                      Please login to leave a review.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-10 w-full">
                {product.reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="space-y-3 pb-10 border-b border-border last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{review.name}</span>
                        <CheckCircle2 size={12} className="text-green-600" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.createdAt?.substring(0, 10)}
                      </span>
                    </div>
                    <Rating value={review.rating} />
                    <p className="text-sm font-medium leading-relaxed italic text-foreground/80">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-4"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={32} />
            </button>
            <div className="relative h-[75vh] w-full flex items-center justify-center">
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={productImages[selectedImage]}
                crossOrigin="anonymous"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}

        {showSizeGuide && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-background rounded-3xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setShowSizeGuide(false)}
                className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="font-serif text-3xl mb-8">Size Guide</h2>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b uppercase text-[10px] opacity-60">
                    <th className="pb-4">Size</th>
                    <th className="pb-4">Chest (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { s: "S", c: '36-38"' },
                    { s: "M", c: '38-40"' },
                    { s: "L", c: '40-42"' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-4 font-bold">{row.s}</td>
                      <td className="py-4 text-muted-foreground">{row.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default ProductDetail;
