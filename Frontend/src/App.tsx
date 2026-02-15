import { useState, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Preloader from "./components/Preloader";
import LogoutOverlay from "./components/LogoutOverlay";
import AuthModal from "./components/AuthModal";
import CartDrawer from "./components/CartDrawer";
import NewsletterPopup from "./components/NewsletterPopup";
import CookieConsent from "./components/CookieConsent";
import ScrollToTop from "./components/ScrollToTop";

import AxiosInterceptor from "./components/AxiosInterceptor";

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Orders = lazy(() => import("./pages/Orders"));
const Success = lazy(() => import("./pages/Success"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const AddProduct = lazy(() => import("./pages/admin/AddProduct"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Support Pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const RefundCancellation = lazy(() => import("./pages/RefundCancellation"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ShippingReturns = lazy(() => import("./pages/ShippingReturns"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));

const queryClient = new QueryClient();

// Simple loading spinner for page transitions
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {loading && <Preloader onComplete={() => setLoading(false)} />}
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AxiosInterceptor />
            <ScrollToTop />
            <AuthModal />
            <LogoutOverlay />
            <CartDrawer />
            <NewsletterPopup />
            <CookieConsent />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/success" element={<Success />} />

                {/* Support Routes */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/refund" element={<RefundCancellation />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<ShippingReturns />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />

                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/add" element={<AddProduct />} />
                  <Route path="products/edit/:id" element={<AddProduct />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
