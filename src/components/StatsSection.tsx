import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ShieldAlert, Users, Activity } from "lucide-react";

const stats = [
  {
    icon: ShieldAlert,
    value: 1250000,
    suffix: "+",
    label: "Threats Blocked",
    desc: "Malicious events neutralised across our client estates.",
    format: (n: number) => n.toLocaleString("en-GB"),
  },
  {
    icon: Users,
    value: 180,
    suffix: "+",
    label: "Happy Clients",
    desc: "Organisations trusting us with their cyber resilience.",
    format: (n: number) => n.toLocaleString("en-GB"),
  },
  {
    icon: Activity,
    value: 99.99,
    suffix: "%",
    label: "Uptime Guarantee",
    desc: "SOC availability backed by our service-level agreements.",
    format: (n: number) => n.toFixed(2),
  },
];

const Counter = ({
  to,
  format,
  inView,
}: {
  to: number;
  format: (n: number) => string;
  inView: boolean;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => format(latest));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 2.2,
      ease: "easeOut",
    });
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, count, rounded]);

  return <span ref={ref}>{format(0)}</span>;
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-light" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow">By the Numbers</span>
          <span className="eyebrow-rule mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-light-foreground tracking-[-0.015em]">
            Why Choose ArasKa Cyber Core?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-[1.8] mt-4">
            Real results, measured every day. Here's the impact we deliver for our clients.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-lg p-9 text-center transition-all duration-300 hover:-translate-y-2"
              style={{
                border: "1px solid #E2E8F0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#1F8FCB";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px -12px rgba(31,143,203,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E2E8F0";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
              }}
            >
              <div
                className="w-14 h-14 rounded-md flex items-center justify-center mb-5 mx-auto"
                style={{
                  background: "rgba(31,143,203,0.08)",
                  border: "1px solid rgba(31,143,203,0.2)",
                }}
              >
                <s.icon className="text-primary" size={26} strokeWidth={1.5} />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-primary tracking-[-0.02em] mb-2">
                <Counter to={s.value} format={s.format} inView={inView} />
                <span>{s.suffix}</span>
              </div>
              <h3 className="text-[19px] font-semibold mb-2 text-light-foreground">
                {s.label}
              </h3>
              <p className="text-[#3A4A5C] text-[14px] leading-[1.7]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
