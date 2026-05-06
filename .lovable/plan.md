## Update "By the Numbers" labels & alignment

In `src/components/StatsSection.tsx`, update the `stats` array labels:

- `<15 Mins` card → label: **"Response Time"**
- `24/7` card → label: **"Live Monitoring"**
- `0%` card → label: **"Data Loss Margin"**
- `100%` card → label stays **"Compliance"**

### Alignment & spacing consistency

- Ensure each card uses the same vertical rhythm: icon (mb-5) → number (mb-2) → label (mb-2) → description.
- Add `min-h-[14rem]` (or similar) to the card inner container so all 4 cards match height regardless of description length ("Tolerance for client data loss…" is longer than others).
- Keep icon centered (`mx-auto`) and text `text-center` — already set.
- Verify the number line uses consistent font size; the `<15 Mins` value will wrap on narrow screens, so reduce number to `text-3xl sm:text-4xl` only if needed (otherwise leave as-is on desktop).

No other files affected.