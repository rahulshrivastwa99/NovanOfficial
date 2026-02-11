import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store";
import { openCart } from "@/store/cartSlice";
import { openAuthModal, logout } from "@/store/authSlice";
import { toast } from "sonner";
import SearchDrawer from "./SearchDrawer";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const { isLoggedIn, user } = useAppSelector((s) => s.auth);
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

  const mobileLinks = [
    { to: "/shop", label: "SHOP" },
    { to: "/shop?category=men", label: "MEN" },
    { to: "/shop?category=women", label: "WOMEN" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
  ];

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setProfileOpen(!profileOpen);
    } else {
      dispatch(openAuthModal());
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

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

          <Link
            to="/"
            className="font-serif text-xl lg:text-2xl tracking-[0.3em] font-bold"
          >
            NOVAN.
          </Link>

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

          <div className="flex items-center gap-4 lg:ml-10">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-1"
            >
              <Search size={18} />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="p-1 relative">
              <Heart size={18} />
              {totalWishlist > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center font-body rounded-full">
                  {totalWishlist}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={handleProfileClick}
                aria-label="Profile"
                className="p-1"
              >
                <User size={18} />
              </button>

              <AnimatePresence>
                {profileOpen && isLoggedIn && (
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
                      className="absolute right-0 top-full mt-2 w-48 bg-background border border-border shadow-lg z-50 py-2"
                    >
                      <div className="px-4 py-3 border-b border-border bg-secondary/30">
                        <p className="font-medium text-sm truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Orders
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm hover:bg-secondary transition-colors text-blue-600"
                          onClick={() => setProfileOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          dispatch(logout());
                          setProfileOpen(false);
                          toast.success("Logged out successfully");
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors text-red-500 border-t border-border mt-1"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => dispatch(openCart())}
              aria-label="Cart"
              className="p-1 relative"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center font-body">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <SearchDrawer
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] bg-foreground/30"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[90] w-[80%] max-sm bg-background flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="font-serif text-lg tracking-[0.3em] font-bold">
                  NOVAN.
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col px-6 pt-10 gap-6">
                {mobileLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="font-serif text-2xl tracking-[0.15em] font-medium text-foreground hover:text-foreground/60 transition-colors uppercase block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {isLoggedIn && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-8 mt-4 border-t border-border flex flex-col gap-5"
                  >
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
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setMobileOpen(false);
                      }}
                      className="font-serif text-lg tracking-widest text-left text-red-500 hover:text-red-600 uppercase transition-colors"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
