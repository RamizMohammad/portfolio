import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <a href="#hero" className="font-display text-lg font-bold text-primary">
            {"<Dev />"}
          </a>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart size={12} className="text-primary" /> © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {["Home", "About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs text-muted-foreground hover:text-primary transition-colors hidden md:block"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
