import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppDispatch } from '@/store';
import { resetOrder } from '@/store/orderSlice';

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Reset order state when landing here
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-20 px-4">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center max-w-md w-full border border-border"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500 w-20 h-20" />
          </div>
          
          <h1 className="font-serif text-3xl mb-4 text-foreground">Order Placed Successfully!</h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>

          <div className="space-y-3">
             <button 
               onClick={() => navigate('/orders')}
               className="w-full bg-foreground text-background py-3 luxury-button hover:bg-black/80 transition-all font-medium rounded-sm"
             >
               View My Orders
             </button>
             
             <button 
               onClick={() => navigate('/shop')}
               className="w-full border border-border py-3 luxury-button hover:border-foreground transition-all font-medium rounded-sm"
             >
               Continue Shopping
             </button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Success;
