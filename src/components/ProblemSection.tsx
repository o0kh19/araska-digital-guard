import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import socDashboard from "@/assets/soc-dashboard.jpg";

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding section-dark" ref={ref}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow text-xl font-bold">Why we do it</span>
          <span className="eyebrow-rule mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground tracking-[-0.015em] mb-6 font-sans mx-px my-0 px-0 lg:text-5xl">
            The cybersecurity partner that understands your business, speaks your language, and{" "}
            <span className="text-primary">protects what matters.</span>
          </h2>
          <div className="text-muted-foreground text-lg leading-[1.8] space-y-6">
            <p>
              Cybersecurity has a reputation for being complex, expensive, and difficult to understand and for too long, that has left businesses in our region without the protection they deserve.
            </p>
            <p>
              At ArasKa Cyber Core, we built this company to change that. We understand your business because we are here not advising remotely from another country, not sending generic reports written for a different market. We sit with you, we learn how your organisation works, and we build our services around your reality. We speak your language because security advice that you cannot fully understand is security advice you cannot fully act on so every conversation, every report, and every training session we deliver is available in Kurdish, Arabic, and English, whichever works best for you and your team.
            </p>
            <p>
              We protect what matters because our job is not to impress you with technical language it is to keep your business running, your data safe, your people informed, and your operations protected from the threats that are growing every day across our region.
            </p>
            <p>
              When something goes wrong and in today's environment, the question is when, not if you need a partner who picks up the phone, who already knows your environment, and who responds with urgency. That is what ArasKa Cyber Core is here to be.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            border: '1px solid rgba(31,143,203,0.25)',
            boxShadow: '0 20px 60px -20px rgba(31,143,203,0.35)',
          }}
        >
          <img
            src={socDashboard}
            alt="Modern 24/7 SOC team in office with large SIEM dashboard wall display"
            loading="lazy"
            width={1280}
            height={800}
            className="w-full h-auto block"
          />

          {/* Animated threat dots over the big SIEM screen map */}
          <div
            className="absolute pointer-events-none"
            style={{ top: '18%', left: '24%', width: '52%', height: '28%' }}
          >
            {[
              { top: '38%', left: '20%', color: 'hsl(0 95% 60%)', delay: 0 },
              { top: '28%', left: '32%', color: 'hsl(140 90% 50%)', delay: 0.9 },
              { top: '30%', left: '50%', color: 'hsl(45 100% 55%)', delay: 0.5 },
              { top: '44%', left: '56%', color: 'hsl(0 95% 60%)', delay: 1.3 },
              { top: '34%', left: '64%', color: 'hsl(140 90% 50%)', delay: 0.3 },
              { top: '40%', left: '74%', color: 'hsl(140 90% 50%)', delay: 1.6 },
              { top: '58%', left: '82%', color: 'hsl(45 100% 55%)', delay: 1.0 },
              { top: '54%', left: '38%', color: 'hsl(0 95% 60%)', delay: 1.9 },
            ].map((d, i) => (
              <div key={i} className="absolute" style={{ top: d.top, left: d.left }}>
                <span
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 22, height: 22,
                    border: `2px solid ${d.color}`,
                    boxShadow: `0 0 10px ${d.color}`,
                    animation: `threat-ping 2.4s cubic-bezier(0,0,0.2,1) ${d.delay}s infinite`,
                  }}
                />
                <span
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 6, height: 6,
                    background: d.color,
                    boxShadow: `0 0 10px ${d.color}, 0 0 20px ${d.color}`,
                    animation: `threat-glow 2s ease-in-out ${d.delay}s infinite`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Scanline sweeping across the SIEM screen */}
          <div
            className="absolute pointer-events-none overflow-hidden"
            style={{ top: '15%', left: '22%', width: '56%', height: '34%' }}
          >
            <div
              className="absolute inset-y-0 w-1/3"
              style={{
                background:
                  'linear-gradient(90deg, transparent, hsl(140 90% 50% / 0.18), transparent)',
                animation: 'scan-sweep 4.5s linear infinite',
              }}
            />
          </div>

          {/* Ambient screen glow lighting the room */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse 55% 32% at 50% 30%, hsl(140 90% 50% / 0.22), transparent 70%)',
              animation: 'ambient-pulse 5s ease-in-out infinite',
            }}
          />

          {/* Bottom vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(5,10,20,0.5) 100%)' }}
          />

          <style>{`
            @keyframes threat-ping {
              0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
              80%, 100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
            }
            @keyframes threat-glow {
              0%, 100% { opacity: 0.85; transform: translate(-50%, -50%) scale(1); }
              50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
            }
            @keyframes scan-sweep {
              0% { transform: translateX(-120%); }
              100% { transform: translateX(420%); }
            }
            @keyframes ambient-pulse {
              0%, 100% { opacity: 0.7; }
              50% { opacity: 1; }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
