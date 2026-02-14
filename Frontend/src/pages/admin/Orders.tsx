import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { listOrders, deliverOrder } from '@/store/orderSlice';
import { Loader2, Check, Truck, Eye, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  
  const [activeTab, setActiveTab] = useState('ALL');
  
  // State for "Mark Sent" Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToShip, setOrderToShip] = useState<string | null>(null);
  const [carrier, setCarrier] = useState('');
  const [trackingId, setTrackingId] = useState('');

  // State for "View Details" Modal
  const [viewOrder, setViewOrder] = useState<any | null>(null);

  // State for Delivery Confirmation
  const [deliveryConfirmId, setDeliveryConfirmId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  // --- 1. OPEN MODAL & SAVE ID ---
  const openShipModal = (id: string) => {
    setOrderToShip(id);
    setCarrier('');
    setTrackingId('');
    setIsModalOpen(true);
  };

  // --- 2. SUBMIT "MARK SENT" ---
  const handleMarkSent = async () => {
    if (orderToShip && carrier && trackingId) {
      try {
        await dispatch(deliverOrder({ 
            id: orderToShip, 
            courier: carrier, 
            trackingId: trackingId 
        })).unwrap();
        toast.success('Order marked as Shipped');
        setIsModalOpen(false);
        setOrderToShip(null);
      } catch (err) {
        toast.error('Failed to update order');
      }
    } else {
        toast.error("Error: Please fill all fields.");
    }
  };

  // --- 3. OPEN DELIVERY MODAL ---
  const handleMarkDelivered = (id: string) => {
    setDeliveryConfirmId(id);
  };

  // --- 4. CONFIRM DELIVERY ---
  const confirmDelivered = async () => {
    if (!deliveryConfirmId) return;
    try {
      await dispatch(deliverOrder({ id: deliveryConfirmId, status: 'Delivered' })).unwrap();
      toast.success('Order completed!');
      setDeliveryConfirmId(null);
    } catch (err) {
      toast.error('Failed to update order');
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'DELIVERED') return order.isDelivered === true;
    if (activeTab === 'SHIPPED') return order.status === 'Shipped' && !order.isDelivered;
    if (activeTab === 'PROCESSING') return order.status === 'Processing' || !order.status;
    return true;
  });

  const tabs = ['ALL', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

  return (
    <div className="container py-10 max-w-6xl">
      <h2 className="font-serif text-3xl mb-8">Manage Orders</h2>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs font-medium uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-border shadow-sm rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-secondary/30 border-b border-border">
              <tr>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Payment Status</th>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Delivery Status</th>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-muted-foreground">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 font-mono text-xs text-muted-foreground">
                      #{order._id.substring(order._id.length - 6).toUpperCase()}
                    </td>
                    <td className="p-5 text-sm font-medium">
                      {order.user ? order.user.name : 'Guest'}
                      <div className="text-xs text-muted-foreground">{order.user?.email}</div>
                    </td>
                    <td className="p-5 text-sm text-muted-foreground">
                        <div className="flex flex-col">
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </td>
                    <td className="p-5 text-sm font-medium">
                      ₹{order.totalPrice.toFixed(2)}
                    </td>
                    <td className="p-5">
                       <div className="flex flex-col gap-1">
                          <span className={`text-xs font-bold ${order.isPaid ? 'text-green-600' : 'text-orange-500'}`}>
                             {order.isPaid ? 'PAID' : 'PENDING'}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase">{order.paymentMethod}</span>
                       </div>
                    </td>
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.isDelivered ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.isDelivered ? 'Delivered' : order.status || 'Processing'}
                      </span>
                    </td>
                    <td className="p-5 text-right flex justify-end gap-2">
                      {/* VIEW DETAILS BUTTON */}
                      <button 
                        onClick={() => setViewOrder(order)}
                        className="p-2 text-muted-foreground hover:bg-secondary rounded-full transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      {/* ACTION BUTTONS */}
                      {!order.isDelivered && order.status !== 'Shipped' && (
                        <button
                          onClick={() => openShipModal(order._id)}
                          className="text-xs bg-black text-white px-3 py-2 rounded-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                          <Truck size={14} /> Sent
                        </button>
                      )}

                      {!order.isDelivered && order.status === 'Shipped' && (
                        <button
                          onClick={() => handleMarkDelivered(order._id)}
                          className="text-xs bg-blue-600 text-white px-3 py-2 rounded-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Check size={14} /> Deliver
                        </button>
                      )}

                      {order.isDelivered && (
                         <span className="text-green-600 flex items-center gap-1 text-xs font-medium px-2">
                            <Check size={14} /> Done
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

      {/* --- MODAL 1: VIEW ORDER DETAILS --- */}
      <Dialog open={!!viewOrder} onOpenChange={(open) => !open && setViewOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Order Details #{viewOrder?._id?.substring(viewOrder?._id.length - 6).toUpperCase()}</DialogTitle>
            </DialogHeader>
            
            {viewOrder && (
                <div className="space-y-6">
                    {/* Products List */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Items</h4>
                        {viewOrder.orderItems.map((item: any, i: number) => (
                            <div key={i} className="flex gap-4 items-center border-b border-border pb-4 last:border-0 last:pb-0">
                                <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-sm border" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">Size: {item.size} | Color: {item.color}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">₹{item.price}</p>
                                    <p className="text-xs text-muted-foreground">x{item.qty}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-2">Shipping To</h4>
                            <p className="text-sm font-medium">{viewOrder.user?.name}</p>
                            <p className="text-sm text-muted-foreground">{viewOrder.shippingAddress.address}</p>
                            <p className="text-sm text-muted-foreground">
                                {viewOrder.shippingAddress.city}, {viewOrder.shippingAddress.postalCode}
                            </p>
                            <p className="text-sm text-muted-foreground">{viewOrder.shippingAddress.country}</p>
                        </div>
                        <div className="text-right">
                             <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-2">Payment</h4>
                             <p className="text-sm">Method: {viewOrder.paymentMethod}</p>
                             <p className="text-sm mt-1">Status: {viewOrder.isPaid ? 'Paid' : 'Pending'}</p>
                             <div className="mt-3 text-xl font-serif font-bold">₹{viewOrder.totalPrice.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>

      {/* --- MODAL 2: SHIP ORDER --- */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ship Order</AlertDialogTitle>
            <AlertDialogDescription>Enter tracking details below.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
               <label htmlFor="carrier" className="text-sm font-medium">Courier Service</label>
               <input 
                 id="carrier"
                 placeholder="e.g. Shiprocket" 
                 value={carrier}
                 onChange={(e) => setCarrier(e.target.value)}
                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
               />
            </div>
            <div className="grid gap-2">
               <label htmlFor="trackingId" className="text-sm font-medium">Tracking ID</label>
               <input 
                 id="trackingId"
                 placeholder="e.g. SR123456" 
                 value={trackingId}
                 onChange={(e) => setTrackingId(e.target.value)}
                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
               />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsModalOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleMarkSent} disabled={!carrier || !trackingId}>
              Confirm Shipment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* --- MODAL 3: CONFIRM DELIVERY --- */}
      <AlertDialog open={!!deliveryConfirmId} onOpenChange={(open) => !open && setDeliveryConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delivery</AlertDialogTitle>
            <AlertDialogDescription>Mark this order as delivered?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeliveryConfirmId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelivered}>Yes, Delivered</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminOrders;