import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, AlertTriangle, Info, HelpCircle } from "lucide-react";

const slaLevels = [
  { priority: "P1", label: "Critical", time: "15 Min", desc: "Breach / Ransomware", icon: Zap, accent: true },
  { priority: "P2", label: "High", time: "45 Min", desc: "Malware / Unauthorized Access", icon: AlertTriangle, accent: false },
  { priority: "P3", label: "Medium", time: "4 Hours", desc: "Suspicious Activity", icon: Info, accent: false },
  { priority: "P4", label: "Low", time: "8 Hours", desc: "General Requests", icon: HelpCircle, accent: false },
];

const SLASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sla" className="section-padding max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
          Performance Commitment
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-foreground">
          Response Targets
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-14 leading-relaxed">
          Speed is the difference between containment and catastrophe. Our SLA guarantees rapid
          response across every severity tier.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {slaLevels.map((sla, i) => (
          <motion.div
            key={sla.priority}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass-card rounded-xl p-8 text-center transition-all duration-300 ${
              sla.accent ? "neon-border" : "hover:neon-border"
            }`}
          >
            <sla.icon className={`mx-auto mb-4 ${sla.accent ? "text-primary" : "text-muted-foreground"}`} size={24} />
            <p className="font-display text-xs tracking-widest text-muted-foreground mb-1">
              {sla.priority} — {sla.label}
            </p>
            <p className="font-display text-3xl font-black neon-text my-3">{sla.time}</p>
            <p className="text-muted-foreground text-sm">{sla.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SLASection;
