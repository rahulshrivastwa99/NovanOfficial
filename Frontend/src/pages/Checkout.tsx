import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearCart } from '@/store/cartSlice';
import { placeOrder, resetOrder } from '@/store/orderSlice'; // Ensure resetOrder is exported from your slice
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';
import { Loader2, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const { loading, success, error } = useAppSelector((state) => state.orders);

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  
  // Form State
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');

  // --- PRICING CALCULATIONS ---
  // 1. Subtotal (Sum of all items)
  const itemsPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // 2. Shipping (Free over ₹5000, else ₹100)
  const shippingPrice = itemsPrice > 5000 ? 0 : 100;
  
  // 3. Tax (18% GST standard for clothing in India)
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  
  // 4. Grand Total
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  // Helper for Indian Currency Formatting
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // 1. Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error('Please log in to complete checkout');
      navigate('/shop');
    }
  }, [user, navigate]);

  // 2. Handle Success
  useEffect(() => {
    if (success) {
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      dispatch(resetOrder());
      navigate('/orders');
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    dispatch(
      placeOrder({
        orderItems: cart.items.map((item) => ({
          name: item.name,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          product: item.productId,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="pt-20 lg:pt-24 min-h-screen bg-gray-50/50">
        <div className="container py-8 lg:py-12 max-w-6xl">
          <h1 className="font-serif text-3xl mb-10 text-center lg:text-left">Checkout</h1>

          {cart.items.length === 0 ? (
            <div className="text-center py-20 bg-white border border-border rounded-sm">
              <p className="font-body text-muted-foreground mb-4">Your bag is empty.</p>
              <button onClick={() => navigate('/shop')} className="text-foreground underline hover:text-black/70">Continue Shopping</button>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Column - Shipping & Payment (7 cols) */}
                <motion.div
                  className="lg:col-span-7 space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Address Section */}
                  <div className="bg-white p-6 lg:p-8 border border-border rounded-sm shadow-sm">
                    <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                       1. Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Street Address</label>
                        <input 
                          required 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground bg-transparent transition-colors rounded-sm" 
                          placeholder="Flat / House No / Street"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">City</label>
                        <input 
                          required 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground bg-transparent transition-colors rounded-sm" 
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Pincode</label>
                        <input 
                          required 
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground bg-transparent transition-colors rounded-sm" 
                          placeholder="110001"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Country</label>
                        <input 
                          required 
                          value={country}
                          readOnly
                          className="w-full border border-border bg-gray-50 px-4 py-3 text-sm text-muted-foreground cursor-not-allowed rounded-sm" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="bg-white p-6 lg:p-8 border border-border rounded-sm shadow-sm">
                    <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                       2. Payment Method
                    </h2>
                    <div className="space-y-3">
                      {[
                        { value: 'UPI', label: 'UPI / NetBanking', icon: '💳' },
                        { value: 'COD', label: 'Cash on Delivery', icon: '💵' },
                      ].map((pm) => (
                        <label 
                          key={pm.value} 
                          className={`flex items-center gap-4 cursor-pointer p-4 border rounded-sm transition-all ${
                            paymentMethod === pm.value 
                              ? 'border-foreground bg-secondary/10 ring-1 ring-foreground' 
                              : 'border-border hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={pm.value}
                            checked={paymentMethod === pm.value}
                            onChange={() => setPaymentMethod(pm.value)}
                            className="accent-foreground w-5 h-5"
                          />
                          <span className="text-xl">{pm.icon}</span>
                          <span className="font-medium text-sm">{pm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Order Summary (5 cols) */}
                <motion.div
                  className="lg:col-span-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-white border border-border p-6 lg:p-8 rounded-sm shadow-sm sticky top-24">
                    <h2 className="font-serif text-xl mb-6">Order Summary</h2>
                    
                    {/* Items List */}
                    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {cart.items.map((item) => (
                        <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-2 border-b border-border/50 last:border-0">
                          <div className="w-16 h-20 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden border border-border">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="font-medium text-sm truncate">{item.name}</p>
                             <p className="text-xs text-muted-foreground mt-1">Size: {item.size} | Color: {item.color}</p>
                             <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Price Breakdown */}
                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal (Excl. Tax)</span>
                        <span>{formatPrice(itemsPrice)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">GST (18%)</span>
                        <span>{formatPrice(taxPrice)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        {shippingPrice === 0 ? (
                           <span className="text-green-600 font-medium">Free</span>
                        ) : (
                           <span>{formatPrice(shippingPrice)}</span>
                        )}
                      </div>

                      {shippingPrice > 0 && (
                        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded text-center">
                           Add items worth {formatPrice(5000 - itemsPrice)} more for free shipping!
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t border-border mt-2">
                        <span className="text-base font-bold">Total Payable</span>
                        <span className="font-serif text-xl font-bold text-foreground">{formatPrice(totalPrice)}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center">
                        Secure Checkout powered by Razorpay / Stripe
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-6 bg-foreground text-background py-4 luxury-button hover:bg-black/90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 rounded-sm shadow-md"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} />}
                      {loading ? 'Processing...' : `Pay ${formatPrice(totalPrice)}`}
                    </button>
                  </div>
                </motion.div>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;