import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, ExternalLink, X, Smartphone, Code2, Database } from "lucide-react";

const projects = [
  {
    name: "Confess App",
    description: "Anonymous confession sharing platform built with real-time Firebase backend. Users can post, react, and engage with confessions anonymously.",
    tech: ["Java", "Firebase"],
    playStore: "https://play.google.com/store/apps/details?id=in.mohammad.ramiz.confess",
    github: "https://github.com/RamizMohammad/ConfessApp.git",
    screenshot: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=280&h=500&fit=crop",
    icon: "🔥",
    year: "2023",
  },
  {
    name: "Share Wheels",
    description: "Smart ride sharing application with real-time location tracking, route optimization, and secure payment integration.",
    tech: ["Android", "Maps API"],
    github: "https://github.com/RamizMohammad/FinalYearProject---RideShiled.git",
    screenshot: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=280&h=500&fit=crop",
    icon: "🚗",
    year: "2023",
  },
  {
    name: "BuddyCode",
    description: "Python-enabled online compiler supporting multi-language coding with syntax highlighting, auto-completion, and cloud save.",
    tech: ["Java", "REST APIs"],
    github: "https://github.com/RamizMohammad/BuddyCodeAndroid.git",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=280&h=500&fit=crop",
    icon: "💻",
    year: "2022",
  },
  {
    name: "Hotel Manager",
    description: "Comprehensive staff & guest operations system with booking management, housekeeping tracking, and analytics dashboard.",
    tech: ["Android", "Database"],
    github: "https://github.com/RamizMohammad/Hotel_manager",
    screenshot: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=280&h=500&fit=crop",
    icon: "🏨",
    year: "2022",
  },
  {
    name: "Task Manager Pro",
    description: "Advanced productivity app with Kotlin coroutines, Room persistence, widgets, and smart notifications for task reminders.",
    tech: ["Kotlin", "Room DB"],
    github: "https://github.com/RamizMohammad",
    screenshot: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=280&h=500&fit=crop",
    icon: "✅",
    year: "2022",
  },
  {
    name: "Inventory Fetcher",
    description: "Inventory fetcher and automatic server management with scheduled syncing, offline support, and detailed reporting.",
    tech: ["Android", "API"],
    github: "https://github.com/RamizMohammad/IndianOilFetcher.git",
    screenshot: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=280&h=500&fit=crop",
    icon: "📦",
    year: "2021",
  },
];

const techIcons: Record<string, React.ReactNode> = {
  Java: <Code2 size={12} />,
  Firebase: <Database size={12} />,
  Android: <Smartphone size={12} />,
  Kotlin: <Code2 size={12} />,
  "Maps API": <ExternalLink size={12} />,
  "REST APIs": <Code2 size={12} />,
  Database: <Database size={12} />,
  "Room DB": <Database size={12} />,
  API: <Code2 size={12} />,
};

/* Revolving LED marquee border using CSS animation on an SVG textPath */
const MarqueeBorder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const { w, h } = dims;
  if (w === 0 || h === 0)
    return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20" />;

  const r = 12;
  const pathId = `mp-${w}-${h}`;
  const d = `M ${r},0 H ${w - r} A ${r},${r} 0 0 1 ${w},${r} V ${h - r} A ${r},${r} 0 0 1 ${w - r},${h} H ${r} A ${r},${r} 0 0 1 0,${h - r} V ${r} A ${r},${r} 0 0 1 ${r},0 Z`;
  const label = "  ✦ CLICK TO EXPAND  ✦ TAP TO VIEW  ";

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20">
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox={`-1 -1 ${w + 2} ${h + 2}`}
        fill="none"
      >
        <defs>
          <path id={pathId} d={d} />
          <linearGradient id="led-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(152 100% 50%)" />
            <stop offset="50%" stopColor="hsl(216 100% 60%)" />
            <stop offset="100%" stopColor="hsl(152 100% 50%)" />
          </linearGradient>
        </defs>
        {/* No visible border line — text only */}
        {/* Outer glow filter */}
        <defs>
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Revolving text — two copies for seamless loop */}
        <text fontSize="9" fontWeight="700" letterSpacing="3" fill="url(#led-grad)" opacity="0.9">
          <textPath href={`#${pathId}`}>
            <animate attributeName="startOffset" from="0%" to="100%" dur="10s" repeatCount="indefinite" />
            {label}{label}
          </textPath>
        </text>
        <text fontSize="9" fontWeight="700" letterSpacing="3" fill="url(#led-grad)" opacity="0.9">
          <textPath href={`#${pathId}`}>
            <animate attributeName="startOffset" from="-100%" to="0%" dur="10s" repeatCount="indefinite" />
            {label}{label}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

const AndroidProjectsSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((index: number) => {
    setExpandedId((prev) => (prev === index ? null : index));
  }, []);

  // Scroll to expanded card
  useEffect(() => {
    if (expandedId !== null && expandedRef.current) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [expandedId]);

  return (
    <section id="android-projects" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Left-aligned heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">
            Android Projects
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Mobile Apps I've <span className="text-gradient">Built</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base max-w-lg">
            Native Android applications crafted with performance and user experience in mind
          </p>
        </motion.div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            transition={{ layout: { type: "spring", stiffness: 180, damping: 26 } }}
          >
            {projects.map((project, index) => {
              const isExpanded = expandedId === index;
              const isHovered = hoveredId === index && !isExpanded;

              return (
                <motion.div
                  key={project.name}
                  ref={isExpanded ? expandedRef : undefined}
                  layout
                  transition={{
                    layout: { type: "spring", stiffness: 180, damping: 26 },
                  }}
                  className={isExpanded ? "col-span-2 md:col-span-3 relative z-30" : "col-span-1"}
                >
                  <motion.div
                    layout
                    className={`group relative rounded-xl cursor-pointer overflow-visible ${
                      isExpanded ? "bg-card shadow-[0_0_80px_hsl(152,100%,50%,0.08)]" : "bg-card/40"
                    }`}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => setHoveredId(index)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* LED Marquee on hover (collapsed only) */}
                    {isHovered && <MarqueeBorder />}

                    {/* Expanded: subtle primary border */}
                    {isExpanded && (
                      <div className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none z-10" />
                    )}

                    <motion.div
                      layout
                      className={`flex ${
                        isExpanded
                          ? "flex-col md:flex-row"
                          : "flex-col items-center"
                      }`}
                    >
                      {/* === EXPANDED: Info panel (left) === */}
                      <AnimatePresence mode="popLayout">
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 26,
                            }}
                            className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative"
                          >
                            {/* Close */}
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedId(null);
                              }}
                            >
                              <X size={14} />
                            </motion.button>

                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05 }}
                              className="text-xs font-display tracking-premium text-primary mb-4 w-fit"
                            >
                              {project.year}
                            </motion.span>

                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.08, type: "spring" }}
                              className="text-5xl mb-5"
                            >
                              {project.icon}
                            </motion.div>

                            <motion.h4
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.12 }}
                              className="font-display text-2xl sm:text-3xl font-bold mb-3"
                            >
                              {project.name}
                            </motion.h4>

                            <motion.p
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.16 }}
                              className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-md"
                            >
                              {project.description}
                            </motion.p>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="flex gap-2 flex-wrap mb-6"
                            >
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                                >
                                  {techIcons[t]}
                                  {t}
                                </span>
                              ))}
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.24 }}
                              className="flex gap-3"
                            >
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display font-semibold bg-foreground text-background hover:bg-foreground/90 transition-colors"
                              >
                                <Github size={14} />
                                Source Code
                              </a>
                              {project.playStore && (
                                <a
                                  href={project.playStore}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display font-semibold border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                                >
                                  <ExternalLink size={14} />
                                  Play Store
                                </a>
                              )}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* === Phone mockup (always visible) === */}
                      <motion.div
                        layout
                        className={`flex flex-col items-center text-center ${
                          isExpanded
                            ? "p-6 sm:p-8 lg:p-10 flex-shrink-0"
                            : "p-4 sm:p-6 pt-6 sm:pt-8"
                        }`}
                      >
                        <div className="relative mb-4">
                          <div
                            className={`relative rounded-[24px] bg-gradient-to-b from-[hsl(220,20%,16%)] to-[hsl(220,20%,10%)] p-[6px] border border-border/15 transition-all duration-500 group-hover:-translate-y-2 ${
                              isExpanded
                                ? "w-[180px] h-[360px] sm:w-[200px] sm:h-[400px] lg:w-[220px] lg:h-[440px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                                : "w-[130px] h-[260px] sm:w-[150px] sm:h-[300px] lg:w-[170px] lg:h-[340px] shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                            }`}
                          >
                            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[36px] h-[3px] bg-[hsl(220,15%,20%)] rounded-full z-10" />
                            <div className="relative w-full h-full rounded-[19px] overflow-hidden bg-background">
                              <img
                                src={project.screenshot}
                                alt={`${project.name} screenshot`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[24px] h-[2.5px] bg-[hsl(220,15%,22%)] rounded-full" />
                          </div>
                        </div>

                        {/* Collapsed info */}
                        {!isExpanded && (
                          <>
                            <h4 className="font-display text-sm sm:text-base font-bold group-hover:text-primary transition-colors duration-300">
                              {project.name}
                            </h4>
                            <p className="text-muted-foreground text-[11px] sm:text-xs mt-1 max-w-[180px] leading-relaxed">
                              {project.description.slice(0, 45)}…
                            </p>
                            <div className="flex gap-1.5 mt-2.5 flex-wrap justify-center">
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground tracking-wide"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default AndroidProjectsSection;
