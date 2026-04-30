import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Check } from "lucide-react";
import aboutSoc from "@/assets/about-soc.png";
import aboutHq from "@/assets/about-hq.png";

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

const team = [
  {
    name: "Khalid",
    role: "Chief Chaos Tamer",
    fact: "Once debugged a SIEM rule mid-flight at 35,000ft — the WiFi never recovered.",
    img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=600&h=600&fit=crop",
  },
  {
    name: "Sam",
    role: "Threat Whisperer",
    fact: "Can spot a phishing email from three rooms away. Allegedly dreams in KQL.",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=600&fit=crop",
  },
  {
    name: "Aras",
    role: "Architect of Mayhem (the good kind)",
    fact: "Builds tabletop exercises so realistic, his cat once filed an incident report.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop",
  },
  {
    name: "Belal",
    role: "M365 Security Hardening Ninja",
    fact: "Sub-15-minute response times. Also sub-15-minute coffee runs. Coincidence?",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
  },
  {
    name: "Moh",
    role: "Compliance Sorcerer",
    fact: "Reads ISO 27001 for fun. Has strong opinions about Annex A.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop",
  },
];

const About = () => {
  const [editMode, setEditMode] = useState(false);
  const [draftMode, setDraftMode] = useState(false);
  const [teamData, setTeamData] = useState(team);
  const [draftTeam, setDraftTeam] = useState(team);

  const enterEdit = () => {
    setDraftTeam(teamData);
    setDraftMode(true);
    setEditMode(true);
  };

  const saveChanges = () => {
    setTeamData(draftTeam);
    setEditMode(false);
    setDraftMode(false);
  };

  const cancelEdit = () => {
    setDraftTeam(teamData);
    setEditMode(false);
    setDraftMode(false);
  };

  const updateMember = (i: number, field: "name" | "role" | "fact" | "img", value: string) => {
    setDraftTeam((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)));
  };

  return (
  <div className="min-h-screen bg-transparent">
    <Header />
    <main className="pt-36 pb-16">
      {/* Hero — alternating image/text rows (matches reference) */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        {/* Row 1: Image left, About text right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center mb-16 md:mb-24"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.4)] order-1">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={aboutHq}
                alt="Araska Cyber Core UK headquarters entrance with hexagonal feature wall"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="order-2">
            <span className="eyebrow text-xl">About Us</span>
            <span className="eyebrow-rule" />
            <h1 className="text-4xl font-extrabold text-foreground mb-6 tracking-[-0.02em] sm:text-4xl">
              Cybersecurity Made Practical, Accessible, and Effective.
            </h1>
            <p className="text-muted-foreground text-lg leading-[1.8] mb-6">
              Araska Cyber Core was founded on a straightforward belief: organizations of every size deserve access to serious cybersecurity capability. For too long, enterprise-grade security has been the preserve of large corporations with large budgets. We exist to change that.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 tracking-[-0.015em]">
              Our Expertise
            </h2>
            <p className="text-muted-foreground text-lg leading-[1.8] mb-4">
              Headquartered in the United Kingdom, we work with clients across multiple sectors and geographies. Our team brings together elite experience in:
            </p>
            <ul className="space-y-3 mb-4 list-none pl-0">
              {[
                "Security Operations & Threat Intelligence",
                "Incident Response",
                "Compliance & Risk Management",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-lg leading-[1.8]">
              This expertise is applied through a service model built specifically around your organization, not a rigid, one-size-fits-all product catalogue.
            </p>
          </div>
        </motion.div>

        {/* Row 2: Mission text left, Image right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center"
        >
          <div className="order-2 md:order-1">
            <span className="eyebrow text-xl">The Araska Mission</span>
            <span className="eyebrow-rule" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-[-0.015em]">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg leading-[1.8] mb-5">
              Every engagement starts with listening. We ask the right questions before we recommend solutions, ensuring we scope every project honestly.
            </p>
            <p className="text-muted-foreground text-lg leading-[1.8] mb-8">
              We don't measure success by the length of our reports; we measure it by whether your organization is genuinely more secure.
            </p>
            <Link to="/contact" className="gold-btn text-sm">
              Talk to Our Team
            </Link>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.4)] order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={aboutSoc}
                alt="Araska Cyber Core SOC analyst monitoring a UK threat intelligence dashboard"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6">


        {/* Values — Light Section */}
        <div className="section-light -mx-6 px-6 py-16 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 mb-12 rounded-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-4xl mx-auto"
          >
            <span className="eyebrow text-xl">Our Values</span>
            <span className="eyebrow-rule" />
            <h2 className="text-3xl sm:text-4xl font-bold text-light-foreground mb-8 tracking-[-0.015em]">
              What Drives Us
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="bg-white rounded-lg p-9 transition-all duration-200 hover:translate-y-[-3px]"
                  style={{ border: '1px solid #E2E8F0', borderRadius: '8px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1F8FCB';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(31,143,203,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 className="text-[19px] font-semibold mb-3 text-light-foreground">{v.title}</h3>
                  <p className="text-[#3A4A5C] text-[15px] leading-[1.8]">{v.desc}</p>
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
          <span className="eyebrow text-xl">Our Approach</span>
          <span className="eyebrow-rule" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-[-0.015em]">
            How We Deliver Security
          </h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-[1.8]">
            <p>
              Araska Cyber Core operates on a co-managed model. This means we work alongside your existing IT or security team rather than replacing them. Our analysts integrate with your environment, your communication channels, and your incident management processes. For organisations without a dedicated security team, we act as that function entirely.
            </p>
            <p>
              We are technology-agnostic in our consulting and assessment work, but our SOC is built on Microsoft's enterprise security stack — Sentinel, Defender, and Azure — because it is the most capable, scalable, and well-supported platform available for the organisations we serve.
            </p>
          </div>
        </motion.div>

        {/* Meet the Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-20"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="eyebrow text-xl">Meet the Team</span>
              <span className="eyebrow-rule" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-[-0.015em]">
                The Humans Behind the Firewall
              </h2>
              <p className="text-muted-foreground text-lg leading-[1.8] mb-10">
                Serious about security. Less serious about everything else.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(draftMode ? draftTeam : teamData).map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.4)]"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={m.img}
                    alt={`${m.name} — ${m.role}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 space-y-2">
                  {editMode ? (
                    <>
                      <Input
                        value={m.img}
                        onChange={(e) => updateMember(i, "img", e.target.value)}
                        placeholder="Image URL"
                        className="text-xs mb-2"
                      />
                      <Input
                        value={m.name}
                        onChange={(e) => updateMember(i, "name", e.target.value)}
                        placeholder="Name"
                        className="text-xl font-bold"
                      />
                      <Input
                        value={m.role}
                        onChange={(e) => updateMember(i, "role", e.target.value)}
                        placeholder="Role"
                        className="text-sm font-semibold"
                      />
                      <Textarea
                        value={m.fact}
                        onChange={(e) => updateMember(i, "fact", e.target.value)}
                        placeholder="Fun fact"
                        rows={3}
                        className="text-[15px] leading-[1.7] resize-none"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-foreground mb-1">{m.name}</h3>
                      <p className="text-primary text-sm font-semibold mb-3 tracking-wide">{m.role}</p>
                      <p className="text-muted-foreground text-[15px] leading-[1.7]">{m.fact}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-lg p-12 text-center"
          style={{
            background: '#E5E7EB',
            border: '1px solid rgba(31,143,203,0.3)',
            boxShadow: '0 0 20px rgba(31,143,203,0.1)',
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 tracking-[-0.015em]">
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
};

export default About;
