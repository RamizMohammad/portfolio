import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const liveProjects = [
  {
    name: "BuddyCode",
    url: "https://www.buddycode.online",
    emoji: "💻",
    description: "Real-time collaborative code editor",
  },
  {
    name: "Linkium",
    url: "https://www.linkium.space",
    emoji: "🔗",
    description: "Device connection made easy",
  },
  {
    name: "Confess App",
    url: "https://play.google.com/store/apps/details?id=in.mohammad.ramiz.confess",
    emoji: "🔮",
    description: "Anonymous confession platform",
  },
];

const LiveProjectsSection = () => {
  return (
    <section className="section-padding relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">Live Projects</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            My <span className="text-gradient">Deployed</span> Apps
          </h2>
          <p className="text-muted-foreground mt-3 text-base">Explore my live, production applications</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {liveProjects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl card-premium block text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 border border-border flex items-center justify-center mb-4 group-hover:glow-sm transition-all">
                <span className="text-4xl">{project.emoji}</span>
              </div>
              <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">{project.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
              <div className="flex items-center justify-center gap-1 mt-4 text-xs text-primary font-display font-semibold tracking-premium">
                <ExternalLink size={12} /> Visit
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveProjectsSection;
