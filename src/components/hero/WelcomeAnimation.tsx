import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [phase, setPhase] = useState<'sweep' | 'submerged' | 'dive' | 'done'>('sweep');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('submerged');
    }, 1100);

    const t2 = setTimeout(() => {
      setPhase('dive');
    }, 2200);

    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'dive' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none bg-[#071b2f]"
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'sweep' ? '0%' : '0%' }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#02587a] via-[#0284c7] to-[#0ea5e9]"
        >
          <div className="absolute -top-24 inset-x-0 h-24">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 60 C320 120, 640 0, 960 60 C1200 100, 1360 40, 1440 60 L1440 120 L0 120 Z"
                fill="#0ea5e9"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'sweep' ? '0%' : '0%' }}
          transition={{ duration: 1.15, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#0284c7] via-[#0ea5e9] to-[#38bdf8]"
        >
          <div className="absolute -top-28 inset-x-0 h-28">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 40 C360 0, 720 100, 1080 30 C1260 0, 1380 60, 1440 40 L1440 120 L0 120 Z"
                fill="#38bdf8"
              />
              <path
                d="M0 40 C360 0, 720 100, 1080 30 C1260 0, 1380 60, 1440 40"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'sweep' ? '0%' : '0%' }}
          transition={{ duration: 1.25, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-b from-[#02587a] via-[#0284c7] to-[#0ea5e9]"
        >
          <div className="absolute -top-32 inset-x-0 h-32">
            <svg
              viewBox="0 0 1440 140"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 50 C280 110, 560 10, 840 70 C1120 120, 1320 20, 1440 50 L1440 140 L0 140 Z"
                fill="#02587a"
              />
              <path
                d="M0 50 C280 110, 560 10, 840 70 C1120 120, 1320 20, 1440 50"
                stroke="#FFFFFF"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: '100vh',
                x: `${(i * 5.8) % 100}vw`,
                opacity: 0.3,
                scale: 0.6 + (i % 5) * 0.25
              }}
              animate={{
                y: '-20vh',
                opacity: [0.2, 0.85, 0]
              }}
              transition={{
                duration: 1.8 + (i % 4) * 0.4,
                delay: 0.4 + (i * 0.08),
                ease: 'easeOut',
                repeat: Infinity
              }}
              className="absolute w-5 h-5 rounded-full bg-white/40 border border-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)] backdrop-blur-xs"
            />
          ))}
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{
              opacity: phase === 'submerged' ? 1 : phase === 'dive' ? 0 : 0,
              scale: phase === 'submerged' ? 1 : phase === 'dive' ? 1.15 : 0.85,
              y: phase === 'submerged' ? 0 : phase === 'dive' ? -30 : 20
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="mb-6"
            >
              <BrandLogo size="xl" />
            </motion.div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-widest uppercase drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              REYHAND ASTRA
            </h1>
            <p className="mt-3 text-sm sm:text-base font-semibold tracking-widest text-[#fff9d4] uppercase drop-shadow-md">
              Diving into Portfolio
            </p>

            <div className="mt-6 w-48 h-1 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: phase === 'submerged' || phase === 'dive' ? '100%' : '0%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#fff9d4] to-white rounded-full"
              />
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-xs text-white/90 font-medium transition-colors backdrop-blur-md cursor-pointer"
        >
          Lewati
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
