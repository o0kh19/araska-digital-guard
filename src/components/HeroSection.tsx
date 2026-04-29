import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Crosshair,
} from "lucide-react";
import heroIllustration from "@/assets/security-gaps-hero.png";

const BLUE = "222 89% 55%";
const RED = "0 84% 60%";

const services = [
  {
    title: "Cyber Defence",
    subtitle: "Proactive Monitoring & Response",
    Icon: ShieldCheck,
    items: [
      "24/7 SOC & Incident Response",
      "Threat Intelligence",
      "Vulnerability Management",
    ],
  },
  {
    title: "Cyber Offensive",
    subtitle: "Identify & Exploit Weaknesses",
    Icon: Crosshair,
    items: ["Penetration Testing", "Red Teaming", "Attack Surface Discovery"],
  },
  {
    title: "Consultancy",
    subtitle: "Strategic Advisory & Guidance",
    Icon: Briefcase,
    items: ["Security Strategy", "Compliance Advisory", "Risk Assessment"],
  },
  {
    title: "Cyber Training",
    subtitle: "Build Cyber Resilience & Awareness",
    Icon: GraduationCap,
    items: [
      "Awareness Training",
      "Technical Workshops",
      "Executive Security Training",
    ],
  },
];

const HeroSection = () => {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Subtle grid background */}
      <div className="absolute inset-0 cyber-grid-bg-light opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, transparent 0%, hsl(220 30% 96% / 0.85) 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        {/* Top: Headline + illustration */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-6 text-slate-900 tracking-[-0.02em]"
            >
              Identify Security Gaps
              <br />
              Before{" "}
              <span style={{ color: `hsl(${RED})` }}>Attackers</span> Do
            </motion.h1>

            <motion.p
              variants={item}
              className="text-slate-600 text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
            >
              Protect your business through proactive defence, offensive
              testing, strategic consultancy, and practical cyber training.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                to="/get-a-quote"
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-sm rounded-md text-white transition-all hover:brightness-110"
                style={{
                  background: `hsl(${BLUE})`,
                  boxShadow: `0 8px 24px -8px hsl(${BLUE} / 0.55)`,
                }}
              >
                Book a Security Assessment
              </Link>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="font-medium">Built on</span>
                <span className="font-bold text-slate-900">NIST</span>
                <span className="text-slate-400">•</span>
                <span className="font-bold text-slate-900">OWASP</span>
                <span className="text-slate-400">•</span>
                <span className="font-bold text-slate-900">MITRE</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src={heroIllustration}
              alt="Cyber security dashboard identifying threats"
              width={1024}
              height={768}
              className="w-full max-w-lg h-auto drop-shadow-[0_20px_40px_rgba(34,87,219,0.18)]"
            />
          </motion.div>
        </div>

        {/* Service cards 2x2 */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {services.map((s) => {
            const { Icon } = s;
            return (
              <motion.div
                key={s.title}
                variants={item}
                className="rounded-2xl p-8 bg-white transition-all hover:-translate-y-1"
                style={{
                  border: "1px solid hsl(220 20% 90%)",
                  boxShadow:
                    "0 4px 20px -8px hsl(222 30% 8% / 0.08)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `hsl(${BLUE} / 0.1)` }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: `hsl(${BLUE})` }}
                  />
                </div>
                <h3 className="text-slate-900 font-bold text-xl mb-1.5">
                  {s.title}
                </h3>
                <p className="text-slate-700 font-medium text-sm mb-5">
                  {s.subtitle}
                </p>
                <ul className="space-y-2.5">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2.5 text-slate-600 text-sm"
                    >
                      <span
                        className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: `hsl(${BLUE})` }}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
