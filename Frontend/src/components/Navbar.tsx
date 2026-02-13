import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, Heart, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store";
import { openCart } from "@/store/cartSlice";
import { openAuthModal, logout, initiateLogout } from "@/store/authSlice";
import { toast } from "sonner";
import SearchDrawer from "./SearchDrawer";
import AuthModal from "./AuthModal"; // <--- IMPORT THIS

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Get Redux state
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  // Check if user is logged in
  const { user } = useAppSelector((s) => s.auth);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalWishlist = wishlistItems.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const handleProfileClick = () => {
    if (user) {
      setProfileOpen(!profileOpen);
    } else {
      dispatch(openAuthModal());
    }
  };

  const handleLogout = () => {
    dispatch(initiateLogout());
    setProfileOpen(false);
    // Overlay handles the rest
  };

  return (
    <>
      {/* Include the AuthModal here so it can be opened */}
      <AuthModal /> 

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="luxury-button text-foreground/70 hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl lg:text-3xl tracking-[0.2em] font-bold z-50"
          >
            NOVAN.
          </Link>

          {/* Desktop Right Nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="luxury-button text-foreground/70 hover:text-foreground transition-colors duration-300 text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-5 ml-4 border-l border-border/50 pl-6">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="hover:text-foreground/70 transition-colors"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-foreground/70 transition-colors">
                <Heart size={20} strokeWidth={1.5} />
                {totalWishlist > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center font-body rounded-full">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  aria-label="Profile"
                  className="hover:text-foreground/70 transition-colors flex items-center gap-2"
                >
                  <User size={20} strokeWidth={1.5} />
                  {user && <span className="text-xs font-medium uppercase hidden xl:block">{user.name.split(' ')[0]}</span>}
                </button>

                <AnimatePresence>
                  {profileOpen && user && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setProfileOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-4 w-56 bg-background border border-border shadow-xl z-50 py-2 rounded-sm"
                      >
                        <div className="px-5 py-3 border-b border-border bg-secondary/30">
                          <p className="font-medium text-sm truncate text-foreground">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="block px-5 py-2.5 text-sm hover:bg-secondary/50 transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/orders"
                            className="block px-5 py-2.5 text-sm hover:bg-secondary/50 transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            My Orders
                          </Link>
                          {user.isAdmin && (
                            <Link
                              to="/admin/dashboard"
                              className="block px-5 py-2.5 text-sm hover:bg-secondary/50 transition-colors text-blue-600 font-medium"
                              onClick={() => setProfileOpen(false)}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                        </div>

                        <div className="border-t border-border mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-5 py-2.5 text-sm hover:bg-red-50 text-red-500 transition-colors flex items-center gap-2"
                          >
                            <LogOut size={14} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button
                onClick={() => dispatch(openCart())}
                aria-label="Cart"
                className="relative hover:text-foreground/70 transition-colors"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center font-body rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>

        <SearchDrawer
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[90] w-[85%] max-w-sm bg-background flex flex-col shadow-2xl border-r border-border"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="font-serif text-lg tracking-[0.2em] font-bold">
                  NOVAN.
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className="font-serif text-2xl tracking-widest font-medium text-foreground hover:text-foreground/60 transition-colors uppercase block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="w-10 h-px bg-border my-2"></div>

                  {user ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col gap-5"
                    >
                       <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg font-serif">
                             {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                       </div>

                      <Link
                        to="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="font-serif text-lg tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setMobileOpen(false)}
                        className="font-serif text-lg tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors"
                      >
                        My Orders
                      </Link>
                      {user.isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setMobileOpen(false)}
                          className="font-serif text-lg tracking-widest text-blue-600 hover:text-blue-700 uppercase transition-colors font-semibold"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileOpen(false);
                        }}
                        className="font-serif text-lg tracking-widest text-left text-red-500 hover:text-red-600 uppercase transition-colors mt-2"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => {
                        dispatch(openAuthModal());
                        setMobileOpen(false);
                      }}
                      className="font-serif text-xl tracking-widest text-left text-foreground hover:text-foreground/70 uppercase transition-colors"
                    >
                      Login / Sign Up
                    </motion.button>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;