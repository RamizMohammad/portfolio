import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink, Smartphone } from "lucide-react";

const projects = [
  {
    name: "Confess App",
    description: "Anonymous confession sharing platform with real-time Firebase backend.",
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
    description: "Smart ride sharing with real-time location tracking and route optimization.",
    tech: ["Android", "Maps API"],
    github: "https://github.com/RamizMohammad/FinalYearProject---RideShiled.git",
    screenshot: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=280&h=500&fit=crop",
    icon: "🚗",
    year: "2023",
    color: "216 100% 50%",
  },
  {
    name: "BuddyCode",
    description: "Python-enabled online compiler with syntax highlighting and cloud save.",
    tech: ["Java", "REST APIs"],
    github: "https://github.com/RamizMohammad/BuddyCodeAndroid.git",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=280&h=500&fit=crop",
    icon: "💻",
    year: "2022",
    color: "270 100% 60%",
  },
  {
    name: "Hotel Manager",
    description: "Comprehensive staff & guest operations with booking management.",
    tech: ["Android", "Database"],
    github: "https://github.com/RamizMohammad/Hotel_manager",
    screenshot: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=280&h=500&fit=crop",
    icon: "🏨",
    year: "2022",
    color: "45 90% 55%",
  },
  {
    name: "Task Manager Pro",
    description: "Advanced productivity app with Kotlin coroutines and Room persistence.",
    tech: ["Kotlin", "Room DB"],
    github: "https://github.com/RamizMohammad",
    screenshot: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=280&h=500&fit=crop",
    icon: "✅",
    year: "2022",
    color: "152 100% 50%",
  },
  {
    name: "Inventory Fetcher",
    description: "Inventory fetcher with automatic server management and offline support.",
    tech: ["Android", "API"],
    github: "https://github.com/RamizMohammad/IndianOilFetcher.git",
    screenshot: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=280&h=500&fit=crop",
    icon: "📦",
    year: "2021",
    color: "216 100% 50%",
  },
];

const AndroidProjectsSection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [tapped, setTapped] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleTap = (i: number) => {
    if (tapped === i) {
      setTapped(null);
      setSelected(null);
    } else {
      setTapped(i);
      setSelected(i);
    }
  };

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

        {/* Grid of cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4"
        >
          {projects.map((project, i) => {
            const isActive = selected === i;
            const isTapped = tapped === i;

            return (
              <motion.div
                key={project.name}
                className="relative cursor-pointer group"
                onClick={() => handleTap(i)}
                onHoverStart={() => setSelected(i)}
                onHoverEnd={() => { if (tapped !== i) setSelected(null); }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                layout
              >
                {/* Card */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm h-[240px] md:h-[280px] lg:h-[300px]"
                  animate={{
                    borderColor: isActive ? `hsl(${project.color} / 0.6)` : undefined,
                    boxShadow: isActive
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
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      filter: isActive ? "brightness(0.3)" : "brightness(0.15)",
                    }}
                  />

                  {/* Gradient overlay */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: isActive
                        ? `linear-gradient(180deg, hsl(${project.color} / 0.1) 0%, hsl(${project.color} / 0.3) 100%)`
                        : "linear-gradient(180deg, transparent 0%, hsl(230 25% 5% / 0.8) 100%)",
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Scanning line effect on tap */}
                  {isTapped && (
                    <motion.div
                      className="absolute left-0 right-0 h-[2px] z-20"
                      style={{ background: `linear-gradient(90deg, transparent, hsl(${project.color}), transparent)` }}
                      initial={{ top: 0, opacity: 0 }}
                      animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  )}

                  {/* Corner glow pulse */}
                  {isActive && (
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

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-4">
                    <motion.div
                      animate={{ y: isActive ? -8 : 0 }}
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

                    {/* Action buttons */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="flex gap-2 mt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-full bg-foreground/10 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all px-3 py-1.5 text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={12} />
                            Code
                          </a>
                          {project.playStore && (
                            <a
                              href={project.playStore}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all px-3 py-1.5 text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={12} />
                              Store
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Tech badges below card */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tech.map((t) => (
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
