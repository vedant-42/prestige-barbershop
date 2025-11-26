import { useEffect, useRef } from 'react';

interface SmokeOverlayProps {
  onComplete: () => void;
}

export default function SmokeOverlay({ onComplete }: SmokeOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    life: number;
    maxLife: number;
    turbulence: number;
    baseOpacity: number;

    constructor(x: number, y: number, vx: number, vy: number) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.radius = Math.random() * 100 + 80;
      this.baseOpacity = Math.random() * 0.5 + 0.4;
      this.opacity = this.baseOpacity;
      this.life = 0;
      this.maxLife = Math.random() * 40 + 80;
      this.turbulence = Math.random() * 0.03 + 0.01;
    }

    update(elapsed: number) {
      this.life += 1;
      const progress = this.life / this.maxLife;

      this.vx *= 0.99;
      this.vy *= 0.99;
      this.vy -= 0.08;

      this.vx += (Math.sin(elapsed * this.turbulence + this.x * 0.01) - 0.5) * 0.15;

      this.x += this.vx;
      this.y += this.vy;

      this.opacity = this.baseOpacity * (1 - progress * 1.2);
      this.radius *= 1.012;
    }

    isDead(): boolean {
      return this.life >= this.maxLife || this.opacity <= 0.01;
    }

    draw(ctx: CanvasRenderingContext2D) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

      const baseColor = 160;
      const currentColor = Math.floor(baseColor + (this.opacity * 50));

      gradient.addColorStop(0, `rgba(${currentColor}, ${currentColor}, ${currentColor}, ${this.opacity * 0.9})`);
      gradient.addColorStop(0.4, `rgba(${currentColor - 20}, ${currentColor - 20}, ${currentColor - 20}, ${this.opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(${currentColor - 40}, ${currentColor - 40}, ${currentColor - 40}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const emitSmoke = (elapsed: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      let emissionRate = 25;
      if (elapsed > 2000) {
        emissionRate = Math.max(2, 25 - ((elapsed - 2000) / 300) * 25);
      }

      for (let i = 0; i < emissionRate; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.8;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 0.5;

        const offsetDistance = Math.random() * 200 + 50;
        const offsetAngle = Math.random() * Math.PI * 2;
        const startX = centerX + Math.cos(offsetAngle) * offsetDistance;
        const startY = centerY + Math.sin(offsetAngle) * offsetDistance;

        particlesRef.current.push(new Particle(startX, startY, vx, vy));
      }
    };

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(1, elapsed / 3000);

      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (elapsed < 2800) {
        emitSmoke(elapsed);
      }

      particlesRef.current.forEach((particle) => {
        particle.update(elapsed);
        particle.draw(ctx);
      });

      particlesRef.current = particlesRef.current.filter((p) => !p.isDead());

      const baseOverlay = Math.max(0, 1 - progress);
      ctx.fillStyle = `rgba(0, 0, 0, ${baseOverlay * 0.3})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animationIdRef.current = requestAnimationFrame(animate);

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
