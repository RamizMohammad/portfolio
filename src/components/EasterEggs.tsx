import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const EasterEggs = () => {
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [showKonami, setShowKonami] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; emoji: string }[]>([]);

  // Konami code listener
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === KONAMI[konamiIdx]) {
      const next = konamiIdx + 1;
      if (next === KONAMI.length) {
        setShowKonami(true);
        setKonamiIdx(0);
        // Generate celebration particles
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: `hsl(${Math.random() * 360}, 80%, 60%)`,
          emoji: ["🚀", "⭐", "🎉", "💻", "🔥", "✨", "🎯", "💎"][Math.floor(Math.random() * 8)],
        }));
        setParticles(newParticles);
        setTimeout(() => { setShowKonami(false); setParticles([]); }, 5000);
      } else {
        setKonamiIdx(next);
      }
    } else {
      setKonamiIdx(0);
    }
  }, [konamiIdx]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {showKonami && (
        <motion.div
          className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute text-2xl"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [1, 1, 0],
                y: [0, -200 - Math.random() * 300],
                x: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 720,
              }}
              transition={{ duration: 2 + Math.random() * 2, ease: "easeOut" }}
            >
              {p.emoji}
            </motion.div>
          ))}

          {/* Message */}
          <motion.div
            className="rounded-2xl border border-primary/30 px-8 py-6 text-center pointer-events-none"
            style={{
              background: "linear-gradient(135deg, hsl(220 25% 8% / 0.95), hsl(220 25% 12% / 0.95))",
              boxShadow: "0 0 60px hsl(152 100% 50% / 0.2), 0 0 120px hsl(216 100% 50% / 0.1)",
            }}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <p className="text-3xl mb-2">🎮</p>
            <p className="text-lg font-display font-bold text-primary">KONAMI CODE ACTIVATED!</p>
            <p className="text-sm text-muted-foreground mt-1">You're clearly a developer. Welcome, friend.</p>
            <p className="text-xs text-muted-foreground/60 mt-3 font-mono">↑↑↓↓←→←→BA</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEggs;
