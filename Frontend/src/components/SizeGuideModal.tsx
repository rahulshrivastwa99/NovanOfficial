import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');

  const sizeData = {
    men: [
      { size: 'S', chest: '36-38"', waist: '28-30"' },
      { size: 'M', chest: '38-40"', waist: '30-32"' },
      { size: 'L', chest: '40-42"', waist: '32-34"' },
      { size: 'XL', chest: '42-44"', waist: '34-36"' },
    ],
    women: [
      { size: 'S', chest: '32-34"', waist: '24-26"' },
      { size: 'M', chest: '34-36"', waist: '26-28"' },
      { size: 'L', chest: '36-38"', waist: '28-30"' },
      { size: 'XL', chest: '38-40"', waist: '30-32"' },
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[90%] max-w-2xl bg-background p-6 lg:p-8 shadow-2xl border border-border"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Size Guide</h2>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-4 mb-6 border-b border-border">
              {(['men', 'women'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-4 capitalize font-body text-sm transition-colors border-b-2 ${
                    activeTab === tab 
                      ? 'border-foreground text-foreground font-medium' 
                      : 'border-transparent text-muted-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 font-serif font-normal text-muted-foreground">Size</th>
                    <th className="py-3 px-4 font-serif font-normal text-muted-foreground">Chest (in)</th>
                    <th className="py-3 px-4 font-serif font-normal text-muted-foreground">Waist (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData[activeTab].map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-secondary/20' : ''}>
                      <td className="py-3 px-4 font-body font-medium">{row.size}</td>
                      <td className="py-3 px-4 font-body text-muted-foreground">{row.chest}</td>
                      <td className="py-3 px-4 font-body text-muted-foreground">{row.waist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-secondary/30 text-xs text-muted-foreground">
              <p>Measurements are in inches. If you are in between sizes, we recommend sizing up for a more relaxed fit.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuideModal;
