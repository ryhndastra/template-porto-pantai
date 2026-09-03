import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const SEAGULL_DIALOGUES = [
  'Kwekk! Ada kentang goreng ga di bawah?',
  'Dari atas kulihat smash voli si kepiting kencang banget!',
  'Peluit wasit siap ditiup! Awas bola volinya nyangkut di pohon kelapa!',
  'Bebek yang di air, oper balik bola voli kepiting kalau nyebur ya!',
  'Skor voli pantai: Tim Kepiting 10 - Angin Pantai 8!',
  'Wasit udara melaporkan: Pertandingan voli berjalan seru dan adil!',
  'Langit cerah banget buat terbang santai di atas pantai ~',
  'Arus angin hari ini enak banget buat meluncur!',
  'Portofolio yang keren terlihat jelas dari atas awan sini!'
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

const ALTITUDE_ZONES = [
  { min: 10, max: 24 },
  { min: 28, max: 36 },
  { min: 58, max: 68 }
];

export const FlyingSeagull: React.FC = () => {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [altitudePercent, setAltitudePercent] = useState<number>(14);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);

  const x = useMotionValue(-160);
  const seagullRef = useRef<HTMLDivElement | null>(null);

  const deckRef = useRef<string[]>(createShuffledDeck(SEAGULL_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const flightLoop = (currentTime: number) => {
      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const currX = x.get();
      const flightSpeed = 72;
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;

      if (direction === 'ltr') {
        const nextX = currX + flightSpeed * delta;
        if (nextX > screenWidth + 160) {
          const nextDir = Math.random() > 0.5 ? 'rtl' : 'ltr';
          const randomZone = ALTITUDE_ZONES[Math.floor(Math.random() * ALTITUDE_ZONES.length)];
          const nextAlt = randomZone.min + Math.random() * (randomZone.max - randomZone.min);

          setDirection(nextDir);
          setAltitudePercent(nextAlt);
          x.set(nextDir === 'rtl' ? screenWidth + 160 : -160);
        } else {
          x.set(nextX);
        }
      } else {
        const nextX = currX - flightSpeed * delta;
        if (nextX < -160) {
          const nextDir = Math.random() > 0.5 ? 'ltr' : 'rtl';
          const randomZone = ALTITUDE_ZONES[Math.floor(Math.random() * ALTITUDE_ZONES.length)];
          const nextAlt = randomZone.min + Math.random() * (randomZone.max - randomZone.min);

          setDirection(nextDir);
          setAltitudePercent(nextAlt);
          x.set(nextDir === 'ltr' ? -160 : screenWidth + 160);
        } else {
          x.set(nextX);
        }
      }

      animId = requestAnimationFrame(flightLoop);
    };

    animId = requestAnimationFrame(flightLoop);
    return () => cancelAnimationFrame(animId);
  }, [direction, x]);

  useEffect(() => {
    const quipInterval = setInterval(() => {
      if (seagullRef.current) {
        const rect = seagullRef.current.getBoundingClientRect();
        if (rect.right > 100 && rect.left < window.innerWidth - 100) {
          if (deckRef.current.length === 0) {
            deckRef.current = createShuffledDeck(SEAGULL_DIALOGUES, lastQuipRef.current);
          }

          const nextQuip = deckRef.current.pop() || SEAGULL_DIALOGUES[0];
          lastQuipRef.current = nextQuip;
          setCurrentQuip(nextQuip);

          setTimeout(() => {
            setCurrentQuip(null);
          }, 3000);
        }
      }
    }, 8500);

    return () => clearInterval(quipInterval);
  }, []);

  return (
    <motion.div
      ref={seagullRef}
      style={{
        x,
        top: `${altitudePercent}%`,
        position: 'absolute',
        pointerEvents: 'none'
      }}
      className="z-20 select-none"
    >
      <div className={`relative ${direction === 'rtl' ? '-scale-x-100' : 'scale-x-100'}`}>
        <motion.div
          animate={{
            y: [0, -8, 2, -6, 0],
            rotate: direction === 'ltr' ? [-1, 2, -1, -2, -1] : [1, -2, 1, 2, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut'
          }}
          className="relative"
        >
          <div className="absolute top-24 left-4 w-12 h-2 bg-[#02587a]/25 rounded-full blur-[3px]" />

          <svg
            width="58"
            height="42"
            viewBox="0 0 58 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            <path
              d="M8 24 L2 28 L6 22 Z"
              fill="#CBD5E1"
              stroke="#94A3B8"
              strokeWidth="1.2"
            />

            <path
              d="M8 24 C14 20, 28 20, 38 22 C44 24, 46 22, 48 18 C52 18, 54 22, 48 26 C40 30, 24 30, 12 28 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />

            <path
              d="M48 20 L56 22 L48 24 Z"
              fill="#FACC15"
              stroke="#EA580C"
              strokeWidth="1"
            />
            <circle cx="53" cy="22.5" r="1" fill="#EA580C" />

            <circle cx="44" cy="20" r="1.8" fill="#0F172A" />
            <circle cx="44.5" cy="19.5" r="0.6" fill="#FFFFFF" />

            <motion.path
              animate={{
                d: [
                  'M22 22 C26 6, 36 2, 44 4 C36 12, 30 18, 22 22 Z',
                  'M22 22 C26 14, 36 12, 44 14 C36 18, 30 20, 22 22 Z',
                  'M22 22 C26 28, 36 34, 44 32 C36 26, 30 24, 22 22 Z',
                  'M22 22 C26 6, 36 2, 44 4 C36 12, 30 18, 22 22 Z'
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 0.65,
                ease: 'easeInOut'
              }}
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            <path
              d="M38 6 L44 4 L42 10 Z"
              fill="#475569"
            />
          </svg>

          {currentQuip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 6 }}
              className={`absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/95 text-[#0284c7] text-[11px] font-bold shadow-lg border border-[#38bdf8] whitespace-nowrap backdrop-blur-xs flex items-center gap-1 ${
                direction === 'rtl' ? '-scale-x-100' : 'scale-x-100'
              }`}
            >
              <span>{currentQuip}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
