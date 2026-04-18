import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, HandshakeIcon, Monitor, UserCheck } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Global, but close to you",
    desc: "We are based in the UK and work with clients around the world. We understand local rules and global threats.",
  },
  {
    icon: HandshakeIcon,
    title: "No long contracts to start",
    desc: "Every project starts with a chat. We shape our service around your needs — not a fixed package that doesn't fit.",
  },
  {
    icon: Monitor,
    title: "Powered by Microsoft",
    desc: "Our SOC runs on Microsoft Sentinel and Defender — the same enterprise tools used by the world's biggest companies.",
  },
  {
    icon: UserCheck,
    title: "Real people, not just robots",
    desc: "Every alert is checked by a human expert. Machines help us go fast — but people make the final call.",
  },
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-light" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="eyebrow">Why Us</span>
          <span className="eyebrow-rule" />
          <h2 className="text-3xl sm:text-4xl font-bold text-light-foreground tracking-[-0.015em]">
            Why Organisations Choose Us
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-lg p-9 transition-all duration-200 hover:translate-y-[-3px]"
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1F8FCB';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(31,143,203,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-[52px] h-[52px] rounded-md flex items-center justify-center mb-4"
                style={{ background: 'rgba(31,143,203,0.08)', border: '1px solid rgba(31,143,203,0.2)' }}
              >
                <p.icon className="text-primary" size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-[19px] font-semibold mb-3 text-light-foreground">{p.title}</h3>
              <p className="text-[#3A4A5C] text-[15px] leading-[1.8]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
