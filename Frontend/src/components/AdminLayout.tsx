import { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Store, Menu, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout, initiateLogout } from '@/store/authSlice';
import { toast } from 'sonner';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
];

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoggedIn } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!isLoggedIn || !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-secondary">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black z-30 flex items-center justify-between px-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-1"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-serif text-lg tracking-[0.2em] text-white">NOVAN</span>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-[250px] bg-black text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10 hidden lg:block">
          <span className="font-serif text-lg tracking-[0.3em] text-white">NOVAN</span>
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">Admin Panel</p>
        </div>

        {/* Mobile Header in Sidebar (matches height of mobile header) */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 lg:hidden">
          <span className="font-serif text-lg tracking-[0.3em] text-white">MENU</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 font-body text-sm tracking-wider transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 font-body text-sm tracking-wider text-white/50 hover:text-white transition-colors"
          >
            <Store size={18} />
            Back to Shop
          </Link>
          <button
            onClick={() => {
              dispatch(initiateLogout());
              // Overlay handles the rest
            }}
            className="flex items-center gap-3 px-4 py-3 w-full font-body text-sm tracking-wider text-white/50 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-[250px] min-h-screen transition-all duration-300 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
