## Update "By the Numbers" section on Home page

Replace the current 3 stats in `src/components/StatsSection.tsx` with the 4 stats shown in the reference image.

### New stats (4 cards)

1. **100% — Compliance** — "Aligned with global NIST & OWASP standards" — icon: `ShieldCheck`
2. **<15 Mins** — "Target critical incident response time" — icon: `Clock`
3. **24/7** — "Around-the-clock proactive monitoring" — icon: `Users` (or `Eye`)
4. **0% — Tolerance** — "Tolerance for client data loss in our incident response plans" — icon: `Lock`

### Changes in `src/components/StatsSection.tsx`

- Replace the `stats` array with the 4 entries above (update `value`, `prefix`, `suffix`, `label`, `desc`, `format`, `decimals`, `icon`).
- For "24/7" and "<15 Mins", use a string-based display (skip the count-up animation by using value directly) or format functions that output the literal text. Simplest: keep `GlitchCounter` for numeric ones (100, 15, 0) and use prefix/suffix to wrap (`<` / ` Mins`, `%`, `/7` etc.).
  - 100 → prefix none, suffix `%`
  - 15 → prefix `<`, suffix ` Mins`
  - 24 → prefix none, suffix `/7`
  - 0 → prefix none, suffix `%`
- Update grid to `lg:grid-cols-4` so all 4 cards fit on one row on desktop (currently `lg:grid-cols-3`).
- Import `Clock` and `Lock` from `lucide-react`; remove unused `ShieldAlert` and `Activity`.

No other files affected. Animation, tilt, glow, and styling remain unchanged.