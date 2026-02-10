import { useAppSelector } from '@/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Orders = () => {
  const orders = useAppSelector((s) => s.orders.orders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-20 lg:py-24">
        <h1 className="font-serif text-3xl lg:text-4xl mb-2 text-center">My Orders</h1>
        <p className="text-muted-foreground text-center mb-12">Track and manage your recent purchases</p>

        {orders.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-border bg-card rounded-sm overflow-hidden">
                <div 
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-secondary/20 transition-colors"
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-full">
                      <Package size={24} className="text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">₹{order.total.toFixed(2)}</span>
                       {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-border"
                    >
                      <div className="p-6 bg-secondary/10">
                        <h4 className="font-medium mb-4 text-sm uppercase tracking-wide text-muted-foreground">Order Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">
                              <div className="w-16 h-20 bg-secondary flex-shrink-0 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-serif font-medium">{item.name}</h5>
                                <p className="text-sm text-muted-foreground">Size: {item.size} | Color: {item.color}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-sm">Qty: {item.quantity}</p>
                                    <p className="text-sm font-medium">₹{item.price}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                            <span className="font-medium">Total Amount</span>
                            <span className="font-serif text-xl font-bold">₹{order.total.toFixed(2)}</span>
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
