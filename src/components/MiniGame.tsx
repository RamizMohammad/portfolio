import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ChevronRight, Award, Code2, Smartphone, Briefcase, GraduationCap, Lightbulb, Trophy, Heart } from "lucide-react";

interface FactCard {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const facts: FactCard[] = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Computer Science student passionate about building real-world solutions through code.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Smartphone,
    title: "Android Developer",
    description: "Specialized in Android with Java, Kotlin & Jetpack Compose. Built 15+ apps from scratch.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Code2,
    title: "Full-Stack Skills",
    description: "Python, Flask, FastAPI on backend. React & Node.js on frontend. MongoDB & Firebase for data.",
    color: "from-purple-500/20 to-violet-500/20",
  },
  {
    icon: Trophy,
    title: "Hackathon Winner",
    description: "Won multiple hackathons by building innovative solutions under pressure in 24–48 hours.",
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    icon: Award,
    title: "Patent Holder",
    description: "Filed a patent for an innovative technology solution — turning ideas into intellectual property.",
    color: "from-red-500/20 to-rose-500/20",
  },
  {
    icon: Briefcase,
    title: "Project Builder",
    description: "From real-time chat apps to desktop automation tools — I love shipping products that solve problems.",
    color: "from-teal-500/20 to-sky-500/20",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "I thrive on challenging problems. Data structures, algorithms & system design are my playground.",
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    icon: Heart,
    title: "What Drives Me",
    description: "Building tech that makes a difference. I believe great software starts with empathy and curiosity.",
    color: "from-pink-500/20 to-rose-500/20",
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
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">Interactive</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Discover <span className="text-gradient">My Story</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            Tap through to uncover facts about me — one card at a time
          </p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {facts.map((_, i) => (
            <button
              key={i}
              onClick={() => revealed.has(i) && setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-primary scale-125 ring-2 ring-primary/30"
                  : revealed.has(i)
                  ? "bg-primary/50 hover:bg-primary/70 cursor-pointer"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Card area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto max-w-lg min-h-[280px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="card-premium rounded-2xl p-10 w-full text-center"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Rocket className="text-primary" size={28} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Ready to Explore?</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  8 cards. 8 facts about me. Tap to begin your journey.
                </p>
                <button onClick={handleStart} className="px-8 py-3.5 btn-premium inline-flex items-center gap-2">
                  Start Journey <ChevronRight size={16} />
                </button>
              </motion.div>
            ) : isComplete && currentIndex === facts.length - 1 ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="card-premium rounded-2xl p-10 w-full text-center"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Trophy className="text-primary" size={28} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">You Know Me Now! 🎉</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Thanks for exploring my story. Feel free to revisit any card above or reach out!
                </p>
                <div className="flex gap-3 justify-center">
                  <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                    Replay
                  </button>
                  <a href="#contact" className="px-8 py-3.5 btn-premium inline-flex items-center gap-2">
                    Let's Connect <ChevronRight size={16} />
                  </a>
                </div>
              </motion.div>
            ) : current ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 60, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: 15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="card-premium rounded-2xl p-8 w-full text-center"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center`}>
                  <Icon className="text-foreground" size={24} />
                </div>
                <p className="text-xs text-muted-foreground mb-1 font-medium tracking-wider uppercase">
                  {currentIndex + 1} / {facts.length}
                </p>
                <h3 className="font-display text-xl font-bold mb-3">{current.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                  {current.description}
                </p>
                {currentIndex < facts.length - 1 ? (
                  <button onClick={handleNext} className="px-8 py-3.5 btn-premium inline-flex items-center gap-2">
                    Next Fact <ChevronRight size={16} />
                  </button>
                ) : (
                  <button onClick={handleNext} className="px-8 py-3.5 btn-premium inline-flex items-center gap-2">
                    Finish <Trophy size={16} />
                  </button>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>

        {/* Revealed cards grid */}
        {revealed.size > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
          >
            {facts.map((fact, i) => {
              const FIcon = fact.icon;
              return (
                <button
                  key={i}
                  onClick={() => revealed.has(i) && setCurrentIndex(i)}
                  className={`p-3 rounded-xl text-center transition-all duration-300 ${
                    revealed.has(i)
                      ? i === currentIndex
                        ? "card-premium ring-1 ring-primary/30 scale-105"
                        : "card-premium opacity-70 hover:opacity-100 cursor-pointer"
                      : "bg-muted/30 opacity-30"
                  }`}
                >
                  <FIcon size={18} className={revealed.has(i) ? "text-primary mx-auto mb-1" : "text-muted-foreground mx-auto mb-1"} />
                  <p className="text-[11px] font-medium truncate">{revealed.has(i) ? fact.title : "???"}</p>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MiniGame;
