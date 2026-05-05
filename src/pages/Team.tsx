import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Mail, Award, Shield, Sword, ClipboardCheck, GraduationCap, Cpu, Upload, Link2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Member = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accentIcon: typeof Shield;
  credentials: string[];
  linkedin?: string;
};

const team: Member[] = [
  {
    name: "Khalid Alkhtemi",
    role: "Founder & Chief Executive Officer",
    initials: "AT",
    accentIcon: Shield,
    bio: "",
    credentials: ["CISSP", "CISM", "ISO 27001 LA", "Microsoft Security Expert"],
  },
  {
    name: "Aras Sulaiman",
    role: "Founder",
    initials: "AS",
    accentIcon: Cpu,
    bio: "",
    credentials: ["GCIA", "GCIH", "MS-500", "Sentinel Ninja"],
  },
  {
    name: "Dr Belal Asad",
    role: "Head of Offensive Security",
    initials: "BA",
    accentIcon: Sword,
    bio: "​",
    credentials: ["OSCP", "OSEP", "CRTO", "Azure Red Team"],
    linkedin: "https://www.linkedin.com/in/belal-ea/",
  },
  {
    name: "Sam Wheeler",
    role: "Chief Information Security Officer (CISO)",
    initials: "SK",
    accentIcon: ClipboardCheck,
    bio: "Guides clients through risk assessments, ISO 27001 implementations, and regulatory readiness. Trusted advisor to boards across healthcare and financial services.",
    credentials: ["ISO 27001 LI", "CRISC", "PCI-QSA", "NIST CSF"],
  },
  {
    name: "Diyar Mahmood",
    role: "Cyber Training & Awareness Manager",
    initials: "DM",
    accentIcon: GraduationCap,
    bio: "Designs and delivers technical workshops and executive simulations in Kurdish, Arabic, and English. Builds human firewalls inside organizations of every size.",
    credentials: ["CEH", "CompTIA Security+", "Certified Trainer", "Phishing Simulation Expert"],
  },
];

const STORAGE_KEY = "araska-team-photos-v1";

const Team = () => {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPhotos(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }, []);

  const persist = (next: Record<string, string>) => {
    setPhotos(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
  };

  const handleFile = (name: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        persist({ ...photos, [name]: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrl = (name: string) => {
    const url = window.prompt(`Paste an image URL for ${name}:`, photos[name] ?? "");
    if (url === null) return;
    const trimmed = url.trim();
    if (!trimmed) return;
    persist({ ...photos, [name]: trimmed });
  };

  const handleRemove = (name: string) => {
    const { [name]: _, ...rest } = photos;
    persist(rest);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="pt-36 pb-16">
        {/* HERO */}
        <section className="relative max-w-6xl mx-auto px-6 mb-20">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[70%] h-72 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Our People
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-[-0.02em]">
              Meet the Team Behind Araska Cyber Core
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Certified practitioners, engineers, and strategists united by one mission — making
              cybersecurity practical, accessible, and effective for every organization we serve.
            </p>
          </motion.div>
        </section>

        {/* TEAM GRID */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m, idx) => {
              const Icon = m.accentIcon;
              const photo = photos[m.name];
              return (
                <motion.article
                  key={m.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.35)]"
                >
                  {/* Accent gradient bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Photo area */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/15 via-card to-primary/5">
                    {photo ? (
                      <img
                        src={photo}
                        alt={`${m.name} — ${m.role}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-7xl font-extrabold text-primary/30 tracking-tight select-none">
                            {m.initials}
                          </span>
                        </div>
                        <div
                          className="absolute inset-0 opacity-[0.07]"
                          style={{
                            backgroundImage:
                              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                      </>
                    )}

                    {/* Role icon chip */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-[0_0_16px_hsl(var(--primary)/0.3)]">
                      <Icon size={18} className="text-primary" />
                    </div>

                    {/* Photo controls (visible on hover) */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <input
                        ref={(el) => (fileInputs.current[m.name] = el)}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFile(m.name, file);
                          e.target.value = "";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputs.current[m.name]?.click()}
                        title="Upload photo from your computer"
                        className="h-9 px-3 rounded-full bg-background/85 backdrop-blur-md border border-primary/30 text-foreground hover:text-primary hover:border-primary inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors"
                      >
                        <Upload size={13} /> Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUrl(m.name)}
                        title="Set photo from a URL"
                        className="h-9 w-9 rounded-full bg-background/85 backdrop-blur-md border border-primary/30 text-foreground hover:text-primary hover:border-primary inline-flex items-center justify-center transition-colors"
                      >
                        <Link2 size={14} />
                      </button>
                      {photo && (
                        <button
                          type="button"
                          onClick={() => handleRemove(m.name)}
                          title="Remove photo"
                          className="h-9 w-9 rounded-full bg-background/85 backdrop-blur-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive inline-flex items-center justify-center transition-colors"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Bottom fade */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                  </div>

                  {/* Body */}
                  <div className="relative p-6">
                    <h3 className="text-xl font-bold text-foreground tracking-tight">{m.name}</h3>
                    <p className="text-sm font-semibold text-primary mt-1 uppercase tracking-[0.08em]">
                      {m.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-4">{m.bio}</p>


                    {/* Socials */}
                    <div className="flex items-center gap-2 mt-5">
                      <button
                        type="button"
                        aria-label={`Email ${m.name}`}
                        className="w-9 h-9 rounded-full border border-border hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-colors"
                      >
                        <Mail size={15} />
                      </button>
                      {(() => {
                        const href =
                          m.linkedin ??
                          `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(m.name)}`;
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(href, "_blank", "noopener,noreferrer");
                            }}
                            aria-label={`${m.name} on LinkedIn`}
                            className="w-9 h-9 rounded-full border border-border hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Linkedin size={15} />
                          </a>
                        );
                      })()}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Hover any card to upload a photo from your computer or paste an image URL. Photos are
            saved in your browser.
          </p>
        </section>

        {/* CTA */}
        <section className="relative max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/10 p-10 sm:p-14 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.15),transparent_60%)] pointer-events-none" />
            <h2 className="relative text-3xl sm:text-4xl font-extrabold text-foreground tracking-[-0.02em] mb-4">
              Want to work with our team?
            </h2>
            <p className="relative text-muted-foreground max-w-xl mx-auto mb-8">
              Get in touch today to schedule your cybersecurity consultation and take the first step
              toward stronger protection.
            </p>
            <div className="relative flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center px-7 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-[0.12em] shadow-[0_8px_30px_hsl(var(--primary)/0.4)] hover:brightness-110 transition-all"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-7 py-3 rounded-full border border-border hover:border-primary text-foreground hover:text-primary font-bold text-sm uppercase tracking-[0.12em] transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
