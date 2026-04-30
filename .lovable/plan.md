## Goal

1. Add two on-brand AI-generated images side-by-side at the top of the About page, matching the reference layout (two rounded cards).
2. Replace the existing "Who We Are" intro copy with the new structured copy you provided ("Built to Protect. Built to Last." → "Our Expertise" → "The Araska Mission").

## Layout

```text
┌──────────────────────────────────────────────────┐
│  [ Image 1: SOC analyst   ][ Image 2: Araska HQ ]│
│  [ at workstation, UK     ][ hex wall + brand   ]│
│  [ threat dashboard       ][ welcome panel      ]│
└──────────────────────────────────────────────────┘

  ABOUT US
  Built to Protect. Built to Last.
  <intro paragraph>

  Our Expertise
  <paragraph>
   • Security Operations & Threat Intelligence
   • Incident Response
   • Compliance & Risk Management
  <closing line about service model>

  The Araska Mission
  <two paragraphs>
```

Two equal columns on desktop, stacked on mobile, rounded-2xl, subtle neon-green hover glow matching the existing team-card style.

## Images to generate

Two custom 1024×1024 images via the AI gateway (Nano banana pro), saved to `src/assets/`:

1. **`about-soc.jpg`** — Focused security analyst at a dark workstation, monitor showing a Sentinel-style threat dashboard with a UK map and neon-green data points. Matte-black room, blue/green ambient lighting. On-brand, not the reference.
2. **`about-hq.jpg`** — Modern corporate entrance with sculpted hexagonal wall, sleek monitor displaying "ARASKA CYBER CORE — WELCOME", neon-green edge lighting, "Built to Protect. Built to Last." plaque, "UK H.Q." subtext. Dark/matte palette.

Both styled to fit the dark-theme + neon-green #39FF14 brand language.

## Technical changes

- **Generate 2 images** via AI gateway → save as `src/assets/about-soc.jpg` and `src/assets/about-hq.jpg`.
- **`src/pages/About.tsx`**:
  - Import both image assets.
  - Insert a new `motion.div` block at the top of `<main>` (above the "Who We Are" section) containing a `grid grid-cols-1 md:grid-cols-2 gap-6 mb-12` with two image cards (rounded-2xl, border, hover glow).
  - Replace the body of the existing "Who We Are" block (lines 109–119) with the new structured copy:
    - Lead paragraph (founding belief).
    - `<h2>` "Our Expertise" + intro line + bulleted list of the 3 capability areas + closing line about the service model.
    - `<h2>` "The Araska Mission" + the two final paragraphs.
  - Keep existing eyebrow ("About Us"), H1 ("Built to Protect. Built to Last."), typography classes, and animations.

No other sections (Values, Approach, Team, CTA) are touched. No spacing regressions.

## Result

The About page opens with a strong branded visual pair, then flows into a clearer, better-structured intro that highlights expertise areas and mission — using the exact copy you provided.