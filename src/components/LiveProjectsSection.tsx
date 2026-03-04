import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Zap } from "lucide-react";

const liveProjects = [
  {
    name: "BuddyCode",
    url: "https://www.buddycode.online",
    emoji: "💻",
    tagline: "Code Together, Build Together",
    description: "Real-time collaborative code editor with syntax highlighting, multi-language support, and live cursor sharing.",
    tech: ["Python", "Flask", "WebSocket"],
    gradient: "from-primary/20 to-secondary/20",
    glowColor: "hsl(152 100% 50% / 0.15)",
    users: "500+",
  },
  {
    name: "Linkium",
    url: "https://www.linkium.space",
    emoji: "🔗",
    tagline: "Connect Any Device, Anywhere",
    description: "Seamless cross-platform device connection and file sharing over local and remote networks.",
    tech: ["Python", "Tkinter", "WebSocket"],
    gradient: "from-secondary/20 to-accent/10",
    glowColor: "hsl(216 100% 50% / 0.15)",
    users: "200+",
  },
  {
    name: "Confess App",
    url: "https://play.google.com/store/apps/details?id=in.mohammad.ramiz.confess",
    emoji: "🔮",
    tagline: "Speak Your Truth, Stay Anonymous",
    description: "Anonymous confession platform with real-time feeds, reactions, and community engagement.",
    tech: ["Java", "Firebase", "Android"],
    gradient: "from-accent/10 to-primary/20",
    glowColor: "hsl(270 100% 60% / 0.12)",
    users: "1K+",
  },
];

const LiveProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-6xl mx-auto w-full flex flex-col" style={{ gap: "clamp(1rem, 2.5vh, 2.5rem)" }}>
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1" style={{ gap: "clamp(0.75rem, 1.2vh, 1.25rem)" }}>
          {liveProjects.map((project, i) => {
            const isHovered = hoveredIndex === i;
            const colSpan =
              i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12";

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
                style={{ height: i === 2 ? "clamp(120px, 18vh, 200px)" : "clamp(160px, 28vh, 300px)" }}
              >
                {/* Base bg */}
                <div className="absolute inset-0 bg-card" />

                {/* Gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                {/* Animated border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `inset 0 0 0 1px hsl(var(--primary) / 0.3), 0 0 40px ${project.glowColor}`,
                  }}
                />

                {/* Static border */}
                <div className="absolute inset-0 rounded-2xl border border-border group-hover:border-transparent transition-colors duration-500" />

                {/* Content */}
                <div className={`relative z-10 h-full flex overflow-hidden ${i === 2 ? "flex-row items-center" : "flex-col justify-between"}`}
                  style={{ padding: "clamp(0.75rem, 1.8vh, 1.5rem)" }}
                >
                  <div className={`${i === 2 ? "flex items-center gap-4 flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-auto">
                      <motion.div
                        style={{ fontSize: "clamp(1.5rem, 4vh, 3rem)" }}
                        animate={isHovered ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {project.emoji}
                      </motion.div>
                      {i !== 2 && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="font-display font-semibold text-primary tracking-wider uppercase" style={{ fontSize: "clamp(8px, 1vh, 10px)" }}>
                            Live
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={i === 2 ? "ml-0" : "mt-auto"}>
                      <h3 className="font-display font-extrabold mb-0.5 group-hover:text-primary transition-colors duration-300 vh-subheading">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground/70 font-display italic vh-small">
                        {project.tagline}
                      </p>
                      {i !== 2 && (
                        <p className="text-muted-foreground leading-relaxed max-w-md mt-1 vh-body line-clamp-2 overflow-hidden">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className={`flex items-center justify-between ${i === 2 ? "flex-1" : "mt-2"}`}>
                    <div className="flex gap-1.5 flex-wrap">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md font-semibold bg-muted/60 text-muted-foreground border border-border/50"
                          style={{ padding: "clamp(2px, 0.4vh, 4px) clamp(6px, 1vh, 10px)", fontSize: "clamp(8px, 1.1vh, 11px)" }}
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

                {/* Corner accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-700"
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
