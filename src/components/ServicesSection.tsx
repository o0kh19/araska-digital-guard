import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, FileSearch, Radar } from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    title: "Managed SOC",
    desc: "Co-managed security operations powered by Microsoft Sentinel. We augment your IT team with 24/7 detection, triage, and response capabilities—without replacing your existing staff.",
    tags: ["Microsoft Sentinel", "Co-Managed", "24/7 SOC"],
  },
  {
    icon: FileSearch,
    title: "Strategic Advisory",
    desc: "ISO 27001 Gap Analysis and Cyber Risk Assessments that go beyond log watching. We build security roadmaps aligned to your business objectives and regulatory requirements.",
    tags: ["ISO 27001", "Risk Assessment", "Compliance"],
  },
  {
    icon: Radar,
    title: "Threat Intelligence",
    desc: "Proactive adversary profiling using MISP threat intelligence platform. We map attacker TTPs globally and deliver actionable intelligence tailored to your threat landscape.",
    tags: ["MISP", "MITRE ATT&CK", "Proactive"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">What We Do</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Unified Security Operations
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            A comprehensive security ecosystem combining real-time defense, strategic advisory, and
            forward-looking threat intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card rounded-xl p-8 hover:neon-border transition-all duration-300 flex flex-col"
            >
              <svc.icon className="text-primary mb-5" size={28} />
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">{svc.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{svc.desc}</p>
              <div className="flex flex-wrap gap-2">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-primary/20 text-primary/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
