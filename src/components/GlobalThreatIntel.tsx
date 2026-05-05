import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Lightbulb, Loader2, RadioTower } from "lucide-react";

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  description?: string;
  source: "The Hacker News" | "BleepingComputer";
};

const FEEDS: { url: string; source: FeedItem["source"] }[] = [
  { url: "https://feeds.feedburner.com/TheHackersNews", source: "The Hacker News" },
  { url: "https://www.bleepingcomputer.com/feed/", source: "BleepingComputer" },
];

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

const extractImage = (item: any): string | undefined => {
  if (item.thumbnail) return item.thumbnail;
  if (item.enclosure?.link) return item.enclosure.link;
  const match = (item.description || item.content || "").match(
    /<img[^>]+src=["']([^"']+)["']/i
  );
  return match?.[1];
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const SourceBadge = ({ source }: { source: FeedItem["source"] }) => {
  const isTHN = source === "The Hacker News";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
      style={{
        background: isTHN
          ? "linear-gradient(135deg, hsl(0 80% 50% / 0.15), hsl(0 80% 50% / 0.05))"
          : "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05))",
        border: `1px solid ${isTHN ? "hsl(0 80% 50% / 0.4)" : "hsl(var(--primary) / 0.4)"}`,
        color: isTHN ? "hsl(0 80% 45%)" : "hsl(var(--primary))",
      }}
    >
      <RadioTower size={10} strokeWidth={2.5} />
      {source}
    </span>
  );
};

const GlobalThreatIntel = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const results = await Promise.all(
          FEEDS.map(async ({ url, source }) => {
            const res = await fetch(`${RSS2JSON}${encodeURIComponent(url)}`);
            const json = await res.json();
            if (json.status !== "ok") return [];
            return (json.items as any[]).slice(0, 4).map(
              (it): FeedItem => ({
                title: it.title,
                link: it.link,
                pubDate: it.pubDate,
                thumbnail: extractImage(it),
                description: stripHtml(it.description || "").slice(0, 140),
                source,
              })
            );
          })
        );
        const merged = results
          .flat()
          .sort(
            (a, b) =>
              new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
          )
          .slice(0, 6);
        setItems(merged);
      } catch (e) {
        setError("Unable to load latest threat intelligence.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="mt-20 mb-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex items-end justify-between flex-wrap gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="status-dot" />
            <span className="eyebrow !mb-0">Live Feed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-[-0.02em] flex items-center gap-3">
            <Globe className="text-primary" size={32} strokeWidth={1.75} />
            Global Threat Intelligence
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl leading-[1.7]">
            Real-time headlines from the world's leading cybersecurity publications,
            curated for context that matters.
          </p>
        </div>
      </motion.div>

      {/* Loading / Error */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
          <Loader2 className="animate-spin" size={20} />
          Fetching latest intelligence…
        </div>
      )}

      {error && !loading && (
        <p className="text-center text-muted-foreground py-12">{error}</p>
      )}

      {/* Glassmorphism News Grid */}
      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, hsl(0 0% 100% / 0.7), hsl(0 0% 100% / 0.4))",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid hsl(var(--primary) / 0.18)",
                boxShadow:
                  "0 4px 24px hsl(222 30% 8% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Globe className="text-primary/30" size={48} strokeWidth={1} />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <SourceBadge source={item.source} />
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, hsl(var(--primary) / 0.15))",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-[16px] font-bold text-foreground leading-snug mb-2 line-clamp-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {item.description}…
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-foreground/5">
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                    {new Date(item.pubDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary group-hover:gap-2.5 transition-all">
                    Read More
                    <ExternalLink size={12} strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {/* ArasKa's Insight Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mt-12 overflow-hidden rounded-2xl p-8 sm:p-10"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.06))",
          border: "1px solid hsl(var(--primary) / 0.3)",
          boxShadow:
            "0 8px 32px hsl(var(--primary) / 0.12), inset 0 1px 0 hsl(0 0% 100% / 0.5)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)",
          }}
        />

        <div className="relative flex items-start gap-5">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)))",
              boxShadow: "0 8px 20px hsl(var(--primary) / 0.35)",
            }}
          >
            <Lightbulb className="text-primary-foreground" size={26} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <span className="eyebrow !mb-2 block">Our Expert Take</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-3 tracking-[-0.01em]">
              ArasKa's Insight
            </h3>
            <p className="text-foreground/85 leading-[1.75] text-[15px] sm:text-base">
              The threats making global headlines aren't reserved for Fortune 500
              companies — the same tactics, tooling, and ransomware kits are being
              repurposed against UK SMBs every day. Phishing kits sold on dark-web
              marketplaces let low-skill attackers spin up convincing Microsoft 365
              login pages in minutes. If your business uses email, cloud storage,
              or remote access, you are already in scope. The good news: most of
              these attacks are stopped by MFA, sign-in monitoring, and a SOC that
              spots anomalies in real time. Don't wait to be the headline.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GlobalThreatIntel;
