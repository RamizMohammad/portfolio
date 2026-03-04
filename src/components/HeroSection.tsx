import { motion } from "framer-motion";
import { ArrowDown, FileDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PhoneFrame from "./PhoneFrame";

import previewImage from "@/assets/Images/avatar/portImage.png";
import resumePDF from "@/assets/Resume/res.pdf";
import demoVideo from "@/assets/video/intro.mp4";

const socials = [
  { icon: Github, href: "https://github.com/RamizMohammad", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohammad-ramiz-886468217/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/Mohammad__Ramiz", label: "Twitter" },
  { icon: Mail, href: "mailto:ramizanas6@gmail.com", label: "Email" },
];

const roles = [
  "Android Developer",
  "Python Backend",
  "Hackathons Finalist",
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

const VideoInsidePhone = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [loopCount, setLoopCount] = useState(0);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;

        if (!entry.isIntersecting) {
          if (video && !video.paused) video.pause();
          setShowImage(true);
        } else {
          if (loopCount < 2) {
            setShowImage(false);
            if (video) {
              video.currentTime = 0;
              video.play().catch(() => {});
            }
          }
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [loopCount]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleEnded = () => {
    const video = videoRef.current;

    if (loopCount < 1) {
      setLoopCount((prev) => prev + 1);
      video.currentTime = 0;
      video.play();
    } else {
      setLoopCount(2);
      setShowImage(true);
    }
  };

  const handleClick = () => {
    const video = videoRef.current;

    if (showImage) {
      setShowImage(false);
      setLoopCount(0);
      video.currentTime = 0;
      video.play();
      return;
    }

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-black"
    >
      <video
        ref={videoRef}
        src={demoVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          showImage ? "opacity-0" : "opacity-100"
        }`}
      />

      <img
        src={previewImage}
        alt="Preview"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          showImage ? "opacity-100" : "opacity-0"
        }`}
      />

      {!showImage && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full hover:bg-black/80 transition"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      )}
    </div>
  );
};

const HeroSection = () => {
  const [glitch, setGlitch] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleNameClick = () => {
    setClickCount((prev) => prev + 1);
    setGlitch(true);
    setTimeout(() => setGlitch(false), 600);
  };

  return (
    <section
      id="hero"
      className="min-h-[100svh] flex items-center section-padding pt-28 md:pt-20 relative z-10"
    >
      <div
        className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center"
        style={{ gap: "clamp(2rem, 4vh, 5rem)" }}
      >
        {/* Left */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(0.5rem, 1.2vh, 1.5rem)",
          }}
        >
          <motion.p variants={item} className="text-primary font-display font-medium tracking-premium vh-body">
            Hello, I'm
          </motion.p>

          <motion.h1
            variants={item}
            className={`font-display font-extrabold leading-tight cursor-pointer select-none ${
              glitch ? "animate-pulse" : ""
            }`}
            style={{
              fontSize: "clamp(2rem, 6vh, 4.5rem)",
              ...(glitch
                ? {
                    textShadow: "3px 0 hsl(0 100% 50%), -3px 0 hsl(200 100% 50%)",
                    filter: "hue-rotate(90deg)",
                  }
                : {}),
            }}
            onClick={handleNameClick}
          >
            Mohammad <span className="text-gradient">Ramiz</span>

            {clickCount >= 5 && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block ml-2 text-lg"
              >
                {clickCount >= 10 ? "🚀 You're persistent!" : "👀"}
              </motion.span>
            )}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-muted-foreground font-display vh-subheading"
            style={{ minHeight: "2.5rem", height: "auto" }}
          >
            <TypingEffect />
          </motion.p>

          {/* Stats */}
          <motion.div variants={item} className="flex gap-4">
            {[
              { num: "1", label: "Patents" },
              { num: "3", label: "Hackathons" },
              { num: "15+", label: "Projects" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-5 py-3 rounded-2xl card-premium cursor-default">
                <p className="font-display text-2xl font-extrabold text-primary">{stat.num}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-all duration-300 hover:glow-sm hover:-translate-y-1"
              >
                <s.icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
            <a href="#android-projects" className="px-8 py-3.5 btn-premium">
              View Projects
            </a>

            <a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 btn-outline-premium flex items-center gap-2"
            >
              <FileDown size={16} /> Download CV
            </a>

            <a href="#contact" className="px-8 py-3.5 btn-outline-premium">
              Hire Me
            </a>
          </motion.div>
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-shrink-0"
        >
          <PhoneFrame>
            <VideoInsidePhone />
          </PhoneFrame>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
