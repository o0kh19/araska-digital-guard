import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Radar,
  FileSearch,
  Zap,
  GraduationCap,
  Siren,
  Eye,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type Service = {
  id: string;
  icon: typeof ShieldCheck;
  title: string;
  intro: string[];
  includes: string[];
  benefits: string[];
  cta: string;
};

const services: Service[] = [
  {
    id: "soc-as-a-service",
    icon: Eye,
    title: "24/7 Proactive Monitoring (SOC)",
    intro: [
      "Our Security Operations Centre (SOC) provides continuous monitoring of your systems, networks, and security alerts to identify suspicious activity as it happens.",
      "Cyber threats do not wait for business hours. Without active monitoring, attacks can go unnoticed until they cause disruption, data loss, or reputational damage. Our team watches for threats around the clock, investigates alerts, and responds quickly to reduce the impact on your business.",
    ],
    includes: [
      "24/7 monitoring of security alerts and events",
      "Real-time threat detection and investigation",
      "Rapid escalation of critical incidents",
      "Expert analyst review and response actions",
      "Regular reporting and security recommendations",
    ],
    benefits: [
      "Detect threats before they escalate",
      "Reduce downtime and business disruption",
      "Improve visibility across your environment",
      "Gain expert security oversight at all times",
    ],
    cta: "Talk to our team about 24/7 monitoring for your business.",
  },
  {
    id: "threat-risk-analysis",
    icon: ShieldCheck,
    title: "Threat & Risk Analysis (Intel & Assessment)",
    intro: [
      "Effective security starts with understanding your risks. Our Threat & Risk Analysis service helps identify the threats most relevant to your organisation and prioritises the vulnerabilities that need immediate attention.",
      "We assess your environment, review possible attack paths, and provide practical recommendations so you can focus resources where they matter most.",
    ],
    includes: [
      "Threat landscape assessment",
      "Risk identification and prioritisation",
      "Vulnerability analysis",
      "Security gap assessments",
      "Actionable mitigation recommendations",
    ],
    benefits: [
      "Understand where your greatest risks exist",
      "Prioritise security improvements effectively",
      "Reduce exposure to targeted threats",
      "Make informed security decisions",
    ],
    cta: "Discover the risks affecting your business today.",
  },
  {
    id: "emergency-response-training",
    icon: Siren,
    title: "Emergency Response & Security Training",
    intro: [
      "When a security incident happens, speed matters. Our Emergency Response service helps your organisation contain threats quickly, minimise damage, and recover faster.",
      "We also provide practical security awareness training to help your staff recognise threats and respond appropriately, reducing the chance of human error becoming a security incident.",
    ],
    includes: [
      "Incident response planning and support",
      "Threat containment assistance",
      "Recovery guidance",
      "Security awareness training for staff",
      "Incident review and improvement planning",
    ],
    benefits: [
      "Respond faster to security incidents",
      "Minimise operational disruption",
      "Improve staff readiness against cyber threats",
      "Strengthen long-term resilience",
    ],
    cta: "Prepare your team before the next incident occurs.",
  },
  {
    id: "vulnerability-management",
    icon: Radar,
    title: "Vulnerability Management",
    intro: [
      "Unpatched vulnerabilities are one of the most common ways attackers gain access to business systems. Our Vulnerability Management service helps identify weaknesses early and ensures they are prioritised for remediation.",
      "Through regular scanning and expert review, we help your organisation reduce its attack surface and improve overall security hygiene.",
    ],
    includes: [
      "Scheduled vulnerability scans",
      "Vulnerability prioritisation",
      "Remediation recommendations",
      "Security posture reviews",
      "Progress tracking and reporting",
    ],
    benefits: [
      "Identify weaknesses before attackers do",
      "Reduce exposure to known threats",
      "Improve system security posture",
      "Support compliance requirements",
    ],
    cta: "Start reducing your attack surface today.",
  },
  {
    id: "vciso-advisory",
    icon: Briefcase,
    title: "vCISO Advisory",
    intro: [
      "Our Virtual Chief Information Security Officer (vCISO) service provides expert cybersecurity leadership without the cost of a full-time executive hire.",
      "We help align your cybersecurity strategy with your business goals, strengthen governance, and guide your organisation toward better security maturity.",
    ],
    includes: [
      "Security strategy planning",
      "Governance and policy oversight",
      "Risk management guidance",
      "Compliance readiness support",
      "Executive security reporting",
    ],
    benefits: [
      "Gain strategic security leadership",
      "Improve governance and accountability",
      "Support business growth securely",
      "Strengthen executive decision-making",
    ],
    cta: "Get strategic security leadership for your organisation.",
  },
  {
    id: "m365-hardening",
    icon: Zap,
    title: "Microsoft 365 Security Hardening",
    intro: [
      "Microsoft 365 is essential for many organisations, but default settings often leave security gaps. Our Microsoft 365 Security Hardening service strengthens your environment to reduce risk and improve resilience.",
      "We review your Microsoft 365 configuration and implement best-practice security controls to help protect users, data, and collaboration tools.",
    ],
    includes: [
      "Security configuration review",
      "Identity and access hardening",
      "Conditional access improvements",
      "Email and collaboration protection",
      "Security recommendations and implementation",
    ],
    benefits: [
      "Reduce Microsoft 365 security risks",
      "Improve identity protection",
      "Strengthen email security",
      "Protect business data more effectively",
    ],
    cta: "Secure your Microsoft 365 environment with confidence.",
  },
  {
    id: "security-policy-development",
    icon: FileSearch,
    title: "Security Policy Development",
    intro: [
      "Strong security requires clear policies and consistent governance. Our Security Policy Development service helps your organisation build practical policies that guide secure behaviour, support compliance, and reduce operational risk.",
      "We create tailored policies that reflect your business operations and security requirements.",
    ],
    includes: [
      "Security policy development",
      "Governance framework guidance",
      "Acceptable use policies",
      "Access control policies",
      "Policy review and updates",
    ],
    benefits: [
      "Establish clear security expectations",
      "Improve organisational accountability",
      "Support compliance requirements",
      "Reduce operational risk",
    ],
    cta: "Build stronger security foundations with clear policies.",
  },
];

const Services = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <main className="pt-32 pb-24">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1635 0%, #0F1F4A 50%, #112555 100%)",
        }}
      >
        <div className="absolute inset-y-0 right-0 w-1/2 hidden md:block opacity-90 pointer-events-none">
          <svg viewBox="0 0 600 400" className="w-full h-full">
            {Array.from({ length: 60 }).map((_, i) => {
              const colors = ["#3D5BFF", "#00D4FF", "#00E676", "#FFD600", "#FF1F8E", "#FF6D00", "#B388FF"];
              const color = colors[i % colors.length];
              const x = 30 + i * 9;
              const h = 60 + Math.abs(Math.sin(i * 0.7)) * 250 + (i % 5) * 8;
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

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.02em] leading-tight mb-6">
              Cybersecurity Services Built Around Your Business
            </h1>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-4">
              Your organisation faces cyber threats every day — from phishing attacks and ransomware to
              misconfigurations and insider risks. Our services are designed to help you reduce those risks,
              strengthen your security posture, and respond quickly when threats arise.
            </p>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Whether you need continuous monitoring, strategic security leadership, or support improving your
              Microsoft 365 security, we provide practical cybersecurity solutions tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICE CARDS */}
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
            className="text-4xl sm:text-5xl font-extrabold text-foreground text-center mb-4 tracking-[-0.02em]"
          >
            Our Services
          </motion.h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 leading-relaxed">
            Practical, expert-led cybersecurity tailored to your size, industry, and risk profile.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((svc, i) => (
              <motion.article
                key={svc.id}
                id={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="bg-white rounded-xl p-8 lg:p-10 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(31,143,203,0.35)] scroll-mt-32"
                style={{
                  boxShadow: "0 2px 12px rgba(15,31,74,0.06), 0 8px 32px rgba(15,31,74,0.04)",
                  border: "1px solid hsl(var(--primary) / 0.10)",
                }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 border border-primary/15">
                    <svc.icon className="text-primary" size={28} strokeWidth={1.6} />
                  </div>
                  <h3 className="text-2xl sm:text-[26px] font-bold text-foreground tracking-[-0.01em] leading-tight pt-2">
                    {svc.title}
                  </h3>
                </div>

                <div className="space-y-4 mb-8">
                  {svc.intro.map((p, idx) => (
                    <p key={idx} className="text-muted-foreground leading-[1.75]">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-primary mb-3">
                      What's included
                    </h4>
                    <ul className="space-y-2">
                      {svc.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80 leading-snug">
                          <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} strokeWidth={2} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-primary mb-3">
                      Business benefits
                    </h4>
                    <ul className="space-y-2">
                      {svc.benefits.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80 leading-snug">
                          <ArrowRight className="text-primary flex-shrink-0 mt-0.5" size={16} strokeWidth={2} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-foreground/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-sm font-semibold text-foreground/90 italic">{svc.cta}</p>
                  <Link
                    to={`/get-a-quote?service=${encodeURIComponent(svc.title)}`}
                    className="inline-flex items-center justify-center px-6 py-2.5 font-semibold text-sm text-white bg-primary hover:bg-primary/90 transition-all rounded whitespace-nowrap"
                  >
                    Get a Quote
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION/TRAINING accent */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 border border-primary/15 mb-6">
            <GraduationCap className="text-primary" size={28} strokeWidth={1.6} />
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-[-0.02em]">
            Need help choosing the right cybersecurity service?
          </h3>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Every organisation has different security priorities. Our team will help you identify the services that
            best match your risks, business goals, and operational needs.
          </p>
          <Link
            to="/get-a-quote"
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm uppercase tracking-[0.08em] rounded bg-primary text-white hover:bg-primary/90 transition-all"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Services;
