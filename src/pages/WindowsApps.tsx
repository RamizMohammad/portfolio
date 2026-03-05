import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Download, Monitor, Package, Search, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

// ─── App data ─────────────────────────────────────────────────────────────────
// logo: filename inside src/assets/AppLogos/
// Served at runtime via GET /api/app-logo/<filename>
const apps = [
  {
    name:        "Linkium",
    version:     "v1.0",
    updated:     "October 7, 2025",
    description: "A powerful all-in-one productivity tool for managing tasks, notes, and projects efficiently.",
    downloadUrl: "https://github.com/RamizMohammad/SteamDeck/releases/download/v1.0/Linkium.exe",
    logo:        "/api/app-logo/Linkium.png",   // ← put Linkium.png in src/assets/AppLogos/
    category:    "Productivity",
    highlights:  ["Task Management", "Notes", "Project Tracking"],
  },
  {
    name:        "Backup Engine",
    version:     "v1.0",
    updated:     "January 26, 2026",
    description: "A powerful automatic backup utility tool which tracks your changes like GitHub and merges but offline.",
    downloadUrl: "https://github.com/RamizMohammad/Backup_Engine/releases/download/v1.0/Backup.Engine.Installer.exe",
    logo:        "/api/app-logo/BackupEngine.png",   // ← put BackupEngine.png in src/assets/AppLogos/
    category:    "Utilities",
    highlights:  ["Auto Backup", "Change Tracking", "Offline Merge"],
  },
];

const stats = [
  { label: "Applications", value: apps.length, icon: Package },
  { label: "Downloads",    value: "500+",       icon: Download },
  { label: "Platform",     value: "Windows",    icon: Monitor },
];

// ─── App Logo component with fallback ────────────────────────────────────────
const AppLogo = ({ src, name }: { src: string; name: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    // Fallback: first letter of app name in a gradient box
    return (
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-border flex items-center justify-center">
        <span className="text-3xl font-black text-primary">{name.charAt(0)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      className="w-20 h-20 rounded-2xl object-contain border-2 border-border bg-card"
      onError={() => setError(true)}
    />
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const WindowsApps = () => {
  const [search, setSearch] = useState("");
  const ref     = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
      <div className="checkerboard-bg" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 section-padding relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 text-xs text-muted-foreground font-display mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={12} className="text-primary" />
              Desktop Software Collection
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold mb-5 leading-[0.95]">
              Win<span className="text-gradient">Store</span>
            </h1>

            <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base leading-relaxed">
              Powerful desktop applications crafted for Windows — built for productivity, designed with precision.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center justify-center gap-6 md:gap-10 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
                  <s.icon size={16} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-foreground text-sm">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="gradient-line rounded-full" />
      </div>

      {/* Apps Section */}
      <section className="section-padding pt-12 relative z-10" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-primary font-display font-medium mb-1 tracking-premium text-xs">Applications</p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold">
                  My <span className="text-gradient">Software</span>
                </h2>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-sm font-display"
                />
              </div>
            </div>

            {/* App Cards */}
            <div className="grid gap-5">
              {filtered.map((app, i) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className="group relative card-premium p-0 overflow-hidden"
                >
                  {/* Gradient accent top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex flex-col md:flex-row">
                    {/* Left: Logo area */}
                    <div className="relative md:w-[200px] lg:w-[240px] flex-shrink-0 flex items-center justify-center p-8 md:p-10 bg-gradient-to-br from-primary/5 to-secondary/5 border-b md:border-b-0 md:border-r border-border">
                      <div className="relative">
                        {/* Real logo image with fallback */}
                        <div className="glow-sm group-hover:glow-md transition-all duration-500">
                          <AppLogo src={app.logo} name={app.name} />
                        </div>
                        {/* Version badge */}
                        <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-primary/15 border border-primary/20 text-[9px] font-display font-semibold text-primary">
                          {app.version}
                        </div>
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-secondary/10 border border-secondary/15 text-[10px] font-display font-semibold text-secondary">
                            {app.category}
                          </span>
                          <span className="text-[10px] text-muted-foreground/50">Updated {app.updated}</span>
                        </div>
                        <h3 className="font-display text-xl font-extrabold group-hover:text-primary transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-lg">
                          {app.description}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5">
                        {app.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-2.5 py-1 rounded-lg bg-muted border border-border text-[10px] font-display font-medium text-muted-foreground"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Download */}
                      <div className="flex items-center gap-3 mt-1">
                        <a
                          href={app.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-premium inline-flex items-center gap-2 px-5 py-2.5"
                        >
                          <Download size={14} /> Download
                        </a>
                        <a
                          href={app.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 rounded-2xl border border-border bg-card/30">
                  <Package size={40} className="mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground font-display">No applications found.</p>
                  <p className="text-xs text-muted-foreground/50 mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Back */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link to="/" className="btn-outline-premium inline-flex items-center gap-2 px-6 py-3">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WindowsApps;