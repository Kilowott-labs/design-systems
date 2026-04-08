# Block: FAQ Accordion
**Block name:** `kw-package/faq-accordion`
**Version:** 1.0.0
**Generated:** 2026-04-04
**Pencil source:** `design-systems/design-components-blocks.pen` (FAQ 1–5 variants)

## Purpose
Displays an expandable FAQ accordion section with smooth collapse/expand transitions. Supports 3 style variants (clean minimal, bordered cards, warm) × 2 color modes (light, dark) for 6 visual combinations. Includes 2 layout options (centered, two-column split), optional category tab filtering, badge, CTA button, and configurable icon style. Style controls structure/shape, colorMode controls the color layer independently.

## Attributes
Derived from block.json exactly.

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| heading | string | "Frequently Asked Questions" | Section heading text (h2) |
| description | string | "Everything you need to know..." | Subtitle text below heading |
| showDescription | boolean | true | Toggle subtitle visibility |
| style | string | "minimal" | Style variant: minimal, cards, warm |
| colorMode | string | "light" | Color mode: light or dark (independent of style) |
| layout | string | "centered" | Layout: centered or split (two-column) |
| iconStyle | string | "chevron" | Icon: chevron (rotate) or plus-minus (swap) |
| showBadge | boolean | false | Show pill badge above heading |
| badgeText | string | "FAQ" | Badge label text |
| showTabs | boolean | false | Show category tab filters |
| showCta | boolean | false | Show CTA button (split layout only) |
| ctaText | string | "Contact Support" | CTA button label |
| ctaUrl | string | "#" | CTA button URL |
| allowMultipleOpen | boolean | false | Allow multiple items open simultaneously |
| firstItemOpen | boolean | true | First item expanded on load |
| items | array | [5 items] | FAQ items: {id, question, answer, category} |
| categories | array | [3 cats] | Tab categories: {id, label} |

## Theme Tokens Used

| Token slug | CSS variable | Where used |
|---|---|---|
| white | --wp--preset--color--white | Section bg (minimal), text on dark |
| foreground | --wp--preset--color--foreground | Question text (light variants) |
| foreground-muted | --wp--preset--color--foreground-muted | Answer text, description |
| foreground-subtle | --wp--preset--color--foreground-subtle | Collapsed icon color |
| surface | --wp--preset--color--surface | Cards bg, hover bg (minimal) |
| surface-warm | --wp--preset--color--surface-warm | Section bg (warm variant) |
| background-dark | --wp--preset--color--background-dark | Section bg (dark variant) |
| border | --wp--preset--color--border | Dividers (minimal/cards) |
| border-warm | --wp--preset--color--border-warm | Dividers (warm variant) |
| border-dark | --wp--preset--color--border-dark | Dividers (dark variant), badge border |
| accent | --wp--preset--color--accent | Active icon, hover text, focus ring |
| accent-light | --wp--preset--color--accent-light | Active icon (dark variant) |
| accent-surface | --wp--preset--color--accent-surface | Icon wrapper bg, badge bg |
| muted-on-dark | --wp--preset--color--muted-on-dark | Answer text (dark variant) |
| surface-dark | --wp--preset--color--surface-dark | Badge bg (dark variant) |
| dm-sans | --wp--preset--font-family--dm-sans | Heading, question text |
| inter | --wp--preset--font-family--inter | Description, answer text, badge, tabs |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Editor component with InspectorControls for all settings |
| save.js | Frontend HTML output with all variant logic |
| view.js | Accordion expand/collapse, tab filtering |
| style.scss | grid-template-rows animation, icon rotation, hover effects |
| index.js | Block registration entry point |
| block-spec.md | This file |

## Frontend Behaviour
- Clicking a question trigger smoothly expands/collapses the answer panel via CSS grid-template-rows transition (350ms cubic-bezier)
- Answer text fades in with a slight upward slide (250ms, 100ms delay)
- Chevron icon rotates 180deg on expand; plus/minus icons swap
- Hover: trigger gets subtle background, question text shifts to accent color, icon highlights
- By default, only one item open at a time (closes others). `allowMultipleOpen` enables independent toggle
- If `showTabs` is enabled, clicking a category tab filters FAQ items by `data-category` attribute
- All interactions support keyboard (Enter/Space) and respect `prefers-reduced-motion`
- Multiple block instances on the same page work independently

## Known Constraints
- Tab filtering uses `display: none` toggling via JS — items don't animate in/out when filtered
- The `categories` array and item `category` field must use matching slug values for filtering to work
- Adding `showCta` only renders the button in `split` layout — it has no effect in `centered` layout

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-04 | Initial block generated from 5 Pencil FAQ variants |
| 1.1.0 | 2026-04-05 | Separated colorMode (light/dark) from style variants; fixed tab active state bug |
