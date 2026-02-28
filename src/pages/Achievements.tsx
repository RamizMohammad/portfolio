import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Award, Lightbulb, Code, ExternalLink, Calendar, BadgeCheck, Star, Sparkles, ImagePlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";

const stats = [
  { icon: Award, number: "12+", label: "Certifications", gradient: "from-primary to-primary/60" },
  { icon: Trophy, number: "3", label: "Hackathon Wins", gradient: "from-secondary to-secondary/60" },
  { icon: Lightbulb, number: "1", label: "Patent Filed", gradient: "from-accent to-accent/60" },
  { icon: Code, number: "15+", label: "Projects Built", gradient: "from-primary to-secondary" },
];

const achievements = [
  {
    category: "Patent",
    title: "Patent for Real-Time User Safety During Vehicle Commutes",
    description: "Filed a patent from the Indian Government for METHOD AND SYSTEM FOR REAL-TIME USER SAFETY DURING VEHICLE COMMUTES. Application No: 202511053637 A, Publication Date: 27 June 2025.",
    date: "2025",
    status: "Filed",
    emoji: "💡",
    photo: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    accent: "accent",
  },
  {
    category: "Internship",
    title: "Bluestock Fintech — SDE Intern",
    description: "Worked as Software Development Engineer (SDE) at Bluestock Fintech, where the team developed the admin panel using Flask Python.",
    date: "2025",
    status: "Completed",
    emoji: "💼",
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    accent: "secondary",
  },
  {
    category: "Certification",
    title: "Machine Learning A-Z (Udemy)",
    description: "Completed the Machine Learning A-Z certification on Udemy covering Machine Learning using Python & R.",
    date: "2024",
    status: "Certified",
    emoji: "🤖",
    photo: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    accent: "secondary",
  },
  {
    category: "Hackathon",
    title: "56 Hours Hackathon — KRMU University",
    description: "Finalist in the 56-hour long hackathon organized at KRMU University in Gurgaon.",
    date: "2024",
    status: "Finalist",
    emoji: "🏆",
    photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    accent: "primary",
  },
  {
    category: "Hackathon",
    title: "24 Hours Hackathon — Sharda University",
    description: "6th place Finalist in the 24-hour long hackathon organized at Sharda University in Greater Noida.",
    date: "2024",
    status: "6th Place",
    emoji: "🥇",
    photo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    accent: "primary",
  },
  {
    category: "Hackathon",
    title: "Hack For Impact — IIIT Delhi",
    description: "Participated in the E-Summit 2025 hackathon organized by IIIT Delhi.",
    date: "2025",
    status: "Participant",
    emoji: "⚡",
    photo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    accent: "secondary",
  },
  {
    category: "Hackathon",
    title: "Hackathon — NHAI & HOAI",
    description: "Participated in the hackathon organized by National Highway Authority of India and HOAI.",
    date: "2024",
    status: "Participant",
    emoji: "🛣️",
    photo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    accent: "primary",
  },
  {
    category: "Hackathon",
    title: "Build With India — Google Office",
    description: "Participated in the Build With India Hackathon organized at Google Office.",
    date: "2025",
    status: "Participant",
    emoji: "🏢",
    photo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    accent: "secondary",
  },
  {
    category: "Certification",
    title: "Deep Dive on AWS",
    description: "Completed the Deep Dive on AWS certification held over Amazon AWS.",
    date: "2024",
    status: "Certified",
    emoji: "☁️",
    photo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    accent: "primary",
  },
  {
    category: "Competition",
    title: "Flipkart GRiD 6.0 — Software Development",
    description: "Participated in Level 1: E-Commerce & Tech Quiz of Flipkart GRiD 6.0 — Software Development Track.",
    date: "2024",
    status: "Participant",
    emoji: "🛒",
    photo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    accent: "secondary",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const AchievementCard = ({ a, i }: { a: typeof achievements[0]; i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = i % 2 === 0;

  return (
    <motion.div variants={item} className="group">
      <div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl p-[1.5px]">
          <div
            className="absolute inset-[-50%] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))`,
              animation: 'spin 4s linear infinite',
            }}
          />
        </div>

        {/* Card body */}
        <div className="relative rounded-3xl bg-card border border-border/50 overflow-hidden group-hover:border-transparent transition-colors duration-500">
          <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            
            {/* Photo section with layered effects */}
            <div className="relative md:w-[45%] flex-shrink-0 overflow-hidden">
              <div className="aspect-[16/10] md:aspect-auto md:h-full relative">
                <img
                  src={a.photo}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                {/* Multi-layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent md:bg-none" />
                <div className={`absolute inset-0 hidden md:block ${
                  isEven 
                    ? 'bg-gradient-to-r from-transparent via-transparent to-card' 
                    : 'bg-gradient-to-l from-transparent via-transparent to-card'
                }`} />
                
                {/* Floating emoji with glow */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full scale-150" />
                    <div className="relative w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-md border border-border/80 flex items-center justify-center shadow-2xl">
                      <span className="text-3xl">{a.emoji}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Year overlay on photo */}
                <div className="absolute bottom-4 left-5 md:hidden">
                  <span className="font-display text-5xl font-black text-foreground/10">{a.date}</span>
                </div>

                {/* Photo upload overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background/60 backdrop-blur-sm">
                  <div className="text-center">
                    <ImagePlus className="mx-auto mb-2 text-primary" size={24} />
                    <span className="text-xs font-display font-semibold text-primary">Add Your Photo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="flex-1 p-7 md:p-10 lg:p-12 flex flex-col justify-center relative">
              {/* Large watermark year */}
              <div className="absolute top-4 right-6 hidden md:block">
                <span className="font-display text-7xl lg:text-8xl font-black text-foreground/[0.03] select-none leading-none">{a.date}</span>
              </div>

              {/* Category & date row */}
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.15em] uppercase">
                  <Sparkles size={10} />
                  {a.category}
                </span>
                <div className="h-4 w-px bg-border" />
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Calendar size={11} />
                  {a.date}
                </span>
              </div>

              {/* Title with gradient hover */}
              <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-4 leading-tight group-hover:text-gradient transition-all duration-500">
                {a.title}
              </h3>

              {/* Description with left accent bar */}
              <div className="flex gap-4 mb-6">
                <div className="w-[3px] rounded-full bg-gradient-to-b from-primary via-secondary to-transparent flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
              </div>

              {/* Status badge + decorative dots */}
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm"
                >
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-40" />
                  </div>
                  <span className="text-xs font-display font-bold tracking-wide text-primary">{a.status}</span>
                </motion.div>

                {/* Decorative element */}
                <div className="hidden md:flex items-center gap-1.5">
                  {[...Array(3)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + j * 0.1 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary/20"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <div className="relative min-h-screen">
      <div className="checkerboard-bg" />
      <Navbar />

      {/* Hero with big statement */}
      <section className="pt-32 pb-20 section-padding relative z-10 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-primary text-sm font-display font-semibold mb-8"
            >
              <Trophy size={16} />
              <span className="tracking-[0.1em] text-xs">HALL OF HONORS</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[0.9]">
              Built with
              <br />
              <span className="text-gradient">Dedication</span>
            </h1>

            <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg leading-relaxed">
              Every milestone here represents countless hours of learning, building, and pushing boundaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats — Bento-style */}
      <section className="relative z-10 px-6 -mt-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative group/stat"
              >
                <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 text-center overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} mb-3`}>
                      <stat.icon className="text-primary-foreground" size={20} />
                    </div>
                    <p className="font-display text-3xl md:text-4xl font-extrabold bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                      {stat.number}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1 font-medium tracking-wide uppercase">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border" />
          <div className="flex items-center gap-2 text-muted-foreground/40">
            <Star size={12} className="text-primary/40" />
            <span className="text-[10px] font-display tracking-[0.3em] uppercase">Milestones</span>
            <Star size={12} className="text-primary/40" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border" />
        </div>
      </div>

      {/* Achievement Cards — Alternating layout */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="space-y-8">
            {achievements.map((a, i) => (
              <AchievementCard key={i} a={a} i={i} />
            ))}
          </div>

          {/* Photo upload CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-20"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-card to-secondary/5" />
              <div className="relative border border-border/50 rounded-3xl p-10 md:p-14 text-center backdrop-blur-sm">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 mb-6">
                    <ImagePlus className="text-primary" size={28} />
                  </div>
                </motion.div>
                <h3 className="font-display text-2xl font-extrabold mb-3">
                  Make it <span className="text-gradient">yours</span>
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-2">
                  Upload your actual photos from hackathons, certifications, and events — hover any card above and click to replace.
                </p>
                <p className="text-xs text-muted-foreground/40 font-display">
                  Drop images in the chat to get started
                </p>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-12">
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
