import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Layers, Cloud } from "lucide-react";

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

const SkillCard = ({
  skill,
  delay,
  isInView,
}: {
  skill: { name: string; level: number; icon: string };
  delay: number;
  isInView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: delay * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-400 cursor-default"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 30px hsl(152 100% 50% / 0.05), 0 0 20px hsl(152 100% 50% / 0.08)" }}
      />

      {/* Icon */}
      <motion.div
        animate={hovered ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-12 h-12 flex items-center justify-center"
      >
        <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Name */}
      <span className="font-display font-semibold text-xs text-foreground text-center leading-tight">
        {skill.name}
      </span>

      {/* Level bar */}
      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(152 100% 50%), hsl(216 100% 50%))" }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay * 0.06 + 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Level tooltip on hover */}
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        className="text-[10px] text-primary font-display font-bold"
      >
        {skill.level}%
      </motion.span>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">Skills</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            My <span className="text-gradient">Toolkit</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <cat.icon size={16} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-sm tracking-premium text-foreground">{cat.title}</h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {cat.skills.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={catIdx * 6 + i}
                    isInView={isInView}
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
