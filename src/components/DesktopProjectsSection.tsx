import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import MonitorFrame from "./MonitorFrame";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "BuddyCode",
    emoji: "🖥️",
    description: "Real-time collaborative code editor with syntax highlighting and multi-language support.",
    features: ["Real-time collaboration", "Syntax highlighting", "Multi-language", "WebSocket"],
    tech: ["Python", "Flask", "WebSocket"],
    website: "https://www.buddycode.online",
    github: "https://github.com/RamizMohammad/BuddyCoderWeb.git",
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop",
    ],
  },
  {
    name: "Linkium",
    emoji: "🔗",
    description: "Where device connection and integration made easy and reliable.",
    features: ["Device pairing", "File sharing", "Cross-platform", "Real-time sync"],
    tech: ["Python", "Tkinter", "WebSocket"],
    website: "https://www.linkium.space",
    github: "https://github.com/RamizMohammad/SteamDeck.git",
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=380&fit=crop",
    ],
  },
  {
    name: "Backup Engine",
    emoji: "💾",
    description: "Real-time backup engine using hashing for file tracking and accuracy.",
    features: ["File hashing", "Real-time tracking", "Auto-backup", "Change detection"],
    tech: ["Python", "Tkinter", "OS"],
    github: "https://github.com/RamizMohammad/Backup_Engine.git",
    screenshots: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop",
    ],
  },
  {
    name: "Confess Server",
    emoji: "⚡",
    description: "FastAPI AWS-deployed backend server for the Confess app.",
    features: ["RESTful API", "AWS deployment", "Authentication", "Real-time updates"],
    tech: ["Python", "FastAPI", "AWS"],
    github: "https://github.com/RamizMohammad",
    screenshots: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=380&fit=crop",
    ],
  },
  {
    name: "Local Share",
    emoji: "📡",
    description: "Seamless data sharing between Android and iOS devices over local network.",
    features: ["Cross-platform", "Local network", "Fast transfer", "No internet needed"],
    tech: ["Python", "Ngrok", "MongoDB"],
    github: "https://github.com/RamizMohammad/LocalDataShare.git",
    screenshots: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=380&fit=crop",
    ],
  },
];

type MonitorView = "ui" | "details";

const DesktopProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState(0);
  const [monitorView, setMonitorView] = useState<MonitorView>("ui");
  const [direction, setDirection] = useState(1);

  const project = projects[selected];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSelected((prev) => (prev + 1) % projects.length);
      setMonitorView("ui");
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (dir: -1 | 1) => {
    setDirection(dir);
    setSelected((prev) => (prev + dir + projects.length) % projects.length);
    setMonitorView("ui");
  };

  return (
    <section id="desktop-projects" className="section-padding relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">Python & Web Projects</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Desktop Apps I've <span className="text-gradient">Built</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
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
                  <div className="w-28 h-28 rounded-2xl bg-card border-2 border-border flex items-center justify-center glow-md">
                    <span className="text-5xl">{project.emoji}</span>
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-center">{project.name}</h3>
                  <p className="text-muted-foreground text-sm text-center max-w-xs">{project.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button onClick={() => goTo(-1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:-translate-y-0.5">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > selected ? 1 : -1); setSelected(i); setMonitorView("ui"); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selected === i ? "bg-primary w-6 glow-sm" : "bg-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <button onClick={() => goTo(1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:-translate-y-0.5">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <MonitorFrame>
              <AnimatePresence mode="wait">
                {monitorView === "details" ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full h-full p-5 overflow-y-auto phone-screen-content"
                  >
                    <div className="flex gap-6">
                      <div className="flex-1 space-y-2">
                        <h4 className="font-display text-xs font-semibold text-primary tracking-premium">Features</h4>
                        <ul className="space-y-1">
                          {project.features.map((f) => (
                            <li key={f} className="text-[11px] text-muted-foreground flex gap-1.5">
                              <span className="text-primary">✦</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-display text-xs font-semibold text-primary tracking-premium">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-full border border-border text-[10px] text-muted-foreground">{t}</span>
                          ))}
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                          {project.website && (
                            <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary flex items-center gap-1 hover:underline font-display font-semibold">
                              <ExternalLink size={12} /> Live Site
                            </a>
                          )}
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary flex items-center gap-1 hover:underline font-display font-semibold">
                            <Github size={12} /> GitHub
                          </a>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setMonitorView("ui")}
                      className="w-full py-2 mt-4 rounded-full bg-primary text-primary-foreground text-[11px] font-display font-semibold hover:opacity-90 transition-opacity"
                    >
                      View App UI
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ui"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full h-full overflow-hidden relative"
                  >
                    {project.screenshots.length > 0 ? (
                      <img src={project.screenshots[0]} alt={`${project.name} UI`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-xs">No screenshots</div>
                    )}
                    <div className="absolute bottom-3 left-4 right-4">
                      <button
                        onClick={() => setMonitorView("details")}
                        className="w-full py-2 rounded-full bg-primary text-primary-foreground text-[11px] font-display font-semibold hover:opacity-90 transition-opacity shadow-lg"
                      >
                        See Details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </MonitorFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesktopProjectsSection;
