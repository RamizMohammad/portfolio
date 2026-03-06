import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Calendar,
  Code,
  Lightbulb,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

// ─── Static image imports ─────────────────────────────────────────────────────
// Vite resolves these at build time → hashed + optimised in dist/assets/
// No server needed. Images must live in src/assets/Certificate/
import imgPatent         from "@/assets/Certificate/patent.png";
import imgBluestock      from "@/assets/Certificate/bluestock.jpg";
import imgUdemy          from "@/assets/Certificate/udemy.jpg";
import imgKRMU           from "@/assets/Certificate/KRMU.jpg";
import imgSharda         from "@/assets/Certificate/Sharda.jpg";
import imgIIITD          from "@/assets/Certificate/IIITD.png";
import imgNHAI           from "@/assets/Certificate/NHAI.jpg";
import imgBuildWithIndia from "@/assets/Certificate/BuildWithIndia.png";
import imgAWS            from "@/assets/Certificate/AWS.jpg";
import imgFlipkart       from "@/assets/Certificate/Flipkart.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Achievement {
  category:    string;
  title:       string;
  description: string;
  date:        string;
  status:      string;
  emoji:       string;
  photo:       string;
  tags?:       string[];
  location?:   string;
  organizer?:  string;
  link?:       string;
}

// ─── Static data ──────────────────────────────────────────────────────────────
const ACHIEVEMENTS: Achievement[] = [
  {
    category: "Patent", title: "Patent for Real-Time User Safety During Vehicle Commutes",
    description: "Filed a patent with the Indian Government for METHOD AND SYSTEM FOR REAL-TIME USER SAFETY DURING VEHICLE COMMUTES. The system monitors commuter behavior using sensor fusion and AI to detect anomalies and trigger emergency alerts in real time. Application No: 202511053637 A, Publication Date: 27 June 2025.",
    date: "2025", status: "Filed", emoji: "💡",
    photo: imgPatent,
    tags: ["AI", "Safety", "Sensor Fusion", "Government", "Innovation"],
    location: "India", organizer: "Indian Patent Office",
  },
  {
    category: "Work", title: "Moglix — Python & Agentic AI Developer",
    description: "Working as a Python developer and Agentic AI specialist at Moglix, India's leading B2B e-commerce platform. Building intelligent automation pipelines, supplier invoice accuracy systems, and an AI-powered customer support chatbot using LLMs and agentic workflows.",
    date: "2026", status: "Current", emoji: "🚀",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["Python", "Agentic AI", "LLM", "FastAPI", "OCR", "B2B"],
    location: "Noida, India", organizer: "Moglix",
  },
  {
    category: "Internship", title: "Bluestock Fintech — SDE Intern",
    description: "Worked as Software Development Engineer (SDE) at Bluestock Fintech. Led development of the internal admin panel using Flask and Python, built REST APIs, and collaborated with a cross-functional team across design, product, and backend engineering.",
    date: "2025", status: "Completed", emoji: "💼",
    photo: imgBluestock,
    tags: ["Flask", "Python", "REST API", "FinTech", "Admin Panel"],
    location: "Remote, India", organizer: "Bluestock Fintech",
  },
  {
    category: "Certification", title: "Machine Learning A-Z (Udemy)",
    description: "Completed the comprehensive Machine Learning A-Z course on Udemy, covering supervised and unsupervised learning, deep learning fundamentals, model evaluation, and real-world ML pipelines using both Python (scikit-learn, TensorFlow) and R.",
    date: "2024", status: "Certified", emoji: "🤖",
    photo: imgUdemy,
    tags: ["Python", "R", "ML", "scikit-learn", "Deep Learning"],
    organizer: "Udemy",
  },
  {
    category: "Hackathon", title: "56 Hours Hackathon — KRMU University",
    description: "Finalist in a grueling 56-hour hackathon at K.R. Mangalam University, Gurgaon. Competed against 200+ teams from across India, surviving four rounds of judging before reaching the final stage.",
    date: "2024", status: "Finalist", emoji: "🏆",
    photo: imgKRMU,
    tags: ["56hrs", "Finalist", "200+ Teams"],
    location: "Gurgaon, Haryana", organizer: "K.R. Mangalam University",
  },
  {
    category: "Hackathon", title: "24 Hours Hackathon — Sharda University",
    description: "Placed 6th in a 24-hour intensive hackathon at Sharda University, Greater Noida. Ranked in the top 10 out of 150+ teams, designing and building a working prototype under extreme time pressure.",
    date: "2024", status: "6th Place", emoji: "🥇",
    photo: imgSharda,
    tags: ["24hrs", "Top-10", "150+ Teams"],
    location: "Greater Noida, UP", organizer: "Sharda University",
  },
  {
    category: "Hackathon", title: "Hack For Impact — IIIT Delhi E-Summit 2025",
    description: "Participated in Hack For Impact at E-Summit 2025, hosted by IIIT Delhi. The challenge focused on building tech solutions with measurable social impact in education, healthcare, and sustainability.",
    date: "2025", status: "Participant", emoji: "⚡",
    photo: imgIIITD,
    tags: ["Social Impact", "E-Summit", "IIIT"],
    location: "New Delhi, India", organizer: "IIIT Delhi",
  },
  {
    category: "Hackathon", title: "Infrastructure Innovation — NHAI & HOAI",
    description: "Participated in a government-backed hackathon by the National Highway Authority of India and HOAI. Proposed an AI-assisted highway monitoring solution for real-time pothole detection and commuter safety.",
    date: "2024", status: "Participant", emoji: "🛣️",
    photo: imgNHAI,
    tags: ["Government", "AI", "Infrastructure", "Safety"],
    location: "India", organizer: "NHAI & HOAI",
  },
  {
    category: "Hackathon", title: "Build With India — Google Office",
    description: "Selected to participate in the Build With India Hackathon at Google's India headquarters. Worked on a solution leveraging Google Maps SDK, Firebase, and Vertex AI to solve a hyperlocal logistics problem for Indian small businesses.",
    date: "2025", status: "Participant", emoji: "🏢",
    photo: imgBuildWithIndia,
    tags: ["Google", "Firebase", "Vertex AI", "Maps SDK"],
    location: "Google India, Gurugram", organizer: "Google India",
  },
  {
    category: "Certification", title: "Deep Dive on AWS",
    description: "Completed Amazon's Deep Dive on AWS certification, gaining hands-on expertise in EC2, S3, CloudWatch, Lambda, IAM, and VPC networking. Applied directly to production deployments for portfolio backend.",
    date: "2024", status: "Certified", emoji: "☁️",
    photo: imgAWS,
    tags: ["AWS", "EC2", "S3", "Lambda", "CloudWatch", "IAM"],
    organizer: "Amazon AWS",
  },
  {
    category: "Competition", title: "Flipkart GRiD 6.0 — Software Development Track",
    description: "Competed in Flipkart GRiD 6.0 with 300,000+ registrations nationwide. Cleared Level 1 in the Software Development Track, demonstrating strong fundamentals in system design, data structures, and e-commerce engineering.",
    date: "2024", status: "Level 1 Cleared", emoji: "🛒",
    photo: imgFlipkart,
    tags: ["E-Commerce", "System Design", "300K+ Teams", "Flipkart"],
    organizer: "Flipkart",
  },
];

// ─── Derived stats ────────────────────────────────────────────────────────────
const STATS = {
  certifications: ACHIEVEMENTS.filter((a) => a.category === "Certification").length + 9,
  hackathonWins:  ACHIEVEMENTS.filter(
    (a) =>
      a.category === "Hackathon" &&
      ["Finalist", "6th Place", "1st", "2nd", "3rd"].some((s) => a.status.includes(s))
  ).length,
  patents:  ACHIEVEMENTS.filter((a) => a.category === "Patent").length,
  projects: 15,
};

// ─── Animation variants ───────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Achievement Card (UI unchanged) ─────────────────────────────────────────
const AchievementCard = ({ a, i }: { a: Achievement; i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven  = i % 2 === 0;

  return (
    <motion.div variants={itemVariant} className="group">
      <div ref={cardRef} className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 rounded-3xl p-[1.5px]">
          <div
            className="absolute inset-[-50%] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))`,
              animation: "spin 4s linear infinite",
            }}
          />
        </div>

        <div className="relative rounded-3xl bg-card border border-border/50 overflow-hidden group-hover:border-transparent transition-colors duration-500">
          <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>

            {/* Photo */}
            <div className="relative md:w-[45%] flex-shrink-0 overflow-hidden">
              <div className="aspect-[16/10] md:aspect-auto md:h-full relative">
                <img
                  src={a.photo}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent md:bg-none" />
                <div className={`absolute inset-0 hidden md:block ${isEven ? "bg-gradient-to-r from-transparent via-transparent to-card" : "bg-gradient-to-l from-transparent via-transparent to-card"}`} />

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

                <div className="absolute bottom-4 left-5 md:hidden">
                  <span className="font-display text-5xl font-black text-foreground/10">{a.date}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-7 md:p-10 lg:p-12 flex flex-col justify-center relative">
              <div className="absolute top-4 right-6 hidden md:block">
                <span className="font-display text-7xl lg:text-8xl font-black text-foreground/[0.03] select-none leading-none">{a.date}</span>
              </div>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.15em] uppercase">
                  <Sparkles size={10} />{a.category}
                </span>
                <div className="h-4 w-px bg-border" />
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Calendar size={11} />{a.date}
                </span>
                {a.location && (
                  <>
                    <div className="h-4 w-px bg-border" />
                    <span className="text-xs text-muted-foreground/70">📍 {a.location}</span>
                  </>
                )}
              </div>

              {a.organizer && (
                <p className="text-[11px] text-muted-foreground/50 font-medium mb-3 tracking-wide uppercase">{a.organizer}</p>
              )}

              <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-4 leading-tight group-hover:text-gradient transition-all duration-500">
                {a.title}
              </h3>

              <div className="flex gap-4 mb-5">
                <div className="w-[3px] rounded-full bg-gradient-to-b from-primary via-secondary to-transparent flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              </div>

              {a.tags && a.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {a.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-semibold text-primary/70 tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

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

                <div className="hidden md:flex items-center gap-1.5">
                  {[...Array(3)].map((_, j) => (
                    <motion.div key={j} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + j * 0.1 }} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Achievements = () => {
  const statCards = [
    { icon: Award,     number: `${STATS.certifications}+`, label: "Certifications",  gradient: "from-primary to-primary/60"     },
    { icon: Trophy,    number: `${STATS.hackathonWins}`,   label: "Hackathon Wins",  gradient: "from-secondary to-secondary/60" },
    { icon: Lightbulb, number: `${STATS.patents}`,         label: "Patent Filed",    gradient: "from-accent to-accent/60"       },
    { icon: Code,      number: `${STATS.projects}+`,       label: "Projects Built",  gradient: "from-primary to-secondary"      },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="checkerboard-bg" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 section-padding relative z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-primary text-sm font-display font-semibold mb-8"
            >
              <Trophy size={16} />
              <span className="tracking-[0.1em] text-xs">HALL OF HONORS</span>
            </motion.div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[0.9]">
              Built with<br /><span className="text-gradient">Dedication</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg leading-relaxed">
              Every milestone here represents countless hours of learning, building, and pushing boundaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 -mt-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative group/stat"
              >
                <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 text-center overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative z-10">
                    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} mb-3`}>
                      <stat.icon className="text-primary-foreground" size={20} />
                    </div>
                    <p className="font-display text-3xl md:text-4xl font-extrabold bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">{stat.number}</p>
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

      {/* Cards */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={container} initial="hidden" animate="show">
            <div className="space-y-8">
              {ACHIEVEMENTS.map((a, i) => (
                <AchievementCard key={`${a.title}-${i}`} a={a} i={i} />
              ))}
            </div>
          </motion.div>
          <div className="text-center mt-16">
            <Link to="/" className="inline-flex items-center gap-2 px-8 py-3.5 btn-premium">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Achievements;