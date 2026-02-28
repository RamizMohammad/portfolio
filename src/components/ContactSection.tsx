import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (demo)");
    setFormData({ name: "", email: "", message: "" });
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
          <p className="text-primary font-display font-medium mb-2">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Let's <span className="text-gradient">connect</span>
          </h2>
          <p className="text-muted-foreground mt-2">Ready to bring your ideas to life</p>
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
              <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
                placeholder="Tell me about your project or just say hello..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity glow-sm flex items-center gap-2"
            >
              <Send size={16} /> Send Message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm">Greater Noida, Uttar Pradesh</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <a href="tel:+919517028373" className="text-sm hover:text-primary transition-colors">+91 9517028373</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center">
                  <Mail size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <a href="mailto:ramizanas6@gmail.com" className="text-sm hover:text-primary transition-colors">ramizanas6@gmail.com</a>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Follow me</p>
              <div className="flex gap-3">
                <a href="https://github.com/RamizMohammad" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/mohammad-ramiz-886468217/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="https://x.com/Mohammad__Ramiz" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
