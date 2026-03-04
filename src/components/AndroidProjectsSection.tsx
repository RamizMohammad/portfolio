import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight, Smartphone } from "lucide-react";

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
    color: "152 100% 50%",
  },
  {
    name: "Share Wheels",
    description: "Smart ride sharing application with real-time location tracking, route optimization, and secure payment integration.",
    tech: ["Android", "Maps API"],
    github: "https://github.com/RamizMohammad/FinalYearProject---RideShiled.git",
    screenshot: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=280&h=500&fit=crop",
    icon: "🚗",
    year: "2023",
    color: "216 100% 50%",
  },
  {
    name: "BuddyCode",
    description: "Python-enabled online compiler supporting multi-language coding with syntax highlighting, auto-completion, and cloud save.",
    tech: ["Java", "REST APIs"],
    github: "https://github.com/RamizMohammad/BuddyCodeAndroid.git",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=280&h=500&fit=crop",
    icon: "💻",
    year: "2022",
    color: "270 100% 60%",
  },
  {
    name: "Hotel Manager",
    description: "Comprehensive staff & guest operations system with booking management, housekeeping tracking, and analytics dashboard.",
    tech: ["Android", "Database"],
    github: "https://github.com/RamizMohammad/Hotel_manager",
    screenshot: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=280&h=500&fit=crop",
    icon: "🏨",
    year: "2022",
    color: "45 90% 55%",
  },
  {
    name: "Task Manager Pro",
    description: "Advanced productivity app with Kotlin coroutines, Room persistence, widgets, and smart notifications for task reminders.",
    tech: ["Kotlin", "Room DB"],
    github: "https://github.com/RamizMohammad",
    screenshot: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=280&h=500&fit=crop",
    icon: "✅",
    year: "2022",
    color: "152 100% 50%",
  },
  {
    name: "Inventory Fetcher",
    description: "Inventory fetcher and automatic server management with scheduled syncing, offline support, and detailed reporting.",
    tech: ["Android", "API"],
    github: "https://github.com/RamizMohammad/IndianOilFetcher.git",
    screenshot: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=280&h=500&fit=crop",
    icon: "📦",
    year: "2021",
    color: "216 100% 50%",
  },
];

const AndroidProjectsSection = () => {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const project = projects[selected];

  const navigate = (dir: -1 | 1) => {
    setDirection(dir);
    setSelected((prev) => (prev + dir + projects.length) % projects.length);
  };

  const goTo = (i: number) => {
    setDirection(i > selected ? 1 : -1);
    setSelected(i);
  };

  return (
    <section id="android-projects" className="section-padding relative z-10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Smartphone size={14} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">
              Android Projects
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
            Mobile Apps I've <span className="text-gradient">Crafted</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg">
            Native Android apps built with obsessive attention to performance and UX.
          </p>
        </motion.div>

        {/* Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main stage */}
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card/30">
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-20 transition-all duration-1000"
              style={{
                background: `radial-gradient(ellipse at 70% 50%, hsl(${project.color} / 0.15) 0%, transparent 70%)`,
              }}
            />

            <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-0 p-6 md:p-8 lg:p-10">
              {/* Left: Project info */}
              <div className="flex-1 lg:pr-8 relative z-10">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={selected}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Year badge */}
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-display font-bold tracking-premium border border-border text-muted-foreground mb-3">
                      {project.year}
                    </span>

                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{project.icon}</span>
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold">
                        {project.name}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-lg">
                      {project.description}
                    </p>

                    <div className="flex gap-2 flex-wrap mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted/50 text-muted-foreground border border-border/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium px-5 py-2.5 flex items-center gap-2 text-xs"
                      >
                        <Github size={14} />
                        View Code
                      </a>
                      {project.playStore && (
                        <a
                          href={project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline-premium px-5 py-2.5 flex items-center gap-2 text-xs"
                        >
                          <ExternalLink size={14} />
                          Play Store
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Phone mockup */}
              <div className="relative flex-shrink-0">
                {/* Phone glow */}
                <div
                  className="absolute inset-0 -m-8 rounded-full blur-[80px] opacity-30 transition-all duration-1000"
                  style={{ background: `hsl(${project.color} / 0.3)` }}
                />

                <div className="relative">
                  {/* Phone frame */}
                  <div className="relative w-[180px] h-[360px] md:w-[200px] md:h-[400px] rounded-[2.5rem] bg-gradient-to-b from-[hsl(220,20%,16%)] to-[hsl(220,20%,10%)] p-[5px] border border-border/30 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                    {/* Notch */}
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-16 h-[20px] bg-[hsl(220,25%,6%)] rounded-full z-10 flex items-center px-2">
                      <div className="w-[8px] h-[8px] rounded-full bg-[hsl(220,15%,18%)] border border-[hsl(220,10%,25%)]" />
                    </div>

                    {/* Screen */}
                    <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-background">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.img
                          key={selected}
                          src={project.screenshot}
                          alt={`${project.name} screenshot`}
                          className="w-full h-full object-cover"
                          custom={direction}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5 }}
                        />
                      </AnimatePresence>
                    </div>

                    {/* Home bar */}
                    <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-24 h-[3px] bg-muted-foreground/25 rounded-full" />
                  </div>

                  {/* Reflection */}
                  <div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[180px] h-[30px] rounded-full blur-xl opacity-20"
                    style={{ background: `hsl(${project.color})` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation bar */}
            <div className="relative border-t border-border/50 px-8 md:px-12 py-5 flex items-center justify-between bg-card/20 backdrop-blur-sm">
              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
                {projects.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => goTo(i)}
                    className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${
                      selected === i
                        ? "bg-primary/15 border-2 border-primary scale-110"
                        : "bg-muted/30 border border-border hover:border-muted-foreground/50 hover:scale-105"
                    }`}
                  >
                    {p.icon}
                  </button>
                ))}
              </div>

              {/* Counter */}
              <span className="text-xs font-mono text-muted-foreground hidden sm:block">
                <span className="text-primary font-bold">{String(selected + 1).padStart(2, "0")}</span>
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

export default AndroidProjectsSection;
