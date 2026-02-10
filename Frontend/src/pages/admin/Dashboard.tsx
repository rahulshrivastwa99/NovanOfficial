import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Clock } from 'lucide-react';
import { orders } from '@/data/orders';
import { products } from '@/data/products';

const stats = [
  {
    label: 'Total Sales',
    value: '$' + orders.reduce((s, o) => s + o.total, 0).toLocaleString(),
    icon: DollarSign,
  },
  {
    label: 'Total Orders',
    value: orders.length.toString(),
    icon: ShoppingCart,
  },
  {
    label: 'Products in Stock',
    value: products.length.toString(),
    icon: Package,
  },
  {
    label: 'Pending Orders',
    value: orders.filter((o) => o.status === 'processing').length.toString(),
    icon: Clock,
  },
];

const statusColor: Record<string, string> = {
  processing: 'bg-warning/10 text-warning',
  shipped: 'bg-primary/10 text-primary',
  delivered: 'bg-success/10 text-success',
};

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="font-serif text-2xl mb-8">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-background p-6 border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="luxury-button text-muted-foreground">{stat.label}</span>
              <stat.icon size={18} className="text-muted-foreground" />
            </div>
            <p className="font-serif text-2xl">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-background border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="font-serif text-lg">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Order</th>
                <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Customer</th>
                <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Total</th>
                <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Status</th>
                <th className="text-left p-4 luxury-button text-muted-foreground font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-body text-sm">{order.id}</td>
                  <td className="p-4 font-body text-sm">{order.customerName}</td>
                  <td className="p-4 font-body text-sm">${order.total}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 font-body text-xs capitalize ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-body text-sm text-muted-foreground">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
