import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/store/authSlice';
import { orders as mockOrders } from '@/data/orders';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';

const statusColor: Record<string, string> = {
  processing: 'bg-warning/10 text-warning',
  shipped: 'bg-primary/10 text-primary',
  delivered: 'bg-success/10 text-success',
};

const Profile = () => {
  const { user, isLoggedIn } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<'profile' | 'orders'>('profile');

  if (!isLoggedIn) return <Navigate to="/" replace />;

  const userOrders = mockOrders.filter((o) => o.userId === 'user-1');

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="pt-20 lg:pt-24 min-h-screen">
        <div className="container py-8 lg:py-12 max-w-3xl">
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-serif text-3xl">My Account</h1>
            <button
              onClick={() => {
                dispatch(logout());
                toast.success('Logged out successfully');
              }}
              className="luxury-button text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-border mb-10">
            {(['profile', 'orders'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`luxury-button pb-4 border-b-2 transition-colors capitalize ${
                  tab === t ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground'
                }`}
              >
                {t === 'profile' ? 'My Profile' : 'Orders'}
              </button>
            ))}
          </div>

          {tab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="luxury-button text-muted-foreground block mb-2">Name</label>
                  <input defaultValue={user?.name} className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
                </div>
                <div>
                  <label className="luxury-button text-muted-foreground block mb-2">Email</label>
                  <input defaultValue={user?.email} className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent" />
                </div>
              </div>
              <button className="bg-foreground text-background px-8 py-3 luxury-button hover:bg-accent transition-colors">
                Save Changes
              </button>
            </motion.div>
          )}

          {tab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {userOrders.length === 0 ? (
                <p className="font-body text-muted-foreground">No orders yet.</p>
              ) : (
                userOrders.map((order) => (
                  <div key={order.id} className="border border-border p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-body text-sm font-medium">{order.id}</span>
                      <span className={`px-3 py-1 font-body text-xs capitalize ${statusColor[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="font-body text-sm text-muted-foreground space-y-1">
                      {order.items.map((item, i) => (
                        <p key={i}>{item.name} × {item.quantity}</p>
                      ))}
                    </div>
                    <div className="flex justify-between mt-3 pt-3 border-t border-border">
                      <span className="font-body text-xs text-muted-foreground">{order.createdAt}</span>
                      <span className="font-body text-sm font-medium">${order.total}</span>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Profile;
