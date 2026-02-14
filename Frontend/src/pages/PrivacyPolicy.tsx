import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";

const PrivacyPolicy = () => {
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
            className="mb-10"
          >
            <h1 className="font-serif text-4xl text-black leading-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm">
              Published in accordance with the Information Technology Act, 2000.
            </p>
          </motion.div>

          <div className="space-y-8 font-sans text-gray-700 leading-relaxed text-sm">
            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                INTRODUCTION
              </h3>
              <p>
                The online store www.novanclothing.com ("Online Store") is owned
                and operated by Novan Pvt Ltd, under the laws of India having
                its registered office in Delhi. Through this Policy,
                NovanClothing intends to convey the manner in which the user’s
                information is collated and used while providing the services of
                the Online Store. This Policy is binding on every user of the
                Online Store.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                USER INFORMATION
              </h3>
              <p>
                ‘User information’ for the purpose of this Policy includes
                personal information used to identify or contact a single person
                including name, email address, residential address, phone
                number, and transaction history. We collect information when you
                create an account, browse products, or transact a purchase via
                Razorpay.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                USE OF INFORMATION & DISCLOSURE
              </h3>
              <p>
                The User Information is primarily used to facilitate a better,
                customized use of the Online Store’s services. This includes
                responding to queries, completing purchases, and protecting the
                integrity of the store. We share information with third-party
                vendors for delivery and payment processing (Razorpay) purposes
                only.
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="font-serif text-xl text-black mb-3">
                MANDATORY UNBOXING VIDEO
              </h3>
              <p className="font-bold uppercase">
                Please kindly make sure to take the unboxing video whenever the
                order gets delivered. It helps in case of any discrepancy like
                Item Lost or Wrong Product Received. Refund in such cases is
                only possible if the Unboxing Video is available.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-black mb-3">
                GRIEVANCE OFFICER
              </h3>
              <p>
                In case of any complaints or grievances, you may contact our
                Support Team at <strong>Novan.clothing15@gmail.com</strong> or
                via WhatsApp at <strong>+91 9958849763</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
