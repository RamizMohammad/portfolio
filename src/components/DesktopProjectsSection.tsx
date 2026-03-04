import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Github, ExternalLink, Monitor, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    name: "BuddyCode",
    emoji: "🖥️",
    tagline: "Code together in real-time",
    description: "Real-time collaborative code editor with syntax highlighting and multi-language support.",
    features: ["Real-time collaboration", "Syntax highlighting", "Multi-language", "WebSocket"],
    tech: ["Python", "Flask", "WebSocket"],
    website: "https://www.buddycode.online",
    github: "https://github.com/RamizMohammad/BuddyCoderWeb.git",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop",
    color: "152 100% 50%",
  },
  {
    name: "Linkium",
    emoji: "🔗",
    tagline: "Connect any device seamlessly",
    description: "Where device connection and integration made easy and reliable.",
    features: ["Device pairing", "File sharing", "Cross-platform", "Real-time sync"],
    tech: ["Python", "Tkinter", "WebSocket"],
    website: "https://www.linkium.space",
    github: "https://github.com/RamizMohammad/SteamDeck.git",
    screenshot: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=380&fit=crop",
    color: "216 100% 50%",
  },
  {
    name: "Backup Engine",
    emoji: "💾",
    tagline: "Never lose a file again",
    description: "Real-time backup engine using hashing for file tracking and accuracy.",
    features: ["File hashing", "Real-time tracking", "Auto-backup", "Change detection"],
    tech: ["Python", "Tkinter", "OS"],
    github: "https://github.com/RamizMohammad/Backup_Engine.git",
    screenshot: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop",
    color: "270 100% 60%",
  },
  {
    name: "Confess Server",
    emoji: "⚡",
    tagline: "High-performance API backend",
    description: "FastAPI AWS-deployed backend server for the Confess app.",
    features: ["RESTful API", "AWS deployment", "Authentication", "Real-time updates"],
    tech: ["Python", "FastAPI", "AWS"],
    github: "https://github.com/RamizMohammad",
    screenshot: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=380&fit=crop",
    color: "45 90% 55%",
  },
  {
    name: "Local Share",
    emoji: "📡",
    tagline: "Share without the internet",
    description: "Seamless data sharing between Android and iOS devices over local network.",
    features: ["Cross-platform", "Local network", "Fast transfer", "No internet needed"],
    tech: ["Python", "Ngrok", "MongoDB"],
    github: "https://github.com/RamizMohammad/LocalDataShare.git",
    screenshot: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=380&fit=crop",
    color: "216 100% 50%",
  },
];

const DesktopProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const project = projects[selected];

  const navigate = useCallback(
    (dir: -1 | 1) => {
      setDirection(dir);
      setSelected((prev) => (prev + dir + projects.length) % projects.length);
    },
    []
  );

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => navigate(1), 5000);
    return () => clearInterval(timer);
  }, [isPaused, navigate]);

  const goTo = (i: number) => {
    setDirection(i > selected ? 1 : -1);
    setSelected(i);
  };

  return (
    <section id="desktop-projects" className="section-padding relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <Monitor size={14} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">
              Python & Web Projects
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight">
            Desktop Apps I've <span className="text-gradient">Engineered</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-lg">
            From backends to desktop tools — powered by Python.
          </p>
        </motion.div>

        {/* Main showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="rounded-3xl overflow-hidden border border-border bg-card/30 relative">
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-15 transition-all duration-1000"
              style={{
                background: `radial-gradient(ellipse at 30% 50%, hsl(${project.color} / 0.2) 0%, transparent 70%)`,
              }}
            />

            <div className="relative flex flex-col-reverse lg:flex-row items-stretch">
              {/* Left: Info panel */}
              <div className="flex-1 p-8 md:p-12 lg:p-14 flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={selected}
                    custom={direction}
                    initial={{ opacity: 0, y: direction * 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: direction * -30 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-4xl">{project.emoji}</span>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-extrabold">
                          {project.name}
                        </h3>
                        <p className="text-muted-foreground/60 text-xs font-display italic">
                          {project.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-md">
                      {project.description}
                    </p>

                    {/* Features grid */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {project.features.map((f, fi) => (
                        <motion.div
                          key={f}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: fi * 0.08 }}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          {f}
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech */}
                    <div className="flex gap-2 flex-wrap mb-8">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted/50 text-muted-foreground border border-border/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 flex-wrap">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium px-6 py-3 flex items-center gap-2 text-sm"
                      >
                        <Github size={15} />
                        Source Code
                      </a>
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline-premium px-6 py-3 flex items-center gap-2 text-sm"
                        >
                          <ExternalLink size={15} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Monitor */}
              <div className="flex-shrink-0 lg:w-[55%] relative flex items-center justify-center p-8 md:p-12">
                {/* Monitor glow */}
                <div
                  className="absolute inset-0 blur-[100px] opacity-10 transition-all duration-1000"
                  style={{ background: `hsl(${project.color})` }}
                />

                <div className="relative w-full max-w-[520px]">
                  {/* Monitor frame */}
                  <div className="rounded-2xl bg-gradient-to-b from-[hsl(220,20%,14%)] to-[hsl(220,20%,10%)] p-[5px] border border-border/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                    {/* Webcam */}
                    <div className="flex justify-center py-1.5">
                      <div className="w-2 h-2 rounded-full bg-[hsl(220,15%,20%)] border border-[hsl(220,10%,28%)]" />
                    </div>

                    {/* Screen */}
                    <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-background">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.img
                          key={selected}
                          src={project.screenshot}
                          alt={`${project.name} UI`}
                          className="w-full h-full object-cover"
                          custom={direction}
                          initial={{ opacity: 0, scale: 1.08 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                        />
                      </AnimatePresence>

                      {/* Screen overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Stand */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-5 bg-[hsl(220,15%,12%)] border-x border-border/30" />
                    <div className="w-28 h-2.5 rounded-b-lg bg-[hsl(220,15%,12%)] border border-t-0 border-border/30 shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
                  </div>

                  {/* Monitor reflection */}
                  <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[20px] rounded-full blur-xl opacity-15"
                    style={{ background: `hsl(${project.color})` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="border-t border-border/50 px-8 md:px-12 py-4 flex items-center justify-between bg-card/20 backdrop-blur-sm">
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {projects.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => goTo(i)}
                    className="relative group/dot"
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        selected === i
                          ? "w-8 bg-primary"
                          : "w-1.5 bg-muted-foreground/30 group-hover/dot:bg-muted-foreground/60"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-muted-foreground hidden sm:block">
                <span className="text-primary font-bold">
                  {String(selected + 1).padStart(2, "0")}
                </span>
                <span className="mx-1">/</span>
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesktopProjectsSection;
