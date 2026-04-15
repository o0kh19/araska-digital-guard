import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden section-dark">
    {/* Subtle diagonal gradient glow */}
    <div className="absolute inset-0">
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary/[0.04] via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(220 20% 40%) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full grid lg:grid-cols-2 gap-16 items-center">
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-xs font-medium tracking-wide">SOC Operations Active — 24/7</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-[1.05] mb-6 text-foreground tracking-tight"
        >
          Your Threat Is Real.
          <br />
          <span className="gold-glow-text">So Is Our Response.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-secondary-foreground text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Araska Cyber Core delivers enterprise-grade security operations, threat intelligence, and
          cyber resilience services to organisations across the globe — so you can focus on your
          business while we protect it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/get-a-quote" className="gold-btn text-sm">
            Get a Quote
          </Link>
          <a href="#services" className="outline-btn text-sm">
            Explore Our Services
          </a>
        </motion.div>
      </div>

      {/* Right — Hexagonal Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex items-center justify-center"
      >
        <div className="relative w-[400px] h-[400px]">
          {/* Gold radial glow behind */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />
          </div>

          {/* Concentric hexagons */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
            {[180, 150, 120].map((r, i) => {
              const cx = 200, cy = 200;
              const points = Array.from({ length: 6 }, (_, j) => {
                const angle = (Math.PI / 3) * j - Math.PI / 2;
                return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
              }).join(" ");
              return (
                <polygon
                  key={i}
                  points={points}
                  fill="none"
                  stroke="hsl(40 90% 41%)"
                  strokeWidth={i === 2 ? 2 : 1}
                  opacity={i === 0 ? 0.1 : i === 1 ? 0.2 : 0.6}
                />
              );
            })}

            {/* Waveform / pulse line */}
            <polyline
              points="130,200 160,200 175,175 195,220 210,180 225,200 270,200"
              fill="none"
              stroke="hsl(40 90% 41%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* Core dot */}
            <circle cx="200" cy="235" r="5" fill="hsl(40 90% 41%)" opacity="0.9" />

            {/* Vertex nodes */}
            {Array.from({ length: 6 }, (_, j) => {
              const angle = (Math.PI / 3) * j - Math.PI / 2;
              const r = 120;
              return (
                <circle
                  key={j}
                  cx={200 + r * Math.cos(angle)}
                  cy={200 + r * Math.sin(angle)}
                  r="4"
                  fill="hsl(40 90% 41%)"
                  opacity="0.7"
                />
              );
            })}
          </svg>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
