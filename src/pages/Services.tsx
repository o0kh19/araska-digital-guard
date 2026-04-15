import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Radar, FileSearch, Zap, GraduationCap } from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    id: "soc-as-a-service",
    title: "SOC as a Service",
    desc: "Our Security Operations Centre provides continuous monitoring of your infrastructure, endpoints, cloud environments, and identity systems. Powered by Microsoft Sentinel, our analysts work across your log sources to detect anomalies, investigate alerts, and escalate confirmed incidents. We operate as a co-managed partner alongside your internal IT team or as your dedicated security function. Coverage options are scoped to your organisation's hours of operation and risk appetite.",
  },
  {
    icon: Radar,
    id: "threat-intelligence",
    title: "Threat Intelligence",
    desc: "Araska Cyber Core delivers threat intelligence that is specific to your sector, geography, and threat profile. Our analysts track adversary groups, monitor for indicators of compromise (IOCs), and produce reports that your team can act on. Intelligence is shared via structured feeds and written briefings. We also support integration with your existing security tooling so intelligence flows where it is needed most.",
  },
  {
    icon: FileSearch,
    id: "cyber-risk-assessment",
    title: "Cyber Risk Assessment",
    desc: "Understanding your risk is the foundation of every good security programme. Our assessments review your people, processes, and technology against recognised frameworks including ISO 27001 and NIST. The scope and depth of every assessment is determined by your organisation's size, industry, and existing controls — which is why we ask for details before we propose anything. You receive a clear written report with prioritised findings and a practical remediation roadmap.",
  },
  {
    icon: Zap,
    id: "incident-response-retainer",
    title: "Incident Response Retainer",
    desc: "A retainer with Araska Cyber Core means that when something goes wrong, you are not starting from zero. Our team has already been briefed on your environment. Response times, escalation contacts, and procedures are agreed in advance and documented in your retainer agreement. Retainer clients receive priority access to our analysts and can activate response procedures at any time.",
  },
  {
    icon: GraduationCap,
    id: "security-awareness-training",
    title: "Security Awareness Training",
    desc: "Human error remains one of the leading causes of security incidents. Our training programmes are designed to change behaviour, not just tick a compliance box. Sessions are delivered to your staff and cover phishing recognition, social engineering, safe data handling, password practices, and incident reporting. Training can be delivered on-site or remotely and is adapted to the audience — from executive leadership to operational staff.",
  },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-36 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="eyebrow">Our Services</span>
          <span className="eyebrow-rule" />
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
            What We Do
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
            End-to-end cybersecurity services tailored to your organisation's size, industry, and risk profile.
          </p>
        </motion.div>

        <div className="space-y-8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              id={svc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-lg p-8 md:p-10 transition-all duration-200 scroll-mt-36 hover:translate-y-[-2px]"
            >
              <div className="flex items-start gap-6">
                <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 flex-shrink-0">
                  <svc.icon className="text-primary" size={28} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">{svc.title}</h2>
                  <p className="text-secondary-foreground leading-relaxed mb-6">{svc.desc}</p>
                  <Link
                    to={`/get-a-quote?service=${encodeURIComponent(svc.title)}`}
                    className="gold-btn text-xs py-2.5 px-6"
                  >
                    Get a Quote for This Service
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Services;
