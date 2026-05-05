import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Languages, Users, ShieldCheck, Zap } from "lucide-react";
import socDashboard from "@/assets/soc-dashboard.jpg";

const pillars = [
  {
    icon: Users,
    title: "Business-First",
    desc: "We learn how you operate, then tailor protection to your reality — never generic advice.",
  },
  {
    icon: Languages,
    title: "Your Language",
    desc: "Every report, briefing, and training in Kurdish, Arabic, or English for real clarity.",
  },
  {
    icon: ShieldCheck,
    title: "Always-On Defence",
    desc: "Keep your business running, your data secure, and your people prepared as threats evolve.",
  },
  {
    icon: Zap,
    title: "Rapid Response",
    desc: "When it matters most, a partner who knows your environment and acts within minutes.",
  },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-dark relative overflow-hidden" ref={ref}>
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="eyebrow text-xl">Why we do it</span>
          <span className="eyebrow-rule mb-6" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-[-0.02em] leading-[1.05] mb-6">
            Cybersecurity that <span className="text-primary">speaks your language</span> — and protects what matters.
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl leading-[1.7]">
            Cybersecurity is too often complex, costly, and hard to understand — leaving many businesses without the
            protection they need. At ArasKa Cyber Core, we're changing that.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Image card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-primary/20 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)] group"
          >
            <img
              src={socDashboard}
              alt="Modern 24/7 SOC team monitoring SIEM dashboards"
              loading="lazy"
              width={1280}
              height={800}
              className="w-full h-full object-cover min-h-[420px] transition-transform duration-700 group-hover:scale-105"
            />

            {/* Animated threat dots */}
            <div className="absolute pointer-events-none" style={{ top: "18%", left: "24%", width: "52%", height: "28%" }}>
              {[
                { top: "38%", left: "20%", color: "hsl(0 95% 60%)", delay: 0 },
                { top: "28%", left: "32%", color: "hsl(140 90% 50%)", delay: 0.9 },
                { top: "30%", left: "50%", color: "hsl(45 100% 55%)", delay: 0.5 },
                { top: "44%", left: "56%", color: "hsl(0 95% 60%)", delay: 1.3 },
                { top: "34%", left: "64%", color: "hsl(140 90% 50%)", delay: 0.3 },
                { top: "58%", left: "82%", color: "hsl(45 100% 55%)", delay: 1.0 },
                { top: "54%", left: "38%", color: "hsl(0 95% 60%)", delay: 1.9 },
              ].map((d, i) => (
                <div key={i} className="absolute" style={{ top: d.top, left: d.left }}>
                  <span
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: 22,
                      height: 22,
                      border: `2px solid ${d.color}`,
                      boxShadow: `0 0 10px ${d.color}`,
                      animation: `threat-ping 2.4s cubic-bezier(0,0,0.2,1) ${d.delay}s infinite`,
                    }}
                  />
                  <span
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      background: d.color,
                      boxShadow: `0 0 10px ${d.color}, 0 0 20px ${d.color}`,
                      animation: `threat-glow 2s ease-in-out ${d.delay}s infinite`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Scanline */}
            <div className="absolute pointer-events-none overflow-hidden" style={{ top: "15%", left: "22%", width: "56%", height: "34%" }}>
              <div
                className="absolute inset-y-0 w-1/3"
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(140 90% 50% / 0.18), transparent)",
                  animation: "scan-sweep 4.5s linear infinite",
                }}
              />
            </div>

            {/* Ambient screen glow */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen"
              style={{
                background: "radial-gradient(ellipse 55% 32% at 50% 30%, hsl(140 90% 50% / 0.22), transparent 70%)",
                animation: "ambient-pulse 5s ease-in-out infinite",
              }}
            />

            {/* Bottom gradient + caption */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Live SOC · 24/7</span>
              </div>
              <p className="text-foreground font-semibold text-base">
                Eyes on your environment, around the clock.
              </p>
            </div>

            <style>{`
              @keyframes threat-ping {
                0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
                80%, 100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
              }
              @keyframes threat-glow {
                0%, 100% { opacity: 0.85; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
              }
              @keyframes scan-sweep {
                0% { transform: translateX(-120%); }
                100% { transform: translateX(420%); }
              }
              @keyframes ambient-pulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
              }
            `}</style>
          </motion.div>

          {/* Pillars grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="group relative bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-7 transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.4)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 tracking-[-0.01em]">{p.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.7]">{p.desc}</p>
                </motion.div>
              );
            })}

            {/* Closing quote spanning both columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="sm:col-span-2 relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/40 to-transparent p-7"
            >
              <p className="text-foreground text-base sm:text-lg leading-[1.7] italic border-l-2 border-primary/70 pl-5">
                "Because it's a matter of <span className="text-primary not-italic font-semibold">when</span>, not if —
                you deserve a partner who responds swiftly and acts when it matters most."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
