import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  Calendar,
  Code,
  Lightbulb,
  Loader2,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ─── Types (must match server's shape exactly) ────────────────────────────────
interface Achievement {
  category:    string;
  title:       string;
  description: string;
  date:        string;
  status:      string;
  emoji:       string;
  photo:       string;
  accent:      string;
  tags?:       string[];
  location?:   string;
  organizer?:  string;
  link?:       string;
}

interface Stats {
  certifications: number;
  hackathonWins:  number;
  patents:        number;
  projects:       number;
}

interface ApiResponse {
  achievements: Achievement[];
  stats:        Stats;
  total:        number;
  lastUpdated:  string;
}

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

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = ({ i }: { i: number }) => {
  const isEven = i % 2 === 0;
  return (
    <div className="rounded-3xl border border-border/50 bg-card overflow-hidden animate-pulse">
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
        <div className="md:w-[45%] aspect-[16/10] md:aspect-auto bg-muted/40" />
        <div className="flex-1 p-8 md:p-12 space-y-4">
          <div className="flex gap-3">
            <div className="h-6 w-24 rounded-full bg-muted/40" />
            <div className="h-6 w-16 rounded-full bg-muted/30" />
          </div>
          <div className="h-8 w-3/4 rounded-xl bg-muted/40" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted/30" />
            <div className="h-4 w-5/6 rounded bg-muted/30" />
            <div className="h-4 w-4/6 rounded bg-muted/30" />
          </div>
          <div className="flex gap-2 pt-2">
            {[1, 2, 3].map(j => (
              <div key={j} className="h-6 w-16 rounded-lg bg-muted/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Achievement Card ─────────────────────────────────────────────────────────
const AchievementCard = ({ a, i }: { a: Achievement; i: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven  = i % 2 === 0;

  return (
    <motion.div variants={itemVariant} className="group">
      <div ref={cardRef} className="relative rounded-3xl overflow-hidden">

        {/* Animated gradient border on hover */}
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

            {/* ── Photo ──────────────────────────────────────────────────── */}
            <div className="relative md:w-[45%] flex-shrink-0 overflow-hidden">
              <div className="aspect-[16/10] md:aspect-auto md:h-full relative">
                <img
                  src={a.photo}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent md:bg-none" />
                <div
                  className={`absolute inset-0 hidden md:block ${
                    isEven
                      ? "bg-gradient-to-r from-transparent via-transparent to-card"
                      : "bg-gradient-to-l from-transparent via-transparent to-card"
                  }`}
                />

                {/* Emoji badge */}
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

                {/* Year mobile watermark */}
                <div className="absolute bottom-4 left-5 md:hidden">
                  <span className="font-display text-5xl font-black text-foreground/10">{a.date}</span>
                </div>
              </div>
            </div>

            {/* ── Content ─────────────────────────────────────────────────── */}
            <div className="flex-1 p-7 md:p-10 lg:p-12 flex flex-col justify-center relative">
              {/* Year watermark desktop */}
              <div className="absolute top-4 right-6 hidden md:block">
                <span className="font-display text-7xl lg:text-8xl font-black text-foreground/[0.03] select-none leading-none">
                  {a.date}
                </span>
              </div>

              {/* Category + date + location */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.15em] uppercase">
                  <Sparkles size={10} />
                  {a.category}
                </span>
                <div className="h-4 w-px bg-border" />
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Calendar size={11} />
                  {a.date}
                </span>
                {a.location && (
                  <>
                    <div className="h-4 w-px bg-border" />
                    <span className="text-xs text-muted-foreground/70">📍 {a.location}</span>
                  </>
                )}
              </div>

              {/* Organizer */}
              {a.organizer && (
                <p className="text-[11px] text-muted-foreground/50 font-medium mb-3 tracking-wide uppercase">
                  {a.organizer}
                </p>
              )}

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-4 leading-tight group-hover:text-gradient transition-all duration-500">
                {a.title}
              </h3>

              {/* Description */}
              <div className="flex gap-4 mb-5">
                <div className="w-[3px] rounded-full bg-gradient-to-b from-primary via-secondary to-transparent flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              </div>

              {/* Tags */}
              {a.tags && a.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {a.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-semibold text-primary/70 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Status + decorative dots */}
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm"
                >
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-40" />
                  </div>
                  <span className="text-xs font-display font-bold tracking-wide text-primary">
                    {a.status}
                  </span>
                </motion.div>

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

          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats]               = useState<Stats | null>(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("/api/achievements")
      .then((r) => {
        if (!r.ok) throw new Error(`Server returned ${r.status}`);
        return r.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        setAchievements(data.achievements);
        setStats(data.stats);
      })
      .catch((err) => {
        console.error("[Achievements] fetch failed:", err);
        setError("Could not load achievements from server. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { icon: Award,     number: `${stats.certifications}+`, label: "Certifications",  gradient: "from-primary to-primary/60"     },
        { icon: Trophy,    number: `${stats.hackathonWins}`,   label: "Hackathon Wins",  gradient: "from-secondary to-secondary/60" },
        { icon: Lightbulb, number: `${stats.patents}`,         label: "Patent Filed",    gradient: "from-accent to-accent/60"       },
        { icon: Code,      number: `${stats.projects}+`,       label: "Projects Built",  gradient: "from-primary to-secondary"      },
      ]
    : [];

  return (
    <div className="relative min-h-screen">
      <div className="checkerboard-bg" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 section-padding relative z-10 overflow-hidden">
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

      {/* Stats — only render when loaded */}
      {statCards.length > 0 && (
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
                      <p className="font-display text-3xl md:text-4xl font-extrabold bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                        {stat.number}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1 font-medium tracking-wide uppercase">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Achievement Cards */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Loading state */}
          {loading && (
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-3 py-8 text-muted-foreground">
                <Loader2 className="animate-spin text-primary" size={20} />
                <span className="text-sm font-display">Loading achievements...</span>
              </div>
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} i={i} />)}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="text-destructive" size={28} />
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-xl border border-border text-sm font-display font-semibold hover:bg-primary/5 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loaded state */}
          {!loading && !error && achievements.length > 0 && (
            <motion.div variants={container} initial="hidden" animate="show">
              <div className="space-y-8">
                {achievements.map((a, i) => (
                  <AchievementCard key={`${a.title}-${i}`} a={a} i={i} />
                ))}
              </div>
            </motion.div>
          )}

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