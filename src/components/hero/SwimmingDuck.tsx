import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

export type DuckExpression = 'normal' | 'lifted' | 'impact' | 'happy';

interface SwimmingDuckProps {
  expression?: DuckExpression;
  onDuckDrop: (clientX: number, clientY: number, velocity: number, duckRect?: DOMRect) => void;
  onDuckSwim: (clientX: number, clientY: number) => void;
  onDuckSplash?: (clientX: number, clientY: number) => void;
  onDuckWaddle?: (duckRect: DOMRect) => void;
}

const DUCK_DIALOGUES = [
  '♪ Kwek kwek, asyiknya berenang di laut lepas ~',
  'Air lautnya segar banget hari ini!',
  'Tadi kulihat si kepiting lagi pemanasan servis di lapangan voli pasir!',
  'Si kepiting kalau main voli smash-nya pakai capit, curang tapi jago kwek!',
  'Burung camar jadi wasit voli di atas, tapi awas suka nyamber bola!',
  'Kepiting! Habis latihan voli pantai jangan lupa nyebur renang bareng di sini!',
  'Lapangan voli pasir di samping lagi rame turnamen kepiting!',
  'Kwek! Kalau ada bug di kode, suruh ngobrol sama bebek karet!',
  'Berenang santai sambil nemenin kamu lihat portofolio Reyhand ~',
  'Ombaknya tenang banget, cocok buat santai di pantai!',
  'Awas kecipratan air ya kalau aku lagi ngebut berenang!'
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

export const SwimmingDuck: React.FC<SwimmingDuckProps> = ({
  expression = 'normal',
  onDuckDrop,
  onDuckSwim,
  onDuckSplash,
  onDuckWaddle
}) => {
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [isWaddling, setIsWaddling] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);

  const deckRef = useRef<string[]>(createShuffledDeck(DUCK_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  const x = useMotionValue(-120);
  const y = useMotionValue(0);

  const duckRef = useRef<HTMLDivElement | null>(null);

  const WATER_SHALLOW_LINE_Y = 22;

  useEffect(() => {
    if (expression === 'impact') {
      setIsGrabbed(false);
      // Only waddle if the duck was dropped on the sand
      if (y.get() > WATER_SHALLOW_LINE_Y + 12) {
        setIsWaddling(true);
      }
    }
  }, [expression, y]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 160);
    }, 4200);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (isGrabbed || isWaddling) {
      setCurrentQuip(null);
      return;
    }

    const quipInterval = setInterval(() => {
      if (duckRef.current) {
        const rect = duckRef.current.getBoundingClientRect();
        if (rect.right > 90 && rect.left < window.innerWidth - 90) {
          if (deckRef.current.length === 0) {
            deckRef.current = createShuffledDeck(DUCK_DIALOGUES, lastQuipRef.current);
          }

          const nextQuip = deckRef.current.pop() || DUCK_DIALOGUES[0];
          lastQuipRef.current = nextQuip;
          setCurrentQuip(nextQuip);

          setTimeout(() => {
            setCurrentQuip(null);
          }, 3200);
        }
      }
    }, 7200);

    return () => clearInterval(quipInterval);
  }, [isGrabbed, isWaddling]);

  // swimming loop across the screen with collision check
  useEffect(() => {
    if (isGrabbed || isWaddling) return;

    let animId: number;
    let lastTime = performance.now();
    let lastCollisionCheck = 0;

    const swimLoop = (currentTime: number) => {
      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const currX = x.get();
      const speed = 40;
      let nextX = currX + speed * delta;
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;

      if (nextX > screenWidth + 140) {
        nextX = -140;
      }

      x.set(nextX);

      // collision check (every 50ms)
      if (currentTime - lastCollisionCheck > 50 && duckRef.current) {
        lastCollisionCheck = currentTime;
        const rect = duckRef.current.getBoundingClientRect();
        if (rect.right > 0 && rect.left < window.innerWidth) {
          onDuckSwim(rect.left + rect.width / 2, rect.top + rect.height * 0.75);
        }
      }

      animId = requestAnimationFrame(swimLoop);
    };

    animId = requestAnimationFrame(swimLoop);
    return () => cancelAnimationFrame(animId);
  }, [isGrabbed, isWaddling, onDuckSwim, x]);

  // moving upward back into shallow water
  useEffect(() => {
    if (!isWaddling || isGrabbed) return;

    let animId: number;
    let lastTime = performance.now();

    const waddleStep = (currentTime: number) => {
      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const currY = y.get();
      const waddleSpeed = 75;
      const nextY = currY - waddleSpeed * delta;

      if (duckRef.current && onDuckWaddle) {
        onDuckWaddle(duckRef.current.getBoundingClientRect());
      }

      if (nextY <= WATER_SHALLOW_LINE_Y) {
        y.set(0);
        setIsWaddling(false);
        if (duckRef.current) {
          const rect = duckRef.current.getBoundingClientRect();
          if (onDuckSplash) {
            onDuckSplash(rect.left + rect.width / 2, rect.top + rect.height * 0.75);
          }
        }
        return;
      }

      y.set(nextY);
      animId = requestAnimationFrame(waddleStep);
    };

    animId = requestAnimationFrame(waddleStep);
    return () => cancelAnimationFrame(animId);
  }, [isWaddling, isGrabbed, onDuckSplash, onDuckWaddle, y]);

  const handleDragStart = () => {
    setIsGrabbed(true);
    setIsWaddling(false);
    setCurrentQuip(null);
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsGrabbed(false);
    const speed = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);
    const intensity = Math.min(2.8, Math.max(1.0, speed / 200));

    const currentY = y.get();
    const currentX = x.get();

    const heroEl = duckRef.current?.closest('section');
    const heroRect = heroEl ? heroEl.getBoundingClientRect() : null;
    const heroHeight = heroRect ? heroRect.height : (typeof window !== 'undefined' ? window.innerHeight : 800);
    const heroWidth = heroRect ? heroRect.width : (typeof window !== 'undefined' ? window.innerWidth : 1400);

    const topBaseline = heroHeight * 0.44;
    const minY = -topBaseline + 60;
    const maxY = heroHeight - topBaseline - 70;
    const minX = -40;
    const maxX = heroWidth - 60;

    const clampedX = Math.max(minX, Math.min(maxX, currentX));
    const clampedY = Math.max(minY, Math.min(maxY, currentY));

    x.set(clampedX);
    y.set(clampedY);

    const duckRect = duckRef.current ? duckRef.current.getBoundingClientRect() : undefined;
    onDuckDrop(info.point.x, info.point.y, intensity, duckRect);

    if (clampedY > WATER_SHALLOW_LINE_Y + 12) {
      setIsWaddling(true);
    }
  };

  const currentExpression: DuckExpression = isGrabbed
    ? 'lifted'
    : expression === 'impact'
      ? 'impact'
      : isWaddling
        ? 'happy'
        : 'normal';

  return (
    <motion.div
      ref={duckRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        left: 0,
        top: '46%',
        position: 'absolute',
        touchAction: 'none'
      }}
      animate={{
        scale: isGrabbed ? 1.3 : 1,
        zIndex: isGrabbed ? 70 : 30
      }}
      transition={{
        scale: { duration: 0.12 }
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 1.35 }}
      className="cursor-grab active:cursor-grabbing select-none pointer-events-auto p-4 -m-4"
    >
      <motion.div
        animate={
          isGrabbed
            ? { rotate: 12, y: 0 }
            : isWaddling
              ? {
                rotate: [-7, 7, -7],
                y: [0, -4, 0]
              }
              : currentExpression === 'impact'
                ? { rotate: -10, y: -4 }
                : {
                  y: [0, -6, 0, 5, 0],
                  rotate: [0, -2, 0, 2, 0]
                }
        }
        transition={{
          repeat: isGrabbed || currentExpression === 'impact' ? 0 : Infinity,
          duration: isWaddling ? 0.42 : 3.2,
          ease: 'easeInOut'
        }}
        className="relative group"
      >
        <div className="absolute -bottom-2 left-2 right-2 h-3 bg-[#04101e]/60 rounded-full blur-[2px]" />

        <svg
          width="72"
          height="62"
          viewBox="0 0 68 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl filter"
        >
          <path
            d="M10 34C10 44 24 48 38 48C52 48 60 42 60 34C60 28 54 24 46 24C44 18 36 12 26 12C16 12 10 20 10 34Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2.2"
          />

          <circle cx="44" cy="18" r="14" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.2" />

          <path
            d="M34 10 C38 7 44 7 48 9"
            stroke="#FEF08A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {currentExpression === 'lifted' ? (
            <path
              d="M56 16C62 14 67 17 67 20C67 23 62 26 56 24L56 16Z"
              fill="#F97316"
              stroke="#EA580C"
              strokeWidth="2"
            />
          ) : currentExpression === 'impact' ? (
            <path
              d="M56 18C62 17 66 18 66 20C66 21 62 22 56 21L56 18Z"
              fill="#F97316"
              stroke="#EA580C"
              strokeWidth="2"
            />
          ) : (
            <path
              d="M56 17C62 16 66 18 66 20C66 22 62 23 56 22L56 17Z"
              fill="#F97316"
              stroke="#EA580C"
              strokeWidth="1.8"
            />
          )}

          {currentExpression === 'lifted' ? (
            <>
              <circle cx="48" cy="14" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="49" cy="14" r="2" fill="#0F172A" />
              <circle cx="50" cy="13" r="0.8" fill="#FFFFFF" />
            </>
          ) : currentExpression === 'impact' ? (
            <>
              <path
                d="M44 11L48 14L44 17"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M52 11L48 14L52 17"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : currentExpression === 'happy' ? (
            <>
              <path
                d="M44 14 Q47 9 50 14"
                stroke="#0F172A"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M52 14 Q55 9 58 14"
                stroke="#0F172A"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
              />
            </>
          ) : isBlinking ? (
            <path
              d="M45 15 Q48 18 51 15"
              stroke="#0F172A"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle cx="48" cy="14" r="3.2" fill="#0F172A" />
              <circle cx="49.5" cy="13" r="1.1" fill="#FFFFFF" />
            </>
          )}

          <path
            d={
              currentExpression === 'lifted'
                ? 'M18 30C22 22 34 22 36 30C38 34 32 38 22 38C18 38 16 34 18 30Z'
                : 'M18 34C22 28 34 28 38 34C40 38 34 42 22 42C16 42 16 38 18 34Z'
            }
            fill="#EAB308"
            stroke="#CA8A04"
            strokeWidth="1.8"
          />
        </svg>

        {currentExpression === 'lifted' && (
          <motion.div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#facc15] text-[#0f172a] text-[10px] font-extrabold shadow-lg border border-[#ca8a04] whitespace-nowrap animate-bounce">
            QUACK!
          </motion.div>
        )}

        {currentExpression === 'impact' && (
          <motion.div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#f97316] text-white text-[10px] font-extrabold shadow-lg border border-[#ea580c] whitespace-nowrap animate-pulse">
            &gt;_&lt; OUCH!
          </motion.div>
        )}

        {isWaddling && currentExpression !== 'impact' && (
          <motion.div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#38bdf8] text-white text-[10px] font-extrabold shadow-lg border border-[#0284c7] whitespace-nowrap">
            BACK TO WATER!
          </motion.div>
        )}

        {!isGrabbed && !isWaddling && currentExpression !== 'impact' && currentQuip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 6 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-2xl bg-white/95 text-[#02587a] text-xs font-bold shadow-xl border border-[#38bdf8] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md"
          >
            <span className="drop-shadow-xs">{currentQuip}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
