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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col items-center text-center"
    >
      {/* Phone mockup */}
      <div className="relative mb-5 transition-transform duration-300 group-hover:-translate-y-3">
        <div className="w-[180px] h-[360px] sm:w-[200px] sm:h-[400px] lg:w-[220px] lg:h-[440px] rounded-[25px] bg-[hsl(220,20%,14%)] p-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.08)] border border-border/30">
          {/* Notch */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[50px] h-[4px] bg-[hsl(220,15%,20%)] rounded-full z-10" />
          
          {/* Screen */}
          <div className="relative w-full h-full rounded-[17px] overflow-hidden bg-background">
            <img
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Hover overlay with links */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {project.playStore && (
                <a
                  href={project.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label={`View ${project.name} on Play Store`}
                >
                  <ExternalLink size={20} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                aria-label={`View ${project.name} source code`}
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[35px] h-[4px] bg-[hsl(220,15%,20%)] rounded-full" />
        </div>
      </div>

      {/* Project info */}
      <h4 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
        {project.name}
      </h4>
      <p className="text-muted-foreground text-sm mt-1 max-w-[220px] leading-relaxed">
        {project.description}
      </p>
      
      {/* Tech tags */}
      <div className="flex gap-2 mt-3 flex-wrap justify-center">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground tracking-wide"
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">
            📱 Android Projects
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            <span className="text-gradient">ANDROID PROJECTS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <AndroidProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AndroidProjectsSection;
