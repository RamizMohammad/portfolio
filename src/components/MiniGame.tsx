import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, RotateCcw } from "lucide-react";

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotSpeed: number;
}

const MiniGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const gameRef = useRef({
    shipX: 0,
    shipY: 0,
    asteroids: [] as Asteroid[],
    stars: [] as Star[],
    score: 0,
    frame: 0,
    keys: { left: false, right: false, up: false, down: false },
  });

  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const game = gameRef.current;

    game.shipX = W / 2;
    game.shipY = H - 60;
    game.asteroids = [];
    game.stars = [];
    game.score = 0;
    game.frame = 0;

    // Init stars
    for (let i = 0; i < 60; i++) {
      game.stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        speed: Math.random() * 1.5 + 0.5,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") game.keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d") game.keys.right = true;
      if (e.key === "ArrowUp" || e.key === "w") game.keys.up = true;
      if (e.key === "ArrowDown" || e.key === "s") game.keys.down = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") game.keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d") game.keys.right = false;
      if (e.key === "ArrowUp" || e.key === "w") game.keys.up = false;
      if (e.key === "ArrowDown" || e.key === "s") game.keys.down = false;
    };

    // Touch controls
    let touchX = game.shipX;
    let touchY = game.shipY;
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      touchX = e.touches[0].clientX - rect.left;
      touchY = e.touches[0].clientY - rect.top;
    };
    const handleTouchStart = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      touchX = e.touches[0].clientX - rect.left;
      touchY = e.touches[0].clientY - rect.top;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart);

    let isTouching = false;
    canvas.addEventListener("touchstart", () => { isTouching = true; });
    canvas.addEventListener("touchend", () => { isTouching = false; });

    let animId: number;

    const drawShip = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      // Ship body
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(-12, 12);
      ctx.lineTo(0, 6);
      ctx.lineTo(12, 12);
      ctx.closePath();
      const shipGrad = ctx.createLinearGradient(0, -16, 0, 12);
      shipGrad.addColorStop(0, "#00ff88");
      shipGrad.addColorStop(1, "#0066ff");
      ctx.fillStyle = shipGrad;
      ctx.fill();
      // Engine glow
      ctx.beginPath();
      ctx.moveTo(-5, 10);
      ctx.lineTo(0, 18 + Math.random() * 6);
      ctx.lineTo(5, 10);
      ctx.fillStyle = `rgba(0, 255, 136, ${0.5 + Math.random() * 0.3})`;
      ctx.fill();
      ctx.restore();
    };

    const drawAsteroid = (a: Asteroid) => {
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.rotation);
      ctx.beginPath();
      const sides = 7;
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        const r = a.size * (0.7 + Math.random() * 0.05);
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = "hsl(230 15% 18%)";
      ctx.fill();
      ctx.strokeStyle = "hsl(230 10% 30%)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const loop = () => {
      game.frame++;
      ctx.clearRect(0, 0, W, H);

      // Stars
      for (const s of game.stars) {
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + s.speed * 0.2})`;
        ctx.fill();
      }

      // Move ship
      const speed = 4;
      if (game.keys.left) game.shipX -= speed;
      if (game.keys.right) game.shipX += speed;
      if (game.keys.up) game.shipY -= speed;
      if (game.keys.down) game.shipY += speed;

      if (isTouching) {
        game.shipX += (touchX - game.shipX) * 0.12;
        game.shipY += (touchY - game.shipY) * 0.12;
      }

      game.shipX = Math.max(14, Math.min(W - 14, game.shipX));
      game.shipY = Math.max(20, Math.min(H - 14, game.shipY));

      // Spawn asteroids
      const spawnRate = Math.max(15, 40 - game.score * 0.5);
      if (game.frame % Math.floor(spawnRate) === 0) {
        game.asteroids.push({
          x: Math.random() * (W - 40) + 20,
          y: -30,
          size: Math.random() * 15 + 10,
          speed: Math.random() * 2 + 1 + game.score * 0.03,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }

      // Update asteroids
      for (let i = game.asteroids.length - 1; i >= 0; i--) {
        const a = game.asteroids[i];
        a.y += a.speed;
        a.rotation += a.rotSpeed;

        if (a.y > H + 40) {
          game.asteroids.splice(i, 1);
          game.score++;
          setScore(game.score);
          continue;
        }

        // Collision
        const dx = game.shipX - a.x;
        const dy = game.shipY - a.y;
        if (Math.sqrt(dx * dx + dy * dy) < a.size + 10) {
          setScore(game.score);
          setGameState("over");
          return;
        }

        drawAsteroid(a);
      }

      drawShip(game.shipX, game.shipY);

      // Score display
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "600 14px 'Outfit', sans-serif";
      ctx.fillText(`Score: ${game.score}`, 12, 24);

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
    };
  }, [gameState]);

  return (
    <section className="section-padding relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">Take a Break</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Dodge the <span className="text-gradient">Asteroids</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base">Use arrow keys or touch to navigate your ship</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto rounded-2xl overflow-hidden border border-border glow-sm"
          style={{ width: "100%", maxWidth: 500, aspectRatio: "5/4" }}
        >
          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            className="w-full h-full bg-background block"
          />

          {/* Overlay for idle / game over */}
          {gameState !== "playing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
              {gameState === "over" && (
                <div className="mb-4 text-center">
                  <p className="font-display text-xl font-bold text-foreground">Game Over!</p>
                  <p className="text-3xl font-display font-extrabold text-gradient mt-1">{score}</p>
                  <p className="text-xs text-muted-foreground">asteroids dodged</p>
                </div>
              )}
              <button
                onClick={() => { setScore(0); setGameState("playing"); }}
                className="px-8 py-3.5 btn-premium flex items-center gap-2"
              >
                {gameState === "over" ? <RotateCcw size={16} /> : <Gamepad2 size={16} />}
                {gameState === "over" ? "Play Again" : "Start Game"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MiniGame;
