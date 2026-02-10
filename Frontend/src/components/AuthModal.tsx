import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { login, signup, closeAuthModal } from '@/store/authSlice';
import { toast } from 'sonner';

const AuthModal = () => {
  const { showAuthModal } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      dispatch(login({ email, password }));
      toast.success('Welcome back!');
    } else {
      dispatch(signup({ name, email, password }));
      toast.success('Account created successfully!');
    }
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40"
            onClick={() => dispatch(closeAuthModal())}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background p-8 lg:p-10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button onClick={() => dispatch(closeAuthModal())} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label className="luxury-button text-muted-foreground block mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                  />
                </div>
              )}
              <div>
                <label className="luxury-button text-muted-foreground block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                />
              </div>
              <div>
                <label className="luxury-button text-muted-foreground block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-border px-4 py-3 font-body text-sm outline-none focus:border-foreground transition-colors bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-foreground text-background py-4 luxury-button hover:bg-accent transition-colors"
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <p className="font-body text-sm text-center mt-6 text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="underline text-foreground"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>

            {mode === 'login' && (
              <p className="font-body text-xs text-center mt-4 text-muted-foreground">
                Admin access: admin@novan.com / any password
              </p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
