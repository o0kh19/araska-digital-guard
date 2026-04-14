import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
    </div>

    <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-primary text-xs font-medium tracking-wide">SOC Operations Active — 24/7</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-tight mb-6 text-foreground"
      >
        Your Threat Is Real.
        <br />
        <span className="neon-text">So Is Our Response.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-secondary-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Araska Cyber Core delivers enterprise-grade security operations, threat intelligence, and
        cyber resilience services to organisations across the globe — so you can focus on your
        business while we protect it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/get-a-quote" className="neon-btn text-sm">
          Get a Quote
        </Link>
        <a
          href="#services"
          className="inline-flex items-center justify-center px-8 py-4 font-display font-bold text-sm uppercase tracking-widest rounded-lg border border-foreground/20 text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
        >
          Explore Our Services
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
