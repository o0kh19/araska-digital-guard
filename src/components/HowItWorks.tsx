import { useInView } from "framer-motion";
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

  return (
    <section className="section-padding section-dark relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-14">
          <span className="eyebrow">// CYBER PROTOCOL</span>
          <span className="eyebrow-rule" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.015em]">
            How We Work With You
          </h2>
        </div>

        <div className="relative">
          {/* Desktop horizontal data stream */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 px-[12.5%] z-0 pointer-events-none">
            <div className="relative h-[2px] w-full" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
              {inView && <div className="data-stream-x absolute inset-0" />}
            </div>
          </div>

          {/* Mobile vertical data stream */}
          <div className="lg:hidden absolute top-0 bottom-0 left-8 w-[2px] z-0 pointer-events-none" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
            {inView && <div className="data-stream-y absolute inset-0" />}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => {
              const { Icon } = s;
              return (
                <div
                  key={s.step}
                  className={`relative group ${inView ? 'cyber-glitch-in' : 'opacity-0'}`}
                  style={{ animationDelay: inView ? `${i * 0.2}s` : undefined }}
                >
                  {/* Node on the timeline */}
                  <div className="absolute lg:left-8 lg:top-8 lg:-translate-y-1/2 left-8 top-8 -translate-x-1/2 -translate-y-1/2 z-20">
                    <span
                      className="block w-4 h-4 rounded-full transition-all duration-300 group-hover:scale-150"
                      style={{
                        background: 'hsl(var(--primary))',
                        boxShadow: '0 0 0 4px #fff, 0 0 14px hsl(var(--primary)), 0 0 28px hsl(var(--primary) / 0.6)',
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="relative z-10 h-full rounded-lg p-8 pl-14 lg:pl-8 lg:pt-14 overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                      background: '#ffffff',
                      border: '1px solid hsl(var(--primary) / 0.3)',
                      boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 0 0 1px hsl(var(--primary) / 0.08), 0 0 14px hsl(var(--primary) / 0.12)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px -8px hsl(var(--primary) / 0.35), 0 0 0 1px hsl(var(--primary) / 0.5), 0 0 24px hsl(var(--primary) / 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 2px rgba(15,23,42,0.04), 0 0 0 1px hsl(var(--primary) / 0.08), 0 0 14px hsl(var(--primary) / 0.12)';
                    }}
                  >
                    {/* Scan line - only on hover */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div
                        className="scan-line absolute left-0 right-0 h-[2px]"
                        style={{
                          background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
                          boxShadow: '0 0 12px hsl(var(--primary)), 0 0 24px hsl(var(--primary) / 0.6)',
                        }}
                      />
                    </div>

                    {/* Corner brackets */}
                    <span className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: 'hsl(var(--primary) / 0.7)' }} />
                    <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: 'hsl(var(--primary) / 0.7)' }} />

                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 group-hover:icon-pulse"
                      style={{
                        background: 'hsl(var(--primary) / 0.08)',
                        border: '1px solid hsl(var(--primary) / 0.4)',
                        boxShadow: 'inset 0 0 10px hsl(var(--primary) / 0.15)',
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: 'hsl(var(--primary))' }} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-mono tracking-widest block mb-2" style={{ color: 'hsl(var(--primary))' }}>
                      &gt; STEP_{s.step}
                    </span>
                    <h3 className="text-lg font-bold mb-3 text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground text-[15px] leading-[1.8]">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
