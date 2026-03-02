import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Confess App",
    description: "Anonymous confession sharing platform",
    tech: ["Java", "Firebase"],
    playStore: "https://play.google.com/store/apps/details?id=in.mohammad.ramiz.confess",
    github: "https://github.com/RamizMohammad/ConfessApp.git",
    screenshot: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=280&h=500&fit=crop",
  },
  {
    name: "Share Wheels",
    description: "Smart ride sharing application",
    tech: ["Android", "Maps API"],
    github: "https://github.com/RamizMohammad/FinalYearProject---RideShiled.git",
    screenshot: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=280&h=500&fit=crop",
  },
  {
    name: "BuddyCode",
    description: "Python-enabled online compiler for multi-language coding",
    tech: ["Java", "REST APIs"],
    github: "https://github.com/RamizMohammad/BuddyCodeAndroid.git",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=280&h=500&fit=crop",
  },
  {
    name: "Hotel Manager",
    description: "Staff & guest operations system",
    tech: ["Android", "Database"],
    github: "https://github.com/RamizMohammad/Hotel_manager",
    screenshot: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=280&h=500&fit=crop",
  },
  {
    name: "Task Manager Pro",
    description: "Advanced productivity app",
    tech: ["Kotlin", "Room DB"],
    github: "https://github.com/RamizMohammad",
    screenshot: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=280&h=500&fit=crop",
  },
  {
    name: "Inventory Fetcher",
    description: "Inventory fetcher and automatic server management",
    tech: ["Android", "API"],
    github: "https://github.com/RamizMohammad/IndianOilFetcher.git",
    screenshot: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=280&h=500&fit=crop",
  },
];

const AndroidProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col items-center text-center"
    >
      {/* Phone mockup */}
      <div className="relative mb-6 transition-all duration-500 group-hover:-translate-y-4 group-hover:drop-shadow-[0_20px_40px_hsl(var(--primary)/0.15)]">
        {/* Ambient glow behind phone */}
        <div className="absolute -inset-4 rounded-[35px] bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        <div className="relative w-[160px] h-[320px] sm:w-[190px] sm:h-[380px] lg:w-[210px] lg:h-[420px] rounded-[28px] bg-gradient-to-b from-[hsl(220,20%,16%)] to-[hsl(220,20%,10%)] p-[8px] shadow-[0_25px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] border border-border/20">
          {/* Notch */}
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[45px] h-[4px] bg-[hsl(220,15%,20%)] rounded-full z-10" />
          
          {/* Screen */}
          <div className="relative w-full h-full rounded-[21px] overflow-hidden bg-background">
            <img
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/85 backdrop-blur-md flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-all duration-400">
              {project.playStore && (
                <motion.a
                  href={project.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                  aria-label={`${project.name} on Play Store`}
                >
                  <ExternalLink size={18} />
                </motion.a>
              )}
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                aria-label={`${project.name} source code`}
              >
                <Github size={18} />
              </motion.a>
            </div>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[30px] h-[3px] bg-[hsl(220,15%,22%)] rounded-full" />
        </div>
      </div>

      {/* Project info */}
      <h4 className="font-display text-base sm:text-lg font-bold group-hover:text-primary transition-colors duration-300">
        {project.name}
      </h4>
      <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-[200px] leading-relaxed">
        {project.description}
      </p>
      
      {/* Tech tags */}
      <div className="flex gap-1.5 mt-3 flex-wrap justify-center">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground tracking-wide"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const AndroidProjectsSection = () => {
  return (
    <section id="android-projects" className="section-padding relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Left-aligned heading like other sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">
            Android Projects
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Mobile Apps I've <span className="text-gradient">Built</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base max-w-lg">
            Native Android applications crafted with performance and user experience in mind
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-14 lg:gap-x-12 lg:gap-y-16">
          {projects.map((project, i) => (
            <AndroidProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AndroidProjectsSection;
