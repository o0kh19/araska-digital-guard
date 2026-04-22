import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, FileSignature, Monitor, Users, Check } from "lucide-react";

type IconAnim = "rotate" | "sign" | "pulse" | "people";

const pillars: {
  title: string;
  desc: string;
  anim: IconAnim;
}[] = [
  {
    title: "Global, but close to you",
    desc: "We are based in the UK and work with clients around the world. We understand local rules and global threats.",
    anim: "rotate",
  },
  {
    title: "No long contracts to start",
    desc: "Every project starts with a chat. We shape our service around your needs — not a fixed package that doesn't fit.",
    anim: "sign",
  },
  {
    title: "Powered by Microsoft",
    desc: "Our SOC runs on Microsoft Sentinel and Defender — the same enterprise tools used by the world's biggest companies.",
    anim: "pulse",
  },
  {
    title: "Real people, not just robots",
    desc: "Every alert is checked by a human expert. Machines help us go fast — but people make the final call.",
    anim: "people",
  },
];

const AnimatedIcon = ({ anim, hovered }: { anim: IconAnim; hovered: boolean }) => {
  switch (anim) {
    case "rotate":
      return (
        <motion.div
          animate={hovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, ease: "linear", repeat: hovered ? Infinity : 0 }}
        >
          <Globe className="text-primary" size={22} strokeWidth={1.6} />
        </motion.div>
      );
    case "sign":
      return (
        <div className="relative w-[22px] h-[22px]">
          <motion.div
            animate={hovered ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <FileSignature className="text-primary" size={22} strokeWidth={1.6} />
          </motion.div>
          <motion.div
            initial={false}
            animate={hovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4, rotate: -45 }}
            transition={{ duration: 0.35, ease: "backOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check className="text-primary" size={22} strokeWidth={2.4} />
          </motion.div>
        </div>
      );
    case "pulse":
      return (
        <motion.div
          animate={hovered ? { scale: [1, 1.18, 1], filter: ["drop-shadow(0 0 0px hsl(var(--primary)))", "drop-shadow(0 0 10px hsl(var(--primary)))", "drop-shadow(0 0 0px hsl(var(--primary)))"] } : { scale: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut", repeat: hovered ? Infinity : 0 }}
        >
          <Monitor className="text-primary" size={22} strokeWidth={1.6} />
        </motion.div>
      );
    case "people":
      return (
        <motion.div
          animate={hovered ? { x: [0, -1.5, 1.5, 0] } : { x: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", repeat: hovered ? Infinity : 0 }}
          style={{ filter: hovered ? "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))" : "none" }}
        >
          <Users className="text-primary" size={22} strokeWidth={1.6} />
        </motion.div>
      );
  }
};

const PillarCard = ({ p, i, inView }: { p: typeof pillars[number]; i: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-lg p-9 transition-all duration-300"
      style={{
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        boxShadow: hovered
          ? '0 12px 30px -10px rgba(31,143,203,0.35), 0 0 0 1px rgba(31,143,203,0.45)'
          : '0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.03)',
        borderColor: hovered ? '#1F8FCB' : '#E2E8F0',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-[52px] h-[52px] rounded-md flex items-center justify-center mb-4 transition-all duration-300"
        style={{
          background: hovered ? 'rgba(31,143,203,0.14)' : 'rgba(31,143,203,0.08)',
          border: '1px solid rgba(31,143,203,0.25)',
        }}
      >
        <AnimatedIcon anim={p.anim} hovered={hovered} />
      </div>
      <h3 className="text-[19px] font-semibold mb-3 text-light-foreground">{p.title}</h3>
      <p className="text-[#3A4A5C] text-[15px] leading-[1.8]">{p.desc}</p>
    </motion.div>
  );
};

const WhyUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-light" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="eyebrow">Why Us</span>
          <span className="eyebrow-rule" />
          <h2 className="text-3xl sm:text-4xl font-bold text-light-foreground tracking-[-0.015em]">
            Why Organisations Choose Us
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
