import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, FileSignature, Monitor, Users, Check, ArrowRight } from "lucide-react";

type IconAnim = "rotate" | "sign" | "pulse" | "people";

const pillars: {
  title: string;
  desc: string;
  anim: IconAnim;
  className: string;
}[] = [
  {
    title: "Global, but close to you",
    desc: "We are based in the UK and work with clients around the world. We understand local rules and global threats.",
    anim: "rotate",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "No long contracts to start",
    desc: "Every project starts with a chat. We shape our service around your needs — not a fixed package that doesn't fit.",
    anim: "sign",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Powered by Microsoft",
    desc: "Our SOC runs on Microsoft Sentinel and Defender — the same enterprise tools used by the world's biggest companies. Backed by enterprise-grade security infrastructure trusted globally.",
    anim: "pulse",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    title: "Real people, not just robots",
    desc: "Every alert is checked by a human expert. Machines help us go fast — but people make the final call.",
    anim: "people",
    className: "lg:col-span-2 lg:row-span-1",
  },
];

const AnimatedIcon = ({ anim, hovered }: { anim: IconAnim; hovered: boolean }) => {
  const color = "hsl(var(--primary))";
  switch (anim) {
    case "rotate":
      return (
        <motion.div
          animate={hovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, ease: "linear", repeat: hovered ? Infinity : 0 }}
        >
          <Globe size={24} strokeWidth={1.6} style={{ color }} />
        </motion.div>
      );
    case "sign":
      return (
        <div className="relative w-6 h-6">
          <motion.div
            animate={hovered ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <FileSignature size={24} strokeWidth={1.6} style={{ color }} />
          </motion.div>
          <motion.div
            initial={false}
            animate={hovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4, rotate: -45 }}
            transition={{ duration: 0.35, ease: "backOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check size={24} strokeWidth={2.4} style={{ color }} />
          </motion.div>
        </div>
      );
    case "pulse":
      return (
        <motion.div
          animate={
            hovered
              ? {
                  scale: [1, 1.18, 1],
                  filter: [
                    "drop-shadow(0 0 0px hsl(var(--primary)))",
                    "drop-shadow(0 0 10px hsl(var(--primary)))",
                    "drop-shadow(0 0 0px hsl(var(--primary)))",
                  ],
                }
              : { scale: 1 }
          }
          transition={{ duration: 1.4, ease: "easeInOut", repeat: hovered ? Infinity : 0 }}
        >
          <Monitor size={24} strokeWidth={1.6} style={{ color }} />
        </motion.div>
      );
    case "people":
      return (
        <motion.div
          animate={hovered ? { x: [0, -1.5, 1.5, 0] } : { x: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", repeat: hovered ? Infinity : 0 }}
          style={{ filter: hovered ? "drop-shadow(0 0 6px hsl(var(--primary) / 0.5))" : "none" }}
        >
          <Users size={24} strokeWidth={1.6} style={{ color }} />
        </motion.div>
      );
  }
};

const PillarCard = ({
  p,
  i,
  inView,
}: {
  p: typeof pillars[number];
  i: number;
  inView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: [0, -6, 0], // gentle levitation
            }
          : {}
      }
      transition={{
        opacity: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
        y: {
          duration: 5 + i * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.3,
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      className={`group relative ${p.className}`}
    >
      <div
        className="relative h-full bg-white rounded-2xl p-8 lg:p-10 transition-all duration-300 overflow-hidden flex flex-col"
        style={{
          border: "1px solid #E6EAF0",
          boxShadow: hovered
            ? "0 24px 50px -20px hsl(var(--primary) / 0.30), 0 8px 18px -10px rgba(15,23,42,0.08)"
            : "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -16px rgba(15,23,42,0.10)",
        }}
      >
        {/* soft corner accent */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.18), transparent 70%)" }}
        />

        <div
          className="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
          style={{
            background: "hsl(var(--primary) / 0.08)",
            border: "1px solid hsl(var(--primary) / 0.25)",
          }}
        >
          <AnimatedIcon anim={p.anim} hovered={hovered} />
        </div>

        <h3 className="text-[20px] font-semibold mb-3 text-light-foreground tracking-[-0.01em]">
          {p.title}
        </h3>
        <p className="text-[15px] leading-[1.8] text-[#3A4A5C] flex-1">{p.desc}</p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
          <span>Learn more</span>
          <motion.span
            animate={hovered ? { x: 6 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex"
          >
            <ArrowRight size={16} strokeWidth={2} />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

const WhyUsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
