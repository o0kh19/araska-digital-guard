import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Key, ShieldCheck, Siren, Radar, FileSearch, Zap, GraduationCap } from "lucide-react";
import cyberShield from "@/assets/cyber-shield.jpg";

const primaryServices = [
  {
    icon: Key,
    title: "24/7 Proactive Monitoring (SOC)",
    desc: "Our experts watch your systems 24/7. We find threats, stop them fast, and tell you what happened — in plain language.",
    slug: "soc-as-a-service",
  },
  {
    icon: ShieldCheck,
    title: "Threat & Risk Analysis (Intel & Assessment)",
    desc: "We track the attackers who target your industry, so you know what to defend against — before they strike.",
    slug: "threat-risk-analysis",
  },
  {
    icon: Siren,
    title: "Emergency Response & Security Training",
    desc: "Fast incident containment plus practical staff training to reduce human error and recover faster.",
    slug: "emergency-response-training",
  },
];

const secondaryServices = [
  { icon: Radar, title: "Vulnerability Management", slug: "vulnerability-management" },
  { icon: FileSearch, title: "vCISO Advisory", slug: "vciso-advisory" },
  { icon: Zap, title: "M365 Security Hardening", slug: "m365-hardening" },
  { icon: GraduationCap, title: "Security Policy Development", slug: "security-policy-development" },
];

type LinePath = { d: string };

const ServicesOverview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [paths, setPaths] = useState<LinePath[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const recalcLines = useCallback(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;
    const cRect = container.getBoundingClientRect();
    const iRect = image.getBoundingClientRect();
    const startX = iRect.left - cRect.left + iRect.width / 2;
    const startY = iRect.top - cRect.top + iRect.height; // bottom-center of image

    const next: LinePath[] = cardRefs.current.map((el) => {
      if (!el) return { d: "" };
      const r = el.getBoundingClientRect();
      const endX = r.left - cRect.left + r.width / 2;
      const endY = r.top - cRect.top + 8; // top of card
      // Cubic bezier curving downward
      const c1x = startX;
      const c1y = startY + Math.max(60, (endY - startY) * 0.45);
      const c2x = endX;
      const c2y = endY - Math.max(40, (endY - startY) * 0.35);
      return { d: `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}` };
    });
    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    recalcLines();
  }, [recalcLines]);

  useEffect(() => {
    const onResize = () => recalcLines();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    // Recalc after fonts/images settle
    const t = setTimeout(recalcLines, 250);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      clearTimeout(t);
    };
  }, [recalcLines]);
  const anyHovered = hoveredIdx !== null;
  return (
    <section id="services" className="section-padding section-dark relative overflow-hidden" ref={ref}>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="eyebrow text-xl">What We Do</span>
          <span className="eyebrow-rule" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground tracking-[-0.015em]">
            End-to-End Cybersecurity Services
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-[1.8]">
            Tailored to your organisation's size, industry, and risk profile.
          </p>
        </motion.div>

        {/* Neural network container: image + lines + cards */}
        <div ref={containerRef} className="relative" style={{ perspective: "1200px" }}>
          {/* SVG connection layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
            {paths.map((p, i) => (
              <g key={i}>
                <path d={p.d} className={`neural-line-base ${hoveredIdx === i ? "is-active" : ""}`} />
                <path d={p.d} className={`neural-line-flow ${hoveredIdx === i ? "is-active" : ""}`} />
              </g>
            ))}
          </svg>

          {/* Central image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-xl overflow-hidden mb-10"
            style={{
              border: "1px solid hsl(var(--primary) / 0.25)",
              boxShadow: "0 20px 60px -20px hsl(var(--primary) / 0.35)",
              zIndex: 2,
            }}
          >
            <img
              src={cyberShield}
              alt="Digital shield protecting a network of connected systems"
              loading="lazy"
              width={1280}
              height={800}
              className="w-full h-[260px] sm:h-[340px] object-cover block"
              onLoad={recalcLines}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, rgba(5,10,20,0.6) 0%, rgba(5,10,20,0) 50%, rgba(5,10,20,0.6) 100%)",
              }}
            />
            <div className="image-scan-line" />
            <div className="radar-pulse" />
            <div className="radar-pulse delay-1" />
            <div className="radar-pulse delay-2" />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-primary/40">
              <span className={`status-dot ${anyHovered ? "fast" : ""}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white font-mono-label">
                {anyHovered ? "Live · Activity Detected" : "Live · Monitoring"}
              </span>
            </div>
          </motion.div>

          {/* Primary services grid - 3 large cards */}
          <div
            data-card-grid
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr relative"
            style={{ zIndex: 2 }}
          >
            {primaryServices.map((svc, i) => {
              const isActive = hoveredIdx === i;
              return (
                <motion.div
                  key={svc.title}
                  ref={(el) => (cardRefs.current[i] = el)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx((cur) => (cur === i ? null : cur))}
                  whileHover={{ rotateX: -4, rotateY: 6, translateY: -8, scale: 1.02 }}
                  className="services-card rounded-lg p-9 flex flex-col items-center text-center group h-full"
                  style={{
                    background: "#FFFFFF",
                    border: `1px solid ${isActive ? "hsl(var(--primary) / 0.7)" : "hsl(var(--primary) / 0.18)"}`,
                    borderRadius: "8px",
                    boxShadow: isActive
                      ? "0 24px 50px -14px hsl(var(--primary) / 0.5), 0 0 0 1px hsl(var(--primary) / 0.45), 0 0 24px hsl(var(--primary) / 0.35)"
                      : "0 1px 3px rgba(0,0,0,0.04)",
                    transformStyle: "preserve-3d",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div
                    className="w-[52px] h-[52px] rounded-md flex items-center justify-center mb-5 transition-transform duration-500"
                    style={{
                      background: "hsl(var(--primary) / 0.08)",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                      transform: isActive ? "translateZ(20px) scale(1.1)" : "translateZ(0) scale(1)",
                    }}
                  >
                    <svc.icon
                      className={`text-primary ${isActive ? "icon-spin-fast" : ""}`}
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-[18px] font-bold uppercase tracking-wide text-foreground mb-3 leading-tight">
                    {svc.title}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.7] mb-6 flex-1 font-bold">{svc.desc}</p>
                  <Link
                    to={`/services#${svc.slug}`}
                    className="inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-wider rounded border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Learn More
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Secondary services row - 4 compact cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 relative" style={{ zIndex: 2 }}>
            {secondaryServices.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <Link
                  to={`/services#${svc.slug}`}
                  className="bg-white rounded-lg p-5 flex flex-col items-start gap-3 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-12px_hsl(var(--primary)/0.4)]"
                  style={{ border: "1px solid hsl(var(--primary) / 0.18)" }}
                >
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center"
                    style={{
                      background: "hsl(var(--primary) / 0.08)",
                      border: "1px solid hsl(var(--primary) / 0.25)",
                    }}
                  >
                    <svc.icon className="text-primary" size={18} strokeWidth={1.6} />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground leading-snug">{svc.title}</h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
