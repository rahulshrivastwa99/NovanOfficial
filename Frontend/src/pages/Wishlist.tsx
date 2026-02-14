import { useAppSelector, useAppDispatch } from '@/store';
import { removeFromWishlist } from '@/store/wishlistSlice';
import { addToCart } from '@/store/cartSlice';
import Layout from '@/components/AdminLayout'; // Using standard layout if available, or just render Navbar/Footer
// Actually, I should check if there is a main layout. App.tsx renders Navbar manually in pages? No, App.tsx renders pages directly. 
// Shop.tsx probably has Navbar. Let's assume pages need to include Navbar.
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import LoginRequired from '@/components/LoginRequired';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { items: wishlistItems, loading } = useAppSelector((s) => s.wishlist);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!user) return <LoginRequired />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container pt-28 pb-20 lg:pt-32 lg:pb-24">
        <h1 className="font-serif text-3xl lg:text-4xl mb-12 text-center">My Wishlist</h1>

        {loading ? (
             <div className="flex justify-center items-center py-20">
                <div className="animate-pulse text-xl font-serif">Loading Wishlist...</div>
             </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {wishlistItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save items you love to your wishlist. Review them anytime and easily add them to your bag."
            actionLabel="Start Shopping"
            actionLink="/shop"
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
