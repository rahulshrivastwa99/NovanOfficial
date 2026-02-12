import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { getMyOrders } from '@/store/orderSlice'; // Import the thunk
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    // Default to 'Processing' if status is undefined
    const s = status || 'Processing';
    switch (s) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      <Navbar />
      <main className="flex-grow container py-20 lg:py-24">
        <h1 className="font-serif text-3xl lg:text-4xl mb-2 text-center">My Orders</h1>
        <p className="text-muted-foreground text-center mb-12">Track and manage your recent purchases</p>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-muted-foreground" size={32} />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">Error: {error}</div>
        ) : orders && orders.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {orders.map((order: any) => (
              <div key={order._id} className="border border-border bg-background rounded-sm overflow-hidden shadow-sm">
                
                {/* Order Header (Clickable) */}
                <div 
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-secondary/20 transition-colors"
                  onClick={() => toggleOrder(order._id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-full">
                      <Package size={24} className="text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status || 'Processing')}`}>
                      {order.status || 'Processing'}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">₹{order.totalPrice.toFixed(2)}</span>
                       {expandedOrder === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedOrder === order._id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-6 bg-secondary/10">
                        <h4 className="font-medium mb-4 text-sm uppercase tracking-wide text-muted-foreground">Order Items</h4>
                        <div className="space-y-4">
                          {order.orderItems.map((item: any, index: number) => (
                            <div key={index} className="flex gap-4 items-center border-b border-border/50 last:border-0 pb-4 last:pb-0">
                              <div className="w-16 h-20 bg-white border border-border flex-shrink-0 overflow-hidden rounded-sm">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-serif font-medium">{item.name}</h5>
                                <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size} | Color: {item.color}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">₹{item.price}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Order Summary Footer */}
                        <div className="mt-6 pt-4 border-t border-border">
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-muted-foreground">Payment Method</span>
                                <span>{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-muted-foreground">Shipping Address</span>
                                <span className="text-right max-w-[200px] truncate">
                                    {order.shippingAddress.address}, {order.shippingAddress.city}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                                <span className="font-medium">Total Amount</span>
                                <span className="font-serif text-xl font-bold">₹{order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="You haven't placed any orders yet. Start shopping to fill your wardrobe with timeless pieces."
            actionLabel="Start Shopping"
            actionLink="/shop"
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;