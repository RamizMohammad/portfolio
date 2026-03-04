import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PhoneFrame from "./PhoneFrame";
import { ChevronLeft, ChevronRight, Building2, Calendar, Briefcase } from "lucide-react";

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
  },
  {
    name: "Bluestock Fintech",
    logo: "🏢",
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
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setDirection(1);
      setSelected((prev) => (prev + 1) % companies.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const goTo = (dir: -1 | 1) => {
    setAutoPlay(false);
    setDirection(dir);
    setSelected((prev) => (prev + dir + companies.length) % companies.length);
  };

  const company = companies[selected];

  return (
    <section id="experience" className="section-padding relative z-10 min-h-[100svh] flex items-center" ref={ref}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="vh-mb-header"
        >
          <p className="text-primary font-display font-medium tracking-premium vh-small" style={{ marginBottom: "clamp(2px, 0.5vh, 8px)" }}>Experience</p>
          <h2 className="font-display font-extrabold vh-heading">
            Where I've <span className="text-gradient">worked</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center" style={{ gap: "clamp(2rem, 4vh, 5rem)" }}>
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative flex items-center justify-center overflow-hidden" style={{ height: "clamp(180px, 30vh, 300px)" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={selected}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: d * 200, opacity: 0, scale: 0.8 }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d: number) => ({ x: d * -200, opacity: 0, scale: 0.8 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute flex flex-col items-center" style={{ gap: "clamp(0.5rem, 1.2vh, 1rem)" }}
                >
                  <div className="rounded-full bg-card border-2 border-border flex items-center justify-center glow-md"
                    style={{ width: "clamp(4rem, 10vh, 8rem)", height: "clamp(4rem, 10vh, 8rem)" }}
                  >
                    <span style={{ fontSize: "clamp(1.5rem, 5vh, 3.5rem)" }}>{company.logo}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-center vh-subheading">{company.name}</h3>
                  <p className="text-muted-foreground font-display vh-small">{company.role}</p>
                  <p className="text-muted-foreground/60 tracking-premium" style={{ fontSize: "clamp(8px, 1vh, 12px)" }}>{company.duration}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center" style={{ gap: "clamp(0.5rem, 1vh, 1rem)", marginTop: "clamp(0.5rem, 1vh, 1.5rem)" }}>
              <button onClick={() => goTo(-1)} className="rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                style={{ width: "clamp(28px, 3.5vh, 40px)", height: "clamp(28px, 3.5vh, 40px)" }}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {companies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAutoPlay(false); setDirection(i > selected ? 1 : -1); setSelected(i); }}
                    className={`rounded-full transition-all duration-300 ${selected === i ? "bg-primary glow-sm" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                    style={{ width: selected === i ? "clamp(16px, 2vh, 24px)" : "clamp(8px, 1vh, 10px)", height: "clamp(8px, 1vh, 10px)" }}
                  />
                ))}
              </div>
              <button onClick={() => goTo(1)} className="rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                style={{ width: "clamp(28px, 3.5vh, 40px)", height: "clamp(28px, 3.5vh, 40px)" }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <PhoneFrame>
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full overflow-y-auto phone-screen-content"
                style={{ padding: "clamp(12px, 2vh, 20px)", paddingTop: "clamp(2rem, 5vh, 3rem)" }}
              >
                <div className="text-center" style={{ marginBottom: "clamp(8px, 1.5vh, 16px)" }}>
                  <span style={{ fontSize: "clamp(1.5rem, 3vh, 2.5rem)" }}>{company.logo}</span>
                  <h3 className="font-display font-bold vh-small mt-1">{company.name}</h3>
                </div>

                <div style={{ marginBottom: "clamp(8px, 1vh, 12px)" }} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-muted-foreground vh-small">
                    <Briefcase size={12} className="text-primary" />
                    {company.role}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground vh-small">
                    <Calendar size={12} className="text-primary" />
                    {company.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground vh-small">
                    <Building2 size={12} className="text-primary" />
                    {company.overview}
                  </div>
                </div>

                <div style={{ marginBottom: "clamp(6px, 1vh, 12px)" }}>
                  <h4 className="font-display font-semibold text-primary tracking-premium" style={{ fontSize: "clamp(8px, 1vh, 11px)", marginBottom: "clamp(4px, 0.5vh, 8px)" }}>Key Responsibilities</h4>
                  <ul className="space-y-1">
                    {company.responsibilities.map((r) => (
                      <li key={r} className="text-muted-foreground flex gap-2" style={{ fontSize: "clamp(8px, 1vh, 11px)" }}>
                        <span className="text-primary mt-0.5">▸</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: "clamp(6px, 1vh, 12px)" }}>
                  <h4 className="font-display font-semibold text-primary tracking-premium" style={{ fontSize: "clamp(8px, 1vh, 11px)", marginBottom: "clamp(4px, 0.5vh, 8px)" }}>Projects</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {company.projects.map((p) => (
                      <span key={p} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium" style={{ fontSize: "clamp(7px, 0.9vh, 10px)" }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-primary tracking-premium" style={{ fontSize: "clamp(8px, 1vh, 11px)", marginBottom: "clamp(4px, 0.5vh, 8px)" }}>Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {company.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full border border-border text-muted-foreground" style={{ fontSize: "clamp(7px, 0.9vh, 10px)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
