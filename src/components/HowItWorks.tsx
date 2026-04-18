import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "We Talk",
    desc: "You tell us about your business. We ask simple questions to understand your systems, risks, and goals.",
  },
  {
    step: "02",
    title: "We Plan",
    desc: "We send you a clear proposal: what we will do, when, and at what cost. No hidden terms.",
  },
  {
    step: "03",
    title: "We Set Up",
    desc: "Our team connects to your systems quickly and safely. SOC clients are usually fully covered within days.",
  },
  {
    step: "04",
    title: "We Stay With You",
    desc: "We don't disappear after setup. You get regular reports, a real point of contact, and continuous improvement.",
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
                <div className="hidden lg:block absolute top-8 left-full w-full h-px -translate-x-4 z-0" style={{ background: 'rgba(31,143,203,0.15)' }} />
              )}
              <div
                className="rounded-lg p-8 relative z-10 h-full hover:translate-y-[-3px] transition-all duration-200"
                style={{
                  background: '#E5E7EB',
                  border: '1px solid rgba(31,143,203,0.18)',
                  borderRadius: '8px',
                }}
              >
                <span className="text-[64px] font-extrabold block mb-4 leading-none" style={{ color: 'rgba(31,143,203,0.10)' }}>{s.step}</span>
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
