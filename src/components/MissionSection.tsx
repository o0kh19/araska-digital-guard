import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserCheck, Eye, Briefcase } from "lucide-react";

const roles = [
  {
    icon: UserCheck,
    title: "Technical Director",
    desc: "Oversight on all security roadmaps and high-level threat hunting operations.",
  },
  {
    icon: Eye,
    title: "SOC Operations Team",
    desc: "24/7 analysts managing real-time alerts, triage, and incident escalation.",
  },
  {
    icon: Briefcase,
    title: "Strategy Lead",
    desc: "Handling global compliance, NDAs, and Service Level Agreements.",
  },
];

const FadeInCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const MissionSection = () => (
  <section id="mission" className="section-padding max-w-7xl mx-auto">
    <FadeInCard>
      <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">Who We Are</p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-foreground">Core Mission</h2>
      <p className="text-muted-foreground max-w-2xl mb-14 leading-relaxed">
        Operating under UK Companies House regulations, Araska Cyber Core delivers sovereign-grade
        security operations with full legal accountability and international compliance standards.
      </p>
    </FadeInCard>

    <div className="grid md:grid-cols-3 gap-6">
      {roles.map((role, i) => (
        <FadeInCard key={role.title} delay={i * 0.12}>
          <div className="glass-card rounded-xl p-8 h-full hover:neon-border transition-all duration-300">
            <role.icon className="text-primary mb-5" size={28} />
            <h3 className="font-display text-lg font-semibold mb-3 text-foreground">{role.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{role.desc}</p>
          </div>
        </FadeInCard>
      ))}
    </div>
  </section>
);

export default MissionSection;
