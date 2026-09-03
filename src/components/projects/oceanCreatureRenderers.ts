export function drawClownFish(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number,
  size: number = 14,
  flip: boolean = false
): void {
  ctx.save();
  ctx.translate(x, y);
  if (flip) ctx.scale(-1, 1);

  const tailWag = Math.sin(time * 8) * (size * 0.3);

  // tail fin
  ctx.fillStyle = '#f97316';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-size * 1.2, 0);
  ctx.lineTo(-size * 1.8, -size * 0.6 + tailWag);
  ctx.lineTo(-size * 1.5, tailWag * 0.5);
  ctx.lineTo(-size * 1.8, size * 0.6 + tailWag);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // body
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 1.2, size * 0.75, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // white stripes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(-size * 0.1, 0, size * 0.25, size * 0.72, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(-size * 0.7, 0, size * 0.18, size * 0.5, 0, 0, Math.PI * 2);
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
}

export function drawMantaRay(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.translate(x, y);

  const wingFlap = Math.sin(time * 3) * 14;

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  // manta ray wings
  ctx.beginPath();
  ctx.moveTo(35, 0);
  ctx.quadraticCurveTo(10, -35 + wingFlap, -20, -50 + wingFlap * 1.2);
  ctx.quadraticCurveTo(-15, -15, -35, 0);
  ctx.quadraticCurveTo(-15, 15, -20, 50 - wingFlap * 1.2);
  ctx.quadraticCurveTo(10, 35 - wingFlap, 35, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // tail
  ctx.beginPath();
  ctx.moveTo(-35, 0);
  ctx.quadraticCurveTo(-60, Math.sin(time * 3) * 8, -95, 0);
  ctx.stroke();

  // cephalic fins
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(35, -8, 8, 4, -0.3, 0, Math.PI * 2);
  ctx.ellipse(35, 8, 8, 4, 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawCartoonShark(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.translate(x, y);

  const tailWag = Math.sin(time * 5) * 8;

  // shark body
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(55, 0);
  ctx.quadraticCurveTo(20, -22, -30, -14);
  ctx.lineTo(-65, -32 + tailWag);
  ctx.lineTo(-50, 0 + tailWag * 0.5);
  ctx.lineTo(-65, 28 + tailWag);
  ctx.quadraticCurveTo(-20, 16, 20, 14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // dorsal fin
  ctx.beginPath();
  ctx.moveTo(5, -18);
  ctx.lineTo(-8, -42);
  ctx.lineTo(-20, -15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // underbelly
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(55, 0);
  ctx.quadraticCurveTo(25, 12, -20, 12);
  ctx.quadraticCurveTo(15, 2, 55, 0);
  ctx.closePath();
  ctx.fill();

  // eye and grin
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(38, -6, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(40, -6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // gills
  ctx.beginPath();
  ctx.moveTo(15, -4);
  ctx.lineTo(13, 6);
  ctx.moveTo(20, -4);
  ctx.lineTo(18, 6);
  ctx.stroke();

  ctx.restore();
}

export function drawAnglerFish(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.translate(x, y);

  // body
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.ellipse(0, 0, 32, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // lure stalk
  ctx.beginPath();
  ctx.moveTo(10, -22);
  ctx.quadraticCurveTo(24, -48, 38, -32 + Math.sin(time * 3) * 4);
  ctx.stroke();

  // glowing lure bulb
  const glow = 6 + Math.sin(time * 6) * 3;
  ctx.fillStyle = '#fde047';
  ctx.shadowColor = '#fde047';
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(38, -32 + Math.sin(time * 3) * 4, glow, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // sharp teeth
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(22, -4);
  ctx.lineTo(28, 4);
  ctx.lineTo(16, 4);
  ctx.moveTo(12, -4);
  ctx.lineTo(18, 4);
  ctx.lineTo(6, 4);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

export function drawScubaDiver(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.translate(x, y);

  const kick = Math.sin(time * 5) * 6;

  // wetsuit body
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.2;

  ctx.beginPath();
  ctx.ellipse(0, 0, 22, 10, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // oxygen tank
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.rect(-12, -12, 18, 7);
  ctx.fill();
  ctx.stroke();

  // mask
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(18, -2, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // flippers
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-20, 2);
  ctx.lineTo(-34, 4 + kick);
  ctx.lineTo(-30, 10 + kick);
  ctx.lineTo(-18, 5);
  ctx.closePath();
  ctx.fill();

  // bubbles from regulator
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(24 + Math.sin(time * 3) * 3, -10 - ((time * 20) % 30), 3, 0, Math.PI * 2);
  ctx.arc(28 + Math.cos(time * 3) * 4, -20 - ((time * 24) % 35), 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawCartoonCrab(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.translate(x, y);

  // crab legs
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';

  const legWobble1 = Math.sin(time * 12) * 4;
  const legWobble2 = Math.cos(time * 12) * 4;

  ctx.beginPath();
  ctx.moveTo(-16, 8);
  ctx.lineTo(-26, 18 + legWobble1);
  ctx.moveTo(-8, 12);
  ctx.lineTo(-14, 22 + legWobble2);
  ctx.moveTo(16, 8);
  ctx.lineTo(26, 18 + legWobble2);
  ctx.moveTo(8, 12);
  ctx.lineTo(14, 22 + legWobble1);
  ctx.stroke();

  // shell
  ctx.fillStyle = '#ef4444';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 24, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // claws
  ctx.beginPath();
  ctx.arc(-24, -14 + Math.sin(time * 6) * 4, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(24, -14 - Math.sin(time * 6) * 4, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // eyes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-8, -16, 6, 0, Math.PI * 2);
  ctx.arc(8, -16, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-7, -16, 3, 0, Math.PI * 2);
  ctx.arc(7, -16, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function renderCreaturesByDepth(
  ctx: CanvasRenderingContext2D,
  depthLevel: 1 | 2 | 3 | 4,
  width: number,
  height: number,
  time: number,
  waterMinY: number,
  waterMaxY: number
): void {
  if (depthLevel === 1) {
    const fish1X = (time * 70) % (width + 160) - 80;
    const fish1Y = waterMinY + 60;
    drawClownFish(ctx, time, fish1X, fish1Y, 15);

    const fish2X = width - (((time * 55) % (width + 160)) - 80);
    const fish2Y = waterMinY + 140;
    drawClownFish(ctx, time, fish2X, fish2Y, 12, true);

    const diverX = (time * 40 + width * 0.4) % (width + 200) - 100;
    const diverY = waterMinY + 90;
    drawScubaDiver(ctx, time, diverX, diverY);
  } else if (depthLevel === 2) {
    const mantaX = (time * 55) % (width + 240) - 120;
    const mantaY = height * 0.48;
    drawMantaRay(ctx, time, mantaX, mantaY);

    const fishX = width - (((time * 80) % (width + 160)) - 80);
    const fishY = height * 0.25;
    drawClownFish(ctx, time, fishX, fishY, 16, true);
  } else if (depthLevel === 3) {
    const sharkX = (time * 85) % (width + 300) - 150;
    const sharkY = height * 0.38;
    drawCartoonShark(ctx, time, sharkX, sharkY);

    const anglerX = width - (((time * 45) % (width + 200)) - 100);
    const anglerY = height * 0.65;
    drawAnglerFish(ctx, time, anglerX, anglerY);
  } else if (depthLevel === 4) {
    // crab traverses smoothly from offscreen until completely exiting offscreen
    const crabX = ((time * 40) % (width + 200)) - 100;
    const crabY = waterMaxY + 30;
    drawCartoonCrab(ctx, time, crabX, crabY);

    const fishX = (time * 65) % (width + 160) - 80;
    const fishY = height * 0.32;
    drawClownFish(ctx, time, fishX, fishY, 14);
  }
}
