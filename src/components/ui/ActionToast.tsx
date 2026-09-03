import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ActionToastProps {
  isVisible: boolean;
  message: string;
}

export const ActionToast: React.FC<ActionToastProps> = ({ isVisible, message }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-[#0f1f33] border border-[#223f66] text-[#f8fafc] text-sm font-medium rounded-xl shadow-2xl"
        >
          <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
