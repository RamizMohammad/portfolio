import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, ChevronRight, Award, Code2, Smartphone, Briefcase,
  GraduationCap, Lightbulb, Trophy, Heart, Sparkles, ArrowRight,
  RotateCcw, MousePointerClick
} from "lucide-react";

interface FactCard {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  accent: string;
}

const facts: FactCard[] = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Computer Science student passionate about building real-world solutions through code.",
    gradient: "from-blue-500 to-cyan-400",
    accent: "shadow-blue-500/20",
  },
  {
    icon: Smartphone,
    title: "Android Developer",
    description: "Specialized in Android with Java, Kotlin & Jetpack Compose. Built 15+ apps from scratch.",
    gradient: "from-green-500 to-emerald-400",
    accent: "shadow-green-500/20",
  },
  {
    icon: Code2,
    title: "Full-Stack Skills",
    description: "Python, Flask, FastAPI on backend. React & Node.js on frontend. MongoDB & Firebase for data.",
    gradient: "from-violet-500 to-purple-400",
    accent: "shadow-violet-500/20",
  },
  {
    icon: Trophy,
    title: "Hackathon Winner",
    description: "Won multiple hackathons by building innovative solutions under pressure in 24–48 hours.",
    gradient: "from-yellow-500 to-amber-400",
    accent: "shadow-yellow-500/20",
  },
  {
    icon: Award,
    title: "Patent Holder",
    description: "Filed a patent for an innovative technology solution — turning ideas into intellectual property.",
    gradient: "from-red-500 to-rose-400",
    accent: "shadow-red-500/20",
  },
  {
    icon: Briefcase,
    title: "Project Builder",
    description: "From real-time chat apps to desktop automation tools — I love shipping products that solve problems.",
    gradient: "from-teal-500 to-sky-400",
    accent: "shadow-teal-500/20",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "I thrive on challenging problems. Data structures, algorithms & system design are my playground.",
    gradient: "from-orange-500 to-yellow-400",
    accent: "shadow-orange-500/20",
  },
  {
    icon: Heart,
    title: "What Drives Me",
    description: "Building tech that makes a difference. I believe great software starts with empathy and curiosity.",
    gradient: "from-pink-500 to-rose-400",
    accent: "shadow-pink-500/20",
  },
];

const MiniGame = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const isStarted = currentIndex >= 0;
  const isComplete = revealed.size === facts.length;

  const handleNext = () => {
    const next = currentIndex + 1;
    if (next < facts.length) {
      setCurrentIndex(next);
      setRevealed((prev) => new Set(prev).add(next));
    }
  };

  const handleStart = () => {
    setCurrentIndex(0);
    setRevealed(new Set([0]));
  };

  const handleReset = () => {
    setCurrentIndex(-1);
    setRevealed(new Set());
  };

  const current = isStarted ? facts[currentIndex] : null;
  const Icon = current?.icon || Rocket;

  return (
    <section className="section-padding relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm flex items-center justify-center gap-2">
            <Sparkles size={14} /> Interactive Experience
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Discover <span className="text-gradient">My Story</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            Tap through to uncover facts about me — one card at a time
          </p>
        </motion.div>

        {/* Desktop monitor frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Monitor body */}
          <div className="relative w-full max-w-4xl rounded-2xl bg-[hsl(220,20%,10%)] border-[3px] border-[hsl(220,15%,20%)] shadow-[0_0_60px_rgba(0,0,0,0.6)] p-2">
            {/* Top bar with dots & webcam */}
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-[hsl(220,15%,14%)] border border-[hsl(220,10%,22%)]">
                <span className="text-[10px] text-muted-foreground font-mono">discover://my-story</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[hsl(220,15%,18%)] border border-[hsl(220,10%,25%)]" />
            </div>

            {/* Screen */}
            <div className="relative w-full rounded-lg overflow-hidden bg-background" style={{ minHeight: 480 }}>
              {/* Subtle grid background */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />

              <div className="relative z-10 p-6 md:p-10 flex flex-col items-center justify-center min-h-[480px]">
                {/* Progress bar */}
                <div className="w-full max-w-md mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-muted-foreground font-medium">Progress</span>
                    <span className="text-xs text-primary font-bold">{revealed.size}/{facts.length}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(revealed.size / facts.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2.5 mb-8">
                  {facts.map((fact, i) => {
                    const DotIcon = fact.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => revealed.has(i) && setCurrentIndex(i)}
                        className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          i === currentIndex
                            ? `bg-gradient-to-br ${fact.gradient} scale-110 shadow-lg ${fact.accent}`
                            : revealed.has(i)
                            ? "bg-muted/60 hover:bg-muted cursor-pointer hover:scale-105"
                            : "bg-muted/20"
                        }`}
                        disabled={!revealed.has(i)}
                      >
                        <DotIcon
                          size={16}
                          className={
                            i === currentIndex
                              ? "text-white"
                              : revealed.has(i)
                              ? "text-foreground/70"
                              : "text-muted-foreground/30"
                          }
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Card area */}
                <div className="w-full max-w-lg">
                  <AnimatePresence mode="wait">
                    {!isStarted ? (
                      <motion.div
                        key="start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="card-premium rounded-2xl p-10 text-center"
                      >
                        <motion.div
                          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Rocket className="text-primary" size={32} />
                        </motion.div>
                        <h3 className="font-display text-2xl font-bold mb-3">Ready to Explore?</h3>
                        <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
                          8 interactive cards. 8 facts about me. Begin your journey through my developer story.
                        </p>
                        <button onClick={handleStart} className="px-10 py-4 btn-premium inline-flex items-center gap-2 text-base">
                          <MousePointerClick size={18} />
                          Start Journey
                        </button>
                      </motion.div>
                    ) : isComplete && currentIndex === facts.length - 1 ? (
                      <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="card-premium rounded-2xl p-10 text-center"
                      >
                        <motion.div
                          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/10 flex items-center justify-center"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Trophy className="text-yellow-500" size={32} />
                        </motion.div>
                        <h3 className="font-display text-2xl font-bold mb-3">You Know Me Now! 🎉</h3>
                        <p className="text-muted-foreground text-sm mb-8">
                          Thanks for exploring my story. Feel free to revisit any card or reach out!
                        </p>
                        <div className="flex gap-3 justify-center flex-wrap">
                          <button
                            onClick={handleReset}
                            className="px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors inline-flex items-center gap-2"
                          >
                            <RotateCcw size={14} /> Replay
                          </button>
                          <a href="#contact" className="px-8 py-3.5 btn-premium inline-flex items-center gap-2">
                            Let's Connect <ArrowRight size={16} />
                          </a>
                        </div>
                      </motion.div>
                    ) : current ? (
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 80, rotateY: -10 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        exit={{ opacity: 0, x: -80, rotateY: 10 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className={`card-premium rounded-2xl p-8 md:p-10 text-center shadow-xl ${current.accent}`}
                      >
                        <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${current.gradient} flex items-center justify-center shadow-lg ${current.accent}`}>
                          <Icon className="text-white" size={28} />
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 font-bold tracking-widest uppercase">
                          {currentIndex + 1} of {facts.length}
                        </p>
                        <h3 className="font-display text-2xl font-bold mb-3">{current.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                          {current.description}
                        </p>
                        {currentIndex < facts.length - 1 ? (
                          <button onClick={handleNext} className="px-10 py-4 btn-premium inline-flex items-center gap-2 text-base">
                            Next Fact <ChevronRight size={18} />
                          </button>
                        ) : (
                          <button onClick={handleNext} className="px-10 py-4 btn-premium inline-flex items-center gap-2 text-base">
                            Finish <Sparkles size={18} />
                          </button>
                        )}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Stand */}
          <div className="w-20 h-7 bg-[hsl(220,15%,12%)] border-x-[3px] border-[hsl(220,15%,20%)]" />
          <div className="w-40 h-4 rounded-b-xl bg-[hsl(220,15%,12%)] border-[3px] border-t-0 border-[hsl(220,15%,20%)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]" />
        </motion.div>
      </div>
    </section>
  );
};

export default MiniGame;
