# Block: Social Proof
**Block name:** `kw-package/social-proof`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `design-components-blocks.pen` (Social Proof 1-5 variants)

## Purpose
Displays social proof content in five distinct style variants: logo ticker (auto-scrolling brand names), testimonial cards (3-column quote cards with avatars), stats counter (animated key metrics with dividers), review highlights (4-column review cards with star ratings), and case study previews (2-column cards with image and pull quote). Each variant supports light and dark color modes for 10 total visual combinations.

## Attributes
Derived from block.json exactly.

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| style | string | "testimonials" | Style variant: logo-ticker, testimonials, stats, reviews, case-studies |
| colorMode | string | "light" | Color mode: light or dark |
| heading | string | "What our customers say" | Section heading text (h2) for testimonials, reviews, case-studies |
| description | string | "Don't just take our word for it..." | Subtitle text below heading |
| showDescription | boolean | true | Toggle subtitle visibility |
| badgeText | string | "TRUSTED BY 10,000+ TEAMS" | Badge/label text for logo-ticker variant |
| overlineText | string | "CUSTOMER STORIES" | Overline text for case-studies variant |
| ratingValue | string | "4.9 out of 5" | Rating display text for reviews variant |
| reviewCount | string | "2,847 reviews" | Review count text for reviews variant |
| ctaText | string | "View all stories" | CTA link text for case-studies variant |
| ctaUrl | string | "#" | CTA link URL for case-studies variant |
| logos | array | [7 items] | Logo ticker items: {id, name} |
| testimonials | array | [3 items] | Testimonial cards: {id, quote, authorName, authorRole, avatarUrl, avatarId} |
| stats | array | [4 items] | Stats items: {id, value, label} |
| reviews | array | [4 items] | Review items: {id, quote, authorName, source} |
| caseStudies | array | [2 items] | Case study items: {id, company, title, pullQuote, linkText, linkUrl, imageUrl, imageId} |

## Theme Tokens Used

| Token slug | CSS variable | Where used |
|---|---|---|
| white | --wp--preset--color--white | Section bg (logo-ticker light, reviews light) |
| foreground | --wp--preset--color--foreground | Heading text, author name, rating text (light) |
| foreground-muted | --wp--preset--color--foreground-muted | Description text, stat labels (light) |
| foreground-subtle | --wp--preset--color--foreground-subtle | Badge text (logo-ticker), review count, author role |
| foreground-on-dark | --wp--preset--color--foreground-on-dark | Quote text (dark testimonials/reviews) |
| surface | --wp--preset--color--surface | Section bg (testimonials/stats light) |
| surface-warm | --wp--preset--color--surface-warm | Section bg (case-studies light) |
| surface-dark | --wp--preset--color--surface-dark | Card bg (dark), logo text (dark) |
| background-dark | --wp--preset--color--background-dark | Section bg (all dark variants) |
| border | --wp--preset--color--border | Card border (testimonials light), stat divider (light) |
| border-warm | --wp--preset--color--border-warm | Card border (case-studies light) |
| border-dark | --wp--preset--color--border-dark | Card border (all dark variants) |
| near-black | --wp--preset--color--near-black | Heading/title text (case-studies light) |
| muted-on-dark | --wp--preset--color--muted-on-dark | Description, labels, overline (dark variants) |
| accent-light | --wp--preset--color--accent-light | Company text, link text (case-studies dark) |
| accent | --wp--preset--color--accent | Focus ring |
| grey-light | --wp--preset--color--grey-light | Logo text (light) |
| body-text | --wp--preset--color--body-text | Quote text (testimonials/reviews light) |
| star-yellow | --wp--preset--color--star-yellow | Star icons (reviews) |
| review-bg | --wp--preset--color--review-bg | Card bg (reviews light) |
| review-border | --wp--preset--color--review-border | Card border (reviews light) |
| divider-dark | --wp--preset--color--divider-dark | Stat dividers (dark) |
| terracotta | --wp--preset--color--terracotta | Company text, link text (case-studies light) |
| muted-warm | --wp--preset--color--muted-warm | Pull quote text (case-studies light) |
| dm-sans | --wp--preset--font-family--dm-sans | Headings, stat values, logo names, case study titles |
| inter | --wp--preset--font-family--inter | Body text, quotes, descriptions, badges, labels |
| playfair | --wp--preset--font-family--playfair | Case-studies heading |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Editor component with InspectorControls for all 5 variant settings |
| save.js | Frontend HTML output with all variant and color mode logic |
| view.js | Stats counter scroll-triggered fade-in animation |
| style.scss | Ticker marquee keyframes, card hover effects, stats stagger animation |
| index.js | Block registration entry point |
| block-spec.md | This file |

## Frontend Behaviour
- **Logo Ticker:** CSS-driven infinite marquee scroll at 30s per loop. Logos are duplicated in the DOM for seamless wrapping. Animation pauses on hover via CSS.
- **Stats Counter:** IntersectionObserver triggers a staggered fade-in animation (100ms delay between items) when the section scrolls into view at 30% visibility. Falls back to immediate display if IntersectionObserver is unavailable.
- **Card Hover:** Testimonial, review, and case study cards lift 2px with a subtle shadow on hover (200ms transition). Case study link arrows nudge right on hover.

## Known Constraints
- The `body-text`, `star-yellow`, `review-bg`, `review-border`, `divider-dark`, `muted-warm` color tokens are used in the block but not yet defined in theme.json. They are defined in the clean HTML preview and need to be added to theme.json for production use.
- Logo ticker uses duplicated DOM elements for seamless scrolling; very long logo lists may affect performance.
- Stats animation requires JavaScript; the block renders correctly without JS but without the entrance animation.
- Switching style variant in the editor resets to default content for that variant since each variant uses different attribute arrays.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from 5 Pencil Social Proof variants |
