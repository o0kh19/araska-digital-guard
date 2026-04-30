# Reorder Nav + Modernize Header Style

## Nav order
Update `navLinks` in `src/components/Header.tsx` to:
**Home → Services → Resources → Team → About**

(Add the new "Team" entry in this position, matching what you described.)

## Modern style upgrade for the header

Refresh the main navigation visual to feel more polished and modern, while keeping the existing white header / red "Breached?" / blue Araska wordmark identity intact.

### Desktop nav links
- Replace the current static underline-on-active with a **pill-style hover indicator**: each link sits inside a rounded-full hover background (`hover:bg-slate-100`) with smooth transition.
- Active link gets a **filled pill** in primary color tint (`bg-primary/10 text-primary`) plus a subtle 2px primary underline for clarity.
- Slightly tighter gap (`gap-2`) since links now have padding, and uppercase tracking for a sharper feel (`text-xs uppercase tracking-[0.12em] font-semibold`).
- Add a soft animated dot/indicator under hovered link (using a `::after` pseudo or a span that scales in).

### Top utility bar
- Keep light gray, but increase contrast: darker text, the **Contact** button becomes outlined-on-hover, and **Breached?** gets a subtle pulsing red glow ring to draw the eye (CSS `animate-pulse` on a ring layer, not the button itself, so it stays readable).

### Header container
- On scroll: switch to a **frosted glass effect** (`bg-white/80 backdrop-blur-md`) instead of plain white, with a slightly stronger shadow. At top of page, stays solid white.
- Smooth height transition (slightly more compact when scrolled).

### Mobile menu
- Slide-down panel with the same pill-style links, larger tap targets, and a divider above the **Breached?** / **Contact** buttons which are pinned at the bottom of the panel for quick access.

## Files touched
- `src/components/Header.tsx` — nav array reorder + add Team, restyle desktop & mobile nav, scroll glass effect.

## Out of scope
- Creating the `/team` page itself (already covered separately — let me know if you want it built in this same step).
- Footer nav (can mirror the new order in a follow-up if you want).

Approve and I'll implement.
