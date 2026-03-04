import bluestock from "@/assets/companylogos/bluelogo.png";
import freelance from "@/assets/companylogos/freelance.png";
import moglix from "@/assets/companylogos/moglix.png";
import personal from "@/assets/companylogos/personal.png";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, Code2, Layers, X, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const THEME_COLOR = "152 100% 50%";
const THEME_GRADIENT = "linear-gradient(135deg, hsl(152 100% 50%), hsl(216 100% 50%))";

const companies = [
  {
    name: "Moglix - B2B Supply Chain",
    logo: moglix,
    role: "Python and Agentic AI Developer",
    duration: "Jan 2026 – Present",
    overview: "Intern at Moglix as python backend, APIs and Agentic AI developer",
    responsibilities: [
      "Python Backend Development",
      "Backend APIs Development and Integration",
      "Data analysis of reports to solve them through code",
      "Agentic AI support system and chatbot development",
    ],
    projects: ["Supplier Invoice Accuracy", "Sourcing Agent", "OCR Accuracy Report Pipeline"],
    tech: ["FastAPI", "Web Design", "Python Backend", "Vertex AI"],
  },
  {
    name: "Bluestock Fintech",
    logo: bluestock,
    role: "Software Development Engineer (SDE)",
    duration: "May 2025 – June 2025",
    overview: "Interned at Bluestock Fintech, led a team to build the admin panel design.",
    responsibilities: [
      "Led a team as the project lead",
      "Built the complete admin panel",
      "Designed and implemented frontend architecture",
    ],
    projects: ["Admin Panel"],
    tech: ["Flask", "Web Design"],
  },
  {
    name: "Freelance Projects",
    logo: freelance,
    role: "Android Developer",
    duration: "2022 – Present",
    overview: "Developed and deployed multiple Android applications with focus on user experience and performance.",
    responsibilities: [
      "Published 2+ apps on Google Play Store",
      "Implemented Firebase integration and real-time features",
      "Optimized app performance by 40%",
    ],
    projects: ["Confess App", "Share Wheels", "BuddyCode"],
    tech: ["Java", "Kotlin", "Firebase", "Android Studio"],
  },
  {
    name: "Personal Projects",
    logo: personal,
    role: "Backend Developer",
    duration: "2021 – Present",
    overview: "Built scalable backend systems using Python, Flask, and FastAPI for web and mobile applications.",
    responsibilities: [
      "Developed 10+ REST APIs with 99.9% uptime",
      "Deployed applications on AWS and cloud platforms",
      "Implemented secure authentication systems",
    ],
    projects: ["BuddyCode Web", "Confess Server", "Local Share"],
    tech: ["Python", "Flask", "FastAPI", "AWS"],
  },
];

const ExperienceSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [prev, setPrev] = useState<number | null>(null);
  const [tapped, setTapped] = useState<number | null>(null);
  const [crashing, setCrashing] = useState(false);
  const sectionRef = useRef(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Gentle scroll into view — only if panel is out of viewport
  useEffect(() => {
    if (expanded === null) return;
    const timeout = setTimeout(() => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const inView = rect.top >= 80 && rect.bottom <= window.innerHeight - 40;
      if (!inView) {
        const y = window.scrollY + rect.top - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 480);
    return () => clearTimeout(timeout);
  }, [expanded]);

  const handleClick = useCallback((i: number) => {
    if (expanded === i) {
      // closing — crash animation then close
      setCrashing(true);
      setTimeout(() => {
        setCrashing(false);
        setPrev(i);
        setExpanded(null);
      }, 380);
    } else if (expanded !== null) {
      // switching — crash old, slide in new simultaneously
      setCrashing(true);
      setTimeout(() => {
        setCrashing(false);
        setPrev(expanded);
        setExpanded(i);
        setTapped(i);
      }, 320);
    } else {
      setPrev(null);
      setExpanded(i);
      setTapped(i);
    }
  }, [expanded]);

  const ec = expanded !== null ? companies[expanded] : null;

  return (
    <section id="experience" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: "easeOut" }}>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={16} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">Experience</p>
          </div>
          <h2 className="font-display font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
            Where I've <span className="text-gradient">Worked</span>
          </h2>
        </motion.div>

        {/* Fixed container — no layout shift */}
        <div
          ref={panelRef}
          className="relative overflow-hidden"
          style={{
            height: expanded !== null || crashing ? "auto" : 0,
            minHeight: expanded !== null || crashing ? 280 : 0,
            transition: "min-height 0.45s cubic-bezier(0.25,0.1,0.25,1), height 0.45s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <AnimatePresence mode="sync">
            {ec && !crashing && (
              <motion.div
                key={expanded}
                initial={{ opacity: 0, x: 70, scale: 0.97, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  x: -70,
                  scale: 0.96,
                  filter: "blur(6px)",
                  transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
                }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card/90 backdrop-blur-md">
                  <div className="h-1 w-full" style={{ background: THEME_GRADIENT }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 0% 50%, hsl(${THEME_COLOR} / 0.08) 0%, transparent 55%)` }} />

                  <button
                    onClick={() => handleClick(expanded!)}
                    className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-muted/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
                  >
                    <X size={16} />
                  </button>

                  <div className="relative z-10 p-6 md:p-8 flex flex-col gap-5">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl flex items-center justify-center border border-primary/20 w-14 h-14 bg-primary/10 overflow-hidden">
                          <img src={ec.logo} alt={ec.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl">{ec.name}</h3>
                          <p className="font-display font-medium text-sm md:text-base text-primary">{ec.role}</p>
                        </div>
                      </div>
                      <motion.div
                        className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-display font-semibold backdrop-blur-md border border-primary/30 bg-primary/15 text-primary"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                      >
                        <Calendar size={13} />
                        {ec.duration}
                      </motion.div>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{ec.overview}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Zap size={14} className="text-primary" />
                          <span className="text-xs font-display font-semibold tracking-premium text-primary">Key Highlights</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {ec.projects.map((h, idx) => (
                            <motion.div
                              key={h}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 bg-muted/30 border border-border/50 text-sm text-foreground"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 + idx * 0.07, duration: 0.4, ease: "easeOut" }}
                            >
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
                            <motion.li
                              key={r}
                              className="flex items-start gap-2 text-muted-foreground text-sm"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + idx * 0.08, duration: 0.4, ease: "easeOut" }}
                            >
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
                            <motion.span
                              key={p}
                              className="rounded-full font-medium border border-primary/25 text-primary bg-primary/[0.06] px-3 py-1 text-xs"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.25 + idx * 0.06, duration: 0.35, ease: "easeOut" }}
                            >
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
                            <motion.span
                              key={t}
                              className="rounded-md border border-border text-muted-foreground px-2.5 py-1 text-xs"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + idx * 0.06, duration: 0.35, ease: "easeOut" }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="h-[2px] w-full"
                    style={{ background: THEME_GRADIENT }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            )}

            {/* Crash overlay — flashes on close/switch */}
            {crashing && (
              <motion.div
                key="crash"
                className="absolute inset-0 rounded-2xl z-40 pointer-events-none"
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: [0, 0.35, 0.15, 0.4, 0],
                  scale: [1, 1.01, 0.99, 1.005, 0.97],
                  x: [0, -6, 5, -3, 0],
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, hsl(${THEME_COLOR} / 0.5) 0%, transparent 70%)`,
                  boxShadow: `0 0 40px hsl(${THEME_COLOR} / 0.4), inset 0 0 30px hsl(${THEME_COLOR} / 0.2)`,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4"
        >
          {companies.map((company, i) => {
            const isHovered = hovered === i;
            const isExpanded = expanded === i;
            const isTapped = tapped === i;

            return (
              <motion.div
                key={company.name}
                className="relative cursor-pointer group"
                onClick={() => handleClick(i)}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: isExpanded ? 0.55 : 1, y: 0, scale: isExpanded ? 0.97 : 1 } : {}}
                transition={{ duration: 0.55, delay: isInView ? 0.08 * i : 0, ease: "easeOut" }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden border bg-card/50 backdrop-blur-sm h-[200px] md:h-[240px]"
                  animate={{
                    borderColor: isExpanded ? `hsl(${THEME_COLOR} / 0.7)` : isHovered ? `hsl(${THEME_COLOR} / 0.5)` : undefined,
                    boxShadow: isExpanded
                      ? `0 0 18px hsl(${THEME_COLOR} / 0.25)`
                      : isHovered
                      ? `0 0 24px hsl(${THEME_COLOR} / 0.15), inset 0 0 24px hsl(${THEME_COLOR} / 0.04)`
                      : "none",
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none">
                    <img src={company.logo} alt="" className="w-28 h-28 object-contain opacity-[0.04] blur-[1px]" />
                  </div>

                  <motion.div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ background: `radial-gradient(ellipse at 30% 30%, hsl(${THEME_COLOR} / ${isHovered ? 0.15 : 0.06}) 0%, transparent 70%)` }}
                  />

                  <AnimatePresence>
                    {isTapped && expanded === i && (
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] z-20"
                        style={{ background: THEME_GRADIENT }}
                        initial={{ top: 0, opacity: 0 }}
                        animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                        onAnimationComplete={() => setTapped(null)}
                      />
                    )}
                  </AnimatePresence>

                  {isHovered && (
                    <>
                      <motion.div
                        className="absolute top-0 left-0 w-8 h-8 z-10"
                        style={{ borderTop: `2px solid hsl(${THEME_COLOR})`, borderLeft: `2px solid hsl(${THEME_COLOR})`, borderRadius: "16px 0 0 0" }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: 1 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-8 h-8 z-10"
                        style={{ borderBottom: `2px solid hsl(${THEME_COLOR})`, borderRight: `2px solid hsl(${THEME_COLOR})`, borderRadius: "0 0 16px 0" }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: 1 }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 1.2, ease: "easeInOut" }}
                      />
                    </>
                  )}

                  {isExpanded && (
                    <motion.div
                      className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: THEME_GRADIENT }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Code2 size={12} className="text-background" />
                    </motion.div>
                  )}

                  <div className="relative z-10 flex flex-col justify-end h-full p-5">
                    <motion.div animate={{ y: isHovered ? -6 : 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center mb-1">
                        <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <h3 className="font-display font-bold mt-2 text-base md:text-lg">{company.name}</h3>
                      <p className="font-display font-medium text-xs md:text-sm text-primary">{company.role}</p>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-xs md:text-sm leading-relaxed">{company.overview}</p>
                      <p className="text-foreground/50 font-medium text-xs mt-2">{company.duration}</p>
                    </motion.div>

                    <AnimatePresence>
                      {isHovered && !isExpanded && (
                        <motion.div
                          className="flex items-center gap-1 mt-3 text-xs font-display text-primary"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <span>Click to expand</span>
                          <ChevronRight size={12} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {company.tech.map((t) => (
                    <span key={t} className="rounded-md font-medium bg-muted/50 text-muted-foreground border border-border/40 px-2 py-0.5 text-xs">{t}</span>
                  ))}
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