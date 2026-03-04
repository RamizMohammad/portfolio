import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Briefcase, Calendar, ChevronRight, Zap } from "lucide-react";

const companies = [
  {
    name: "Freelance Projects",
    logo: "🚀",
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
    color: "152 100% 50%",
  },
  {
    name: "Personal Projects",
    logo: "💻",
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
    color: "216 100% 50%",
  },
  {
    name: "Bluestock Fintech",
    logo: "🏢",
    role: "Software Development Engineer",
    duration: "May 2025 – June 2025",
    overview: "Interned at Bluestock Fintech, led a team to build the admin panel design.",
    responsibilities: [
      "Led a team as the project lead",
      "Built the complete admin panel",
      "Designed and implemented frontend architecture",
    ],
    projects: ["Admin Panel"],
    tech: ["Flask", "Web Design"],
    color: "270 100% 60%",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setSelected((prev) => (prev + 1) % companies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const company = companies[selected];

  return (
    <section id="experience" className="section-padding relative z-10 min-h-[100svh] flex items-center" ref={ref}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={16} className="text-primary" />
            <p className="text-primary font-display font-medium tracking-premium text-sm">Experience</p>
          </div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl">
            Where I've <span className="text-gradient">Worked</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
          {/* Left: Timeline tabs */}
          <motion.div
            className="flex flex-row lg:flex-col gap-3 lg:w-[300px] flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {companies.map((c, i) => {
              const isActive = selected === i;
              return (
                <button
                  key={c.name}
                  onClick={() => { setAutoPlay(false); setSelected(i); }}
                  className={`relative text-left rounded-xl transition-all duration-400 group flex-1 lg:flex-none overflow-hidden p-3 md:p-4 ${
                    isActive ? "bg-card border-border" : "bg-transparent border-transparent hover:bg-card/50"
                  } border`}
                >
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                      style={{ background: `hsl(${c.color})` }}
                      layoutId="exp-indicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {isActive && autoPlay && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{ background: `hsl(${c.color} / 0.4)` }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      key={`progress-${selected}`}
                    />
                  )}

                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl">{c.logo}</span>
                    <div className="min-w-0">
                      <h4
                        className={`font-display font-bold truncate transition-colors text-sm md:text-base ${
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {c.name}
                      </h4>
                      <p className="text-muted-foreground/60 truncate text-xs md:text-sm">
                        {c.role}
                      </p>
                    </div>
                    {isActive && (
                      <ChevronRight size={16} className="text-primary ml-auto flex-shrink-0 hidden lg:block" />
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right: Detail card */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden p-5 md:p-7 lg:p-8"
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 80% 20%, hsl(${company.color} / 0.3) 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="rounded-xl flex items-center justify-center border border-border w-12 h-12 md:w-14 md:h-14"
                        style={{ background: `hsl(${company.color} / 0.1)` }}
                      >
                        <span className="text-2xl md:text-3xl">{company.logo}</span>
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-lg md:text-xl lg:text-2xl">{company.name}</h3>
                        <p className="text-primary font-display font-medium text-sm md:text-base">
                          {company.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground/60 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs md:text-sm">
                      <Calendar size={14} />
                      {company.duration}
                    </div>
                  </div>

                  {/* Overview */}
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-5">
                    {company.overview}
                  </p>

                  {/* Two-column layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="font-display font-semibold text-primary tracking-premium flex items-center gap-2 text-xs md:text-sm mb-3">
                        <Zap size={14} /> Key Responsibilities
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {company.responsibilities.map((r, idx) => (
                          <motion.li
                            key={r}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx + 0.2 }}
                            className="flex items-start gap-2 text-muted-foreground text-sm md:text-base"
                          >
                            <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                            {r}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects & Tech */}
                    <div className="flex flex-col gap-4">
                      <div>
                        <h4 className="font-display font-semibold text-primary tracking-premium text-xs md:text-sm mb-2">
                          Projects
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {company.projects.map((p) => (
                            <span
                              key={p}
                              className="rounded-full font-medium border px-3 py-1 text-xs md:text-sm"
                              style={{
                                background: `hsl(${company.color} / 0.1)`,
                                borderColor: `hsl(${company.color} / 0.2)`,
                                color: `hsl(${company.color})`,
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display font-semibold text-primary tracking-premium text-xs md:text-sm mb-2">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {company.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-border text-muted-foreground px-2.5 py-1 text-xs md:text-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
