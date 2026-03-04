import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink, Monitor, X, ChevronRight, Code2, Zap, Layers } from "lucide-react";

const projects = [
  {
    name: "BuddyCode",
    icon: "🖥️",
    description: "Real-time collaborative code editor with syntax highlighting and multi-language support.",
    longDescription: "A real-time collaborative code editor that lets multiple developers write code simultaneously. Built with WebSocket for instant sync, features syntax highlighting for 20+ languages, integrated terminal, and live preview. Designed for pair programming and coding interviews.",
    highlights: ["Real-time collaboration", "Syntax highlighting", "Multi-language", "Live preview"],
    tech: ["Python", "Flask", "WebSocket"],
    website: "https://www.buddycode.online",
    github: "https://github.com/RamizMohammad/BuddyCoderWeb.git",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop",
    color: "152 100% 50%",
    year: "2023",
    status: "Live",
  },
  {
    name: "Linkium",
    icon: "🔗",
    description: "Where device connection and integration made easy and reliable.",
    longDescription: "A cross-platform device connectivity solution that enables seamless file sharing and real-time synchronization between any devices on a local network. Features automatic device discovery, encrypted transfers, and a drag-and-drop interface for effortless sharing.",
    highlights: ["Device pairing", "File sharing", "Cross-platform", "Real-time sync"],
    tech: ["Python", "Tkinter", "WebSocket"],
    website: "https://www.linkium.space",
    github: "https://github.com/RamizMohammad/SteamDeck.git",
    screenshot: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=380&fit=crop",
    color: "216 100% 50%",
    year: "2023",
    status: "Live",
  },
  {
    name: "Backup Engine",
    icon: "💾",
    description: "Real-time backup engine using hashing for file tracking and accuracy.",
    longDescription: "An enterprise-grade backup solution that uses file hashing to detect changes in real-time. Supports incremental backups, scheduled automation, and detailed change logs. Designed for reliability with integrity verification and rollback capabilities.",
    highlights: ["File hashing", "Real-time tracking", "Auto-backup", "Change detection"],
    tech: ["Python", "Tkinter", "OS"],
    github: "https://github.com/RamizMohammad/Backup_Engine.git",
    screenshot: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop",
    color: "270 100% 60%",
    year: "2022",
    status: "Open Source",
  },
  {
    name: "Confess Server",
    icon: "⚡",
    description: "FastAPI AWS-deployed backend server for the Confess app.",
    longDescription: "A high-performance RESTful API backend built with FastAPI and deployed on AWS. Handles authentication, real-time updates via WebSockets, content moderation pipelines, and push notification dispatching. Designed for horizontal scaling with containerized deployment.",
    highlights: ["RESTful API", "AWS deployment", "Authentication", "Real-time updates"],
    tech: ["Python", "FastAPI", "AWS"],
    github: "https://github.com/RamizMohammad",
    screenshot: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=380&fit=crop",
    color: "45 90% 55%",
    year: "2023",
    status: "Production",
  },
  {
    name: "Local Share",
    icon: "📡",
    description: "Seamless data sharing between Android and iOS devices over local network.",
    longDescription: "A zero-configuration local network sharing tool that bridges Android and iOS devices without internet. Uses mDNS for device discovery, Ngrok tunneling for NAT traversal, and MongoDB for session persistence. Supports files up to 2GB with resumable transfers.",
    highlights: ["Cross-platform", "Local network", "Fast transfer", "No internet needed"],
    tech: ["Python", "Ngrok", "MongoDB"],
    github: "https://github.com/RamizMohammad/LocalDataShare.git",
    screenshot: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=380&fit=crop",
    color: "216 100% 50%",
    year: "2022",
    status: "Completed",
  },
];

const DesktopProjectsSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tapped, setTapped] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (expanded !== null && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }, [expanded]);

  const handleClick = useCallback((i: number) => {
    if (isTransitioning) return;
    if (expanded === i) { setExpanded(null); return; }
    if (expanded !== null) {
      setIsTransitioning(true);
      setExpanded(null);
      setTimeout(() => {
        setTapped(i);
        setExpanded(i);
        setIsTransitioning(false);
      }, 400);
    } else {
      setTapped(i);
      setExpanded(i);
    }
  }, [expanded, isTransitioning]);

  const expandedProject = expanded !== null ? projects[expanded] : null;

  return (
    <section id="desktop-projects" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Monitor size={16} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">Python & Web Projects</p>
          </div>
          <h2 className="font-display font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
            Desktop Apps I've <span className="text-gradient">Engineered</span>
          </h2>
        </motion.div>

        {/* Expanded Detail Panel */}
        <AnimatePresence mode="wait">
          {expandedProject && expanded !== null && (
            <motion.div
              key={expanded}
              ref={expandedRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div
                className="relative rounded-2xl overflow-hidden border bg-card/90 backdrop-blur-md"
                style={{ borderColor: `hsl(${expandedProject.color} / 0.4)` }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 0% 50%, hsl(${expandedProject.color} / 0.12) 0%, transparent 50%), radial-gradient(ellipse at 100% 0%, hsl(${expandedProject.color} / 0.06) 0%, transparent 40%)`,
                  }}
                />

                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-muted/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="relative z-10 flex flex-col lg:flex-row gap-0">
                  {/* Left — Screenshot */}
                  <motion.div
                    className="flex-shrink-0 lg:w-[320px] relative"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <div className="h-[220px] lg:h-full overflow-hidden">
                      <img src={expandedProject.screenshot} alt={expandedProject.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, hsl(${expandedProject.color} / 0.3) 0%, hsl(230 25% 5% / 0.7) 100%)` }} />
                    </div>
                    <motion.div
                      className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-display font-semibold backdrop-blur-md border"
                      style={{ background: `hsl(${expandedProject.color} / 0.15)`, borderColor: `hsl(${expandedProject.color} / 0.3)`, color: `hsl(${expandedProject.color})` }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: `hsl(${expandedProject.color})` }} />
                      {expandedProject.status}
                    </motion.div>
                  </motion.div>

                  {/* Right — Details */}
                  <motion.div
                    className="flex-1 p-6 md:p-8 flex flex-col gap-5"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{expandedProject.icon}</span>
                      <div>
                        <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl">{expandedProject.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                          <span>{expandedProject.year}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{expandedProject.longDescription}</p>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={14} style={{ color: `hsl(${expandedProject.color})` }} />
                        <span className="text-xs font-display font-semibold tracking-premium" style={{ color: `hsl(${expandedProject.color})` }}>Key Features</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {expandedProject.highlights.map((h, idx) => (
                          <motion.div
                            key={h}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 bg-muted/30 border border-border/50 text-sm text-foreground"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.08 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: `hsl(${expandedProject.color})` }} />
                            {h}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Layers size={14} style={{ color: `hsl(${expandedProject.color})` }} />
                        <span className="text-xs font-display font-semibold tracking-premium" style={{ color: `hsl(${expandedProject.color})` }}>Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {expandedProject.tech.map((t, idx) => (
                          <motion.span
                            key={t}
                            className="rounded-full font-medium border px-3 py-1 text-xs"
                            style={{ borderColor: `hsl(${expandedProject.color} / 0.3)`, color: `hsl(${expandedProject.color})`, background: `hsl(${expandedProject.color} / 0.08)` }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.35 + idx * 0.06 }}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.div className="flex gap-3 pt-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                      <a href={expandedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full btn-outline-premium px-5 py-2.5 text-sm" onClick={(e) => e.stopPropagation()}>
                        <Github size={14} /> View Code
                      </a>
                      {expandedProject.website && (
                        <a href={expandedProject.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full btn-premium px-5 py-2.5 text-sm" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  className="h-[2px] w-full"
                  style={{ background: `linear-gradient(90deg, transparent, hsl(${expandedProject.color}), transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4"
        >
          {projects.map((project, i) => {
            const isHovered = hovered === i;
            const isExpanded = expanded === i;
            const isTapped = tapped === i;

            return (
              <motion.div
                key={project.name}
                className="relative cursor-pointer group"
                onClick={() => handleClick(i)}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: isExpanded ? 0.5 : 1, y: 0, scale: isExpanded ? 0.95 : 1 } : {}}
                transition={{ duration: 0.4, delay: isInView ? 0.1 * i : 0 }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden border bg-card/50 backdrop-blur-sm h-[240px] md:h-[280px] lg:h-[300px]"
                  animate={{
                    borderColor: isExpanded ? `hsl(${project.color} / 0.8)` : isHovered ? `hsl(${project.color} / 0.6)` : undefined,
                    boxShadow: isExpanded ? `0 0 20px hsl(${project.color} / 0.3)` : isHovered ? `0 0 30px hsl(${project.color} / 0.2), inset 0 0 30px hsl(${project.color} / 0.05)` : "none",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.screenshot}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: isHovered ? "scale(1.1)" : "scale(1)", filter: isHovered ? "brightness(0.3)" : "brightness(0.15)" }}
                  />

                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: isHovered
                        ? `linear-gradient(180deg, hsl(${project.color} / 0.1) 0%, hsl(${project.color} / 0.3) 100%)`
                        : "linear-gradient(180deg, transparent 0%, hsl(230 25% 5% / 0.8) 100%)",
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  <AnimatePresence>
                    {isTapped && expanded === i && (
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] z-20"
                        style={{ background: `linear-gradient(90deg, transparent, hsl(${project.color}), transparent)` }}
                        initial={{ top: 0, opacity: 0 }}
                        animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        onAnimationComplete={() => setTapped(null)}
                      />
                    )}
                  </AnimatePresence>

                  {isHovered && (
                    <>
                      <motion.div className="absolute top-0 left-0 w-8 h-8 z-10" style={{ borderTop: `2px solid hsl(${project.color})`, borderLeft: `2px solid hsl(${project.color})`, borderRadius: "16px 0 0 0" }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0.4, 1, 0.4], scale: 1 }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.div className="absolute bottom-0 right-0 w-8 h-8 z-10" style={{ borderBottom: `2px solid hsl(${project.color})`, borderRight: `2px solid hsl(${project.color})`, borderRadius: "0 0 16px 0" }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0.4, 1, 0.4], scale: 1 }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                    </>
                  )}

                  {isExpanded && (
                    <motion.div className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `hsl(${project.color})` }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
                      <Code2 size={12} className="text-background" />
                    </motion.div>
                  )}

                  <div className="relative z-10 flex flex-col justify-end h-full p-4">
                    <motion.div animate={{ y: isHovered ? -8 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                      <span className="text-2xl md:text-3xl">{project.icon}</span>
                      <h3 className="font-display font-bold mt-1 text-sm md:text-base">{project.name}</h3>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-xs md:text-sm leading-relaxed">{project.description}</p>
                    </motion.div>

                    <AnimatePresence>
                      {isHovered && !isExpanded && (
                        <motion.div className="flex items-center gap-1 mt-3 text-xs font-display" style={{ color: `hsl(${project.color})` }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }}>
                          <span>Click to expand</span>
                          <ChevronRight size={12} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tech.slice(0, 2).map((t) => (
                    <span key={t} className="rounded-md font-medium bg-muted/50 text-muted-foreground border border-border/40 px-2 py-0.5 text-xs">{t}</span>
                  ))}
                  <span className="text-muted-foreground/40 ml-auto text-xs">{project.year}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DesktopProjectsSection;
