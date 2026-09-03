import React from 'react';
import { motion } from 'framer-motion';

export const BeachDecorations: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-64 z-20 pointer-events-none overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-1 sm:left-6 md:left-10 bottom-1 sm:bottom-3 pointer-events-auto cursor-pointer group scale-[0.62] sm:scale-[0.85] md:scale-100 origin-bottom-left"
      >
        <motion.div
          animate={{ rotate: [-1, 1.5, -1] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="relative"
        >
          <div className="absolute bottom-2 left-6 w-28 h-10 bg-[#ebdcae]/80 rounded-full blur-[3px] -rotate-6" />

          <svg width="140" height="160" viewBox="0 0 130 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            <path
              d="M40 145 C45 110, 38 75, 65 35"
              stroke="#8C6239"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M40 145 C45 110, 38 75, 65 35"
              stroke="#A07449"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path d="M42 125 L47 127" stroke="#664626" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M43 105 L48 107" stroke="#664626" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M45 85 L51 88" stroke="#664626" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M52 65 L58 68" stroke="#664626" strokeWidth="2.5" strokeLinecap="round" />

            <circle cx="62" cy="38" r="4.5" fill="#5C3A21" />
            <circle cx="68" cy="39" r="4.5" fill="#4A2E1A" />
            <circle cx="65" cy="43" r="4.5" fill="#5C3A21" />

            <path
              d="M65 35 Q30 15 5 30 Q35 30 65 35Z"
              fill="#2E7D32"
              stroke="#1B5E20"
              strokeWidth="1.5"
            />
            <path
              d="M65 35 Q35 35 15 65 Q45 50 65 35Z"
              fill="#388E3C"
              stroke="#1B5E20"
              strokeWidth="1.5"
            />
            <path
              d="M65 35 Q60 5 75 2 Q75 20 65 35Z"
              fill="#43A047"
              stroke="#2E7D32"
              strokeWidth="1.5"
            />
            <path
              d="M65 35 Q95 10 125 25 Q95 28 65 35Z"
              fill="#2E7D32"
              stroke="#1B5E20"
              strokeWidth="1.5"
            />
            <path
              d="M65 35 Q100 40 115 65 Q90 50 65 35Z"
              fill="#388E3C"
              stroke="#1B5E20"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="flex absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-14 md:bottom-20 pointer-events-auto flex-col items-center group cursor-pointer scale-[0.58] sm:scale-[0.78] md:scale-100 origin-bottom"
      >
        <div className="relative">
          <div className="absolute bottom-2 left-6 w-96 h-14 bg-[#ebdcae]/75 rounded-full blur-[3px]" />

          <svg width="380" height="125" viewBox="0 0 380 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
            <polygon
              points="20,60 360,60 338,116 42,116"
              fill="#f5ebb8"
              stroke="#dfcaa8"
              strokeWidth="2"
            />

            <polygon
              points="34,66 346,66 328,110 52,110"
              fill="none"
              stroke="#dfcaa8"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />

            <line x1="190" y1="60" x2="190" y2="116" stroke="#dfcaa8" strokeWidth="1.5" strokeDasharray="3 2" />

            <line x1="190" y1="12" x2="190" y2="60" stroke="#8C6239" strokeWidth="5" strokeLinecap="round" />
            <line x1="190" y1="68" x2="190" y2="120" stroke="#8C6239" strokeWidth="5" strokeLinecap="round" />

            <path
              d="M190 18 L190 108"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line x1="186" y1="28" x2="194" y2="28" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="186" y1="42" x2="194" y2="42" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="186" y1="56" x2="194" y2="56" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="186" y1="70" x2="194" y2="70" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="186" y1="84" x2="194" y2="84" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="186" y1="98" x2="194" y2="98" stroke="#E2E8F0" strokeWidth="1.5" />

            <polygon
              points="188,18 192,18 192,108 188,108"
              fill="#FFFFFF"
              opacity="0.65"
            />

            <line x1="190" y1="14" x2="160" y2="58" stroke="#A0AEC0" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="190" y1="14" x2="220" y2="58" stroke="#A0AEC0" strokeWidth="1" strokeDasharray="2 2" />

            <g transform="translate(255, 78)">
              <ellipse cx="11" cy="20" rx="10" ry="3.5" fill="#ebdcae" />
              <circle cx="11" cy="11" r="10.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
              <path d="M6 3 C8 7, 11 15, 6 20" stroke="#0284C7" strokeWidth="3" />
              <path d="M16 3 C14 7, 11 15, 16 20" stroke="#F59E0B" strokeWidth="3" />
            </g>
          </svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute right-1 sm:right-6 md:right-12 bottom-1 sm:bottom-3 pointer-events-auto flex items-end gap-1.5 sm:gap-2.5 md:gap-3 scale-[0.62] sm:scale-[0.85] md:scale-100 origin-bottom-right"
      >
        <motion.div
          whileHover={{ rotate: -18, y: -4 }}
          className="cursor-pointer select-none"
        >
          <div className="w-6 h-2 bg-[#ebdcae]/80 rounded-full blur-[1px] translate-y-1" />
          <svg width="32" height="72" viewBox="0 0 32 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-12 drop-shadow-md">
            <path
              d="M16 2 C26 18, 28 52, 22 70 C16 72, 16 72, 10 70 C4 52, 6 18, 16 2 Z"
              fill="#0284C7"
              stroke="#0369A1"
              strokeWidth="1.5"
            />
            <path
              d="M16 2 C18 18, 19 52, 16 70"
              stroke="#FFF9D4"
              strokeWidth="4"
            />
            <path
              d="M16 2 C18 18, 19 52, 16 70"
              stroke="#F97316"
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="cursor-pointer select-none relative mb-1"
        >
          <div className="absolute -bottom-1 left-2 w-24 h-4 bg-[#ebdcae]/80 rounded-full blur-[2px]" />
          <svg width="95" height="42" viewBox="0 0 95 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            <line x1="12" y1="28" x2="8" y2="40" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="28" x2="48" y2="40" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
            <line x1="82" y1="18" x2="86" y2="40" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
            <path
              d="M6 28 L55 28 L86 12"
              stroke="#A07449"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M8 26 L54 26 L84 11"
              stroke="#38BDF8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M18 26 L26 26 M36 26 L44 26 M62 22 L70 18"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect x="74" y="8" width="12" height="7" rx="3" fill="#F97316" stroke="#EA580C" strokeWidth="1" />
          </svg>
        </motion.div>

        <motion.div
          whileHover={{ rotate: 4, scale: 1.05 }}
          className="cursor-pointer select-none relative"
        >
          <div className="absolute -bottom-1 left-4 w-28 h-8 bg-[#ebdcae]/80 rounded-full blur-[3px]" />
          <svg width="105" height="115" viewBox="0 0 105 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
            <line x1="52" y1="35" x2="52" y2="112" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="52" y1="35" x2="52" y2="112" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            <circle cx="52" cy="18" r="3" fill="#F97316" />

            <path d="M52 20 Q30 22 8 42 Q30 38 52 35 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.2" />
            <path d="M52 20 Q38 24 28 42 Q40 38 52 35 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
            <path d="M52 20 Q48 25 48 42 Q50 38 52 35 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.2" />
            <path d="M52 20 Q56 25 68 42 Q60 38 52 35 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
            <path d="M52 20 Q74 22 96 42 Q74 38 52 35 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.2" />

            <path
              d="M8 42 Q18 46 28 42 Q38 46 48 42 Q58 46 68 42 Q78 46 88 42 Q96 46 96 42"
              stroke="#FFF9D4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
