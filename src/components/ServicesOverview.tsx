import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Radar, FileSearch, Zap, GraduationCap } from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    title: "SOC as a Service",
    desc: "Round-the-clock monitoring of your environment by certified analysts. We detect, triage, and respond to threats before they become incidents.",
    slug: "soc-as-a-service",
  },
  {
    icon: Radar,
    title: "Threat Intelligence",
    desc: "Actionable intelligence on the threats targeting your sector and region. We turn raw data into decisions your team can act on immediately.",
    slug: "threat-intelligence",
  },
  {
    icon: FileSearch,
    title: "Cyber Risk Assessment",
    desc: "A structured review of your organisation's security posture, gaps, and risk exposure. Every assessment is scoped to your size and context — no two are the same.",
    slug: "cyber-risk-assessment",
  },
  {
    icon: Zap,
    title: "Incident Response Retainer",
    desc: "When an incident strikes, every minute counts. Our retainer clients get immediate access to our response team with pre-agreed SLAs and escalation paths.",
    slug: "incident-response-retainer",
  },
  {
    icon: GraduationCap,
    title: "Security Awareness Training",
    desc: "Your people are your first line of defence. Our training programmes equip staff at every level to recognise and respond to real-world threats.",
    slug: "security-awareness-training",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-lg p-9 transition-all duration-250 flex flex-col group hover:translate-y-[-3px]"
              style={{
                background: '#E5E7EB',
                border: '1px solid rgba(200,146,10,0.18)',
                borderRadius: '8px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,146,10,0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(200,146,10,0.18)'; }}
            >
              <div
                className="w-[52px] h-[52px] rounded-md flex items-center justify-center mb-5"
                style={{ background: 'rgba(200,146,10,0.08)', border: '1px solid rgba(200,146,10,0.2)' }}
              >
                <svc.icon className="text-primary" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-[19px] font-semibold mb-3 text-foreground">{svc.title}</h3>
              <p className="text-muted-foreground text-[15px] leading-[1.8] mb-6 flex-1">{svc.desc}</p>
              <Link
                to={`/services#${svc.slug}`}
                className="text-primary text-sm font-medium hover:underline hover:text-primary-light inline-flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
