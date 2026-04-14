const tools = [
  "Microsoft Sentinel",
  "Microsoft Defender",
  "Azure",
  "TheHive",
  "MISP",
  "Velociraptor",
];

const TrustBar = () => (
  <section className="border-y border-border bg-secondary/20 py-6">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
          Powered by
        </span>
        {tools.map((tool) => (
          <span
            key={tool}
            className="text-sm text-foreground/70 font-medium tracking-wide"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
