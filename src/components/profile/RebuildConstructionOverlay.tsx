import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Wrench, HardHat, Check, Cpu, Terminal } from 'lucide-react';

interface RebuildConstructionOverlayProps {
  isRebuilding: boolean;
  progress: number;
}

export const RebuildConstructionOverlay: React.FC<RebuildConstructionOverlayProps> = ({
  isRebuilding,
  progress
}) => {
  const [comicTextIndex, setComicTextIndex] = useState(0);

  const comicSounds = [
    { icon: <Hammer className="w-5 h-5 text-[#f59e0b]" />, label: 'CLANK!' },
    { icon: <Wrench className="w-5 h-5 text-[#0284c7]" />, label: 'FIXING!' },
    { icon: <Cpu className="w-5 h-5 text-[#059669]" />, label: 'STRUCTURING!' },
    { icon: <Terminal className="w-5 h-5 text-[#8c6239]" />, label: 'RESTORE!' },
    { icon: <Check className="w-5 h-5 text-[#059669]" />, label: 'PERFECT!' }
  ];

  useEffect(() => {
    if (!isRebuilding) {
      setComicTextIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setComicTextIndex((prev) => (prev + 1) % comicSounds.length);
    }, 450);

    return () => clearInterval(interval);
  }, [isRebuilding]);

  return (
    <AnimatePresence>
      {isRebuilding && (
        <motion.div
          key="rebuild-overlay-fullscreen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 0.3 } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-auto select-none"
        >
          <div className="absolute inset-0 bg-[#fff9d4]/92 backdrop-blur-xl" />

          {/* Clouds Covering the Screen */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* Cloud */}
            <motion.div
              initial={{ scale: 0, x: -300, y: -200 }}
              animate={{ scale: 1.2, x: 0, y: 0 }}
              exit={{ scale: 0, x: -400, y: -300 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              className="absolute -top-16 -left-16 w-[55vw] h-[55vh]"
            >
              <svg viewBox="0 0 400 300" fill="none" className="w-full h-full drop-shadow-2xl">
                <circle cx="120" cy="120" r="90" fill="#ffffff" />
                <circle cx="220" cy="100" r="85" fill="#fffdf5" />
                <circle cx="290" cy="160" r="80" fill="#fef7dc" />
                <circle cx="170" cy="200" r="95" fill="#f8ecc2" />
                <circle cx="80" cy="190" r="75" fill="#ffffff" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0, x: 300, y: -200 }}
              animate={{ scale: 1.3, x: 0, y: 0 }}
              exit={{ scale: 0, x: 400, y: -300 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.05 }}
              className="absolute -top-16 -right-16 w-[60vw] h-[60vh]"
            >
              <svg viewBox="0 0 400 300" fill="none" className="w-full h-full drop-shadow-2xl">
                <circle cx="260" cy="110" r="95" fill="#ffffff" />
                <circle cx="160" cy="100" r="85" fill="#fffdf5" />
                <circle cx="100" cy="170" r="80" fill="#fef7dc" />
                <circle cx="210" cy="200" r="90" fill="#f8ecc2" />
                <circle cx="300" cy="180" r="80" fill="#ffffff" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0, x: -300, y: 200 }}
              animate={{ scale: 1.25, x: 0, y: 0 }}
              exit={{ scale: 0, x: -400, y: 300 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.08 }}
              className="absolute -bottom-16 -left-16 w-[55vw] h-[55vh]"
            >
              <svg viewBox="0 0 400 300" fill="none" className="w-full h-full drop-shadow-2xl">
                <circle cx="140" cy="180" r="90" fill="#ffffff" />
                <circle cx="230" cy="190" r="85" fill="#fffdf5" />
                <circle cx="280" cy="120" r="80" fill="#fef7dc" />
                <circle cx="170" cy="90" r="90" fill="#f8ecc2" />
                <circle cx="80" cy="120" r="75" fill="#ffffff" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0, x: 300, y: 200 }}
              animate={{ scale: 1.35, x: 0, y: 0 }}
              exit={{ scale: 0, x: 400, y: 300 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.1 }}
              className="absolute -bottom-16 -right-16 w-[60vw] h-[60vh]"
            >
              <svg viewBox="0 0 400 300" fill="none" className="w-full h-full drop-shadow-2xl">
                <circle cx="250" cy="180" r="95" fill="#ffffff" />
                <circle cx="150" cy="190" r="90" fill="#fffdf5" />
                <circle cx="110" cy="110" r="80" fill="#fef7dc" />
                <circle cx="210" cy="90" r="90" fill="#f8ecc2" />
                <circle cx="300" cy="120" r="75" fill="#ffffff" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.05, 0.98, 1.03],
                rotate: [0, 2, -2, 0]
              }}
              exit={{ scale: 0, rotate: 15 }}
              transition={{
                scale: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
                rotate: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
                default: { type: 'spring', stiffness: 160, damping: 16 }
              }}
              className="w-[85vw] sm:w-[70vw] max-w-4xl h-[65vh]"
            >
              <svg viewBox="0 0 600 450" fill="none" className="w-full h-full drop-shadow-2xl">
                <circle cx="300" cy="225" r="140" fill="#ffffff" />
                <circle cx="190" cy="190" r="115" fill="#fffdf5" />
                <circle cx="410" cy="190" r="120" fill="#ffffff" />
                <circle cx="210" cy="290" r="110" fill="#fef7dc" />
                <circle cx="390" cy="290" r="115" fill="#f8ecc2" />
                <circle cx="300" cy="130" r="105" fill="#ffffff" />
                <circle cx="130" cy="240" r="90" fill="#fef7dc" />
                <circle cx="470" cy="240" r="90" fill="#fffdf5" />
              </svg>
            </motion.div>

            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0.4, 1.6, 2],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (80 + (i * 25) % 150)],
                  y: [0, (i % 3 === 0 ? 1 : -1) * (60 + (i * 20) % 120)]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8 + (i % 4) * 0.2,
                  delay: i * 0.12
                }}
                className="absolute w-20 h-20 rounded-full bg-white/85 shadow-lg blur-[2px]"
              />
            ))}
          </div>

          <div className="relative z-20 flex flex-col items-center justify-center text-center space-y-6 max-w-lg mx-6">
            <div className="relative w-72 h-36 flex items-center justify-center">
              {/* Hammer */}
              <motion.div
                animate={{
                  rotate: [-55, 30, -55],
                  y: [-10, 15, -10],
                  scale: [1, 1.25, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.32,
                  ease: 'easeInOut'
                }}
                className="absolute left-0 p-4 rounded-3xl bg-[#f59e0b] text-white shadow-2xl border-4 border-white drop-shadow-xl"
              >
                <Hammer className="w-10 h-10" />
              </motion.div>

              {/* Hard Hat */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [-8, 8, -8]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  ease: 'easeInOut'
                }}
                className="p-6 rounded-[32px] bg-[#0f172a] text-[#f59e0b] shadow-2xl border-4 border-white"
              >
                <HardHat className="w-14 h-14" />
              </motion.div>

              <motion.div
                animate={{
                  rotate: [45, -35, 45],
                  y: [10, -12, 10],
                  scale: [1, 1.22, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.36,
                  ease: 'easeInOut'
                }}
                className="absolute right-0 p-4 rounded-3xl bg-[#0284c7] text-white shadow-2xl border-4 border-white drop-shadow-xl"
              >
                <Wrench className="w-10 h-10" />
              </motion.div>

              {/* Comic Impact */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360],
                    x: [0, ((i - 4) * 35)],
                    y: [0, (i % 2 === 0 ? -45 : 45)]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.45 + i * 0.08,
                    delay: i * 0.07
                  }}
                  className="absolute text-xl font-black text-[#f59e0b] select-none"
                >
                  ✦
                </motion.div>
              ))}
            </div>

            {/* Comic Sound Effect */}
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={comicTextIndex}
                  initial={{ scale: 0.5, rotate: -6 }}
                  animate={{ scale: 1.12, rotate: 3 }}
                  exit={{ scale: 0.6, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-[#0f172a] text-[#f59e0b] text-base sm:text-lg font-black font-mono shadow-2xl border-2 border-white tracking-wider"
                >
                  {comicSounds[comicTextIndex].icon}
                  <span>*{comicSounds[comicTextIndex].label}*</span>
                </motion.div>
              </AnimatePresence>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
                Sedang Membangun Ulang Pantai...
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-sm space-y-2 pt-2">
              <div className="w-full h-4 rounded-full bg-white/90 border-2 border-[#dfcca8] p-0.5 overflow-hidden shadow-xl">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] via-[#0284c7] to-[#38bdf8] shadow-md"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#8c6239] px-1">
                <span>RECONSTRUCTION PROGRESS</span>
                <span className="text-base font-black text-[#0f172a]">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
