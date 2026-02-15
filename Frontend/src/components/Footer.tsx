import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Welcome to the Novan Fam!");
      setEmail("");
    }
  };

  const socialLinks = [
    { name: "INSTAGRAM", icon: Instagram, url: "#" },
    { name: "LINKEDIN", icon: Linkedin, url: "#" },
    { name: "TWITTER", icon: Twitter, url: "#" },
    {
      name: "WHATSAPP",
      icon: MessageCircle,
      url: "https://wa.me/919958849763",
    },
  ];

  return (
    <footer className="bg-black text-white overflow-hidden">
      {/* TOP SECTION: HEADER + SUBSCRIBE */}
      <div className="container py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0 mb-8">
          <div className="max-w-xl">
            <h2 className="font-black text-3xl lg:text-5xl uppercase leading-none tracking-tighter">
              JOIN OUR <br />
              <span className="text-white">NOVAN FAM</span>
            </h2>
          </div>

          <div className="w-full lg:w-auto min-w-[280px] lg:min-w-[350px]">
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-black px-4 py-3 pr-28 font-bold text-sm focus:outline-none rounded-sm"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-black text-white px-4 font-bold text-xs uppercase tracking-wider hover:bg-gray-900 transition-colors rounded-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* SOCIAL BAR */}
        <div className="border-t border-b border-white/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/20 border-l border-r border-white/20">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="flex items-center gap-3 p-4 hover:bg-white/10 transition-colors group justify-center lg:justify-start"
              >
                <div className="bg-white text-black p-1.5 rounded-full group-hover:scale-110 transition-transform">
                  <social.icon size={14} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xs tracking-widest">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* LINKS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 border-b border-white/20">
          {/* Categories */}
          <div className="p-6 lg:p-8">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-5">
              Categories
            </h4>
            <ul className="space-y-2">
              {["Men", "Women", "Accessories", "New Arrivals"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/shop?category=${link.toLowerCase().replace(" ", "-")}`}
                    className="font-bold text-sm hover:text-gray-300 transition-colors uppercase block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="p-6 lg:p-8">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-5">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", path: "/about" },
                { label: "Terms & Conditions", path: "/terms" },
                { label: "Privacy Policy", path: "/privacy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-bold text-sm hover:text-gray-300 transition-colors uppercase block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customers */}
          <div className="p-6 lg:p-8">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-5">
              Customers
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Contact Us", path: "/contact" },
                { label: "FAQs", path: "/faq" },
                { label: "Shipping & Returns", path: "/shipping" },
                { label: "Refund Policy", path: "/refund" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-bold text-sm hover:text-gray-300 transition-colors uppercase block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="border-t border-b border-white/10 bg-white text-black py-2 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-3xl lg:text-5xl font-black uppercase tracking-tighter mx-6"
            >
              FIND YOUR STYLE{" "}
              <span
                className="text-transparent stroke-text"
                style={{ WebkitTextStroke: "1px black" }}
              >
                — NOVAN
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-black text-gray-500 py-4 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-bold tracking-widest uppercase">
        <p>&copy; 2026 Novan Official. All Rights Reserved.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          Back to Top <ArrowRight size={12} className="-rotate-90" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
