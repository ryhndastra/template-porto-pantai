import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloodWaveOverlayProps {
  isFlooding: boolean;
}

export const FloodWaveOverlay: React.FC<FloodWaveOverlayProps> = ({ isFlooding }) => {
  return (
    <AnimatePresence>
      {isFlooding && (
        <motion.div
          initial={{ x: '-120%' }}
          animate={{ x: '125%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3.4, ease: [0.25, 0.9, 0.35, 1] }}
          className="absolute inset-y-0 w-[140%] z-40 pointer-events-none flex items-center overflow-visible"
        >
          {/* Ocean Wave */}
          <div className="relative w-full h-full">
            <svg
              viewBox="0 0 1000 900"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_35px_rgba(2,88,122,0.6)]"
            >
              <defs>
                <linearGradient id="deepWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#013a52" stopOpacity="1" />
                  <stop offset="60%" stopColor="#02587a" stopOpacity="0.98" />
                  <stop offset="85%" stopColor="#0284c7" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="crestCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="foamWhiteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
              </defs>

              <path
                d="M0,0 L720,0 C820,120 740,240 840,360 C920,460 760,580 870,700 C940,780 820,860 860,900 L0,900 Z"
                fill="url(#deepWaveGrad)"
              />

              <path
                d="M0,0 L760,0 C860,130 780,260 880,380 C950,470 800,600 910,720 C970,790 860,860 900,900 L0,900 Z"
                fill="url(#crestCyanGrad)"
                opacity="0.92"
              />

              <path
                d="M740,0 C840,110 770,220 870,350 C940,440 790,560 900,680 C960,760 850,840 890,900 L930,900 C890,830 990,750 930,670 C830,550 970,430 890,330 C800,210 870,100 780,0 Z"
                fill="url(#foamWhiteGrad)"
              />

              <circle cx="875" cy="80" r="14" fill="#ffffff" opacity="0.95" />
              <circle cx="890" cy="140" r="20" fill="#ffffff" opacity="0.95" />
              <circle cx="860" cy="210" r="16" fill="#ffffff" opacity="0.9" />
              <circle cx="910" cy="290" r="24" fill="#ffffff" opacity="0.98" />
              <circle cx="930" cy="370" r="28" fill="#ffffff" opacity="0.98" />
              <circle cx="885" cy="460" r="22" fill="#ffffff" opacity="0.95" />
              <circle cx="940" cy="540" r="26" fill="#ffffff" opacity="0.98" />
              <circle cx="920" cy="640" r="24" fill="#ffffff" opacity="0.95" />
              <circle cx="955" cy="720" r="22" fill="#ffffff" opacity="0.95" />
              <circle cx="915" cy="810" r="20" fill="#ffffff" opacity="0.9" />
              <circle cx="935" cy="870" r="16" fill="#ffffff" opacity="0.9" />
            </svg>

            <div className="absolute right-0 inset-y-0 w-36 overflow-visible pointer-events-none">
              {[...Array(28)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 0, y: (i * 32) % 850 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, 50 + (i * 9) % 70],
                    y: [((i * 32) % 850), ((i * 32) % 850) + ((i % 2 === 0 ? -35 : 35))]
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: (i * 0.035) % 1.1
                  }}
                  className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-lg blur-[0.4px]"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
