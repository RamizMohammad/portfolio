import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Award, Lightbulb, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: Award, number: "12+", label: "Certifications" },
  { icon: Trophy, number: "3", label: "Hackathon Wins" },
  { icon: Lightbulb, number: "1", label: "Patent Filed" },
  { icon: Code, number: "15+", label: "Projects Built" },
];

const achievements = [
  {
    category: "Hackathon",
    title: "Smart India Hackathon Finalist",
    description: "Competed in India's largest hackathon, developing innovative solutions for real-world government problems.",
    date: "2024",
    status: "Finalist",
    icon: "🏆",
  },
  {
    category: "Patent",
    title: "Software Innovation Patent",
    description: "Filed a patent for an innovative software solution recognized with intellectual property protection.",
    date: "2024",
    status: "Filed",
    icon: "💡",
  },
  {
    category: "Certification",
    title: "Google Android Developer",
    description: "Certified by Google for proficiency in Android application development using modern tools and practices.",
    date: "2023",
    status: "Certified",
    icon: "📱",
  },
  {
    category: "Hackathon",
    title: "College Hackathon Winner",
    description: "Won first place in an inter-college hackathon with an innovative mobile application solution.",
    date: "2023",
    status: "Winner",
    icon: "🥇",
  },
  {
    category: "Certification",
    title: "Python Backend Development",
    description: "Completed advanced certification in Python backend development covering Flask, FastAPI, and cloud deployment.",
    date: "2023",
    status: "Certified",
    icon: "🐍",
  },
  {
    category: "Achievement",
    title: "Published on Play Store",
    description: "Successfully published multiple Android applications on Google Play Store with thousands of downloads.",
    date: "2022",
    status: "Published",
    icon: "🚀",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Achievements = () => {
  return (
    <div className="relative min-h-screen">
      <div className="checkerboard-bg" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 section-padding relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-display font-semibold mb-6">
              <Trophy size={16} /> MY JOURNEY
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Achievements</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Certifications, awards, and milestones that define my professional journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <stat.icon className="text-primary mx-auto mb-3" size={28} />
                <p className="font-display text-2xl font-bold">{stat.number}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Cards */}
      <section className="section-padding relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                variants={item}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{a.icon}</span>
                  <div className="flex-1">
                    <span className="text-[10px] font-display font-semibold text-primary uppercase tracking-wider">{a.category}</span>
                    <h3 className="font-display font-bold mt-1 mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">{a.date}</span>
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">{a.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow-sm"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Achievements;
