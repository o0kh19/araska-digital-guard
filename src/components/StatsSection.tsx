import { motion, useInView, useMotionValue, useTransform, animate, useSpring } from "framer-motion";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { ShieldCheck, Clock, Users, Lock } from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    prefix: "",
    label: "Compliance",
    desc: "Aligned with global NIST & OWASP standards",
    format: (n: number) => Math.round(n).toString(),
    decimals: 0,
  },
  {
    icon: Clock,
    value: 15,
    prefix: "<",
    suffix: " Mins",
    label: "Response Time",
    desc: "Target critical incident response time",
    format: (n: number) => Math.round(n).toString(),
    decimals: 0,
  },
  {
    icon: Users,
    value: 24,
    prefix: "",
    suffix: "/7",
    label: "Live Monitoring",
    desc: "Around-the-clock proactive monitoring",
    format: (n: number) => Math.round(n).toString(),
    decimals: 0,
  },
  {
    icon: Lock,
    value: 0,
    prefix: "",
    suffix: "%",
    label: "Data Loss Margin",
    desc: "Tolerance for client data loss in our incident response plans",
    format: (n: number) => Math.round(n).toString(),
    decimals: 0,
  },
];

const GLITCH_CHARS = "0123456789#@$%&*";

const GlitchCounter = ({
  to,
  format,
  decimals,
  inView,
}: {
  to: number;
  format: (n: number) => string;
  decimals: number;
  inView: boolean;
}) => {
  const count = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [glitching, setGlitching] = useState(true);

  useEffect(() => {
    if (!inView) return;

    // Glitch phase: shuffle random characters
    const finalStr = format(to);
    const glitchInterval = setInterval(() => {
      if (!ref.current) return;
      const scrambled = finalStr
        .split("")
        .map((c) =>
          /[0-9]/.test(c)
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : c
        )
        .join("");
      ref.current.textContent = scrambled;
    }, 60);

    // After ~700ms, stop glitching and run the count-up
    const stopGlitch = setTimeout(() => {
      clearInterval(glitchInterval);
      setGlitching(false);
      const controls = animate(count, to, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (ref.current) ref.current.textContent = format(latest);
        },
        onComplete: () => {
          if (ref.current) ref.current.textContent = format(to);
        },
      });
      return () => controls.stop();
    }, 700);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(stopGlitch);
    };
  }, [inView, to, count, format]);

  return (
    <span
      ref={ref}
      className={glitching ? "inline-block [text-shadow:0_0_8px_hsl(var(--primary)/0.6)]" : "inline-block"}
    >
      {format(0)}
    </span>
  );
};

const TiltCard = ({ children, index, inView }: { children: React.ReactNode; index: number; inView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rY = ((x - cx) / cx) * 8;
    const rX = -((y - cy) / cy) * 8;
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: -25, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 14,
        mass: 0.8,
        delay: index * 0.15,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="relative"
    >
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
    </motion.div>
  );
};

const NetworkGrid = () => {
  // Pre-computed nodes for a subtle animated network
  const nodes = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: (i * 137.5) % 100,
    y: ((i * 73.3) % 100),
    delay: (i % 6) * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.25) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      {/* Slow drifting overlay grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "112px 112px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "112px 112px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      {/* Pulsing nodes */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((n) => (
          <motion.circle
            key={n.id}
            cx={`${n.x}%`}
            cy={`${n.y}%`}
            r={2.5}
            fill="hsl(var(--primary))"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: n.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
      {/* Soft glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.06), transparent 60%)",
        }}
      />
    </div>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-light relative overflow-hidden" ref={ref}>
      <NetworkGrid />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-xl">By the Numbers</span>
          <span className="eyebrow-rule mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-light-foreground tracking-[-0.015em]">
            Why Choose ArasKa Cyber Core?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-[1.8] mt-4">
            Real results, measured every day. Here's the impact we deliver for our clients.
          </p>
        </motion.div>

        <div data-card-grid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: 1200 }}>
          {stats.map((s, i) => (
            <TiltCard key={s.label} index={i} inView={inView}>
              <div
                className="bg-white rounded-lg p-9 text-center transition-shadow duration-300 group h-full flex flex-col items-center"
                style={{
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#1F8FCB";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px -12px rgba(31,143,203,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E2E8F0";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-md flex items-center justify-center mb-5 mx-auto"
                  style={{
                    background: "rgba(31,143,203,0.08)",
                    border: "1px solid rgba(31,143,203,0.2)",
                    transform: "translateZ(40px)",
                  }}
                >
                  <s.icon className="text-primary" size={26} strokeWidth={1.5} />
                </div>
                <div
                  className="text-4xl sm:text-5xl font-extrabold text-primary tracking-[-0.02em] mb-2 font-mono"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {s.prefix && <span>{s.prefix}</span>}
                  <GlitchCounter
                    to={s.value}
                    format={s.format}
                    decimals={s.decimals}
                    inView={inView}
                  />
                  <span>{s.suffix}</span>
                </div>
                <h3 className="text-[19px] font-semibold mb-2 text-light-foreground">
                  {s.label}
                </h3>
                <p className="text-[#3A4A5C] text-[14px] leading-[1.7]">{s.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
