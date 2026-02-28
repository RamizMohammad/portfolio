import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowDown, FileDown, Twitter } from "lucide-react";
import PhoneFrame from "./PhoneFrame";

const socials = [
  { icon: Github, href: "https://github.com/RamizMohammad", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohammad-ramiz-886468217/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/Mohammad__Ramiz", label: "Twitter" },
  { icon: Mail, href: "mailto:ramizanas6@gmail.com", label: "Email" },
];

const roles = [
  "Android Developer",
  "Python Backend",
  "Hackathons",
  "Problem Solver",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TypingEffect = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <span className="text-gradient">
      {roles[roleIndex].substring(0, charIndex)}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center section-padding pt-28 relative z-10"
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
            Mohammad <span className="text-gradient">Ramiz</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-muted-foreground font-display h-10"
          >
            <TypingEffect />
          </motion.p>

          {/* Stats */}
          <motion.div variants={item} className="flex gap-6">
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-primary">1</p>
              <p className="text-xs text-muted-foreground">Patents</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">Hackathons</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-primary">15+</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:glow-sm"
              >
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
            <a
              href="#android-projects"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow-sm"
            >
              View Projects
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-xl border border-border text-foreground font-display font-semibold text-sm hover:border-primary hover:text-primary transition-all flex items-center gap-2"
            >
              <FileDown size={16} /> Download CV
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-border text-foreground font-display font-semibold text-sm hover:border-primary hover:text-primary transition-all"
            >
              Hire Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right - Phone (static, video placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-shrink-0"
        >
          <PhoneFrame>
            <div className="w-full h-full flex items-center justify-center bg-card">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[14px] border-l-primary border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1" />
                </div>
                <p className="text-xs text-muted-foreground font-display">Video Coming Soon</p>
              </div>
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
