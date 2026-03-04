import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { sendContactMessage } from "@/lib/api";

type FormStatus = "idle" | "sending" | "success" | "error";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section-padding relative z-10 min-h-[100svh] flex items-center" ref={ref}>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="vh-mb-header"
        >
          <p className="text-primary font-display font-medium tracking-premium vh-small" style={{ marginBottom: "clamp(2px, 0.4vh, 8px)" }}>Contact</p>
          <h2 className="font-display font-extrabold vh-heading">
            Let's <span className="text-gradient">connect</span>
          </h2>
          <p className="text-muted-foreground vh-body mt-1">Ready to bring your ideas to life</p>
        </motion.div>

        <div className="grid md:grid-cols-2" style={{ gap: "clamp(1.5rem, 4vh, 3rem)" }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1.2vh, 1.25rem)" }}
          >
            <div>
              <label className="text-muted-foreground block font-display tracking-premium" style={{ fontSize: "clamp(8px, 1vh, 11px)", marginBottom: "clamp(2px, 0.4vh, 6px)" }}>Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-2xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors vh-body"
                style={{ padding: "clamp(8px, 1.2vh, 14px) clamp(12px, 2vh, 20px)" }}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="text-muted-foreground block font-display tracking-premium" style={{ fontSize: "clamp(8px, 1vh, 11px)", marginBottom: "clamp(2px, 0.4vh, 6px)" }}>Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-2xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors vh-body"
                style={{ padding: "clamp(8px, 1.2vh, 14px) clamp(12px, 2vh, 20px)" }}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-muted-foreground block font-display tracking-premium" style={{ fontSize: "clamp(8px, 1vh, 11px)", marginBottom: "clamp(2px, 0.4vh, 6px)" }}>Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-2xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none vh-body"
                style={{ padding: "clamp(8px, 1.2vh, 14px) clamp(12px, 2vh, 20px)", height: "clamp(80px, 14vh, 140px)" }}
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-premium flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ padding: "clamp(8px, 1.2vh, 14px) clamp(16px, 3vh, 32px)", fontSize: "clamp(11px, 1.3vh, 14px)" }}
            >
              {status === "sending" ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : status === "success" ? (
                <><CheckCircle2 size={16} /> Message Sent!</>
              ) : status === "error" ? (
                <><XCircle size={16} /> Failed — Try Again</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.5vh, 2rem)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1vh, 1rem)" }}>
              {[
                { icon: MapPin, label: "Location", value: "Greater Noida, Uttar Pradesh" },
                { icon: Phone, label: "Phone", value: "+91 9517028373", href: "tel:+919517028373" },
                { icon: Mail, label: "Email", value: "ramizanas6@gmail.com", href: "mailto:ramizanas6@gmail.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-center text-muted-foreground" style={{ gap: "clamp(0.5rem, 1vh, 0.75rem)" }}>
                  <div className="rounded-2xl border border-border bg-card flex items-center justify-center"
                    style={{ width: "clamp(2rem, 4vh, 3rem)", height: "clamp(2rem, 4vh, 3rem)" }}
                  >
                    <item.icon style={{ width: "clamp(12px, 1.5vh, 16px)", height: "clamp(12px, 1.5vh, 16px)" }} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground font-display vh-small">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="hover:text-primary transition-colors vh-small">{item.value}</a>
                    ) : (
                      <p className="vh-small">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="font-display font-bold tracking-premium vh-small" style={{ marginBottom: "clamp(0.5rem, 1vh, 0.75rem)" }}>Follow me</p>
              <div className="flex" style={{ gap: "clamp(0.5rem, 1vh, 0.75rem)" }}>
                {[
                  { icon: Github, href: "https://github.com/RamizMohammad" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mohammad-ramiz-886468217/" },
                  { icon: Twitter, href: "https://x.com/Mohammad__Ramiz" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-all hover:-translate-y-1"
                    style={{ width: "clamp(2rem, 4vh, 3rem)", height: "clamp(2rem, 4vh, 3rem)" }}
                  >
                    <s.icon style={{ width: "clamp(12px, 1.5vh, 18px)", height: "clamp(12px, 1.5vh, 18px)" }} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
