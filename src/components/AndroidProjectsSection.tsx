import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink, Smartphone, X, ChevronRight, Code2, Calendar, Layers, Zap } from "lucide-react";

const projects = [
  {
    name: "Confess App",
    description: "Anonymous confession sharing platform with real-time Firebase backend.",
    longDescription: "A full-featured anonymous social platform where users share confessions with a community. Built with real-time Firebase listeners for instant updates, cloud functions for content moderation, and push notifications. Features include upvoting, commenting, and trending confessions feed.",
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
    longDescription: "An intelligent ride-sharing application that connects drivers and riders in real-time. Integrates Google Maps API for live location tracking, route optimization algorithms, and fare calculation. Includes driver/rider profiles, ride history, and an in-app chat system.",
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
    longDescription: "A mobile-first code editor and compiler supporting Python execution. Features syntax highlighting, auto-completion, cloud-based code storage, and a built-in terminal for output. Designed for students to practice coding on-the-go with shareable code snippets.",
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
    longDescription: "A complete hotel management solution handling guest check-in/out, room assignments, staff scheduling, and billing. Features a dashboard with occupancy analytics, automated room availability tracking, and invoice generation for seamless hotel operations.",
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
    longDescription: "A polished task management app leveraging Kotlin coroutines for smooth async operations and Room DB for offline-first persistence. Supports task categorization, priority levels, due date reminders, and productivity analytics with weekly/monthly reports.",
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
    longDescription: "An enterprise-grade inventory management tool designed for Indian Oil operations. Automates data fetching from remote servers, supports offline data caching for field use, and generates detailed stock reports. Includes barcode scanning and batch processing capabilities.",
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

const AndroidProjectsSection = () => {
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

    if (expanded === i) {
      setExpanded(null);
      return;
    }

    if (expanded !== null) {
      // Collapse first, then expand new
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
    <section
      id="android-projects"
      className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Smartphone size={16} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">
              Android Projects
            </p>
          </div>
          <h2 className="font-display font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
            Mobile Apps I've <span className="text-gradient">Crafted</span>
          </h2>
        </motion.div>

        {/* ── Expanded Detail Panel ── */}
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
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse at 0% 50%, hsl(${expandedProject.color} / 0.12) 0%, transparent 50%),
                      radial-gradient(ellipse at 100% 0%, hsl(${expandedProject.color} / 0.06) 0%, transparent 40%)
                    `,
                  }}
                />

                {/* Close button */}
                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-muted/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="relative z-10 flex flex-col lg:flex-row gap-0">
                  {/* Left — Screenshot + Status */}
                  <motion.div
                    className="flex-shrink-0 lg:w-[280px] relative"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <div className="h-[220px] lg:h-full overflow-hidden">
                      <img
                        src={expandedProject.screenshot}
                        alt={expandedProject.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Dark overlay on image */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, hsl(${expandedProject.color} / 0.3) 0%, hsl(230 25% 5% / 0.7) 100%)`,
                        }}
                      />
                    </div>
                    {/* Floating status badge */}
                    <motion.div
                      className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-display font-semibold backdrop-blur-md border"
                      style={{
                        background: `hsl(${expandedProject.color} / 0.15)`,
                        borderColor: `hsl(${expandedProject.color} / 0.3)`,
                        color: `hsl(${expandedProject.color})`,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: `hsl(${expandedProject.color})` }}
                      />
                      {expandedProject.status}
                    </motion.div>
                  </motion.div>

                  {/* Right — Rich Details */}
                  <motion.div
                    className="flex-1 p-6 md:p-8 flex flex-col gap-5"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {/* Title row */}
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{expandedProject.icon}</span>
                      <div>
                        <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl">
                          {expandedProject.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                          <Calendar size={13} />
                          <span>{expandedProject.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {expandedProject.longDescription}
                    </p>

                    {/* Highlights grid */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={14} style={{ color: `hsl(${expandedProject.color})` }} />
                        <span className="text-xs font-display font-semibold tracking-premium" style={{ color: `hsl(${expandedProject.color})` }}>
                          Key Features
                        </span>
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
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: `hsl(${expandedProject.color})` }}
                            />
                            {h}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Layers size={14} style={{ color: `hsl(${expandedProject.color})` }} />
                        <span className="text-xs font-display font-semibold tracking-premium" style={{ color: `hsl(${expandedProject.color})` }}>
                          Tech Stack
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {expandedProject.tech.map((t, idx) => (
                          <motion.span
                            key={t}
                            className="rounded-full font-medium border px-3 py-1 text-xs"
                            style={{
                              borderColor: `hsl(${expandedProject.color} / 0.3)`,
                              color: `hsl(${expandedProject.color})`,
                              background: `hsl(${expandedProject.color} / 0.08)`,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.35 + idx * 0.06 }}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <motion.div
                      className="flex gap-3 pt-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <a
                        href={expandedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full btn-outline-premium px-5 py-2.5 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={14} />
                        View Code
                      </a>
                      {expandedProject.playStore && (
                        <a
                          href={expandedProject.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full btn-premium px-5 py-2.5 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} />
                          Play Store
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom accent line */}
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

        {/* ── Grid of compact cards (always below expanded) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4"
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
                animate={isInView ? {
                  opacity: isExpanded ? 0.5 : 1,
                  y: 0,
                  scale: isExpanded ? 0.95 : 1,
                } : {}}
                transition={{ duration: 0.4, delay: isInView ? 0.1 * i : 0 }}
              >
                {/* Card */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden border bg-card/50 backdrop-blur-sm h-[240px] md:h-[280px] lg:h-[300px]"
                  animate={{
                    borderColor: isExpanded
                      ? `hsl(${project.color} / 0.8)`
                      : isHovered
                        ? `hsl(${project.color} / 0.6)`
                        : undefined,
                    boxShadow: isExpanded
                      ? `0 0 20px hsl(${project.color} / 0.3)`
                      : isHovered
                        ? `0 0 30px hsl(${project.color} / 0.2), inset 0 0 30px hsl(${project.color} / 0.05)`
                        : "none",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Screenshot bg */}
                  <img
                    src={project.screenshot}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                      filter: isHovered ? "brightness(0.3)" : "brightness(0.15)",
                    }}
                  />

                  {/* Gradient overlay */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: isHovered
                        ? `linear-gradient(180deg, hsl(${project.color} / 0.1) 0%, hsl(${project.color} / 0.3) 100%)`
                        : "linear-gradient(180deg, transparent 0%, hsl(230 25% 5% / 0.8) 100%)",
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Scanning line effect on tap */}
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

                  {/* Corner glow pulse */}
                  {isHovered && (
                    <>
                      <motion.div
                        className="absolute top-0 left-0 w-8 h-8 z-10"
                        style={{
                          borderTop: `2px solid hsl(${project.color})`,
                          borderLeft: `2px solid hsl(${project.color})`,
                          borderRadius: "16px 0 0 0",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-8 h-8 z-10"
                        style={{
                          borderBottom: `2px solid hsl(${project.color})`,
                          borderRight: `2px solid hsl(${project.color})`,
                          borderRadius: "0 0 16px 0",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </>
                  )}

                  {/* Selected indicator */}
                  {isExpanded && (
                    <motion.div
                      className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: `hsl(${project.color})` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Code2 size={12} className="text-background" />
                    </motion.div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-4">
                    <motion.div
                      animate={{ y: isHovered ? -8 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <span className="text-2xl md:text-3xl">{project.icon}</span>
                      <h3 className="font-display font-bold mt-1 text-sm md:text-base">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-xs md:text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </motion.div>

                    {/* Expand hint */}
                    <AnimatePresence>
                      {isHovered && !isExpanded && (
                        <motion.div
                          className="flex items-center gap-1 mt-3 text-xs font-display"
                          style={{ color: `hsl(${project.color})` }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                        >
                          <span>Click to expand</span>
                          <ChevronRight size={12} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Tech badges below card */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tech.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-md font-medium bg-muted/50 text-muted-foreground border border-border/40 px-2 py-0.5 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="text-muted-foreground/40 ml-auto text-xs">
                    {project.year}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AndroidProjectsSection;
