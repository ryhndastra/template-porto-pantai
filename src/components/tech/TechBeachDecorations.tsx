import React from 'react';
import { motion } from 'framer-motion';

export const TechBeachDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M-50,0 C320,110 580,30 920,120 C1240,210 1380,80 1500,140 L1500,900 L-50,900 Z"
            fill="#fcf3d1"
            opacity="0.85"
          />

          <path
            d="M-50,220 C280,350 640,190 980,320 C1260,420 1420,280 1500,340 L1500,900 L-50,900 Z"
            fill="#f6e8ba"
            opacity="0.8"
          />

          <path
            d="M-50,480 C360,390 740,560 1080,440 C1320,360 1440,500 1500,470 L1500,900 L-50,900 Z"
            fill="#f0dc9f"
            opacity="0.75"
          />
        </svg>
      </div>

      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-45"
      >
        <path
          d="M0,80 C360,160 620,80 960,170 C1260,250 1380,140 1440,190"
          stroke="#dfcca8"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M0,280 C320,400 680,240 1020,370 C1300,470 1400,330 1440,390"
          stroke="#c4ad82"
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />
        <path
          d="M0,540 C400,450 780,620 1120,500 C1360,420 1400,540 1440,510"
          stroke="#b39768"
          strokeWidth="1.5"
        />
      </svg>

      <motion.div
        animate={{ y: [0, -5, 0], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="absolute top-16 right-10 sm:right-28 opacity-90"
      >
        <svg width="48" height="48" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          {/* boat hull */}
          <polygon points="6,34 44,34 38,44 12,44" fill="#ef4444" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
          {/* main sail */}
          <polygon points="24,6 24,30 40,30" fill="#fffdf5" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
          {/* small front sail */}
          <polygon points="20,12 20,30 10,30" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
          {/* mast */}
          <line x1="22" y1="4" x2="22" y2="34" stroke="#0f172a" strokeWidth="2" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="absolute top-14 left-6 sm:left-16 opacity-85 pointer-events-none"
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          {/* umbrella canopy */}
          <path d="M6 26 C6 10 54 10 54 26 Z" fill="#fde047" stroke="#0f172a" strokeWidth="2" />
          {/* canopy stripes */}
          <path d="M18 26 C18 13 30 10 30 10 C30 10 22 17 22 26 Z" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
          <path d="M42 26 C42 13 30 10 30 10 C30 10 38 17 38 26 Z" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
          {/* umbrella pole */}
          <line x1="30" y1="10" x2="30" y2="52" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* sand mound base */}
          <ellipse cx="30" cy="52" rx="14" ry="4" fill="#ebdcae" stroke="#0f172a" strokeWidth="1.5" />
        </svg>
      </motion.div>

      <div className="absolute top-1/2 left-6 sm:left-14 opacity-80">
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <path
            d="M20 4 C30 4 36 12 36 22 C36 32 28 36 20 36 C10 36 4 28 4 20 C4 12 10 8 18 8 C24 8 28 12 28 18 C28 22 24 26 20 26 C16 26 14 22 14 19 C14 16 16 15 18 15"
            stroke="#0f172a"
            strokeWidth="2"
            strokeLinecap="round"
            fill="#faeed1"
          />
          <circle cx="18" cy="18" r="2" fill="#ca8a04" />
        </svg>
      </div>

      {/* wooden pier post with mooring rope */}
      <div className="absolute bottom-12 right-6 sm:right-20 opacity-85 pointer-events-none">
        <svg width="65" height="55" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          {/* sand mound */}
          <ellipse cx="35" cy="52" rx="28" ry="7" fill="#ebdcae" stroke="#0f172a" strokeWidth="1.5" />
          {/* primary wooden post */}
          <rect x="18" y="16" width="14" height="36" rx="2" fill="#d97706" stroke="#0f172a" strokeWidth="2" />
          <line x1="22" y1="20" x2="22" y2="48" stroke="#78350f" strokeWidth="1.5" opacity="0.6" />
          {/* secondary taller wooden post */}
          <rect x="36" y="8" width="16" height="44" rx="2" fill="#b45309" stroke="#0f172a" strokeWidth="2" />
          <line x1="42" y1="12" x2="42" y2="48" stroke="#78350f" strokeWidth="1.5" opacity="0.6" />
          {/* mooring rope */}
          <path d="M12 30 Q25 24 38 22 Q52 26 58 32" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 30 Q25 24 38 22 Q52 26 58 32" stroke="#0f172a" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
    </div>
  );
};
