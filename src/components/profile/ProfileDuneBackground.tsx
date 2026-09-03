import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileDuneBackgroundProps {
  isFlooded: boolean;
}

export const ProfileDuneBackground: React.FC<ProfileDuneBackgroundProps> = ({ isFlooded }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full opacity-70"
        >
          <path
            d="M-100,80 Q420,220 880,100 T1540,180 L1540,900 L-100,900 Z"
            fill="#fcf3d1"
          />
          <path
            d="M-100,280 Q520,420 1020,260 T1540,380 L1540,900 L-100,900 Z"
            fill={isFlooded ? '#e8d8a7' : '#f6e8ba'}
            opacity="0.85"
          />
          <path
            d="M-100,520 Q360,660 920,480 T1540,620 L1540,900 L-100,900 Z"
            fill={isFlooded ? '#dfcca8' : '#f0dc9f'}
            opacity="0.7"
          />
        </svg>
      </div>

      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-40"
      >
        <path
          d="M0,140 Q460,250 940,160 T1440,240"
          stroke="#dfcca8"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M0,340 Q560,460 1040,320 T1440,420"
          stroke="#c4ad82"
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />
        <path
          d="M0,580 Q400,680 960,540 T1440,640"
          stroke="#b39768"
          strokeWidth="1.5"
        />
      </svg>

      {isFlooded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg viewBox="0 0 1440 900" fill="none" className="w-full h-full">
            <g stroke="#8c6239" strokeWidth="2.5" strokeLinecap="round" opacity="0.65">
              <path d="M120,680 Q180,695 240,670 T320,710" />
              <path d="M720,720 Q800,750 880,715 T960,760" />
              <path d="M450,780 Q520,810 590,790" />
            </g>

            {/* Wet Water Pools */}
            <ellipse cx="380" cy="540" rx="160" ry="40" fill="#38bdf8" opacity="0.35" />
            <ellipse cx="960" cy="610" rx="210" ry="45" fill="#0284c7" opacity="0.3" />
            <ellipse cx="200" cy="730" rx="125" ry="30" fill="#38bdf8" opacity="0.4" />
            <ellipse cx="720" cy="780" rx="140" ry="32" fill="#0284c7" opacity="0.25" />
          </svg>
        </motion.div>
      )}

      {/* Sand Castle / Collapsed Mud Mound */}
      <div className="absolute bottom-16 right-10 sm:right-28 opacity-90 pointer-events-none">
        <AnimatePresence mode="wait">
          {!isFlooded ? (
            <motion.div
              key="castle-intact"
              initial={{ scale: 0.8, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <svg width="110" height="95" viewBox="0 0 110 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                <ellipse cx="55" cy="85" rx="50" ry="9" fill="#ebdcae" />
                <path d="M15 78 L95 78 L90 86 L20 86 Z" fill="#c4ad82" />
                <rect x="22" y="44" width="66" height="36" rx="2" fill="#dfcca8" stroke="#8c6239" strokeWidth="2" />
                <path d="M22 44 L28 44 L28 49 L34 49 L34 44 L40 44 L40 49 L46 49 L46 44 L52 44 L52 49 L58 49 L58 44 L64 44 L64 49 L70 49 L70 44 L76 44 L76 49 L82 49 L82 44 L88 44" stroke="#8c6239" strokeWidth="2" fill="none" />
                <rect x="16" y="30" width="22" height="46" rx="2" fill="#ebdcae" stroke="#8c6239" strokeWidth="2" />
                <path d="M16 30 L21 30 L21 34 L27 34 L27 30 L32 30 L32 34 L38 34 L38 30" stroke="#8c6239" strokeWidth="1.8" fill="none" />
                <polygon points="27,10 16,30 38,30" fill="#f5ebb8" stroke="#8c6239" strokeWidth="1.8" />
                <line x1="27" y1="2" x2="27" y2="10" stroke="#8c6239" strokeWidth="1.8" />
                <polygon points="27,2 35,5 27,8" fill="#F97316" stroke="#EA580C" strokeWidth="1" />
                <rect x="72" y="30" width="22" height="46" rx="2" fill="#ebdcae" stroke="#8c6239" strokeWidth="2" />
                <path d="M72 30 L77 30 L77 34 L83 34 L83 30 L88 30 L88 34 L94 34 L94 30" stroke="#8c6239" strokeWidth="1.8" fill="none" />
                <polygon points="83,10 72,30 94,30" fill="#f5ebb8" stroke="#8c6239" strokeWidth="1.8" />
                <line x1="83" y1="2" x2="83" y2="10" stroke="#8c6239" strokeWidth="1.8" />
                <polygon points="83,2 91,5 83,8" fill="#F97316" stroke="#EA580C" strokeWidth="1" />
                <rect x="42" y="24" width="26" height="34" rx="2" fill="#fcf3d1" stroke="#8c6239" strokeWidth="2" />
                <polygon points="55,4 40,24 70,24" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                <line x1="55" y1="-3" x2="55" y2="4" stroke="#8c6239" strokeWidth="2" />
                <polygon points="55,-3 65,1 55,5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.2" />
                <path d="M47 80 C47 67, 63 67, 63 80 Z" fill="#8c6239" />
                <circle cx="55" cy="50" r="3" fill="#8c6239" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="sand-mound"
              initial={{ scale: 0.8, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: -10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            >
              <svg width="110" height="95" viewBox="0 0 110 95" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                <ellipse cx="55" cy="82" rx="52" ry="12" fill="#c4ad82" />
                <path d="M12 84 Q55 46 98 84 Z" fill="#dfcca8" stroke="#8c6239" strokeWidth="2" />
                <path d="M30 84 Q55 58 80 84 Z" fill="#ebdcae" />
                <line x1="48" y1="56" x2="68" y2="76" stroke="#8c6239" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="68,76 80,72 74,84" fill="#F97316" stroke="#EA580C" strokeWidth="1.2" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Starfish */}
      <motion.div
        animate={isFlooded ? { rotate: 215, x: 25, y: 35 } : { rotate: [-3, 3, -3], x: 0, y: [0, -3, 0] }}
        transition={{ repeat: isFlooded ? 0 : Infinity, duration: isFlooded ? 0.6 : 6, ease: 'easeInOut' }}
        className="absolute top-24 right-12 sm:right-32 opacity-80"
      >
        <svg width="38" height="38" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <path
            d="M22 2 L26 15 L39 12 L30 22 L37 34 L24 29 L16 40 L16 27 L5 21 L17 16 Z"
            fill="#F97316"
            stroke="#EA580C"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="22" r="2.5" fill="#FED7AA" />
          <circle cx="24" cy="14" r="1" fill="#FED7AA" />
          <circle cx="31" cy="22" r="1" fill="#FED7AA" />
          <circle cx="27" cy="28" r="1" fill="#FED7AA" />
          <circle cx="17" cy="27" r="1" fill="#FED7AA" />
        </svg>
      </motion.div>

      {/* Seashell */}
      <motion.div
        animate={isFlooded ? { rotate: 85, x: -35, y: 40 } : { rotate: 12, x: 0, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-1/2 left-8 sm:left-20 opacity-75"
      >
        <svg width="32" height="30" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <path
            d="M18 3 C26 3, 33 11, 33 21 C33 29, 26 31, 18 31 C10 31, 3 29, 3 21 C3 11, 10 3, 18 3 Z"
            fill="#ebdcae"
            stroke="#c4ad82"
            strokeWidth="1.5"
          />
          <line x1="18" y1="3" x2="18" y2="31" stroke="#c4ad82" strokeWidth="1.2" />
          <line x1="18" y1="3" x2="10" y2="29" stroke="#c4ad82" strokeWidth="1" />
          <line x1="18" y1="3" x2="26" y2="29" stroke="#c4ad82" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
};
