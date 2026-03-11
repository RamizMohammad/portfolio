import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Android", href: "#android-projects" },
  { label: "Desktop", href: "#desktop-projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Mini Game", href: "#mini-game" },
];

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (!isHome) return;
      const sections = navItems.map((i) => i.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-extrabold text-gradient">
          RAMIZ
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {isHome && navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                active === item.href.slice(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {active === item.href.slice(1) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(152 100% 50%), hsl(216 100% 50%))" }}
                />
              )}
            </a>
          ))}
          <Link to="/achievements" className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${location.pathname === '/achievements' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            Achievements
          </Link>
          <Link to="/windows-apps" className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${location.pathname === '/windows-apps' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            Win Store
          </Link>
          <a href="https://play.google.com/store/apps/developer?id=Mohammad+Ramiz" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full">
            Play Store ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-strong mt-2 mx-4 rounded-2xl p-4"
        >
          {isHome && navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 px-4 rounded-xl text-sm font-medium ${
                active === item.href.slice(1) ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
          <Link to="/achievements" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl text-sm font-medium text-muted-foreground">
            Achievements
          </Link>
          <Link to="/windows-apps" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl text-sm font-medium text-muted-foreground">
            Win Store
          </Link>
          <a href="https://play.google.com/store/apps/developer?id=Mohammad+Ramiz" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl text-sm font-medium text-muted-foreground">
            Play Store ↗
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
