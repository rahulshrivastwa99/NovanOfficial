import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearCart } from '@/store/cartSlice';
import { placeOrder, resetOrder } from '@/store/orderSlice';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const { loading, success, error } = useAppSelector((state) => state.orders); // Note: slice name might be 'orders' or 'order' depending on store/index.ts

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // Default to UPI
  
  // Form State
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');

  // Calculations
  const itemsPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 5000 ? 0 : 100;
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

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
          product: item.productId, // Maps to _id
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
        <div className="container py-8 lg:py-12">
          <h1 className="font-serif text-3xl mb-10">Checkout</h1>

          {cart.items.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground mb-4">Your bag is empty.</p>
              <button onClick={() => navigate('/shop')} className="text-foreground underline">Continue Shopping</button>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                
                {/* Left - Shipping Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-serif text-lg mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="col-span-2">
                      <label className="luxury-button text-muted-foreground block mb-2">Address</label>
                      <input 
                        required 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground bg-white" 
                        placeholder="123 Fashion St"
                      />
                    </div>
                    <div>
                      <label className="luxury-button text-muted-foreground block mb-2">City</label>
                      <input 
                        required 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground bg-white" 
                        placeholder="New Delhi"
                      />
                    </div>
                    <div>
                      <label className="luxury-button text-muted-foreground block mb-2">Postal Code</label>
                      <input 
                        required 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground bg-white" 
                        placeholder="110001"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="luxury-button text-muted-foreground block mb-2">Country</label>
                      <input 
                        required 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-foreground bg-white" 
                        disabled
                      />
                    </div>
                  </div>

                  <h2 className="font-serif text-lg mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { value: 'UPI', label: 'UPI / NetBanking' },
                      { value: 'COD', label: 'Cash on Delivery' },
                    ].map((pm) => (
                      <label key={pm.value} className={`flex items-center gap-3 cursor-pointer p-4 border transition-colors bg-white ${paymentMethod === pm.value ? 'border-foreground ring-1 ring-foreground' : 'border-border hover:border-foreground'}`}>
                        <input
                          type="radio"
                          name="payment"
                          value={pm.value}
                          checked={paymentMethod === pm.value}
                          onChange={() => setPaymentMethod(pm.value)}
                          className="accent-foreground w-4 h-4"
                        />
                        <span className="font-body text-sm font-medium">{pm.label}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>

                {/* Right - Order Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-white border border-border p-6 lg:p-8 sticky top-24">
                    <h2 className="font-serif text-lg mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                      {cart.items.map((item) => (
                        <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 font-body text-sm border-b border-border pb-4 last:border-0">
                          <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-100" />
                          <div className="flex-1">
                             <p className="font-medium">{item.name}</p>
                             <p className="text-xs text-muted-foreground mt-1">Size: {item.size} | Color: {item.color}</p>
                             <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                          </div>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between font-body text-sm text-muted-foreground">
                        <span>Subtotal</span>
                        <span>₹{itemsPrice}</span>
                      </div>
                      <div className="flex justify-between font-body text-sm text-muted-foreground">
                        <span>Shipping</span>
                        <span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice}`}</span>
                      </div>
                      <div className="flex justify-between font-body text-sm text-muted-foreground">
                        <span>Tax (18% GST)</span>
                        <span>₹{taxPrice}</span>
                      </div>
                      <div className="flex justify-between font-body text-lg font-medium pt-4 border-t border-border mt-2">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-8 bg-foreground text-background py-4 luxury-button hover:bg-black/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing Order...' : 'Place Order'}
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