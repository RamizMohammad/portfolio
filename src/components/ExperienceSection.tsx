import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, X, Code2, Zap, Layers } from "lucide-react";

const THEME_COLOR = "152 100% 50%";
const THEME_GRADIENT = "linear-gradient(135deg, hsl(152 100% 50%), hsl(216 100% 50%))";

const companies = [
  {
    name: "Freelance Projects",
    icon: "🚀",
    role: "Android Developer",
    duration: "2022 – Present",
    overview: "Developed and deployed multiple Android applications with focus on user experience and performance.",
    longDescription: "Led end-to-end development of production-grade Android apps from concept to Play Store deployment. Specialized in Firebase-powered real-time features, push notification systems, and performance optimization. Achieved 40% improvement in app load times through lazy loading and efficient memory management.",
    highlights: ["Play Store publishing", "Firebase integration", "Performance optimization", "Real-time features"],
    responsibilities: [
      "Published 2+ apps on Google Play Store",
      "Implemented Firebase integration and real-time features",
      "Optimized app performance by 40%",
    ],
    projects: ["Confess App", "Share Wheels", "BuddyCode"],
    tech: ["Java", "Kotlin", "Firebase", "Android Studio"],
    status: "Active",
  },
  {
    name: "Personal Projects",
    icon: "💻",
    role: "Backend Developer",
    duration: "2021 – Present",
    overview: "Built scalable backend systems using Python, Flask, and FastAPI for web and mobile applications.",
    longDescription: "Architected and deployed production backend systems serving thousands of users. Built RESTful APIs with comprehensive authentication, rate limiting, and monitoring. Managed AWS infrastructure including EC2 instances, S3 storage, and CloudWatch logging for 99.9% uptime.",
    highlights: ["REST API design", "AWS deployment", "Auth systems", "99.9% uptime"],
    responsibilities: [
      "Developed 10+ REST APIs with 99.9% uptime",
      "Deployed applications on AWS and cloud platforms",
      "Implemented secure authentication systems",
    ],
    projects: ["BuddyCode Web", "Confess Server", "Local Share"],
    tech: ["Python", "Flask", "FastAPI", "AWS"],
    status: "Active",
  },
  {
    name: "Bluestock Fintech",
    icon: "🏢",
    role: "Software Development Engineer",
    duration: "May 2025 – June 2025",
    overview: "Interned at Bluestock Fintech, led a team to build the admin panel design.",
    longDescription: "Selected as project lead during internship at Bluestock Fintech. Spearheaded the design and development of a comprehensive admin panel for managing fintech operations. Coordinated with cross-functional teams, conducted code reviews, and established frontend architecture standards.",
    highlights: ["Team leadership", "Admin panel", "Frontend architecture", "Code reviews"],
    responsibilities: [
      "Led a team as the project lead",
      "Built the complete admin panel",
      "Designed and implemented frontend architecture",
    ],
    projects: ["Admin Panel"],
    tech: ["Flask", "Web Design"],
    status: "Completed",
  },
];

const ExperienceSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tapped, setTapped] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (expanded !== null && expandedRef.current) {
      setTimeout(() => { expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 150);
    }
  }, [expanded]);

  const handleClick = useCallback((i: number) => {
    if (isTransitioning) return;
    if (expanded === i) { setExpanded(null); return; }
    if (expanded !== null) {
      setIsTransitioning(true);
      setExpanded(null);
      setTimeout(() => { setTapped(i); setExpanded(i); setIsTransitioning(false); }, 400);
    } else { setTapped(i); setExpanded(i); }
  }, [expanded, isTransitioning]);

  const ec = expanded !== null ? companies[expanded] : null;

  return (
    <section id="experience" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={16} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">Experience</p>
          </div>
          <h2 className="font-display font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
            Where I've <span className="text-gradient">Worked</span>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {ec && expanded !== null && (
            <motion.div key={expanded} ref={expandedRef} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card/90 backdrop-blur-md">
                <div className="h-1 w-full" style={{ background: THEME_GRADIENT }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 0% 50%, hsl(${THEME_COLOR} / 0.1) 0%, transparent 50%)` }} />

                <button onClick={() => setExpanded(null)} className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-muted/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <X size={16} />
                </button>

                <div className="relative z-10 p-6 md:p-8 flex flex-col gap-5">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl flex items-center justify-center border border-primary/20 w-14 h-14 bg-primary/10">
                        <span className="text-3xl">{ec.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl">{ec.name}</h3>
                        <p className="font-display font-medium text-sm md:text-base text-primary">{ec.role}</p>
                      </div>
                    </div>
                    <motion.div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-display font-semibold backdrop-blur-md border border-primary/30 bg-primary/15 text-primary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <Calendar size={13} />
                      {ec.duration}
                    </motion.div>
                  </div>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{ec.longDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={14} className="text-primary" />
                        <span className="text-xs font-display font-semibold tracking-premium text-primary">Key Highlights</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {ec.highlights.map((h, idx) => (
                          <motion.div key={h} className="flex items-center gap-2 rounded-lg px-3 py-2 bg-muted/30 border border-border/50 text-sm text-foreground" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.08 }}>
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary" />
                            {h}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase size={14} className="text-primary" />
                        <span className="text-xs font-display font-semibold tracking-premium text-primary">Responsibilities</span>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {ec.responsibilities.map((r, idx) => (
                          <motion.li key={r} className="flex items-start gap-2 text-muted-foreground text-sm" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.1 }}>
                            <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                            {r}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div>
                      <span className="text-xs font-display font-semibold tracking-premium text-primary">Projects</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ec.projects.map((p, idx) => (
                          <motion.span key={p} className="rounded-full font-medium border border-primary/25 text-primary bg-primary/[0.06] px-3 py-1 text-xs" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + idx * 0.06 }}>
                            {p}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Layers size={14} className="text-primary" />
                        <span className="text-xs font-display font-semibold tracking-premium text-primary">Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ec.tech.map((t, idx) => (
                          <motion.span key={t} className="rounded-md border border-border text-muted-foreground px-2.5 py-1 text-xs" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 + idx * 0.06 }}>
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div className="h-[2px] w-full" style={{ background: THEME_GRADIENT }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          {companies.map((company, i) => {
            const isHovered = hovered === i;
            const isExpanded = expanded === i;
            const isTapped = tapped === i;

            return (
              <motion.div key={company.name} className="relative cursor-pointer group" onClick={() => handleClick(i)} onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: isExpanded ? 0.5 : 1, y: 0, scale: isExpanded ? 0.95 : 1 } : {}} transition={{ duration: 0.4, delay: isInView ? 0.1 * i : 0 }}>
                <motion.div className="relative rounded-2xl overflow-hidden border bg-card/50 backdrop-blur-sm h-[200px] md:h-[240px]" animate={{ borderColor: isExpanded ? `hsl(${THEME_COLOR} / 0.8)` : isHovered ? `hsl(${THEME_COLOR} / 0.6)` : undefined, boxShadow: isExpanded ? `0 0 20px hsl(${THEME_COLOR} / 0.3)` : isHovered ? `0 0 30px hsl(${THEME_COLOR} / 0.2), inset 0 0 30px hsl(${THEME_COLOR} / 0.05)` : "none" }} transition={{ duration: 0.3 }}>
                  <div className="absolute inset-0 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at 30% 30%, hsl(${THEME_COLOR} / ${isHovered ? 0.2 : 0.08}) 0%, transparent 70%)` }} />

                  <AnimatePresence>
                    {isTapped && expanded === i && (
                      <motion.div className="absolute left-0 right-0 h-[2px] z-20" style={{ background: THEME_GRADIENT }} initial={{ top: 0, opacity: 0 }} animate={{ top: "100%", opacity: [0, 1, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} onAnimationComplete={() => setTapped(null)} />
                    )}
                  </AnimatePresence>

                  {isHovered && (
                    <>
                      <motion.div className="absolute top-0 left-0 w-8 h-8 z-10" style={{ borderTop: `2px solid hsl(${THEME_COLOR})`, borderLeft: `2px solid hsl(${THEME_COLOR})`, borderRadius: "16px 0 0 0" }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0.4, 1, 0.4], scale: 1 }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.div className="absolute bottom-0 right-0 w-8 h-8 z-10" style={{ borderBottom: `2px solid hsl(${THEME_COLOR})`, borderRight: `2px solid hsl(${THEME_COLOR})`, borderRadius: "0 0 16px 0" }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0.4, 1, 0.4], scale: 1 }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                    </>
                  )}

                  {isExpanded && (
                    <motion.div className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: THEME_GRADIENT }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
                      <Code2 size={12} className="text-background" />
                    </motion.div>
                  )}

                  <div className="relative z-10 flex flex-col justify-end h-full p-5">
                    <motion.div animate={{ y: isHovered ? -8 : 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                      <span className="text-3xl md:text-4xl">{company.icon}</span>
                      <h3 className="font-display font-bold mt-2 text-base md:text-lg">{company.name}</h3>
                      <p className="font-display font-medium text-xs md:text-sm text-primary">{company.role}</p>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-xs md:text-sm leading-relaxed">{company.overview}</p>
                    </motion.div>

                    <AnimatePresence>
                      {isHovered && !isExpanded && (
                        <motion.div className="flex items-center gap-1 mt-3 text-xs font-display text-primary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25 }}>
                          <span>Click to expand</span>
                          <ChevronRight size={12} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {company.tech.slice(0, 2).map((t) => (
                    <span key={t} className="rounded-md font-medium bg-muted/50 text-muted-foreground border border-border/40 px-2 py-0.5 text-xs">{t}</span>
                  ))}
                  <span className="text-muted-foreground/40 ml-auto text-xs">{company.duration}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
