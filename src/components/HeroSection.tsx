import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState, MouseEvent } from "react";
import { GraduationCap, ShieldCheck, ZoomIn, ShieldCheck as ShieldCheckIcon } from "lucide-react";

const BLUE = "232 100% 60%";
const RED = "0 84% 60%";
// Use brand blue for accents (lines, icons, borders) for a professional look
const TEAL = BLUE;

const services = [
  {
    title: "Consultancy & Training Awareness",
    Icon: GraduationCap,
    items: [
      "Expert Advisory",
      "Risk Assessment Gap",
      "Health Check Assessment",
      "Staff Training",
    ],
  },
  {
    title: "Cyber Defence",
    Icon: ShieldCheck,
    items: [
      "SOC 24/7 & Incident Response",
      "Threat Intelligence",
      "Vulnerability Management",
    ],
  },
  {
    title: "Cyber Offensive",
    Icon: ZoomIn,
    items: ["Penetration Testing", "Red Teaming", "Attack Surface Discovery"],
  },
];

// Glitch word: layered duplicates with color-channel offset
const GlitchWord = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => (
  <span
    className="glitch-text"
    data-text={text}
    style={{ color: `hsl(${color})` }}
  >
    {text}
  </span>
);

const HeroSection = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const [tilts, setTilts] = useState<Record<number, { rx: number; ry: number }>>({});

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
        return `M ${hub_x} ${hub_y} L ${cx} ${cy}`;
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

  const handleTilt = (i: number) => (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 12; // rotateY
    const rx = -(py - 0.5) * 12; // rotateX
    setTilts((t) => ({ ...t, [i]: { rx, ry } }));
  };
  const resetTilt = (i: number) => () => {
    setTilts((t) => ({ ...t, [i]: { rx: 0, ry: 0 } }));
    setHover((h) => (h === i ? null : h));
  };

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
      {/* Animated teal cyber grid */}
      <div className="absolute inset-0 cyber-grid-bg-light" />
      {/* Vertical data-stream lines (teal, low opacity) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[8, 22, 38, 55, 71, 86].map((leftPct, idx) => (
          <span
            key={leftPct}
            className="data-stream-line"
            style={{
              left: `${leftPct}%`,
              animationDelay: `${idx * 0.9}s`,
              animationDuration: `${5 + (idx % 3)}s`,
            }}
          />
        ))}
      </div>
      {/* Soft vignette so text reads cleanly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, transparent 0%, hsl(220 30% 96% / 0.85) 80%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-10 w-full text-center"
      >
        <motion.div variants={item} className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-10 bg-slate-300" />
          <span
            className="text-xs tracking-[0.25em] uppercase font-semibold"
            style={{ color: `hsl(${BLUE})` }}
          >
            Global Cybersecurity Operations
          </span>
          <span className="h-px w-10 bg-slate-300" />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-8 text-slate-900 tracking-[-0.02em]"
        >
          We <GlitchWord text="See" color={BLUE} /> What
          <br />
          Others <GlitchWord text="Miss!" color="0 84% 60%" />
        </motion.h1>

        <motion.p
          variants={item}
          className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-3 leading-relaxed"
        >
          We help organisations identify the security gaps, build cyber resilience,
          and stay ahead of threats. Whether it's expert advisory, 24/7 SOC
          monitoring, vulnerability management, or even red teaming.
        </motion.p>
        <motion.p
          variants={item}
          className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Our three core services are designed to protect you at every stage.
        </motion.p>

        <motion.div variants={item} className="flex justify-center">
          <Link
            to="/get-a-quote"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm uppercase tracking-[0.08em] rounded text-white transition-all hover:brightness-110"
            style={{
              background: `hsl(${BLUE})`,
              boxShadow: `0 0 24px hsl(${BLUE} / 0.45)`,
            }}
          >
            Get a Quote
          </Link>
        </motion.div>
      </motion.div>

      {/* Services with neural connections */}
      <div ref={gridRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-24">
        <div className="relative h-10 mb-2 flex items-center justify-center">
          <div
            ref={hubRef}
            className="w-3 h-3 rounded-full"
            style={{
              background: `hsl(${BLUE})`,
              boxShadow: `0 0 12px hsl(${BLUE} / 0.9)`,
            }}
          />
        </div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {paths.map((d, i) =>
            d ? (
              <g key={i}>
                {/* base faint line */}
                <path
                  d={d}
                  fill="none"
                  stroke={`hsl(${TEAL})`}
                  strokeOpacity={hover === i ? 0.55 : 0.18}
                  strokeWidth={hover === i ? 1.5 : 1}
                  style={{ transition: "stroke-opacity 0.3s ease, stroke-width 0.3s ease" }}
                />
                {/* glowing flow on hover */}
                {hover === i && (
                  <path
                    d={d}
                    fill="none"
                    stroke={`hsl(${TEAL})`}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                    style={{
                      filter: `drop-shadow(0 0 6px hsl(${TEAL} / 0.9))`,
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr relative"
          style={{ perspective: "1200px" }}
        >
          {services.map((s, i) => {
            const isHover = hover === i;
            const { Icon } = s;
            const tilt = tilts[i] ?? { rx: 0, ry: 0 };
            return (
              <motion.div
                key={s.title}
                variants={item}
                className="card-float"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  onMouseEnter={() => setHover(i)}
                  onMouseMove={handleTilt(i)}
                  onMouseLeave={resetTilt(i)}
                  className="tilt-card h-full rounded-xl p-6 backdrop-blur-md"
                  style={{
                    background: isHover
                      ? "hsl(0 0% 100% / 0.85)"
                      : "hsl(0 0% 100% / 0.65)",
                    border: `1px solid ${
                      isHover ? `hsl(${TEAL} / 0.7)` : `hsl(${TEAL} / 0.25)`
                    }`,
                    boxShadow: isHover
                      ? `0 18px 40px -10px hsl(${TEAL} / 0.35), 0 0 0 1px hsl(${TEAL} / 0.2)`
                      : `0 4px 14px -8px hsl(222 30% 8% / 0.12)`,
                    transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${isHover ? -4 : 0}px)`,
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                    style={{
                      background: `hsl(${TEAL} / 0.12)`,
                      transform: "translateZ(20px)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: `hsl(${TEAL})` }}
                    />
                  </div>
                  <h3
                    className="text-slate-900 font-bold text-base mb-4 leading-snug"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    {s.title}
                  </h3>
                  <ul className="space-y-2">
                    {s.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed"
                      >
                        <span
                          className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: `hsl(${TEAL})` }}
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
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
