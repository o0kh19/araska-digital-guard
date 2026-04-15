import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const values = [
  {
    title: "Honesty before sales",
    desc: "We will tell you what you need, not what makes us the most money. If a service is not right for your situation, we will say so.",
  },
  {
    title: "Precision over volume",
    desc: "We do not flood clients with alerts and reports that require no action. Every communication we send is relevant and actionable.",
  },
  {
    title: "Partnership, not vendor",
    desc: "We integrate with your team, your tools, and your way of working. Our goal is to make your organisation stronger, not to create dependency.",
  },
  {
    title: "Continuous improvement",
    desc: "The threat landscape changes. Our services evolve with it. We invest in our team's skills and our tooling so that our clients are always defended against what is current — not what was relevant three years ago.",
  },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-36 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <span className="eyebrow">About Us</span>
          <span className="eyebrow-rule" />
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-8">
            Built to Protect. Built to Last.
          </h1>
          <div className="space-y-6 text-secondary-foreground text-lg leading-relaxed">
            <p>
              Araska Cyber Core was founded on a straightforward belief: organisations of every size deserve access to serious cybersecurity capability. For too long, enterprise-grade security has been the preserve of large corporations with large budgets. We exist to change that.
            </p>
            <p>
              Headquartered in the United Kingdom, we work with clients across multiple sectors and geographies. Our team brings together experience from security operations, threat intelligence, incident response, and compliance — applied through a service model built around your organisation, not a rigid product catalogue.
            </p>
            <p>
              Every engagement starts with listening. We ask questions before we recommend solutions. We scope work honestly. And we measure our success by whether your organisation is genuinely more secure — not by the length of our reports.
            </p>
          </div>
        </motion.div>

        {/* Values — Light Section */}
        <div className="section-light -mx-6 px-6 py-20 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 mb-20 rounded-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-4xl mx-auto"
          >
            <span className="eyebrow">Our Values</span>
            <span className="eyebrow-rule" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-light-foreground mb-8">
              What Drives Us
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="bg-white rounded-lg p-8 border border-light-muted/20 hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="font-display text-lg font-semibold mb-3 text-light-foreground">{v.title}</h3>
                  <p className="text-light-muted text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <span className="eyebrow">Our Approach</span>
          <span className="eyebrow-rule" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
            How We Deliver Security
          </h2>
          <div className="space-y-6 text-secondary-foreground text-lg leading-relaxed">
            <p>
              Araska Cyber Core operates on a co-managed model. This means we work alongside your existing IT or security team rather than replacing them. Our analysts integrate with your environment, your communication channels, and your incident management processes. For organisations without a dedicated security team, we act as that function entirely.
            </p>
            <p>
              We are technology-agnostic in our consulting and assessment work, but our SOC is built on Microsoft's enterprise security stack — Sentinel, Defender, and Azure — because it is the most capable, scalable, and well-supported platform available for the organisations we serve.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card gold-border rounded-lg p-12 text-center"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Want to know more about how we work?
          </h2>
          <Link to="/contact" className="gold-btn text-sm">
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
