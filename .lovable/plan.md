# Modern Language Switcher in Header

Add an EN / AR / KU language switcher to `src/components/Header.tsx`, styled to match the modern pill-nav aesthetic.

## Design
- A small **rounded-full pill group** holding `EN`, `AR`, `KU`, prefixed by a subtle `Globe` icon (lucide-react)
- **Active language**: filled with primary green, white text, soft glow shadow
- **Inactive**: muted text, hover lightens to primary
- Smooth color/shadow transitions
- Sits to the right of the desktop nav pill group
- In the mobile slide-down menu: appears as a "Language" row with the same pill switcher on the right, above the Contact / Breached buttons

## Implementation in `src/components/Header.tsx`
1. Import `Globe` from `lucide-react`
2. Add `LANGS = ["EN", "AR", "KU"]` constant + `useState<Lang>("EN")`
3. Insert desktop switcher block after the desktop `<nav>` (before the mobile menu button)
4. Insert mobile switcher row inside the mobile panel, above the Contact / Breached buttons

UI-only for now (no i18n wiring). Real translation of page content can be a follow-up using `i18next`.

## Out of scope
- Actual content translation
- RTL layout flip for Arabic

Approve and I'll implement.
