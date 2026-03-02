import { useState } from "react";
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

const AndroidProjectsSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

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

        {/* Grid with layout animations */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {projects.map((project, index) => {
              const isExpanded = expandedId === index;

              return (
                <motion.div
                  key={project.name}
                  layout
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    },
                  }}
                  className={`${
                    isExpanded
                      ? "col-span-2 md:col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <motion.div
                    layout
                    className={`group relative rounded-2xl border transition-colors duration-300 cursor-pointer overflow-hidden ${
                      isExpanded
                        ? "border-primary/30 bg-card"
                        : "border-border/30 bg-card/50 hover:border-primary/20"
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <motion.div
                      layout
                      className={`flex ${
                        isExpanded ? "flex-row" : "flex-col items-center"
                      }`}
                    >
                      {/* Expanded detail panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                              opacity: { duration: 0.2 },
                            }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 sm:p-8 flex flex-col justify-center h-full min-w-[200px] sm:min-w-[280px] lg:min-w-[320px]">
                              {/* Close hint */}
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.15 }}
                                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors z-10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedId(null);
                                }}
                              >
                                <X size={14} />
                              </motion.button>

                              {/* Year badge */}
                              <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xs font-display tracking-premium text-primary mb-3 w-fit"
                              >
                                {project.year}
                              </motion.span>

                              {/* Icon */}
                              <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.12, type: "spring" }}
                                className="text-4xl mb-4"
                              >
                                {project.icon}
                              </motion.div>

                              {/* Title */}
                              <motion.h4
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                                className="font-display text-xl sm:text-2xl font-bold mb-2"
                              >
                                {project.name}
                              </motion.h4>

                              {/* Description */}
                              <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-muted-foreground text-sm leading-relaxed mb-5"
                              >
                                {project.description}
                              </motion.p>

                              {/* Tech tags */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="flex gap-2 flex-wrap mb-5"
                              >
                                {project.tech.map((t) => (
                                  <span
                                    key={t}
                                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                                  >
                                    {techIcons[t]}
                                    {t}
                                  </span>
                                ))}
                              </motion.div>

                              {/* Action buttons */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-3"
                              >
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold bg-foreground text-background hover:bg-foreground/90 transition-colors"
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
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                                  >
                                    <ExternalLink size={14} />
                                    Play Store
                                  </a>
                                )}
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Phone mockup — always visible */}
                      <motion.div
                        layout
                        className={`flex flex-col items-center text-center ${
                          isExpanded ? "p-4 sm:p-6" : "p-4 sm:p-6 pt-6 sm:pt-8"
                        }`}
                      >
                        <div className="relative mb-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:drop-shadow-[0_15px_30px_hsl(var(--primary)/0.12)]">
                          {/* Ambient glow */}
                          <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                          <div className="relative w-[130px] h-[260px] sm:w-[150px] sm:h-[300px] lg:w-[170px] lg:h-[340px] rounded-[24px] bg-gradient-to-b from-[hsl(220,20%,16%)] to-[hsl(220,20%,10%)] p-[6px] shadow-[0_20px_40px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-border/15">
                            {/* Notch */}
                            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[36px] h-[3px] bg-[hsl(220,15%,20%)] rounded-full z-10" />

                            {/* Screen */}
                            <div className="relative w-full h-full rounded-[19px] overflow-hidden bg-background">
                              <img
                                src={project.screenshot}
                                alt={`${project.name} screenshot`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                              />

                              {/* Hover overlay (only when not expanded) */}
                              {!isExpanded && (
                                <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <span className="text-3xl">{project.icon}</span>
                                  <span className="text-xs font-display font-semibold text-foreground">
                                    Click to expand
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Home indicator */}
                            <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[24px] h-[2.5px] bg-[hsl(220,15%,22%)] rounded-full" />
                          </div>
                        </div>

                        {/* Project name & tags (collapsed state) */}
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
