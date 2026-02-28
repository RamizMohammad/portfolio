import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    title: "Languages",
    skills: [
      { name: "Kotlin", level: 95 },
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Java", level: 88 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    title: "Frameworks & Tools",
    skills: [
      { name: "Jetpack Compose", level: 92 },
      { name: "Django", level: 85 },
      { name: "React", level: 80 },
      { name: "FastAPI", level: 88 },
      { name: "Docker", level: 75 },
    ],
  },
  {
    title: "Platforms & Services",
    skills: [
      { name: "Android SDK", level: 95 },
      { name: "Firebase", level: 88 },
      { name: "AWS", level: 72 },
      { name: "PostgreSQL", level: 82 },
      { name: "Git", level: 90 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground text-xs">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay * 0.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary font-display font-medium mb-2">Skills</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            My <span className="text-gradient">toolkit</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="p-6 rounded-xl border border-border bg-card space-y-5"
            >
              <h3 className="font-display font-semibold text-primary">{cat.title}</h3>
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={catIdx * 3 + i} />
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
