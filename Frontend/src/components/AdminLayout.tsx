import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Store } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/store/authSlice';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
];

const AdminLayout = () => {
  const { user, isLoggedIn } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!isLoggedIn || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-[250px] bg-black text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <span className="font-serif text-lg tracking-[0.3em] text-white">NOVAN</span>
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
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
            onClick={() => dispatch(logout())}
            className="flex items-center gap-3 px-4 py-3 w-full font-body text-sm tracking-wider text-white/50 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-[250px] bg-secondary min-h-screen overflow-y-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
