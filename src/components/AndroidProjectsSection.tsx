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
    <section id="android-projects" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-7xl mx-auto w-full flex flex-col" style={{ gap: "clamp(1rem, 2vh, 2rem)" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <Smartphone size={14} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium vh-small">
              Android Projects
            </p>
          </div>
          <h2 className="font-display font-extrabold leading-tight vh-heading">
            Mobile Apps I've <span className="text-gradient">Crafted</span>
          </h2>
          <p className="text-muted-foreground mt-1 vh-body max-w-lg">
            Native Android apps built with obsessive attention to performance and UX.
          </p>
        </motion.div>

        {/* Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex-1"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card/30 h-full flex flex-col">
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-20 transition-all duration-1000"
              style={{
                background: `radial-gradient(ellipse at 70% 50%, hsl(${project.color} / 0.15) 0%, transparent 70%)`,
              }}
            />

            <div className="relative flex flex-col lg:flex-row items-center flex-1" style={{ gap: "clamp(1rem, 2vh, 2rem)", padding: "clamp(1rem, 2.5vh, 2.5rem) clamp(1.5rem, 3vw, 3rem)" }}>
              {/* Left: Project info */}
              <div className="flex-1 relative z-10">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={selected}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    className="flex flex-col" style={{ gap: "clamp(0.5rem, 1vh, 0.75rem)" }}
                  >
                    <span className="inline-block px-3 py-0.5 rounded-full font-display font-bold tracking-premium border border-border text-muted-foreground w-fit" style={{ fontSize: "clamp(8px, 1vh, 10px)" }}>
                      {project.year}
                    </span>

                    <div className="flex items-center" style={{ gap: "clamp(0.5rem, 1vh, 1rem)" }}>
                      <span style={{ fontSize: "clamp(1.5rem, 3.5vh, 3rem)" }}>{project.icon}</span>
                      <h3 className="font-display font-extrabold vh-subheading">
                        {project.name}
                      </h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed max-w-lg vh-body">
                      {project.description}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg font-semibold bg-muted/50 text-muted-foreground border border-border/60"
                          style={{ padding: "clamp(2px, 0.5vh, 6px) clamp(8px, 1vh, 12px)", fontSize: "clamp(9px, 1.2vh, 12px)" }}
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
                        className="btn-premium flex items-center gap-2"
                        style={{ padding: "clamp(6px, 1vh, 10px) clamp(12px, 2vh, 20px)", fontSize: "clamp(10px, 1.2vh, 13px)" }}
                      >
                        <Github size={14} />
                        View Code
                      </a>
                      {project.playStore && (
                        <a
                          href={project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline-premium flex items-center gap-2"
                          style={{ padding: "clamp(6px, 1vh, 10px) clamp(12px, 2vh, 20px)", fontSize: "clamp(10px, 1.2vh, 13px)" }}
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
                <div
                  className="absolute inset-0 -m-8 rounded-full blur-[80px] opacity-30 transition-all duration-1000"
                  style={{ background: `hsl(${project.color} / 0.3)` }}
                />

                <div className="relative">
                  <div
                    className="relative rounded-[2.5rem] bg-gradient-to-b from-[hsl(220,20%,16%)] to-[hsl(220,20%,10%)] border border-border/30"
                    style={{
                      width: "clamp(140px, 18vh, 220px)",
                      height: "clamp(280px, 36vh, 440px)",
                      padding: "4px",
                      boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-12 h-[16px] bg-[hsl(220,25%,6%)] rounded-full z-10 flex items-center px-1.5">
                      <div className="w-[6px] h-[6px] rounded-full bg-[hsl(220,15%,18%)] border border-[hsl(220,10%,25%)]" />
                    </div>

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

                    <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-16 h-[2.5px] bg-muted-foreground/25 rounded-full" />
                  </div>

                  <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-[20px] rounded-full blur-xl opacity-20"
                    style={{ background: `hsl(${project.color})` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation bar */}
            <div className="relative border-t border-border/50 flex items-center justify-between bg-card/20 backdrop-blur-sm"
              style={{ padding: "clamp(0.5rem, 1vh, 1rem) clamp(1rem, 2vw, 2rem)" }}
            >
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  style={{ width: "clamp(28px, 3.5vh, 40px)", height: "clamp(28px, 3.5vh, 40px)" }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  style={{ width: "clamp(28px, 3.5vh, 40px)", height: "clamp(28px, 3.5vh, 40px)" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {projects.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => goTo(i)}
                    className={`relative flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      selected === i
                        ? "bg-primary/15 border-2 border-primary scale-110"
                        : "bg-muted/30 border border-border hover:border-muted-foreground/50 hover:scale-105"
                    }`}
                    style={{ width: "clamp(28px, 3.5vh, 40px)", height: "clamp(28px, 3.5vh, 40px)", fontSize: "clamp(12px, 1.8vh, 18px)" }}
                  >
                    {p.icon}
                  </button>
                ))}
              </div>

              <span className="font-mono text-muted-foreground hidden sm:block vh-small">
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
