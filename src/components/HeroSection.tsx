import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, FileDown } from "lucide-react";
import PhoneFrame from "./PhoneFrame";
import developerHero from "@/assets/developer-hero.png";

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center section-padding pt-28"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 space-y-6"
        >
          <motion.p variants={item} className="text-primary font-display font-medium text-lg">
            Hello, I'm
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-7xl font-bold leading-tight"
          >
            John <span className="text-gradient">Developer</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-muted-foreground font-display"
          >
            Android Developer · Backend Developer · Python Developer
          </motion.p>
          <motion.p variants={item} className="text-muted-foreground max-w-lg leading-relaxed">
            Crafting beautiful mobile experiences and robust backend systems. I turn ideas into
            production-ready applications with clean, maintainable code.
          </motion.p>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:glow-sm"
              >
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow-sm"
            >
              View Projects
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-xl border border-border text-foreground font-display font-semibold text-sm hover:border-primary hover:text-primary transition-all flex items-center gap-2"
            >
              <FileDown size={16} /> Download Resume
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-border text-foreground font-display font-semibold text-sm hover:border-primary hover:text-primary transition-all"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right - Phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-shrink-0"
        >
          <PhoneFrame>
            <div className="w-full h-full flex items-center justify-center p-4">
              <motion.img
                src={developerHero}
                alt="Developer illustration"
                className="w-full h-full object-contain"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </PhoneFrame>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors hidden lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
};

export default HeroSection;
