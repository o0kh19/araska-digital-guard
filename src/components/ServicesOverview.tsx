import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Radar, FileSearch, Zap, GraduationCap, ClipboardCheck } from "lucide-react";
import cyberShield from "@/assets/cyber-shield.jpg";

const services = [
  {
    icon: ShieldCheck,
    title: "SOC as a Service",
    desc: "Our experts watch your systems 24/7. We find threats, stop them fast, and tell you what happened — in plain language.",
    slug: "soc-as-a-service",
  },
  {
    icon: Radar,
    title: "Threat Intelligence",
    desc: "We track the attackers who target your industry, so you know what to defend against — before they strike.",
    slug: "threat-intelligence",
  },
  {
    icon: FileSearch,
    title: "Cyber Risk Assessment",
    desc: "We review your security from top to bottom and give you a clear list of what to fix first. Built around your business size and needs.",
    slug: "cyber-risk-assessment",
  },
  {
    icon: Zap,
    title: "Incident Response Retainer",
    desc: "When an attack hits, every minute matters. Our team is ready to step in immediately, with response times agreed in advance.",
    slug: "incident-response-retainer",
  },
  {
    icon: GraduationCap,
    title: "Security Awareness Training",
    desc: "Your staff are your first line of defence. We train them to spot phishing emails and risky behaviour — in simple, practical sessions.",
    slug: "security-awareness-training",
  },
  {
    icon: ClipboardCheck,
    title: "Health Check Assessment",
    desc: "Evaluate your organisation's current security posture and identify the specific requirements you need to address. A structured 2-minute assessment that pinpoints gaps and defines your priorities.",
    slug: "cyber-consulting",
    href: "/cyber-health-check",
    badge: "Assessment",
  },
];

const ServicesOverview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding section-dark" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="eyebrow">What We Do</span>
          <span className="eyebrow-rule" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground tracking-[-0.015em]">
            End-to-End Cybersecurity Services
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-[1.8]">
            Tailored to your organisation's size, industry, and risk profile.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-xl overflow-hidden mb-10"
          style={{
            border: '1px solid rgba(31,143,203,0.25)',
            boxShadow: '0 20px 60px -20px rgba(31,143,203,0.35)',
          }}
        >
          <img
            src={cyberShield}
            alt="Digital shield protecting a network of connected systems"
            loading="lazy"
            width={1280}
            height={800}
            className="w-full h-[260px] sm:h-[340px] object-cover block"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(5,10,20,0.6) 0%, rgba(5,10,20,0) 50%, rgba(5,10,20,0.6) 100%)' }}
          />
          {/* Live monitoring overlays */}
          <div className="image-scan-line" />
          <div className="radar-pulse" />
          <div className="radar-pulse delay-1" />
          <div className="radar-pulse delay-2" />
          {/* Live status badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-primary/40">
            <span className="status-dot" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white font-mono-label">
              Live · Monitoring
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="services-card rounded-lg p-9 transition-all duration-300 flex flex-col group hover:-translate-y-2 h-full"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(31,143,203,0.18)',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.6)';
                e.currentTarget.style.boxShadow = '0 20px 40px -12px hsl(var(--primary) / 0.45), 0 0 0 1px hsl(var(--primary) / 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(31,143,203,0.18)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
              }}
            >
              <div
                className="w-[52px] h-[52px] rounded-md flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: 'hsl(var(--primary) / 0.08)', border: '1px solid hsl(var(--primary) / 0.25)' }}
              >
                <svc.icon className="text-primary transition-transform duration-500" size={22} strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="status-dot" aria-hidden="true" />
                <h3 className="text-[19px] font-semibold text-foreground">{svc.title}</h3>
                {(svc as any).badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                    {(svc as any).badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-[15px] leading-[1.8] mb-6 flex-1">{svc.desc}</p>
              <Link
                to={(svc as any).href ?? `/services#${svc.slug}`}
                className="text-primary text-sm font-medium hover:underline hover:text-primary-light inline-flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                {(svc as any).href ? "Start Now →" : "Learn More →"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
