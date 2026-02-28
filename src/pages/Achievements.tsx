import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Award, Lightbulb, Code, ExternalLink, Calendar, BadgeCheck } from "lucide-react";
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
    emoji: "🏆",
    photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
  {
    category: "Patent",
    title: "Software Innovation Patent",
    description: "Filed a patent for an innovative software solution recognized with intellectual property protection.",
    date: "2024",
    status: "Filed",
    emoji: "💡",
    photo: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
  },
  {
    category: "Certification",
    title: "Google Android Developer",
    description: "Certified by Google for proficiency in Android application development using modern tools and practices.",
    date: "2023",
    status: "Certified",
    emoji: "📱",
    photo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
  },
  {
    category: "Hackathon",
    title: "College Hackathon Winner",
    description: "Won first place in an inter-college hackathon with an innovative mobile application solution.",
    date: "2023",
    status: "Winner",
    emoji: "🥇",
    photo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
  },
  {
    category: "Certification",
    title: "Python Backend Development",
    description: "Completed advanced certification in Python backend development covering Flask, FastAPI, and cloud deployment.",
    date: "2023",
    status: "Certified",
    emoji: "🐍",
    photo: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
  },
  {
    category: "Achievement",
    title: "Published on Play Store",
    description: "Successfully published multiple Android applications on Google Play Store with thousands of downloads.",
    date: "2022",
    status: "Published",
    emoji: "🚀",
    photo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
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
              <Trophy size={16} /> HALL OF HONORS
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-4">
              Achievements & <span className="text-gradient">Milestones</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
              Every certificate earned, every hackathon conquered, every milestone reached — 
              each one backed by hours of effort and dedication.
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
                <p className="font-display text-3xl font-extrabold">{stat.number}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Cards — Certificate / Honor Frame Style */}
      <section className="section-padding relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="space-y-10">
            {achievements.map((a, i) => (
              <motion.div key={i} variants={item}>
                <div className="group relative">
                  {/* Certificate frame */}
                  <div className="relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 transition-all duration-500">
                    <div className="flex flex-col md:flex-row">
                      {/* Photo section */}
                      <div className="relative md:w-[280px] lg:w-[340px] flex-shrink-0 overflow-hidden">
                        <div className="aspect-[4/3] md:aspect-auto md:h-full">
                          <img
                            src={a.photo}
                            alt={a.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Photo overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card" />
                        </div>
                        {/* Emoji badge on photo */}
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg">
                          <span className="text-2xl">{a.emoji}</span>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                        {/* Top meta */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold tracking-wider uppercase">
                            <BadgeCheck size={12} />
                            {a.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar size={12} />
                            {a.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl md:text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors">
                          {a.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-md">
                          {a.description}
                        </p>

                        {/* Status badge */}
                        <div className="flex items-center gap-3">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/15">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-bold text-primary">{a.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upload prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="card-premium rounded-2xl p-8 md:p-10 max-w-2xl mx-auto">
              <ExternalLink className="text-primary mx-auto mb-4" size={28} />
              <h3 className="font-display text-lg font-bold mb-2">Want to add your own photos?</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                Replace the placeholder images with actual photos from your hackathons, certifications, 
                and events to make this page truly yours.
              </p>
              <p className="text-xs text-muted-foreground/60">
                Upload images in chat and I'll place them here
              </p>
            </div>
          </motion.div>

          <div className="text-center mt-10">
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
