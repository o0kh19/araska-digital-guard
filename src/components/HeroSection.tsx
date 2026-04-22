import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { ShieldCheck, Bug, Siren, GraduationCap } from "lucide-react";

const TEAL = "232 100% 60%";
const CYAN = "210 100% 55%";

const services = [
  {
    title: "Threat Intelligence",
    desc: "Industry Risk Insight",
    Icon: ShieldCheck,
  },
  {
    title: "Vulnerability Management",
    desc: "Attack Surface Discovery & Fix",
    Icon: Bug,
  },
  {
    title: "Incident Response",
    desc: "24/7 Senior Analyst Handling",
    Icon: Siren,
  },
  {
    title: "Security Training",
    desc: "Social Engineering Defense",
    Icon: GraduationCap,
  },
];

const HeroSection = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  useLayoutEffect(() => {
    const compute = () => {
      const g = gridRef.current;
      const hub = hubRef.current;
      if (!g || !hub) return;
      const gRect = g.getBoundingClientRect();
      const hRect = hub.getBoundingClientRect();
      const hub_x = hRect.left + hRect.width / 2 - gRect.left;
      const hub_y = hRect.top + hRect.height / 2 - gRect.top;
      const next: string[] = cardRefs.current.map((c) => {
        if (!c) return "";
        const r = c.getBoundingClientRect();
        const cx = r.left + r.width / 2 - gRect.left;
        const cy = r.top - gRect.top;
        const mx = (hub_x + cx) / 2;
        const my = (hub_y + cy) / 2 - 30;
        return `M ${hub_x} ${hub_y} Q ${mx} ${my} ${cx} ${cy}`;
      });
      setPaths(next);
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (gridRef.current) ro.observe(gridRef.current);
    cardRefs.current.forEach((c) => c && ro.observe(c));
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const ry = ((x / r.width) - 0.5) * 14;
    const rx = -((y / r.height) - 0.5) * 14;
    setTilt({ rx, ry });
  };

  const headline = "Your Threat Is Real. So Is Our Response.";
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-slate-50">
      {/* Light cyber grid backdrop */}
      <div className="absolute inset-0 cyber-grid-bg-light" />
      {/* Soft vignette to focus content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 0%, hsl(220 30% 96% / 0.85) 80%)",
        }}
      />
      {/* Subtle teal data stream lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[8, 22, 38, 55, 71, 86, 94].map((leftPct, i) => (
          <span
            key={i}
            className="data-stream-line"
            style={{
              left: `${leftPct}%`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${5 + (i % 3)}s`,
              background:
                "linear-gradient(to bottom, transparent, hsl(180 70% 45% / 0.35), transparent)",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 w-full text-center"
      >
        <motion.div variants={item}>
          <span
            className="text-xs tracking-[0.25em] uppercase font-semibold block"
            style={{ color: `hsl(${TEAL})` }}
          >
            Global Cybersecurity Operations
          </span>
          <span
            className="block w-12 h-0.5 mt-3 mb-6 mx-auto"
            style={{ background: `hsl(${TEAL})` }}
          />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-slate-900 tracking-[-0.02em]"
          aria-label={headline}
        >
          Your Threat Is{" "}
          <span className="glitch-text glitch-teal" data-text="Real">
            Real
          </span>
          .
          <br />
          So Is Our{" "}
          <span className="glitch-text glitch-teal" data-text="Response">
            Response
          </span>
          .
        </motion.h1>

        <motion.p
          variants={item}
          className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We provide 24/7 security monitoring, threat intelligence, and rapid
          incident response to protect your digital assets.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/cyber-health-check"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm uppercase tracking-[0.08em] rounded border-2 transition-all"
            style={{
              borderColor: `hsl(${TEAL})`,
              color: `hsl(${TEAL})`,
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `hsl(${TEAL} / 0.08)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Free Health Check
          </Link>
          <Link
            to="/get-a-quote"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm uppercase tracking-[0.08em] rounded text-white transition-all hover:brightness-110"
            style={{
              background: `hsl(${TEAL})`,
              boxShadow: `0 0 24px hsl(${TEAL} / 0.45)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 36px hsl(${CYAN} / 0.7)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 24px hsl(${TEAL} / 0.45)`;
            }}
          >
            Get a Quote
          </Link>
        </motion.div>
      </motion.div>

      {/* Services grid w/ neural connections */}
      <div ref={gridRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24">
        {/* Hub anchor */}
        <div className="relative h-10 mb-2 flex items-center justify-center">
          <div
            ref={hubRef}
            className="w-3 h-3 rounded-full"
            style={{
              background: `hsl(${TEAL})`,
              boxShadow: `0 0 12px hsl(${TEAL} / 0.9), 0 0 28px hsl(${CYAN} / 0.6)`,
            }}
          />
        </div>

        {/* SVG connection layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {paths.map((d, i) =>
            d ? (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke={`hsl(${TEAL})`}
                  strokeOpacity={hover === i ? 0.8 : 0.2}
                  strokeWidth={hover === i ? 1.75 : 1.25}
                  style={{
                    filter:
                      hover === i
                        ? `drop-shadow(0 0 6px hsl(${CYAN} / 0.7))`
                        : "none",
                    transition: "stroke-opacity 0.3s ease, stroke-width 0.3s ease",
                  }}
                />
                {hover === i && (
                  <path
                    d={d}
                    fill="none"
                    stroke={`hsl(${CYAN})`}
                    strokeWidth={2}
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                    style={{
                      filter: `drop-shadow(0 0 6px hsl(${CYAN} / 0.9))`,
                      animation: "neural-flow 0.6s linear infinite",
                    }}
                  />
                )}
              </g>
            ) : null
          )}
        </svg>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr relative"
        >
          {services.map((s, i) => {
            const isHover = hover === i;
            const { Icon } = s;
            return (
              <motion.div
                key={s.title}
                variants={item}
                className="card-float"
                style={{ animationDelay: `${i * 0.4}s`, perspective: 1000 }}
              >
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => {
                    setHover(null);
                    setTilt({ rx: 0, ry: 0 });
                  }}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  className="tilt-card h-full rounded-xl p-6 bg-white/70 backdrop-blur-md"
                  style={{
                    border: `1px solid ${
                      isHover
                        ? `hsl(${TEAL} / 0.85)`
                        : `hsl(${TEAL} / 0.30)`
                    }`,
                    boxShadow: isHover
                      ? `0 18px 50px -10px hsl(${CYAN} / 0.45), inset 0 0 0 1px hsl(${TEAL} / 0.25)`
                      : `0 8px 24px -12px hsl(${TEAL} / 0.25)`,
                    transform: isHover
                      ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`
                      : "rotateX(0) rotateY(0)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: `hsl(${TEAL} / 0.10)`,
                      border: `1px solid hsl(${TEAL} / 0.35)`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: `hsl(${TEAL})` }}
                    />
                  </div>
                  <h3 className="text-slate-900 font-semibold text-base mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
