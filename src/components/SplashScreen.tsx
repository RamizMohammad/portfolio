import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  // 0: dev running toward girl
  // 1: hits wall
  // 2: starts coding
  // 3: fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2200),
      setTimeout(() => setPhase(2), 3200),
      setTimeout(() => setPhase(3), 5200),
      setTimeout(() => onComplete(), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "hsl(230 25% 5%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23ffffff' stroke-width='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Ground line */}
          <div
            className="absolute bottom-[28%] left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(152 100% 50% / 0.3), hsl(216 100% 50% / 0.3), transparent)",
            }}
          />

          {/* Scene container */}
          <div className="relative w-full max-w-3xl h-64">
            {/* Heart particles (phase 0) */}
            {phase === 0 && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-red-400 text-lg"
                    initial={{ opacity: 0, y: 0, x: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [-20 - i * 15, -60 - i * 20],
                      x: [180 + i * 12, 190 + i * 15],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    style={{ bottom: "55%", left: "30%" }}
                  >
                    ♥
                  </motion.div>
                ))}
              </>
            )}

            {/* Girl character (moves away) */}
            <motion.div
              className="absolute"
              style={{ bottom: "28%", left: "55%" }}
              initial={{ x: 0 }}
              animate={
                phase === 0
                  ? { x: [0, 40, 80, 140] }
                  : { x: 200, opacity: 0 }
              }
              transition={
                phase === 0
                  ? { duration: 2.2, ease: "easeInOut" }
                  : { duration: 0.5 }
              }
            >
              <div className="relative flex flex-col items-center">
                {/* Head */}
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ background: "hsl(30 60% 70%)" }}
                />
                {/* Hair */}
                <div
                  className="absolute -top-1 w-10 h-5 rounded-t-full"
                  style={{ background: "hsl(30 80% 25%)" }}
                />
                <div
                  className="absolute top-2 -right-2 w-3 h-8 rounded-b-full"
                  style={{ background: "hsl(30 80% 25%)" }}
                />
                {/* Body */}
                <div
                  className="w-6 h-10 rounded-md mt-1"
                  style={{ background: "hsl(340 70% 55%)" }}
                />
                {/* Legs with walk animation */}
                <motion.div
                  className="flex gap-1"
                  animate={{ rotateZ: [-5, 5] }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <div
                    className="w-2 h-6 rounded-b-md"
                    style={{ background: "hsl(30 60% 65%)" }}
                  />
                  <div
                    className="w-2 h-6 rounded-b-md"
                    style={{ background: "hsl(30 60% 60%)" }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* THE WALL - appears as code wall */}
            <motion.div
              className="absolute flex flex-col items-center"
              style={{ bottom: "28%", left: "48%" }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={
                phase >= 1
                  ? { scaleY: 1, opacity: 1 }
                  : { scaleY: 0, opacity: 0 }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            >
              <div
                className="w-16 rounded-md overflow-hidden relative"
                style={{
                  height: "120px",
                  background: "hsl(230 20% 12%)",
                  border: "2px solid hsl(152 100% 50% / 0.5)",
                  boxShadow: "0 0 30px hsl(152 100% 50% / 0.2)",
                  transformOrigin: "bottom",
                }}
              >
                {/* Scrolling code on the wall */}
                <motion.div
                  className="absolute inset-0 p-1 text-[6px] font-mono leading-tight overflow-hidden"
                  style={{ color: "hsl(152 100% 50% / 0.7)" }}
                  animate={{ y: [0, -60] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {`const dev = {\n  life: "code",\n  love: null,\n  coffee: Infinity\n};\nwhile(true) {\n  dev.code();\n  dev.debug();\n  dev.repeat();\n}\n// TODO: get a life\nfunction main() {\n  return code;\n}`}
                </motion.div>
                {/* Label */}
                <div
                  className="absolute bottom-1 left-0 right-0 text-center text-[7px] font-display font-bold tracking-wider"
                  style={{ color: "hsl(152 100% 50%)" }}
                >
                  {"{ CODE }"}
                </div>
              </div>
            </motion.div>

            {/* Developer character */}
            <motion.div
              className="absolute"
              style={{ bottom: "28%", left: "25%" }}
              initial={{ x: 0 }}
              animate={
                phase === 0
                  ? { x: [0, 30, 70, 120] }
                  : phase === 1
                  ? { x: 100, rotate: [-10, 0] }
                  : { x: 100 }
              }
              transition={
                phase === 0
                  ? { duration: 2.2, ease: "easeInOut" }
                  : { duration: 0.4, type: "spring" }
              }
            >
              <div className="relative flex flex-col items-center">
                {/* Head */}
                <motion.div
                  className="w-8 h-8 rounded-full relative"
                  style={{ background: "hsl(30 50% 65%)" }}
                  animate={
                    phase === 1
                      ? { x: [0, -5, 3, 0] }
                      : {}
                  }
                  transition={{ duration: 0.4 }}
                >
                  {/* Glasses */}
                  <div className="absolute top-2 left-1 flex gap-[2px]">
                    <div
                      className="w-3 h-2.5 rounded-sm border"
                      style={{ borderColor: "hsl(0 0% 80%)" }}
                    />
                    <div
                      className="w-3 h-2.5 rounded-sm border"
                      style={{ borderColor: "hsl(0 0% 80%)" }}
                    />
                  </div>
                  {/* Stars on hit */}
                  {phase === 1 && (
                    <>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="absolute text-accent text-xs"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.2, 0],
                            x: [-10 + i * 15, -15 + i * 20],
                            y: [-10 - i * 8, -20 - i * 12],
                          }}
                          transition={{ duration: 0.8, delay: i * 0.15 }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </>
                  )}
                </motion.div>
                {/* Hair */}
                <div
                  className="absolute -top-1 w-9 h-4 rounded-t-full"
                  style={{ background: "hsl(30 20% 15%)" }}
                />
                {/* Body - hoodie */}
                <div
                  className="w-8 h-10 rounded-md mt-1 relative"
                  style={{ background: "hsl(230 30% 25%)" }}
                >
                  <div
                    className="absolute top-0 left-2 right-2 h-3 rounded-b-md"
                    style={{ background: "hsl(230 30% 30%)" }}
                  />
                </div>
                {/* Arms */}
                {phase >= 2 ? (
                  // Typing arms
                  <motion.div
                    className="absolute top-12 flex"
                    animate={{ y: [0, -1, 0, -1] }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                    }}
                  >
                    <div
                      className="w-10 h-2 rounded-full"
                      style={{ background: "hsl(30 50% 60%)" }}
                    />
                  </motion.div>
                ) : (
                  // Running arms
                  <motion.div
                    className="absolute top-10 flex gap-6"
                    animate={{ rotateZ: phase === 0 ? [-15, 15] : 0 }}
                    transition={{
                      duration: 0.3,
                      repeat: phase === 0 ? Infinity : 0,
                      repeatType: "reverse",
                    }}
                  >
                    <div
                      className="w-2 h-5 rounded-full -ml-1"
                      style={{ background: "hsl(30 50% 60%)" }}
                    />
                    <div
                      className="w-2 h-5 rounded-full"
                      style={{ background: "hsl(30 50% 60%)" }}
                    />
                  </motion.div>
                )}
                {/* Legs */}
                <motion.div
                  className="flex gap-1"
                  animate={
                    phase === 0
                      ? { rotateZ: [-8, 8] }
                      : { rotateZ: 0 }
                  }
                  transition={{
                    duration: 0.25,
                    repeat: phase === 0 ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                >
                  <div
                    className="w-2.5 h-6 rounded-b-md"
                    style={{ background: "hsl(220 30% 30%)" }}
                  />
                  <div
                    className="w-2.5 h-6 rounded-b-md"
                    style={{ background: "hsl(220 30% 28%)" }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Laptop (phase 2) */}
            {phase >= 2 && (
              <motion.div
                className="absolute"
                style={{ bottom: "28%", left: "38%" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, x: 55 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Screen */}
                <motion.div
                  className="w-14 h-10 rounded-t-md relative overflow-hidden"
                  style={{
                    background: "hsl(230 20% 10%)",
                    border: "1.5px solid hsl(152 100% 50% / 0.4)",
                    boxShadow: "0 0 20px hsl(152 100% 50% / 0.15)",
                  }}
                >
                  {/* Code lines on screen */}
                  <motion.div
                    className="p-1 space-y-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[60, 80, 45, 70, 30, 55, 65].map((w, i) => (
                      <motion.div
                        key={i}
                        className="h-[2px] rounded-full"
                        style={{
                          width: `${w}%`,
                          background:
                            i % 3 === 0
                              ? "hsl(152 100% 50% / 0.6)"
                              : i % 3 === 1
                              ? "hsl(216 100% 60% / 0.5)"
                              : "hsl(270 100% 60% / 0.4)",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
                      />
                    ))}
                  </motion.div>
                  {/* Cursor blink */}
                  <motion.div
                    className="absolute bottom-1 left-2 w-[3px] h-[6px] rounded-sm"
                    style={{ background: "hsl(152 100% 50%)" }}
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.div>
                {/* Base */}
                <div
                  className="w-16 h-1.5 rounded-b-sm -ml-1"
                  style={{ background: "hsl(0 0% 50%)" }}
                />
              </motion.div>
            )}

            {/* Coffee cup (phase 2) */}
            {phase >= 2 && (
              <motion.div
                className="absolute"
                style={{ bottom: "28%", left: "55%" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, x: 50 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="relative">
                  <div
                    className="w-4 h-5 rounded-b-md"
                    style={{ background: "hsl(30 40% 50%)" }}
                  />
                  <div
                    className="absolute -right-1.5 top-1 w-2 h-3 rounded-r-full border-2"
                    style={{ borderColor: "hsl(30 40% 50%)", borderLeft: "none" }}
                  />
                  {/* Steam */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] rounded-full"
                      style={{
                        height: "6px",
                        background: "hsl(0 0% 80% / 0.4)",
                        left: `${4 + i * 4}px`,
                        top: "-8px",
                      }}
                      animate={{ y: [-2, -8], opacity: [0.5, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Caption text */}
          <motion.div className="absolute bottom-[15%] text-center w-full px-8">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.p
                  key="p0"
                  className="font-display text-lg md:text-xl"
                  style={{ color: "hsl(0 0% 70%)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <span style={{ color: "hsl(340 70% 60%)" }}>♥</span> Chasing
                  the dream...
                </motion.p>
              )}
              {phase === 1 && (
                <motion.p
                  key="p1"
                  className="font-display text-lg md:text-xl"
                  style={{ color: "hsl(0 0% 70%)" }}
                  initial={{ opacity: 0, scale: 1.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <span style={{ color: "hsl(60 100% 50%)" }}>💥</span> Reality
                  check...{" "}
                  <span className="font-mono text-sm" style={{ color: "hsl(152 100% 50% / 0.7)" }}>
                    {`{error: "love not found"}`}
                  </span>
                </motion.p>
              )}
              {phase === 2 && (
                <motion.p
                  key="p2"
                  className="font-display text-lg md:text-xl"
                  style={{ color: "hsl(0 0% 70%)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span style={{ color: "hsl(152 100% 50%)" }}>&gt;_</span>{" "}
                  Fine. Let's{" "}
                  <span
                    className="font-bold"
                    style={{ color: "hsl(152 100% 50%)" }}
                  >
                    build something
                  </span>{" "}
                  instead.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Loading bar at bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48">
            <motion.div
              className="h-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, hsl(152 100% 50%), hsl(216 100% 50%))",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
