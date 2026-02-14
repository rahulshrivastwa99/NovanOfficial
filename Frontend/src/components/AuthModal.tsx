import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
// Make sure these match the exports in your store/authSlice.ts
import { loginUser as login, registerUser as register, closeAuthModal, clearError } from '@/store/authSlice'; 
import { toast } from 'sonner';

const AuthModal = () => {
  // Get state from Redux
  const { showAuthModal, isLoading, error, user, initialMode } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Initialize mode based on Redux state when modal opens
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode || 'login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync mode with Redux initialMode whenever the modal opens
  useEffect(() => {
    if (showAuthModal) {
        setMode(initialMode || 'login');
    }
  }, [showAuthModal, initialMode]);

  // 1. Handle Errors (e.g. "User already exists")
  useEffect(() => {
    if (error) {
      toast.error(error, { id: 'auth-error' });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // 2. Handle Success
  useEffect(() => {
    if (user && showAuthModal && !isLoading) {
       const message = mode === 'login' 
         ? `Welcome back, ${user.name.split(' ')[0]}!` 
         : `Welcome to Novan, ${user.name.split(' ')[0]}!`;
       toast.success(message, { id: 'auth-success' });
       
       setIsSuccess(true);
       
       const timer = setTimeout(() => {
         dispatch(closeAuthModal());
         // Reset state after close animation completes
         setTimeout(() => setIsSuccess(false), 300); 
       }, 2000);

       return () => clearTimeout(timer);
    }
  }, [user, isLoading, showAuthModal, dispatch, mode]);

  // 3. Clear inputs when mode changes
  useEffect(() => {
    dispatch(clearError());
    // Only clear inputs if NOT switching modes during a session, 
    // but here we just clear them to be safe.
    // If you want to keep email when switching, you can condition this.
    setEmail('');
    setPassword('');
    setName('');
  }, [mode, dispatch]);

  // 4. Reset state when modal closes
  useEffect(() => {
    if (!showAuthModal) {
      // Wait for exit animation to finish before resetting state
      const timer = setTimeout(() => {
        setIsSuccess(false);
        // We don't strictly need to reset to 'login' here as it will be set by initialMode next time
        setEmail('');
        setPassword('');
        setName('');
        dispatch(clearError());
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showAuthModal, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      dispatch(login({ email, password }));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => dispatch(closeAuthModal())}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-background p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
             <button 
                onClick={() => dispatch(closeAuthModal())} 
                aria-label="Close"
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:rotate-90 transition-all z-10"
              >
                <X size={20} />
              </button>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full flex flex-col items-center justify-center py-10 space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20, 
                      delay: 0.1 
                    }}
                    className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg"
                  >
                    <Check size={48} strokeWidth={3} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <h2 className="font-serif text-3xl mb-2">Success!</h2>
                    <p className="text-muted-foreground font-body">
                      {mode === 'login' ? 'You are now signed in.' : 'Your account has been created.'}
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                <div className="mb-8">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="font-serif text-3xl mb-2"
                  >
                    {mode === 'login' ? 'Welcome Back.' : 'Join Novan.'}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-muted-foreground text-sm font-body"
                  >
                    {mode === 'login' ? 'Sign in to access your account' : 'Create an account to verify your style'}
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full Name"
                        className="w-full border-b border-border py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent placeholder:text-muted-foreground/50"
                      />
                    </motion.div>
                  )}
                  <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email Address"
                      className="w-full border-b border-border py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent placeholder:text-muted-foreground/50"
                    />
                  </motion.div>
                  
                  <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                  >
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                      className="w-full border-b border-border py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent placeholder:text-muted-foreground/50"
                    />
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full bg-foreground text-background py-4 luxury-button hover:bg-black/80 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-8 group rounded-sm shadow-lg"
                  >
                    {isLoading ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <span className="group-hover:tracking-widest transition-all duration-300">
                        {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
                      </span>
                    )}
                  </motion.button>
                </form>

                <div className="mt-8 text-center border-t border-border/50 pt-6">
                  <p className="font-body text-sm text-muted-foreground">
                    {mode === 'login' ? "New to Novan? " : 'Already a member? '}
                    <button
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="underline text-foreground hover:text-foreground/80 font-medium ml-1"
                    >
                      {mode === 'login' ? 'Create an account' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;