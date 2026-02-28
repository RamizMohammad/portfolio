import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import PhoneFrame from "./PhoneFrame";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "FinanceTracker",
    emoji: "💰",
    description: "A comprehensive personal finance management app with expense tracking, budget planning, and financial insights.",
    features: ["Expense categorization", "Budget alerts", "Monthly reports", "Dark mode", "Offline support"],
    tech: ["Kotlin", "Jetpack Compose", "Room", "Coroutines"],
    playStore: "#",
    github: "#",
    screenshots: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=280&h=500&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=280&h=500&fit=crop",
    ],
  },
  {
    name: "FitPulse",
    emoji: "🏋️",
    description: "AI-powered fitness companion that creates personalized workout plans and tracks your progress.",
    features: ["AI workout plans", "Progress tracking", "Social challenges", "Wearable sync"],
    tech: ["Kotlin", "Compose", "ML Kit", "Firebase"],
    playStore: "#",
    github: "#",
    screenshots: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=280&h=500&fit=crop",
    ],
  },
];

const AndroidProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [direction, setDirection] = useState(1);

  const project = projects[selected];

  const goTo = (dir: -1 | 1) => {
    setDirection(dir);
    setSelected((prev) => (prev + dir + projects.length) % projects.length);
    setShowDetails(false);
  };

  return (
    <section id="android-projects" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary font-display font-medium mb-2">Android Projects</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            📱 Mobile Apps I've <span className="text-gradient">built</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left - Big project logo carousel */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative h-[280px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={selected}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: d * 200, opacity: 0, scale: 0.8 }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d: number) => ({ x: d * -200, opacity: 0, scale: 0.8 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute flex flex-col items-center gap-4"
                >
                  <div className="w-28 h-28 rounded-full bg-card border-2 border-border flex items-center justify-center glow-sm">
                    <span className="text-5xl">{project.emoji}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-center">{project.name}</h3>
                  <p className="text-muted-foreground text-sm text-center max-w-xs">{project.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button onClick={() => goTo(-1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > selected ? 1 : -1); setSelected(i); setShowDetails(false); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selected === i ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <button onClick={() => goTo(1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Right - Phone */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <PhoneFrame>
              <AnimatePresence mode="wait">
                {showDetails ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full h-full p-4 pt-12 overflow-y-auto space-y-3"
                  >
                    <div>
                      <h4 className="font-display text-xs font-semibold text-primary mb-1.5">Features</h4>
                      <ul className="space-y-1">
                        {project.features.map((f) => (
                          <li key={f} className="text-[10px] text-muted-foreground flex gap-1.5">
                            <span className="text-primary">✦</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display text-xs font-semibold text-primary mb-1.5">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded border border-border text-[9px] text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.playStore && (
                        <a href={project.playStore} className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                          <ExternalLink size={10} /> Play Store
                        </a>
                      )}
                      <a href={project.github} className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                        <Github size={10} /> GitHub
                      </a>
                    </div>
                    {/* Screenshots inside device */}
                    <div className="space-y-2">
                      <h4 className="font-display text-xs font-semibold text-primary">App UI</h4>
                      {project.screenshots.map((src, i) => (
                        <img key={i} src={src} alt={`Screenshot ${i + 1}`} className="w-full rounded-lg border border-border" />
                      ))}
                    </div>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="w-full py-2 rounded-lg border border-border text-[11px] font-display font-semibold text-muted-foreground hover:text-primary hover:border-primary transition-all"
                    >
                      ← Back
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full h-full p-5 pt-12 overflow-y-auto space-y-3 flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-4xl">{project.emoji}</span>
                    <h3 className="font-display font-bold text-sm">{project.name}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{project.description}</p>
                    <button
                      onClick={() => setShowDetails(true)}
                      className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-[11px] font-display font-semibold hover:opacity-90 transition-opacity mt-4"
                    >
                      See Details
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AndroidProjectsSection;
