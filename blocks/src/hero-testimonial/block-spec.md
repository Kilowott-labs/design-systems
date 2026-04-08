# Block: Hero Testimonial
**Block name:** `kw-package/hero-testimonial`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (node rpFNR)

## Purpose
Displays an enterprise B2B testimonial-led hero with a large blockquote, author attribution with avatar, a horizontal results metrics row with dividers, dual CTAs, and a trusted-by logo bar at the bottom. Uses proper semantic elements: blockquote, cite, footer. Designed for case-study-driven landing pages. Supports light/dark color modes.

## Attributes

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| colorMode | string | "light" | Light or dark color scheme |
| quote | string | "Catalyst transformed..." | Testimonial quote text |
| authorName | string | "Marcus Chen, VP of Engineering" | Quote attribution name |
| authorCompany | string | "Dataflow Inc. ..." | Company and context |
| authorImage | string | "" | Author avatar URL |
| authorImageId | number | 0 | Author avatar media ID |
| results | array | [3 items] | Result metrics: {id, value, label} |
| primaryCtaText | string | "See Customer Stories" | Primary CTA label |
| primaryCtaUrl | string | "#" | Primary CTA URL |
| secondaryCtaText | string | "Request Demo" | Secondary CTA label |
| secondaryCtaUrl | string | "#" | Secondary CTA URL |
| showSecondaryCta | boolean | true | Show/hide secondary CTA |
| showTrustBar | boolean | true | Show/hide trusted-by bar |
| trustLabel | string | "TRUSTED BY" | Trust bar label |
| trustItems | array | [5 items] | Company logos as text: {id, label} |

## Theme Tokens Used

| Token slug | CSS variable | Where used |
|---|---|---|
| surface | --wp--preset--color--surface | Section bg (light) |
| background-dark | --wp--preset--color--background-dark | Quote text, secondary CTA text |
| foreground-subtle | --wp--preset--color--foreground-subtle | Result labels, author company |
| royal-blue | --wp--preset--color--royal-blue | Quote mark, result values, primary CTA bg, focus ring |
| white | --wp--preset--color--white | Primary CTA text |
| grey-light | --wp--preset--color--grey-light | Trust bar text, secondary CTA border |
| border | --wp--preset--color--border | Result dividers, trust bar border |
| border-dark | --wp--preset--color--border-dark | Borders (dark) |
| accent-light | --wp--preset--color--accent-light | Quote accent, result values (dark) |
| muted-on-dark | --wp--preset--color--muted-on-dark | Labels (dark) |
| dm-sans | --wp--preset--font-family--dm-sans | Result values, trust logos |
| inter | --wp--preset--font-family--inter | Body, author, CTAs, trust label |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor with MediaUpload, result and trust CRUD |
| save.js | Frontend HTML with blockquote, results row, trust bar |
| style.scss | Focus-visible and reduced-motion rules |
| block-spec.md | This file |

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from Pencil design |
