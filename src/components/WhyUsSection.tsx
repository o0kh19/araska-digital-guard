import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, HandshakeIcon, Monitor, UserCheck } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Global Reach, Local Understanding",
    desc: "Headquartered in the UK with a global client base, we understand the regulatory, operational, and threat landscapes that matter to your organisation.",
  },
  {
    icon: HandshakeIcon,
    title: "No Retainer Lock-in on Assessments",
    desc: "Every engagement starts with a conversation. We scope our services around your needs, not a fixed package that doesn't fit.",
  },
  {
    icon: Monitor,
    title: "Microsoft-Powered SOC",
    desc: "Our SOC is built on Microsoft Sentinel and Defender — enterprise-grade tools used by the world's most security-conscious organisations, delivered at a scale that works for you.",
  },
  {
    icon: UserCheck,
    title: "Analysts, Not Algorithms",
    desc: "Every alert is reviewed by a human analyst. We don't let automated rules replace expert judgement when your security is at stake.",
  },
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">Why Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Why Organisations Choose Us
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-8 hover:neon-border transition-all duration-300"
            >
              <p.icon className="text-primary mb-4" size={24} />
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
