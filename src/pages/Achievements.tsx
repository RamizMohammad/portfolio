import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Award, Lightbulb, Code, Star } from "lucide-react";
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
    gradient: "from-yellow-500 to-amber-400",
    accent: "shadow-yellow-500/15",
  },
  {
    category: "Patent",
    title: "Software Innovation Patent",
    description: "Filed a patent for an innovative software solution recognized with intellectual property protection.",
    date: "2024",
    status: "Filed",
    icon: "💡",
    gradient: "from-violet-500 to-purple-400",
    accent: "shadow-violet-500/15",
  },
  {
    category: "Certification",
    title: "Google Android Developer",
    description: "Certified by Google for proficiency in Android application development using modern tools and practices.",
    date: "2023",
    status: "Certified",
    icon: "📱",
    gradient: "from-green-500 to-emerald-400",
    accent: "shadow-green-500/15",
  },
  {
    category: "Hackathon",
    title: "College Hackathon Winner",
    description: "Won first place in an inter-college hackathon with an innovative mobile application solution.",
    date: "2023",
    status: "Winner",
    icon: "🥇",
    gradient: "from-orange-500 to-yellow-400",
    accent: "shadow-orange-500/15",
  },
  {
    category: "Certification",
    title: "Python Backend Development",
    description: "Completed advanced certification in Python backend development covering Flask, FastAPI, and cloud deployment.",
    date: "2023",
    status: "Certified",
    icon: "🐍",
    gradient: "from-blue-500 to-cyan-400",
    accent: "shadow-blue-500/15",
  },
  {
    category: "Achievement",
    title: "Published on Play Store",
    description: "Successfully published multiple Android applications on Google Play Store with thousands of downloads.",
    date: "2022",
    status: "Published",
    icon: "🚀",
    gradient: "from-red-500 to-rose-400",
    accent: "shadow-red-500/15",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
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
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-4">
              Hall of <span className="text-gradient">Honors</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-base">
              Certifications, awards, and milestones — each framed as a moment of pride
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
                className="text-center p-6 rounded-xl card-premium"
              >
                <stat.icon className="text-primary mx-auto mb-3" size={28} />
                <p className="font-display text-2xl font-bold">{stat.number}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honor Frames */}
      <section className="section-padding relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {achievements.map((a, i) => (
              <motion.div key={i} variants={item}>
                {/* Honor Frame */}
                <div className="group relative">
                  {/* Outer ornamental frame */}
                  <div className={`absolute -inset-[3px] rounded-[20px] bg-gradient-to-br ${a.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                  <div className="absolute -inset-[1px] rounded-[19px] bg-background" />

                  {/* Inner ornamental border */}
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Top ornamental bar */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${a.gradient}`} />

                    <div className="bg-card/80 backdrop-blur-sm p-6 md:p-8">
                      {/* Corner ornaments */}
                      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-primary/30 rounded-tl-sm" />
                      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-primary/30 rounded-tr-sm" />
                      <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-primary/30 rounded-bl-sm" />
                      <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-primary/30 rounded-br-sm" />

                      {/* Content */}
                      <div className="relative z-10 text-center px-2 md:px-6 py-2">
                        {/* Category ribbon */}
                        <div className="mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r ${a.gradient} text-white`}>
                            <Star size={10} /> {a.category}
                          </span>
                        </div>

                        {/* Icon plaque */}
                        <div className="relative mx-auto w-20 h-20 mb-5">
                          <motion.div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${a.gradient} opacity-15 blur-xl`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${a.gradient} bg-opacity-10 border-2 border-primary/10 flex items-center justify-center shadow-xl ${a.accent}`}
                            style={{
                              background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)`,
                            }}
                          >
                            <span className="text-4xl drop-shadow-lg">{a.icon}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl md:text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors">
                          {a.title}
                        </h3>

                        {/* Decorative divider */}
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className={`h-[1px] w-8 bg-gradient-to-r from-transparent ${a.gradient}`} />
                          <Star size={10} className="text-primary/40" />
                          <div className={`h-[1px] w-8 bg-gradient-to-l from-transparent ${a.gradient}`} />
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto mb-5">
                          {a.description}
                        </p>

                        {/* Bottom plaque */}
                        <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-xl border border-border bg-background/80">
                          <span className="text-xs text-muted-foreground font-medium">{a.date}</span>
                          <div className="w-px h-4 bg-border" />
                          <span className={`text-xs font-bold bg-gradient-to-r ${a.gradient} bg-clip-text text-transparent`}>
                            {a.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom ornamental bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${a.gradient} opacity-60`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 btn-premium"
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
