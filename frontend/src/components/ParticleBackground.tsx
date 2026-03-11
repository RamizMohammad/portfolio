import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  color: string;
}

// ─── Device tier detection ────────────────────────────────────────────────────
function getConfig() {
  // Respect OS accessibility setting — always first
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { count: 15, connectDistance: 0, speed: 0.15 };
  }

  const w     = window.innerWidth;
  const cores = navigator.hardwareConcurrency ?? 4;

  if (w < 768) {
    // Mobile — minimal particles, no connection lines
    return { count: 20, connectDistance: 0, speed: 0.2 };
  }
  if (w < 1024 || cores <= 2) {
    // Tablet or weak CPU — moderate, short connections
    return { count: 35, connectDistance: 90, speed: 0.25 };
  }
  if (w >= 1440 && cores >= 6) {
    // Large high-end desktop — full experience
    return { count: 75, connectDistance: 150, speed: 0.3 };
  }
  // Default desktop
  return { count: 55, connectDistance: 130, speed: 0.3 };
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "0, 255, 136",   // primary green
      "0, 102, 255",   // secondary blue
      "130, 80, 255",  // purple accent
    ];

    let animationId: number;
    let particles: Particle[] = [];
    let cfg = getConfig();
    let paused = false;

    const buildParticles = () => {
      particles = [];
      for (let i = 0; i < cfg.count; i++) {
        particles.push({
          x:       Math.random() * canvas.width,
          y:       Math.random() * canvas.height,
          vx:      (Math.random() - 0.5) * cfg.speed,
          vy:      (Math.random() - 0.5) * cfg.speed,
          size:    Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color:   colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cfg = getConfig();        // re-evaluate tier on resize (rotation, window resize)
      buildParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Tab visibility — pause when hidden, resume when visible ──────────────
    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) loop();      // restart loop when tab becomes visible again
    };
    document.addEventListener("visibilitychange", onVisibility);

    const loop = () => {
      if (paused) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0)             p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();

        // Draw connections only if tier allows
        if (cfg.connectDistance > 0) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2  = particles[j];
            const dx  = p.x - p2.x;
            const dy  = p.y - p2.y;
            const d2  = dx * dx + dy * dy;           // skip sqrt until needed
            const max = cfg.connectDistance * cfg.connectDistance;

            if (d2 < max) {
              const dist        = Math.sqrt(d2);
              const lineOpacity = (1 - dist / cfg.connectDistance) * 0.12;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${p.color}, ${lineOpacity})`;
              ctx.lineWidth   = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;