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

  const inputCls = "w-full rounded px-4 py-3.5 text-[15px] text-foreground placeholder:text-[#5A6A80] focus:outline-none transition-colors";
  const inputStyle = {
    background: '#F3F4F6',
    border: '1px solid rgba(31,143,203,0.18)',
    borderRadius: '4px',
  };
  const inputFocusProps = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = '#1F8FCB';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31,143,203,0.12)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = 'rgba(31,143,203,0.18)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };
  const labelCls = "block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground mb-1.5";

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-36 pb-16 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center px-6">
            <CheckCircle className="text-primary mx-auto mb-6" size={48} />
            <h1 className="text-3xl font-bold text-foreground mb-4">Message Sent</h1>
            <p className="text-muted-foreground">We'll get back to you within one business day.</p>
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
            <span className="eyebrow text-xl">Reach Out</span>
            <span className="eyebrow-rule" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-[-0.02em]">Get in Touch</h1>
            <p className="text-muted-foreground text-lg leading-[1.8]">
              Whether you have a quick question or want to start a conversation about your security, we are here.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-3 rounded-lg p-8"
              style={{ background: '#E5E7EB', border: '1px solid rgba(31,143,203,0.18)', borderRadius: '8px' }}
            >
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Full Name *</label><input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} {...inputFocusProps} /></div>
                  <div><label className={labelCls}>Work Email *</label><input type="email" className={inputCls} style={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} {...inputFocusProps} /></div>
                </div>
                <div><label className={labelCls}>Organisation</label><input className={inputCls} style={inputStyle} value={form.org} onChange={(e) => update("org", e.target.value)} {...inputFocusProps} /></div>
                <div><label className={labelCls}>Message *</label><textarea className={`${inputCls} min-h-[140px] resize-y`} style={inputStyle} value={form.message} onChange={(e) => update("message", e.target.value)} {...inputFocusProps} /></div>
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
              {[
                { icon: Mail, title: "Email", content: <a href="mailto:info@araskacybercore.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">info@araskacybercore.com</a> },
                { icon: MapPin, title: "Headquarters", content: <p className="text-sm text-muted-foreground">United Kingdom</p> },
                { icon: Clock, title: "Response Time", content: <p className="text-sm text-muted-foreground">We aim to respond to all enquiries within one business day.</p> },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg p-6"
                  style={{ background: '#E5E7EB', border: '1px solid rgba(31,143,203,0.18)', borderRadius: '8px' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="text-primary" size={18} />
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  </div>
                  {item.content}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
