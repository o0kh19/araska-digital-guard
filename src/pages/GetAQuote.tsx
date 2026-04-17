import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const orgSizes = ["1–10 employees", "11–50 employees", "51–200 employees", "201–1,000 employees", "1,000+ employees"];
const industries = ["Financial Services", "Healthcare", "Legal", "Energy & Utilities", "Retail & E-commerce", "Manufacturing", "Government & Public Sector", "Technology", "Education", "Other"];
const maturityLevels = ["Just getting started", "Basic controls in place", "Moderate — some formal processes", "Advanced — structured security programme"];
const serviceOptions = ["SOC as a Service", "Threat Intelligence", "Cyber Risk Assessment", "Incident Response Retainer", "Security Awareness Training", "Not sure — I need advice"];
const endpointRanges = ["Fewer than 25", "25–100", "101–500", "501–2,000", "More than 2,000"];
const complianceOptions = ["ISO 27001", "GDPR", "NIS2", "SOC 2", "PCI DSS", "HIPAA", "None currently", "Not sure"];
const motivations = ["We've had an incident or near miss", "We are preparing for a compliance audit", "We are growing and need to formalise security", "A client or partner has asked us to demonstrate security maturity", "We want to understand our current risk", "Other"];
const timelines = ["Urgent — within 2 weeks", "Within 1 month", "Within 3 months", "No fixed timeline"];
const referralSources = ["Web search", "LinkedIn", "Referral", "Conference or event", "Other"];

const GetAQuote = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", title: "", org: "", email: "", country: "", orgSize: "", industry: "",
    hasSecTeam: "", hasSIEM: "", hasEDR: "", maturity: "", hadIncident: "",
    services: preselectedService ? [preselectedService] : [] as string[],
    endpoints: "", compliance: [] as string[], motivation: "",
    timeline: "", referral: "", notes: "", consent: false,
  });

  const update = (field: string, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleMulti = (field: "services" | "compliance", val: string) => {
    const arr = form[field];
    update(field, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const canNext = () => {
    if (step === 1) return form.name && form.title && form.org && form.email && form.country && form.orgSize && form.industry;
    if (step === 2) return form.hasSecTeam && form.hasSIEM && form.hasEDR && form.maturity && form.hadIncident;
    if (step === 3) return form.services.length > 0 && form.endpoints && form.motivation;
    if (step === 4) return form.timeline && form.referral && form.consent;
    return false;
  };

  const handleSubmit = () => setSubmitted(true);

  const inputCls = "w-full rounded px-4 py-3.5 text-[15px] text-foreground placeholder:text-[#5A6A80] focus:outline-none transition-colors";
  const inputStyle = {
    background: '#F3F4F6',
    border: '1px solid rgba(200,146,10,0.18)',
    borderRadius: '4px',
  };
  const inputFocusProps = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = '#C8920A';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,146,10,0.12)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = 'rgba(200,146,10,0.18)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };
  const labelCls = "block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground mb-1.5";

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-36 pb-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center px-6"
          >
            <CheckCircle className="text-primary mx-auto mb-6" size={48} />
            <h1 className="text-3xl font-bold text-foreground mb-4">Thank You</h1>
            <p className="text-muted-foreground leading-[1.8]">
              We've received your request. A member of our team will review your details and be in touch
              within one business day. In the meantime, feel free to explore our{" "}
              <a href="/resources" className="text-primary hover:underline">resources</a> or reach out
              directly at{" "}
              <a href="mailto:info@araskacybercore.com" className="text-primary hover:underline">
                info@araskacybercore.com
              </a>.
            </p>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-36 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <span className="eyebrow">Request a Proposal</span>
            <span className="eyebrow-rule" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-[-0.02em]">
              Get a Tailored Quote
            </h1>
            <p className="text-muted-foreground text-lg leading-[1.8] max-w-2xl">
              Every organisation is different. Fill in the details below and we will come back to you with
              a scoped proposal built around your specific situation. There is no obligation and no generic packages.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-border"}`} />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mb-8">
            Step {step} of 4 — {["About Your Organisation", "Your Current Security Setup", "What You Need", "Anything Else"][step - 1]}
          </p>

          <div className="rounded-lg p-8 md:p-10" style={{ background: '#E5E7EB', border: '1px solid rgba(200,146,10,0.18)', borderRadius: '8px' }}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Full Name *</label><input className={inputCls} style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} {...inputFocusProps} /></div>
                  <div><label className={labelCls}>Job Title *</label><input className={inputCls} style={inputStyle} value={form.title} onChange={(e) => update("title", e.target.value)} {...inputFocusProps} /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Organisation Name *</label><input className={inputCls} style={inputStyle} value={form.org} onChange={(e) => update("org", e.target.value)} {...inputFocusProps} /></div>
                  <div><label className={labelCls}>Work Email *</label><input type="email" className={inputCls} style={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} {...inputFocusProps} /></div>
                </div>
                <div><label className={labelCls}>Country / Region *</label><input className={inputCls} style={inputStyle} value={form.country} onChange={(e) => update("country", e.target.value)} {...inputFocusProps} /></div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Organisation Size *</label>
                    <select className={inputCls} style={inputStyle} value={form.orgSize} onChange={(e) => update("orgSize", e.target.value)} {...inputFocusProps}>
                      <option value="">Select...</option>
                      {orgSizes.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Industry Sector *</label>
                    <select className={inputCls} style={inputStyle} value={form.industry} onChange={(e) => update("industry", e.target.value)} {...inputFocusProps}>
                      <option value="">Select...</option>
                      {industries.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className={labelCls}>Do you currently have a dedicated internal security team? *</label>
                  <select className={inputCls} style={inputStyle} value={form.hasSecTeam} onChange={(e) => update("hasSecTeam", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="IT handles security">We have IT staff who handle security as part of a wider role</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Do you currently use any SIEM or monitoring tools? *</label>
                  <select className={inputCls} style={inputStyle} value={form.hasSIEM} onChange={(e) => update("hasSIEM", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    <option value="Yes — Microsoft Sentinel">Yes — Microsoft Sentinel</option>
                    <option value="Yes — another tool">Yes — another tool</option>
                    <option value="No">No</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Do you have endpoint detection and response (EDR) deployed? *</label>
                  <select className={inputCls} style={inputStyle} value={form.hasEDR} onChange={(e) => update("hasEDR", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    <option value="Yes — Microsoft Defender">Yes — Microsoft Defender</option>
                    <option value="Yes — another tool">Yes — another tool</option>
                    <option value="No">No</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>How would you describe your current security maturity? *</label>
                  <select className={inputCls} style={inputStyle} value={form.maturity} onChange={(e) => update("maturity", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    {maturityLevels.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Have you experienced a security incident or breach in the last 24 months? *</label>
                  <select className={inputCls} style={inputStyle} value={form.hadIncident} onChange={(e) => update("hadIncident", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className={labelCls}>Which services are you interested in? *</label>
                  <div className="grid sm:grid-cols-2 gap-2 mt-2">
                    {serviceOptions.map((s) => (
                      <label
                        key={s}
                        className="flex items-center gap-3 p-3 rounded cursor-pointer transition-colors"
                        style={{ border: form.services.includes(s) ? '1px solid rgba(200,146,10,0.45)' : '1px solid rgba(200,146,10,0.18)' }}
                      >
                        <input
                          type="checkbox"
                          checked={form.services.includes(s)}
                          onChange={() => toggleMulti("services", s)}
                          className="accent-primary w-4 h-4"
                        />
                        <span className="text-sm text-foreground">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Approximately how many endpoints? *</label>
                  <select className={inputCls} style={inputStyle} value={form.endpoints} onChange={(e) => update("endpoints", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    {endpointRanges.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Compliance or regulatory requirements</label>
                  <div className="grid sm:grid-cols-2 gap-2 mt-2">
                    {complianceOptions.map((c) => (
                      <label
                        key={c}
                        className="flex items-center gap-3 p-3 rounded cursor-pointer transition-colors"
                        style={{ border: form.compliance.includes(c) ? '1px solid rgba(200,146,10,0.45)' : '1px solid rgba(200,146,10,0.18)' }}
                      >
                        <input
                          type="checkbox"
                          checked={form.compliance.includes(c)}
                          onChange={() => toggleMulti("compliance", c)}
                          className="accent-primary w-4 h-4"
                        />
                        <span className="text-sm text-foreground">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Primary motivation for reaching out? *</label>
                  <select className={inputCls} style={inputStyle} value={form.motivation} onChange={(e) => update("motivation", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    {motivations.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <label className={labelCls}>Is there a specific timeline or deadline? *</label>
                  <select className={inputCls} style={inputStyle} value={form.timeline} onChange={(e) => update("timeline", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    {timelines.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>How did you hear about Araska Cyber Core? *</label>
                  <select className={inputCls} style={inputStyle} value={form.referral} onChange={(e) => update("referral", e.target.value)} {...inputFocusProps}>
                    <option value="">Select...</option>
                    {referralSources.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Anything else you'd like us to know?</label>
                  <textarea
                    className={`${inputCls} min-h-[120px] resize-y`}
                    style={inputStyle}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Tell us anything that helps us understand your situation better. There are no wrong answers."
                    {...inputFocusProps}
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    className="accent-primary w-4 h-4 mt-1"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to be contacted by Araska Cyber Core regarding this enquiry. We do not share your data with third parties. *
                  </span>
                </label>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(200,146,10,0.12)' }}>
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  ← Back
                </button>
              ) : <div />}
              {step < 4 ? (
                <button
                  onClick={() => canNext() && setStep(step + 1)}
                  disabled={!canNext()}
                  className="gold-btn text-xs py-2.5 px-6 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canNext()}
                  className="gold-btn text-xs py-2.5 px-6 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Send My Request
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetAQuote;
