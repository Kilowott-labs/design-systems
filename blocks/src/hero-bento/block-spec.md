# Block: Hero Bento Grid
**Block name:** `kw-package/hero-bento`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (node CkDJp)

## Purpose
Displays a SaaS dashboard hero with a left text column (badge, heading, subheading, dual CTAs) and a right bento grid of 5 metric cards arranged in a 2-row layout (2 large cards on top, 3 smaller on bottom). One card uses a dark background, one uses an accent gradient, the rest use light card styling. Supports light/dark color modes. Navbar has been extracted to a separate site-header block.

## Attributes

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| colorMode | string | "light" | Light or dark color scheme |
| heading | string | "Your entire business..." | Main hero heading |
| subheading | string | "Connect all your tools..." | Supporting paragraph |
| showBadge | boolean | true | Show/hide badge pill |
| badgeText | string | "AI-powered insights" | Badge description text |
| badgeLabel | string | "NEW" | Badge label prefix |
| primaryCtaText | string | "Start Free Trial" | Primary button label |
| primaryCtaUrl | string | "#" | Primary button URL |
| secondaryCtaText | string | "Watch Demo" | Secondary button label |
| secondaryCtaUrl | string | "#" | Secondary button URL |
| showSecondaryCta | boolean | true | Show/hide secondary CTA |
| cards | array | [5 items] | Bento grid cards: {id, icon, label, value, trend, trendUp, size, dark, accent} |

## Theme Tokens Used

| Token slug | CSS variable | Where used |
|---|---|---|
| surface | --wp--preset--color--surface | Section bg (light) |
| foreground | --wp--preset--color--foreground | Text, dark card bg |
| foreground-muted | --wp--preset--color--foreground-muted | Subheading text |
| foreground-subtle | --wp--preset--color--foreground-subtle | Dark card muted text |
| white | --wp--preset--color--white | Card bg, primary CTA text |
| border | --wp--preset--color--border | Card borders, secondary CTA |
| border-warm | --wp--preset--color--border-warm | Badge border (light) |
| surface-warm | --wp--preset--color--surface-warm | Badge bg (light) |
| terracotta | --wp--preset--color--terracotta | Primary CTA bg, badge label, icon accent |
| mango | --wp--preset--color--mango | Accent card gradient end |
| forest-green | --wp--preset--color--forest-green | Trend badge text |
| hero-bg | --wp--preset--color--hero-bg | Trend badge bg |
| background-dark | --wp--preset--color--background-dark | Section bg (dark) |
| surface-dark | --wp--preset--color--surface-dark | Card bg (dark) |
| border-dark | --wp--preset--color--border-dark | Borders (dark) |
| muted-on-dark | --wp--preset--color--muted-on-dark | Muted text (dark) |
| accent-light | --wp--preset--color--accent-light | Badge label (dark) |
| dm-sans | --wp--preset--font-family--dm-sans | Headings, card values |
| inter | --wp--preset--font-family--inter | Body text, badges, CTAs |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor with InspectorControls |
| save.js | Frontend HTML with STYLE_STRUCTURE + STYLE_COLORS pattern |
| style.scss | Focus-visible and reduced-motion rules |
| block-spec.md | This file |

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from Pencil design |
| 1.1.0 | 2026-04-05 | Removed embedded navbar (extracted to site-header block) |
