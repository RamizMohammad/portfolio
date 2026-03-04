import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import LiveProjectsSection from "@/components/LiveProjectsSection";
import AndroidProjectsSection from "@/components/AndroidProjectsSection";
import DesktopProjectsSection from "@/components/DesktopProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsPreview from "@/components/AchievementsPreview";
import ContactSection from "@/components/ContactSection";
import MiniGame from "@/components/MiniGame";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const ParallaxSection = ({ children, speed = 0.15, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

const Index = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      <div className="checkerboard-bg" />
      <ParticleBackground />
      {/* Floating gradient orbs with parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]"
          style={{ y: bgY1 }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/[0.04] blur-[100px]"
          style={{ y: bgY2 }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[80px]"
          style={{ y: bgY3 }}
        />
      </div>
      <Navbar />
      <HeroSection />
      <ParallaxSection speed={0.08}>
        <AboutSection />
      </ParallaxSection>
      <ParallaxSection speed={0.12}>
        <LiveProjectsSection />
      </ParallaxSection>
      <ParallaxSection speed={0.06}>
        <ExperienceSection />
      </ParallaxSection>
      <ParallaxSection speed={0.1}>
        <AndroidProjectsSection />
      </ParallaxSection>
      <ParallaxSection speed={0.08}>
        <DesktopProjectsSection />
      </ParallaxSection>
      <ParallaxSection speed={0.1}>
        <SkillsSection />
      </ParallaxSection>
      <ParallaxSection speed={0.06}>
        <AchievementsPreview />
      </ParallaxSection>
      <ParallaxSection speed={0.08}>
        <ContactSection />
      </ParallaxSection>
      <MiniGame />
      <Footer />
    </div>
  );
};

export default Index;
