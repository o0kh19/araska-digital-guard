import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const canSubmit = form.name && form.email && form.message;

  const inputCls = "w-full bg-secondary/50 border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";
  const labelCls = "block text-sm font-medium text-foreground mb-1.5";

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-36 pb-16 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center px-6">
            <CheckCircle className="text-primary mx-auto mb-6" size={48} />
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">Message Sent</h1>
            <p className="text-secondary-foreground">We'll get back to you within one business day.</p>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-36 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <span className="eyebrow">Reach Out</span>
            <span className="eyebrow-rule" />
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Whether you have a quick question or want to start a conversation about your security, we are here.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-3 glass-card rounded-lg p-8"
            >
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Full Name *</label><input className={inputCls} value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
                  <div><label className={labelCls}>Work Email *</label><input type="email" className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
                </div>
                <div><label className={labelCls}>Organisation</label><input className={inputCls} value={form.org} onChange={(e) => update("org", e.target.value)} /></div>
                <div><label className={labelCls}>Message *</label><textarea className={`${inputCls} min-h-[140px] resize-y`} value={form.message} onChange={(e) => update("message", e.target.value)} /></div>
                <button
                  onClick={() => canSubmit && setSubmitted(true)}
                  disabled={!canSubmit}
                  className="gold-btn text-xs py-2.5 px-6 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Send Message
                </button>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 space-y-6"
            >
              <div className="glass-card rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-primary" size={18} />
                  <h3 className="font-display text-sm font-semibold text-foreground">Email</h3>
                </div>
                <a href="mailto:info@araskacybercore.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@araskacybercore.com
                </a>
              </div>
              <div className="glass-card rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-primary" size={18} />
                  <h3 className="font-display text-sm font-semibold text-foreground">Headquarters</h3>
                </div>
                <p className="text-sm text-muted-foreground">United Kingdom</p>
              </div>
              <div className="glass-card rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="text-primary" size={18} />
                  <h3 className="font-display text-sm font-semibold text-foreground">Response Time</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We aim to respond to all enquiries within one business day.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
