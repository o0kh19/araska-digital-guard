import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, FileText, Settings, Shield } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "We Talk",
    desc: "You tell us about your business. We ask simple questions to understand your systems, risks, and goals.",
    Icon: MessageCircle,
  },
  {
    step: "02",
    title: "We Plan",
    desc: "We send you a clear proposal: what we will do, when, and at what cost. No hidden terms.",
    Icon: FileText,
  },
  {
    step: "03",
    title: "We Set Up",
    desc: "Our team connects to your systems quickly and safely. SOC clients are usually fully covered within days.",
    Icon: Settings,
  },
  {
    step: "04",
    title: "We Stay With You",
    desc: "We don't disappear after setup. You get regular reports, a real point of contact, and continuous improvement.",
    Icon: Shield,
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  // Desktop horizontal line draw
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Mobile vertical line draw
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

        <div className="relative">
          {/* Desktop: horizontal animated connecting line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 px-[12.5%] z-0 pointer-events-none">
            <div className="relative h-px w-full" style={{ background: 'rgba(31,143,203,0.12)' }}>
              <motion.div
                style={{
                  scaleX: lineScaleX,
                  transformOrigin: 'left center',
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.4))',
                  boxShadow: '0 0 12px hsl(var(--primary) / 0.7), 0 0 24px hsl(var(--primary) / 0.35)',
                }}
                className="absolute inset-0 h-[2px] -top-[0.5px]"
              />
            </div>
          </div>

          {/* Mobile/Tablet: vertical animated connecting line */}
          <div className="lg:hidden absolute top-0 bottom-0 left-8 w-px z-0 pointer-events-none" style={{ background: 'rgba(31,143,203,0.12)' }}>
            <motion.div
              style={{
                scaleY: lineScaleY,
                transformOrigin: 'top center',
                background: 'linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary) / 0.4))',
                boxShadow: '0 0 12px hsl(var(--primary) / 0.7), 0 0 24px hsl(var(--primary) / 0.35)',
              }}
              className="absolute inset-0 w-[2px] -left-[0.5px]"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => {
              const { Icon } = s;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04 }}
                  className="relative group"
                >
                  {/* Node circle on the timeline */}
                  <div className="absolute lg:left-8 lg:top-8 lg:-translate-y-1/2 left-8 top-8 -translate-x-1/2 -translate-y-1/2 z-20">
                    <span
                      className="block w-4 h-4 rounded-full transition-all duration-300 group-hover:scale-150"
                      style={{
                        background: 'hsl(var(--primary))',
                        boxShadow: '0 0 0 4px hsl(var(--background)), 0 0 12px hsl(var(--primary) / 0.8)',
                      }}
                    />
                  </div>

                  <div
                    className="rounded-lg p-8 pl-14 lg:pl-8 lg:pt-14 relative z-10 h-full transition-all duration-300 group-hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)]"
                    style={{
                      background: '#E5E7EB',
                      border: '1px solid rgba(31,143,203,0.18)',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-all duration-300 group-hover:rotate-6"
                      style={{
                        background: 'hsl(var(--primary) / 0.12)',
                        border: '1px solid hsl(var(--primary) / 0.3)',
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: 'hsl(var(--primary))' }} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-semibold tracking-widest block mb-2" style={{ color: 'hsl(var(--primary))' }}>
                      STEP {s.step}
                    </span>
                    <h3 className="text-lg font-bold mb-3 text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground text-[15px] leading-[1.8]">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
