import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center glass-card neon-border rounded-2xl p-12 md:p-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Ready to take your security seriously?
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Tell us about your organisation and we'll put together a tailored proposal.
          No obligation. No generic packages.
        </p>
        <Link to="/get-a-quote" className="neon-btn text-sm">
          Get a Quote
        </Link>
      </motion.div>
    </section>
  );
};

export default CTABanner;
