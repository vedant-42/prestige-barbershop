import { useEffect, useRef } from 'react';

interface SmokeOverlayProps {
  onComplete: () => void;
}

export default function SmokeOverlay({ onComplete }: SmokeOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const particlesRef = useRef<SmokeParticle[]>([]);
  const textureRef = useRef<ImageBitmap | null>(null);

  class SmokeParticle {
    x: number;
    y: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
    vx: number;
    vy: number;
    opacity: number;
    life: number;
    maxLife: number;
    scaleGrowth: number;

    constructor(width: number, height: number) {
      // Start everywhere to cover the screen
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      // VERY Large particles to ensure coverage
      this.size = Math.random() * 400 + 600;

      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.001;

      // Slow drift
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;

      this.opacity = 0;
      this.life = 0;
      this.maxLife = 90 + Math.random() * 30;
      this.scaleGrowth = 1.001;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.size *= this.scaleGrowth;
      this.life++;

      // Fade in phase (very fast to cover screen immediately)
      if (this.life < 10) {
        this.opacity = Math.min(1, this.life / 10);
      }
      else if (this.life > this.maxLife - 60) {
        this.opacity = Math.max(0, (this.maxLife - this.life) / 60);
      }
    }

    draw(ctx: CanvasRenderingContext2D, texture: ImageBitmap) {
      if (this.opacity <= 0) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      // Draw centered
      ctx.drawImage(texture, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load and process texture
    const img = new Image();
    img.src = '/full_smoke_texture.png';

    img.onload = async () => {
      // Create an offscreen canvas to process the image
      const offscreen = new OffscreenCanvas(img.width, img.height);
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      // 1. Draw the full smoke texture
      offCtx.drawImage(img, 0, 0);

      // 2. Apply Radial Mask to make it round
      // 'destination-in' keeps the existing content (smoke) only where the new shape (gradient) overlaps
      offCtx.globalCompositeOperation = 'destination-in';

      const centerX = img.width / 2;
      const centerY = img.height / 2;
      const radius = Math.min(centerX, centerY);

      const gradient = offCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');   // Center: Fully visible
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 1)'); // Keep center opaque
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');   // Edge: Transparent

      offCtx.fillStyle = gradient;
      offCtx.beginPath();
      offCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      offCtx.fill();

      // Reset composite operation
      offCtx.globalCompositeOperation = 'source-over';

      // Create bitmap for performance
      textureRef.current = await createImageBitmap(offscreen);

      initParticles();
      animate();
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const initParticles = () => {
      particlesRef.current = [];
      // High density to ensure full coverage
      const area = canvas.width * canvas.height;
      const count = Math.min(150, Math.max(30, Math.floor(area / 20000)));

      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new SmokeParticle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!textureRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;

      // Draw particles
      // We use 'source-over' (default) which blends them nicely
      particlesRef.current.forEach((p: SmokeParticle) => {
        p.update();
        if (p.opacity > 0) {
          p.draw(ctx, textureRef.current!);
          activeParticles++;
        }
      });

      // If all particles are gone, we are done
      if (activeParticles === 0) {
        onComplete();
        return;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ display: 'block' }}
    />
  );
}
