import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Radar, FileSearch, Zap, GraduationCap, HeartPulse } from "lucide-react";

const coreServices = [
  {
    icon: ShieldCheck,
    id: "soc-as-a-service",
    title: "SOC as a Service",
    short: "24/7 monitoring of your endpoints, cloud, and identity — powered by Microsoft Sentinel.",
  },
  {
    icon: Radar,
    id: "threat-intelligence",
    title: "Threat Intelligence",
    short: "Sector-specific intel on adversaries, IOCs, and active campaigns — delivered with action.",
  },
  {
    icon: FileSearch,
    id: "cyber-risk-assessment",
    title: "Cyber Risk Assessment",
    short: "Review your people, process, and tech against ISO 27001 and NIST with a clear roadmap.",
  },
  {
    icon: Zap,
    id: "incident-response-retainer",
    title: "Incident Response",
    short: "When something breaks, we are already briefed. Priority response, agreed in advance.",
  },
];

const education = [
  {
    icon: GraduationCap,
    id: "security-awareness-training",
    title: "Security Awareness Training",
    desc: "Hands-on training that changes behaviour — not just a tick-box. We cover phishing, social engineering, safe data handling, and incident reporting, adapted to your audience from executive leadership to operational staff.",
  },
  {
    icon: HeartPulse,
    id: "cyber-health-check",
    title: "Cyber Health Check",
    desc: "A 2-minute self-assessment that reveals your security score, the weak spots that need attention, and the next steps to take. No sign-up required — start instantly and get expert recommendations.",
    cta: "Take the Free Check",
    href: "/cyber-health-check",
  },
];

const Services = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <main className="pt-32 pb-24">
      {/* HERO — dark navy with abstract dots graphic */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1635 0%, #0F1F4A 50%, #112555 100%)",
        }}
      >
        {/* Decorative abstract dot-graph (right side) */}
        <div className="absolute inset-y-0 right-0 w-1/2 hidden md:block opacity-90 pointer-events-none">
          <svg viewBox="0 0 600 400" className="w-full h-full">
            <defs>
              <linearGradient id="dotGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3D5BFF" />
                <stop offset="100%" stopColor="#3D5BFF" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {Array.from({ length: 60 }).map((_, i) => {
              const colors = ["#3D5BFF", "#00D4FF", "#00E676", "#FFD600", "#FF1F8E", "#FF6D00", "#B388FF"];
              const color = colors[i % colors.length];
              const x = 30 + i * 9;
              const h = 60 + Math.abs(Math.sin(i * 0.7)) * 250 + Math.random() * 40;
              const y = 380 - h;
              return (
                <g key={i}>
                  <line x1={x} y1={380} x2={x} y2={y + 10} stroke={color} strokeWidth="1.5" opacity="0.6" />
                  <circle cx={x} cy={y} r={3 + (i % 4)} fill={color} />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.02em] leading-tight mb-6">
              Araska Services & Training
            </h1>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
              Get more from your cybersecurity investment — with expert guidance, managed services, and hands-on
              training built around your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES — light gradient bg with centered title + 4-card grid */}
      <section
        className="py-24"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F3F5FA 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold text-foreground text-center mb-16 tracking-[-0.02em]"
          >
            Services
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((svc, i) => (
              <motion.div
                key={svc.id}
                id={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-lg p-8 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1"
                style={{
                  boxShadow: "0 2px 12px rgba(15,31,74,0.06), 0 8px 32px rgba(15,31,74,0.04)",
                }}
              >
                <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-primary/5">
                  <svc.icon className="text-primary" size={32} strokeWidth={1.6} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-[-0.01em]">{svc.title}</h3>
                <p className="text-muted-foreground text-sm leading-[1.7] mb-8 flex-1">{svc.short}</p>
                <Link
                  to={`/get-a-quote?service=${encodeURIComponent(svc.title)}`}
                  className="inline-flex items-center justify-center px-6 py-2.5 font-semibold text-sm text-white bg-primary hover:bg-primary/90 transition-all rounded"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & TRAINING — centered title + 2 wide cards */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold text-foreground text-center mb-16 tracking-[-0.02em]"
          >
            Education and Training
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-lg p-10 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1"
                style={{
                  boxShadow: "0 2px 12px rgba(15,31,74,0.06), 0 8px 32px rgba(15,31,74,0.04)",
                }}
              >
                <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-primary/5">
                  <item.icon className="text-primary" size={32} strokeWidth={1.6} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 tracking-[-0.01em]">{item.title}</h3>
                <p className="text-muted-foreground leading-[1.8] mb-8 max-w-md">{item.desc}</p>
                <Link
                  to={item.href || `/get-a-quote?service=${encodeURIComponent(item.title)}`}
                  className="inline-flex items-center justify-center px-6 py-2.5 font-semibold text-sm text-white bg-primary hover:bg-primary/90 transition-all rounded"
                >
                  {item.cta || "Learn More"}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="bg-[#F3F5FA] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-[-0.02em]">
            Not sure which service fits?
          </h3>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Tell us about your business and we will recommend the right starting point — usually within 24 hours.
          </p>
          <Link
            to="/get-a-quote"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm uppercase tracking-[0.08em] rounded bg-primary text-white hover:bg-primary/90 transition-all"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Services;
