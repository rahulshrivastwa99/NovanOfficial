import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { toast } from 'sonner';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Shop */}
          <div>
            <h4 className="luxury-button text-primary-foreground/50 mb-6">Shop</h4>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/shop?category=men" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Men</Link></li>
              <li><Link to="/shop?category=women" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Women</Link></li>
              <li><Link to="/shop?category=accessories" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Accessories</Link></li>
              <li><Link to="/shop" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="luxury-button text-primary-foreground/50 mb-6">Company</h4>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">About</Link></li>
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Careers</Link></li>
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="luxury-button text-primary-foreground/50 mb-6">Support</h4>
            <ul className="space-y-3 font-body text-sm">
              <li><Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Stay in Touch */}
          <div>
            <h4 className="luxury-button text-primary-foreground/50 mb-6">Stay in Touch</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" aria-label="Instagram"><Instagram size={18} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" /></a>
              <a href="#" aria-label="Facebook"><Facebook size={18} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" /></a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-primary-foreground/10 pt-10">
          <div className="max-w-md">
            <h4 className="font-serif text-lg mb-3">Subscribe to our newsletter</h4>
            <p className="font-body text-sm text-primary-foreground/50 mb-5">Early access, exclusive offers, and new arrivals.</p>
            <form onSubmit={handleSubscribe} className="flex items-end gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="flex-1 bg-transparent border-b border-primary-foreground/30 pb-2 font-body text-sm outline-none placeholder:text-primary-foreground/30 focus:border-primary-foreground transition-colors"
              />
              <button type="submit" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground underline underline-offset-4 transition-colors luxury-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
          <p className="font-body text-xs text-primary-foreground/40">© 2026 Novan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
