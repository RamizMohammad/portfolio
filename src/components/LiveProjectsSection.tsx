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
    <section className="section-padding relative z-10" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">
              Live & Deployed
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
            Projects in the <span className="text-gradient">Wild</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg">
            Real products, real users, real impact.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {liveProjects.map((project, i) => {
            const isHovered = hoveredIndex === i;
            const colSpan =
              i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12";
            const height = i === 2 ? "md:h-[160px]" : "md:h-[240px]";

            return (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`${colSpan} group relative rounded-2xl overflow-hidden cursor-pointer h-[220px] ${height}`}
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
                <div className={`relative z-10 h-full p-5 flex ${i === 2 ? "flex-row items-center gap-6" : "flex-col justify-between"}`}>
                  <div className={`${i === 2 ? "flex items-center gap-6 flex-1" : ""}`}>
                    {/* Emoji + Live badge */}
                    <div className="flex items-start justify-between mb-auto">
                      <motion.div
                        className="text-5xl"
                        animate={isHovered ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {project.emoji}
                      </motion.div>
                      {i !== 2 && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="text-[10px] font-display font-semibold text-primary tracking-wider uppercase">
                            Live
                          </span>
                        </div>
                      )}
                    </div>

                    <div className={i === 2 ? "ml-0" : "mt-auto"}>
                      <h3 className="font-display text-xl md:text-2xl font-extrabold mb-1 group-hover:text-primary transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground/70 text-xs font-display italic mb-2">
                        {project.tagline}
                      </p>
                      {i !== 2 && (
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className={`flex items-center justify-between ${i === 2 ? "flex-1" : "mt-4"}`}>
                    <div className="flex gap-1.5 flex-wrap">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-muted/60 text-muted-foreground border border-border/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors font-display font-semibold"
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
