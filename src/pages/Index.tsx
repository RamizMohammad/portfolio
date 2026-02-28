import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import LiveProjectsSection from "@/components/LiveProjectsSection";
import AndroidProjectsSection from "@/components/AndroidProjectsSection";
import DesktopProjectsSection from "@/components/DesktopProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="checkerboard-bg" />
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/[0.04] blur-[100px] animate-[float_10s_ease-in-out_infinite_2s]" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/[0.02] blur-[80px] animate-[float_12s_ease-in-out_infinite_4s]" />
      </div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <LiveProjectsSection />
      <ExperienceSection />
      <AndroidProjectsSection />
      <DesktopProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
