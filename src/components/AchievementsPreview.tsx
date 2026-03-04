import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Trophy, Lightbulb, Award, ArrowRight } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Hackathon Winner",
    description: "Multiple hackathon victories showcasing innovation and problem-solving skills across national-level competitions.",
    color: "from-primary to-secondary",
  },
  {
    icon: Lightbulb,
    title: "Patent Holder",
    description: "Innovative solutions recognized with intellectual property protection for novel technical inventions.",
    color: "from-secondary to-[hsl(270_100%_60%)]",
  },
  {
    icon: Award,
    title: "Certified Developer",
    description: "Industry-recognized certifications in Android development, cloud computing, and backend engineering.",
    color: "from-primary to-accent",
  },
];

const AchievementsPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative z-10 min-h-[100svh] flex flex-col justify-center" ref={ref}>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center vh-mb-header"
        >
          <p className="text-primary font-display font-medium tracking-premium vh-small" style={{ marginBottom: "clamp(2px, 0.4vh, 8px)" }}>Achievements</p>
          <h2 className="font-display font-extrabold vh-heading">
            Certifications, awards & <span className="text-gradient">milestones</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3" style={{ gap: "clamp(0.75rem, 1.5vh, 1.5rem)" }}>
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative card-premium text-center overflow-hidden"
              style={{ padding: "clamp(1rem, 2.5vh, 1.5rem)" }}
            >
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className={`mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all group-hover:scale-110`}
                style={{ width: "clamp(2.5rem, 6vh, 4rem)", height: "clamp(2.5rem, 6vh, 4rem)", marginBottom: "clamp(0.5rem, 1.2vh, 1rem)" }}
              >
                <item.icon style={{ width: "clamp(16px, 3vh, 28px)", height: "clamp(16px, 3vh, 28px)" }} className="text-primary-foreground" />
              </div>

              <h3 className="font-display font-bold group-hover:text-primary transition-colors vh-body" style={{ marginBottom: "clamp(4px, 0.5vh, 8px)" }}>
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed vh-small">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
          style={{ marginTop: "clamp(1rem, 2.5vh, 2.5rem)" }}
        >
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 btn-premium group"
            style={{ padding: "clamp(8px, 1.5vh, 14px) clamp(16px, 3vh, 32px)", fontSize: "clamp(11px, 1.3vh, 14px)" }}
          >
            View All Achievements
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsPreview;
