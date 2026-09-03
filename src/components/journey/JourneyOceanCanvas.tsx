import React, { useEffect, useRef } from 'react';

export const JourneyOceanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // bubbles
    const bubbles: { x: number; y: number; radius: number; speed: number; wobbleSpeed: number; seed: number }[] = [];
    const initBubbles = (width: number, height: number) => {
      bubbles.length = 0;
      const count = Math.floor(width / 60);
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.5 + Math.random() * 3.5,
          speed: 0.6 + Math.random() * 1.2,
          wobbleSpeed: 1 + Math.random() * 2,
          seed: Math.random() * 100
        });
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initBubbles(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!ctx || !canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // water body 
      const waterGrad = ctx.createLinearGradient(0, 0, 0, height);
      waterGrad.addColorStop(0, '#38bdf8');
      waterGrad.addColorStop(0.35, '#0284c7');
      waterGrad.addColorStop(0.80, '#0369a1');
      waterGrad.addColorStop(1.0, '#02587a');
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, 0, width, height);

      // shoreline transition sand wave matching tech stack ending color
      const shorelineHeight = Math.min(220, height * 0.18);
      ctx.save();
      const sandGrad = ctx.createLinearGradient(0, 0, 0, shorelineHeight);
      sandGrad.addColorStop(0, '#f2e0aa');
      sandGrad.addColorStop(0.3, '#f6e8ba');
      sandGrad.addColorStop(0.7, '#faeed1');
      sandGrad.addColorStop(1.0, '#fff9d4');
      ctx.fillStyle = sandGrad;

      ctx.beginPath();
      ctx.moveTo(-50, -20);
      ctx.lineTo(width + 50, -20);
      ctx.lineTo(width + 50, shorelineHeight);

      for (let x = width + 50; x >= -50; x -= 8) {
        const sy =
          shorelineHeight +
          Math.sin(x * 0.005 + time * 1.2) * 12 +
          Math.cos(x * 0.008 - time * 0.7) * 6;
        ctx.lineTo(x, sy);
      }

      ctx.lineTo(-50, -20);
      ctx.closePath();
      ctx.fill();

      // white foam edge
      ctx.beginPath();
      for (let x = -50; x <= width + 50; x += 8) {
        const sy =
          shorelineHeight +
          Math.sin(x * 0.005 + time * 1.2) * 12 +
          Math.cos(x * 0.008 - time * 0.7) * 6;
        if (x === -50) ctx.moveTo(x, sy);
        else ctx.lineTo(x, sy);
      }
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.restore();

      // wave crests
      const drawWaveCrest = (yPos: number, freq: number, amp: number, speed: number, alpha: number, color: string) => {
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const wy = yPos + Math.sin(x * freq + time * speed) * amp + Math.cos(x * (freq * 0.7) - time * (speed * 0.5)) * (amp * 0.5);
          if (x === 0) ctx.moveTo(x, wy);
          else ctx.lineTo(x, wy);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([14, 14]);
        ctx.stroke();
        ctx.restore();
      };

      drawWaveCrest(height * 0.32, 0.006, 8, 1.0, 0.45, '#ffffff');
      drawWaveCrest(height * 0.55, 0.005, 10, 0.8, 0.4, '#e0f2fe');
      drawWaveCrest(height * 0.78, 0.004, 12, 0.6, 0.35, '#bae6fd');

      // swimming fish
      const drawFish = (fx: number, fy: number, size: number, color: string, flip: boolean) => {
        ctx.save();
        ctx.translate(fx, fy);
        if (flip) ctx.scale(-1, 1);

        const tailWag = Math.sin(time * 8) * (size * 0.3);

        ctx.fillStyle = color;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;

        // tail
        ctx.beginPath();
        ctx.moveTo(-size * 1.2, 0);
        ctx.lineTo(-size * 1.8, -size * 0.6 + tailWag);
        ctx.lineTo(-size * 1.5, tailWag * 0.5);
        ctx.lineTo(-size * 1.8, size * 0.6 + tailWag);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // body
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 1.2, size * 0.75, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // eye
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(size * 0.6, -size * 0.2, size * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(size * 0.68, -size * 0.2, size * 0.11, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      // fish 1 swimming smoothly across mid depth
      const fish1X = ((time * 45) % (width + 160)) - 80;
      const fish1Y = height * 0.42 + Math.sin(time * 2) * 15;
      drawFish(fish1X, fish1Y, 14, '#f97316', false);

      // fish 2 swimming in opposite direction
      const fish2X = width - (((time * 38) % (width + 160)) - 80);
      const fish2Y = height * 0.68 + Math.cos(time * 1.8) * 18;
      drawFish(fish2X, fish2Y, 16, '#38bdf8', true);

      // rising bubbles
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 1;

      for (const b of bubbles) {
        b.y -= b.speed;
        if (b.y < shorelineHeight) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        const wobbleX = b.x + Math.sin(time * b.wobbleSpeed + b.seed) * 6;

        ctx.beginPath();
        ctx.arc(wobbleX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
