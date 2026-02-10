import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearCart } from '@/store/cartSlice';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';

const Checkout = () => {
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearCart());
    toast.success('Order placed successfully!');
    navigate('/profile');
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="pt-20 lg:pt-24 min-h-screen">
        <div className="container py-8 lg:py-12">
          <h1 className="font-serif text-3xl mb-10">Checkout</h1>

          {items.length === 0 ? (
            <p className="font-body text-muted-foreground">Your bag is empty.</p>
          ) : (
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left - Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-serif text-lg mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="col-span-2 lg:col-span-1">
                      <label className="luxury-button text-muted-foreground block mb-2">First Name</label>
                      <input required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <label className="luxury-button text-muted-foreground block mb-2">Last Name</label>
                      <input required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
                    </div>
                    <div className="col-span-2">
                      <label className="luxury-button text-muted-foreground block mb-2">Address</label>
                      <input required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
                    </div>
                    <div>
                      <label className="luxury-button text-muted-foreground block mb-2">City</label>
                      <input required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
                    </div>
                    <div>
                      <label className="luxury-button text-muted-foreground block mb-2">Zip Code</label>
                      <input required className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
                    </div>
                  </div>

                  <h2 className="font-serif text-lg mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { value: 'card', label: 'Credit Card (Razorpay)' },
                      { value: 'cod', label: 'Cash on Delivery' },
                    ].map((pm) => (
                      <label key={pm.value} className="flex items-center gap-3 cursor-pointer p-4 border border-border hover:border-foreground transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value={pm.value}
                          checked={paymentMethod === pm.value}
                          onChange={() => setPaymentMethod(pm.value)}
                          className="accent-foreground"
                        />
                        <span className="font-body text-sm">{pm.label}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>

                {/* Right - Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-secondary p-6 lg:p-8">
                    <h2 className="font-serif text-lg mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between font-body text-sm">
                          <span>
                            {item.name} × {item.quantity}
                            <span className="text-muted-foreground ml-1">({item.size})</span>
                          </span>
                          <span>${item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="flex justify-between font-body text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                      </div>
                      <div className="flex justify-between font-body text-base font-medium pt-2 border-t border-border">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-8 bg-foreground text-background py-4 luxury-button hover:bg-accent transition-colors"
                    >
                      Place Order
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
