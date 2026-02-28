import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10">
      <div className="gradient-line" />
      <div className="py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a href="#hero" className="font-display text-lg font-extrabold text-gradient">
              RAMIZ
            </a>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart size={12} className="text-primary" /> © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { label: "Home", href: "#hero" },
              { label: "About", href: "#about" },
              { label: "Projects", href: "#android-projects" },
              { label: "Skills", href: "#skills" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors hidden md:block font-display"
              >
                {item.label}
              </a>
            ))}
            <Link to="/achievements" className="text-xs text-muted-foreground hover:text-primary transition-colors hidden md:block font-display">
              Achievements
            </Link>
            <Link to="/windows-apps" className="text-xs text-muted-foreground hover:text-primary transition-colors hidden md:block font-display">
              Win Store
            </Link>
          </div>

          <div className="flex gap-3">
            {[
              { icon: Github, href: "https://github.com/RamizMohammad" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mohammad-ramiz-886468217/" },
              { icon: Twitter, href: "https://x.com/Mohammad__Ramiz" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:-translate-y-0.5">
                <s.icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
