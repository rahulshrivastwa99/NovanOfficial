import { X, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store';
import { closeCart, removeFromCart, updateQuantity } from '@/store/cartSlice';
import { openAuthModal } from '@/store/authSlice';

const CartDrawer = () => {
  const { items, isOpen } = useAppSelector((s) => s.cart);
  const { isLoggedIn } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => {
    dispatch(closeCart());
    if (!isLoggedIn) {
      dispatch(openAuthModal());
    } else {
      navigate('/checkout');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40"
            onClick={() => dispatch(closeCart())}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-lg">Your Bag ({items.length})</h2>
              <button onClick={() => dispatch(closeCart())} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <p className="font-body text-sm text-muted-foreground text-center py-12">
                  Your bag is empty
                </p>
              ) : (
                items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-sm">{item.name}</h4>
                        <p className="font-body text-xs text-muted-foreground mt-1">
                          {item.size} / {item.color}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              dispatch(updateQuantity({ productId: item.productId, size: item.size, color: item.color, quantity: item.quantity - 1 }))
                            }
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-body text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch(updateQuantity({ productId: item.productId, size: item.size, color: item.color, quantity: item.quantity + 1 }))
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-body text-sm">${item.price * item.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart({ productId: item.productId, size: item.size, color: item.color }))}
                      className="self-start"
                      aria-label="Remove item"
                    >
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between font-body text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-foreground text-background py-4 luxury-button hover:bg-accent transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
