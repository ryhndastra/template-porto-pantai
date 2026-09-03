import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export interface BeachCrabHandle {
  triggerStun: (knockbackDirection: 'left' | 'right') => void;
  getCrabRect: () => DOMRect | null;
  isStunned: () => boolean;
}

const CRAB_DIALOGUES = [
  '*Klak klik capit*',
  'Spike capitku tak tertandingi di lapangan voli pantai!',
  'Bebek jangan ganggu, aku lagi pemanasan servis voli pasir!',
  'Burung camar di atas tolong jadi wasit voli yang adil ya!',
  'Smash capit! Lapangan voli pantai hari ini dikuasai tim kepiting!',
  'Bebek, kalau bola volinya nyebur ke air tolong oper balik ke sini!',
  'Jalan miring adalah gaya terbaik buat main voli pantai!',
  'Lapangan voli sudah siap buat turnamen pantai hari ini!',
  'Awas kena capit tangguhku!',
  'Pasir pantainya hangat dan empuk banget hari ini ~',
  'Kode buatan Reyhand rapi dan kokoh banget!'
];

const createShuffledDeck = (items: string[], lastItem?: string): string[] => {
  const deck = [...items];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  if (lastItem && deck[0] === lastItem && deck.length > 1) {
    [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
  }
  return deck;
};

export const BeachCrab = forwardRef<BeachCrabHandle>((_props, ref) => {
  const screenInitialWidth = typeof window !== 'undefined' ? window.innerWidth + 80 : 1500;
  const x = useMotionValue(screenInitialWidth);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);
  const [isStunned, setIsStunned] = useState<boolean>(false);
  const [knockbackDir, setKnockbackDir] = useState<number>(0);
  const crabRef = useRef<HTMLDivElement | null>(null);
  const isStunnedRef = useRef<boolean>(false);

  const deckRef = useRef<string[]>(createShuffledDeck(CRAB_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  useImperativeHandle(ref, () => ({
    triggerStun: (knockbackDirection: 'left' | 'right') => {
      if (isStunnedRef.current) return;
      isStunnedRef.current = true;
      setIsStunned(true);
      setKnockbackDir(knockbackDirection === 'left' ? -25 : 25);
      setCurrentQuip('OUCH! *Dizzy pinch!* >_<');

      setTimeout(() => {
        setKnockbackDir(0);
      }, 900);

      setTimeout(() => {
        isStunnedRef.current = false;
        setIsStunned(false);
        setCurrentQuip(null);
      }, 2800);
    },
    getCrabRect: () => {
      return crabRef.current ? crabRef.current.getBoundingClientRect() : null;
    },
    isStunned: () => isStunnedRef.current
  }));

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const scuttleLoop = (currentTime: number) => {
      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      if (!isStunnedRef.current) {
        const currX = x.get();
        const crabSpeed = 34;
        let nextX = currX - crabSpeed * delta;
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;

        if (nextX < -120) {
          nextX = screenWidth + 120;
        }

        x.set(nextX);
      }

      animId = requestAnimationFrame(scuttleLoop);
    };

    animId = requestAnimationFrame(scuttleLoop);
    return () => cancelAnimationFrame(animId);
  }, [x]);

  useEffect(() => {
    const quipInterval = setInterval(() => {
      if (crabRef.current && !isStunnedRef.current) {
        const rect = crabRef.current.getBoundingClientRect();
        if (rect.right > 100 && rect.left < window.innerWidth - 100) {
          if (deckRef.current.length === 0) {
            deckRef.current = createShuffledDeck(CRAB_DIALOGUES, lastQuipRef.current);
          }

          const nextQuip = deckRef.current.pop() || CRAB_DIALOGUES[0];
          lastQuipRef.current = nextQuip;
          setCurrentQuip(nextQuip);

          setTimeout(() => {
            if (!isStunnedRef.current) setCurrentQuip(null);
          }, 3000);
        }
      }
    }, 8800);

    return () => clearInterval(quipInterval);
  }, []);

  return (
    <motion.div
      ref={crabRef}
      style={{
        x,
        position: 'absolute',
        pointerEvents: 'none'
      }}
      className="z-20 select-none bottom-28 sm:bottom-36 md:bottom-[185px] scale-[0.75] sm:scale-[0.85] md:scale-100 origin-bottom"
    >
      <motion.div
        animate={{
          x: knockbackDir,
          y: isStunned ? [0, -2, 0, 2, 0] : [0, -3, 0, -3, 0],
          rotate: isStunned ? [-6, 6, -6, 6, -6] : [-2, 2, -2, 2, -2]
        }}
        transition={{
          x: { duration: 0.8, ease: 'easeOut' },
          y: { repeat: Infinity, duration: isStunned ? 0.4 : 0.8, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: isStunned ? 0.4 : 0.8, ease: 'easeInOut' }
        }}
        className="relative"
      >
        <div className="absolute -bottom-1 left-2 w-14 h-3 bg-[#ebdcae]/90 rounded-full blur-[2px]" />

        {isStunned && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-8 pointer-events-none z-30">
            <motion.div
              animate={{
                x: [-16, 0, 16, 0, -16],
                y: [0, -5, 0, 5, 0],
                scale: [0.9, 1.15, 0.9, 0.75, 0.9],
                rotate: [0, 180, 360]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="absolute text-sm select-none"
            >
              ⭐
            </motion.div>

            <motion.div
              animate={{
                x: [16, 0, -16, 0, 16],
                y: [0, 5, 0, -5, 0],
                scale: [0.9, 0.75, 0.9, 1.15, 0.9],
                rotate: [360, 180, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="absolute text-sm select-none"
            >
              ✨
            </motion.div>

            <motion.div
              animate={{
                x: [0, 14, 0, -14, 0],
                y: [-5, 0, 5, 0, -5],
                scale: [1.1, 0.8, 1.1, 0.8, 1.1],
                rotate: [0, 360]
              }}
              transition={{ repeat: Infinity, duration: 1.0, ease: 'linear' }}
              className="absolute text-xs select-none"
            >
              💫
            </motion.div>
          </div>
        )}

        <svg
          width="62"
          height="42"
          viewBox="0 0 62 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path d="M16 24 C10 24, 6 28, 4 34" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 26 C12 28, 8 32, 7 38" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 28 C18 32, 14 36, 12 40" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />

          <path d="M46 24 C52 24, 56 28, 58 34" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 26 C50 28, 54 32, 55 38" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M40 28 C44 32, 48 36, 50 40" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />

          <path d="M20 20 C14 16, 10 12, 10 8" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          <motion.g
            animate={isStunned ? { rotate: [-10, 10, -10] } : { rotate: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: isStunned ? 0.35 : 1.4, ease: 'easeInOut' }}
            style={{ transformOrigin: '10px 8px' }}
          >
            <path d="M10 8 C6 4, 4 6, 4 10 C6 14, 10 14, 12 10 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.2" />
            <path d="M8 6 C5 2, 2 5, 4 9" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>

          <path d="M42 20 C48 16, 52 12, 52 8" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          <motion.g
            animate={isStunned ? { rotate: [10, -10, 10] } : { rotate: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: isStunned ? 0.35 : 1.4, ease: 'easeInOut', delay: 0.15 }}
            style={{ transformOrigin: '52px 8px' }}
          >
            <path d="M52 8 C56 4, 58 6, 58 10 C56 14, 52 14, 50 10 Z" fill="#F97316" stroke="#EA580C" strokeWidth="1.2" />
            <path d="M54 6 C57 2, 60 5, 58 9" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>

          <ellipse cx="31" cy="24" rx="17" ry="12" fill="#F97316" stroke="#EA580C" strokeWidth="2" />
          <path d="M20 18 Q31 14 42 18" stroke="#FED7AA" strokeWidth="1.8" strokeLinecap="round" />

          <line x1="26" y1="14" x2="26" y2="8" stroke="#EA580C" strokeWidth="2" />
          <line x1="36" y1="14" x2="36" y2="8" stroke="#EA580C" strokeWidth="2" />

          {isStunned ? (
            <>
              <circle cx="26" cy="7" r="3.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
              <path d="M24 5 L28 9 M28 5 L24 9" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" />

              <circle cx="36" cy="7" r="3.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
              <path d="M34 5 L38 9 M38 5 L34 9" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="26" cy="7" r="3.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
              <circle cx="26" cy="7" r="1.8" fill="#0F172A" />
              <circle cx="27" cy="6" r="0.6" fill="#FFFFFF" />

              <circle cx="36" cy="7" r="3.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1" />
              <circle cx="36" cy="7" r="1.8" fill="#0F172A" />
              <circle cx="37" cy="6" r="0.6" fill="#FFFFFF" />
            </>
          )}

          {isStunned ? (
            <path d="M27 27 Q29 25 31 27 T35 27" stroke="#7C2D12" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M28 26 Q31 29 34 26" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>

        {currentQuip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 6 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/95 text-[#c2410c] text-[11px] font-bold shadow-lg border border-[#f97316] whitespace-nowrap backdrop-blur-xs flex items-center gap-1"
          >
            <span>{currentQuip}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
});

BeachCrab.displayName = 'BeachCrab';
