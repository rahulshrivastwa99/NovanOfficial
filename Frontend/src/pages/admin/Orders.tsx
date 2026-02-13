import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { listOrders, deliverOrder } from '@/store/orderSlice';
import { Loader2, Check, Truck } from 'lucide-react';
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

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  
  const [activeTab, setActiveTab] = useState('ALL');
  
  // State for the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToShip, setOrderToShip] = useState<string | null>(null); // Stores the ID
  const [carrier, setCarrier] = useState('');
  const [trackingId, setTrackingId] = useState('');

  // State for Delivery Confirmation
  const [deliveryConfirmId, setDeliveryConfirmId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  // --- 1. OPEN MODAL & SAVE ID ---
  const openShipModal = (id: string) => {
    setOrderToShip(id); // <--- THIS SAVES THE ID
    setCarrier('');
    setTrackingId('');
    setIsModalOpen(true);
  };

  // --- 2. SUBMIT "MARK SENT" ---
  const handleMarkSent = async () => {
    console.log("handleMarkSent Triggered. Current State:", { orderToShip, carrier, trackingId });
    
    // Check if ID exists
    if (orderToShip && carrier && trackingId) {
      const payload = { 
        id: orderToShip, 
        courier: carrier, 
        trackingId: trackingId 
      };
      console.log("Dispatching Payload:", payload);
      
      try {
        await dispatch(deliverOrder(payload)).unwrap();
        toast.success('Order marked as Shipped');
        setIsModalOpen(false);
        setOrderToShip(null);
      } catch (err) {
        console.error("Dispatch Error:", err);
        toast.error('Failed to update order');
      }
    } else {
        console.error("Missing fields:", { orderToShip, carrier, trackingId });
        toast.error("Error: Order ID missing. Please try again.");
    }
  };

  // --- 3. OPEN DELIVERY MODAL ---
  const handleMarkDelivered = (id: string) => {
    setDeliveryConfirmId(id);
  };

  // --- 4. CONFIRM DELIVERY ---
  const confirmDelivered = async () => {
    if (!deliveryConfirmId) return;

    const payload = { id: deliveryConfirmId, status: 'Delivered' };
    console.log("Dispatching Payload:", payload);
    try {
      await dispatch(deliverOrder(payload)).unwrap();
      toast.success('Order completed!');
      setDeliveryConfirmId(null);
    } catch (err) {
      console.error("Dispatch Error:", err);
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
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-5 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-muted-foreground">
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
                    </td>
                    <td className="p-5 text-sm font-medium">
                      ₹{order.totalPrice.toFixed(2)}
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
                    <td className="p-5 text-right">
                      {/* BUTTON 1: Processing -> Shipped */}
                      {!order.isDelivered && order.status !== 'Shipped' && (
                        <button
                          onClick={() => openShipModal(order._id)}
                          className="text-xs bg-black text-white px-3 py-2 rounded-sm hover:bg-gray-800 transition-colors flex items-center gap-2 ml-auto"
                        >
                          <Truck size={14} /> Mark Sent
                        </button>
                      )}

                      {/* BUTTON 2: Shipped -> Delivered */}
                      {!order.isDelivered && order.status === 'Shipped' && (
                        <button
                          onClick={() => handleMarkDelivered(order._id)}
                          className="text-xs bg-blue-600 text-white px-3 py-2 rounded-sm hover:bg-blue-700 transition-colors flex items-center gap-2 ml-auto"
                        >
                          <Check size={14} /> Mark Delivered
                        </button>
                      )}

                      {/* COMPLETED STATE */}
                      {order.isDelivered && (
                         <span className="text-green-600 flex items-center justify-end gap-1 text-xs font-medium">
                            <Check size={14} /> Completed
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

      {/* SHIPPING MODAL */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Shipping Details</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the courier service and tracking number for this order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
               <label htmlFor="carrier" className="text-sm font-medium">Courier Service</label>
               <input 
                 id="carrier"
                 placeholder="e.g. Shiprocket, Delhivery" 
                 value={carrier}
                 onChange={(e) => setCarrier(e.target.value)}
                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
               />
            </div>
            <div className="grid gap-2">
               <label htmlFor="trackingId" className="text-sm font-medium">Tracking ID / AWB</label>
               <input 
                 id="trackingId"
                 placeholder="e.g. SR1234567890" 
                 value={trackingId}
                 onChange={(e) => setTrackingId(e.target.value)}
                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
               />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsModalOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleMarkSent} disabled={!carrier || !trackingId}>
              Mark Sent
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DELIVERY CONFIRMATION MODAL */}
      <AlertDialog open={!!deliveryConfirmId} onOpenChange={(open) => !open && setDeliveryConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delivery</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this order as delivered? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeliveryConfirmId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelivered}>
              Confirm Delivery
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminOrders;