const tools = [
  "Microsoft Azure",
  "Microsoft 365",
  "Microsoft SIEM",
  "Microsoft Cloud",
  "Microsoft Defender",
  "Microsoft XDR & EDR",
];

const TrustBar = () => (
  <section className="section-dark-alt py-6" style={{ borderTop: '1px solid rgba(31,143,203,0.12)', borderBottom: '1px solid rgba(31,143,203,0.12)' }}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        <span className="eyebrow mb-0">Powered by</span>
        {tools.map((tool) => (
          <span
            key={tool}
            className="text-sm text-foreground/60 font-medium tracking-wide"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
