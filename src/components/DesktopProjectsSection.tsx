import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink, Monitor, X, ArrowUpRight, Zap, Layers, ChevronDown } from "lucide-react";

const projects = [
  {
    name: "BuddyCode",
    icon: "🖥️",
    description: "Real-time collaborative code editor with syntax highlighting and multi-language support.",
    longDescription: "A real-time collaborative code editor that lets multiple developers write code simultaneously. Built with WebSocket for instant sync, features syntax highlighting for 20+ languages, integrated terminal, and live preview.",
    highlights: ["Real-time collaboration", "Syntax highlighting", "Multi-language", "Live preview"],
    tech: ["Python", "Flask", "WebSocket"],
    website: "https://www.buddycode.online",
    github: "https://github.com/RamizMohammad/BuddyCoderWeb.git",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    color: "152 100% 50%",
    year: "2023",
    status: "Live",
  },
  {
    name: "Linkium",
    icon: "🔗",
    description: "Where device connection and integration made easy and reliable.",
    longDescription: "A cross-platform device connectivity solution that enables seamless file sharing and real-time synchronization between any devices on a local network. Features automatic device discovery and encrypted transfers.",
    highlights: ["Device pairing", "File sharing", "Cross-platform", "Real-time sync"],
    tech: ["Python", "Tkinter", "WebSocket"],
    website: "https://www.linkium.space",
    github: "https://github.com/RamizMohammad/SteamDeck.git",
    screenshot: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop",
    color: "216 100% 50%",
    year: "2023",
    status: "Live",
  },
  {
    name: "Backup Engine",
    icon: "💾",
    description: "Real-time backup engine using hashing for file tracking and accuracy.",
    longDescription: "An enterprise-grade backup solution that uses file hashing to detect changes in real-time. Supports incremental backups, scheduled automation, and detailed change logs with rollback capabilities.",
    highlights: ["File hashing", "Real-time tracking", "Auto-backup", "Change detection"],
    tech: ["Python", "Tkinter", "OS"],
    github: "https://github.com/RamizMohammad/Backup_Engine.git",
    screenshot: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    color: "270 100% 60%",
    year: "2022",
    status: "Open Source",
  },
  {
    name: "Confess Server",
    icon: "⚡",
    description: "FastAPI AWS-deployed backend server for the Confess app.",
    longDescription: "A high-performance RESTful API backend built with FastAPI and deployed on AWS. Handles authentication, real-time updates via WebSockets, content moderation pipelines, and push notification dispatching.",
    highlights: ["RESTful API", "AWS deployment", "Authentication", "Real-time updates"],
    tech: ["Python", "FastAPI", "AWS"],
    github: "https://github.com/RamizMohammad",
    screenshot: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    color: "45 90% 55%",
    year: "2023",
    status: "Production",
  },
  {
    name: "Local Share",
    icon: "📡",
    description: "Seamless data sharing between Android and iOS devices over local network.",
    longDescription: "A zero-configuration local network sharing tool that bridges Android and iOS devices without internet. Uses mDNS for device discovery, Ngrok tunneling for NAT traversal, and MongoDB for session persistence.",
    highlights: ["Cross-platform", "Local network", "Fast transfer", "No internet needed"],
    tech: ["Python", "Ngrok", "MongoDB"],
    github: "https://github.com/RamizMohammad/LocalDataShare.git",
    screenshot: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    color: "216 100% 50%",
    year: "2022",
    status: "Completed",
  },
];

const DesktopProjectsSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (expanded !== null && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  }, [expanded]);

  const handleClick = useCallback((i: number) => {
    if (isTransitioning) return;
    if (expanded === i) { setExpanded(null); return; }
    if (expanded !== null) {
      setIsTransitioning(true);
      setExpanded(null);
      setTimeout(() => { setExpanded(i); setIsTransitioning(false); }, 350);
    } else {
      setExpanded(i);
    }
  }, [expanded, isTransitioning]);

  const ep = expanded !== null ? projects[expanded] : null;

  return (
    <section id="desktop-projects" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Monitor size={16} className="text-primary" />
            </div>
            <p className="text-primary font-display font-medium tracking-premium text-sm">Python & Web Projects</p>
          </div>
          <h2 className="font-display font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
            Desktop Apps I've <span className="text-gradient">Engineered</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm">Click any card to dive into the details.</p>
        </motion.div>

        {/* Expanded Detail */}
        <AnimatePresence mode="wait">
          {ep && expanded !== null && (
            <motion.div
              key={expanded}
              ref={expandedRef}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="relative rounded-3xl overflow-hidden border border-border/60 bg-card/80 backdrop-blur-xl">
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, hsl(${ep.color}), hsl(${ep.color} / 0.3), transparent)` }} />
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: `radial-gradient(circle at 10% 50%, hsl(${ep.color} / 0.08) 0%, transparent 50%)`
                }} />

                <button onClick={() => setExpanded(null)} className="absolute top-5 right-5 z-30 w-8 h-8 rounded-full bg-muted/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <X size={14} />
                </button>

                <div className="relative z-10 p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <motion.div className="lg:w-[45%] flex-shrink-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                      <div className="relative rounded-2xl overflow-hidden aspect-[3/2]">
                        <img src={ep.screenshot} alt={ep.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, hsl(${ep.color} / 0.2) 0%, hsl(230 25% 5% / 0.5) 100%)` }} />
                        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-display font-semibold backdrop-blur-md border" style={{
                          background: `hsl(${ep.color} / 0.15)`, borderColor: `hsl(${ep.color} / 0.3)`, color: `hsl(${ep.color})`
                        }}>
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `hsl(${ep.color})` }} />
                          {ep.status}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Layers size={12} style={{ color: `hsl(${ep.color})` }} />
                          <span className="text-[11px] font-display font-semibold tracking-widest uppercase" style={{ color: `hsl(${ep.color})` }}>Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {ep.tech.map((t, idx) => (
                            <motion.span key={t} className="rounded-full font-medium border px-3 py-1 text-xs" style={{
                              borderColor: `hsl(${ep.color} / 0.25)`, color: `hsl(${ep.color})`, background: `hsl(${ep.color} / 0.06)`
                            }} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.05 }}>
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div className="flex-1 flex flex-col gap-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-3xl">{ep.icon}</span>
                        <div>
                          <h3 className="font-display font-bold text-xl md:text-2xl">{ep.name}</h3>
                          <span className="text-muted-foreground text-xs">{ep.year}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{ep.longDescription}</p>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Zap size={12} style={{ color: `hsl(${ep.color})` }} />
                          <span className="text-[11px] font-display font-semibold tracking-widest uppercase" style={{ color: `hsl(${ep.color})` }}>Features</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {ep.highlights.map((h, idx) => (
                            <motion.div key={h} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-muted/20 border border-border/30 text-sm" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + idx * 0.06 }}>
                              <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: `hsl(${ep.color})` }} />
                              <span className="text-foreground/90">{h}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <motion.div className="flex gap-3 pt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <a href={ep.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl btn-outline-premium px-5 py-2.5 text-sm" onClick={(e) => e.stopPropagation()}>
                          <Github size={14} /> Source
                        </a>
                        {ep.website && (
                          <a href={ep.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl btn-premium px-5 py-2.5 text-sm" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink size={14} /> Live Demo
                          </a>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {projects.map((project, i) => {
            const isActive = expanded === i;
            return (
              <motion.div
                key={project.name}
                className="group relative cursor-pointer"
                onClick={() => handleClick(i)}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                whileHover={{ y: -4 }}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                    isActive ? "border-primary/50" : "border-border/40 hover:border-border/80"
                  }`}
                  style={isActive ? { borderColor: `hsl(${project.color} / 0.5)`, boxShadow: `0 0 30px hsl(${project.color} / 0.12)` } : {}}
                >
                  <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                    <img src={project.screenshot} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                    <div className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-display font-semibold bg-background/60 backdrop-blur-md border border-border/40 text-muted-foreground">
                      {project.year}
                    </div>
                    {isActive && (
                      <motion.div className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `hsl(${project.color})` }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <ChevronDown size={12} className="text-background" />
                      </motion.div>
                    )}
                    <motion.div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, hsl(${project.color}), hsl(${project.color} / 0.3))` }} initial={{ scaleX: 0, originX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4 }} />
                  </div>

                  <div className="p-4 bg-card/95 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{project.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display font-bold text-sm md:text-base truncate">{project.name}</h3>
                          <ArrowUpRight size={14} className="text-muted-foreground/50 group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mt-1 line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-md font-medium bg-muted/40 text-muted-foreground/80 border border-border/30 px-2 py-0.5 text-[10px]">{t}</span>
                      ))}
                    </div>
                  </div>
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
