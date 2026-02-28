import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Search, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const apps = [
  {
    name: "Linkium",
    version: "v1.0",
    updated: "October 7, 2025",
    description: "A powerful all-in-one productivity tool for managing tasks, notes, and projects efficiently.",
    downloadUrl: "https://github.com/RamizMohammad/SteamDeck/releases/download/v1.0/Linkium.exe",
    emoji: "🔗",
  },
  {
    name: "Backup Engine",
    version: "v1.0",
    updated: "January 26, 2026",
    description: "A powerful automatic backup utility tool which tracks your changes like GitHub and merges but offline.",
    downloadUrl: "https://github.com/RamizMohammad/Backup_Engine/releases/download/v1.0/Backup.Engine.Installer.exe",
    emoji: "💾",
  },
];

const WindowsApps = () => {
  const [search, setSearch] = useState("");

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
      <section className="pt-32 pb-16 section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Win<span className="text-gradient">Store</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto mb-2">
              I build powerful desktop applications for Windows.
            </p>
            <p className="text-sm text-muted-foreground/60">
              Crafting innovative software solutions that enhance productivity and user experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Apps */}
      <section className="section-padding pt-0 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-2xl font-bold mb-2">My Applications</h2>
            <p className="text-sm text-muted-foreground mb-6">Explore and download my latest Windows applications</p>

            {/* Search */}
            <div className="relative mb-8">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search applications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
              />
            </div>

            {/* App list */}
            <div className="space-y-4">
              {filtered.map((app) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 border border-border flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{app.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold group-hover:text-primary transition-colors">{app.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{app.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground/60">
                        <span>{app.version}</span>
                        <span>Updated: {app.updated}</span>
                      </div>
                    </div>
                    <a
                      href={app.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-display font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
                    >
                      <Download size={14} /> Download
                    </a>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No applications found.</p>
              )}
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-display font-semibold text-sm hover:border-primary hover:text-primary transition-all"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WindowsApps;
