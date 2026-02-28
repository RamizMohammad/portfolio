import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import MonitorFrame from "./MonitorFrame";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "CodeCollab",
    emoji: "👥",
    description: "Real-time collaborative code editor for teams with built-in video chat and project management.",
    features: ["Real-time editing", "Video chat", "Git integration", "Project boards"],
    tech: ["Electron", "React", "WebRTC", "Node.js"],
    github: "#",
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop",
    ],
  },
  {
    name: "DataVault",
    emoji: "🔐",
    description: "Secure desktop password manager with biometric auth and encrypted cloud sync.",
    features: ["AES-256 encryption", "Biometric unlock", "Cloud sync", "Auto-fill"],
    tech: ["Python", "PyQt", "SQLCipher", "AWS"],
    github: "#",
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=380&fit=crop",
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
          <p className="text-primary font-display font-medium mb-2">Desktop Projects</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Desktop Apps I've <span className="text-gradient">Built</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left - Project carousel */}
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
                  <div className="w-28 h-28 rounded-2xl bg-card border-2 border-border flex items-center justify-center glow-sm">
                    <span className="text-5xl">{project.emoji}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-center">{project.name}</h3>
                  <p className="text-muted-foreground text-sm text-center max-w-xs">{project.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button onClick={() => goTo(-1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > selected ? 1 : -1); setSelected(i); setMonitorView("ui"); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selected === i ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <button onClick={() => goTo(1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* Right - Desktop Monitor */}
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
                        <h4 className="font-display text-xs font-semibold text-primary">Features</h4>
                        <ul className="space-y-1">
                          {project.features.map((f) => (
                            <li key={f} className="text-[11px] text-muted-foreground flex gap-1.5">
                              <span className="text-primary">✦</span> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-display text-xs font-semibold text-primary">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded border border-border text-[10px] text-muted-foreground">{t}</span>
                          ))}
                        </div>
                        <a href={project.github} className="text-[11px] text-primary flex items-center gap-1 hover:underline mt-2">
                          <Github size={12} /> GitHub
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => setMonitorView("ui")}
                      className="w-full py-2 mt-4 rounded-lg bg-primary text-primary-foreground text-[11px] font-display font-semibold hover:opacity-90 transition-opacity"
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
                      <img
                        src={project.screenshots[0]}
                        alt={`${project.name} UI`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-xs">No screenshots</div>
                    )}
                    {/* Floating button */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <button
                        onClick={() => setMonitorView("details")}
                        className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-[11px] font-display font-semibold hover:opacity-90 transition-opacity shadow-lg"
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
