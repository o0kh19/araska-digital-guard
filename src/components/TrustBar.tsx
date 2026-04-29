const MicrosoftLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="22" height="22" viewBox="0 0 23 23" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
    <span className="font-semibold text-slate-800 text-base">Microsoft</span>
  </div>
);

const NistLogo = () => (
  <div className="flex items-center gap-2.5">
    <span
      className="font-extrabold tracking-tight text-xl"
      style={{ color: "#1F4E9C", fontFamily: "Georgia, serif" }}
    >
      NIST
    </span>
    <span className="h-7 w-px bg-slate-300" />
    <span className="text-[10px] leading-tight text-slate-500 uppercase tracking-wide">
      Cybersecurity
      <br />
      Framework
    </span>
  </div>
);

const OwaspLogo = () => (
  <div className="flex items-center gap-2.5">
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="none" stroke="#0A2540" strokeWidth="1.5" />
      <path
        d="M6 12 Q12 6 18 12 Q12 18 6 12 Z"
        fill="none"
        stroke="#0A2540"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2" fill="#0A2540" />
    </svg>
    <span className="font-bold text-slate-900 text-lg tracking-tight">
      OWASP
    </span>
  </div>
);

const MitreLogo = () => (
  <div className="flex items-center gap-2.5">
    <span
      className="font-bold text-xl tracking-tight"
      style={{ color: "#005B94" }}
    >
      MITRE
    </span>
    <span className="h-7 w-px bg-slate-300" />
    <span className="text-[10px] leading-tight text-slate-500 uppercase tracking-wide">
      Adversarial
      <br />
      Security
    </span>
  </div>
);

const logos = [
  { name: "NIST", Comp: NistLogo },
  { name: "OWASP", Comp: OwaspLogo },
  { name: "MITRE", Comp: MitreLogo },
  { name: "Microsoft", Comp: MicrosoftLogo },
];

const TrustBar = () => (
  <section className="relative bg-slate-50 py-16 overflow-hidden">
    <div className="absolute inset-0 cyber-grid-bg-light opacity-40 pointer-events-none" />
    <div className="relative max-w-6xl mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-[-0.02em]">
          Trusted Cyber{" "}
          <span style={{ color: "hsl(222 89% 55%)" }}>Security Standards</span>
        </h2>
        <p className="mt-3 text-slate-600 text-base">
          Dedicated to industry-leading security standards and frameworks.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {logos.map(({ name, Comp }) => (
          <div
            key={name}
            className="bg-white rounded-xl py-6 px-5 flex items-center justify-center transition-all hover:-translate-y-0.5"
            style={{
              border: "1px solid hsl(220 20% 90%)",
              boxShadow: "0 2px 12px -6px hsl(222 30% 8% / 0.08)",
            }}
          >
            <Comp />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
