import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { FloodWaveOverlay } from './FloodWaveOverlay';
import { ProfileDuneBackground } from './ProfileDuneBackground';
import { ProfilePhotoCard } from './ProfilePhotoCard';
import { ArchitectureStage } from './ArchitectureStage';
import { FloodActionButton } from './FloodActionButton';
import { RebuildConstructionOverlay } from './RebuildConstructionOverlay';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05
    }
  }
};

const perspectiveCardVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 18,
    rotateY: -6,
    scale: 0.91,
    y: 45,
    filter: 'blur(5px)'
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 170,
      damping: 20,
      mass: 0.85
    }
  }
};

const headerRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    rotateX: 12,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 160,
      damping: 18
    }
  }
};

export const EditorialProfile: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Flood & Rebuild State Machine
  const [floodState, setFloodState] = useState<'pristine' | 'flooding' | 'flooded' | 'rebuilding'>('pristine');
  const [rebuildProgress, setRebuildProgress] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const scrollParallaxLeft = useTransform(smoothScroll, [0, 1], [30, -25]);
  const scrollParallaxRight = useTransform(smoothScroll, [0, 1], [50, -35]);

  const handleTriggerFlood = () => {
    if (floodState !== 'pristine') return;
    setFloodState('flooding');
    setTimeout(() => {
      setFloodState('flooded');
    }, 1000);
  };

  const handleTriggerRebuild = () => {
    if (floodState !== 'flooded') return;
    setFloodState('rebuilding');
  };

  useEffect(() => {
    if (floodState !== 'rebuilding') return;

    let currentVal = 0;
    setRebuildProgress(0);

    const stepMs = 40;
    const totalDurationMs = 2000;
    const stepIncrement = 100 / (totalDurationMs / stepMs);

    const interval = setInterval(() => {
      currentVal += stepIncrement;
      if (currentVal >= 100) {
        clearInterval(interval);
        setRebuildProgress(100);
        setTimeout(() => {
          setFloodState('pristine');
          setRebuildProgress(0);
        }, 300);
      } else {
        setRebuildProgress(Math.floor(currentVal));
      }
    }, stepMs);

    return () => clearInterval(interval);
  }, [floodState]);

  const isFlooded = floodState === 'flooded' || floodState === 'flooding';

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative pt-24 pb-32 sm:pt-28 sm:pb-44 bg-[#fff9d4] overflow-hidden select-none"
    >
      <RebuildConstructionOverlay
        isRebuilding={floodState === 'rebuilding'}
        progress={rebuildProgress}
      />

      <FloodWaveOverlay isFlooding={floodState === 'flooding'} />

      <ProfileDuneBackground isFlooded={isFlooded} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.18 }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Editorial Section Header & Flood Action Controls */}
        <motion.div
          variants={headerRevealVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-[#e2d3b3]"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8c6239] block mb-2">
              Profil &amp; Keahlian
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.08]">
              Fullstack &amp; Mobile Developer
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <FloodActionButton
              floodState={floodState}
              rebuildProgress={rebuildProgress}
              onTriggerFlood={handleTriggerFlood}
              onTriggerRebuild={handleTriggerRebuild}
            />

            <p className="max-w-xs text-xs text-[#475569] leading-relaxed">
              Berpengalaman mengembangkan aplikasi web skala penuh, aplikasi mobile, arsitektur database, serta manajemen infrastruktur Linux.
            </p>
          </div>
        </motion.div>

        {/* Interactive Stage Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            variants={perspectiveCardVariants}
            style={{ y: scrollParallaxLeft }}
            className="lg:col-span-5 relative z-10"
          >
            <ProfilePhotoCard isFlooded={isFlooded} />
          </motion.div>

          <motion.div
            variants={perspectiveCardVariants}
            style={{ y: scrollParallaxRight }}
            className="lg:col-span-7 relative z-10"
          >
            <ArchitectureStage isFlooded={isFlooded} />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 pointer-events-none z-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,80 Q380,25 760,75 T1440,50 L1440,180 L0,180 Z"
            fill={isFlooded ? '#dfcca8' : '#ebdcae'}
            opacity="0.95"
          />
          <path
            d="M0,105 Q420,60 820,100 T1440,85 L1440,180 L0,180 Z"
            fill={isFlooded ? '#c4ad82' : '#dfcca8'}
          />
        </svg>
      </div>
    </section>
  );
};
