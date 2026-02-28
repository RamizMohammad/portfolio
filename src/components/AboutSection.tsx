import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PhoneFrame from "./PhoneFrame";
import { Code2, Server, Smartphone, Braces } from "lucide-react";

const skills = [
  { icon: Smartphone, label: "Android", items: ["Java", "Kotlin", "Jetpack Compose", "Firebase"] },
  { icon: Server, label: "Backend", items: ["Flask", "FastAPI", "REST APIs", "AWS"] },
  { icon: Code2, label: "Python", items: ["Data Science", "Automation", "ML Kit", "Scripting"] },
  { icon: Braces, label: "Web", items: ["React", "Node.js", "WebSocket", "MongoDB"] },
];

const carouselImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=500&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=500&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=500&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=500&fit=crop",
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="section-padding relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-primary font-display font-medium mb-2">Who Am I?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Passionate about building{" "}
              <span className="text-gradient">impactful</span> software
            </h2>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-lg">
            I am a passionate developer specializing in Android development and backend engineering. 
            With expertise in Java, Python, and modern frameworks, I create robust mobile applications 
            and scalable server solutions.
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-lg">
            My journey in programming started with a curiosity for problem-solving, which has evolved 
            into a career focused on building innovative solutions. I thrive in hackathon environments 
            and enjoy collaborating on challenging projects.
          </p>

          <div className="flex items-center gap-4">
            <div className="px-5 py-3 rounded-xl border border-border bg-card">
              <p className="font-display text-2xl font-bold text-primary">15+</p>
              <p className="text-xs text-muted-foreground">Projects Built</p>
            </div>
            <a href="#android-projects" className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow-sm">
              View My Projects
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {skills.map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group"
              >
                <s.icon className="text-primary mb-2 group-hover:scale-110 transition-transform" size={22} />
                <h3 className="font-display font-semibold text-sm mb-1">{s.label}</h3>
                <p className="text-xs text-muted-foreground">{s.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <PhoneFrame>
            <div className="w-full h-full relative overflow-hidden">
              {carouselImages.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={false}
                  animate={{
                    opacity: currentSlide === i ? 1 : 0,
                    scale: currentSlide === i ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.6 }}
                />
              ))}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === i ? "bg-primary w-6" : "bg-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
