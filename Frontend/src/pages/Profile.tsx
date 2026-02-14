import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/store/authSlice';
import { toast } from 'sonner';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';



const Profile = () => {
  const { user, isLoggedIn } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <Navbar />
      <CartDrawer />
      <AuthModal />

      <main className="pt-28 lg:pt-32 min-h-screen">
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

          <div className="flex gap-4 mb-10">
             <Link to="/orders" className="flex items-center gap-2 px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors">
                <Package size={18} /> My Orders
             </Link>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="font-serif text-xl mb-4">Profile Details</h2>
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
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Profile;
