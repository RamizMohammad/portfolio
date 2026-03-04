import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeLines = [
  { indent: 0, text: 'const ramiz = {', color: "hsl(216 100% 60%)" },
  { indent: 1, text: 'role: "Android Developer",', color: "hsl(152 100% 50%)" },
  { indent: 1, text: 'stack: ["Kotlin", "Python", "FastAPI"],', color: "hsl(152 100% 50%)" },
  { indent: 1, text: 'passion: "Building things that matter",', color: "hsl(270 100% 65%)" },
  { indent: 1, text: 'coffee: Infinity,', color: "hsl(30 80% 60%)" },
  { indent: 0, text: '};', color: "hsl(216 100% 60%)" },
  { indent: 0, text: '', color: "" },
  { indent: 0, text: 'ramiz.init();', color: "hsl(60 100% 50%)" },
];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Type lines one by one
    const lineTimers: NodeJS.Timeout[] = [];
    codeLines.forEach((_, i) => {
      lineTimers.push(setTimeout(() => setVisibleLines(i + 1), 400 + i * 350));
    });

    // After all lines, trigger "compile" then exit
    const compileTimer = setTimeout(() => setDone(true), 400 + codeLines.length * 350 + 600);
    const exitTimer = setTimeout(() => onComplete(), 400 + codeLines.length * 350 + 1400);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(compileTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "hsl(230 25% 5%)" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23ffffff' stroke-width='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }} />

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px]" style={{ background: "hsl(152 100% 50% / 0.06)" }} />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[120px]" style={{ background: "hsl(216 100% 50% / 0.05)" }} />
          </div>

          {/* Terminal window */}
          <motion.div
            className="relative w-[90vw] max-w-lg mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Terminal chrome */}
            <div className="rounded-t-xl px-4 py-3 flex items-center gap-2" style={{ background: "hsl(230 20% 10%)", borderBottom: "1px solid hsl(230 15% 16%)" }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0 70% 55%)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "hsl(45 80% 55%)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "hsl(130 60% 45%)" }} />
              </div>
              <span className="ml-3 text-xs font-mono" style={{ color: "hsl(0 0% 40%)" }}>portfolio.ts</span>
            </div>

            {/* Terminal body */}
            <div className="rounded-b-xl p-6 font-mono text-sm leading-7 min-h-[280px]" style={{ background: "hsl(230 20% 7%)", border: "1px solid hsl(230 15% 16%)", borderTop: "none" }}>
              {/* Line numbers + code */}
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  initial={{ opacity: 0, x: -8 }}
                  animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="w-6 text-right mr-4 select-none" style={{ color: "hsl(230 10% 28%)", fontSize: "12px" }}>
                    {i + 1}
                  </span>
                  <span style={{ color: line.color, paddingLeft: `${line.indent * 20}px` }}>
                    {line.text}
                  </span>
                </motion.div>
              ))}

              {/* Cursor */}
              {visibleLines < codeLines.length && (
                <div className="flex items-center mt-0.5">
                  <span className="w-6 text-right mr-4" style={{ color: "hsl(230 10% 28%)", fontSize: "12px" }}>
                    {visibleLines + 1}
                  </span>
                  <motion.span
                    className="inline-block w-2 h-4 rounded-sm"
                    style={{ background: "hsl(152 100% 50%)" }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
              )}

              {/* Compile message */}
              {visibleLines >= codeLines.length && (
                <motion.div
                  className="mt-4 pt-3 flex items-center gap-2"
                  style={{ borderTop: "1px solid hsl(230 15% 16%)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: "hsl(152 100% 50%)" }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <span style={{ color: "hsl(152 100% 50%)" }}>Compiling portfolio...</span>
                </motion.div>
              )}
            </div>

            {/* Glow border effect */}
            <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
              boxShadow: "0 0 40px hsl(152 100% 50% / 0.08), 0 0 80px hsl(216 100% 50% / 0.04)",
            }} />
          </motion.div>

          {/* Name below terminal */}
          <motion.div
            className="absolute bottom-[15%] text-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="font-display text-lg tracking-[0.3em] uppercase" style={{ color: "hsl(0 0% 30%)" }}>
              Mohammad Ramiz
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48">
            <motion.div
              className="h-[1px] rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(152 100% 50%), hsl(216 100% 50%))" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 400 + codeLines.length * 350 + 1200, ease: "linear" }}
            />
          </div>

          {/* Skip */}
          <button
            onClick={() => { setDone(true); setTimeout(onComplete, 100); }}
            className="absolute bottom-8 right-8 z-10 text-xs font-display tracking-widest uppercase transition-opacity opacity-30 hover:opacity-70"
            style={{ color: "hsl(0 0% 50%)" }}
          >
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
