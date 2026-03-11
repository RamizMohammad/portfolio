import { AnimatePresence, motion, useInView } from "framer-motion";
import { Briefcase, Cloud, Code2, Layers, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const skillProjects: Record<string, { project: string; context: string }[]> = {
  Kotlin: [
    { project: "Confess App", context: "Primary language for Android UI & logic" },
    { project: "Share Wheels", context: "Core app development with Jetpack" },
    { project: "BuddyCode", context: "Android client implementation" },
  ],
  Python: [
    { project: "Sourcing Agent", context: "Agentic AI pipeline orchestration" },
    { project: "BuddyCode Web", context: "Backend API services" },
    { project: "OCR Accuracy Report Pipeline", context: "Data processing & automation" },
    { project: "Confess Server", context: "REST API backend" },
  ],
  TypeScript: [
    { project: "BuddyCode Web", context: "Frontend type-safe development" },
    { project: "Admin Panel", context: "UI components & state management" },
  ],
  Java: [
    { project: "Confess App", context: "Legacy Android modules" },
    { project: "Share Wheels", context: "Initial Android development" },
  ],
  SQL: [
    { project: "Supplier Invoice Accuracy", context: "Data querying & reporting" },
    { project: "BuddyCode Web", context: "Database schema & queries" },
  ],
  "C++": [
    { project: "Personal Projects", context: "Algorithms & system programming" },
  ],
  "Jetpack Compose": [
    { project: "Confess App", context: "Modern declarative Android UI" },
    { project: "BuddyCode", context: "Full UI built in Compose" },
    { project: "Share Wheels", context: "UI screens & navigation" },
  ],
  Django: [
    { project: "Local Share", context: "Web server & routing" },
    { project: "BuddyCode Web", context: "Backend framework" },
  ],
  React: [
    { project: "Admin Panel", context: "Full frontend SPA" },
    { project: "BuddyCode Web", context: "User dashboard" },
  ],
  FastAPI: [
    { project: "Sourcing Agent", context: "High-performance API endpoints" },
    { project: "Supplier Invoice Accuracy", context: "Data pipeline APIs" },
    { project: "Confess Server", context: "Async REST backend" },
  ],
  Docker: [
    { project: "BuddyCode Web", context: "Containerized deployment" },
    { project: "Confess Server", context: "Production container setup" },
  ],
  Git: [
    { project: "All Projects", context: "Version control & collaboration" },
  ],
  Android: [
    { project: "Confess App", context: "Full Android app on Play Store" },
    { project: "Share Wheels", context: "Android app on Play Store" },
    { project: "BuddyCode", context: "Android client" },
  ],
  Firebase: [
    { project: "Confess App", context: "Auth, Firestore & push notifications" },
    { project: "BuddyCode", context: "Real-time database & analytics" },
    { project: "Share Wheels", context: "Cloud messaging & storage" },
  ],
  AWS: [
    { project: "BuddyCode Web", context: "EC2 & S3 deployment" },
    { project: "Confess Server", context: "CloudWatch & hosting" },
  ],
  PostgreSQL: [
    { project: "Supplier Invoice Accuracy", context: "Primary database" },
    { project: "BuddyCode Web", context: "Relational data storage" },
  ],
  Linux: [
    { project: "BuddyCode Web", context: "Server administration" },
    { project: "OCR Accuracy Report Pipeline", context: "Script automation" },
  ],
  Figma: [
    { project: "Admin Panel", context: "UI/UX design & prototyping" },
    { project: "Confess App", context: "App design mockups" },
  ],
  "Vertex AI": [
    { project: "Sourcing Agent", context: "LLM & AI model hosting" },
    { project: "OCR Accuracy Report Pipeline", context: "AI-powered extraction" },
  ],
};

const categories = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Kotlin", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Python", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TypeScript", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Java", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "SQL", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "C++", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    ],
  },
  {
    title: "Frameworks & Tools",
    icon: Layers,
    skills: [
      { name: "Jetpack Compose", level: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetpackcompose/jetpackcompose-original.svg" },
      { name: "Django", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "React", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "FastAPI", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Docker", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    ],
  },
  {
    title: "Platforms & Services",
    icon: Cloud,
    skills: [
      { name: "Android", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { name: "Firebase", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
      { name: "AWS", level: 72, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "PostgreSQL", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Linux", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Figma", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    ],
  },
];

const THEME_COLOR = "152 100% 50%";
const THEME_GRADIENT = "linear-gradient(135deg, hsl(152 100% 50%), hsl(216 100% 50%))";

const SkillCard = ({
  skill,
  delay,
  isInView,
  onTap,
  isSelected,
}: {
  skill: { name: string; level: number; icon: string };
  delay: number;
  isInView: boolean;
  onTap: () => void;
  isSelected: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: delay * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onTap}
      className="group relative flex flex-col items-center rounded-2xl border bg-card/50 transition-all duration-300 cursor-pointer select-none"
      style={{
        padding: "clamp(6px, 1.2vh, 16px)",
        gap: "clamp(4px, 0.8vh, 12px)",
        borderColor: isSelected ? `hsl(${THEME_COLOR} / 0.7)` : undefined,
        boxShadow: isSelected
          ? `0 0 18px hsl(${THEME_COLOR} / 0.25), inset 0 0 20px hsl(${THEME_COLOR} / 0.06)`
          : hovered
          ? `0 0 14px hsl(${THEME_COLOR} / 0.12)`
          : undefined,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered || isSelected ? 1 : 0,
          boxShadow: "inset 0 0 30px hsl(152 100% 50% / 0.05)",
          background: isSelected
            ? `radial-gradient(ellipse at 50% 0%, hsl(${THEME_COLOR} / 0.1) 0%, transparent 70%)`
            : undefined,
        }}
      />

      {isSelected && (
        <motion.div
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ background: `hsl(${THEME_COLOR})` }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      <motion.div
        animate={hovered || isSelected ? { y: -3, scale: 1.1 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex items-center justify-center"
        style={{ width: "clamp(2rem, 4vh, 3rem)", height: "clamp(2rem, 4vh, 3rem)" }}
      >
        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain drop-shadow-lg" />
      </motion.div>

      <span className="font-display font-semibold text-foreground text-center leading-tight" style={{ fontSize: "clamp(9px, 1.1vh, 12px)" }}>
        {skill.name}
      </span>

      <div className="w-full rounded-full bg-muted overflow-hidden" style={{ height: "clamp(3px, 0.5vh, 6px)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: THEME_GRADIENT }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay * 0.06 + 0.3, ease: "easeOut" }}
        />
      </div>

      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={hovered || isSelected ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        className="text-primary font-display font-bold"
        style={{ fontSize: "clamp(7px, 0.9vh, 10px)" }}
      >
        {skill.level}%
      </motion.span>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; icon: string } | null>(null);
  const [prevSkill, setPrevSkill] = useState<{ name: string; icon: string } | null>(null);
  const [crashing, setCrashing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSkillTap = useCallback((skill: { name: string; icon: string }) => {
    if (selectedSkill?.name === skill.name) {
      // closing — crash then close
      setCrashing(true);
      setTimeout(() => {
        setCrashing(false);
        setPrevSkill(skill);
        setSelectedSkill(null);
      }, 380);
    } else if (selectedSkill !== null) {
      // switching — crash old, slide in new simultaneously
      setCrashing(true);
      setTimeout(() => {
        setCrashing(false);
        setPrevSkill(selectedSkill);
        setSelectedSkill(skill);
      }, 320);
    } else {
      // fresh open
      setPrevSkill(null);
      setSelectedSkill(skill);
      setTimeout(() => {
        if (!panelRef.current) return;
        const rect = panelRef.current.getBoundingClientRect();
        const inView = rect.top >= 80 && rect.bottom <= window.innerHeight - 40;
        if (!inView) {
          const y = window.scrollY + rect.top - 160;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 480);
    }
  }, [selectedSkill]);

  const projects = selectedSkill ? (skillProjects[selectedSkill.name] ?? []) : [];

  return (
    <section id="skills" className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={ref}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center vh-mb-header"
        >
          <p className="text-primary font-display font-medium tracking-premium vh-small" style={{ marginBottom: "clamp(2px, 0.4vh, 8px)" }}>Skills</p>
          <h2 className="font-display font-extrabold vh-heading">
            My <span className="text-gradient">Toolkit</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto vh-body mt-1">
            Tap any skill to see where I've used it
          </p>
        </motion.div>

        {/* Fixed-height panel container — no layout shift */}
        <div
          ref={panelRef}
          className="relative overflow-hidden mb-4"
          style={{
            height: selectedSkill !== null || crashing ? "auto" : 0,
            minHeight: selectedSkill !== null || crashing ? 120 : 0,
            transition: "min-height 0.45s cubic-bezier(0.25,0.1,0.25,1), height 0.45s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <AnimatePresence mode="sync">
            {selectedSkill && !crashing && (
              <motion.div
                key={selectedSkill.name}
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
                className="relative rounded-2xl border border-primary/20 bg-card/90 backdrop-blur-md overflow-hidden"
              >
                {/* top bar */}
                <div className="h-[3px] w-full" style={{ background: THEME_GRADIENT }} />

                {/* glow bg */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 10% 50%, hsl(${THEME_COLOR} / 0.07) 0%, transparent 55%)` }}
                />

                <div className="relative z-10 p-4 md:p-5 flex flex-col gap-4">
                  {/* header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                        <img src={selectedSkill.icon} alt={selectedSkill.name} className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-foreground">{selectedSkill.name}</p>
                        <p className="text-xs text-muted-foreground font-display">
                          Used in {projects.length} project{projects.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSkillTap(selectedSkill)}
                      className="w-7 h-7 rounded-full bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                    >
                      <X size={13} />
                    </button>
                  </div>

                  {/* project list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {projects.map((p, idx) => (
                      <motion.div
                        key={p.project}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06, duration: 0.35, ease: "easeOut" }}
                        className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 bg-muted/30 border border-border/50"
                      >
                        <div className="mt-0.5 w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <Briefcase size={11} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-foreground" style={{ fontSize: "11px" }}>{p.project}</p>
                          <p className="text-muted-foreground leading-snug" style={{ fontSize: "10px" }}>{p.context}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="h-[2px] w-full"
                  style={{ background: THEME_GRADIENT }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                />
              </motion.div>
            )}

            {/* Crash overlay */}
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

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.5vh, 3rem)" }}>
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            >
              <div className="flex items-center" style={{ gap: "clamp(0.5rem, 1vh, 0.75rem)", marginBottom: "clamp(0.5rem, 1vh, 1.5rem)" }}>
                <div
                  className="rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"
                  style={{ width: "clamp(1.5rem, 2.5vh, 2rem)", height: "clamp(1.5rem, 2.5vh, 2rem)" }}
                >
                  <cat.icon style={{ width: "clamp(10px, 1.5vh, 16px)", height: "clamp(10px, 1.5vh, 16px)" }} className="text-primary" />
                </div>
                <h3 className="font-display font-bold tracking-premium text-foreground vh-small">{cat.title}</h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6" style={{ gap: "clamp(0.4rem, 0.8vh, 0.75rem)" }}>
                {cat.skills.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={catIdx * 6 + i}
                    isInView={isInView}
                    onTap={() => handleSkillTap(skill)}
                    isSelected={selectedSkill?.name === skill.name}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;