import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink, Smartphone, X, ArrowUpRight, Zap, Layers, ChevronDown } from "lucide-react";

const projects = [
  {
    name: "Confess App",
    description: "Anonymous confession sharing platform with real-time Firebase backend.",
    longDescription: "A full-featured anonymous social platform where users share confessions with a community. Built with real-time Firebase listeners for instant updates, cloud functions for content moderation, and push notifications.",
    highlights: ["Real-time sync", "Push notifications", "Content moderation", "Trending algorithm"],
    tech: ["Java", "Firebase", "Cloud Functions", "FCM"],
    playStore: "https://play.google.com/store/apps/details?id=in.mohammad.ramiz.confess",
    github: "https://github.com/RamizMohammad/ConfessApp.git",
    screenshot: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=280&h=500&fit=crop",
    icon: "🔥",
    year: "2023",
    color: "152 100% 50%",
    status: "Live on Play Store",
  },
  {
    name: "Share Wheels",
    description: "Smart ride sharing with real-time location tracking and route optimization.",
    longDescription: "An intelligent ride-sharing application that connects drivers and riders in real-time. Integrates Google Maps API for live location tracking, route optimization algorithms, and fare calculation.",
    highlights: ["Live GPS tracking", "Route optimization", "Fare calculator", "In-app messaging"],
    tech: ["Android", "Maps API", "Firebase", "Kotlin"],
    github: "https://github.com/RamizMohammad/FinalYearProject---RideShiled.git",
    screenshot: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=280&h=500&fit=crop",
    icon: "🚗",
    year: "2023",
    color: "216 100% 50%",
    status: "Final Year Project",
  },
  {
    name: "BuddyCode",
    description: "Python-enabled online compiler with syntax highlighting and cloud save.",
    longDescription: "A mobile-first code editor and compiler supporting Python execution. Features syntax highlighting, auto-completion, cloud-based code storage, and a built-in terminal for output.",
    highlights: ["Syntax highlighting", "Cloud save", "Python execution", "Shareable snippets"],
    tech: ["Java", "REST APIs", "CodeMirror", "Python"],
    github: "https://github.com/RamizMohammad/BuddyCodeAndroid.git",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=280&h=500&fit=crop",
    icon: "💻",
    year: "2022",
    color: "270 100% 60%",
    status: "Open Source",
  },
  {
    name: "Hotel Manager",
    description: "Comprehensive staff & guest operations with booking management.",
    longDescription: "A complete hotel management solution handling guest check-in/out, room assignments, staff scheduling, and billing. Features a dashboard with occupancy analytics and invoice generation.",
    highlights: ["Booking system", "Staff scheduling", "Analytics dashboard", "Invoice generation"],
    tech: ["Android", "SQLite", "Material UI", "PDF Gen"],
    github: "https://github.com/RamizMohammad/Hotel_manager",
    screenshot: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=280&h=500&fit=crop",
    icon: "🏨",
    year: "2022",
    color: "45 90% 55%",
    status: "Completed",
  },
  {
    name: "Task Manager Pro",
    description: "Advanced productivity app with Kotlin coroutines and Room persistence.",
    longDescription: "A polished task management app leveraging Kotlin coroutines for smooth async operations and Room DB for offline-first persistence. Supports task categorization and priority levels.",
    highlights: ["Offline-first", "Smart reminders", "Priority system", "Weekly reports"],
    tech: ["Kotlin", "Room DB", "Coroutines", "WorkManager"],
    github: "https://github.com/RamizMohammad",
    screenshot: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=280&h=500&fit=crop",
    icon: "✅",
    year: "2022",
    color: "152 100% 50%",
    status: "Completed",
  },
  {
    name: "Inventory Fetcher",
    description: "Inventory fetcher with automatic server management and offline support.",
    longDescription: "An enterprise-grade inventory management tool for Indian Oil operations. Automates data fetching from remote servers, supports offline data caching, and generates detailed stock reports.",
    highlights: ["Offline caching", "Barcode scanning", "Auto-sync", "Batch processing"],
    tech: ["Android", "REST API", "SQLite", "Barcode SDK"],
    github: "https://github.com/RamizMohammad/IndianOilFetcher.git",
    screenshot: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=280&h=500&fit=crop",
    icon: "📦",
    year: "2021",
    color: "216 100% 50%",
    status: "Production Use",
  },
];

/* Mini phone frame card */
const PhoneCard = ({ project, isActive, onClick }: { project: typeof projects[0]; isActive: boolean; onClick: () => void }) => {
  return (
    <motion.div
      className="group relative cursor-pointer flex flex-col items-center"
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Phone body */}
      <div
        className={`relative rounded-[1.4rem] bg-[hsl(220,20%,12%)] border-[2px] transition-all duration-500 p-[3px] w-full max-w-[200px] ${
          isActive
            ? "shadow-[0_0_25px_hsl(var(--primary)/0.2)]"
            : "hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        }`}
        style={{
          borderColor: isActive ? `hsl(${project.color} / 0.6)` : "hsl(220,15%,22%)",
        }}
      >
        {/* Side buttons */}
        <div className="absolute -right-[3px] top-[28%] w-[2px] h-[16px] rounded-r-sm bg-[hsl(220,15%,18%)]" />
        <div className="absolute -right-[3px] top-[40%] w-[2px] h-[16px] rounded-r-sm bg-[hsl(220,15%,18%)]" />
        <div className="absolute -left-[3px] top-[32%] w-[2px] h-[22px] rounded-l-sm bg-[hsl(220,15%,18%)]" />

        {/* Screen */}
        <div className="relative w-full aspect-[9/16] rounded-[1.2rem] overflow-hidden bg-background">
          {/* Dynamic Island */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20">
            <div className="w-10 h-[10px] bg-[hsl(220,25%,6%)] rounded-full flex items-center px-1">
              <div className="w-[5px] h-[5px] rounded-full bg-[hsl(220,15%,18%)]" />
            </div>
          </div>

          {/* Screenshot */}
          <img
            src={project.screenshot}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,5%)] via-[hsl(220,25%,5%)/0.4] to-transparent" />

          {/* Active indicator */}
          {isActive && (
            <motion.div
              className="absolute top-5 right-2 w-5 h-5 rounded-full flex items-center justify-center z-20"
              style={{ background: `hsl(${project.color})` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronDown size={10} className="text-background" />
            </motion.div>
          )}

          {/* Hover accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] z-10"
            style={{ background: `linear-gradient(90deg, hsl(${project.color}), hsl(${project.color} / 0.2))` }}
            initial={{ scaleX: 0, originX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
            <span className="text-lg">{project.icon}</span>
            <h3 className="font-display font-bold text-xs mt-0.5 truncate">{project.name}</h3>
            <p className="text-muted-foreground text-[10px] leading-tight mt-0.5 line-clamp-2">{project.description}</p>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-muted-foreground/20 rounded-full z-20" />
        </div>
      </div>

      {/* Tech pills below phone */}
      <div className="flex flex-wrap justify-center gap-1 mt-2 max-w-[200px]">
        {project.tech.slice(0, 2).map((t) => (
          <span key={t} className="rounded-md font-medium bg-muted/40 text-muted-foreground/80 border border-border/30 px-1.5 py-0.5 text-[9px]">{t}</span>
        ))}
        <span className="text-muted-foreground/30 text-[9px] ml-auto">{project.year}</span>
      </div>
    </motion.div>
  );
};

const AndroidProjectsSection = () => {
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
    <section id="android-projects" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Smartphone size={16} className="text-primary" />
            </div>
            <p className="text-primary font-display font-medium tracking-premium text-sm">Android Projects</p>
          </div>
          <h2 className="font-display font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
            Mobile Apps I've <span className="text-gradient">Crafted</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg text-sm">Tap any device to explore the full story.</p>
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
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 10% 50%, hsl(${ep.color} / 0.08) 0%, transparent 50%)` }} />

                <button onClick={() => setExpanded(null)} className="absolute top-5 right-5 z-30 w-8 h-8 rounded-full bg-muted/80 backdrop-blur border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <X size={14} />
                </button>

                <div className="relative z-10 p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <motion.div className="lg:w-[45%] flex-shrink-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                      <div className="relative rounded-2xl overflow-hidden aspect-[9/16] max-w-[220px] mx-auto">
                        <img src={ep.screenshot} alt={ep.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, hsl(${ep.color} / 0.2) 0%, hsl(230 25% 5% / 0.5) 100%)` }} />
                        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-display font-semibold backdrop-blur-md border" style={{ background: `hsl(${ep.color} / 0.15)`, borderColor: `hsl(${ep.color} / 0.3)`, color: `hsl(${ep.color})` }}>
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `hsl(${ep.color})` }} />
                          {ep.status}
                        </div>
                      </div>
                      <div className="mt-4 max-w-[220px] mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                          <Layers size={12} style={{ color: `hsl(${ep.color})` }} />
                          <span className="text-[11px] font-display font-semibold tracking-widest uppercase" style={{ color: `hsl(${ep.color})` }}>Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {ep.tech.map((t, idx) => (
                            <motion.span key={t} className="rounded-full font-medium border px-3 py-1 text-xs" style={{ borderColor: `hsl(${ep.color} / 0.25)`, color: `hsl(${ep.color})`, background: `hsl(${ep.color} / 0.06)` }} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.05 }}>
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
                        <div className="flex items-center gap-2 mb-3"><Zap size={12} style={{ color: `hsl(${ep.color})` }} /><span className="text-[11px] font-display font-semibold tracking-widest uppercase" style={{ color: `hsl(${ep.color})` }}>Features</span></div>
                        <div className="grid grid-cols-2 gap-2">
                          {ep.highlights.map((h, idx) => (
                            <motion.div key={h} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-muted/20 border border-border/30 text-sm" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + idx * 0.06 }}>
                              <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: `hsl(${ep.color})` }} /><span className="text-foreground/90">{h}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <motion.div className="flex gap-3 pt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <a href={ep.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl btn-outline-premium px-5 py-2.5 text-sm" onClick={(e) => e.stopPropagation()}><Github size={14} /> Source</a>
                        {ep.playStore && <a href={ep.playStore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl btn-premium px-5 py-2.5 text-sm" onClick={(e) => e.stopPropagation()}><ExternalLink size={14} /> Play Store</a>}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phone Grid — 3 per row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
            >
              <PhoneCard project={project} isActive={expanded === i} onClick={() => handleClick(i)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AndroidProjectsSection;
