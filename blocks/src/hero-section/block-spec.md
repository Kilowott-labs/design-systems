# Block: Hero Section
**Block name:** `kw-package/hero-section`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (Nodes: iNWFY, 0yzFE, I4Pc3, e0vao, xcaPf, qmrb4)

## Purpose
Displays a full-width hero section with 6 visual style variants derived from Pencil designs: split editorial with image, full-bleed dramatic with background image, centered minimal, text-only creative agency, SaaS with inline email form, and dark gradient fintech. Each variant supports independent light/dark color modes, optional badge, dual CTA buttons, trust logo bar, stats bar, and email signup form depending on the selected style.

## Attributes
Derived from block.json exactly.

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| heading | string | "Discover Timeless Elegance for Every Occasion" | Main hero heading (h2) |
| subheading | string | "Curated collections that blend..." | Supporting paragraph text |
| style | string | "split" | Visual variant: split, fullbleed, centered, textonly, saas, dark |
| colorMode | string | "light" | Color scheme: light or dark |
| showBadge | boolean | true | Whether the badge label is visible |
| badgeText | string | "New Collection 2026" | Badge label text |
| primaryCtaText | string | "Shop Now" | Primary CTA button label |
| primaryCtaUrl | string | "#" | Primary CTA link URL |
| showSecondaryCta | boolean | true | Whether secondary CTA is visible |
| secondaryCtaText | string | "Learn More" | Secondary CTA button label |
| secondaryCtaUrl | string | "#" | Secondary CTA link URL |
| showTrustBar | boolean | true | Whether trust logos bar is visible |
| trustLabel | string | "TRUSTED BY" | Label before trust items |
| trustItems | array | [{id,label}x4] | Trust logo text items: {id: number, label: string} |
| imageUrl | string | "" | Hero image URL (used by split and fullbleed styles) |
| imageId | number | 0 | WordPress media library attachment ID |
| imageAlt | string | "Hero image" | Alt text for hero image |
| showStatsBar | boolean | false | Whether stats bar is visible |
| stats | array | [{id,value,label}x4] | Stats items: {id: number, value: string, label: string} |
| emailPlaceholder | string | "Enter your work email" | SaaS form input placeholder |
| emailButtonText | string | "Get Started Free" | SaaS form submit button text |
| proofItems | array | [{id,label}x3] | Social proof items below form: {id: number, label: string} |

## Theme Tokens Used

| Token slug | CSS variable | Where used in block |
|---|---|---|
| foreground | --wp--preset--color--foreground | Heading text (light), primary CTA bg (light) |
| foreground-muted | --wp--preset--color--foreground-muted | Subheading text (light), secondary CTA text |
| foreground-subtle | --wp--preset--color--foreground-subtle | Trust bar text, proof text, badge (textonly) |
| foreground-on-dark | --wp--preset--color--foreground-on-dark | Subheading on fullbleed |
| white | --wp--preset--color--white | CTA text, text on dark modes |
| surface | --wp--preset--color--surface | Section bg (saas light) |
| surface-warm | --wp--preset--color--surface-warm | Section bg (split light, textonly light) |
| surface-dark | --wp--preset--color--surface-dark | Badge bg (dark modes) |
| background-dark | --wp--preset--color--background-dark | Section bg (dark variants), overlay gradient |
| border | --wp--preset--color--border | Secondary CTA border (light), form border |
| border-warm | --wp--preset--color--border-warm | Secondary CTA border (textonly light) |
| border-dark | --wp--preset--color--border-dark | Borders in dark modes |
| accent | --wp--preset--color--accent | Badge text (light), primary CTA (saas/dark), focus ring |
| accent-light | --wp--preset--color--accent-light | Badge/accent text in dark modes |
| accent-surface | --wp--preset--color--accent-surface | Badge bg (light modes) |
| muted-on-dark | --wp--preset--color--muted-on-dark | Trust text, stat labels, badges on dark |
| dm-sans | --wp--preset--font-family--dm-sans | Headings, trust logos, stat values |
| inter | --wp--preset--font-family--inter | Body text, badges, CTA buttons, form |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor component with InspectorControls + visual preview |
| save.js | Frontend HTML output with STYLE_STRUCTURE + STYLE_COLORS |
| view.js | Frontend JS for SaaS email form interaction |
| style.scss | Fullbleed gradient overlay, input placeholder, focus-visible, reduced motion |
| block-spec.md | This file |

## Frontend Behaviour
The email form (visible only in the "saas" style variant) prevents default form submission, shows a "Sending..." state on the submit button for 2 seconds, then resets the form. This provides visual feedback without a backend handler. The form uses `data-hero-email-form` as its JS selector.

## Style Variants Reference

| Style | Design Source | Layout | Special Elements |
|---|---|---|---|
| split | Hero A (iNWFY) | Two-column: text + image | Hero image with rounded corners |
| fullbleed | Hero B (0yzFE) | Full background image + gradient overlay | Background image, gradient overlay via style.scss |
| centered | Hero C (I4Pc3) | Centered text stack | Clean minimal, large heading |
| textonly | Hero D (e0vao) | Left-aligned large text, no image | Creative agency, oversized typography |
| saas | Hero E (xcaPf) | Centered with inline email form | Email input + submit, proof items |
| dark | Hero F (qmrb4) | Split text + stats bar | Stats bar, dark gradient bg |

## Designs Not Included
6 hero variants were excluded because they require structurally different components:
- Hero G (CkDJp) — Bento Grid layout needs separate grid block
- Hero H (J2OAa) — Floating cards need absolute positioning system
- Hero I (T1wVb) — Stats column needs vertical stat layout
- Hero J (CXyLy) — Magazine editorial needs article/author metadata
- Hero K (aBAkX) — Product showcase needs spec row + pricing
- Hero L (rpFNR) — Testimonial-led needs blockquote + results row

## Known Constraints
- The `style` and `colorMode` attributes control visual output through JavaScript config objects (STYLE_STRUCTURE and STYLE_COLORS). Adding a new variant requires updating both objects in edit.js AND save.js.
- The fullbleed variant requires an image to display the gradient overlay effect. Without an image, it falls back to a solid background color.
- The SaaS email form is frontend-only — it does not submit to any backend endpoint. A view.js modification is needed to connect it to a real email service.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from 6 Pencil hero designs |
