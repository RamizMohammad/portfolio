import { AnimatePresence, motion, useInView } from "framer-motion";
import { Braces, Code2, Server, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PhoneFrame from "./PhoneFrame";

// Auto import carousel images (Vite)
const images = import.meta.glob("/src/assets/carousel/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

const carouselImages = Object.values(images)
  .map((img) => img.default)
  .sort();

const skills = [
  { icon: Smartphone, label: "Android", items: ["Java", "Kotlin", "Jetpack Compose", "Firebase"] },
  { icon: Server, label: "Backend", items: ["Flask", "FastAPI", "REST APIs", "AWS"] },
  { icon: Code2, label: "Python", items: ["Data Science", "Automation", "ML Kit", "Scripting"] },
  { icon: Braces, label: "Web", items: ["React", "Node.js", "WebSocket", "MongoDB"] },
];

const AboutSection = () => {
  const ref = useRef(null);
  const intervalRef = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    if (!carouselImages.length) return;

    let loaded = 0;

    carouselImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => {});
      img.onload = () => {
        loaded++;
        if (loaded === carouselImages.length) {
          setIsLoaded(true);
        }
      };
    });
  }, []);

  // Stable premium auto-slide
  useEffect(() => {
    if (!isLoaded) return;

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4500);

    return () => clearInterval(intervalRef.current);
  }, [isLoaded]);

  return (
    <section
      id="about"
      className="section-padding relative z-10 min-h-[100svh] flex items-center"
      ref={ref}
    >
      <div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center w-full"
        style={{ gap: "clamp(2rem, 4vh, 5rem)" }}
      >

        {/* LEFT */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div style={{ marginBottom: "clamp(0.5rem, 1.5vh, 1.5rem)" }}>
            <p className="text-primary font-display font-medium tracking-premium vh-small"
               style={{ marginBottom: "clamp(2px, 0.5vh, 8px)" }}>
              Who Am I?
            </p>

            <h2 className="font-display font-extrabold vh-heading">
              Passionate about building{" "}
              <span className="text-gradient">impactful</span> software
            </h2>
          </div>

          <p
            className="text-muted-foreground leading-relaxed max-w-lg vh-body"
            style={{ marginBottom: "clamp(0.5rem, 1vh, 1rem)" }}
          >
            I am a passionate developer specializing in Android development and backend engineering.
            With expertise in Java, Python, and modern frameworks, I create robust mobile applications
            and scalable server solutions.
          </p>

          <p
            className="text-muted-foreground leading-relaxed max-w-lg vh-body"
            style={{ marginBottom: "clamp(0.75rem, 1.5vh, 1.5rem)" }}
          >
            My journey in programming started with a curiosity for problem-solving, which has evolved
            into a career focused on building innovative solutions.
          </p>

          {/* Stats + Button */}
          <div
            className="flex items-center"
            style={{
              gap: "clamp(0.5rem, 1vh, 1rem)",
              marginBottom: "clamp(0.75rem, 1.5vh, 1.5rem)",
            }}
          >
            <div
              className="rounded-2xl card-premium"
              style={{ padding: "clamp(8px, 1.5vh, 12px) clamp(12px, 2vh, 20px)" }}
            >
              <p
                className="font-display font-extrabold text-primary"
                style={{ fontSize: "clamp(1.25rem, 2.5vh, 1.75rem)" }}
              >
                15+
              </p>
              <p className="text-muted-foreground vh-small">Projects Built</p>
            </div>

            <a
              href="#android-projects"
              className="btn-premium"
              style={{
                padding: "clamp(8px, 1.5vh, 14px) clamp(16px, 3vh, 32px)",
                fontSize: "clamp(11px, 1.3vh, 14px)",
              }}
            >
              View My Projects
            </a>
          </div>

          {/* Skills */}
          <div
            className="grid grid-cols-2"
            style={{ gap: "clamp(0.5rem, 1vh, 1rem)" }}
          >
            {skills.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl card-premium group"
                style={{ padding: "clamp(8px, 1.5vh, 16px)" }}
              >
                <s.icon
                  className="text-primary group-hover:scale-110 transition-transform"
                  size={18}
                  style={{ marginBottom: "clamp(2px, 0.5vh, 8px)" }}
                />

                <h3
                  className="font-display font-bold vh-small"
                  style={{ marginBottom: "clamp(1px, 0.3vh, 4px)" }}
                >
                  {s.label}
                </h3>

                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "clamp(9px, 1.1vh, 12px)" }}
                >
                  {s.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT PHONE */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <PhoneFrame>
            <div className="w-full h-full relative overflow-hidden">

              <AnimatePresence mode="wait">
                {isLoaded && (
                  <motion.img
                    key={currentSlide}
                    src={carouselImages[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    style={{
                      willChange: "opacity",
                      backfaceVisibility: "hidden",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Dots */}
              {isLoaded && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === i
                          ? "bg-primary w-6"
                          : "bg-foreground/30 w-2"
                      }`}
                    />
                  ))}
                </div>
              )}

            </div>
          </PhoneFrame>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;