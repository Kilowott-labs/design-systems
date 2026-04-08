# Block: Hero Floating Cards
**Block name:** `kw-package/hero-floating`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (node J2OAa)

## Purpose
Displays a dark AI product hero with centered content (badge, heading, subheading, dual CTAs) and 4 absolutely-positioned floating feature cards with glassmorphism effect at the corners. Features a multi-layered radial gradient mesh background on dark mode. Cards are hidden on mobile and tablet. Navbar has been extracted to a separate site-header block.

## Attributes

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| colorMode | string | "dark" | Light or dark color scheme |
| heading | string | "Intelligence that\nunderstands..." | Main heading with line break |
| subheading | string | "From natural language..." | Supporting paragraph |
| showBadge | boolean | true | Show/hide badge pill |
| badgeText | string | "Introducing Lumina v3" | Badge text |
| primaryCtaText | string | "Start Creating" | Primary button label |
| primaryCtaUrl | string | "#" | Primary button URL |
| secondaryCtaText | string | "See it in action" | Secondary button label |
| secondaryCtaUrl | string | "#" | Secondary button URL |
| showSecondaryCta | boolean | true | Show/hide secondary CTA |
| floatingCards | array | [4 items] | Feature cards: {id, icon, title, description, position} |

## Theme Tokens Used

| Token slug | CSS variable | Where used |
|---|---|---|
| dark | --wp--preset--color--dark | Section bg (dark) |
| surface | --wp--preset--color--surface | Heading text (dark), card title |
| foreground-muted | --wp--preset--color--foreground-muted | Subheading, card description |
| foreground-subtle | --wp--preset--color--foreground-subtle | Badge text, secondary CTA |
| accent | --wp--preset--color--accent | CTA gradient end, mesh bg, badge dot (light) |
| accent-light | --wp--preset--color--accent-light | CTA gradient start, badge dot (dark), mesh bg |
| accent-surface | --wp--preset--color--accent-surface | Badge bg (light) |
| border | --wp--preset--color--border | Card borders (light) |
| dm-sans | --wp--preset--font-family--dm-sans | Heading, card titles |
| inter | --wp--preset--font-family--inter | Body, badge, CTAs |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor with InspectorControls |
| save.js | Frontend HTML with floating cards at absolute positions |
| style.scss | Mesh gradient bg, glassmorphism, CTA shadow, focus, reduced-motion |
| block-spec.md | This file |

## Known Constraints
- Floating cards use absolute positioning and are hidden below `lg` breakpoint
- The mesh gradient background uses `color-mix()` which requires modern browsers
- The `::before` pseudo-element for gradient requires `style.scss`

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from Pencil design |
| 1.1.0 | 2026-04-05 | Removed embedded navbar (extracted to site-header block) |
