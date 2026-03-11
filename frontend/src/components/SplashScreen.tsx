import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY   = "ramiz_splash_seen";
const EXIT_MS       = 380;
const ROW_DELAY_MS  = 120;   // ms between rows starting
const CHAR_SPEED_MS = 4;     // ms per character within a row

// ─── ASCII art — "MOHAMMAD RAMIZ" in block font ───────────────────────────────
const ASCII_ROWS = [
  "  ███╗   ███╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ███╗███╗   ███╗ █████╗ ██████╗     ██████╗  █████╗ ███╗   ███╗██╗███████╗",
  "  ████╗ ████║██╔═══██╗██║  ██║██╔══██╗████╗ ████║████╗ ████║██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗████╗ ████║██║╚══███╔╝",
  "  ██╔████╔██║██║   ██║███████║███████║██╔████╔██║██╔████╔██║███████║██║  ██║    ██████╔╝███████║██╔████╔██║██║  ███╔╝ ",
  "  ██║╚██╔╝██║██║   ██║██╔══██║██╔══██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║  ██║    ██╔══██╗██╔══██║██║╚██╔╝██║██║ ███╔╝  ",
  "  ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██████╔╝    ██║  ██║██║  ██║██║ ╚═╝ ██║██║███████╗",
  "  ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚══════╝",
];

const BOOT_LINES = [
  { label: "SYS", text: "Runtime initialised",  color: "hsl(152 100% 50%)" },
  { label: "PKG", text: "Loading modules...",    color: "hsl(216 100% 65%)" },
  { label: "APP", text: "Mounting portfolio...", color: "hsl(270 100% 70%)" },
  { label: "OK",  text: "All systems ready",     color: "hsl(152 100% 50%)" },
];

// Precompute timing — all in ms
const MAX_ROW_LEN    = Math.max(...ASCII_ROWS.map(r => r.length));
const ART_MS         = ASCII_ROWS.length * ROW_DELAY_MS + MAX_ROW_LEN * CHAR_SPEED_MS;
const BOOT_START_MS  = ART_MS + 150;
const BOOT_DONE_MS   = BOOT_START_MS + BOOT_LINES.length * 130 + 200;
const TOTAL_MS       = BOOT_DONE_MS + 500;

// ─── Check sessionStorage synchronously — before any React render ────────────
// This avoids the null→splash flash entirely
const alreadySeen = (): boolean => {
  try { return !!sessionStorage.getItem(SESSION_KEY); }
  catch { return false; }
};

// ─── Main Splash component ────────────────────────────────────────────────────
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [typedRows, setTypedRows] = useState<number[]>(
    Array(ASCII_ROWS.length).fill(0)
  );
  const [bootCount, setBootCount] = useState(0);
  const [phase,     setPhase]     = useState<"typing" | "boot" | "done" | "exit">("typing");
  const [progress,  setProgress]  = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const skip = useCallback(() => {
    timers.current.forEach(clearTimeout);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    setPhase("exit");
    setTimeout(onComplete, EXIT_MS);
  }, [onComplete]);

  useEffect(() => {
    const T = timers.current;

    // Progress bar via RAF
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      setProgress(Math.min((now - start) / TOTAL_MS, 1));
      if (now - start < TOTAL_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Schedule every character across all rows
    ASCII_ROWS.forEach((row, rowIdx) => {
      const rowStart = rowIdx * ROW_DELAY_MS;
      for (let c = 1; c <= row.length; c++) {
        T.push(setTimeout(() => {
          setTypedRows(prev => {
            const next = [...prev];
            next[rowIdx] = c;
            return next;
          });
        }, rowStart + c * CHAR_SPEED_MS));
      }
    });

    // Phase transitions
    T.push(setTimeout(() => setPhase("boot"),                       BOOT_START_MS));
    BOOT_LINES.forEach((_, i) => {
      T.push(setTimeout(() => setBootCount(i + 1),                  BOOT_START_MS + i * 130));
    });
    T.push(setTimeout(() => setPhase("done"),                       BOOT_DONE_MS));
    T.push(setTimeout(() => {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      setPhase("exit");
    }, TOTAL_MS));
    T.push(setTimeout(onComplete,                                   TOTAL_MS + EXIT_MS));

    return () => {
      cancelAnimationFrame(raf);
      T.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ background: "hsl(230 25% 4%)" }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full blur-[200px]"
              style={{ width: 600, height: 600, top: "5%", left: "5%",
                background: "hsl(152 100% 50% / 0.04)" }} />
            <div className="absolute rounded-full blur-[180px]"
              style={{ width: 400, height: 400, bottom: "10%", right: "5%",
                background: "hsl(216 100% 55% / 0.04)" }} />
          </div>

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff' stroke-width='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, hsl(152 100% 50% / 0.5), transparent)" }}
            initial={{ top: "-2%" }}
            animate={{ top: "105%" }}
            transition={{ duration: 1.5, ease: "linear", delay: 0.1 }}
          />

          {/* ── Content ─────────────────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-6 w-full px-4 md:px-8">

            {/* Terminal window */}
            <motion.div
              className="w-full"
              style={{ maxWidth: "min(96vw, 880px)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  border: "1px solid hsl(230 15% 15%)",
                  background: "hsl(230 20% 6%)",
                  boxShadow: "0 0 80px hsl(152 100% 50% / 0.05), 0 0 160px hsl(216 100% 50% / 0.03)",
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{ background: "hsl(230 20% 8%)", borderBottom: "1px solid hsl(230 15% 13%)" }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(0 65% 52%)" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(40 75% 52%)" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(130 55% 42%)" }} />
                  </div>
                  <span className="ml-2 font-mono text-[10px]" style={{ color: "hsl(0 0% 28%)" }}>
                    portfolio.init — bash
                  </span>
                  <span className="ml-auto font-mono text-[9px]" style={{ color: "hsl(0 0% 20%)" }}>
                    v2.0.0
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 md:p-5">
                  {/* Prompt */}
                  <div className="font-mono mb-3 flex items-center gap-2"
                    style={{ fontSize: "11px", color: "hsl(0 0% 32%)" }}>
                    <span style={{ color: "hsl(152 100% 50%)" }}>❯</span>
                    <span style={{ color: "hsl(216 100% 65%)" }}>node</span>
                    <span> portfolio.ts --init</span>
                  </div>

                  {/* ASCII name — typed row by row */}
                  <div
                    className="font-mono leading-[1.18] whitespace-pre overflow-x-hidden"
                    style={{ fontSize: "clamp(4.5px, 0.95vw, 8.5px)" }}
                  >
                    {ASCII_ROWS.map((row, rowIdx) => {
                      const revealed  = typedRows[rowIdx];
                      const isDone    = revealed >= row.length;
                      const isActive  = !isDone && revealed > 0;

                      return (
                        <div key={rowIdx}>
                          <span style={{
                            color: rowIdx <= 2
                              ? "hsl(152 100% 52%)"   // green — MOHAMMAD
                              : "hsl(216 100% 62%)",  // blue  — RAMIZ
                          }}>
                            {row.slice(0, revealed)}
                          </span>
                          {isActive && (
                            <motion.span
                              className="inline-block align-bottom"
                              style={{
                                width: "0.55em",
                                height: "1.1em",
                                background: "hsl(152 100% 50%)",
                                marginLeft: "1px",
                                verticalAlign: "text-bottom",
                              }}
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.35, repeat: Infinity, repeatType: "reverse" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div className="my-3 h-px" style={{ background: "hsl(230 15% 12%)" }} />

                  {/* Boot log */}
                  <div className="space-y-1.5">
                    {BOOT_LINES.map((line, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2.5 font-mono"
                        style={{ fontSize: "clamp(9px, 1vw, 11px)" }}
                        initial={{ opacity: 0, x: -8 }}
                        animate={i < bootCount ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span
                          className="inline-flex items-center justify-center rounded flex-shrink-0 font-bold"
                          style={{
                            fontSize: "8px",
                            padding: "1px 5px",
                            minWidth: "2rem",
                            color: line.color,
                            background: line.color.replace(")", " / 0.1)"),
                            border: `1px solid ${line.color.replace(")", " / 0.18)")}`,
                          }}
                        >
                          {line.label}
                        </span>
                        <span style={{ color: "hsl(0 0% 48%)" }}>{line.text}</span>

                        {i === bootCount - 1 && phase === "boot" && (
                          <motion.span
                            className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: line.color }}
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          />
                        )}
                        {phase === "done" && (
                          <motion.span
                            className="ml-auto font-bold flex-shrink-0"
                            style={{ color: "hsl(152 100% 50%)", fontSize: "10px" }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04, type: "spring", stiffness: 420, damping: 22 }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="font-mono tracking-[0.35em] uppercase"
              style={{ fontSize: "9px", color: "hsl(0 0% 24%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Android · Python · Agentic AI
            </motion.p>

            {/* Progress bar */}
            <div className="w-full max-w-xs">
              <div className="w-full h-[2px] rounded-full overflow-hidden"
                style={{ background: "hsl(230 15% 10%)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: "linear-gradient(90deg, hsl(152 100% 50%), hsl(216 100% 60%))",
                    boxShadow: "0 0 8px hsl(152 100% 50% / 0.5)",
                    transition: "width 50ms linear",
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="font-mono text-[9px] tracking-widest"
                  style={{ color: "hsl(0 0% 20%)" }}>
                  {phase === "done" ? "READY" : phase === "boot" ? "BOOTING" : "COMPILING"}
                </span>
                <span className="font-mono text-[9px]"
                  style={{ color: "hsl(0 0% 20%)" }}>
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Skip */}
          <button
            onClick={skip}
            className="absolute bottom-6 right-6 font-mono text-[10px] tracking-widest uppercase"
            style={{
              color: "hsl(0 0% 40%)",
              opacity: 0.25,
              transition: "opacity 200ms ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.25")}
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Default export — checks sessionStorage SYNCHRONOUSLY before first render ─
// If already seen → call onComplete immediately, render nothing
// This avoids any flash or null state delay
const SplashScreenWrapper = ({ onComplete }: { onComplete: () => void }) => {
  // alreadySeen() is called synchronously during render — no useEffect needed
  // so there's zero frame where splash is "null" before deciding to show
  const skip = alreadySeen();

  useEffect(() => {
    if (skip) onComplete();
  }, [skip, onComplete]);

  if (skip) return null;
  return <SplashScreen onComplete={onComplete} />;
};

export default SplashScreenWrapper;