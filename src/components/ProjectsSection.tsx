import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PhoneFrame from "./PhoneFrame";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";

const projects = [
  {
    name: "FinanceTracker",
    emoji: "💰",
    type: "android",
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
    type: "android",
    description: "AI-powered fitness companion that creates personalized workout plans and tracks your progress.",
    features: ["AI workout plans", "Progress tracking", "Social challenges", "Wearable sync"],
    tech: ["Kotlin", "Compose", "ML Kit", "Firebase"],
    playStore: "#",
    github: "#",
    screenshots: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=280&h=500&fit=crop",
    ],
  },
  {
    name: "CodeCollab",
    emoji: "👥",
    type: "desktop",
    description: "Real-time collaborative code editor for teams with built-in video chat and project management.",
    features: ["Real-time editing", "Video chat", "Git integration", "Project boards"],
    tech: ["Electron", "React", "WebRTC", "Node.js"],
    github: "#",
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
    ],
  },
  {
    name: "DataVault",
    emoji: "🔐",
    type: "desktop",
    description: "Secure desktop password manager with biometric auth and encrypted cloud sync.",
    features: ["AES-256 encryption", "Biometric unlock", "Cloud sync", "Auto-fill"],
    tech: ["Python", "PyQt", "SQLCipher", "AWS"],
    github: "#",
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=500&h=300&fit=crop",
    ],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [filter, setFilter] = useState<"all" | "android" | "desktop">("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  useEffect(() => {
    setSelected(0);
  }, [filter]);

  const project = filtered[selected] || filtered[0];

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-primary font-display font-medium mb-2">Projects</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Things I've <span className="text-gradient">built</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="flex gap-2 mb-8"
        >
          {(["all", "android", "desktop"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-display font-medium capitalize transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground border border-border hover:border-primary/40"
              }`}
            >
              {f === "all" ? "All" : f === "android" ? "📱 Android" : "🖥️ Desktop"}
            </button>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left - Project list */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setSelected((prev) => (prev - 1 + filtered.length) % filtered.length)}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setSelected((prev) => (prev + 1) % filtered.length)}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {filtered.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                    selected === i
                      ? "border-primary bg-primary/5 glow-sm"
                      : "border-border hover:border-muted-foreground/40"
                  }`}
                >
                  <span className="text-3xl">{p.emoji}</span>
                  <div>
                    <p className={`font-display font-semibold ${selected === i ? "text-primary" : ""}`}>
                      {p.name}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">{p.type} Project</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right - Phone with project details */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <PhoneFrame landscape={project?.type === "desktop"}>
              <motion.div
                key={project?.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full p-5 pt-10 overflow-y-auto space-y-3"
              >
                <div className="text-center">
                  <span className="text-3xl">{project?.emoji}</span>
                  <h3 className="font-display font-bold text-sm mt-1">{project?.name}</h3>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">{project?.description}</p>

                <div>
                  <h4 className="font-display text-xs font-semibold text-primary mb-1.5">Features</h4>
                  <ul className="space-y-1">
                    {project?.features.map((f) => (
                      <li key={f} className="text-[10px] text-muted-foreground flex gap-1.5">
                        <span className="text-primary">✦</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-xs font-semibold text-primary mb-1.5">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {project?.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded border border-border text-[9px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {project?.playStore && (
                    <a href={project.playStore} className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                      <ExternalLink size={10} /> Play Store
                    </a>
                  )}
                  <a href={project?.github} className="text-[10px] text-primary flex items-center gap-1 hover:underline">
                    <Github size={10} /> GitHub
                  </a>
                </div>

                <button
                  onClick={() => setShowGallery(true)}
                  className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-[11px] font-display font-semibold hover:opacity-90 transition-opacity"
                >
                  View App UI
                </button>
              </motion.div>
            </PhoneFrame>
          </motion.div>
        </div>
      </div>

      {/* Screenshot Gallery Modal */}
      {showGallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setShowGallery(false)}
        >
          <div className="max-w-2xl w-full max-h-[80vh] overflow-y-auto space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">{project?.name} Screenshots</h3>
              <button onClick={() => setShowGallery(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>
            {project?.screenshots.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt={`Screenshot ${i + 1}`}
                className="w-full rounded-xl border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
