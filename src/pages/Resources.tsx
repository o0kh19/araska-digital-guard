import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  "All",
  "Threat Intelligence",
  "SOC & Monitoring",
  "Compliance",
  "Incident Response",
  "Awareness Training",
];

const posts = [
  {
    category: "Threat Intelligence",
    title: "Why Sector-Specific Threat Intelligence Matters More Than Generic Feeds",
    excerpt: "Not all threats are relevant to your organisation. Here is why tailored intelligence produces better security outcomes than broad-spectrum data.",
    date: "12 March 2025",
  },
  {
    category: "SOC & Monitoring",
    title: "What a Co-Managed SOC Actually Looks Like in Practice",
    excerpt: "Many organisations worry that outsourcing security monitoring means losing control. Here is how a co-managed model preserves your team's role while adding serious capability.",
    date: "28 February 2025",
  },
  {
    category: "Awareness Training",
    title: "The Five Phishing Techniques Your Staff Are Most Likely to Fall For",
    excerpt: "Phishing continues to be the most common entry point for attackers. These are the five techniques our trainers see most frequently — and how to counter them.",
    date: "15 February 2025",
  },
];

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="eyebrow text-xl">Insights</span>
            <span className="eyebrow-rule" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-[-0.02em]">
              Resources
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-[1.8]">
              Threat briefings, security guides, and practical insights from the Araska Cyber Core team.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-4 py-2 rounded transition-all duration-200 ${
                  activeCategory === cat
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{
                  border: activeCategory === cat ? '1px solid rgba(31,143,203,0.45)' : '1px solid rgba(31,143,203,0.18)',
                  background: activeCategory === cat ? 'rgba(31,143,203,0.08)' : 'transparent',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-lg p-8 transition-all duration-200 flex flex-col hover:translate-y-[-3px]"
                style={{
                  background: '#E5E7EB',
                  border: '1px solid rgba(31,143,203,0.18)',
                  borderRadius: '8px',
                }}
              >
                <span className="text-xs text-primary font-medium tracking-wide mb-3">{post.category}</span>
                <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-[1.8] mb-6 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-primary text-sm font-medium cursor-pointer hover:underline hover:text-primary-light">Read More →</span>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              No posts in this category yet. Check back soon.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
