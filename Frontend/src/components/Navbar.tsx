import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { openCart } from '@/store/cartSlice';
import { openAuthModal } from '@/store/authSlice';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useAppSelector((s) => s.cart.items);
  const { isLoggedIn, user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const mobileLinks = [
    { to: '/shop', label: 'SHOP' },
    { to: '/shop?category=men', label: 'MEN' },
    { to: '/shop?category=women', label: 'WOMEN' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
  ];

  const handleProfileClick = () => {
    if (isLoggedIn) {
      if (user?.role === 'admin') navigate('/admin/dashboard');
      else navigate('/profile');
    } else {
      dispatch(openAuthModal());
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Desktop Nav Left */}
          <nav className="hidden lg:flex items-center gap-10 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="luxury-button text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo Centered */}
          <Link to="/" className="font-serif text-xl lg:text-2xl tracking-[0.3em] font-bold">
            NOVAN.
          </Link>

          {/* Desktop Nav Right */}
          <nav className="hidden lg:flex items-center gap-10 flex-1 justify-end">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="luxury-button text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4 lg:ml-10">
            <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" className="p-1">
              <Search size={18} />
            </button>
            <button onClick={handleProfileClick} aria-label="Profile" className="p-1">
              <User size={18} />
            </button>
            <button onClick={() => dispatch(openCart())} aria-label="Cart" className="p-1 relative">
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center font-body">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden bg-background"
            >
              <div className="container py-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-transparent font-body text-sm outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer from Left */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-foreground/30"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[80%] max-w-sm bg-background flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="font-serif text-lg tracking-[0.3em] font-bold">NOVAN.</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col px-6 pt-10 gap-8">
                {mobileLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="font-serif text-2xl lg:text-3xl tracking-wider font-semibold text-foreground hover:text-foreground/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
