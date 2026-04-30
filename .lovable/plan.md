# Apply Hex-Grid Background Across the Entire Site

Use the same subtle hexagon-grid pattern from the "What We Do" section as the unified background for **every page**: Home, Services, About, Resources, Get a Quote, Contact, Cyber Health Check, and 404.

## Approach

Apply the hex pattern once at the `body` level so it shows through every page and every section automatically. Make all section backgrounds transparent. Cards stay solid white on top.

## Changes

### 1. `src/index.css` — global hex-grid background
- Add the hex-grid SVG pattern to `body` (white base + tiled teal hex SVG, identical to the existing `.hex-grid-bg` utility).
- Keep the `.hex-grid-bg` utility class working for backwards compatibility.
- Make section utilities transparent so the body pattern shows through:
  - `.section-dark` → `background: transparent`
  - `.section-dark-alt` → `background: transparent`
  - `.section-light` → `background: transparent`
  - `.section-tint` → `background: transparent`
- Keep `--background: 0 0% 100%` (white) so cards, inputs, dialogs, dropdowns remain solid on top of the pattern.

### 2. Remove redundant overlay
- `src/components/ServicesOverview.tsx` — remove the inner `<div className="hex-grid-bg absolute inset-0 ...">` to avoid a double-pattern moiré in that one section.

### 3. Page wrappers — let the body pattern show through
Every page currently wraps content in `<div className="min-h-screen bg-background">`. `bg-background` is white, which would cover the body pattern. Change these wrappers to transparent so the hex grid shows:

- `src/pages/Index.tsx`
- `src/pages/Services.tsx`
- `src/pages/About.tsx`
- `src/pages/Resources.tsx`
- `src/pages/GetAQuote.tsx`
- `src/pages/Contact.tsx`
- `src/pages/CyberHealthCheck.tsx`
- `src/pages/NotFound.tsx`

Replace `bg-background` → `bg-transparent` on the outer page wrapper only. Keep `min-h-screen` so layout is preserved.

### 4. Header / Footer
- `Header`: stays solid white (sticky nav must remain opaque so the pattern doesn't run under the menu text).
- `Footer` (`section-dark`): becomes transparent like other sections, inheriting the hex grid. ✓

### 5. Cards and surfaces stay solid
No changes to `.glass-card`, inputs, dialogs, dropdowns, modals — they continue using solid white via `bg-background` or `--card`, sitting cleanly on top of the hex pattern with their soft shadows providing depth.

## What stays the same
- All brand colors (blue primary, green accent, magenta highlight)
- Typography, buttons, eyebrows, soft shadows
- Section spacing (`section-padding`)
- Hero gradient and decorative animations
- Card visuals and behavior

## Result
Every page (Home, Services, About, Resources, Get a Quote, Contact, Cyber Health Check, 404) and every section share one consistent subtle hex-grid background — matching the reference screenshot — while cards, buttons, and content remain crisp and readable on top.
