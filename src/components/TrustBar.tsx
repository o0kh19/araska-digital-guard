const tools = [
  "Microsoft Azure",
  "Microsoft 365",
  "Microsoft Cloud",
  "Microsoft Defender",
  "Microsoft SIEM",
  "Microsoft XDR & EDR",
];

const MicrosoftLogo = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 23 23"
    aria-hidden="true"
    className="shrink-0"
  >
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
);

const TrustBar = () => (
  <section
    className="section-dark-alt py-8"
    style={{
      borderTop: '1px solid rgba(31,143,203,0.12)',
      borderBottom: '1px solid rgba(31,143,203,0.12)',
    }}
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary/40" />
          <span className="eyebrow mb-0">Powered by Microsoft Security Stack</span>
          <span className="h-px w-8 bg-primary/40" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-wide text-foreground/80 transition-all hover:text-foreground hover:-translate-y-0.5"
              style={{
                background: 'rgba(31,143,203,0.06)',
                border: '1px solid rgba(31,143,203,0.18)',
              }}
            >
              <MicrosoftLogo />
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrustBar;
