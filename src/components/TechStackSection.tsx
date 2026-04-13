import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Network, Microscope } from "lucide-react";

const tools = [
  {
    icon: Database,
    name: "Microsoft Sentinel",
    desc: "Cloud-scale log analytics and security information event management (SIEM) for enterprise-wide visibility.",
  },
  {
    icon: Network,
    name: "TheHive & Cortex",
    desc: "Automated incident orchestration and response platform enabling rapid, structured threat management.",
  },
  {
    icon: Microscope,
    name: "Velociraptor",
    desc: "Surgical digital forensics and endpoint visibility for deep-dive investigations and artifact collection.",
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
            Tools of the Trade
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            The Technical Engine
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            Our security operations are powered by industry-leading platforms purpose-built for
            detection, orchestration, and forensics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card rounded-xl p-8 hover:neon-border transition-all duration-300"
            >
              <tool.icon className="text-primary mb-5" size={28} />
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
