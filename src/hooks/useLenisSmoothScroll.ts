import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let globalLenisInstance: Lenis | null = null;

export function stopLenisScroll(): void {
  if (globalLenisInstance) {
    globalLenisInstance.stop();
  }
}

export function startLenisScroll(): void {
  if (globalLenisInstance) {
    globalLenisInstance.start();
  }
}

export function useLenisSmoothScroll(): void {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });

    globalLenisInstance = lenis;

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      globalLenisInstance = null;
    };
  }, []);
}
