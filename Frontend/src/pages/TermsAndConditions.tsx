import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const TermsAndConditions = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${isAtTop ? "bg-white/90 backdrop-blur-md border-b border-gray-100" : "bg-transparent"}`}
      >
        <Navbar />
      </div>
      <CartDrawer />
      <AuthModal />

      <main className="min-h-screen bg-white pt-28 px-4 md:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="font-serif text-4xl text-black leading-tight mb-2">
              Terms of Service
            </h1>
            <p className="text-gray-500 text-sm italic">
              Last Updated: February 2026
            </p>
          </motion.div>

          <div className="space-y-10 font-sans text-gray-700 leading-relaxed text-sm">
            <section>
              <h3 className="font-serif text-xl text-black mb-3">OVERVIEW</h3>
              <p>
                This website is operated by <strong>NovanClothing</strong>.
                Throughout the site, the terms “we”, “us” and “our” refer to
                NovanClothing. We offer this website, including all information,
                tools and services available from this site to you, the user,
                conditioned upon your acceptance of all terms, conditions,
                policies and notices stated here.
              </p>
              <p className="mt-2 text-gray-500 italic">
                By visiting our site and/or purchasing T-shirts from us, you
                engage in our “Service” and agree to be bound by these terms.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                SECTION 1 - ONLINE STORE TERMS
              </h3>
              <p>
                By agreeing to these Terms of Service, you represent that you
                are at least the age of majority in your state or province of
                residence. You may not use our products for any illegal or
                unauthorized purpose nor may you, in the use of the Service,
                violate any laws in your jurisdiction. A breach or violation of
                any of the Terms will result in an immediate termination of your
                Services.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                SECTION 2 - GENERAL CONDITIONS
              </h3>
              <p>
                We reserve the right to refuse service to anyone for any reason
                at any time. You understand that your content (not including
                credit card information) may be transferred unencrypted. Credit
                card information is always encrypted during transfer over
                networks via our authorized payment gateway,{" "}
                <strong>Razorpay</strong>.
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <h3 className="font-serif text-xl text-black mb-3 italic">
                RAZORPAY PAYMENT GUIDELINES
              </h3>
              <p className="mb-4">
                Our store uses <strong>Razorpay</strong> for secure and seamless
                payment processing. By transacting on NovanClothing, you agree
                to the following:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  We accept all major Credit/Debit Cards, UPI, Net Banking, and
                  Wallet payments via Razorpay.
                </li>
                <li>
                  Refunds for cancelled or returned orders will be credited back
                  to the original source of payment within 5-7 business days as
                  per Razorpay's processing timelines.
                </li>
                <li>
                  NovanClothing is not liable for any transaction failures or
                  delays caused by bank servers or the payment gateway
                  infrastructure.
                </li>
              </ul>
            </section>

            <section className="bg-black text-white p-8 rounded-xl">
              <h3 className="font-serif text-xl mb-3 text-white">
                MANDATORY UNBOXING VIDEO POLICY
              </h3>
              <p className="font-medium text-gray-300">
                PLEASE KINDLY MAKE SURE TO TAKE A CLEAR UNBOXING VIDEO WHENEVER
                YOUR ORDER GETS DELIVERED. This video is essential proof in case
                of any discrepancy like Item Lost, Duplicate Product Received,
                or Wrong Product Received. Refunds or replacements in such cases
                are ONLY possible if the Unboxing Video of the delivered parcel
                is available and shared with us at{" "}
                <strong>Novan.clothing15@gmail.com</strong> or WhatsApp{" "}
                <strong>+91 9958849763</strong>.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION
              </h3>
              <p>
                We reserve the right to refuse any order you place with us. We
                may, in our sole discretion, limit or cancel quantities
                purchased per person or per order. You agree to provide current,
                complete, and accurate purchase and account information for all
                purchases made at our store.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                SECTION 13 - LIMITATION OF LIABILITY
              </h3>
              <p>
                In no case shall NovanClothing, our directors, or employees be
                liable for any injury, loss, claim, or any direct, indirect,
                incidental, punitive, or consequential damages of any kind
                arising from your use of the service or any products procured
                using the service.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                SECTION 18 - GOVERNING LAW
              </h3>
              <p>
                These Terms of Service and any separate agreements whereby we
                provide you Services shall be governed by and construed in
                accordance with the laws of India. Any disputes arising shall be
                subject to the exclusive jurisdiction of the courts located in{" "}
                <strong>Delhi, India</strong>.
              </p>
            </section>

            <section className="pt-10 border-t border-gray-100 text-center">
              <h3 className="font-serif text-lg text-black mb-2">
                CONTACT INFORMATION
              </h3>
              <p className="text-gray-600">
                Questions about the Terms of Service should be sent to us at:
              </p>
              <p className="font-bold text-black mt-2">
                Email: Novan.clothing15@gmail.com
              </p>
              <p className="font-bold text-black">WhatsApp: +91 9958849763</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
