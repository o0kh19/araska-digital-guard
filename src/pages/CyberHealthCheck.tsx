import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HealthCheckQuiz from "@/components/HealthCheckQuiz";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Lock } from "lucide-react";

const CyberHealthCheck = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-36 pb-20 section-light">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="eyebrow text-xl">Free Cyber Health Check</span>
          <span className="eyebrow-rule mx-auto" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-light-foreground mb-4 tracking-[-0.02em]">
            How safe is your business — really?
          </h1>
          <p className="text-[#3A4A5C] max-w-2xl mx-auto text-lg leading-[1.8]">
            Answer 10 short questions. In two minutes you will see your security score,
            the weak spots that need attention, and what to do next. No sign-up needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-4 mb-10"
        >
          {[
            { icon: Clock, t: "Takes 2 minutes", d: "10 simple questions in plain English." },
            { icon: ShieldCheck, t: "Instant result", d: "Score, weak areas, and next steps." },
            { icon: Lock, t: "100% private", d: "Nothing saved. Nothing shared." },
          ].map((f) => (
            <div
              key={f.t}
              className="bg-white rounded-lg p-5 flex items-start gap-3"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <f.icon className="text-primary mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <div className="font-semibold text-light-foreground text-sm">{f.t}</div>
                <div className="text-[#3A4A5C] text-sm">{f.d}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HealthCheckQuiz />
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default CyberHealthCheck;
