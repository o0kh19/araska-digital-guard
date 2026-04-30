## Problem

Sections across the site (Home, Services, About, etc.) use `.section-padding` which applies `py-28 md:py-32 lg:py-36` (≈112–144px top/bottom). Stacked, this creates ~250–290px gaps between adjacent sections like "Why We Do It" and "What We Do" — far larger than typical modern websites (which usually use 64–96px).

## Fix

**1. `src/index.css` — tighten the global section utility**

Change:
```
.section-padding {
  @apply px-6 py-28 md:px-12 md:py-32 lg:px-24 lg:py-36;
}
```
to:
```
.section-padding {
  @apply px-6 py-16 md:px-12 md:py-20 lg:px-24 lg:py-24;
}
```
This automatically fixes spacing in: `HeroSection` neighbors, `ProblemSection`, `ServicesOverview`, `StatsSection`, `WhyUsSection`, `HowItWorks`, `CTABanner`.

**2. `src/pages/Services.tsx` — match the same rhythm**
- Line 193: `py-24 md:py-28` → `py-16 md:py-20`
- Line 217: `py-24` → `py-20`
- Line 303: `py-20` → `py-16`

**3. `src/pages/About.tsx`** (line 123)
- `py-20 ... mb-20` → `py-16 ... mb-12`

**4. `src/pages/CyberHealthCheck.tsx`**
- `pt-36 pb-20` → `pt-28 pb-16`

**5. `src/components/Footer.tsx`** (line 21)
- `py-20` → `py-14`

## Result

Section-to-section gaps drop from ~250–290px down to ~120–160px, matching typical SaaS/marketing site rhythm, while keeping breathing room inside each section. No layout, color, or content changes — only spacing.