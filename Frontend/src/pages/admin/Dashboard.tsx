import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { listOrders, deliverOrder } from '../../store/orderSlice'; // Import deliverOrder
import { fetchProducts } from '../../store/productSlice';
import { DollarSign, ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react'; // Added icons
import { toast } from 'sonner';

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  
  const { orders, loading: ordersLoading } = useAppSelector((state) => state.orders);
  const { items: products, status: productStatus } = useAppSelector((state) => state.products);

  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(listOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeliver = (id: string) => {
    setConfirmId(id);
  };

  const confirmDelivery = async () => {
    if (confirmId) {
      try {
        await dispatch(deliverOrder({ id: confirmId, status: 'Delivered' })).unwrap();
        toast.success('Order status updated to Delivered');
      } catch (err) {
        toast.error('Failed to update status');
      }
      setConfirmId(null);
    }
  };

  const totalSales = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  if (ordersLoading || productStatus === 'loading') {
    return (
        <div className="flex items-center justify-center p-8 h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
        </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-3xl mb-8">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-background border border-border p-6 flex items-center justify-between shadow-sm">
            <div>
                <p className="text-muted-foreground font-body text-sm mb-1 uppercase tracking-wide">Total Sales</p>
                <h3 className="font-serif text-2xl">₹{totalSales.toFixed(2)}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full text-green-700">
                <DollarSign size={24} />
            </div>
        </div>

        <div className="bg-background border border-border p-6 flex items-center justify-between shadow-sm">
            <div>
                <p className="text-muted-foreground font-body text-sm mb-1 uppercase tracking-wide">Total Orders</p>
                <h3 className="font-serif text-2xl">{totalOrders}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                <ShoppingBag size={24} />
            </div>
        </div>

        <div className="bg-background border border-border p-6 flex items-center justify-between shadow-sm">
             <div>
                <p className="text-muted-foreground font-body text-sm mb-1 uppercase tracking-wide">Total Products</p>
                <h3 className="font-serif text-2xl">{totalProducts}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full text-purple-700">
                <Package size={24} />
            </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-background border border-border shadow-sm rounded-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-secondary/20">
             <h3 className="font-serif text-lg">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/40">
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 ? (
                  <tr>
                      <td colSpan={5} className="p-8 text-center text-muted-foreground">No orders found</td>
                  </tr>
              ) : (
                orders.slice().reverse().map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-muted-foreground">#{order._id?.substring(order._id.length - 6).toUpperCase()}</td>
                    <td className="p-4 font-body text-sm font-medium">{order.user?.name || 'Guest Customer'}</td> 
                    <td className="p-4 font-body text-sm">₹{order.totalPrice.toFixed(2)}</td>
                    <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.isDelivered 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                    </td>
                    <td className="p-4">
                        {!order.isDelivered && order.status === 'Shipped' && (
                            <button 
                                onClick={() => handleDeliver(order._id)}
                                className="flex items-center gap-1.5 bg-green-600 text-white hover:bg-green-700 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                            >
                                <CheckCircle size={12} /> Mark Delivered
                            </button>
                        )}
                        {!order.isDelivered && order.status !== 'Shipped' && (
                             <span className="text-muted-foreground text-xs italic">Manage in Orders</span>
                        )}
                        {order.isDelivered && (
                            <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                                <CheckCircle size={14} /> Completed
                            </span>
                        )}
                    </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-lg shadow-xl w-full max-w-md border border-border animate-in fade-in zoom-in duration-200">
            <h3 className="font-serif text-xl mb-2">Confirm Delivery</h3>
            <p className="font-body text-muted-foreground mb-6">
              Are you sure you want to mark order #{confirmId.substring(confirmId.length - 6).toUpperCase()} as delivered?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm font-medium hover:bg-secondary rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelivery}
                className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded hover:bg-black/80 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;