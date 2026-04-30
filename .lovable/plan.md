# Match Resources Cards to Home "What We Do" Card Style

Restyle the article cards in `src/pages/Resources.tsx` to look and animate exactly like the **primary services cards** in `src/components/ServicesOverview.tsx` ("What We Do" section).

## Reference style being copied
From `ServicesOverview.tsx` primary cards:
- White background, subtle primary-colored border (`hsl(var(--primary) / 0.18)`)
- Centered content (icon → title → description → CTA pill)
- Icon in a 52×52 rounded chip with primary tint background and border
- Uppercase, bold tracked title
- Bold body text
- "Learn More" outlined pill button (primary border, fills primary on hover)
- **Hover animation**: framer-motion `whileHover={{ rotateX: -4, rotateY: 6, translateY: -8, scale: 1.02 }}` with `perspective: 1200px` on the grid wrapper, `transformStyle: preserve-3d` on the card
- **Hover state**: stronger primary border + multi-layer glow shadow (`0 24px 50px -14px hsl(var(--primary)/0.5), 0 0 0 1px hsl(var(--primary)/0.45), 0 0 24px hsl(var(--primary)/0.35)`)
- Icon chip translates forward (`translateZ(20px) scale(1.1)`) on hover

## Changes to `src/pages/Resources.tsx`
1. Import additional lucide icons (`ShieldAlert`, `KeyRound`, `Activity`, `Cloud`, `Bug`, `GraduationCap`, `Search`) and add a `categoryIcons` map keyed by article category, with a `FileText` fallback.
2. Wrap the cards grid in a container with `style={{ perspective: "1200px" }}`.
3. Replace each card's JSX with the same structure as the primary services card:
   - Track hover via local `hoveredIdx` state (`useState<number | null>`)
   - Use `motion.article` with the same `whileHover` 3D tilt
   - Inline style: white bg, primary border, dynamic border + box-shadow on hover, `transformStyle: "preserve-3d"`, smooth transition
   - Icon chip (52×52, primary tint) with `translateZ`/scale on hover
   - Category eyebrow above title (small, primary, uppercase tracked)
   - Title: `text-[18px] font-bold uppercase tracking-wide`
   - Summary: `text-[15px] font-bold leading-[1.7] text-muted-foreground flex-1`
   - "Read More" pill button matching the "Learn More" button style; clicking still opens the existing modal
4. Keep the existing modal logic, category filter, and article data unchanged.

## Out of scope
- Modal redesign
- Category filter restyle
- Adding the central image / SVG connection lines from the home section (that's specific to the network visual on Home and would not make sense on Resources)

Approve and I'll implement.
