import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Sparkles, Tag, ShieldCheck, AlertCircle } from "lucide-react";

const announcements = [
 {
  id: 1,
  text: "Get FLAT ₹100 OFF on your first purchase | Use code: MRFIRST. *T&C Apply.",
  icon: <Sparkles size={16} />,
},
{
  id: 2,
  text: "Free Shipping on Orders Above ₹999",
  icon: <Truck size={16} />,
},
{
  id: 3,
  text: "New Collection Now Available",
  icon: <Tag size={16} />,
},
{
  id: 4,
  text: "Novan's Official Website – Order Only Here",
  icon: <ShieldCheck size={16} />,
},
{
  id: 5,
  text: "We Do Not Operate Any Other Website",
  icon: <AlertCircle size={16} />,
},

];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black text-white h-9 flex items-center justify-center overflow-hidden relative z-[60]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full flex items-center justify-center gap-2 px-4"
        >
          <span className="text-[#00FF9C]">{announcements[currentIndex].icon}</span>
          <span className="text-xs font-medium tracking-widest uppercase">
            {announcements[currentIndex].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementBar;
