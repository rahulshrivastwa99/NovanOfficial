
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, RefreshCcw, ShieldCheck, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20 container max-w-4xl px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
            <h1 className="font-serif text-3xl md:text-5xl">Returns & Exchanges</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
                We want you to love what you ordered. If something isn't right, let us know.
            </p>
        </div>

        {/* Policy Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-secondary/20 p-6 rounded-xl text-center space-y-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Clock size={24} />
                </div>
                <h3 className="font-bold">7-Day Window</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    You have 7 days from the date of delivery to request a return or exchange.
                </p>
            </div>
            <div className="bg-secondary/20 p-6 rounded-xl text-center space-y-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <ShieldCheck size={24} />
                </div>
                <h3 className="font-bold">Condition</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Items must be unused, unwashed, and with original tags attached.
                </p>
            </div>
            <div className="bg-secondary/20 p-6 rounded-xl text-center space-y-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <RefreshCcw size={24} />
                </div>
                <h3 className="font-bold">Easy Process</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Self-ship or schedule a pickup (available in most locations) directly from your orders page.
                </p>
            </div>
        </div>

        {/* Detailed Policy */}
        <div className="space-y-12">
            <section className="space-y-4">
                <h2 className="font-serif text-2xl border-b pb-2">Return Policy</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground marker:text-foreground">
                    <li>Returns are accepted within 7 days of delivery.</li>
                    <li>Refunds are processed to the original payment method for prepaid orders.</li>
                    <li>For COD orders, refunds are transferred to your provided bank account/UPI within 5-7 business days after the item is picked up and quality checked.</li>
                    <li>Shipping charges (if any) are non-refundable.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="font-serif text-2xl border-b pb-2">Exchange Policy</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground marker:text-foreground">
                    <li>We offer free size exchanges. If the fit isn't right, we'll replace it for you.</li>
                    <li>Exchange is subject to stock availability.</li>
                    <li>If the requested size is out of stock, we will process a refund instead.</li>
                </ul>
            </section>

             <section className="space-y-4">
                <h2 className="font-serif text-2xl border-b pb-2">How to Request</h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                    <p>1. Go to <Link to="/orders" className="text-foreground underline font-medium">My Orders</Link>.</p>
                    <p>2. Select the order you want to return/exchange.</p>
                    <p>3. Click on the <strong>"Return / Exchange"</strong> button next to the delivered item.</p>
                    <p>4. Select the reason and type of request (Return or Exchange).</p>
                    <p>5. Submit your request. We will update you via email/SMS.</p>
                </div>
            </section>
        </div>

        <div className="mt-16 text-center">
            <Link to="/orders" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity">
                Go to My Orders
            </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
