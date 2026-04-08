# Block: Hero Stats
**Block name:** `kw-package/hero-stats`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (node T1wVb)

## Purpose
Displays a finance/corporate hero with split layout: left column with tagline, serif heading, description, and dual CTAs; right column with a vertical stack of 4 stats, each separated by top borders. Uses serif typography for stat values to convey trust and heritage. Supports light/dark color modes.

## Attributes

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| colorMode | string | "light" | Light or dark color scheme |
| tagline | string | "WEALTH MANAGEMENT..." | Uppercase tagline above heading |
| heading | string | "Building legacies..." | Main heading |
| subheading | string | "For over three decades..." | Supporting paragraph |
| primaryCtaText | string | "Schedule a Call" | Primary button label |
| primaryCtaUrl | string | "#" | Primary button URL |
| secondaryCtaText | string | "Our Approach" | Secondary button label |
| secondaryCtaUrl | string | "#" | Secondary button URL |
| showSecondaryCta | boolean | true | Show/hide secondary CTA |
| stats | array | [4 items] | Stats: {id, value, label} |

## Theme Tokens Used

| Token slug | CSS variable | Where used |
|---|---|---|
| white | --wp--preset--color--white | Section bg (light) |
| background-dark | --wp--preset--color--background-dark | Heading text, section bg (dark) |
| foreground-muted | --wp--preset--color--foreground-muted | Subheading |
| foreground-subtle | --wp--preset--color--foreground-subtle | Tagline, stat labels |
| border | --wp--preset--color--border | Stat dividers, top divider (light) |
| border-dark | --wp--preset--color--border-dark | Stat dividers (dark) |
| grey-light | --wp--preset--color--grey-light | Secondary CTA border |
| forest-green | --wp--preset--color--forest-green | Stat values, primary CTA bg, focus ring |
| muted-on-dark | --wp--preset--color--muted-on-dark | Muted text (dark) |
| inter | --wp--preset--font-family--inter | Body text, tagline, CTAs, stat labels |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor with InspectorControls, stat CRUD |
| save.js | Frontend HTML with dl/dt/dd stats |
| style.scss | Focus-visible and reduced-motion rules |
| block-spec.md | This file |

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from Pencil design |
