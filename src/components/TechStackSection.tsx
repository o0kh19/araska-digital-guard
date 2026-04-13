import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Shield, Castle, KeyRound, Eye } from "lucide-react";

const tools = [
  {
    icon: Brain,
    name: "Microsoft Sentinel",
    role: "The Brain",
    desc: "Our cloud-native SIEM/SOAR. It provides hyper-scale log analytics and AI-driven threat detection, allowing us to see through the noise of billions of signals.",
  },
  {
    icon: Shield,
    name: "Defender for Endpoint",
    role: "The Shield",
    desc: "Industry-leading EDR that allows us to isolate infected devices and stop lateral movement in seconds.",
  },
  {
    icon: Castle,
    name: "Defender for Cloud",
    role: "The Fortress",
    desc: "Continuous security posture management (CSPM) and workload protection for your Azure, AWS, and on-premise servers.",
  },
  {
    icon: KeyRound,
    name: "Microsoft Entra ID",
    role: "The Gatekeeper",
    desc: "Advanced identity protection and Zero-Trust conditional access, ensuring only the right people have the right access at the right time.",
  },
  {
    icon: Eye,
    name: "Azure Lighthouse",
    role: "The Watchtower",
    desc: "Our secure management portal that allows us to monitor your environment with full transparency while you maintain total ownership of your data.",
  },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tech" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
            The Microsoft Secure Echelon
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            The Technical Engine
          </h2>
          <p className="text-secondary-foreground max-w-2xl mb-14 leading-relaxed">
            We don't just use tools; we deploy an integrated global ecosystem. Araska Cyber Core is
            built entirely on the Microsoft Security Stack, providing seamless, high-velocity defense
            across your entire digital estate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-8 hover:neon-border transition-all duration-300"
            >
              <tool.icon className="text-primary mb-4" size={28} />
              <p className="text-primary/70 font-display text-xs tracking-widest uppercase mb-2">
                {tool.role}
              </p>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">{tool.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
