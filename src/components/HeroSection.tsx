import { motion } from "framer-motion";
import { Shield, Globe, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/araska-logo.png";

const trustBadges = [
  { icon: Clock, label: "24/7 Monitoring" },
  { icon: Globe, label: "UK Registered" },
  { icon: Shield, label: "Microsoft Partner" },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
    </div>

    {/* Watermark logo */}
    <img
      src={logo}
      alt=""
      className="absolute w-[600px] h-[600px] opacity-[0.06] animate-pulse-glow pointer-events-none"
    />

    <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-6"
      >
        Managed Detection & Response
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-tight mb-6 text-foreground"
        style={{ textShadow: "0 0 40px hsl(110 100% 54% / 0.15)" }}
      >
        VIGILANCE BEYOND
        <br />
        <span className="neon-text">BORDERS.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-secondary-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Araska Cyber Core: A UK-Registered Security Operations Center powered exclusively by the
        Microsoft Security Ecosystem.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <a href="mailto:info@araskacybercore.com" className="neon-btn text-sm">
          Initiate Security Consultation
        </a>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-16 flex flex-wrap justify-center gap-8"
      >
        {trustBadges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-secondary-foreground text-sm">
            <Icon size={16} className="text-primary" />
            <span>{label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
