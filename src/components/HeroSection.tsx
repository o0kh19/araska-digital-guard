import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { Brain, ShieldAlert, Siren, GraduationCap } from "lucide-react";

const services = [
  {
    title: "Threat Intelligence",
    desc: "Proactive insights on emerging risks targeting your industry.",
    Icon: Brain,
  },
  {
    title: "Vulnerability Management",
    desc: "Continuous discovery and remediation across your attack surface.",
    Icon: ShieldAlert,
  },
  {
    title: "Incident Response",
    desc: "Rapid containment and recovery, 24/7, by senior analysts.",
    Icon: Siren,
  },
  {
    title: "Security Training",
    desc: "Empower your people to spot and stop social engineering.",
    Icon: GraduationCap,
  },
];

type Pt = { x: number; y: number };

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

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[hsl(222_60%_6%)]">
      {/* Cyber grid backdrop */}
      <div className="absolute inset-0 cyber-grid-bg opacity-70" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 0%, hsl(222 60% 6% / 0.85) 75%)",
        }}
      />
      {/* Data stream lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[8, 22, 38, 55, 71, 86, 94].map((leftPct, i) => (
          <span
            key={i}
            className="data-stream-line"
            style={{
              left: `${leftPct}%`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 w-full text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs tracking-[0.25em] uppercase font-medium text-cyan-300 block">
            Global Cybersecurity Operations
          </span>
          <span className="block w-12 h-0.5 mt-3 mb-6 bg-cyan-300 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-white tracking-[-0.02em]"
          aria-label={headline}
        >
          Your Threat Is{" "}
          <span className="glitch-text" data-text="Real">
            Real
          </span>
          .
          <br />
          So Is Our{" "}
          <span className="glitch-text" data-text="Response">
            Response
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We provide 24/7 security monitoring, threat intelligence, and rapid
          incident response to protect your digital assets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/cyber-health-check"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm uppercase tracking-[0.08em] rounded border-2 border-cyan-300/70 text-cyan-100 hover:bg-cyan-300/10 hover:border-cyan-300 transition-all"
          >
            Free Health Check
          </Link>
          <Link
            to="/get-a-quote"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm uppercase tracking-[0.08em] rounded text-[hsl(222_60%_8%)] transition-all hover:brightness-110"
            style={{ background: "hsl(180 80% 45%)", boxShadow: "0 0 24px hsl(180 80% 45% / 0.45)" }}
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>

      {/* Services grid w/ neural connections */}
      <div ref={gridRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24">
        {/* Hub anchor (visually a glow above the grid) */}
        <div className="relative h-10 mb-2 flex items-center justify-center">
          <div
            ref={hubRef}
            className="w-3 h-3 rounded-full"
            style={{
              background: "hsl(180 80% 60%)",
              boxShadow:
                "0 0 12px hsl(180 80% 60% / 0.9), 0 0 28px hsl(180 80% 60% / 0.6)",
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
                  className={`neural-line-base ${hover === i ? "is-active" : ""}`}
                />
                <path
                  d={d}
                  className={`neural-line-flow ${hover === i ? "is-active" : ""}`}
                />
              </g>
            ) : null
          )}
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr relative">
          {services.map((s, i) => {
            const isHover = hover === i;
            const { Icon } = s;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
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
                  className="tilt-card h-full rounded-xl p-6 backdrop-blur-md"
                  style={{
                    background: "hsl(0 0% 100% / 0.06)",
                    border: `1px solid ${
                      isHover
                        ? "hsl(180 80% 55% / 0.85)"
                        : "hsl(180 80% 55% / 0.30)"
                    }`,
                    boxShadow: isHover
                      ? "0 18px 50px -10px hsl(180 80% 45% / 0.55), inset 0 0 0 1px hsl(180 80% 55% / 0.25)"
                      : "0 8px 24px -10px hsl(180 80% 45% / 0.25)",
                    transform: isHover
                      ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`
                      : "rotateX(0) rotateY(0)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: "hsl(180 80% 55% / 0.12)",
                      border: "1px solid hsl(180 80% 55% / 0.4)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: "hsl(180 90% 70%)" }}
                    />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">
                    {s.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
