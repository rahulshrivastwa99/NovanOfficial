import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Heart,
  LogOut,
  Package,
  Truck,
  Sparkles,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store";
import { openCart } from "@/store/cartSlice";
import { fetchWishlist } from "@/store/wishlistSlice";
import { openAuthModal, initiateLogout } from "@/store/authSlice";
import SearchDrawer from "./SearchDrawer";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // State for Scroll Behavior
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // --- ROTATING ANNOUNCEMENTS ---
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  const announcements = [
    {
      text: "FREE SHIPPING ON ORDERS ABOVE ₹4999",
      icon: <Truck size={13} className="text-emerald-400" />,
    },
    {
      text: "GET FLAT ₹100 OFF ON YOUR FIRST PURCHASE | USE CODE: MRFIRST. *T&C APPLY.",
      icon: <Sparkles size={13} className="text-emerald-400" />,
    },
    {
      text: "NOVAN'S OFFICIAL WEBSITE – ORDER ONLY HERE",
      icon: <ShieldCheck size={13} className="text-emerald-400" />,
    },
    {
      text: "NEW COLLECTION NOW AVAILABLE",
      icon: <Tag size={13} className="text-emerald-400" />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  // ---------------------------

  // --- SCROLL LOGIC ---
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility (Hide on down scroll, show on up scroll)
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine background style
      setScrolled(currentScrollY > 50);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // ---------------------------

  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const { user } = useAppSelector((s) => s.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalWishlist = wishlistItems.length;

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [user, dispatch]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    dispatch(initiateLogout());
    setProfileOpen(false);
  };

  return (
    <>
      <AuthModal />

      <header
        // UPDATED: Added duration-500 and ease-in-out for smooth sliding
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent 
        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
        ${scrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-border/40" : "bg-transparent"}`}
      >
        {/* --- ROTATING ANNOUNCEMENT BAR --- */}
        <div className="w-full bg-black py-2.5 overflow-hidden relative border-b border-gray-800">
          <div className="container flex items-center justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncement}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 absolute w-full justify-center px-4"
              >
                <span className="flex-shrink-0">
                  {announcements[currentAnnouncement].icon}
                </span>
                <span className="text-white font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium text-center truncate">
                  {announcements[currentAnnouncement].text}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Invisible spacer */}
            <div className="opacity-0 flex items-center gap-2 py-0.5">
              <span className="text-[11px]">Placeholder</span>
            </div>
          </div>
        </div>

        <div
          className={`container flex items-center h-16 lg:h-20 transition-all duration-500`}
        >
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2 mr-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl lg:text-3xl tracking-[0.1em] font-bold z-50 mr-8 lg:mr-12"
          >
            NOVAN
            <span className="text-[10px] align-top ml-0.5 tracking-normal font-sans font-light">
              ®
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group relative text-xs tracking-[0.15em] font-medium uppercase text-foreground/70 hover:text-foreground transition-colors font-sans"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex-1"></div>

          {/* Right Section */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Track Order */}
            <Link
              to="/orders"
              className="hidden xl:flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors mr-2"
            >
              <Package
                size={16}
                strokeWidth={1.5}
                className="group-hover:text-black transition-colors"
              />
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500 group-hover:text-black">
                Track Order
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center relative group/search w-64 bg-secondary/30 hover:bg-secondary/50 focus-within:bg-background border border-transparent focus-within:border-border rounded-full transition-all duration-300">
              <Search
                size={16}
                strokeWidth={1.5}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/search:text-foreground transition-colors"
                onClick={() => {
                  if (searchQuery.trim()) {
                    navigate(
                      `/shop?keyword=${encodeURIComponent(searchQuery.trim())}`,
                    );
                  }
                }}
                style={{ cursor: "pointer" }}
              />
              <input
                type="text"
                placeholder="Search Novan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    navigate(
                      `/shop?keyword=${encodeURIComponent(searchQuery.trim())}`,
                    );
                  }
                }}
                className="pl-10 pr-10 py-2 w-full text-sm bg-transparent border-none focus:ring-0 outline-none placeholder:text-muted-foreground/90 font-sans font-light tracking-wide placeholder:tracking-normal"
              />
              <button
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-opacity ${searchQuery ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden hover:scale-110 transition-transform text-foreground/80"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hover:scale-110 transition-transform duration-300 text-foreground/80 hover:text-foreground"
            >
              <Heart size={20} strokeWidth={1.5} />
              {totalWishlist > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-black text-white text-[9px] flex items-center justify-center font-medium rounded-full">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                onClick={() => {
                  if (!user) {
                    dispatch(openAuthModal({ mode: "login" }));
                  } else {
                    navigate("/profile");
                  }
                }}
                aria-label="Profile"
                className="hover:scale-110 transition-transform duration-300 flex items-center gap-2 py-2 text-foreground/80 hover:text-foreground"
              >
                <User size={20} strokeWidth={1.5} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-64 bg-background/95 backdrop-blur-xl border border-border shadow-2xl z-50 p-2 rounded-sm"
                  >
                    {user ? (
                      <>
                        <div className="px-5 py-4 border-b border-border/50 bg-secondary/20 mb-2">
                          <p className="font-medium text-sm truncate text-foreground tracking-wide font-sans">
                            {user.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider mt-1 font-sans">
                            {user.email}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-secondary/50 transition-colors rounded-sm font-sans"
                            onClick={() => setProfileOpen(false)}
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/orders"
                            className="block px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-secondary/50 transition-colors rounded-sm font-sans"
                            onClick={() => setProfileOpen(false)}
                          >
                            My Orders
                          </Link>
                          {user.isAdmin && (
                            <Link
                              to="/admin/dashboard"
                              className="block px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-secondary/50 transition-colors rounded-sm text-foreground font-sans"
                              onClick={() => setProfileOpen(false)}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                        </div>

                        <div className="border-t border-border/50 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-red-50 text-red-500 transition-colors flex items-center gap-2 rounded-sm font-sans"
                          >
                            <LogOut size={12} /> Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-5 text-center">
                        <h3 className="text-sm font-serif mb-1 tracking-wide">
                          WELCOME TO NOVAN
                        </h3>
                        <p className="text-[10px] text-muted-foreground mb-4 leading-relaxed font-sans">
                          Join our community for exclusive access and rewards.
                        </p>
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              dispatch(openAuthModal({ mode: "login" }));
                              setProfileOpen(false);
                            }}
                            className="w-full bg-black text-white text-[10px] font-bold uppercase py-2.5 hover:bg-gray-900 transition-all tracking-[0.2em] font-sans"
                          >
                            Login
                          </button>
                          <button
                            onClick={() => {
                              dispatch(openAuthModal({ mode: "signup" }));
                              setProfileOpen(false);
                            }}
                            className="w-full border border-black text-black text-[10px] font-bold uppercase py-2.5 hover:bg-secondary transition-all tracking-[0.2em] font-sans"
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              aria-label="Cart"
              className="relative hover:scale-110 transition-transform duration-300 text-foreground/80 hover:text-foreground"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-foreground text-background text-[9px] flex items-center justify-center font-medium rounded-full">
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
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <span className="text-xl tracking-[0.2em] font-bold font-serif">
                  NOVAN.
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:rotate-90 transition-all duration-300"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-6">
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
                        className="text-2xl font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors uppercase block font-sans"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Wishlist & Track Order for Mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <Link
                      to="/wishlist"
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors uppercase block flex items-center gap-3 font-sans"
                    >
                      Wishlist
                      {totalWishlist > 0 && (
                        <span className="text-sm bg-foreground text-background px-2 py-0.5 rounded-full font-bold">
                          {totalWishlist}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors uppercase block font-sans"
                    >
                      Track Order
                    </Link>
                  </motion.div>
                </div>

                <div className="w-10 h-px bg-border/50 my-8"></div>

                {user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex items-center gap-3 mb-4 bg-secondary/30 p-3 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg font-medium border border-border">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm font-sans">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors font-sans"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors font-sans"
                    >
                      My Orders
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="text-lg tracking-widest text-blue-600 hover:text-blue-700 uppercase transition-colors font-semibold font-sans"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="text-lg tracking-widest text-left text-red-500 hover:text-red-600 uppercase transition-colors mt-2 font-sans"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => {
                        dispatch(openAuthModal({ mode: "login" }));
                        setMobileOpen(false);
                      }}
                      className="w-full bg-foreground text-background py-4 text-sm font-bold uppercase tracking-widest hover:bg-foreground/90 transition-all font-sans"
                    >
                      Login
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      onClick={() => {
                        dispatch(openAuthModal({ mode: "signup" }));
                        setMobileOpen(false);
                      }}
                      className="w-full border border-foreground text-foreground py-4 text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-all font-sans"
                    >
                      Sign Up
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
