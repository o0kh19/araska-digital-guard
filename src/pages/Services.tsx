import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import ServicesHexNetwork from "@/components/ServicesHexNetwork";

type Service = {
  id: string;
  icon: typeof ShieldCheck;
  title: string;
  whatItIs: string;
  whyItMatters: string;
  whatYouGet: string[];
  cta: string;
};

const services: Service[] = [
  {
    id: "soc-as-a-service",
    icon: Eye,
    title: "24/7 Proactive Monitoring (SOC)",
    whatItIs:
      "Our Security Operations Centre (SOC) provides continuous monitoring of your systems, networks, and security alerts to identify suspicious activity as it happens.",
    whyItMatters:
      "Cyber threats do not wait for business hours. Without active monitoring, attacks can go unnoticed until they cause disruption, data loss, or reputational damage. Our team watches for threats around the clock, investigates alerts, and responds quickly to reduce the impact on your business.",
    whatYouGet: [
      "24/7 monitoring of security alerts and events",
      "Real-time threat detection and investigation",
      "Rapid escalation of critical incidents",
      "Expert analyst review and response actions",
      "Regular reporting and security recommendations",
    ],
    cta: "Talk to our team about 24/7 monitoring",
  },
  {
    id: "threat-risk-analysis",
    icon: ShieldCheck,
    title: "Threat & Risk Analysis (Intel & Assessment)",
    whatItIs:
      "Our Threat & Risk Analysis service helps identify the threats most relevant to your organisation and prioritises the vulnerabilities that need immediate attention.",
    whyItMatters:
      "Effective security starts with understanding your risks. We assess your environment, review possible attack paths, and provide practical recommendations so you can focus resources where they matter most — and reduce exposure to targeted threats.",
    whatYouGet: [
      "Threat landscape assessment",
      "Risk identification and prioritisation",
      "Vulnerability analysis",
      "Security gap assessments",
      "Actionable mitigation recommendations",
    ],
    cta: "Discover the risks affecting your business",
  },
  {
    id: "emergency-response-training",
    icon: Siren,
    title: "Emergency Response & Security Training",
    whatItIs:
      "Our Emergency Response service helps your organisation contain threats quickly, minimise damage, and recover faster. We also deliver practical security awareness training for your staff.",
    whyItMatters:
      "When a security incident happens, speed matters. A slow or unprepared response multiplies the cost of an attack — both financially and operationally. Trained staff and a tested response plan reduce the chance of human error becoming a security incident.",
    whatYouGet: [
      "Incident response planning and support",
      "Threat containment assistance",
      "Recovery guidance",
      "Security awareness training for staff",
      "Incident review and improvement planning",
    ],
    cta: "Prepare your team before the next incident",
  },
  {
    id: "vulnerability-management",
    icon: Radar,
    title: "Vulnerability Management",
    whatItIs:
      "Our Vulnerability Management service identifies weaknesses in your systems early and ensures they are prioritised for remediation through regular scanning and expert review.",
    whyItMatters:
      "Unpatched vulnerabilities are one of the most common ways attackers gain access to business systems. Reducing your attack surface improves overall security hygiene and supports compliance requirements.",
    whatYouGet: [
      "Scheduled vulnerability scans",
      "Vulnerability prioritisation",
      "Remediation recommendations",
      "Security posture reviews",
      "Progress tracking and reporting",
    ],
    cta: "Start reducing your attack surface",
  },
  {
    id: "vciso-advisory",
    icon: Briefcase,
    title: "vCISO Advisory",
    whatItIs:
      "Our Virtual Chief Information Security Officer (vCISO) service provides expert cybersecurity leadership without the cost of a full-time executive hire.",
    whyItMatters:
      "Many organisations need senior security guidance but can't justify a full-time CISO. We help align your cybersecurity strategy with your business goals, strengthen governance, and guide your organisation toward better security maturity.",
    whatYouGet: [
      "Security strategy planning",
      "Governance and policy oversight",
      "Risk management guidance",
      "Compliance readiness support",
      "Executive security reporting",
    ],
    cta: "Get strategic security leadership",
  },
  {
    id: "m365-hardening",
    icon: Zap,
    title: "Microsoft 365 Security Hardening",
    whatItIs:
      "Our Microsoft 365 Security Hardening service reviews your M365 configuration and implements best-practice security controls to protect users, data, and collaboration tools.",
    whyItMatters:
      "Microsoft 365 is essential for many organisations, but default settings often leave security gaps. Hardening your environment reduces identity, email, and data risks before they can be exploited.",
    whatYouGet: [
      "Security configuration review",
      "Identity and access hardening",
      "Conditional access improvements",
      "Email and collaboration protection",
      "Security recommendations and implementation",
    ],
    cta: "Secure your Microsoft 365 environment",
  },
  {
    id: "security-policy-development",
    icon: FileSearch,
    title: "Security Policy Development",
    whatItIs:
      "Our Security Policy Development service helps your organisation build practical, tailored policies that guide secure behaviour, support compliance, and reduce operational risk.",
    whyItMatters:
      "Strong security requires clear policies and consistent governance. Without them, expectations are unclear, accountability suffers, and operational risk grows.",
    whatYouGet: [
      "Security policy development",
      "Governance framework guidance",
      "Acceptable use policies",
      "Access control policies",
      "Policy review and updates",
    ],
    cta: "Build stronger security foundations",
  },
];

const Services = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // Wait a tick for content to render
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [location]);

  return (
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
        {/* Animated hex-network background, right half on desktop */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[60%] pointer-events-none">
          <ServicesHexNetwork />
          {/* Soft left edge fade only — keeps every node fully visible */}
          <div
            className="absolute inset-y-0 left-0 w-24 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, #0A1635 0%, rgba(10,22,53,0) 100%)",
            }}
          />
          {/* Mobile light dim only */}
          <div
            className="absolute inset-0 md:hidden"
            style={{ background: "rgba(10,22,53,0.35)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl text-white tracking-[-0.02em] leading-tight mb-6 font-bold text-justify lg:text-7xl">
              Cybersecurity Services Built Around Your Business
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-4 sm:text-lg text-justify">
              Your organisation faces cyber threats every day from phishing attacks and ransomware to
              misconfigurations and insider risks. Our services are designed to help you reduce those risks,
              strengthen your security posture, and respond quickly when threats arise.
            </p>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed text-justify">
              Whether you need continuous monitoring, strategic security leadership, or support improving your
              Microsoft 365 security, we provide practical cybersecurity solutions tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICE SECTIONS */}
      <section
        className="py-24"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F3F5FA 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
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

          <div className="space-y-10">
            {services.map((svc, i) => (
              <motion.article
                key={svc.id}
                id={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="bg-white rounded-xl p-8 lg:p-12 transition-all duration-300 hover:shadow-[0_24px_48px_-16px_rgba(31,143,203,0.35)] scroll-mt-32"
                style={{
                  boxShadow: "0 2px 12px rgba(15,31,74,0.06), 0 8px 32px rgba(15,31,74,0.04)",
                  border: "1px solid hsl(var(--primary) / 0.10)",
                }}
              >
                {/* Title */}
                <div className="flex items-start gap-4 mb-8 pb-6 border-b border-foreground/5">
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 border border-primary/15">
                    <svc.icon className="text-primary" size={28} strokeWidth={1.6} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                      Service {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-[-0.01em] leading-tight mt-1">
                      {svc.title}
                    </h3>
                  </div>
                </div>

                {/* What it is */}
                <div className="mb-7">
                  <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-primary mb-3">What it is</h4>
                  <p className="text-foreground/80 leading-[1.75]">{svc.whatItIs}</p>
                </div>

                {/* Why it matters */}
                <div className="mb-7">
                  <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-primary mb-3">Why it matters</h4>
                  <p className="text-foreground/80 leading-[1.75]">{svc.whyItMatters}</p>
                </div>

                {/* What you get */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-primary mb-3">What you get</h4>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {svc.whatYouGet.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground/85 leading-snug">
                        <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={16} strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-foreground/5">
                  <Link
                    to={`/get-a-quote?service=${encodeURIComponent(svc.title)}`}
                    className="inline-flex items-center justify-center px-7 py-3 font-bold text-sm uppercase tracking-[0.08em] text-white bg-primary hover:bg-primary/90 transition-all rounded"
                  >
                    {svc.cta}
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
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
};

export default Services;
