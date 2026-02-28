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
    <section className="section-padding relative z-10" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">Achievements</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Certifications, awards & <span className="text-gradient">milestones</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative card-premium p-6 text-center overflow-hidden"
            >
              {/* Gradient accent line at top */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 opacity-90 group-hover:opacity-100 transition-all group-hover:scale-110`}>
                <item.icon size={28} className="text-primary-foreground" />
              </div>

              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 px-8 py-3.5 btn-premium group"
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
