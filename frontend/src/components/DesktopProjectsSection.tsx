import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink, Monitor, X, Zap, Layers, ChevronDown } from "lucide-react";

const THEME_COLOR = "152 100% 50%";
const THEME_GRADIENT = "linear-gradient(135deg, hsl(152 100% 50%), hsl(216 100% 50%))";

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
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=380&fit=crop",
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
    screenshot: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=380&fit=crop",
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
    screenshot: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop",
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
    screenshot: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=380&fit=crop",
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
    screenshot: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=380&fit=crop",
    year: "2022",
    status: "Completed",
  },
];

const MonitorCard = ({ project, isActive, onClick }: { project: typeof projects[0]; isActive: boolean; onClick: () => void }) => {
  return (
    <motion.div className="group relative cursor-pointer flex flex-col items-center" onClick={onClick} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <div
        className={`relative w-full rounded-xl bg-[hsl(220,20%,12%)] border-[2px] transition-all duration-500 p-[3px] ${
          isActive ? "shadow-[0_0_25px_hsl(152_100%_50%/0.2)]" : "hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        }`}
        style={{ borderColor: isActive ? `hsl(${THEME_COLOR} / 0.6)` : "hsl(220,15%,22%)" }}
      >
        <div className="absolute top-[5px] left-1/2 -translate-x-1/2 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(220,15%,18%)] border border-[hsl(220,10%,25%)]" />
        </div>

        <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-background">
          <img src={project.screenshot} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,5%)] via-[hsl(220,25%,5%)/0.3] to-transparent" />

          {isActive && (
            <motion.div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center z-20" style={{ background: THEME_GRADIENT }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
              <ChevronDown size={10} className="text-background" />
            </motion.div>
          )}

          <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] z-10" style={{ background: THEME_GRADIENT }} initial={{ scaleX: 0, originX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4 }} />

          <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
            <div className="flex items-start gap-2">
              <span className="text-lg">{project.icon}</span>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-xs md:text-sm truncate">{project.name}</h3>
                <p className="text-muted-foreground text-[10px] md:text-xs leading-tight mt-0.5 line-clamp-2">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-8 h-3 bg-[hsl(220,15%,14%)] border-x border-[hsl(220,15%,22%)]" />
      <div className="w-16 h-2 rounded-b-lg bg-[hsl(220,15%,14%)] border-2 border-t-0 border-[hsl(220,15%,22%)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />

      <div className="flex flex-wrap justify-center gap-1 mt-2 w-full">
        {project.tech.slice(0, 2).map((t) => (
          <span key={t} className="rounded-md font-medium bg-muted/40 text-muted-foreground/80 border border-border/30 px-1.5 py-0.5 text-[9px]">{t}</span>
        ))}
        <span className="text-muted-foreground/30 text-[9px] ml-auto">{project.year}</span>
      </div>
    </motion.div>
  );
};

const DesktopProjectsSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (expanded !== null && expandedRef.current) {
      setTimeout(() => { expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200);
    }
  }, [expanded]);

  const handleClick = useCallback((i: number) => {
    if (isTransitioning) return;
    if (expanded === i) { setExpanded(null); return; }
    if (expanded !== null) {
      setIsTransitioning(true);
      setExpanded(null);
      setTimeout(() => { setExpanded(i); setIsTransitioning(false); }, 350);
    } else { setExpanded(i); }
  }, [expanded, isTransitioning]);

  const ep = expanded !== null ? projects[expanded] : null;

  return (
    <section id="desktop-projects" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
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
          <p className="text-muted-foreground mt-2 max-w-lg text-sm">Click any screen to dive into the details.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {ep && expanded !== null && (
            <motion.div key={expanded} ref={expandedRef} initial={{ opacity: 0, height: 0, y: -20 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -20 }} transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
              <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-card/80 backdrop-blur-xl">
                <div className="h-1 w-full" style={{ background: THEME_GRADIENT }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 10% 50%, hsl(${THEME_COLOR} / 0.08) 0%, transparent 50%)` }} />

                <button onClick={() => setExpanded(null)} className="absolute top-5 right-5 z-30 w-8 h-8 rounded-full bg-muted/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <X size={14} />
                </button>

                <div className="relative z-10 p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <motion.div className="lg:w-[45%] flex-shrink-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                      <div className="relative rounded-2xl overflow-hidden aspect-[3/2]">
                        <img src={ep.screenshot} alt={ep.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, hsl(${THEME_COLOR} / 0.25) 0%, hsl(230 25% 5% / 0.5) 100%)` }} />
                        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-display font-semibold backdrop-blur-md border border-primary/30 bg-primary/15 text-primary">
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary" />
                          {ep.status}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Layers size={12} className="text-primary" />
                          <span className="text-[11px] font-display font-semibold tracking-widest uppercase text-primary">Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {ep.tech.map((t, idx) => (
                            <motion.span key={t} className="rounded-full font-medium border border-primary/25 text-primary bg-primary/[0.06] px-3 py-1 text-xs" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.05 }}>
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div className="flex-1 flex flex-col gap-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                      <div className="flex items-center gap-3"><span className="text-3xl">{ep.icon}</span><div><h3 className="font-display font-bold text-xl md:text-2xl">{ep.name}</h3><span className="text-muted-foreground text-xs">{ep.year}</span></div></div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{ep.longDescription}</p>
                      <div>
                        <div className="flex items-center gap-2 mb-3"><Zap size={12} className="text-primary" /><span className="text-[11px] font-display font-semibold tracking-widest uppercase text-primary">Features</span></div>
                        <div className="grid grid-cols-2 gap-2">
                          {ep.highlights.map((h, idx) => (
                            <motion.div key={h} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-muted/20 border border-border/30 text-sm" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + idx * 0.06 }}>
                              <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: THEME_GRADIENT }} /><span className="text-foreground/90">{h}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <motion.div className="flex gap-3 pt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <a href={ep.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl btn-outline-premium px-5 py-2.5 text-sm" onClick={(e) => e.stopPropagation()}><Github size={14} /> Source</a>
                        {ep.website && <a href={ep.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl btn-premium px-5 py-2.5 text-sm" onClick={(e) => e.stopPropagation()}><ExternalLink size={14} /> Live Demo</a>}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <motion.div key={project.name} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * i }}>
              <MonitorCard project={project} isActive={expanded === i} onClick={() => handleClick(i)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DesktopProjectsSection;
