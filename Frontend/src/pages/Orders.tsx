import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, Loader2, CheckCircle, Clock, Truck } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { getMyOrders } from '@/store/orderSlice'; // This connects to your Backend API
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';

const Orders = () => {
  const dispatch = useAppDispatch();
  // Get the real data from Redux Store
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // 1. Fetch Data on Load
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    const s = status ? status.toLowerCase() : 'processing';
    if (s === 'delivered') return 'bg-green-100 text-green-800 border-green-200';
    if (s === 'shipped') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (s === 'cancelled') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
          <div className="text-center text-red-500 py-10 bg-red-50 rounded-lg">
            Error loading orders: {error}
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* 2. Map through Real Orders */}
            {orders.map((order: any) => (
              <div key={order._id} className="border border-border bg-background rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                
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
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border flex items-center gap-1 ${getStatusColor(order.status || 'Processing')}`}>
                      {order.isDelivered ? <CheckCircle size={12}/> : <Clock size={12}/>}
                      {order.isDelivered ? 'Delivered' : (order.status || 'Processing')}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium font-serif">₹{order.totalPrice.toFixed(2)}</span>
                       {expandedOrder === order._id ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
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
                      <div className="p-6 bg-secondary/5">
                        
                        {/* Check if Tracking Info exists */}
                        {order.trackingInfo && order.trackingInfo.id && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-sm">
                            <h4 className="font-medium text-sm text-blue-900 mb-2 flex items-center gap-2">
                              <Truck size={16} /> Shipment Details
                            </h4>
                            <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Courier:</span> 
                                <span className="font-medium ml-2">{order.trackingInfo.courier}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Tracking ID:</span> 
                                <span className="font-mono font-medium ml-2">{order.trackingInfo.id}</span>
                              </div>
                              <div>
                                {/* Smart Link to Shiprocket/Google Tracking */}
                                <a 
                                  href={`https://www.google.com/search?q=${order.trackingInfo.courier}+tracking+${order.trackingInfo.id}`} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors font-medium text-xs uppercase tracking-wide flex items-center gap-2 shadow-sm"
                                >
                                  Track Package &rarr;
                                </a>
                              </div>
                            </div>
                          </div>
                        )}

                        <h4 className="font-medium mb-4 text-xs uppercase tracking-widest text-muted-foreground">Items in Order</h4>
                        <div className="space-y-4">
                          {/* 3. Map through Order Items */}
                          {order.orderItems.map((item: any, index: number) => (
                            <div key={index} className="flex gap-4 items-center border-b border-border/50 last:border-0 pb-4 last:pb-0">
                              <div className="w-16 h-20 bg-white border border-border flex-shrink-0 overflow-hidden rounded-sm">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-serif font-medium text-sm">{item.name}</h5>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Size: <span className="uppercase">{item.size}</span> {item.color && `| Color: ${item.color}`}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">₹{item.price}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Order Footer Info */}
                        <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-medium text-xs uppercase tracking-widest text-muted-foreground mb-2">Shipping Details</h5>
                                <p className="text-sm">{order.shippingAddress.address}</p>
                                <p className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p className="text-sm">{order.shippingAddress.country}</p>
                            </div>
                            <div className="md:text-right">
                                <h5 className="font-medium text-xs uppercase tracking-widest text-muted-foreground mb-2">Payment</h5>
                                <p className="text-sm mb-1">Method: {order.paymentMethod}</p>
                                <div className="mt-2 text-lg font-serif font-bold">
                                    Total: ₹{order.totalPrice.toFixed(2)}
                                </div>
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
            description="You haven't placed any orders yet. Start shopping to fill your wardrobe."
            actionLabel="Browse Products"
            actionLink="/shop"
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;