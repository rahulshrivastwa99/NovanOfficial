import { Frown } from 'lucide-react';
import { useAppDispatch } from '@/store';
import { openAuthModal } from '@/store/authSlice';
import Navbar from './Navbar';
import Footer from './Footer';

const LoginRequired = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <Frown size={80} strokeWidth={1.5} className="text-foreground mb-6" />
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">OOPS!</h1>
                <p className="text-muted-foreground mb-8 text-lg font-light">Please Login To Continue</p>
                <button
                    onClick={() => dispatch(openAuthModal({ mode: 'login' }))}
                    className="bg-primary text-primary-foreground px-12 py-3 rounded-none uppercase tracking-[0.2em] text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    Login
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default LoginRequired;
