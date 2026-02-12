import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const LogoutOverlay = () => {
  const { isLoggingOut, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggingOut) {
      const timer = setTimeout(() => {
        dispatch(logout()); // Actually clear state
        navigate('/'); // Redirect home
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, [isLoggingOut, dispatch, navigate]);

  return (
    <AnimatePresence>
      {isLoggingOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex flex-col items-center justify-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 rounded-full bg-secondary/50"
          >
             <LogOut size={48} className="text-foreground animate-pulse" />
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-3xl md:text-4xl text-center"
          >
            See you soon, {user?.name.split(' ')[0]}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground font-body tracking-wider uppercase text-sm"
          >
            Signing out...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoutOverlay;
