import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden section-dark">
    {/* Background textures */}
    <div className="absolute inset-0">
      {/* Radial gold glow top-right */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(31,143,203,0.07) 0%, transparent 60%)',
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(31,143,203,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 w-full">
      {/* Left — Text */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Global Cybersecurity Operations</span>
          <span className="eyebrow-rule" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ border: '1px solid rgba(31,143,203,0.3)', background: 'rgba(31,143,203,0.08)' }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-xs font-medium tracking-wide">SOC Operations Active — 24/7</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-foreground tracking-[-0.02em]"
        >
          Your Threat Is Real.
          <br />
          <span className="gold-glow-text">So Is Our Response.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
        >
          <span className="text-foreground font-semibold">Araska Cyber Core</span> protects your business from cyber attacks — every hour, every day.
          <br /><br />
          We help companies around the world with:
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-3 mb-10 max-w-xl"
        >
          {[
            { b: "24/7 Security Monitoring", t: "we watch your systems day and night." },
            { b: "Threat Intelligence", t: "we spot risks before they reach you." },
            { b: "Cyber Resilience", t: "we keep you running, even under attack." },
            { b: "Free Health Check", t: "see your security score in 2 minutes." },
          ].map((item) => (
            <li key={item.b} className="flex items-start gap-3 text-muted-foreground text-base sm:text-lg leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span><span className="text-foreground font-semibold">{item.b}</span> — {item.t}</span>
            </li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="text-muted-foreground text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
        >
          You focus on your business. We protect it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/cyber-health-check" className="gold-btn text-sm">
            Free Health Check
          </Link>
          <Link to="/get-a-quote" className="outline-btn text-sm">
            Get a Quote
          </Link>
        </motion.div>
      </div>

    </div>
  </section>
);

export default HeroSection;
