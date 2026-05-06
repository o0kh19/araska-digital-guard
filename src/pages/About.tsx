import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Sword, ClipboardCheck, GraduationCap, MapPin, Languages, Layers, Handshake, Target } from "lucide-react";
import aboutSoc from "@/assets/about-soc.png";
import aboutHq from "@/assets/about-hq.png";

const services = [
  {
    icon: Shield,
    title: "Cyber Defence",
    desc: "Proactive monitoring, incident response, vulnerability management, managed security monitoring, and SOC services.",
  },
  {
    icon: Sword,
    title: "Cyber Offensive",
    desc: "Penetration testing, attack surface discovery, and offensive security assessments designed to identify weaknesses before attackers do.",
  },
  {
    icon: ClipboardCheck,
    title: "Consultancy",
    desc: "Cybersecurity risk assessments, compliance advisory, security strategy, and governance support tailored to business needs.",
  },
  {
    icon: GraduationCap,
    title: "Cyber Training",
    desc: "Security awareness training, executive briefings, and technical workshops delivered in Kurdish, Arabic, and English.",
  },
];

const sectors = ["Energy", "Healthcare", "Financial Services", "Education", "Technology"];

const differentiators = [
  { icon: MapPin, text: "Local market understanding with international standards" },
  { icon: Languages, text: "Security delivered in Kurdish, Arabic, and English" },
  { icon: Shield, text: "Microsoft-first security expertise across Microsoft security technologies" },
  { icon: Layers, text: "Structured security lifecycle approach" },
  { icon: Handshake, text: "Long-term security partnerships, not one-off engagements" },
];

const About = () => {
  return (
  <div className="min-h-screen bg-transparent">
    <Header />
    <main className="pt-36 pb-16">
      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 mb-24">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[80%] h-72 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-center max-w-3xl mx-auto"
        >
          <span className="eyebrow text-xl">About Us</span>
          <span className="eyebrow-rule mx-auto" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-[-0.02em] leading-[1.1]">
            Cybersecurity Made <span className="text-primary">Practical</span>, Accessible, and Effective.
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-[1.7]">
            At Araska Cyber Core, we help businesses strengthen their security posture through practical, structured, and business-focused cybersecurity services.
          </p>
        </motion.div>
      </section>

      {/* WHO WE ARE — image + text */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.4)]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={aboutHq}
                alt="Araska Cyber Core headquarters"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div>
            <span className="eyebrow text-xl">Who We Are</span>
            <span className="eyebrow-rule" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-[-0.015em]">
              Built to close a critical gap.
            </h2>
            <p className="text-muted-foreground text-lg leading-[1.8] mb-5">
              Founded by experienced cybersecurity professionals, Araska Cyber Core was built to close a critical gap in the Kurdistan Region market where many organisations face growing cyber threats but lack access to dedicated, affordable, and locally understood security expertise.
            </p>
            <p className="text-muted-foreground text-lg leading-[1.8] mb-8">
              With a registered entity in the United Kingdom and operational delivery in Erbil, we combine international credibility with local market understanding to deliver cybersecurity that is practical, accessible, and effective.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-foreground text-sm font-medium">
                <MapPin className="w-4 h-4 text-primary" /> Registered in the UK
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-foreground text-sm font-medium">
                <MapPin className="w-4 h-4 text-primary" /> Delivered from Erbil
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHAT WE DO — 4 service cards */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="eyebrow text-xl">What We Do</span>
          <span className="eyebrow-rule mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-[-0.015em]">
            Cybersecurity across four core areas.
          </h2>
          <p className="text-muted-foreground text-lg leading-[1.7]">
            A full-spectrum service model designed around how modern businesses actually operate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.4)]"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-[1.75]">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-background p-10 md:p-14"
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="eyebrow text-xl">Who We Serve</span>
              <span className="eyebrow-rule" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-[-0.015em]">
                From SMBs to sector-focused enterprises.
              </h2>
              <p className="text-muted-foreground text-lg leading-[1.8]">
                We work with small and medium-sized businesses, growing enterprises, and sector-focused organisations across the Kurdistan Region and wider Iraq — industries where cyber resilience is no longer optional.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">Priority Sectors</p>
              <div className="flex flex-wrap gap-3">
                {sectors.map((sector) => (
                  <span
                    key={sector}
                    className="px-5 py-2.5 rounded-full bg-background/60 border border-primary/30 text-foreground font-medium backdrop-blur-sm transition-all duration-300 hover:bg-primary/10 hover:border-primary/60 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHY ARASKA — text + image */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center"
        >
          <div className="order-2 md:order-1">
            <span className="eyebrow text-xl">Why Araska Cyber Core</span>
            <span className="eyebrow-rule" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-[-0.015em]">
              What makes us different is simple.
            </h2>
            <ul className="space-y-4 mb-8">
              {differentiators.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.li
                    key={d.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground text-[15px] md:text-base leading-[1.7] pt-1.5 font-medium">
                      {d.text}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
            <p className="text-muted-foreground text-lg leading-[1.8] italic border-l-2 border-primary/60 pl-5">
              We don't believe cybersecurity should be complicated, overpriced, or disconnected from business reality. We believe it should be clear, actionable, and built around the client.
            </p>
          </div>

          <div className="order-1 md:order-2 group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.4)]">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={aboutSoc}
                alt="Araska Cyber Core SOC analyst"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-card border border-border rounded-2xl p-10 overflow-hidden hover:border-primary/60 transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
            <Target className="w-10 h-10 text-primary mb-5" />
            <span className="eyebrow text-xl">Our Mission</span>
            <span className="eyebrow-rule" />
            <p className="text-foreground text-lg leading-[1.8] mt-2">
              To make cybersecurity practical, accessible, and understandable for businesses across the Kurdistan Region and Iraq.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-card border border-border rounded-2xl p-10 overflow-hidden hover:border-primary/60 transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
            <Shield className="w-10 h-10 text-primary mb-5" />
            <span className="eyebrow text-xl">Our Vision</span>
            <span className="eyebrow-rule" />
            <p className="text-foreground text-lg leading-[1.8] mt-2">
              To become the most trusted cybersecurity partner in the Kurdistan Region and expand across Iraq and future international markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="mb-24">
        <HowItWorks />
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-background to-card p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-5 tracking-[-0.02em]">
              Secure your business with confidence.
            </h2>
            <p className="text-muted-foreground text-lg leading-[1.7] mb-8 max-w-2xl mx-auto">
              Get in touch today to schedule your cybersecurity consultation and take the first step toward stronger protection.
            </p>
            <Link to="/contact" className="gold-btn text-sm">
              Schedule Your Consultation
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
    <Footer />
  </div>
  );
};

export default About;
