import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Discovery",
    desc: "You tell us about your organisation. We ask the right questions to understand your environment, risks, and goals — before we recommend anything.",
  },
  {
    step: "02",
    title: "Proposal",
    desc: "We produce a scoped proposal with clear deliverables, timelines, and service terms. No hidden conditions.",
  },
  {
    step: "03",
    title: "Onboarding",
    desc: "Our team integrates with your environment quickly and carefully. For SOC clients, we target full visibility within days of contract signature.",
  },
  {
    step: "04",
    title: "Ongoing Partnership",
    desc: "We don't disappear after deployment. Regular reporting, dedicated communication, and continuous improvement are part of every engagement.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-dark" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="eyebrow">Our Process</span>
          <span className="eyebrow-rule" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.015em]">
            How We Work With You
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px -translate-x-4 z-0" style={{ background: 'rgba(200,146,10,0.15)' }} />
              )}
              <div
                className="rounded-lg p-8 relative z-10 h-full hover:translate-y-[-3px] transition-all duration-200"
                style={{
                  background: '#E5E7EB',
                  border: '1px solid rgba(200,146,10,0.18)',
                  borderRadius: '8px',
                }}
              >
                <span className="text-[64px] font-extrabold block mb-4 leading-none" style={{ color: 'rgba(200,146,10,0.10)' }}>{s.step}</span>
                <h3 className="text-lg font-bold mb-3 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-[1.8]">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
