import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, ExternalLink, X, Smartphone, Code2, Database, ChevronRight } from "lucide-react";

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

/** Animated gradient ring that pulses on hover — replaces the old marquee text */
const HoverRing = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="absolute -inset-[2px] rounded-xl z-20 pointer-events-none"
    style={{
      background: "linear-gradient(135deg, hsl(152 100% 50%), hsl(216 100% 60%), hsl(270 100% 60%), hsl(152 100% 50%))",
      backgroundSize: "300% 300%",
      animation: "gradient-spin 3s linear infinite",
      padding: "2px",
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    }}
  />
);

const AndroidProjectsSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleClick = useCallback((index: number) => {
    setExpandedId((prev) => (prev === index ? null : index));
  }, []);

  // Smooth scroll to expanded card
  useEffect(() => {
    if (expandedId === null) return;
    const timer = setTimeout(() => {
      const el = cardRefs.current.get(expandedId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset = rect.top + window.scrollY - 120;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [expandedId]);

  return (
    <section id="android-projects" className="section-padding relative z-10">
      {/* Gradient ring animation */}
      <style>{`
        @keyframes gradient-spin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

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
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative"
            transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
          >
            {projects.map((project, index) => {
              const isExpanded = expandedId === index;
              const isHovered = hoveredId === index && !isExpanded;

              return (
                <motion.div
                  key={project.name}
                  ref={(el) => {
                    if (el) cardRefs.current.set(index, el);
                    else cardRefs.current.delete(index);
                  }}
                  layout
                  transition={{
                    layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                  }}
                  className={
                    isExpanded ? "col-span-2 md:col-span-3 relative z-30" : "col-span-1"
                  }
                >
                  <motion.div
                    layout
                    className={`group relative rounded-xl cursor-pointer ${
                      isExpanded
                        ? "bg-card"
                        : "bg-card/40"
                    }`}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => setHoveredId(index)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Animated gradient ring on hover */}
                    <AnimatePresence>
                      {isHovered && <HoverRing />}
                    </AnimatePresence>

                    {/* Expanded glow border */}
                    {isExpanded && (
                      <div className="absolute -inset-[1px] rounded-xl border border-primary/25 pointer-events-none z-10" />
                    )}

                    <motion.div
                      layout
                      className={`flex ${
                        isExpanded ? "flex-col sm:flex-row" : "flex-col items-center"
                      }`}
                      transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
                    >
                      {/* === EXPANDED: Info panel (left) === */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative"
                          >
                            {/* Close */}
                            <motion.button
                              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-destructive/20 hover:text-destructive transition-all z-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedId(null);
                              }}
                            >
                              <X size={16} />
                            </motion.button>

                            <motion.span
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1, duration: 0.4 }}
                              className="text-xs font-display tracking-premium text-primary mb-4 w-fit"
                            >
                              {project.year}
                            </motion.span>

                            <motion.div
                              initial={{ opacity: 0, scale: 0.3 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 15 }}
                              className="text-5xl mb-5"
                            >
                              {project.icon}
                            </motion.div>

                            <motion.h4
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                              className="font-display text-2xl sm:text-3xl font-bold mb-3"
                            >
                              {project.name}
                            </motion.h4>

                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.25, duration: 0.4 }}
                              className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-md"
                            >
                              {project.description}
                            </motion.p>

                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
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
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.35, duration: 0.4 }}
                              className="flex gap-3 flex-wrap"
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

                      {/* === Phone mockup === */}
                      <motion.div
                        layout
                        className={`flex flex-col items-center text-center ${
                          isExpanded
                            ? "p-6 sm:p-8 lg:p-10 flex-shrink-0"
                            : "p-4 sm:p-6 pt-6 sm:pt-8"
                        }`}
                        transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
                      >
                        <div className="relative mb-4">
                          <motion.div
                            layout
                            className={`relative rounded-[24px] bg-gradient-to-b from-[hsl(220,20%,16%)] to-[hsl(220,20%,10%)] p-[6px] border border-border/15 ${
                              isExpanded
                                ? "w-[180px] h-[360px] sm:w-[200px] sm:h-[400px] lg:w-[220px] lg:h-[440px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                                : "w-[130px] h-[260px] sm:w-[150px] sm:h-[300px] lg:w-[170px] lg:h-[340px] shadow-[0_20px_40px_rgba(0,0,0,0.35)] group-hover:-translate-y-2 transition-transform duration-500"
                            }`}
                            transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
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
                          </motion.div>
                        </div>

                        {/* Collapsed: name + explore hint */}
                        {!isExpanded && (
                          <motion.div layout className="flex flex-col items-center">
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
                            {/* Subtle explore hint */}
                            <span className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground/50 group-hover:text-primary/70 transition-colors font-display tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                              Explore
                              <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </motion.div>
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
