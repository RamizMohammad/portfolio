import bluestock from "@/assets/companylogos/bluelogo.png";
import freelance from "@/assets/companylogos/freelance.png";
import moglix    from "@/assets/companylogos/moglix.png";
import personal  from "@/assets/companylogos/personal.png";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Briefcase, Calendar, ChevronRight, Code2, Layers, X, Zap } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";

const THEME_COLOR    = "152 100% 50%";
const THEME_GRADIENT = "linear-gradient(135deg, hsl(152 100% 50%), hsl(216 100% 50%))";
const EASE_OUT       = [0.22, 1, 0.36, 1] as const;
const EASE_IN        = [0.4,  0, 1,   1 ] as const;

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

// ─── CSS for hover effects — runs on GPU, zero JS re-renders ─────────────────
// Injected once. All hover visuals are pure CSS transitions.
const HOVER_STYLES = `
  .exp-card-inner {
    border: 1px solid hsl(var(--border));
    box-shadow: none;
    transition:
      border-color 200ms ease,
      box-shadow   200ms ease;
  }
  .exp-card-inner:hover {
    border-color: hsl(${THEME_COLOR} / 0.5);
    box-shadow: 0 0 24px hsl(${THEME_COLOR} / 0.14);
  }
  .exp-card-inner.is-expanded {
    border-color: hsl(${THEME_COLOR} / 0.7) !important;
    box-shadow: 0 0 18px hsl(${THEME_COLOR} / 0.25) !important;
  }
  .exp-card-glow {
    background: radial-gradient(ellipse at 30% 30%, hsl(${THEME_COLOR} / 0.06) 0%, transparent 70%);
    transition: background 300ms ease;
  }
  .exp-card-inner:hover .exp-card-glow {
    background: radial-gradient(ellipse at 30% 30%, hsl(${THEME_COLOR} / 0.15) 0%, transparent 70%);
  }
  .exp-card-content {
    transition: transform 250ms cubic-bezier(0.22,1,0.36,1);
  }
  .exp-card-inner:hover .exp-card-content {
    transform: translateY(-6px);
  }
  .exp-hint {
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 200ms ease, transform 200ms ease;
  }
  .exp-card-inner:hover .exp-hint {
    opacity: 1;
    transform: translateY(0);
  }
  .exp-corner-tl,
  .exp-corner-br {
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 200ms ease, transform 200ms ease;
  }
  .exp-card-inner:hover .exp-corner-tl,
  .exp-card-inner:hover .exp-corner-br {
    opacity: 0.6;
    transform: scale(1);
  }
`;

// ─── Expanded Panel ───────────────────────────────────────────────────────────
const ExpandedPanel = memo(({
  company,
  onClose,
}: {
  company: typeof companies[0];
  onClose: () => void;
}) => (
  <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card/90 backdrop-blur-md">
    <div className="h-1 w-full" style={{ background: THEME_GRADIENT }} />
    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 0% 50%, hsl(${THEME_COLOR} / 0.08) 0%, transparent 55%)` }} />

    <button
      onClick={onClose}
      className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-muted/60 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
    >
      <X size={16} />
    </button>

    <div className="relative z-10 p-6 md:p-8 flex flex-col gap-5">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-start gap-4">
          <div className="rounded-xl flex items-center justify-center border border-primary/20 w-14 h-14 bg-primary/10 overflow-hidden">
            <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl md:text-2xl lg:text-3xl">{company.name}</h3>
            <p className="font-display font-medium text-sm md:text-base text-primary">{company.role}</p>
          </div>
        </div>
        <motion.div
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-display font-semibold backdrop-blur-md border border-primary/30 bg-primary/15 text-primary"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.32, ease: EASE_OUT }}
        >
          <Calendar size={13} />
          {company.duration}
        </motion.div>
      </div>

      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{company.overview}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-primary" />
            <span className="text-xs font-display font-semibold tracking-premium text-primary">Key Highlights</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {company.projects.map((h, idx) => (
              <motion.div
                key={h}
                className="flex items-center gap-2 rounded-lg px-3 py-2 bg-muted/30 border border-border/50 text-sm text-foreground"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05, duration: 0.28, ease: EASE_OUT }}
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
            {company.responsibilities.map((r, idx) => (
              <motion.li
                key={r}
                className="flex items-start gap-2 text-muted-foreground text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.055, duration: 0.28, ease: EASE_OUT }}
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
            {company.projects.map((p, idx) => (
              <motion.span
                key={p}
                className="rounded-full font-medium border border-primary/25 text-primary bg-primary/[0.06] px-3 py-1 text-xs"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.18 + idx * 0.045, duration: 0.26, ease: EASE_OUT }}
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
            {company.tech.map((t, idx) => (
              <motion.span
                key={t}
                className="rounded-md border border-border text-muted-foreground px-2.5 py-1 text-xs"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.22 + idx * 0.045, duration: 0.26, ease: EASE_OUT }}
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
      style={{ background: THEME_GRADIENT, transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.06, duration: 0.45, ease: EASE_OUT }}
    />
  </div>
));

// ─── Individual Card — memo so parent state never re-renders it ───────────────
const CompanyCard = memo(({
  company,
  index,
  isExpanded,
  isOpen,
  isTapped,
  onClick,
  onTapDone,
}: {
  company:    typeof companies[0];
  index:      number;
  isExpanded: boolean;
  isOpen:     boolean;
  isTapped:   boolean;
  onClick:    () => void;
  onTapDone:  () => void;
}) => {
  // Lift logic — all derived, no extra state
  const shouldLift  = isOpen && !isExpanded;
  const cardY       = shouldLift ? -10 : 0;
  const cardScale   = isExpanded ? 0.97 : shouldLift ? 1.015 : 1;
  const cardOpacity = isExpanded ? 0.6 : 1;
  const liftShadow  = shouldLift
    ? "0 20px 44px rgba(0,0,0,0.5), 0 8px 18px rgba(0,0,0,0.32)"
    : undefined;

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      animate={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
      transition={
        shouldLift
          ? { type: "spring", stiffness: 280, damping: 24 }
          : { type: "tween",  duration: 0.35, ease: EASE_OUT }
      }
    >
      {/* Inner card — hover effects are pure CSS (see HOVER_STYLES) */}
      <div
        className={`exp-card-inner relative rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm h-[200px] md:h-[240px]${isExpanded ? " is-expanded" : ""}`}
        style={liftShadow ? { boxShadow: liftShadow } : undefined}
      >
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none">
          <img src={company.logo} alt="" className="w-28 h-28 object-contain opacity-[0.04] blur-[1px]" />
        </div>

        {/* Radial glow — CSS transition */}
        <div className="exp-card-glow absolute inset-0 pointer-events-none" />

        {/* Corner accents — CSS transition */}
        <div
          className="exp-corner-tl absolute top-0 left-0 w-8 h-8 z-10 pointer-events-none"
          style={{
            borderTop:    `2px solid hsl(${THEME_COLOR})`,
            borderLeft:   `2px solid hsl(${THEME_COLOR})`,
            borderRadius: "16px 0 0 0",
          }}
        />
        <div
          className="exp-corner-br absolute bottom-0 right-0 w-8 h-8 z-10 pointer-events-none"
          style={{
            borderBottom: `2px solid hsl(${THEME_COLOR})`,
            borderRight:  `2px solid hsl(${THEME_COLOR})`,
            borderRadius: "0 0 16px 0",
          }}
        />

        {/* Tap scan line — only on click */}
        <AnimatePresence>
          {isTapped && isExpanded && (
            <motion.div
              className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
              style={{ background: THEME_GRADIENT }}
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              onAnimationComplete={onTapDone}
            />
          )}
        </AnimatePresence>

        {/* Expanded badge */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center pointer-events-none"
              style={{ background: THEME_GRADIENT }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 22 }}
            >
              <Code2 size={12} className="text-background" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card content — CSS translateY on hover */}
        <div className="exp-card-content relative z-10 flex flex-col justify-end h-full p-5">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center mb-1">
            <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" />
          </div>
          <h3 className="font-display font-bold mt-2 text-base md:text-lg">{company.name}</h3>
          <p className="font-display font-medium text-xs md:text-sm text-primary">{company.role}</p>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs md:text-sm leading-relaxed">{company.overview}</p>
          <p className="text-foreground/50 font-medium text-xs mt-2">{company.duration}</p>

          {/* "Click to expand" hint — CSS transition, no JS */}
          {!isExpanded && (
            <div className="exp-hint flex items-center gap-1 mt-3 text-xs font-display text-primary pointer-events-none">
              <span>Click to expand</span>
              <ChevronRight size={12} />
            </div>
          )}
        </div>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {company.tech.map((t) => (
          <span key={t} className="rounded-md font-medium bg-muted/50 text-muted-foreground border border-border/40 px-2 py-0.5 text-xs">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

// ─── Main Section ─────────────────────────────────────────────────────────────
const ExperienceSection = () => {
  const [expanded,  setExpanded]  = useState<number | null>(null);
  const [switching, setSwitching] = useState(false);
  const [tapped,    setTapped]    = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  // Inject CSS once
  const stylesInjected = useRef(false);
  if (!stylesInjected.current) {
    if (typeof document !== "undefined") {
      const tag = document.createElement("style");
      tag.textContent = HOVER_STYLES;
      document.head.appendChild(tag);
      stylesInjected.current = true;
    }
  }

  const handleClick = useCallback((i: number) => {
    if (expanded === i) {
      setExpanded(null);
      setSwitching(false);
    } else if (expanded !== null) {
      setSwitching(true);
      setExpanded(i);
      setTapped(i);
      setTimeout(() => setSwitching(false), 350);
    } else {
      setSwitching(false);
      setExpanded(i);
      setTapped(i);
    }
  }, [expanded]);

  const isOpen = expanded !== null;

  const panelVariants = {
    openInitial:   { opacity: 0, y: 40,  scale: 0.95 },
    openAnimate:   { opacity: 1, y: 0,   scale: 1    },
    openExit:      { opacity: 0, y: 32,  scale: 0.96 },
    switchInitial: { opacity: 0, x: 28,  scale: 0.98 },
    switchAnimate: { opacity: 1, x: 0,   scale: 1    },
    switchExit:    { opacity: 0, x: -20, scale: 0.98 },
  };

  return (
    <section id="experience" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={sectionRef}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={16} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">Experience</p>
          </div>
          <h2 className="font-display font-extrabold leading-tight text-2xl md:text-3xl lg:text-4xl">
            Where I've <span className="text-gradient">Worked</span>
          </h2>
        </motion.div>

        <div className="relative flex flex-col gap-6">

          {/* Expanded panel — z:0, behind cards */}
          <div style={{ position: "relative", zIndex: isOpen ? 0 : -1 }}>
            <AnimatePresence mode="wait" initial={false}>
              {expanded !== null && (
                <motion.div
                  key={expanded}
                  initial={switching ? panelVariants.switchInitial : panelVariants.openInitial}
                  animate={switching ? panelVariants.switchAnimate : panelVariants.openAnimate}
                  exit={switching ? panelVariants.switchExit : panelVariants.openExit}
                  transition={{ duration: switching ? 0.26 : 0.4, ease: EASE_OUT }}
                >
                  <ExpandedPanel
                    company={companies[expanded]}
                    onClose={() => setExpanded(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cards grid — z:10 when panel open, lifts above it */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
            style={{ position: "relative", zIndex: isOpen ? 10 : 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4"
          >
            {companies.map((company, i) => (
              <CompanyCard
                key={company.name}
                company={company}
                index={i}
                isExpanded={expanded === i}
                isOpen={isOpen}
                isTapped={tapped === i}
                onClick={() => handleClick(i)}
                onTapDone={() => setTapped(null)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;