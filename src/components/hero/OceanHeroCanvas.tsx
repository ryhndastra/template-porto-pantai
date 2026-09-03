import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface OceanHeroHandle {
  triggerSplash: (x: number, y: number, intensity?: number) => void;
  triggerRipple: (x: number, y: number, size?: number) => void;
}

interface SplashDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  gravity: number;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const OceanHeroCanvas = forwardRef<OceanHeroHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dropletsRef = useRef<SplashDroplet[]>([]);
    const ripplesRef = useRef<WaterRipple[]>([]);
    const animRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);

    const triggerSplash = (clientX: number, clientY: number, intensity: number = 1) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (y > rect.height * 0.70) return;

      ripplesRef.current.push({
        x,
        y,
        radius: 6,
        maxRadius: Math.min(260, rect.width * 0.45) * Math.max(0.7, intensity),
        alpha: 0.95,
        speed: 3.6 * Math.max(0.6, intensity)
      });

      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.min(180, rect.width * 0.3) * Math.max(0.7, intensity),
        alpha: 0.7,
        speed: 2.2 * Math.max(0.6, intensity)
      });

      const count = Math.floor(32 * Math.min(2.5, intensity));
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = (3.2 + Math.random() * 6.5) * Math.min(2, intensity);
        dropletsRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed * 0.85,
          vy: -Math.abs(Math.sin(angle) * speed * 1.5) - 3.5 * intensity,
          radius: 1.8 + Math.random() * 3.0,
          alpha: 1,
          decay: 0.018 + Math.random() * 0.02,
          gravity: 0.28
        });
      }
    };

    const triggerRipple = (clientX: number, clientY: number, size: number = 75) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (y > rect.height * 0.70) return;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: size,
        alpha: 0.55,
        speed: 1.9
      });
    };

    useImperativeHandle(ref, () => ({
      triggerSplash,
      triggerRipple
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let isRunning = true;

      const handleResize = () => {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const render = () => {
        if (!isRunning || !canvas) return;
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);
        timeRef.current += 0.014;
        const t = timeRef.current;

        const shoreBaseY = height * 0.68;
        const tidalCycle = (Math.sin(t * 0.22) + 1) * 0.5;
        const tideAmplitude = 18;

        const getTideY = (x: number) => {
          return shoreBaseY + tidalCycle * tideAmplitude + Math.sin(x * 0.0045 + t * 0.5) * 8 + Math.cos(x * 0.009 - t * 0.3) * 4;
        };

        const oceanGrad = ctx.createLinearGradient(0, 0, 0, shoreBaseY);
        oceanGrad.addColorStop(0, '#02587a');
        oceanGrad.addColorStop(0.35, '#0284c7');
        oceanGrad.addColorStop(0.70, '#0ea5e9');
        oceanGrad.addColorStop(1, '#38bdf8');
        ctx.fillStyle = oceanGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        ctx.globalAlpha = 0.07;
        ctx.fillStyle = '#fff9d4';
        for (let i = 0; i < 4; i++) {
          const patchX = (width * 0.25 * i + Math.sin(t * 0.15 + i) * 20) % width;
          const patchY = height * 0.32 + (i % 2) * (height * 0.12);
          ctx.beginPath();
          ctx.ellipse(patchX, patchY, 120, 45, Math.PI / 8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        const wave1Y = height * 0.26;
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const cy = wave1Y + Math.sin(x * 0.005 + t * 0.45) * 12 + Math.cos(x * 0.009 - t * 0.3) * 5;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();

        const wave2Y = height * 0.45;
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const cy = wave2Y + Math.sin(x * 0.006 + t * 0.55 + 1.5) * 14 + Math.sin(x * 0.012 - t * 0.25) * 6;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, getTideY(0));
        for (let x = 0; x <= width; x += 3) {
          ctx.lineTo(x, getTideY(x));
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = '#fff9d4';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const cy = getTideY(x);
          if (x === 0) ctx.moveTo(x, cy + 2);
          else ctx.lineTo(x, cy + 2);
        }
        ctx.strokeStyle = '#e5dbae';
        ctx.lineWidth = 4.0;
        ctx.stroke();

        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const cy = getTideY(x);
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
        ctx.lineWidth = 3.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        for (let x = 6; x < width; x += 16) {
          const cy = getTideY(x);
          const bubbleSpread = (Math.sin(x * 0.06 + t * 0.8) + 1) * 3 + 1;
          ctx.beginPath();
          ctx.arc(x + Math.sin(t * 0.8 + x) * 2, cy + bubbleSpread, 1.6 + Math.sin(x * 0.3) * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
          ctx.fill();
        }
        ctx.restore();

        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += r.speed;
          r.alpha -= 0.012;

          if (r.alpha <= 0 || r.radius >= r.maxRadius) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.42, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.95})`;
          ctx.lineWidth = 2.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius * 0.68, r.radius * 0.28, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(103, 232, 249, ${r.alpha * 0.75})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
          ctx.restore();
        }

        for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
          const d = dropletsRef.current[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += d.gravity;
          d.alpha -= d.decay;

          if (d.alpha <= 0) {
            dropletsRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
          ctx.shadowColor = '#67e8f9';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }

        animRef.current = requestAnimationFrame(render);
      };

      animRef.current = requestAnimationFrame(render);

      return () => {
        isRunning = false;
        if (animRef.current) cancelAnimationFrame(animRef.current);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (Math.random() < 0.16) {
        triggerRipple(e.clientX, e.clientY, 65);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      triggerSplash(e.clientX, e.clientY, 1.4);
    };

    return (
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={`w-full h-full block cursor-pointer select-none ${className}`}
      />
    );
  }
);

OceanHeroCanvas.displayName = 'OceanHeroCanvas';
