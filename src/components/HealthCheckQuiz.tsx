import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, ShieldAlert, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Answer = "yes" | "partial" | "no";

interface Question {
  id: string;
  topic: string;
  question: string;
  help: string;
}

const questions: Question[] = [
  {
    id: "mfa",
    topic: "Multi-Factor Authentication",
    question: "Do all your staff use Multi-Factor Authentication (MFA) when they log in?",
    help: "MFA means a second step (like a code on your phone) on top of the password.",
  },
  {
    id: "passwords",
    topic: "Password Rules",
    question: "Do you have a clear password policy (long, unique passwords, no sharing)?",
    help: "Strong passwords are at least 12 characters and never reused.",
  },
  {
    id: "backups",
    topic: "Backups",
    question: "Do you back up your important data — and have you tested restoring it?",
    help: "A backup you never tested is not a real backup.",
  },
  {
    id: "updates",
    topic: "Software Updates",
    question: "Are your computers, servers, and software updated automatically?",
    help: "Most attacks use known bugs that already have a fix.",
  },
  {
    id: "endpoint",
    topic: "Endpoint Protection",
    question: "Do all your devices have modern protection (EDR), not just basic antivirus?",
    help: "EDR can detect and stop new attacks, not only known viruses.",
  },
  {
    id: "email",
    topic: "Email Security",
    question: "Do you have protection against phishing emails (e.g. Microsoft Defender for Office 365)?",
    help: "Most attacks start with a fake email.",
  },
  {
    id: "training",
    topic: "Staff Training",
    question: "Do your staff receive regular cyber security training?",
    help: "People are your first line of defence.",
  },
  {
    id: "access",
    topic: "Access Control",
    question: "Do people only have access to the systems and data they really need?",
    help: "This is called 'least privilege'. It limits damage if an account is hacked.",
  },
  {
    id: "plan",
    topic: "Incident Plan",
    question: "Do you have a written plan for what to do if you get hacked?",
    help: "A plan saves hours when every minute matters.",
  },
  {
    id: "monitoring",
    topic: "24/7 Monitoring",
    question: "Is someone watching your systems for threats 24 hours a day (a SOC)?",
    help: "Attackers do not work office hours. Detection should never sleep.",
  },
];

const scoreFor = (a: Answer) => (a === "yes" ? 2 : a === "partial" ? 1 : 0);

const HealthCheckQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [done, setDone] = useState(false);

  const total = questions.length;
  const current = questions[step];
  const currentAnswer = answers[current?.id];
  const progress = ((step + (currentAnswer ? 1 : 0)) / total) * 100;

  const handleNext = () => {
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  const totalScore = Object.values(answers).reduce((sum, a) => sum + scoreFor(a), 0);
  const maxScore = total * 2;

  const tier =
    totalScore >= 16
      ? {
          label: "Strong",
          color: "text-green-600",
          icon: ShieldCheck,
          headline: "Your security is in good shape.",
          message:
            "You are doing the basics well. The next step is advanced threat hunting and continuous improvement.",
        }
      : totalScore >= 10
      ? {
          label: "Fair",
          color: "text-yellow-600",
          icon: AlertTriangle,
          headline: "You have a base — but clear gaps remain.",
          message:
            "Some important controls are missing or only partly in place. A full assessment will show you exactly where to start.",
        }
      : {
          label: "At Risk",
          color: "text-red-600",
          icon: ShieldAlert,
          headline: "Your business is exposed.",
          message:
            "Several key protections are missing. Attackers look for exactly these gaps. We strongly recommend a free consultation today.",
        };

  const weakAreas = questions
    .filter((q) => (answers[q.id] ?? "no") !== "yes")
    .slice(0, 4)
    .map((q) => q.topic);

  if (done) {
    const Icon = tier.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-8 sm:p-10 bg-white"
        style={{ border: "1px solid rgba(31,143,203,0.25)", boxShadow: "0 20px 60px -20px rgba(31,143,203,0.25)" }}
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: "rgba(31,143,203,0.08)", border: "1px solid rgba(31,143,203,0.25)" }}
          >
            <Icon className={tier.color} size={32} strokeWidth={1.5} />
          </div>
          <span className={`text-sm font-semibold uppercase tracking-wider ${tier.color}`}>
            {tier.label}
          </span>
          <div className="text-5xl font-extrabold text-light-foreground mt-3 mb-2">
            {totalScore}<span className="text-2xl text-muted-foreground">/{maxScore}</span>
          </div>
          <h3 className="text-2xl font-bold text-light-foreground mb-2">{tier.headline}</h3>
          <p className="text-[#3A4A5C] max-w-xl leading-[1.8]">{tier.message}</p>
        </div>

        {weakAreas.length > 0 && (
          <div className="mb-8">
            <h4 className="font-semibold text-light-foreground mb-3">Areas to look at first:</h4>
            <ul className="space-y-2">
              {weakAreas.map((area) => (
                <li key={area} className="flex items-start gap-3 text-[#3A4A5C]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/get-a-quote" className="gold-btn text-sm flex-1 text-center">
            Book a Free Consultation
          </Link>
          <button onClick={handleReset} className="outline-btn text-sm flex items-center justify-center gap-2">
            <RefreshCw size={16} /> Start Over
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-center">
          Your answers stay on your device. Nothing is saved or shared.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className="rounded-xl p-8 sm:p-10 bg-white"
      style={{ border: "1px solid rgba(31,143,203,0.25)", boxShadow: "0 20px 60px -20px rgba(31,143,203,0.25)" }}
    >
      <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
        <span>Question {step + 1} of {total}</span>
        <span className="text-primary font-medium">{current.topic}</span>
      </div>
      <Progress value={progress} className="mb-8 h-1.5" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-light-foreground mb-2">
            {current.question}
          </h3>
          <p className="text-[#3A4A5C] mb-6 leading-relaxed">{current.help}</p>

          <RadioGroup
            value={currentAnswer ?? ""}
            onValueChange={(v) => setAnswers({ ...answers, [current.id]: v as Answer })}
            className="space-y-3"
          >
            {[
              { value: "yes", label: "Yes — fully in place" },
              { value: "partial", label: "Partly — only some people / some systems" },
              { value: "no", label: "No / I don't know" },
            ].map((opt) => (
              <Label
                key={opt.value}
                htmlFor={`${current.id}-${opt.value}`}
                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                  currentAnswer === opt.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"
                }`}
                style={{ border: "1px solid", borderColor: currentAnswer === opt.value ? "#1F8FCB" : "#E2E8F0" }}
              >
                <RadioGroupItem value={opt.value} id={`${current.id}-${opt.value}`} />
                <span className="text-[15px] text-light-foreground font-medium">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="outline-btn text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={handleNext}
          disabled={!currentAnswer}
          className="gold-btn text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {step === total - 1 ? "See My Result" : "Next"} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default HealthCheckQuiz;
