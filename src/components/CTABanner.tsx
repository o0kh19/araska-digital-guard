import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-dark" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center rounded-lg p-12 md:p-16 relative overflow-hidden"
        style={{
          background: '#152040',
          border: '1px solid rgba(200,146,10,0.3)',
          boxShadow: '0 0 20px rgba(200,146,10,0.1)',
        }}
      >
        {/* Subtle hex watermark */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {[100, 140, 180].map((r, i) => {
              const points = Array.from({ length: 6 }, (_, j) => {
                const angle = (Math.PI / 3) * j - Math.PI / 2;
                return `${200 + r * Math.cos(angle)},${200 + r * Math.sin(angle)}`;
              }).join(" ");
              return <polygon key={i} points={points} fill="none" stroke="currentColor" strokeWidth="1" />;
            })}
          </svg>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-[-0.015em]">
            Ready to take your security seriously?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-[1.8]">
            Tell us about your organisation and we'll put together a tailored proposal.
            No obligation. No generic packages.
          </p>
          <Link to="/get-a-quote" className="gold-btn text-sm">
            Get a Quote
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
