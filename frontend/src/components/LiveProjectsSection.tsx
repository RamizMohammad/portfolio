import { motion, useInView } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { useRef, useState } from "react";

// Import images
import backupengine from "@/assets/live-projects/BackupEngine.png";
import buddycodeImg from "@/assets/live-projects/buddycode.png";
import confessImg from "@/assets/live-projects/confess.png";
import linkiumImg from "@/assets/live-projects/Linkium.png";
import timefold from "@/assets/live-projects/timefold.png";

const liveProjects = [
    {
    name: "Confess App",
    url: "https://play.google.com/store/apps/details?id=in.mohammad.ramiz.confess",
    image: confessImg,
    tagline: "Speak Your Truth, Stay Anonymous",
    description:
      "Anonymous confession platform with real-time feeds, reactions, and secure backend anonymity.",
    tech: ["Java", "Firebase", "Android", "Firestore"],
    gradient: "from-accent/10 to-primary/20",
    glowColor: "hsl(270 100% 60% / 0.12)",
    users: "1K+",
  },
  {
    name: "Linkium",
    url: "https://www.linkium.space",
    image: linkiumImg,
    tagline: "Connect Any Device, Anywhere",
    description:
      "Cross-platform device connection tool enabling seamless file sharing and communication between devices.",
    tech: ["Python", "Tkinter", "WebSocket", "Networking"],
    gradient: "from-secondary/20 to-accent/10",
    glowColor: "hsl(216 100% 50% / 0.15)",
    users: "200+",
  },
  {
    name: "BuddyCode",
    url: "https://www.buddycode.online",
    image: buddycodeImg,
    tagline: "Code Together, Build Together",
    description:
      "Real-time collaborative code editor with syntax highlighting, multi-language support, and live cursor sharing.",
    tech: ["Python", "Flask", "WebSocket", "CodeMirror"],
    gradient: "from-primary/20 to-secondary/20",
    glowColor: "hsl(152 100% 50% / 0.15)",
    users: "500+",
  },
  {
    name: "Backup Engine",
    url: "https://github.com/RamizMohammad/Backup_Engine/releases/tag/v1.0",
    image: backupengine,
    tagline: "Smart Automatic Backups",
    description:
      "Backup automation tool that creates compressed snapshots of important folders and tracks file changes.",
    tech: ["Python", "PyQt", "Multithreading", "File Hashing"],
    gradient: "from-primary/20 to-accent/10",
    glowColor: "hsl(30 100% 55% / 0.15)",
    users: "100+",
  },
  {
    name: "Confess Web",
    url: "https://confess.mohammadramiz.in/",
    image: confessImg,
    tagline: "Confess Platform on the Web",
    description:
      "Promotional and companion website for the Confess Android app with community features.",
    tech: ["React", "FastAPI", "Firebase", "Tailwind"],
    gradient: "from-secondary/20 to-primary/10",
    glowColor: "hsl(190 100% 50% / 0.15)",
    users: "800+",
  },
  {
    name: "Time Fold",
    url: "https://www.timefold.space/",
    image: timefold,
    tagline: "Discover What Happened Today",
    description:
      "Timeline-based website showing historical events that happened on the same day in history.",
    tech: ["Python", "FastAPI", "APIs", "Data Processing"],
    gradient: "from-accent/20 to-secondary/10",
    glowColor: "hsl(260 100% 60% / 0.14)",
    users: "300+",
  },
];

const LiveProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center"
      ref={sectionRef}
    >
      <div
        className="max-w-6xl mx-auto w-full flex flex-col"
        style={{ gap: "clamp(1rem, 2.5vh, 2.5rem)" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-primary font-display font-medium tracking-premium vh-small">
              Live & Deployed
            </p>
          </div>

          <h2 className="font-display font-extrabold leading-tight vh-heading">
            Projects in the <span className="text-gradient">Wild</span>
          </h2>

          <p className="text-muted-foreground mt-1 vh-body max-w-lg">
            Real products, real users, real impact.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 flex-1"
          style={{ gap: "clamp(0.75rem, 1.2vh, 1.25rem)" }}
        >
          {liveProjects.map((project, i) => {
            const isHovered = hoveredIndex === i;

            const colSpan =
              i === 0
                ? "md:col-span-7"
                : i === 1
                ? "md:col-span-5"
                : i === 2
                ? "md:col-span-12"
                : i === 3
                ? "md:col-span-7"
                : i === 4
                ? "md:col-span-5"
                : "md:col-span-12";

            return (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`${colSpan} group relative rounded-2xl overflow-hidden cursor-pointer`}
                style={{
                  height:
                    i === 2
                      ? "clamp(140px, 20vh, 220px)"
                      : "clamp(180px, 30vh, 320px)",
                }}
              >
                {/* Base background */}
                <div className="absolute inset-0 bg-card" />

                {/* Gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                {/* Glow border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `inset 0 0 0 1px hsl(var(--primary) / 0.3), 0 0 40px ${project.glowColor}`,
                  }}
                />

                {/* Static border */}
                <div className="absolute inset-0 rounded-2xl border border-border group-hover:border-transparent transition-colors duration-500" />

                {/* Content */}
                <div
                  className="relative z-10 h-full flex flex-col justify-between overflow-hidden"
                  style={{ padding: "clamp(1rem, 2.2vh, 1.8rem)" }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="rounded-lg overflow-hidden"
                      style={{
                        width: "clamp(40px,5vh,60px)",
                        height: "clamp(40px,5vh,60px)",
                      }}
                      animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </motion.div>

                    <div>
                      <h3 className="font-display font-extrabold mb-0.5 group-hover:text-primary transition-colors duration-300 vh-subheading">
                        {project.name}
                      </h3>

                      <p className="text-muted-foreground/70 font-display italic vh-small">
                        {project.tagline}
                      </p>

                      <p className="text-muted-foreground leading-relaxed max-w-md mt-1 vh-body line-clamp-2 overflow-hidden">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-1.5 flex-wrap">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md font-semibold bg-muted/60 text-muted-foreground border border-border/50"
                          style={{
                            padding:
                              "clamp(2px,0.4vh,4px) clamp(6px,1vh,10px)",
                            fontSize: "clamp(8px,1.1vh,11px)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <motion.div
                      className="flex items-center gap-1.5 text-muted-foreground group-hover:text-primary transition-colors font-display font-semibold vh-small"
                      animate={isHovered ? { x: 4 } : { x: 0 }}
                    >
                      <Zap size={12} />
                      {project.users} users
                      <ExternalLink
                        size={13}
                        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Glow corner */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                  style={{ background: project.glowColor }}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LiveProjectsSection;