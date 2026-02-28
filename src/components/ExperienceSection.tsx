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
    <section id="experience" className="section-padding relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">Experience</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Where I've <span className="text-gradient">worked</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
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
                  className="absolute flex flex-col items-center gap-4"
                >
                  <div className="w-32 h-32 rounded-full bg-card border-2 border-border flex items-center justify-center glow-md">
                    <span className="text-6xl">{company.logo}</span>
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-center">{company.name}</h3>
                  <p className="text-muted-foreground font-display text-sm">{company.role}</p>
                  <p className="text-muted-foreground/60 text-xs tracking-premium">{company.duration}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => goTo(-1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:-translate-y-0.5">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {companies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAutoPlay(false); setDirection(i > selected ? 1 : -1); setSelected(i); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selected === i ? "bg-primary w-6 glow-sm" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                  />
                ))}
              </div>
              <button onClick={() => goTo(1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:-translate-y-0.5">
                <ChevronRight size={20} />
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
                className="w-full h-full p-5 pt-12 overflow-y-auto phone-screen-content space-y-4"
              >
                <div className="text-center">
                  <span className="text-4xl">{company.logo}</span>
                  <h3 className="font-display font-bold text-sm mt-2">{company.name}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Briefcase size={12} className="text-primary" />
                    {company.role}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={12} className="text-primary" />
                    {company.duration}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 size={12} className="text-primary" />
                    {company.overview}
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-xs font-semibold text-primary mb-2 tracking-premium">Key Responsibilities</h4>
                  <ul className="space-y-1.5">
                    {company.responsibilities.map((r) => (
                      <li key={r} className="text-[11px] text-muted-foreground flex gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-xs font-semibold text-primary mb-2 tracking-premium">Projects</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {company.projects.map((p) => (
                      <span key={p} className="px-2 py-1 rounded-full bg-primary/10 text-[10px] text-primary font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-xs font-semibold text-primary mb-2 tracking-premium">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {company.tech.map((t) => (
                      <span key={t} className="px-2 py-1 rounded-full border border-border text-[10px] text-muted-foreground">
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
