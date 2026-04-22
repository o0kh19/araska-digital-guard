import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
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
          <Globe size={24} strokeWidth={1.6} style={{ color: "hsl(var(--primary))" }} />
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
            <FileSignature size={24} strokeWidth={1.6} style={{ color: "hsl(var(--primary))" }} />
          </motion.div>
          <motion.div
            initial={false}
            animate={hovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4, rotate: -45 }}
            transition={{ duration: 0.35, ease: "backOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check size={24} strokeWidth={2.4} style={{ color: "hsl(var(--primary))" }} />
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
                    "drop-shadow(0 0 12px hsl(var(--primary)))",
                    "drop-shadow(0 0 0px hsl(var(--primary)))",
                  ],
                }
              : { scale: 1 }
          }
          transition={{ duration: 1.4, ease: "easeInOut", repeat: hovered ? Infinity : 0 }}
        >
          <Monitor size={24} strokeWidth={1.6} style={{ color: "hsl(var(--primary))" }} />
        </motion.div>
      );
    case "people":
      return (
        <motion.div
          animate={hovered ? { x: [0, -1.5, 1.5, 0] } : { x: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", repeat: hovered ? Infinity : 0 }}
          style={{ filter: hovered ? "drop-shadow(0 0 8px hsl(var(--primary) / 0.7))" : "none" }}
        >
          <Users size={24} strokeWidth={1.6} style={{ color: "hsl(var(--primary))" }} />
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="hud-border"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="rounded-[13px] p-9 h-full relative overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: hovered
            ? "0 20px 60px -20px hsl(var(--primary) / 0.55), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 10px 40px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* subtle inner highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[13px]"
          style={{
            background:
              "radial-gradient(120% 80% at 0% 0%, hsl(var(--primary) / 0.10), transparent 50%)",
          }}
        />

        <div
          className="w-[52px] h-[52px] rounded-md flex items-center justify-center mb-5 transition-all duration-300 relative z-10"
          style={{
            background: "rgba(31,143,203,0.10)",
            border: "1px solid hsl(var(--primary) / 0.35)",
            boxShadow: "inset 0 0 12px hsl(var(--primary) / 0.18)",
          }}
        >
          <AnimatedIcon anim={p.anim} hovered={hovered} />
        </div>
        <h3 className="text-[19px] font-semibold mb-3 text-white relative z-10">{p.title}</h3>
        <p className="text-[15px] leading-[1.8] relative z-10" style={{ color: "rgba(255,255,255,0.72)" }}>
          {p.desc}
        </p>
      </div>
    </motion.div>
  );
};

const WhyUsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // 3D tilt for the entire grid based on mouse position
  const gridRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 14, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 80, damping: 14, mass: 0.4 });
  // opposite tilt = invert sign
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="section-padding relative overflow-hidden hud-grid" ref={ref}>
      {/* vignette overlay */}
      <div className="absolute inset-0 pointer-events-none hud-vignette" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="eyebrow">// FLOATING HUD</span>
          <span className="eyebrow-rule" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.015em]">
            Why Organisations Choose Us
          </h2>
        </motion.div>

        <div style={{ perspective: 1200 }}>
          <motion.div
            ref={gridRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {pillars.map((p, i) => (
              <PillarCard key={p.title} p={p} i={i} inView={inView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
