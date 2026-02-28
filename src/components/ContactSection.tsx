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
    <section id="contact" className="section-padding relative z-10" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary font-display font-medium mb-2 tracking-premium text-sm">Contact</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">
            Let's <span className="text-gradient">connect</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base">Ready to bring your ideas to life</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-display tracking-premium text-xs">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-display tracking-premium text-xs">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-display tracking-premium text-xs">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
                placeholder="Tell me about your project or just say hello..."
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-8 py-3.5 btn-premium flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
            className="space-y-8"
          >
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Location", value: "Greater Noida, Uttar Pradesh" },
                { icon: Phone, label: "Phone", value: "+91 9517028373", href: "tel:+919517028373" },
                { icon: Mail, label: "Email", value: "ramizanas6@gmail.com", href: "mailto:ramizanas6@gmail.com" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-12 h-12 rounded-2xl border border-border bg-card flex items-center justify-center">
                    <item.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground font-display">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm font-display font-bold mb-3 tracking-premium">Follow me</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com/RamizMohammad" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mohammad-ramiz-886468217/" },
                  { icon: Twitter, href: "https://x.com/Mohammad__Ramiz" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-all hover:-translate-y-1">
                    <s.icon size={18} />
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
