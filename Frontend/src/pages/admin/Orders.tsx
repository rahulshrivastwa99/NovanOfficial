import { useState } from 'react';
import { orders as initialOrders, Order } from '@/data/orders';
import { toast } from 'sonner';

const statusColor: Record<string, string> = {
  processing: 'bg-warning/10 text-warning',
  shipped: 'bg-primary/10 text-primary',
  delivered: 'bg-success/10 text-success',
};

const statusOptions: Order['status'][] = ['processing', 'shipped', 'delivered'];

const AdminOrders = () => {
  const [orderList, setOrderList] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = filter === 'all' ? orderList : orderList.filter((o) => o.status === filter);

  const updateStatus = (orderId: string, status: Order['status']) => {
    setOrderList(orderList.map((o) => (o.id === orderId ? { ...o, status } : o)));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status });
    }
    toast.success(`Order ${orderId} updated to ${status}`);
  };

  return (
    <div>
      <h2 className="font-serif text-2xl mb-8">Orders</h2>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {['all', ...statusOptions].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`luxury-button px-4 py-2 border transition-colors capitalize ${
              filter === s ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order List */}
        <div className="bg-background border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Order</th>
                <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Customer</th>
                <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`border-b border-border last:border-0 cursor-pointer hover:bg-secondary transition-colors ${
                    selectedOrder?.id === order.id ? 'bg-secondary' : ''
                  }`}
                >
                  <td className="p-4 font-body text-sm">{order.id}</td>
                  <td className="p-4 font-body text-sm">{order.customerName}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 font-body text-xs capitalize ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details */}
        {selectedOrder && (
          <div className="bg-background border border-border p-6">
            <h3 className="font-serif text-lg mb-4">{selectedOrder.id}</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="luxury-button text-muted-foreground block mb-1">Customer</label>
                <p className="font-body text-sm">{selectedOrder.customerName} ({selectedOrder.email})</p>
              </div>
              <div>
                <label className="luxury-button text-muted-foreground block mb-1">Shipping</label>
                <p className="font-body text-sm">
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city},{' '}
                  {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                </p>
              </div>
              <div>
                <label className="luxury-button text-muted-foreground block mb-1">Items</label>
                {selectedOrder.items.map((item, i) => (
                  <p key={i} className="font-body text-sm">
                    {item.name} × {item.quantity} ({item.size}) — ₹{item.price * item.quantity}
                  </p>
                ))}
              </div>
              <div>
                <label className="luxury-button text-muted-foreground block mb-1">Total</label>
                <p className="font-body text-lg font-medium">₹{selectedOrder.total}</p>
              </div>
            </div>

            <div>
              <label className="luxury-button text-muted-foreground block mb-2">Update Status</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => updateStatus(selectedOrder.id, e.target.value as Order['status'])}
                className="border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent capitalize"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
