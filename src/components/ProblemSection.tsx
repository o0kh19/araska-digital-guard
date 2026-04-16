import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-dark" ref={ref}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground tracking-[-0.015em]">
            Cyber threats don't keep business hours.{" "}
            <span className="text-primary">Most organisations aren't ready.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-muted-foreground text-lg leading-[1.8]">
            The average time to detect a breach is 194 days. By then, the damage is done.
            Araska Cyber Core closes that gap — with continuous monitoring, expert analysts,
            and response capabilities that activate the moment a threat emerges. We don't just
            report problems. We stop them.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
